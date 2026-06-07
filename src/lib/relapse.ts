import type { Batalha } from '../types'
import { diasLivres } from './streak'

export function registrarRecaidaBatalha(batalha: Batalha, agora: Date = new Date()): Batalha {
  const atual = diasLivres(batalha.dataInicio, agora)
  return {
    ...batalha,
    dataInicio: agora.toISOString(),
    melhorSequenciaDias: Math.max(batalha.melhorSequenciaDias, atual),
    vezesQueSeReergueu: batalha.vezesQueSeReergueu + 1,
  }
}
