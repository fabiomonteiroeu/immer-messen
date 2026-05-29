# Plano — Página de detalhe de Case editável pelo CMS

Layout-alvo: `resources/case-details-100.jpg`

## Objetivo

Deixar a página `apps/web/app/[locale]/cases/[slug]/page.tsx` 100% editável pelo painel Strapi:

1. Card **"Detalhes do Projeto"** com 4 itens (Cliente, Data de início, Duração, Tags).
2. Até **3 logos de parceiros** do projeto (componente repetível com logo + URL opcional + alt).
3. **Summary** renderizado abaixo do título (campo já existe no CMS — só trocar o uso de `projectSubtitle` por `summary`).
4. **Um único campo de conteúdo** do projeto (richtext com imagens inline), removendo `challenge`/`solution`/`results`/`projectTitle`/`projectSubtitle`.

---

## Mudanças no CMS (Strapi)

### 1. Novo componente `case.project-logo`

Arquivo novo: `apps/cms/src/components/case/project-logo.json`

```json
{
  "collectionName": "components_case_project_logos",
  "info": { "displayName": "Project Logo", "icon": "image" },
  "options": {},
  "attributes": {
    "logo": { "type": "media", "multiple": false, "required": true, "allowedTypes": ["images"] },
    "url":  { "type": "string" },
    "alt":  { "type": "string" }
  }
}
```

> Não localizado — logo de cliente é o mesmo em todos os idiomas. `alt` é opcional; quando vazio o frontend usa `media.alternativeText`.

### 2. Schema do `case-study` — `apps/cms/src/api/case-study/content-types/case-study/schema.json`

**Adicionar** (todos não-localizados; tags localizado):

```json
"client":     { "type": "string", "maxLength": 120 },
"startDate":  { "type": "date" },
"duration":   { "type": "string", "maxLength": 60,
                "pluginOptions": { "i18n": { "localized": true } } },
"tags":       { "type": "json",
                "pluginOptions": { "i18n": { "localized": true } } },
"projectLogos": {
  "type": "component",
  "repeatable": true,
  "component": "case.project-logo",
  "max": 3
}
```

**Remover** (consolidar em um único campo de conteúdo):

- `challenge`
- `solution`
- `results`
- (manter `body` como o único campo de conteúdo — richtext já existente)

> ⚠️ Em produção o Strapi não dropa colunas automaticamente. Os dados de `challenge/solution/results` ficam no Postgres mas deixam de aparecer na API. Se quiser apagar de verdade: rodar `ALTER TABLE case_studies DROP COLUMN ...` manualmente depois de validar que nenhum case real depende deles (hoje só os mocks usam).

### 3. Webhook de revalidação

`apps/cms/src/index.ts` — `api::case-study.case-study` já está em `REVALIDATE_MODEL_MAP`. Nenhuma mudança necessária.

---

## Mudanças no Web (Next.js)

### 4. Zod schema — `apps/web/lib/cms/schemas.ts`

```ts
// novo
export const cmsProjectLogoSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  logo: cmsMediaSchema,
  url: z.string().nullable().optional(),
  alt: z.string().nullable().optional(),
});

// cmsCaseDetailsSchema — manter; já bate com o shape novo (client/startDate/duration/tags)

// cmsCaseSchema — ajustar:
//   - REMOVER: projectTitle, projectSubtitle, challenge, solution, results
//   - MANTER: body
//   - ADICIONAR: projectLogos: z.array(cmsProjectLogoSchema).default([])
//   - MANTER (mas agora vem direto do schema, não de details aninhado):
//       client, startDate, duration, tags — OU continuar achatando em `details`
```

> **Decisão sub-aberta**: o Strapi retorna `client/startDate/duration/tags` na raiz; o zod hoje espera um objeto `details`. Duas opções:
> - **(a)** Achatar no zod (mais fiel ao payload do Strapi) e ajustar o uso na page.
> - **(b)** Manter o objeto `details` no zod e popular via `.transform()` que agrupa os 4 campos.
>
> Recomendo **(a)** — menos magia, alinha com como `news-article` é mapeado.

### 5. Query — `apps/web/lib/cms/cases.ts`

Adicionar populate dos novos campos em `getCases`, `getCasesPage`, `getCaseBySlug`:

```ts
"populate[projectLogos][populate][logo]": true,
```

`client/startDate/duration/tags` são campos primitivos — não precisam de populate.

### 6. Página — `apps/web/app/[locale]/cases/[slug]/page.tsx`

- Título: usar `caseEntry.title` direto (remover fallback `projectTitle ?? title`).
- Subtítulo abaixo do título: trocar `projectSubtitle` por **`caseEntry.summary`**.
- Card "Detalhes do Projeto": já existe e renderiza condicionalmente — só ajustar o caminho dos campos (`caseEntry.client` em vez de `caseEntry.details?.client` etc., se for pela opção (a) acima).
- Logos:

