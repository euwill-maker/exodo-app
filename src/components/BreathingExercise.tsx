import { useEffect, useState } from 'react'

const FASES = [
  { rotulo: 'Inspire', ms: 4000, escala: 'scale-110' },
  { rotulo: 'Segure', ms: 4000, escala: 'scale-110' },
  { rotulo: 'Expire', ms: 6000, escala: 'scale-75' },
]

export function BreathingExercise() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % FASES.length), FASES[i].ms)
    return () => clearTimeout(t)
  }, [i])
  const fase = FASES[i]
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div
        className={`h-40 w-40 rounded-full bg-dourado/20 border-2 border-dourado transition-transform duration-[2000ms] ${fase.escala}`}
      />
      <p className="font-title text-2xl text-dourado">{fase.rotulo}</p>
    </div>
  )
}
