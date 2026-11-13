// Usage: npm run images -- <input-file> <output-path-without-ext> [maxWidth]
// Example: npm run images -- ~/Downloads/cert.png public/images/certificates/new-award 1600
// Writes a resized .webp (full) and a -thumb.webp (640px) next to it.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [input, output, maxWidth = '1600'] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: npm run images -- <input> <output-without-ext> [maxWidth]');
  process.exit(1);
}

mkdirSync(dirname(output), { recursive: true });
const base = sharp(input).rotate();

await base.clone().resize({ width: Number(maxWidth), withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${output}.webp`);
await base.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`${output}-thumb.webp`);
console.log(`✓ ${output}.webp and ${output}-thumb.webp`);
