// Painel de admin: só responde se quem chamar for admin. Devolve apenas metadados de uso.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const MS_DIA = 86_400_000

function diasNaJornada(estado: { batalhas?: { dataInicio: string }[] } | null): number {
  const bs = estado?.batalhas ?? []
  if (!bs.length) return 0
  const maisAntiga = Math.min(...bs.map((b) => new Date(b.dataInicio).getTime()))
  return Math.floor((Date.now() - maisAntiga) / MS_DIA)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // 1) quem está chamando?
  const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '')
  const { data: userData, error: userErr } = await admin.auth.getUser(token)
  if (userErr || !userData.user) {
    return new Response(JSON.stringify({ erro: 'não autenticado' }), {
      status: 401,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  // 2) é admin?
  const { data: perfil } = await admin
    .from('profiles')
    .select('is_admin')
    .eq('id', userData.user.id)
    .maybeSingle()
  if (!perfil?.is_admin) {
    return new Response(JSON.stringify({ erro: 'acesso negado' }), {
      status: 403,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  // 3) coleta (service role) — só metadados
  const { data: lista } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const usuariosAuth = lista?.users ?? []

  const { data: profiles } = await admin.from('profiles').select('id, plano, trial_ends')
  const { data: estados } = await admin.from('estados').select('user_id, updated_at, data')

  const planoPorId = new Map((profiles ?? []).map((p) => [p.id, p.plano as string]))
  const estadoPorId = new Map((estados ?? []).map((e) => [e.user_id, e]))

  const agora = Date.now()
  const seteDiasAtras = agora - 7 * MS_DIA

  const usuarios = usuariosAuth.map((u) => {
    const est = estadoPorId.get(u.id) as { updated_at?: string; data?: unknown } | undefined
    const dados = (est?.data ?? {}) as { nome?: string; batalhas?: { dataInicio: string }[] }
    return {
      nome: dados.nome ?? '—',
      email: u.email ?? '—',
      plano: planoPorId.get(u.id) ?? 'trial',
      criado_em: u.created_at,
      ultimo_acesso: est?.updated_at ?? null,
      dias: diasNaJornada(dados),
    }
  })
  usuarios.sort((a, b) => (b.ultimo_acesso ?? '').localeCompare(a.ultimo_acesso ?? ''))

  const totais = {
    cadastrados: usuarios.length,
    trial: usuarios.filter((u) => u.plano === 'trial').length,
    pagantes: usuarios.filter(
      (u) => u.plano === 'mensal' || u.plano === 'trimestral' || u.plano === 'vitalicio',
    ).length,
    novos7d: usuariosAuth.filter((u) => new Date(u.created_at).getTime() >= seteDiasAtras).length,
    ativos7d: usuarios.filter(
      (u) => u.ultimo_acesso && new Date(u.ultimo_acesso).getTime() >= seteDiasAtras,
    ).length,
  }

  const { data: visitasRows } = await admin.from('visitas_diarias').select('dia, total')
  const visitas = {
    total: (visitasRows ?? []).reduce((s, v) => s + (v.total as number), 0),
    ultimos7d: (visitasRows ?? [])
      .filter((v) => new Date(v.dia + 'T00:00:00').getTime() >= seteDiasAtras)
      .reduce((s, v) => s + (v.total as number), 0),
  }

  return new Response(JSON.stringify({ totais, visitas, usuarios }), {
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
})
