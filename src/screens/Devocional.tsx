import { useState } from 'react'
import { useApp } from '../state/AppContext'
import { ETAPAS, TODOS_DIAS, TOTAL_DIAS, META_DIAS, localizarDia, progressoEtapa } from '../content/planoDevocional'
import { Icon, type IconName } from '../components/Icon'

function Secao({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div>
      <h3 className="font-title text-dourado text-sm uppercase tracking-wide">{titulo}</h3>
      <p className="text-cinza/90 mt-1 leading-relaxed">{texto}</p>
    </div>
  )
}

export function Devocional() {
  const { estado, concluirDia, salvarReflexao } = useApp()
  const dev = estado.devocional
  const diasConcluidos = Number(dev.diasConcluidos) || 0
  const hoje = new Date().toISOString().slice(0, 10)
  const jaLeuHoje = dev.ultimaData === hoje
  const terminouTudo = diasConcluidos >= TOTAL_DIAS
  const maxLegivel = Math.min(diasConcluidos, TOTAL_DIAS - 1)

  const [lendoDia, setLendoDia] = useState<number | null>(null)

  /* ---------------- LEITURA DE UM DIA ---------------- */
  if (lendoDia !== null) {
    const loc = localizarDia(lendoDia)
    if (!loc) {
      setLendoDia(null)
      return null
    }
    const d = loc.devocional
    const chave = `dia:${lendoDia}`
    const ehDiaAtual = lendoDia === diasConcluidos
    const reflexaoSalva = dev.reflexoes.find((r) => r.chave === chave)?.texto ?? ''

    return (
      <div className="px-5 pt-6 pb-28 max-w-md mx-auto space-y-5 animate-fadeUp" key={chave}>
        <div className="flex items-center justify-between">
          <button onClick={() => setLendoDia(null)} className="text-cinza/70 flex items-center gap-1 text-sm">
            <Icon name="back" size={20} /> Plano
          </button>
          <span className="text-cinza/50 text-xs">
            Dia {loc.diaGlobal} · {loc.etapa.nome}
          </span>
        </div>

        <div className="relative rounded-3xl border border-dourado/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-center shadow-glow-sm">
          <span className="absolute -top-4 left-5 font-scripture text-6xl text-dourado/40 leading-none">“</span>
          <p className="font-scripture text-2xl italic text-white/95 leading-snug">{d.versiculo}</p>
          <p className="text-dourado text-sm mt-3 font-semibold">— {d.referencia}</p>
        </div>

        <Secao titulo="Contexto" texto={d.contexto} />
        <Secao titulo="Reflexão" texto={d.reflexao} />

        <div className="rounded-2xl border border-dourado/25 bg-dourado/[0.07] p-4">
          <h3 className="font-title text-dourado text-sm uppercase tracking-wide flex items-center gap-2">
            <Icon name="pray" size={16} /> Para refletir
          </h3>
          <p className="text-white/90 mt-1.5 leading-relaxed italic">{d.pergunta}</p>
        </div>

        <Secao titulo="Aplicação" texto={d.aplicacao} />
        <Secao titulo="Oração" texto={d.oracao} />

        <div>
          <h3 className="font-title text-dourado text-sm uppercase tracking-wide mb-2">Para meditar</h3>
          <div className="space-y-2">
            {d.apoio.map((v) => (
              <div key={v.ref} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="font-scripture text-lg italic text-white/90 leading-snug">“{v.texto}”</p>
                <p className="text-dourado text-xs mt-1 font-semibold">— {v.ref}</p>
              </div>
            ))}
          </div>
        </div>

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

        {ehDiaAtual && !jaLeuHoje ? (
          <button
            onClick={() => {
              concluirDia()
              setLendoDia(null)
            }}
            className="w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
          >
            Amém · Concluir o dia
          </button>
        ) : (
          <button
            onClick={() => setLendoDia(null)}
            className="w-full rounded-xl border border-white/15 py-3.5 font-title font-bold text-cinza active:scale-[0.98] transition"
          >
            Voltar ao plano
          </button>
        )}

        {/* navegação entre dias já liberados */}
        <div className="flex justify-between text-sm">
          <button
            onClick={() => setLendoDia((i) => Math.max(0, (i ?? 0) - 1))}
            disabled={lendoDia === 0}
            className="flex items-center gap-1 text-cinza/60 disabled:opacity-30"
          >
            <Icon name="back" size={16} /> Anterior
          </button>
          <button
            onClick={() => setLendoDia((i) => Math.min(maxLegivel, (i ?? 0) + 1))}
            disabled={lendoDia >= maxLegivel}
            className="flex items-center gap-1 text-cinza/60 disabled:opacity-30"
          >
            Próximo <span className="rotate-180 inline-flex"><Icon name="back" size={16} /></span>
          </button>
        </div>
      </div>
    )
  }

  /* ---------------- HOME DO PLANO ---------------- */
  const diaAtualLoc = localizarDia(Math.min(diasConcluidos, TOTAL_DIAS - 1))

  return (
    <div className="px-5 pt-10 pb-28 max-w-md mx-auto animate-fadeUp">
      <div className="flex items-center justify-between">
        <h1 className="font-title text-3xl text-dourado text-glow">Plano de Liberdade</h1>
        {dev.streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-dourado/40 bg-dourado/10 px-3 py-1 text-xs text-dourado">
            🔥 {dev.streak} {dev.streak === 1 ? 'dia' : 'dias'}
          </span>
        )}
      </div>
      <p className="text-cinza/60 text-sm mt-1">
        Um devocional novo por dia. Dia {Math.min(diasConcluidos + 1, TOTAL_DIAS)} de {META_DIAS}.
      </p>

      {/* card do devocional do dia */}
      {terminouTudo ? (
        <div className="mt-6 rounded-3xl border border-dourado/30 bg-gradient-to-b from-dourado/10 to-transparent p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="font-title text-xl text-dourado">Você concluiu o plano atual!</h2>
          <p className="text-cinza/75 text-sm mt-1">
            {TOTAL_DIAS} dias de caminhada. Novos devocionais estão sendo adicionados — continue firme!
          </p>
        </div>
      ) : (
        <button
          onClick={() => !jaLeuHoje && setLendoDia(diasConcluidos)}
          disabled={jaLeuHoje}
          className={`mt-6 w-full rounded-3xl border p-5 text-left transition ${
            jaLeuHoje
              ? 'border-white/10 bg-white/[0.02]'
              : 'border-dourado/40 bg-gradient-to-b from-dourado/12 to-transparent shadow-glow-sm active:scale-[0.99]'
          }`}
        >
          <div className="flex items-center gap-2 text-dourado/80 text-xs uppercase tracking-[0.15em]">
            <Icon name="book" size={15} /> Devocional do dia
          </div>
          <div className="font-title text-2xl mt-1 text-white">
            Dia {diasConcluidos + 1}
          </div>
          {diaAtualLoc && <div className="text-cinza/70 text-sm mt-0.5">Etapa: {diaAtualLoc.etapa.nome}</div>}
          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-title font-bold text-sm ${
              jaLeuHoje ? 'bg-white/10 text-cinza/60' : 'bg-gradient-to-b from-dourado-claro to-dourado text-azul'
            }`}
          >
            {jaLeuHoje ? '✓ Concluído hoje · volte amanhã' : 'Ler agora →'}
          </div>
        </button>
      )}

      {/* roteiro de etapas */}
      <h3 className="font-title text-dourado text-sm uppercase tracking-wide mt-8 mb-3">Etapas da jornada</h3>
      <div className="space-y-3">
        {ETAPAS.map((etapa, idx) => {
          const { feitos, total, inicioGlobal } = progressoEtapa(idx, diasConcluidos)
          const completa = feitos >= total
          const comecou = feitos > 0 || inicioGlobal <= diasConcluidos
          const pct = Math.round((feitos / total) * 100)
          return (
            <button
              key={etapa.id}
              onClick={() => comecou && setLendoDia(Math.min(inicioGlobal, maxLegivel))}
              disabled={!comecou}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                comecou ? 'border-white/10 bg-white/[0.03] active:scale-[0.99]' : 'border-white/8 bg-white/[0.01] opacity-50'
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                  completa
                    ? 'border-dourado bg-dourado/15 text-dourado'
                    : comecou
                      ? 'border-dourado/50 bg-dourado/10 text-dourado'
                      : 'border-white/15 text-white/30'
                }`}
              >
                <Icon name={comecou ? (etapa.icone as IconName) : 'shield'} size={22} />
              </div>
              <div className="flex-1">
                <div className="font-title font-semibold flex items-center gap-2">
                  {etapa.nome} {completa && <span className="text-dourado text-xs">✓</span>}
                </div>
                <div className="text-cinza/55 text-xs">{etapa.descricao}</div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-dourado to-dourado-claro" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="text-cinza/50 text-xs">{feitos}/{total}</div>
            </button>
          )
        })}
      </div>

      <p className="text-center text-cinza/35 text-xs mt-6">
        {TODOS_DIAS.length} devocionais disponíveis · mais sendo adicionados rumo aos {META_DIAS} dias.
      </p>
    </div>
  )
}
