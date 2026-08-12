# Shopping Research Data Pipeline

```text
SOURCE → CRAWLER → NORMALIZER → MATCHER → PRICE HISTORY
       → COMPARISON → CURATION → STATIC WEBSITE DATA
```

## Run

```powershell
node scripts/shopping-data/run.cjs
node scripts/shopping-data/tests/run-tests.cjs
node scripts/social-research/run.cjs
node scripts/social-research/tests/run-tests.cjs
```

The default run uses checked-in registry records and fixtures. Live network fetching must be explicit, public-only and rate-limited. Raw HTML belongs in a local cache or workflow artifact, never in the repository.

Explicit live probe: `node scripts/shopping-data/live-refresh.cjs --live`.

The 2026-08-12 probe reached 8 official merchant entry pages with HTTP 200, but those landing pages exposed no Product JSON-LD. The report therefore records 0 live products; fixture-backed normalized and comparison data remain separate and must not be described as a live merchant crawl.

## Stages

1. Registry records official merchant URLs, access mode, robots/terms review and supported identifiers.
2. Crawler prefers official API → public JSON → JSON-LD → static HTML → sitemap → browser → manual.
3. Normalizer handles width, whitespace, aliases, size units, pack count and variants.
4. Matcher uses JAN → official SKU → exact brand/name/variant → normalized name/size → fuzzy candidate.
5. Price history appends observations and computes first/last/low/high for the observed dataset only.
6. Comparison allows direct percentages only for `EXACT` or evidence-backed `HIGH_CONFIDENCE` records.
7. Curation emits only trip-relevant, source-backed records to `旅遊指南/assets/shopping-price-data.js`.

## Failure policy

- 403: `BLOCKED`
- 429: `RATE_LIMITED`, respect Retry-After/backoff
- Login wall: `LOGIN_REQUIRED`
- CAPTCHA: `CAPTCHA_BLOCKED`
- Parsing failure: retain source metadata, set `needsVerification`, do not publish as confirmed

No CAPTCHA, login, MFA, fingerprint or rate-limit bypass is permitted. Cookies, tokens and sessions must never be committed or placed in public Actions caches.

## Delta refresh

Use ETag, Last-Modified and source hash. Unchanged extraction skips normalization and downstream comparison. High-volatility sources refresh more often than product prices and stable brand metadata.

## Debug

1. Inspect `data/reports/latest-refresh.json`.
2. Check merchant status and access mode.
3. Run fixture tests before a live retry.
4. Compare source hash and parser version.
5. Downgrade to `MANUAL_ONLY` when official public access is no longer reliable.

## Publishing gates

- Auto-publish: official verified facts, exact/high-confidence price matches, fact-safe high-confidence social summaries.
- Manual verification: limited goods, stock, login-restricted social content and any fuzzy match.
