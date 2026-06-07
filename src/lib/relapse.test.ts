import { describe, it, expect } from 'vitest'
import { registrarRecaida } from './relapse'
import type { EstadoApp } from '../types'

function base(): EstadoApp {
  return {
    perfil: {
      nome: 'A',
      vicio: 'X',
      dataInicio: '2026-05-01T00:00:00Z',
      desafioDias: 90,
      declaracao: '',
      motivos: '',
      fotoIds: [],
    },
    progresso: {
      melhorSequenciaDias: 5,
      vezesQueSeReergueu: 0,
      conquistasDesbloqueadas: [],
      devocionaisConcluidos: [],
    },
    diario: [],
  }
}

describe('registrarRecaida', () => {
  it('guarda a melhor sequência se a atual for maior', () => {
    const agora = new Date('2026-05-11T00:00:00Z') // 10 dias
    const novo = registrarRecaida(base(), agora)
    expect(novo.progresso.melhorSequenciaDias).toBe(10)
  })
  it('reseta dataInicio para agora e incrementa vezesQueSeReergueu', () => {
    const agora = new Date('2026-05-11T00:00:00Z')
    const novo = registrarRecaida(base(), agora)
    expect(novo.perfil!.dataInicio).toBe(agora.toISOString())
    expect(novo.progresso.vezesQueSeReergueu).toBe(1)
  })
  it('mantém conquistas já desbloqueadas', () => {
    const estado = base()
    estado.progresso.conquistasDesbloqueadas = ['primeiro-passo']
    const novo = registrarRecaida(estado, new Date('2026-05-11T00:00:00Z'))
    expect(novo.progresso.conquistasDesbloqueadas).toContain('primeiro-passo')
  })
})
