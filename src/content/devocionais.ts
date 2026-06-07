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
        versiculo: 'Estai firmes na liberdade com que Cristo nos libertou.',
        referencia: 'Gálatas 5:1',
        reflexao:
          'Ser livre é uma coisa; permanecer livre é outra. A vigilância diária guarda a liberdade conquistada.',
        aplicacao: 'Identifique um gatilho de hoje e prepare uma resposta para ele.',
        oracao: 'Senhor, ajuda-me a permanecer firme e não voltar às correntes. Amém.',
      },
      {
        versiculo: 'O Espírito do Senhor está sobre mim... para proclamar liberdade aos cativos.',
        referencia: 'Lucas 4:18',
        reflexao:
          'Jesus veio justamente para os cativos. Sua história de prisão é exatamente o lugar onde Ele quer agir.',
        aplicacao: 'Entregue a Deus, agora, a corrente que mais te prende.',
        oracao: 'Espírito Santo, vem quebrar o que me aprisiona. Eu Te recebo. Amém.',
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
      {
        versiculo: 'Vinde a mim todos os que estais cansados, e eu vos aliviarei.',
        referencia: 'Mateus 11:28',
        reflexao:
          'O convite de Jesus é para os cansados. Você pode chegar exausto — Ele não pede que você melhore antes de vir.',
        aplicacao: 'Diga a Deus, com sinceridade, como você está cansado hoje.',
        oracao: 'Jesus, eu venho cansado. Dá-me o Teu descanso. Amém.',
      },
    ],
  },
  {
    id: 'pureza',
    nome: 'Pureza',
    icone: 'drop',
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
        versiculo: 'Como purificará o jovem o seu caminho? Observando-o conforme a tua palavra.',
        referencia: 'Salmos 119:9',
        reflexao:
          'A Palavra é o filtro do coração. Quanto mais você se enche dela, menos espaço sobra para o que escraviza.',
        aplicacao: 'Leia um versículo e repita-o ao longo do dia.',
        oracao: 'Senhor, que a Tua Palavra limpe e guarde o meu caminho. Amém.',
      },
      {
        versiculo: 'Transformai-vos pela renovação da vossa mente.',
        referencia: 'Romanos 12:2',
        reflexao:
          'O vício mora em padrões de pensamento. A liberdade exige trocar pensamentos antigos por verdades novas.',
        aplicacao: 'Substitua um pensamento negativo por uma verdade bíblica.',
        oracao: 'Deus, renova a minha mente. Forma em mim o novo. Amém.',
      },
      {
        versiculo: 'Tudo me é lícito, mas nem tudo convém; eu não me deixarei dominar por nada.',
        referencia: '1 Coríntios 6:12',
        reflexao:
          'Liberdade não é fazer tudo — é não ser dominado por nada. Quem é livre escolhe o que o fortalece.',
        aplicacao: 'Diga não a um pequeno impulso hoje, de propósito.',
        oracao: 'Senhor, que nada me domine além do Teu amor. Amém.',
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
        versiculo: 'Corramos com perseverança a carreira que nos está proposta.',
        referencia: 'Hebreus 12:1',
        reflexao:
          'A jornada é uma corrida de perseverança, não de velocidade. Cada passo conta, e desistir nunca é o fim.',
        aplicacao: 'Comemore um pequeno avanço de hoje, por menor que seja.',
        oracao: 'Deus, dá-me perseverança para correr até o fim. Amém.',
      },
      {
        versiculo: 'Fostes chamados para a liberdade... servi-vos uns aos outros pelo amor.',
        referencia: 'Gálatas 5:13',
        reflexao:
          'Sua liberdade tem um propósito maior: amar e servir. Quando você ajuda alguém, fortalece a si mesmo.',
        aplicacao: 'Faça um bem a alguém hoje, mesmo que pequeno.',
        oracao: 'Senhor, usa a minha história para abençoar outras pessoas. Amém.',
      },
      {
        versiculo: 'Tudo posso naquele que me fortalece.',
        referencia: 'Filipenses 4:13',
        reflexao:
          'A força para cumprir o propósito não vem só de você. Vem de Cristo agindo em você, um dia de cada vez.',
        aplicacao: 'Diga em voz alta: "Em Cristo, eu venço hoje".',
        oracao: 'Senhor, em Ti está a minha força. Vence em mim hoje. Amém.',
      },
    ],
  },
  {
    id: 'disciplina',
    nome: 'Disciplina',
    icone: 'dumbbell',
    descricao: 'Constância que constrói uma nova vida.',
    devocionais: [
      {
        versiculo: 'Todo aquele que luta de tudo se abstém; eles, para alcançar uma coroa corruptível; nós, porém, uma incorruptível.',
        referencia: '1 Coríntios 9:25',
        reflexao:
          'Disciplina é treino. O atleta abre mão de coisas boas por algo maior. Você também está em treinamento para a liberdade.',
        aplicacao: 'Escolha uma renúncia concreta para hoje.',
        oracao: 'Senhor, dá-me domínio próprio e constância. Amém.',
      },
      {
        versiculo: 'Deus não nos deu espírito de covardia, mas de poder, amor e moderação.',
        referencia: '2 Timóteo 1:7',
        reflexao:
          'O domínio próprio é um presente do Espírito, não só esforço seu. Você não está disciplinando sozinho.',
        aplicacao: 'Peça ao Espírito Santo domínio próprio para um momento difícil de hoje.',
        oracao: 'Espírito Santo, enche-me de poder, amor e moderação. Amém.',
      },
      {
        versiculo: 'Nenhuma disciplina parece, no momento, motivo de alegria... mas depois produz fruto de justiça.',
        referencia: 'Hebreus 12:11',
        reflexao:
          'O esforço de hoje parece pesado, mas o fruto vem depois. A liberdade é colhida por quem persiste no desconforto.',
        aplicacao: 'Faça hoje aquela coisa pequena que você vem adiando.',
        oracao: 'Pai, ajuda-me a não fugir do que me faz crescer. Amém.',
      },
      {
        versiculo: 'O que guarda a sua boca conserva a sua alma.',
        referencia: 'Provérbios 13:3',
        reflexao:
          'Pequenas escolhas guardam ou destroem. A disciplina nas pequenas coisas constrói a vitória nas grandes.',
        aplicacao: 'Cumpra hoje um dos seus hábitos, sem falhar.',
        oracao: 'Senhor, fiel nas pequenas coisas, eu Te entrego o meu dia. Amém.',
      },
    ],
  },
  {
    id: 'identidade',
    nome: 'Identidade em Cristo',
    icone: 'user',
    descricao: 'Quem você é aos olhos de Deus.',
    devocionais: [
      {
        versiculo: 'Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram.',
        referencia: '2 Coríntios 5:17',
        reflexao:
          'Você não é o seu vício. Em Cristo, você é uma nova criatura — sua identidade não é o seu pior dia.',
        aplicacao: 'Troque "eu sou um viciado" por "eu sou livre, em Cristo".',
        oracao: 'Pai, ajuda-me a me ver como Tu me vês: novo e amado. Amém.',
      },
      {
        versiculo: 'Vós sois geração eleita, sacerdócio real, povo adquirido.',
        referencia: '1 Pedro 2:9',
        reflexao:
          'Deus te chama de escolhido, real, precioso. A vergonha mente sobre quem você é; a Palavra diz a verdade.',
        aplicacao: 'Leia o versículo colocando seu nome nele.',
        oracao: 'Senhor, obrigado por me chamar de Teu. Amém.',
      },
      {
        versiculo: 'Nenhuma condenação há para os que estão em Cristo Jesus.',
        referencia: 'Romanos 8:1',
        reflexao:
          'A culpa te prende ao passado; a graça te liberta para recomeçar. Em Cristo, não há condenação — há restauração.',
        aplicacao: 'Receba o perdão de Deus por uma falha e siga em frente.',
        oracao: 'Jesus, recebo o Teu perdão e a Tua graça. Amém.',
      },
      {
        versiculo: 'Vós sois a luz do mundo.',
        referencia: 'Mateus 5:14',
        reflexao:
          'Sua vida transformada vira luz para quem ainda está no escuro. O que Deus cura em você, alcança outros.',
        aplicacao: 'Pense em alguém que pode se inspirar na sua mudança.',
        oracao: 'Senhor, que a minha vida brilhe a Tua luz. Amém.',
      },
    ],
  },
  {
    id: 'familia',
    nome: 'Família & Casamento',
    icone: 'heart',
    descricao: 'Amor, relacionamentos e os que você protege.',
    devocionais: [
      {
        versiculo: 'Eu e a minha casa serviremos ao Senhor.',
        referencia: 'Josué 24:15',
        reflexao:
          'Sua batalha não é só sua. Quando você se liberta, sua casa inteira respira diferente. Você luta por eles também.',
        aplicacao: 'Lembre-se de uma pessoa por quem vale a pena vencer.',
        oracao: 'Senhor, abençoa a minha casa e faz de mim alguém melhor para eles. Amém.',
      },
      {
        versiculo: 'Sobre tudo isto, revesti-vos do amor, que é o vínculo da perfeição.',
        referencia: 'Colossenses 3:14',
        reflexao:
          'O amor reconstrói o que o vício quebrou. Cada dia de liberdade é um tijolo de confiança na sua família.',
        aplicacao: 'Demonstre amor concreto a alguém da sua família hoje.',
        oracao: 'Pai, ensina-me a amar como Tu amas. Amém.',
      },
      {
        versiculo: 'O amor é paciente, é benigno... tudo sofre, tudo crê, tudo espera.',
        referencia: '1 Coríntios 13:4-7',
        reflexao:
          'A restauração leva tempo. Seja paciente com os outros e consigo mesmo — o amor não desiste.',
        aplicacao: 'Peça perdão ou ofereça perdão a alguém, se for preciso.',
        oracao: 'Senhor, enche-me de paciência e amor nos meus relacionamentos. Amém.',
      },
      {
        versiculo: 'Melhor é serem dois do que um... se um cair, o outro levanta o seu companheiro.',
        referencia: 'Eclesiastes 4:9-10',
        reflexao:
          'Ninguém vence sozinho. Caminhar com alguém de confiança multiplica a sua força.',
        aplicacao: 'Convide alguém para ser seu parceiro de jornada.',
        oracao: 'Deus, coloca pessoas certas ao meu lado nesta caminhada. Amém.',
      },
    ],
  },
  {
    id: 'esperanca',
    nome: 'Esperança',
    icone: 'sunrise',
    descricao: 'Força para recomeçar e seguir firme.',
    devocionais: [
      {
        versiculo: 'As misericórdias do Senhor se renovam a cada manhã; grande é a tua fidelidade.',
        referencia: 'Lamentações 3:22-23',
        reflexao:
          'Cada manhã é uma nova chance. Mesmo depois de uma queda, a misericórdia de Deus já está nova esperando por você.',
        aplicacao: 'Comece o dia agradecendo por mais uma chance.',
        oracao: 'Senhor, obrigado pela misericórdia nova de hoje. Amém.',
      },
      {
        versiculo: 'Os que esperam no Senhor renovarão as suas forças.',
        referencia: 'Isaías 40:31',
        reflexao:
          'Esperar em Deus não é ficar parado — é confiar enquanto se caminha. A força vem para quem persevera.',
        aplicacao: 'Quando bater o cansaço hoje, pare e ore em vez de desistir.',
        oracao: 'Deus, renova as minhas forças. Eu espero em Ti. Amém.',
      },
      {
        versiculo: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo.',
        referencia: 'Salmos 23:4',
        reflexao:
          'O vale faz parte do caminho. Mas você não o atravessa sozinho — o Pastor caminha ao seu lado.',
        aplicacao: 'No momento mais difícil de hoje, diga: "Tu estás comigo".',
        oracao: 'Senhor, no meu vale, sê a minha companhia e coragem. Amém.',
      },
      {
        versiculo: 'Aquele que em vós começou a boa obra a aperfeiçoará.',
        referencia: 'Filipenses 1:6',
        reflexao:
          'Deus não desiste de você no meio do caminho. Ele termina o que começou — sua libertação é obra d’Ele.',
        aplicacao: 'Confie hoje que Deus vai te levar até o fim.',
        oracao: 'Pai, eu creio que Tu vais completar em mim a minha libertação. Amém.',
      },
    ],
  },
]
