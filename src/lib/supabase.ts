import { createClient } from '@supabase/supabase-js'

// Projeto Supabase do Êxodo (chave publishable — pública, segura no navegador com RLS).
const SUPABASE_URL = 'https://hucfvysilcsdgzsxgmbd.supabase.co'
const SUPABASE_KEY = 'sb_publishable_rpf1NCfscMs5v9tNy32TXQ_rY2cHsKV'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
