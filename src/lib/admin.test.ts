import { describe, it, expect } from 'vitest'
import { diasNaJornada } from './admin'

describe('diasNaJornada', () => {
  it('0 sem batalhas', () => {
    expect(diasNaJornada({ batalhas: [] })).toBe(0)
    expect(diasNaJornada({})).toBe(0)
  })
  it('usa a batalha mais antiga (maior nº de dias)', () => {
    const cincoDias = new Date(Date.now() - 86_400_000 * 5).toISOString()
    const umDia = new Date(Date.now() - 86_400_000).toISOString()
    const r = diasNaJornada({ batalhas: [{ dataInicio: umDia }, { dataInicio: cincoDias }] })
    expect(r).toBe(5)
  })
})
