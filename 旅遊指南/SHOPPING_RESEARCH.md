# Shopping Guide research ledger

Last verified: 2026-08-11

## Research order

1. Use 2025–2026 public community posts to discover purchases, repeats, price comparisons and regrets.
2. Treat each platform as one signal, not one vote per post. Search-index snippets are never promoted to full evidence.
3. Search an opposing view for high-interest items: poor fit, Taiwan availability, weak price advantage, shelf life, voltage or warranty.
4. Verify names, specifications, store type and current operating facts with official product/store pages.
5. Score usefulness for this exact D1–D6 route, then assign S/A/B/C. Viral interest alone cannot create an S tier.

## Recommendation score

| Dimension | Weight |
|---|---:|
| Social popularity | 25 |
| Independent recommendation frequency | 20 |
| Japan exclusivity / price advantage | 20 |
| Product usefulness | 15 |
| Availability on route | 10 |
| Recent trend | 10 |

`communityConsensus`, `socialConfidence` and `factConfidence` remain separate fields. A popular product can still have low fact confidence or be marked `TRENDING BUT OPTIONAL`.

## Data ownership

- `assets/shopping-data.js` is the single source of truth for items, places, districts, D1–D6 strategy, source records and comparisons.
- Social sources discover demand; official URLs verify facts.
- Inaccessible Threads, Instagram, Xiaohongshu and TikTok pages are stored as `sourceAccessible: false` with `search-index evidence only`.
- Changing prices, campaigns, stock, tax-free service and 2026 pop-ups use `needsVerification: true` and must appear as `CHECK BEFORE VISIT` in the UI.

## Legacy list audit

- Original entries: 36
- Retained: 28
- Removed after re-evaluation: 5
- Merged duplicates: 3
- Added after research: 22
- New database: 50 items, of which 45 are CORE PICKS

The UI continues to use `tokyo-trip-shopping-list-v1`. Legacy aliases are migrated without clearing unknown saved IDs.

## Store classification

`DEPARTMENT_STORE`, `DRUGSTORE`, `BEAUTY_SELECT`, `DISCOUNT_STORE`, `URBAN_SHOPPING`, `ELECTRONICS`, `SPECIALTY_STORE`, `SPECIALTY_MALL` and `LOCAL_SHOPPING` are intentionally distinct. In particular, @cosme TOKYO and Don Quijote are not labelled as pharmacies, while PARCO, LUMINE and Tokyu Plaza are not labelled as department stores.

## Store Directory V2

The normalized directory is authored in `assets/shopping-directory-data.js` and aggregated by `assets/shopping-data.js` into the existing `window.TokyoShoppingData` contract. The relationship is:

`shoppingVenues` → contains `shoppingBranches` → belongs to `shoppingBrands` → relates to `shoppingItems`.

- A brand appears once even when it has several route branches.
- `OPEN` requires a current official venue/store source. Unresolved tenant records are `CHECK_BEFORE_VISIT`; they are not silently treated as open.
- Official tenant pages establish existence. Social reports only affect traveller strategy and popularity signals.
- Unknown popularity dimensions remain `null`; the UI does not manufacture numeric scores.
- Product records are not bulk rewritten. `brandId`, `recommendedBranchIds` and `recommendedVenueIds` are added by the aggregation layer when a reliable alias exists.
- `tokyo-trip-shopping-list-v1` remains unchanged.

Run `node 旅遊指南/tests/validate-shopping-directory.cjs` before integration. It checks record counts, duplicate IDs, enum values, relation IDs, trip days, source IDs, product relations and branch status values.
# D4 Fashion Shopping V2 audit — 2026-08-11

## Baseline and decision rule

- Baseline at `ca5e7b4`: 44 venues, 117 brands, 216 branch relations.
- D4 baseline: 11 venues, 49 unique brands, 60 branch relations.
- Reuse the normalized Venue → Branch → Brand → Product system. No second fashion database.
- Official brand, store-locator and venue tenant pages establish existence, address and branch status. Social/editorial material may only influence trend, visit experience and discovery.
- A search-index-only social result is not treated as a completed field report or branch-status source.

## D4 audit findings

- Takeshita Street had no route node, so affordable youth results could not be separated from the rest of Harajuku.
- Existing D4 branches inherited broad venue-level route and time values; they could not answer which part of the walk a store belongs to.
- `FASHION`, `DESIGNER` and `STREETWEAR` were too coarse for decision-making. D4 V2 adds controlled fashion category, intent, age style, audience and price-position fields.
- The former Laforet group (`UNDERCOVER`, `WEGO`, `SPINNS`, `atmos`, `KICKS LAB.`) was not supported by the current official Laforet directory. It was replaced by the currently verified Angelic Pretty tenant; the closed SPINNS Takeshita branch is retained only as a closure source and is never recommended.
- Representative current branches were selected by route value, not store-count maximization: WEGO / ACDC RAG / H&M, RAGTAG / 2nd STREET, Stüssy / Supreme / XLARGE, atmos / adidas, sacai, ZARA and verified existing mall tenants.

## D4 research ledger

- Official venue: Takeshita Street merchant list, Laforet, SHIBUYA109.
- Official branch / locator: WEGO, ACDC RAG, RAGTAG, 2nd STREET, sacai, H&M, ZARA, Stüssy, Supreme, XLARGE, atmos and adidas.
- Current correction evidence: SPINNS Harajuku Takeshita closure notice; atmos pink July 2026 relocation notice.
- Fashion/editorial signals: FASHIONSNAP Harajuku street snap and current Harajuku select-shop editorial.
- Public social notes are explicitly subjective; Stüssy queue/stock discussion is used only to warn that stock and chapter items cannot be guaranteed.
