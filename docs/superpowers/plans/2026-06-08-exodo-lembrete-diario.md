# Lembrete Diário (Push) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enviar uma notificação push diária às 7h BRT chamando o usuário pro devocional, usando Web Push próprio + Supabase (cron + Edge Function).

**Architecture:** O `vite-plugin-pwa` passa de `generateSW` para `injectManifest` com um service worker próprio (`src/sw.ts`) que escuta `push`/`notificationclick`. O front pede permissão e salva a subscription do navegador na tabela `push_subs` do Supabase. Um agendamento `pg_cron` chama diariamente a Edge Function `enviar-lembretes`, que dispara Web Push (VAPID) pra todas as subscriptions e limpa as mortas.

**Tech Stack:** React 19 + Vite 8 + vite-plugin-pwa (injectManifest) + workbox-precaching, Supabase (Postgres + RLS + Edge Functions Deno + pg_cron/pg_net), Web Push (VAPID) via `npm:web-push`, Vitest.

**Constantes do projeto:**
- Supabase URL: `https://hucfvysilcsdgzsxgmbd.supabase.co` (ref `hucfvysilcsdgzsxgmbd`)
- Domínio do app: `https://exodo.app.br`
- SW auto-registrado pelo vite-plugin-pwa (sem registro manual em `main.tsx`)

---

### Task 1: Trocar PWA para service worker próprio (injectManifest)

**Files:**
- Modify: `vite.config.ts`
- Create: `src/sw.ts`
- Modify: `package.json` (nova dependência via npm)

- [ ] **Step 1: Instalar runtime do workbox para o SW**

Run: `npm i -D workbox-precaching workbox-core`
Expected: instala sem erro; aparecem em `devDependencies`.

- [ ] **Step 2: Criar o service worker próprio**

Create `src/sw.ts`:

```ts
/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

// mantém o cache do PWA (injetado no build)
precacheAndRoute(self.__WB_MANIFEST)

// recebe a notificação enviada pelo servidor
self.addEventListener('push', (event) => {
  let dados: { titulo?: string; corpo?: string; url?: string } = {}
  try {
    dados = event.data ? event.data.json() : {}
  } catch {
    dados = {}
  }
  const titulo = dados.titulo ?? 'Êxodo'
  const corpo = dados.corpo ?? 'Hora do seu encontro com Deus 🌅'
  const url = dados.url ?? '/?go=devocional'
  event.waitUntil(
    self.registration.showNotification(titulo, {
      body: corpo,
      icon: '/icons/icon.svg',
      badge: '/icons/icon.svg',
      data: { url },
    }),
  )
})

// ao tocar: foca uma aba existente ou abre uma nova no devocional
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data?.url as string) ?? '/?go=devocional'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const c of clients) {
        if ('focus' in c) {
          c.navigate(url)
          return c.focus()
        }
      }
      return self.clients.openWindow(url)
    }),
  )
})
```

- [ ] **Step 3: Apontar o vite-plugin-pwa para o SW próprio**

Modify `vite.config.ts` — trocar o bloco `VitePWA({...})`. Substituir as opções
`registerType`/`workbox` por `strategies: 'injectManifest'` + `srcDir`/`filename`,
mantendo `registerType: 'autoUpdate'` e o `manifest`:

```ts
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      injectManifest: {
        // não deixar o app (SPA) sequestrar as rotas do site institucional em /site
        navigateFallbackDenylist: [/^\/site\//],
      },
      manifest: {
        name: 'Êxodo',
        short_name: 'Êxodo',
        description: 'Da escravidão para a liberdade.',
        lang: 'pt-BR',
        theme_color: '#211710',
        background_color: '#211710',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
    }),
```

> Nota: em `injectManifest` o `navigateFallback` não é gerado automaticamente. Como o
> app abre via `index.html` no precache e usa hash/query (não rotas reais), o denylist
> acima é defensivo; o `/site` continua sendo arquivos estáticos servidos direto.

- [ ] **Step 4: Garantir que o TS reconhece o lib webworker**

Confirmar que `tsconfig` não quebra com o SW. Rodar o build:

Run: `npm run build`
Expected: build conclui; aparece `dist/sw.js` no log do PWA (mode agora `injectManifest`).

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts src/sw.ts package.json package-lock.json
git commit -m "feat(pwa): service worker próprio com handlers de push"
```

---

### Task 2: Chaves VAPID

**Files:**
- Create: `src/lib/pushConfig.ts`
- (segredos vão pro Supabase, não pro git)

- [ ] **Step 1: Gerar o par de chaves VAPID**

Run: `npx --yes web-push generate-vapid-keys`
Expected: imprime `Public Key:` e `Private Key:` (strings base64url). **Guardar as duas.**

- [ ] **Step 2: Embutir a chave pública no front**

Create `src/lib/pushConfig.ts` (a chave **pública** é segura no código):

```ts
// Chave pública VAPID — segura para embutir (a privada fica só no Supabase).
// Gerada com `web-push generate-vapid-keys` em 2026-06-08.
export const VAPID_PUBLIC = 'COLAR_AQUI_A_PUBLIC_KEY'

// Para onde a notificação leva ao ser tocada.
export const URL_DEVOCIONAL = '/?go=devocional'
```

Substituir `COLAR_AQUI_A_PUBLIC_KEY` pela Public Key do Step 1.

- [ ] **Step 3: Commit**

```bash
git add src/lib/pushConfig.ts
git commit -m "feat(push): chave pública VAPID e destino do lembrete"
```

---

### Task 3: Helpers puros de push (TDD)

**Files:**
- Create: `src/lib/push.ts`
- Test: `src/lib/push.test.ts`

- [ ] **Step 1: Escrever os testes que falham**

Create `src/lib/push.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { urlBase64ToUint8Array, mensagemDoDia, MENSAGENS } from './push'

describe('urlBase64ToUint8Array', () => {
  it('converte base64url para Uint8Array do tamanho certo', () => {
    // "AQID" base64 -> bytes [1,2,3]
    const out = urlBase64ToUint8Array('AQID')
    expect(Array.from(out)).toEqual([1, 2, 3])
  })
  it('aceita base64url com - e _ e sem padding', () => {
    const out = urlBase64ToUint8Array('a-_w')
    expect(out).toBeInstanceOf(Uint8Array)
    expect(out.length).toBe(3)
  })
})

