# PRD - Site Institucional Immer Messen

Data: 2026-05-23  
Repositorio alvo: `fabiomonteiroeu/immer-messen`  
Fonte visual aprovada: `layout-aprovado/`

## 1. Resumo Executivo

Construir o site institucional multilíngue da Immer Messen para produção, preservando o design aprovado em HTML da pasta `layout-aprovado` e implementando somente a stack necessária para o site: Next.js no frontend, Strapi como CMS editorial, Docker para desenvolvimento local e preparação de deploy, e i18n para portugues do Brasil, ingles e espanhol.

O produto final deve permitir que a propria equipe do cliente edite paginas, blocos de conteudo, imagens, videos, SEO, rodape, dados de contato, noticias, cases e politica de privacidade pelo painel Strapi, sem depender de alteracoes manuais no codigo para conteudo editorial. Nao havera ecommerce, carrinho, checkout, area de pedidos ou catalogo transacional.

## 2. Objetivos

- Replicar com fidelidade o padrao visual aprovado em `layout-aprovado`, incluindo header fixo, menu mobile, hero com video/imagem, secoes tecnicas, accordions, cards com hover, carousel de noticias, formulario, rodape e banner LGPD.
- Entregar um site rapido, responsivo, acessivel, indexavel e preparado para trafego real em producao.
- Habilitar gestao editorial no Strapi para PT-BR, EN e ES.
- Permitir que a equipe do cliente atualize conteudo institucional sem apoio tecnico recorrente.
- Usar Redux Toolkit para estado client-side, Radix UI como base de componentes interativos/acessiveis e Zod para validacao de formularios e contratos de dados.
- Garantir seguranca no formulario de contato, no consumo de conteudo CMS e na configuracao de containers.
- Criar base de testes unitarios, integracao, e2e e testes automatizados com TestSprite.
- Preparar desenvolvimento local com Docker, sincronizavel com hospedagem posterior.

## 3. Fora de Escopo Inicial

- Area logada para clientes.
- Ecommerce, loja virtual, catalogo transacional, carrinho, checkout, pagamentos, pedidos, cupons ou area de cliente.
- Integracao com CRM ou automacoes comerciais complexas. O formulario deve apenas registrar a submissao no Strapi e/ou enviar email/webhook simples, se configurado.
- Traducao automatica em runtime. O CMS deve armazenar traducoes revisadas por idioma.
- Rebranding ou redesenho alem do necessario para converter o HTML aprovado em componentes responsivos.

## 4. Usuarios e Necessidades

- Visitante tecnico/industrial: entender rapidamente tecnologia DFOS/DAS/DTS, aplicacoes, cases e diferenciais.
- Lead comercial: solicitar contato com seguranca e receber confirmacao clara.
- Editor de conteudo: publicar e atualizar paginas, noticias, cases, imagens, videos, SEO e rodape em tres idiomas.
- Administrador tecnico: operar ambiente local via Docker, configurar secrets, validar testes e preparar deploy.

## 5. Referencias Visuais e Conteudo Base

O layout aprovado contem as paginas:

- Home: `layout-aprovado/index.html`
- Tecnologia: `layout-aprovado/tecnologia.html`
- Solucoes: `layout-aprovado/solucoes.html`
- Quem somos: `layout-aprovado/quem-somos.html`
- Cases: `layout-aprovado/cases.html`
- Cases individuais: `layout-aprovado/cases/*.html`
- Noticias: `layout-aprovado/noticias.html`
- Contato: `layout-aprovado/contato.html`
- LGPD: `layout-aprovado/lgpd.html`

Assets locais principais:

- Logo: `layout-aprovado/assets/img/logo-immer.png`
- Hero/video: `layout-aprovado/assets/video/HOME.mp4`
- Video de tecnologia/interrogador: `layout-aprovado/assets/video/Interrogador.webm`
- Imagens de tecnologia, interface, areas de aplicacao, parceiros e icones em `layout-aprovado/assets/img/`

Requisito: imagens externas de placeholder usadas nos HTMLs devem ser substituidas por assets locais otimizados ou campos de media no Strapi.

## 6. Arquitetura Esperada

### 6.1 Frontend

