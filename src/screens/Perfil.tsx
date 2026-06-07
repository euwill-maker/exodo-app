import { useApp } from '../state/AppContext'
import { diasLivres } from '../lib/streak'
import { Icon } from '../components/Icon'

export function Perfil() {
  const { estado, resetar } = useApp()

  const totalDias = estado.batalhas.reduce((s, b) => s + diasLivres(b.dataInicio), 0)
  const melhor = estado.batalhas.reduce((m, b) => Math.max(m, b.melhorSequenciaDias), 0)

  const limpar = () => {
    if (confirm('Apagar TODOS os dados e recomeçar do zero? Isto não pode ser desfeito.')) {
      resetar()
    }
  }

  return (
    <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
          <Icon name="user" size={36} />
        </div>
        <h1 className="font-title text-2xl mt-3">{estado.nome}</h1>
        <p className="text-cinza/55 text-sm">Em travessia rumo à liberdade</p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="font-title text-2xl text-dourado">{estado.batalhas.length}</div>
          <div className="text-[10px] text-cinza/60 uppercase tracking-wide">Batalhas</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="font-title text-2xl text-dourado">{totalDias}</div>
          <div className="text-[10px] text-cinza/60 uppercase tracking-wide">Dias livres</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="font-title text-2xl text-dourado">{melhor}</div>
          <div className="text-[10px] text-cinza/60 uppercase tracking-wide">Melhor seq.</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
        <p className="font-scripture text-xl italic text-white/90">
          “Permanecei firmes na liberdade com que Cristo nos libertou.”
        </p>
        <p className="text-dourado text-sm mt-2">— Gálatas 5:1</p>
      </div>

      <button
        onClick={limpar}
        className="mt-10 w-full rounded-xl border border-red-500/40 py-3 text-red-400/90 text-sm"
      >
        Apagar dados e recomeçar
      </button>
      <p className="mt-3 text-center text-cinza/35 text-xs">
        Seus dados ficam salvos apenas neste aparelho.
      </p>
    </div>
  )
}
