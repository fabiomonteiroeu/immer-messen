import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCard } from "@/components/ui/contact-card";
import { getCaseBySlug } from "@/lib/cms/cases";
import { getMockCases } from "@/lib/cms/mock-cases";
import type { CmsCaseSection } from "@/lib/cms/schemas";
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

const contactByLocale: Record<SupportedLocale, { heading: string; body: string; submit: string; detailsLabel: string }> = {
  "pt-BR": {
    heading: "Fale com a nossa equipe",
    body: "<p>Se voce tem interesse em saber mais sobre as nossas solucoes, deixe o seu contato.</p>",
    submit: "enviar",
    detailsLabel: "Detalhes do Projeto",
  },
  en: {
    heading: "Talk to our team",
    body: "<p>If you would like to know more about our solutions, leave us your contact.</p>",
    submit: "send",
    detailsLabel: "Project details",
  },
  es: {
    heading: "Hable con nuestro equipo",
    body: "<p>Si desea saber mas sobre nuestras soluciones, dejenos su contacto.</p>",
    submit: "enviar",
    detailsLabel: "Detalles del proyecto",
  },
};

export async function generateMetadata({ params }: CaseDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) return {};
  const caseEntry = await getCaseBySlug({ locale: locale as SupportedLocale, slug });
  if (!caseEntry) return {};
  const canonical = `/${locale}/cases/${caseEntry.slug}`;
  const ogImageUrl = resolveMediaUrl(caseEntry.heroMedia?.url ?? caseEntry.coverImage?.url);
  const languages: Record<string, string> = {};
  for (const l of supportedLocales) languages[l] = `/${l}/cases/${caseEntry.slug}`;
  languages["x-default"] = `/pt-BR/cases/${caseEntry.slug}`;
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
    notFound();
  }

  const labels = contactByLocale[resolvedLocale];
  const articleLd = articleJsonLd({
    headline: caseEntry.title,
    description: caseEntry.summary,
    image: resolveMediaUrl(caseEntry.heroMedia?.url ?? caseEntry.coverImage?.url) ?? undefined,
    url: `${getSiteUrl()}/${resolvedLocale}/cases/${caseEntry.slug}`,
    datePublished: caseEntry.details?.startDate,
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }}
        type="application/ld+json"
      />
      <section aria-label={caseEntry.title} className="hero hero--short">
        <div className="hero__media">
          {caseEntry.heroMedia ? (
            <img
              alt={caseEntry.heroMedia.alternativeText ?? ""}
              aria-hidden="true"
              src={resolveMediaUrl(caseEntry.heroMedia.url) ?? undefined}
            />
          ) : null}
        </div>
        <div className="hero__inner" />
      </section>

      <div className="container">
        <div className="case-details">
          <aside className="case-details__card">
            <div className="case-details__card-head">{labels.detailsLabel}</div>
            <div className="case-details__card-body">
              {caseEntry.details?.client ? (
                <div className="case-details__row">
                  <b>Cliente:</b> {caseEntry.details.client}
                </div>
              ) : null}
              {caseEntry.details?.startDate ? (
                <div className="case-details__row">
                  <b>Inicio:</b> {formatDate(caseEntry.details.startDate, resolvedLocale)}
                </div>
              ) : null}
              {caseEntry.details?.duration ? (
                <div className="case-details__row">
                  <b>Duracao:</b> {caseEntry.details.duration}
                </div>
              ) : null}
              {caseEntry.details?.tags && caseEntry.details.tags.length > 0 ? (
                <div className="case-details__row">
                  <b>Tags:</b> {caseEntry.details.tags.join(", ")}
                </div>
              ) : null}
            </div>
          </aside>
          <div>
            <div className="case-logos">
              <div className="case-logo-slot">logo 1</div>
              <div className="case-logo-slot">logo 2</div>
              <div className="case-logo-slot">logo 3</div>
            </div>
            <h1 className="case-project__title">{caseEntry.projectTitle ?? caseEntry.title}</h1>
            {caseEntry.projectSubtitle ? (
              <p className="case-project__sub">{caseEntry.projectSubtitle}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container">
        {caseEntry.sections.map((section, index) => (
          <CaseSection key={`${section.__component}-${index}`} section={section} />
        ))}
      </div>

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

function CaseSection({ section }: { section: CmsCaseSection }) {
  switch (section.__component) {
    case "case.text-section":
      return <p className="case-text" dangerouslySetInnerHTML={{ __html: section.html }} />;
    case "case.gallery-section":
      return (
        <div className="case-gallery">
          {section.images.map((image) => (
            <img
              alt={image.alternativeText ?? ""}
              key={image.id}
              loading="lazy"
              src={resolveMediaUrl(image.url) ?? undefined}
            />
          ))}
        </div>
      );
    case "case.hero-image-section":
      return (
        <img
          alt={section.image.alternativeText ?? ""}
          className="case-hero-img"
          loading="lazy"
          src={resolveMediaUrl(section.image.url) ?? undefined}
        />
      );
  }
}

function formatDate(iso: string, locale: SupportedLocale): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
