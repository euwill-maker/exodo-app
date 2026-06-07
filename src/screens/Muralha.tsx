import { useState, useEffect, type ReactNode } from 'react'
import { useApp } from '../state/AppContext'
import { Icon, type IconName } from '../components/Icon'
import { Fotos } from '../components/Fotos'
import { infoPatente, PONTOS_POR_VITORIA } from '../lib/patente'
import type { Batalha } from '../types'

type Modo = 'hub' | 'armadura' | 'onda' | 'guerra' | 'vitoria'

function vibrar(ms: number | number[]) {
  try {
    navigator.vibrate?.(ms)
  } catch {
    /* ignora */
  }
}

/* ---------- Shell comum ---------- */
function Shell({
  children,
  onSair,
  rotulo = 'Fechar',
}: {
  children: ReactNode
  onSair: () => void
  rotulo?: string
}) {
  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto flex flex-col">
      <button onClick={onSair} className="self-end text-cinza/60 text-sm flex items-center gap-1">
        {rotulo === 'Voltar' && <Icon name="back" size={16} />} {rotulo}
      </button>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  )
}

function Btn({
  onClick,
  children,
  variante = 'ouro',
}: {
  onClick: () => void
  children: ReactNode
  variante?: 'ouro' | 'fantasma'
}) {
  const base =
    'mt-8 w-full rounded-xl py-3.5 font-title font-bold active:scale-[0.98] transition flex items-center justify-center gap-2'
  const cls =
    variante === 'ouro'
      ? 'bg-gradient-to-b from-dourado-claro to-dourado text-azul shadow-glow-sm'
      : 'border border-white/15 text-cinza'
  return (
    <button onClick={onClick} className={`${base} ${cls}`}>
      {children}
    </button>
  )
}

