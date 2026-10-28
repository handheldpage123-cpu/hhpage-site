# Decisions

Record of choices that are not obvious from the code, with their status. Questions numbered as in the build prompt (Draft v3) and the Rebuild Console.

## Settled

- **Stack:** Astro, static output, TypeScript strict, plain CSS with custom properties (Q8). No Tailwind.
- **Hosting:** Cloudflare, account shervin@hhpage.com, connected to this GitHub repo. Steven controls DNS and the registrar (Q10).
- **Theme:** light and dark, following the visitor's setting (Q11). Tokens from the proposal palette. Orange buttons use dark ink text (contrast rule).
- **Primary conversion:** booked strategy call via `/book/` (Q1). Secondary: contact form, phone.
- **Audience:** practice owners in dental, orthodontic, medical and tattoo removal (Q2).
- **Positioning:** simple, cost-effective, outperforms larger agencies; agencies over-complicate so they can charge more. Woven through home, how-we-work, services.
- **Services sold:** websites, SEO, Google Ads, Local Services Ads, listing management, review management, social media, accessibility/EqualBrowse (service-list flag resolved).
- **Years:** "15 years in healthcare marketing" (years flag resolved). The old site's "21 years" is retired.
- **Forms:** native Astro forms posting JSON to GoHighLevel inbound webhooks (Q15). No GHL iframes or scripts. Mailto fallback until the webhook URLs are set in Cloudflare.
- **Calendar:** GHL calendar embedded on `/book/` (Q16), lazy-loaded, only when `PUBLIC_GHL_CALENDAR_URL` is set.
- **Call tracking:** one tracking number for now (Q17); number pool is a later option.
- **Chat widget:** none (Q18).
- **Office address:** none public; fully remote; no LocalBusiness/address schema (Q13).
- **EqualBrowse:** installed on every page, deferred (Q14).
- **GA4:** G-0GT1QP7FC7 loaded after `load`; this setup is meant to become the standard for future GA4 setups (Q12). GTM optional via `site.analytics.gtm`.
- **Brand:** "Hand Held Page" as site name and Organization name, "HHPage" as alternate. Logo unchanged. Rebrand likely 2027 (Q22) — follow-up.
- **Blog:** content collections in the repo for Phase 1; headless CMS (Keystatic proposed) layered on in Phase 2 (Q23).
- **Copy:** Claude drafts, Steven edits (Q20). Everything in `src/content` and `site.ts` is draft.
- **Search Console / GA4 access:** Steven will grant read access (Q19) so the redirect map can be checked against real traffic.
- **AI visibility tracking (Q24):** start with a monthly manual run of 10–15 questions against ChatGPT, Perplexity, Google AI Mode; tool later.
- **Launch target:** 2026-12-15, may move (Q25).
- **Schema:** no self-serving AggregateRating/Review markup for HHPage's own reviews; reviews shown visually only.
- **Self-serving `astro check`:** not in CI yet; `@astrojs/check` needs install approval. Build + llms + link checks run instead.

## Needs sign-off before launch

- **Proof points marked `verify` in `site.ts`:** "92% of clients on page 1 of Google" and "99% of projects on time and on budget" came from the old site. Confirm or drop.
- **Founding year** in `site.ts` (2011, derived from "15 years"). Confirm.
- **Redirects for `/billing/`, `/ach/`, `/ach-payment/`:** old site pages that clients may still use. Currently 302 to `/support/`. Decide: keep as pages, move to GHL, or confirm redirect.
- **Privacy policy:** draft text; migrate the approved policy.
- **Case studies:** placeholder only (draft, not built). Need real clients, numbers, quotes.
- **Team page:** headshots and LinkedIn URLs if wanted.
- **Social links** in `site.ts` for schema `sameAs`.
- **OG image:** `/og-default.png` referenced, not yet created. Add a 1200×630 image to `public/`.
- **Logo:** `/logo.png` referenced in Organization schema; add to `public/`.
- **Fonts:** Google Fonts for Phase 1. Self-hosted subset (prompt requirement) is a Phase 2 task; CSP already allows both.
- **CSP** in `_headers` allows GHL (`leadconnectorhq.com`, `msgsndr.com`) and EqualBrowse domains; confirm against the real embed/webhook hosts before enabling.

## Phase 2 / 3

- Cloudflare project + launch checklist (prompt Phase 7, 12 items).
- GHL: contact and support workflows (inbound webhook → pipeline → notification to support@hhpage.com), calendar, tracking number. Monday support queue optional later.
- Headless CMS for the blog.
- Self-hosted fonts, OG image generation, image pipeline for headshots/case studies.
- Bing Webmaster Tools + IndexNow at launch.
