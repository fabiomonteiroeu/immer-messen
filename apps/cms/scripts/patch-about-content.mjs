#!/usr/bin/env node
// Surgical patch: applies the new about-content-block + Petrobras partner
// without touching any other content the user may have edited in the admin.
//
// Usage:
//   STRAPI_API_TOKEN=xxx node apps/cms/scripts/patch-about-content.mjs [--dry-run]

import { readFile, stat } from "node:fs/promises";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Blob } from "node:buffer";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../../..");
const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");

if (!TOKEN && !DRY_RUN) {
  console.error("[patch] Missing STRAPI_API_TOKEN");
  process.exit(1);
}

const HEADERS = { Authorization: `Bearer ${TOKEN ?? ""}` };
const log = (...args) => console.log("[patch]", ...args);

async function strapi(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${STRAPI_URL}${pathname}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...HEADERS,
      ...init.headers,
    },
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} ${pathname}\n${text}`);
  }
  return json;
}

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function findUploadByName(name) {
  const q = new URLSearchParams();
  q.set("filters[name][$eq]", name);
  q.set("pagination[pageSize]", "1");
  const res = await strapi(`/api/upload/files?${q}`);
  if (Array.isArray(res) && res.length > 0) return res[0];
  if (res?.data?.length) return res.data[0];
  return null;
}

async function uploadIfMissing(sourcePath) {
  const abs = path.join(REPO_ROOT, sourcePath);
  await stat(abs);
  const fileName = basename(abs);
  const existing = await findUploadByName(fileName);
  if (existing) {
    log(`asset ${fileName} -> reusing #${existing.id}`);
    return existing.id;
  }
  if (DRY_RUN) {
    log(`(dry-run) would upload ${fileName}`);
    return -1;
  }
  const ext = path.extname(abs).toLowerCase();
  const mime = MIME[ext] ?? "application/octet-stream";
  const buf = await readFile(abs);
  const form = new FormData();
  form.append("files", new Blob([buf], { type: mime }), fileName);
  const res = await fetch(`${STRAPI_URL}/api/upload`, { method: "POST", body: form, headers: HEADERS });
  const text = await res.text();
  if (!res.ok) throw new Error(`upload ${fileName}: ${res.status} ${text}`);
  const arr = JSON.parse(text);
  const media = Array.isArray(arr) ? arr[0] : arr?.data?.[0] ?? arr;
  log(`asset ${fileName} -> #${media.id} (uploaded)`);
  return media.id;
}

async function findPartnerByName(name) {
  const q = new URLSearchParams();
  q.set("filters[name][$eq]", name);
  q.set("pagination[pageSize]", "1");
  const res = await strapi(`/api/partners?${q}`);
  return res?.data?.[0] ?? null;
}

async function ensurePartner({ name, url, sortOrder, logoId }) {
  const existing = await findPartnerByName(name);
  if (existing) {
    log(`partner ${name} -> exists #${existing.id}`);
    return existing.id;
  }
  if (DRY_RUN) {
    log(`(dry-run) would create partner ${name}`);
    return -1;
  }
  const res = await strapi(`/api/partners`, {
    method: "POST",
    body: JSON.stringify({ data: { name, url, sortOrder, active: true, logo: logoId } }),
  });
  log(`partner ${name} created -> #${res.data.id}`);
  return res.data.id;
}

async function getAboutPagesByLocale() {
  const out = {};
  for (const locale of ["pt-BR", "en", "es"]) {
    const q = new URLSearchParams();
    q.set("locale", locale);
    q.set("filters[pageKey][$eq]", "about");
    q.set("populate[blocks][on][page.contact-form-block][populate]", "*");
    q.set("pagination[pageSize]", "1");
    const res = await strapi(`/api/pages?${q}`);
    out[locale] = res?.data?.[0] ?? null;
  }
  return out;
}

async function getAllPartnersOrdered() {
  const res = await strapi(`/api/partners?pagination[pageSize]=100&sort=sortOrder:asc`);
  return res?.data ?? [];
}

