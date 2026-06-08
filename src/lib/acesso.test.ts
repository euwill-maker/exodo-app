import { describe, it, expect } from 'vitest'
import { diasRestantesTrial, acessoLiberado } from './acesso'

describe('diasRestantesTrial', () => {
  it('7 dias no primeiro acesso', () => {
    const ini = '2026-06-01T10:00:00Z'
    expect(diasRestantesTrial(ini, new Date('2026-06-01T10:00:00Z'))).toBe(7)
  })
  it('diminui com o tempo', () => {
    const ini = '2026-06-01T10:00:00Z'
    expect(diasRestantesTrial(ini, new Date('2026-06-05T10:00:00Z'))).toBe(3)
  })
  it('0 depois de 7 dias', () => {
    const ini = '2026-06-01T10:00:00Z'
    expect(diasRestantesTrial(ini, new Date('2026-06-09T10:00:00Z'))).toBe(0)
  })
})

describe('acessoLiberado', () => {
  it('assinante mensal sempre liberado', () => {
    expect(acessoLiberado('mensal', '2000-01-01T00:00:00Z', new Date('2026-06-09T00:00:00Z'))).toBe(true)
  })
  it('vitalício sempre liberado', () => {
    expect(acessoLiberado('vitalicio', '', new Date())).toBe(true)
  })
  it('trial dentro do prazo libera', () => {
    expect(acessoLiberado('trial', '2026-06-01T00:00:00Z', new Date('2026-06-04T00:00:00Z'))).toBe(true)
  })
  it('trial vencido bloqueia', () => {
    expect(acessoLiberado('trial', '2026-06-01T00:00:00Z', new Date('2026-06-10T00:00:00Z'))).toBe(false)
  })
})
