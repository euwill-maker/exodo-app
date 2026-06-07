import { describe, it, expect } from 'vitest'
import { infoPatente } from './patente'

describe('infoPatente', () => {
  it('começa como Recruta', () => {
    const i = infoPatente(0)
    expect(i.atual.nome).toBe('Recruta')
    expect(i.proxima?.nome).toBe('Soldado')
  })
  it('vira Soldado aos 50', () => {
    expect(infoPatente(50).atual.nome).toBe('Soldado')
  })
  it('progresso no meio da faixa', () => {
    // Soldado 50 -> Guerreiro 150; aos 100 = 50%
    expect(infoPatente(100).progresso).toBeCloseTo(0.5, 5)
  })
  it('máxima não tem próxima', () => {
    const i = infoPatente(2000)
    expect(i.atual.nome).toBe('Herói da Fé')
    expect(i.proxima).toBeNull()
    expect(i.faltam).toBe(0)
  })
})
