// gta6-meme-x-01 entry program.
//
// The X post is the entry; the grader reads the post's address from
// /output/POST.json, so this program copies the repository's POST.json
// into the output directory. Nothing else is required of it.
//
// Local run (same shape as the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function handIn(sourceDir: string, targetDir: string): void {
  const raw = readFileSync(join(sourceDir, 'POST.json'), 'utf8');
  const post = JSON.parse(raw) as { url?: unknown };
  if (typeof post.url !== 'string' || !post.url.startsWith('https://')) {
    throw new Error('POST.json must name the post address: {"url": "https://…"}');
  }
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'POST.json'), raw);
}

handIn(process.env.MAKEFUN_BOT_DIR ?? '/bot', process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
