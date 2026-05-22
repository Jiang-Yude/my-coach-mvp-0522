# 江江教練官網 v0.7 大雜燴 MVP

🌐 線上：https://jiang-yude.github.io/my-coach-mvp-0522/

## 檔案結構

```
.
├── index.html          # 首頁（hero + 最近的課 + 三入口 + 自介）
├── courses.html        # 課程預告子頁（未來 + 過去全部）
├── resources.html      # 學習資源子頁
├── skills.html         # Skills 下載子頁（含標籤過濾）
├── tuner.html          # 色彩 spotlight 調校工具
├── styles.css          # 全站共用樣式
├── courses-data.js     # ⭐ 課程資料中心（唯一資料源）
├── courses-render.js   # 首頁 + 子頁的課程渲染邏輯
├── spotlight.js        # 滑鼠跟隨光暈
├── robots.txt          # noindex
└── README.md
```

## 課程同步機制

### 新增課程
**改 `courses-data.js` 一個檔，首頁跟子頁自動同步**。

加一個 object 到 `window.COURSES` 陣列尾：

```js
{
  id: "2026-09-15-new-class",
  date: "2026-09-15",          // YYYY-MM-DD（必填）
  time: "19:00",                // HH:MM 或 null
  duration_min: 90,
  title: "新課標題",
  type: "free",                 // free / paid / external / podcast
  type_label: "免費線上講座",
  summary: "一句介紹",
  venue: "線上 Zoom",
  host: "江江教練",
  status_tags: ["申請制"],      // 選填
  register_url: null,
  detail_url: null,             // 之後做單堂內頁才填
  tags: ["主題", "標籤"],
  materials: []                 // 之後放簡報、技能包
}
```

存檔 → `git push` → 30 秒後線上自動更新。

### 自動顯示邏輯
- **首頁「最近的課」**：自動取 `date >= 今天` 的前 3 場
- **courses.html 子頁**：
  - 上半「未來的課」：未來課程按月份分區（升序）
  - 下半「過去的紀錄」：過去課程按月份分區（降序，最近的在前）
- **6/1 之後 5 月的課自動從首頁下架**，但保留在子頁「過去的紀錄」區

### 「上課程看板：XX」觸發詞（標準流程）
雷哥說「上課程看板：5/23 講師 Agent 工作流」→ AI 同步三處：
1. 改 `00 工作台/📅 課程看板.md` 加卡片
2. 改本資料夾的 `courses-data.js` 加 object
3. `cd` 進來 `git add courses-data.js && git commit -m "新增課程：XX" && git push`

## 配色調整

開 `tuner.html` 滑桿調好 → 複製 CSS → 貼進 `styles.css` 的 `:root` 區塊：

```css
--sp-shadow: hsla(...);
--sp-shadow-edge: hsla(...);
--sp-card-shadow: hsla(...);
--sp-radius: ...px;
--sp-card-radius: ...px;
```

## 部署

```bash
git add . && git commit -m "..." && git push
```

GitHub Pages 自動部署（30-60 秒）。
