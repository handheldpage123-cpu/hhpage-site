# Changelog

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
