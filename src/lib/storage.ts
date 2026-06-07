import localforage from 'localforage'
import type { EstadoApp } from '../types'

const KEY = 'exodo:estado'

export const estadoInicial: EstadoApp = {
  nome: null,
  batalhas: [],
  habitos: [],
  diario: [],
  devocional: { concluidos: [], reflexoes: [], diasConcluidos: 0, ultimaData: null, streak: 0 },
  pontos: 0,
  vitorias: 0,
  tutorialVisto: false,
}

export function carregarEstado(): EstadoApp {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return estadoInicial
    return { ...estadoInicial, ...JSON.parse(raw) }
  } catch {
    return estadoInicial
  }
}

export function salvarEstado(estado: EstadoApp): void {
  localStorage.setItem(KEY, JSON.stringify(estado))
}

// Fotos ficam no IndexedDB (podem ser grandes). Guardamos só os ids nas batalhas.
const fotosStore = localforage.createInstance({ name: 'exodo', storeName: 'fotos' })

export async function salvarFoto(id: string, blob: Blob): Promise<void> {
  await fotosStore.setItem(id, blob)
}
export async function lerFoto(id: string): Promise<Blob | null> {
  return (await fotosStore.getItem<Blob>(id)) ?? null
}
export async function apagarFoto(id: string): Promise<void> {
  await fotosStore.removeItem(id)
}
