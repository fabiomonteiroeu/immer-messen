import { publicEnv } from "@/lib/env/public-env";

export function resolveMediaUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return url;
  if (url.startsWith("/uploads") || url.startsWith("/")) {
    const isAbsoluteFromStrapi = url.startsWith("/uploads");
    if (isAbsoluteFromStrapi) {
      return `${publicEnv.NEXT_PUBLIC_STRAPI_URL}${url}`;
    }
    return url;
  }
  return url;
}
