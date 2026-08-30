#!/usr/bin/env node
// Migracao dos campos legados de `case-study` para a dynamic zone `sections` (D-13).
//
// Le, por locale, os campos de corpo que ainda existem no content type
// (`heroTitle`, `heroMedia`, `client`, `startDate`, `duration`, `tags`,
// `projectLogos`, `challenge`, `leadTitle`, `leadSubtitle`, `body`) e reescreve
// a zona `sections` com os blocos equivalentes, preservando os blocos que ja
// estavam la.
//
// PRECISA rodar ANTES de os campos sairem do schema: remover um atributo de um
// content type do Strapi derruba a coluna e o conteudo nao volta.
//
// Requisitos:
// - Strapi no ar em STRAPI_URL (default http://localhost:1337)
// - STRAPI_API_TOKEN com permissao de escrita (Full Access)
//
// Uso:
//   STRAPI_API_TOKEN=xxx node scripts/migrate-case-blocks.mjs --dry-run
//   STRAPI_API_TOKEN=xxx node scripts/migrate-case-blocks.mjs
//   STRAPI_API_TOKEN=xxx node scripts/migrate-case-blocks.mjs --force

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

if (!STRAPI_API_TOKEN && !DRY_RUN) {
  console.error(
    "[migrate-cases] Missing STRAPI_API_TOKEN. Create a Full Access token in /admin/settings/api-tokens and export it."
  );
  process.exit(1);
}

const AUTH_HEADERS = { Authorization: `Bearer ${STRAPI_API_TOKEN ?? ""}` };

const LOCALES = ["pt-BR", "en", "es"];

// Rotulos por locale. Vinham do dicionario `labelsByLocale` do page.tsx removido
// no plano 10-04; agora viram conteudo editavel dentro dos blocos.
// Rotulo de row SEM dois-pontos: a marcacao do frontend adiciona o ":" (D-09).
const LABELS = {
  "pt-BR": {
    detailsTitle: "Detalhes do projeto",
    challengeTitle: "O desafio",
    client: "Cliente",
    startDate: "Data de início",
    duration: "Duração",
    tags: "Tags",
  },
  en: {
    detailsTitle: "Project details",
    challengeTitle: "The challenge",
    client: "Client",
    startDate: "Start date",
    duration: "Duration",
    tags: "Tags",
  },
  es: {
    detailsTitle: "Detalles del proyecto",
    challengeTitle: "El desafío",
    client: "Cliente",
    startDate: "Fecha de inicio",
    duration: "Duración",
    tags: "Tags",
  },
};

// Blocos que esta migracao gera a partir dos campos legados. Sao os unicos que
// `--force` remove antes de reprocessar, para nao duplicar.
const GENERATED_COMPONENTS = new Set([
  "case.hero-section",
  "case.info-card",
  "case.lead-section",
]);

function log(...args) {
  console.log("[migrate-cases]", ...args);
}

async function strapi(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
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
    const detail = JSON.stringify(json?.error ?? {}, null, 2);
    throw new Error(
      `Strapi ${init.method ?? "GET"} ${pathname} failed: ${response.status} ${response.statusText}\n${detail}`
    );
  }

  return json;
}

// ---- populate ----

// Mesmo populate usado por apps/web/lib/cms/cases.ts, mais os campos legados.
function buildListQuery(locale, status) {
  const params = new URLSearchParams();
  params.set("locale", locale);
  params.set("status", status);
  params.set("pagination[pageSize]", "100");
  params.set("populate[heroMedia]", "true");
  params.set("populate[projectLogos][populate][logo]", "true");
  params.set("populate[sections][on][case.hero-section][populate][media]", "true");
  params.set("populate[sections][on][case.info-card][populate][rows]", "true");
  params.set(
    "populate[sections][on][case.info-card][populate][partnerLogos][populate][logo]",
    "true"
  );
  params.set("populate[sections][on][case.lead-section][populate]", "*");
  params.set("populate[sections][on][case.text-section][populate]", "*");
  params.set("populate[sections][on][case.section-title][populate]", "*");
  params.set("populate[sections][on][case.highlight-section][populate]", "*");
  params.set("populate[sections][on][case.figure-section][populate][image]", "true");
  params.set("populate[sections][on][case.two-column-section][populate]", "*");
  params.set("populate[sections][on][case.panel-section][populate]", "*");
  return params.toString();
}

// ---- helpers de conteudo ----

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

// Replica o `formatDate` que a pagina usava antes do plano 10-04
// (toLocaleDateString com day/month 2-digit), fixando UTC para nao deslocar o
// dia em fusos negativos: a data vem do Strapi como `YYYY-MM-DD` puro.
function formatDate(iso, locale) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return String(iso);
  }
}

