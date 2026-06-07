import { Counter } from '../components/Counter'
import { JourneyBar } from '../components/JourneyBar'
import { useApp } from '../state/AppContext'
import { diasLivres } from '../lib/streak'
import { faseAtual } from '../lib/journey'
import { proximoMarco } from '../lib/milestones'
import { VERSICULOS_DIARIOS, indiceDoDia } from '../content/versiculos'

export function Home({ onSOS }: { onSOS: () => void }) {
  const { estado, registrarRecaida } = useApp()
  const p = estado.perfil!
  const dias = diasLivres(p.dataInicio)
  const fase = faseAtual(dias)
  const marco = proximoMarco(dias, p.desafioDias)
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
    <div className="px-6 pt-8 pb-28 max-w-md mx-auto space-y-6">
      <p className="text-cinza">
        Olá, <span className="text-white">{p.nome}</span> 👋
      </p>
      <Counter dataInicio={p.dataInicio} />
      <div className="text-center">
        <div className="font-title text-dourado text-lg">{fase.nome}</div>
        <p className="text-cinza text-sm mt-1">{fase.mensagem}</p>
      </div>
      <JourneyBar dias={dias} />
      {marco !== null && (
        <p className="text-center text-cinza text-sm">
          Próximo marco: <span className="text-dourado font-semibold">{marco} dias</span> (
          {marco - dias} restantes)
        </p>
      )}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
        <p className="italic">“{v.texto}”</p>
        <p className="mt-2 text-dourado text-sm">{v.referencia}</p>
      </div>
      <p className="text-center text-cinza/70 text-xs">
        Melhor sequência: {estado.progresso.melhorSequenciaDias} dias · Recomeços:{' '}
        {estado.progresso.vezesQueSeReergueu}
      </p>
      <button
        onClick={onSOS}
        className="w-full rounded-2xl bg-red-600 py-5 font-title text-lg font-bold shadow-lg active:scale-[0.98] transition"
      >
        As muralhas estão atacando
      </button>
      <button onClick={recair} className="w-full text-cinza/50 text-sm underline">
        Tive uma recaída
      </button>
    </div>
  )
}
