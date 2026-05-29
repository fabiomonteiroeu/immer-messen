import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCard } from "@/components/ui/contact-card";
import { getCaseBySlug } from "@/lib/cms/cases";
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

const labelsByLocale: Record<
  SupportedLocale,
  {
    heading: string;
    body: string;
    submit: string;
    detailsLabel: string;
    clientLabel: string;
    startLabel: string;
    durationLabel: string;
    tagsLabel: string;
  }
> = {
  "pt-BR": {
    heading: "Fale com a nossa equipe",
    body: "<p>Se voce tem interesse em saber mais sobre as nossas solucoes, deixe o seu contato.</p>",
    submit: "enviar",
    detailsLabel: "Detalhes do Projeto",
    clientLabel: "Cliente",
    startLabel: "Data de inicio",
    durationLabel: "Duracao",
    tagsLabel: "Tags",
  },
  en: {
    heading: "Talk to our team",
    body: "<p>If you would like to know more about our solutions, leave us your contact.</p>",
    submit: "send",
    detailsLabel: "Project details",
    clientLabel: "Client",
    startLabel: "Start date",
    durationLabel: "Duration",
    tagsLabel: "Tags",
  },
  es: {
    heading: "Hable con nuestro equipo",
    body: "<p>Si desea saber mas sobre nuestras soluciones, dejenos su contacto.</p>",
    submit: "enviar",
    detailsLabel: "Detalles del proyecto",
    clientLabel: "Cliente",
    startLabel: "Fecha de inicio",
    durationLabel: "Duracion",
    tagsLabel: "Tags",
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

  const labels = labelsByLocale[resolvedLocale];
  const logos = caseEntry.projectLogos.slice(0, 3);
  const tags = caseEntry.tags ?? [];
  const hasAnyDetail = Boolean(
    caseEntry.client || caseEntry.startDate || caseEntry.duration || tags.length > 0,
  );

  const articleLd = articleJsonLd({
    headline: caseEntry.title,
    description: caseEntry.summary,
    image: resolveMediaUrl(caseEntry.heroMedia?.url ?? caseEntry.coverImage?.url) ?? undefined,
    url: `${getSiteUrl()}/${resolvedLocale}/cases/${caseEntry.slug}`,
    datePublished: caseEntry.startDate ?? undefined,
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
          {hasAnyDetail ? (
            <aside className="case-details__card">
              <div className="case-details__card-head">{labels.detailsLabel}</div>
              <div className="case-details__card-body">
                {caseEntry.client ? (
                  <div className="case-details__row">
                    <b>{labels.clientLabel}:</b> {caseEntry.client}
                  </div>
                ) : null}
                {caseEntry.startDate ? (
                  <div className="case-details__row">
                    <b>{labels.startLabel}:</b> {formatDate(caseEntry.startDate, resolvedLocale)}
                  </div>
                ) : null}
                {caseEntry.duration ? (
                  <div className="case-details__row">
                    <b>{labels.durationLabel}:</b> {caseEntry.duration}
                  </div>
                ) : null}
                {tags.length > 0 ? (
                  <div className="case-details__row">
                    <b>{labels.tagsLabel}:</b> {tags.join(", ")}
                  </div>
                ) : null}
              </div>
            </aside>
          ) : null}
          <div>
            {logos.length > 0 ? (
              <div className="case-logos">
                {logos.map((slot) => {
                  const src = resolveMediaUrl(slot.logo.url) ?? undefined;
                  const alt = slot.alt ?? slot.logo.alternativeText ?? "";
                  const img = <img alt={alt} loading="lazy" src={src} />;
                  return (
                    <div className="case-logo-slot" key={slot.id ?? slot.logo.id}>
                      {slot.url ? (
                        <a href={slot.url} rel="noopener noreferrer" target="_blank">
                          {img}
                        </a>
                      ) : (
                        img
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}
            <h1 className="case-project__title">{caseEntry.title}</h1>
            <p className="case-project__sub">{caseEntry.summary}</p>
          </div>
        </div>
      </div>

      <div className="container case-content">
        {caseEntry.body ? (
          <div className="case-text" dangerouslySetInnerHTML={{ __html: caseEntry.body }} />
        ) : null}
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
