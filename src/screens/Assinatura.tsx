import { useApp } from '../state/AppContext'
import { diasRestantesData } from '../lib/acesso'
import { abrirCheckout } from '../lib/stripe'
import { Icon } from '../components/Icon'

const BENEFICIOS = [
  'Plano de Liberdade: 1 ano de devocionais',
  'Modo Batalha com as 3 armas',
  'Batalhas ilimitadas, hábitos e diário',
  'Conquistas, XP e patentes',
  'Backup na nuvem (em breve)',
]

function Check() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/15 text-green-400">
      <Icon name="check" size={13} strokeWidth={3} />
    </span>
  )
}

export function Assinatura({ onFechar, bloqueio = false }: { onFechar: () => void; bloqueio?: boolean }) {
  const { userId, trialEnds, signOut } = useApp()
  const restam = diasRestantesData(trialEnds)

  const assinar = (plano: 'mensal' | 'trimestral' | 'vitalicio') => abrirCheckout(plano, userId)

  return (
    <div className="min-h-screen px-5 py-8 max-w-md mx-auto animate-fadeUp">
      {!bloqueio && (
        <button onClick={onFechar} className="text-cinza/60 text-sm flex items-center gap-1">
          <Icon name="back" size={18} /> Voltar
        </button>
      )}

      <div className="text-center mt-4">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
          <Icon name="medal" size={30} />
        </div>
        <h1 className="font-title text-3xl text-dourado text-glow">
          {bloqueio ? 'Seus 7 dias grátis acabaram' : 'Continue livre'}
        </h1>
        <p className="text-cinza/80 mt-2">
          {bloqueio
            ? 'Escolha um plano para continuar a sua travessia rumo à liberdade.'
            : restam > 0
              ? `Você tem ${restam} ${restam === 1 ? 'dia' : 'dias'} grátis restantes.`
              : 'Escolha um plano para continuar.'}
        </p>
      </div>

      {/* Plano Vitalício (destaque) */}
      <div className="mt-7 rounded-3xl border border-dourado/45 bg-gradient-to-b from-dourado/12 to-transparent p-6 shadow-glow-sm relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-dourado-claro to-dourado px-4 py-1 text-xs font-semibold text-azul whitespace-nowrap">
          ⭐ Melhor valor
        </span>
        <h2 className="font-title text-xl">Vitalício</h2>
        <p className="text-cinza/60 text-sm">Pague uma vez, use para sempre</p>
        <div className="font-title text-4xl mt-2">
          R$ 97 <span className="text-base text-cinza/60 font-semibold">uma vez</span>
        </div>
        <div className="mt-4 space-y-2">
          {BENEFICIOS.map((b) => (
            <div key={b} className="flex items-start gap-3 text-sm text-cinza/90">
              <Check /> {b}
            </div>
          ))}
        </div>
        <button
          onClick={() => assinar('vitalicio')}
          className="mt-5 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
        >
          Garantir acesso vitalício →
        </button>
      </div>

      {/* Plano Trimestral */}
      <div className="mt-4 rounded-3xl border border-dourado/25 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl">Trimestral</h2>
          <span className="rounded-full bg-dourado/15 text-dourado text-[11px] px-2.5 py-1">
            economize ~16%
          </span>
        </div>
        <p className="text-cinza/60 text-sm">A cada 3 meses · renova sozinho</p>
        <div className="font-title text-3xl mt-2">
          R$ 24,90{' '}
          <span className="text-base text-cinza/60 font-semibold">/trimestre</span>
        </div>
        <p className="text-cinza/45 text-xs mt-0.5">≈ R$ 8,30 por mês</p>
        <button
          onClick={() => assinar('trimestral')}
          className="mt-5 w-full rounded-xl border border-dourado/40 bg-dourado/10 py-3.5 font-title font-bold text-dourado active:scale-[0.98] transition"
        >
          Assinar trimestral
        </button>
      </div>

      {/* Plano Mensal */}
      <div className="mt-4 rounded-3xl border border-white/12 bg-white/[0.03] p-6">
        <h2 className="font-title text-xl">Mensal</h2>
        <p className="text-cinza/60 text-sm">Flexível, cancele quando quiser</p>
        <div className="font-title text-3xl mt-2">
          R$ 9,90 <span className="text-base text-cinza/60 font-semibold">/mês</span>
        </div>
        <button
          onClick={() => assinar('mensal')}
          className="mt-5 w-full rounded-xl border border-white/15 py-3.5 font-title font-bold text-cinza active:scale-[0.98] transition"
        >
          Assinar mensal
        </button>
      </div>

      <p className="text-center text-cinza/40 text-xs mt-5">
        🔒 Pagamento seguro via Stripe · Pix ou cartão
      </p>

      {bloqueio && (
        <button onClick={() => void signOut()} className="mt-5 w-full text-center text-cinza/50 text-sm underline">
          Sair da conta
        </button>
      )}
    </div>
  )
}
