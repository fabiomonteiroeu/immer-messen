import type { MetadataRoute } from "next";

import { getMockCases } from "@/lib/cms/mock-cases";
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

export default function sitemap(): MetadataRoute.Sitemap {
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

    for (const entry of getMockCases(locale)) {
      entries.push({
        url: `${base}/${locale}/cases/${entry.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: alternates((l) => `${base}/${l}/cases/${entry.slug}`),
        },
      });
    }
  }

  return entries;
}