- Next.js com App Router, TypeScript e componentes reutilizaveis.
- Estado da aplicacao gerenciado com Redux Toolkit, restringindo seu uso a estado client-side compartilhado, como preferencias de idioma/UI, consentimento LGPD, estado de menu/drawer quando necessario, formularios complexos e caches leves que nao sejam melhor resolvidos por Server Components/fetch.
- Radix UI deve ser usado como base para componentes interativos e acessiveis, especialmente menu/dialog/drawer, dropdown de idioma, accordion, tooltip, popover, tabs e outros primitives equivalentes.
- Zod deve ser usado para schemas de validacao e parse de formularios, payloads de contato, variaveis de ambiente e respostas criticas vindas do Strapi.
- Renderizacao preferencial: SSG/ISR para paginas publicas e conteudo CMS; SSR apenas quando necessario.
- Estrategia explicita de cache/ISR por tipo de conteudo: paginas institucionais, noticias, cases, footer/settings globais e politicas.
- Webhook seguro do Strapi para revalidacao on-demand no Next.js quando conteudo for publicado, atualizado ou removido.
- Preview mode do Next.js integrado ao Strapi para revisao de drafts antes da publicacao.
- i18n por rota, com estrutura recomendada `/{locale}/...`, aceitando `pt-BR`, `en` e `es`.
- Cliente HTTP isolado para Strapi, com validacao/normalizacao de dados antes de renderizar.
- Componentes baseados no layout aprovado: Header, LanguageSwitcher, MobileDrawer, Footer, LGPD/CookieBanner, Hero, PageHero, Accordion, AppliedAreaCard, CaseCard, NewsCarousel, ContactForm, RichTextBlock, MediaBlock.
- Uso de `next/image` para imagens e estrategia adequada para videos: poster obrigatorio, lazy loading, `preload="none"` ou `metadata`, versoes mobile/desktop quando fizer sentido e formatos otimizados.
- Fontes devem ser self-hosted/localizadas no projeto sempre que possivel, evitando dependencia de Google Fonts em producao.
- Bundle budget no CI para alertar crescimento excessivo de JS/CSS.

### 6.2 CMS Strapi

- Strapi com TypeScript, banco local em container e suporte a i18n habilitado para PT-BR, EN e ES.
- Conteudo publicado via REST ou GraphQL, escolhendo a opcao mais simples, segura e facil de manter para um site institucional CMS-driven.
- Roles e permissoes configuradas com minimo privilegio.
- Preview editorial configurado para que a equipe revise drafts em ambiente seguro antes de publicar.
- Uploads configurados para ambiente local e abstracao para storage de producao.
- Uploads devem ter limites editoriais claros: tamanho maximo, MIME allowlist, bloqueio de SVG nao confiavel, nomes seguros, alt text obrigatorio para imagens editoriais e dimensoes recomendadas.
- Blocos editoriais devem ter validacoes e limites para evitar quebra visual, como tamanho maximo de titulos, quantidade maxima de cards por bloco, imagem obrigatoria quando o layout exigir e texto alternativo obrigatorio.
- Seed inicial deve importar/adaptar o conteudo e assets de `layout-aprovado` para acelerar validacao editorial.
- Deve existir estrategia de backup/export do conteudo Strapi antes de deploys importantes.
- Content Security Policy e CORS restritos por ambiente.

### 6.3 Docker

- `docker-compose.yml` para frontend, backend Strapi e banco de dados.
- Volumes para persistencia local do banco e uploads.
- `.env.example` para frontend e backend sem secrets reais.
- Comandos documentados para subir, migrar/popular dados, rodar testes e resetar ambiente local.

## 7. Modelo de Conteudo no Strapi

### 7.1 Single Types

`Global Settings`
- nome do site
- logo principal
- logo alternativa, se necessario
- favicon
- dados de contato: email, telefone, endereco, redes sociais
- scripts permitidos por ambiente, se necessario
- configuracoes de SEO padrao

`Footer`
- logo
- tagline
- colunas de menu
- links institucionais
- dados de contato
- copyright por idioma
- link LGPD/privacidade

`Cookie/LGPD Banner`
- texto
- rotulo do botao aceitar
- link saiba mais
- versao da politica

### 7.2 Collection Types

`Page`
- title
- slug
- locale
- seo title
- seo description
- og image
- publishedAt
- blocks: dynamic zone

`NewsArticle`
- title
- slug
- summary
- body
- cover image
- published date
- author/source
- locale
- SEO fields

