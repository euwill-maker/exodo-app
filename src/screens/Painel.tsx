import { useApp } from '../state/AppContext'
import { diasLivres } from '../lib/streak'
import { faseAtual } from '../lib/journey'
import { Icon, type IconName } from '../components/Icon'

export function Painel({
  onAbrir,
  onNova,
}: {
  onAbrir: (id: string) => void
  onNova: () => void
}) {
  const { estado } = useApp()

  return (
    <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
      <p className="text-cinza/70">Olá, <span className="text-white font-semibold">{estado.nome}</span> 👋</p>
      <h1 className="font-title text-3xl text-dourado text-glow mt-1">Suas batalhas</h1>
      <p className="text-cinza/60 text-sm mt-1">Cada vício é uma travessia rumo à liberdade.</p>

      {estado.batalhas.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
            <Icon name="target" size={28} />
          </div>
          <p className="text-cinza/85">Você ainda não tem nenhuma batalha.</p>
          <p className="text-cinza/55 text-sm mt-1">Comece sua primeira travessia agora.</p>
          <button
            onClick={onNova}
            className="mt-6 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
          >
            Criar primeira batalha
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {estado.batalhas.map((b) => {
            const dias = diasLivres(b.dataInicio)
            const fase = faseAtual(dias)
            return (
              <button
                key={b.id}
                onClick={() => onAbrir(b.id)}
                className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-dourado/40 active:scale-[0.99]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
                  <Icon name={fase.icone as IconName} size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-title font-semibold">{b.vicio}</div>
                  <div className="text-cinza/55 text-xs">{fase.nome}</div>
                </div>
                <div className="text-right">
                  <div className="font-title text-2xl text-dourado leading-none">{dias}</div>
                  <div className="text-cinza/50 text-[10px] uppercase tracking-wide">dias</div>
                </div>
              </button>
            )
          })}

          <button
            onClick={onNova}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-dourado/40 py-4 text-dourado active:scale-[0.99] transition"
          >
            <Icon name="plus" size={20} /> Nova batalha
          </button>
        </div>
      )}
    </div>
  )
}
