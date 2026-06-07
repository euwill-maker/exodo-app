// Cenário-assinatura do Êxodo: céu estrelado + amanhecer dourado + serra (deserto/Sinai).
// Fixo ao fundo de todas as telas.

const STARS: { x: number; y: number; r: number; o: number }[] = [
  { x: 8, y: 12, r: 0.18, o: 0.7 },
  { x: 18, y: 26, r: 0.12, o: 0.5 },
  { x: 27, y: 9, r: 0.15, o: 0.6 },
  { x: 35, y: 20, r: 0.1, o: 0.45 },
  { x: 44, y: 6, r: 0.2, o: 0.8 },
  { x: 52, y: 17, r: 0.12, o: 0.5 },
  { x: 61, y: 8, r: 0.16, o: 0.65 },
  { x: 70, y: 22, r: 0.1, o: 0.4 },
  { x: 78, y: 11, r: 0.18, o: 0.7 },
  { x: 88, y: 24, r: 0.13, o: 0.55 },
  { x: 93, y: 13, r: 0.1, o: 0.45 },
  { x: 13, y: 38, r: 0.14, o: 0.5 },
  { x: 24, y: 45, r: 0.1, o: 0.4 },
  { x: 33, y: 35, r: 0.16, o: 0.6 },
  { x: 47, y: 42, r: 0.11, o: 0.45 },
  { x: 58, y: 33, r: 0.13, o: 0.5 },
  { x: 66, y: 44, r: 0.1, o: 0.4 },
  { x: 75, y: 37, r: 0.15, o: 0.6 },
  { x: 84, y: 46, r: 0.11, o: 0.45 },
  { x: 91, y: 35, r: 0.13, o: 0.5 },
  { x: 5, y: 22, r: 0.12, o: 0.5 },
  { x: 39, y: 28, r: 0.1, o: 0.4 },
  { x: 54, y: 25, r: 0.14, o: 0.55 },
  { x: 81, y: 30, r: 0.1, o: 0.4 },
  { x: 96, y: 42, r: 0.12, o: 0.5 },
]

export function Landscape() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* brilho do amanhecer no topo */}
      <div className="absolute -top-44 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-dourado/10 blur-[110px]" />

      {/* estrelas */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={s.o} />
        ))}
      </svg>

      {/* serra ao fundo (montanhas do deserto / Sinai) */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 380"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <path
          d="M0 240 L150 175 L290 225 L430 140 L560 215 L700 150 L840 220 L980 155 L1130 215 L1290 165 L1440 220 L1440 380 L0 380 Z"
          fill="#2E2318"
          opacity="0.6"
        />
        <path
          d="M0 305 L170 250 L320 305 L470 240 L620 300 L780 250 L940 310 L1100 248 L1270 300 L1440 258 L1440 380 L0 380 Z"
          fill="#1A120B"
        />
      </svg>
    </div>
  )
}