`CaseStudy`
- title
- slug
- summary
- cover image
- hero media
- sector/category
- challenge
- solution
- results
- body blocks
- related cases
- locale
- SEO fields

`Partner`
- name
- logo
- url
- sort order
- active

`ApplicationArea`
- title
- slug
- image
- hover/summary text
- body
- sort order
- locale

`ContactSubmission`
- name
- email
- company
- role
- phone
- message
- locale
- consent flags
- source page
- user agent/ip metadata, se legalmente aprovado
- status: new, contacted, archived

Nao devem ser criados content types de ecommerce, como Product, Cart, Order, Payment, Coupon, Customer Account ou Inventory.

### 7.3 Dynamic Zone Blocks para `Page`

- `HeroBlock`: titulo, subtitulo, CTA, imagem, video, poster, alinhamento.
- `PageHeroBlock`: titulo, subtitulo, background image/video.
- `TextBlock`: heading, rich text, largura, tema.
- `MediaTextBlock`: texto + imagem/video, ordem responsiva.
- `AccordionBlock`: lista de itens com titulo, texto, imagem opcional.
- `FeatureGridBlock`: cards com icone/imagem, titulo e descricao.
- `ApplicationAreasBlock`: referencia a `ApplicationArea`.
- `CasesBlock`: lista manual ou ultimos cases.
- `NewsCarouselBlock`: lista manual ou ultimas noticias.
- `PartnersBlock`: lista de parceiros ativos.
- `ContactCTA/FormBlock`: formulario e texto de apoio.
- `LGPDContentBlock`: secoes numeradas e sumario.
- `RawEmbedBlock`: somente para embeds permitidos, sanitizados e restritos por allowlist.

## 8. Requisitos Funcionais

### 8.1 Navegacao e Idiomas

- O usuario pode alternar entre PT-BR, EN e ES mantendo a pagina equivalente quando existir.
- A rota padrao deve redirecionar ou resolver para `pt-BR`.
- Slugs devem ser localizados quando necessario.
- Header e footer devem vir do CMS e respeitar idioma.
- Menu mobile deve ser acessivel, fechavel por clique em link e por tecla Escape.

### 8.2 Paginas

- Home deve exibir hero, secao de tecnologia, solucoes, areas de aplicacao, cases, noticias e CTA/formulario.
- Tecnologia deve apresentar a tecnologia/interrogador, key features e interface operacional.
- Solucoes deve apresentar conteudo tecnico com accordions e links para materiais, quando publicados.
- Quem Somos deve apresentar origem, validacao, parceiros e CTA.
- Cases deve listar cases e permitir paginas individuais.
- Noticias deve listar artigos com cards e pagina individual, mesmo que o layout aprovado tenha apenas listagem.
- Contato deve exibir formulario completo e informacoes editaveis.
- LGPD deve exibir politica com sumario e secoes editaveis.

### 8.3 Formulario de Contato

- Campos: nome, email, empresa, cargo, telefone, mensagem, idioma, origem.
- Validacao client-side e server-side com Zod, usando schemas compartilhados sempre que possivel.
- Sanitizacao de todos os campos textuais.
- Protecao contra spam: honeypot, rate limit por IP/origem e, se necessario, captcha configuravel.
- Envio para endpoint seguro no backend ou rota server-side do Next que persiste no Strapi e/ou dispara email/webhook.
- Mensagens de sucesso/erro localizadas.
- Nenhum secret deve ser exposto no cliente.

### 8.4 SEO

- Metadados por pagina e por idioma: title, description, canonical, alternate hreflang, Open Graph e Twitter cards.
- Campos SEO editoriais obrigatorios quando aplicavel: title, description, OG image, canonical, noindex/nofollow e alt text de imagens.
- Sitemap XML por idioma.
- Robots.txt configuravel.
- URLs canonicas consistentes.
- Dados estruturados quando aplicavel: Organization, WebSite, Article, BreadcrumbList.
- Imagens com alt text editorial no CMS.

### 8.5 LGPD e Cookies

- Banner de cookies com aceite persistido.
- Link para politica LGPD.
- Texto e versao editaveis no CMS.
- Scripts de analytics/marketing devem ser carregados somente conforme politica definida.

## 9. Requisitos Nao Funcionais

### 9.1 Performance e Core Web Vitals

