import "server-only";

import { z } from "zod";

import { fetchFromCms } from "@/lib/cms/client";
import {
  cmsCaseSchema,
  cmsCollectionResponseSchema,
  type CmsCase,
} from "@/lib/cms/schemas";
import { getMockCaseBySlug, getMockCases } from "@/lib/cms/mock-cases";
import { supportedLocales, type SupportedLocale } from "@/lib/i18n/config";

const cmsCaseCollectionSchema = cmsCollectionResponseSchema(cmsCaseSchema);

/**
 * Populate explicito da dynamic zone `sections`, compartilhado pelas tres queries de case.
 *
 * Fonte unica de verdade: no Strapi, um componente sem linha de populate volta com os campos
 * aninhados vazios e **sem nenhum erro** — a pagina renderiza um bloco mudo. Triplicar essas
 * chaves nas queries foi o que produziu essa classe de falha antes; qualquer bloco novo da zona
 * entra aqui, uma vez so.
 *
 * `case.info-card` precisa das duas linhas: `"*"` traria `partnerLogos` sem o `logo` dentro.
 */
const caseSectionsPopulate = {
  "populate[sections][on][case.hero-section][populate][media]": true,
  "populate[sections][on][case.info-card][populate][rows]": true,
  "populate[sections][on][case.info-card][populate][partnerLogos][populate][logo]": true,
  "populate[sections][on][case.lead-section][populate]": "*",
  "populate[sections][on][case.text-section][populate]": "*",
  "populate[sections][on][case.section-title][populate]": "*",
  "populate[sections][on][case.highlight-section][populate]": "*",
  "populate[sections][on][case.figure-section][populate][image]": true,
  "populate[sections][on][case.two-column-section][populate]": "*",
} as const;

/* Componentes adicionados depois do CMS ir para producao. Se a Strapi ainda nao os
   conhece, o `populate ... on` deles derruba a requisicao inteira com 400 e a pagina
   cai no mock. Ficam separados para serem removidos no retry — mesmo mecanismo que
   `pages.ts` ganhou em a12dd61, que aqui faltava.

   `case.panel-section` ja existia; o que e novo e o `blocks` (case.panel-block) dentro
   dele. Sem a linha, o painel perde as figuras ate o cms subir, mas a pagina continua
   vindo do CMS em vez do mock. */
const optionalCasePopulate = {
  "populate[sections][on][case.panel-section][populate][blocks][populate][image]": true,
} as const;

/**
 * Roda a query de cases com os populates opcionais e, se a Strapi ainda nao conhecer
 * um componente novo (400 "Invalid key ... at sections.on"), repete sem eles. Assim um
 * CMS mais antigo que o frontend custa as figuras do painel, e nao a pagina inteira
 * caindo no mock.
 */
async function fetchCasesWithFallback(
  query: Record<string, string | number | boolean>,
  init?: RequestInit
) {
  const run = (extra: Record<string, string | number | boolean>) =>
    fetchFromCms({
      path: "/api/case-studies",
      query: { ...query, ...extra },
      schema: cmsCaseCollectionSchema,
      init,
    });

  try {
    return await run(optionalCasePopulate);
  } catch (error) {
    console.warn("[CMS] populate completo de case falhou, repetindo sem os componentes novos:", error);
    return run({});
  }
}

type GetCasesArgs = {
  locale: SupportedLocale;
  limit?: number;
};

export async function getCases({ locale, limit }: GetCasesArgs): Promise<CmsCase[]> {
  try {
    const response = await fetchCasesWithFallback(
      {
        locale,
        sort: "publishedAt:desc",
        ...(limit ? { "pagination[pageSize]": limit } : {}),
        "populate[coverImage]": true,
        ...caseSectionsPopulate,
      },
      { next: { revalidate: 300, tags: ["cases"] } }
    );

    if (response.data.length === 0) {
      return sliceLimit(getMockCases(locale), limit);
    }

    return sliceLimit(response.data, limit);
  } catch (error) {
    console.error(`[CMS ERROR] getCases failed (locale: ${locale}):`, error);
    return sliceLimit(getMockCases(locale), limit);
  }
}

function sliceLimit<T>(items: T[], limit?: number): T[] {
  if (!limit) return items;
  return items.slice(0, limit);
}

