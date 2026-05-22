/* ─── 課程渲染共用模組 ─── */
(function () {
  const COURSES = window.COURSES || [];
  const TODAY = new Date(new Date().toISOString().slice(0, 10)); // 00:00 today

  // ─── 工具 ───
  function parseDate(s) { return new Date(s); }
  function isUpcoming(c) { return parseDate(c.date) >= TODAY; }
  function isPast(c) { return parseDate(c.date) < TODAY; }
  function monthKey(c) { return c.date.slice(0, 7); }   // "2026-05"
  function fmtDate(c) {
    const d = parseDate(c.date);
    const wk = ['日','一','二','三','四','五','六'][d.getDay()];
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    let s = `${mm}-${dd} (${wk})`;
    if (c.time) s += ` ${c.time}`;
    return s;
  }
  function escapeHtml(s) {
    return String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // ─── CTA（報名按鈕 / 主辦 / 待定） ───
  function ctaHTML(c) {
    const r = c.registration || {};
    const D = window.CTA_DEFAULTS || {};
    switch (r.status) {
      case "open": {
        if (r.url) {
          const label = r.label || D.open_label || '報名 ↗';
          const note = r.note ? `<p class="cta-note">${escapeHtml(r.note)}</p>` : '';
          return `<div class="course-cta open">
            <a class="cta-btn" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>
            ${note}
          </div>`;
        }
        // url 還沒給
        const note = r.note ? escapeHtml(r.note) : (D.open_url_pending || '即將開放報名');
        return `<div class="course-cta pending"><p class="cta-note">${note}</p></div>`;
      }
      case "private": {
        const org = r.host_org || c.host;
        const note = r.note ? `<p class="cta-note">${escapeHtml(r.note)}</p>` : '';
        return `<div class="course-cta private">
          <p class="cta-private-tag"><span class="cta-dot"></span>${escapeHtml(D.private_prefix || '主辦：')}<strong>${escapeHtml(org)}</strong>${escapeHtml(D.private_suffix || '（封閉場次）')}</p>
          ${note}
        </div>`;
      }
      case "pending": {
        const note = r.note ? escapeHtml(r.note) : (D.pending_text || '時間／報名方式待公告');
        return `<div class="course-cta pending"><p class="cta-note">${note}</p></div>`;
      }
      default:
        return '';
    }
  }

  // ─── 模式 badges：場域（線上/實體/混合/podcast）+ 報名（開放/專場/待定） ───
  const VENUE_LABEL = {
    online: '線上',
    physical: '實體',
    hybrid: '線上＋實體',
    podcast: 'Podcast',
    tbd: '待定'
  };
  const REG_LABEL = {
    open: '開放報名',
    private: '專場',
    pending: '待開放'
  };
  function modeBadgesHTML(c) {
    const v = c.venue_mode || (c.type === 'podcast' ? 'podcast' : null);
    const r = (c.registration && c.registration.status) || null;
    const parts = [];
    if (v) parts.push(`<span class="mode-badge venue-${v}">${escapeHtml(VENUE_LABEL[v] || v)}</span>`);
    if (r) parts.push(`<span class="mode-badge reg-${r}">${escapeHtml(REG_LABEL[r] || r)}</span>`);
    return parts.length ? `<div class="card-modes">${parts.join('')}</div>` : '';
  }

  // ─── 沒圖時的佔位（大日期） ───
  function placeholderHTML(c) {
    const d = parseDate(c.date);
    const monthEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
    return `<div class="card-thumbnail-placeholder">
      <div class="ph-month">${monthEn}</div>
      <div class="ph-day">${d.getDate()}</div>
      <div class="ph-label">${escapeHtml(c.type_label)}</div>
    </div>`;
  }

  // ─── 單張卡片 HTML（極簡版：圖 + 日期 + 標題 + 模式 badges + CTA） ───
  function cardHTML(c) {
    const thumb = c.image
      ? `<div class="card-thumbnail"><img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.title)}" loading="lazy" /></div>`
      : placeholderHTML(c);

    return `
      <div class="list-card course-card${c.image ? ' has-thumb' : ''}" data-course-id="${escapeHtml(c.id)}">
        ${thumb}
        <div class="card-body">
          <div class="card-meta">
            <span class="card-date">${escapeHtml(fmtDate(c))}</span>
          </div>
          <h3>${escapeHtml(c.title)}</h3>
          ${modeBadgesHTML(c)}
          ${ctaHTML(c)}
        </div>
      </div>`;
  }

  // ─── 首頁：最近的課（未來 N 場） ───
  window.renderHomeUpcoming = function (selector, n) {
    const target = document.querySelector(selector);
    if (!target) return;
    const upcoming = COURSES
      .filter(isUpcoming)
      .sort((a,b) => parseDate(a.date) - parseDate(b.date))
      .slice(0, n);
    if (upcoming.length === 0) {
      target.innerHTML = `<p style="text-align:center;color:var(--ink-faint);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.1rem;padding:32px;">最近的課正在規劃中，<a href="courses.html" style="color:var(--c-coral);border-bottom:1px dashed var(--c-coral);">看看全部課程 →</a></p>`;
      return;
    }
    target.innerHTML = upcoming.map(cardHTML).join('');
  };

  // ─── 子頁：全部課程，月份分區（未來在上、過去在下） ───
  window.renderAllCourses = function (selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    // 排序：未來升序、過去降序（最近的在前）
    const upcoming = COURSES.filter(isUpcoming).sort((a,b)=>parseDate(a.date)-parseDate(b.date));
    const past = COURSES.filter(isPast).sort((a,b)=>parseDate(b.date)-parseDate(a.date));

    function groupByMonth(arr) {
      const groups = {};
      arr.forEach(c => {
        const k = monthKey(c);
        (groups[k] = groups[k] || []).push(c);
      });
      return groups;
    }

    function renderGroup(groups, monthOrderFn) {
      const keys = Object.keys(groups).sort(monthOrderFn);
      return keys.map(k => {
        const items = groups[k];
        const [y, m] = k.split('-');
        const monthLabel = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'][parseInt(m,10)-1];
        return `
          <div class="group-header">
            <h2>${y}-${m} ${monthLabel}</h2>
            <span class="group-count">${items.length} 場</span>
          </div>
          <div class="list-grid cols-2">
            ${items.map(cardHTML).join('')}
          </div>`;
      }).join('');
    }

    let html = '';
    if (upcoming.length) {
      const groups = groupByMonth(upcoming);
      html += `<div style="margin-bottom: 24px;">
        <div class="eyebrow">未來的課</div>
      </div>`;
      html += renderGroup(groups, (a,b)=>a.localeCompare(b));
    }
    if (past.length) {
      const groups = groupByMonth(past);
      html += `<div style="margin: 72px 0 16px; padding-bottom: 12px; border-bottom: 1px dashed var(--line);">
        <div class="eyebrow">過去的紀錄</div>
        <p style="color:var(--ink-faint);font-size:0.95rem;margin:8px 0 0;">已結束的課程，留存當紀錄。</p>
      </div>`;
      html += renderGroup(groups, (a,b)=>b.localeCompare(a));
    }
    if (!html) {
      html = `<p style="text-align:center;color:var(--ink-faint);padding:48px;">尚無課程資料。</p>`;
    }
    target.innerHTML = html;
  };

  // ─── 自動執行（看頁面有沒有 target） ───
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('home-upcoming')) {
      window.renderHomeUpcoming('#home-upcoming', 3);
    }
    if (document.getElementById('all-courses')) {
      window.renderAllCourses('#all-courses');
    }

    // 重新綁定卡片 hover spotlight（新卡片）
    if (window.attachLocalSpotlight) {
      document.querySelectorAll('.list-card').forEach(window.attachLocalSpotlight);
    }
  });
})();
