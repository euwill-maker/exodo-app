export interface Devocional {
  versiculo: string
  referencia: string
  reflexao: string
  aplicacao: string
  oracao: string
}

export interface TemaDevocional {
  id: string
  nome: string
  icone: string // nome de ícone (Icon.tsx)
  descricao: string
  devocionais: Devocional[]
}

export const TEMAS_DEVOCIONAIS: TemaDevocional[] = [
  {
    id: 'libertacao',
    nome: 'Libertação',
    icone: 'chains',
    descricao: 'Sair da escravidão e caminhar para a liberdade.',
    devocionais: [
      {
        versiculo: 'Se o Filho vos libertar, verdadeiramente sereis livres.',
        referencia: 'João 8:36',
        reflexao:
          'A liberdade não é um prêmio distante — é uma promessa. Quem confia em Cristo já está a caminho da Terra Prometida, mesmo entre quedas e recomeços.',
        aplicacao: 'Escreva uma frase sobre como será a sua vida livre.',
        oracao: 'Jesus, liberta-me de verdade. Conduz-me à liberdade para a qual me criaste. Amém.',
      },
      {
        versiculo: 'Eis que ponho diante de ti a vida e a morte; escolhe, pois, a vida.',
        referencia: 'Deuteronômio 30:19',
        reflexao:
          'Sair do Egito começou com uma decisão. A liberdade nasce de uma escolha repetida todos os dias.',
        aplicacao: 'Reafirme hoje a sua Declaração de Liberdade em voz alta.',
        oracao: 'Pai, eu escolho a vida. Sustenta a minha decisão hoje. Amém.',
      },
      {
        versiculo: 'Permanecei, pois, firmes na liberdade com que Cristo nos libertou.',
        referencia: 'Gálatas 5:1',
        reflexao:
          'Ser livre é uma coisa; permanecer livre é outra. A vigilância diária guarda a liberdade conquistada.',
        aplicacao: 'Identifique um gatilho de hoje e prepare uma resposta para ele.',
        oracao: 'Senhor, ajuda-me a permanecer firme e não voltar às correntes. Amém.',
      },
    ],
  },
  {
    id: 'ansiedade',
    nome: 'Ansiedade',
    icone: 'waves',
    descricao: 'Encontrar paz no meio da tempestade.',
    devocionais: [
      {
        versiculo: 'Não andeis ansiosos por coisa alguma... e a paz de Deus guardará o vosso coração.',
        referencia: 'Filipenses 4:6-7',
        reflexao:
          'A ansiedade tenta carregar o amanhã hoje. Deus convida você a entregar, em oração, o peso que não foi feito para carregar sozinho.',
        aplicacao: 'Escreva uma preocupação e entregue-a a Deus em oração.',
        oracao: 'Senhor, entrego a Ti a minha ansiedade. Guarda o meu coração na Tua paz. Amém.',
      },
      {
        versiculo: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
        referencia: '1 Pedro 5:7',
        reflexao:
          'Você não precisa fingir força. Pode lançar tudo sobre Deus — Ele cuida de você com carinho.',
        aplicacao: 'Respire fundo 3 vezes e diga: "Deus cuida de mim".',
        oracao: 'Pai, eu confio que Tu cuidas de mim. Acalma o meu interior. Amém.',
      },
      {
        versiculo: 'Em silêncio e confiança estará a vossa força.',
        referencia: 'Isaías 30:15',
        reflexao:
          'Nem toda batalha se vence agitando-se. Às vezes a maior força está em aquietar-se diante de Deus.',
        aplicacao: 'Reserve 2 minutos de silêncio para apenas estar com Deus.',
        oracao: 'Senhor, no silêncio eu Te encontro. Renova as minhas forças. Amém.',
      },
    ],
  },
  {
    id: 'pureza',
    nome: 'Pureza',
    icone: 'sunrise',
    descricao: 'Renovar a mente e o coração.',
    devocionais: [
      {
        versiculo: 'Bem-aventurados os limpos de coração, porque verão a Deus.',
        referencia: 'Mateus 5:8',
        reflexao:
          'A pureza não é perfeição — é direção. É manter o coração voltado para Deus, mesmo depois de tropeçar.',
        aplicacao: 'Peça a Deus para purificar um pensamento recorrente.',
        oracao: 'Cria em mim, ó Deus, um coração puro. Amém.',
      },
      {
        versiculo: 'Vigiai e orai, para que não entreis em tentação.',
        referencia: 'Mateus 26:41',
        reflexao:
          'A vigilância reconhece a fraqueza antes da queda. Saber a hora do perigo já é metade da vitória.',
        aplicacao: 'Marque o horário de maior risco e planeje uma ação para ele.',
        oracao: 'Senhor, dá-me olhos vigilantes e um coração firme. Amém.',
      },
      {
        versiculo: 'Transformai-vos pela renovação da vossa mente.',
        referencia: 'Romanos 12:2',
        reflexao:
          'O vício mora em padrões de pensamento. A liberdade exige trocar pensamentos antigos por verdades novas.',
        aplicacao: 'Substitua um pensamento negativo por uma verdade bíblica.',
        oracao: 'Deus, renova a minha mente. Forma em mim o novo. Amém.',
      },
    ],
  },
  {
    id: 'proposito',
    nome: 'Propósito',
    icone: 'mountain',
    descricao: 'Descobrir para que você foi criado.',
    devocionais: [
      {
        versiculo: 'Porque sou eu que conheço os planos que tenho para vós... planos de paz e de um futuro.',
        referencia: 'Jeremias 29:11',
        reflexao:
          'Você não está apenas fugindo de algo — está caminhando para algo. Deus tem um destino para a sua vida.',
        aplicacao: 'Escreva um sonho que a liberdade vai te permitir realizar.',
        oracao: 'Pai, mostra-me o propósito para o qual me criaste. Amém.',
      },
      {
        versiculo: 'Posso todas as coisas naquele que me fortalece.',
        referencia: 'Filipenses 4:13',
        reflexao:
          'A força para vencer não vem só de você. Vem de Cristo agindo em você, um dia de cada vez.',
        aplicacao: 'Diga em voz alta: "Em Cristo, eu venço hoje".',
        oracao: 'Senhor, em Ti está a minha força. Vence em mim hoje. Amém.',
      },
      {
        versiculo: 'Corramos com perseverança a carreira que nos está proposta.',
        referencia: 'Hebreus 12:1',
        reflexao:
          'A jornada é uma corrida de perseverança, não de velocidade. Cada passo conta, e desistir nunca é o fim.',
        aplicacao: 'Comemore um pequeno avanço de hoje, por menor que seja.',
        oracao: 'Deus, dá-me perseverança para correr até o fim. Amém.',
      },
    ],
  },
]
