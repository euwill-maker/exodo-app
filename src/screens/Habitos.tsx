import { useState } from 'react'
import { useApp } from '../state/AppContext'
import { HABITOS_SUGERIDOS } from '../content/habitos'
import { Icon, type IconName } from '../components/Icon'
import type { Habito } from '../types'

function dataISO(offsetDias = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - offsetDias)
  return d.toISOString().slice(0, 10)
}

function sequencia(h: Habito): number {
  const set = new Set(h.diasFeitos)
  let n = 0
  // se hoje não foi feito, conta a partir de ontem (não quebra a sequência durante o dia)
  let inicio = set.has(dataISO(0)) ? 0 : 1
  if (inicio === 1 && !set.has(dataISO(1))) return 0
  for (let i = inicio; i < 400; i++) {
    if (set.has(dataISO(i))) n++
    else break
  }
  return n
}

export function Habitos() {
  const { estado, addHabito, toggleHabito, removerHabito } = useApp()
  const hoje = dataISO(0)
  const [novo, setNovo] = useState('')

  const jaTem = (nome: string) => estado.habitos.some((h) => h.nome.toLowerCase() === nome.toLowerCase())
  const sugestoes = HABITOS_SUGERIDOS.filter((s) => !jaTem(s.nome))

  return (
    <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
      <h1 className="font-title text-3xl text-dourado text-glow">Hábitos</h1>
      <p className="text-cinza/60 text-sm mt-1">Pequenos passos diários constroem uma nova vida.</p>

      {/* lista */}
      <div className="mt-6 space-y-2">
        {estado.habitos.map((h) => {
          const feito = h.diasFeitos.includes(hoje)
          const seq = sequencia(h)
          return (
            <div
              key={h.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dourado/30 bg-dourado/5 text-dourado">
                <Icon name={h.icone as IconName} size={20} />
              </div>
              <div className="flex-1">
                <div className="font-medium">{h.nome}</div>
                <div className="text-cinza/50 text-xs">
                  {seq > 0 ? `🔥 ${seq} ${seq === 1 ? 'dia' : 'dias'} seguidos` : 'comece hoje'}
                </div>
              </div>
              <button onClick={() => removerHabito(h.id)} className="text-cinza/25">
                <Icon name="trash" size={16} />
              </button>
              <button
                onClick={() => toggleHabito(h.id, hoje)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  feito
                    ? 'border-dourado bg-dourado text-azul shadow-glow-sm'
                    : 'border-white/25 text-transparent'
                }`}
              >
                <Icon name="check" size={20} strokeWidth={2.6} />
              </button>
            </div>
          )
        })}
      </div>

      {/* adicionar manual */}
      <div className="mt-4 flex gap-2">
        <input
          value={novo}
          onChange={(e) => setNovo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && novo.trim()) {
              addHabito(novo.trim(), 'leaf')
              setNovo('')
            }
          }}
          placeholder="Criar hábito próprio..."
          className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-dourado"
        />
        <button
          onClick={() => {
            if (novo.trim()) {
              addHabito(novo.trim(), 'leaf')
              setNovo('')
            }
          }}
          className="rounded-xl bg-dourado/20 border border-dourado/40 px-4 text-dourado"
        >
          <Icon name="plus" size={20} />
        </button>
      </div>

      {/* sugestões */}
      {sugestoes.length > 0 && (
        <div className="mt-7">
          <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-3">Sugestões</h3>
          <div className="flex flex-wrap gap-2">
            {sugestoes.map((s) => (
              <button
                key={s.nome}
                onClick={() => addHabito(s.nome, s.icone)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-cinza/85 active:scale-95 transition"
              >
                <span className="text-dourado"><Icon name={s.icone as IconName} size={16} /></span>
                {s.nome}
                <span className="text-dourado/60"><Icon name="plus" size={14} /></span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
