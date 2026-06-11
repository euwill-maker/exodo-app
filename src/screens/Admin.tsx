import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { AdminStats } from '../lib/admin'
import { Icon } from '../components/Icon'

function dataBR(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR')
}

const PLANO_ROTULO: Record<string, string> = {
  trial: 'Trial',
  mensal: 'Mensal',
  trimestral: 'Trimestral',
  vitalicio: 'Vitalício',
  expirado: 'Expirado',
}

export function Admin({ onVoltar }: { onVoltar: () => void }) {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.functions.invoke('admin-stats')
      if (error) {
        setErro('Não foi possível carregar os dados.')
      } else {
        setStats(data as AdminStats)
      }
      setCarregando(false)
    })()
  }, [])

  const cards = stats
    ? [
        { rotulo: 'Cadastrados', valor: stats.totais.cadastrados, emoji: '👥' },
        { rotulo: 'Em trial', valor: stats.totais.trial, emoji: '🎁' },
        { rotulo: 'Pagantes', valor: stats.totais.pagantes, emoji: '💎' },
        { rotulo: 'Novos (7d)', valor: stats.totais.novos7d, emoji: '🆕' },
        { rotulo: 'Ativos (7d)', valor: stats.totais.ativos7d, emoji: '🔥' },
        { rotulo: 'Visitantes', valor: stats.visitas.total, emoji: '👀' },
      ]
    : []

  return (
    <div className="min-h-screen bg-azul">
      <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
        <div className="flex items-center gap-3">
          <button
            onClick={onVoltar}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cinza/80"
            aria-label="Voltar"
          >
            <Icon name="back" size={18} />
          </button>
          <h1 className="font-title text-2xl text-dourado text-glow">Painel Admin</h1>
        </div>

        {carregando && <p className="text-cinza/60 mt-10 text-center">Carregando...</p>}
        {erro && <p className="text-red-400 mt-10 text-center">{erro}</p>}

        {stats && (
          <>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {cards.map((c) => (
                <div
                  key={c.rotulo}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center"
                >
                  <div className="text-lg">{c.emoji}</div>
                  <div className="font-title text-2xl text-dourado leading-tight">{c.valor}</div>
                  <div className="text-[10px] text-cinza/55 uppercase tracking-wide">{c.rotulo}</div>
                </div>
              ))}
            </div>

            <h2 className="font-title text-dourado text-sm uppercase tracking-wide mt-8 mb-3">
              Usuários ({stats.usuarios.length})
            </h2>
            <div className="space-y-2">
              {stats.usuarios.map((u) => (
                <div key={u.email} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white/90">{u.nome}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${
                        u.plano === 'mensal' || u.plano === 'trimestral' || u.plano === 'vitalicio'
                          ? 'bg-dourado/20 text-dourado'
                          : u.plano === 'expirado'
                            ? 'bg-red-500/15 text-red-300'
                            : 'bg-white/10 text-cinza/70'
                      }`}
                    >
                      {PLANO_ROTULO[u.plano] ?? u.plano}
                    </span>
                  </div>
                  <div className="text-cinza/55 text-xs mt-1">{u.email}</div>
                  <div className="text-cinza/45 text-[11px] mt-1 flex flex-wrap gap-x-3">
                    <span>Entrou: {dataBR(u.criado_em)}</span>
                    <span>Último acesso: {dataBR(u.ultimo_acesso)}</span>
                    <span>{u.dias} {u.dias === 1 ? 'dia' : 'dias'} na jornada</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
