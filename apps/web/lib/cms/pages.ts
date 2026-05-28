import "server-only";

import { fetchFromCms } from "@/lib/cms/client";
import {
  getInstitutionalPageKeyFromSlug,
  getInstitutionalSlug,
  type InstitutionalPageKey,
} from "@/lib/cms/page-routes";
import {
  cmsCollectionResponseSchema,
  cmsPageSchema,
  type CmsPage,
} from "@/lib/cms/schemas";
import { mockCmsPagesByKey } from "@/lib/cms/mock";
import type { SupportedLocale } from "@/lib/i18n/config";

const cmsPageCollectionSchema = cmsCollectionResponseSchema(cmsPageSchema);

const pagePopulate = {
  "populate[seo][populate]": "*",
  "populate[blocks][on][page.hero-block][populate]": "*",
  "populate[blocks][on][page.page-hero-block][populate]": "*",
  "populate[blocks][on][page.media-text-block][populate][media]": true,
  "populate[blocks][on][page.media-text-block][populate][features][populate]": "*",
  "populate[blocks][on][page.text-block][populate]": "*",
  "populate[blocks][on][page.accordion-block][populate]": "*",
  "populate[blocks][on][page.feature-grid-block][populate][cards][populate]": "*",
  "populate[blocks][on][page.application-areas-block][populate][areas][populate]": "*",
  "populate[blocks][on][page.cases-block][populate][cases][populate]": "*",
  "populate[blocks][on][page.news-carousel-block][populate][articles][populate]": "*",
  "populate[blocks][on][page.partners-block][populate][partners][populate]": "*",
  "populate[blocks][on][page.contact-form-block][populate]": "*",
  "populate[blocks][on][page.lgpd-content-block][populate]": "*",
  "populate[blocks][on][page.about-content-block][populate][rows][populate]": "*",
  "populate[blocks][on][page.about-content-block][populate][highlight][populate]": "*",
};

export {
  getInstitutionalSlug,
  getInstitutionalRouteSlugs,
  localizePath,
  type InstitutionalPageKey,
} from "@/lib/cms/page-routes";

export async function getInstitutionalPageBySlug({
  locale,
  slug,
}: {
  locale: SupportedLocale;
  slug: string;
}): Promise<CmsPage | null> {
  const pageKey = getInstitutionalPageKeyFromSlug(locale, slug);

  if (!pageKey) {
    return null;
  }

  try {
    const response = await fetchFromCms({
      path: "/api/pages",
      query: {
        locale,
        "filters[pageKey][$eq]": pageKey,
        "pagination[pageSize]": 1,
        ...pagePopulate,
      },
      schema: cmsPageCollectionSchema,
      init: {
        next: {
          revalidate: 60,
          tags: [`page:${pageKey}:${locale}`, "pages"],
        },
      },
    });

    return response.data[0] ?? getMockPage(pageKey, locale);
  } catch (error) {
    console.error(`[CMS ERROR] getInstitutionalPageBySlug failed (pageKey: ${pageKey}, locale: ${locale}):`, error);
    return getMockPage(pageKey, locale);
  }
}

export async function getInstitutionalPageByKey({
  locale,
  pageKey,
}: {
  locale: SupportedLocale;
  pageKey: InstitutionalPageKey;
}) {
  return getInstitutionalPageBySlug({
    locale,
    slug: getInstitutionalSlug(locale, pageKey),
  });
}

function getMockPage(pageKey: InstitutionalPageKey, locale: SupportedLocale): CmsPage | null {
  const variants = mockCmsPagesByKey[pageKey];
  if (!variants) {
    return null;
  }
  const page = variants[locale] ?? variants["pt-BR"];
  if (!page) {
    return null;
  }

  return {
    ...page,
    locale,
    slug: getInstitutionalSlug(locale, pageKey),
  };
}
