# Êxodo — Painel de Admin + Analytics — Design

**Data:** 2026-06-08
**Status:** Aprovado pelo Willian (design verbal)

## Resumo

Área de administração acessível só pelo Willian, dentro do app, mostrando números de
uso e uma lista de usuários — **apenas metadados** (nome, e-mail, plano, datas, último
acesso, dias na jornada). **Nunca** o conteúdo íntimo (diário, recaídas, gatilhos,
fotos), por ética e LGPD.

## Decisões fixadas

| Decisão | Escolha |
|---|---|
| Conteúdo exposto | Só dados de uso (metadados). Nada de diário/recaídas/fotos. |
| Onde fica | Dentro do app: botão "Painel Admin" no Perfil, visível só p/ admin |
| Como protege | Edge Function com service role + checagem `is_admin` do chamador |
| Visitantes | Contador anônimo (RPC) por abertura de app/site |

## Arquitetura

```
[App] Perfil → botão "Painel Admin" (só se isAdmin)
        │
        ▼
   tela Admin → supabase.functions.invoke('admin-stats')  (envia JWT do Willian)
                          │
              [Edge Function admin-stats]
                ├─ confere JWT → é admin? (profiles.is_admin) senão 403
                ├─ service role: junta auth.users + profiles + estados
                └─ devolve { totais, visitas, usuarios[] }  (só metadados)

[App/Site] ao abrir → supabase.rpc('registrar_visita')  → tabela visitas_diarias (+1)
```

## Componentes

### 1. Coluna `is_admin` em `profiles`
`alter table profiles add column is_admin boolean not null default false;`
Marcar a conta do Willian (`euwillianmonteiro@gmail.com`) como `true`. Usuário não
escreve em `profiles` (RLS), então ninguém se autopromove.

### 2. `carregarPerfil` + contexto
`carregarPerfil` passa a selecionar `plano, trial_ends, is_admin`. O `AppContext`
expõe `isAdmin: boolean`.

### 3. Contador de visitas
- Tabela `visitas_diarias (dia date primary key, total int not null default 0)`.
- RPC `registrar_visita()` SECURITY DEFINER: upsert `+1` no dia atual. Execute liberado
  p/ anon + authenticated.
- App chama `supabase.rpc('registrar_visita')` **uma vez por sessão** (guarda flag em
  `sessionStorage`). O site (`/site/index.html`) faz o mesmo ping via REST.

### 4. Edge Function `admin-stats`
- Recebe o JWT do chamador (deploy com verify_jwt ligado).
- Cria client com o header Authorization p/ `getUser()` → pega o id do chamador.
- Com service role, confere `profiles.is_admin` desse id. Se não for admin → **403**.
- Coleta (service role):
  - `auth.users`: id, email, created_at.
  - `profiles`: plano, trial_ends.
  - `estados`: updated_at (último acesso) + `data` p/ extrair só **nome** e **dias na
    jornada** (maior nº de dias entre as batalhas). Nada de texto íntimo é devolvido.
- Devolve:
  ```json
  {
    "totais": { "cadastrados": N, "trial": N, "pagantes": N, "novos7d": N, "ativos7d": N },
    "visitas": { "total": N, "ultimos7d": N },
    "usuarios": [
      { "nome": "...", "email": "...", "plano": "trial",
        "criado_em": "ISO", "ultimo_acesso": "ISO|null", "dias": 12 }
    ]
  }
  ```

### 5. Tela `Admin.tsx`
- Ao montar: `invoke('admin-stats')`. Estados de carregando/erro.
- Cards com os totais + visitantes; tabela de usuários (ordenada por último acesso).
- Aberta como overlay de tela cheia a partir do Perfil (estado `adminAberto` no App).

## Segurança
- `is_admin` só gravável por service role (RLS bloqueia o cliente). ✔️
- `admin-stats` exige JWT válido **e** `is_admin` — não-admin recebe 403. ✔️
- A lista completa nunca trafega pelo RLS do cliente; só a função (servidor) monta. ✔️
- `registrar_visita` é um contador anônimo simples (risco só de inflar número; aceitável). ✔️

## Testes
- Unidade: helper `diasNaJornada(estado)` (maior dias entre batalhas) — puro, testável.
- Manual: como admin, abrir o painel → ver números e lista; como não-admin, a função
  responde 403 e o botão nem aparece.

## Fora de escopo (YAGNI)
- Exportar CSV, gráficos temporais, filtros avançados, envio de e-mail em massa,
  edição/banimento de usuários. Podem vir depois.
