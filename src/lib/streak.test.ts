import { describe, it, expect } from 'vitest'
import { diasLivres, partesTempo } from './streak'

describe('diasLivres', () => {
  it('retorna 0 no mesmo instante', () => {
    const agora = new Date('2026-06-07T10:00:00Z')
    expect(diasLivres('2026-06-07T10:00:00Z', agora)).toBe(0)
  })
  it('conta dias completos decorridos', () => {
    const agora = new Date('2026-06-07T10:00:00Z')
    expect(diasLivres('2026-06-01T10:00:00Z', agora)).toBe(6)
  })
})

describe('partesTempo', () => {
  it('quebra em dias e horas', () => {
    const agora = new Date('2026-06-02T13:00:00Z')
    expect(partesTempo('2026-06-01T10:00:00Z', agora)).toEqual({ dias: 1, horas: 3 })
  })
})
