// Dias na jornada = dias desde a batalha mais antiga do usuário (0 se não tem batalha).
// Só metadado de uso — não toca em conteúdo íntimo.
export function diasNaJornada(estado: { batalhas?: { dataInicio: string }[] }): number {
  const bs = estado.batalhas ?? []
  if (!bs.length) return 0
  const maisAntiga = Math.min(...bs.map((b) => new Date(b.dataInicio).getTime()))
  return Math.floor((Date.now() - maisAntiga) / 86_400_000)
}

export interface AdminStats {
  totais: { cadastrados: number; trial: number; pagantes: number; novos7d: number; ativos7d: number }
  visitas: { total: number; ultimos7d: number }
  usuarios: {
    nome: string
    email: string
    plano: string
    criado_em: string
    ultimo_acesso: string | null
    dias: number
  }[]
}
