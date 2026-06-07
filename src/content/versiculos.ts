export interface Versiculo {
  texto: string
  referencia: string
}

export const VERSICULOS_DIARIOS: Versiculo[] = [
  { texto: 'Conhecereis a verdade, e a verdade vos libertará.', referencia: 'João 8:32' },
  { texto: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13' },
  { texto: 'Transformai-vos pela renovação da vossa mente.', referencia: 'Romanos 12:2' },
  {
    texto: 'O Senhor é a minha força e o meu escudo; nele confiou o meu coração.',
    referencia: 'Salmos 28:7',
  },
  { texto: 'Não temas, porque eu sou contigo.', referencia: 'Isaías 41:10' },
  { texto: 'Em silêncio e confiança estará a vossa força.', referencia: 'Isaías 30:15' },
  { texto: 'Vigiai e orai, para que não entreis em tentação.', referencia: 'Mateus 26:41' },
]

export const VERSICULOS_EMERGENCIA: Versiculo[] = [
  {
    texto:
      'Não veio sobre vós tentação, senão humana; mas Deus é fiel e não permitirá que sejais tentados além das vossas forças, e com a tentação dará também o escape.',
    referencia: '1 Coríntios 10:13',
  },
  {
    texto: 'Sujeitai-vos a Deus; resisti ao diabo, e ele fugirá de vós.',
    referencia: 'Tiago 4:7',
  },
  {
    texto: 'O Senhor é o meu refúgio e a minha fortaleza, o meu Deus em quem confio.',
    referencia: 'Salmos 91:2',
  },
  { texto: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13' },
]

// Seleção determinística por data (mesmo versículo para todos no mesmo dia).
export function indiceDoDia(dataISO: string, tamanho: number): number {
  const dias = Math.floor(new Date(dataISO + 'T00:00:00').getTime() / 86_400_000)
  return ((dias % tamanho) + tamanho) % tamanho
}
