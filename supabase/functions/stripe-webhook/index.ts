// Webhook do Stripe → atualiza o plano do usuário na tabela protegida `profiles`.
import Stripe from 'https://esm.sh/stripe@16.12.0?target=deno&no-check'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})
// Aceita webhook de produção (live) e de teste (mantém os dois funcionando).
const whSecrets = [
  Deno.env.get('STRIPE_WEBHOOK_SECRET'),
  Deno.env.get('STRIPE_WEBHOOK_SECRET_TEST'),
].filter((s): s is string => !!s)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

Deno.serve(async (req) => {
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()
  let event: Stripe.Event | null = null
  for (const sec of whSecrets) {
    try {
      event = await stripe.webhooks.constructEventAsync(body, sig!, sec)
      break
    } catch {
      /* tenta o próximo segredo */
    }
  }
  if (!event) return new Response('assinatura inválida', { status: 400 })

  try {
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object as Stripe.Checkout.Session
      const userId = s.client_reference_id
      if (userId) {
        let plano = 'vitalicio'
        if (s.mode === 'subscription' && s.subscription) {
          // assinatura: distingue mensal (1 mês) de trimestral (3 meses) pelo intervalo
          const sub = await stripe.subscriptions.retrieve(s.subscription as string)
          const rec = sub.items.data[0]?.price?.recurring
          plano = rec?.interval === 'month' && (rec?.interval_count ?? 1) >= 3 ? 'trimestral' : 'mensal'
        }
        await supabase
          .from('profiles')
          .update({
            plano,
            stripe_customer: (s.customer as string) ?? null,
            stripe_subscription: (s.subscription as string) ?? null,
            atualizado_em: new Date().toISOString(),
          })
          .eq('id', userId)
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('profiles')
        .update({ plano: 'expirado', atualizado_em: new Date().toISOString() })
        .eq('stripe_subscription', sub.id)
    }
  } catch (e) {
    return new Response('erro: ' + (e as Error).message, { status: 500 })
  }

  return new Response(JSON.stringify({ recebido: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
