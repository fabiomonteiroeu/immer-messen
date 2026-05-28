# Prompt para Get Shit Done - Planejamento Immer Messen

Use este prompt no Get Shit Done para transformar o PRD em um plano executavel.

```text
Quero planejar a implementacao de producao do site institucional Immer Messen.

Repositorio: fabiomonteiroeu/immer-messen
Workspace local esperado: D:\projects\immer-messen
PRD: docs/PRD-immer-messen.md
Fonte visual aprovada: layout-aprovado/

Objetivo:
Criar um plano tecnico faseado para desenvolver um site institucional CMS-driven, sem ecommerce, usando apenas a stack necessaria:
- Next.js no frontend
- Strapi CMS no backend para tornar paginas e conteudos editaveis pela equipe do cliente
- Redux Toolkit para estado client-side da aplicacao
- Radix UI como base dos componentes interativos/acessiveis
- Zod para validacao dos formularios, envs e contratos de dados
- Docker para desenvolvimento local
- i18n para pt-BR, en e es
- conteudo editavel por CMS
- seguranca, sanitizacao de formulario, SEO, Core Web Vitals, responsividade e testes
- cache/ISR, preview editorial, webhooks de revalidacao Strapi -> Next.js e otimizacao de midia
- hardening de uploads, CSP/headers, observabilidade, healthchecks e deteccao de secrets
- incluir TestSprite no fluxo de testes automatizados

Antes de planejar:
1. Leia docs/PRD-immer-messen.md.
2. Inspecione a pasta layout-aprovado/ e trate seus HTMLs, CSS, JS, imagens e videos como fonte de verdade visual.
3. Planeje uma arquitetura institucional limpa com Next.js, Strapi, Docker e i18n. Nao use referencias de ecommerce ou commerce boilerplates.
4. Inclua Redux Toolkit, Radix UI e Zod como decisoes tecnicas obrigatorias do frontend.
5. Inclua no planejamento performance e seguranca de producao: cache/ISR, webhook de revalidacao, preview, Lighthouse CI, bundle budget, CSP, headers, uploads seguros, healthchecks, monitoramento de erros e testes visuais.
6. Verifique se ja existe .planning/. Se nao existir, inicialize a estrutura GSD necessaria antes de criar fases.

Entregaveis do planejamento:
1. ROADMAP.md com milestones e fases pequenas, testaveis e em ordem de dependencia.
2. Para cada fase, PLAN.md com:
   - objetivo
   - escopo incluido
   - fora de escopo
   - arquivos/pastas provaveis
   - tarefas tecnicas
   - criterios de aceite
   - testes obrigatorios
   - riscos e rollback
3. Uma fase inicial de walking skeleton com Docker, Next.js, Strapi, banco, envs, lint, testes base e CI.
4. Uma fase de arquitetura frontend base incluindo Redux Toolkit, Radix UI, Zod, providers, estrutura de componentes e convencoes de validacao.
5. Uma fase especifica de modelagem Strapi com i18n, content types, roles, seed inicial e uploads.
6. Uma fase de preview editorial, cache/ISR, webhook seguro de revalidacao e otimizacao de imagens/videos/fontes.
7. Fases de frontend por fatias verticais CMS-driven, preservando o layout aprovado.
8. Uma fase de hardening com formulario, Zod, sanitizacao, rate limit, LGPD/cookies, CSP, headers de seguranca, upload hardening, SEO, sitemap, healthchecks e observabilidade.
9. Uma fase de QA final incluindo Playwright, acessibilidade, Lighthouse CI/Core Web Vitals, bundle budget, testes visuais e TestSprite.

Regras importantes:
- Nao implemente codigo ainda; produza primeiro um plano verificavel.
- Nao planeje ecommerce: nada de produtos, carrinho, checkout, pagamentos, pedidos, cupons, estoque, area de clientes ou catalogo transacional.
- Quebre o trabalho em fases que possam ser revisadas e testadas individualmente.
- Evite modelos CMS genericos demais: use Dynamic Zones e blocos alinhados aos componentes reais do layout aprovado.
- O Strapi deve ser pensado para que a equipe do cliente consiga editar paginas, blocos, textos, imagens, videos, SEO, rodape, noticias, cases, contatos e LGPD sem alterar codigo.
- Use Redux Toolkit apenas para estado client-side compartilhado; nao duplique dados server-rendered do CMS sem necessidade.
- Use Radix UI para dropdowns, dialogs/drawers, accordions, tooltips, popovers, tabs e primitives equivalentes.
- Use Zod em todos os formularios e em contratos criticos entre frontend, rotas server-side e Strapi.
- Planeje webhook Strapi -> Next.js para revalidacao on-demand com secret, validacao de payload, logs e fallback manual.
- Planeje preview mode para drafts do Strapi, com URL segura e experiencia simples para a equipe do cliente.
- Planeje otimizacao de midia: posters obrigatorios, compressao de videos, `preload` controlado, imagens WebP/AVIF, dimensoes fixas, lazy loading e fontes self-hosted.
- Planeje seguranca de producao: CSP estrita, security headers, CORS por ambiente, rate limit, honeypot, tempo minimo no formulario, upload MIME allowlist, bloqueio de SVG nao confiavel e deteccao de secrets no CI.
- Planeje observabilidade: Sentry ou equivalente, logs estruturados, healthchecks de frontend/Strapi/banco e logs de webhooks.
- Planeje QA de performance e visual: Lighthouse CI, bundle budget, testes visuais por screenshot comparando com `layout-aprovado`, axe e Playwright.
- Inclua requisitos de migracao dos assets locais de layout-aprovado para o frontend/CMS.
- Inclua estrategia para substituir placeholders externos por assets locais ou midias gerenciadas no Strapi.
- Inclua testes unitarios, integracao, e2e, acessibilidade, performance e TestSprite.
- Para TestSprite, planeje:
  - gerar testes via TestSprite MCP quando houver URL local/preview navegavel;
  - versionar testsprite_tests/ quando gerado;
  - configurar GitHub App ou GitHub Actions com TESTSPRITE_API_KEY quando existir deploy preview por PR;
  - cobrir home, tecnologia, solucoes, quem somos, cases, noticias, contato, LGPD, idiomas, menu mobile e formulario.
- Inclua criterios de Definition of Done para producao.

Comando GSD sugerido, se o workflow suportar PRD direto:
$gsd-plan-phase --prd docs/PRD-immer-messen.md --mvp --research

Se nao houver projeto GSD inicializado, primeiro crie/inicialize o projeto e gere o roadmap a partir do PRD; depois rode o planejamento da primeira fase.
```

## Observacoes para o planejador

- A pasta `frontend/` e `backend/` pode estar vazia; trate isso como oportunidade de criar a fundacao limpa.
- O diretorio atual pode ainda nao ser um repositorio git inicializado localmente, mesmo que exista repositorio remoto informado pelo usuario.
- O layout aprovado ja contem comportamento JS para sticky header, menu mobile, dropdown de idiomas, accordions, carousel, banner LGPD e formularios; no Next.js, esses comportamentos devem virar componentes acessiveis e testaveis.
- Priorize uma arquitetura que permita publicar conteudo sem redeploy, mas mantenha as paginas performaticas via SSG/ISR quando possivel.
- Priorize limites editoriais no Strapi para impedir que conteudo longo, imagens ausentes ou uploads inadequados quebrem o layout aprovado.
