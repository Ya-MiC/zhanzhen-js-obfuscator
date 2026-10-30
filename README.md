# 晏銘湛箴 · JS 混淆器

本地優先的 JavaScript 混淆工具（Tauri 2 + Vue 3），全程離線，不上傳任何代碼。晏銘湛箴第一個商業功能。

## 📥 下載

| 平台 | 文件 | 大小 | 說明 |
|------|------|------|------|
| Windows | [zhanzhen-js-obfuscator-v0.1.0.exe](https://github.com/Ya-MiC/zhanzhen-js-obfuscator/releases/download/v0.1.0/zhanzhen-js-obfuscator-v0.1.0.exe) | 5.4 MB | 直接雙擊運行，無需安裝，無需裝 pnpm/Rust |

> 下載後雙擊 `.exe` 即可使用，介面為簡體中文。

---

## 👋 給使用者：如何使用

1. **輸入代碼**：在左側文字框貼上 JavaScript 代碼，或點選「選擇檔案」載入 `.js` / `.mjs` / `.cjs`。
2. **選擇預設**：右側三檔預設：
   - **輕量**：改名 + 壓縮，體積代價最小。
   - **標準**：字符串數組 + 控制流扁平化，適合一般保護需求。
   - **強力**：含死代碼注入，體積與性能代價較大。
3. **開始混淆**：點選「開始混淆」，進度會在背景 Web Worker 運行，介面不會卡頓。
4. **預覽與導出**：混淆完成後預覽結果，輸出檔名並點選「導出檔案」，瀏覽器會下載 `.js` 檔案。
5. **切換主題**：頂部右側按鈕可在四套色票間切換（淺色家族 A、淺色家族 B、深色家族 A、深色家族 B）。

> **誠實聲明**：介面文案寫「混淆」，不承諾「加密」或「無法破解」。混淆可提高逆向難度，絕非不可破解。

---

## 🎨 視覺設計（晏銘湛箴審美體系）

- **兩套色系，四種體系**：家族 A（淺色、愉悅、年輕）與家族 B（淺色、茶色、端莊），各有淺色與深色對應。
- **原色不得更動**：`#B9DDF1` / `#F4DDE7` / `#F8F6EF` / `#CDBFE0`（家族 A）；`#B7C8A8` / `#E8E3CC` / `#CBBF9E` / `#A38E7A`（家族 B）。
- **觸控熱區鐵律**：最小 48×48 CSS px，同一跳轉目的地的元素合併為連續熱區，不留死區。
- **字體**：Noto Sans TC（OFL）、LXGW WenKai（OFL），離線打包，不走 CDN。

---

## 🛠 給開發者：如何提交 PR

歡迎開發者提交 PR！請先閱讀 [`CONTRIBUTING.md`](CONTRIBUTING.md) 了解貢獻規範。

### 快速開始

```bash
# 1. 複製倉庫
git clone https://github.com/Ya-MiC/zhanzhen-js-obfuscator.git
cd zhanzhen-js-obfuscator

# 2. 安裝依賴
pnpm install

# 3. 啟動開發伺服器
pnpm run dev

# 4. 構建前端
pnpm run build

# 5. 構建 Tauri 應用程式
cargo tauri build
```

### 提交 PR 流程

1. Fork 本倉庫到你的帳號。
2. 建立功能分支：`git checkout -b feat/your-feature`
3. 進行開發，確保 `pnpm run build` 通過。
4. 提交 commit：`git commit -m "feat: 簡短說明"`
5. 推送分支：`git push origin feat/your-feature`
6. 在 GitHub 上開啟 Pull Request，描述你做了什麼與為什麼。

### PR 原則

- 所有依賴必須為 MIT / Apache-2.0 / BSD / ISC 等寬鬆授權，禁止 GPL / AGPL / Commons Clause / CC-NC。
- 品牌色原色不得更動。
- 不複製大廠設計文件原文或素材，只採用通用數值與原則。
- 提交前請在 `AGENTS.md` 記錄你的變更與決策。

---

## 📦 技術棧

| 層 | 技術 | 授權 |
|---|---|---|
| 殼層 | Tauri 2 (Rust) | MIT/Apache-2.0 |
| 前端 | Vue 3 + TypeScript + Vite | MIT |
| 混淆引擎 | javascript-obfuscator (Web Worker) | BSD-2-Clause |
| 字體 | Noto Sans TC, LXGW WenKai | OFL |

---

## 🔖 GitHub 標籤（Labels）

倉庫已預置以下標籤，方便分類 Issue 與 PR：

| 標籤 | 顏色 | 用途 |
|---|---|---|
| `bug` | 紅色 | 修復錯誤 |
| `enhancement` | 綠色 | 新功能與改進 |
| `design` | 紫色 | 視覺與審美相關 |
| `docs` | 藍色 | 文件更新 |
| `good first issue` | 淺綠 | 適合新貢獻者的入門任務 |
| `help wanted` | 黃色 | 需要社群協助 |
| `license-review` | 橘色 | 授權合規審查 |
| `breaking` | 黑色 | 破壞性變更 |

---

## 📄 授權

- 軟件本身：**MIT**
- `javascript-obfuscator`：**BSD-2-Clause**（見 `node_modules/javascript-obfuscator/LICENSE`）
- 字體 Noto Sans TC / LXGW WenKai：**SIL OFL 1.1**

---

## 🗺 路線圖

- [x] 階段 1：前端 MVP + Windows .exe 發行（已完成）
- [ ] 階段 2：Rust sidecar 與 Tauri 打包（macOS DMG / Linux AppImage）
- [ ] 階段 3：本地登錄／鎖屏（Argon2id 本地口令，無雲端）
- [ ] 階段 4：手機端（Android / iOS）適配與觸控實測

---

## 📬 聯繫

- GitHub：https://github.com/Ya-MiC
- Issues：https://github.com/Ya-MiC/zhanzhen-js-obfuscator/issues
