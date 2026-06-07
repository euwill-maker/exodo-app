import { useState, type ReactNode } from 'react'
import { VICIOS } from '../content/vicios'
import { useApp } from '../state/AppContext'

const DESAFIOS = [7, 21, 40, 90, 180, 365]

function Cartao({ children }: { children: ReactNode }) {
  return <div className="min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto">{children}</div>
}

function Btn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-8 w-full rounded-xl bg-dourado py-3 font-title font-bold text-azul disabled:opacity-40"
    >
      {children}
    </button>
  )
}

export function Onboarding() {
  const { iniciarJornada } = useApp()
  const [passo, setPasso] = useState(0)
  const [nome, setNome] = useState('')
  const [vicio, setVicio] = useState('')
  const [vicioOutro, setVicioOutro] = useState('')
  const [desafio, setDesafio] = useState(90)
  const [declaracao, setDeclaracao] = useState('')
  const [motivos, setMotivos] = useState('')

  const vicioFinal = vicio === 'Outro' ? vicioOutro.trim() : vicio

  const finalizar = () =>
    iniciarJornada({
      nome: nome.trim(),
      vicio: vicioFinal,
      dataInicio: new Date().toISOString(),
      desafioDias: desafio,
      declaracao: declaracao.trim(),
      motivos: motivos.trim(),
      fotoIds: [],
    })

  const input =
    'mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado'

  if (passo === 0)
    return (
      <Cartao>
        <h1 className="font-title text-4xl text-dourado">Êxodo</h1>
        <p className="mt-2 text-cinza">Da escravidão para a liberdade.</p>
        <label className="mt-8 block text-sm text-cinza">Como você quer ser chamado?</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className={input}
        />
        <Btn onClick={() => setPasso(1)} disabled={!nome.trim()}>
          Continuar
        </Btn>
      </Cartao>
    )

  if (passo === 1)
    return (
      <Cartao>
        <h2 className="font-title text-2xl">Qual batalha você vai vencer?</h2>
        <div className="mt-4 grid gap-2">
          {[...VICIOS, 'Outro'].map((v) => (
            <button
              key={v}
              onClick={() => setVicio(v)}
              className={`rounded-xl px-4 py-3 text-left border ${
                vicio === v
                  ? 'border-dourado bg-dourado/15 text-dourado'
                  : 'border-white/10 text-cinza'
              }`}
            >
              {v}
            </button>
          ))}
          {vicio === 'Outro' && (
            <input
              value={vicioOutro}
              onChange={(e) => setVicioOutro(e.target.value)}
              placeholder="Qual?"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado"
            />
          )}
        </div>
        <Btn onClick={() => setPasso(2)} disabled={!vicioFinal}>
          Continuar
        </Btn>
      </Cartao>
    )

  if (passo === 2)
    return (
      <Cartao>
        <h2 className="font-title text-2xl">Escolha o seu desafio</h2>
        <p className="mt-1 text-cinza text-sm">Quantos dias você quer mirar primeiro?</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {DESAFIOS.map((d) => (
            <button
              key={d}
              onClick={() => setDesafio(d)}
              className={`rounded-xl py-4 border ${
                desafio === d
                  ? 'border-dourado bg-dourado/15 text-dourado'
                  : 'border-white/10 text-cinza'
              }`}
            >
              <div className="font-title text-xl">{d}</div>
              dias
            </button>
          ))}
        </div>
        <Btn onClick={() => setPasso(3)}>Continuar</Btn>
      </Cartao>
    )

  if (passo === 3)
    return (
      <Cartao>
        <h2 className="font-title text-2xl">Declaração de Liberdade</h2>
        <p className="mt-2 text-cinza">Complete a frase. Você vai reler isto nos momentos difíceis.</p>
        <p className="mt-4 text-dourado">Estou iniciando meu Êxodo porque...</p>
        <textarea
          value={declaracao}
          onChange={(e) => setDeclaracao(e.target.value)}
          rows={4}
          className={input}
        />
        <Btn onClick={() => setPasso(4)} disabled={!declaracao.trim()}>
          Continuar
        </Btn>
      </Cartao>
    )

  if (passo === 4)
    return (
      <Cartao>
        <h2 className="font-title text-2xl">Seus motivos</h2>
        <p className="mt-2 text-cinza">O que você quer proteger? Família, sonhos, propósito...</p>
        <textarea
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
          rows={4}
          className={input}
        />
        <Btn onClick={() => setPasso(5)}>Continuar</Btn>
      </Cartao>
    )

  return (
    <Cartao>
      <h2 className="font-title text-3xl text-dourado">Hoje você decidiu sair do Egito.</h2>
      <p className="mt-3 text-cinza">{nome}, sua jornada para a liberdade começa agora.</p>
      <Btn onClick={finalizar}>Começar minha jornada</Btn>
    </Cartao>
  )
}
