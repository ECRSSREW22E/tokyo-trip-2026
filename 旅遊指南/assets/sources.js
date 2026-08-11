(() => {
  const root = document.getElementById('source-center');
  if (!root) return;

  const spots = Object.values(window.TRIP_SPOTS);
  const controls = root.querySelector('.source-controls');
  const list = root.querySelector('.source-results');
  const count = root.querySelector('[data-count]');
  const intro = root.querySelector('.directory-hero p');
  if (intro) intro.textContent = '資料管理目標為每個地點 20 個官方／交通／旅遊來源與 20 則可核對的社群實訪；頁面會依目前實際完成數量即時顯示。公開貼文只保留摘要與原始連結，活動、票價及營業時間仍須在出發前重新確認。';
  const cities = [...new Set(spots.map((spot) => spot.city))];
  const days = [...new Set(spots.flatMap((spot) => spot.day.split('／')))];
  const targetPerSpot = 20;
  const targetTotal = spots.length * targetPerSpot;
  const formalTotal = spots.reduce((total, spot) => total + spot.sources.length, 0);
  const socialTotal = spots.reduce((total, spot) => total + (spot.social || []).length, 0);
  const formalReady = spots.filter((spot) => spot.sources.length >= targetPerSpot).length;
  const socialReady = spots.filter((spot) => (spot.social || []).length >= targetPerSpot).length;
  const shoppingData = window.TokyoShoppingData;

  const stats = document.createElement('section');
  stats.className = 'source-stats';
  stats.setAttribute('aria-label', '資料完成度');
  stats.innerHTML = `
    <article class="source-stat"><small>景點資料頁</small><strong>${spots.length} 個</strong><span>全部已建立獨立頁面</span></article>
    <article class="source-stat"><small>正式來源完成度</small><strong>${formalTotal} 個</strong><span>${formalReady}／${spots.length} 頁達到 20 筆</span><progress max="${spots.length}" value="${formalReady}" aria-label="正式來源頁面完成度"></progress></article>
    <article class="source-stat is-social"><small>可信社群實訪完成度</small><strong>${socialTotal}／${targetTotal}</strong><span>${socialReady}／${spots.length} 頁達到 20 筆</span><progress max="${targetTotal}" value="${socialTotal}" aria-label="社群實訪完成度"></progress></article>`;
  controls.before(stats);

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
            <strong>${spot.title}<span class="source-coverage ${social.length >= targetPerSpot ? 'is-complete' : ''}">社群 ${social.length}／${targetPerSpot}</span></strong>
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

  const screenData = window.TokyoScreenData;
  if (screenData) {
    const screenSourceTypeLabel = { 'official-work':'作品官方', 'official-location':'地點官方', 'tourism-official':'官方觀光資料', 'film-commission':'外景協拍單位', social:'社群資料', 'pilgrimage-blog':'巡禮實訪', editorial:'編輯資料', 'map-verification':'地圖核對' };
    const screenEvidenceLabel = { OFFICIAL:'官方確認', PRODUCTION_CONFIRMED:'製作方確認', TOURISM_OFFICIAL:'官方觀光資料', FILM_COMMISSION_CONFIRMED:'外景協拍單位確認', VERIFIED_FILMING_LOCATION:'已驗證取景地', COMMUNITY_CONSENSUS:'社群共識', OFFICIAL_PROMOTION_LOCATION:'官方合作地點', SEARCH_INDEX_ONLY:'僅有搜尋索引' };
    const screenLibrary = document.createElement('section');
    const accessible = screenData.screenSources.filter((source) => source.sourceAccessible);
    const restricted = screenData.screenSources.filter((source) => !source.sourceAccessible);
    const typeCounts = screenData.screenSources.reduce((result, source) => {
      result[source.type] = (result[source.type] || 0) + 1;
      return result;
    }, {});
    screenLibrary.className = 'shopping-source-library shell';
    screenLibrary.innerHTML = `<div class="shopping-source-head"><div class="eyebrow">作品場景研究</div><h2>作品場景證據帳本</h2><p>作品、實體地點與場景關係分開管理。官方合作地不等於取景地；社群共識也不會顯示成官方確認。無法完整讀取的社群平台只保留搜尋索引，不升級為高可信度。</p><dl><div><dt>作品</dt><dd>${screenData.screenWorks.length}</dd></div><div><dt>地點</dt><dd>${screenData.screenLocations.length}</dd></div><div><dt>場景關係</dt><dd>${screenData.screenAppearances.length}</dd></div><div><dt>來源</dt><dd>${screenData.screenSources.length}</dd></div></dl></div><details class="panel source-group" open><summary><strong>可完整核對的作品場景來源</strong><span>${accessible.length} 筆 · ${Object.entries(typeCounts).map(([name,total]) => `${screenSourceTypeLabel[name] || name} ${total}`).join(' · ')}</span></summary><ol class="source-list shopping-source-list">${accessible.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a><small>${screenSourceTypeLabel[source.type] || source.type} · ${screenEvidenceLabel[source.evidence] || source.evidence} · ${source.lastVerified} 核對</small></li>`).join('')}</ol></details><details class="panel source-group"><summary><strong>登入受限／搜尋索引</strong><span>${restricted.length} 筆 · 不作高可信證據</span></summary><ol class="source-list shopping-source-list">${restricted.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a><small>${screenSourceTypeLabel[source.type] || source.type} · ${screenEvidenceLabel[source.evidence] || source.evidence}</small></li>`).join('')}</ol></details>`;
    root.append(screenLibrary);
  }

  if (shoppingData) {
    const library = document.createElement('section');
    const accessible = shoppingData.shoppingSources.filter((source) => source.sourceAccessible);
    const restricted = shoppingData.shoppingSources.filter((source) => !source.sourceAccessible);
    const platformCounts = shoppingData.shoppingSources.reduce((result, source) => {
      result[source.platform] = (result[source.platform] || 0) + 1;
      return result;
    }, {});
    library.className = 'shopping-source-library shell';
    library.innerHTML = `<div class="shopping-source-head"><div class="eyebrow">SHOPPING RESEARCH</div><h2>購物指南來源帳本</h2><p>社群用於發現需求，官方用於核對事實。Store Directory 將商場、品牌與實際分店分開管理；登入受限或只能讀取搜尋索引的來源不列為完整實訪。</p><dl><div><dt>PRODUCTS</dt><dd>${shoppingData.shoppingItems.length}</dd></div><div><dt>VENUES</dt><dd>${shoppingData.shoppingVenues.length}</dd></div><div><dt>BRANDS</dt><dd>${shoppingData.shoppingBrands.length}</dd></div><div><dt>BRANCHES</dt><dd>${shoppingData.shoppingBranches.length}</dd></div><div><dt>SOURCES</dt><dd>${shoppingData.shoppingSources.length}</dd></div></dl></div><details class="panel source-group" open><summary><strong>可完整核對的購物來源</strong><span>${accessible.length} 筆 · ${Object.entries(platformCounts).map(([name,total]) => `${name} ${total}`).join(' · ')}</span></summary><ol class="source-list shopping-source-list">${accessible.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a><small>${source.kind.toUpperCase()} · ${(source.platform || 'official').toUpperCase()} · ${source.evidence || source.note || 'SOURCE RECORD'}</small></li>`).join('')}</ol></details><details class="panel source-group"><summary><strong>存取受限／只保留索引證據</strong><span>${restricted.length} 筆 · 不作 HIGH evidence</span></summary><ol class="source-list shopping-source-list">${restricted.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a><small>${(source.platform || 'unknown').toUpperCase()} · ${source.evidence || source.note || 'INDEX EVIDENCE ONLY'}</small></li>`).join('')}</ol></details>`;
    root.append(library);
  }

  const mediaRights = window.TokyoMediaRights;
  if (mediaRights) {
    const ledger = document.createElement('section');
    const approved = mediaRights.media.filter((item) => item.deploymentStatus === 'APPROVED');
    const blocked = mediaRights.media.filter((item) => item.deploymentStatus === 'DO_NOT_DEPLOY');
    const referenceOnly = mediaRights.media.filter((item) => item.deploymentStatus === 'REFERENCE_ONLY');
    ledger.className = 'shopping-source-library shell';
    ledger.innerHTML = `<div class="shopping-source-head"><div class="eyebrow">MEDIA RIGHTS LEDGER</div><h2>圖片與 PDF 部署資格</h2><p>私人、非營利不會自動取得圖片重製權。只有同時留存原始作品頁、授權條款與必要署名的檔案，才會進入 GitHub Pages。</p><dl><div><dt>APPROVED</dt><dd>${approved.length}</dd></div><div><dt>DO NOT DEPLOY</dt><dd>${blocked.length}</dd></div><div><dt>REFERENCE ONLY</dt><dd>${referenceOnly.length}</dd></div></dl></div><details class="panel source-group" open><summary><strong>目前媒體審核結果</strong><span>${mediaRights.media.length} 筆 · ${mediaRights.reviewedAt}</span></summary><ol class="source-list shopping-source-list">${mediaRights.media.map(item => `<li><strong>${item.fileName}</strong><small>${item.deploymentStatus} · ${item.area} · ${item.reason}</small></li>`).join('')}</ol></details><details class="panel source-group"><summary><strong>官方授權規則</strong><span>${mediaRights.policySources.length} 筆</span></summary><ol class="source-list shopping-source-list">${mediaRights.policySources.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a><small>${source.decision}</small></li>`).join('')}</ol></details>`;
    root.append(ledger);
  }

  const specialData = window.TokyoSpecialItems;
  if (specialData) {
    const typeLabels = {
      'official-seasonal':'官方季節情報', 'official-shrine':'神社官方',
      'official-temple':'寺院官方', 'official-product':'商品官方',
      'official-event':'活動官方', social:'社群公開內容', community:'社群公開內容',
      'local-media':'地方媒體', 'travel-blog':'旅遊實訪'
    };
    const specialLibrary = document.createElement('section');
    const official = specialData.sources.filter((source) => source.type.startsWith('official'));
    const social = specialData.sources.filter((source) => ['social','community','local-media','travel-blog'].includes(source.type));
    const current = specialData.items.filter((item) => item.tripDateOverlap === 'AVAILABLE_DURING_TRIP');
    const check = specialData.items.filter((item) => item.tripDateOverlap === 'CHECK_BEFORE_VISIT');
    const sourceRows = (rows) => rows.map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a><small>${typeLabels[source.type] || source.type} · ${source.confidence} 信心 · ${source.freshness} · ${source.retrievedDate} 擷取 · ${source.scope}</small></li>`).join('');
    specialLibrary.className = 'shopping-source-library shell';
    specialLibrary.innerHTML = `<div class="shopping-source-head"><div class="eyebrow">2026 夏季現場情報</div><h2>限定商品與季節活動證據帳本</h2><p>社群只用來發現實走重點；正式名稱、日期、價格與規則一律回到官方核對。常設代表商品不會被誤標成限定。</p><dl><div><dt>情報項目</dt><dd>${specialData.items.length}</dd></div><div><dt>旅程期間確認</dt><dd>${current.length}</dd></div><div><dt>出發前再確認</dt><dd>${check.length}</dd></div><div><dt>官方來源</dt><dd>${official.length}</dd></div><div><dt>社群來源</dt><dd>${social.length}</dd></div></dl></div><details class="panel source-group" open><summary><strong>官方季節、神社、寺院與活動來源</strong><span>${official.length} 筆</span></summary><ol class="source-list shopping-source-list">${sourceRows(official)}</ol></details><details class="panel source-group"><summary><strong>社群探索與實走參考</strong><span>${social.length} 筆 · 不取代官方</span></summary><ol class="source-list shopping-source-list">${sourceRows(social)}</ol></details>`;
    root.append(specialLibrary);
  }
})();
