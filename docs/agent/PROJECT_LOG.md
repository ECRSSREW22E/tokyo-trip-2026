# Tokyo Trip 2026 — Agent Project Log

本文件只允許附加新紀錄，不回寫或改寫歷史。`requested`、`local pass`、`deployed`、`production pass` 必須分開記錄。

## 2026-08-12T11:10:32+08:00 — Shopping Guide V3 + Typography

- Agent: Codex
- Task: Shopping Guide V3、第一次日本購物指南與全站字體重整
- Original requirement: 建立具體商品、台日價格比較、限定證據、初次購物決策並修正字體與建議停留顯示
- Base branch / SHA: `main` / `f43b200`
- Research: 10 件商品、官方台日價格、限定商品、公開社群實買訊號
- Sources: 19 筆 V3 來源（15 官方、4 公開社群）
- Files added: `shopping-v3-data.js`、`shopping-v3.js`、`validate-shopping-v3.cjs`
- Files modified: Shopping、Sources、全站 typography、D1–D6 購物提示、停留建議 renderers
- Data changes: 10 shop types、10 products、7 venues、D1–D6 notes
- Tests: 54 HTML / 682 links、shopping schemas、390 / 1440 production browser QA
- Feature commit: `6b07cf3`
- Merge commit: `642bb10`
- Final main SHA: `8a6a10e`
- GitHub Pages status: deployed
- Production test: PASS；購物頁、D1–D6、來源頁、390 / 1440
- Known issues: Rain Plan Hero 尚需獨立 visual regression hard pass；價格資料仍為人工策展而非可重跑 pipeline
- Next task: Shopping Research Pipeline V1

## 2026-08-12 — Shopping Research Pipeline V1（IN PROGRESS）

- Agent: Codex
- Task: 建立可持續比價／社群研究／視覺 QA／交接系統
- Original requirement: MASTER DEVELOPMENT PROMPT V4
- Base branch / SHA: `main` / `8a6a10e`
- Feature branch: `feature/shopping-research-pipeline-v1`
- Status: implementation complete; deployment pending

## 2026-08-12 — Shopping Research Pipeline V1 implementation complete

- Agent: Codex
- Task: MASTER DEVELOPMENT PROMPT V4 research pipeline, Rain P0 and website integration
- Base branch / SHA: `main` / `8a6a10ee44d1b17e8ee7b8e0da2f4488fabed50c`
- Research: 10 merchant records; 8 public live probes; Dcard/PTT records; restricted-platform policy; UI QA tool review
- Data changes: 4 normalized fixture products, 4 observations, 1 exact comparison, 1 unit comparison, 4 deduplicated social candidates
- Tests: shopping/social unit tests PASS; 54 HTML / 683 links PASS; directory, Shopping V3 and Screen schemas PASS; 90 responsive checks PASS; 24 screenshot checks PASS; interactions PASS; console errors 0
- Live probe: 8 official entry pages HTTP 200, 0 Product JSON-LD products; no data inferred
- Feature commit: PENDING
- Merge commit: PENDING
- Final main SHA: PENDING
- GitHub Pages status: PENDING
- Production test: PENDING
- Known issues: merchant-specific adapters required; login-restricted sources remain SEARCH_INDEX_ONLY; pre-trip stock/event recheck remains P4
- Next task: commit, merge, deploy and production QA

## 2026-08-12 — Shopping Research Pipeline V1 deployment

- Agent: Codex
- Feature commit: `677970c`
- Merge commit / deployed application SHA: `2b7071ab2a5cd8b789e6bf72aa6aaa108e8eb758`
- GitHub Pages run: `31571793278`
- GitHub Pages status: PASS
- Production HTTP: 7 checked URLs returned 200, including Shopping, Rain, Restaurants, Checklist, Screen and price data
- Production browser QA: PASS at 390 and 1440; no overflow, broken images or console errors
- Production interaction: ANESSA detail shows `EXACT · EXACT_MATCH`, NT$326 / 34% verified comparison
- Local / remote equality at application deploy: PASS
- Known warning: GitHub Pages build reports Node.js 20 action-runtime deprecation but deploy completes successfully
- Next task: P4 pre-trip stock, limited item, closure and event verification
- Status: IN_PROGRESS；不得視為已完成或已部署
