/* ─── 江江教練 課程資料中心 ───
 * 唯一資料源，首頁「最近的課」跟 courses.html 都讀這份
 *
 * ─── 欄位 ───
 *   id           - 唯一識別碼，格式 YYYY-MM-DD-slug
 *   date         - YYYY-MM-DD（必填，用來判斷未來/過去 + 排序）
 *   time         - HH:MM 或 null
 *   duration_min - 分鐘數或 null
 *   title        - 課程標題
 *   type         - free / paid / external / podcast（決定 badge 色）
 *   type_label   - badge 上的中文標籤
 *   summary      - 一段話介紹
 *   venue        - 場地
 *   host         - 講師
 *   image        - 封面圖路徑（"images/courses/xxx.jpg"）或 null
 *   tags         - 主題標籤陣列
 *   status_tags  - 額外狀態標籤（陣列，可選）
 *   detail_url   - 該堂課的內頁 URL（之後做才填）
 *   materials    - 之後放簡報、技能包等延伸資源
 *
 *   registration - 報名資訊（決定卡片底下的 CTA）：
 *     status: "open"     - 公開報名（給 url + label）
 *             "private"  - 專場、邀約場（顯示主辦：xxx，不對外）
 *             "pending"  - 待開放（顯示「即將開放」）
 *     url:    報名連結（status=open 必填）
 *     label:  按鈕文字（預設「報名 ↗」，可改「加 LINE 群組 ↗」「江江傳送門 ↗」）
 *     host_org: 主辦單位（status=private 必填，顯示「主辦：xxx，封閉場次」）
 *     note:   補充說明（可選）
 */

