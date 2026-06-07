const MS_DIA = 86_400_000
const MS_HORA = 3_600_000

export function diasLivres(dataInicioISO: string, agora: Date = new Date()): number {
  const ms = agora.getTime() - new Date(dataInicioISO).getTime()
  return Math.max(0, Math.floor(ms / MS_DIA))
}

export function partesTempo(
  dataInicioISO: string,
  agora: Date = new Date(),
): { dias: number; horas: number } {
  const ms = Math.max(0, agora.getTime() - new Date(dataInicioISO).getTime())
  return { dias: Math.floor(ms / MS_DIA), horas: Math.floor((ms % MS_DIA) / MS_HORA) }
}
