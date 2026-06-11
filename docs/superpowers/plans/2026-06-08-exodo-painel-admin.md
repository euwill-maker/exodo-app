# Painel de Admin + Analytics — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`).

**Goal:** Área de admin (só Willian) com números de uso + lista de usuários (só metadados), e um contador de visitantes.

**Architecture:** Coluna `is_admin` em `profiles`; Edge Function `admin-stats` (service role + checagem de admin) monta os dados; tela `Admin.tsx` consome via `functions.invoke`; RPC `registrar_visita` conta aberturas.

**Tech Stack:** React 19 + Supabase (Postgres, Edge Functions, RPC), Vitest.

---

### Task 1: Coluna is_admin + marcar Willian (DB)
- [ ] `alter table profiles add column if not exists is_admin boolean not null default false;`
- [ ] `update profiles set is_admin = true where id = (select id from auth.users where email = 'euwillianmonteiro@gmail.com');`
- [ ] Conferir: `select id, plano, is_admin from profiles where is_admin;` → 1 linha.

### Task 2: Contador de visitas (DB)
- [ ] Criar tabela + RPC:
```sql
create table if not exists visitas_diarias (dia date primary key, total int not null default 0);
create or replace function registrar_visita() returns void
  language sql security definer set search_path = public as $$
  insert into visitas_diarias (dia, total) values (current_date, 1)
  on conflict (dia) do update set total = visitas_diarias.total + 1;
$$;
grant execute on function registrar_visita() to anon, authenticated;
```
- [ ] Conferir: `select registrar_visita();` depois `select * from visitas_diarias;` → total ≥ 1.

### Task 3: helper diasNaJornada (TDD)
**Files:** Create `src/lib/admin.ts`, Test `src/lib/admin.test.ts`
- [ ] Teste:
```ts
import { describe, it, expect } from 'vitest'
import { diasNaJornada } from './admin'
describe('diasNaJornada', () => {
  it('0 sem batalhas', () => expect(diasNaJornada({ batalhas: [] })).toBe(0))
  it('maior dias entre batalhas', () => {
    const ontem = new Date(Date.now() - 86400000 * 5).toISOString()
    const r = diasNaJornada({ batalhas: [{ dataInicio: ontem }] })
    expect(r).toBeGreaterThanOrEqual(5)
  })
})
```
- [ ] Implementar:
```ts
export function diasNaJornada(estado: { batalhas?: { dataInicio: string }[] }): number {
  const bs = estado.batalhas ?? []
  if (!bs.length) return 0
  const ms = Math.min(...bs.map((b) => new Date(b.dataInicio).getTime()))
  return Math.floor((Date.now() - ms) / 86_400_000)
}
```
- [ ] `npx vitest run src/lib/admin.test.ts` → PASS.

### Task 4: Edge Function admin-stats
**Files:** Create `supabase/functions/admin-stats/index.ts` (código completo no spec; usa service role, checa is_admin, junta auth.users+profiles+estados, devolve totais/visitas/usuarios).
- [ ] Escrever a função (ver corpo no passo de implementação).
- [ ] Deploy com verify_jwt ligado (sem --no-verify-jwt).

### Task 5: carregarPerfil + contexto isAdmin
**Files:** Modify `src/lib/cloud.ts`, `src/state/AppContext.tsx`
- [ ] `cloud.ts`: `select('plano, trial_ends, is_admin')`; tipo retorna `is_admin?: boolean`.
- [ ] `AppContext`: estado `isAdmin`, setado junto com plano/trialEnds; exposto no Ctx.

### Task 6: registrar_visita no carregamento
**Files:** Modify `src/state/AppContext.tsx`
- [ ] No mount (uma vez por sessão via sessionStorage), `supabase.rpc('registrar_visita')`.

### Task 7: Tela Admin + botão no Perfil
**Files:** Create `src/screens/Admin.tsx`, Modify `src/screens/Perfil.tsx`, `src/App.tsx`
- [ ] `Admin.tsx`: invoke('admin-stats'), cards + tabela, loading/erro, botão Voltar.
- [ ] `Perfil.tsx`: botão "Painel Admin" só se `isAdmin`.
- [ ] `App.tsx`: estado `adminAberto` + overlay.

### Task 8: Build, deploy, verificação
- [ ] `npm run build` + `npx vitest run` (tudo passa).
- [ ] Deploy app (dist + /site + CNAME).
- [ ] Como admin: abrir Painel Admin → ver números/lista.
- [ ] Conferir 403 chamando admin-stats sem ser admin.