- LCP menor que 2,5s em paginas principais em conexao 4G simulada.
- CLS menor que 0,1.
- INP dentro da faixa "good" do Google.
- Imagens dimensionadas, comprimidas e servidas em formatos modernos quando possivel.
- Imagens editoriais devem ter dimensoes conhecidas para evitar CLS e devem ser convertidas/servidas em WebP/AVIF quando possivel.
- Videos com poster, compressao e sem bloquear renderizacao inicial.
- Videos acima da primeira dobra devem ser carregados sob demanda, com `preload` controlado e fallback visual.
- CSS e JS divididos por rota/componente.
- Lazy loading para secoes pesadas, carrossel, embeds e videos fora da primeira dobra.
- Evitar dependencias pesadas para interacoes simples.
- Lighthouse CI ou auditoria equivalente deve rodar em rotas criticas.
- Bundle budget deve falhar ou alertar no CI quando limites definidos forem excedidos.

### 9.2 Acessibilidade

- HTML semantico, landmarks e skip link.
- Foco visivel.
- Navegacao por teclado para menu, idioma, accordions, carousel e formulario.
- Contraste adequado nos temas escuros e claros.
- Labels associados a campos.
- Estados ARIA corretos para menus, accordions e mensagens.

### 9.3 Segurança

- Validacao de schema para respostas do CMS e entradas do formulario.
- Sanitizacao de rich text e embeds vindos do CMS.
- Revalidacao on-demand protegida por secret e validacao de origem/payload.
- CORS restrito aos dominios esperados.
- Rate limiting em endpoints de formulario.
- Formulario com honeypot, rate limit e tempo minimo de preenchimento para reduzir spam automatizado.
- Headers de seguranca: CSP, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy, X-Content-Type-Options e HSTS em producao.
- CSP com allowlist estrita para imagens, videos, API Strapi, analytics e assets permitidos.
- Secrets somente via variaveis de ambiente.
- CI deve incluir mecanismo de deteccao de secrets acidentais antes de merge.
- Strapi admin protegido por credenciais fortes, roles minimas e, quando possivel, dominio/subdominio separado do site publico.
- Uploads com validacao de tipo, tamanho maximo, MIME allowlist, bloqueio de SVG nao confiavel e nomes seguros.

### 9.4 Observabilidade

- Logs estruturados para submissao de formulario e erros de CMS.
- Tratamento amigavel para fallback quando Strapi estiver indisponivel.
- Paginas 404 e 500 localizadas.
- Monitoramento de erros frontend/backend com Sentry ou ferramenta equivalente.
- Healthchecks para frontend, Strapi e banco nos containers e no ambiente de hospedagem.
- Logs de webhooks de revalidacao, falhas de publicacao e erros de integracao com Strapi.

## 10. Plano de Testes

### 10.1 Testes Locais Automatizados

- Unitarios frontend: componentes puros, formatadores, cliente CMS e helpers de i18n.
- Unitarios frontend tambem devem cobrir slices/selectors Redux Toolkit, schemas Zod e wrappers de componentes Radix customizados.
- Unitarios backend: sanitizacao, validacao, services de formulario e permissoes customizadas.
- Integracao: consumo de Strapi, renderizacao de paginas com fixtures, envio de formulario, geracao de sitemap.
- E2E com Playwright: navegacao publica, troca de idioma, menu mobile, accordions, carousel, formulario, LGPD e paginas 404.
- Acessibilidade automatizada com axe ou equivalente nas rotas principais.
- Performance/Lighthouse CI em rotas criticas.
- Testes visuais por screenshot para comparar implementacao com `layout-aprovado` em desktop e mobile.
- Testes para preview mode, revalidacao por webhook, sitemap/hreflang e headers de seguranca.

### 10.2 TestSprite

TestSprite deve ser incluido como camada adicional de testes automatizados de UI/API:

- Usar TestSprite MCP para gerar, executar e refinar uma suite inicial quando o site estiver navegavel localmente ou em preview.
- Versionar a pasta `testsprite_tests/` gerada, quando aplicavel, para que os testes sejam auditaveis e reutilizaveis.
- Cobrir no TestSprite os fluxos: home, tecnologia, solucoes, quem somos, cases, noticias, contato, LGPD, troca PT-BR/EN/ES, formulario com sucesso/erro, menu mobile e links de rodape.
- Configurar integracao com GitHub App ou GitHub Actions apos existir deploy preview em PR.
- Armazenar `TESTSPRITE_API_KEY` como secret do repositorio, caso use GitHub Actions.
- PRs nao devem ser aprovados para merge quando testes essenciais do TestSprite falharem, salvo excecao documentada.

