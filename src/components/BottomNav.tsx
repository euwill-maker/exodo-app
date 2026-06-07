export type Aba = 'home' | 'devocional' | 'diario' | 'conquistas'

const ITENS: { id: Aba; label: string; icone: string }[] = [
  { id: 'home', label: 'Início', icone: '🏠' },
  { id: 'devocional', label: 'Devocional', icone: '📖' },
  { id: 'diario', label: 'Diário', icone: '✍️' },
  { id: 'conquistas', label: 'Conquistas', icone: '🏅' },
]

export function BottomNav({ ativa, onMudar }: { ativa: Aba; onMudar: (a: Aba) => void }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-white/10 bg-azul/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md px-2 pb-[env(safe-area-inset-bottom)]">
        {ITENS.map((i) => {
          const on = ativa === i.id
          return (
            <button
              key={i.id}
              onClick={() => onMudar(i.id)}
              className="relative flex-1 py-2.5 text-center text-[11px]"
            >
              {on && <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-dourado" />}
              <div className={`text-xl transition ${on ? 'scale-110' : 'grayscale opacity-60'}`}>
                {i.icone}
              </div>
              <span className={on ? 'text-dourado font-semibold' : 'text-cinza/60'}>{i.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
