import "server-only";

import { fetchFromCms } from "@/lib/cms/client";
import {
  cmsNewsSummarySchema,
  cmsCollectionResponseSchema,
  type CmsNewsArticle,
} from "@/lib/cms/schemas";
import type { SupportedLocale } from "@/lib/i18n/config";

const cmsNewsArticleCollectionSchema = cmsCollectionResponseSchema(cmsNewsSummarySchema);

type GetNewsArticlesArgs = {
  locale: SupportedLocale;
  limit?: number;
};

export async function getLatestNewsArticles({ locale, limit }: GetNewsArticlesArgs): Promise<CmsNewsArticle[]> {
  try {
    const response = await fetchFromCms({
      path: "/api/news-articles",
      query: {
        locale,
        sort: "publishedDate:desc",
        ...(limit ? { "pagination[pageSize]": limit } : {}),
        "populate[coverImage]": true,
        "populate[seo][populate]": "*",
      },
      schema: cmsNewsArticleCollectionSchema,
      init: {
        next: {
          revalidate: 300, // 5 minutes cache
          tags: ["news"],
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error(`[CMS ERROR] getLatestNewsArticles failed (locale: ${locale}):`, error);
    return [];
  }
}
