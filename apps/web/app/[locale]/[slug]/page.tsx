import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageBlocks } from "@/components/ui/page-blocks";
import { getInstitutionalPageBySlug, getInstitutionalRouteSlugs } from "@/lib/cms/pages";
import {
  getInstitutionalPageKeyFromSlug,
  getInstitutionalSlug,
} from "@/lib/cms/page-routes";
import { isSupportedLocale, supportedLocales, type SupportedLocale } from "@/lib/i18n/config";

type InstitutionalPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: InstitutionalPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) return {};
  const page = await getInstitutionalPageBySlug({
    locale: locale as SupportedLocale,
    slug,
  });
  if (!page?.seo) return {};
  const pageKey = getInstitutionalPageKeyFromSlug(locale as SupportedLocale, slug);
  const languages: Record<string, string> = {};
  if (pageKey) {
    for (const l of supportedLocales) {
      languages[l] = `/${l}/${getInstitutionalSlug(l, pageKey)}`;
    }
    languages["x-default"] = `/pt-BR/${getInstitutionalSlug("pt-BR", pageKey)}`;
  }
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: `/${locale}/${slug}`,
      ...(pageKey ? { languages } : {}),
    },
  };
}

export default async function InstitutionalPage({ params }: InstitutionalPageProps) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale) || !new Set<string>(getInstitutionalRouteSlugs(locale)).has(slug)) {
    notFound();
  }

  const page = await getInstitutionalPageBySlug({
    locale: locale as SupportedLocale,
    slug,
  });

  if (!page) {
    notFound();
  }

  return <PageBlocks blocks={page.blocks} locale={locale} />;
}