const COPY = {
  "pt-BR": {
    title: "QUEM SOMOS",
    rows: [
      {
        heading: "Nascemos nos laboratórios. Chegamos ao campo.",
        body: "<p>A Immer Messen tem origem na pesquisa de ponta desenvolvida na Universidade Tecnológica Federal do Paraná (UTFPR), em Curitiba. Foi dentro dos laboratórios da universidade que surgiu o primeiro interrogador DAS de desenvolvimento genuinamente nacional — resultado de anos de pesquisa aplicada em fotônica, metrologia óptica e processamento de sinais.</p><p>Esse DNA acadêmico não ficou no laboratório. Ele se traduziu em tecnologia proprietária, arquitetura de hardware independente de fornecedores externos e capacidade de desenvolvimento de algoritmos específicos para as condições operacionais da infraestrutura crítica brasileira.</p>",
      },
      {
        heading: "Da pesquisa ao mercado, com validação de classe mundial",
        body: "<p>O reconhecimento do potencial tecnológico da Immer Messen veio antes mesmo do lançamento comercial. A Petrobras, maior operadora de infraestrutura de energia do país, selecionou a empresa como parceira em projeto de P&amp;D que validou a maturidade técnica do sistema e acelerou o desenvolvimento de aplicações para o segmento de óleo e gás.</p><p>Essa parceria resultou em projetos de pesquisa aplicada voltados ao monitoramento de reservatórios, com foco em armazenamento, tratamento e distribuição de dados DFOS para aplicações de sensoriamento em poços e infraestrutura subsuperficial — posicionando a Immer Messen como referência técnica nacional no segmento.</p>",
      },
    ],
    highlight: {
      badgeLabel: "INCEPTION PROGRAM",
      leftHeading: "Membro do NVIDIA Inception Program",
      leftBody: "<p>A Immer Messen integra o NVIDIA Inception Program, iniciativa global de suporte a startups de deep-tech e inteligência artificial — reconhecimento do papel estratégico que os algoritmos de IA desempenham na plataforma da empresa e do alinhamento com a fronteira tecnológica em aceleração de modelos de machine learning aplicados a dados de sensoriamento distribuído.</p>",
      rightHeading: "Pioneirismo Brasileiro",
      rightBody: "<p>Somos o único desenvolvedor brasileiro de tecnologia DFOS com hardware proprietário, algoritmos de IA treinados com dados de campo nacionais e capacidade de entrega de solução completa — do interrogador óptico à plataforma de monitoramento contínuo. Nossa estrutura local permite suporte ágil, precificação competitiva e integração nativa aos requisitos regulatórios do mercado brasileiro.</p>",
    },
    partnersHeading: "Nossos parceiros:",
  },
  en: {
    title: "ABOUT US",
    rows: [
      {
        heading: "Born in the labs. Proven in the field.",
        body: "<p>Immer Messen originates from cutting-edge research developed at the Federal University of Technology - Paraná (UTFPR) in Curitiba. The first genuinely Brazilian DAS interrogator was built inside the university's labs — the result of years of applied research in photonics, optical metrology and signal processing.</p><p>That academic DNA didn't stay in the lab. It evolved into proprietary technology, a hardware architecture independent of external vendors, and the capability to develop algorithms specific to the operating conditions of Brazilian critical infrastructure.</p>",
      },
      {
        heading: "From research to market, with world-class validation",
        body: "<p>Recognition of Immer Messen's technological potential arrived even before its commercial launch. Petrobras, the country's largest energy infrastructure operator, selected the company as a partner in an R&amp;D project that validated the system's technical maturity and accelerated the development of applications for the oil and gas segment.</p><p>This partnership produced applied research projects focused on reservoir monitoring — with emphasis on storage, processing and distribution of DFOS data for downhole and subsurface sensing — positioning Immer Messen as the national technical reference in the segment.</p>",
      },
    ],
    highlight: {
      badgeLabel: "INCEPTION PROGRAM",
      leftHeading: "Member of the NVIDIA Inception Program",
      leftBody: "<p>Immer Messen is part of the NVIDIA Inception Program, a global initiative supporting deep-tech and AI startups — recognition of the strategic role that AI algorithms play in the company's platform and of its alignment with the technological frontier in accelerating machine learning models applied to distributed sensing data.</p>",
      rightHeading: "Brazilian Pioneering",
      rightBody: "<p>We are the only Brazilian developer of DFOS technology with proprietary hardware, AI algorithms trained on national field data, and the capability to deliver a full solution — from optical interrogator to continuous monitoring platform. Our local structure enables agile support, competitive pricing and native compliance with Brazilian regulatory requirements.</p>",
    },
    partnersHeading: "Our partners:",
  },
  es: {
    title: "QUIÉNES SOMOS",
    rows: [
      {
        heading: "Nacimos en los laboratorios. Llegamos al campo.",
        body: "<p>Immer Messen tiene origen en la investigación de punta desarrollada en la Universidad Tecnológica Federal de Paraná (UTFPR), en Curitiba. Fue dentro de los laboratorios de la universidad donde surgió el primer interrogador DAS de desarrollo genuinamente brasileño — resultado de años de investigación aplicada en fotónica, metrología óptica y procesamiento de señales.</p><p>Ese ADN académico no se quedó en el laboratorio. Se tradujo en tecnología propietaria, arquitectura de hardware independiente de proveedores externos y capacidad para desarrollar algoritmos específicos para las condiciones operativas de la infraestructura crítica brasileña.</p>",
      },
      {
        heading: "De la investigación al mercado, con validación de clase mundial",
        body: "<p>El reconocimiento del potencial tecnológico de Immer Messen llegó incluso antes del lanzamiento comercial. Petrobras, el mayor operador de infraestructura de energía del país, seleccionó a la empresa como aliada en un proyecto de I+D que validó la madurez técnica del sistema y aceleró el desarrollo de aplicaciones para el segmento de petróleo y gas.</p><p>Esta alianza resultó en proyectos de investigación aplicada orientados al monitoreo de reservorios, con enfoque en almacenamiento, tratamiento y distribución de datos DFOS para aplicaciones de sensado en pozos e infraestructura subsuperficial — posicionando a Immer Messen como referencia técnica nacional en el segmento.</p>",
      },
    ],
    highlight: {
      badgeLabel: "INCEPTION PROGRAM",
      leftHeading: "Miembro del NVIDIA Inception Program",
      leftBody: "<p>Immer Messen integra el NVIDIA Inception Program, iniciativa global de apoyo a startups de deep-tech e inteligencia artificial — reconocimiento del papel estratégico que los algoritmos de IA desempeñan en la plataforma de la empresa y del alineamiento con la frontera tecnológica en aceleración de modelos de machine learning aplicados a datos de sensado distribuido.</p>",
      rightHeading: "Pionerismo Brasileño",
      rightBody: "<p>Somos el único desarrollador brasileño de tecnología DFOS con hardware propietario, algoritmos de IA entrenados con datos de campo nacionales y capacidad de entrega de solución completa — del interrogador óptico a la plataforma de monitoreo continuo. Nuestra estructura local permite soporte ágil, precificación competitiva e integración nativa a los requisitos regulatorios del mercado brasileño.</p>",
    },
    partnersHeading: "Nuestros aliados:",
  },
};

