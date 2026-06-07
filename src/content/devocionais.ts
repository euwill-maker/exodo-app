export interface VersiculoApoio {
  texto: string
  ref: string
}

export interface Devocional {
  versiculo: string
  referencia: string
  contexto: string
  reflexao: string
  pergunta: string
  aplicacao: string
  oracao: string
  apoio: VersiculoApoio[]
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
        contexto:
          'Jesus falava a judeus que se diziam livres por serem descendentes de Abraão. Ele revela que existe uma escravidão mais profunda que a política: a escravidão do pecado — e só Ele pode libertar dela de verdade.',
        reflexao:
          'Existe uma diferença entre estar "controlando" um vício e ser livre dele. O controle depende da sua força e cansa; a liberdade vem de fora de você, de Cristo. Por isso a sua libertação não depende de você ser forte o suficiente — depende de você se entregar Àquele que já venceu. Cada dia que você confia n’Ele, em vez de confiar na sua força de vontade, você experimenta um pouco mais dessa liberdade real.',
        pergunta:
          'Em que área você ainda está tentando vencer "na sua força" em vez de entregar a Deus?',
        aplicacao: 'Escreva uma frase descrevendo como será a sua vida livre — e leia em voz alta.',
        oracao:
          'Jesus, eu não quero apenas controlar este vício, quero ser livre. Liberta-me de verdade e me ensina a depender de Ti, e não da minha força. Amém.',
        apoio: [
          { texto: 'Para a liberdade foi que Cristo nos libertou.', ref: 'Gálatas 5:1' },
          { texto: 'Onde está o Espírito do Senhor, aí há liberdade.', ref: '2 Coríntios 3:17' },
        ],
      },
      {
        versiculo: 'Eis que ponho diante de ti a vida e a morte; escolhe, pois, a vida.',
        referencia: 'Deuteronômio 30:19',
        contexto:
          'Moisés fala ao povo de Israel antes de entrarem na Terra Prometida. Deus poderia ter forçado a obediência, mas Ele entrega uma escolha — porque a liberdade só é real quando é escolhida.',
        reflexao:
          'A libertação não acontece uma vez só; ela é escolhida de novo a cada manhã. Sair do Egito foi um milagre, mas caminhar no deserto foi uma decisão diária de não voltar. Você também vai escolher a vida muitas vezes hoje: ao acordar, no momento do gatilho, antes de dormir. Cada pequena escolha pela vida enfraquece a velha escravidão e fortalece o novo caminho.',
        pergunta: 'Qual será a sua próxima "escolha pela vida" nas próximas horas?',
        aplicacao: 'Reafirme hoje a sua Declaração de Liberdade, em voz alta, logo ao acordar.',
        oracao: 'Pai, hoje eu escolho a vida. Sustenta a minha decisão quando ela ficar difícil. Amém.',
        apoio: [
          { texto: 'Escolhei hoje a quem sirvais... eu e a minha casa serviremos ao Senhor.', ref: 'Josué 24:15' },
          { texto: 'Considerai-vos mortos para o pecado e vivos para Deus.', ref: 'Romanos 6:11' },
        ],
      },
      {
        versiculo: 'Estai firmes na liberdade com que Cristo nos libertou.',
        referencia: 'Gálatas 5:1',
        contexto:
          'Paulo escreve a cristãos que, depois de libertos, estavam voltando a velhas amarras. O alerta é claro: é possível ser livre e, por descuido, voltar para a prisão.',
        reflexao:
          'Conquistar a liberdade é uma batalha; permanecer livre é outra. O inimigo não desiste só porque você teve uma vitória — ele espera o momento de descuido. Por isso a liberdade precisa ser guardada com vigilância e com novos hábitos que ocupem o lugar do vício. Ficar "firme" não é tensão o tempo todo; é construir uma vida tão cheia de coisas boas que não sobra espaço para a antiga escravidão.',
        pergunta: 'Que "porta" você precisa fechar hoje para não voltar às antigas correntes?',
        aplicacao: 'Identifique um gatilho de hoje e prepare, agora, a sua resposta para ele.',
        oracao: 'Senhor, ajuda-me a permanecer firme. Que eu não troque a liberdade por um instante de prazer. Amém.',
        apoio: [
          { texto: 'Vigiai e orai, para que não entreis em tentação.', ref: 'Mateus 26:41' },
          { texto: 'Aquele que pensa estar em pé, veja que não caia.', ref: '1 Coríntios 10:12' },
        ],
      },
      {
        versiculo: 'O Espírito do Senhor está sobre mim... para proclamar liberdade aos cativos.',
        referencia: 'Lucas 4:18',
        contexto:
          'Jesus inicia seu ministério lendo essa profecia de Isaías na sinagoga e dizendo: "hoje se cumpriu". Ele se apresenta ao mundo como o Libertador dos cativos.',
        reflexao:
          'Repare em quem Jesus veio buscar: os cativos, os quebrantados, os oprimidos. A sua prisão não te desqualifica do amor de Deus — ela é justamente o motivo da vinda d’Ele. A vergonha sussurra que você está longe demais; a verdade é que o lugar onde você se sente mais preso é exatamente onde Jesus quer entrar e agir. Você não precisa se limpar antes de vir; venha como está, e Ele liberta.',
        pergunta: 'Que corrente você acha "vergonhosa demais" para entregar a Deus? Entregue justamente essa.',
        aplicacao: 'Em oração, diga a Deus, com todas as letras, a corrente que mais te prende.',
        oracao: 'Espírito Santo, vem quebrar o que me aprisiona. Eu Te recebo na minha área mais fraca. Amém.',
        apoio: [
          { texto: 'Perto está o Senhor dos que têm o coração quebrantado.', ref: 'Salmos 34:18' },
          { texto: 'Não vim chamar justos, mas pecadores ao arrependimento.', ref: 'Lucas 5:32' },
        ],
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
        contexto:
          'Paulo escreveu isso preso, podendo ser executado a qualquer momento. Ou seja, não é o conselho de alguém numa vida tranquila — é a paz testada na pior das circunstâncias.',
        reflexao:
          'A ansiedade tenta carregar, hoje, o peso de um amanhã que talvez nem chegue. Deus não promete tirar todos os problemas, mas promete trocar a ansiedade por paz quando você entrega tudo a Ele em oração. Repare na ordem: primeiro você ora e entrega; depois vem a paz que "excede todo entendimento" — uma calma que não faz sentido para o tamanho do problema, mas que guarda o seu coração como um soldado guarda um portão.',
        pergunta: 'Qual preocupação específica você precisa entregar a Deus agora, em vez de remoer?',
        aplicacao: 'Escreva uma preocupação num papel (ou no diário) e ore entregando-a, item por item.',
        oracao: 'Senhor, entrego a Ti aquilo que aperta o meu peito. Guarda o meu coração na Tua paz. Amém.',
        apoio: [
          { texto: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.', ref: '1 Pedro 5:7' },
          { texto: 'Deixo-vos a paz, a minha paz vos dou.', ref: 'João 14:27' },
        ],
      },
      {
        versiculo: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
        referencia: '1 Pedro 5:7',
        contexto:
          'Pedro escreve a cristãos perseguidos e espalhados. A palavra "lançar" é forte: significa jogar de uma vez, como quem tira um fardo pesado das costas e atira longe.',
        reflexao:
          'Existe uma diferença entre carregar a ansiedade e lançá-la. Muita gente "ora" e continua segurando o peso, voltando a ele minutos depois. Lançar é decidir que aquilo agora pertence a Deus, não a você. E o motivo é lindo: "porque Ele tem cuidado de vós". Você não joga seus medos num vazio — joga nas mãos de um Pai que se importa com cada detalhe da sua vida.',
        pergunta: 'O que faz você "pegar de volta" a ansiedade depois de já ter orado?',
        aplicacao: 'Quando a ansiedade voltar hoje, respire fundo 3 vezes e diga: "Deus cuida de mim".',
        oracao: 'Pai, eu não vou mais carregar isto sozinho. Eu lanço sobre Ti, porque sei que Tu cuidas de mim. Amém.',
        apoio: [
          { texto: 'O Senhor é o meu pastor; nada me faltará.', ref: 'Salmos 23:1' },
          { texto: 'Ainda que eu andasse pelo vale... tu estás comigo.', ref: 'Salmos 23:4' },
        ],
      },
      {
        versiculo: 'Em silêncio e confiança estará a vossa força.',
        referencia: 'Isaías 30:15',
        contexto:
          'Israel, ameaçado, queria correr para alianças e soluções humanas. Deus os chama a parar e confiar — algo que, para quem está em pânico, parece a coisa mais difícil do mundo.',
        reflexao:
          'Nem toda batalha se vence na correria. A ansiedade nos empurra para a ação impulsiva — e é justamente nesse impulso que muitas recaídas acontecem. Deus oferece um caminho contrário: aquietar-se e confiar. O silêncio diante de Deus não é passividade; é a força de quem sabe que não precisa resolver tudo agora, porque Alguém maior está no controle.',
        pergunta: 'O que mudaria se, no próximo momento de aflição, você parasse 2 minutos antes de reagir?',
        aplicacao: 'Reserve hoje 2 minutos de silêncio total, só para estar com Deus, sem pedir nada.',
        oracao: 'Senhor, no silêncio eu Te encontro. Aquieta o meu interior e renova as minhas forças. Amém.',
        apoio: [
          { texto: 'Aquietai-vos e sabei que eu sou Deus.', ref: 'Salmos 46:10' },
          { texto: 'Os que esperam no Senhor renovarão as suas forças.', ref: 'Isaías 40:31' },
        ],
      },
      {
        versiculo: 'Vinde a mim todos os que estais cansados, e eu vos aliviarei.',
        referencia: 'Mateus 11:28',
        contexto:
          'Jesus faz esse convite a pessoas esmagadas por regras religiosas impossíveis. Ele oferece descanso a quem está exausto de tentar ser bom o suficiente.',
        reflexao:
          'Repare que Jesus não diz "melhorem e depois venham". Ele chama os cansados exatamente como estão. A luta contra um vício cansa a alma — o ciclo de cair, se odiar, prometer e cair de novo é exaustivo. O convite de Cristo é vir com esse cansaço todo e receber alívio. Descanso não é desistir da batalha; é parar de lutar sozinho e deixar Ele carregar você.',
        pergunta: 'Você está tentando "se consertar" antes de vir a Deus? O que mudaria se viesse cansado, como está?',
        aplicacao: 'Diga a Deus, com sinceridade e sem rodeios, o quanto você está cansado hoje.',
        oracao: 'Jesus, eu venho cansado, do jeito que estou. Dá-me o Teu descanso e carrega comigo este peso. Amém.',
        apoio: [
          { texto: 'Ele dá força ao cansado e multiplica as forças ao que não tem nenhum vigor.', ref: 'Isaías 40:29' },
          { texto: 'A minha graça te basta.', ref: '2 Coríntios 12:9' },
        ],
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
        contexto:
          'Parte do Sermão do Monte, onde Jesus redefine a felicidade. "Limpo de coração" fala de integridade — alguém com um coração inteiro, não dividido entre Deus e os ídolos.',
        reflexao:
          'Pureza não é nunca ter um mau pensamento; é não acolher e cultivar esse pensamento. A diferença entre tentação e pecado está no que você faz quando o pensamento chega. O coração limpo "vê a Deus" — ou seja, mantém a comunhão com Ele clara, sem a névoa da culpa. Quando você escolhe a pureza, não está só evitando algo ruim: está protegendo a sua intimidade com Deus.',
        pergunta: 'Que pensamento recorrente você costuma "hospedar" em vez de despachar?',
        aplicacao: 'Hoje, ao surgir um pensamento impuro, troque-o imediatamente por um versículo decorado.',
        oracao: 'Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto. Amém.',
        apoio: [
          { texto: 'Cria em mim, ó Deus, um coração puro.', ref: 'Salmos 51:10' },
          { texto: 'Tudo o que é puro... nisto pensai.', ref: 'Filipenses 4:8' },
        ],
      },
      {
        versiculo: 'Como purificará o jovem o seu caminho? Observando-o conforme a tua palavra.',
        referencia: 'Salmos 119:9',
        contexto:
          'O Salmo 119 é uma longa celebração da Palavra de Deus. Aqui, o salmista responde a uma pergunta prática: como se manter puro num mundo cheio de armadilhas?',
        reflexao:
          'A resposta de Deus para a pureza não é "esforce-se mais", e sim "encha-se da minha Palavra". A mente é como um jardim: se você não planta o bom, o mato cresce sozinho. Quanto mais a Palavra ocupa o seu pensamento, menos espaço sobra para o que escraviza. Não é sobre ler a Bíblia por obrigação — é sobre deixar que ela reprograme, aos poucos, a forma como você vê tudo.',
        pergunta: 'Qual versículo você poderia carregar hoje como um "filtro" para a sua mente?',
        aplicacao: 'Escolha um versículo curto e repita-o 3 vezes ao longo do dia.',
        oracao: 'Senhor, que a Tua Palavra limpe e guarde o meu caminho. Enche a minha mente com a Tua verdade. Amém.',
        apoio: [
          { texto: 'Já estais limpos pela palavra que vos tenho falado.', ref: 'João 15:3' },
          { texto: 'Escondi a tua palavra no meu coração, para eu não pecar contra ti.', ref: 'Salmos 119:11' },
        ],
      },
      {
        versiculo: 'Transformai-vos pela renovação da vossa mente.',
        referencia: 'Romanos 12:2',
        contexto:
          'Paulo contrasta dois caminhos: "amoldar-se a este mundo" ou "transformar-se". A palavra para transformação é a mesma de metamorfose — uma mudança profunda, de dentro para fora.',
        reflexao:
          'O vício mora em padrões de pensamento gravados pela repetição. Por isso a libertação não é só parar um comportamento — é trocar a tubulação por onde os pensamentos correm. Isso é um processo, não um clique. Cada vez que você escolhe uma verdade no lugar de uma mentira antiga, abre um novo caminho no cérebro. Com o tempo, o novo caminho vira o automático, e o antigo seca.',
        pergunta: 'Que mentira você acredita sobre si mesmo que precisa ser trocada por uma verdade de Deus?',
        aplicacao: 'Escreva uma mentira que você repete sobre si e, ao lado, a verdade bíblica que a substitui.',
        oracao: 'Deus, renova a minha mente. Tira de mim os velhos padrões e forma em mim o pensar de Cristo. Amém.',
        apoio: [
          { texto: 'Sede renovados no espírito da vossa mente.', ref: 'Efésios 4:23' },
          { texto: 'Nós, porém, temos a mente de Cristo.', ref: '1 Coríntios 2:16' },
        ],
      },
      {
        versiculo: 'Tudo me é lícito, mas nem tudo convém; eu não me deixarei dominar por nada.',
        referencia: '1 Coríntios 6:12',
        contexto:
          'Em Corinto, uma cidade marcada pela imoralidade, alguns usavam a graça como desculpa para tudo. Paulo responde com uma definição madura de liberdade.',
        reflexao:
          'Liberdade não é poder fazer tudo — é não ser dominado por nada. Quem precisa de algo para se sentir bem, na verdade é servo daquilo. A pergunta que liberta não é "isso é proibido?", e sim "isso me domina?". Quando você diz não a um pequeno impulso de propósito, está treinando o músculo da liberdade e mostrando a si mesmo quem está no comando.',
        pergunta: 'O que, hoje, mais ameaça te "dominar" — e como você pode mostrar que não manda em você?',
        aplicacao: 'Diga não, de propósito, a um pequeno impulso hoje (mesmo que inofensivo) só para treinar o domínio próprio.',
        oracao: 'Senhor, que nada me domine além do Teu amor. Dá-me domínio próprio nas pequenas coisas. Amém.',
        apoio: [
          { texto: 'O fruto do Espírito é... domínio próprio.', ref: 'Gálatas 5:22-23' },
          { texto: 'Como cidade derribada... é o homem que não pode conter o seu espírito.', ref: 'Provérbios 25:28' },
        ],
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
        contexto:
          'Deus fala a um povo no exílio, longe de casa, sentindo que tinha perdido tudo. É nesse cenário de fracasso aparente que Ele promete um futuro.',
        reflexao:
          'Você não está apenas fugindo de um vício — está caminhando em direção a um propósito. Quem só foge cansa e volta; quem caminha para algo encontra força para seguir. Deus tem planos para a sua vida que o vício estava roubando. A liberdade abre espaço para esses planos voltarem a respirar. Lembre-se: a promessa de Jeremias veio justamente quando tudo parecia perdido.',
        pergunta: 'O que o vício estava te impedindo de viver, sonhar ou construir?',
        aplicacao: 'Escreva um sonho concreto que a sua liberdade vai te permitir realizar.',
        oracao: 'Pai, mostra-me o propósito para o qual me criaste. Que minha liberdade sirva a algo maior. Amém.',
        apoio: [
          { texto: 'Tudo coopera para o bem daqueles que amam a Deus.', ref: 'Romanos 8:28' },
          { texto: 'Somos feitura sua, criados em Cristo Jesus para boas obras.', ref: 'Efésios 2:10' },
        ],
      },
      {
        versiculo: 'Corramos com perseverança a carreira que nos está proposta.',
        referencia: 'Hebreus 12:1',
        contexto:
          'O autor compara a vida de fé a uma corrida, rodeada por uma "nuvem de testemunhas" — pessoas que venceram antes e torcem por você.',
        reflexao:
          'A jornada da liberdade é uma corrida de longa distância, não uma arrancada de 100 metros. O segredo não é velocidade, é perseverança. Vai ter trecho difícil, vai ter cansaço, mas desistir nunca é o fim enquanto você puder dar o próximo passo. E você não corre sozinho: muitos já trilharam esse caminho e venceram — prova de que é possível.',
        pergunta: 'O que você precisa "tirar do peso" hoje para correr mais leve?',
        aplicacao: 'Comemore um avanço de hoje, por menor que seja — celebrar combustível a perseverança.',
        oracao: 'Deus, dá-me perseverança para correr até o fim, mesmo quando as pernas pesarem. Amém.',
        apoio: [
          { texto: 'Combati o bom combate, acabei a carreira, guardei a fé.', ref: '2 Timóteo 4:7' },
          { texto: 'Não desfaleçamos de fazer o bem... a seu tempo ceifaremos.', ref: 'Gálatas 6:9' },
        ],
      },
      {
        versiculo: 'Fostes chamados para a liberdade... servi-vos uns aos outros pelo amor.',
        referencia: 'Gálatas 5:13',
        contexto:
          'Paulo equilibra dois extremos: a liberdade não é desculpa para fazer o que quiser, nem volta às regras antigas — ela existe para amar.',
        reflexao:
          'A sua liberdade tem um propósito maior do que você mesmo. Quando você se cura, vira esperança para quem ainda está preso. Servir os outros, além de bom, é terapêutico: tira o foco da sua própria luta e o coloca em algo maior. Muitas vezes, ajudar alguém a dar o primeiro passo fortalece a sua própria caminhada de um jeito que nenhuma técnica conseguiria.',
        pergunta: 'Quem ao seu redor poderia ser encorajado pela sua história de mudança?',
        aplicacao: 'Faça hoje um bem concreto a alguém, mesmo que pequeno e anônimo.',
        oracao: 'Senhor, usa a minha história e a minha liberdade para abençoar outras pessoas. Amém.',
        apoio: [
          { texto: 'Há mais felicidade em dar do que em receber.', ref: 'Atos 20:35' },
          { texto: 'De graça recebestes, de graça dai.', ref: 'Mateus 10:8' },
        ],
      },
      {
        versiculo: 'Tudo posso naquele que me fortalece.',
        referencia: 'Filipenses 4:13',
        contexto:
          'Versículo muito citado, mas escrito por um homem preso, que aprendeu a viver "tanto na fartura como na fome". A força que ele descreve é a de quem se contenta em Cristo, em qualquer situação.',
        reflexao:
          'O "tudo posso" não é uma promessa de superpoder pessoal — é a confiança de que, com Cristo, você aguenta qualquer circunstância. A força não vem de você se esforçar mais; vem de Ele agir em você. Isso muda a luta: você não precisa ser forte o suficiente sozinho, só precisa permanecer ligado n’Aquele que é. A vitória de hoje é d’Ele em você.',
        pergunta: 'Em que momento de hoje você mais vai precisar lembrar que a força é d’Ele, não sua?',
        aplicacao: 'Antes do momento mais difícil do seu dia, diga em voz alta: "Em Cristo, eu venço isto".',
        oracao: 'Senhor, em Ti está a minha força. Vence em mim hoje aquilo que eu não consigo vencer sozinho. Amém.',
        apoio: [
          { texto: 'O Senhor é a minha força e o meu cântico.', ref: 'Êxodo 15:2' },
          { texto: 'A alegria do Senhor é a vossa força.', ref: 'Neemias 8:10' },
        ],
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
        versiculo: 'Todo aquele que luta de tudo se abstém... nós, para alcançar uma coroa incorruptível.',
        referencia: '1 Coríntios 9:25',
        contexto:
          'Paulo usa a imagem dos atletas dos Jogos, que treinavam meses com rigor por uma coroa de folhas que murchava. Ele diz: nós treinamos por algo eterno.',
        reflexao:
          'Disciplina é treino, e todo atleta abre mão de coisas boas por um objetivo maior. Você está em treinamento para a liberdade. As renúncias de hoje parecem perdas, mas são investimentos: cada "não" dito ao vício é uma repetição que te deixa mais forte. E a sua coroa não murcha — é uma vida transformada, que dura.',
        pergunta: 'Qual renúncia concreta te aproximaria da sua "coroa" hoje?',
        aplicacao: 'Escolha uma renúncia específica para hoje e cumpra-a como um treino.',
        oracao: 'Senhor, dá-me disciplina e domínio próprio. Que eu troque o prazer passageiro pela vitória que permanece. Amém.',
        apoio: [
          { texto: 'Esforçai-vos e tende bom ânimo.', ref: 'Josué 1:9' },
          { texto: 'Exercita-te a ti mesmo na piedade.', ref: '1 Timóteo 4:7' },
        ],
      },
      {
        versiculo: 'Deus não nos deu espírito de covardia, mas de poder, amor e moderação.',
        referencia: '2 Timóteo 1:7',
        contexto:
          'Paulo encoraja Timóteo, um jovem líder tímido, lembrando-o do que Deus colocou dentro dele pelo Espírito.',
        reflexao:
          'O domínio próprio (moderação) não é só esforço seu — é um presente do Espírito de Deus. Isso muda tudo: você não está disciplinando a si mesmo na base da força bruta, está cooperando com algo que Deus já colocou em você. Quando vier o pensamento "eu não tenho controle nenhum", lembre: Deus te deu espírito de poder. Peça acesso a esse poder no momento da fraqueza.',
        pergunta: 'Você tem tentado vencer "na covardia do medo" ou "no poder" que Deus te deu?',
        aplicacao: 'No próximo momento de fraqueza, peça em voz alta: "Espírito Santo, me dá domínio próprio agora".',
        oracao: 'Espírito Santo, enche-me de poder, amor e domínio próprio. A força não é minha, é Tua. Amém.',
        apoio: [
          { texto: 'O fruto do Espírito é... domínio próprio.', ref: 'Gálatas 5:22-23' },
          { texto: 'Posso todas as coisas naquele que me fortalece.', ref: 'Filipenses 4:13' },
        ],
      },
      {
        versiculo: 'Nenhuma disciplina parece, no momento, motivo de alegria... mas depois produz fruto.',
        referencia: 'Hebreus 12:11',
        contexto:
          'O autor fala da disciplina como prova de amor — assim como um bom pai corrige o filho que ama, visando o bem dele.',
        reflexao:
          'O esforço de hoje quase nunca parece agradável na hora. É por isso que tanta gente desiste: troca o fruto futuro pelo alívio imediato. Mas Deus promete que a disciplina, embora dolorosa agora, "produz fruto de justiça" — uma colheita de paz para quem persevera. O segredo é olhar além do desconforto de agora e enxergar a pessoa livre que você está se tornando.',
        pergunta: 'Que pequena coisa você vem adiando que, feita hoje, plantaria um bom fruto?',
        aplicacao: 'Faça hoje aquela tarefa pequena e chata que você vem evitando.',
        oracao: 'Pai, ajuda-me a não fugir do que dói agora mas me liberta depois. Confio no fruto que virá. Amém.',
        apoio: [
          { texto: 'A seu tempo ceifaremos, se não desfalecermos.', ref: 'Gálatas 6:9' },
          { texto: 'Os que semeiam em lágrimas segarão com alegria.', ref: 'Salmos 126:5' },
        ],
      },
      {
        versiculo: 'O que guarda a sua boca conserva a sua alma.',
        referencia: 'Provérbios 13:3',
        contexto:
          'Provérbios é um livro de sabedoria prática. Aqui, ele liga as pequenas escolhas do dia a dia (até o falar) com a saúde da alma.',
        reflexao:
          'A liberdade não se ganha numa grande decisão heroica, mas em centenas de pequenas escolhas diárias. Quem é fiel no pequeno constrói força para o grande. O contrário também é verdade: as pequenas "bobaginhas" toleradas viram as grandes quedas de amanhã. Vencer hoje em um detalhe — um hábito, um limite, uma palavra — é treinar a alma para a vitória maior.',
        pergunta: 'Qual "pequena coisa" você tem deixado passar que, somada, te enfraquece?',
        aplicacao: 'Cumpra hoje um dos seus hábitos sem falhar, por menor que ele seja.',
        oracao: 'Senhor, ajuda-me a ser fiel nas pequenas coisas, sabendo que é nelas que se constrói a vitória. Amém.',
        apoio: [
          { texto: 'Quem é fiel no pouco também é fiel no muito.', ref: 'Lucas 16:10' },
          { texto: 'As raposinhas que estragam as vinhas.', ref: 'Cantares 2:15' },
        ],
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
        contexto:
          'Paulo descreve o que acontece com quem se entrega a Cristo: não é uma reforma, é um recomeço. A pessoa antiga não é melhorada — ela dá lugar a uma nova.',
        reflexao:
          'Você não é o seu vício. O vício é algo que você faz (ou fez), não quem você é. A vergonha gosta de transformar comportamento em identidade: "eu sou um fracasso, eu sou um viciado". A verdade de Deus é outra: em Cristo, você é uma nova criatura. Mudar a forma como você se vê é metade da batalha — porque ninguém age por muito tempo de forma diferente de quem acredita ser.',
        pergunta: 'Que rótulo você coloca em si mesmo que Deus não usa para te chamar?',
        aplicacao: 'Troque hoje a frase "eu sou um viciado" por "eu sou livre, uma nova criatura em Cristo".',
        oracao: 'Pai, ajuda-me a me ver como Tu me vês: novo, amado e livre. Amém.',
        apoio: [
          { texto: 'Já não vivo eu, mas Cristo vive em mim.', ref: 'Gálatas 2:20' },
          { texto: 'Agora sois filhos de Deus.', ref: '1 João 3:2' },
        ],
      },
      {
        versiculo: 'Vós sois geração eleita, sacerdócio real, povo adquirido.',
        referencia: '1 Pedro 2:9',
        contexto:
          'Pedro empilha títulos de honra que, no Antigo Testamento, eram só para o povo escolhido e os sacerdotes — e os aplica a pessoas comuns que creem em Cristo.',
        reflexao:
          'Deus te define com palavras de honra: escolhido, real, precioso, d’Ele. Compare isso com as palavras que a vergonha usa: sujo, fracassado, sem jeito. Uma dessas vozes está mentindo — e não é a de Deus. Quando você se lembra de quem é (alguém da realeza do Céu), fica mais difícil se contentar com a lama do vício. Identidade muda comportamento.',
        pergunta: 'Se você realmente acreditasse que é "precioso e escolhido", o que faria diferente hoje?',
        aplicacao: 'Leia o versículo em voz alta, colocando o seu próprio nome no lugar de "vós".',
        oracao: 'Senhor, obrigado por me chamar de Teu, escolhido e precioso. Que eu viva à altura desse chamado. Amém.',
        apoio: [
          { texto: 'Eu te chamei pelo teu nome; tu és meu.', ref: 'Isaías 43:1' },
          { texto: 'Com amor eterno eu te amei.', ref: 'Jeremias 31:3' },
        ],
      },
      {
        versiculo: 'Agora, pois, nenhuma condenação há para os que estão em Cristo Jesus.',
        referencia: 'Romanos 8:1',
        contexto:
          'Depois de descrever sua própria luta interna ("o bem que quero, não faço"), Paulo anuncia a libertação: em Cristo, o veredito sobre você mudou.',
        reflexao:
          'A culpa te prende ao passado; a graça te liberta para recomeçar. Muita recaída acontece por causa da condenação: "já estraguei tudo mesmo, então tanto faz". Mas Deus diz que não há condenação para quem está em Cristo. Isso não é licença para pecar — é o combustível para se levantar rápido. Quem sabe que é perdoado se reergue; quem se afoga em culpa, afunda.',
        pergunta: 'Que falha do passado você ainda usa para se condenar — e precisa entregar à graça?',
        aplicacao: 'Receba, em oração, o perdão de Deus por uma falha específica — e siga em frente sem se castigar.',
        oracao: 'Jesus, recebo o Teu perdão. Tiro de mim o peso da condenação e me levanto pela Tua graça. Amém.',
        apoio: [
          { texto: 'Quão longe está o Oriente do Ocidente, assim afasta de nós as nossas transgressões.', ref: 'Salmos 103:12' },
          { texto: 'Se confessarmos os nossos pecados, ele é fiel para os perdoar.', ref: '1 João 1:9' },
        ],
      },
      {
        versiculo: 'Vós sois a luz do mundo.',
        referencia: 'Mateus 5:14',
        contexto:
          'No Sermão do Monte, Jesus diz isso a pescadores e gente comum — não a heróis religiosos. Ele vê neles (e em você) potencial de iluminar o mundo.',
        reflexao:
          'A sua história de transformação não é só sua — ela vira luz para quem ainda está no escuro. O que Deus cura em você se torna esperança para outros que lutam em silêncio. Isso dá um novo sentido à sua batalha: você não está apenas se salvando, está se preparando para acender a luz na vida de alguém. A sua liberdade pode ser o testemunho que liberta outra pessoa.',
        pergunta: 'Quem poderia enxergar uma saída ao ver a sua mudança?',
        aplicacao: 'Pense em uma pessoa que sua transformação pode inspirar — e ore por ela hoje.',
        oracao: 'Senhor, que a minha vida brilhe a Tua luz e mostre a outros que a liberdade é possível. Amém.',
        apoio: [
          { texto: 'Assim resplandeça a vossa luz diante dos homens.', ref: 'Mateus 5:16' },
          { texto: 'Eu sou a luz do mundo.', ref: 'João 8:12' },
        ],
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
        contexto:
          'No fim da vida, Josué desafia o povo a escolher a quem servir e declara sua decisão pessoal, em nome de toda a sua casa.',
        reflexao:
          'A sua batalha nunca é só sua. Quando você se liberta, a casa inteira respira diferente — há mais presença, mais paz, mais confiança. O vício rouba não só de você, mas de quem te ama. Por isso, lutar pela sua liberdade é também um ato de amor pela sua família. Você não vence apenas por si; vence por eles também.',
        pergunta: 'Quem da sua família mais se beneficia quando você está livre?',
        aplicacao: 'Lembre-se hoje de uma pessoa por quem vale a pena vencer — e deixe isso te motivar.',
        oracao: 'Senhor, abençoa a minha casa. Faz de mim alguém melhor e mais presente para quem eu amo. Amém.',
        apoio: [
          { texto: 'Crê no Senhor Jesus e serás salvo, tu e a tua casa.', ref: 'Atos 16:31' },
          { texto: 'A coroa dos velhos são os filhos dos filhos.', ref: 'Provérbios 17:6' },
        ],
      },
      {
        versiculo: 'Sobre tudo isto, revesti-vos do amor, que é o vínculo da perfeição.',
        referencia: 'Colossenses 3:14',
        contexto:
          'Paulo lista virtudes a "vestir" (compaixão, paciência, perdão) e coloca o amor por cima de tudo, como o cinto que prende todas as outras.',
        reflexao:
          'O vício costuma deixar feridas nos relacionamentos: confiança quebrada, promessas não cumpridas. A boa notícia é que o amor reconstrói. Cada dia de liberdade é um tijolo de confiança colocado de volta. Não espere reconstruir tudo de uma vez; o amor é paciente e age no tempo. Vista o amor hoje, mesmo nos pequenos gestos, e deixe que ele cure o que foi danificado.',
        pergunta: 'Que relacionamento o vício feriu e que o amor pode começar a curar?',
        aplicacao: 'Demonstre amor concreto a alguém da sua família hoje — um gesto, uma palavra, um tempo.',
        oracao: 'Pai, ensina-me a amar como Tu amas e a reconstruir, com paciência, o que foi quebrado. Amém.',
        apoio: [
          { texto: 'O amor cobre a multidão de pecados.', ref: '1 Pedro 4:8' },
          { texto: 'Amados, amemo-nos uns aos outros, porque o amor é de Deus.', ref: '1 João 4:7' },
        ],
      },
      {
        versiculo: 'O amor é paciente, é benigno... tudo sofre, tudo crê, tudo espera.',
        referencia: '1 Coríntios 13:4-7',
        contexto:
          'O famoso "capítulo do amor", escrito a uma igreja cheia de conflitos. Paulo mostra que dons e esforços sem amor não valem nada.',
        reflexao:
          'A restauração leva tempo, e o amor é o que sustenta a espera. Seja paciente com as pessoas que ainda desconfiam de você — a confiança se reconquista com constância, não com palavras. E seja paciente consigo mesmo: você está em processo. O amor "tudo espera", inclusive espera o melhor de você. Apoie-se nesse amor nos dias em que você mesmo duvidar.',
        pergunta: 'Você precisa pedir perdão a alguém, ou perdoar alguém, para seguir mais leve?',
        aplicacao: 'Se for o caso, peça perdão ou ofereça perdão a alguém hoje — destrava o coração.',
        oracao: 'Senhor, enche-me de paciência e amor. Cura as feridas dos meus relacionamentos. Amém.',
        apoio: [
          { texto: 'Suportando-vos uns aos outros e perdoando-vos.', ref: 'Colossenses 3:13' },
          { texto: 'Se perdoardes aos homens... também vosso Pai vos perdoará.', ref: 'Mateus 6:14' },
        ],
      },
      {
        versiculo: 'Melhor é serem dois do que um... se um cair, o outro levanta o seu companheiro.',
        referencia: 'Eclesiastes 4:9-10',
        contexto:
          'O Eclesiastes reflete sobre a vida e conclui, neste trecho, que o isolamento é perigoso e a parceria é uma força.',
        reflexao:
          'Ninguém vence sozinho. O segredo do vício é o isolamento e o segredo guardado — é no escondido que ele cresce. Quando você caminha com alguém de confiança, a luz entra na escuridão e a força se multiplica. Ter um "parceiro de jornada" (um amigo, um mentor, alguém da igreja) não é fraqueza; é sabedoria. Quem se ergue mais rápido é quem tem uma mão estendida por perto.',
        pergunta: 'Quem poderia ser o seu parceiro de jornada — alguém com quem você possa ser 100% sincero?',
        aplicacao: 'Convide hoje uma pessoa de confiança para te acompanhar nesta caminhada.',
        oracao: 'Deus, coloca ao meu lado pessoas certas. Dá-me coragem de não lutar mais sozinho. Amém.',
        apoio: [
          { texto: 'Confessai as vossas culpas uns aos outros e orai uns pelos outros.', ref: 'Tiago 5:16' },
          { texto: 'O amigo ama em todo o tempo, e na angústia é como um irmão.', ref: 'Provérbios 17:17' },
        ],
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
        contexto:
          'Escrito em meio à destruição de Jerusalém, em um dos livros mais tristes da Bíblia. No fundo do poço, o autor acha um motivo para esperar: a misericórdia que não acaba.',
        reflexao:
          'Toda manhã é uma nova chance — não importa o tamanho do tropeço de ontem. Deus não distribui a misericórdia com conta-gotas; ela se renova inteira a cada amanhecer. Isso significa que uma recaída não cancela a sua jornada; é só um dia. Levante, receba a misericórdia nova de hoje e dê o próximo passo. A fidelidade de Deus é maior que a sua falha.',
        pergunta: 'Você está carregando a culpa de ontem para dentro do dia de hoje? Como soltá-la?',
        aplicacao: 'Comece este dia agradecendo a Deus por uma misericórdia nova e por mais uma chance.',
        oracao: 'Senhor, obrigado pela misericórdia nova de hoje. Eu recomeço na Tua fidelidade. Amém.',
        apoio: [
          { texto: 'Porque sete vezes cairá o justo, e se levantará.', ref: 'Provérbios 24:16' },
          { texto: 'Esquecendo-me das coisas que atrás ficam... prossigo para o alvo.', ref: 'Filipenses 3:13-14' },
        ],
      },
      {
        versiculo: 'Os que esperam no Senhor renovarão as suas forças.',
        referencia: 'Isaías 40:31',
        contexto:
          'Isaías consola um povo cansado e desanimado, lembrando do Deus que não se cansa e que dá força a quem espera n’Ele.',
        reflexao:
          'Esperar em Deus não é ficar parado de braços cruzados — é confiar enquanto se caminha. A força prometida não vem para quem desiste, mas para quem persevera olhando para Deus. Vão existir dias em que você vai voar, dias em que vai só correr, e dias em que vai apenas conseguir "andar sem se cansar". Todos contam. O importante é continuar dependendo da fonte certa.',
        pergunta: 'Hoje você está em qual fase: voando, correndo ou só andando? E está bem assim?',
        aplicacao: 'Quando bater o cansaço hoje, pare e ore por 30 segundos em vez de desistir.',
        oracao: 'Deus, renova as minhas forças. Eu espero em Ti e confio que Tu me sustentas. Amém.',
        apoio: [
          { texto: 'O Senhor é a força da minha vida.', ref: 'Salmos 27:1' },
          { texto: 'A minha força e o meu cântico é o Senhor.', ref: 'Isaías 12:2' },
        ],
      },
      {
        versiculo: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo.',
        referencia: 'Salmos 23:4',
        contexto:
          'Davi, que foi pastor antes de ser rei, descreve Deus como o Pastor que conduz as ovelhas até pelos lugares mais perigosos.',
        reflexao:
          'Repare: o salmo diz "ainda que eu ande pelo vale" — não "ao redor do vale". Os momentos difíceis fazem parte do caminho, não são um desvio dele. A promessa não é que você nunca passe pelo vale, mas que você não passa sozinho. No seu momento mais escuro, o Pastor está ali, com a vara e o cajado, te protegendo e te guiando. Você pode atravessar o vale porque Ele atravessa com você.',
        pergunta: 'Em que "vale" você está agora — e o que muda em saber que Deus está nele com você?',
        aplicacao: 'No momento mais difícil de hoje, diga em voz alta: "Tu estás comigo".',
        oracao: 'Senhor, no meu vale, sê a minha companhia, a minha coragem e a minha proteção. Amém.',
        apoio: [
          { texto: 'Não te deixarei, nem te desampararei.', ref: 'Hebreus 13:5' },
          { texto: 'Quando passares pelas águas, eu serei contigo.', ref: 'Isaías 43:2' },
        ],
      },
      {
        versiculo: 'Aquele que em vós começou a boa obra a aperfeiçoará.',
        referencia: 'Filipenses 1:6',
        contexto:
          'Paulo expressa confiança não nos cristãos em si, mas em Deus, que é quem inicia e completa a transformação na vida deles.',
        reflexao:
          'A sua libertação não é um projeto seu que Deus apenas observa — é uma obra d’Ele, que Ele mesmo começou e promete terminar. Isso tira de você o peso impossível de ser o autor da própria mudança. Você coopera, sim, mas quem garante o resultado é Deus. Nos dias em que você duvidar de si mesmo, lembre: Ele não abandona obras pela metade. O que Ele começou em você, Ele vai completar.',
        pergunta: 'Você confia que Deus termina o que começou — mesmo quando você falha?',
        aplicacao: 'Hoje, em vez de confiar na sua capacidade, confie na fidelidade de Deus em te levar até o fim.',
        oracao: 'Pai, eu creio que Tu vais completar a minha libertação. A obra é Tua, e eu confio em Ti. Amém.',
        apoio: [
          { texto: 'Fiel é o que vos chama, o qual também o fará.', ref: '1 Tessalonicenses 5:24' },
          { texto: 'O Senhor aperfeiçoará o que me concerne.', ref: 'Salmos 138:8' },
        ],
      },
    ],
  },
]
