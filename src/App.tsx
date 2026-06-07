import { useState } from 'react'
import { useApp } from './state/AppContext'
import { Boasvindas } from './screens/Boasvindas'
import { Painel } from './screens/Painel'
import { NovaBatalha } from './screens/NovaBatalha'
import { BatalhaDetalhe } from './screens/BatalhaDetalhe'
import { Muralha } from './screens/Muralha'
import { Habitos } from './screens/Habitos'
import { Devocional } from './screens/Devocional'
import { Diario } from './screens/Diario'
import { Perfil } from './screens/Perfil'
import { BottomNav, type Aba } from './components/BottomNav'
import { Landscape } from './components/Landscape'

export function App() {
  const { estado } = useApp()
  const [aba, setAba] = useState<Aba>('inicio')
  const [batalhaAberta, setBatalhaAberta] = useState<string | null>(null)
  const [criando, setCriando] = useState(false)
  const [muralha, setMuralha] = useState<string | null>(null)

  // boas-vindas (nome ainda não definido)
  if (!estado.nome)
    return (
      <>
        <Landscape />
        <Boasvindas />
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

  // muralha da tentação (tela cheia)
  if (muralha)
    return (
      <>
        <Landscape />
        <Muralha batalhaId={muralha} onFechar={() => setMuralha(null)} />
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
          onSOS={() => setMuralha(batalhaAberta)}
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
        {aba === 'perfil' && <Perfil />}
      </div>
      <BottomNav ativa={aba} onMudar={setAba} />
    </div>
  )
}
