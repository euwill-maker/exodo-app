import { useState } from 'react'
import { useApp } from '../state/AppContext'

export function Boasvindas() {
  const { definirNome } = useApp()
  const [nome, setNome] = useState('')
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto animate-fadeUp">
      <div className="text-center mb-2">
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-dourado/20 blur-2xl animate-floatGlow" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-dourado/40 bg-white/5">
            <span className="font-title text-5xl font-extrabold text-dourado text-glow">Ê</span>
          </div>
        </div>
        <h1 className="font-title text-4xl text-dourado text-glow">Êxodo</h1>
        <p className="mt-2 text-cinza/80">Da escravidão para a liberdade.</p>
      </div>
      <label className="mt-6 block text-sm text-cinza">Como você quer ser chamado?</label>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome"
        className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado"
      />
      <button
        onClick={() => definirNome(nome.trim())}
        disabled={!nome.trim()}
        className="mt-8 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition disabled:opacity-30 disabled:shadow-none"
      >
        Começar
      </button>
    </div>
  )
}
