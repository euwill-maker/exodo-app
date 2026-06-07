export type Vicio = string

export interface Perfil {
  nome: string
  vicio: Vicio
  tempoDeLuta?: string
  dataInicio: string // ISO date-time da sequência atual
  desafioDias: number // 7|21|40|90|180|365
  declaracao: string
  motivos: string
  fotoIds: string[] // chaves no IndexedDB
}

export interface Progresso {
  melhorSequenciaDias: number
  vezesQueSeReergueu: number
  conquistasDesbloqueadas: string[] // ids de conquistas
  devocionaisConcluidos: string[] // datas ISO (YYYY-MM-DD)
}

export interface DiarioEntry {
  data: string // YYYY-MM-DD
  humor: string
  oQueAconteceu: string
  vitorias: string
  oracao: string
}

export interface Fase {
  id: string
  nome: string
  tema: string
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
  perfil: Perfil | null // null = onboarding não feito
  progresso: Progresso
  diario: DiarioEntry[]
}
