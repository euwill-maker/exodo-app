import { useState } from 'react'
import { useApp } from './state/AppContext'
import { Onboarding } from './screens/Onboarding'
import { Home } from './screens/Home'
import { Muralha } from './screens/Muralha'
import { Devocional } from './screens/Devocional'
import { Diario } from './screens/Diario'
import { Conquistas } from './screens/Conquistas'
import { BottomNav, type Aba } from './components/BottomNav'
import { Landscape } from './components/Landscape'

export function App() {
  const { estado } = useApp()
  const [aba, setAba] = useState<Aba>('home')
  const [muralha, setMuralha] = useState(false)

  if (!estado.perfil)
    return (
      <>
        <Landscape />
        <Onboarding />
      </>
    )
  if (muralha)
    return (
      <>
        <Landscape />
        <Muralha onFechar={() => setMuralha(false)} />
      </>
    )

  return (
    <div className="min-h-screen">
      <Landscape />
      {aba === 'home' && <Home onSOS={() => setMuralha(true)} />}
      {aba === 'devocional' && <Devocional />}
      {aba === 'diario' && <Diario />}
      {aba === 'conquistas' && <Conquistas />}
      <BottomNav ativa={aba} onMudar={setAba} />
    </div>
  )
}
