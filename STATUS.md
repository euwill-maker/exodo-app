# Êxodo — Status (atualizado enquanto você dormia, 2026-06-07)

## 🌐 No ar (links de verdade)
- **App:** https://euwill-maker.github.io/exodo-app/  ← abra no celular e "Adicionar à tela inicial" pra instalar
- **Site (landing):** https://euwill-maker.github.io/exodo-site/
- Os botões do site abrem o app automaticamente.

> Repositórios no seu GitHub (euwill-maker): `exodo-app` (código + branch `gh-pages` publicada) e `exodo-site`.

## ✅ O que está pronto e funcionando
**App (PWA, instalável, offline, dados no próprio aparelho):**
- Boas-vindas + Painel de Batalhas (vários vícios ao mesmo tempo)
- Criar batalha: vício → desafio (7/21/40/90/180/365) → Declaração de Liberdade → motivos **+ upload de fotos** → plano de ação (objetivos) → **Pacto de Compromisso assinado**
- Detalhe da batalha: anel de progresso animado, 5 fases (Egito→Terra Prometida), próximo marco, versículo do dia, melhor sequência/recomeços, objetivos, **fotos**, conquistas, recaída sem condenação
- **Muralha da Tentação** com 3 modos: 🛡️ Armadura de Deus (Efésios 6), 🌊 Surfe a Onda (cronômetro+respiração), 🔥 Sala de Guerra (clamor, fotos, louvor, chamar reforço)
- Aba Hábitos (micro-hábitos com check diário + sequência)
- Aba Devocional (jornadas por tema + reflexão pessoal)
- Aba Diário espiritual + Aba Perfil
- Identidade visual própria: ícones desenhados, fundo de céu estrelado + montanhas, fonte de escritura
- 18 testes automatizados passando; build limpo

**Site:** hero com mockup do app, problema, jornada, método, funcionalidades, **Muralha (3 modos)**, base bíblica, conquistas, **planos (7 dias grátis → R$ 9,90/mês)**, FAQ, CTA, modal de captura de e-mail.

## ⏳ O que falta (decisões/itens pra terminarmos juntos)
1. **Cobrança real do plano** (7 dias grátis → R$ 9,90/mês): hoje o preço está só no site. Pra cobrar de verdade no app precisa de **conta de usuário (login) + pagamento (ex: Mercado Pago/Stripe) + a trava dos 7 dias**. Isso também habilita backup na nuvem. É a maior peça pendente — precisamos planejar.
2. **Captura de e-mails do site**: o modal funciona, mas falta plugar o `LEADS_ENDPOINT` (mesma planilha/Google Apps Script da sua mentoria) pra você receber os contatos.
3. **Logo/ícone oficial**: hoje é um "Ê" dourado provisório que eu desenhei.
4. **Domínio próprio** (opcional): hoje está no github.io. Dá pra apontar um domínio depois.
5. **IA "Moisés"** e **Comunidade**: continuam na visão futura (v2), precisam de servidor.

## Como rodar localmente (se precisar)
- App: `cd exodo && npm run dev`
- Site: `cd exodo-site && python3 -m http.server 8090`
- Para republicar o app após mudanças: `cd exodo && npm run build && npx gh-pages -d dist`
- Para republicar o site: `cd exodo-site && git add -A && git commit -m "..." && git push`
