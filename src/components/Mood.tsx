const HUMORES = ['Forte', 'Fraco', 'Ansioso', 'Triste', 'Feliz', 'Tentado']
const EMOJI: Record<string, string> = {
  Forte: '💪',
  Fraco: '😔',
  Ansioso: '😰',
  Triste: '😢',
  Feliz: '😊',
  Tentado: '🔥',
}

export function Mood({ valor, onMudar }: { valor: string; onMudar: (v: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {HUMORES.map((h) => (
        <button
          key={h}
          onClick={() => onMudar(h)}
          className={`rounded-xl py-3 text-sm border ${
            valor === h ? 'border-dourado bg-dourado/15 text-dourado' : 'border-white/10 text-cinza'
          }`}
        >
          <div className="text-xl">{EMOJI[h]}</div>
          {h}
        </button>
      ))}
    </div>
  )
}
