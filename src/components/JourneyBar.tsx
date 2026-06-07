import { FASES } from '../content/fases'
import { faseAtual } from '../lib/journey'

export function JourneyBar({ dias }: { dias: number }) {
  const atual = faseAtual(dias)
  return (
    <div className="flex items-start gap-1">
      {FASES.map((f) => {
        const ativa = f.id === atual.id
        const passada = dias >= (f.maxDias ?? Infinity)
        return (
          <div key={f.id} className="flex-1 text-center">
            <div
              className={`h-1.5 rounded-full ${
                passada ? 'bg-dourado' : ativa ? 'bg-dourado/70' : 'bg-white/15'
              }`}
            />
            <div
              className={`mt-1 text-[10px] leading-tight ${
                ativa ? 'text-dourado font-semibold' : 'text-cinza/60'
              }`}
            >
              {f.nome.replace('Travessia do ', '')}
            </div>
          </div>
        )
      })}
    </div>
  )
}
