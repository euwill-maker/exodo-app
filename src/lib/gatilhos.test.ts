import { describe, it, expect } from 'vitest'
import { analisarGatilhos } from './gatilhos'
import type { DiarioEntry } from '../types'

function entry(p: Partial<DiarioEntry>): DiarioEntry {
  return {
    data: '2026-06-01',
    humor: 'Forte',
    intensidade: 0,
    gatilhos: [],
    oQueAconteceu: '',
    vitorias: '',
    gratidao: '',
    oracao: '',
    ...p,
  }
}

describe('analisarGatilhos', () => {
  it('conta gatilhos mais frequentes', () => {
    const r = analisarGatilhos([
      entry({ gatilhos: ['Estresse', 'Tédio'] }),
      entry({ gatilhos: ['Estresse'] }),
    ])
    expect(r.topGatilhos[0]).toEqual({ nome: 'Estresse', vezes: 2 })
  })
  it('calcula intensidade média', () => {
    const r = analisarGatilhos([entry({ intensidade: 4 }), entry({ intensidade: 6 })])
    expect(r.intensidadeMedia).toBe(5)
  })
  it('acha o humor predominante', () => {
    const r = analisarGatilhos([
      entry({ humor: 'Ansioso' }),
      entry({ humor: 'Ansioso' }),
      entry({ humor: 'Feliz' }),
    ])
    expect(r.humorTop).toBe('Ansioso')
  })
  it('acha o dia mais difícil', () => {
    // 2026-06-01 é segunda; 2026-06-06 é sábado (intensidade maior)
    const r = analisarGatilhos([
      entry({ data: '2026-06-01', intensidade: 2 }),
      entry({ data: '2026-06-06', intensidade: 9 }),
    ])
    expect(r.diaDificil).toBe('Sábado')
  })
})
