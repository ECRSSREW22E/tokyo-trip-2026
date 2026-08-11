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
