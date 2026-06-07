export type Aba = 'home' | 'devocional' | 'diario' | 'conquistas'

const ITENS: { id: Aba; label: string; icone: string }[] = [
  { id: 'home', label: 'Início', icone: '🏠' },
  { id: 'devocional', label: 'Devocional', icone: '📖' },
  { id: 'diario', label: 'Diário', icone: '✍️' },
  { id: 'conquistas', label: 'Conquistas', icone: '🏅' },
]

export function BottomNav({ ativa, onMudar }: { ativa: Aba; onMudar: (a: Aba) => void }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-azul/95 backdrop-blur border-t border-white/10 flex">
      {ITENS.map((i) => (
        <button
          key={i.id}
          onClick={() => onMudar(i.id)}
          className={`flex-1 py-2 text-center text-xs ${
            ativa === i.id ? 'text-dourado' : 'text-cinza/70'
          }`}
        >
          <div className="text-lg">{i.icone}</div>
          {i.label}
        </button>
      ))}
    </nav>
  )
}
