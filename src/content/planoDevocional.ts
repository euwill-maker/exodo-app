import type { Devocional } from './devocionais'
import plano from './plano365.json'

export interface Etapa {
  id: string
  nome: string
  descricao: string
  icone: string
  dias: Devocional[]
}

const DESCRICOES: Record<string, string> = {
  fundamentos: 'A decisão de sair da escravidão e os primeiros passos.',
  mente: 'Renovar pensamentos e vencer as mentiras da mente.',
  identidade: 'Quem você é aos olhos de Deus.',
  ansiedade: 'Encontrar paz no meio da tempestade.',
  disciplina: 'Constância e domínio próprio que constroem uma nova vida.',
  cura: 'Curar feridas, perdoar e soltar o passado.',
  proposito: 'Descobrir para que você foi criado.',
  familia: 'Amor, relacionamentos e os que você protege.',
  deserto: 'Perseverar nos dias difíceis e recomeçar.',
  oracao: 'Intimidade e dependência diária de Deus.',
  gratidao: 'Gratidão e alegria como força para o caminho.',
  terra: 'Viver em liberdade plena e ajudar outros a vencerem.',
}

// Conteúdo do plano de 1 ano (gerado e revisável). Cada etapa = ~30 dias.
export const ETAPAS: Etapa[] = (plano.etapas as Omit<Etapa, 'descricao'>[]).map((e) => ({
  ...e,
  descricao: DESCRICOES[e.id] ?? '',
}))

export const TODOS_DIAS: Devocional[] = ETAPAS.flatMap((e) => e.dias)
export const TOTAL_DIAS = TODOS_DIAS.length
export const META_DIAS = 365 // objetivo do plano completo

export interface LocalDia {
  etapa: Etapa
  indiceNaEtapa: number
  diaGlobal: number
  devocional: Devocional
}

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

export function progressoEtapa(
  etapaIdx: number,
  diasConcluidos: number,
): { feitos: number; total: number; inicioGlobal: number } {
  let inicio = 0
  for (let i = 0; i < etapaIdx; i++) inicio += ETAPAS[i].dias.length
  const total = ETAPAS[etapaIdx].dias.length
  const feitos = Math.max(0, Math.min(total, diasConcluidos - inicio))
  return { feitos, total, inicioGlobal: inicio }
}
