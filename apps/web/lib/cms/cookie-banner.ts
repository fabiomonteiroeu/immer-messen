import "server-only";

import { fetchFromCms } from "@/lib/cms/client";
import {
  cmsCookieBannerSchema,
  cmsSingleResponseSchema,
  type CmsCookieBanner,
} from "@/lib/cms/schemas";
import type { SupportedLocale } from "@/lib/i18n/config";

const cookieBannerResponseSchema = cmsSingleResponseSchema(cmsCookieBannerSchema);

export async function getCookieBanner(locale: SupportedLocale): Promise<CmsCookieBanner | null> {
  try {
    const response = await fetchFromCms({
      path: "/api/cookie-banner",
      query: {
        locale,
        "populate[learnMoreLink]": true,
      },
      schema: cookieBannerResponseSchema,
      init: {
        next: {
          revalidate: 60,
          tags: [`cookie-banner:${locale}`, "cookie-banner"],
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error(`[CMS ERROR] getCookieBanner failed (locale: ${locale}):`, error);
    return null;
  }
}
