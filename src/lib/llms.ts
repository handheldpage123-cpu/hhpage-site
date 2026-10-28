/**
 * Everything llms.txt, llms-full.txt and the per-page Markdown twins need,
 * built from the same content collections and site data as the HTML pages.
 * Nothing here is hand-written, so it cannot drift from the site.
 */
import { getCollection } from 'astro:content';
import { site } from '@/data/site';

export type LlmPage = {
  path: string; // "/services/seo/"
  mdPath: string; // "/services/seo.md"
  title: string;
  summary: string;
  section: 'Core' | 'Services' | 'Industries' | 'Case studies' | 'Optional';
  body: string; // markdown body
  dateModified?: Date;
};

const abs = (p: string) => `${site.url}${p}`;

function staticPages(): LlmPage[] {
  const facts = [
    `**Name:** ${site.name} (${site.shortName}), legal name ${site.legalName}.`,
    `**What we do:** web design and development, SEO, Google Ads, Google Local Services Ads, listing management, review management, social media management, and website accessibility (EqualBrowse) for practices.`,
    `**Who we serve:** dental, orthodontic, medical and tattoo removal practices across the United States. Fully remote team.`,
    `**Experience:** ${site.proof[1].value} ${site.proof[1].label}; ${site.proof[0].value} ${site.proof[0].label}.`,
    `**Positioning:** simple, cost-effective marketing that outperforms what larger agencies charge far more for. Fixed prices, no long-term contracts on monthly services, clients own their website and data.`,
    `**Contact:** ${site.phone}, ${site.email}. Support seven days a week. Book a call: ${abs('/book/')}.`,
  ].join('\n');

  return [
    { path: '/', mdPath: '/index.md', title: site.name, summary: site.tagline, section: 'Core', body: `${site.description}\n\n## Facts\n\n${facts}` },
    { path: '/how-we-work/', mdPath: '/how-we-work.md', title: 'How we work', summary: 'Fixed prices, no long contracts, you talk to the people doing the work, and you own everything.', section: 'Core', body: `1. A short call (20 minutes) reviewing your site, listings, reviews and ads against competitors.\n2. A written plan with a fixed number.\n3. The people you met do the work; no account-manager layer.\n4. A short monthly report on what moved and what is next.\n\nWe skip brand workshops, bundles, percentage-of-spend ad fees and vanity reports.` },
    { path: '/about/', mdPath: '/about.md', title: 'About Hand Held Page', summary: 'A small remote team that has served 100+ practices for fifteen years.', section: 'Core', body: `Team: ${site.team.owner} (Owner), ${site.team.director} (Director of Operations), ${site.team.founder} (Founder and Advisor).` },
    { path: '/contact/', mdPath: '/contact.md', title: 'Contact', summary: 'Book a call, send a message, or call. Replies within one business day.', section: 'Core', body: `Phone: ${site.phone}\nEmail: ${site.email}\nBook a call: ${abs('/book/')}` },
    { path: '/book/', mdPath: '/book.md', title: 'Book a strategy call', summary: 'Free 20-minute call; we review your practice before we talk.', section: 'Core', body: `Book at ${abs('/book/')} or call ${site.phone}.` },
    { path: '/support/', mdPath: '/support.md', title: 'Client support', summary: 'Existing clients submit website and account support requests here.', section: 'Optional', body: `Support form at ${abs('/support/')}. Urgent: ${site.phone} or ${site.supportEmail}.` },
    { path: '/privacy-policy/', mdPath: '/privacy-policy.md', title: 'Privacy policy', summary: 'How hhpage.com handles submitted information and analytics.', section: 'Optional', body: `See ${abs('/privacy-policy/')}.` },
  ];
}

