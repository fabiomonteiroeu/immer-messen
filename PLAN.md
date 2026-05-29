# Plan / Estado atual do projeto

Última atualização: 2026-05-29

## Onde estamos

✅ **Em produção**: https://immer.fabiomonteiro.cloud + https://cms.fabiomonteiro.cloud
✅ **CMS**: Strapi 5 com conteúdo seedado, admin criado, volume de uploads montado
✅ **Web**: Next.js standalone, renderiza conteúdo dinâmico do CMS
✅ **Postgres**: rodando como serviço dentro do projeto EasyPanel `immer-messen`
✅ **Webhook revalidação**: ativo — publicação no Strapi atualiza o frontend em ~5s

## Pendências de deploy

`HEAD ` — case detail CMS-editável + Strapi schema novo + seed atualizado.
Pendente:
1. Deploy CMS no EasyPanel (schema ganha `client/startDate/duration/tags/projectLogos`; perde `challenge/solution/results`).
2. Rodar `pnpm seed:prod` para popular os 4 cases com os novos campos.
3. Deploy Web no EasyPanel (page e mocks atualizados).
4. Smoke test em `/pt-BR/cases/monitoramento-de-gasodutos`.

Plano detalhado: `docs/PLAN-case-detail-cms.md`.

## Pendências de produto (escopo futuro)

### 1. Layout aprovado de case — refinamentos futuros
Hoje atende o essencial (summary abaixo do título, card 4 itens editável, até 3 logos dinâmicos, body único). Se a composição texto + galeria 3-up + hero alternada do `resources/case-details-100.jpg` ficar abaixo do aceitável com richtext puro, migrar `body` pra dynamic-zone `sections` (case.text-section/gallery/hero-image).

Colunas órfãs no Postgres pós-migração: `challenge`, `solution`, `results` ainda existem como colunas no DB mas não são mais expostas pela API. Quando confortável, dropar via SQL direto no Postgres do EasyPanel.

### 2. Bug no seed pt-BR de gasodutos
Commit do Gemini (`276bebd`) trocou acidentalmente:
- `case "monitoramento-de-gasodutos-onshore"` → pt-BR ficou com `title:
  "Monitoramento de cabos submarinos"` e `slug: "monitoramento-de-cabos-submarinos"`
- en/es mantiveram `slug: "monitoramento-de-gasodutos-onshore"`

Revisar e corrigir em `apps/cms/scripts/seed-content.mjs` — provavelmente foi
edit acidental.

### 3. Adicionar partners + application-areas ao webhook de revalidação
Se o cliente quiser editar logo de parceiro ou texto de área e ver na hora,
adicionar `api::partner.partner` e `api::application-area.application-area` ao
`REVALIDATE_MODEL_MAP` em `apps/cms/src/index.ts`, e os handlers correspondentes
em `apps/web/lib/cms/revalidation.ts` (atualmente caem em "unsupported model").

### 4. Limpar arquivos experimentais do Gemini
Em `apps/cms/scripts/` ficaram untracked:
- `parse-cases.mjs`, `get-local-cases.mjs`, `test-populate.mjs`
- `formatted-defs.json`, `local-cases-dump.json`

Decidir: deletar, gitignorar, ou commitar.

## Gotchas críticos do EasyPanel (NÃO ESQUECER)

1. **NÃO setar nenhum desses como env var no EasyPanel** (já estão no Dockerfile):
   `NODE_ENV`, `PORT`, `HOST`, `HOSTNAME`, `NEXT_TELEMETRY_DISABLED`.
   Em particular `HOSTNAME=0.0.0.0` quebra o DNS interno do EasyPanel e gera
   loop de restart.

2. **DNS interno do EasyPanel NÃO RESOLVE** entre os serviços do nosso projeto.
   `INTERNAL_STRAPI_URL` e `WEB_REVALIDATE_URL` precisam usar **URL pública**
   (`https://cms.fabiomonteiro.cloud`, `https://immer.fabiomonteiro.cloud/...`),
   não o internal hostname `immer-messen_<service>`. Pequena latência extra,
   mas funciona consistente.

3. **Caminho de Build = `/`** (raiz do repo), **Caminho do Dockerfile** =
   `apps/<servico>/Dockerfile`. Tanto pra web quanto pra cms.

4. **Em mudanças NEXT_PUBLIC_*** precisa **Deploy** (build novo), não Restart —
   essas variáveis são inlined no bundle em build-time, declaradas como `ARG`
   no Dockerfile do web.

5. **Partners relation em dynamic-zone component**: Strapi 5 silenciosamente
   descarta a relação no PUT via REST. O frontend cai num fallback que busca
   `/api/partners` direto. Por isso o `partners-block` aparece preenchido
   mesmo o bloco "vazio" no admin. Pra editar partners de um bloco
   específico, faça pelo Content Manager → Partner direto (collection).

## Scripts úteis no package.json

- `pnpm secrets:prod:file` — gera secrets em `/tmp/prod-secrets.env`
- `pnpm seed:prod:dry` / `seed:prod` — seeda produção (idempotente)
- `pnpm patch:about:prod` — aplica about-content-block + Petrobras
- `pnpm og:generate` — regenera `public/og-image.png`

## Documentação de referência

- `DEPLOY.md` — guia EasyPanel passo-a-passo + troubleshooting completo
- `SEED-PRODUCTION.md` — 3 caminhos pra popular conteúdo + verificação

## Arquivos críticos pra futuras mudanças

- `apps/web/components/ui/page-blocks.tsx` — renderer dos blocos CMS
- `apps/web/components/ui/site-shell.tsx` — header/footer
- `apps/web/components/ui/site-shell-effects.tsx` — header transparente em home + technology
- `apps/web/lib/cms/schemas.ts` — zod schemas que validam resposta do Strapi
- `apps/cms/src/index.ts` — webhook de revalidação (REVALIDATE_MODEL_MAP)
- `apps/cms/src/api/<entity>/content-types/<entity>/schema.json` — schemas do CMS
