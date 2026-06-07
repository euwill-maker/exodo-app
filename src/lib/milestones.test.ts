import { describe, it, expect } from 'vitest'
import { conquistasAte, proximoMarco } from './milestones'

describe('conquistasAte', () => {
  it('nenhuma com 0 dias', () => expect(conquistasAte(0)).toEqual([]))
  it('com 7 dias inclui primeiro-passo e travessia', () => {
    expect(conquistasAte(7).map((c) => c.id)).toEqual(['primeiro-passo', 'travessia-iniciada'])
  })
})

describe('proximoMarco', () => {
  it('aos 3 dias com desafio 90, o próximo marco é 7', () => {
    expect(proximoMarco(3, 90)).toBe(7)
  })
  it('aos 200 dias, próximo marco é 365', () => {
    expect(proximoMarco(200, 90)).toBe(365)
  })
  it('além de tudo retorna null', () => {
    expect(proximoMarco(400, 365)).toBeNull()
  })
})
