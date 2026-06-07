import { FASES } from '../content/fases'
import { faseAtual } from '../lib/journey'
import { Icon, type IconName } from './Icon'

export function JourneyBar({ dias }: { dias: number }) {
  const atual = faseAtual(dias)
  const idxAtual = FASES.findIndex((f) => f.id === atual.id)

  return (
    <div className="relative px-1">
      <div className="absolute left-7 right-7 top-6 h-px bg-white/10" />
      <div
        className="absolute left-7 top-6 h-px bg-gradient-to-r from-dourado to-dourado-claro transition-all duration-1000"
        style={{ width: `calc((100% - 3.5rem) * ${idxAtual / (FASES.length - 1)})` }}
      />
      <div className="relative flex justify-between">
        {FASES.map((f, i) => {
          const concluida = i < idxAtual
          const ativa = i === idxAtual
          return (
            <div key={f.id} className="flex w-14 flex-col items-center gap-1.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                  ativa
                    ? 'border-dourado bg-dourado/15 text-dourado shadow-glow-sm scale-110'
                    : concluida
                      ? 'border-dourado/60 bg-dourado/5 text-dourado/80'
                      : 'border-white/10 bg-white/[0.03] text-white/30'
                }`}
              >
                <Icon name={f.icone as IconName} size={22} />
              </div>
              <span
                className={`text-center text-[9px] leading-tight ${
                  ativa ? 'font-semibold text-dourado' : 'text-cinza/50'
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
