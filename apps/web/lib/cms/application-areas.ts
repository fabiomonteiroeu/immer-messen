import "server-only";

import { z } from "zod";

import { fetchFromCms } from "@/lib/cms/client";
import { cmsApplicationAreaItemSchema, cmsCollectionResponseSchema } from "@/lib/cms/schemas";
import type { SupportedLocale } from "@/lib/i18n/config";

const applicationAreasCollectionSchema = cmsCollectionResponseSchema(
  cmsApplicationAreaItemSchema.extend({
    id: z.number().int().optional(),
    documentId: z.string().optional(),
    sortOrder: z.number().int().nullable().optional(),
  }),
);

export type ApplicationAreaEntry = z.infer<typeof cmsApplicationAreaItemSchema>;

export async function getApplicationAreas(locale: SupportedLocale): Promise<ApplicationAreaEntry[]> {
  try {
    const response = await fetchFromCms({
      path: "/api/application-areas",
      query: {
        locale,
        sort: "sortOrder:asc",
        "pagination[pageSize]": 50,
        "populate[image]": true,
      },
      schema: applicationAreasCollectionSchema,
      init: {
        next: {
          revalidate: 300,
          tags: ["application-areas"],
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error(`[CMS ERROR] getApplicationAreas failed (locale: ${locale}):`, error);
    return [];
  }
}
