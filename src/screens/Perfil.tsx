import { useApp } from '../state/AppContext'
import { diasLivres } from '../lib/streak'
import { infoPatente } from '../lib/patente'
import { diasRestantesTrial } from '../lib/acesso'
import { Icon } from '../components/Icon'

export function Perfil({ onAbrirAssinatura }: { onAbrirAssinatura: () => void }) {
  const { estado, resetar, mostrarTutorial, signOut } = useApp()
  const restamTrial = diasRestantesTrial(estado.primeiroAcesso)

  const totalDias = estado.batalhas.reduce((s, b) => s + diasLivres(b.dataInicio), 0)
  const melhor = estado.batalhas.reduce((m, b) => Math.max(m, b.melhorSequenciaDias), 0)
  const patente = infoPatente(estado.pontos)

  const limpar = () => {
    if (confirm('Apagar TODOS os dados e recomeçar do zero? Isto não pode ser desfeito.')) {
      resetar()
    }
  }

  return (
    <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
          <Icon name="user" size={36} />
        </div>
        <h1 className="font-title text-2xl mt-3">{estado.nome}</h1>
        <p className="text-dourado text-sm font-title">{patente.atual.nome}</p>
      </div>

      {/* patente / XP */}
      <div className="mt-6 rounded-2xl border border-dourado/30 bg-gradient-to-b from-dourado/10 to-transparent p-4">
        <div className="flex items-center justify-between">
          <span className="font-title text-dourado">⚔️ {patente.atual.nome}</span>
          <span className="text-cinza/70 text-sm">{estado.pontos} XP</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-dourado to-dourado-claro transition-all duration-700"
            style={{ width: `${Math.round(patente.progresso * 100)}%` }}
          />
        </div>
        <p className="text-cinza/55 text-xs mt-2">
          {patente.proxima
            ? `Faltam ${patente.faltam} XP para ${patente.proxima.nome}`
            : 'Patente máxima alcançada! 🏆'}
          {' · '}
          {estado.vitorias} {estado.vitorias === 1 ? 'vitória' : 'vitórias'} no Modo Batalha
        </p>
      </div>

      {/* assinatura / plano */}
      <button
        onClick={onAbrirAssinatura}
        className="mt-4 w-full rounded-2xl border border-dourado/30 bg-white/[0.03] p-4 text-left flex items-center gap-3 active:scale-[0.99] transition"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
          <Icon name="medal" size={20} />
        </span>
        <div className="flex-1">
          <div className="font-title text-dourado">
            {estado.plano === 'vitalicio'
              ? 'Acesso Vitalício ✓'
              : estado.plano === 'mensal'
                ? 'Plano Mensal ativo'
                : restamTrial > 0
                  ? `🎁 ${restamTrial} ${restamTrial === 1 ? 'dia' : 'dias'} grátis restantes`
                  : 'Período grátis encerrado'}
          </div>
          <div className="text-cinza/55 text-xs">
            {estado.plano === 'trial' ? 'Toque para ver os planos e assinar' : 'Toque para gerenciar'}
          </div>
        </div>
        <Icon name="back" size={18} className="rotate-180 text-cinza/50" />
      </button>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="font-title text-2xl text-dourado">{estado.batalhas.length}</div>
          <div className="text-[10px] text-cinza/60 uppercase tracking-wide">Batalhas</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="font-title text-2xl text-dourado">{totalDias}</div>
          <div className="text-[10px] text-cinza/60 uppercase tracking-wide">Dias livres</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="font-title text-2xl text-dourado">{melhor}</div>
          <div className="text-[10px] text-cinza/60 uppercase tracking-wide">Melhor seq.</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
        <p className="font-scripture text-xl italic text-white/90">
          “Permanecei firmes na liberdade com que Cristo nos libertou.”
        </p>
        <p className="text-dourado text-sm mt-2">— Gálatas 5:1</p>
      </div>

      <button
        onClick={mostrarTutorial}
        className="mt-10 w-full rounded-xl border border-white/15 py-3 text-cinza/80 text-sm"
      >
        Rever tutorial
      </button>

      <button
        onClick={() => void signOut()}
        className="mt-3 w-full rounded-xl border border-white/15 py-3 text-cinza/80 text-sm"
      >
        Sair da conta
      </button>

      <button
        onClick={limpar}
        className="mt-3 w-full rounded-xl border border-red-500/40 py-3 text-red-400/90 text-sm"
      >
        Apagar dados e recomeçar
      </button>
      <p className="mt-3 text-center text-cinza/35 text-xs">
        Seus dados ficam salvos apenas neste aparelho.
      </p>
    </div>
  )
}
