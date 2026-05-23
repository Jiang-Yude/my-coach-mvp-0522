/* ─── 江江教練 課程資料中心 ───
 * 唯一資料源，首頁「最近的課」跟 courses.html 都讀這份
 *
 * ─── 欄位 ───
 *   id           - 唯一識別碼，格式 YYYY-MM-DD-slug
 *   date         - YYYY-MM-DD（必填）
 *   time         - HH:MM 或 null
 *   duration_min - 分鐘數或 null
 *   title        - 課程標題
 *   type_label   - badge 上的中文標籤（保留給未來用）
 *   image        - 封面圖 4:5 直幅（"images/courses/xxx.jpg"）或 null
 *   venue_mode   - 場域：online / physical / hybrid / podcast / tbd
 *   host         - 講師
 *   tags         - 主題標籤（內部分類用，不顯示）
 *   summary      - 一段話介紹（給未來內頁用，卡片不顯示）
 *   detail_url   - 該堂課的內頁 URL（之後做才填）
 *   materials    - 簡報、技能包等延伸資源（之後做才填）
 *
 *   registration - 報名資訊：
 *     status: "open"    - 開放報名（給 url + label）
 *             "private" - 專場（顯示主辦：xxx）
 *             "pending" - 待開放
 *     url:    報名連結
 *     label:  按鈕文字（預設「報名 ↗」）
 *     host_org: 主辦單位（status=private 必填）
 *     note:   補充說明
 *
 * ─── 卡片顯示精簡為四件事 ───
 *   1. 圖（4:5）
 *   2. 時間（date + time）
 *   3. 主題（title）
 *   4. 模式 badge：場域 + 報名狀態
 *   + CTA 按鈕／主辦標示
 */

