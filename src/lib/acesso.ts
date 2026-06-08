export const DIAS_TRIAL = 7

export type Plano = 'trial' | 'mensal' | 'vitalicio'

const MS_DIA = 86_400_000

// Quantos dias de trial ainda restam (0 se acabou).
export function diasRestantesTrial(primeiroAcesso: string, agora: Date = new Date()): number {
  if (!primeiroAcesso) return DIAS_TRIAL
  const fim = new Date(primeiroAcesso).getTime() + DIAS_TRIAL * MS_DIA
  const ms = fim - agora.getTime()
  return Math.max(0, Math.ceil(ms / MS_DIA))
}

// Dias restantes até uma data-fim (ex.: fim do trial vindo do servidor).
export function diasRestantesData(fimISO: string | null, agora: Date = new Date()): number {
  if (!fimISO) return 0
  const ms = new Date(fimISO).getTime() - agora.getTime()
  return Math.max(0, Math.ceil(ms / MS_DIA))
}

// Acesso liberado se for assinante (mensal/vitalício) ou ainda dentro do trial (local).
export function acessoLiberado(
  plano: Plano,
  primeiroAcesso: string,
  agora: Date = new Date(),
): boolean {
  if (plano === 'mensal' || plano === 'vitalicio') return true
  return diasRestantesTrial(primeiroAcesso, agora) > 0
}

// Versão que usa o fim do trial vindo do SERVIDOR (à prova de fraude).
export function acessoLiberadoServidor(
  plano: string,
  trialEnds: string | null,
  agora: Date = new Date(),
): boolean {
  if (plano === 'mensal' || plano === 'vitalicio') return true
  return diasRestantesData(trialEnds, agora) > 0
}
