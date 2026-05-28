#!/usr/bin/env node
// Real seeder. Reads seed-content.mjs and uploads to a running Strapi via REST.
//
// Requirements:
// - Strapi running and reachable at STRAPI_URL (default http://localhost:1337)
// - STRAPI_API_TOKEN with Full Access (or scoped) permissions
// - Locales pt-BR, en, es enabled (handled by apps/cms/src/index.ts bootstrap)
//
// Usage:
//   STRAPI_API_TOKEN=xxx node scripts/seed-import.mjs
//   STRAPI_API_TOKEN=xxx node scripts/seed-import.mjs --dry-run

import { readFile, stat } from "node:fs/promises";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Blob } from "node:buffer";

import { seedContent, assetManifest } from "./seed-content.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../../..");
const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");
const VERBOSE = process.env.SEED_VERBOSE === "1";

if (!STRAPI_API_TOKEN && !DRY_RUN) {
  console.error(
    "[seed-import] Missing STRAPI_API_TOKEN. Create a Full Access token in /admin/settings/api-tokens and export it."
  );
  process.exit(1);
}

const AUTH_HEADERS = { Authorization: `Bearer ${STRAPI_API_TOKEN ?? ""}` };

function log(...args) {
  console.log("[seed]", ...args);
}

function logv(...args) {
  if (VERBOSE) console.log("[seed]", ...args);
}

async function strapi(pathname, init = {}) {
  if (DRY_RUN && init.method && init.method !== "GET") {
    logv(`(dry-run) ${init.method ?? "GET"} ${pathname}`);
    return { data: null };
  }

  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body && !init.headers?.["Content-Type"] && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...AUTH_HEADERS,
      ...init.headers,
    },
  });

  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!response.ok) {
    const detail = JSON.stringify(json?.error ?? json ?? {}, null, 2);
    throw new Error(`Strapi ${init.method ?? "GET"} ${pathname} failed: ${response.status} ${response.statusText}\n${detail}`);
  }

  return json;
}

// ---- assets ----

const mimeByExt = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ico": "image/x-icon",
};

function guessMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeByExt[ext] ?? "application/octet-stream";
}

async function findUploadedByName(name) {
  const params = new URLSearchParams();
  params.set("filters[name][$eq]", name);
  params.set("pagination[pageSize]", "1");
  const res = await strapi(`/api/upload/files?${params.toString()}`);
  if (Array.isArray(res) && res.length > 0) return res[0];
  if (res?.data?.length) return res.data[0];
  return null;
}

