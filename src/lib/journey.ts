import type { Fase } from '../types'
import { FASES } from '../content/fases'

export function faseAtual(dias: number): Fase {
  return (
    FASES.find((f) => dias >= f.minDias && (f.maxDias === null || dias < f.maxDias)) ??
    FASES[FASES.length - 1]
  )
}
