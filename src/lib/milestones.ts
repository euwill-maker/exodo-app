import type { Conquista } from '../types'
import { CONQUISTAS } from '../content/conquistas'

export function conquistasAte(dias: number): Conquista[] {
  return CONQUISTAS.filter((c) => dias >= c.marcaDias)
}

function todosMarcos(desafioDias: number): number[] {
  return Array.from(new Set([...CONQUISTAS.map((c) => c.marcaDias), desafioDias])).sort(
    (a, b) => a - b,
  )
}

// Marcos candidatos: as marcas de conquista + o desafio escolhido.
export function proximoMarco(dias: number, desafioDias: number): number | null {
  return todosMarcos(desafioDias).find((m) => m > dias) ?? null
}

// Fração de progresso (0..1) entre o marco anterior e o próximo marco.
export function progressoSegmento(dias: number, desafioDias: number): number {
  const marcos = todosMarcos(desafioDias)
  const proximo = marcos.find((m) => m > dias)
  if (proximo === undefined) return 1
  const anterior = [...marcos].reverse().find((m) => m <= dias) ?? 0
  const span = proximo - anterior
  if (span <= 0) return 1
  return (dias - anterior) / span
}
