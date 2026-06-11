import { Icon, type IconName } from './Icon'

export type Aba = 'inicio' | 'habitos' | 'devocional' | 'diario' | 'perfil'

const ITENS: { id: Aba; label: string; icone: IconName }[] = [
  { id: 'inicio', label: 'Batalhas', icone: 'home' },
  { id: 'habitos', label: 'Hábitos', icone: 'leaf' },
  { id: 'devocional', label: 'Devocional', icone: 'book' },
  { id: 'diario', label: 'Diário', icone: 'pen' },
  { id: 'perfil', label: 'Perfil', icone: 'user' },
]

export function BottomNav({
  ativa,
  onMudar,
  onSOS,
}: {
  ativa: Aba
  onMudar: (a: Aba) => void
  onSOS?: () => void
}) {
  return (
    <>
      {onSOS && (
        <button
          onClick={onSOS}
          aria-label="Modo Batalha — socorro"
          className="group fixed left-1/2 -translate-x-1/2 z-30 flex h-[4.4rem] w-[4.4rem] flex-col items-center justify-center rounded-full border-[5px] border-azul bg-gradient-to-b from-[#ff5b4e] via-[#e2382d] to-[#a81a14] text-white active:scale-95 transition"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 3.7rem)',
            boxShadow:
              '0 14px 30px -6px rgba(200,30,30,.65), inset 0 2px 6px rgba(255,255,255,.45), inset 0 -5px 12px rgba(0,0,0,.35)',
          }}
        >
          {/* camada da pulsação (separada pra não brigar com o brilho 3D) */}
          <span className="pointer-events-none absolute inset-0 rounded-full animate-pulseGlow" />
          <Icon name="swords" size={26} className="drop-shadow-[0_1px_2px_rgba(0,0,0,.4)]" />
          <span className="mt-0.5 font-title text-[8px] font-bold tracking-wider text-white/95">
            SOCORRO
          </span>
        </button>
      )}
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
    </>
  )
}