async function uploadAsset({ assetKey, sourcePath, kind }) {
  const absolutePath = path.join(REPO_ROOT, sourcePath);
  await stat(absolutePath); // throws if missing
  const fileName = basename(absolutePath);
  const mime = guessMime(absolutePath);

  const existing = await findUploadedByName(fileName);
  if (existing) {
    logv(`asset ${assetKey} -> reusing #${existing.id} (${fileName})`);
    return { id: existing.id, name: fileName };
  }

  if (DRY_RUN) {
    logv(`(dry-run) upload ${assetKey} <- ${sourcePath} (${kind}/${mime})`);
    return { id: -1, name: fileName };
  }

  const buffer = await readFile(absolutePath);
  const form = new FormData();
  form.append("files", new Blob([buffer], { type: mime }), fileName);

  const url = `${STRAPI_URL}/api/upload`;
  const response = await fetch(url, {
    method: "POST",
    body: form,
    headers: { ...AUTH_HEADERS },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Upload ${assetKey} failed: ${response.status} ${response.statusText}\n${text}`);
  }
  const arr = JSON.parse(text);
  const media = Array.isArray(arr) ? arr[0] : arr?.data?.[0] ?? arr;
  log(`asset ${assetKey} -> #${media.id} (${fileName})`);
  return { id: media.id, name: fileName };
}

async function uploadAllAssets() {
  const assetIdByKey = new Map();
  for (const asset of assetManifest.readyAssets) {
    const result = await uploadAsset(asset);
    assetIdByKey.set(asset.assetKey, result.id);
  }
  return assetIdByKey;
}

// ---- helpers to consume assetRefs by usage pattern ----

function buildAssetConsumer(assetRefs, assetIdByKey) {
  const queue = (assetRefs ?? [])
    .filter((ref) => assetIdByKey.has(ref.assetKey))
    .map((ref) => ({ ...ref, id: assetIdByKey.get(ref.assetKey) }));

  const take = (usage) => {
    const index = queue.findIndex((ref) => ref.usage === usage);
    if (index === -1) return undefined;
    const [ref] = queue.splice(index, 1);
    return ref.id;
  };

  return { take, remaining: () => queue };
}

// ---- blocks builder per locale ----

function applyAssetsToBlocks(blocks, consumer) {
  return blocks.map((block) => {
    const next = { ...block };
    switch (block.__component) {
      case "page.hero-block": {
        const poster = consumer.take("page.hero-block.posterImage");
        const video = consumer.take("page.hero-block.backgroundVideo");
        if (poster) next.posterImage = poster;
        if (video) next.backgroundVideo = video;
        break;
      }
      case "page.page-hero-block": {
        const poster = consumer.take("page.page-hero-block.posterImage");
        const video = consumer.take("page.page-hero-block.backgroundVideo");
        if (poster) next.posterImage = poster;
        if (video) next.backgroundVideo = video;
        break;
      }
      case "page.media-text-block": {
        const media = consumer.take("page.media-text-block.media");
        if (media) next.media = media;
        if (Array.isArray(next.features)) {
          next.features = next.features.map((feature) => {
            const icon = consumer.take("page.feature-card.icon");
            return icon ? { ...feature, icon } : { ...feature };
          });
        }
        break;
      }
      case "page.feature-grid-block": {
        if (Array.isArray(next.cards)) {
          next.cards = next.cards.map((card) => {
            const icon = consumer.take("page.feature-card.icon");
            return icon ? { ...card, icon } : { ...card };
          });
        }
        break;
      }
      case "page.about-content-block": {
        if (Array.isArray(next.rows)) {
          next.rows = next.rows.map((row) => {
            const media = consumer.take("page.about-content-block.row.media");
            return media ? { ...row, media } : { ...row };
          });
        }
        if (next.highlight) {
          const media = consumer.take("page.about-content-block.highlight.media");
          next.highlight = media ? { ...next.highlight, media } : { ...next.highlight };
        }
        break;
      }
      default:
        break;
    }
    return next;
  });
}

function applyRelationsToBlocks(blocks, relationMaps) {
  const { areaIds, partnerIds, articleIds, caseIds } = relationMaps;
  return blocks.map((block) => {
    switch (block.__component) {
      case "page.application-areas-block":
        return {
          ...block,
          areas: (block.areaKeys ?? [])
            .map((key) => areaIds.get(key))
            .filter((id) => typeof id === "number"),
          areaKeys: undefined,
        };
      case "page.partners-block":
        return {
          ...block,
          partners: (block.partnerKeys ?? [])
            .map((key) => partnerIds.get(key))
            .filter((id) => typeof id === "number"),
          partnerKeys: undefined,
        };
      case "page.news-carousel-block":
        return {
          ...block,
          articles: (block.articleKeys ?? [])
            .map((key) => articleIds.get(key))
            .filter((id) => typeof id === "number"),
          articleKeys: undefined,
        };
      case "page.cases-block":
        return {
          ...block,
          cases: (block.caseKeys ?? [])
            .map((key) => caseIds.get(key))
            .filter((id) => typeof id === "number"),
          caseKeys: undefined,
        };
      default:
        return block;
    }
  });
}

function stripUndefined(value) {
  if (Array.isArray(value)) return value.map(stripUndefined);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, stripUndefined(v)])
    );
  }
  return value;
}

// ---- single types ----

async function getSingleType(singularName, locale) {
  try {
    const res = await strapi(`/api/${singularName}?locale=${encodeURIComponent(locale)}&status=draft`);
    return res?.data ?? null;
  } catch (error) {
    if (String(error.message).includes("404")) return null;
    throw error;
  }
}

