export type Vicio = string

export interface Objetivo {
  id: string
  texto: string
  feito: boolean
}

export interface Batalha {
  id: string
  vicio: Vicio
  dataInicio: string // ISO date-time da sequência atual
  desafioDias: number // 7|21|40|90|180|365
  declaracao: string
  motivos: string
  fotoIds: string[]
  objetivos: Objetivo[]
  compromissoAceito: boolean
  melhorSequenciaDias: number
  vezesQueSeReergueu: number
  conquistasDesbloqueadas: string[]
}

export interface Habito {
  id: string
  nome: string
  icone: string // nome de ícone (ver Icon.tsx)
  diasFeitos: string[] // datas YYYY-MM-DD concluídas
}

export interface DiarioEntry {
  data: string // YYYY-MM-DD
  humor: string
  intensidade: number // 0-10: intensidade da vontade/tentação no dia
  gatilhos: string[] // gatilhos enfrentados
  oQueAconteceu: string
  vitorias: string
  gratidao: string // pelo que sou grato hoje
  oracao: string
}

export interface ReflexaoDevocional {
  chave: string // `${temaId}:${indice}` ou data
  texto: string
}

export interface EstadoDevocional {
  concluidos: string[] // legado (chaves antigas; mantido por compatibilidade)
  reflexoes: ReflexaoDevocional[] // chave = `dia:N`
  diasConcluidos: number // dias do plano concluídos (sequencial)
  ultimaData: string | null // YYYY-MM-DD do último dia concluído
  streak: number // ofensiva (dias seguidos)
}

export interface Fase {
  id: string
  nome: string
  tema: string
  icone: string
  minDias: number
  maxDias: number | null // null = sem teto
  mensagem: string
}

export interface Conquista {
  id: string
  marcaDias: number
  nome: string
}

export interface EstadoApp {
  nome: string | null // null = ainda não fez o boas-vindas
  batalhas: Batalha[]
  habitos: Habito[]
  diario: DiarioEntry[]
  devocional: EstadoDevocional
  pontos: number // XP acumulado (vitórias no Modo Batalha, etc.)
  vitorias: number // quantas vezes venceu uma tentação no Modo Batalha
  tutorialVisto: boolean // já viu o tutorial de boas-vindas
}
