# Screen Pilgrimage V2 — research ledger

Last verified: 2026-08-11
Data owner: `assets/screen-locations-data.js`

## Method

Research followed two passes. Area-driven discovery searched the actual D1–D6 districts first; work-driven expansion then checked other relevant locations for every included title. Inclusion required route relevance plus a source that could support the exact claim shown in the UI. A title may remain in the research pool without becoming a recommended location.

Japanese search patterns included `地名 + アニメ + 舞台`, `地名 + ドラマ + ロケ地`, `地名 + 映画 + 撮影場所`, `地名 + 聖地巡礼`, `作品名 + ロケ地`, `作品名 + 舞台`, `作品名 + フィルムコミッション`, and `作品名 + 公式 マップ`. English discovery used `area + anime pilgrimage` and `area + filming locations`.

## Legacy audit

The former `sceneItems` array contained 24 flat rows: 22 unique works, 24 appearance records and roughly 22 physical places. Every old row now has a `legacyId` on a normalized appearance record. Corrections made during migration:

- KochiKame statues are an `OFFICIAL_PROMOTION_LOCATION`, not an anime model or filming location.
- Odaiba waterfront is one physical location with multiple work relations; it is no longer duplicated as separate places.
- Tokyo Tower / Sailor Moon is retained as `REFERENCE_ONLY` with LOW confidence until an exact scene source is verified.
- Your Name locations use community consensus unless the source explicitly confirms the physical model; an official work page alone does not prove every fan-identified spot.
- Yokohama Conan and Bungo collaborations are labeled official promotion/city association unless a production or Film Commission source confirms exact filming/model use.
- Atami and Taito live-action records use Film Commission evidence and are separated from visual homage.

## Evidence policy

`OFFICIAL` means the work or site owner directly confirms the fact. `PRODUCTION_CONFIRMED` is production-side material. `TOURISM_OFFICIAL` confirms a tourism authority's work/location association. `FILM_COMMISSION_CONFIRMED` supports an actual production record. `VERIFIED_FILMING_LOCATION` is a secondary location record with direct scene evidence. `STRONG_VISUAL_MATCH` and `COMMUNITY_CONSENSUS` remain non-official. `REFERENCE_ONLY` cannot be HIGH confidence and is never displayed as official.

Public social posts are discovery sources. Threads, Instagram, Facebook, TikTok, X and Xiaohongshu material that cannot be read in full is stored with `sourceAccessible: false` and `SEARCH_INDEX_ONLY`; it does not support HIGH evidence. Short excerpts are not copied into the interface.

## Area-driven discovery result

| Day | Search areas | Included examples |
|---|---|---|
| D1 | Ueno, Kameari, Odaiba, Shinjuku/Kabukicho | KochiKame, Nijigasaki, Digimon, Bayside Shakedown, City Hunter |
| D2 | Ikebukuro, Akihabara/Kanda, Roppongi/Shiba | Durarara, IWGP, STEINS;GATE, Love Live!, Saekano, Sailor Moon (reference) |
| D3 | Kamakura, Shichirigahama, Enoshima, Atami | Slam Dunk, Bunny Girl Senpai, Tsuritama, The Girl in the Sun, Sheep in the Box, Spark, Hot Spring Shark |
| D4 | Yotsuya/Shinanomachi, Setagaya, Shibuya | Your Name., Jujutsu Kaisen, silent |
| D5 | Yokohama waterfront | Nigehaji, Bungo Stray Dogs, Bungo BEAST, Conan 2026, Pokémon city installations |
| D6 | Asakusa, Ueno | Tiger & Dragon, Asakusa Kid, Fishbowl Wives, Conan: Dimensional Sniper, Mitsuboshi Colors, Teiichi no Kuni |

## Curation and exclusions

Final curation favors official or Film Commission evidence, recognizable compositions, direct/nearby route relevance and safe public access. Lower-evidence rows can stay in the database but are clearly labeled and can be filtered out.

Excluded or deferred:

- `Weathering With You` — `LOW_EVIDENCE`: route candidates exist, but this pass did not obtain a sufficiently precise official or production source for the proposed places.
- `Tokyo Revengers` — `OUTSIDE_ROUTE`: reliable primary candidates did not align well with the six-day route.
- `The Girl Who Leapt Through Time` at Nakai — `TOO_FAR`: municipality material supports the association, but it is outside the useful route.
- private-residence candidates — `PRIVATE_LOCATION`: not published as navigable recommendations even when community recognition is high.

## Safety and freshness

Each physical location owns access, road, railway, crowd, private-property, tripod and photography fields. High-risk railway/intersection locations explicitly prohibit entering the road or tracks. Residential places emphasize quiet, short stays and no resident photography. Current access rules, events and transport conditions should be rechecked shortly before travel; historical scene identity is stable, but visit conditions are not.

## Validation

Run:

```powershell
node "旅遊指南/tests/validate-screen-data.cjs"
```

The validator checks unique IDs, all work/location/source relations, enums, area/day references, coordinate ranges, legacy migration, and semantic contradictions such as anime models on drama works or HIGH-confidence reference-only rows.