```tsx
{caseEntry.projectLogos.length > 0 && (
  <div className="case-logos">
    {caseEntry.projectLogos.slice(0, 3).map((slot) => {
      const img = (
        <img
          src={resolveMediaUrl(slot.logo.url) ?? undefined}
          alt={slot.alt ?? slot.logo.alternativeText ?? ""}
          loading="lazy"
        />
      );
      return (
        <div className="case-logo-slot" key={slot.id ?? slot.logo.id}>
          {slot.url ? <a href={slot.url} target="_blank" rel="noopener">{img}</a> : img}
        </div>
      );
    })}
  </div>
)}
```

> Remover os 3 slots hardcoded (`logo 1 / logo 2 / logo 3`). Se `projectLogos` vier vazio, **a faixa some** (sem placeholders). Decidido.

- Conteúdo: renderizar **só** `caseEntry.body` (remover os blocos de `challenge`/`solution`/`results` e o `coverImage` injetado abaixo do body — coverImage volta a ser usado só na listagem; o hero da página já vem de `heroMedia`).

### 7. Mocks — `apps/web/lib/cms/mock-cases.ts`

Atualizar o shape: substituir `projectTitle/projectSubtitle` por usar `title/summary` direto; trocar `details: {...}` por campos achatados; adicionar `projectLogos: []` (ou um exemplo com 2-3 logos de Unsplash pra validar o layout sem CMS rodando). Remover os 4 campos de conteúdo separados e consolidar num único `body` longo com `<img>` inline.

---

## CSS

`apps/web/app/globals.css` (linhas ~2655-2772, classes `.case-details`, `.case-logos`, `.case-project__title`, `.case-text`, `.case-hero-img`, `.case-gallery`): **nenhuma mudança necessária** — o markup novo continua usando as mesmas classes. As regras de `.case-text + .case-hero-img` viram letra-morta (não tem mais hero-img separado do body), mas não atrapalham.

---

## Migração de dados em produção

Hoje em produção existem 6 cases (3 slugs × 2 idiomas reais) seedados via `apps/cms/scripts/seed-content.mjs`. Plano de migração:

1. **Antes do deploy**: editar `seed-content.mjs` para popular:
   - `client`, `startDate`, `duration`, `tags` (extrair do que já tá no mock)
   - `projectLogos` (apontar pra mídias já no Strapi ou subir 2-3 PNGs)
   - `body` consolidado (concatenar challenge + solution + results no body se quiser preservar; ou riscar tudo e reescrever)
2. **Subir o schema novo** — Strapi 5 em produção reinicia, cria as colunas novas (todas opcionais), não dropa as antigas.
3. **Rodar seed em modo idempotente** (`pnpm seed:prod`) para preencher os campos novos nos cases existentes.
4. **Verificar** em `https://immer.fabiomonteiro.cloud/pt-BR/cases/<slug>` — webhook de revalidação dispara automaticamente após publicação.
5. **(Opcional, depois)** dropar colunas `challenge/solution/results` via SQL direto no Postgres EasyPanel.

---

## Ordem de execução sugerida

1. CMS: criar componente `project-logo.json`.
2. CMS: editar `case-study/schema.json` (add 5 campos novos, remove 3).
3. Web: ajustar `schemas.ts` (zod) — adicionar `projectLogos`, achatar `client/startDate/duration/tags`, remover campos descontinuados.
4. Web: ajustar `cases.ts` (populate).
5. Web: ajustar `page.tsx` (título/subtítulo/logos dinâmicos/body único).
6. Web: ajustar `mock-cases.ts` para o shape novo.
7. Build local + smoke test em `/pt-BR/cases/<slug>` com Strapi rodando (`docker compose up`).
8. Atualizar `seed-content.mjs` com os campos novos.
9. Commitar (1 commit por etapa, atomic).
10. Deploy CMS no EasyPanel → roda seed → deploy Web no EasyPanel.

---

## Riscos / pontos de atenção

- **Conteúdo richtext único**: o layout aprovado mostra texto + galeria 3-up + hero image + texto + galeria alternados. Com richtext só, a composição vira responsabilidade do editor inserindo imagens inline — controle de grid de galeria fica limitado. **Decidido**: seguir com richtext único agora; se ficar visualmente abaixo do aceitável, abrir fase futura migrando `body` pra dynamic-zone `sections` (zod já tem `case.text-section`/`case.gallery-section`/`case.hero-image-section`).
- **Dados antigos em `challenge/solution/results`**: ficam no banco como colunas órfãs até serem dropadas manualmente. Não afeta a aplicação.
- **i18n de `tags`**: deixei localizado porque "DAS" pode ser "Distributed Acoustic Sensing" em outro idioma e o cliente pode querer traduzir. Se preferir o mesmo array em todos os idiomas, remover o `pluginOptions` do tags.
