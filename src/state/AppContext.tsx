import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Batalha, DiarioEntry, EstadoApp, Habito } from '../types'
import type { Plano } from '../lib/acesso'
import { carregarEstado, salvarEstado, estadoInicial, apagarFoto } from '../lib/storage'
import { registrarRecaidaBatalha } from '../lib/relapse'
import { diasLivres } from '../lib/streak'
import { conquistasAte } from '../lib/milestones'
import { PONTOS_POR_VITORIA } from '../lib/patente'
import { supabase } from '../lib/supabase'
import { carregarNuvem, salvarNuvem } from '../lib/cloud'

export function novoId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
  }
}

function traduzErro(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'E-mail ou senha incorretos.'
  if (m.includes('already registered') || m.includes('already been registered'))
    return 'Este e-mail já tem conta. Tente entrar.'
  if (m.includes('password') && m.includes('6')) return 'A senha precisa ter ao menos 6 caracteres.'
  if (m.includes('email') && m.includes('confirm')) return 'Confirme seu e-mail para entrar.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Aguarde um instante.'
  return msg
}

export type DadosNovaBatalha = Omit<
  Batalha,
  'id' | 'dataInicio' | 'melhorSequenciaDias' | 'vezesQueSeReergueu' | 'conquistasDesbloqueadas'
>

interface Ctx {
  estado: EstadoApp
  userId: string | null
  authLoading: boolean
  signUp: (email: string, senha: string, nome: string) => Promise<{ erro?: string }>
  signIn: (email: string, senha: string) => Promise<{ erro?: string }>
  signOut: () => Promise<void>
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
  definirPlano: (plano: Plano) => void
  resetar: () => void
}

const AppContext = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoApp>(() => carregarEstado())
  const [userId, setUserId] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const nuvemCarregadaPara = useRef<string | null>(null)

  useEffect(() => {
    salvarEstado(estado)
  }, [estado])

  // sessão do Supabase
  useEffect(() => {
    let ativo = true
    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return
      setUserId(data.session?.user?.id ?? null)
      setAuthLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null)
    })
    return () => {
      ativo = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // ao logar: carrega o estado da nuvem (ou semeia a nuvem com o estado local)
  useEffect(() => {
    if (!userId || nuvemCarregadaPara.current === userId) return
    nuvemCarregadaPara.current = userId
    ;(async () => {
      const nuvem = await carregarNuvem(userId)
      if (nuvem && nuvem.nome) {
        setEstado({ ...estadoInicial, ...nuvem })
      } else {
        await salvarNuvem(userId, estado)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  // salva o estado na nuvem (debounce) quando logado
  useEffect(() => {
    if (!userId) return
    const t = setTimeout(() => {
      void salvarNuvem(userId, estado)
    }, 800)
    return () => clearTimeout(t)
  }, [estado, userId])

  // marca o primeiro acesso (base do trial de 7 dias)
  useEffect(() => {
    if (!estado.primeiroAcesso) {
      setEstado((e) => (e.primeiroAcesso ? e : { ...e, primeiroAcesso: new Date().toISOString() }))
    }
  }, [estado.primeiroAcesso])

  // retorno do checkout do Stripe (?pago=mensal|vitalicio) — libera o plano
  // (otimista; a confirmação segura via webhook entra na próxima etapa)
  useEffect(() => {
    const pago = new URLSearchParams(window.location.search).get('pago')
    if (pago === 'mensal' || pago === 'vitalicio') {
      setEstado((e) => ({ ...e, plano: pago }))
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

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

  const signUp = async (email: string, senha: string, nome: string) => {
    const { error } = await supabase.auth.signUp({ email: email.trim(), password: senha })
    if (error) return { erro: traduzErro(error.message) }
    if (nome.trim()) setEstado((e) => ({ ...e, nome: nome.trim() }))
    return {}
  }
  const signIn = async (email: string, senha: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha })
    if (error) return { erro: traduzErro(error.message) }
    return {}
  }
  const signOut = async () => {
    await supabase.auth.signOut()
    nuvemCarregadaPara.current = null
    setEstado(estadoInicial)
    setUserId(null)
  }

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
      const streak = e.devocional.ultimaData === ontem ? (Number(e.devocional.streak) || 0) + 1 : 1
      return {
        ...e,
        devocional: {
          ...e.devocional,
          diasConcluidos: (Number(e.devocional.diasConcluidos) || 0) + 1,
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

  const definirPlano = (plano: Plano) => setEstado((e) => ({ ...e, plano }))
  const marcarTutorialVisto = () => setEstado((e) => ({ ...e, tutorialVisto: true }))
  const mostrarTutorial = () => setEstado((e) => ({ ...e, tutorialVisto: false }))
  const resetar = () => setEstado(estadoInicial)

  return (
    <AppContext.Provider
      value={{
        estado,
        userId,
        authLoading,
        signUp,
        signIn,
        signOut,
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
        definirPlano,
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
