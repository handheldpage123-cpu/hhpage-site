// Verifies after `astro build`:
//  1. dist/llms.txt follows the llms.txt format (H1, blockquote summary, H2 sections, "- [title](url): desc" lines)
//  2. every link in llms.txt resolves to a file in dist
//  3. every launch page is listed in llms.txt
//  4. robots.txt allows the AI search crawlers
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const site = 'https://hhpage.com';
let failed = false;
const fail = (m) => { console.error('✗ ' + m); failed = true; };
const ok = (m) => console.log('✓ ' + m);

const txt = readFileSync(join(dist, 'llms.txt'), 'utf8');
const lines = txt.split('\n');
if (!lines[0].startsWith('# ')) fail('llms.txt must start with an H1'); else ok('H1 present');
if (!lines.some((l) => l.startsWith('> '))) fail('llms.txt needs a blockquote summary'); else ok('blockquote summary present');
if (!lines.some((l) => l.startsWith('## '))) fail('llms.txt needs at least one H2 section'); else ok('H2 sections present');

const linkRe = /^- \[([^\]]+)\]\((https?:\/\/[^)]+)\): (.+)$/;
const links = [];
for (const l of lines) {
  if (!l.startsWith('- ')) continue;
  const m = l.match(linkRe);
  if (!m) { fail(`bad list line: ${l}`); continue; }
  links.push(m[2]);
}
ok(`${links.length} list entries well-formed`);

const toFile = (url) => {
  const p = url.replace(site, '');
  const cands = [join(dist, p), join(dist, p, 'index.html'), join(dist, p.replace(/\/$/, ''))];
  return cands.find((c) => existsSync(c) && statSync(c).isFile());
};
for (const u of links) { if (!toFile(u)) fail(`link not in build: ${u}`); }
if (!failed) ok('every llms.txt link resolves in dist');

const launchPages = ['/', '/services/', '/industries/', '/how-we-work/', '/work/', '/about/', '/contact/', '/book/', '/support/'];
for (const p of launchPages) {
  const md = p === '/' ? '/index.md' : p.endsWith('/') ? (['/services/', '/industries/', '/work/', '/blog/'].includes(p) ? `${p}index.md` : `${p.slice(0, -1)}.md`) : p;
  if (!links.includes(site + md)) fail(`launch page missing from llms.txt: ${p} (${md})`);
}
ok('launch pages listed');

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
for (const bot of ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot']) {
  const m = robots.match(new RegExp(`User-agent: ${bot}\\s*\\n\\s*Allow: /`, 'i'));
  if (!m) fail(`robots.txt does not explicitly allow ${bot}`);
}
if (/User-agent: \*\s*\n\s*Disallow: \/\s*$/m.test(robots)) fail('robots.txt blocks everything');
ok('robots.txt allows AI crawlers');

for (const f of ['llms-full.txt', 'sitemap-index.xml', '_redirects', '_headers']) { if (!existsSync(join(dist, f))) fail(`missing ${f}`); }
ok('llms-full.txt, sitemap, _redirects, _headers present');

process.exit(failed ? 1 : 0);