export async function allLlmPages(): Promise<LlmPage[]> {
  const services = (await getCollection('services', ({ data }) => !data.draft)).sort((a, b) => a.data.order - b.data.order);
  const industries = (await getCollection('industries', ({ data }) => !data.draft)).sort((a, b) => a.data.order - b.data.order);
  const studies = await getCollection('caseStudies', ({ data }) => !data.draft);
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort((a, b) => b.data.datePublished.getTime() - a.data.datePublished.getTime());

  const pages: LlmPage[] = [...staticPages()];
  pages.push({ path: '/services/', mdPath: '/services/index.md', title: 'Services', summary: 'All services with a one-line description each.', section: 'Services', body: services.map((s) => `- [${s.data.shortName}](${abs(`/services/${s.id}/`)}): ${s.data.summary}`).join('\n') });
  for (const s of services) {
    const faqs = s.data.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n');
    pages.push({
      path: `/services/${s.id}/`, mdPath: `/services/${s.id}.md`, title: s.data.title, summary: s.data.summary, section: 'Services', dateModified: s.data.dateModified,
      body: `${s.data.description}\n\n## Outcomes\n\n${s.data.outcomes.map((o) => `- ${o}`).join('\n')}\n\n## What's included\n\n${s.data.includes.map((i) => `- ${i}`).join('\n')}\n\n${s.body ?? ''}${faqs ? `\n\n## FAQ\n\n${faqs}` : ''}`,
    });
  }
  pages.push({ path: '/industries/', mdPath: '/industries/index.md', title: 'Industries', summary: 'Specialties we serve with a playbook for each.', section: 'Industries', body: industries.map((i) => `- [${i.data.shortName}](${abs(`/industries/${i.id}/`)}): ${i.data.summary}`).join('\n') });
  for (const i of industries) {
    const faqs = i.data.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n');
    pages.push({
      path: `/industries/${i.id}/`, mdPath: `/industries/${i.id}.md`, title: i.data.title, summary: i.data.summary, section: 'Industries', dateModified: i.data.dateModified,
      body: `${i.data.description}\n\n## Common problems\n\n${i.data.painPoints.map((p) => `- ${p}`).join('\n')}\n\n${i.body ?? ''}\n\n## Recommended services\n\n${i.data.recommendedServices.map((slug) => `- ${abs(`/services/${slug}/`)}`).join('\n')}${faqs ? `\n\n## FAQ\n\n${faqs}` : ''}`,
    });
  }
  pages.push({ path: '/work/', mdPath: '/work/index.md', title: 'Our work', summary: 'Case studies with before-and-after numbers.', section: 'Case studies', body: studies.length ? studies.map((c) => `- [${c.data.title}](${abs(`/work/${c.id}/`)}): ${c.data.summary}`).join('\n') : 'Case studies are being written up.' });
  for (const c of studies) {
    pages.push({ path: `/work/${c.id}/`, mdPath: `/work/${c.id}.md`, title: c.data.title, summary: c.data.summary, section: 'Case studies', dateModified: c.data.dateModified, body: `${c.data.description}\n\n## Results\n\n${c.data.results.map((r) => `- ${r.metric}: ${r.before} → ${r.after}${r.period ? ` (${r.period})` : ''}`).join('\n')}\n\n${c.body ?? ''}` });
  }
  pages.push({ path: '/blog/', mdPath: '/blog/index.md', title: 'Blog', summary: 'Plain-language notes on practice marketing.', section: 'Optional', body: posts.map((p) => `- [${p.data.title}](${abs(`/blog/${p.id}/`)}): ${p.data.summary}`).join('\n') || 'No posts yet.' });
  for (const p of posts) {
    pages.push({ path: `/blog/${p.id}/`, mdPath: `/blog/${p.id}.md`, title: p.data.title, summary: p.data.summary, section: 'Optional', dateModified: p.data.dateModified, body: `${p.data.description}\n\n${p.body ?? ''}` });
  }
  return pages;
}

export function renderPageMarkdown(p: LlmPage): string {
  const meta = [`Canonical: ${abs(p.path)}`, p.dateModified ? `Last updated: ${p.dateModified.toISOString().slice(0, 10)}` : null].filter(Boolean).join('  \n');
  return `# ${p.title}\n\n> ${p.summary}\n\n${meta}\n\n${p.body.trim()}\n`;
}

export function renderLlmsTxt(pages: LlmPage[]): string {
  const sections: LlmPage['section'][] = ['Core', 'Services', 'Industries', 'Case studies', 'Optional'];
  const out: string[] = [];
  out.push(`# ${site.name}`);
  out.push('');
  out.push(`> ${site.description}`);
  out.push('');
  out.push(`Hand Held Page (HHPage) serves dental, orthodontic, medical and tattoo removal practices across the United States with websites, SEO, Google Ads, Local Services Ads, listing management, review management, social media and accessibility. Positioning: simple, cost-effective, and better than what larger agencies charge far more for. Fixed prices; monthly services are month to month; clients own their website and data. Contact: ${site.phone}, ${site.email}. Full text of every page: ${abs('/llms-full.txt')}.`);
  out.push('');
  for (const sec of sections) {
    const list = pages.filter((p) => p.section === sec);
    if (!list.length) continue;
    out.push(`## ${sec}`);
    out.push('');
    for (const p of list) out.push(`- [${p.title}](${abs(p.mdPath)}): ${p.summary}`);
    out.push('');
  }
  return out.join('\n');
}

export function renderLlmsFull(pages: LlmPage[]): string {
  const head = `# ${site.name}: full site text\n\n> ${site.description}\n\nGenerated at build from the same content as ${site.url}. Index: ${abs('/llms.txt')}.\n\n---\n\n`;
  return head + pages.map((p) => renderPageMarkdown(p)).join('\n---\n\n');
}
