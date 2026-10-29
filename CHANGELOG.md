# Changelog

## Unreleased — copy revisions from review round 2 (2026-10-29)

- Google Ads: gateway-services strategy section, clean account per client, service pages as landing pages, call-tracking FAQ.
- Listing management: GBP managed + syndication; no per-directory claiming; provider listings as an add-on.
- Review management: basic vs advanced plans, gatekeeping flow.
- Social media: `featured: false`, hidden from home and footer, "On request" on the services index.
- Accessibility: standards-first framing; widget is a usability aid.

## Unreleased — copy revisions from review round 1 (2026-10-29)

- Positioning reframed: transparent and fairly priced, no "cheaper than agencies" claims.
- Support hours corrected to Mon–Fri 8–5 Central; based in Texas.
- Old-site stats (92%, 99%) removed; proof bar now two stats with placeholders noted.
- Local Services Ads folded into the Google Ads page; `/services/local-services-ads/` 301s there.
- Essentials plan described (no prices). Contract and dev-fee language updated.
- Websites page: no CRM-wiring claims; simple-design stance; handover language.
- SEO page: zero-click framing, syndication not claiming, twice-yearly audits, content left alone after launch.
- Google Ads page: Google call tracking only; fees described not priced.
- Review management: reviews page + pop-up widget called out; Essentials vs advanced.
- CTA and book page: short presentation on the call; "no deck" removed.

## Unreleased — Phase 1: structure with draft copy (2026-10-28)

- Astro 7 scaffold, TypeScript strict, plain CSS with design tokens (light + dark).
- Layout, header with mobile nav, footer, CTA band, proof bar, FAQ accordion, breadcrumbs.
- Content collections with Zod schemas: services (8), industries (4), team (3), FAQs (5), case studies (1 placeholder, draft), posts (1 draft).
- Pages: home, services index + 8 detail, industries index + 4 detail, how we work, work, about, contact, support, book, blog index + post, privacy policy, 404.
- Native lead forms (contact, support) posting JSON to GoHighLevel inbound webhooks; mailto fallback until configured.
- GA4 loaded after page load; conversion events `book_call_click`, `form_submit`, `phone_click`, `email_click`.
- EqualBrowse accessibility widget, deferred.
- JSON-LD: Organization/ProfessionalService, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Person, Article, ContactPage.
- `@astrojs/sitemap`, robots.txt allowing AI search crawlers, `llms.txt`, `llms-full.txt`, Markdown twin of every key page, `<link rel="alternate" type="text/markdown">`.
- `_redirects` from the old WordPress URLs; `_headers` with HSTS, CSP, caching.
- CI: build, llms.txt checks, internal link check. Dependabot (PRs only). CODEOWNERS.
