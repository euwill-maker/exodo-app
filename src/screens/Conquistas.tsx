import { useApp } from '../state/AppContext'
import { CONQUISTAS } from '../content/conquistas'
import { diasLivres } from '../lib/streak'

export function Conquistas() {
  const { estado } = useApp()
  const dias = diasLivres(estado.perfil!.dataInicio)
  return (
    <div className="px-6 pt-8 pb-28 max-w-md mx-auto">
      <h2 className="font-title text-2xl mb-4">Conquistas</h2>
      <div className="grid grid-cols-2 gap-3">
        {CONQUISTAS.map((c) => {
          const desbloqueada =
            estado.progresso.conquistasDesbloqueadas.includes(c.id) || dias >= c.marcaDias
          return (
            <div
              key={c.id}
              className={`rounded-2xl border p-4 text-center ${
                desbloqueada ? 'border-dourado bg-dourado/10' : 'border-white/10 opacity-50'
              }`}
            >
              <div className="text-3xl">{desbloqueada ? '🏅' : '🔒'}</div>
              <div className={`font-title mt-2 ${desbloqueada ? 'text-dourado' : 'text-cinza'}`}>
                {c.nome}
              </div>
              <div className="text-xs text-cinza/70 mt-1">{c.marcaDias} dias</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
