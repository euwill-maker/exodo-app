import { useState, type ReactNode } from 'react'
import { useApp } from '../state/AppContext'
import { BreathingExercise } from '../components/BreathingExercise'
import { VERSICULOS_EMERGENCIA } from '../content/versiculos'

function Wrap({ children, onFechar }: { children: ReactNode; onFechar: () => void }) {
  return (
    <div className="min-h-screen px-6 py-10 max-w-md mx-auto flex flex-col">
      <button onClick={onFechar} className="self-end text-cinza/60 text-sm">
        Fechar
      </button>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  )
}

function Btn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full rounded-xl bg-dourado py-3 font-title font-bold text-azul"
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
      <Wrap onFechar={onFechar}>
        <p className="text-cinza">Respire. A vontade vai passar. Lembre por que você começou:</p>
        <blockquote className="mt-4 font-title text-2xl text-dourado">
          “Estou iniciando meu Êxodo porque {p.declaracao}”
        </blockquote>
        <Btn onClick={avancar}>Continuar</Btn>
      </Wrap>
    )
  if (passo === 1)
    return (
      <Wrap onFechar={onFechar}>
        <h2 className="font-title text-2xl text-dourado">Vamos orar</h2>
        <p className="mt-4 leading-relaxed">
          Senhor, neste momento de luta eu venho a Ti. A vontade é forte, mas o Teu poder é maior.
          Tira de mim este desejo e enche-me da Tua paz. Eu não quero voltar ao Egito. Sustenta-me
          agora. Amém.
        </p>
        <Btn onClick={avancar}>Amém, continuar</Btn>
      </Wrap>
    )
  if (passo === 2)
    return (
      <Wrap onFechar={onFechar}>
        <h2 className="font-title text-2xl text-dourado">A Palavra é a sua espada</h2>
        <div className="mt-4 space-y-4">
          {VERSICULOS_EMERGENCIA.map((v) => (
            <div key={v.referencia}>
              <p className="italic">“{v.texto}”</p>
              <p className="text-dourado text-sm mt-1">{v.referencia}</p>
            </div>
          ))}
        </div>
        <Btn onClick={avancar}>Continuar</Btn>
      </Wrap>
    )
  if (passo === 3)
    return (
      <Wrap onFechar={onFechar}>
        <h2 className="font-title text-2xl text-dourado">Por isto você luta</h2>
        <p className="mt-4 whitespace-pre-wrap">
          {p.motivos ||
            'Lembre-se das pessoas e dos sonhos que te esperam na Terra Prometida.'}
        </p>
        <Btn onClick={avancar}>Continuar</Btn>
      </Wrap>
    )
  if (passo === 4)
    return (
      <Wrap onFechar={onFechar}>
        <h2 className="font-title text-2xl text-dourado text-center">Respire comigo</h2>
        <BreathingExercise />
        <Btn onClick={avancar}>Estou mais calmo</Btn>
      </Wrap>
    )
  return (
    <Wrap onFechar={onFechar}>
      <h2 className="font-title text-3xl text-dourado">Já passou.</h2>
      <p className="mt-3 text-cinza">
        Você venceu esta batalha. Cada vitória te aproxima da liberdade.
      </p>
      <Btn onClick={vencer}>Venci esta batalha</Btn>
    </Wrap>
  )
}
