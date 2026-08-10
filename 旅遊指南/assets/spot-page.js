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

  const dayNum = (d.day.match(/\d+/) || ['1'])[0];
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.map)}`;
  const gallery = d.gallery || [[d.image, d.title, d.desc, d.credit ? `${d.credit[0]}・${d.credit[2]}` : '照片來源請見全站照片出處']];
  const social = d.social || [];
  if (!document.querySelector('link[data-spot-gallery]')) {
    const galleryStyles = document.createElement('link');
    galleryStyles.rel = 'stylesheet';
    galleryStyles.href = `${root}assets/gallery.css`;
    galleryStyles.dataset.spotGallery = 'true';
    document.head.appendChild(galleryStyles);
  }
  const credit = d.credit
    ? `<figcaption style="position:absolute;left:14px;bottom:12px;padding:7px 10px;border-radius:8px;background:rgba(15,25,32,.82);color:#fff;font-size:.72rem">照片：<a style="color:#fff" href="${d.credit[1]}" target="_blank" rel="noopener">${d.credit[0]}</a>・${d.credit[2]}</figcaption>`
    : '<figcaption style="position:absolute;left:14px;bottom:12px;padding:7px 10px;border-radius:8px;background:rgba(15,25,32,.82);color:#fff;font-size:.72rem">照片來源與授權請見頁面右側來源及全站照片出處。</figcaption>';

  document.title = `${d.title}｜東京六天五夜`;
  mount.innerHTML = `
    <div class="spot-page">
      <div class="shell spot-crumbs"><a href="${root}index.html">首頁</a> ／ <a href="${root}destinations/index.html">景點目錄</a> ／ ${d.city} ／ ${d.area} ／ ${d.title}</div>
      <section class="spot-hero">
        <figure class="spot-visual" style="position:relative;margin:0;min-width:0"><img src="${root}${d.image}" alt="${d.title}">${credit}</figure>
        <div class="spot-hero-copy">
          <div class="eyebrow">${d.city} ・ ${d.area}</div>
          <h1>${d.title}</h1>
          <p>${d.desc}</p>
          <div class="spot-tags"><span class="spot-tag">${d.day}</span><span class="spot-tag">${d.photos.length} 個拍照點</span><span class="spot-tag">10 個參考來源</span></div>
          <div class="actions"><a class="btn" href="${root}day${dayNum}.html">查看當日動線</a><a class="btn alt" href="${map}" target="_blank" rel="noopener">Google Maps</a></div>
        </div>
      </section>
      <div class="shell spot-body">
        <main>
          <section><h2>建議遊覽順序</h2><div class="flow-steps">${d.flow.map((step) => `<div class="flow-step">${step}</div>`).join('')}</div></section>
          ${social.length ? `<section class="social-insights" aria-labelledby="social-heading"><div class="social-heading"><div><span class="social-kicker">PUBLIC SOCIAL NOTES</span><h2 id="social-heading">社群實訪重點</h2></div><p>內容為公開貼文的重點摘要；引號內只保留極短節錄。Threads與小紅書未登入內容無法可靠查證，因此不引用不可讀取的貼文。</p></div><div class="social-grid">${social.map((item) => `<article class="social-card"><span class="social-platform">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p>${item[4] ? `<q>${item[4]}</q>` : ''}<a href="${item[3]}" target="_blank" rel="noopener">查看公開來源 ↗</a></article>`).join('')}</div></section>` : ''}
          <section class="spot-gallery" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading">景點照片圖庫</h2>
            <div class="gallery-stage"><img id="gallery-main" src="${root}${gallery[0][0]}" alt="${gallery[0][1]}"><div class="gallery-caption"><strong id="gallery-title">${gallery[0][1]}</strong><span id="gallery-description">${gallery[0][2]}</span><small><span id="gallery-source">${gallery[0][3]}</span> ・ <a href="${root}../images/spots/SOURCES.md" style="color:#fff">照片出處</a></small></div></div>
            <div class="gallery-thumbs">${gallery.map((item, index) => `<button class="gallery-thumb" type="button" data-gallery-index="${index}" aria-current="${index === 0}"><img src="${root}${item[0]}" alt=""><span>${item[1]}</span></button>`).join('')}</div>
          </section>
          <section><h2>具體拍照點位</h2><div class="photo-grid">${d.photos.map((photo, index) => {
            const photoQuery = photo[2] || `${d.map} ${photo[0]}`;
            const photoMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(photoQuery)}`;
            return `<article class="photo-point"><strong>PHOTO ${String(index + 1).padStart(2, '0')} ・ ${photo[0]}</strong><p>${photo[1]}</p><small style="display:block;margin:.65rem 0;color:var(--muted)">地圖搜尋：${photoQuery}</small><a href="${photoMap}" target="_blank" rel="noopener">定位「${photo[0]}」↗</a></article>`;
          }).join('')}</div></section>
        </main>
        <aside class="panel source-panel"><h2>本景點 10 個來源</h2><ol class="source-list">${d.sources.map((source) => `<li><a href="${source[1]}" target="_blank" rel="noopener">${source[0]}</a><small>${source[2]}</small></li>`).join('')}</ol><div class="actions"><a class="btn" href="${root}sources/index.html">完整來源中心</a><a class="btn alt" href="${root}destinations/index.html">景點目錄</a></div></aside>
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
      mainImage.src = `${root}${item[0]}`;
      mainImage.alt = item[1];
      galleryTitle.textContent = item[1];
      galleryDescription.textContent = item[2];
      gallerySource.textContent = item[3];
      mount.querySelectorAll('.gallery-thumb').forEach((thumb) => thumb.setAttribute('aria-current', String(thumb === button)));
      window.setTimeout(() => stage.classList.remove('is-changing'), 180);
    });
  });
})();
