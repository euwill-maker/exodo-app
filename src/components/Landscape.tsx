// Cenário-assinatura do Êxodo: sol nascente + dunas, fixo ao fundo de todas as telas.
export function Landscape() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* sol / brilho nascente */}
      <div className="absolute left-1/2 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-dourado/15 blur-3xl" />
      {/* dunas */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 390 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 150 C 90 110, 150 170, 230 140 C 300 115, 350 150, 390 130 L390 220 L0 220 Z"
          fill="#11243a"
          opacity="0.9"
        />
        <path
          d="M0 180 C 80 150, 160 195, 250 168 C 320 146, 360 180, 390 165 L390 220 L0 220 Z"
          fill="#0d1d31"
        />
        <path
          d="M0 205 C 110 185, 200 215, 300 198 C 340 191, 370 202, 390 197 L390 220 L0 220 Z"
          fill="#0a1626"
        />
        {/* trilha dourada sutil sobre a duna */}
        <path
          d="M40 210 C 120 195, 180 205, 250 188 C 300 176, 340 188, 380 178"
          stroke="#D4AF37"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
