# Agent Handoff

## Current state

- Base main SHA: `43ddd7b98a3027ff4b389c7640034928d71360e0`
- Deployed application SHA: `4986f97216fd579cbc349cd39f991be090ea2bb2`
- Current branch: `main`
- Website root: `旅遊指南/`
- Production: `https://ecrssrew22e.github.io/tokyo-trip-2026/旅遊指南/`
- Trip dates: 2026-08-16 through 2026-08-21

## Architecture and data model

- Static HTML/CSS/JS on GitHub Pages; no browser build runtime.
- Shopping directory: Venue → Branch → Brand → Product.
- Shopping research: Source Registry → Crawler → Normalizer → Matcher → Price Observation → Comparison → Curation → static JS.
- Social research stores metadata, short paraphrase, positive/negative signals, confidence, access state and official verification.
- Screen pilgrimage: Work → Appearance → Physical Location → Area → Day.
- `日本行.docx` is the itinerary time source of truth. Never infer suggested stay durations.

## Important files

- `旅遊指南/assets/shopping-v3-data.js`
- `旅遊指南/assets/shopping-price-data.js`
- `旅遊指南/assets/shopping-v3.js`
- `旅遊指南/assets/shopping-directory-data.js`
- `旅遊指南/assets/restaurants.js`
- `旅遊指南/assets/rain-plan.css`
- `scripts/shopping-data/`
- `scripts/social-research/`
- `.github/workflows/research-refresh.yml`
- `旅遊指南/tests/visual/latest-report.json`

## Tooling

- Browser control skill: responsive screenshot, DOM, interaction and console QA.
- Apple Design skill: typography, restrained motion, dialog and reduced-motion guidance.
- Node.js built-ins: dependency-free data processing and tests.
- Codex Security plugin: suggested; installation not confirmed.
- Playwright, axe-core and pixelmatch: reviewed and deferred; see `TOOLING_MANIFEST.md`.

## Known blocked or incomplete sources

- Official merchant homepages returned HTTP 200 but no Product JSON-LD; live crawl found 0 products. Add merchant-specific product URL discovery before claiming live coverage.
- UNIQLO/GU remain `MANUAL_SEED_ONLY` pending stable documented public endpoints.
- Threads, Instagram, Facebook, 小紅書, TikTok and X may be login/search-index restricted. Never upgrade snippets to verified posts.
- 403 / 429 / CAPTCHA / login wall must fail soft and must not be bypassed.

## Current tests

```powershell
node scripts/shopping-data/tests/run-tests.cjs
node scripts/social-research/tests/run-tests.cjs
node 旅遊指南/tests/check-local-links.cjs
node 旅遊指南/tests/validate-shopping-directory.cjs
node 旅遊指南/tests/validate-shopping-v3.cjs
node 旅遊指南/tests/validate-screen-data.cjs
```

Visual report: 90 full responsive checks and 24 required screenshot checks, all PASS. Browser console errors on Shopping: 0.

Production report: GitHub Pages run `31571793278` PASS; 7 public URLs HTTP 200; Shopping and Rain browser QA PASS at 390 / 1440; ANESSA exact-match comparison renders correctly.

## Refresh and deployment

1. Default fixture-safe build: `node scripts/shopping-data/run.cjs` and `node scripts/social-research/run.cjs`.
2. Explicit public live probe only: `node scripts/shopping-data/live-refresh.cjs --live`.
3. Scheduled workflow validates and uploads reports; it does not auto-commit low-confidence findings.
4. After changes: run critical tests, update docs, commit feature, merge main, push, wait for Pages, test 390 / 1440.

## Next recommended action

Before departure, perform P4 verification for trip-date limited goods, stock, temporary closures and event status. For crawler expansion, build one merchant-specific product adapter at a time with fixtures.

## Source trust review — 2026-08-12

- Review branch: `feature/source-trust-perplexity-review-v1` (merged)
- Last successful Codex review: 2026-08-12; 820 claims / 386 source records / 380 canonical sources
- Perplexity status: `PERPLEXITY_USER_ACTION_REQUIRED`
- Integration path checked: environment secret or project bridge; neither is configured
- Accepted secret names (name only, never value): `PERPLEXITY_API_KEY` or `PPLX_API_KEY`
- Remaining conflicts: no unresolved official-vs-official conflict; stock/queue remain volatile, Setagaya Digital Museum currently returns HTTP 500
- Blocked sources: 40 automated requests; blocked is not dead and must be retried manually or with a normal public browser
- P4: open; 59 high-volatility claims remain `CHECK_BEFORE_VISIT`
- Next refresh: immediately before departure on 2026-08-15, then each travel morning for closures, stock, weather-sensitive facilities and events
- Reports: `docs/research/SOURCE_TRUST_AUDIT.md`, `CODEX_RESEARCH_REVIEW.md`, `PERPLEXITY_REVIEW.md`, `RESEARCH_CONFLICTS.md`
