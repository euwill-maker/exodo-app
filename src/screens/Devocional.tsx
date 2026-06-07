import { useApp } from '../state/AppContext'
import { DEVOCIONAIS } from '../content/devocionais'
import { indiceDoDia } from '../content/versiculos'

export function Devocional() {
  const { estado, concluirDevocional } = useApp()
  const hoje = new Date().toISOString().slice(0, 10)
  const d = DEVOCIONAIS[indiceDoDia(hoje, DEVOCIONAIS.length)]
  const feito = estado.progresso.devocionaisConcluidos.includes(hoje)
  return (
    <div className="px-6 pt-8 pb-28 max-w-md mx-auto space-y-4">
      <p className="text-cinza text-sm">Devocional de hoje</p>
      <h2 className="font-title text-2xl text-dourado">{d.tema}</h2>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <p className="italic">“{d.versiculo}”</p>
        <p className="text-dourado text-sm mt-1">{d.referencia}</p>
      </div>
      <div>
        <h3 className="font-title text-dourado">Reflexão</h3>
        <p className="text-cinza mt-1">{d.reflexao}</p>
      </div>
      <div>
        <h3 className="font-title text-dourado">Aplicação</h3>
        <p className="text-cinza mt-1">{d.aplicacao}</p>
      </div>
      <div>
        <h3 className="font-title text-dourado">Oração</h3>
        <p className="text-cinza mt-1">{d.oracao}</p>
      </div>
      <button
        onClick={() => concluirDevocional(hoje)}
        disabled={feito}
        className="w-full rounded-xl bg-dourado py-3 font-title font-bold text-azul disabled:opacity-40"
      >
        {feito ? 'Devocional concluído ✓' : 'Concluir devocional'}
      </button>
    </div>
  )
}
