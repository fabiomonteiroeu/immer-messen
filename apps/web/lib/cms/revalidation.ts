import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { serverEnv } from "@/lib/env/server-env";
import {
  getInstitutionalSlug,
  type InstitutionalPageKey,
} from "@/lib/cms/page-routes";

const SUPPORTED_LOCALES = ["pt-BR", "en", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export type RevalidationPayload = {
  model?: string;
  event?: string;
  entry?: {
    slug?: string;
    locale?: string;
    pageKey?: string;
  };
};

export type Invalidations = {
  tags: string[];
  paths: string[];
  skipped?: boolean;
  reason?: string;
};

export function verifyHmac(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  const signature = signatureHeader.startsWith("sha256=")
    ? signatureHeader.slice(7)
    : signatureHeader;

  const expected = createHmac("sha256", serverEnv.REVALIDATE_SECRET)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length === 0 || a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function mapEventToInvalidations(payload: RevalidationPayload): Invalidations {
  const model = payload.model;
  const entry = payload.entry ?? {};

  if (model === "page") {
    const pageKey = entry.pageKey as InstitutionalPageKey | undefined;
    const locale = isLocale(entry.locale) ? entry.locale : null;
    if (!pageKey || !locale) {
      return { tags: ["pages"], paths: [], reason: "page event missing pageKey/locale" };
    }
    const path =
      pageKey === "home"
        ? `/${locale}`
        : `/${locale}/${getInstitutionalSlug(locale, pageKey)}`;
    return {
      tags: [`page:${pageKey}:${locale}`, "pages"],
      paths: [path],
    };
  }

  if (model === "case" || model === "case-study") {
    const slug = entry.slug;
    const locale = isLocale(entry.locale) ? entry.locale : null;
    const tags = ["cases", ...(slug ? [`case:${slug}`] : [])];
    const paths: string[] = [];
    if (locale) paths.push(`/${locale}`);
    if (locale && slug) paths.push(`/${locale}/cases/${slug}`);
    return { tags, paths };
  }

  if (model === "footer" || model === "global-setting" || model === "cookie-banner") {
    const locale = isLocale(entry.locale) ? entry.locale : null;
    const tags = locale ? [`${model}:${locale}`, model] : [model];
    const paths = locale ? SUPPORTED_LOCALES.filter((l) => l === locale).map((l) => `/${l}`) : [];
    return { tags, paths };
  }

  if (model === "news-article" || model === "news-articles") {
    const locale = isLocale(entry.locale) ? entry.locale : null;
    const tags = ["news"];
    const paths = locale ? [`/${locale}`] : SUPPORTED_LOCALES.map((l) => `/${l}`);
    return { tags, paths };
  }

  return { tags: [], paths: [], skipped: true, reason: `unsupported model: ${model}` };
}

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
