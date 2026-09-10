import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { CaseSections } from "@/components/ui/case-sections";
import { ContactCard } from "@/components/ui/contact-card";
import {
  getCaseBySlug,
  getCaseSlugsByDocumentId,
  translateCaseSlug,
} from "@/lib/cms/cases";
import { getMockCases } from "@/lib/cms/mock-cases";
import { articleJsonLd, jsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";
import { isSupportedLocale, supportedLocales, type SupportedLocale } from "@/lib/i18n/config";
import { resolveMediaUrl } from "@/lib/cms/media";

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    getMockCases(locale).map((entry) => ({ locale, slug: entry.slug })),
  );
}

type CaseDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * D-14: todo o conteudo visivel da pagina vem da dynamic zone `sections`. O unico texto que
 * ainda mora no codigo e o do CTA de contato, que continua fixo no fim de toda pagina de case
 * e **fora** da zona (D-07), mais a mensagem de zona vazia visivel so em preview.
 *
 * Os rotulos de linha do card de detalhes sairam daqui (D-09): agora sao digitados pelo editor,
 * por locale, dentro do proprio bloco `case.info-card`.
 */
const labelsByLocale: Record<
  SupportedLocale,
  {
    heading: string;
    body: string;
    submit: string;
    emptyZone: string;
  }
> = {
  "pt-BR": {
    heading: "Fale com a nossa equipe",
    body: "<p>Se voce tem interesse em saber mais sobre as nossas solucoes, deixe o seu contato.</p>",
    submit: "enviar",
    emptyZone: "Este case ainda não tem blocos. Adicione blocos em Conteúdo → Sections no Strapi.",
  },
  en: {
    heading: "Talk to our team",
    body: "<p>If you would like to know more about our solutions, leave us your contact.</p>",
    submit: "send",
    emptyZone: "This case has no blocks yet. Add blocks under Content → Sections in Strapi.",
  },
  es: {
    heading: "Hable con nuestro equipo",
    body: "<p>Si desea saber mas sobre nuestras soluciones, dejenos su contacto.</p>",
    submit: "enviar",
    emptyZone: "Este caso aún no tiene bloques. Agregue bloques en Contenido → Sections en Strapi.",
  },
};

export async function generateMetadata({ params }: CaseDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) return {};
  const caseEntry = await getCaseBySlug({ locale: locale as SupportedLocale, slug });
  if (!caseEntry) return {};
  const canonical = `/${locale}/cases/${caseEntry.slug}`;
  // D-05: a imagem social vem de coverImage, o campo de metadado que permanece no content type.
  const ogImageUrl = resolveMediaUrl(caseEntry.coverImage?.url);
  // Cada idioma tem slug proprio; repetir o slug do locale atual apontava os hreflang
  // para URLs inexistentes.
  const slugByLocale = caseEntry.documentId
    ? await getCaseSlugsByDocumentId(caseEntry.documentId)
    : {};
  const languages: Record<string, string> = {};
  for (const l of supportedLocales) {
    const localizedSlug = slugByLocale[l];
    if (localizedSlug) languages[l] = `/${l}/cases/${localizedSlug}`;
  }
  const defaultSlug = slugByLocale["pt-BR"] ?? caseEntry.slug;
  languages["x-default"] = `/pt-BR/cases/${defaultSlug}`;
  return {
    title: `${caseEntry.title} | Immer Messen`,
    description: caseEntry.summary,
    alternates: { canonical, languages },
    openGraph: {
      title: caseEntry.title,
      description: caseEntry.summary,
      type: "article",
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
  };
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const resolvedLocale = locale as SupportedLocale;
  const caseEntry = await getCaseBySlug({ locale: resolvedLocale, slug });

  if (!caseEntry) {
    // O seletor de idioma do header troca so o segmento do locale e mantem o slug, que e
    // proprio de cada idioma. Em vez de 404, resolve para o slug equivalente — isso tambem
    // conserta links antigos e colados de outro idioma.
    const translated = await translateCaseSlug({ slug, targetLocale: resolvedLocale });
    if (translated) {
      redirect(`/${resolvedLocale}/cases/${translated}`);
    }
    notFound();
  }

  const labels = labelsByLocale[resolvedLocale];
  const sections = caseEntry.sections ?? [];
  const { isEnabled: isPreview } = await draftMode();

  const articleLd = articleJsonLd({
    headline: caseEntry.title,
    description: caseEntry.summary,
    image: resolveMediaUrl(caseEntry.coverImage?.url) ?? undefined,
    url: `${getSiteUrl()}/${resolvedLocale}/cases/${caseEntry.slug}`,
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }}
        type="application/ld+json"
      />

      <CaseSections sections={sections} />

      {/* A dica de painel so aparece em preview; no site publico a zona vazia nao emite nada. */}
      {sections.length === 0 && isPreview ? (
        <p className="container case-empty-note">{labels.emptyZone}</p>
      ) : null}

      <ContactCard
        bodyHtml={labels.body}
        formId="contact-title-case"
        heading={labels.heading}
        locale={resolvedLocale}
        submitLabel={labels.submit}
      />
    </>
  );
}
