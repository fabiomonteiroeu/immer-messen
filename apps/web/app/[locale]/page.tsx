import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageBlocks } from "@/components/ui/page-blocks";
import { getInstitutionalPageByKey } from "@/lib/cms/pages";
import { jsonLdScript, organizationJsonLd } from "@/lib/seo/jsonld";
import { isSupportedLocale, supportedLocales, type SupportedLocale } from "@/lib/i18n/config";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

function homeAlternates() {
  const languages: Record<string, string> = {};
  for (const locale of supportedLocales) languages[locale] = `/${locale}`;
  languages["x-default"] = "/pt-BR";
  return languages;
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const page = await getInstitutionalPageByKey({
    locale: locale as SupportedLocale,
    pageKey: "home",
  });
  if (!page?.seo) return {};
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: `/${locale}`,
      languages: homeAlternates(),
    },
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const page = await getInstitutionalPageByKey({
    locale: locale as SupportedLocale,
    pageKey: "home",
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }}
        type="application/ld+json"
      />
      <PageBlocks blocks={page.blocks} locale={locale} />
    </>
  );
}
