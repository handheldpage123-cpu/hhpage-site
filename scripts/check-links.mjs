// Internal link check over dist: every href/src that starts with "/" must exist.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist = 'dist';
const htmlFiles = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && htmlFiles.push(p); } })(dist);
const re = /(?:href|src)="(\/[^"#?]*)/g;
const missing = new Map();
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(re)) {
    const p = m[1];
    if (p.startsWith('//')) continue;
    const cands = [join(dist, p), join(dist, p, 'index.html'), join(dist, p.replace(/\/$/, '') + '.html')];
    if (!cands.some((c) => existsSync(c) && statSync(c).isFile())) missing.set(p, (missing.get(p) ?? []).concat(f));
  }
}
if (missing.size) { for (const [p, fs] of missing) console.error(`✗ ${p}  (from ${fs[0]}${fs.length > 1 ? ` +${fs.length - 1}` : ''})`); process.exit(1); }
console.log(`✓ ${htmlFiles.length} pages, all internal links resolve`);
