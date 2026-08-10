(() => {
  const restaurants = [
    {day:1,date:'8/16',area:'龜有',time:'午餐／點心',name:'葛飾伊勢屋 亀有本店',kind:'和菓子・輕食',menu:[['両さんキャンディー','¥550'],['両さんめんこ焼き','¥820'],['両さんもんじゃ','¥2,350']],pick:'角色糖果適合隨手帶，めんこ焼き最適合拍照；もんじゃ為較大份伴手禮。角色商品可能售完，價格以葛飾區公開資料為基準。',good:'',watch:'',queue:'',coords:'35.76632,139.84862',official:'https://k-iseya.jp/',sources:[['葛飾區・こち亀商品與價格','https://www2.city.katsushika.lg.jp/tourism/1000064/1030204/1037609.html']]},
    {day:1,date:'8/16',area:'歌舞伎町',time:'晚餐',name:'新宿カブキhall',kind:'橫丁・多店共食',menu:[['辛味噌スペアリブ','¥769'],['キョロちゃんかき氷','¥660'],['屋上 BBQ 套餐','¥6,600 起']],pick:'若只是逛歌舞伎町，選單點肋排＋各店主食；只有確定要長時間聚餐才選屋上 BBQ。以上為官方露台／BBQ 公開價，各館內店舖價格以當日為準。',good:'',watch:'',queue:'',coords:'35.69572,139.70048',official:'https://kabukihall.com/shop/',sources:[['官方店舖與菜單','https://kabukihall.com/shop/'],['官方 BBQ／露台菜單','https://kabukihall.com/shinjuku-bbq-beer-garden-en/?lang=en']]},
    {day:2,date:'8/17',area:'池袋',time:'午餐',name:'麺処 花田 池袋店',kind:'味噌拉麵',menu:[['味噌拉麵','約 ¥1,100'],['蔬菜加量','免費'],['蒜泥加量','免費']],pick:'第一次建議普通味噌＋蔬菜正常量；怕重鹹先不要加量。拉麵價格為近期店內價，出發日以券賣機為準。',good:'',watch:'',queue:'',coords:'35.73112,139.71328',official:'https://www.eternal-company.com/',sources:[['近期店內菜單','https://tabelog.com/tokyo/A1305/A130501/13109890/dtlrvwlst/']]},
    {day:2,date:'8/17',area:'秋葉原',time:'晚餐候選',name:'ローストビーフ大野 秋葉原店',kind:'牛肉丼',menu:[['ローストビーフ丼定食','¥1,410'],['黒毛和牛ローストビーフ丼定食','¥2,200'],['肉増し','＋¥990']],pick:'重視性價比選 ¥1,410 基本丼；想比較肉香再升級黑毛和牛。白飯大盛免費，山葵醬較清爽。',good:'',watch:'',queue:'',coords:'35.69934,139.77110',official:'https://roastbeef-ohno.com/',sources:[['2026 更新菜單','https://tabelog.com/tokyo/A1310/A131001/13187964/dtlmenu/']]},
    {day:3,date:'8/18',area:'七里濱',time:'早餐／早午餐',name:'bills 七里ヶ浜',kind:'海景咖啡',menu:[['ricotta hotcakes','約 ¥2,200'],['avocado toast','約 ¥1,900'],['flat white','約 ¥850']],pick:'兩人最適合鬆餅＋酪梨吐司分食，甜鹹平衡；標示為近期價格帶，季節與門市可能調整，點餐前看官方 QR 菜單。',good:'',watch:'',queue:'',coords:'35.30506,139.51068',official:'https://www.billsjapan.com/jp/our-menus',sources:[['官方菜單入口','https://www.billsjapan.com/jp/our-menus'],['七里濱門市','https://www.billsjapan.com/jp/locations/shichirigahama']]},
    {day:3,date:'8/18',area:'江之島',time:'午餐候選',name:'しらす問屋 とびっちょ 江の島本店',kind:'吻仔魚・海鮮丼',menu:[['釜揚げしらす丼','¥1,320'],['とびっちょ丼','¥2,530'],['釜揚げしらす・いくら丼','¥2,090']],pick:'第一次選釜揚げ吻仔魚丼最能吃出代表味；想一次吃多款海鮮選 とびっちょ丼。生吻仔魚只在當日有漁獲時供應。',good:'',watch:'',queue:'',coords:'35.29923,139.48031',official:'https://tobiccho.com/shops/tobiccho',sources:[['官方店舖','https://tobiccho.com/shops/tobiccho'],['現行公開菜單','https://r.gnavi.co.jp/g751400/menu1/']]},
    {day:3,date:'8/18',area:'江之島奧側',time:'午餐備案',name:'魚見亭',kind:'海鮮定食・露台',menu:[['江の島丼／定食','¥1,250／¥1,370'],['しらすハーフ丼','¥1,500'],['海鮮丼','¥2,500']],pick:'想吃江之島代表味選江の島丼；怕單一吻仔魚口感就選半生半釜揚的 shirasu half 丼。生吻仔魚 ¥700，仍視漁況。',good:'',watch:'',queue:'',coords:'35.29952,139.47198',official:'https://enoshima-uomitei.com/menu/',sources:[['官方菜單','https://enoshima-uomitei.com/menu/']]},
    {day:3,date:'8/18',area:'熱海',time:'花火前晚餐',name:'囲炉茶屋',kind:'乾物・海鮮',menu:[['干物單點','¥440–2,090'],['金目鯛煮付','¥5,500–7,150'],['刺身盛合（2–3 人）','¥4,950／¥7,700']],pick:'花火前以干物單點配飯最快；多人再分食刺身盛合。金目鯛需 20 分鐘以上且份量大，先確認時間與尺寸。',good:'',watch:'',queue:'',coords:'35.10185,139.07733',official:'https://irorichaya.com/menu.html',sources:[['官方菜單（2026/7 更新）','https://irorichaya.com/menu.html']]},
    {day:4,date:'8/19',area:'原宿',time:'午餐',name:'AFURI 原宿',kind:'柚子鹽拉麵',menu:[['柚子塩らーめん','約 ¥1,690'],['柚子辣紅らーめん','約 ¥1,790'],['冷やし柚子塩らーめん','季節價']],pick:'初訪選柚子鹽；8 月可優先看官方夏季限定冷製版。標示為近期門市價格帶，最終以券賣機為準。',good:'',watch:'',queue:'',coords:'35.67071,139.70566',official:'https://www.afuri.com/menu/',sources:[['AFURI 官方菜單','https://www.afuri.com/menu/']]},
    {day:4,date:'8/19',area:'初台',time:'景觀午餐',name:'叙々苑 東京オペラシティ53',kind:'燒肉・高樓景觀',menu:[['焼肉ランチ','¥3,700'],['ミックスランチ','¥4,700'],['吟味ランチ','¥7,200']],pick:'推薦 ¥4,700 mix lunch，肉類變化與預算較均衡；想控制預算選 ¥3,700 基本午餐。訂位時可備註窗邊，但不保證。',good:'',watch:'',queue:'',coords:'35.68337,139.68654',official:'https://www.jojoen.co.jp/shop/jojoen/operacity/',sources:[['官方門市與菜單','https://www.jojoen.co.jp/shop/jojoen/operacity/']]},
    {day:5,date:'8/20',area:'品川水族館',time:'輕食',name:'DOLPHIN CAFE',kind:'造型三明治・飲品',menu:[['草莓果醬雲朵三明治','¥580'],['雲朵撕撕麵包三明治','現場牌價'],['彩虹奶油蘇打','現場牌價']],pick:'推薦 ¥580 草莓果醬口味，適合中段休息；官方目前列出 7 款雲朵三明治但網頁未公開全品項價格，不能假裝成固定價。',good:'',watch:'',queue:'',coords:'35.58872,139.73771',official:'https://www.aquarium.gr.jp/cafe',sources:[['官方菜單與過敏原','https://www.aquarium.gr.jp/cafe'],['2026/4 店內牌價實拍','https://tabelog.com/tokyo/A1315/A131502/13272733/dtlrvwlst/B525253514/']]},
    {day:5,date:'8/20',area:'橫濱新港',time:'午餐候選',name:'Pie Holic',kind:'現烤派・吃到飽',menu:[['Basic lunch set','¥2,860'],['鯛魚主餐變更','＋¥350'],['牛排主餐變更','＋¥800']],pick:'推薦基本午餐：沙拉／湯、主餐與 5 種派吃到飽已足夠；甜派單片（Apple、Pecan、Key Lime 等）各 ¥660。',good:'',watch:'',queue:'',coords:'35.45491,139.64033',official:'https://www.tgn.co.jp/restaurant/ph/menu/',sources:[['官方甜派菜單','https://www.tgn.co.jp/restaurant/ph/menu/'],['2026/4 午餐菜單','https://tabelog.com/kanagawa/A1401/A140104/14062700/dtlmenu/lunch/']]},
    {day:6,date:'8/21',area:'淺草',time:'午餐',name:'大黒家天麩羅 本店',kind:'老舖天丼',menu:[['天丼（蝦1・鱚1・什錦1）','¥2,300'],['天丼（蝦2・什錦1）','¥2,500'],['海老天丼（蝦4）','¥2,700']],pick:'招牌是深色醬汁天丼；怕軟口感可先確認是否符合偏好。',good:'老舖氣氛、濃厚芝麻油香與深色醬汁辨識度很高。',watch:'傳統做法的天婦羅偏軟、醬汁偏濃，不是現代清脆型；觀光尖峰會排隊。',queue:'11:00 開門前後入店；與淺草寺午前參拜動線銜接。',coords:'35.71247,139.79591',official:'https://www.tempura.co.jp/menu/',sources:[['官方 2026 菜單','https://www.tempura.co.jp/menu/'],['2026/6 更新菜單','https://tabelog.com/en/tokyo/A1311/A131102/13003696/dtlmenu/'],['2026/7 公開實訪','https://tabelog.com/cn/tokyo/A1311/A131102/13003696/']]},
    {day:6,date:'8/21',area:'仲見世',time:'散步點心',name:'浅草九重',kind:'炸饅頭',menu:[['原味紅豆','¥200'],['芝麻／抹茶／南瓜／地瓜','¥230'],['卡士達／櫻花','¥250']],pick:'現炸原味先吃，再依同行者喜好分食抹茶或卡士達。',good:'外皮熱脆、口味多，原味紅豆被近期旅遊資料列為代表品項。',watch:'油炸甜點趁熱最好；排隊區狹窄，邊走邊吃需留意仲見世禮儀。',queue:'上午較順；先完成參拜，再在不阻礙人流處食用。',coords:'35.71399,139.79653',official:'https://agemanju.jp/our-selection/',sources:[['官方品項與價格','https://agemanju.jp/our-selection/'],['2026/7 食べログ實訪','https://tabelog.com/tokyo/A1311/A131102/13003676/'],['近期旅遊整理','https://www.gltjp.com/ja/directory/item/14375/']]}
  ];

  const localFoods = [
    ['DAY 01','龜有・葛飾','こち亀角色和菓子','商圈代表','¥200–2,350','伊勢屋的角色燒菓子、糖果與「両さんもんじゃ」把龜有作品文化做成可吃的伴手禮。','https://www2.city.katsushika.lg.jp/tourism/1000064/1030204/1037609.html'],
    ['DAY 01','台場','東京灣海景甜點／咖啡','順路人氣','¥700–2,000','不是傳統鄉土菜，但在海濱、富士電視台與商場間安排冷飲甜點，最符合夏季台場動線。','https://www.gotokyo.org/en/destinations/southern-tokyo/odaiba/'],
    ['DAY 01','新宿','拉麵與橫丁串燒','商圈代表','¥1,000–3,500','新宿適合用拉麵或思出橫丁串燒收尾；歌舞伎町則偏多地區料理共食。','https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/'],
    ['DAY 02','池袋','濃厚味噌拉麵','順路人氣','¥1,100–1,500','炒蔬菜、粗麵與濃厚味噌是花田的核心組合，份量重，適合當本日主餐。','https://www.eternal-company.com/'],
    ['DAY 02','秋葉原','牛肉丼與主題咖啡','商圈代表','¥1,400–2,500','電氣街以快速、高辨識度的牛肉丼與作品主題餐飲最符合採買節奏。','https://www.gotokyo.org/en/destinations/central-tokyo/akihabara/'],
    ['DAY 03','七里濱','海景早午餐','順路人氣','¥2,000–4,000','湘南海岸以露台早餐、鬆餅與咖啡為主；景觀與用餐時間本身就是體驗。','https://www.fujisawa-kanko.jp/'],
    ['DAY 03','江之島','湘南しらす丼','在地代表','¥1,300–2,500','官方旅遊資料把吻仔魚列為湘南代表味；生食受漁況影響，釜揚げ版本最穩定。','https://www.fujisawa-kanko.jp/global-data/20251002092826655.pdf'],
    ['DAY 03','江之島','江の島丼','在地代表','¥1,250–1,800','以蠑螺與蛋製作的島上老派丼飯，與純吻仔魚丼是不同方向的地方味。','https://enoshima-uomitei.com/menu/'],
    ['DAY 03','江之島','丸燒章魚煎餅','在地代表','約 ¥500–700','把整隻章魚高壓烘成薄脆煎餅，是仲見世散步最具辨識度的小吃。','https://www.fujisawa-kanko.jp/global-data/20251002092826655.pdf'],
    ['DAY 03','熱海','金目鯛與干物','在地代表','¥1,000–7,000','伊豆海味以金目鯛煮付與乾物最具代表性；整尾金目鯛價格、份量和等待時間都較高。','https://www.ataminews.gr.jp/product/61/'],
    ['DAY 03','熱海','熱海布丁','商圈代表','¥450–700','站前可即食的昭和風甜點，需冷藏，適合商店街當場吃而非長途攜帶。','https://www.atami-purin.com/'],
    ['DAY 04','豪德寺','招財貓造型和菓子','順路人氣','¥300–1,500','豪德寺周邊常見招財貓題材點心；屬商圈創意伴手禮，不是寺院供品。','https://www.kanko-setagaya.jp/'],
    ['DAY 04','原宿','竹下通可麗餅','商圈代表','¥600–1,000','薄餅皮配水果、鮮奶油或冰淇淋，是竹下通最典型的邊走邊逛甜點。','https://www.gotokyo.org/en/destinations/western-tokyo/harajuku/'],
    ['DAY 05','品川','海苔與茶泡飯伴手禮','地方代表','¥700–2,500','品川觀光協會的伴手禮企劃收錄海苔店茶泡飯等品川海邊歷史延伸商品。','https://shinagawa-kanko.or.jp/shinagawa_souvenirs/'],
    ['DAY 05','橫濱','拿坡里義大利麵','發祥料理','¥1,000–2,000','橫濱官方把 Napolitan 列為當地誕生料理之一，番茄醬炒麵體與洋食文化是重點。','https://www.welcome.city.yokohama.jp/gourmet/original.php'],
    ['DAY 05','橫濱','海鮮焗飯','發祥料理','¥1,500–3,000','Seafood doria 同樣被橫濱官方列入發祥料理，可和港未來洋食行程搭配。','https://www.welcome.city.yokohama.jp/gourmet/original.php'],
    ['DAY 05','橫濱','崎陽軒燒賣','地方代表','¥700–1,500','崎陽軒自 1928 年販售燒賣，常溫盒便於當日食用，是最具辨識度的橫濱伴手禮之一。','https://www.welcome.city.yokohama.jp/gourmet/original.php'],
    ['DAY 05','橫濱','サンマーメン','地方代表','¥900–1,500','勾芡肉絲蔬菜覆在湯麵上，是橫濱官方列出的本地代表麵食。','https://www.welcome.city.yokohama.jp/gourmet/original.php'],
    ['DAY 06','淺草','天丼','江戶老舖','¥2,300–2,700','芝麻油香、深色醬汁與偏軟口感是大黑家的傳統風格，和現代輕脆天婦羅不同。','https://www.tempura.co.jp/menu/'],
    ['DAY 06','淺草','人形燒・雷おこし・炸饅頭','江戶點心','¥200–1,500','仲見世適合少量分食；官方東京指南也把現烤米菓與傳統甜點列為淺草體驗。','https://www.gotokyo.org/en/story/walks-and-tours/asakusa/index.html'],
    ['DAY 06','上野','あんみつ與老舖洋食','地方老舖','¥800–2,500','台東區 2026 指南列出みはし、上野精養軒等明治以來老舖，適合回程前補一站。','https://www.gotokyo.org/book/wp-content/uploads/2026/03/AO2_2603_taito-kanko_low_JP.pdf']
  ];

  const grid = document.getElementById('restaurant-grid');
  const result = document.getElementById('food-result');
  const empty = document.getElementById('food-empty');
  const search = document.getElementById('food-search');
  const filter = document.getElementById('day-filter');
  let activeDay = Number(new URLSearchParams(location.search).get('day')) || 0;

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const mapUrl = (item) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.coords)}&travelmode=walking`;
  const card = (item, index) => `<article class="restaurant-card" data-day="${item.day}" data-search="${escapeHtml([item.name,item.area,item.kind,...item.menu.flat()].join(' ').toLowerCase())}" style="--order:${index}">
    <div class="restaurant-head"><div class="restaurant-kicker"><span>DAY ${item.day} · ${item.date} · ${item.area}</span><span class="meal-badge">${item.time}</span></div><h2>${item.name}</h2><p>${item.kind}</p></div>
    <div class="restaurant-body"><h3 class="menu-title">LATEST MENU SNAPSHOT</h3><ul class="menu-list">${item.menu.map(([name,price])=>`<li><span>${name}</span><b>${price}</b></li>`).join('')}</ul>
      <div class="restaurant-pick"><span aria-hidden="true">✦</span><p><strong>這次怎麼點</strong><br>${item.pick}</p></div>
      <dl class="restaurant-meta"><dt>價格查核</dt><dd>2026/8/10；供應與價格以當日為準</dd><dt>座標</dt><dd>${item.coords}</dd></dl>
      <details class="source-details"><summary>查看 ${item.sources.length} 個菜單來源</summary><div class="source-links">${item.sources.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join('')}</div></details>
      <div class="restaurant-actions"><a class="action-menu" href="${item.official}" target="_blank" rel="noopener">出發前看官方菜單</a><a class="action-map" href="${mapUrl(item)}" target="_blank" rel="noopener">開啟步行導航</a></div>
    </div></article>`;

  grid.innerHTML = restaurants.map(card).join('');
  const localGrid = document.getElementById('local-food-grid');
  if (localGrid) localGrid.innerHTML = localFoods.map(([day,area,name,type,budget,note,url]) => `<article class="local-food-card"><div><span>${day} · ${type}</span><h3>${name}</h3><p>${area}</p></div><p>${note}</p><footer><b>${budget}</b><a href="${url}" target="_blank" rel="noopener">資料來源 ↗</a></footer></article>`).join('');
  filter.innerHTML = ['全部','D1 · 8/16','D2 · 8/17','D3 · 8/18','D4 · 8/19','D5 · 8/20','D6 · 8/21'].map((label, day) => `<button class="filter-chip" type="button" data-day="${day}" aria-pressed="${day===activeDay}">${label}</button>`).join('');
  const apply = () => {
    const query = search.value.trim().toLowerCase(); let shown = 0;
    document.querySelectorAll('.restaurant-card').forEach((node) => { const visible = (!activeDay || Number(node.dataset.day) === activeDay) && (!query || node.dataset.search.includes(query)); node.hidden = !visible; if (visible) shown += 1; });
    filter.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.day) === activeDay)));
    result.textContent = `${activeDay ? `DAY ${activeDay} · ` : ''}顯示 ${shown} 間餐廳候選`;
    empty.hidden = shown !== 0;
  };
  filter.addEventListener('click', (event) => { const button = event.target.closest('button[data-day]'); if (!button) return; activeDay = Number(button.dataset.day); const url = new URL(location.href); activeDay ? url.searchParams.set('day', activeDay) : url.searchParams.delete('day'); history.replaceState(null,'',url); apply(); });
  search.addEventListener('input', apply);
  apply();
})();