describe('mensagemDoDia', () => {
  it('é determinística para o mesmo dia', () => {
    expect(mensagemDoDia(10)).toEqual(mensagemDoDia(10))
  })
  it('sempre retorna uma mensagem da lista', () => {
    for (let i = 0; i < 20; i++) {
      const m = mensagemDoDia(i)
      expect(MENSAGENS).toContainEqual(m)
    }
  })
  it('varia ao longo dos dias', () => {
    const a = mensagemDoDia(0)
    const b = mensagemDoDia(1)
    expect(a).not.toEqual(b)
  })
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/lib/push.test.ts`
Expected: FAIL — `push.ts` ainda não existe / exports indefinidos.

- [ ] **Step 3: Implementar os helpers puros**

Create `src/lib/push.ts`:

```ts
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
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/lib/push.test.ts`
Expected: PASS (5 testes).

- [ ] **Step 5: Commit**

```bash
git add src/lib/push.ts src/lib/push.test.ts
git commit -m "feat(push): helpers puros (VAPID decode + mensagem do dia) com testes"
```

---

### Task 4: Detecção de iOS + funções de browser

**Files:**
- Modify: `src/lib/push.ts`
- Test: `src/lib/push.test.ts`

- [ ] **Step 1: Adicionar teste de `precisaInstalarNoIOS`**

Adicionar ao final do `describe` em `src/lib/push.test.ts`:

```ts
import { precisaInstalarNoIOS } from './push'

describe('precisaInstalarNoIOS', () => {
  const iphoneUA =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  const androidUA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36'

  it('true no iPhone fora do modo instalado', () => {
    expect(precisaInstalarNoIOS(iphoneUA, false)).toBe(true)
  })
  it('false no iPhone já instalado (standalone)', () => {
    expect(precisaInstalarNoIOS(iphoneUA, true)).toBe(false)
  })
  it('false no Android', () => {
    expect(precisaInstalarNoIOS(androidUA, false)).toBe(false)
  })
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/lib/push.test.ts`
Expected: FAIL — `precisaInstalarNoIOS` não existe.

- [ ] **Step 3: Implementar a detecção (injetável p/ teste)**

Adicionar em `src/lib/push.ts`:

```ts
// iOS só permite push se o PWA estiver instalado (standalone). Parâmetros injetáveis p/ teste.
export function precisaInstalarNoIOS(
  ua: string = navigator.userAgent,
  standalone: boolean = window.matchMedia?.('(display-mode: standalone)').matches ?? false,
): boolean {
  const ehIOS = /iphone|ipad|ipod/i.test(ua)
  return ehIOS && !standalone
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/lib/push.test.ts`
Expected: PASS (8 testes no total).

- [ ] **Step 5: Implementar as funções de browser (ativar/desativar/estado)**

Adicionar em `src/lib/push.ts` (dependem de browser; não há teste unitário):

```ts
import { supabase } from './supabase'
import { VAPID_PUBLIC } from './pushConfig'

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
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC),
    }))

  const json = sub.toJSON()
  const { error } = await supabase
    .from('push_subs')
    .upsert({ user_id: userId, endpoint: json.endpoint, subscription: json }, { onConflict: 'endpoint' })
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
```

- [ ] **Step 6: Verificar build de tipos**

Run: `npm run build`
Expected: build conclui sem erro de TypeScript.

- [ ] **Step 7: Commit**

```bash
git add src/lib/push.ts src/lib/push.test.ts
git commit -m "feat(push): detecção iOS + ativar/desativar/estado das notificações"
```

---

### Task 5: Tabela `push_subs` no Supabase

**Files:**
- Create: `supabase/migrations/20260608_push_subs.sql`

- [ ] **Step 1: Escrever a migração**

Create `supabase/migrations/20260608_push_subs.sql`:

```sql
create table if not exists push_subs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  endpoint     text not null unique,
  subscription jsonb not null,
  created_at   timestamptz not null default now()
);

alter table push_subs enable row level security;

create policy "own insert" on push_subs for insert with check (auth.uid() = user_id);
create policy "own update" on push_subs for update using (auth.uid() = user_id);
create policy "own select" on push_subs for select using (auth.uid() = user_id);
create policy "own delete" on push_subs for delete using (auth.uid() = user_id);
```

- [ ] **Step 2: Aplicar no banco**

Rodar o SQL no Supabase (SQL Editor do projeto `hucfvysilcsdgzsxgmbd`, ou via
`psql`/Management API). Expected: `Success. No rows returned`.

- [ ] **Step 3: Conferir RLS**

No SQL Editor: `select * from push_subs;`
Expected: tabela existe, 0 linhas.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260608_push_subs.sql
git commit -m "feat(db): tabela push_subs com RLS por usuário"
```

---

### Task 6: Edge Function `enviar-lembretes`

**Files:**
- Create: `supabase/functions/enviar-lembretes/index.ts`

- [ ] **Step 1: Escrever a função**

Create `supabase/functions/enviar-lembretes/index.ts`:

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import webpush from 'npm:web-push@3.6.7'

// mesma lista do front (espelhada de propósito p/ não acoplar build do app à função)
const MENSAGENS = [
  { titulo: 'Bom dia, guerreiro 🌅', corpo: 'Seu encontro com Deus te espera. Comece o dia firme.' },
  { titulo: 'Mais um dia de liberdade 💪', corpo: 'Abra o Êxodo e dê o próximo passo da sua caminhada.' },
  { titulo: 'A jornada continua 🏜️', corpo: 'Um devocional por dia mantém o coração no rumo certo.' },
  { titulo: 'Deus já está te esperando 🙏', corpo: 'Reserve este minuto pra Ele hoje.' },
  { titulo: 'Force a vitória de hoje ⚔️', corpo: 'Leitura, oração e mais um dia conquistado.' },
  { titulo: 'Não caminhe sozinho 🤝', corpo: 'Seu devocional de hoje já está disponível.' },
  { titulo: 'Firmeza, você consegue 🔥', corpo: 'Cada dia fiel é um passo rumo à Terra Prometida.' },
]

