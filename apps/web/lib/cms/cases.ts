import "server-only";

import { fetchFromCms } from "@/lib/cms/client";
import {
  cmsCaseSchema,
  cmsCollectionResponseSchema,
  type CmsCase,
} from "@/lib/cms/schemas";
import { getMockCaseBySlug, getMockCases } from "@/lib/cms/mock-cases";
import type { SupportedLocale } from "@/lib/i18n/config";

const cmsCaseCollectionSchema = cmsCollectionResponseSchema(cmsCaseSchema);

type GetCasesArgs = {
  locale: SupportedLocale;
  limit?: number;
};

export async function getCases({ locale, limit }: GetCasesArgs): Promise<CmsCase[]> {
  try {
    const response = await fetchFromCms({
      path: "/api/case-studies",
      query: {
        locale,
        sort: "publishedAt:desc",
        ...(limit ? { "pagination[pageSize]": limit } : {}),
        "populate[coverImage]": true,
        "populate[heroMedia]": true,
        "populate[projectLogos][populate][logo]": true,
      },
      schema: cmsCaseCollectionSchema,
      init: {
        next: { revalidate: 300, tags: ["cases"] },
      },
    });

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
    const response = await fetchFromCms({
      path: "/api/case-studies",
      query: {
        locale,
        sort: "publishedAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": perPage,
        "populate[coverImage]": true,
        "populate[heroMedia]": true,
        "populate[projectLogos][populate][logo]": true,
      },
      schema: cmsCaseCollectionSchema,
      init: { next: { revalidate: 300, tags: ["cases", `cases:page:${page}`] } },
    });
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
    const response = await fetchFromCms({
      path: "/api/case-studies",
      query: {
        locale,
        "filters[slug][$eq]": slug,
        "pagination[pageSize]": 1,
        "populate[coverImage]": true,
        "populate[heroMedia]": true,
        "populate[projectLogos][populate][logo]": true,
      },
      schema: cmsCaseCollectionSchema,
      init: { next: { revalidate: 300, tags: ["cases", `case:${slug}`] } },
    });
    return response.data[0] ?? getMockCaseBySlug(locale, slug);
  } catch (error) {
    console.error(`[CMS ERROR] getCaseBySlug failed (locale: ${locale}, slug: ${slug}):`, error);
    return getMockCaseBySlug(locale, slug);
  }
}
