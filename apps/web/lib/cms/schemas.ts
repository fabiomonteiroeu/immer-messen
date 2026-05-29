import { z } from "zod";

import { supportedLocales } from "@/lib/i18n/config";

export const cmsLocaleSchema = z.enum(supportedLocales);

export const cmsMediaSchema = z.object({
  id: z.number().int().nonnegative(),
  documentId: z.string().min(1).nullable().optional(),
  url: z.string().min(1),
  alternativeText: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  mime: z.string().min(1).nullable().optional(),
  width: z.number().int().positive().nullable().optional(),
  height: z.number().int().positive().nullable().optional(),
});

export const cmsSeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonical: z.string().url().nullable().optional(),
  noindex: z.boolean().nullable().optional(),
  nofollow: z.boolean().nullable().optional(),
  ogImage: cmsMediaSchema.nullable().optional(),
});

export const cmsHeroBlockSchema = z.object({
  __component: z.literal("page.hero-block"),
  id: z.number().int().nonnegative().nullable().optional(),
  title: z.string().min(1),
  subtitle: z.string().nullable().optional().default(""),
  ctaLabel: z.string().nullable().optional(),
  ctaHref: z.string().nullable().optional(),
  alignment: z.enum(["left", "center", "right"]).nullable().optional(),
  posterImage: cmsMediaSchema.nullable().optional(),
  backgroundVideo: cmsMediaSchema.nullable().optional(),
});

export const cmsPageHeroBlockSchema = z.object({
  __component: z.literal("page.page-hero-block"),
  id: z.number().int().nonnegative().nullable().optional(),
  title: z.string().min(1),
  subtitle: z.string().nullable().optional().default(""),
  posterImage: cmsMediaSchema.nullable().optional(),
  backgroundVideo: cmsMediaSchema.nullable().optional(),
});

export const cmsTextBlockSchema = z.object({
  __component: z.literal("page.text-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().min(1),
  body: z.string().min(1),
});

export const featureIconKeySchema = z.enum([
  "sensors",
  "range",
  "spacing",
  "ai",
  "shield",
  "alarm",
]);
export type FeatureIconKey = z.infer<typeof featureIconKeySchema>;

export const cmsFeatureCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  icon: cmsMediaSchema.nullable().optional(),
  iconKey: featureIconKeySchema.nullable().optional(),
});

export const cmsMediaTextBlockSchema = z.object({
  __component: z.literal("page.media-text-block"),
  id: z.number().int().nonnegative().nullable().optional(),
  heading: z.string().min(1),
  body: z.string(),
  mediaPosition: z.enum(["left", "right"]).nullable().optional(),
  media: cmsMediaSchema.nullable().optional(),
  ctaLabel: z.string().nullable().optional(),
  ctaHref: z.string().nullable().optional(),
  variant: z.enum(["home-tech", "tech-band", "interface"]).nullable().optional(),
  eyebrow: z.string().nullable().optional(),
  features: z.array(cmsFeatureCardSchema).nullable().optional(),
});

export const cmsAccordionItemSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: cmsMediaSchema.optional(),
});

export const cmsAccordionBlockSchema = z.object({
  __component: z.literal("page.accordion-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().optional().default(""),
  body: z.string().optional(),
  items: z.array(cmsAccordionItemSchema).default([]),
});

export const cmsFeatureGridBlockSchema = z.object({
  __component: z.literal("page.feature-grid-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().optional().default(""),
  cards: z.array(cmsFeatureCardSchema).default([]),
});

export const cmsApplicationAreaItemSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  image: cmsMediaSchema.optional(),
});

