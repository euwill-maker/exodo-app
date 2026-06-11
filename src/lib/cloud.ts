import { supabase } from './supabase'
import type { EstadoApp } from '../types'

// Carrega o estado do usuário da nuvem (null se não existir).
export async function carregarNuvem(userId: string): Promise<EstadoApp | null> {
  const { data, error } = await supabase
    .from('estados')
    .select('data')
    .eq('user_id', userId)
    .maybeSingle()
  if (error || !data) return null
  return data.data as EstadoApp
}

// Lê o perfil protegido (plano + fim do trial) — definido pelo servidor/webhook.
export async function carregarPerfil(
  userId: string,
): Promise<{ plano: string; trial_ends: string | null; is_admin: boolean } | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('plano, trial_ends, is_admin')
    .eq('id', userId)
    .maybeSingle()
  if (error || !data) return null
  return data as { plano: string; trial_ends: string | null; is_admin: boolean }
}

// Salva (upsert) o estado do usuário na nuvem.
export async function salvarNuvem(userId: string, estado: EstadoApp): Promise<void> {
  await supabase.from('estados').upsert({
    user_id: userId,
    data: estado,
    updated_at: new Date().toISOString(),
  })
}
