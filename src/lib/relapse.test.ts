import { describe, it, expect } from 'vitest'
import { registrarRecaidaBatalha } from './relapse'
import type { Batalha } from '../types'

function base(): Batalha {
  return {
    id: 'b1',
    vicio: 'X',
    dataInicio: '2026-05-01T00:00:00Z',
    desafioDias: 90,
    declaracao: '',
    motivos: '',
    fotoIds: [],
    objetivos: [],
    compromissoAceito: true,
    melhorSequenciaDias: 5,
    vezesQueSeReergueu: 0,
    conquistasDesbloqueadas: ['primeiro-passo'],
  }
}

describe('registrarRecaidaBatalha', () => {
  it('guarda a melhor sequência se a atual for maior', () => {
    const agora = new Date('2026-05-11T00:00:00Z') // 10 dias
    expect(registrarRecaidaBatalha(base(), agora).melhorSequenciaDias).toBe(10)
  })
  it('reseta dataInicio para agora e incrementa vezesQueSeReergueu', () => {
    const agora = new Date('2026-05-11T00:00:00Z')
    const novo = registrarRecaidaBatalha(base(), agora)
    expect(novo.dataInicio).toBe(agora.toISOString())
    expect(novo.vezesQueSeReergueu).toBe(1)
  })
  it('mantém conquistas já desbloqueadas', () => {
    const novo = registrarRecaidaBatalha(base(), new Date('2026-05-11T00:00:00Z'))
    expect(novo.conquistasDesbloqueadas).toContain('primeiro-passo')
  })
})