function mensagemDoDia() {
  const dia = Math.floor(Date.now() / 86_400_000) // dias desde epoch
  return MENSAGENS[dia % MENSAGENS.length]
}

Deno.serve(async (req) => {
  // só o cron pode chamar
  const auth = req.headers.get('Authorization') ?? ''
  if (auth !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
    return new Response('não autorizado', { status: 401 })
  }

  webpush.setVapidDetails(
    Deno.env.get('VAPID_SUBJECT')!,
    Deno.env.get('VAPID_PUBLIC')!,
    Deno.env.get('VAPID_PRIVATE')!,
  )

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data: subs, error } = await admin.from('push_subs').select('endpoint, subscription')
  if (error) return new Response(error.message, { status: 500 })

  const msg = mensagemDoDia()
  const payload = JSON.stringify({ titulo: msg.titulo, corpo: msg.corpo, url: '/?go=devocional' })

  let enviados = 0
  let removidos = 0
  for (const row of subs ?? []) {
    try {
      await webpush.sendNotification(row.subscription, payload)
      enviados++
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode
      if (status === 404 || status === 410) {
        await admin.from('push_subs').delete().eq('endpoint', row.endpoint)
        removidos++
      }
    }
  }

  return new Response(JSON.stringify({ enviados, removidos }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

- [ ] **Step 2: Commit**

```bash
git add supabase/functions/enviar-lembretes/index.ts
git commit -m "feat(edge): função enviar-lembretes (web-push + limpeza de subs mortas)"
```

---

### Task 7: Cartão de permissão no Painel

**Files:**
- Create: `src/components/CartaoLembrete.tsx`
- Modify: `src/screens/Painel.tsx`

- [ ] **Step 1: Criar o componente**

Create `src/components/CartaoLembrete.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { useApp } from '../state/AppContext'
import { ativarLembretes, estadoLembrete, precisaInstalarNoIOS } from '../lib/push'

const FLAG = 'exodo:lembrete-pedido'

export function CartaoLembrete() {
  const { userId } = useApp()
  const [visivel, setVisivel] = useState(false)
  const [ios, setIos] = useState(false)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(FLAG)) return
    if (precisaInstalarNoIOS()) {
      setIos(true)
      setVisivel(true)
      return
    }
    estadoLembrete().then((e) => setVisivel(e === 'inativo'))
  }, [])

  if (!visivel) return null

  const dispensar = () => {
    localStorage.setItem(FLAG, '1')
    setVisivel(false)
  }

  const ativar = async () => {
    if (!userId) return
    setCarregando(true)
    const r = await ativarLembretes(userId)
    setCarregando(false)
    localStorage.setItem(FLAG, '1')
    setVisivel(false)
    if (!r.ok && r.motivo === 'bloqueado') {
      alert('As notificações estão bloqueadas no navegador. Você pode reativar nas configurações do site.')
    }
  }

  return (
    <div className="rounded-2xl border border-dourado/30 bg-gradient-to-b from-dourado/10 to-transparent p-4">
      <h3 className="font-title text-dourado">🌅 Um empurrãozinho diário?</h3>
      {ios ? (
        <>
          <p className="text-cinza/75 text-sm mt-1">
            Pra receber o lembrete diário no iPhone, toque em <b>Compartilhar</b> e em
            <b> "Adicionar à Tela de Início"</b>. Depois abra o Êxodo pela tela inicial.
          </p>
          <button onClick={dispensar} className="mt-3 text-cinza/60 text-sm underline">
            Entendi
          </button>
        </>
      ) : (
        <>
          <p className="text-cinza/75 text-sm mt-1">
            Te lembro todo dia da sua caminhada com Deus, pra você não perder o ritmo.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={ativar}
              disabled={carregando}
              className="flex-1 rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-2.5 font-title font-bold text-azul disabled:opacity-50"
            >
              {carregando ? 'Ativando...' : 'Ativar lembrete'}
            </button>
            <button onClick={dispensar} className="rounded-xl border border-white/12 px-4 text-cinza/70 text-sm">
              Agora não
            </button>
          </div>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Montar o cartão no topo do Painel**

Modify `src/screens/Painel.tsx`: importar e renderizar `<CartaoLembrete />` logo abaixo
do cabeçalho de saudação (primeiro filho da coluna de conteúdo). Adicionar o import no
topo:

```tsx
import { CartaoLembrete } from '../components/CartaoLembrete'
```

E inserir `<CartaoLembrete />` como primeiro card da lista de conteúdo do Painel
(antes dos cards de batalhas/estatísticas).

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/CartaoLembrete.tsx src/screens/Painel.tsx
git commit -m "feat(ui): cartão de ativação do lembrete no Painel"
```

---

### Task 8: Toggle no Perfil

**Files:**
- Modify: `src/screens/Perfil.tsx`

- [ ] **Step 1: Adicionar estado e handlers no Perfil**

Modify `src/screens/Perfil.tsx`: importar as funções e o `userId`, e adicionar um bloco
de estado. No topo do arquivo:

```tsx
import { useEffect, useState } from 'react'
import { ativarLembretes, desativarLembretes, estadoLembrete, type EstadoLembrete } from '../lib/push'
```

Dentro do componente, pegar `userId` do `useApp()` (adicionar à desestruturação
existente) e adicionar:

```tsx
  const [lembrete, setLembrete] = useState<EstadoLembrete>('inativo')
  useEffect(() => {
    estadoLembrete().then(setLembrete)
  }, [])

  const alternarLembrete = async () => {
    if (!userId) return
    if (lembrete === 'ativo') {
      await desativarLembretes(userId)
      setLembrete('inativo')
    } else {
      const r = await ativarLembretes(userId)
      setLembrete(r.ok ? 'ativo' : await estadoLembrete())
    }
  }
```

- [ ] **Step 2: Renderizar a linha de toggle**

Adicionar, dentro do JSX do Perfil (logo após o bloco de patente/XP), este card:

```tsx
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between">
        <div>
          <p className="font-title text-cinza">Lembrete diário</p>
          <p className="text-cinza/55 text-xs mt-0.5">
            {lembrete === 'ativo'
              ? 'Você recebe um lembrete às 7h'
              : lembrete === 'bloqueado'
                ? 'Bloqueado no navegador'
                : lembrete === 'instalar-ios'
                  ? 'Instale o app na tela inicial'
                  : lembrete === 'sem-suporte'
                    ? 'Não disponível neste aparelho'
                    : 'Receba um empurrãozinho todo dia'}
          </p>
        </div>
        {(lembrete === 'ativo' || lembrete === 'inativo') && (
          <button
            onClick={alternarLembrete}
            className={`h-7 w-12 rounded-full transition relative ${
              lembrete === 'ativo' ? 'bg-dourado' : 'bg-white/15'
            }`}
            aria-label="Alternar lembrete diário"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all ${
                lembrete === 'ativo' ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        )}
      </div>
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/screens/Perfil.tsx
git commit -m "feat(ui): toggle de lembrete diário no Perfil"
```

---

### Task 9: Abrir no Devocional ao tocar a notificação

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Ler o parâmetro `?go=devocional` e abrir a aba certa**

Modify `src/App.tsx`: onde se controla a aba ativa (estado `aba`/`tab` das tabs
principais Painel/Habitos/Devocional/Diario/Perfil), inicializar a partir da query.
Adicionar perto do início do componente, junto aos outros `useState`/efeitos:

```tsx
  // abre direto no Devocional quando vem da notificação (/?go=devocional)
  useEffect(() => {
    const go = new URLSearchParams(window.location.search).get('go')
    if (go === 'devocional') {
      setAba('devocional') // usar o mesmo setter/valor das tabs existentes
      const url = new URL(window.location.href)
      url.searchParams.delete('go')
      window.history.replaceState({}, '', url.toString())
    }
  }, [])
```

> Ajustar `setAba`/`'devocional'` para o nome real do estado e do valor da aba do
> Devocional já usados em `App.tsx`.

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(app): abrir no Devocional ao tocar a notificação"
```

---

### Task 10: Deploy da função + segredos + agendamento

**Files:** (operações no Supabase; sem arquivos novos)

- [ ] **Step 1: Subir a Edge Function**

Run: `npx supabase functions deploy enviar-lembretes --project-ref hucfvysilcsdgzsxgmbd`
Expected: `Deployed Function enviar-lembretes`. (Requer login/token Supabase.)

- [ ] **Step 2: Definir os segredos da função**

Run (substituindo pelos valores reais; `CRON_SECRET` é uma senha longa qualquer):

```bash
npx supabase secrets set \
  VAPID_PUBLIC='<public-key>' \
  VAPID_PRIVATE='<private-key>' \
  VAPID_SUBJECT='mailto:euwillianmonteiro@gmail.com' \
  CRON_SECRET='<senha-aleatoria-longa>' \
  --project-ref hucfvysilcsdgzsxgmbd
```

Expected: `Finished supabase secrets set`. (`SUPABASE_URL` e
`SUPABASE_SERVICE_ROLE_KEY` já existem por padrão nas funções.)

- [ ] **Step 3: Habilitar extensões e agendar o cron**

No SQL Editor do Supabase, rodar (trocar `<CRON_SECRET>` pelo mesmo do Step 2):

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'lembrete-diario',
  '0 10 * * *', -- 10:00 UTC = 7:00 BRT
  $$
  select net.http_post(
    url := 'https://hucfvysilcsdgzsxgmbd.supabase.co/functions/v1/enviar-lembretes',
    headers := jsonb_build_object('Authorization', 'Bearer <CRON_SECRET>')
  );
  $$
);
```

Expected: retorna o `jobid` do agendamento.

- [ ] **Step 4: Conferir o agendamento**

No SQL Editor: `select jobname, schedule, active from cron.job;`
Expected: linha `lembrete-diario | 0 10 * * * | t`.

---

### Task 11: Deploy do app + verificação ponta-a-ponta

**Files:** (deploy; sem arquivos novos)

- [ ] **Step 1: Build + publicar (mantendo /site e CNAME)**

```bash
npm run build
rm -rf dist/site && mkdir -p dist/site
cp -R /Users/willianmonteiro/ai/exodo-site/* dist/site/
rm -f dist/site/CNAME
npx gh-pages -d dist -t
```

Expected: `Published`. (O CNAME `exodo.app.br` e o `/site` continuam no deploy.)

- [ ] **Step 2: Ativar o lembrete no app real (Android/desktop)**

Abrir `https://exodo.app.br`, logar, e no Painel clicar **Ativar lembrete** → aceitar a
permissão do navegador. Expected: permissão concedida; sem erro.

- [ ] **Step 3: Conferir a subscription no banco**

No SQL Editor: `select user_id, created_at from push_subs;`
Expected: 1 linha com o seu `user_id`.

- [ ] **Step 4: Disparar a função manualmente**

```bash
curl -i -X POST \
  -H "Authorization: Bearer <CRON_SECRET>" \
  https://hucfvysilcsdgzsxgmbd.supabase.co/functions/v1/enviar-lembretes
```

Expected: `200` com corpo `{"enviados":1,"removidos":0}` **e a notificação aparece** no
aparelho. Ao tocar, o app abre na aba **Devocional**.

- [ ] **Step 5: Conferir bloqueio de chamada não-autorizada**

```bash
curl -i -X POST https://hucfvysilcsdgzsxgmbd.supabase.co/functions/v1/enviar-lembretes
```

Expected: `401 não autorizado` (sem o header secreto).

- [ ] **Step 6: Rodar a suíte completa de testes**

Run: `npx vitest run`
Expected: todos os testes passam (incluindo os 8 de `push.test.ts`).
