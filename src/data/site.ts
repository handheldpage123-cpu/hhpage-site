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
  tagline: 'Simple, transparent websites and marketing for practices.',
  description:
    'Hand Held Page (HHPage) is a Texas-based web design and digital marketing agency for dental, orthodontic, medical and tattoo removal practices. Websites, SEO, Google Ads, listings and reviews, kept simple, priced fairly, and never upsold.',
  phone: '+1 (832) 409-0868',
  phoneHref: '+18324090868',
  email: 'support@hhpage.com',
  supportEmail: 'support@hhpage.com',
  serviceArea: 'United States',
  basedIn: 'Texas',
  supportHours: 'Monday to Friday, 8am to 5pm Central',
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
  // Two more proof points are planned once current numbers are pulled (DECISIONS.md follow-up).
  // Suggested: "x% of clients in the Google map pack" and "x new patient requests tracked last year".
  proof: [
    { value: '100+', label: 'practices served', verify: false },
    { value: '15', label: 'years in healthcare marketing', verify: false },
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
