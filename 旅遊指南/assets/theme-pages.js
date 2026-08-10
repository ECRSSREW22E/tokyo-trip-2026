(() => {
  const shopItems = [
    ['tokyo-banana','食品','東京ばな奈','東京站／機場','¥1,000–2,500','輕・常溫','經典東京伴手禮；優先買限定包裝，離境前再確認保存期限。','https://www.tokyobanana.jp/'],
    ['sugar-butter','食品','砂糖奶油樹','上野／東京站／機場','¥800–2,000','輕・常溫','分送方便的夾心餅乾，適合最後一天補貨。','https://www.sugarbuttertree.jp/'],
    ['hato-sable','地方限定','鎌倉鳩サブレー','鎌倉站／百貨','¥1,000–3,000','中・易碎','湘南代表點心；盒裝易壓，建議放手提行李上層。','https://www.hato.co.jp/'],
    ['atami-pudding','地方限定','熱海布丁','熱海站前商店街','¥500–1,500','需冷藏','當地吃最合適，不建議帶上長途列車或飛機。','https://www.atami-purin.com/'],
    ['yokohama-harbour','地方限定','橫濱 Harbor 蛋糕','紅磚倉庫／橫濱站','¥1,000–2,500','輕・常溫','港未來順路購買，選獨立包裝較好分送。','https://harbour-world.jp/'],
    ['matcha-snacks','食品','抹茶與季節限定零食','Don Quijote／百貨地下街','¥500–2,500','輕・看效期','不要只看社群熱度，先比較成分、產地與保存期限。','https://www.gotokyo.org/tc/see-and-do/shopping/what-to-buy/index.html'],
    ['anessa','美妝','ANESSA 防曬','松本清／Don Quijote','¥2,000–4,000','液體','夏季實用；依自己的膚質與航空液體規範購買。','https://www.shiseido.co.jp/anessa/'],
    ['canmake','美妝','CANMAKE／CEZANNE 彩妝','藥妝店／Loft','¥500–1,500','輕','先列色號，現場不要只因限定包裝重複購買。','https://www.canmake.com/'],
    ['sheet-mask','美妝','日本面膜與護膚小包','藥妝店／Hands','¥500–3,000','消耗品','敏感肌先查成分；免稅消耗品離境前依規定保管。','https://www.matsukiyococokara-online.com/'],
    ['jetstream','文具生活','JETSTREAM／Frixion 筆','Loft／Hands／伊東屋','¥150–2,000','極輕','適合送人；可挑日本限定筆身與替芯組。','https://www.mpuni.co.jp/products/ballpoint_pens/jetstream/'],
    ['mildliner','文具生活','ZEBRA Mildliner','Loft／Hands／大型書店','¥500–1,500','極輕','成套購買前先確認是否已有相近色系。','https://www.zebra.co.jp/pro/mildliner/'],
    ['muji','文具生活','無印良品旅行收納用品','新宿／澀谷／銀座','¥500–4,000','中','壓縮袋、分裝瓶與吊掛收納可直接改善這趟旅程。','https://www.muji.com/jp/ja/store'],
    ['tenugui','傳統工藝','手拭巾／風呂敷','淺草／上野／百貨','¥800–3,000','極輕','用途多、圖案有地方性，是比大型工藝品更好攜帶的選擇。','https://tokyotokyo.jp/ja/action/omiyage/'],
    ['edo-kiriko','傳統工藝','江戶切子','淺草／晴空塔 Solamachi','¥5,000 起','重・易碎','先確認包裝與托運方式；適合少量精選，不適合臨時衝動買。','https://www.edokiriko.or.jp/'],
    ['uniqlo','服飾','UNIQLO／GU 日本限定 UT','新宿／池袋／御徒町','¥1,000–5,000','中','先查台灣是否已有同款，再挑城市或動漫限定系列。','https://www.uniqlo.com/jp/ja/'],
    ['onitsuka','服飾','Onitsuka Tiger','表參道／新宿','¥12,000 起','占空間','傍晚腳較腫時試穿更接近旅行狀態；保留退換與免稅單據。','https://www.onitsukatiger.com/jp/ja-jp/'],
    ['electronics','家電','相機配件／行動電源／美容家電','BicCamera 新宿／Yodobashi Akiba','依品項','含電池','先比型號、電壓、保固與台灣價格；鋰電池不可任意托運。','https://www.biccamera.com/bc/i/shop/shoplist/index.jsp'],
    ['pokemon','動漫角色','Pokémon Center 限定商品','池袋／晴空塔','¥500–6,000','中','池袋店本次日期有休館風險，以官網公告為準；可改晴空塔店。','https://www.pokemon.co.jp/shop/en/pokecen/'],
    ['animate','動漫角色','Animate／同人與角色周邊','池袋本店／秋葉原','¥500–8,000','中','先用樓層指南鎖定作品，避免整棟逐層消耗太久。','https://www.animate.co.jp/en/shop/ikebukuro/'],
    ['bandai','動漫角色','Bandai Namco／魂商店商品','池袋／秋葉原／台場','¥1,000–15,000','中至大','大型模型先量行李箱；限定品需核對購買資格與庫存。','https://bandainamco-am.co.jp/crossstore/store/tokyo/'],
    ['gachapon','動漫角色','扭蛋與小型收藏','秋葉原／池袋／歌舞伎町','¥300–3,000','小但易累積','先設定總額與作品名單，空殼可在店內指定處理點回收。','https://gashapon.jp/shop/'],
    ['kochikame','地方限定','こち亀紀念館限定商品','龜有紀念館','¥500–5,000','中','第一天限定主題採買，先買館內限定、一般商品留到後段。','https://kochikame-kinenkan-official.jp/'],
    ['funawa','地方限定','舟和 芋ようかん','淺草／上野','¥800–2,000','短效期・常溫','選原味芋羊羹小盒；保存期短，排在第六天買並當日分食。','https://funawa.jp/'],
    ['kaminari','地方限定','常盤堂 雷おこし','淺草雷門','¥700–2,000','輕・常溫','選獨立小包綜合口味，比分裝大袋更適合送人。','https://tokiwado.tokyo/'],
    ['kiyoken','地方限定','崎陽軒 真空パックシウマイ','橫濱紅磚／橫濱站','¥700–1,500','常溫','旅行攜帶選真空包而非便當版；回台前再核對肉製品入境規定。','https://kiyoken.com/'],
    ['atami-kinme','地方限定','熱海 金目鯛煮付／乾物包','熱海站前商店街','¥900–3,500','看保存方式','優先選常溫真空小包；冷藏整尾不適合本次晚間花火與返程動線。','https://www.ataminews.gr.jp/product/61/'],
    ['fino','美妝','FINO Premium Touch 護髮膜 230g','松本清／Don Quijote','¥700–1,100','重・膏狀','指定 230g 罐裝；髮量少先買一罐，避免重量快速累積。','https://brand.finetoday.com/jp/fino/'],
    ['melano-cc','美妝','Melano CC 藥用亮白精華 20mL','藥妝店','¥900–1,400','極輕・液體','認明 20mL 細管精華；敏感肌先看活性成分，不因多入組囤貨。','https://jp.rohto.com/melanocc/'],
    ['and-honey','美妝','&honey Deep Moist Hair Oil 3.0 100mL','Loft／藥妝店','¥1,400–1,700','液體','乾燥髮選 Deep Moist 3.0；細軟髮改較輕款，避免只看香味買錯。','https://www.and-honey.com/'],
    ['canmake-uv','美妝','CANMAKE Mermaid Skin Gel UV C01 40g','藥妝店／Loft','¥770 左右','極輕','指定 C01 CICA Mint 綠色校色款；不需校色則選透明 01。','https://www.canmake.com/item/detail/67'],
    ['cezanne-highlight','美妝','CEZANNE Pearl Glow Highlight','藥妝店／Loft','¥660 左右','極輕','先試 01 Champagne Beige；膚色較深再比較 04 Shell Pink。','https://www.cezanne.co.jp/lineup/4939553041748/'],
    ['kurutoga','文具生活','uni KURUTOGA Metal 0.5mm','Loft／Hands／大型文具店','¥2,750 左右','極輕','指定 Metal 0.5mm，確認握位與重量；送人可加同規格替芯。','https://www.mpuni.co.jp/products/mechanical_pencils/sharp_pen/kurutoga/metal.html'],
    ['jetstream-41','文具生活','JETSTREAM 4&1 Metal Edition','Loft／Hands／伊東屋','¥1,500–2,500','極輕','選 0.5mm 四色＋自動鉛筆款，現場順便買 SXR-80-05 替芯。','https://www.mpuni.co.jp/products/ballpoint_pens/jetstream/jetstream41.html'],
    ['travelers','文具生活','TRAVELER’S notebook TOKYO 限定補充本','東京站／成田機場','¥500–5,000','輕','已有本體就只買東京限定 refill／貼紙；第一次入坑再選 passport size。','https://www.travelers-company.com/'],
    ['skytree-sweets','地方限定','TOKYO SKYTREE 限定包裝菓子','Solamachi','¥800–2,500','輕・常溫','只在確定加入晴空塔候選行程時買；挑塔形鐵盒或獨立包裝款。','https://www.tokyo-solamachi.jp/'],
    ['gachapon-machine','動漫角色','作品指定扭蛋 3–5 顆上限','秋葉原／池袋／歌舞伎町','¥300–2,500','小但易累積','先列 3 個作品、每作最多 1–2 抽；重複品在交換區處理，不無限追款。','https://gashapon.jp/shop/']
  ].map(([id,category,name,where,budget,bag,note,url])=>({id,category,name,where,budget,bag,note,url}));

  const sceneItems = [
    ['kochikame','動漫','DAY 01','《烏龍派出所》','龜有站南口三人銅像','12:00–12:15','站在彩色三人像側邊合照，再沿南口商店街順走。','不要攀爬銅像；避開出入口正中央。',35.76518,139.84805,'https://kochikame-kinenkan-official.jp/'],
    ['nijigasaki','動漫','DAY 01','《Love Live! 虹咲學園》','台場海濱公園・夢之大橋','17:20–18:20','以海灣步道、彩虹大橋或夢之大橋幾何線條重現校園偶像城市感。','步道屬公共空間，不長時間架設器材。',35.62782,139.77148,'https://www.gotokyo.org/jp/anime-and-manga/animetourism88/index.html'],
    ['digimon','動漫','DAY 01','《數碼寶貝大冒險》','富士電視台與台場海濱','16:50–17:30','從海濱側把球體展望室與城市天際線同框。','僅在公共區域拍攝，館內依現場規則。',35.62658,139.77452,'https://www.gotokyo.org/jp/anime-and-manga/animetourism88/index.html'],
    ['durarara','動漫','DAY 02','《無頭騎士異聞錄 DuRaRaRa!!》','池袋 Sunshine 60 通','10:00–10:20','使用街道招牌、行人與高樓壓縮構圖，向作品中的池袋群像致敬。','保持步行，不在斑馬線中央停留。',35.73030,139.71342,'https://www.gotokyo.org/jp/anime-and-manga/animetourism88/index.html'],
    ['steins-gate','動漫','DAY 02','《STEINS;GATE》','秋葉原 Radio Kaikan 外觀','13:20–13:35','由站前廣場取建築正面與電氣街招牌，做世界線觀測點打卡。','不要阻擋廣場人流；館內店家需先詢問。',35.69877,139.77309,'https://www.akihabara-radiokaikan.co.jp/'],
    ['love-live-kanda','動漫','DAY 02','《Love Live!》','神田明神男坂','12:55–13:15','由階梯下方朝鳥居方向拍攝，保留石階縱深。','神社先參拜後拍攝，不做奔跑姿勢。',35.70203,139.76790,'https://www.gotokyo.org/jp/anime-and-manga/animetourism88/index.html'],
    ['sailor-moon','動漫','DAY 02','《美少女戰士》系列','東京鐵塔・芝公園四號地','18:25–18:50','以完整紅白塔身與樹列做魔法東京地標式構圖。','不使用大面積燈具影響其他遊客。',35.66074,139.74543,'https://www.tokyotower.co.jp/'],
    ['slam-dunk','動漫','DAY 03','《灌籃高手》','鎌倉高校前一號平交道','10:40–11:00','在人行安全區拍江之電通過、海面與坡道，不必站到車道重演。','絕不進入車道、軌道或私人住宅範圍。',35.30667,139.50046,'https://animespots.travel/articles/howto-slam-dunk-enoden-route-guide-ja'],
    ['bunny-girl','動漫','DAY 03','《青春豬頭少年》系列','片瀨江之島站外觀','12:05–12:20','以龍宮造型站體做抵達江之島的開場照。','站前快速拍攝，讓出接送與行李動線。',35.30932,139.48303,'https://travelenoshima.jp/anime-movie-drama-locations/'],
    ['tsuritama','動漫','DAY 03','《釣球》','江之島弁天橋','12:25–12:45','朝島側拍橋面、鳥居方向與海風，重現作品的湘南色彩。','風大時收好帽子與器材，不倚靠車道側。',35.30215,139.48058,'https://travelenoshima.jp/anime-movie-drama-locations/'],
    ['your-name-stairs','動漫','DAY 04','《你的名字。》','四谷須賀神社男坂階梯','08:30–09:00','一人站階梯上端、一人站轉角，以對望構圖致敬結尾。','住宅區需安靜；不長時間占用階梯。',35.68522,139.72278,'https://www.kiminona.com/relation/'],
    ['your-name-bridge','動漫','DAY 04','《你的名字。》','信濃町站前步道橋','09:10–09:25','利用步道橋欄杆、道路與遠方城市線條重現通勤轉場。','不可架腳架阻塞狹窄人行道。',35.68028,139.72014,'https://animespots.travel/articles/howto-your-name-tokyo-route-guide-ja'],
    ['jujutsu','動漫','DAY 04','《咒術迴戰》澀谷事變','澀谷 Scramble Crossing','16:00–16:15','在綠燈正常過街時以廣角記錄人潮與大型螢幕；完成後到高處補全景。','絕不停在交叉口中央擺拍。',35.65949,139.70055,'https://animespots.travel/anime/jujutsu-kaisen/spots/shibuya-scramble-crossing'],
    ['nigehaji','日劇','DAY 05','《月薪嬌妻》','橫濱北仲橋・港未來','16:45–17:10','由北仲橋把 Landmark Tower 與水岸放入背景，沿官方散策方向前進。','橋面保持通行，商業拍攝另需申請。',35.45258,139.63446,'https://www.tbs.co.jp/NIGEHAJI_tbs/pdf/yokohama.pdf'],
    ['conan-redbrick','動漫','DAY 05','《名偵探柯南》','橫濱紅磚倉庫廣場','18:00–18:25','斜角同框兩棟紅磚建築，向赤レンガ倉庫篇章致敬。','活動日依圍欄與排隊動線調整。',35.45232,139.64306,'https://note.com/clear_lion4645/n/n84d213b66a8c'],
    ['atami-drama','日劇','DAY 03','《東京站遺失物保管所6》','熱海渚親水公園 Rainbow Deck','18:45–19:10','用拱門、海灣與城市山坡做電影感遠景，之後留在合法花火觀賞區。','花火日遵守官方分區，不以劇照為由越線。',35.09432,139.07714,'https://www.city.atami.lg.jp/locashien/locashokai/','正式取景'],
    ['hidamari-bell','電影','DAY 03','《向陽處的她／陽だまりの彼女》','戀人之丘・龍戀之鐘','14:25–14:45','官方藤澤旅遊資料明列此處為電影舞台；由鐘後方以海面和綠意包住人物，重現兩人的江之島約會感。','不在欄杆掛新鎖、不擋狹窄階梯；現有鎖具不可移動。',35.30058,139.47073,'https://www.fujisawa-kanko.jp/pamph/rurubu2016.pdf','正式取景'],
    ['hidamari-enoshima','電影','DAY 03','《向陽處的她／陽だまりの彼女》','江之島弁財天仲見世通','12:45–13:05','沿青銅鳥居向上拍商店街坡道，串成電影約會場景的抵達段落。','店門前不停留擺拍；用餐與商品攝影先詢問。',35.30052,139.47956,'https://www.fujisawa-kanko.jp/global-data/20250203140913895.pdf','正式取景'],
    ['odoru-odaiba','日劇','DAY 01','《大搜查線／踊る大捜査線》','台場彩虹大橋・灣岸署周邊','17:35–17:55','由台場海濱公共步道拍彩虹大橋和灣岸城市線，向系列最具代表性的灣岸景觀致敬。','警署與道路是正常運作空間，只在公共步道拍攝。',35.62844,139.77255,'https://www.o-daiba.tv/events/tokyowangankeisatsusho','作品舞台'],
    ['iwgp','日劇','DAY 02','《池袋西口公園》','池袋西口公園 GLOBAL RING','09:25–09:45','站在廣場外緣，以圓形舞台和站前高樓做新版西口地標照。此點需由原東口動線穿站，列為 15–20 分鐘可選支線。','活動日不進入舞台管制區，不拍攝可識別路人特寫。',35.73028,139.70923,'https://loca.ash.jp/info/2000/d200004_iwgp.htm','正式取景'],
    ['tiger-dragon','日劇','DAY 06','《虎與龍／タイガー＆ドラゴン》','淺草演藝 Hall 入口','10:35–10:50','官方劇場說明指出入口頻繁出現在作品中；正面納入紅色招牌，做落語劇場開場照。','售票口與入口保持暢通；內部是否可拍依當日公告。',35.71480,139.79379,'https://www.asakusaengei.com/hall/','正式取景'],
    ['conan-ueno','動漫','DAY 06','《名偵探柯南：異次元的狙擊手》','上野公園・不忍池一帶','13:00–13:20','用不忍池、辯天堂與遠方城市線條致敬片中的東京東側追逐空間。','屬背景巡禮，不模仿危險追逐；賞鳥區保持安靜。',35.71164,139.77126,'https://filmcommission.city.taito.lg.jp/wp/wp-content/themes/taitofc/file/rokesanpo2018.pdf','作品舞台'],
    ['mitsuboshi','動漫','DAY 06','《三顆星彩色冒險／三ツ星カラーズ》','上野公園・西鄉隆盛像周邊','13:25–13:40','以公園入口、階梯和西鄉像構成作品中孩子們巡邏的上野街區感。','不攀爬基座、不長時間占用階梯。',35.71114,139.77410,'https://filmcommission.city.taito.lg.jp/wp/wp-content/themes/taitofc/file/rokesanpo2018.pdf','作品舞台'],
    ['silent-detour','日劇','DAY 04','《silent》','小田急 世田谷代田站','10:05–10:25','從豪德寺搭小田急兩站可到的可選支線；依官方外景地圖核對站前場景，以月台外公共區域拍站名和街景。','不在月台邊緣擺拍；住宅巷內不追拍住戶。',35.65837,139.66161,'https://www.odakyu.jp/news/dq40940000001m7i-att/dq40940000001m7p.pdf','正式取景']
  ].map(([id,media,day,work,spot,best,homage,etiquette,lat,lng,source,evidence='作品舞台'])=>({id,media,day,work,spot,best,homage,etiquette,lat,lng,source,evidence}));

  const root = document.querySelector('[data-theme-tool]');
  if (!root) return;
  const mode = root.dataset.themeTool;
  const grid = root.querySelector('[data-theme-grid]');
  const controls = root.querySelector('[data-theme-filters]');
  const status = root.querySelector('[data-theme-status]');
  const progress = root.querySelector('progress');
  const key = 'tokyo-trip-shopping-list-v1';
  let saved = new Set();
  try { saved = new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch (_) {}

  const data = mode === 'shopping' ? shopItems : sceneItems;
  const categories = ['全部', ...new Set(data.map(item => mode === 'shopping' ? item.category : item.media))];
  let active = '全部';
  const mapLink = item => `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;

  const updateShoppingStatus = () => {
    if (mode !== 'shopping') return;
    status.textContent = `${saved.size}／${shopItems.length} 已加入清單`;
    progress.value = saved.size;
  };
  const render = () => {
    const visible = data.filter(item => active === '全部' || (mode === 'shopping' ? item.category : item.media) === active);
    grid.innerHTML = visible.map(item => mode === 'shopping' ? `
      <article class="theme-card" data-id="${item.id}">
        <div class="theme-card-top"><div><span class="theme-badge">${item.category}</span><h3>${item.name}</h3></div>
          <label class="buy-check"><input type="checkbox" ${saved.has(item.id) ? 'checked' : ''} aria-label="將 ${item.name} 加入購物清單"><span aria-hidden="true">✓</span></label></div>
        <p>${item.note}</p><dl><dt>順路地點</dt><dd>${item.where}</dd><dt>預算帶</dt><dd>${item.budget}</dd><dt>行李</dt><dd>${item.bag}</dd></dl>
        <div class="actions"><a class="btn alt" href="${item.url}" target="_blank" rel="noopener">官方／參考資訊</a></div>
      </article>` : `
      <article class="theme-card" data-id="${item.id}">
        <div class="scene-frame" aria-hidden="true"><span>${item.day}</span></div>
        <div><div class="scene-work">${item.media} · ${item.work}</div><h3>${item.spot}</h3></div>
        <p>${item.homage}</p><dl><dt>證據類型</dt><dd><span class="evidence-badge">${item.evidence}</span></dd><dt>適合時間</dt><dd>${item.best}</dd><dt>拍攝禮儀</dt><dd>${item.etiquette}</dd><dt>座標</dt><dd>${item.lat}, ${item.lng}</dd></dl>
        <div class="actions"><a class="btn" href="${mapLink(item)}" target="_blank" rel="noopener">開啟導航</a><a class="btn alt" href="${item.source}" target="_blank" rel="noopener">核對來源</a></div>
      </article>`).join('');
    if (mode === 'shopping') {
      grid.querySelectorAll('input[type="checkbox"]').forEach(input => input.addEventListener('change', event => {
        const id = event.target.closest('[data-id]').dataset.id;
        event.target.checked ? saved.add(id) : saved.delete(id);
        try { localStorage.setItem(key, JSON.stringify([...saved])); } catch (_) {}
        updateShoppingStatus();
      }));
    }
    if (mode === 'scenes') status.textContent = `${visible.length}／${sceneItems.length} 個場景`;
  };

  controls.innerHTML = categories.map(category => `<button class="filter-chip" type="button" aria-pressed="${category === active}" data-filter="${category}">${category}</button>`).join('');
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    active = button.dataset.filter;
    controls.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    render();
  });
  updateShoppingStatus();
  render();
})();
