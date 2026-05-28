# Immer Messen

Base de fundação do site institucional da Immer Messen. O projeto será composto por um frontend em Next.js e um CMS Strapi, com desenvolvimento local via Docker e conteúdo multilíngue em `pt-BR`, `en` e `es`.

## Estrutura atual

- `apps/web`: aplicação pública em Next.js.
- `apps/cms`: CMS editorial em Strapi.
- `docs/`: PRD e materiais de planejamento.
- `layout-aprovado/`: fonte de verdade visual aprovada para HTML, CSS, JS, imagens e vídeos.
- `.planning/`: artefatos GSD de contexto, requisitos, roadmap e planos.

Os diretórios vazios `frontend/` e `backend/` foram preservados por ora, mas a convenção ativa do workspace passa a ser `apps/web` e `apps/cms`.

## Pré-requisitos

- Node.js 20+
- `corepack` habilitado
- `pnpm` via Corepack
- Docker e Docker Compose

## Bootstrap local

1. Revisar os contratos em `.env.example`, `apps/web/.env.example` e `apps/cms/.env.example`.
2. Opcionalmente copiar `.env.example` para `.env` para substituir placeholders antes de usar o stack local.
3. Instalar dependências:

```bash
corepack enable
pnpm install
```

4. Subir o ambiente local completo:

```bash
pnpm docker:up
```

Serviços esperados:

- site público: `http://localhost:3000`
- Strapi: `http://localhost:1337`
- PostgreSQL: `localhost:5432`

## Comandos úteis

```bash
pnpm dev
pnpm dev:web
pnpm dev:cms
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm docker:up
pnpm docker:down
pnpm docker:reset
```

## Verificações base

Mesmo antes da instalação completa de Next.js e Strapi, o workspace já possui uma camada inicial de validação:

```bash
pnpm lint
pnpm test
pnpm typecheck
```

Esses comandos validam contratos do workspace, presença dos arquivos essenciais, parse de JSON/TSConfig e um smoke test básico do compose e da estrutura de planejamento. Na próxima iteração, eles serão evoluídos para lint real, typecheck real e suites por aplicação.

## Contratos de ambiente

Arquivo raiz `.env.example`:
- URLs públicas e internas entre `web` e `cms`
- segredos de preview e revalidação
- configuração base de banco
- placeholders de políticas de upload, CORS e rate limiting

Arquivo `apps/web/.env.example`:
- variáveis específicas do frontend para locale, preview e acesso ao Strapi

Arquivo `apps/cms/.env.example`:
- variáveis específicas do Strapi para host/porta, segredos e banco PostgreSQL

Nenhum secret real deve ser commitado. Na fase de implementação, esses arquivos serão copiados para `.env` locais e separados por ambiente.
O `docker-compose.yml` já possui defaults seguros de bootstrap para evitar falha imediata por ausência de `.env`, mas placeholders devem ser substituídos antes de qualquer uso real fora do ambiente local.

## Fonte visual e escopo

`layout-aprovado/` deve ser tratado como referência visual canônica. A migração para componentes reais precisa preservar:

- header fixo e menu mobile
- seletor de idioma
- accordions e carousel
- banner LGPD
- hierarquia visual das páginas institucionais

O escopo atual não inclui ecommerce, catálogo transacional, checkout, área logada nem integrações comerciais complexas.

## Próximos passos da fundação

- `01-02`: subir o esqueleto técnico de Next.js, Strapi, banco e compose com healthchecks operacionais.
- `01-03`: configurar lint, testes base, CI e documentação operacional mais detalhada.
- Próxima fase planejada: `Phase 2 - Frontend Architecture Foundation`.

## Planejamento

Os artefatos de planejamento vivem em:

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/phases/01-walking-skeleton/01-01-PLAN.md`
