# Plan / Estado atual do projeto

Última atualização: 2026-05-29

## Onde estamos

✅ **Em produção**: https://immer.fabiomonteiro.cloud + https://cms.fabiomonteiro.cloud
✅ **CMS**: Strapi 5 com conteúdo seedado, admin criado, volume de uploads montado
✅ **Web**: Next.js standalone, renderiza conteúdo dinâmico do CMS
✅ **Postgres**: rodando como serviço dentro do projeto EasyPanel `immer-messen`
✅ **Webhook revalidação**: ativo — publicação no Strapi atualiza o frontend em ~5s

## Último commit aplicado mas ainda **não deployado**

`c60f693 feat(web): render case body/challenge/solution/results + cover as featured image`

→ **AÇÃO**: deploy do `web` no EasyPanel pra rebuildar e mostrar a página de detalhes de cases com o conteúdo correto. Visita
`https://immer.fabiomonteiro.cloud/pt-BR/cases/monitoramento-de-baleias` depois pra validar.

## Pendências de produto (escopo futuro)

### 1. Página de detalhes de cases — alinhamento total com layout aprovado
Layout em `resources/case-details-100.jpg`. Atualmente renderiza hero + Detalhes
do Projeto + 3 logos + título + body/challenge/solution/results + coverImage.
Faltam:

- **Campos do CMS para "Detalhes do Projeto"**: hoje o card mostra
  Cliente/Data de início/Duração/Tags só se `details` vier preenchido, mas o
  Strapi `case-study/schema.json` não tem esses campos. Adicionar:
  - `client: string`
  - `startDate: date`
  - `duration: string`
  - `tags: json (array of strings)`
  Migração: editar `apps/cms/src/api/case-study/content-types/case-study/schema.json`,
  rebuild do CMS no EasyPanel (Strapi dev mode adiciona colunas automaticamente,
  mas em prod com restart pode precisar de migration manual).

- **Logos clientes**: hoje renderizados como `logo 1/2/3` hardcoded. Solução
  futura: relation manyToMany com `partner` ou campo `clientLogos` (multiple
  media) na case-study.

- **Sections dynamic zone** para galleries + featured images intercalados com
  texto (matching exato do layout): criar componente Strapi `case.text-section`,
  `case.gallery-section`, `case.hero-image-section` (zod schemas já existem).
  Adicionar dynamic zone `sections` ao case-study schema.

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
