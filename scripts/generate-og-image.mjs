#!/usr/bin/env node
// Gera apps/web/public/og-image.png (1200x630, padrão WhatsApp/OG/Twitter)
// Fundo grafite da marca + logo centralizada.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 630;
const BG = "#2C2C2C"; // var(--c-graphite-2) — grafite escuro da marca

const logoPath = path.join(repoRoot, "apps/web/public/assets/img/logo-immer.png");
const outPath = path.join(repoRoot, "apps/web/public/og-image.png");

const logoBuf = await readFile(logoPath);

// Redimensiona o logo pra ocupar ~50% da largura do canvas mantendo aspect-ratio.
const TARGET_LOGO_WIDTH = Math.round(WIDTH * 0.5);
const logoResized = await sharp(logoBuf)
  .resize({ width: TARGET_LOGO_WIDTH, withoutEnlargement: false })
  .toBuffer({ resolveWithObject: true });

const logoH = logoResized.info.height;
const logoW = logoResized.info.width;

const left = Math.round((WIDTH - logoW) / 2);
const top = Math.round((HEIGHT - logoH) / 2);

const canvas = sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BG,
  },
});

await canvas
  .composite([{ input: logoResized.data, left, top }])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log(`Generated ${outPath} (${WIDTH}x${HEIGHT}, logo ${logoW}x${logoH} centered)`);
