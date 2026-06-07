import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { EstadoApp, Perfil, DiarioEntry } from '../types'
import { carregarEstado, salvarEstado, estadoInicial } from '../lib/storage'
import { registrarRecaida as calcRecaida } from '../lib/relapse'
import { diasLivres } from '../lib/streak'
import { conquistasAte } from '../lib/milestones'

interface Ctx {
  estado: EstadoApp
  iniciarJornada: (perfil: Perfil) => void
  registrarRecaida: () => void
  registrarVitoria: () => void
  salvarDiario: (entry: DiarioEntry) => void
  concluirDevocional: (dataISO: string) => void
  resetar: () => void
}

const AppContext = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoApp>(() => carregarEstado())

  useEffect(() => {
    salvarEstado(estado)
  }, [estado])

  // Sincroniza conquistas desbloqueadas com os dias atuais sempre que o estado muda.
  useEffect(() => {
    if (!estado.perfil) return
    const dias = diasLivres(estado.perfil.dataInicio)
    const ids = conquistasAte(dias).map((c) => c.id)
    const faltando = ids.filter((id) => !estado.progresso.conquistasDesbloqueadas.includes(id))
    if (faltando.length) {
      setEstado((e) => ({
        ...e,
        progresso: {
          ...e.progresso,
          conquistasDesbloqueadas: [...e.progresso.conquistasDesbloqueadas, ...faltando],
        },
      }))
    }
  }, [estado.perfil, estado.progresso.conquistasDesbloqueadas])

  const iniciarJornada = (perfil: Perfil) => setEstado((e) => ({ ...e, perfil }))
  const registrarRecaida = () => setEstado((e) => calcRecaida(e))
  // v1: a vitória na Muralha apenas encerra a sequência de emergência.
  // Hook para métricas futuras (contagem de vitórias, gatilhos) na v2.
  const registrarVitoria = () => {}
  const salvarDiario = (entry: DiarioEntry) =>
    setEstado((e) => ({
      ...e,
      diario: [entry, ...e.diario.filter((d) => d.data !== entry.data)],
    }))
  const concluirDevocional = (dataISO: string) =>
    setEstado((e) =>
      e.progresso.devocionaisConcluidos.includes(dataISO)
        ? e
        : {
            ...e,
            progresso: {
              ...e.progresso,
              devocionaisConcluidos: [...e.progresso.devocionaisConcluidos, dataISO],
            },
          },
    )
  const resetar = () => setEstado(estadoInicial)

  return (
    <AppContext.Provider
      value={{
        estado,
        iniciarJornada,
        registrarRecaida,
        registrarVitoria,
        salvarDiario,
        concluirDevocional,
        resetar,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): Ctx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider')
  return ctx
}
