import { supabase } from './supabase'
import { VAPID_PUBLIC } from './pushConfig'

export const MENSAGENS: { titulo: string; corpo: string }[] = [
  { titulo: 'Bom dia, guerreiro 🌅', corpo: 'Seu encontro com Deus te espera. Comece o dia firme.' },
  { titulo: 'Mais um dia de liberdade 💪', corpo: 'Abra o Êxodo e dê o próximo passo da sua caminhada.' },
  { titulo: 'A jornada continua 🏜️', corpo: 'Um devocional por dia mantém o coração no rumo certo.' },
  { titulo: 'Deus já está te esperando 🙏', corpo: 'Reserve este minuto pra Ele hoje.' },
  { titulo: 'Force a vitória de hoje ⚔️', corpo: 'Leitura, oração e mais um dia conquistado.' },
  { titulo: 'Não caminhe sozinho 🤝', corpo: 'Seu devocional de hoje já está disponível.' },
  { titulo: 'Firmeza, você consegue 🔥', corpo: 'Cada dia fiel é um passo rumo à Terra Prometida.' },
]

// Escolhe deterministicamente a mensagem pelo número do dia (sem aleatoriedade).
export function mensagemDoDia(indiceDia: number): { titulo: string; corpo: string } {
  const i = ((indiceDia % MENSAGENS.length) + MENSAGENS.length) % MENSAGENS.length
  return MENSAGENS[i]
}

// Converte chave VAPID (base64url) para o formato exigido pelo pushManager.
export function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(b64)
  const out = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i)
  return out
}

// iOS só permite push se o PWA estiver instalado (standalone). Parâmetros injetáveis p/ teste.
export function precisaInstalarNoIOS(
  ua: string = navigator.userAgent,
  standalone: boolean = window.matchMedia?.('(display-mode: standalone)').matches ?? false,
): boolean {
  const ehIOS = /iphone|ipad|ipod/i.test(ua)
  return ehIOS && !standalone
}

export type EstadoLembrete = 'ativo' | 'inativo' | 'bloqueado' | 'instalar-ios' | 'sem-suporte'

export async function estadoLembrete(): Promise<EstadoLembrete> {
  if (precisaInstalarNoIOS()) return 'instalar-ios'
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return 'sem-suporte'
  if (Notification.permission === 'denied') return 'bloqueado'
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  return sub ? 'ativo' : 'inativo'
}

export async function ativarLembretes(userId: string): Promise<{ ok: boolean; motivo?: string }> {
  if (precisaInstalarNoIOS()) return { ok: false, motivo: 'instalar-ios' }
  if (!('serviceWorker' in navigator) || !('PushManager' in window))
    return { ok: false, motivo: 'sem-suporte' }

  const permissao = await Notification.requestPermission()
  if (permissao !== 'granted') return { ok: false, motivo: 'bloqueado' }

  const reg = await navigator.serviceWorker.ready
  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC) as BufferSource,
    }))

  const json = sub.toJSON()
  const { error } = await supabase
    .from('push_subs')
    .upsert(
      { user_id: userId, endpoint: json.endpoint, subscription: json },
      { onConflict: 'endpoint' },
    )
  if (error) return { ok: false, motivo: error.message }
  return { ok: true }
}

export async function desativarLembretes(userId: string): Promise<void> {
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  if (sub) {
    await supabase.from('push_subs').delete().eq('endpoint', sub.endpoint).eq('user_id', userId)
    await sub.unsubscribe()
  }
}
