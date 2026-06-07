import { useState, type ReactNode } from 'react'
import { VICIOS } from '../content/vicios'
import { useApp } from '../state/AppContext'

const DESAFIOS = [7, 21, 40, 90, 180, 365]
const TOTAL_PASSOS = 6

function Cartao({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto animate-fadeUp">
      {children}
    </div>
  )
}

function Passos({ passo }: { passo: number }) {
  return (
    <div className="flex gap-1.5 mb-8">
      {Array.from({ length: TOTAL_PASSOS }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all ${
            i <= passo ? 'bg-dourado' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
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
      className="mt-8 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition disabled:opacity-30 disabled:shadow-none"
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
          className={input}
        />
        <Btn onClick={() => setPasso(1)} disabled={!nome.trim()}>
          Começar
        </Btn>
      </Cartao>
    )

  if (passo === 1)
    return (
      <Cartao>
        <Passos passo={1} />
        <h2 className="font-title text-2xl">Qual batalha você vai vencer?</h2>
        <div className="mt-4 grid gap-2">
          {[...VICIOS, 'Outro'].map((v) => (
            <button
              key={v}
              onClick={() => setVicio(v)}
              className={`rounded-xl px-4 py-3 text-left border transition ${
                vicio === v
                  ? 'border-dourado bg-dourado/15 text-dourado shadow-glow-sm'
                  : 'border-white/10 text-cinza hover:border-white/25'
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
        <Passos passo={2} />
        <h2 className="font-title text-2xl">Escolha o seu desafio</h2>
        <p className="mt-1 text-cinza/70 text-sm">Quantos dias você quer mirar primeiro?</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {DESAFIOS.map((d) => (
            <button
              key={d}
              onClick={() => setDesafio(d)}
              className={`rounded-xl py-5 border transition ${
                desafio === d
                  ? 'border-dourado bg-dourado/15 text-dourado shadow-glow-sm'
                  : 'border-white/10 text-cinza'
              }`}
            >
              <div className="font-title text-2xl">{d}</div>
              <div className="text-xs text-cinza/60">dias</div>
            </button>
          ))}
        </div>
        <Btn onClick={() => setPasso(3)}>Continuar</Btn>
      </Cartao>
    )

  if (passo === 3)
    return (
      <Cartao>
        <Passos passo={3} />
        <h2 className="font-title text-2xl">Declaração de Liberdade</h2>
        <p className="mt-2 text-cinza/70">
          Complete a frase. Você vai reler isto nos momentos difíceis.
        </p>
        <p className="mt-4 text-dourado font-title">Estou iniciando meu Êxodo porque...</p>
        <textarea
          value={declaracao}
          onChange={(e) => setDeclaracao(e.target.value)}
          rows={4}
          className={input}
          placeholder="quero ser livre para..."
        />
        <Btn onClick={() => setPasso(4)} disabled={!declaracao.trim()}>
          Continuar
        </Btn>
      </Cartao>
    )

  if (passo === 4)
    return (
      <Cartao>
        <Passos passo={4} />
        <h2 className="font-title text-2xl">Seus motivos</h2>
        <p className="mt-2 text-cinza/70">O que você quer proteger? Família, sonhos, propósito...</p>
        <textarea
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
          rows={4}
          className={input}
          placeholder="Pelas pessoas e sonhos que me esperam na Terra Prometida..."
        />
        <Btn onClick={() => setPasso(5)}>Continuar</Btn>
      </Cartao>
    )

  return (
    <Cartao>
      <div className="text-center">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-dourado/25 blur-2xl animate-floatGlow" />
          <span className="relative text-5xl">🌅</span>
        </div>
        <h2 className="font-title text-3xl text-dourado text-glow leading-tight">
          Hoje você decidiu<br />sair do Egito.
        </h2>
        <p className="mt-4 text-cinza/80">
          {nome}, sua jornada para a liberdade começa agora.
        </p>
      </div>
      <Btn onClick={finalizar}>Começar minha jornada</Btn>
    </Cartao>
  )
}
