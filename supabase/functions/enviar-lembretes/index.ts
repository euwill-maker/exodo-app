import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import webpush from 'npm:web-push@3.6.7'

// mesma lista do front (espelhada de propósito p/ não acoplar build do app à função)
const MENSAGENS = [
  { titulo: 'Bom dia, guerreiro 🌅', corpo: 'Seu encontro com Deus te espera. Comece o dia firme.' },
  { titulo: 'Mais um dia de liberdade 💪', corpo: 'Abra o Êxodo e dê o próximo passo da sua caminhada.' },
  { titulo: 'A jornada continua 🏜️', corpo: 'Um devocional por dia mantém o coração no rumo certo.' },
  { titulo: 'Deus já está te esperando 🙏', corpo: 'Reserve este minuto pra Ele hoje.' },
  { titulo: 'Force a vitória de hoje ⚔️', corpo: 'Leitura, oração e mais um dia conquistado.' },
  { titulo: 'Não caminhe sozinho 🤝', corpo: 'Seu devocional de hoje já está disponível.' },
  { titulo: 'Firmeza, você consegue 🔥', corpo: 'Cada dia fiel é um passo rumo à Terra Prometida.' },
]

function mensagemDoDia() {
  const dia = Math.floor(Date.now() / 86_400_000) // dias desde epoch
  return MENSAGENS[dia % MENSAGENS.length]
}

Deno.serve(async (req) => {
  // só o cron pode chamar
  const auth = req.headers.get('Authorization') ?? ''
  if (auth !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
    return new Response('não autorizado', { status: 401 })
  }

  webpush.setVapidDetails(
    Deno.env.get('VAPID_SUBJECT')!,
    Deno.env.get('VAPID_PUBLIC')!,
    Deno.env.get('VAPID_PRIVATE')!,
  )

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data: subs, error } = await admin.from('push_subs').select('endpoint, subscription')
  if (error) return new Response(error.message, { status: 500 })

  const msg = mensagemDoDia()
  const payload = JSON.stringify({ titulo: msg.titulo, corpo: msg.corpo, url: '/?go=devocional' })

  let enviados = 0
  let removidos = 0
  for (const row of subs ?? []) {
    try {
      await webpush.sendNotification(row.subscription, payload)
      enviados++
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode
      if (status === 404 || status === 410) {
        await admin.from('push_subs').delete().eq('endpoint', row.endpoint)
        removidos++
      }
    }
  }

  return new Response(JSON.stringify({ enviados, removidos }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
