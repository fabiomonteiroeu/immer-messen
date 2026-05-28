import Link from "next/link";

import type { CmsPageBlock, FeatureIconKey } from "@/lib/cms/schemas";
import { ApprovedAccordion } from "@/components/primitives/accordion";
import { AppliedCardMedia } from "@/components/primitives/applied-card";
import { HeroVideoPoster } from "@/components/primitives/hero-video-poster";
import { NewsBlock } from "@/components/ui/news-block";
import { ContactCard } from "@/components/ui/contact-card";
import { getCases } from "@/lib/cms/cases";
import { getApplicationAreas } from "@/lib/cms/application-areas";
import { getLatestNewsArticles } from "@/lib/cms/news";
import { getPartners } from "@/lib/cms/partners";
import { isSupportedLocale, type SupportedLocale } from "@/lib/i18n/config";
import { resolveMediaUrl } from "@/lib/cms/media";

function RichText({ as: Tag = "div", html, className }: { as?: "div" | "p"; html: string; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function ChevronRight() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
      viewBox="0 0 24 24"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      viewBox="0 0 24 24"
      width={14}
      height={14}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function HeroSection({ block }: { block: Extract<CmsPageBlock, { __component: "page.hero-block" }> }) {
  return (
    <section aria-label={block.title} className="hero">
      <div className="hero__media hero__media--video">
        {block.posterImage ? (
          <HeroVideoPoster alt="" posterUrl={resolveMediaUrl(block.posterImage.url) ?? ""} priority />
        ) : null}
        {block.backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={resolveMediaUrl(block.posterImage?.url) ?? undefined}
            preload="metadata"
          >
            <source src={resolveMediaUrl(block.backgroundVideo.url) ?? undefined} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="hero__inner">
        <h1 className="hero__title">{block.title}</h1>
        {block.subtitle ? <p className="hero__subtitle">{block.subtitle}</p> : null}
        {block.ctaLabel && block.ctaHref ? (
          <Link className="btn btn-light" href={block.ctaHref} style={{ marginTop: "1.5rem" }}>
            {block.ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function PageHeroSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.page-hero-block" }>;
}) {
  if (block.backgroundVideo) {
    return (
      <section aria-label={block.title} className="hero hero--bare">
        <div className="hero__media hero__media--video">
          {block.posterImage ? (
            <img
              alt=""
              aria-hidden="true"
              className="hero__media-poster"
              src={resolveMediaUrl(block.posterImage.url) ?? undefined}
            />
          ) : null}
          <video autoPlay loop muted playsInline poster={resolveMediaUrl(block.posterImage?.url) ?? undefined} preload="metadata">
            <source src={resolveMediaUrl(block.backgroundVideo.url) ?? undefined} />
          </video>
        </div>
        <h1 className="sr-only">{block.title}</h1>
        {block.subtitle ? <p className="sr-only">{block.subtitle}</p> : null}
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="page-hero__media">
        {block.posterImage ? (
          <img alt="" aria-hidden="true" src={resolveMediaUrl(block.posterImage.url) ?? undefined} />
        ) : null}
      </div>
      <div className="page-hero__inner">
        <h1 className="page-hero__title">{block.title}</h1>
        {block.subtitle ? <p className="hero__subtitle">{block.subtitle}</p> : null}
      </div>
    </section>
  );
}

function HomeTechSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.media-text-block" }>;
}) {
  const eyebrow = block.eyebrow ?? "TECNOLOGIA";
  return (
    <section className="home-tech">
      <div className="container">
        <span className="home-tech__eyebrow">{eyebrow}</span>
        <h2 className="home-tech__lead">{block.heading}</h2>
        <div className="home-tech__grid">
          <div className="home-tech__media">
            {block.media ? (
              <img alt={block.media.alternativeText ?? ""} src={resolveMediaUrl(block.media.url) ?? undefined} />
            ) : null}
            {block.ctaLabel && block.ctaHref ? (
              <Link className="home-tech__cta" href={block.ctaHref}>
                {block.ctaLabel}
                <span aria-hidden="true" className="ico">
                  <ChevronRight />
                </span>
              </Link>
            ) : null}
          </div>
          <div className="home-tech__col-right">
            {block.body ? <RichText className="home-tech__copy" html={block.body} /> : null}
            {block.features && block.features.length > 0 ? (
              <div className="home-tech__features">
                {block.features.map((feature) => (
                  <div className="home-tech__feature" key={feature.title}>
                    <span className="ico">
                      <FeatureIcon iconKey={feature.iconKey || undefined} fallback={resolveMediaUrl(feature.icon?.url) ?? undefined} />
                    </span>
                    <p>{feature.title}{feature.description ? ` ${feature.description}` : null}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURE_ICONS: Record<FeatureIconKey, React.ReactNode> = {
  sensors: (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M12 4v2M12 18v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M4 12h2M18 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  range: (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M3 17l4-8 4 6 3-4 7 9" />
      <circle cx="7" cy="9" r="1.4" fill="currentColor" />
    </svg>
  ),
  spacing: (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M4 12h16" />
      <circle cx="4" cy="12" r="1.4" fill="currentColor" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <circle cx="20" cy="12" r="1.4" fill="currentColor" />
    </svg>
  ),
  ai: (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />
    </svg>
  ),
  shield: (
    <svg fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9.5 12l2 2 3.5-4" strokeLinecap="round" />
    </svg>
  ),
  alarm: (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M7 17v-7a5 5 0 0 1 10 0v7" />
      <path d="M9 17h6M11 20h2" />
    </svg>
  ),
};

function FeatureIcon({ iconKey, fallback }: { iconKey?: FeatureIconKey; fallback?: string }) {
  if (iconKey && FEATURE_ICONS[iconKey]) return <>{FEATURE_ICONS[iconKey]}</>;
  if (fallback) return <img alt="" src={fallback} />;
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TechBandSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.media-text-block" }>;
}) {
  return (
    <div className="tech-band">
      <div className="tech-band__inner">
        <div className="tech-band__copy">
          <h2>{block.heading}</h2>
          {block.ctaLabel && block.ctaHref ? (
            <Link className="tech-band__btn" href={block.ctaHref}>
              {block.ctaLabel}
              <ChevronDown />
            </Link>
          ) : null}
        </div>
        {block.media ? (
          <div className="tech-band__img">
            <img alt={block.media.alternativeText ?? ""} loading="lazy" src={resolveMediaUrl(block.media.url) ?? undefined} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function InterfaceSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.media-text-block" }>;
}) {
  return (
    <section className="interface-block">
      <div className="container">
        <div className="interface-grid">
          {block.media ? (
            <div className="interface-img">
              <img alt={block.media.alternativeText ?? ""} loading="lazy" src={resolveMediaUrl(block.media.url) ?? undefined} />
            </div>
          ) : null}
          <div className="interface-col">
            <h3 className="interface-col__title">{block.heading}</h3>
            <aside className="interface-card">
              <RichText html={block.body} />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaTextSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.media-text-block" }>;
}) {
  const variant = block.variant ?? (block.body.trim().startsWith("<ul") ? "interface" : "home-tech");
  if (variant === "tech-band") return <TechBandSection block={block} />;
  if (variant === "interface") return <InterfaceSection block={block} />;
  return <HomeTechSection block={block} />;
}

function TextSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.text-block" }>;
}) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">{block.heading}</h2>
        <div className="section__lead">
          <RichText html={block.body} />
        </div>
      </div>
    </section>
  );
}

function FeatureGridSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.feature-grid-block" }>;
}) {
  return (
    <section className="key-features">
      <div className="container">
        {block.heading ? <h2 className="key-features__title">{block.heading}</h2> : null}
        <div className="key-features-grid">
          {block.cards.map((card) => (
            <article className="kf" key={card.title}>
              {card.icon ? (
                <img
                  alt={card.icon.alternativeText ?? ""}
                  className="kf__icon kf__icon--img"
                  src={resolveMediaUrl(card.icon.url) ?? undefined}
                />
              ) : null}
              <p>
                <b>{card.title}</b>
                {card.description ? ` ${card.description}` : null}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.accordion-block" }>;
}) {
  return (
    <section className="solucoes-page solucoes-page--inline" id="solucoes">
      <div className="container">
        {block.heading ? <h2 className="section__title">{block.heading}</h2> : null}
        {block.body ? <RichText className="solucoes-page__intro" html={block.body} /> : null}
        <ApprovedAccordion
          items={block.items.map((item) => ({
            value: item.title,
            title: item.title,
            content: <RichText html={item.content} />,
          }))}
        />
      </div>
    </section>
  );
}

async function ApplicationAreasSection({
  block,
  locale,
}: {
  block: Extract<CmsPageBlock, { __component: "page.application-areas-block" }>;
  locale: SupportedLocale;
}) {
  const areas = block.areas.length > 0 ? block.areas : await getApplicationAreas(locale);
  if (areas.length === 0) return null;
  return (
    <section className="applied-block applied-block--light">
      <div className="container">
        <div className="applied-grid">
          {areas.map((area) => (
            <article className="applied-card" key={area.title}>
              <h3 className="applied-card__title">{area.title}</h3>
              <AppliedCardMedia
                alt={area.image?.alternativeText ?? ""}
                src={resolveMediaUrl(area.image?.url) ?? ""}
                summary={area.summary}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection({
  block,
  locale,
}: {
  block: Extract<CmsPageBlock, { __component: "page.contact-form-block" }>;
  locale?: SupportedLocale;
}) {
  return (
    <ContactCard
      bodyHtml={block.body}
      formId="contact-title"
      heading={block.heading}
      locale={locale}
      submitLabel={block.submitLabel ?? "Enviar"}
    />
  );
}

function LgpdContentSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.lgpd-content-block" }>;
}) {
  return (
    <section className="lgpd-page">
      <div className="container container-narrow">
        <p className="lgpd-page__sub">{block.summaryTitle}</p>
        <div className="lgpd-layout">
          <nav aria-label="Sumario" className="lgpd-toc">
            <ol>
              {block.sections.map((section) => (
                <li key={section.title}>
                  <a href={`#${slugify(section.title)}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="lgpd-content">
            {block.sections.map((section) => (
              <section id={slugify(section.title)} key={section.title}>
                <h2>{section.title}</h2>
                <RichText html={section.content} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

async function CasesBlockSection({
  block,
  locale,
}: {
  block: Extract<CmsPageBlock, { __component: "page.cases-block" }>;
  locale: SupportedLocale;
}) {
  const manual = block.displayMode === "manual" && block.cases.length > 0;
  const cases = manual
    ? block.cases
    : await getCases({ locale, limit: block.limit ?? 4 });

  if (cases.length === 0) return null;

  return (
    <section className="cases-block cases-block--v2" id="cases">
      <div className="container">
        {block.heading ? <h2 className="cases-block__title">{block.heading}</h2> : null}
        <div className="cases-rects">
          {cases.map((caseEntry) => (
            <Link
              aria-label={caseEntry.title}
              className="case-rect"
              href={`/${locale}/cases/${caseEntry.slug}`}
              key={caseEntry.slug}
            >
              {caseEntry.coverImage ? (
                <img
                  alt={caseEntry.coverImage.alternativeText ?? ""}
                  loading="lazy"
                  src={resolveMediaUrl(caseEntry.coverImage.url) ?? undefined}
                />
              ) : null}
              <span className="case-rect__title">{caseEntry.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

async function NewsCarouselSection({
  block,
  locale,
}: {
  block: Extract<CmsPageBlock, { __component: "page.news-carousel-block" }>;
  locale: SupportedLocale;
}) {
  const manual = block.displayMode === "manual" && block.articles.length > 0;
  const articles = manual
    ? block.articles
    : await getLatestNewsArticles({ locale, limit: 10 });

  return <NewsBlock heading={block.heading} articles={articles} />;
}

async function PartnersSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.partners-block" }>;
}) {
  const embedded = (block.partners ?? []).slice();
  const partners = embedded.length > 0
    ? embedded.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : (await getPartners()).map((p) => ({
        id: p.id,
        name: p.name,
        url: p.url ?? undefined,
        sortOrder: p.sortOrder ?? undefined,
        logo: p.logo ?? undefined,
      }));
  if (partners.length === 0) return null;

  return (
    <section className="qs-partners" aria-label={block.heading}>
      <div className="container">
        {block.heading ? <h2 className="qs-partners__title">{block.heading}</h2> : null}
        <div className="qs-partners__grid">
          {partners.map((partner) => {
            const logo = partner.logo;
            const content = logo ? (
              <img alt={logo.alternativeText ?? partner.name} loading="lazy" src={resolveMediaUrl(logo.url) ?? undefined} />
            ) : (
              <span>{partner.name}</span>
            );
            if (partner.url) {
              return (
                <a
                  aria-label={partner.name}
                  className="qs-partners__item"
                  href={partner.url}
                  key={`${partner.id}-${partner.name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content}
                </a>
              );
            }
            return (
              <span aria-label={partner.name} className="qs-partners__item" key={`${partner.id}-${partner.name}`}>
                {content}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutContentSection({
  block,
}: {
  block: Extract<CmsPageBlock, { __component: "page.about-content-block" }>;
}) {
  return (
    <section className="qs-page">
      <div className="container">
        {block.title ? <h1 className="qs-page__title">{block.title}</h1> : null}
        {block.rows.map((row, idx) => (
          <div
            className={`qs-row${row.mediaPosition === "right" ? " qs-row--reverse" : ""}`}
            key={`${row.heading}-${idx}`}
          >
            <div className="qs-row__media">
              <img
                alt={row.media.alternativeText ?? ""}
                loading="lazy"
                src={resolveMediaUrl(row.media.url) ?? undefined}
              />
            </div>
            <div className="qs-row__text">
              <h2>{row.heading}</h2>
              <RichText html={row.body} />
            </div>
          </div>
        ))}
        {block.highlight ? (
          <div className="qs-bottom">
            <div className="qs-bottom__card">
              <div className="qs-nvidia">
                <div className="qs-nvidia__logo">
                  <svg viewBox="0 0 80 28" fill="currentColor" aria-hidden="true">
                    <text x="0" y="22" fontFamily="Poppins, sans-serif" fontWeight={800} fontSize={22}>
                      NVIDIA.
                    </text>
                  </svg>
                  <span>{block.highlight.badgeLabel}</span>
                </div>
              </div>
              <div className="qs-bottom__col">
                <h3>{block.highlight.leftHeading}</h3>
                <RichText html={block.highlight.leftBody} />
              </div>
            </div>
            <div className="qs-bottom__card">
              <div className="qs-bottom__media">
                <img
                  alt={block.highlight.media.alternativeText ?? ""}
                  loading="lazy"
                  src={resolveMediaUrl(block.highlight.media.url) ?? undefined}
                />
              </div>
              <div className="qs-bottom__col">
                <h3>{block.highlight.rightHeading}</h3>
                <RichText html={block.highlight.rightBody} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PageBlocks({ blocks, locale }: { blocks: CmsPageBlock[]; locale: string }) {
  const resolvedLocale = (isSupportedLocale(locale) ? locale : "pt-BR") as SupportedLocale;
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.__component}-${index}`;
        switch (block.__component) {
          case "page.hero-block":
            return <HeroSection block={block} key={key} />;
          case "page.page-hero-block":
            return <PageHeroSection block={block} key={key} />;
          case "page.text-block":
            return <TextSection block={block} key={key} />;
          case "page.media-text-block":
            return <MediaTextSection block={block} key={key} />;
          case "page.feature-grid-block":
            return <FeatureGridSection block={block} key={key} />;
          case "page.accordion-block":
            return <AccordionSection block={block} key={key} />;
          case "page.application-areas-block":
            return <ApplicationAreasSection block={block} key={key} locale={resolvedLocale} />;
          case "page.contact-form-block":
            return <ContactFormSection block={block} key={key} locale={resolvedLocale} />;
          case "page.lgpd-content-block":
            return <LgpdContentSection block={block} key={key} />;
          case "page.cases-block":
            return <CasesBlockSection block={block} key={key} locale={resolvedLocale} />;
          case "page.news-carousel-block":
            return <NewsCarouselSection block={block} key={key} locale={resolvedLocale} />;
          case "page.partners-block":
            return <PartnersSection block={block} key={key} />;
          case "page.about-content-block":
            return <AboutContentSection block={block} key={key} />;
        }
      })}
    </>
  );
}
