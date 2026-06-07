import { useState, type ReactNode } from 'react'
import { useApp } from '../state/AppContext'
import { BreathingExercise } from '../components/BreathingExercise'
import { VERSICULOS_EMERGENCIA } from '../content/versiculos'

const TOTAL = 6

function Wrap({
  children,
  onFechar,
  passo,
}: {
  children: ReactNode
  onFechar: () => void
  passo: number
}) {
  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full transition-all ${
                i <= passo ? 'bg-dourado' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
        <button onClick={onFechar} className="text-cinza/60 text-sm">
          Fechar
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-center animate-fadeUp" key={passo}>
        {children}
      </div>
    </div>
  )
}

function Btn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
    >
      {children}
    </button>
  )
}

export function Muralha({ onFechar }: { onFechar: () => void }) {
  const { estado, registrarVitoria } = useApp()
  const p = estado.perfil!
  const [passo, setPasso] = useState(0)
  const avancar = () => setPasso((s) => s + 1)
  const vencer = () => {
    registrarVitoria()
    onFechar()
  }

  if (passo === 0)
    return (
      <Wrap onFechar={onFechar} passo={0}>
        <p className="text-cinza/80">Respire. A vontade vai passar. Lembre por que você começou:</p>
        <blockquote className="mt-5 font-title text-2xl text-dourado text-glow leading-snug">
          “Estou iniciando meu Êxodo porque {p.declaracao}”
        </blockquote>
        <Btn onClick={avancar}>Continuar</Btn>
      </Wrap>
    )
  if (passo === 1)
    return (
      <Wrap onFechar={onFechar} passo={1}>
        <div className="text-4xl mb-3">🙏</div>
        <h2 className="font-title text-2xl text-dourado">Vamos orar</h2>
        <p className="mt-4 leading-relaxed text-white/90">
          Senhor, neste momento de luta eu venho a Ti. A vontade é forte, mas o Teu poder é maior.
          Tira de mim este desejo e enche-me da Tua paz. Eu não quero voltar ao Egito. Sustenta-me
          agora. Amém.
        </p>
        <Btn onClick={avancar}>Amém, continuar</Btn>
      </Wrap>
    )
  if (passo === 2)
    return (
      <Wrap onFechar={onFechar} passo={2}>
        <div className="text-4xl mb-3">⚔️</div>
        <h2 className="font-title text-2xl text-dourado">A Palavra é a sua espada</h2>
        <div className="mt-4 space-y-4">
          {VERSICULOS_EMERGENCIA.map((v) => (
            <div
              key={v.referencia}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="italic text-white/90">“{v.texto}”</p>
              <p className="text-dourado text-sm mt-2 font-semibold">— {v.referencia}</p>
            </div>
          ))}
        </div>
        <Btn onClick={avancar}>Continuar</Btn>
      </Wrap>
    )
  if (passo === 3)
    return (
      <Wrap onFechar={onFechar} passo={3}>
        <div className="text-4xl mb-3">❤️</div>
        <h2 className="font-title text-2xl text-dourado">Por isto você luta</h2>
        <p className="mt-4 whitespace-pre-wrap text-white/90 leading-relaxed">
          {p.motivos ||
            'Lembre-se das pessoas e dos sonhos que te esperam na Terra Prometida.'}
        </p>
        <Btn onClick={avancar}>Continuar</Btn>
      </Wrap>
    )
  if (passo === 4)
    return (
      <Wrap onFechar={onFechar} passo={4}>
        <h2 className="font-title text-2xl text-dourado text-center">Respire comigo</h2>
        <BreathingExercise />
        <Btn onClick={avancar}>Estou mais calmo</Btn>
      </Wrap>
    )
  return (
    <Wrap onFechar={onFechar} passo={5}>
      <div className="text-5xl mb-3">🕊️</div>
      <h2 className="font-title text-4xl text-dourado text-glow">Já passou.</h2>
      <p className="mt-3 text-cinza/85 leading-relaxed">
        Você venceu esta batalha. Cada vitória te aproxima da liberdade.
      </p>
      <Btn onClick={vencer}>Venci esta batalha</Btn>
    </Wrap>
  )
}