window.COURSES = [
  {
    id: "2026-05-23-agent-workflow",
    date: "2026-05-23",
    time: "20:00",
    title: "講師的 Agent 工作流",
    type_label: "免費線上講座",
    image: "images/courses/2026-05-23-agent-workflow.jpg",
    venue_mode: "online",
    host: "江江教練",
    tags: ["講師", "Agent", "工作流", "備課"],
    summary: "給講師、知識工作者：用 AI Agent 重新設計備課、知識管理、教材生產流程。",
    detail_url: "https://jiang-yude.github.io/my-0523-teacher-agent-workflow/",
    materials: [],
    registration: {
      status: "open",
      url: "https://line.me/R/ti/g2/V63_43ngbs_kq1mpVc9LlxXB-1kchHnwdsy3WQ",
      label: "免費參加 ↗",
      tooltip: "我每月固定舉辦兩場免費線上講座，\n講座資訊請看我的 LINE 社群",
      note: "免費，加入 LINE 社群收到 Zoom 連結"
    }
  },
  {
    id: "2026-05-25-mobile-product-photo",
    date: "2026-05-25",
    time: "14:00",
    title: "手機 + AI 拍出自己的專業商品照",
    type_label: "外部授課",
    image: "images/courses/2026-05-25-mobile-product-photo.png",
    venue_mode: "physical",
    host: "江江教練",
    tags: ["手機攝影", "AI", "商品照", "在地商家"],
    summary: "在地商家專屬。用手機 + AI 工具建立自家品牌的視覺資產庫，不依賴攝影師也能持續產出。",
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "熊姐",
      note: "熊姐邀的在地商家專場"
    }
  },
  {
    id: "2026-05-30-yongli-ai-workshop",
    date: "2026-05-30",
    time: "10:00",
    title: "永力社 AI 應用工作坊",
    type_label: "外部授課",
    image: "images/courses/2026-05-30-yongli-ai-workshop.jpg",
    venue_mode: "physical",
    host: "江江教練",
    tags: ["扶輪社", "ChatGPT", "Gemini", "NotebookLM", "商會"],
    summary: "給商會社員：ChatGPT 專案、Gemini Gem、NotebookLM 三套工具的實作整合。",
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "永力扶輪社",
      note: "扶輪社內部社員場次"
    }
  },
  {
    id: "2026-06-01-joy-podcast",
    date: "2026-06-01",
    time: null,
    title: "就享知 Joy Podcast 訪談",
    type_label: "Podcast",
    image: null,
    venue_mode: "podcast",
    host: "Joy",
    tags: ["Podcast", "AI輔助決策", "一人公司", "MVP"],
    summary: "主題：AI 輔助決策、一人公司、MVP、思維框架。",
    detail_url: null,
    materials: [],
    registration: {
      status: "pending",
      note: "播出後會更新連結"
    }
  },
  {
    id: "2026-06-07-skill-workshop",
    date: "2026-06-07",
    time: null,
    title: "技能包與工作流設計",
    type_label: "免費工作坊",
    image: null,
    venue_mode: "online",
    host: "江江教練",
    tags: ["技能包", "工作流", "申請制"],
    summary: "申請制限額。要報名需先貢獻一個你自己的工作痛點。",
    detail_url: null,
    materials: [],
    registration: {
      status: "open",
      url: null,                                    // ⚠️ 待補：申請表
      label: "填寫申請表 ↗",
      note: "申請制限額，先寫工作痛點才會收到通知"
    }
  },
  {
    id: "2026-06-10-boss-ai-strategy",
    date: "2026-06-10",
    time: null,
    title: "給企業主的 AI 駕馭策略課",
    type_label: "付費工作坊",
    image: null,
    venue_mode: "tbd",
    host: "江江教練 × 陳明勇",
    tags: ["企業主", "AI策略", "合開", "駕馭"],
    summary: "與陳明勇老師合開。給老闆層級的 AI 思維課，不教操作、講駕馭策略。",
    detail_url: null,
    materials: [],
    registration: {
      status: "pending",
      note: "6/1 開始推廣，屆時公布報名連結"
    }
  },
  {
    id: "2026-06-27-parent-child-ai-story",
    date: "2026-06-27",
    time: "14:00",
    title: "星奇兒親子 AI 故事工作坊",
    type_label: "外部授課",
    image: null,
    venue_mode: "tbd",
    host: "江江教練 × 陳穎君",
    tags: ["親子", "AI故事", "兒童", "家庭"],
    summary: "陳穎君老師合作邀請的親子場。爸媽帶孩子一起用 AI 共創家庭故事。",
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "陳穎君",
      note: "親子工作坊邀約場"
    }
  },
  {
    id: "2026-07-08-marketing-1",
    date: "2026-07-08",
    time: "19:00",
    title: "省時行銷密技 1：AI 幫我寫貼文",
    type_label: "外部授課",
    image: null,
    venue_mode: "online",
    host: "江江教練",
    tags: ["行銷", "AI寫貼文", "嘉我好漾", "省時"],
    summary: "嘉我好漾線上青創課。",
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "嘉我好漾",
      note: "嘉義縣勞青處青創課程"
    }
  },
  {
    id: "2026-07-14-marketing-2",
    date: "2026-07-14",
    time: "19:00",
    title: "省時行銷密技 2：AI 幫我做素材",
    type_label: "外部授課",
    image: null,
    venue_mode: "online",
    host: "江江教練",
    tags: ["行銷", "AI素材", "嘉我好漾", "輪播圖"],
    summary: "嘉我好漾線上青創課，第二堂。",
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "嘉我好漾",
      note: "嘉義縣勞青處青創課程"
    }
  },
  {
    id: "2026-08-xx-esg-agent",
    date: "2026-08-15",
    time: null,
    title: "Agent 文書處理基礎班 · ESG 場",
    type_label: "付費實體課",
    image: null,
    venue_mode: "tbd",
    host: "江江教練",
    tags: ["ESG", "永續報告", "Agent", "文書處理", "商會"],
    summary: "給扶輪社、商會、ESG 顧問。",
    detail_url: null,
    materials: [],
    registration: {
      status: "pending",
      note: "等小薇顧問 8 月考完試後敲定日期"
    }
  }

  /* ─── 過去課程歷史 ─── */
  /* 之後補：5/20 關係不內耗、5/17 AI 辦公室、5/10 AI Agent 橫向對比、5/5 創業點子驗證術、5/3 書本變 AI 顧問 ... */
];

/* ─── 全域 CTA 預設文案 ─── */
window.CTA_DEFAULTS = {
  open_label: "報名 ↗",
  open_url_pending: "即將開放報名，敬請鎖定 Threads",
  pending_text: "時間／報名方式待公告",
  private_prefix: "主辦：",
  private_suffix: "（封閉場次，由主辦邀約）"
};
