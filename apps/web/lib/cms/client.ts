import { draftMode } from "next/headers";
import { z } from "zod";

import { publicEnv } from "@/lib/env/public-env";
import { serverEnv } from "@/lib/env/server-env";

type QueryValue = string | number | boolean | undefined | null;
type QueryInput = Record<string, QueryValue | QueryValue[]>;

function withQuery(path: string, query?: QueryInput) {
  const baseUrl =
    typeof window === "undefined" ? serverEnv.INTERNAL_STRAPI_URL : publicEnv.NEXT_PUBLIC_STRAPI_URL;
  const url = new URL(path, baseUrl);

  if (!query) {
    return url;
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          url.searchParams.append(key, String(item));
        }
      }
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url;
}

export async function fetchFromCms<TSchema extends z.ZodTypeAny>({
  path,
  query,
  schema,
  init,
}: {
  path: string;
  query?: QueryInput;
  schema: TSchema;
  init?: RequestInit;
}): Promise<z.infer<TSchema>> {
  const isDraft = await isDraftModeEnabled();
  const effectiveQuery = isDraft ? { ...query, publicationState: "preview" } : query;
  const effectiveInit: RequestInit = isDraft
    ? { ...init, cache: "no-store", next: undefined }
    : { ...init, next: init?.next };

  const response = await fetch(withQuery(path, effectiveQuery), {
    ...effectiveInit,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  return schema.parse(payload);
}

async function isDraftModeEnabled(): Promise<boolean> {
  if (typeof window !== "undefined") return false;
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}
