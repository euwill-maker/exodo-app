import { TEMAS_DEVOCIONAIS, type Devocional } from './devocionais'

export interface Etapa {
  id: string
  nome: string
  descricao: string
  icone: string
  dias: Devocional[]
}

// O plano é uma sequência de etapas; cada etapa tem N dias (devocionais).
// Hoje, cada tema vira uma etapa. O banco vai crescer rumo a 365 dias.
export const ETAPAS: Etapa[] = TEMAS_DEVOCIONAIS.map((t) => ({
  id: t.id,
  nome: t.nome,
  descricao: t.descricao,
  icone: t.icone,
  dias: t.devocionais,
}))

export const TODOS_DIAS: Devocional[] = ETAPAS.flatMap((e) => e.dias)
export const TOTAL_DIAS = TODOS_DIAS.length
export const META_DIAS = 365 // objetivo do plano completo (em construção)

export interface LocalDia {
  etapa: Etapa
  indiceNaEtapa: number // 0-based
  diaGlobal: number // 1-based no plano todo
  devocional: Devocional
}

// idx é 0-based no plano todo.
export function localizarDia(idx: number): LocalDia | null {
  if (idx < 0 || idx >= TOTAL_DIAS) return null
  let acc = 0
  for (const etapa of ETAPAS) {
    if (idx < acc + etapa.dias.length) {
      return {
        etapa,
        indiceNaEtapa: idx - acc,
        diaGlobal: idx + 1,
        devocional: etapa.dias[idx - acc],
      }
    }
    acc += etapa.dias.length
  }
  return null
}

// Quantos dias de uma etapa já foram concluídos, dado o total sequencial concluído.
export function progressoEtapa(etapaIdx: number, diasConcluidos: number): { feitos: number; total: number; inicioGlobal: number } {
  let inicio = 0
  for (let i = 0; i < etapaIdx; i++) inicio += ETAPAS[i].dias.length
  const total = ETAPAS[etapaIdx].dias.length
  const feitos = Math.max(0, Math.min(total, diasConcluidos - inicio))
  return { feitos, total, inicioGlobal: inicio }
}
