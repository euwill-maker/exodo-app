import { useApp } from '../state/AppContext'
import { DEVOCIONAIS } from '../content/devocionais'
import { indiceDoDia } from '../content/versiculos'

export function Devocional() {
  const { estado, concluirDevocional } = useApp()
  const hoje = new Date().toISOString().slice(0, 10)
  const d = DEVOCIONAIS[indiceDoDia(hoje, DEVOCIONAIS.length)]
  const feito = estado.progresso.devocionaisConcluidos.includes(hoje)

  const Secao = ({ titulo, texto }: { titulo: string; texto: string }) => (
    <div>
      <h3 className="font-title text-dourado text-sm uppercase tracking-wide">{titulo}</h3>
      <p className="text-cinza/90 mt-1 leading-relaxed">{texto}</p>
    </div>
  )

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto space-y-5 animate-fadeUp">
      <div>
        <p className="text-cinza/60 text-xs uppercase tracking-[0.2em]">Devocional de hoje</p>
        <h2 className="font-title text-2xl text-dourado text-glow mt-1">{d.tema}</h2>
      </div>
      <div className="relative rounded-3xl border border-dourado/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-center shadow-glow-sm">
        <span className="absolute -top-4 left-5 font-scripture text-6xl text-dourado/40 leading-none">“</span>
        <p className="font-scripture text-2xl italic text-white/95 leading-snug">{d.versiculo}</p>
        <p className="text-dourado text-sm mt-3 font-semibold">— {d.referencia}</p>
      </div>
      <Secao titulo="Reflexão" texto={d.reflexao} />
      <Secao titulo="Aplicação" texto={d.aplicacao} />
      <Secao titulo="Oração" texto={d.oracao} />
      <button
        onClick={() => concluirDevocional(hoje)}
        disabled={feito}
        className="w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition disabled:opacity-40 disabled:shadow-none"
      >
        {feito ? '✓ Devocional concluído' : 'Concluir devocional'}
      </button>
    </div>
  )
}