window.COURSES = [
  {
    id: "2026-05-23-agent-workflow",
    date: "2026-05-23",
    time: "20:00",
    duration_min: 90,
    title: "講師的 Agent 工作流",
    type: "free",
    type_label: "免費線上講座",
    summary: "給講師、知識工作者：用 AI Agent 重新設計備課、知識管理、教材生產流程。",
    venue: "線上 Zoom",
    host: "江江教練",
    image: "images/courses/2026-05-23-agent-workflow.jpg",
    tags: ["講師", "Agent", "工作流", "備課"],
    detail_url: null,
    materials: [],
    registration: {
      status: "open",
      url: null,                                    // ⚠️ 待補：報名連結
      label: "加 LINE 群組通知 ↗",
      note: "免費，加群組第一時間收到 Zoom 連結"
    }
  },
  {
    id: "2026-05-25-mobile-product-photo",
    date: "2026-05-25",
    time: "14:00",
    duration_min: null,
    title: "手機 + AI 拍出自己的專業商品照",
    type: "external",
    type_label: "外部授課",
    summary: "在地商家專屬。用手機 + AI 工具建立自家品牌的視覺資產庫，不依賴攝影師也能持續產出。",
    venue: "實體",
    host: "江江教練",
    image: "images/courses/2026-05-25-mobile-product-photo.png",
    tags: ["手機攝影", "AI", "商品照", "在地商家"],
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "熊姐",
      note: "熊姐邀的在地商家專場，不對外公開報名"
    }
  },
  {
    id: "2026-05-30-yongli-ai-workshop",
    date: "2026-05-30",
    time: "10:00",
    duration_min: 360,
    title: "永力扶輪社 · AI 應用一日工作坊",
    type: "external",
    type_label: "外部授課",
    summary: "給商會社員：ChatGPT 專案、Gemini Gem、NotebookLM 三套工具的實作整合。",
    venue: "台北永續影響力扶輪社",
    host: "江江教練",
    image: null,                                    // ⚠️ 待補圖
    tags: ["扶輪社", "ChatGPT", "Gemini", "NotebookLM", "商會"],
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
    duration_min: null,
    title: "就享知 Joy Podcast 訪談",
    type: "podcast",
    type_label: "Podcast 訪談",
    summary: "主題：AI 輔助決策、一人公司、MVP、思維框架。",
    venue: "Podcast 平台",
    host: "Joy",
    image: null,
    tags: ["Podcast", "AI輔助決策", "一人公司", "MVP"],
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
    duration_min: null,
    title: "技能包與工作流設計",
    type: "free",
    type_label: "免費工作坊",
    status_tags: ["申請制", "限額"],
    summary: "申請制限額。要報名需先貢獻一個你自己的工作痛點。現場用你的痛點示範如何包成技能包。",
    venue: "線上",
    host: "江江教練",
    image: null,
    tags: ["技能包", "工作流", "申請制"],
    detail_url: null,
    materials: [],
    registration: {
      status: "open",
      url: null,                                    // ⚠️ 待補：申請表連結
      label: "填寫申請表 ↗",
      note: "申請制限額，先寫工作痛點才會收到通知"
    }
  },
  {
    id: "2026-06-10-boss-ai-strategy",
    date: "2026-06-10",
    time: null,
    duration_min: 300,
    title: "給企業主的 AI 駕馭策略課",
    type: "paid",
    type_label: "付費工作坊",
    status_tags: ["五小時", "合開"],
    summary: "與陳明勇老師合開。給老闆層級的 AI 思維課，不教操作、講駕馭策略。",
    venue: "待定",
    host: "江江教練 × 陳明勇",
    image: null,
    tags: ["企業主", "AI策略", "合開", "駕馭"],
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
    duration_min: null,
    title: "星奇兒親子 AI 故事工作坊",
    type: "external",
    type_label: "外部授課",
    status_tags: ["時間地點待確認"],
    summary: "陳穎君老師合作邀請的親子場。爸媽帶孩子一起用 AI 共創家庭故事。",
    venue: "待確認",
    host: "江江教練 × 陳穎君",
    image: null,
    tags: ["親子", "AI故事", "兒童", "家庭"],
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "陳穎君",
      note: "親子工作坊邀約場，由主辦單位招生"
    }
  },
  {
    id: "2026-07-08-marketing-1",
    date: "2026-07-08",
    time: "19:00",
    duration_min: null,
    title: "省時行銷密技 1：AI 幫我寫貼文",
    type: "external",
    type_label: "外部授課",
    summary: "嘉我好漾線上青創課。給自由工作者、小店主、一人公司：用 AI 把貼文寫作流程從一小時壓到 15 分鐘。",
    venue: "嘉我好漾線上",
    host: "江江教練",
    image: null,
    tags: ["行銷", "AI寫貼文", "嘉我好漾", "省時"],
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "嘉我好漾",
      note: "嘉義縣勞青處青創課程，請洽嘉我好漾報名"
    }
  },
  {
    id: "2026-07-14-marketing-2",
    date: "2026-07-14",
    time: "19:00",
    duration_min: null,
    title: "省時行銷密技 2：AI 幫我做素材",
    type: "external",
    type_label: "外部授課",
    summary: "嘉我好漾線上青創課，第二堂。把第一堂的貼文延伸成輪播圖、短影音腳本、視覺素材。",
    venue: "嘉我好漾線上",
    host: "江江教練",
    image: null,
    tags: ["行銷", "AI素材", "嘉我好漾", "輪播圖"],
    detail_url: null,
    materials: [],
    registration: {
      status: "private",
      host_org: "嘉我好漾",
      note: "嘉義縣勞青處青創課程，請洽嘉我好漾報名"
    }
  },
  {
    id: "2026-08-xx-esg-agent",
    date: "2026-08-15",
    time: null,
    duration_min: null,
    title: "Agent 文書處理基礎班 · ESG 場",
    type: "paid",
    type_label: "付費實體課",
    status_tags: ["待排日期"],
    summary: "給扶輪社、商會、ESG 顧問。教用 Agent 把永續報告、會議記錄、文件流程自動化。",
    venue: "待定",
    host: "江江教練",
    image: null,
    tags: ["ESG", "永續報告", "Agent", "文書處理", "商會"],
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

/* ─── 全域 CTA 預設文案（registration.url/label 沒填時的 fallback） ─── */
window.CTA_DEFAULTS = {
  open_label: "報名 ↗",                              // open 沒填 label
  open_url_pending: "即將開放報名，敬請鎖定 Threads",  // open 但 url 還沒填
  pending_text: "時間／報名方式待公告",                // pending 預設
  private_prefix: "主辦：",                            // private 顯示前綴
  private_suffix: "（封閉場次，由主辦邀約）"             // private 顯示後綴
};
