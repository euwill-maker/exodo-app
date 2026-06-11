# Êxodo — Lembrete Diário (Notificações Push) — Design

**Data:** 2026-06-08
**Status:** Aprovado pelo Willian (design verbal)

## Resumo em linguagem simples

Notificação que chega todo dia **às 7h da manhã (horário de Brasília)** chamando a
pessoa pra fazer o devocional / continuar a caminhada. Funciona com o app fechado no
Android e no computador; no iPhone só funciona se o app estiver instalado na tela
inicial. Tudo roda no Supabase que já temos — sem serviço novo, sem custo, sem enviar
dados de usuário pra fora.

## Objetivo

Aumentar a retenção do app trazendo o usuário de volta diariamente, por meio de uma
notificação push agendada no servidor.

## Decisões fixadas

| Decisão | Escolha |
|---|---|
| Horário | Fixo, **7h BRT** (= 10:00 UTC) para todos |
| Comportamento | **Sempre enviar** (não checa quem já fez o devocional) |
| Infra | Web Push próprio + Supabase (cron + Edge Function) |
| Permissão | Cartão gentil dentro do app (não pop-up imediato) |
| Ao tocar | Abre o app na aba **Devocional** |
| iPhone sem instalar | Mostra aviso "adicione à tela inicial" |

## Arquitetura (fluxo)

```
[App React]                         [Supabase]
1. Usuário aceita lembretes
   → navegador gera "subscription"
   → salva em push_subs ──────────► tabela push_subs (RLS)

2. Todo dia 10:00 UTC:
   cron (pg_cron) ────────────────► Edge Function "enviar-lembretes"
                                     ├─ lê todas as subscriptions
                                     ├─ envia Web Push (VAPID) p/ cada uma
                                     └─ remove subscriptions mortas (404/410)
   → notificação chega no aparelho
3. Usuário toca → abre /?go=devocional
```

## Componentes

### 1. Service Worker próprio — `src/sw.ts`
Troca a estratégia do `vite-plugin-pwa` de `generateSW` para `injectManifest`, com um
SW escrito por nós que:
- mantém o precache do PWA (`precacheAndRoute(self.__WB_MANIFEST)`);
- escuta `push` → mostra a notificação (título, corpo, ícone, `data.url`);
- escuta `notificationclick` → foca/abre a aba na URL `data.url` (Devocional).

### 2. Lib de push no front — `src/lib/push.ts`
Funções puras + de browser:
- `urlBase64ToUint8Array(base64)` — converte a chave VAPID pública (testável).
- `mensagemDoDia(indiceDia)` — escolhe deterministicamente uma das mensagens
  rotativas pelo dia (testável). *(Usada também pela Edge Function — espelhada lá.)*
- `precisaInstalarNoIOS()` — true se for iOS e o app não estiver em modo standalone
  (testável com user-agent/navigator mockado).
- `ativarLembretes(userId)` — pede permissão, faz `pushManager.subscribe`, salva em
  `push_subs` (upsert por `endpoint`). Retorna `{ ok, motivo }`.
- `desativarLembretes(userId)` — `unsubscribe()` + apaga a linha em `push_subs`.
- `estadoLembrete()` — retorna `'ativo' | 'inativo' | 'bloqueado' | 'instalar-ios'`
  lendo `Notification.permission` + `pushManager.getSubscription()`.

### 3. Cartão de permissão — `src/components/CartaoLembrete.tsx`
Aparece no Painel quando: usuário logado, tutorial visto, ainda não pediu lembrete
(`localStorage 'exodo:lembrete-pedido'` ausente) e `estadoLembrete() === 'inativo'`.
Botões **Ativar** (chama `ativarLembretes`) e **Agora não** (grava a flag e some).
Se `precisaInstalarNoIOS()`, troca o texto pelo aviso de instalação.

### 4. Ajuste no Perfil — `src/screens/Perfil.tsx`
Linha "Lembretes diários" com toggle liga/desliga, refletindo `estadoLembrete()` e
chamando `ativarLembretes`/`desativarLembretes`.

### 5. Banco — tabela `push_subs`
```sql
create table push_subs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  endpoint     text not null unique,
  subscription jsonb not null,
  created_at   timestamptz not null default now()
);
alter table push_subs enable row level security;
-- usuário gerencia só as próprias; service_role faz tudo
create policy "own insert" on push_subs for insert with check (auth.uid() = user_id);
create policy "own select" on push_subs for select using (auth.uid() = user_id);
create policy "own delete" on push_subs for delete using (auth.uid() = user_id);
```

### 6. Edge Function — `supabase/functions/enviar-lembretes/index.ts`
- Autenticada por header secreto (só o cron chama).
- Usa `npm:web-push` com VAPID (`VAPID_PUBLIC`, `VAPID_PRIVATE`, `VAPID_SUBJECT`).
- Lê todas as `push_subs` (service role), envia a notificação do dia.
- Em erro 404/410 (aparelho morto) → deleta a linha.

### 7. Agendamento — pg_cron + pg_net
```sql
select cron.schedule(
  'lembrete-diario', '0 10 * * *',
  $$ select net.http_post(
       url := 'https://<ref>.supabase.co/functions/v1/enviar-lembretes',
       headers := jsonb_build_object('Authorization', 'Bearer <CRON_SECRET>')
     ) $$
);
```

## Segredos (ficam no Supabase, nunca no código)
- `VAPID_PRIVATE` — chave privada do Web Push.
- `VAPID_SUBJECT` — `mailto:euwillianmonteiro@gmail.com`.
- `CRON_SECRET` — protege a Edge Function.
- A chave **pública** VAPID é embutida no front (é pública por natureza).

## Tratamento de erros
- Permissão negada → `estadoLembrete()` vira `'bloqueado'`; UI explica como reativar.
- iPhone não-instalado → não tenta subscrever; mostra aviso de instalação.
- Subscription morta no envio → removida automaticamente do banco.
- Falha ao salvar no Supabase → mostra erro amigável, não quebra o app.

## Testes
- `push.test.ts`: `urlBase64ToUint8Array` (vetor conhecido), `mensagemDoDia`
  (determinístico e dentro da lista), `precisaInstalarNoIOS` (iOS standalone vs Safari).
- Verificação manual ponta-a-ponta: ativar no Android/desktop → rodar a função
  manualmente → notificação chega → tocar abre o Devocional.

## Fora de escopo (YAGNI)
- Horário escolhido por usuário, múltiplos lembretes/dia, lembrete "esperto" que pula
  quem já fez, segmentação por etapa. Podem vir depois.
