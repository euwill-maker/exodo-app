import { Icon, type IconName } from './Icon'

export type Aba = 'inicio' | 'habitos' | 'devocional' | 'diario' | 'perfil'

const ITENS: { id: Aba; label: string; icone: IconName }[] = [
  { id: 'inicio', label: 'Batalhas', icone: 'home' },
  { id: 'habitos', label: 'Hábitos', icone: 'leaf' },
  { id: 'devocional', label: 'Devocional', icone: 'book' },
  { id: 'diario', label: 'Diário', icone: 'pen' },
  { id: 'perfil', label: 'Perfil', icone: 'user' },
]

export function BottomNav({ ativa, onMudar }: { ativa: Aba; onMudar: (a: Aba) => void }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-white/10 bg-azul/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md px-1 pb-[env(safe-area-inset-bottom)]">
        {ITENS.map((i) => {
          const on = ativa === i.id
          return (
            <button
              key={i.id}
              onClick={() => onMudar(i.id)}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px]"
            >
              {on && (
                <span className="absolute top-0 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-dourado" />
              )}
              <span className={`transition ${on ? 'text-dourado scale-110' : 'text-cinza/45'}`}>
                <Icon name={i.icone} size={21} />
              </span>
              <span className={on ? 'font-semibold text-dourado' : 'text-cinza/55'}>{i.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
