import { FASES } from '../content/fases'
import { faseAtual } from '../lib/journey'

export function JourneyBar({ dias }: { dias: number }) {
  const atual = faseAtual(dias)
  const idxAtual = FASES.findIndex((f) => f.id === atual.id)

  return (
    <div className="relative px-2">
      {/* linha de base */}
      <div className="absolute left-6 right-6 top-5 h-0.5 bg-white/10" />
      {/* linha de progresso (até a fase atual) */}
      <div
        className="absolute left-6 top-5 h-0.5 bg-gradient-to-r from-dourado to-dourado-claro transition-all duration-1000"
        style={{ width: `calc((100% - 3rem) * ${idxAtual / (FASES.length - 1)})` }}
      />
      <div className="relative flex justify-between">
        {FASES.map((f, i) => {
          const concluida = i < idxAtual
          const ativa = i === idxAtual
          return (
            <div key={f.id} className="flex flex-col items-center gap-1.5 w-14">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-base transition-all ${
                  ativa
                    ? 'border-dourado bg-dourado/20 shadow-glow-sm scale-110'
                    : concluida
                      ? 'border-dourado/70 bg-dourado/10'
                      : 'border-white/15 bg-white/5 grayscale opacity-60'
                }`}
              >
                <span>{f.icone}</span>
              </div>
              <span
                className={`text-[9px] leading-tight text-center ${
                  ativa ? 'text-dourado font-semibold' : 'text-cinza/55'
                }`}
              >
                {f.nome.replace('Travessia do ', '')}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
