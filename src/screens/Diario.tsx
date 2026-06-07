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
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto space-y-5 animate-fadeUp">
      <div>
        <p className="text-cinza/60 text-xs uppercase tracking-[0.2em]">Diário Espiritual</p>
        <h2 className="font-title text-2xl mt-1">Como foi seu dia?</h2>
      </div>
      <div>
        <p className="text-cinza/80 text-sm mb-2">Hoje me senti:</p>
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
        className="w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
      >
        {salvo ? '✓ Salvo' : 'Salvar no diário'}
      </button>
      {estado.diario.length > 0 && (
        <div className="pt-2">
          <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-3">Histórico</h3>
          <div className="space-y-2">
            {estado.diario.map((d) => (
              <div
                key={d.data}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm"
              >
                <div className="flex justify-between">
                  <span className="text-dourado">{d.data}</span>
                  <span className="text-cinza/70">{d.humor}</span>
                </div>
                {d.oQueAconteceu && <p className="text-cinza/80 mt-1">{d.oQueAconteceu}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
