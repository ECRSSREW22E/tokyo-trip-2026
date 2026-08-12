# Tasks

## P0 — Visual Regression

- DONE: Rain Plan Hero uses separate safe copy and media regions.
- DONE: 15 pages × 6 viewports; 90 collision/overflow/image checks, zero failures.
- DONE: Screenshot QA for Homepage, Rain, Shopping, Restaurants, Checklist and Screen at 375 / 390 / 430 / 1440.
- DONE: Product, Brand, Venue and Place dialogs stay inside 390px viewport, scroll internally, keep close control visible and lock body scroll.

## P1 — Shopping Price Pipeline

- DONE: 10-merchant source registry and access policy.
- DONE: Public JSON-LD/static HTML crawler with explicit live mode and fail-soft states.
- DONE: NFKC/size normalization, JAN/SKU matching, unit comparison and price history metrics.
- DONE: FX record, Taiwan exact comparison gate, curated frontend output and fixture tests.
- BLOCKED: Merchant homepages expose no Product JSON-LD; product/detail URL discovery requires merchant-specific adapters.

## P2 — Continuous Social Research

- DONE: Source registry, metadata-only extraction, canonical URL/source hash deduplication.
- DONE: Confidence and official verification publishing gate.
- DONE: Dcard/PTT public candidates plus SEARCH_INDEX_ONLY handling for restricted platforms.
- TODO: Continue entity-level searches; never publish platform snippets as verified posts.
- DONE: Six-family scheduled query rotation, previous-query echo prevention and negative / limited / price / first-visit coverage.
- DONE: Perplexity trigger policy and fail-soft unavailable state; integration itself remains user action required.

## P3 — Shopping Website Integration

- DONE: `shopping-price-data.js` generated and loaded without changing `tokyo-trip-shopping-list-v1`.
- DONE: Exact-match price advantage, match type and verification date appear in Product Detail.
- DONE: Only curated, route-relevant exact comparison is exposed to the site.

## P4 — Pre-trip Verification

- TODO: Recheck seasonal overlap, stock, temporary closures and event status before 2026-08-16.
- TODO: Keep uncertain facts as `CHECK_BEFORE_VISIT`.
- DONE: 2026-08-12 official recheck identified D5 Yokohama MORE’S closure and verified current major seasonal events.
- TODO: Recheck the remaining 59 high-volatility claims immediately before departure; P4 is not complete.

## P5 — Source / Tool Maintenance

- DONE: Tool security review and manifest.
- DONE: Scheduled fixture-safe delta validation and report artifacts.
- TODO: Review source adapters and blocked sources before each major refresh.
- DONE: Claim/source inventory, canonical-source normalization, URL status audit, verdict engine and hard validation gates.
