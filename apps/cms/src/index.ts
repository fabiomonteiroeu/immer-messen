import { createHmac } from "node:crypto";

const requiredLocales = [
  { code: "pt-BR", name: "Português (Brasil)", isDefault: true },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

const REVALIDATE_MODEL_MAP: Record<string, string> = {
  "api::page.page": "page",
  "api::case-study.case-study": "case",
  "api::footer.footer": "footer",
  "api::global-setting.global-setting": "global-setting",
  "api::cookie-banner.cookie-banner": "cookie-banner",
};

const REVALIDATE_ACTIONS = new Set(["publish", "unpublish", "delete"]);

type RevalidateContext = {
  uid: string;
  action: string;
  params?: {
    documentId?: string;
    locale?: string;
  };
};

type RevalidateEntry = {
  slug?: string;
  pageKey?: string;
  locale?: string;
};

function extractEntry(result: unknown, fallbackLocale: string | undefined): RevalidateEntry {
  const entry: RevalidateEntry = {};
  if (result && typeof result === "object") {
    const r = result as Record<string, any>;
    const candidate = Array.isArray(r.entries) ? r.entries[0] : r;
    if (candidate && typeof candidate === "object") {
      if (typeof candidate.slug === "string") entry.slug = candidate.slug;
      if (typeof candidate.pageKey === "string") entry.pageKey = candidate.pageKey;
      if (typeof candidate.locale === "string") entry.locale = candidate.locale;
    }
  }
  if (!entry.locale && fallbackLocale) entry.locale = fallbackLocale;
  return entry;
}

async function postRevalidate(
  strapi: any,
  uid: string,
  action: string,
  entry: RevalidateEntry,
) {
  const url = process.env.WEB_REVALIDATE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) {
    strapi.log.warn("revalidate skipped: WEB_REVALIDATE_URL or REVALIDATE_SECRET not set");
    return;
  }

  const model = REVALIDATE_MODEL_MAP[uid];
  if (!model) return;

  const payload = { model, event: action, entry };
  const body = JSON.stringify(payload);
  const signature = createHmac("sha256", secret).update(body).digest("hex");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-revalidate-signature": `sha256=${signature}`,
      },
      body,
    });
    if (!response.ok) {
      strapi.log.warn(`revalidate webhook ${url} responded ${response.status}`);
    } else {
      strapi.log.info(`revalidate ${model} [${entry.locale ?? "?"}] ${action}`);
    }
  } catch (error) {
    strapi.log.warn(`revalidate webhook failed: ${(error as Error).message}`);
  }
}

export default {
  register({ strapi }: { strapi: any }) {
    strapi.documents.use(async (context: RevalidateContext, next: () => Promise<unknown>) => {
      const result = await next();

      if (!REVALIDATE_MODEL_MAP[context.uid]) return result;
      if (!REVALIDATE_ACTIONS.has(context.action)) return result;

      const entry = extractEntry(result, context.params?.locale);

      setImmediate(() => {
        void postRevalidate(strapi, context.uid, context.action, entry);
      });

      return result;
    });
  },
  async bootstrap({ strapi }: { strapi: any }) {
    const localesService = strapi.plugin("i18n").service("locales");

    for (const locale of requiredLocales) {
      const existingLocale = await localesService.findByCode(locale.code);
      if (!existingLocale) {
        await localesService.create({
          code: locale.code,
          name: locale.name,
        });
      }
    }

    await localesService.setDefaultLocale({ code: "pt-BR" });
  },
};
