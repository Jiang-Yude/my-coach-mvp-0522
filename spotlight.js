/* ─── Cursor Spotlight：滑鼠追光 ─── */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 整頁 spotlight（body 跟隨）
  let mx = 0.5, my = 0.5, ticking = false;
  function update() {
    document.body.style.setProperty('--mx', (mx * 100) + '%');
    document.body.style.setProperty('--my', (my * 100) + '%');
    ticking = false;
  }
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  // 按鈕 / 卡片 spotlight（局部跟隨）
  function attachLocal(el) {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--bx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--by', ((e.clientY - r.top) / r.height * 100) + '%');
    }, { passive: true });
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-spot, .entry-card, .list-card').forEach(attachLocal);
  });
})();
