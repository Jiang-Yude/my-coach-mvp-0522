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

  // ─── 單張卡片 HTML ───
  function cardHTML(c) {
    const badges = [`<span class="badge ${c.type}">${escapeHtml(c.type_label)}</span>`];
    (c.status_tags || []).forEach(t => badges.push(`<span class="badge planning">${escapeHtml(t)}</span>`));

    const thumb = c.image
      ? `<div class="card-thumbnail"><img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.title)}" loading="lazy" /></div>`
      : '';

    const venue = c.venue
      ? `<p class="card-venue"><span class="venue-icon">📍</span>${escapeHtml(c.venue)}${c.host && c.host !== '江江教練' ? ` · ${escapeHtml(c.host)}` : ''}</p>`
      : '';

    const detailLink = c.detail_url
      ? `<div class="card-detail-link"><a href="${escapeHtml(c.detail_url)}">看課程詳情 →</a></div>`
      : '';

    return `
      <div class="list-card course-card${c.image ? ' has-thumb' : ''}" data-course-id="${escapeHtml(c.id)}">
        ${thumb}
        <div class="card-body">
          <div class="card-meta">
            <span class="card-date">${escapeHtml(fmtDate(c))}</span>
            ${badges.join('')}
          </div>
          <h3>${escapeHtml(c.title)}</h3>
          <p>${escapeHtml(c.summary)}</p>
          ${venue}
          ${ctaHTML(c)}
          ${detailLink}
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