function formatTags(raw) {
  if (Array.isArray(raw)) return raw.map((t) => String(t).trim()).filter(Boolean).join(", ");
  return text(raw)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .join(", ");
}

// `partner-instituto-aqualie.png` -> `Instituto Aqualie`
function partnerNameFromFile(name) {
  if (!name) return "";
  return String(name)
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^partner[-_]/i, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(" ");
}

function mediaId(value) {
  if (!value) return undefined;
  if (typeof value === "number") return value;
  if (Array.isArray(value)) return mediaId(value[0]);
  return typeof value.id === "number" ? value.id : undefined;
}

/**
 * Cascata de alt do logo: alt do slot -> alternativeText da midia ->
 * nome do parceiro derivado do arquivo -> title do case.
 * Logo sem nenhum alt vira link sem nome acessivel e o frontend nao o renderiza.
 */
function logoSlot(slot, fallbackTitle) {
  const id = mediaId(slot?.logo);
  if (!id) return null;
  const alt =
    text(slot?.alt) ||
    text(slot?.logo?.alternativeText) ||
    partnerNameFromFile(slot?.logo?.name) ||
    text(fallbackTitle);
  if (!alt) return null;
  return { logo: id, url: text(slot?.url) || null, alt };
}

// ---- normalizacao dos blocos que ja estavam na zona ----

function normalizeExistingBlock(block, fallbackTitle) {
  const base = { __component: block.__component };
  if (typeof block.id === "number") base.id = block.id;

  switch (block.__component) {
    case "case.hero-section":
      return {
        ...base,
        title: block.title,
        subtitle: block.subtitle ?? null,
        media: mediaId(block.media) ?? null,
      };
    case "case.info-card":
      return {
        ...base,
        icon: block.icon ?? "none",
        title: block.title,
        body: block.body ?? null,
        rows: (block.rows ?? []).map((row) => ({
          ...(typeof row.id === "number" ? { id: row.id } : {}),
          label: row.label,
          value: row.value,
        })),
        partnerLogos: (block.partnerLogos ?? [])
          .map((slot) => {
            const next = logoSlot(slot, fallbackTitle);
            if (!next) return null;
            return typeof slot.id === "number" ? { id: slot.id, ...next } : next;
          })
          .filter(Boolean),
        logosCaption: block.logosCaption ?? null,
      };
    case "case.lead-section":
      return { ...base, title: block.title, subtitle: block.subtitle ?? null };
    case "case.text-section":
      return { ...base, body: block.body };
    case "case.section-title":
      return { ...base, title: block.title };
    case "case.highlight-section":
      // Normalizacao pedida pelo plano: bloco sem variante vira `opening`.
      return {
        ...base,
        variant: block.variant ?? "opening",
        eyebrow: block.eyebrow ?? null,
        heading: block.heading ?? null,
        body: block.body,
      };
    case "case.figure-section":
      return {
        ...base,
        image: mediaId(block.image) ?? null,
        caption: block.caption ?? null,
      };
    case "case.two-column-section":
      return {
        ...base,
        leftBody: block.leftBody,
        pullQuote: block.pullQuote ?? null,
        rightBody: block.rightBody ?? null,
      };
    case "case.panel-section":
      // Normalizacao pedida pelo plano: painel sem icone vira `bar_chart` aberto.
      return {
        ...base,
        icon: block.icon ?? "bar_chart",
        title: block.title,
        body: block.body,
        defaultOpen: typeof block.defaultOpen === "boolean" ? block.defaultOpen : true,
      };
    default:
      return { ...block };
  }
}

// ---- montagem dos blocos derivados dos campos legados ----

function buildLegacyBlocks(entry, locale) {
  const labels = LABELS[locale];
  const blocks = [];

  const heroTitle = text(entry.heroTitle) || text(entry.title);
  if (heroTitle) {
    blocks.push({
      __component: "case.hero-section",
      title: heroTitle,
      subtitle: text(entry.summary) || null,
      media: mediaId(entry.heroMedia) ?? null,
    });
  }

  const rows = [];
  if (text(entry.client)) rows.push({ label: labels.client, value: text(entry.client) });
  const startDate = formatDate(entry.startDate, locale);
  if (startDate) rows.push({ label: labels.startDate, value: startDate });
  if (text(entry.duration)) rows.push({ label: labels.duration, value: text(entry.duration) });
  const tags = formatTags(entry.tags);
  if (tags) rows.push({ label: labels.tags, value: tags });

  const partnerLogos = (entry.projectLogos ?? [])
    .map((slot) => logoSlot(slot, entry.title))
    .filter(Boolean);

  if (rows.length > 0 || partnerLogos.length > 0) {
    blocks.push({
      __component: "case.info-card",
      icon: "clipboard",
      title: labels.detailsTitle,
      body: null,
      rows,
      partnerLogos,
      logosCaption: null,
    });
  }

  if (text(entry.challenge)) {
    blocks.push({
      __component: "case.info-card",
      icon: "target",
      title: labels.challengeTitle,
      body: entry.challenge,
      rows: [],
      partnerLogos: [],
      logosCaption: null,
    });
  }

  if (text(entry.leadTitle)) {
    blocks.push({
      __component: "case.lead-section",
      title: `<p>${text(entry.leadTitle)}</p>`,
      subtitle: text(entry.leadSubtitle) || null,
    });
  }

  return blocks;
}

