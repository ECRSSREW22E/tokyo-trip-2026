(() => {
  const root = document.querySelector('[data-screen-app]');
  const data = window.TokyoScreenData;
  if (!root || !data) return;

  const byId = list => new Map(list.map(item => [item.id, item]));
  const works = byId(data.screenWorks);
  const locations = byId(data.screenLocations);
  const sources = byId(data.screenSources);
  const areas = byId(data.screenAreas);
  const mediaGroup = type => type.startsWith('ANIME') ? 'anime' : (type.includes('MOVIE') ? 'movie' : 'drama');
  const mediaLabel = { anime: '動畫', drama: '日劇', movie: '電影' };
  const evidenceGroup = item => ['OFFICIAL','PRODUCTION_CONFIRMED','TOURISM_OFFICIAL','FILM_COMMISSION_CONFIRMED','VERIFIED_FILMING_LOCATION'].includes(item.evidenceType) ? 'verified' : item.evidenceType === 'STRONG_VISUAL_MATCH' ? 'match' : item.evidenceType === 'COMMUNITY_CONSENSUS' ? 'community' : 'reference';
  const routeOrder = ['DIRECT','NEARBY','SMALL_DETOUR','OPTIONAL_DETOUR','SPECIAL_TRIP','NOT_RECOMMENDED'];
  const routeLabel = { DIRECT:'順路', NEARBY:'附近', SMALL_DETOUR:'短支線', OPTIONAL_DETOUR:'可選支線', SPECIAL_TRIP:'專程前往', NOT_RECOMMENDED:'不建議' };
  const evidenceLabel = { OFFICIAL:'官方確認', PRODUCTION_CONFIRMED:'製作方確認', TOURISM_OFFICIAL:'官方觀光資料', FILM_COMMISSION_CONFIRMED:'外景協拍單位確認', VERIFIED_FILMING_LOCATION:'已驗證取景地', STRONG_VISUAL_MATCH:'高度視覺吻合', COMMUNITY_CONSENSUS:'社群共識', REFERENCE_ONLY:'僅供參考', OFFICIAL_PROMOTION_LOCATION:'官方合作地點', SEARCH_INDEX_ONLY:'僅有搜尋索引' };
  const confidenceLabel = { HIGH:'高', MEDIUM:'中', LOW:'低', UNKNOWN:'待確認' };
  const visitLabel = { QUICK:'快速停留 5–10 分鐘', NORMAL:'一般停留 10–20 分鐘', PHOTO_STOP:'拍照停留 20–35 分鐘', DEDICATED:'完整停留 45 分鐘以上' };
  const locationTypeLabel = { STREET:'街道', INTERSECTION:'路口', STAIRS:'階梯', BRIDGE:'橋梁', STATION:'車站', STATION_EXIT:'車站出口', PEDESTRIAN_BRIDGE:'人行天橋', PARK:'公園', SHRINE:'神社', TEMPLE:'寺院', MUSEUM:'博物館／館舍', CAFE:'咖啡店', RESTAURANT:'餐廳', BUILDING:'建築外觀', OBSERVATORY:'觀景台', BEACH:'海灘', WATERFRONT:'水岸', SHOPPING_STREET:'商店街', SCHOOL_EXTERIOR:'校園外觀', RESIDENTIAL_AREA:'住宅區', OTHER:'其他' };
  const evidenceText = value => evidenceLabel[value] || value;
  const state = { type:'all', work:'all', area:'all', day:'all', evidence:'all', route:'all', locationType:'all' };
  const controls = root.querySelector('[data-screen-controls]');
  const results = root.querySelector('[data-screen-results]');
  const count = root.querySelector('[data-screen-count]');
  const workSelect = root.querySelector('#screen-work');
  const dialog = root.querySelector('#screen-location-dialog');

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const readUrl = () => {
    const params = new URLSearchParams(location.search);
    Object.keys(state).forEach(key => { if (params.has(key)) state[key] = params.get(key); });
    if (params.has('type') && !['all','anime','drama','movie'].includes(state.type)) state.type = 'all';
  };
  const writeUrl = replace => {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key,value]) => { if (value && value !== 'all') params.set(key,value); });
    const next = `${location.pathname}${params.size ? `?${params}` : ''}`;
    history[replace ? 'replaceState' : 'pushState'](state, '', next);
  };
  const activeWorks = () => data.screenWorks.filter(work => state.type === 'all' || mediaGroup(work.mediaType) === state.type);
  const updateWorkOptions = () => {
    const eligible = activeWorks().sort((a,b) => a.nameZh.localeCompare(b.nameZh,'zh-Hant'));
    if (state.work !== 'all' && !eligible.some(item => item.id === state.work)) state.work = 'all';
    workSelect.innerHTML = `<option value="all">所有作品</option>${eligible.map(work => `<option value="${work.id}">${escapeHtml(work.nameZh)}｜${escapeHtml(work.nameJa)}</option>`).join('')}`;
    workSelect.value = state.work;
  };
  const matches = appearance => {
    const work = works.get(appearance.workId);
    const place = locations.get(appearance.locationId);
    return (state.type === 'all' || mediaGroup(work.mediaType) === state.type)
      && (state.work === 'all' || work.id === state.work)
      && (state.area === 'all' || place.areaId === state.area)
      && (state.day === 'all' || appearance.tripDays.includes(state.day))
      && (state.evidence === 'all' || evidenceGroup(appearance) === state.evidence)
      && (state.route === 'all' || appearance.routeRelevance === state.route)
      && (state.locationType === 'all' || place.locationType === state.locationType);
  };
  const visibleAppearances = () => data.screenAppearances.filter(matches).sort((a,b) => routeOrder.indexOf(a.routeRelevance) - routeOrder.indexOf(b.routeRelevance));
  const renderWorkCard = (work, appearances) => {
    const physical = [...new Set(appearances.map(item => item.locationId))];
    const workAreas = [...new Set(appearances.map(item => locations.get(item.locationId).areaId))];
    const direct = appearances.filter(item => ['DIRECT','NEARBY','SMALL_DETOUR'].includes(item.routeRelevance)).length;
    return `<article class="screen-work-card">
      <header><span>${mediaLabel[mediaGroup(work.mediaType)]}</span><small>${work.releaseYear || ''} 年</small></header>
      <h2 class="${work.nameZh.length > 16 ? 'is-very-long' : work.nameZh.length > 10 ? 'is-long' : ''}">${escapeHtml(work.nameZh)}</h2><p class="work-ja">${escapeHtml(work.nameJa)}${work.nameEn ? ` · ${escapeHtml(work.nameEn)}` : ''}</p>
      <div class="work-meta"><span>${physical.length} 個地點</span><span>${direct} 個位於正式動線</span></div>
      <p class="work-areas">${workAreas.map(id => escapeHtml(areas.get(id)?.nameZh || id)).join(' · ')}</p>
      <button class="text-link" type="button" data-work-open="${work.id}" aria-expanded="false">查看地點 <span aria-hidden="true">↓</span></button>
      <div class="screen-location-list" data-work-locations="${work.id}" hidden>${appearances.map(renderLocationCard).join('')}</div>
    </article>`;
  };
  function renderLocationCard(item) {
    const place = locations.get(item.locationId);
    return `<article class="screen-location-row">
      <button type="button" data-location-open="${item.id}" aria-label="查看 ${escapeHtml(place.nameZh)} 詳細資料">
        <span class="location-index">${String(data.screenAppearances.indexOf(item) + 1).padStart(2,'0')}</span>
        <span class="location-copy"><strong>${escapeHtml(place.nameZh)}</strong><small>${escapeHtml(item.sceneTitleZh)}</small><span class="location-time">${escapeHtml(item.suggestedTime)}</span></span>
        <span class="location-tags"><em data-evidence="${evidenceGroup(item)}">${escapeHtml(evidenceText(item.evidenceType))}</em><em>${escapeHtml(routeLabel[item.routeRelevance])}</em></span>
        <span aria-hidden="true">↗</span>
      </button>
    </article>`;
  }
  const render = () => {
    updateWorkOptions();
    root.querySelectorAll('[data-type]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.type === state.type)));
    root.querySelectorAll('select[data-state]').forEach(select => { select.value = state[select.dataset.state] || 'all'; });
    const appearances = visibleAppearances();
    const grouped = new Map();
    appearances.forEach(item => { if (!grouped.has(item.workId)) grouped.set(item.workId, []); grouped.get(item.workId).push(item); });
    const ordered = [...grouped.entries()].sort((a,b) => works.get(a[0]).nameZh.localeCompare(works.get(b[0]).nameZh,'zh-Hant'));
    count.textContent = `${ordered.length} 部作品 · ${new Set(appearances.map(item => item.locationId)).size} 個地點 · ${appearances.length} 筆場景關係`;
    results.innerHTML = ordered.length ? ordered.map(([workId,items]) => renderWorkCard(works.get(workId), items)).join('') : '<div class="screen-empty"><strong>沒有符合全部條件的地點。</strong><p>可放寬證據或動線條件，或按下重設。</p></div>';
  };
  const openDialog = id => {
    const item = data.screenAppearances.find(entry => entry.id === id);
    if (!item) return;
    const work = works.get(item.workId); const place = locations.get(item.locationId);
    const featured = data.screenAppearances.filter(entry => entry.locationId === place.id);
    const sourceList = [...new Set([...item.sourceIds,...place.sourceIds])].map(sourceId => sources.get(sourceId)).filter(Boolean);
    dialog.querySelector('[data-dialog-content]').innerHTML = `<button class="screen-dialog-close" type="button" data-dialog-close aria-label="關閉視窗">×</button><div class="dialog-kicker">${escapeHtml(work.nameZh)} · ${mediaLabel[mediaGroup(work.mediaType)]}</div>
      <h2 id="screen-dialog-title">${escapeHtml(place.nameZh)}</h2><p class="dialog-ja">${escapeHtml(place.nameJa)}</p>
      <div class="word-time"><small>Word 原行程時間</small><strong>${escapeHtml(item.suggestedTime)}</strong></div>
      <dl class="dialog-facts"><div><dt>場景</dt><dd>${escapeHtml(item.sceneTitleZh)}</dd></div><div><dt>證據</dt><dd>${escapeHtml(evidenceText(item.evidenceType))} · 可信度${confidenceLabel[item.evidenceConfidence]}</dd></div><div><dt>地區</dt><dd>${escapeHtml(areas.get(place.areaId)?.nameZh || place.areaId)} · ${escapeHtml(place.subArea)}</dd></div><div><dt>動線</dt><dd>${escapeHtml(routeLabel[item.routeRelevance])}${item.detourMinutes ? ` · 約 ${item.detourMinutes} 分鐘支線` : ''}</dd></div><div><dt>停留</dt><dd>${escapeHtml(visitLabel[item.visitTime] || item.visitTime)}</dd></div><div><dt>地點類型</dt><dd>${escapeHtml(locationTypeLabel[place.locationType] || place.locationType)}</dd></div></dl>
      <section><h3>拍攝方式</h3><p>${escapeHtml(item.photoMatchGuide)}</p><p>${escapeHtml(item.suggestedAngle)}</p></section>
      <section><h3>安全與禮儀</h3><ul>${[...place.safetyNotes,...place.etiquetteNotes].map(note => `<li>${escapeHtml(note)}</li>`).join('') || '<li>遵守現場告示，不妨礙交通、居民與店家。</li>'}</ul></section>
      ${featured.length > 1 ? `<section><h3>同一地點出現的作品</h3><p>${featured.map(entry => escapeHtml(works.get(entry.workId).nameZh)).join(' · ')}</p></section>` : ''}
      <section><h3>資料來源</h3><ol>${sourceList.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} ↗</a><small>${escapeHtml(evidenceText(source.evidence))}</small></li>`).join('')}</ol></section>
      <div class="dialog-actions"><a class="btn" href="${place.mapUrl}" target="_blank" rel="noopener noreferrer">Google Maps 導航</a><button class="btn alt" type="button" data-dialog-close>關閉</button></div>`;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('[data-dialog-close]').focus();
  };

  controls.addEventListener('click', event => {
    const type = event.target.closest('[data-type]');
    if (type) { state.type = type.dataset.type; state.work = 'all'; writeUrl(); render(); }
    if (event.target.closest('[data-reset]')) { Object.keys(state).forEach(key => state[key] = 'all'); writeUrl(); render(); }
  });
  controls.addEventListener('change', event => {
    const select = event.target.closest('select[data-state]'); if (!select) return;
    state[select.dataset.state] = select.value; writeUrl(); render();
  });
  results.addEventListener('click', event => {
    const workButton = event.target.closest('[data-work-open]');
    if (workButton) { const list = results.querySelector(`[data-work-locations="${workButton.dataset.workOpen}"]`); list.hidden = !list.hidden; workButton.setAttribute('aria-expanded', String(!list.hidden)); }
    const locationButton = event.target.closest('[data-location-open]'); if (locationButton) openDialog(locationButton.dataset.locationOpen);
  });
  const closeScreenDialog = () => { if (dialog.open) dialog.close(); document.body.classList.remove('dialog-open'); };
  dialog.addEventListener('click', event => { if (event.target === dialog || event.target.closest('[data-dialog-close]')) closeScreenDialog(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  window.addEventListener('popstate', () => { Object.keys(state).forEach(key => state[key] = 'all'); readUrl(); render(); });
  readUrl(); writeUrl(true); render();
})();