export const cmsApplicationAreasBlockSchema = z.object({
  __component: z.literal("page.application-areas-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().optional().default(""),
  areas: z.array(cmsApplicationAreaItemSchema).default([]),
});

export const cmsContactFormBlockSchema = z.object({
  __component: z.literal("page.contact-form-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().min(1),
  body: z.string().optional().default(""),
  submitLabel: z.string().optional(),
});

export const cmsLgpdSectionSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const cmsLgpdContentBlockSchema = z.object({
  __component: z.literal("page.lgpd-content-block"),
  id: z.number().int().nonnegative().optional(),
  summaryTitle: z.string().optional().default(""),
  sections: z.array(cmsLgpdSectionSchema).default([]),
});

const cmsCaseSummarySchema = z.object({
  id: z.number().int().nonnegative(),
  documentId: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  summary: z.string().optional(),
  coverImage: cmsMediaSchema.optional(),
});

export const cmsNewsSummarySchema = z.object({
  id: z.number().int().nonnegative(),
  documentId: z.string().min(1).nullable().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  publishedDate: z.string().nullable().optional(),
  coverImage: cmsMediaSchema.nullable().optional(),
  authorSource: z.string().nullable().optional(),
});

const cmsPartnerSummarySchema = z.object({
  id: z.number().int().nonnegative(),
  documentId: z.string().optional(),
  name: z.string(),
  url: z.string().optional(),
  logo: cmsMediaSchema.optional(),
  sortOrder: z.number().optional(),
});

export const cmsCasesBlockSchema = z.object({
  __component: z.literal("page.cases-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().optional().default("CASES"),
  displayMode: z.enum(["manual", "latest"]).optional().default("latest"),
  limit: z.number().int().positive().optional(),
  cases: z.array(cmsCaseSummarySchema).optional().default([]),
});

export const cmsNewsCarouselBlockSchema = z.object({
  __component: z.literal("page.news-carousel-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().optional().default(""),
  displayMode: z.enum(["manual", "latest"]).optional().default("latest"),
  articles: z.array(cmsNewsSummarySchema).optional().default([]),
});

export const cmsPartnersBlockSchema = z.object({
  __component: z.literal("page.partners-block"),
  id: z.number().int().nonnegative().optional(),
  heading: z.string().optional().default(""),
  partners: z.array(cmsPartnerSummarySchema).optional().default([]),
});

export const cmsAboutRowSchema = z.object({
  heading: z.string().min(1),
  body: z.string().min(1),
  media: cmsMediaSchema,
  mediaPosition: z.enum(["left", "right"]).optional().default("left"),
});

export const cmsAboutHighlightSchema = z.object({
  badgeLabel: z.string().optional().default("INCEPTION PROGRAM"),
  leftHeading: z.string().min(1),
  leftBody: z.string().min(1),
  media: cmsMediaSchema,
  rightHeading: z.string().min(1),
  rightBody: z.string().min(1),
});

export const cmsAboutContentBlockSchema = z.object({
  __component: z.literal("page.about-content-block"),
  id: z.number().int().nonnegative().optional(),
  title: z.string().optional().default(""),
  rows: z.array(cmsAboutRowSchema).default([]),
  highlight: cmsAboutHighlightSchema.nullable().optional(),
});

export const cmsCaseTextSectionSchema = z.object({
  __component: z.literal("case.text-section"),
  id: z.number().int().nonnegative().optional(),
  html: z.string().min(1),
});

export const cmsCaseGallerySectionSchema = z.object({
  __component: z.literal("case.gallery-section"),
  id: z.number().int().nonnegative().optional(),
  images: z.array(cmsMediaSchema).default([]),
});

export const cmsCaseHeroImageSectionSchema = z.object({
  __component: z.literal("case.hero-image-section"),
  id: z.number().int().nonnegative().optional(),
  image: cmsMediaSchema,
});

export const cmsCaseSectionSchema = z.discriminatedUnion("__component", [
  cmsCaseTextSectionSchema,
  cmsCaseGallerySectionSchema,
  cmsCaseHeroImageSectionSchema,
]);

export const cmsCaseDetailsSchema = z.object({
  client: z.string().optional(),
  startDate: z.string().optional(),
  duration: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const cmsCaseSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string().min(1),
  slug: z.string().min(1),
  locale: cmsLocaleSchema,
  summary: z.string().min(1),
  sectorCategory: z.string().nullable().optional(),
  coverImage: cmsMediaSchema.optional(),
  heroMedia: cmsMediaSchema.optional(),
  projectTitle: z.string().optional(),
  projectSubtitle: z.string().optional(),
  details: cmsCaseDetailsSchema.optional(),
  body: z.string().nullable().optional(),
  challenge: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),
  results: z.string().nullable().optional(),
  sections: z.array(cmsCaseSectionSchema).default([]),
});

export const cmsPageBlockSchema = z.discriminatedUnion("__component", [
  cmsHeroBlockSchema,
  cmsPageHeroBlockSchema,
  cmsTextBlockSchema,
  cmsMediaTextBlockSchema,
  cmsAccordionBlockSchema,
  cmsFeatureGridBlockSchema,
  cmsApplicationAreasBlockSchema,
  cmsContactFormBlockSchema,
  cmsLgpdContentBlockSchema,
  cmsCasesBlockSchema,
  cmsNewsCarouselBlockSchema,
  cmsPartnersBlockSchema,
  cmsAboutContentBlockSchema,
]);

export const cmsPageSchema = z.object({
  id: z.number().int().nonnegative(),
  documentId: z.string().min(1).nullable().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  locale: cmsLocaleSchema,
  seo: cmsSeoSchema.nullable().optional(),
  blocks: z.array(cmsPageBlockSchema).default([]),
});

export const cmsCollectionResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z
      .object({
        pagination: z
          .object({
            page: z.number().int().positive(),
            pageSize: z.number().int().positive(),
            pageCount: z.number().int().nonnegative(),
            total: z.number().int().nonnegative(),
          })
          .optional(),
      })
      .default({}),
  });

export const cmsSingleResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: itemSchema.nullable(),
    meta: z.record(z.string(), z.unknown()).optional(),
  });

