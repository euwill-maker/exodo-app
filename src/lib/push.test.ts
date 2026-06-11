import { describe, it, expect } from 'vitest'
import { urlBase64ToUint8Array, mensagemDoDia, MENSAGENS, precisaInstalarNoIOS } from './push'

describe('urlBase64ToUint8Array', () => {
  it('converte base64url para Uint8Array do tamanho certo', () => {
    // "AQID" base64 -> bytes [1,2,3]
    const out = urlBase64ToUint8Array('AQID')
    expect(Array.from(out)).toEqual([1, 2, 3])
  })
  it('aceita base64url com - e _ e sem padding', () => {
    const out = urlBase64ToUint8Array('a-_w')
    expect(out).toBeInstanceOf(Uint8Array)
    expect(out.length).toBe(3)
  })
})

describe('mensagemDoDia', () => {
  it('é determinística para o mesmo dia', () => {
    expect(mensagemDoDia(10)).toEqual(mensagemDoDia(10))
  })
  it('sempre retorna uma mensagem da lista', () => {
    for (let i = 0; i < 20; i++) {
      const m = mensagemDoDia(i)
      expect(MENSAGENS).toContainEqual(m)
    }
  })
  it('varia ao longo dos dias', () => {
    const a = mensagemDoDia(0)
    const b = mensagemDoDia(1)
    expect(a).not.toEqual(b)
  })
})

describe('precisaInstalarNoIOS', () => {
  const iphoneUA =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  const androidUA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36'

  it('true no iPhone fora do modo instalado', () => {
    expect(precisaInstalarNoIOS(iphoneUA, false)).toBe(true)
  })
  it('false no iPhone já instalado (standalone)', () => {
    expect(precisaInstalarNoIOS(iphoneUA, true)).toBe(false)
  })
  it('false no Android', () => {
    expect(precisaInstalarNoIOS(androidUA, false)).toBe(false)
  })
})
