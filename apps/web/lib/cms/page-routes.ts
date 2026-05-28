import type { SupportedLocale } from "@/lib/i18n/config";

const slugByLocaleAndPageKey = {
  "pt-BR": {
    home: "home",
    technology: "tecnologia",
    about: "quem-somos",
    lgpd: "lgpd",
  },
  en: {
    home: "home",
    technology: "technology",
    about: "about",
    lgpd: "lgpd",
  },
  es: {
    home: "inicio",
    technology: "tecnologia",
    about: "quienes-somos",
    lgpd: "lgpd",
  },
} as const;

export type InstitutionalPageKey = keyof (typeof slugByLocaleAndPageKey)["pt-BR"];

export function getInstitutionalSlug(locale: SupportedLocale, pageKey: InstitutionalPageKey) {
  return slugByLocaleAndPageKey[locale][pageKey];
}

export function getInstitutionalRouteSlugs(locale: SupportedLocale) {
  return Object.values(slugByLocaleAndPageKey[locale]);
}

export function getInstitutionalPageKeyFromSlug(locale: SupportedLocale, slug: string) {
  const entry = Object.entries(slugByLocaleAndPageKey[locale]).find(([, localizedSlug]) => {
    return localizedSlug === slug;
  });

  return entry?.[0] as InstitutionalPageKey | undefined;
}

export function localizePath(pathname: string, targetLocale: SupportedLocale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  const [currentLocaleSegment, slug, ...rest] = segments;
  const currentLocale = isSupportedLocaleValue(currentLocaleSegment)
    ? (currentLocaleSegment as SupportedLocale)
    : null;

  if (!slug) {
    return `/${targetLocale}`;
  }

  if (!currentLocale) {
    return `/${targetLocale}/${segments.slice(1).join("/")}`;
  }

  const pageKey = getInstitutionalPageKeyFromSlug(currentLocale, slug);
  const translatedSlug = pageKey ? getInstitutionalSlug(targetLocale, pageKey) : slug;
  const tail = rest.length > 0 ? `/${rest.join("/")}` : "";

  return `/${targetLocale}/${translatedSlug}${tail}`;
}

function isSupportedLocaleValue(value: string): boolean {
  return value === "pt-BR" || value === "en" || value === "es";
}
