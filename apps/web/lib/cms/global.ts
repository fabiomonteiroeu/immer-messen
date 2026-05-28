import "server-only";

import { fetchFromCms } from "@/lib/cms/client";
import {
  cmsGlobalSettingSchema,
  cmsSingleResponseSchema,
  type CmsGlobalSetting,
} from "@/lib/cms/schemas";
import type { SupportedLocale } from "@/lib/i18n/config";

const globalSettingResponseSchema = cmsSingleResponseSchema(cmsGlobalSettingSchema);

export async function getGlobalSetting(locale: SupportedLocale): Promise<CmsGlobalSetting | null> {
  try {
    const response = await fetchFromCms({
      path: "/api/global-setting",
      query: {
        locale,
        "populate[primaryLogo]": true,
        "populate[alternativeLogo]": true,
        "populate[favicon]": true,
        "populate[seo][populate]": "*",
        "populate[contactDetails]": true,
        "populate[socialLinks]": true,
      },
      schema: globalSettingResponseSchema,
      init: {
        next: {
          revalidate: 60,
          tags: [`global-setting:${locale}`, "global-setting"],
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error(`[CMS ERROR] getGlobalSetting failed (locale: ${locale}):`, error);
    return null;
  }
}
