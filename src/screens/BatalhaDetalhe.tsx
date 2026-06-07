import { useState } from 'react'
import { JourneyBar } from '../components/JourneyBar'
import { ProgressRing } from '../components/ProgressRing'
import { Icon, type IconName } from '../components/Icon'
import { Fotos, AddFotos } from '../components/Fotos'
import { BotaoBatalha } from '../components/BotaoBatalha'
import { useApp } from '../state/AppContext'
import { partesTempo, diasLivres } from '../lib/streak'
import { faseAtual } from '../lib/journey'
import { proximoMarco, progressoSegmento } from '../lib/milestones'
import { VERSICULOS_DIARIOS, indiceDoDia } from '../content/versiculos'
import { CONQUISTAS } from '../content/conquistas'

export function BatalhaDetalhe({
  batalhaId,
  onVoltar,
  onSOS,
}: {
  batalhaId: string
  onVoltar: () => void
  onSOS: () => void
}) {
  const {
    estado,
    registrarRecaida,
    addObjetivo,
    toggleObjetivo,
    removerObjetivo,
    removerBatalha,
    addFotos,
    removerFoto,
  } = useApp()
  const b = estado.batalhas.find((x) => x.id === batalhaId)
  const [novoObj, setNovoObj] = useState('')

  if (!b) {
    onVoltar()
    return null
  }

  const dias = diasLivres(b.dataInicio)
  const { horas } = partesTempo(b.dataInicio)
  const fase = faseAtual(dias)
  const marco = proximoMarco(dias, b.desafioDias)
  const progresso = progressoSegmento(dias, b.desafioDias)
  const hoje = new Date().toISOString().slice(0, 10)
  const v = VERSICULOS_DIARIOS[indiceDoDia(hoje, VERSICULOS_DIARIOS.length)]

  const recair = () => {
    if (
      confirm(
        'Registrar uma recaída? Sua melhor sequência será guardada. Sem culpa — recomeçar faz parte da jornada.',
      )
    ) {
      registrarRecaida(b.id)
      alert('Levante-se. O deserto faz parte do caminho — Deus continua com você.')
    }
  }

  const apagar = () => {
    if (confirm(`Excluir a batalha "${b.vicio}"? Esta ação não pode ser desfeita.`)) {
      removerBatalha(b.id)
      onVoltar()
    }
  }

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto space-y-7 animate-fadeUp">
      {/* topo */}
      <div className="flex items-center justify-between">
        <button onClick={onVoltar} className="text-cinza/70 flex items-center gap-1 text-sm">
          <Icon name="back" size={20} /> Batalhas
        </button>
        <span className="rounded-full border border-dourado/40 bg-dourado/10 px-3 py-1 text-xs text-dourado">
          {b.vicio}
        </span>
        <button onClick={apagar} className="text-cinza/40">
          <Icon name="trash" size={18} />
        </button>
      </div>

      {/* anel + contador */}
      <ProgressRing progress={progresso} size={236} stroke={12}>
        <div className="text-center">
          <div className="font-title text-7xl font-extrabold text-dourado leading-none text-glow">{dias}</div>
          <div className="mt-1 text-xs tracking-[0.2em] text-cinza/70 uppercase">
            {dias === 1 ? 'dia livre' : 'dias livres'}
          </div>
          <div className="mt-0.5 text-[11px] text-cinza/50">+{horas}h</div>
        </div>
      </ProgressRing>

      {/* fase */}
      <div className="text-center -mt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-dourado/30 bg-white/5 px-4 py-1.5 text-dourado">
          <Icon name={fase.icone as IconName} size={18} />
          <span className="font-title font-semibold">{fase.nome}</span>
        </div>
        <p className="text-cinza/80 text-sm mt-2 px-4">{fase.mensagem}</p>
      </div>

      <JourneyBar dias={dias} />

      {marco !== null && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
          <p className="text-cinza/80 text-sm">
            Próximo marco: <span className="text-dourado font-semibold">{marco} dias</span>
            <span className="text-cinza/50"> · faltam {marco - dias}</span>
          </p>
        </div>
      )}

      {/* versículo */}
      <div className="relative rounded-3xl border border-dourado/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-center shadow-glow-sm backdrop-blur">
        <span className="absolute -top-4 left-5 font-scripture text-6xl text-dourado/40 leading-none">“</span>
        <p className="font-scripture text-2xl italic text-white/95 leading-snug">{v.texto}</p>
        <p className="mt-3 text-dourado text-sm font-semibold tracking-wide">— {v.referencia}</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
          <div className="font-title text-2xl text-dourado">{b.melhorSequenciaDias}</div>
          <div className="text-[11px] text-cinza/60 uppercase tracking-wide">Melhor sequência</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
          <div className="font-title text-2xl text-dourado">{b.vezesQueSeReergueu}</div>
          <div className="text-[11px] text-cinza/60 uppercase tracking-wide">Recomeços</div>
        </div>
      </div>

      {/* objetivos */}
      <div>
        <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-2">Plano de ação</h3>
        <div className="space-y-2">
          {b.objetivos.map((o) => (
            <div key={o.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <button
                onClick={() => toggleObjetivo(b.id, o.id)}
                className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                  o.feito ? 'border-dourado bg-dourado text-azul' : 'border-white/25 text-transparent'
                }`}
              >
                <Icon name="check" size={14} strokeWidth={2.4} />
              </button>
              <span className={`flex-1 text-sm ${o.feito ? 'text-cinza/40 line-through' : 'text-cinza/90'}`}>
                {o.texto}
              </span>
              <button onClick={() => removerObjetivo(b.id, o.id)} className="text-cinza/30">
                <Icon name="trash" size={15} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={novoObj}
            onChange={(e) => setNovoObj(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && novoObj.trim()) {
                addObjetivo(b.id, novoObj.trim())
                setNovoObj('')
              }
            }}
            placeholder="Novo objetivo..."
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-dourado"
          />
          <button
            onClick={() => {
              if (novoObj.trim()) {
                addObjetivo(b.id, novoObj.trim())
                setNovoObj('')
              }
            }}
            className="rounded-xl bg-dourado/20 border border-dourado/40 px-3 text-dourado"
          >
            <Icon name="plus" size={18} />
          </button>
        </div>
      </div>

      {/* motivos & fotos */}
      <div>
        <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-2">Meus motivos</h3>
        {b.motivos && <p className="text-cinza/90 text-sm mb-3 whitespace-pre-wrap">{b.motivos}</p>}
        <div className="space-y-2">
          <Fotos ids={b.fotoIds} onRemover={(id) => removerFoto(b.id, id)} />
          <AddFotos onAdd={(ids) => addFotos(b.id, ids)} />
        </div>
      </div>

      {/* conquistas */}
      <div>
        <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-2">Conquistas</h3>
        <div className="grid grid-cols-3 gap-2">
          {CONQUISTAS.map((c) => {
            const on = b.conquistasDesbloqueadas.includes(c.id) || dias >= c.marcaDias
            return (
              <div
                key={c.id}
                className={`rounded-xl border p-2 text-center ${
                  on ? 'border-dourado/50 bg-dourado/10' : 'border-white/10 opacity-50'
                }`}
              >
                <div className={`flex justify-center ${on ? 'text-dourado' : 'text-cinza/50'}`}>
                  <Icon name={on ? 'medal' : 'shield'} size={20} />
                </div>
                <div className={`text-[10px] mt-1 leading-tight ${on ? 'text-dourado' : 'text-cinza/50'}`}>
                  {c.nome}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button onClick={recair} className="w-full text-cinza/45 text-sm underline">
        Tive uma recaída
      </button>

      {/* botão flutuante de socorro (sempre visível) */}
      <BotaoBatalha onClick={onSOS} />
    </div>
  )
}
