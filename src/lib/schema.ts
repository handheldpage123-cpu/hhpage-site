import { site } from '@/data/site';

/** JSON-LD builders. Every page gets Organization + WebSite via the layout; page types add their own. */

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

export function organization() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description,
    telephone: site.phoneHref,
    email: site.email,
    areaServed: { '@type': 'Country', name: 'United States' },
    foundingDate: String(site.founded),
    knowsAbout: ['Dental marketing', 'Orthodontic marketing', 'Medical practice marketing', 'Tattoo removal marketing', 'SEO', 'Google Ads', 'Web design', 'Review management', 'Listing management'],
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', telephone: site.phoneHref, email: site.supportEmail, availableLanguage: 'en' }],
  };
}

export function website() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: site.url, name: site.name, publisher: { '@id': ORG_ID } };
}

export function webPage(opts: { url: string; name: string; description: string; datePublished?: Date; dateModified?: Date; type?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    ...(opts.datePublished ? { datePublished: opts.datePublished.toISOString() } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified.toISOString() } : {}),
    inLanguage: 'en-US',
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function service(opts: { url: string; name: string; description: string; audience?: string }) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
    ...(opts.audience ? { audience: { '@type': 'Audience', audienceType: opts.audience } } : {}),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function person(opts: { name: string; role: string; url: string; sameAs?: string[] }) {
  return {
    '@type': 'Person',
    '@id': `${opts.url}#person`,
    name: opts.name,
    jobTitle: opts.role,
    worksFor: { '@id': ORG_ID },
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
  };
}

export function article(opts: { url: string; headline: string; description: string; datePublished: Date; dateModified: Date; authorName: string; authorUrl: string }) {
  return {
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished.toISOString(),
    dateModified: opts.dateModified.toISOString(),
    author: { '@type': 'Person', name: opts.authorName, url: opts.authorUrl },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: opts.url,
  };
}

/** Wrap graph nodes into one JSON-LD document. */
export function graph(...nodes: (object | null | undefined)[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
