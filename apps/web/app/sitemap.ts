import type { MetadataRoute } from "next";

import { getCases } from "@/lib/cms/cases";
import {
  getInstitutionalRouteSlugs,
  getInstitutionalPageKeyFromSlug,
  getInstitutionalSlug,
} from "@/lib/cms/page-routes";
import { getSiteUrl } from "@/lib/seo/site-url";
import { supportedLocales, type SupportedLocale } from "@/lib/i18n/config";

const SUPPORTED: SupportedLocale[] = [...supportedLocales];

function alternates(make: (locale: SupportedLocale) => string) {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED) {
    languages[locale] = make(locale);
  }
  languages["x-default"] = make("pt-BR");
  return languages;
}

/* O sitemap e regenerado em runtime: no build o CMS pode estar inacessivel, e um
   sitemap montado a partir do mock anuncia ao Google paginas que nao existem. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED) {
    entries.push({
      url: `${base}/${locale}`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: alternates((l) => `${base}/${l}`) },
    });

    for (const slug of getInstitutionalRouteSlugs(locale)) {
      const pageKey = getInstitutionalPageKeyFromSlug(locale, slug);
      if (!pageKey || pageKey === "home") continue;
      entries.push({
        url: `${base}/${locale}/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: alternates((l) => `${base}/${l}/${getInstitutionalSlug(l, pageKey)}`),
        },
      });
    }

  }

  /* Cases vem do CMS, nao do mock. O slug e proprio de cada idioma, entao os
     alternates sao resolvidos pelo `documentId` — repetir o slug do locale atual
     nos tres, como antes, apontava para URLs inexistentes. */
  const slugsByDocument = new Map<string, Partial<Record<SupportedLocale, string>>>();
  for (const locale of SUPPORTED) {
    let cases;
    try {
      cases = await getCases({ locale });
    } catch {
      continue;
    }
    for (const entry of cases) {
      if (!entry.documentId) continue;
      const current = slugsByDocument.get(entry.documentId) ?? {};
      current[locale] = entry.slug;
      slugsByDocument.set(entry.documentId, current);
    }
  }

  for (const byLocale of slugsByDocument.values()) {
    const languages: Record<string, string> = {};
    for (const l of SUPPORTED) {
      const slug = byLocale[l];
      if (slug) languages[l] = `${base}/${l}/cases/${slug}`;
    }
    const fallback = byLocale["pt-BR"];
    if (fallback) languages["x-default"] = `${base}/pt-BR/cases/${fallback}`;

    for (const locale of SUPPORTED) {
      const slug = byLocale[locale];
      if (!slug) continue;
      entries.push({
        url: `${base}/${locale}/cases/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