function buildBlocks(locale, mediaIds, partnerIdsOrdered, existingContactBlock) {
  const c = COPY[locale];
  const aboutBlock = {
    __component: "page.about-content-block",
    title: c.title,
    rows: c.rows.map((row, idx) => ({
      heading: row.heading,
      body: row.body,
      mediaPosition: idx === 0 ? "left" : "right",
      media: mediaIds.lab,
    })),
    highlight: {
      badgeLabel: c.highlight.badgeLabel,
      leftHeading: c.highlight.leftHeading,
      leftBody: c.highlight.leftBody,
      media: mediaIds.rack,
      rightHeading: c.highlight.rightHeading,
      rightBody: c.highlight.rightBody,
    },
  };
  const partnersBlock = {
    __component: "page.partners-block",
    heading: c.partnersHeading,
    partners: partnerIdsOrdered,
  };
  const blocks = [aboutBlock, partnersBlock];
  if (existingContactBlock) {
    blocks.push({
      __component: "page.contact-form-block",
      heading: existingContactBlock.heading,
      body: existingContactBlock.body,
      submitLabel: existingContactBlock.submitLabel,
    });
  }
  return blocks;
}

async function main() {
  log(`mode: ${DRY_RUN ? "DRY-RUN" : "WRITE"}`);

  log("uploading media if missing...");
  const labId = await uploadIfMissing("resources/quem-somos.png");
  const rackId = await uploadIfMissing("resources/quem-somos-02.png");
  const petrobrasLogoId = await uploadIfMissing("layout-aprovado/assets/img/partners/petrobras.png");

  log("ensuring Petrobras partner...");
  await ensurePartner({
    name: "Petrobras",
    url: "https://petrobras.com.br",
    sortOrder: 5,
    logoId: petrobrasLogoId,
  });

  log("collecting ordered partner ids...");
  const allPartners = await getAllPartnersOrdered();
  const wantOrder = ["Petrobras", "SEBRAE", "Instituto Aqualie", "NVIDIA", "CNPq", "SEAFOM", "Ouronova", "UTFPR"];
  const partnerIdsOrdered = wantOrder
    .map((name) => allPartners.find((p) => p.name === name)?.id)
    .filter(Boolean);
  log(`partner order: ${partnerIdsOrdered.join(", ")}`);

  log("loading current about pages...");
  const aboutByLocale = await getAboutPagesByLocale();

  for (const locale of ["pt-BR", "en", "es"]) {
    const page = aboutByLocale[locale];
    if (!page) {
      log(`SKIP ${locale}: no about page found`);
      continue;
    }
    const existingContact = (page.blocks ?? []).find(
      (b) => b.__component === "page.contact-form-block"
    );
    const blocks = buildBlocks(
      locale,
      { lab: labId, rack: rackId },
      partnerIdsOrdered,
      existingContact
    );

    if (DRY_RUN) {
      log(`(dry-run) PUT /api/pages/${page.documentId}?locale=${locale}  (blocks=${blocks.length})`);
      continue;
    }

    const upd = await strapi(
      `/api/pages/${page.documentId}?locale=${locale}`,
      {
        method: "PUT",
        body: JSON.stringify({ data: { blocks } }),
      }
    );
    log(`PUT about [${locale}] -> id=${upd.data?.id}`);

    // Republish
    await strapi(
      `/api/pages/${page.documentId}/actions/publish?locale=${locale}`,
      { method: "POST", body: JSON.stringify({}) }
    ).catch((e) => log(`(publish fallback) ${e.message.split("\n")[0]}`));
    log(`published about [${locale}]`);
  }

  log("done.");
}

main().catch((err) => {
  console.error("[patch] FAILED:", err);
  process.exit(1);
});
