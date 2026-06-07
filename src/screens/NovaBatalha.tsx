import { useState, type ReactNode } from 'react'
import { VICIOS } from '../content/vicios'
import { useApp, novoId } from '../state/AppContext'
import { Icon } from '../components/Icon'
import type { Objetivo } from '../types'

const DESAFIOS = [7, 21, 40, 90, 180, 365]
const TOTAL = 6

function Wrap({
  passo,
  onVoltar,
  children,
}: {
  passo: number
  onVoltar: () => void
  children: ReactNode
}) {
  return (
    <div className="min-h-screen px-6 pt-10 pb-10 max-w-md mx-auto flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onVoltar} className="text-cinza/70">
          <Icon name="back" size={22} />
        </button>
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${i <= passo ? 'bg-dourado' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
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
      className="mt-8 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition disabled:cursor-not-allowed disabled:from-white/10 disabled:to-white/10 disabled:text-cinza/40 disabled:shadow-none"
    >
      {children}
    </button>
  )
}

const input =
  'mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado'

export function NovaBatalha({
  onPronto,
  onCancelar,
}: {
  onPronto: (id: string) => void
  onCancelar: () => void
}) {
  const { estado, criarBatalha } = useApp()
  const [passo, setPasso] = useState(0)
  const [vicio, setVicio] = useState('')
  const [vicioOutro, setVicioOutro] = useState('')
  const [desafio, setDesafio] = useState(90)
  const [declaracao, setDeclaracao] = useState('')
  const [motivos, setMotivos] = useState('')
  const [objetivos, setObjetivos] = useState<Objetivo[]>([])
  const [novoObj, setNovoObj] = useState('')
  const [assinatura, setAssinatura] = useState('')
  const [aceito, setAceito] = useState(false)

  const vicioFinal = vicio === 'Outro' ? vicioOutro.trim() : vicio
  const voltar = () => (passo === 0 ? onCancelar() : setPasso((p) => p - 1))

  const addObj = () => {
    if (!novoObj.trim()) return
    setObjetivos((o) => [...o, { id: novoId(), texto: novoObj.trim(), feito: false }])
    setNovoObj('')
  }

  const finalizar = () => {
    const id = criarBatalha({
      vicio: vicioFinal,
      desafioDias: desafio,
      declaracao: declaracao.trim(),
      motivos: motivos.trim(),
      fotoIds: [],
      objetivos,
      compromissoAceito: true,
    })
    onPronto(id)
  }

  if (passo === 0)
    return (
      <Wrap passo={0} onVoltar={voltar}>
        <h2 className="font-title text-2xl">Qual batalha você vai vencer?</h2>
        <div className="mt-4 grid gap-2">
          {[...VICIOS, 'Outro'].map((v) => (
            <button
              key={v}
              onClick={() => setVicio(v)}
              className={`rounded-xl px-4 py-3 text-left border transition ${
                vicio === v ? 'border-dourado bg-dourado/15 text-dourado shadow-glow-sm' : 'border-white/10 text-cinza'
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
        <Btn onClick={() => setPasso(1)} disabled={!vicioFinal}>Continuar</Btn>
      </Wrap>
    )

  if (passo === 1)
    return (
      <Wrap passo={1} onVoltar={voltar}>
        <h2 className="font-title text-2xl">Escolha o seu desafio</h2>
        <p className="mt-1 text-cinza/70 text-sm">Quantos dias você quer mirar primeiro?</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {DESAFIOS.map((d) => (
            <button
              key={d}
              onClick={() => setDesafio(d)}
              className={`rounded-xl py-5 border transition ${
                desafio === d ? 'border-dourado bg-dourado/15 text-dourado shadow-glow-sm' : 'border-white/10 text-cinza'
              }`}
            >
              <div className="font-title text-2xl">{d}</div>
              <div className="text-xs text-cinza/60">dias</div>
            </button>
          ))}
        </div>
        <Btn onClick={() => setPasso(2)}>Continuar</Btn>
      </Wrap>
    )

  if (passo === 2)
    return (
      <Wrap passo={2} onVoltar={voltar}>
        <h2 className="font-title text-2xl">Declaração de Liberdade</h2>
        <p className="mt-2 text-cinza/70">Complete a frase. Você vai reler isto nos momentos difíceis.</p>
        <p className="mt-4 text-dourado font-title">Estou iniciando meu Êxodo porque...</p>
        <textarea value={declaracao} onChange={(e) => setDeclaracao(e.target.value)} rows={4} className={input} placeholder="quero ser livre para..." />
        <Btn onClick={() => setPasso(3)} disabled={!declaracao.trim()}>Continuar</Btn>
      </Wrap>
    )

  if (passo === 3)
    return (
      <Wrap passo={3} onVoltar={voltar}>
        <h2 className="font-title text-2xl">Seus motivos</h2>
        <p className="mt-2 text-cinza/70">O que você quer proteger? Família, sonhos, propósito...</p>
        <textarea value={motivos} onChange={(e) => setMotivos(e.target.value)} rows={4} className={input} placeholder="Pelas pessoas e sonhos que me esperam na Terra Prometida..." />
        <Btn onClick={() => setPasso(4)}>Continuar</Btn>
      </Wrap>
    )

  if (passo === 4)
    return (
      <Wrap passo={4} onVoltar={voltar}>
        <h2 className="font-title text-2xl">Seu plano de ação</h2>
        <p className="mt-2 text-cinza/70">Defina objetivos concretos que vão te ajudar a vencer (opcional).</p>
        <div className="mt-4 flex gap-2">
          <input
            value={novoObj}
            onChange={(e) => setNovoObj(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addObj()}
            placeholder="Ex: trocar o gatilho das 22h por leitura"
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado"
          />
          <button onClick={addObj} className="rounded-xl bg-dourado/20 border border-dourado/40 px-4 text-dourado">
            <Icon name="plus" size={20} />
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {objetivos.map((o) => (
            <div key={o.id} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm">
              <span className="text-dourado"><Icon name="target" size={16} /></span>
              <span className="flex-1">{o.texto}</span>
              <button onClick={() => setObjetivos((os) => os.filter((x) => x.id !== o.id))} className="text-cinza/40">
                <Icon name="trash" size={16} />
              </button>
            </div>
          ))}
        </div>
        <Btn onClick={() => setPasso(5)}>Continuar</Btn>
      </Wrap>
    )

  // pacto de compromisso
  return (
    <Wrap passo={5} onVoltar={voltar}>
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
          <Icon name="shield" size={28} />
        </div>
        <h2 className="font-title text-2xl text-dourado">Pacto de Compromisso</h2>
      </div>
      <div className="mt-5 rounded-2xl border border-dourado/20 bg-white/[0.03] p-5 font-scripture text-lg leading-relaxed text-white/90">
        Eu, <span className="text-dourado font-semibold not-italic font-body">{estado.nome}</span>, decido hoje sair da escravidão de <span className="text-dourado not-italic font-body">{vicioFinal}</span>. Comprometo-me a perseverar um dia de cada vez, a buscar a Deus nos momentos de fraqueza e a não desistir, mesmo após uma queda. Esta é a minha travessia rumo à liberdade.
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm text-cinza/85">
        <input type="checkbox" checked={aceito} onChange={(e) => setAceito(e.target.checked)} className="mt-1 h-5 w-5 accent-[#D4AF37]" />
        <span>Eu me comprometo com este pacto diante de Deus.</span>
      </label>
      <input
        value={assinatura}
        onChange={(e) => setAssinatura(e.target.value)}
        placeholder="Assine com seu nome"
        className="mt-4 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-center font-scripture text-xl italic outline-none focus:border-dourado"
      />
      <Btn onClick={finalizar} disabled={!aceito || !assinatura.trim()}>
        Assinar e começar a travessia
      </Btn>
    </Wrap>
  )
}