async function upsertSingleType({ singularName, locale, data }) {
  const existing = await getSingleType(singularName, locale);
  const payload = { data: stripUndefined(data) };
  const method = "PUT";
  const url = `/api/${singularName}?locale=${encodeURIComponent(locale)}`;
  const result = await strapi(url, { method, body: JSON.stringify(payload) });
  const doc = result?.data ?? null;
  // Publish
  if (doc?.documentId && !DRY_RUN) {
    await strapi(`/api/${singularName}/actions/publish?locale=${encodeURIComponent(locale)}`, {
      method: "POST",
      body: JSON.stringify({}),
    }).catch(() => {});
  }
  log(`single-type ${singularName} [${locale}] ${existing ? "updated" : "created"}`);
  return doc;
}

// ---- collections ----

async function findOneByFilter(plural, params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    search.set(key, value);
  }
  search.set("pagination[pageSize]", "1");
  search.set("status", "draft");
  const res = await strapi(`/api/${plural}?${search.toString()}`);
  return res?.data?.[0] ?? null;
}

async function checkDocumentExists(plural, documentId) {
  if (DRY_RUN) return true;
  try {
    const res = await strapi(`/api/${plural}/${documentId}?status=draft`);
    return !!(res?.data?.documentId || res?.data?.id);
  } catch {
    return false;
  }
}

async function upsertLocalizedEntry({ plural, key, locale, data, baseDocumentId }) {
  if (baseDocumentId) {
    const url = `/api/${plural}/${baseDocumentId}?locale=${encodeURIComponent(locale)}`;
    const result = await strapi(url, {
      method: "PUT",
      body: JSON.stringify({ data: stripUndefined(data) }),
    });
    return result?.data;
  }

  // Try to find an existing default-locale doc by slug if locale is default
  const existing = await findOneByFilter(plural, {
    "filters[slug][$eq]": data.slug,
    locale,
  });

  if (existing) {
    const result = await strapi(`/api/${plural}/${existing.documentId}?locale=${encodeURIComponent(locale)}`, {
      method: "PUT",
      body: JSON.stringify({ data: stripUndefined(data) }),
    });
    return result?.data;
  }

  const result = await strapi(`/api/${plural}?locale=${encodeURIComponent(locale)}`, {
    method: "POST",
    body: JSON.stringify({ data: stripUndefined(data) }),
  });
  return result?.data;
}

