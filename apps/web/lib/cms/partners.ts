import "server-only";

import { z } from "zod";

import { fetchFromCms } from "@/lib/cms/client";
import { cmsCollectionResponseSchema, cmsMediaSchema } from "@/lib/cms/schemas";

const partnerEntrySchema = z.object({
  id: z.number().int().nonnegative(),
  documentId: z.string().optional(),
  name: z.string().min(1),
  url: z.string().optional().nullable(),
  sortOrder: z.number().int().nullable().optional(),
  active: z.boolean().optional().nullable(),
  logo: cmsMediaSchema.optional().nullable(),
});

export type PartnerEntry = z.infer<typeof partnerEntrySchema>;

const partnersCollectionSchema = cmsCollectionResponseSchema(partnerEntrySchema);

export async function getPartners(): Promise<PartnerEntry[]> {
  try {
    const response = await fetchFromCms({
      path: "/api/partners",
      query: {
        sort: "sortOrder:asc",
        "pagination[pageSize]": 100,
        "populate[logo]": true,
        "filters[active][$eq]": true,
      },
      schema: partnersCollectionSchema,
      init: {
        next: {
          revalidate: 300,
          tags: ["partners"],
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error("[CMS ERROR] getPartners failed:", error);
    return [];
  }
}