type CasesPage = {
  items: CmsCase[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export async function getCasesPage({
  locale,
  page = 1,
  perPage = 9,
}: {
  locale: SupportedLocale;
  page?: number;
  perPage?: number;
}): Promise<CasesPage> {
  try {
    const response = await fetchCasesWithFallback(
      {
        locale,
        sort: "publishedAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": perPage,
        "populate[coverImage]": true,
        ...caseSectionsPopulate,
      },
      { next: { revalidate: 300, tags: ["cases", `cases:page:${page}`] } }
    );
    const meta = response.meta?.pagination;
    if (response.data.length > 0 && meta) {
      return {
        items: response.data,
        page: meta.page,
        perPage: meta.pageSize,
        total: meta.total,
        totalPages: meta.pageCount,
      };
    }
    return paginateMock(locale, page, perPage);
  } catch (error) {
    console.error(`[CMS ERROR] getCasesPage failed (locale: ${locale}, page: ${page}):`, error);
    return paginateMock(locale, page, perPage);
  }
}

function paginateMock(locale: SupportedLocale, page: number, perPage: number): CasesPage {
  const all = getMockCases(locale);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: all.slice(start, start + perPage),
    page: safePage,
    perPage,
    total,
    totalPages,
  };
}

export async function getCaseBySlug({
  locale,
  slug,
}: {
  locale: SupportedLocale;
  slug: string;
}): Promise<CmsCase | null> {
  try {
    const response = await fetchCasesWithFallback(
      {
        locale,
        "filters[slug][$eq]": slug,
        "pagination[pageSize]": 1,
        "populate[coverImage]": true,
        ...caseSectionsPopulate,
      },
      { next: { revalidate: 300, tags: ["cases", `case:${slug}`] } }
    );
    // Resposta vazia do CMS significa "nao existe", e nao "CMS indisponivel": cair no
    // mock aqui criava paginas fantasma — slugs que so existem no mock respondiam 200
    // com conteudo de placeholder. O fallback fica so no catch, para o caso de o CMS
    // estar fora do ar.
    return response.data[0] ?? null;
  } catch (error) {
    console.error(`[CMS ERROR] getCaseBySlug failed (locale: ${locale}, slug: ${slug}):`, error);
    return getMockCaseBySlug(locale, slug);
  }
}

/**
 * Um case e um unico documento no Strapi (`documentId`) com **slug proprio por idioma**:
 * `monitoramento-de-baleias` em pt-BR e `monitoramento-acustico-de-cetaceos` em en/es.
 *
 * O seletor de idioma do header vive no layout, que nao conhece o slug da rota filha, entao
 * ele so troca o segmento do locale e mantem o slug — o que caia em 404 ao sair do pt-BR.
 * Estas duas funcoes deixam a **rota** resolver isso: ela redireciona para o slug correto e
 * emite os `hreflang` certos.
 */
const caseSlugCollectionSchema = cmsCollectionResponseSchema(
  z.object({
    documentId: z.string().min(1),
    slug: z.string().min(1),
  })
);

async function fetchCaseSlugs(query: Record<string, string | number | boolean>) {
  const response = await fetchFromCms({
    path: "/api/case-studies",
    query: { "fields[0]": "slug", "pagination[pageSize]": 1, ...query },
    schema: caseSlugCollectionSchema,
    init: { next: { revalidate: 300, tags: ["cases"] } },
  });
  return response.data;
}

/** Slug do case em cada idioma, para os `hreflang` da pagina. */
export async function getCaseSlugsByDocumentId(
  documentId: string
): Promise<Partial<Record<SupportedLocale, string>>> {
  const pairs = await Promise.all(
    supportedLocales.map(async (locale) => {
      try {
        const [entry] = await fetchCaseSlugs({
          locale,
          "filters[documentId][$eq]": documentId,
        });
        return [locale, entry?.slug] as const;
      } catch {
        return [locale, undefined] as const;
      }
    })
  );

  return Object.fromEntries(pairs.filter(([, slug]) => Boolean(slug))) as Partial<
    Record<SupportedLocale, string>
  >;
}

/**
 * Dado um slug que nao existe em `targetLocale`, procura a que documento ele pertence nos
 * demais idiomas e devolve o slug equivalente no idioma pedido. `null` quando o slug nao
 * existe em idioma nenhum — ai e 404 de verdade.
 */
export async function translateCaseSlug({
  slug,
  targetLocale,
}: {
  slug: string;
  targetLocale: SupportedLocale;
}): Promise<string | null> {
  for (const locale of supportedLocales) {
    if (locale === targetLocale) continue;
    try {
      const [entry] = await fetchCaseSlugs({ locale, "filters[slug][$eq]": slug });
      if (!entry) continue;
      const slugs = await getCaseSlugsByDocumentId(entry.documentId);
      return slugs[targetLocale] ?? null;
    } catch {
      // Idioma indisponivel no CMS: tenta o proximo.
    }
  }
  return null;
}
