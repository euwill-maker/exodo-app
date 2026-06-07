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
  oQueAconteceu: string
  vitorias: string
  oracao: string
}

export interface ReflexaoDevocional {
  chave: string // `${temaId}:${indice}` ou data
  texto: string
}

export interface EstadoDevocional {
  concluidos: string[] // chaves de devocionais concluídos
  reflexoes: ReflexaoDevocional[]
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
}
