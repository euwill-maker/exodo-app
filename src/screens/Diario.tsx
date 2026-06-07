import { useState } from 'react'
import { useApp } from '../state/AppContext'
import { Mood } from '../components/Mood'

export function Diario() {
  const { estado, salvarDiario } = useApp()
  const hoje = new Date().toISOString().slice(0, 10)
  const existente = estado.diario.find((d) => d.data === hoje)
  const [humor, setHumor] = useState(existente?.humor ?? '')
  const [oQue, setOQue] = useState(existente?.oQueAconteceu ?? '')
  const [vitorias, setVitorias] = useState(existente?.vitorias ?? '')
  const [oracao, setOracao] = useState(existente?.oracao ?? '')
  const [salvo, setSalvo] = useState(false)

  const salvar = () => {
    salvarDiario({ data: hoje, humor, oQueAconteceu: oQue, vitorias, oracao })
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }
  const campo =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado'

  return (
    <div className="px-6 pt-8 pb-28 max-w-md mx-auto space-y-4">
      <h2 className="font-title text-2xl">Diário Espiritual</h2>
      <div>
        <p className="text-cinza text-sm mb-2">Hoje me senti:</p>
        <Mood valor={humor} onMudar={setHumor} />
      </div>
      <textarea
        className={campo}
        rows={3}
        placeholder="O que aconteceu hoje?"
        value={oQue}
        onChange={(e) => setOQue(e.target.value)}
      />
      <textarea
        className={campo}
        rows={2}
        placeholder="Vitórias de hoje"
        value={vitorias}
        onChange={(e) => setVitorias(e.target.value)}
      />
      <textarea
        className={campo}
        rows={2}
        placeholder="Pedido de oração"
        value={oracao}
        onChange={(e) => setOracao(e.target.value)}
      />
      <button
        onClick={salvar}
        className="w-full rounded-xl bg-dourado py-3 font-title font-bold text-azul"
      >
        {salvo ? 'Salvo ✓' : 'Salvar'}
      </button>
      {estado.diario.length > 0 && (
        <div className="pt-4">
          <h3 className="font-title text-dourado mb-2">Histórico</h3>
          <div className="space-y-2">
            {estado.diario.map((d) => (
              <div
                key={d.data}
                className="rounded-xl bg-white/5 border border-white/10 p-3 text-sm"
              >
                <div className="flex justify-between">
                  <span className="text-dourado">{d.data}</span>
                  <span className="text-cinza">{d.humor}</span>
                </div>
                {d.oQueAconteceu && <p className="text-cinza mt-1">{d.oQueAconteceu}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
