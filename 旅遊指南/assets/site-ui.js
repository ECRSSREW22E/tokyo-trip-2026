(() => {
  const doc = document;
  const root = doc.documentElement;
  root.classList.add('js');

  const main = doc.querySelector('main') || doc.getElementById('spot-page') || doc.body;
  if (!main.id) main.id = 'main-content';

  const skip = doc.createElement('a');
  skip.className = 'skip-link';
  skip.href = `#${main.id}`;
  skip.textContent = '跳至主要內容';
  doc.body.prepend(skip);

  const progress = doc.createElement('div');
  progress.className = 'page-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  doc.body.prepend(progress);

  const topbar = doc.querySelector('.topbar');
  const nav = topbar && topbar.querySelector('.nav');
  doc.querySelectorAll('.day-nav a.active').forEach((link) => link.setAttribute('aria-current', 'page'));
  const dayNav = doc.querySelector('.day-nav');
  if (dayNav) {
    const navAnchor = doc.createComment('day navigation anchor');
    dayNav.after(navAnchor);
    const mobileQuery = matchMedia('(max-width: 960px)');
    const placeDayNav = () => {
      if (mobileQuery.matches) doc.body.appendChild(dayNav);
      else navAnchor.before(dayNav);
    };
    placeDayNav();
    mobileQuery.addEventListener?.('change', placeDayNav);
  }
  if (nav) {
    const controls = doc.createElement('div');
    controls.className = 'nav-utilities';
    controls.innerHTML = `
      <button class="utility-button theme-toggle" type="button" aria-label="切換深色模式" aria-pressed="false">
        <span aria-hidden="true">◐</span><span class="utility-label">夜間</span>
      </button>`;
    nav.appendChild(controls);
  }

  const storedTheme = (() => {
    try { return localStorage.getItem('tokyo-trip-theme'); } catch (_) { return null; }
  })();
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'night' : 'day');
  const themeButton = doc.querySelector('.theme-toggle');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeButton) {
      const isNight = theme === 'night';
      themeButton.setAttribute('aria-pressed', String(isNight));
      themeButton.setAttribute('aria-label', isNight ? '切換淺色模式' : '切換深色模式');
      const label = themeButton.querySelector('.utility-label');
      if (label) label.textContent = isNight ? '日間' : '夜間';
    }
  };
  applyTheme(initialTheme);
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'night' ? 'day' : 'night';
    applyTheme(next);
    try { localStorage.setItem('tokyo-trip-theme', next); } catch (_) {}
  });

  const toTop = doc.createElement('button');
  toTop.type = 'button';
  toTop.className = 'back-to-top';
  toTop.setAttribute('aria-label', '回到頁面頂端');
  toTop.innerHTML = '<span aria-hidden="true">↑</span>';
  doc.body.appendChild(toTop);
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  let ticking = false;
  const updateScrollState = () => {
    const y = scrollY;
    const max = Math.max(1, doc.documentElement.scrollHeight - innerHeight);
    progress.firstElementChild.style.transform = `scaleX(${Math.min(1, y / max)})`;
    topbar?.classList.toggle('is-scrolled', y > 12);
    toTop.classList.toggle('is-visible', y > 640);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });
  updateScrollState();

  doc.querySelectorAll('img').forEach((image, index) => {
    if (index > 0 && !image.hasAttribute('loading')) image.loading = 'lazy';
    image.decoding = 'async';
  });
  doc.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.rel.includes('noopener')) link.rel = `${link.rel} noopener`.trim();
  });
})();
