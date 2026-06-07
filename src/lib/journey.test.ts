import { describe, it, expect } from 'vitest'
import { faseAtual } from './journey'

describe('faseAtual', () => {
  it('dia 0 -> Egito', () => expect(faseAtual(0).id).toBe('egito'))
  it('dia 6 -> Egito', () => expect(faseAtual(6).id).toBe('egito'))
  it('dia 7 -> Mar Vermelho', () => expect(faseAtual(7).id).toBe('mar-vermelho'))
  it('dia 30 -> Deserto', () => expect(faseAtual(30).id).toBe('deserto'))
  it('dia 90 -> Monte Sinai', () => expect(faseAtual(90).id).toBe('monte-sinai'))
  it('dia 180 -> Terra Prometida', () => expect(faseAtual(180).id).toBe('terra-prometida'))
  it('dia 999 -> Terra Prometida', () => expect(faseAtual(999).id).toBe('terra-prometida'))
})
