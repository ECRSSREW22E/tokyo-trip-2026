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
  const ownScript = [...doc.scripts].find((script) => /\/assets\/site-ui\.js/.test(script.src));
  if (dayNav && ownScript && ![...dayNav.querySelectorAll('a')].some((link) => /\/themes\//.test(link.href))) {
    const themeLink = doc.createElement('a');
    themeLink.href = new URL('../themes/index.html', ownScript.src).href;
    themeLink.textContent = '主題';
    if (location.pathname.includes('/themes/')) {
      themeLink.classList.add('active');
      themeLink.setAttribute('aria-current', 'page');
    }
    const sourceLink = [...dayNav.querySelectorAll('a')].find((link) => /\/sources\//.test(link.href));
    sourceLink ? sourceLink.before(themeLink) : dayNav.appendChild(themeLink);
  }
  if (dayNav && ownScript && ![...dayNav.querySelectorAll('a')].some((link) => /\/restaurants\//.test(link.href))) {
    const restaurantLink = doc.createElement('a');
    restaurantLink.href = new URL('../restaurants/index.html', ownScript.src).href;
    restaurantLink.textContent = '餐廳';
    const dayMatch = location.pathname.match(/day([1-6])\.html/i);
    if (dayMatch) restaurantLink.search = `?day=${dayMatch[1]}`;
    if (location.pathname.includes('/restaurants/')) {
      restaurantLink.classList.add('active');
      restaurantLink.setAttribute('aria-current', 'page');
    }
    const themeLink = [...dayNav.querySelectorAll('a')].find((link) => /\/themes\//.test(link.href));
    const sourceLink = [...dayNav.querySelectorAll('a')].find((link) => /\/sources\//.test(link.href));
    (themeLink || sourceLink) ? (themeLink || sourceLink).before(restaurantLink) : dayNav.appendChild(restaurantLink);
  }
  if (dayNav && ownScript && ![...dayNav.querySelectorAll('a')].some((link) => /\/rain-plan\.html/.test(link.href))) {
    const rainLink = doc.createElement('a');
    rainLink.href = new URL('../rain-plan.html', ownScript.src).href;
    rainLink.textContent = '雨天';
    if (/\/rain-plan\.html$/i.test(location.pathname)) {
      rainLink.classList.add('active');
      rainLink.setAttribute('aria-current', 'page');
    }
    const destinationLink = [...dayNav.querySelectorAll('a')].find((link) => /\/destinations\//.test(link.href));
    destinationLink ? destinationLink.before(rainLink) : dayNav.appendChild(rainLink);
  }
  const screenDayMatch = location.pathname.match(/day([1-6])\.html$/i);
  if (screenDayMatch && ownScript && main && !main.querySelector('[data-screen-day-link]')) {
    const screenCallout = doc.createElement('section');
    screenCallout.className = 'panel shell';
    screenCallout.dataset.screenDayLink = screenDayMatch[1];
    screenCallout.innerHTML = `<div class="eyebrow">當日作品場景</div><h2>第 ${screenDayMatch[1]} 天的場景巡禮</h2><p>正式停留時間完全依照《日本行.docx》；未列入原行程的地點只會標示為可選支線，不會擠壓交通與訂位時間。</p><a class="btn alt" href="${new URL(`../themes/screen-locations.html?day=D${screenDayMatch[1]}`, ownScript.src).href}">查看第 ${screenDayMatch[1]} 天作品場景 →</a>`;
    main.appendChild(screenCallout);
  }
  if (ownScript && (screenDayMatch || doc.body.dataset.spot)) {
    const dataScript = doc.createElement('script');
    dataScript.src = new URL('../assets/special-items-data.js?v=1', ownScript.src).href;
    dataScript.addEventListener('load', () => {
      const renderer = doc.createElement('script');
      renderer.src = new URL('../assets/special-items.js?v=1', ownScript.src).href;
      doc.body.appendChild(renderer);
    });
    doc.body.appendChild(dataScript);
  }
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
      <button class="utility-button scene-toggle" type="button" aria-label="暫停動態背景" aria-pressed="false">
        <span aria-hidden="true">≈</span><span class="utility-label scene-toggle-label">動態</span>
      </button>
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

  const sceneForPage = () => {
    const path = decodeURIComponent(location.pathname).toLowerCase();
    if (/rain-plan/.test(path)) return 'coast';
    if (/restaurants/.test(path)) return 'shopping';
    if (/shopping/.test(path)) return 'shopping';
    if (/screen-locations|akihabara|kameari|kochikame/.test(path)) return 'screen';
    if (/enoshima|shichirigahama|atami|day3/.test(path)) return 'coast';
    if (/odaiba|minatomirai|yokohama|day5/.test(path)) return 'bay';
    if (/toshogu|sensoji|gotokuji|meiji-jingu|hebikubo|asakusa/.test(path)) return 'shrine';
    if (/skytree|tokyo-tower/.test(path)) return 'tower';
    return 'city';
  };
  const sceneSvg = {
    city: '<svg viewBox="0 0 1200 520" role="img" aria-label="東京城市天際線"><path class="ambient-far" d="M0 390h85v-88h54v88h72V245h78v145h62V292h91v98h67V206h50v184h88v-112h74v112h83V230h76v160h60V316h97v74h93v130H0z"/><path class="ambient-line" d="M0 406h1200M248 245v-42m18 42v-67m462 52v-58m20 58v-89"/><circle class="ambient-light" cx="286" cy="268" r="4"/><circle class="ambient-light" cx="531" cy="244" r="4"/><circle class="ambient-light" cx="760" cy="274" r="4"/></svg>',
    coast: '<svg viewBox="0 0 1200 520" role="img" aria-label="江之島海岸與鳥居"><path class="ambient-far" d="M0 332c130-28 230-23 342 7 108 29 229 31 348-4 143-42 318-30 510 14v171H0z"/><path class="ambient-line" d="M0 372c150-31 267-18 378 9 132 32 253 18 367-11 128-33 277-32 455 9M0 418c143-28 274-18 407 12 131 30 267 12 382-15 124-29 261-25 411 9"/><path class="ambient-mark" d="M808 326v-156m-60 22h120m-99 0v-35h78v35m-61 0v134m44-134v134"/><circle class="ambient-sun" cx="980" cy="155" r="54"/></svg>',
    bay: '<svg viewBox="0 0 1200 520" role="img" aria-label="東京灣與港未來"><path class="ambient-far" d="M0 372h113v-58h58v58h86V220h88v152h55V288h68v84h102V250h91v122h59V307h92v65h122v148H0z"/><path class="ambient-line" d="M0 405h1200M102 332c180-172 368-170 548 0m-548 0h548M870 372c0-94 26-151 78-151s78 57 78 151m-78-151v151m-67-117l134 80m-134 0l134-80"/><circle class="ambient-light" cx="948" cy="221" r="5"/></svg>',
    shrine: '<svg viewBox="0 0 1200 520" role="img" aria-label="神社鳥居與森林"><path class="ambient-far" d="M0 348c92-72 185-84 278-36 86-75 178-73 275 8 113-70 214-67 305 10 98-51 212-42 342 29v161H0z"/><path class="ambient-mark" d="M492 385V168m216 217V168M440 185h320l-24-31H464zm72 47h176v24H512z"/><path class="ambient-line" d="M0 405h1200M538 256v129m124-129v129"/></svg>',
    tower: '<svg viewBox="0 0 1200 520" role="img" aria-label="東京展望塔與城市"><path class="ambient-far" d="M0 406h188v-79h76v79h139v-112h84v112h219v-88h101v88h170v-126h82v126h141v114H0z"/><path class="ambient-mark" d="M593 104l-75 302h164zm-39 180h92m-111 70h130M593 104V62m-17 0h34"/><path class="ambient-line" d="M0 420h1200"/></svg>',
    shopping: '<svg viewBox="0 0 1200 520" role="img" aria-label="日本購物袋與禮物"><path class="ambient-far" d="M0 408h1200v112H0z"/><path class="ambient-mark" d="M350 225h198v183H350zm302-64h214v247H652zM404 225c0-55 18-84 45-84s45 29 45 84m212-64c0-64 20-96 53-96s53 32 53 96"/><path class="ambient-line" d="M350 296h198m104-42h214m-107-93v247"/></svg>',
    screen: '<svg viewBox="0 0 1200 520" role="img" aria-label="動畫分鏡與城市場景"><path class="ambient-far" d="M0 395h140v-83h88v83h108v-144h96v144h134v-97h83v97h94v-171h107v171h112v-69h90v69h148v125H0z"/><path class="ambient-mark" d="M275 118h650v286H275zm0 72h650M397 118v286m406-286v286"/><path class="ambient-line" d="M432 328l98-82 70 52 102-104 66 53"/></svg>'
  };
  const sceneName = sceneForPage();
  const scene = doc.createElement('div');
  scene.className = 'ambient-scene';
  scene.dataset.scene = sceneName;
  scene.setAttribute('aria-hidden', 'true');
  const pageLabel = (doc.title || '東京旅遊').split('｜')[0];
  scene.innerHTML = `<div class="ambient-glow"></div><div class="ambient-art">${sceneSvg[sceneName]}</div><div class="ambient-particles">${'<i></i>'.repeat(8)}</div><span class="ambient-caption">${pageLabel}</span>`;
  doc.body.prepend(scene);

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let scenePaused = reduceMotion.matches;
  try { scenePaused = reduceMotion.matches || localStorage.getItem('tokyo-trip-scene-motion') === 'paused'; } catch (_) {}
  const sceneButton = doc.querySelector('.scene-toggle');
  const applySceneMotion = () => {
    root.classList.toggle('scene-paused', scenePaused);
    if (!sceneButton) return;
    sceneButton.setAttribute('aria-pressed', String(scenePaused));
    sceneButton.setAttribute('aria-label', scenePaused ? '啟用動態背景' : '暫停動態背景');
    const label = sceneButton.querySelector('.scene-toggle-label');
    if (label) label.textContent = scenePaused ? '靜態' : '動態';
  };
  applySceneMotion();
  sceneButton?.addEventListener('click', () => {
    scenePaused = !scenePaused;
    applySceneMotion();
    try { localStorage.setItem('tokyo-trip-scene-motion', scenePaused ? 'paused' : 'active'); } catch (_) {}
  });
  reduceMotion.addEventListener?.('change', (event) => { if (event.matches) { scenePaused = true; applySceneMotion(); } });

  let pointerTicking = false;
  addEventListener('pointermove', (event) => {
    if (scenePaused || reduceMotion.matches || pointerTicking) return;
    pointerTicking = true;
    requestAnimationFrame(() => {
      root.style.setProperty('--scene-x', `${((event.clientX / innerWidth) - .5) * 2}`);
      root.style.setProperty('--scene-y', `${((event.clientY / innerHeight) - .5) * 2}`);
      pointerTicking = false;
    });
  }, { passive: true });

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
    root.style.setProperty('--scene-scroll', `${Math.min(1, y / Math.max(1, innerHeight))}`);
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

  const revealTargets = doc.querySelectorAll('.section-head, .day-card, .branch-card, .panel, .rain-day, .restaurant-card, .local-food-card, .source-group');
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    revealTargets.forEach((node) => node.classList.add('reveal-ready'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    revealTargets.forEach((node) => revealObserver.observe(node));
  }

  doc.addEventListener('click', (event) => {
    if (reduceMotion.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    doc.body.classList.add('page-leaving');
  });
})();
