import type { EstadoApp } from '../types'
import { diasLivres } from './streak'

export function registrarRecaida(estado: EstadoApp, agora: Date = new Date()): EstadoApp {
  if (!estado.perfil) return estado
  const atual = diasLivres(estado.perfil.dataInicio, agora)
  return {
    ...estado,
    perfil: { ...estado.perfil, dataInicio: agora.toISOString() },
    progresso: {
      ...estado.progresso,
      melhorSequenciaDias: Math.max(estado.progresso.melhorSequenciaDias, atual),
      vezesQueSeReergueu: estado.progresso.vezesQueSeReergueu + 1,
    },
  }
}
