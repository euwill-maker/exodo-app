import { Icon } from './Icon'

/* Botão flutuante de emergência — sempre visível pra socorro imediato. */
export function BotaoBatalha({ onClick, comNav = false }: { onClick: () => void; comNav?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`fixed right-4 z-30 flex items-center gap-2 rounded-full bg-gradient-to-b from-red-500 to-red-700 px-5 py-3.5 font-title font-bold text-white shadow-sos animate-pulseGlow active:scale-95 transition ${
        comNav ? 'bottom-[5.4rem]' : 'bottom-6'
      }`}
    >
      <Icon name="sword" size={20} /> Modo Batalha
    </button>
  )
}
