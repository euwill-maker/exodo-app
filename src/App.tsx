import { useState } from 'react'
import { useApp } from './state/AppContext'
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
import { Devocional } from './screens/Devocional'
import { Diario } from './screens/Diario'
import { Perfil } from './screens/Perfil'
import { Assinatura } from './screens/Assinatura'
import { BottomNav, type Aba } from './components/BottomNav'
import { BotaoBatalha } from './components/BotaoBatalha'
import { Landscape } from './components/Landscape'

export function App() {
  const { estado, userId, authLoading, recuperandoSenha, plano, trialEnds } = useApp()
  const [aba, setAba] = useState<Aba>('inicio')
  const [batalhaAberta, setBatalhaAberta] = useState<string | null>(null)
  const [criando, setCriando] = useState(false)
  const [muralhaAberta, setMuralhaAberta] = useState(false)
  const [muralhaBatalha, setMuralhaBatalha] = useState<string | null>(null)
  const [assinaturaAberta, setAssinaturaAberta] = useState(false)

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

  // trava do trial: trial expirado e sem assinatura → tela de planos (paywall)
  if (trialEnds && !acessoLiberadoServidor(plano, trialEnds))
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
        {aba === 'devocional' && <Devocional />}
        {aba === 'diario' && <Diario />}
        {aba === 'perfil' && <Perfil onAbrirAssinatura={() => setAssinaturaAberta(true)} />}
      </div>
      {estado.batalhas.length > 0 && <BotaoBatalha comNav onClick={() => abrirMuralha(null)} />}
      <BottomNav ativa={aba} onMudar={setAba} />
    </div>
  )
}
