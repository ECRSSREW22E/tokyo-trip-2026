(() => {
  const mount = document.getElementById('spot-page');
  if (!mount) return;

  const root = document.body.dataset.root || '';
  const slug = document.body.dataset.spot;
  const d = window.TRIP_SPOTS && window.TRIP_SPOTS[slug];
  if (!d) {
    mount.innerHTML = '<div class="shell section"><h1>找不到這個景點</h1></div>';
    return;
  }

  const dayNum = String(Number((d.day.match(/\d+/) || ['1'])[0]));
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.map)}`;
  const gallery = d.gallery || [[d.image, d.title, d.desc, d.credit ? `${d.credit[0]}・${d.credit[2]}` : '照片來源請見全站照片出處']];
  const social = d.social || [];
  const shops = d.shops || [];
  const titleParts = d.title.match(/《[^》]+》|[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*|[^《》A-Za-z0-9\s]+/g) || [d.title];
  const titleMarkup = titleParts.map(part => `<span>${part}</span>`).join('');
  const titleLengthClass = d.title.replace(/\s/g, '').length > 14 ? 'is-very-long' : d.title.replace(/\s/g, '').length > 9 ? 'is-long' : '';
  const imageUrl = (src) => /^(?:https?:|data:|\.\.\/)/.test(src) ? src : `${root}../${src}`;
  if (!document.querySelector('link[data-spot-gallery]')) {
    const galleryStyles = document.createElement('link');
    galleryStyles.rel = 'stylesheet';
    galleryStyles.href = `${root}assets/gallery.css?v=5`;
    galleryStyles.dataset.spotGallery = 'true';
    document.head.appendChild(galleryStyles);
  }
  const credit = d.credit
    ? `<figcaption class="spot-credit">照片：<a href="${d.credit[1]}" target="_blank" rel="noopener">${d.credit[0]}</a>・${d.credit[2]}</figcaption>`
    : '<figcaption class="spot-credit">照片來源與授權請見頁面右側來源及全站照片出處。</figcaption>';

  document.title = `${d.title}｜東京六天五夜`;
  mount.innerHTML = `
    <div class="spot-page">
      <div class="shell spot-crumbs"><a href="${root}index.html">首頁</a> ／ <a href="${root}destinations/index.html">景點目錄</a> ／ ${d.city} ／ ${d.area} ／ ${d.title}</div>
      <section class="spot-hero">
        <figure class="spot-visual"><img src="${imageUrl(d.image)}" alt="${d.title}">${credit}</figure>
        <div class="spot-hero-copy">
          <div class="eyebrow">${d.city} ・ ${d.area}</div>
          <h1 class="${titleLengthClass}">${titleMarkup}</h1>
          <p>${d.desc}</p>
          ${d.notice ? `<div class="warning">${d.notice}</div>` : ''}
          <div class="spot-tags"><span class="spot-tag">${d.day}</span><span class="spot-tag">${d.photos.length} 個拍照點</span><span class="spot-tag">${d.sources.length} 個正式來源</span><span class="spot-tag">${social.length} 則社群實訪</span></div>
          <div class="actions"><a class="btn" href="${root}day${dayNum}.html">查看當日動線</a><a class="btn alt" href="${map}" target="_blank" rel="noopener">Google Maps</a></div>
        </div>
      </section>
      <nav class="shell spot-local-nav" aria-label="本頁章節">
        <a href="#visit-flow">遊覽順序</a>${shops.length ? '<a href="#spot-shops">特色商家</a>' : ''}${social.length ? '<a href="#social-heading">社群實訪</a>' : ''}<a href="#gallery-heading">照片圖庫</a><a href="#photo-points">拍照點位</a><a href="#source-admin">資料來源</a>
      </nav>
      <div class="shell spot-body">
        <main>
          <section id="visit-flow"><h2>建議遊覽順序</h2><div class="flow-steps">${d.flow.map((step) => `<div class="flow-step">${step}</div>`).join('')}</div></section>
          ${shops.length ? `<section class="shop-section" id="spot-shops"><h2>特色商家與館內設施</h2><div class="shop-grid">${shops.map((shop) => `<article class="shop-card"><span>${shop.type}${shop.floor ? ` ・ ${shop.floor}` : ''}</span><h3>${shop.name}</h3><p>${shop.note}</p><dl><div><dt>建議時間</dt><dd>${shop.best}</dd></div><div><dt>座標</dt><dd>${Number(shop.lat).toFixed(5)}, ${Number(shop.lng).toFixed(5)}</dd></div></dl><a href="${shop.nav}" target="_blank" rel="noopener">開啟步行導航 ↗</a></article>`).join('')}</div></section>` : ''}
          ${social.length ? `<section class="social-insights" aria-labelledby="social-heading"><div class="social-heading"><div><span class="social-kicker">PUBLIC SOCIAL NOTES</span><h2 id="social-heading">社群實訪重點</h2></div><p>內容為公開貼文的重點摘要；引號內只保留極短節錄。Threads與小紅書未登入內容無法可靠查證，因此不引用不可讀取的貼文。</p></div><div class="social-grid">${social.map((item) => `<article class="social-card"><span class="social-platform">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p>${item[4] ? `<q>${item[4]}</q>` : ''}<a href="${item[3]}" target="_blank" rel="noopener">查看公開來源 ↗</a></article>`).join('')}</div></section>` : ''}
          <section class="spot-gallery" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading">景點照片圖庫</h2>
            <div class="gallery-stage"><img id="gallery-main" src="${imageUrl(gallery[0][0])}" alt="${gallery[0][1]}"><div class="gallery-caption" aria-live="polite"><strong id="gallery-title">${gallery[0][1]}</strong><span id="gallery-description">${gallery[0][2]}</span><small><span id="gallery-source">${gallery[0][3]}</span> ・ <a href="${root}../images/spots/SOURCES.md">照片出處</a></small></div></div>
            <div class="gallery-thumbs">${gallery.map((item, index) => `<button class="gallery-thumb" type="button" data-gallery-index="${index}" aria-current="${index === 0}"><img src="${imageUrl(item[0])}" alt=""><span>${item[1]}</span></button>`).join('')}</div>
          </section>
          <section id="photo-points"><h2>具體拍照點位</h2><div class="photo-grid">${d.photos.map((photo, index) => {
            const photoQuery = photo[2] || `${d.map} ${photo[0]}`;
            const photoMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(photoQuery)}`;
            const bestTime = photo[3] || '依當日動線抵達時間';
            const coordinate = photo[4] && photo[5] ? `${Number(photo[4]).toFixed(5)}, ${Number(photo[5]).toFixed(5)}` : photoQuery;
            const navigation = photo[4] && photo[5]
              ? `https://www.google.com/maps/dir/?api=1&destination=${photo[4]},${photo[5]}&travelmode=walking&dir_action=navigate`
              : photoMap;
            return `<article class="photo-point"><span class="photo-time">最佳 ${bestTime}</span><strong>PHOTO ${String(index + 1).padStart(2, '0')} ・ ${photo[0]}</strong><p>${photo[1]}</p><small class="photo-coordinate">座標：${coordinate}</small><a href="${navigation}" target="_blank" rel="noopener">導航至「${photo[0]}」↗</a></article>`;
          }).join('')}</div></section>
        </main>
        <aside class="panel source-panel" id="source-admin"><div class="eyebrow">SOURCE ADMIN</div><h2>資料管理</h2><p>${d.sources.length}／20 個正式來源<br>${social.length}／20 則公開社群實訪</p><details class="source-details"><summary>展開本頁正式來源</summary><ol class="source-list">${d.sources.map((source) => `<li><a href="${source[1]}" target="_blank" rel="noopener">${source[0]}</a><small>${source[2]}</small></li>`).join('')}</ol></details><div class="actions"><a class="btn" href="${root}sources/index.html">完整來源中心</a><a class="btn alt" href="${root}destinations/index.html">景點目錄</a></div></aside>
      </div>
    </div>`;

  const stage = mount.querySelector('.gallery-stage');
  const mainImage = mount.querySelector('#gallery-main');
  const galleryTitle = mount.querySelector('#gallery-title');
  const galleryDescription = mount.querySelector('#gallery-description');
  const gallerySource = mount.querySelector('#gallery-source');
  mount.querySelectorAll('.gallery-thumb').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.galleryIndex);
      const item = gallery[index];
      if (!item || button.getAttribute('aria-current') === 'true') return;
      stage.classList.add('is-changing');
      mainImage.src = imageUrl(item[0]);
      mainImage.alt = item[1];
      galleryTitle.textContent = item[1];
      galleryDescription.textContent = item[2];
      gallerySource.textContent = item[3];
      mount.querySelectorAll('.gallery-thumb').forEach((thumb) => thumb.setAttribute('aria-current', String(thumb === button)));
      window.setTimeout(() => stage.classList.remove('is-changing'), 180);
    });
  });
  const thumbs = [...mount.querySelectorAll('.gallery-thumb')];
  thumbs.forEach((button, index) => button.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = thumbs[(index + direction + thumbs.length) % thumbs.length];
    next.focus();
    next.click();
  }));
})();
