import { useApp } from '../state/AppContext'
import { CONQUISTAS } from '../content/conquistas'
import { diasLivres } from '../lib/streak'

export function Conquistas() {
  const { estado } = useApp()
  const dias = diasLivres(estado.perfil!.dataInicio)
  const total = CONQUISTAS.length
  const abertas = CONQUISTAS.filter(
    (c) => estado.progresso.conquistasDesbloqueadas.includes(c.id) || dias >= c.marcaDias,
  ).length

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto animate-fadeUp">
      <h2 className="font-title text-2xl">Conquistas</h2>
      <p className="text-cinza/60 text-sm mt-1">
        {abertas} de {total} medalhas conquistadas
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {CONQUISTAS.map((c) => {
          const desbloqueada =
            estado.progresso.conquistasDesbloqueadas.includes(c.id) || dias >= c.marcaDias
          return (
            <div
              key={c.id}
              className={`relative overflow-hidden rounded-2xl border p-5 text-center transition ${
                desbloqueada
                  ? 'border-dourado/50 bg-gradient-to-b from-dourado/15 to-transparent shadow-glow-sm'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              {desbloqueada && (
                <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-dourado/20 blur-2xl" />
              )}
              <div className={`text-4xl ${desbloqueada ? '' : 'grayscale opacity-40'}`}>
                {desbloqueada ? '🏅' : '🔒'}
              </div>
              <div
                className={`font-title mt-2 leading-tight ${
                  desbloqueada ? 'text-dourado' : 'text-cinza/70'
                }`}
              >
                {c.nome}
              </div>
              <div className="text-xs text-cinza/50 mt-1">{c.marcaDias} dias</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
