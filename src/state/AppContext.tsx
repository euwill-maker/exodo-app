import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Batalha, DiarioEntry, EstadoApp, Habito } from '../types'
import { carregarEstado, salvarEstado, estadoInicial, apagarFoto } from '../lib/storage'
import { registrarRecaidaBatalha } from '../lib/relapse'
import { diasLivres } from '../lib/streak'
import { conquistasAte } from '../lib/milestones'
import { PONTOS_POR_VITORIA } from '../lib/patente'

export function novoId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
  }
}

export type DadosNovaBatalha = Omit<
  Batalha,
  'id' | 'dataInicio' | 'melhorSequenciaDias' | 'vezesQueSeReergueu' | 'conquistasDesbloqueadas'
>

interface Ctx {
  estado: EstadoApp
  definirNome: (nome: string) => void
  criarBatalha: (dados: DadosNovaBatalha) => string
  removerBatalha: (id: string) => void
  registrarRecaida: (batalhaId: string) => void
  registrarVitoria: () => void
  addObjetivo: (batalhaId: string, texto: string) => void
  toggleObjetivo: (batalhaId: string, objId: string) => void
  removerObjetivo: (batalhaId: string, objId: string) => void
  addFotos: (batalhaId: string, ids: string[]) => void
  removerFoto: (batalhaId: string, id: string) => void
  addHabito: (nome: string, icone: string) => void
  toggleHabito: (habitoId: string, dataISO: string) => void
  removerHabito: (habitoId: string) => void
  salvarDiario: (entry: DiarioEntry) => void
  concluirDia: () => void
  salvarReflexao: (chave: string, texto: string) => void
  marcarTutorialVisto: () => void
  mostrarTutorial: () => void
  resetar: () => void
}

const AppContext = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoApp>(() => carregarEstado())

  useEffect(() => {
    salvarEstado(estado)
  }, [estado])

  // Desbloqueia conquistas de cada batalha conforme os dias.
  useEffect(() => {
    setEstado((e) => {
      let mudou = false
      const batalhas = e.batalhas.map((b) => {
        const dias = diasLivres(b.dataInicio)
        const ids = conquistasAte(dias).map((c) => c.id)
        const faltando = ids.filter((id) => !b.conquistasDesbloqueadas.includes(id))
        if (!faltando.length) return b
        mudou = true
        return { ...b, conquistasDesbloqueadas: [...b.conquistasDesbloqueadas, ...faltando] }
      })
      return mudou ? { ...e, batalhas } : e
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.batalhas.length])

  const mapBatalha = (id: string, fn: (b: Batalha) => Batalha) =>
    setEstado((e) => ({ ...e, batalhas: e.batalhas.map((b) => (b.id === id ? fn(b) : b)) }))

  const definirNome = (nome: string) => setEstado((e) => ({ ...e, nome }))

  const criarBatalha = (dados: DadosNovaBatalha) => {
    const id = novoId()
    const batalha: Batalha = {
      ...dados,
      id,
      dataInicio: new Date().toISOString(),
      melhorSequenciaDias: 0,
      vezesQueSeReergueu: 0,
      conquistasDesbloqueadas: [],
    }
    setEstado((e) => ({ ...e, batalhas: [...e.batalhas, batalha] }))
    return id
  }

  const removerBatalha = (id: string) =>
    setEstado((e) => {
      const alvo = e.batalhas.find((b) => b.id === id)
      alvo?.fotoIds.forEach((fid) => {
        void apagarFoto(fid)
      })
      return { ...e, batalhas: e.batalhas.filter((b) => b.id !== id) }
    })

  const addFotos = (batalhaId: string, ids: string[]) =>
    mapBatalha(batalhaId, (b) => ({ ...b, fotoIds: [...b.fotoIds, ...ids] }))

  const removerFoto = (batalhaId: string, id: string) => {
    void apagarFoto(id)
    mapBatalha(batalhaId, (b) => ({ ...b, fotoIds: b.fotoIds.filter((f) => f !== id) }))
  }

  const registrarRecaida = (batalhaId: string) =>
    mapBatalha(batalhaId, (b) => registrarRecaidaBatalha(b))

  const registrarVitoria = () =>
    setEstado((e) => ({ ...e, pontos: e.pontos + PONTOS_POR_VITORIA, vitorias: e.vitorias + 1 }))

  const addObjetivo = (batalhaId: string, texto: string) =>
    mapBatalha(batalhaId, (b) => ({
      ...b,
      objetivos: [...b.objetivos, { id: novoId(), texto, feito: false }],
    }))

  const toggleObjetivo = (batalhaId: string, objId: string) =>
    mapBatalha(batalhaId, (b) => ({
      ...b,
      objetivos: b.objetivos.map((o) => (o.id === objId ? { ...o, feito: !o.feito } : o)),
    }))

  const removerObjetivo = (batalhaId: string, objId: string) =>
    mapBatalha(batalhaId, (b) => ({ ...b, objetivos: b.objetivos.filter((o) => o.id !== objId) }))

  const addHabito = (nome: string, icone: string) =>
    setEstado((e) => ({
      ...e,
      habitos: [...e.habitos, { id: novoId(), nome, icone, diasFeitos: [] }],
    }))

  const toggleHabito = (habitoId: string, dataISO: string) =>
    setEstado((e) => ({
      ...e,
      habitos: e.habitos.map((h): Habito => {
        if (h.id !== habitoId) return h
        const feito = h.diasFeitos.includes(dataISO)
        return {
          ...h,
          diasFeitos: feito
            ? h.diasFeitos.filter((d) => d !== dataISO)
            : [...h.diasFeitos, dataISO],
        }
      }),
    }))

  const removerHabito = (habitoId: string) =>
    setEstado((e) => ({ ...e, habitos: e.habitos.filter((h) => h.id !== habitoId) }))

  const salvarDiario = (entry: DiarioEntry) =>
    setEstado((e) => ({
      ...e,
      diario: [entry, ...e.diario.filter((d) => d.data !== entry.data)],
    }))

  const concluirDia = () =>
    setEstado((e) => {
      const hoje = new Date().toISOString().slice(0, 10)
      if (e.devocional.ultimaData === hoje) return e // já leu hoje — 1 por dia
      const ontem = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
      const streak = e.devocional.ultimaData === ontem ? e.devocional.streak + 1 : 1
      return {
        ...e,
        devocional: {
          ...e.devocional,
          diasConcluidos: e.devocional.diasConcluidos + 1,
          ultimaData: hoje,
          streak,
        },
      }
    })

  const salvarReflexao = (chave: string, texto: string) =>
    setEstado((e) => ({
      ...e,
      devocional: {
        ...e.devocional,
        reflexoes: [...e.devocional.reflexoes.filter((r) => r.chave !== chave), { chave, texto }],
      },
    }))

  const marcarTutorialVisto = () => setEstado((e) => ({ ...e, tutorialVisto: true }))
  const mostrarTutorial = () => setEstado((e) => ({ ...e, tutorialVisto: false }))
  const resetar = () => setEstado(estadoInicial)

  return (
    <AppContext.Provider
      value={{
        estado,
        definirNome,
        criarBatalha,
        removerBatalha,
        registrarRecaida,
        registrarVitoria,
        addObjetivo,
        toggleObjetivo,
        removerObjetivo,
        addFotos,
        removerFoto,
        addHabito,
        toggleHabito,
        removerHabito,
        salvarDiario,
        concluirDia,
        salvarReflexao,
        marcarTutorialVisto,
        mostrarTutorial,
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
