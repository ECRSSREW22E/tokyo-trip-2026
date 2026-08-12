# Source Trust Audit

最後查核：2026-08-12。範圍是網站目前實際讀取的景點、餐廳、購物、限定商品、螢幕場景與 D1–D6 資料；這是可重跑的資料稽核，不是以來源數量代替語意驗證。

## 結果摘要

| 指標 | 數量 |
|---|---:|
| 使用者可見主張 | 820 |
| 原始來源記錄 | 386 |
| Canonical 去重後來源 | 380 |
| 官方目前頁 | 230 |
| 官方歷史頁 | 1 |
| 可讀社群全文 | 41 |
| 編輯／媒體頁 | 34 |
| Redirect | 38 |
| Search-index-only | 1 |
| 自動存取被阻擋／逾時 | 40 |
| 死連結 | 0 |
| HTTP 異常、待人工確認 | 1 |

Claim verdict：303 項 `VERIFIED_CURRENT`、68 項 `CHECK_BEFORE_VISIT`、208 項 `MEDIUM_CONFIDENCE`、106 項 `SOCIAL_ONLY`、135 項 `UNSUPPORTED`。後兩類沒有被自動升級為官方事實。

## 判讀限制

- `BLOCKED` 表示稽核程式遇到 403、429、逾時或反機器人限制，不等於頁面不存在。
- `UNSUPPORTED` 是「目前 Claim ↔ Source 關聯不足」，不一定代表實體不存在；在補到直接證據前不得顯示為已確認。
- 6 組重複 canonical URL 已收斂至 `canonical-source-set.json` 的 380 筆唯一來源，原資料 ID 保留以免破壞現有引用。
- 行程時間的 6 筆主張以《日本行.docx》為唯一標準，不由網路來源覆蓋。

## 已處理來源

- 替換 Yodobashi Akiba、表參道 Hills、SHIBUYA109、JOINUS、KICKS LAB、品川區民公園等失效深層連結。
- SPINNS 改用仍可讀的 SHIBUYA109 官方店鋪頁。
- 2019 橫濱市《文豪 Stray Dogs》資料保存為 `OFFICIAL_ARCHIVE`，只支援歷史合作，不支援目前活動或營業狀態。
- 世田谷數位博物館回應 HTTP 500，維持待人工確認，不把失敗回應當成現行官方證據。

## 產物

- `data/research/claim-inventory.json`
- `data/research/source-inventory.json`
- `data/research/canonical-source-set.json`
- `data/research/source-url-audit.json`
- `data/research/claim-verdicts.json`