Referencias consultadas em 2026-05-23:
- TestSprite MCP: https://docs.testsprite.com/mcp/getting-started/introduction
- TestSprite UI Testing: https://docs.testsprite.com/web-portal/core/ui-testing
- TestSprite GitHub Integration: https://docs.testsprite.com/mcp/integrations/github-integration

## 11. Criterios de Aceite

- O site roda localmente via Docker com frontend, Strapi e banco.
- O visual das paginas principais corresponde ao layout aprovado em desktop e mobile.
- Todas as paginas publicas tem versoes PT-BR, EN e ES ou fallback editorial claramente definido.
- Header, footer, paginas e blocos principais sao editaveis via Strapi.
- A equipe do cliente consegue criar/editar/publicar conteudo institucional no Strapi sem alterar codigo.
- A equipe do cliente consegue revisar drafts via preview antes de publicar.
- Nenhum fluxo, rota, modelo de dados ou dependencia de ecommerce foi incluido.
- Formulario valida, sanitiza, limita abuso e persiste/envia submissao sem expor secrets.
- SEO basico e avancado estao implementados por idioma.
- Sitemap, robots e hreflang funcionam.
- Revalidacao Strapi -> Next.js funciona com secret e atualiza paginas publicadas sem redeploy manual.
- Uploads e rich text estao protegidos por validacao, sanitizacao e limites editoriais.
- Headers de seguranca e CSP estao ativos em ambiente de producao.
- Lighthouse CI, bundle budget, testes visuais e testes de acessibilidade estao configurados para rotas criticas.
- Healthchecks e monitoramento de erros estao configurados para frontend/backend.
- Testes unitarios, integracao e e2e passam no CI.
- TestSprite esta previsto/configurado no fluxo de QA e possui casos gerados quando houver URL testavel.
- Lighthouse nao aponta regressao critica de performance, acessibilidade, SEO ou boas praticas nas rotas principais.
- Documentacao de setup local e deploy inicial esta atualizada.

## 12. Milestones Sugeridos

1. Fundacao do monorepo: Next.js, Strapi, Docker, envs, lint, teste base e CI.
2. Modelagem Strapi: content types, i18n, roles, seed inicial e uploads.
3. Sistema visual: tokens, layout global, header, footer, LGPD e componentes base.
4. Paginas institucionais CMS-driven: home, tecnologia, solucoes, quem somos, contato e LGPD.
5. Conteudo editorial: cases, noticias, paginas individuais e busca/listagem simples se necessario.
6. Preview editorial, cache/ISR, webhooks de revalidacao e otimizacao de midia.
7. Formularios, seguranca, SEO, sitemap, observabilidade e hardening.
8. QA final: Playwright, TestSprite, acessibilidade, Lighthouse CI, testes visuais, revisao responsiva e preparacao de producao.

## 13. Riscos e Mitigacoes

- Risco: divergencia visual entre HTML aprovado e componentes Next. Mitigacao: criar checklist visual por pagina e comparar screenshots desktop/mobile.
- Risco: CMS excessivamente generico dificultar edicao. Mitigacao: dynamic zones com blocos nomeados pelo layout real.
- Risco: conteudo em tres idiomas atrasar publicacao. Mitigacao: permitir draft por idioma e fallback controlado.
- Risco: videos pesados afetarem LCP. Mitigacao: poster otimizado, lazy loading e compressao.
- Risco: formulario virar vetor de spam. Mitigacao: rate limit, honeypot, validacao server-side e logs.
- Risco: TestSprite depender de URL publica/preview. Mitigacao: primeiro gerar testes com ambiente local/preview e integrar em PR quando o deploy preview existir.
- Risco: revalidacao publicar conteudo incorreto ou sofrer abuso. Mitigacao: webhook com secret, validacao de payload, logs e fallback para redeploy/manual revalidation.
- Risco: editores quebrarem layout com conteudo longo ou midia inadequada. Mitigacao: limites nos blocos Strapi, validacoes editoriais, preview e testes visuais.