function buildSections(entry, locale) {
  const existingRaw = Array.isArray(entry.sections) ? entry.sections : [];
  const kept = FORCE
    ? existingRaw.filter((block) => !GENERATED_COMPONENTS.has(block.__component))
    : existingRaw;

  const existing = kept.map((block) => normalizeExistingBlock(block, entry.title));
  const legacy = buildLegacyBlocks(entry, locale);

  // Nenhum conteudo pode se perder: zona vazia + `body` preenchido vira texto.
  if (existing.length === 0 && text(entry.body)) {
    existing.push({ __component: "case.text-section", body: entry.body });
  }

  return [...legacy, ...existing];
}

// ---- fluxo ----

function isMigrated(entry) {
  return (entry.sections ?? []).some((block) => block.__component === "case.hero-section");
}

async function publishedDocumentIds(locale) {
  const params = new URLSearchParams();
  params.set("locale", locale);
  params.set("status", "published");
  params.set("pagination[pageSize]", "100");
  params.set("fields[0]", "slug");
  const res = await strapi(`/api/case-studies?${params.toString()}`);
  return new Set((res?.data ?? []).map((entry) => entry.documentId));
}

async function migrateLocale(locale) {
  const stats = { migrated: 0, skipped: 0, failed: 0 };

  const res = await strapi(`/api/case-studies?${buildListQuery(locale, "draft")}`);
  const entries = res?.data ?? [];
  const published = await publishedDocumentIds(locale);

  log(`[${locale}] ${entries.length} case(s) encontrado(s)`);

  for (const entry of entries) {
    const label = `${entry.slug} [${locale}]`;

    if (isMigrated(entry) && !FORCE) {
      log(`  ${label}: skipped (already migrated)`);
      stats.skipped += 1;
      continue;
    }

    let sections;
    try {
      sections = buildSections(entry, locale);
    } catch (error) {
      console.error(`  ${label}: FAILED montando blocos — ${error.message}`);
      stats.failed += 1;
      continue;
    }

    if (DRY_RUN) {
      log(`  ${label}: ${sections.length} bloco(s) — ${sections.map((b) => b.__component).join(" | ")}`);
      console.log(JSON.stringify({ documentId: entry.documentId, locale, sections }, null, 2));
      stats.migrated += 1;
      continue;
    }

    try {
      await strapi(
        `/api/case-studies/${entry.documentId}?locale=${encodeURIComponent(locale)}`,
        { method: "PUT", body: JSON.stringify({ data: { sections } }) }
      );
      if (published.has(entry.documentId)) {
        await strapi(
          `/api/case-studies/${entry.documentId}/actions/publish?locale=${encodeURIComponent(locale)}`,
          { method: "POST", body: JSON.stringify({}) }
        );
      }
      log(`  ${label}: migrated (${sections.length} blocos${published.has(entry.documentId) ? ", republicado" : ""})`);
      stats.migrated += 1;
    } catch (error) {
      console.error(`  ${label}: FAILED — ${error.message}`);
      stats.failed += 1;
    }
  }

  return stats;
}

async function main() {
  log(`Strapi URL: ${STRAPI_URL}${DRY_RUN ? " (dry-run)" : ""}${FORCE ? " (force)" : ""}`);

  const report = {};
  let totalFailed = 0;

  for (const locale of LOCALES) {
    const stats = await migrateLocale(locale);
    report[locale] = stats;
    totalFailed += stats.failed;
  }

  log("relatorio:");
  console.log(JSON.stringify(report, null, 2));

  if (totalFailed > 0) {
    console.error(`[migrate-cases] ${totalFailed} falha(s) — NAO remova os campos do schema.`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[migrate-cases] FAILED");
  console.error(error);
  process.exit(1);
});
