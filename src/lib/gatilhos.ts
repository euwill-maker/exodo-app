import type { DiarioEntry } from '../types'

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export interface MapaGatilhos {
  totalRegistros: number
  topGatilhos: { nome: string; vezes: number }[]
  humorTop: string | null
  intensidadeMedia: number
  diaDificil: string | null
}

export function analisarGatilhos(diario: DiarioEntry[]): MapaGatilhos {
  const total = diario.length

  // gatilhos mais frequentes
  const cont: Record<string, number> = {}
  diario.forEach((d) => (d.gatilhos ?? []).forEach((g) => (cont[g] = (cont[g] ?? 0) + 1)))
  const topGatilhos = Object.entries(cont)
    .map(([nome, vezes]) => ({ nome, vezes }))
    .sort((a, b) => b.vezes - a.vezes)
    .slice(0, 5)

  // humor predominante
  const humorCont: Record<string, number> = {}
  diario.forEach((d) => {
    if (d.humor) humorCont[d.humor] = (humorCont[d.humor] ?? 0) + 1
  })
  const humorTop = Object.entries(humorCont).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

  // intensidade média da vontade
  const comInt = diario.filter((d) => typeof d.intensidade === 'number')
  const intensidadeMedia = comInt.length
    ? comInt.reduce((s, d) => s + d.intensidade, 0) / comInt.length
    : 0

  // dia da semana mais difícil (maior intensidade média)
  const somaPorDia: Record<number, { soma: number; n: number }> = {}
  diario.forEach((d) => {
    if (typeof d.intensidade !== 'number') return
    const dia = new Date(d.data + 'T00:00:00').getDay()
    const acc = somaPorDia[dia] ?? { soma: 0, n: 0 }
    acc.soma += d.intensidade
    acc.n += 1
    somaPorDia[dia] = acc
  })
  let diaDificil: string | null = null
  let maiorMedia = -1
  Object.entries(somaPorDia).forEach(([dia, { soma, n }]) => {
    const media = soma / n
    if (media > maiorMedia) {
      maiorMedia = media
      diaDificil = DIAS_SEMANA[Number(dia)]
    }
  })

  return { totalRegistros: total, topGatilhos, humorTop, intensidadeMedia, diaDificil }
}
