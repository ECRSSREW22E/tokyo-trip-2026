(() => {
  const nav = (lat, lng, label) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=walking&dir_action=navigate&query=${encodeURIComponent(label)}`;
  const place = (name, type, lat, lng, best, note, floor = '') => ({ name, type, lat, lng, best, note, floor, nav: nav(lat, lng, name) });

  window.TRIP_DAY_POINTS = window.TRIP_DAY_POINTS || {};
  window.TRIP_DAY_POINTS[1] = [
    place('上野東照宮', '景點', 35.71463, 139.77270, '10:00–10:30', '石燈籠參道與唐門，早上光線較柔。'),
    place('龜有站北口兩津勘吉像', '拍照', 35.76671, 139.84763, '12:00–12:15', '先拍北口，再穿站前往南口。'),
    place('龜有香取神社', '神社', 35.76386, 139.85066, '13:40–14:10', '正面參拜後再往 Ario。'),
    place('實物大獨角獸鋼彈立像', '拍照', 35.62513, 139.77537, '16:40–17:10', '廣場外緣低角度拍完整機體。'),
    place('台場自由女神像', '拍照', 35.62782, 139.77148, '17:45–18:15', '向西北同框彩虹大橋；日落前後最佳。'),
    place('DECKS 東京海灘海側露台', '夜景', 35.62917, 139.77518, '18:20–18:45', '藍調時刻拍橋燈、水面與東京灣。'),
    place('新宿站東口', '起點', 35.69299, 139.70032, '19:30', '由東口開始，先逛站前商店。'),
    place('Cross Shinjuku Vision 3D 貓', '拍照', 35.69262, 139.70080, '19:30–19:40', '站在東口廣場西側安全區，拍大樓轉角螢幕。'),
    place('Alpen TOKYO', '特色店', 35.69346, 139.70083, '19:40–20:00', '大型運動與戶外用品旗艦店。', 'B2F–8F'),
    place('BicCamera 新宿東口站前店', '電器', 35.69200, 139.70183, '19:40–20:10', '相機、電器、SIM 與旅行配件。', 'B2F–3F'),
    place('紀伊國屋書店新宿本店', '特色店', 35.69224, 139.70302, '19:45–20:10', '大型書店與日本文化、外文書區。', '1F–8F'),
    place('新宿 Subnade 地下街', '商場', 35.69338, 139.70236, '20:00–20:15', '雨天或炎熱時可由地下街銜接歌舞伎町。'),
    place('歌舞伎町一番街牌樓', '拍照', 35.69389, 139.70175, '20:10–20:25', '由靖國通南側人行道拍牌樓與霓虹。'),
    place('唐吉訶德新宿歌舞伎町店', '購物', 35.69381, 139.70176, '20:15–20:35', '伴手禮、藥妝與旅行用品；先拍外觀再入店。'),
    place('哥吉拉路', '拍照', 35.69472, 139.70189, '20:25–20:40', '站在路口靠側，以道路中軸導向新宿東寶大樓。'),
    place('哥吉拉頭・新宿東寶大樓', '地標', 35.69507, 139.70188, '20:30–20:50', '長焦從哥吉拉路拍頭像，避免仰角過大。', '8F 露台依現場規定'),
    place('GiGO 新宿歌舞伎町', '遊戲', 35.69515, 139.70136, '20:45–21:05', '夾娃娃、音樂與街機遊戲。'),
    place('東急歌舞伎町 TOWER', '地標', 35.69594, 139.70066, '20:50–21:20', '先在 Cine City 廣場拍塔身，再進館。'),
    place('namco TOKYO', '遊戲', 35.69587, 139.70059, '21:00–21:25', '遊戲、角色與娛樂複合空間。', '3F'),
    place('新宿 KABUKI hall', '餐飲', 35.69587, 139.70059, '21:00–21:30', '祭典風美食廣場，適合晚餐與室內拍攝。', '2F'),
    place('新宿 Golden Gai', '街景', 35.69399, 139.70470, '21:25–21:45', '入口巷道拍燈籠與窄巷；尊重店家及客人隱私。'),
    place('花園神社', '神社', 35.69331, 139.70576, '21:40–21:55', '夜間參道安靜，拍鳥居後不打擾參拜。'),
    place('新宿思出橫丁', '街景', 35.69302, 139.69970, '22:00–22:15', '回程若有體力再繞到西口；窄巷勿架腳架。')
  ];

  if (!window.TRIP_SPOTS) return;
  window.TRIP_SPOTS.kabukicho = {
    title: '新宿・歌舞伎町夜間散策',
    city: '東京都',
    area: '新宿區・歌舞伎町',
    day: 'DAY 01',
    image: 'images/spots/shinjuku.jpg',
    desc: '由新宿東口先完成電器、書店與特色商場，再沿一番街、哥吉拉路、歌舞伎町塔、Golden Gai 與花園神社單向散策；全程使用明亮主要街道，不跟隨拉客進店。',
    map: '歌舞伎町一番街アーチ',
    flow: ['新宿站東口與 3D 貓','BicCamera／Alpen／紀伊國屋擇一購物','歌舞伎町一番街牌樓','唐吉訶德與哥吉拉路','新宿東寶大樓哥吉拉頭','GiGO 與 Cine City 廣場','東急歌舞伎町 TOWER','namco TOKYO／KABUKI hall','Golden Gai 外圍','花園神社','新宿三丁目或東口離開'],
    shops: window.TRIP_DAY_POINTS[1].filter((item) => ['特色店','電器','商場','購物','遊戲','餐飲'].includes(item.type)),
    photos: window.TRIP_DAY_POINTS[1].slice(6).map((item) => [item.name, item.note, `${item.lat},${item.lng}`, item.best, item.lat, item.lng]),
    sources: [
      ['GO TOKYO 新宿散策','https://www.gotokyo.org/en/story/walks-and-tours/shinjuku/index.html','官方旅遊'],
      ['GO TOKYO 新宿夜間導覽','https://www.gotokyo.org/en/guide-services/shinjuku-night/index.html','官方旅遊'],
      ['GO TOKYO Golden Gai','https://www.gotokyo.org/en/spot/62/index.html','官方旅遊'],
      ['新宿觀光振興協會','https://www.kanko-shinjuku.jp/','地方官方'],
      ['歌舞伎町官方入口','https://www.kabukicho.or.jp/','地方商圈'],
      ['東急歌舞伎町 TOWER','https://www.tokyu-kabukicho-tower.jp/','設施官方'],
      ['歌舞伎町 TOWER 交通','https://www.tokyu-kabukicho-tower.jp/access/','設施官方'],
      ['歌舞伎町 TOWER 樓層','https://www.tokyu-kabukicho-tower.jp/floorguide/','設施官方'],
      ['TOHO CINEMAS 新宿','https://www.tohotheater.jp/theater/076/institution.html','設施官方'],
      ['Hotel Gracery 新宿','https://shinjuku.gracery.com/','設施官方'],
      ['花園神社','https://hanazono-jinja.or.jp/','神社官方'],
      ['唐吉訶德歌舞伎町店','https://www.donki.com/store/shop_detail.php?shop_id=29','商店官方'],
      ['BicCamera 新宿東口站前店','https://www.biccamera.com/bc/i/shop/shoplist/shop111.jsp','商店官方'],
      ['紀伊國屋書店新宿本店','https://store.kinokuniya.co.jp/store/shinjuku-main-store/','商店官方'],
      ['Alpen TOKYO','https://store.alpen-group.jp/alpentokyo/CSfTokyoTop.jsp','商店官方'],
      ['GiGO 新宿歌舞伎町','https://tempo.gendagigo.jp/am/kabukicho/','設施官方'],
      ['namco TOKYO','https://bandainamco-am.co.jp/namco_tokyo/','設施官方'],
      ['JR 東日本新宿站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=866','交通官方'],
      ['東京 Metro 新宿站','https://www.tokyometro.jp/station/shinjuku/','交通官方'],
      ['新宿區安全資訊','https://www.city.shinjuku.lg.jp/anzen/','地方官方']
    ],
    social: [
      ['Facebook 實訪','夜間霓虹但要避開拉客','實訪者形容歌舞伎町有強烈霓虹與夜生活氣氛，同時提醒不要跟隨路邊拉客，選擇價目清楚的明亮店家。','https://www.facebook.com/traveltomtom/videos/kabukicho-red-light-district-of-tokyo-/639631812417371/','stick to well-lit spots'],
      ['Facebook 旅遊社團','歌舞伎町塔住宿與交通','旅客回報歌舞伎町塔周邊步行至車站方便，但夜間環境較吵，適合作為逛街點而非安靜休息區。','https://www.facebook.com/groups/457573074653783/posts/1916566828754393/','5 min walk'],
      ['Facebook 店家分享','唐吉訶德適合晚間補貨','公開貼文列出歌舞伎町店位置及全天候營業特性，適合安排在夜間路線中補買伴手禮。','https://www.facebook.com/donki.majicaglobal.en/posts/a-paradise-for-art-and-stationery-lovers-sekaido-in-shinjuku-was-established-in-/4267581753299863/','Open 24 hours'],
      ['X 活動實況','Cine City 廣場可能有活動','公開貼文顯示廣場經常舉辦舞台活動；到訪時需保留動線並依現場規定拍攝。','https://x.com/FULITBOX/status/2039601258403905653/photo/1','シネシティ広場'],
      ['X 場館官方','Zepp Shinjuku 即時資訊','官方 X 會更新歌舞伎町塔地下場館的公演資訊，晚間前往前可先確認人潮。','https://x.com/zeppshinjuku/with_replies','東急歌舞伎町タワー B1-B4'],
      ['X 活動實況','歌舞伎町塔戶外舞台','公開貼文顯示塔前舞台會有免費或售票活動；熱門活動時廣場拍照點可能被舞台與排隊動線占用。','https://x.com/yumeneo_info/status/1982777286970773978','KABUKICHO TOWER STAGE']
    ]
  };
})();
