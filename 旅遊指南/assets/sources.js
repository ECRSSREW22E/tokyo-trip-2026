(() => {
  const root = document.getElementById('source-center');
  if (!root) return;

  const spots = Object.values(window.TRIP_SPOTS);
  const controls = root.querySelector('.source-controls');
  const list = root.querySelector('.source-results');
  const count = root.querySelector('[data-count]');
  const cities = [...new Set(spots.map((spot) => spot.city))];
  const days = [...new Set(spots.flatMap((spot) => spot.day.split('／')))];

  controls.innerHTML = `
    <label>搜尋景點或來源
      <input class="source-search" type="search" placeholder="例如：江之島、Instagram、拍照">
    </label>
    <label>日期
      <select class="source-day">
        <option value="">全部日期</option>
        ${days.map((day) => `<option>${day}</option>`).join('')}
      </select>
    </label>
    <label>城市／都道府縣
      <select class="source-city">
        <option value="">全部地區</option>
        ${cities.map((city) => `<option>${city}</option>`).join('')}
      </select>
    </label>`;

  function render() {
    const query = controls.querySelector('.source-search').value.trim().toLowerCase();
    const day = controls.querySelector('.source-day').value;
    const city = controls.querySelector('.source-city').value;
    const found = spots.filter((spot) => {
      const socialText = (spot.social || []).flat().join(' ');
      const searchable = `${spot.title} ${spot.area} ${spot.sources.flat().join(' ')} ${socialText}`.toLowerCase();
      return (!day || spot.day.includes(day)) && (!city || spot.city === city) && (!query || searchable.includes(query));
    });
    const formalCount = found.reduce((total, spot) => total + spot.sources.length, 0);
    const socialCount = found.reduce((total, spot) => total + (spot.social || []).length, 0);

    count.textContent = `${found.length} 個景點・${formalCount} 個正式來源・${socialCount} 則社群實訪`;
    list.innerHTML = found.map((spot) => {
      const social = spot.social || [];
      const socialSection = social.length ? `
        <section class="social-source-section" aria-label="${spot.title}社群實訪來源">
          <h3>社群實訪摘要</h3>
          <p class="social-source-note">以公開可讀內容整理；引號內僅保留極短節錄。</p>
          <ul class="social-source-list">
            ${social.map((item) => `
              <li class="social-source-item">
                <span class="social-source-platform">${item[0]}</span>
                <strong>${item[1]}</strong>
                <p>${item[2]}</p>
                ${item[4] ? `<q>${item[4]}</q>` : ''}
                <a href="${item[3]}" target="_blank" rel="noopener noreferrer">查看原始公開內容 ↗</a>
              </li>`).join('')}
          </ul>
        </section>` : '';

      return `
        <details class="panel source-group">
          <summary>
            <strong>${spot.title}</strong>
            <span>${spot.day} · ${spot.city} · ${spot.sources.length} 個正式來源 · ${social.length} 則社群實訪</span>
          </summary>
          <section class="formal-source-section" aria-label="${spot.title}正式資料來源">
            <h3>官方、交通與旅遊資料</h3>
            <ol class="source-list">
              ${spot.sources.map((source) => `<li><a href="${source[1]}" target="_blank" rel="noopener noreferrer">${source[0]}</a><small>${source[2]}</small></li>`).join('')}
            </ol>
          </section>
          ${socialSection}
        </details>`;
    }).join('') || '<div class="panel">沒有符合條件的來源。</div>';
  }

  controls.addEventListener('input', render);
  render();
})();
