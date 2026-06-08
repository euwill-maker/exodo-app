import { useState } from 'react'
import { useApp } from '../state/AppContext'
import { Mood } from '../components/Mood'
import { analisarGatilhos } from '../lib/gatilhos'

const EMOJI: Record<string, string> = {
  Forte: '💪',
  Fraco: '😔',
  Ansioso: '😰',
  Triste: '😢',
  Feliz: '😊',
  Tentado: '🔥',
}

const GATILHOS_SUGERIDOS = [
  'Estresse',
  'Ansiedade',
  'Tédio',
  'Solidão',
  'Cansaço',
  'Raiva',
  'Tristeza',
  'Madrugada',
  'Celular',
  'Ocioso',
  'Conflito',
]

function rotuloIntensidade(v: number): string {
  if (v === 0) return 'Nenhuma vontade'
  if (v <= 3) return 'Vontade leve'
  if (v <= 6) return 'Vontade moderada'
  if (v <= 8) return 'Vontade forte'
  return 'Vontade muito forte'
}

export function Diario() {
  const { estado, salvarDiario } = useApp()
  const hoje = new Date().toISOString().slice(0, 10)
  const existente = estado.diario.find((d) => d.data === hoje)

  const [humor, setHumor] = useState(existente?.humor ?? '')
  const [intensidade, setIntensidade] = useState(existente?.intensidade ?? 0)
  const [gatilhos, setGatilhos] = useState<string[]>(existente?.gatilhos ?? [])
  const [oQue, setOQue] = useState(existente?.oQueAconteceu ?? '')
  const [vitorias, setVitorias] = useState(existente?.vitorias ?? '')
  const [gratidao, setGratidao] = useState(existente?.gratidao ?? '')
  const [oracao, setOracao] = useState(existente?.oracao ?? '')
  const [salvo, setSalvo] = useState(false)

  const toggleGatilho = (g: string) =>
    setGatilhos((gs) => (gs.includes(g) ? gs.filter((x) => x !== g) : [...gs, g]))

  const salvar = () => {
    salvarDiario({
      data: hoje,
      humor,
      intensidade,
      gatilhos,
      oQueAconteceu: oQue,
      vitorias,
      gratidao,
      oracao,
    })
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  const campo =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado'

  // insights simples
  const total = estado.diario.length
  const humorContagem: Record<string, number> = {}
  estado.diario.forEach((d) => {
    if (d.humor) humorContagem[d.humor] = (humorContagem[d.humor] ?? 0) + 1
  })
  const humorTop = Object.entries(humorContagem).sort((a, b) => b[1] - a[1])[0]?.[0]
  const mapa = analisarGatilhos(estado.diario)

  return (
    <div className="px-5 pt-10 pb-28 max-w-md mx-auto space-y-5 animate-fadeUp">
      <div className="flex items-center justify-between">
        <h1 className="font-title text-3xl text-dourado text-glow">Diário</h1>
        {total > 0 && (
          <span className="text-cinza/55 text-xs">
            {total} {total === 1 ? 'registro' : 'registros'}
            {humorTop && ` · ${EMOJI[humorTop] ?? ''}`}
          </span>
        )}
      </div>
      <p className="text-cinza/60 text-sm -mt-3">Conhecer o seu coração é o primeiro passo para guardá-lo.</p>

      {/* humor */}
      <div>
        <p className="text-cinza/80 text-sm mb-2">Como está seu coração hoje?</p>
        <Mood valor={humor} onMudar={setHumor} />
      </div>

      {/* intensidade da vontade */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-cinza/80 text-sm">Intensidade da vontade hoje</span>
          <span className="font-title text-dourado">{intensidade}/10</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={intensidade}
          onChange={(e) => setIntensidade(Number(e.target.value))}
          className="w-full accent-[#C9A24B]"
        />
        <p className="text-cinza/55 text-xs mt-1">{rotuloIntensidade(intensidade)}</p>
      </div>

      {/* gatilhos */}
      <div>
        <p className="text-cinza/80 text-sm mb-2">Gatilhos que enfrentei hoje</p>
        <div className="flex flex-wrap gap-2">
          {GATILHOS_SUGERIDOS.map((g) => {
            const on = gatilhos.includes(g)
            return (
              <button
                key={g}
                onClick={() => toggleGatilho(g)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  on
                    ? 'border-terra/60 bg-terra/15 text-terra'
                    : 'border-white/12 text-cinza/70'
                }`}
              >
                {g}
              </button>
            )
          })}
        </div>
      </div>

      {/* campos de texto guiados */}
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
        placeholder="Vitórias de hoje (mesmo as pequenas)"
        value={vitorias}
        onChange={(e) => setVitorias(e.target.value)}
      />
      <textarea
        className={campo}
        rows={2}
        placeholder="Sou grato a Deus por..."
        value={gratidao}
        onChange={(e) => setGratidao(e.target.value)}
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
        {salvo ? '✓ Salvo no diário' : existente ? 'Atualizar registro de hoje' : 'Salvar no diário'}
      </button>

      {/* mapa de gatilhos */}
      {mapa.totalRegistros >= 3 && (
        <div className="rounded-2xl border border-dourado/25 bg-gradient-to-b from-dourado/[0.07] to-transparent p-4">
          <h3 className="font-title text-dourado text-sm uppercase tracking-wide flex items-center gap-2">
            🗺️ Mapa de Gatilhos
          </h3>
          <p className="text-cinza/55 text-xs mt-0.5">O que os seus registros revelam:</p>

          {mapa.topGatilhos.length > 0 && (
            <div className="mt-3">
              <p className="text-cinza/70 text-xs mb-1.5">Gatilhos mais frequentes</p>
              <div className="flex flex-wrap gap-1.5">
                {mapa.topGatilhos.map((g) => (
                  <span key={g.nome} className="rounded-full bg-terra/15 text-terra text-xs px-2.5 py-1">
                    {g.nome} · {g.vezes}×
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
              <div className="font-title text-dourado text-lg">{mapa.intensidadeMedia.toFixed(1)}</div>
              <div className="text-[10px] text-cinza/55">vontade média</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
              <div className="font-title text-dourado text-base leading-tight">{mapa.diaDificil ?? '—'}</div>
              <div className="text-[10px] text-cinza/55">dia mais difícil</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
              <div className="text-lg">{mapa.humorTop ? EMOJI[mapa.humorTop] ?? '🙂' : '—'}</div>
              <div className="text-[10px] text-cinza/55">humor comum</div>
            </div>
          </div>

          <p className="text-cinza/45 text-[11px] mt-3 leading-relaxed">
            💡 Conhecer os seus padrões é meio caminho para vencê-los. Reforce a vigilância
            {mapa.diaDificil ? ` nas ${mapa.diaDificil.toLowerCase()}s` : ' nos dias mais difíceis'} e
            quando sentir os gatilhos acima.
          </p>
        </div>
      )}

      {/* histórico */}
      {estado.diario.length > 0 && (
        <div className="pt-3">
          <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-3">Histórico</h3>
          <div className="space-y-2">
            {estado.diario.map((d) => (
              <div key={d.data} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dourado font-medium">
                    {EMOJI[d.humor] ?? '•'} {d.data.split('-').reverse().join('/')}
                  </span>
                  {d.intensidade > 0 && (
                    <span className="text-cinza/50 text-xs">vontade {d.intensidade}/10</span>
                  )}
                </div>
                {d.gatilhos?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.gatilhos.map((g) => (
                      <span key={g} className="rounded-full bg-terra/15 text-terra text-[11px] px-2 py-0.5">
                        {g}
                      </span>
                    ))}
                  </div>
                )}
                {d.oQueAconteceu && <p className="text-cinza/80 text-sm mt-2">{d.oQueAconteceu}</p>}
                {d.vitorias && <p className="text-cinza/70 text-sm mt-1">🏆 {d.vitorias}</p>}
                {d.gratidao && <p className="text-cinza/70 text-sm mt-1">🙏 {d.gratidao}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
