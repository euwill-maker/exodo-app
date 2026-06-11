import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useApp } from './state/AppContext'
import { useSwipeBack } from './lib/useSwipeBack'
import { Auth } from './screens/Auth'
import { RedefinirSenha } from './screens/RedefinirSenha'
import { Boasvindas } from './screens/Boasvindas'
import { acessoLiberadoServidor } from './lib/acesso'
import { Tutorial } from './screens/Tutorial'
import { Painel } from './screens/Painel'
import { NovaBatalha } from './screens/NovaBatalha'
import { BatalhaDetalhe } from './screens/BatalhaDetalhe'
import { Muralha } from './screens/Muralha'
import { Habitos } from './screens/Habitos'
// carregado sob demanda: contém o plano de 1 ano (~500KB) — não pesa na entrada do app
const Devocional = lazy(() =>
  import('./screens/Devocional').then((m) => ({ default: m.Devocional })),
)
import { Diario } from './screens/Diario'
import { Perfil } from './screens/Perfil'
import { Assinatura } from './screens/Assinatura'
import { Admin } from './screens/Admin'
import { BottomNav, type Aba } from './components/BottomNav'
import { Landscape } from './components/Landscape'

export function App() {
  const { estado, userId, authLoading, recuperandoSenha, plano, trialEnds, perfilCarregado } =
    useApp()
  const [aba, setAba] = useState<Aba>('inicio')
  const [batalhaAberta, setBatalhaAberta] = useState<string | null>(null)
  const [criando, setCriando] = useState(false)
  const [muralhaAberta, setMuralhaAberta] = useState(false)
  const [muralhaBatalha, setMuralhaBatalha] = useState<string | null>(null)
  const [assinaturaAberta, setAssinaturaAberta] = useState(false)
  const [adminAberto, setAdminAberto] = useState(false)

  // abre direto no Devocional quando vem da notificação (/?go=devocional)
  useEffect(() => {
    const go = new URLSearchParams(window.location.search).get('go')
    if (go === 'devocional') {
      setAba('devocional')
      const url = new URL(window.location.href)
      url.searchParams.delete('go')
      window.history.replaceState({}, '', url.toString())
    }
  }, [])

  // voltar unificado: fecha a camada aberta mais "de cima" (mesma ordem da pilha de telas)
  const voltar = useCallback(() => {
    if (muralhaAberta) return setMuralhaAberta(false)
    if (assinaturaAberta) return setAssinaturaAberta(false)
    if (adminAberto) return setAdminAberto(false)
    if (criando) return setCriando(false)
    if (batalhaAberta) return setBatalhaAberta(null)
    if (aba !== 'inicio') return setAba('inicio')
  }, [muralhaAberta, assinaturaAberta, adminAberto, criando, batalhaAberta, aba])

  // arrastar da borda esquerda pra direita = voltar
  useSwipeBack(voltar)

  const abrirMuralha = (id: string | null) => {
    setMuralhaBatalha(id)
    setMuralhaAberta(true)
  }

  // carregando sessão
  if (authLoading)
    return (
      <>
        <Landscape />
        <div className="min-h-screen flex items-center justify-center">
          <span className="font-title text-5xl font-extrabold text-dourado text-glow animate-pulse">Ê</span>
        </div>
      </>
    )

  // redefinir senha (após clicar no link de recuperação por e-mail)
  if (recuperandoSenha)
    return (
      <>
        <Landscape />
        <RedefinirSenha />
      </>
    )

  // login obrigatório
  if (!userId)
    return (
      <>
        <Landscape />
        <Auth />
      </>
    )

  // trava do trial: perfil do servidor carregado e sem acesso → tela de planos (paywall).
  // Usa perfilCarregado (não "trialEnds existe") pra um trial_ends nulo NÃO virar acesso grátis.
  if (perfilCarregado && !acessoLiberadoServidor(plano, trialEnds))
    return (
      <>
        <Landscape />
        <Assinatura bloqueio onFechar={() => {}} />
      </>
    )

  // boas-vindas (nome ainda não definido)
  if (!estado.nome)
    return (
      <>
        <Landscape />
        <Boasvindas />
      </>
    )

  // tutorial de boas-vindas (primeira vez)
  if (!estado.tutorialVisto)
    return (
      <>
        <Landscape />
        <Tutorial />
      </>
    )

  // criar nova batalha (tela cheia)
  if (criando)
    return (
      <>
        <Landscape />
        <NovaBatalha
          onPronto={(id) => {
            setCriando(false)
            setBatalhaAberta(id)
            setAba('inicio')
          }}
          onCancelar={() => setCriando(false)}
        />
      </>
    )

  // assinatura / planos (tela cheia)
  if (assinaturaAberta)
    return (
      <>
        <Landscape />
        <Assinatura onFechar={() => setAssinaturaAberta(false)} />
      </>
    )

  // painel de admin (tela cheia)
  if (adminAberto) return <Admin onVoltar={() => setAdminAberto(false)} />

  // modo batalha (tela cheia)
  if (muralhaAberta)
    return (
      <>
        <Landscape />
        <Muralha batalhaId={muralhaBatalha} onFechar={() => setMuralhaAberta(false)} />
      </>
    )

  // detalhe de uma batalha (tela cheia, sem nav inferior)
  if (aba === 'inicio' && batalhaAberta)
    return (
      <>
        <Landscape />
        <BatalhaDetalhe
          batalhaId={batalhaAberta}
          onVoltar={() => setBatalhaAberta(null)}
          onSOS={() => abrirMuralha(batalhaAberta)}
        />
      </>
    )

  return (
    <div className="min-h-screen">
      <Landscape />
      <div key={aba} className="animate-fadeUp">
        {aba === 'inicio' && (
          <Painel onAbrir={(id) => setBatalhaAberta(id)} onNova={() => setCriando(true)} />
        )}
        {aba === 'habitos' && <Habitos />}
        {aba === 'devocional' && (
          <Suspense
            fallback={
              <div className="px-5 pt-10 text-center text-cinza/60 animate-fadeUp">
                Carregando devocional…
              </div>
            }
          >
            <Devocional />
          </Suspense>
        )}
        {aba === 'diario' && <Diario />}
        {aba === 'perfil' && (
          <Perfil
            onAbrirAssinatura={() => setAssinaturaAberta(true)}
            onAbrirAdmin={() => setAdminAberto(true)}
          />
        )}
      </div>
      <BottomNav
        ativa={aba}
        onMudar={setAba}
        onSOS={estado.batalhas.length > 0 ? () => abrirMuralha(null) : undefined}
      />
    </div>
  )
}
