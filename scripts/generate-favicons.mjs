#!/usr/bin/env node
// Gera o set de favicons a partir do símbolo vetorial da marca.
// O favicon antigo era o logo horizontal (85x48) servido numa caixa quadrada,
// então o browser esmagava a proporção. Aqui o mark é centralizado num canvas
// quadrado sobre o navy da marca, mantendo o aspect-ratio original.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const BG = "#060814"; // var(--c-navy-deep) — preserva a silhueta do símbolo, que se funde no navy claro
const MARK_WIDTH_RATIO = 0.72; // largura do símbolo em relação ao lado do canvas

const markPath = path.join(repoRoot, "apps/web/public/assets/img/logo-mark.svg");
const publicDir = path.join(repoRoot, "apps/web/public");

const OUTPUTS = [
  { file: "favicon.png", size: 64 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
];

async function renderIcon(size) {
  // Renderiza o SVG na resolução exata que vai ser usada — sem upscale de raster.
  const markW = Math.round(size * MARK_WIDTH_RATIO);
  const mark = await sharp(markPath, { density: 600 })
    .resize({ width: markW })
    .toBuffer({ resolveWithObject: true });

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      {
        input: mark.data,
        left: Math.round((size - mark.info.width) / 2),
        top: Math.round((size - mark.info.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

for (const { file, size } of OUTPUTS) {
  const buf = await renderIcon(size);
  await writeFile(path.join(publicDir, file), buf);
  console.log(`${file} — ${size}x${size} (${(buf.length / 1024).toFixed(1)} KB)`);
}
