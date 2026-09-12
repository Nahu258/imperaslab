// Gera public/og-image.png a partir de scripts/og-image.svg usando o sharp
// (ja instalado junto com o Astro). Rode: npm run og
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(resolve(here, 'og-image.svg'));
const out = resolve(here, '..', 'public', 'og-image.png');

const png = await sharp(svg, { density: 144 }).resize(1200, 630).png({ quality: 90 }).toBuffer();
writeFileSync(out, png);
console.log(`og-image.png gerado (${(png.length / 1024).toFixed(0)} KB)`);
