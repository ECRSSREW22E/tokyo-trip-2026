(() => {
  const root = document.getElementById('shopping-guide');
  const data = window.TokyoShoppingData;
  if (!root || !data) return;

  const {shoppingItems: items, shoppingPlaces: places, shoppingDistricts: districts, shoppingStrategies: strategies, shoppingSources: sources, meta} = data;
  const itemById = new Map(items.map(item => [item.id, item]));
  const placeById = new Map(places.map(place => [place.id, place]));
  const sourceById = new Map(sources.map(source => [source.id, source]));
  const categoryNames = {
    DRUGSTORE:'藥妝與日常保養', BEAUTY:'百貨美妝', FASHION:'時裝與配件', DEPARTMENT_STORE_FOOD:'百貨地下街',
    CONVENIENCE_STORE:'便利商店', SUPERMARKET:'超市食品', LIFESTYLE:'生活選品', STATIONERY:'文具',
    ANIME_CHARACTER:'動漫與角色', ELECTRONICS:'電器與攝影', LOCAL_SOUVENIRS:'地方伴手禮'
  };
  const categoryShort = {DRUGSTORE:'DRUGSTORE',BEAUTY:'BEAUTY',FASHION:'FASHION',DEPARTMENT_STORE_FOOD:'DEPACHIKA',CONVENIENCE_STORE:'CONVENIENCE',SUPERMARKET:'SUPERMARKET',LIFESTYLE:'LIFESTYLE',STATIONERY:'STATIONERY',ANIME_CHARACTER:'ANIME',ELECTRONICS:'ELECTRONICS',LOCAL_SOUVENIRS:'LOCAL'};
  const placeTypeNames = {ALL:'ALL PLACES',DRUGSTORE:'DRUGSTORES',BEAUTY_SELECT:'BEAUTY SELECT',DISCOUNT_STORE:'DISCOUNT',DEPARTMENT_STORE:'DEPARTMENT STORES',URBAN_SHOPPING:'URBAN SHOPPING',ELECTRONICS:'ELECTRONICS',SPECIALTY_STORE:'SPECIALTY',SPECIALTY_MALL:'SPECIALTY',LOCAL_SHOPPING:'LOCAL'};
  const e = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const unique = values => [...new Set(values)];
  const allPlaceIds = item => unique([...item.recommendedPlaceIds, ...item.bestValuePlaceIds, ...item.bestSelectionPlaceIds, ...item.convenientPlaceIds]);
  const displayDay = days => days.length ? days.map(day => `D${day}`).join(' · ') : 'OPTIONAL DETOUR';
  const storageKey = meta.storageKey;
  let saved = new Set();
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(raw)) saved = new Set(raw.map(String));
  } catch (_) {}

  let migrated = false;
  items.forEach(item => (item.legacyIds || []).forEach(oldId => {
    if (saved.has(oldId)) { saved.delete(oldId); saved.add(item.id); migrated = true; }
  }));
  if (migrated) persist();

  const productState = {query:'',category:'',area:'',day:'',tier:'',price:''};
  let placeType = 'ALL';
  let showAllPlaces = false;
  let activeDay = 1;

  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch (_) {}
  }

  function isSelected(item) { return saved.has(item.id); }
  function toggleItem(id) {
    const item = itemById.get(id);
    if (!item) return;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    (item.legacyIds || []).forEach(oldId => saved.delete(oldId));
    persist();
    updateListCount();
    renderProducts();
    renderPlaces();
    if (document.querySelector('[data-list-dialog][open]')) renderList();
  }

  function updateListCount() {
    const count = items.filter(isSelected).length;
    document.querySelectorAll('[data-list-count]').forEach(node => { node.textContent = count; });
  }

  function priceBand(item) {
    const values = [...item.priceRange.matchAll(/[\d,]+/g)].map(match => Number(match[0].replaceAll(',',''))).filter(Number.isFinite);
    const min = values[0];
    if (!min) return item.category === 'ELECTRONICS' ? 'high' : 'low';
    return min < 1500 ? 'low' : min <= 5000 ? 'mid' : 'high';
  }

  function productMatches(item) {
    const haystack = `${item.nameZh} ${item.nameJa} ${item.nameEn} ${item.brand} ${item.subcategory} ${item.whyPeopleBuyIt} ${item.whyWorthBuying}`.toLowerCase();
    return (!productState.query || haystack.includes(productState.query)) &&
      (!productState.category || item.category === productState.category) &&
      (!productState.area || item.bestAreaIds.includes(productState.area)) &&
      (!productState.day || item.tripDays.includes(Number(productState.day))) &&
      (!productState.tier || item.recommendationTier === productState.tier) &&
      (!productState.price || priceBand(item) === productState.price);
  }

  function productCard(item) {
    const bestPlace = placeById.get(item.bestSelectionPlaceIds[0] || item.recommendedPlaceIds[0]);
    const trend = item.trendType[0] || 'EDITOR PICK';
    return `<article class="product-card tier-${e(item.recommendationTier)}" data-product-id="${e(item.id)}">
      <div class="product-card-head"><span>${e(trend)}</span><button class="product-check ${isSelected(item) ? 'is-selected' : ''}" type="button" data-toggle-item="${e(item.id)}" aria-pressed="${isSelected(item)}" aria-label="${isSelected(item) ? '從清單移除' : '加入清單'}：${e(item.nameZh)}"><i aria-hidden="true">${isSelected(item) ? '✓' : '+'}</i></button></div>
      <div class="product-card-title"><p>${e(categoryShort[item.category])} / ${e(item.subcategory)}</p><h3>${e(item.nameZh)}</h3><span>${e(item.nameJa)}</span></div>
      <p class="product-card-reason">${e(item.whyWorthBuying)}</p>
      <dl class="product-card-meta"><div><dt>BEST PLACE</dt><dd>${e(bestPlace?.nameZh || '依現場比較')}</dd></div><div><dt>ON YOUR ROUTE</dt><dd>${e(displayDay(item.tripDays))}</dd></div><div><dt>TIER</dt><dd class="tier-mark">${e(item.recommendationTier)}</dd></div></dl>
      <button class="card-link" type="button" data-open-product="${e(item.id)}">VIEW DETAILS <span>→</span></button>
    </article>`;
  }

  function renderProducts() {
    const visible = items.filter(item => item.core && productMatches(item)).sort((a,b) => b.recommendationScore - a.recommendationScore);
    document.querySelector('[data-product-count]').textContent = `${visible.length} / ${items.filter(item => item.core).length} CORE PICKS`;
    document.querySelector('[data-product-grid]').innerHTML = visible.map(productCard).join('') || '<p class="empty-state">沒有符合條件的商品。放寬一個篩選再試一次。</p>';
  }

  function selectedForPlace(place) { return place.recommendedItemIds.map(id => itemById.get(id)).filter(item => item && isSelected(item)); }
  function placeCard(place, index) {
    const selected = selectedForPlace(place);
    return `<article class="place-card" data-place-id="${e(place.id)}"><span class="place-number">${String(index + 1).padStart(2,'0')}</span><div class="place-card-main"><p>${e(place.type.replaceAll('_',' '))}</p><h3>${e(place.nameEn)}</h3><span>${e(place.nameZh)} · ${e(place.area)}</span><ul>${place.strengths.slice(0,3).map(value => `<li>${e(value)}</li>`).join('')}</ul></div><div class="place-card-route"><span>${place.tripDays.length ? `DAY ${place.tripDays.map(String).join(' / ')}` : `DETOUR ${place.detourLevel}`}</span><strong>${selected.length ? `${selected.length} ITEMS ON YOUR LIST` : place.positioning}</strong></div><button class="card-link" type="button" data-open-place="${e(place.id)}">EXPLORE <span>→</span></button></article>`;
  }

  function renderPlaces() {
    const filtered = places.filter(place => placeType === 'ALL' || (placeType === 'SPECIALTY' ? ['SPECIALTY_STORE','SPECIALTY_MALL'].includes(place.type) : place.type === placeType));
    const sorted = [...filtered].sort((a,b) => (b.tripDays.length - a.tripDays.length) || (a.detourLevel - b.detourLevel));
    const visible = showAllPlaces ? sorted : sorted.slice(0,12);
    document.querySelector('[data-place-grid]').innerHTML = visible.map(placeCard).join('');
    const more = document.querySelector('[data-more-places]');
    more.hidden = sorted.length <= 12;
    more.textContent = showAllPlaces ? 'SHOW FEWER PLACES' : `SHOW ${sorted.length - 12} MORE PLACES`;
  }

  function renderDistricts() {
    document.querySelector('[data-district-list]').innerHTML = districts.map((district,index) => {
      const entries = Object.entries(district.bestFor).slice(0,5);
      return `<details class="district-row" ${index < 2 ? 'open' : ''}><summary><span>${String(index+1).padStart(2,'0')}</span><div><h3>${e(district.nameEn)}</h3><p>${e(district.nameZh)} · ${e(district.positioning)}</p></div><i>＋</i></summary><div class="district-body"><dl>${entries.map(([key,value]) => `<div><dt>${e(key.replaceAll(/([A-Z])/g,' $1').toUpperCase())}</dt><dd>${e(value)}</dd></div>`).join('')}</dl><p>${e(district.notes)}</p><div>${district.placeIds.map(id => placeById.get(id)).filter(Boolean).map(place => `<button type="button" data-open-place="${e(place.id)}">${e(place.nameZh)} ↗</button>`).join('')}</div></div></details>`;
    }).join('');
  }

  function renderStrategy() {
    const strategy = strategies.find(entry => entry.day === activeDay);
    document.querySelector('[data-day-tabs]').innerHTML = strategies.map(entry => `<button type="button" role="tab" aria-selected="${entry.day === activeDay}" data-strategy-day="${entry.day}">D${entry.day}</button>`).join('');
    document.querySelector('[data-day-strategy]').innerHTML = `<div class="strategy-lead"><span>DAY ${String(strategy.day).padStart(2,'0')}</span><h3>${e(strategy.areas.join(' · '))}</h3><p>${e(strategy.focus.join(' / '))}</p></div><div class="strategy-columns"><section><p>BUY NOW</p><ul>${strategy.buyNow.map(value => `<li>${e(value)}</li>`).join('')}</ul></section><section><p>DEFER</p><ul>${strategy.defer.map(value => `<li>${e(value)}</li>`).join('')}</ul></section><section><p>TIME BUDGET</p><strong>${e(strategy.timeBudget)}</strong></section></div><div class="strategy-places">${strategy.primaryPlaceIds.map(id => placeById.get(id)).filter(Boolean).map(place => `<button type="button" data-open-place="${e(place.id)}">${e(place.nameZh)} <span>→</span></button>`).join('')}</div>`;
  }

  function sourceLinks(ids) {
    return ids.map(id => sourceById.get(id)).filter(Boolean).map(source => `<a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.platform.toUpperCase())} · ${e(source.title)} ↗</a>`).join('');
  }

  function openProduct(id) {
    const item = itemById.get(id); if (!item) return;
    const signals = Object.entries(item.platformSignals).filter(([,value]) => value !== 'NONE');
    const placeGroups = [['BEST SELECTION',item.bestSelectionPlaceIds],['BEST VALUE',item.bestValuePlaceIds],['MOST CONVENIENT',item.convenientPlaceIds],['ALTERNATIVE',item.recommendedPlaceIds]].filter(([,ids]) => ids.length);
    document.querySelector('[data-product-detail]').innerHTML = `<header class="detail-head"><p>${e(item.trendType.join(' · '))}</p><h2 id="product-dialog-title">${e(item.nameZh)}</h2><span>${e(item.nameJa)} / ${e(item.brand)}</span><button type="button" class="detail-list-button ${isSelected(item) ? 'is-selected' : ''}" data-toggle-item="${e(item.id)}">${isSelected(item) ? '✓ ADDED TO MY LIST' : '+ ADD TO MY LIST'}</button></header><div class="detail-score"><div><strong>${e(item.recommendationTier)}</strong><span>TIER</span></div><div><strong>${item.recommendationScore}</strong><span>SCORE / 100</span></div><div><strong>${item.communityConsensus}</strong><span>CONSENSUS / 5</span></div></div><div class="detail-editorial"><section><p>WHY PEOPLE BUY IT</p><h3>${e(item.whyPeopleBuyIt)}</h3></section><section><p>WHY BUY IN JAPAN</p><h3>${e(item.whyWorthBuying)}</h3><span>${e(item.japanAdvantage)}</span></section><section class="detail-skip"><p>WHY YOU MAY SKIP IT</p><h3>${e(item.whyMaybeSkip)}</h3>${item.safetyNote ? `<strong>${e(item.safetyNote)}</strong>` : ''}</section></div><div class="detail-facts"><dl><div><dt>PRICE RANGE</dt><dd>${e(item.priceRange)}</dd></div><div><dt>TAIWAN</dt><dd>${e(item.taiwanAvailability)}</dd></div><div><dt>WHEN TO BUY</dt><dd>${e(item.buyTiming)}</dd></div><div><dt>ON ROUTE</dt><dd>${e(displayDay(item.tripDays))}</dd></div><div><dt>SOCIAL CONFIDENCE</dt><dd>${e(item.socialConfidence)}</dd></div><div><dt>FACT CONFIDENCE</dt><dd>${e(item.factConfidence)}</dd></div></dl></div><section class="detail-where"><p>WHERE TO BUY</p>${placeGroups.map(([label,ids]) => `<div><span>${label}</span>${unique(ids).map(placeId => placeById.get(placeId)).filter(Boolean).map(place => `<button type="button" data-open-place="${e(place.id)}">${e(place.nameZh)} ↗</button>`).join('')}</div>`).join('')}</section><section class="detail-signals"><p>SOCIAL SIGNAL</p><div>${signals.map(([platform,value]) => `<span>${e(platform)} <b>${e(value)}</b></span>`).join('')}</div></section>${item.needsVerification ? '<p class="verify-note">CHECK BEFORE VISIT · 價格、庫存或 2026 限定資訊尚需出發前確認。</p>' : ''}<section class="detail-sources"><p>SOURCES</p><div>${sourceLinks(item.sources)}<a href="${e(item.officialUrl)}" target="_blank" rel="noopener noreferrer">OFFICIAL PRODUCT ↗</a></div></section>`;
    showDialog(document.querySelector('[data-product-dialog]'));
  }

  function openPlace(id) {
    const place = placeById.get(id); if (!place) return;
    const selected = selectedForPlace(place);
    const recommended = place.recommendedItemIds.map(itemId => itemById.get(itemId)).filter(Boolean).sort((a,b) => b.recommendationScore-a.recommendationScore).slice(0,8);
    const socialEvidence = (place.socialSources || []).map(sourceId => sourceById.get(sourceId)).filter(Boolean);
    const socialSection = socialEvidence.length ? `<section class="place-social"><p>PUBLIC TRAVELER NOTES · ${e(place.socialConfidence)}</p><h3>${e(place.socialSummary)}</h3><ul>${socialEvidence.map(source => `<li><a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.title)} ↗</a><span>${e(source.platform.toUpperCase())} · ${e(source.freshness || 'REFERENCE')} · ${e(source.confidence || 'MEDIUM')}</span>${source.scope ? `<small>${e(source.scope)}</small>` : ''}</li>`).join('')}</ul></section>` : '';
    document.querySelector('[data-place-detail]').innerHTML = `<header class="detail-head"><p>${e(place.type.replaceAll('_',' '))} · DETOUR ${place.detourLevel}</p><h2 id="place-dialog-title">${e(place.nameEn)}</h2><span>${e(place.nameZh)} · ${e(place.nameJa)} · ${e(place.area)}</span></header><div class="place-position"><p>POSITIONING</p><h3>${e(place.positioning)}</h3></div><div class="place-detail-grid"><section><p>BEST FOR</p><ul>${place.bestFor.map(value => `<li>${e(value)}</li>`).join('')}</ul></section><section><p>SKIP IF</p><ul>${place.notIdealFor.map(value => `<li>${e(value)}</li>`).join('')}</ul></section><section><p>TIME NEEDED</p><dl>${Object.entries(place.timeNeeded).map(([key,value]) => `<div><dt>${e(key.toUpperCase())}</dt><dd>${e(value)}</dd></div>`).join('')}</dl></section></div><section class="place-your-list"><p>YOUR SHOPPING LIST</p><h3>${selected.length ? `${selected.length} 項可在這裡處理` : '目前清單沒有對應商品'}</h3>${selected.length ? `<ul>${selected.map(item => `<li><button type="button" data-open-product="${e(item.id)}">${e(item.nameZh)} <span>→</span></button></li>`).join('')}</ul>` : `<span>此店仍有 ${recommended.length} 項研究推薦可查看。</span>`}</section><section class="place-recommended"><p>EDITOR PICKS HERE</p><div>${recommended.map(item => `<button type="button" data-open-product="${e(item.id)}"><span>TIER ${e(item.recommendationTier)}</span>${e(item.nameZh)}</button>`).join('')}</div></section><div class="place-traveler"><p>TAX FREE / TRAVELER NOTE</p><h3>${e(place.taxFreeInfo)}</h3><span>${e(place.travelerNotes || '營業時間、服務與活動出發前查看官方。')}</span></div>${socialSection}${place.needsVerification ? '<p class="verify-note">CHECK BEFORE VISIT · 營業樓層或服務資訊仍可能變動。</p>' : ''}<div class="detail-actions"><a href="${e(place.mapUrl)}" target="_blank" rel="noopener noreferrer">OPEN IN GOOGLE MAPS ↗</a><a href="${e(place.officialUrl)}" target="_blank" rel="noopener noreferrer">OFFICIAL WEBSITE ↗</a></div>`;
    closeDialog(document.querySelector('[data-product-dialog]'));
    showDialog(document.querySelector('[data-place-dialog]'));
  }

  function renderList() {
    const selected = items.filter(isSelected).sort((a,b) => (a.tripDays[0] || 9) - (b.tripDays[0] || 9));
    const unknownCount = [...saved].filter(id => !itemById.has(id)).length;
    document.querySelector('[data-list-detail]').innerHTML = selected.length ? `<div class="saved-list">${selected.map(item => `<article><button class="product-check is-selected" type="button" data-toggle-item="${e(item.id)}" aria-label="移除 ${e(item.nameZh)}">✓</button><div><span>${e(displayDay(item.tripDays))} · ${e(item.buyTiming)}</span><h3>${e(item.nameZh)}</h3><p>${e(item.priceRange)} · TIER ${e(item.recommendationTier)}</p></div><button type="button" data-open-product="${e(item.id)}">DETAILS →</button></article>`).join('')}</div>${unknownCount ? `<p class="legacy-note">另保留 ${unknownCount} 個舊版清單 ID，未清除你的既有資料。</p>` : ''}` : '<p class="empty-state">還沒有加入商品。從 CORE PICKS 點選「＋」開始。</p>';
  }

  function showDialog(dialog) { if (dialog && !dialog.open) dialog.showModal(); }
  function closeDialog(dialog) { if (dialog?.open) dialog.close(); }

  function initControls() {
    const categories = unique(items.filter(item => item.core).map(item => item.category));
    document.querySelector('[data-category-gateway]').innerHTML = categories.map((category,index) => `<button type="button" data-category-jump="${e(category)}"><span>${String(index+1).padStart(2,'0')}</span><strong>${e(categoryShort[category])}</strong><small>${e(categoryNames[category])}</small><i>↘</i></button>`).join('');
    document.querySelector('[data-filter-category]').insertAdjacentHTML('beforeend', categories.map(category => `<option value="${e(category)}">${e(categoryNames[category])}</option>`).join(''));
    const areas = unique(items.flatMap(item => item.bestAreaIds)).sort();
    document.querySelector('[data-filter-area]').insertAdjacentHTML('beforeend', areas.map(area => `<option value="${e(area)}">${e(area.toUpperCase())}</option>`).join(''));
    const placeTypes = ['ALL','DRUGSTORE','BEAUTY_SELECT','DISCOUNT_STORE','DEPARTMENT_STORE','URBAN_SHOPPING','ELECTRONICS','SPECIALTY','LOCAL_SHOPPING'];
    document.querySelector('[data-place-types]').innerHTML = placeTypes.map(type => `<button type="button" data-place-type="${type}" aria-pressed="${type === placeType}">${e(placeTypeNames[type])}</button>`).join('');
  }

  document.addEventListener('click', event => {
    const toggle = event.target.closest('[data-toggle-item]'); if (toggle) { toggleItem(toggle.dataset.toggleItem); if (event.target.closest('[data-product-dialog]')) openProduct(toggle.dataset.toggleItem); return; }
    const product = event.target.closest('[data-open-product]'); if (product) { closeDialog(document.querySelector('[data-place-dialog]')); closeDialog(document.querySelector('[data-list-dialog]')); openProduct(product.dataset.openProduct); return; }
    const place = event.target.closest('[data-open-place]'); if (place) { openPlace(place.dataset.openPlace); return; }
    const category = event.target.closest('[data-category-jump]'); if (category) { productState.category = category.dataset.categoryJump; document.querySelector('[data-filter-category]').value = productState.category; renderProducts(); document.getElementById('what-to-buy').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); return; }
    const placeButton = event.target.closest('[data-place-type]'); if (placeButton) { placeType = placeButton.dataset.placeType; showAllPlaces = false; document.querySelectorAll('[data-place-type]').forEach(button => button.setAttribute('aria-pressed', String(button === placeButton))); renderPlaces(); return; }
    const day = event.target.closest('[data-strategy-day]'); if (day) { activeDay = Number(day.dataset.strategyDay); renderStrategy(); return; }
    if (event.target.closest('[data-open-list]')) { renderList(); showDialog(document.querySelector('[data-list-dialog]')); return; }
    if (event.target.closest('[data-close-dialog]')) { closeDialog(event.target.closest('dialog')); return; }
    if (event.target.closest('[data-more-places]')) { showAllPlaces = !showAllPlaces; renderPlaces(); return; }
    if (event.target.closest('[data-clear-filters]')) { Object.keys(productState).forEach(key => productState[key] = ''); document.querySelectorAll('.shopping-toolbar input,.shopping-toolbar select').forEach(control => control.value = ''); renderProducts(); }
  });

  document.querySelector('[data-product-search]').addEventListener('input', event => { productState.query = event.target.value.trim().toLowerCase(); renderProducts(); });
  [['[data-filter-category]','category'],['[data-filter-area]','area'],['[data-filter-day]','day'],['[data-filter-tier]','tier'],['[data-filter-price]','price']].forEach(([selector,key]) => document.querySelector(selector).addEventListener('change', event => { productState[key] = event.target.value; renderProducts(); }));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(dialog); }));

  initControls(); updateListCount(); renderProducts(); renderPlaces(); renderDistricts(); renderStrategy();
})();
