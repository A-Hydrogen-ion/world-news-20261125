// World News Digest for Wednesday, 25 November 2026 (Node 22, standard library only).
// Copies the verified entry.png asset to /output/entry.png deterministically.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');

const bytes = readFileSync(src);
if (bytes.length === 0 || bytes.length > 1048576) {
  throw new Error(`Invalid entry.png size: ${bytes.length}`);
}

const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error('entry.png must be a valid PNG or JPEG image');
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
