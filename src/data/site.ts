/**
 * Single source of truth for the agency's identity. Every page, every schema
 * block and llms.txt read from here so nothing drifts.
 *
 * Proof points marked `verify` were pulled from the current hhpage.com and
 * need a sign-off before launch (see DECISIONS.md).
 */
export const site = {
  name: 'Hand Held Page',
  shortName: 'HHPage',
  legalName: 'hhpage Inc.',
  url: 'https://hhpage.com',
  tagline: 'Websites and marketing that outperform the big agencies at a fraction of the cost.',
  description:
    'Hand Held Page (HHPage) is a web design and digital marketing agency for dental, orthodontic, medical and tattoo removal practices. Simple, cost-effective websites, SEO, Google Ads, listings and reviews that outperform what larger agencies charge far more for.',
  phone: '+1 (832) 409-0868',
  phoneHref: '+18324090868',
  email: 'support@hhpage.com',
  supportEmail: 'support@hhpage.com',
  serviceArea: 'United States',
  founded: 2011, // verify
  // Primary conversion (Q1): booked strategy call.
  primaryCta: { label: 'Book a strategy call', href: '/book/' },
  secondaryCta: { label: 'See our work', href: '/work/' },
  social: {
    // Fill in before launch. Empty entries are skipped in schema sameAs.
    linkedin: '',
    facebook: '',
    instagram: '',
    googleBusiness: '',
  },
  proof: [
    { value: '100+', label: 'practices served', verify: false },
    { value: '15', label: 'years in healthcare marketing', verify: false },
    { value: '92%', label: 'of clients on page 1 of Google', verify: true },
    { value: '99%', label: 'of projects on time and on budget', verify: true },
  ],
  team: {
    owner: 'Jacob Forbis',
    director: 'Steven Lynch',
    founder: 'Shervin Kalina',
  },
  analytics: {
    ga4: 'G-0GT1QP7FC7',
    gtm: '', // optional; leave blank to load GA4 directly
  },
  equalBrowseScript: 'https://app.equalbrowse.com/panel/js/60d5877ce6/accessibility.js',
  nav: [
    { label: 'Services', href: '/services/' },
    { label: 'Industries', href: '/industries/' },
    { label: 'How we work', href: '/how-we-work/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
  ],
  footerNav: [
    { label: 'Support', href: '/support/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Privacy policy', href: '/privacy-policy/' },
  ],
} as const;

export type Site = typeof site;
