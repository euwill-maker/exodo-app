import type { Conquista } from '../types'
import { CONQUISTAS } from '../content/conquistas'

export function conquistasAte(dias: number): Conquista[] {
  return CONQUISTAS.filter((c) => dias >= c.marcaDias)
}

// Marcos candidatos: as marcas de conquista + o desafio escolhido.
export function proximoMarco(dias: number, desafioDias: number): number | null {
  const marcos = Array.from(
    new Set([...CONQUISTAS.map((c) => c.marcaDias), desafioDias]),
  ).sort((a, b) => a - b)
  return marcos.find((m) => m > dias) ?? null
}