export type CmsPage = z.infer<typeof cmsPageSchema>;
export type CmsPageBlock = z.infer<typeof cmsPageBlockSchema>;
export type CmsCase = z.infer<typeof cmsCaseSchema>;
export type CmsCaseSection = z.infer<typeof cmsCaseSectionSchema>;
export type CmsNewsArticle = z.infer<typeof cmsNewsSummarySchema>;

export const cmsLinkItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  openInNewTab: z.boolean().optional().default(false),
});

export const cmsMenuColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(cmsLinkItemSchema).default([]),
});

export const cmsContactDetailsSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const cmsSocialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().min(1),
});

export const cmsGlobalSettingSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  documentId: z.string().optional(),
  siteName: z.string().min(1),
  primaryLogo: cmsMediaSchema.optional(),
  alternativeLogo: cmsMediaSchema.optional(),
  favicon: cmsMediaSchema.optional(),
  seo: cmsSeoSchema.optional(),
  contactDetails: cmsContactDetailsSchema.optional(),
  socialLinks: z.array(cmsSocialLinkSchema).default([]),
  allowedScripts: z.string().nullable().optional(),
});

export const cmsFooterSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  documentId: z.string().optional(),
  logo: cmsMediaSchema.optional(),
  tagline: z.string().nullable().optional(),
  menuColumns: z.array(cmsMenuColumnSchema).default([]),
  contactDetails: cmsContactDetailsSchema.optional(),
  copyrightText: z.string().nullable().optional(),
  privacyLink: cmsLinkItemSchema.optional(),
});

export const cmsCookieBannerSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  documentId: z.string().optional(),
  text: z.string().min(1),
  acceptLabel: z.string().min(1),
  learnMoreLink: cmsLinkItemSchema.optional(),
  policyVersion: z.string().nullable().optional(),
});

export type CmsLinkItem = z.infer<typeof cmsLinkItemSchema>;
export type CmsMenuColumn = z.infer<typeof cmsMenuColumnSchema>;
export type CmsContactDetails = z.infer<typeof cmsContactDetailsSchema>;
export type CmsSocialLink = z.infer<typeof cmsSocialLinkSchema>;
export type CmsGlobalSetting = z.infer<typeof cmsGlobalSettingSchema>;
export type CmsFooter = z.infer<typeof cmsFooterSchema>;
export type CmsCookieBanner = z.infer<typeof cmsCookieBannerSchema>;
