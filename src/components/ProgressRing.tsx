import { useEffect, useState, type ReactNode } from 'react'

interface Props {
  progress: number // 0..1
  size?: number
  stroke?: number
  children: ReactNode
}

export function ProgressRing({ progress, size = 240, stroke = 12, children }: Props) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, progress))

  // anima do 0 até o valor ao montar
  const [anim, setAnim] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setAnim(clamped), 120)
    return () => clearTimeout(t)
  }, [clamped])

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* brilho pulsante atrás do anel */}
      <div className="absolute inset-6 rounded-full bg-dourado/15 blur-2xl animate-floatGlow" />
      <svg width={size} height={size} className="relative -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6C879" />
            <stop offset="100%" stopColor="#C9A24B" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - anim)}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: 'drop-shadow(0 0 6px rgba(201,162,75,0.6))',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
