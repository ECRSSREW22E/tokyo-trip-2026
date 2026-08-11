(() => {
  const data = window.TokyoSpecialItems;
  if (!data) return;
  const dayMatch = location.pathname.match(/day([1-6])\.html$/i);
  const spotId = document.body.dataset.spot;
  const items = dayMatch
    ? data.items.filter((item) => item.day === Number(dayMatch[1]))
    : spotId ? data.items.filter((item) => item.locationId === spotId) : [];
  if (!items.length) return;

  const labels = {
    AVAILABLE_DURING_TRIP:'旅程期間可遇見', CHECK_BEFORE_VISIT:'出發前再確認',
    SEASONAL:'季節限定', EVENT_LIMITED:'活動限定', QUANTITY_LIMITED:'數量有限',
    LOCATION_LIMITED:'地點限定', SIGNATURE:'代表商品'
  };
  const category = { OMAMORI:'御守', GOSHUIN:'御朱印', FOOD:'飲食', SOUVENIR:'伴手禮', MERCH:'活動贈品', COLLAB:'聯名活動', SEASONAL:'季節體驗', LOCAL_SPECIALTY:'在地企劃' };
  const section = document.createElement('section');
  section.className = 'special-picks section';
  section.setAttribute('aria-labelledby', 'special-picks-title');
  section.innerHTML = `<div class="shell"><div class="section-head"><div><div class="eyebrow">旅程現場情報 · 2026/08/12 核對</div><h2 id="special-picks-title">限定、代表商品與順路活動</h2><p>「季節限定」與「常設代表商品」分開標示；標有「出發前再確認」者，仍須查看官方庫存或當日公告。</p></div></div><div class="special-pick-grid">${items.map((item) => {
    const badges = [item.tripDateOverlap, ...item.availabilityType].map((name) => `<span>${labels[name] || name}</span>`).join('');
    return `<details class="special-pick-card"><summary><div class="special-pick-meta"><span>${category[item.category] || item.category}</span>${badges}</div><h3>${item.nameZh}</h3><p lang="ja">${item.nameJa}</p></summary><div class="special-pick-body"><dl><div><dt>為什麼值得留意</dt><dd>${item.whyLookForIt}</dd></div><div><dt>地點／價格</dt><dd>${item.purchaseLocation}${item.price ? ` · ${item.price}` : ' · 價格以現場為準'}</dd></div><div><dt>現場判斷</dt><dd>${item.watchOut}</dd></div></dl><a href="${item.officialUrl}" target="_blank" rel="noopener noreferrer">查看官方資料 ↗</a><small>最後核對：${item.lastVerified}${item.needsVerification ? ' · 需當日再確認' : ''}</small></div></details>`;
  }).join('')}</div></div>`;
  const main = document.querySelector('main') || document.getElementById('spot-page');
  const screenCallout = main?.querySelector('[data-screen-day-link]');
  screenCallout ? screenCallout.before(section) : main?.append(section);
})();
