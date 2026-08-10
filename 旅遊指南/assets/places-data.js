(() => {
  const nav = (lat, lng, label) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=walking&dir_action=navigate&query=${encodeURIComponent(label)}`;
  const place = (name, type, lat, lng, best, note, floor = '', zone = '') => ({ name, type, lat, lng, best, note, floor, zone, nav: nav(lat, lng, name) });

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

  window.TRIP_DAY_POINTS[2] = [
    place('妙義神社', '神社', 35.73862, 139.74506, '09:10–09:40', '由駒込站前往；參拜後沿主要道路回站。', '', '駒込'),
    place('池袋站東口', '起點', 35.72954, 139.71110, '10:05–10:15', '從東口開始，往 Sunshine 60 通單向前進。', '', '池袋'),
    place('Sunshine 60 通入口', '街景', 35.72988, 139.71541, '10:15–10:25', '站在人行區側邊拍商店街招牌與人流。', '', '池袋'),
    place('Animate 池袋本店', '特色店', 35.73034, 139.71525, '10:25–11:00', '九層旗艦店；先確認想逛的樓層，避免逐層耗時。', 'B2F–9F', '池袋'),
    place('Hareza 池袋廣場', '拍照', 35.73113, 139.71548, '11:00–11:10', '從中池袋公園拍 Hareza 建築與廣場。', '', '池袋'),
    place('Sunshine City 西入口', '地標', 35.72897, 139.71674, '11:15–11:25', '確認回程集合點與館內方向後再入館。', 'B1／1F', '池袋'),
    place('Bandai Namco Cross Store Tokyo', '特色店', 35.72916, 139.71866, '11:30–12:10', '角色商品與娛樂設施集中，作為 Pokémon Center 休館替代點。', 'World Import Mart 3F', '池袋'),
    place('NAMJATOWN', '遊戲', 35.72921, 139.71905, '12:10–12:40', '若不入園，可在入口完成主題外觀拍攝。', 'World Import Mart 2F', '池袋'),
    place('Sunshine 水族館', '景點', 35.72914, 139.72027, '12:40–13:40', '熱門展示與戶外天空企鵝區要預留排隊時間。', 'World Import Mart 屋頂', '池袋'),
    place('Sunshine 60 展望公園', '拍照', 35.72903, 139.71822, '13:45–14:20', '貼近玻璃拍城市層次，穿深色衣物減少反光。', 'Sunshine 60 60F', '池袋'),
    place('Sunshine City 噴水廣場', '拍照', 35.72904, 139.71853, '14:20–14:30', '離館前確認活動舞台與天井構圖；遇活動時遵守排隊動線。', 'alpa B1F', '池袋'),
    place('Pokémon Center MEGA TOKYO', '臨時休館', 35.72905, 139.71803, '8/17 不安排', '官方公告休館至 2026/8/23，預定 8/24 重開；本次行程不可進店。', 'alpa 2F', '池袋'),
    place('秋葉原站電氣街口', '起點', 35.69917, 139.77263, '15:00–15:10', '從西側廣場拍站名與電氣街入口。', '', '秋葉原'),
    place('秋葉原 Radio Kaikan', '特色店', 35.69811, 139.77199, '15:10–15:45', '模型、卡牌、AmiAmi 等集中；先選樓層再逛。', 'B1F–10F', '秋葉原'),
    place('Yodobashi Akiba', '電器', 35.69878, 139.77473, '15:45–16:10', '電器與相機品項齊全，JR 秋葉原站步行約 1 分鐘。', '1F–9F', '秋葉原'),
    place('秋葉原中央通南口', '街景', 35.69930, 139.77167, '16:15–16:25', '沿人行道側邊拍高密度招牌，不站車道。', '', '秋葉原'),
    place('BicCamera AKIBA', '電器', 35.70066, 139.77150, '16:25–16:50', '相機、家電、藥妝與玩具，可與 Yodobashi 擇一深逛。', '1F–7F', '秋葉原'),
    place('Animate 秋葉原', '特色店', 35.70080, 139.77169, '16:50–17:15', '動漫商品館舍；留意館別與樓層指示。', '1號館／2號館', '秋葉原'),
    place('GiGO 秋葉原 3號館', '遊戲', 35.69987, 139.77116, '17:15–17:35', '夾娃娃與合作活動；8/17 有多項期間限定活動。', '', '秋葉原'),
    place('Mandarake Complex', '特色店', 35.70220, 139.77076, '17:35–18:00', '二手漫畫、模型與收藏品，樓層分類清楚。', 'B1F–8F', '秋葉原'),
    place('Super Potato 秋葉原店', '遊戲', 35.70004, 139.77098, '18:00–18:20', '復古遊戲與懷舊陳列；店內狹窄請避免久站。', '3F–5F', '秋葉原'),
    place('神田明神', '神社', 35.70204, 139.76789, '18:25–18:45', '若時間允許再走到隨神門；否則直接轉往六本木。', '', '秋葉原'),
    place('六本木交差點', '街景', 35.66321, 139.73125, '19:25–19:35', '由安全人行區拍高架與夜間街景。', '', '六本木・東京鐵塔'),
    place('東京 Midtown Plaza', '商場', 35.66560, 139.72924, '19:35–19:55', '雨天備案與晚餐候選，地下可連接六本木站。', 'B1F–4F', '六本木・東京鐵塔'),
    place('六本木 Hills Mori Tower', '地標', 35.66029, 139.72958, '19:55–20:10', '從 66 Plaza 拍森大樓與巨大蜘蛛裝置。', '', '六本木・東京鐵塔'),
    place('毛利庭園', '夜景', 35.66033, 139.73070, '20:10–20:25', '庭園水面可收進森大樓燈光，保持步道暢通。', '', '六本木・東京鐵塔'),
    place('櫸坂通東京鐵塔視角', '拍照', 35.65919, 139.73109, '20:25–20:35', '由櫸坂通向東拍遠方東京鐵塔；使用中長焦。', '', '六本木・東京鐵塔'),
    place('增上寺三解脫門', '拍照', 35.65728, 139.74834, '20:55–21:05', '夜間寺院區域依現場開放範圍拍攝，不跨越封閉處。', '', '六本木・東京鐵塔'),
    place('芝公園 4 號地', '拍照', 35.65675, 139.74912, '21:05–21:20', '沿步道中軸拍整座東京鐵塔，人物站側邊避免擋路。', '', '六本木・東京鐵塔'),
    place('東京鐵塔 Foot Town 正門', '地標', 35.65858, 139.74543, '21:20–21:30', '塔下廣角仰拍鋼構；確認當日最終入場時間。', 'Foot Town 1F', '六本木・東京鐵塔'),
    place('東京鐵塔 Main Deck', '夜景', 35.65858, 139.74543, '21:30–22:00', '150 公尺展望台，鏡頭貼近玻璃並關閉閃光燈。', 'Main Deck 150m', '六本木・東京鐵塔'),
    place('赤羽橋口東京鐵塔視角', '拍照', 35.65504, 139.74398, '22:05–22:15', '離開前從赤羽橋交差點安全區拍完整塔身。', '', '六本木・東京鐵塔')
  ];

  window.TRIP_DAY_POINTS[3] = [
    place('湘南單軌大船站', '交通', 35.35341, 139.53131, '08:20–08:35', '從 JR 大船站跟隨湘南單軌標示，進站前先拍懸吊式列車。', '', '倒吊單軌・七里濱'),
    place('湘南江之島站 5F 觀景台', '拍照', 35.31173, 139.48770, '08:55–09:10', '出站前先到高樓層眺望江之島與湘南街區。', '5F', '倒吊單軌・七里濱'),
    place('江之電江之島站', '交通', 35.31104, 139.48754, '09:10–09:20', '步行轉乘；站前可拍穿衣麻雀欄杆裝飾。', '', '倒吊單軌・七里濱'),
    place('腰越路面電車段', '拍照', 35.30890, 139.49320, '09:22–09:28', '列車在道路中央行駛；只從人行道安全位置觀察。', '', '倒吊單軌・七里濱'),
    place('鎌倉高校前 1 號平交道', '拍照', 35.30652, 139.50058, '09:30–09:40', '熱門平交道不可站車道或阻擋居民；人多時直接略過。', '', '倒吊單軌・七里濱'),
    place('七里濱站', '交通', 35.30600, 139.51080, '09:45–09:50', '出站後往海岸方向步行。', '', '倒吊單軌・七里濱'),
    place('七里濱海岸中央', '拍照', 35.30458, 139.51027, '09:55–10:20', '向西可望江之島；浪大時不要靠近濕沙線。', '', '倒吊單軌・七里濱'),
    place('七里濱停車場海側', '拍照', 35.30496, 139.51244, '10:20–10:30', '利用高差拍海岸與公路，避開車輛出入口。', '', '倒吊單軌・七里濱'),
    place('bills 七里濱', '餐飲', 35.30514, 139.51263, '10:30–11:30', '海景咖啡與早午餐；熱門時段須預留候位。', 'WEEKEND HOUSE ALLEY 2F', '倒吊單軌・七里濱'),
    place('七里濱西側江之島視角', '拍照', 35.30446, 139.50686, '11:30–11:45', '返站前以中焦段拍江之島與海面層次。', '', '倒吊單軌・七里濱'),
    place('江之島弁天橋入口', '地標', 35.30446, 139.48219, '12:10–12:20', '從橋頭拍島體與海面，再沿人行橋進島。', '', '江之島'),
    place('江島神社青銅鳥居', '拍照', 35.30248, 139.48063, '12:25–12:35', '站在參道較寬處拍鳥居與仲見世坡道。', '', '江之島'),
    place('弁財天仲見世通', '街景', 35.30167, 139.48022, '12:35–12:55', '午餐、章魚仙貝與伴手禮集中；不要在狹窄通道停留太久。', '', '江之島'),
    place('朝日堂本店 丸燒章魚仙貝', '餐飲', 35.30143, 139.48013, '12:40–12:50', '熱門時可能排隊；若隊伍過長就略過，避免壓縮島內行程。', '', '江之島'),
    place('とびっちょ 江之島本店', '餐飲', 35.30280, 139.48106, '12:50–13:15', '吻仔魚料理熱門店；午餐候位過久時改用外帶或其他店家。', '', '江之島'),
    place('江島神社邊津宮', '神社', 35.30049, 139.47954, '13:00–13:20', '先本殿參拜，再依序往中津宮與山頂。', '', '江之島'),
    place('江島神社中津宮', '神社', 35.29941, 139.48023, '13:25–13:40', '朱紅社殿與相模灣同框；保持參拜動線。', '', '江之島'),
    place('江之島 Sea Candle', '地標', 35.29976, 139.47848, '13:45–14:15', '展望台可望富士山方向；夏季 19:30 最終入場但本行程午後即離島。', '', '江之島'),
    place('山二つ', '拍照', 35.29930, 139.47822, '14:20–14:30', '由御岩屋道欄杆內拍海蝕地形，勿跨越護欄。', '', '江之島'),
    place('江島神社奧津宮', '神社', 35.29936, 139.47557, '14:35–14:50', '參拜後繼續往稚兒淵，不原路折返山頂。', '', '江之島'),
    place('魚見亭海景座席', '餐飲', 35.29924, 139.47492, '14:45–15:00', '若有空位可短暫補水休息；不要為候位影響岩屋與轉乘時間。', '', '江之島'),
    place('稚兒淵', '拍照', 35.29911, 139.47445, '14:55–15:15', '海浪與潮位不佳時不上礁岩；依現場封閉指示。', '', '江之島'),
    place('江之島岩屋', '景點', 35.29905, 139.47162, '15:15–15:45', '島西側終點；若弁天丸停航，需預留走回橋頭的體力與時間。', '', '江之島'),
    place('熱海站', '交通', 35.10389, 139.07762, '17:15–17:25', '抵達後先確認回程票與最晚列車，再寄放不必要行李。', '', '熱海・花火'),
    place('熱海平和通商店街', '商店街', 35.10337, 139.07818, '17:25–17:50', '車站右前方拱廊，優先購買較早打烊的伴手禮。', '', '熱海・花火'),
    place('熱海仲見世商店街', '商店街', 35.10349, 139.07733, '17:50–18:10', '與平和通並行，可從另一條下坡避免折返。', '', '熱海・花火'),
    place('熱海布丁 1st 本店', '餐飲', 35.10310, 139.07802, '17:30–17:40', '熱門甜點店，排隊過長則改買站內伴手禮。', '', '熱海・花火'),
    place('草莓 BonBonBERRY ATAMI HOUSE', '餐飲', 35.10274, 139.07807, '17:40–17:50', '草莓甜點與繽紛外觀，先確認當日售完與打烊資訊。', '', '熱海・花火'),
    place('家康之湯足湯', '景點', 35.10399, 139.07785, '18:10–18:20', '若仍開放可短暫休息；擁擠時不排隊。', '', '熱海・花火'),
    place('熱海銀座商店街', '街景', 35.09784, 139.07651, '18:30–18:50', '沿下坡往海邊，晚餐店家集中於此區。', '', '熱海・花火'),
    place('常盤木羊羹店 總本店', '特色店', 35.09758, 139.07648, '18:35–18:45', '傳統羊羹伴手禮；若已打烊只拍外觀，不延誤海邊卡位。', '', '熱海・花火'),
    place('熱海 Sun Beach 北端', '拍照', 35.09956, 139.07752, '18:55–19:10', '日落後藍調時刻拍沙灘、飯店燈光與海灣。', '', '熱海・花火'),
    place('大湯間歇泉／大宮之松周邊', '地標', 35.09767, 139.07687, '19:10–19:20', '沿海岸南行的短停點，避免為拍照穿越車流。', '', '熱海・花火'),
    place('Moon Terrace', '夜景', 35.09608, 139.07692, '19:25–19:40', '階梯與海灣燈光構圖，拍完繼續向南。', '', '熱海・花火'),
    place('親水公園 Rainbow Deck', '拍照', 35.09476, 139.07582, '19:45–20:00', '先找離場方向清楚的位置，不要卡在最靠海的死角。', '', '熱海・花火'),
    place('熱海親水公園花火觀賞區', '花火', 35.09419, 139.07507, '20:15–20:40', '官方 8/18 夏季花火時間；結束後立即依人流步行回熱海站。', '', '熱海・花火')
  ];

  if (!window.TRIP_SPOTS) return;
  const enrich = (id, dayNumber, zone, extraSources, extraSocial = []) => {
    const spot = window.TRIP_SPOTS[id];
    if (!spot) return;
    const points = (window.TRIP_DAY_POINTS[dayNumber] || []).filter((item) => item.zone === zone && item.type !== '臨時休館');
    spot.shops = points.filter((item) => ['特色店','電器','商場','商店街','遊戲','餐飲'].includes(item.type));
    spot.photos = points.map((item) => [item.name, item.note, `${item.lat},${item.lng}`, item.best, item.lat, item.lng]);
    spot.sources = [...spot.sources, ...extraSources].filter((item, index, all) => all.findIndex((candidate) => candidate[1] === item[1]) === index);
    spot.social = [...(spot.social || []), ...extraSocial].filter((item, index, all) => all.findIndex((candidate) => candidate[3] === item[3]) === index);
  };

  enrich('sunshine-city', 2, '池袋', [
    ['Sunshine City 英文官方','https://sunshinecity.jp/en/','設施官方'],
    ['Sunshine City 交通','https://sunshinecity.jp/information/access_train.html','交通官方'],
    ['Sunshine City 館內圖','https://sunshinecity.jp/information/floor_map/','館內官方'],
    ['Sunshine City 營業資訊','https://sunshinecity.jp/information/','設施官方'],
    ['Sunshine 水族館','https://sunshinecity.jp/aquarium/','景點官方'],
    ['Sunshine 60 展望公園','https://sunshinecity.jp/observatory/','景點官方'],
    ['NAMJATOWN','https://bandainamco-am.co.jp/tp/namja/','設施官方'],
    ['Bandai Namco Cross Store Tokyo','https://bandainamco-am.co.jp/crossstore/store/tokyo/','商店官方'],
    ['Animate 池袋本店樓層','https://www.animate.co.jp/en/shop/ikebukuro/floor/','商店官方'],
    ['Pokémon Center MEGA TOKYO 休館公告','https://shop.pokemon.co.jp/en/shop/pokemoncenter-megatokyo/','商店官方'],
    ['Hareza 池袋','https://hareza-ikebukuro.com/','設施官方'],
    ['JR 東日本池袋站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=108','交通官方'],
    ['東京 Metro 池袋站','https://www.tokyometro.jp/station/ikebukuro/','交通官方'],
    ['西武鐵道池袋站','https://www.seiburailway.jp/railway/station/ikebukuro/','交通官方'],
    ['東武鐵道池袋站','https://www.tobu.co.jp/railway/guide/station/info/7105/','交通官方']
  ], [
    ['Reddit 2026 實訪','大型店內容豐富但本次旅行期間休館','近期實訪肯定 MEGA TOKYO 的規模與限定商品；但官方已公告 8/17 仍在休館，因此改逛 Bandai Namco Cross Store。','https://www.reddit.com/r/Japananimetravel/comments/1v6jwsg/','FULL Store & Merch Tour']
  ]);
  window.TRIP_SPOTS['sunshine-city'].notice = '重要：Pokémon Center MEGA TOKYO 官方公告休館至 2026/8/23，預定 8/24 重開；本次 8/17 行程請改逛 Bandai Namco Cross Store、水族館或展望公園。';

  enrich('akihabara', 2, '秋葉原', [
    ['秋葉原電氣街振興會','https://akiba.or.jp/','地方商圈'],
    ['秋葉原官方商店地圖 PDF','https://akiba.or.jp/denkigai2023summer/images/akibaAstyle140_P6_map.pdf','地方商圈'],
    ['Yodobashi Akiba','https://global.yodobashi/stores/yodobashi_camera/akiba/','商店官方'],
    ['BicCamera AKIBA','https://www.biccamera.com/bc/i/shop/shoplist/shop116.jsp','商店官方'],
    ['秋葉原 Radio Kaikan','https://www.akihabara-radiokaikan.co.jp/','商場官方'],
    ['GiGO 秋葉原 5號館','https://www.gigo.co.jp/shops/akihabara5','設施官方'],
    ['Super Potato 秋葉原店','https://www.superpotato.com/shop/akihabara/','商店官方'],
    ['Animate 秋葉原','https://www.animate.co.jp/shop/akihabara/','商店官方'],
    ['Mandarake Complex','https://www.mandarake.co.jp/dir/cmp/','商店官方'],
    ['AmiAmi 秋葉原 Radio Kaikan 店','https://www.amiami.jp/top/page/t/store.html','商店官方'],
    ['Volks 秋葉原 Hobby Paradise 2','https://www.volks.co.jp/hobbytengoku2/','商店官方'],
    ['Surugaya 秋葉原店資訊','https://www.suruga-ya.jp/feature/akihabara/index.html','商店官方'],
    ['唐吉訶德秋葉原店','https://www.donki.com/store/shop_detail.php?shop_id=98','商店官方'],
    ['神田明神','https://www.kandamyoujin.or.jp/','神社官方'],
    ['JR 東日本秋葉原站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=41','交通官方'],
    ['東京 Metro 秋葉原站','https://www.tokyometro.jp/station/akihabara/','交通官方']
  ], [
    ['Reddit 實訪','短時間先選 Radio Kaikan 與 Yodobashi','旅客反覆建議先逛 Radio Kaikan，再依需求選 Yodobashi、BicCamera 或 Super Potato，不必每間同類店都進。','https://www.reddit.com/r/JapanTravelTips/comments/1oojds1/','Radio Kaikan for sure'],
    ['Reddit 購物實訪','二手商品要比較品況與價格','玩家分享指出 Super Potato 觀賞性高但價格不一定最低，二手遊戲可再比較 Surugaya、Trader 與 BEEP。','https://www.reddit.com/r/gamingjapanese/comments/1slge9j/','super potato expensive']
  ]);

  enrich('tokyo-tower', 2, '六本木・東京鐵塔', [
    ['東京鐵塔繁中官方','https://zh.tokyotower.co.jp/','景點官方'],
    ['東京鐵塔交通','https://www.tokyotower.co.jp/access/','交通官方'],
    ['東京鐵塔費用與營業時間','https://www.tokyotower.co.jp/price/','景點官方'],
    ['東京鐵塔燈光資訊','https://www.tokyotower.co.jp/lightup/','景點官方'],
    ['東京鐵塔 Foot Town','https://www.tokyotower.co.jp/foottown/','設施官方'],
    ['增上寺','https://www.zojoji.or.jp/','寺院官方'],
    ['東京都芝公園','https://www.kensetsu.metro.tokyo.lg.jp/jimusho/toubuk/shiba','地方官方'],
    ['六本木 Hills','https://www.roppongihills.com/','設施官方'],
    ['毛利庭園','https://www.roppongihills.com/green/','設施官方'],
    ['東京 Midtown','https://www.tokyo-midtown.com/jp/','設施官方'],
    ['東京 Metro 六本木站','https://www.tokyometro.jp/station/roppongi/','交通官方'],
    ['都營地下鐵赤羽橋站','https://www.kotsu.metro.tokyo.jp/subway/stations/akabanebashi.html','交通官方']
  ], [
    ['Reddit 拍攝實訪','芝公園與增上寺是整塔構圖主力','旅客通常把芝公園四號地與增上寺列為免費外拍點；若只為拍塔，不一定需要購買展望台門票。','https://www.reddit.com/r/JapanTravelTips/search/?q=Tokyo%20Tower%20Shiba%20Park&restrict_sr=1','Shiba Park']
  ]);

  enrich('shichirigahama', 3, '倒吊單軌・七里濱', [
    ['湘南單軌官方','https://www.shonan-monorail.co.jp/','交通官方'],
    ['湘南單軌車站資訊','https://www.shonan-monorail.co.jp/station/','交通官方'],
    ['江之電英文官方','https://www.enoden.co.jp/en/','交通官方'],
    ['江之電江之島站時刻','https://www.enoden.co.jp/en/train/station/enoshima/time-table/','交通官方'],
    ['江之電七里濱站','https://www.enoden.co.jp/train/station/shichirigahama/','交通官方'],
    ['bills 七里濱','https://billsjapan.com/jp/七里ヶ浜','餐廳官方'],
    ['鎌倉市觀光協會','https://www.trip-kamakura.com/','地方官方'],
    ['鎌倉高校前站拍攝禮儀','https://www.city.kamakura.kanagawa.jp/kankou/','地方官方'],
    ['神奈川觀光七里濱','https://www.kanagawa-kankou.or.jp/spot/671','地方官方'],
    ['氣象廳湘南海上警報','https://www.jma.go.jp/bosai/warning/','氣象官方'],
    ['JR 東日本大船站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=325','交通官方']
  ], [
    ['Reddit 鐵道實訪','江之電沿海段的懷舊感是行程亮點','近期鐵道旅客特別分享江之電沿海與道路共線景觀；拍車需站在人行區，不能追車或進入平交道。','https://www.reddit.com/r/trains/comments/1sow89j/','feels so nostalgic'],
    ['Reddit 單軌實訪','倒吊式湘南單軌本身值得安排','旅客分享 6.6 公里懸吊式路線的乘坐體驗；靠站時晃動較明顯，拍攝器材要收好。','https://www.reddit.com/r/trains/comments/1l4nlab/','suspended SAFEGE monorail']
  ]);

  enrich('enoshima', 3, '江之島', [
    ['藤澤市觀光江之島','https://www.fujisawa-kanko.jp/spot/enoshima/','地方官方'],
    ['江島神社','https://enoshimajinja.or.jp/','神社官方'],
    ['江島神社交通','https://enoshimajinja.or.jp/access/','神社官方'],
    ['江之島 Sea Candle','https://www.fujisawa-kanko.jp/spot/enoshima/12.html','地方官方'],
    ['江之島 Samuel Cocking 苑','https://enoshima-seacandle.com/','景點官方'],
    ['江之島岩屋','https://www.fujisawa-kanko.jp/spot/enoshima/17.html','地方官方'],
    ['神奈川 Sea Project 江之島岩屋','https://www.pref.kanagawa.jp/osirase/0602/feelshonan/tc/sightseeing/1026/index.html','地方官方'],
    ['江之島 Escar','https://www.enoden.co.jp/tourism/spot/escarmap/','設施官方'],
    ['江之島弁天丸','https://www.fujisawa-kanko.jp/spot/enoshima/16.html','交通官方'],
    ['とびっちょ 江之島本店','https://tobiccho.com/shops/tobiccho','餐廳官方'],
    ['朝日堂本店','https://www.murasaki-imo.com/','商店官方'],
    ['藤澤市觀光課','https://www.city.fujisawa.kanagawa.jp/kankou/','地方官方'],
    ['江之電觀光資訊','https://www.enoden.co.jp/tourism/','交通官方'],
    ['藤澤市觀光導覽 PDF','https://www.fujisawa-kanko.jp/pamph/daisukifujisawa.pdf','地方官方']
  ], [
    ['Reddit 2026 行程實訪','江之島與鎌倉同日全走容易太趕','近期旅客指出兩地都完整走完會很倉促；本行程因此只保留七里濱，島內採單向動線。','https://www.reddit.com/r/SeishunButaYarou/comments/1uchssq/','may not be the best idea'],
    ['Reddit 2026 規劃討論','島內階梯與回程時間要納入','近期規劃討論反覆提醒江之島不是平地散步；走到岩屋後仍須確認弁天丸是否營運。','https://www.reddit.com/r/JapanTravelTips/comments/1thjoyc/','Enoshima+Kamakura Day Trip']
  ]);

  enrich('atami-fireworks', 3, '熱海・花火', [
    ['熱海觀光協會花火大會','https://www.ataminews.gr.jp/event/8/','活動官方'],
    ['熱海市花火大會','https://www.city.atami.lg.jp/event/1009037/index.html','地方官方'],
    ['2026 熱海花火公告','https://www.ataminews.gr.jp/notices/352','活動官方'],
    ['熱海觀光協會','https://www.ataminews.gr.jp/','地方官方'],
    ['熱海站前商店街','https://www.ataminews.gr.jp/spot/208/','地方官方'],
    ['熱海 Sun Beach','https://www.ataminews.gr.jp/spot/119/','地方官方'],
    ['熱海親水公園','https://www.ataminews.gr.jp/spot/121/','地方官方'],
    ['JR 東日本熱海站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=80','交通官方'],
    ['JR 東海熱海站','https://railway.jr-central.co.jp/station-guide/shinkansen/atami/','交通官方'],
    ['熱海市交通規制資訊','https://www.city.atami.lg.jp/','地方官方'],
    ['熱海觀光 FAQ','https://www.ataminews.gr.jp/faq/','地方官方']
    ,['熱海布丁','https://www.atami-purin.com/','商店官方']
    ,['草莓 BonBonBERRY ATAMI HOUSE','https://www.atami-bonbonberry.com/','商店官方']
    ,['常盤木羊羹店','https://tokiwagi-yohkanten.com/','商店官方']
    ,['熱海花火大會來場者須知','https://www.city.atami.lg.jp/event/1009037/1012047.html','地方官方']
  ], [
    ['YouTube 現場紀錄','花火在海灣近距離展開','現場影片可確認花火高度、海面反光與音響感；拍攝建議保留廣角，不要只使用長焦。','https://www.youtube.com/watch?v=QOTPbhgHssw','熱海花火大会 Live版'],
    ['YouTube 現場直播存檔','海灣三面環山讓聲音反射明顯','公開直播說明提到熱海灣地形會加強聲響感；對聲音敏感者可準備耳塞。','https://www.youtube.com/watch?v=1Nnjr0tAa54','すり鉢状の地形']
  ]);
  window.TRIP_SPOTS['atami-fireworks'].notice = '已由熱海市觀光協會確認：2026/8/18 夏季花火預定 20:15–20:40、熱海灣舉行，雨天原則照常；仍須於當日下午再次確認官方公告與交通管制。';

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
