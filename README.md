# hhpage.com

Hand Held Page (HHPage) agency website. Static [Astro](https://astro.build) site, versioned here, deployed to Cloudflare from this repository.

## Run it

```bash
nvm use            # Node 22 (see .nvmrc)
npm ci
cp .env.example .env   # fill in GHL webhook/calendar URLs for local testing (optional)
npm run dev        # http://localhost:4321
```

## Build and verify

```bash
npm run build         # static output in dist/
npm run check:llms    # llms.txt format, links, launch pages, robots.txt
npm run check:links   # every internal link in dist resolves
npm run verify        # all three
```

CI runs `verify` on every pull request.

## Where things live

| What | Where |
|---|---|
| Site identity, contact, proof points, nav, analytics IDs | `src/data/site.ts` |
| Design tokens (colors, type, spacing; light + dark) | `src/styles/tokens.css` |
| Global CSS and shared component classes | `src/styles/global.css` |
| Content (services, industries, case studies, team, FAQs, posts) | `src/content/**` — schema in `src/content.config.ts` |
| Pages and routes | `src/pages/**` |
| JSON-LD schema builders | `src/lib/schema.ts` |
| llms.txt / llms-full.txt / per-page `.md` twins | `src/lib/llms.ts` + `src/pages/llms*.ts` + `src/pages/[...path].md.ts` |
| Redirects, edge headers (CSP), robots | `public/_redirects`, `public/_headers`, `public/robots.txt` |
| Lead forms → GoHighLevel webhook | `src/components/LeadForm.astro` |

## Deploy

Cloudflare, connected to this repo: PRs get a preview URL, merges to `main` deploy production. Build command `npm run build`, output `dist`. Environment variables from `.env.example` are set in the Cloudflare project. See `DECISIONS.md` for the launch checklist status.

## Conventions

- `main` is protected. Work on `feat/*` branches, open a PR, CI must pass.
- Every page's copy lives in content collections or `site.ts`, never hard-coded in a component.
- Every content entry carries `summary` (one sentence for llms.txt), `description` (meta), `dateModified`, and `targetQuestions`.
- Keep changes in `CHANGELOG.md`; record non-obvious choices in `DECISIONS.md`.
