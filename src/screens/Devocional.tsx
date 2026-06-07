import { useState } from 'react'
import { useApp } from '../state/AppContext'
import { TEMAS_DEVOCIONAIS } from '../content/devocionais'
import { Icon, type IconName } from '../components/Icon'

export function Devocional() {
  const { estado, concluirDevocional, salvarReflexao } = useApp()
  const [temaId, setTemaId] = useState<string | null>(null)
  const [indice, setIndice] = useState(0)

  const concluidos = estado.devocional.concluidos
  const totalConcluidos = concluidos.length

  // ---- Lista de temas ----
  if (!temaId) {
    return (
      <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
        <h1 className="font-title text-3xl text-dourado text-glow">Devocional</h1>
        <p className="text-cinza/60 text-sm mt-1">
          {totalConcluidos > 0
            ? `${totalConcluidos} devocionais concluídos. Continue firme!`
            : 'Escolha uma jornada para começar.'}
        </p>
        <div className="mt-6 space-y-3">
          {TEMAS_DEVOCIONAIS.map((t) => {
            const feitos = t.devocionais.filter((_, i) => concluidos.includes(`${t.id}:${i}`)).length
            const total = t.devocionais.length
            const pct = Math.round((feitos / total) * 100)
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTemaId(t.id)
                  const primeiroNaoFeito = t.devocionais.findIndex(
                    (_, i) => !concluidos.includes(`${t.id}:${i}`),
                  )
                  setIndice(primeiroNaoFeito === -1 ? 0 : primeiroNaoFeito)
                }}
                className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-dourado/40 active:scale-[0.99]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-dourado">
                  <Icon name={t.icone as IconName} size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-title font-semibold">{t.nome}</div>
                  <div className="text-cinza/55 text-xs">{t.descricao}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-dourado to-dourado-claro" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-cinza/50 text-xs">{feitos}/{total}</div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ---- Leitura de um devocional ----
  const tema = TEMAS_DEVOCIONAIS.find((t) => t.id === temaId)!
  const d = tema.devocionais[indice]
  const chave = `${tema.id}:${indice}`
  const feito = concluidos.includes(chave)
  const reflexaoSalva = estado.devocional.reflexoes.find((r) => r.chave === chave)?.texto ?? ''

  const Secao = ({ titulo, texto }: { titulo: string; texto: string }) => (
    <div>
      <h3 className="font-title text-dourado text-sm uppercase tracking-wide">{titulo}</h3>
      <p className="text-cinza/90 mt-1 leading-relaxed">{texto}</p>
    </div>
  )

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto space-y-5 animate-fadeUp" key={chave}>
      <div className="flex items-center justify-between">
        <button onClick={() => setTemaId(null)} className="text-cinza/70 flex items-center gap-1 text-sm">
          <Icon name="back" size={20} /> {tema.nome}
        </button>
        <span className="text-cinza/50 text-xs">{indice + 1}/{tema.devocionais.length}</span>
      </div>

      <div className="relative rounded-3xl border border-dourado/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-center shadow-glow-sm">
        <span className="absolute -top-4 left-5 font-scripture text-6xl text-dourado/40 leading-none">“</span>
        <p className="font-scripture text-2xl italic text-white/95 leading-snug">{d.versiculo}</p>
        <p className="text-dourado text-sm mt-3 font-semibold">— {d.referencia}</p>
      </div>

      <Secao titulo="Reflexão" texto={d.reflexao} />
      <Secao titulo="Aplicação" texto={d.aplicacao} />
      <Secao titulo="Oração" texto={d.oracao} />

      <div>
        <h3 className="font-title text-dourado text-sm uppercase tracking-wide">Minha reflexão</h3>
        <textarea
          defaultValue={reflexaoSalva}
          onBlur={(e) => salvarReflexao(chave, e.target.value)}
          rows={3}
          placeholder="O que Deus falou com você hoje?"
          className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado"
        />
      </div>

      <button
        onClick={() => {
          concluirDevocional(chave)
          if (indice < tema.devocionais.length - 1) setIndice(indice + 1)
          else setTemaId(null)
        }}
        className="w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
      >
        {feito ? 'Amém ✓ Próximo' : 'Amém · Concluir'}
      </button>
    </div>
  )
}
