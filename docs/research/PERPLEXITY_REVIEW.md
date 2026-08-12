# Perplexity Second-pass Review

狀態：`PERPLEXITY_USER_ACTION_REQUIRED`

Codex First Pass 完成後，已檢查專案工具、外掛與環境變數名稱。此環境沒有 Perplexity MCP／外掛／project bridge，也沒有 `PERPLEXITY_API_KEY` 或 `PPLX_API_KEY`。因此本輪沒有聲稱做過 Blind Review 或 Adversarial Review。

| 指標 | 結果 |
|---|---:|
| Queries run | 0 |
| Languages | 0 |
| Original URLs returned | 0 |
| Unique URLs | 0 |
| Shared with Codex | 0 |
| Perplexity-only | 0 |
| Claims disproved / strengthened | 0 / 0 |

接入時只能設定上述其中一個 secret 名稱，不得把值寫入 repository。Pipeline 已採 fail-soft：未設定、quota、timeout、auth 或 rate limit 時回報 `PERPLEXITY_UNAVAILABLE`／`PERPLEXITY_USER_ACTION_REQUIRED`，Codex 與官方來源流程仍可完成。啟用後應只對新實體、低信心、衝突、高波動、重大價格變化、重要限定品、死來源及缺官方驗證項目觸發。

