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
  { texto: 'O Senhor é o meu pastor; nada me faltará.', referencia: 'Salmos 23:1' },
  { texto: 'Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.', referencia: 'Salmos 46:1' },
  {
    texto: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.',
    referencia: 'Provérbios 3:5',
  },
  { texto: 'Sê forte e corajoso; o Senhor, teu Deus, é contigo por onde quer que andares.', referencia: 'Josué 1:9' },
  { texto: 'Perto está o Senhor dos que têm o coração quebrantado.', referencia: 'Salmos 34:18' },
  {
    texto: 'Os que esperam no Senhor renovarão as suas forças e correrão sem se cansarem.',
    referencia: 'Isaías 40:31',
  },
  {
    texto: 'Se alguém está em Cristo, nova criatura é: as coisas velhas já passaram.',
    referencia: '2 Coríntios 5:17',
  },
  { texto: 'Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto.', referencia: 'Salmos 51:10' },
  {
    texto: 'As misericórdias do Senhor se renovam a cada manhã; grande é a tua fidelidade.',
    referencia: 'Lamentações 3:22-23',
  },
  {
    texto: 'Aquele que em vós começou a boa obra a aperfeiçoará até o dia de Cristo.',
    referencia: 'Filipenses 1:6',
  },
  { texto: 'Vinde a mim todos os que estais cansados, e eu vos aliviarei.', referencia: 'Mateus 11:28' },
  { texto: 'Agora, pois, nenhuma condenação há para os que estão em Cristo Jesus.', referencia: 'Romanos 8:1' },
  {
    texto: 'Estai firmes na liberdade com que Cristo nos libertou.',
    referencia: 'Gálatas 5:1',
  },
]

export const VERSICULOS_EMERGENCIA: Versiculo[] = [
  {
    texto:
      'Não veio sobre vós tentação, senão humana; mas Deus é fiel e não permitirá que sejais tentados além das vossas forças, e com a tentação dará também o escape.',
    referencia: '1 Coríntios 10:13',
  },
  { texto: 'Sujeitai-vos a Deus; resisti ao diabo, e ele fugirá de vós.', referencia: 'Tiago 4:7' },
  {
    texto: 'O Senhor é o meu refúgio e a minha fortaleza, o meu Deus em quem confio.',
    referencia: 'Salmos 91:2',
  },
  { texto: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13' },
  {
    texto: 'A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.',
    referencia: '2 Coríntios 12:9',
  },
  { texto: 'Invoca-me no dia da angústia; eu te livrarei, e tu me glorificarás.', referencia: 'Salmos 50:15' },
  {
    texto: 'No mundo tereis aflições; mas tende bom ânimo, eu venci o mundo.',
    referencia: 'João 16:33',
  },
  {
    texto: 'Maior é o que está em vós do que o que está no mundo.',
    referencia: '1 João 4:4',
  },
  { texto: 'O nome do Senhor é torre forte; para ela corre o justo e está seguro.', referencia: 'Provérbios 18:10' },
]

// Seleção determinística por data (mesmo versículo para todos no mesmo dia).
export function indiceDoDia(dataISO: string, tamanho: number): number {
  const dias = Math.floor(new Date(dataISO + 'T00:00:00').getTime() / 86_400_000)
  return ((dias % tamanho) + tamanho) % tamanho
}
