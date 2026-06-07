export interface Patente {
  nome: string
  minPontos: number
}

// Patentes da jornada do guerreiro (temática Êxodo).
export const PATENTES: Patente[] = [
  { nome: 'Recruta', minPontos: 0 },
  { nome: 'Soldado', minPontos: 50 },
  { nome: 'Guerreiro', minPontos: 150 },
  { nome: 'Veterano do Deserto', minPontos: 350 },
  { nome: 'Comandante', minPontos: 700 },
  { nome: 'Herói da Fé', minPontos: 1500 },
]

export interface InfoPatente {
  atual: Patente
  proxima: Patente | null
  progresso: number // 0..1 dentro da patente atual
  faltam: number // pontos para a próxima (0 se máxima)
}

export function infoPatente(pontos: number): InfoPatente {
  let atual = PATENTES[0]
  let proxima: Patente | null = null
  for (let i = 0; i < PATENTES.length; i++) {
    if (pontos >= PATENTES[i].minPontos) {
      atual = PATENTES[i]
      proxima = PATENTES[i + 1] ?? null
    }
  }
  if (!proxima) return { atual, proxima: null, progresso: 1, faltam: 0 }
  const span = proxima.minPontos - atual.minPontos
  const dentro = pontos - atual.minPontos
  return {
    atual,
    proxima,
    progresso: Math.max(0, Math.min(1, dentro / span)),
    faltam: proxima.minPontos - pontos,
  }
}

export const PONTOS_POR_VITORIA = 10
