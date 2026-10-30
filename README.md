# 晏銘湛箴 · JS 混淆器

本地優先的 JavaScript 混淆工具（Tauri 2 + Vue 3），全程離線，不上傳任何代碼。晏銘湛箴第一個商業功能。

## 技術棧

- **殼層**：Tauri 2 (Rust)
- **前端**：Vue 3 + TypeScript + Vite
- **混淆引擎**：javascript-obfuscator (BSD-2-Clause)，在 Web Worker 背景運行，避免阻塞 UI
- **打包**：pnpm workspace + Cargo workspace

## 第一版功能

- 貼上代碼或選擇 `.js` 檔案輸入
- 三檔混淆預設：輕量 / 標準 / 強力
- 預覽混淆結果
- 導出混淆後的 `.js` 檔案
- 淺色／深色 × 家族 A／B 四套色票切換
- 48×48 CSS px 觸控熱區（HitArea 工具類）
- 混淆進度與取消

## 授權

- 軟件本身：MIT
- `javascript-obfuscator`：BSD-2-Clause（見 `src-tauri/gen/dist/assets/` 與 `node_modules/javascript-obfuscator/LICENSE`）
- 字體：Noto Sans TC (OFL), LXGW WenKai (OFL)

## 開發

```bash
pnpm install
pnpm run dev      # 開發模式 (需 Tauri CLI)
pnpm run build    # 前端構建 (輸出到 src-tauri/gen/dist)
```

## 設計規範

所有視覺與交互規範請見 `E:\晏銘湛箴\底層架構\`（色卡、總述、設計系統 ZIP）。品牌色原色不得更動。