async function publishEntry(plural, documentId, locale) {
  if (DRY_RUN || !documentId) return;
  try {
    await strapi(`/api/${plural}/${documentId}/actions/publish?locale=${encodeURIComponent(locale)}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  } catch (error) {
    logv(`publish ${plural}/${documentId} [${locale}] skipped: ${error.message.slice(0, 80)}`);
  }
}

// ---- main flow ----

async function seedSingleTypes(assetIdByKey) {
  for (const entry of seedContent.singleTypes) {
    const data = { ...entry.data };

    if (entry.type === "global-setting") {
      const logo = assetIdByKey.get("logo-immer");
      if (logo) {
        data.primaryLogo = logo;
        data.alternativeLogo = logo;
        data.favicon = logo;
      }
    } else if (entry.type === "footer") {
      const logo = assetIdByKey.get("logo-immer");
      if (logo) data.logo = logo;
    }

    await upsertSingleType({
      singularName: entry.type,
      locale: entry.locale,
      data,
    });
  }
}

async function seedPartners(assetIdByKey) {
  const ids = new Map();
  for (const partner of seedContent.partners) {
    const logoId = assetIdByKey.get(partner.assetRefs?.[0]?.assetKey);
    const data = { ...partner.data };
    if (logoId) data.logo = logoId;

    const existing = await findOneByFilter("partners", {
      "filters[name][$eq]": data.name,
    });

    let docId;
    if (existing) {
      const res = await strapi(`/api/partners/${existing.documentId}`, {
        method: "PUT",
        body: JSON.stringify({ data: stripUndefined(data) }),
      });
      docId = res?.data?.documentId;
      ids.set(partner.key, res?.data?.id ?? existing.id);
      log(`partner ${partner.key} updated`);
    } else {
      const res = await strapi(`/api/partners`, {
        method: "POST",
        body: JSON.stringify({ data: stripUndefined(data) }),
      });
      docId = res?.data?.documentId;
      ids.set(partner.key, res?.data?.id);
      log(`partner ${partner.key} created`);
    }
    // Partners have draftAndPublish=false, no publish action needed.
  }
  return ids;
}

async function seedLocalizedCollection({ collectionKey, plural, items, assetMap, applyAssets }) {
  // Group items by key
  const itemsByKey = new Map();
  for (const item of items) {
    if (!itemsByKey.has(item.key)) itemsByKey.set(item.key, []);
    itemsByKey.get(item.key).push(item);
  }

  const idByKey = new Map();

  for (const [key, variants] of itemsByKey) {
    // Sort so pt-BR comes first (assumes default locale)
    variants.sort((a, b) => (a.locale === "pt-BR" ? -1 : 1));

    let documentId = null;

    // Check if any variant has a defined documentId and if it exists in Strapi
    const targetDocId = variants.find((v) => v.documentId)?.documentId;
    if (targetDocId) {
      const exists = await checkDocumentExists(plural, targetDocId);
      if (exists) {
        documentId = targetDocId;
        logv(`Using pre-defined documentId ${documentId} for ${collectionKey} ${key}`);
      } else {
        logv(`Pre-defined documentId ${targetDocId} for ${collectionKey} ${key} does not exist in target CMS, falling back to lookup/create`);
      }
    }

    let firstNumericId = null;

    for (const variant of variants) {
      const data = applyAssets ? applyAssets(variant) : { ...variant.data };
      const created = await upsertLocalizedEntry({
        plural,
        key,
        locale: variant.locale,
        data,
        baseDocumentId: documentId,
      });
      if (created?.documentId && !documentId) {
        documentId = created.documentId;
      }
      if (created?.id && !firstNumericId) {
        firstNumericId = created.id;
      }
      await publishEntry(plural, created?.documentId ?? documentId, variant.locale);
      log(`${collectionKey} ${key} [${variant.locale}] saved`);
    }

    if (firstNumericId) idByKey.set(key, firstNumericId);
  }

  return idByKey;
}

async function seedApplicationAreas(assetIdByKey) {
  return seedLocalizedCollection({
    collectionKey: "application-area",
    plural: "application-areas",
    items: seedContent.applicationAreas,
    assetMap: assetIdByKey,
    applyAssets: (variant) => {
      const data = { ...variant.data };
      const imageRef = variant.assetRefs?.find((r) => r.usage === "application-area.image");
      const imageId = imageRef ? assetIdByKey.get(imageRef.assetKey) : null;
      if (imageId) data.image = imageId;
      return data;
    },
  });
}

async function seedNewsArticles(assetIdByKey) {
  return seedLocalizedCollection({
    collectionKey: "news-article",
    plural: "news-articles",
    items: seedContent.newsArticles,
    assetMap: assetIdByKey,
    applyAssets: (variant) => {
      const data = { ...variant.data };
      const coverRef = variant.assetRefs?.find((r) => r.usage === "news-article.coverImage");
      const coverId = coverRef ? assetIdByKey.get(coverRef.assetKey) : null;
      if (coverId) data.coverImage = coverId;
      return data;
    },
  });
}

async function seedCaseStudies(assetIdByKey, areaIds) {
  return seedLocalizedCollection({
    collectionKey: "case-study",
    plural: "case-studies",
    items: seedContent.caseStudies,
    assetMap: assetIdByKey,
    applyAssets: (variant) => {
      const data = { ...variant.data };
      const coverRef = variant.assetRefs?.find((r) => r.usage === "case-study.coverImage");
      const coverId = coverRef ? assetIdByKey.get(coverRef.assetKey) : null;
      if (coverId) data.coverImage = coverId;
      const heroRef = variant.assetRefs?.find((r) => r.usage === "case-study.heroMedia");
      const heroId = heroRef ? assetIdByKey.get(heroRef.assetKey) : null;
      if (heroId) data.heroMedia = heroId;

      if (variant.relationRefs?.applicationAreaKeys?.length) {
        data.applicationAreas = variant.relationRefs.applicationAreaKeys
          .map((k) => areaIds.get(k))
          .filter((id) => typeof id === "number");
      }
      return data;
    },
  });
}

async function seedPages({ assetIdByKey, areaIds, partnerIds, articleIds, caseIds }) {
  const pagesByKey = new Map();
  for (const entry of seedContent.pages) {
    if (!pagesByKey.has(entry.data.pageKey)) pagesByKey.set(entry.data.pageKey, []);
    pagesByKey.get(entry.data.pageKey).push(entry);
  }

  for (const [pageKey, variants] of pagesByKey) {
    variants.sort((a, b) => (a.locale === "pt-BR" ? -1 : 1));
    let documentId = null;

    for (const variant of variants) {
      const consumer = buildAssetConsumer(variant.assetRefs, assetIdByKey);
      const baseBlocks = applyAssetsToBlocks(variant.data.blocks, consumer);
      const finalBlocks = applyRelationsToBlocks(baseBlocks, {
        areaIds,
        partnerIds,
        articleIds,
        caseIds,
      });

      const data = {
        ...variant.data,
        blocks: finalBlocks,
      };

      const url = documentId
        ? `/api/pages/${documentId}?locale=${encodeURIComponent(variant.locale)}`
        : `/api/pages?locale=${encodeURIComponent(variant.locale)}`;
      const method = documentId ? "PUT" : "POST";

      // Try locating existing by pageKey+locale to avoid duplicates on re-runs
      if (!documentId) {
        const existing = await findOneByFilter("pages", {
          "filters[pageKey][$eq]": variant.data.pageKey,
          locale: variant.locale,
        });
        if (existing) documentId = existing.documentId;
      }

      const targetUrl = documentId
        ? `/api/pages/${documentId}?locale=${encodeURIComponent(variant.locale)}`
        : `/api/pages?locale=${encodeURIComponent(variant.locale)}`;
      const targetMethod = documentId ? "PUT" : "POST";

      const result = await strapi(targetUrl, {
        method: targetMethod,
        body: JSON.stringify({ data: stripUndefined(data) }),
      });
      if (!documentId) documentId = result?.data?.documentId;
      await publishEntry("pages", documentId, variant.locale);

      log(`page ${pageKey} [${variant.locale}] saved`);
    }
  }
}

async function main() {
  log(`Strapi URL: ${STRAPI_URL}${DRY_RUN ? " (dry-run)" : ""}`);

  log("Phase 1/5 — assets");
  const assetIdByKey = await uploadAllAssets();
  log(`  uploaded/resolved ${assetIdByKey.size} assets`);

  log("Phase 2/5 — single types (global-setting, footer, cookie-banner)");
  await seedSingleTypes(assetIdByKey);

  log("Phase 3/5 — catalogs (partners, application areas, news, cases)");
  const partnerIds = await seedPartners(assetIdByKey);
  const areaIds = await seedApplicationAreas(assetIdByKey);
  const articleIds = await seedNewsArticles(assetIdByKey);
  const caseIds = await seedCaseStudies(assetIdByKey, areaIds);

  log("Phase 4/5 — pages (with relations and block assets)");
  await seedPages({ assetIdByKey, areaIds, partnerIds, articleIds, caseIds });

  log("Phase 5/5 — done");
  log(JSON.stringify({
    assets: assetIdByKey.size,
    partners: partnerIds.size,
    applicationAreas: areaIds.size,
    newsArticles: articleIds.size,
    caseStudies: caseIds.size,
  }, null, 2));
}

main().catch((error) => {
  console.error("[seed-import] FAILED");
  console.error(error);
  process.exit(1);
});
