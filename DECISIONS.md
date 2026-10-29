# Decisions

Record of choices that are not obvious from the code, with their status. Questions numbered as in the build prompt (Draft v3) and the Rebuild Console.

## Settled

- **Stack:** Astro, static output, TypeScript strict, plain CSS with custom properties (Q8). No Tailwind.
- **Hosting:** Cloudflare, account shervin@hhpage.com, connected to this GitHub repo. Steven controls DNS and the registrar (Q10).
- **Theme:** light and dark, following the visitor's setting (Q11). Tokens from the proposal palette. Orange buttons use dark ink text (contrast rule).
- **Primary conversion:** booked strategy call via `/book/` (Q1). Secondary: contact form, phone.
- **Audience:** practice owners in dental, orthodontic, medical and tattoo removal (Q2).
- **Positioning (revised 2026-10-29 from Steven's review):** simple, transparent, priced fairly, never upsold. Do NOT claim to be cheaper than other agencies. Lay out performance and the competitive picture and let the client decide.
- **Services sold:** websites, SEO, Google Ads (with Local Services Ads folded in; no separate LSA page, old URL 301s to Google Ads), listing management, review management, social media, accessibility/EqualBrowse.
- **Essentials plan:** website hosting and management + listing management + reviews displayed on the site (page + pop-up widget) + EqualBrowse, one monthly fee. Google Ads and advanced review management (requests, monitoring, responses) priced separately. No prices shown on the site yet.
- **Pricing language:** projects quoted up front; custom work beyond scope (e.g. extra content) billed hourly, agreed in advance. Monthly services month to month; optional 12-month term can reduce or waive the website dev fee (then month to month). Dev fee can also be paid up front or spread over 12 months. Google Ads: one-time setup fee (waived with 6-month commitment), monthly management fee as a % of spend with tier minimums; described, never priced, on the site.
- **Support hours:** Monday to Friday, 8am to 5pm Central. No after-hours or weekend support. (Was "seven days a week"; corrected everywhere.)
- **Location:** based in Texas, no public street address; serves the US. Organization schema carries addressRegion TX only.
- **Strategy call:** may include a short presentation of where the client stands (example: proposals.hhpage.co/smile-solutions/). "No deck" language removed.
- **CRM:** we do not wire into or manage client CRMs; we build forms, booking and tracking to work with their systems.
- **Call tracking:** Google's own call reporting inside Google Ads. Dynamic number tracking available on request, not standard.
- **SEO scope:** content built right at launch, then left alone unless performance stalls; GBP managed; business info syndicated to directories (not claimed); technical audit at launch and twice a year; blog/content marketing is a separate future product.
- **Design:** clean and simple on the client's logo, colors and brand; not an over-designed showcase. Say so on the site.
- **Reporting:** monthly performance reporting only.
- **Google Ads strategy (review round 2):** gateway services first for practices that need volume; high-margin/specialty once the schedule is full. New account per client inside the HHPage MCC by default. Ads point at service pages (built to serve SEO and ads); dedicated landing pages only as needed.
- **Listings (round 2):** manage GBP directly; syndicate practice info to directories (never name the syndication vendor on the site); do not claim Apple/Yelp/Facebook as a matter of course; provider listings priced separately.
- **Reviews (round 2):** Basic = reviews page + corner pop-up widget (in Essentials). Advanced = the WhyILike platform: requests by text/email, central inbox, responses, sharing to social/GBP, optional gatekeeping flow. Never name WhyILike on the site unless Steven says so.
- **Social media (round 2):** currently outsourced. Page kept but `featured: false`: not on the home grid or footer, shown "On request" on the services index.
- **Accessibility (round 2):** the site is designed to WCAG 2.2 AA; the widget helps patients use it and does not by itself make a site compliant. Copy says so.
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

- **Proof points:** "92% page 1" and "99% on time" removed 2026-10-29 as outdated. Two placeholder slots noted in `site.ts`; FOLLOW-UP: pull current numbers (e.g. map-pack share, patient requests tracked) and add them back.
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

- See COMPETITORS.md: specialty pages under each industry, a free "practice visibility check" secondary CTA, a founder/team voice block on home, Google Partner badge and review count if available, and 2–3 named case studies before launch.

- Cloudflare project + launch checklist (prompt Phase 7, 12 items).
- GHL: contact and support workflows (inbound webhook → pipeline → notification to support@hhpage.com), calendar, tracking number. Monday support queue optional later.
- Headless CMS for the blog.
- Self-hosted fonts, OG image generation, image pipeline for headshots/case studies.
- Bing Webmaster Tools + IndexNow at launch.
