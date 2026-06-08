// Links de pagamento (Checkout) do Stripe — modo TESTE.
// Trocar pelos links de produção (live) quando ativar a conta.
export const STRIPE_LINKS = {
  mensal: 'https://buy.stripe.com/test_28EaEXgAJ7aN7BI8hO1ZS00',
  vitalicio: 'https://buy.stripe.com/test_dRmeVd709amZaNU9lS1ZS01',
}

// Abre o checkout do Stripe, identificando o usuário (client_reference_id).
export function abrirCheckout(plano: 'mensal' | 'vitalicio', userId: string | null) {
  const base = plano === 'mensal' ? STRIPE_LINKS.mensal : STRIPE_LINKS.vitalicio
  const url = userId ? `${base}?client_reference_id=${encodeURIComponent(userId)}` : base
  window.location.href = url
}
