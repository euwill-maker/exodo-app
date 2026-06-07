import { JourneyBar } from '../components/JourneyBar'
import { ProgressRing } from '../components/ProgressRing'
import { Icon, type IconName } from '../components/Icon'
import { useApp } from '../state/AppContext'
import { partesTempo, diasLivres } from '../lib/streak'
import { faseAtual } from '../lib/journey'
import { proximoMarco, progressoSegmento } from '../lib/milestones'
import { VERSICULOS_DIARIOS, indiceDoDia } from '../content/versiculos'

export function Home({ onSOS }: { onSOS: () => void }) {
  const { estado, registrarRecaida } = useApp()
  const p = estado.perfil!
  const dias = diasLivres(p.dataInicio)
  const { horas } = partesTempo(p.dataInicio)
  const fase = faseAtual(dias)
  const marco = proximoMarco(dias, p.desafioDias)
  const progresso = progressoSegmento(dias, p.desafioDias)
  const hoje = new Date().toISOString().slice(0, 10)
  const v = VERSICULOS_DIARIOS[indiceDoDia(hoje, VERSICULOS_DIARIOS.length)]

  const recair = () => {
    if (
      confirm(
        'Registrar uma recaída? Sua melhor sequência será guardada. Sem culpa — recomeçar faz parte da jornada.',
      )
    ) {
      registrarRecaida()
      alert('Levante-se. O deserto faz parte do caminho — Deus continua com você.')
    }
  }

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto space-y-7 animate-fadeUp">
      {/* topo */}
      <div className="flex items-center justify-between">
        <p className="text-cinza/90">
          Olá, <span className="text-white font-semibold">{p.nome}</span> 👋
        </p>
        <span className="rounded-full border border-dourado/40 bg-dourado/10 px-3 py-1 text-xs text-dourado">
          {p.vicio}
        </span>
      </div>

      {/* anel de progresso + contador */}
      <ProgressRing progress={progresso} size={236} stroke={12}>
        <div className="text-center">
          <div className="font-title text-7xl font-extrabold text-dourado leading-none text-glow">
            {dias}
          </div>
          <div className="mt-1 text-xs tracking-[0.2em] text-cinza/70 uppercase">
            {dias === 1 ? 'dia livre' : 'dias livres'}
          </div>
          <div className="mt-0.5 text-[11px] text-cinza/50">+{horas}h</div>
        </div>
      </ProgressRing>

      {/* fase atual */}
      <div className="text-center -mt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-dourado/30 bg-white/5 px-4 py-1.5 text-dourado">
          <Icon name={fase.icone as IconName} size={18} />
          <span className="font-title font-semibold">{fase.nome}</span>
        </div>
        <p className="text-cinza/80 text-sm mt-2 px-4">{fase.mensagem}</p>
      </div>

      {/* jornada */}
      <JourneyBar dias={dias} />

      {/* próximo marco */}
      {marco !== null && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
          <p className="text-cinza/80 text-sm">
            Próximo marco:{' '}
            <span className="text-dourado font-semibold">{marco} dias</span>
            <span className="text-cinza/50"> · faltam {marco - dias}</span>
          </p>
        </div>
      )}

      {/* versículo do dia (vidro) */}
      <div className="relative rounded-3xl border border-dourado/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-center shadow-glow-sm backdrop-blur">
        <span className="absolute -top-4 left-5 font-scripture text-6xl text-dourado/40 leading-none">“</span>
        <p className="font-scripture text-2xl italic text-white/95 leading-snug">{v.texto}</p>
        <p className="mt-3 text-dourado text-sm font-semibold tracking-wide">— {v.referencia}</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
          <div className="font-title text-2xl text-dourado">{estado.progresso.melhorSequenciaDias}</div>
          <div className="text-[11px] text-cinza/60 uppercase tracking-wide">Melhor sequência</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
          <div className="font-title text-2xl text-dourado">{estado.progresso.vezesQueSeReergueu}</div>
          <div className="text-[11px] text-cinza/60 uppercase tracking-wide">Recomeços</div>
        </div>
      </div>

      {/* botão de emergência */}
      <button
        onClick={onSOS}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-red-500 to-red-700 py-5 font-title text-lg font-bold shadow-sos active:scale-[0.98] transition animate-pulseGlow"
      >
        <Icon name="shield" size={22} /> As muralhas estão atacando
      </button>

      <button onClick={recair} className="w-full text-cinza/45 text-sm underline">
        Tive uma recaída
      </button>
    </div>
  )
}
