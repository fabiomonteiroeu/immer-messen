import "server-only";

import { fetchFromCms } from "@/lib/cms/client";
import {
  cmsFooterSchema,
  cmsSingleResponseSchema,
  type CmsFooter,
} from "@/lib/cms/schemas";
import type { SupportedLocale } from "@/lib/i18n/config";

const footerResponseSchema = cmsSingleResponseSchema(cmsFooterSchema);

export async function getFooter(locale: SupportedLocale): Promise<CmsFooter | null> {
  try {
    const response = await fetchFromCms({
      path: "/api/footer",
      query: {
        locale,
        "populate[logo]": true,
        "populate[menuColumns][populate]": "*",
        "populate[contactDetails]": true,
        "populate[privacyLink]": true,
      },
      schema: footerResponseSchema,
      init: {
        next: {
          revalidate: 60,
          tags: [`footer:${locale}`, "footer"],
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error(`[CMS ERROR] getFooter failed (locale: ${locale}):`, error);
    return null;
  }
}
