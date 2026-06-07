import { partesTempo } from '../lib/streak'

export function Counter({ dataInicio }: { dataInicio: string }) {
  const { dias, horas } = partesTempo(dataInicio)
  return (
    <div className="text-center">
      <div className="font-title text-7xl font-extrabold text-dourado leading-none">{dias}</div>
      <div className="mt-1 text-cinza">
        {dias === 1 ? 'dia' : 'dias'} · {horas}h em liberdade
      </div>
    </div>
  )
}