/* ---------- HUB ---------- */
function Hub({ onEscolher, onFechar }: { onEscolher: (m: Modo) => void; onFechar: () => void }) {
  const opcoes: { id: Modo; icone: IconName; titulo: string; desc: string }[] = [
    { id: 'armadura', icone: 'shield', titulo: 'Vista a Armadura de Deus', desc: 'Equipe-se com a força de Deus, peça por peça.' },
    { id: 'onda', icone: 'waves', titulo: 'Surfe a Onda', desc: 'A vontade é uma onda. Veja ela passar.' },
    { id: 'guerra', icone: 'flame', titulo: 'Sala de Guerra', desc: 'Clame, lembre seus porquês e chame reforço.' },
  ]
  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto flex flex-col animate-fadeUp">
      <button onClick={onFechar} className="self-end text-cinza/60 text-sm">Fechar</button>
      <div className="flex-1 flex flex-col justify-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-400 animate-pulseGlow">
          <Icon name="sword" size={30} />
        </div>
        <h2 className="font-title text-3xl text-center text-glow">A tentação atacou.</h2>
        <p className="text-cinza/80 text-center mt-2">
          Respire — você vai vencer. Escolha sua arma:
        </p>
        <div className="mt-7 space-y-3">
          {opcoes.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                vibrar(20)
                onEscolher(o.id)
              }}
              className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-dourado/50 active:scale-[0.99]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
                <Icon name={o.icone} size={24} />
              </div>
              <div className="flex-1">
                <div className="font-title font-semibold text-dourado">{o.titulo}</div>
                <div className="text-cinza/60 text-xs mt-0.5">{o.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- ARMADURA DE DEUS (Efésios 6) ---------- */
interface Peca {
  nome: string
  icone: IconName
  versiculo: string
  ref: string
  acao: string
}
const ARMADURA: Peca[] = [
  { nome: 'Cinturão da Verdade', icone: 'book', versiculo: 'Estai, pois, firmes, tendo cingidos os vossos lombos com a verdade.', ref: 'Efésios 6:14', acao: 'Diga a verdade: esta vontade é passageira e não me define.' },
  { nome: 'Couraça da Justiça', icone: 'heart', versiculo: 'Vestindo a couraça da justiça.', ref: 'Efésios 6:14', acao: 'Meu coração está protegido. Em Cristo, eu sou justificado.' },
  { nome: 'Sapatos da Paz', icone: 'leaf', versiculo: 'Calçados os pés na preparação do evangelho da paz.', ref: 'Efésios 6:15', acao: 'Escolho a paz, não o impulso. Fico firme onde estou.' },
  { nome: 'Escudo da Fé', icone: 'shield', versiculo: 'Tomando o escudo da fé, com o qual podereis apagar todos os dardos inflamados do maligno.', ref: 'Efésios 6:16', acao: 'Levanto o escudo. Cada dardo de tentação se apaga aqui.' },
  { nome: 'Capacete da Salvação', icone: 'sunrise', versiculo: 'Tomai também o capacete da salvação.', ref: 'Efésios 6:17', acao: 'Protejo a minha mente. Sou salvo, sou livre, sou amado.' },
  { nome: 'Espada do Espírito', icone: 'sword', versiculo: 'E a espada do Espírito, que é a palavra de Deus.', ref: 'Efésios 6:17', acao: 'Empunho a Palavra: “Resisti ao diabo, e ele fugirá de vós.”' },
]

function Armadura({ onVoltar, onVencer }: { onVoltar: () => void; onVencer: () => void }) {
  const [i, setI] = useState(0)
  const concluido = i >= ARMADURA.length

  const avancar = () => {
    vibrar(35)
    setI((v) => v + 1)
  }

  if (concluido)
    return (
      <Shell onSair={onVoltar} rotulo="Voltar">
        <div className="text-center animate-fadeUp">
          <div className="text-5xl mb-3">🛡️</div>
          <h2 className="font-title text-3xl text-dourado text-glow">Você está vestido de Deus.</h2>
          <p className="mt-3 text-cinza/85">
            De pé, soldado. A armadura está completa e a batalha, vencida.
          </p>
          <Btn onClick={onVencer}>Venci esta batalha</Btn>
        </div>
      </Shell>
    )

  const peca = ARMADURA[i]
  return (
    <Shell onSair={onVoltar} rotulo="Voltar">
      <div className="animate-fadeUp" key={i}>
        <p className="text-center text-cinza/60 text-xs uppercase tracking-[0.2em]">Vista a Armadura de Deus</p>
        <div className="mt-3 flex justify-center gap-2">
          {ARMADURA.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${idx < i ? 'bg-dourado' : idx === i ? 'bg-dourado/60 scale-125' : 'bg-white/15'}`}
            />
          ))}
        </div>
        <div className="mx-auto my-6 flex h-20 w-20 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado shadow-glow">
          <Icon name={peca.icone} size={36} />
        </div>
        <h2 className="font-title text-2xl text-center text-dourado">{peca.nome}</h2>
        <p className="font-scripture text-xl italic text-white/90 text-center mt-3 leading-snug">
          “{peca.versiculo}”
        </p>
        <p className="text-dourado text-sm text-center mt-2 font-semibold">— {peca.ref}</p>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-cinza/90">
          {peca.acao}
        </div>
        <Btn onClick={avancar}>
          {i === ARMADURA.length - 1 ? 'Empunhar a espada ⚔️' : 'Vestir e avançar'}
        </Btn>
      </div>
    </Shell>
  )
}

/* ---------- SURFE A ONDA (urge surfing) ---------- */
const ONDA_TOTAL = 180

function faseOnda(fr: number): string {
  if (fr < 0.25) return 'A onda está subindo. Respire fundo — só aguenta.'
  if (fr < 0.55) return 'Você está no pico. Não decida nada agora. Só observe.'
  if (fr < 0.85) return 'Está sentindo? Ela já está perdendo a força.'
  return 'A onda passou. Você surfou e continua de pé.'
}

function Onda({ onVoltar, onVencer }: { onVoltar: () => void; onVencer: () => void }) {
  const [restante, setRestante] = useState(ONDA_TOTAL)
  useEffect(() => {
    if (restante <= 0) {
      vibrar([60, 40, 120])
      return
    }
    const t = setTimeout(() => setRestante((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [restante])

  const fr = 1 - restante / ONDA_TOTAL
  const mm = Math.floor(restante / 60)
  const ss = String(restante % 60).padStart(2, '0')
  const acabou = restante <= 0

  return (
    <Shell onSair={onVoltar} rotulo="Voltar">
      <div className="text-center animate-fadeUp">
        <p className="text-cinza/60 text-xs uppercase tracking-[0.2em]">A vontade é uma onda</p>
        <div className="relative mx-auto my-8 h-56 w-56">
          <div className="absolute inset-0 rounded-full bg-dourado/10 blur-2xl" />
          <div className="absolute inset-4 rounded-full border-2 border-dourado/40 bg-gradient-to-b from-dourado/15 to-transparent animate-breathe" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {acabou ? (
              <span className="text-5xl">🕊️</span>
            ) : (
              <>
                <div className="font-title text-5xl font-extrabold text-dourado">{mm}:{ss}</div>
                <div className="text-cinza/60 text-xs mt-1">inspire e expire devagar</div>
              </>
            )}
          </div>
        </div>
        <p className="font-title text-lg text-white/90 px-4 min-h-[3.5rem]">{faseOnda(fr)}</p>
        <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-dourado to-dourado-claro transition-all duration-1000"
            style={{ width: `${Math.round(fr * 100)}%` }}
          />
        </div>
        {acabou ? (
          <Btn onClick={onVencer}>Venci esta batalha</Btn>
        ) : (
          <Btn onClick={onVencer} variante="fantasma">Já passou — venci</Btn>
        )}
      </div>
    </Shell>
  )
}

/* ---------- SALA DE GUERRA ---------- */
function Guerra({
  p,
  onVoltar,
  onVencer,
}: {
  p: Batalha | null
  onVoltar: () => void
  onVencer: () => void
}) {
  const [declarou, setDeclarou] = useState(false)
  const louvor = 'https://www.youtube.com/results?search_query=louvor+adora%C3%A7%C3%A3o+para+momentos+dif%C3%ADceis'
  const pedirOracao = `https://wa.me/?text=${encodeURIComponent(
    'Irmão(ã), estou numa batalha difícil agora e preciso de uma oração. Pode orar por mim?',
  )}`

  return (
    <Shell onSair={onVoltar} rotulo="Voltar">
      <div className="animate-fadeUp">
        <div className="text-center">
          <div className="text-4xl mb-2">🔥</div>
          <p className="text-cinza/60 text-xs uppercase tracking-[0.2em]">Sala de Guerra</p>
          <h2 className="font-title text-2xl text-dourado mt-1">Clame, e serás salvo.</h2>
        </div>

        {p?.declaracao && (
          <blockquote className="mt-5 rounded-2xl border border-dourado/20 bg-white/[0.03] p-4 font-scripture text-xl italic text-white/90 text-center">
            “Estou iniciando meu Êxodo porque {p.declaracao}”
          </blockquote>
        )}

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
          <p className="text-cinza/60 text-xs uppercase tracking-wide mb-1">Por isto você luta</p>
          <p className="text-white/90 whitespace-pre-wrap">
            {p?.motivos || 'Pelas pessoas e sonhos que te esperam na Terra Prometida.'}
          </p>
          {p && p.fotoIds.length > 0 && (
            <div className="mt-3">
              <Fotos ids={p.fotoIds} />
            </div>
          )}
        </div>

        {/* declaração em voz alta — interação */}
        <button
          onClick={() => {
            vibrar(50)
            setDeclarou(true)
          }}
          className={`mt-4 w-full rounded-2xl border p-4 text-center transition active:scale-[0.98] ${
            declarou ? 'border-dourado/60 bg-dourado/10' : 'border-white/15'
          }`}
        >
          <p className="font-title text-lg text-white/95">
            {declarou ? '🔥 “Maior é o que está em mim!”' : 'Tocar e declarar em voz alta'}
          </p>
          {declarou && <p className="text-dourado text-sm mt-1">Você declarou. O céu te ouviu. 🙌</p>}
        </button>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={louvor}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-cinza/90 active:scale-[0.98] transition"
          >
            <Icon name="music" size={18} /> Tocar louvor
          </a>
          <a
            href={pedirOracao}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-cinza/90 active:scale-[0.98] transition"
          >
            <Icon name="phone" size={18} /> Chamar reforço
          </a>
        </div>

        <Btn onClick={onVencer}>Venci esta batalha</Btn>
      </div>
    </Shell>
  )
}

/* ---------- TELA DE VITÓRIA (recompensa) ---------- */
function Vitoria({ onFechar }: { onFechar: () => void }) {
  const { estado } = useApp()
  const info = infoPatente(estado.pontos)
  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto flex flex-col justify-center text-center relative overflow-hidden animate-fadeUp">
      {/* faíscas */}
      {['✨', '⚡', '✨', '⭐', '✨', '⚡'].map((s, i) => (
        <span
          key={i}
          className="absolute text-2xl animate-floatGlow"
          style={{ left: `${10 + i * 14}%`, top: `${12 + (i % 3) * 22}%`, animationDelay: `${i * 0.3}s` }}
        >
          {s}
        </span>
      ))}
      <div className="relative">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-dourado-claro to-dourado text-azul shadow-glow animate-pulseGlow">
          <Icon name="medal" size={44} />
        </div>
        <h2 className="font-title text-4xl text-dourado text-glow">Vitória!</h2>
        <p className="text-cinza/85 mt-2">Você resistiu e venceu mais uma batalha. 🙌</p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-dourado/40 bg-dourado/10 px-5 py-2 text-dourado font-title text-xl">
          +{PONTOS_POR_VITORIA} XP
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-title text-dourado">{info.atual.nome}</span>
            <span className="text-cinza/60">{estado.pontos} XP</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-dourado to-dourado-claro transition-all duration-700"
              style={{ width: `${Math.round(info.progresso * 100)}%` }}
            />
          </div>
          <p className="text-cinza/55 text-xs mt-2">
            {info.proxima ? `Faltam ${info.faltam} XP para ${info.proxima.nome}` : 'Patente máxima alcançada!'}
            {' · '}
            {estado.vitorias} vitórias
          </p>
        </div>

        <Btn onClick={onFechar}>Continuar firme</Btn>
      </div>
    </div>
  )
}

/* ---------- Componente principal ---------- */
export function Muralha({
  batalhaId,
  onFechar,
}: {
  batalhaId?: string | null
  onFechar: () => void
}) {
  const { estado, registrarVitoria } = useApp()
  const p =
    estado.batalhas.find((b) => b.id === batalhaId) ?? estado.batalhas[0] ?? null
  const [modo, setModo] = useState<Modo>('hub')

  const vencer = () => {
    vibrar([40, 50, 80])
    registrarVitoria()
    setModo('vitoria')
  }

  if (modo === 'vitoria') return <Vitoria onFechar={onFechar} />
  if (modo === 'armadura') return <Armadura onVoltar={() => setModo('hub')} onVencer={vencer} />
  if (modo === 'onda') return <Onda onVoltar={() => setModo('hub')} onVencer={vencer} />
  if (modo === 'guerra') return <Guerra p={p} onVoltar={() => setModo('hub')} onVencer={vencer} />
  return <Hub onEscolher={setModo} onFechar={onFechar} />
}
