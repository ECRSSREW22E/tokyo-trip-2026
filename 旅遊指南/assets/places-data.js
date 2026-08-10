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

  window.TRIP_DAY_POINTS[4] = [
    place('豪德寺站', '交通', 35.65374, 139.64736, '09:00–09:10', '由小田急線下車後沿商店街步行，與世田谷線山下站分清楚。', '', '豪德寺'),
    place('豪德寺商店街招財貓像', '拍照', 35.65328, 139.64672, '09:10–09:20', '由人行道側取景，適合作為街區起點照。', '', '豪德寺'),
    place('豪德寺山門', '拍照', 35.64875, 139.64792, '09:30–09:40', '早上順光且人較少，用山門框住參道。', '', '豪德寺'),
    place('豪德寺三重塔', '拍照', 35.64838, 139.64844, '09:40–09:55', '從參道轉角以樹葉作前景，不踏入植栽。', '', '豪德寺'),
    place('豪德寺招福殿・招財貓奉納所', '地標', 35.64818, 139.64818, '09:55–10:20', '熱門點採低角度近景與整排構圖，勿移動奉納貓。', '', '豪德寺'),
    place('宮之坂站招財貓電車', '拍照', 35.64762, 139.64471, '10:35–10:45', '在月台安全線內拍世田谷線車輛，班次不合就直接略過。', '', '豪德寺'),
    place('明治神宮南參道鳥居', '拍照', 35.67020, 139.70263, '11:30–11:40', '廣角沿參道中軸取景，避開正中央人流。', '', '原宿・明治神宮'),
    place('明治神宮奉獻酒樽牆', '拍照', 35.67452, 139.69967, '11:50–12:00', '站在對側以正面網格構圖，上午樹蔭光較均勻。', '', '原宿・明治神宮'),
    place('明治神宮御社殿南神門', '神社', 35.67639, 139.69931, '12:05–12:30', '先手水再參拜；拍攝以外庭為主，遵守殿內限制。', '', '原宿・明治神宮'),
    place('東京 Opera City 水之廣場', '拍照', 35.68313, 139.68626, '13:15–13:25', '由初台站東口地下直結，拍水面、柱列與挑高空間。', '', '初台・Opera City'),
    place('東京 Opera City Sunken Garden', '拍照', 35.68282, 139.68668, '13:25–13:40', '利用圓形廣場與高樓垂直線構圖；盛夏優先走陰影區。', 'B1F', '初台・Opera City'),
    place('敘敘苑 Opera City 53F', '餐飲', 35.68305, 139.68641, '13:40–14:30', '高樓景觀午餐候選；若未訂位改用館內其他餐廳。', '53F', '初台・Opera City'),
    place('原宿站東口', '拍照', 35.67023, 139.70270, '15:05–15:15', '由站前安全區拍新站舍與神宮橋人流。', '', '原宿・表參道'),
    place('竹下通入口', '拍照', 35.67156, 139.70308, '15:15–15:25', '站在路口側邊拍彩色牌樓，避免在人流中央停留。', '', '原宿・表參道'),
    place('DAISO 原宿店', '特色店', 35.67142, 139.70485, '15:25–15:45', '大型百圓店，可快速補旅行用品與小型伴手禮。', 'B1F–3F', '原宿・表參道'),
    place('WITH HARAJUKU・IKEA 原宿', '商場', 35.67063, 139.70273, '15:45–16:10', '雨天與炎熱時的室內休息點，館內另有餐飲。', '1F–2F', '原宿・表參道'),
    place('東急 Plaza 原宿 HARAKADO', '商場', 35.66916, 139.70510, '16:15–16:40', '屋上綠地與神宮前交差點視角；確認當日活動與樓層開放。', '', '原宿・表參道'),
    place('表參道 Hills 吹拔大階段', '拍照', 35.66721, 139.70829, '16:45–17:10', '由中央挑高區拍螺旋坡道，勿妨礙店鋪入口。', '', '原宿・表參道'),
    place('Kiddy Land 原宿店', '特色店', 35.66649, 139.70751, '17:10–17:35', '角色商品樓層豐富，先查看樓層品牌再逛。', 'B1F–4F', '原宿・表參道'),
    place('澀谷 PARCO', '商場', 35.66208, 139.69896, '17:55–18:25', 'Nintendo TOKYO、Pokémon Center 與角色商店集中。', '6F', '澀谷'),
    place('忠犬八公像', '拍照', 35.65905, 139.70056, '18:30–18:40', '人潮大，從廣場外側快速拍攝，不占用集合點。', '', '澀谷'),
    place('澀谷十字路口', '街景', 35.65949, 139.70044, '18:40–18:50', '藍調時刻由合法人行區或高處拍攝，絕不在車道停留。', '', '澀谷'),
    place('SHIBUYA SKY・Sky Edge', '拍照', 35.65845, 139.70217, '19:00–20:20', '日落後城市燈光最佳；依規定寄物，強風可能關閉屋頂。', '46F／屋頂', '澀谷'),
    place('SHIBUYA SUMMER CONSTELLATION 備用日', '限定活動', 35.65845, 139.70217, '19:00–21:00', '只有 8/18 因天候延期時才於 8/19 舉行；當日查官方公告。', 'SHIBUYA SKY 屋頂', '澀谷')
  ];

  window.TRIP_DAY_POINTS[5] = [
    place('蛇窪神社鳥居', '拍照', 35.60520, 139.71343, '09:20–09:30', '由參道外拍社名與入口，避免阻擋居民通行。', '', '品川・蛇窪'),
    place('蛇窪神社本殿', '神社', 35.60504, 139.71355, '09:30–09:45', '先完成本殿參拜，再依境內順序前往白蛇辨財天。', '', '品川・蛇窪'),
    place('蛇窪神社白蛇辨財天社', '拍照', 35.60492, 139.71370, '09:45–10:00', '保持參拜距離，以白蛇意象作細節特寫。', '', '品川・蛇窪'),
    place('戶越公園', '景點', 35.60765, 139.71846, '10:20–10:40', '若天氣不熱可短停池泉庭園；高溫時直接前往大井町。', '', '品川・蛇窪'),
    place('阪急大井町 Garden', '商場', 35.60613, 139.73418, '11:00–11:40', '午餐與室內補給點，避免午後行程曝曬過久。', '', '大井町'),
    place('品川水族館入口', '地標', 35.58924, 139.73815, '12:25–12:35', '先確認當日表演時間，再決定館內順序。', '', '品川水族館'),
    place('東京灣生態水槽', '拍照', 35.58916, 139.73806, '12:40–12:55', '關閉閃光燈，提高感光度拍魚群層次。', '館內', '品川水族館'),
    place('水中隧道', '拍照', 35.58910, 139.73802, '13:00–13:15', '用廣角向上拍魚群，靠側停留讓出主要動線。', '館內', '品川水族館'),
    place('海豚・海獅表演池', '表演', 35.58904, 139.73826, '依當日場次', '提早 15–20 分入座；夏休與盂蘭盆時段依官方表演表。', '館內', '品川水族館'),
    place('Eric Carle 與生命之色特展', '限定活動', 35.58912, 139.73811, '10:00–17:00', '2026/7/25–12/25 展出，8/20 可參觀；現場位置依館內指引。', '館內', '品川水族館'),
    place('櫻木町站東口', '拍照', 35.45085, 139.63110, '16:10–16:20', '先拍港未來天際線，再前往纜車站。', '', '橫濱港未來'),
    place('YOKOHAMA AIR CABIN 櫻木町站', '交通', 35.45031, 139.63145, '16:20–16:50', '搭車前拍纜車越過大岡川；玻璃反光時貼近鏡頭遮光。', '', '橫濱港未來'),
    place('運河公園站', '拍照', 35.45480, 139.63631, '16:50–17:00', '下車後回拍纜車、汽車道與 Landmark Tower。', '', '橫濱港未來'),
    place('橫濱 World Porters', '商場', 35.45522, 139.63872, '17:00–17:35', '餐飲、雜貨與室內休息；選定樓層避免逛太久。', '', '橫濱港未來'),
    place('MARINE & WALK YOKOHAMA', '商場', 35.45424, 139.64292, '17:40–18:05', '紅磚外圍的海景餐飲與街拍點。', '', '橫濱港未來'),
    place('紅磚倉庫 1 號館前', '拍照', 35.45265, 139.64314, '18:10–18:25', '斜角同時納入兩棟建築與廣場，避開活動排隊區。', '', '橫濱港未來'),
    place('Red Brick Sunset 2026', '限定活動', 35.45232, 139.64306, '11:00–22:00', '免費入場的聖塔莫尼卡主題夏日市集；飲食另計。', '活動廣場', '橫濱港未來'),
    place('Disco Brick YOKOHAMA', '限定活動', 35.45232, 139.64306, '8/20 晚間', '8/20 為 Grassroots 30th ANNIVERSARY DISCO PARTY；部分區域有料。', '活動廣場', '橫濱港未來'),
    place('赤レンガ・アートプラネタリウム', '限定活動', 35.45292, 139.64253, '8/1–8/30', '「星空を旅する」位於 1 號館；依官方現場資訊安排。', '1 號館', '橫濱港未來'),
    place('ウルトラマルチバース AR 體驗', '限定活動', 35.45275, 139.64290, '6/5–11/30', '以橫濱為舞台的都市周遊型 AR 任務，可在紅磚倉庫拍 AR 合照。', '', '橫濱港未來'),
    place('象之鼻公園', '拍照', 35.44949, 139.64467, '19:05–19:20', '藍調時刻拍紅磚、港灣與船隻；靠步道側架構圖。', '', '橫濱港未來'),
    place('汽車道港未來視角', '夜景', 35.45392, 139.63541, '20:10–20:25', '用欄杆穩定相機，拍摩天輪、飯店與水面倒影。', '', '橫濱港未來'),
    place('Cosmo Clock 21', '夜景', 35.45524, 139.63675, '20:25–21:10', '摩天輪內避免閃光，藍調與全夜景各拍一組。', '', '橫濱港未來')
  ];

  window.TRIP_DAY_POINTS[6] = [
    place('淺草文化觀光中心 8F 展望台', '拍照', 35.71068, 139.79659, '09:00–09:20', '用中焦段壓縮雷門、仲見世到本堂的寺院軸線。', '8F', '淺草'),
    place('雷門', '拍照', 35.71113, 139.79637, '09:20–09:30', '從人行區拍大燈籠，通過門時靠側一禮。', '', '淺草'),
    place('仲見世商店街入口', '街景', 35.71155, 139.79645, '09:30–09:45', '較早時人潮少；營業後靠側走，不在中線停留。', '', '淺草'),
    place('木村家人形燒本舖', '特色店', 35.71334, 139.79655, '09:45–10:00', '雷門、五重塔造型人形燒，先確認當日開店時間。', '', '淺草'),
    place('淺草九重炸饅頭', '餐飲', 35.71356, 139.79656, '10:00–10:10', '邊走邊吃不合禮儀，購買後在店家指定處吃完。', '', '淺草'),
    place('寶藏門', '拍照', 35.71389, 139.79644, '10:10–10:20', '由前廣場偏西側同框五重塔。', '', '淺草'),
    place('淺草寺五重塔', '拍照', 35.71388, 139.79572, '10:20–10:30', '上午從寶藏門前偏西側拍塔身與門樓。', '', '淺草'),
    place('常香爐', '參拜', 35.71442, 139.79655, '10:30–10:35', '依現場動線停留，不要長時間占據香爐正前方。', '', '淺草'),
    place('淺草寺本堂', '神社', 35.71477, 139.79666, '10:35–10:55', '賽錢、合掌後再抽籤；凶籤依寺方方式綁於指定處。', '', '淺草'),
    place('淺草神社', '神社', 35.71515, 139.79745, '11:00–11:15', '從本堂東側前往，朱印與參拜依現場公告。', '', '淺草'),
    place('西參道商店街', '商店街', 35.71505, 139.79470, '11:20–11:45', '木紋地面與老店招牌適合街拍，也是回程替代路線。', '', '淺草'),
    place('合羽橋道具街', '商店街', 35.71319, 139.78898, '12:00–12:45', '廚具、食品模型與器皿集中；有採買需求再前往。', '', '淺草'),
    place('阿美橫町上野側牌樓', '拍照', 35.70936, 139.77401, '14:00–14:10', '在人行區用中焦段壓縮招牌與人潮。', '', '上野・阿美橫町'),
    place('二木之菓子 第一營業所', '特色店', 35.70851, 139.77311, '14:10–14:35', '零食伴手禮集中，先按清單採買避免超重。', '', '上野・阿美橫町'),
    place('OS Drug 上野店', '特色店', 35.70820, 139.77422, '14:35–14:50', '藥妝候選；付款與免稅方式依現場標示。', '', '上野・阿美橫町'),
    place('Yodobashi Camera 上野', '電器', 35.71048, 139.77382, '14:50–15:15', '相機、電器與旅行配件，可作最後補貨。', '', '上野・阿美橫町'),
    place('阿美橫町御徒町側', '街景', 35.70662, 139.77413, '15:15–15:30', '高架、燈光與密集招牌同框；靠店側短停。', '', '上野・阿美橫町'),
    place('京成上野站', '交通', 35.71123, 139.77383, '依班次提前 20 分', '先領票並確認 Skyliner 指定席、航廈與行李空間。', '', '上野・返程'),
    place('三味線・箏體驗與演奏', '限定活動', 35.71068, 139.79659, '19:00–20:30', '8/21 於淺草文化觀光中心 6F 免費舉辦；若航班返程時間允許才加入。', '6F 多目的空間', '淺草')
  ];

  window.TRIP_DAY_EVENTS = {
    4: [
      { status:'conditional', title:'SHIBUYA SUMMER CONSTELLATION 夏季星座觀賞', date:'2026/8/19', time:'19:00–21:00', place:'SHIBUYA SKY', note:'8/18 因天候取消時才順延至 8/19；當日下午必須查看官方公告。', url:'https://www.shibuya-scramble-square.com/sky/observation/event_20260818.html', lat:35.65845, lng:139.70217 },
      { status:'confirmed', title:'THE ROOF SHIBUYA SKY', date:'2026/8/19', time:'17:00–22:00（依方案）', place:'SHIBUYA SKY', note:'屋頂期間限定飲品與座席方案；需另看預約與強風開放狀況。', url:'https://www.shibuya-scramble-square.com/sky/the-roof/', lat:35.65845, lng:139.70217 }
    ],
    5: [
      { status:'confirmed', title:'Eric Carle 與生命之色特展', date:'2026/7/25–12/25', time:'10:00–17:00', place:'品川水族館', note:'8/20 行程期間確定展出，入館截止 16:30。', url:'https://www.aquarium.gr.jp/news/events/31639', lat:35.58912, lng:139.73811 },
      { status:'confirmed', title:'Red Brick Sunset 2026', date:'2026/8/1–8/30', time:'11:00–22:00', place:'橫濱紅磚倉庫', note:'聖塔莫尼卡主題免費夏日市集，飲食最後點餐 21:30。', url:'https://www.yokohama-akarenga.jp/event/redbrick-summer/index.html', lat:35.45232, lng:139.64306 },
      { status:'confirmed', title:'Disco Brick YOKOHAMA・8/20 DJ 場', date:'2026/8/20', time:'晚間・票務依官方', place:'橫濱紅磚倉庫', note:'當日陣容為 Grassroots 30th ANNIVERSARY DISCO PARTY；部分區域需票。', url:'https://www.yokohama-akarenga.jp/event/disco2026/', lat:35.45232, lng:139.64306 },
      { status:'confirmed', title:'ウルトラマルチバース AR 體驗', date:'2026/6/5–11/30', time:'依設施營業', place:'橫濱紅磚倉庫周邊', note:'都市周遊型 AR 任務，適合加入角色合照與水岸步行。', url:'https://www.yokohama-akarenga.jp/brickguide/ultra-multiverse/', lat:35.45275, lng:139.64290 }
    ],
    6: [
      { status:'confirmed', title:'三味線・箏體驗與演奏', date:'2026/8/21', time:'19:00–20:30（18:30 開場）', place:'淺草文化觀光中心 6F', note:'免費工作坊與演奏；若需搭機返程，僅在航班與行李時間允許時採用。', url:'https://t-navi.city.taito.lg.jp/notices/105', lat:35.71068, lng:139.79659 },
      { status:'ended', title:'上野夏祭 2026', date:'截至 2026/8/11', time:'已結束', place:'上野公園・不忍池', note:'官方活動早於 8/21 結束，不列入當日行程，避免誤跑。', url:'https://enjoy.ueno.or.jp/summer2026/', lat:35.71220, lng:139.77070 }
    ]
  };

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
  const addSources = (id, items) => {
    const spot = window.TRIP_SPOTS[id];
    if (!spot) return;
    spot.sources = [...spot.sources, ...items].filter((item, index, all) => all.findIndex((candidate) => candidate[1] === item[1]) === index);
  };
  const addSocial = (id, items) => {
    const spot = window.TRIP_SPOTS[id];
    if (!spot) return;
    spot.social = [...(spot.social || []), ...items].filter((item, index, all) => all.findIndex((candidate) => candidate[3] === item[3]) === index);
  };
  const addPhotos = (id, items) => {
    const spot = window.TRIP_SPOTS[id];
    if (!spot) return;
    spot.photos = [...spot.photos, ...items].filter((item, index, all) => all.findIndex((candidate) => candidate[0] === item[0]) === index);
  };
  const setPhotoMeta = (id, name, best, lat, lng) => {
    const photo = window.TRIP_SPOTS[id]?.photos.find((item) => item[0] === name);
    if (!photo) return;
    photo[2] = `${lat},${lng}`;
    photo[3] = best;
    photo[4] = lat;
    photo[5] = lng;
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

  enrich('gotokuji', 4, '豪德寺', [
    ['豪德寺官方網站','https://gotokuji.jp/','寺院官方'],
    ['豪德寺拜觀資訊','https://gotokuji.jp/en/','寺院官方'],
    ['世田谷觀光・豪德寺','https://www.kanko-setagaya.jp/?p=we-page-entry&spot=209755','地方官方'],
    ['世田谷線官方','https://www.tokyu.co.jp/railway/timetable/info/Pid=70.html','交通官方'],
    ['小田急豪德寺站','https://www.odakyu.jp/station/gotokuji/','交通官方'],
    ['GO TOKYO 豪德寺','https://www.gotokyo.org/en/spot/59/index.html','官方旅遊'],
    ['日本觀光局・招財貓寺','https://www.japan.travel/en/spot/1626/','官方旅遊'],
    ['世田谷區文化觀光','https://www.city.setagaya.lg.jp/mokuji/bunka/','地方官方'],
    ['東急世田谷線路線圖','https://www.tokyu.co.jp/railway/line/sg/','交通官方'],
    ['東京都寺院參觀禮儀','https://www.gotokyo.org/en/see-and-do/religious-sites/index.html','官方旅遊'],
    ['世田谷觀光模型路線','https://www.kanko-setagaya.jp/?p=we-page-model-course','地方官方']
  ]);
  window.TRIP_SPOTS.gotokuji.photos = [
    ...window.TRIP_SPOTS.gotokuji.photos,
    ['豪德寺佛殿','從庭院步道外拍古建築與松樹。','35.64855,139.64830','09:40–10:00',35.64855,139.64830],
    ['豪德寺鐘樓','用樹蔭框景，避免跨入圍設。','35.64871,139.64818','09:35–09:50',35.64871,139.64818],
    ['招福殿入口','以牌匾和白色招財貓作前後景。','35.64820,139.64808','09:50–10:10',35.64820,139.64808],
    ['豪德寺參道石燈籠','沿參道斜拍，不站在動線中央。','35.64889,139.64798','09:25–09:40',35.64889,139.64798]
  ];

  enrich('meiji-jingu', 4, '原宿・明治神宮', [
    ['明治神宮開閉門時間','https://www.meijijingu.or.jp/sanpai/jikan/','神社官方'],
    ['明治神宮境內地圖','https://www.meijijingu.or.jp/guide/','神社官方'],
    ['明治神宮御苑','https://www.meijijingu.or.jp/midokoro/gyoen/','神社官方'],
    ['明治神宮博物館','https://www.meijijingu.or.jp/museum/','神社官方'],
    ['明治神宮交通','https://www.meijijingu.or.jp/access/','神社官方'],
    ['JR 原宿站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=1256','交通官方'],
    ['東京 Metro 明治神宮前站','https://www.tokyometro.jp/station/meiji-jingumae/','交通官方'],
    ['GO TOKYO 明治神宮','https://www.gotokyo.org/en/spot/66/index.html','官方旅遊'],
    ['日本觀光局明治神宮','https://www.japan.travel/en/spot/1660/','官方旅遊'],
    ['澀谷區觀光・原宿','https://play-shibuya.com/area/harajuku/','地方官方'],
    ['明治神宮文化館','https://www.meijijingu.or.jp/english/','神社官方'],
    ['代代木公園官方','https://www.tokyo-park.or.jp/park/yoyogi/','地方官方']
  ]);
  window.TRIP_SPOTS['meiji-jingu'].photos = window.TRIP_DAY_POINTS[4].filter((p) => ['原宿・明治神宮','原宿・表參道'].includes(p.zone)).map((p) => [p.name,p.note,`${p.lat},${p.lng}`,p.best,p.lat,p.lng]);

  enrich('shibuya-sky', 4, '澀谷', [
    ['SHIBUYA SKY 星空活動','https://www.shibuya-scramble-square.com/sky/observation/event_20260818.html','活動官方'],
    ['SHIBUYA SKY 星空活動 PDF','https://www.shibuya-scramble-square.com/assets/pdf/about/20260203scsq.pdf','活動官方'],
    ['THE ROOF SHIBUYA SKY','https://www.shibuya-scramble-square.com/sky/the-roof/','活動官方'],
    ['SHIBUYA SKY 營業資訊','https://www.shibuya-scramble-square.com/sky/ticket/','景點官方'],
    ['Scramble Square 商店餐廳','https://www.shibuya-scramble-square.com/shops_restaurants/index.html','設施官方'],
    ['澀谷 PARCO','https://shibuya.parco.jp/','商場官方'],
    ['Nintendo TOKYO','https://www.nintendo.com/jp/officialstore/index.html','商店官方'],
    ['Pokémon Center SHIBUYA','https://www.pokemon.co.jp/shop/en/pokecen/shibuya/','商店官方'],
    ['SHIBUYA109','https://www.shibuya109.jp/','商場官方'],
    ['東急澀谷站資訊','https://www.tokyu.co.jp/railway/station/info/Pid=1.html','交通官方']
  ]);
  window.TRIP_SPOTS['shibuya-sky'].photos = [
    ...window.TRIP_SPOTS['shibuya-sky'].photos,
    ['Scramble Square 入口','從澀谷站 B6 出口依導引前往 14F。','35.65865,139.70216','18:45–19:00',35.65865,139.70216],
    ['SKY GATE 電扶梯','以向上延伸的燈光與線條構圖。','35.65845,139.70217','19:00–19:15',35.65845,139.70217],
    ['SKY GALLERY 城市窗景','鏡頭貼近玻璃並穿深色上衣減少反光。','35.65845,139.70217','19:15–19:35',35.65845,139.70217],
    ['Crossing View','由高處拍十字路口人流，使用中焦段。','35.65845,139.70217','19:30–20:00',35.65845,139.70217],
    ['屋頂草坪與 Sky Edge','依工作人員指示排隊，不攜帶禁止物品。','35.65845,139.70217','19:20–20:10',35.65845,139.70217]
  ];
  window.TRIP_SPOTS['shibuya-sky'].notice = '8/19 的「夏季星座觀賞」並非固定活動：只有 8/18 因天候無法舉行時才順延。請在 8/19 下午查看 SHIBUYA SKY 官方公告；一般入場仍須依預約票時間。';

  enrich('hebikubo', 5, '品川・蛇窪', [
    ['蛇窪神社授與品','https://hebikubo.jp/juyohin/','神社官方'],
    ['蛇窪神社參拜','https://hebikubo.jp/gosanpai/','神社官方'],
    ['蛇窪神社交通','https://hebikubo.jp/access/','神社官方'],
    ['品川觀光・蛇窪神社','https://shinagawa-kanko.or.jp/spot/hebikubo/','地方官方'],
    ['品川區二葉地區','https://www.city.shinagawa.tokyo.jp/','地方官方'],
    ['都營中延站','https://www.kotsu.metro.tokyo.jp/subway/stations/nakanobu.html','交通官方'],
    ['東急中延站','https://www.tokyu.co.jp/railway/station/info/Pid=55.html','交通官方'],
    ['JR 西大井站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=1147','交通官方'],
    ['戶越公園','https://shinagawa-kanko.or.jp/spot/togoshikoen/','地方官方'],
    ['品川觀光模型路線','https://shinagawa-kanko.or.jp/modelcourse/','地方官方'],
    ['蛇窪神社最新消息','https://hebikubo.jp/news/','神社官方'],
    ['蛇窪神社官方 X','https://x.com/hebikubojinja','神社官方社群']
  ]);
  window.TRIP_SPOTS.hebikubo.photos = [
    ...window.TRIP_SPOTS.hebikubo.photos,
    ['法密稻荷社','拍紅鳥居層次並保留參拜空間。','35.60499,139.71363','09:35–09:55',35.60499,139.71363],
    ['白蛇種錢處','以手部與錢幣作細節，不拍到他人正面。','35.60494,139.71367','09:45–10:05',35.60494,139.71367],
    ['撫白蛇','依現場順序短暫拍攝，不長時間佔位。','35.60491,139.71361','09:50–10:10',35.60491,139.71361],
    ['夢巳橋方向','由境外街角拍白蛇街區標示。','35.60544,139.71406','10:05–10:15',35.60544,139.71406],
    ['蛇窪龍神社','正面低角度拍社殿細節。','35.60502,139.71371','09:55–10:10',35.60502,139.71371],
    ['境內白蛇繪馬','近拍圖樣，避開個資與祈願文字。','35.60508,139.71359','09:50–10:05',35.60508,139.71359]
  ];

  enrich('shinagawa-aquarium', 5, '品川水族館', [
    ['Eric Carle 特展','https://www.aquarium.gr.jp/news/events/31639','活動官方'],
    ['品川水族館活動列表','https://www.aquarium.gr.jp/news/events','景點官方'],
    ['盂蘭盆活動時間表','https://www.aquarium.gr.jp/calendar-onseason','景點官方'],
    ['品川水族館票價','https://www.aquarium.gr.jp/guide/price','景點官方'],
    ['品川水族館交通','https://www.aquarium.gr.jp/access','交通官方'],
    ['品川水族館館內介紹','https://www.aquarium.gr.jp/facility','景點官方'],
    ['35 周年資訊','https://www.aquarium.gr.jp/news/events/29136','活動官方'],
    ['水族館 Dolphin Cafe','https://www.aquarium.gr.jp/restaurant','餐飲官方'],
    ['京急大森海岸站','https://www.keikyu.co.jp/ride/kakueki/KK07.html','交通官方'],
    ['品川區民公園','https://www.city.shinagawa.tokyo.jp/PC/kankyo/kankyo-koen/kankyo-koen-kouen/hpg000000365.html','地方官方'],
    ['品川水族館年度行事曆','https://www.aquarium.gr.jp/calendar','景點官方'],
    ['品川水族館體驗活動','https://www.aquarium.gr.jp/news/events/','景點官方']
  ]);
  window.TRIP_SPOTS['shinagawa-aquarium'].photos = [
    ...window.TRIP_SPOTS['shinagawa-aquarium'].photos,
    ['海豹館','從水下觀察窗拍游動瞬間，關閉閃光。','35.58910,139.73808','13:15–13:30',35.58910,139.73808],
    ['企鵝區','提高快門並避開玻璃反光。','35.58914,139.73818','13:30–13:45',35.58914,139.73818],
    ['水母展示','降低曝光保留燈光色彩。','35.58912,139.73804','13:40–13:55',35.58912,139.73804],
    ['鯊魚大水槽','廣角拍魚群與人物剪影。','35.58909,139.73806','12:50–13:10',35.58909,139.73806],
    ['品川區民公園水岸','離館後拍池面與綠地，盛夏以陰影處為主。','35.59014,139.73710','14:10–14:25',35.59014,139.73710]
  ];
  window.TRIP_SPOTS['shinagawa-aquarium'].notice = '8/20 可看 2026/7/25–12/25 的「Eric Carle 與生命之色」特展。一般營業 10:00–17:00、16:30 停止入館；海豚等表演場次依盂蘭盆／夏休官方時間表調整。';

  enrich('minatomirai', 5, '橫濱港未來', [
    ['紅磚倉庫活動總覽','https://www.yokohama-akarenga.jp/event/','設施官方'],
    ['Red Brick Sunset 2026','https://www.yokohama-akarenga.jp/event/redbrick-summer/index.html','活動官方'],
    ['Disco Brick YOKOHAMA','https://www.yokohama-akarenga.jp/event/redbrick-disco/','活動官方'],
    ['8/20 DJ 陣容','https://www.yokohama-akarenga.jp/event/disco2026/','活動官方'],
    ['Ultra Multiverse AR','https://www.yokohama-akarenga.jp/brickguide/ultra-multiverse/','活動官方'],
    ['紅磚倉庫營業資訊','https://www.yokohama-akarenga.jp/','設施官方'],
    ['橫濱港未來21','https://www.minatomirai21.com/','地方官方'],
    ['象之鼻公園','https://www.welcome.city.yokohama.jp/spot/details.php?bbid=190','地方官方'],
    ['MARINE & WALK YOKOHAMA','https://www.marineandwalk.jp/','商場官方'],
    ['櫻木町站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=740','交通官方'],
    ['YOKOHAMA AIR CABIN 8月營運日程','https://yokohama-air-cabin.jp/20260714413/','交通官方']
  ]);
  window.TRIP_SPOTS.minatomirai.notice = '8/20 紅磚倉庫同時有 Red Brick Sunset、Disco Brick、藝術星象館及 Ultra Multiverse AR。Red Brick Sunset 免費，Disco 部分區域需票；荒天可能休業，請當日查看官方活動頁。';

  enrich('sensoji', 6, '淺草', [
    ['8/21 三味線・箏體驗','https://t-navi.city.taito.lg.jp/notices/105','地方官方'],
    ['淺草文化觀光中心','https://www.city.taito.lg.jp/bunka_kanko/kankoinfo/info/oyakudachi/kankocenter/index.html','地方官方'],
    ['淺草寺境內圖','https://www.senso-ji.jp/guide/','寺院官方'],
    ['淺草寺年中行事','https://www.senso-ji.jp/annual_event/','寺院官方'],
    ['淺草神社','https://www.asakusajinja.jp/','神社官方'],
    ['西參道商店街','https://asakusa-nishisando.net/','商店街官方'],
    ['合羽橋道具街','https://www.kappabashi.or.jp/','商店街官方'],
    ['台東區官方觀光','https://t-navi.city.taito.lg.jp/','地方官方'],
    ['東武淺草站','https://www.tobu.co.jp/railway/guide/station/info/1201/','交通官方'],
    ['筑波快線淺草站','https://www.mir.co.jp/route_map/asakusa/','交通官方'],
    ['台東區觀光地圖','https://t-navi.city.taito.lg.jp/pamphlet','地方官方']
  ]);
  window.TRIP_SPOTS.sensoji.notice = '8/21 19:00–20:30，淺草文化觀光中心 6F 有免費三味線・箏體驗與演奏（18:30 開場）。若當天要搭機返程，必須先以航班報到時間為優先，不能為活動壓縮機場預留。';

  enrich('ameyoko', 6, '上野・阿美橫町', [
    ['阿美橫町店舖地圖','https://www.ameyoko.net/map/','商店街官方'],
    ['阿美橫町最新消息','https://www.ameyoko.net/news/','商店街官方'],
    ['上野觀光連盟','https://www.ueno.or.jp/','地方官方'],
    ['台東區上野觀光','https://t-navi.city.taito.lg.jp/area/ueno','地方官方'],
    ['二木之菓子','https://www.nikinokashi.co.jp/','商店官方'],
    ['Yodobashi 上野','https://www.yodobashi.com/ec/store/0007/','商店官方'],
    ['京成上野站','https://www.keisei.co.jp/keisei/tetudou/accessj/keisei-ueno.php','交通官方'],
    ['Skyliner 官方','https://www.keisei.co.jp/keisei/tetudou/skyliner/tc/','交通官方'],
    ['JR 御徒町站','https://www.jreast.co.jp/estation/station/info.aspx?StationCd=355','交通官方'],
    ['GO TOKYO 阿美橫町','https://www.gotokyo.org/en/spot/72/index.html','官方旅遊'],
    ['松坂屋上野店','https://www.matsuzakaya.co.jp/ueno/','商場官方']
  ]);
  window.TRIP_SPOTS.ameyoko.photos = [
    ...window.TRIP_SPOTS.ameyoko.photos,
    ['阿美橫町中央高架下','沿店側斜拍高架結構與招牌。','35.70838,139.77373','14:20–15:00',35.70838,139.77373],
    ['上中通入口','拍拱門與支線商店街，避免擋住路口。','35.70889,139.77331','14:10–14:30',35.70889,139.77331],
    ['摩利支天德大寺','從商店街側拍山門，保持參拜安靜。','35.70757,139.77420','14:40–15:00',35.70757,139.77420],
    ['高架食品攤位','先詢問店家是否可拍，不拍顧客正面。','35.70779,139.77381','14:30–15:10',35.70779,139.77381],
    ['御徒町站北口','以站名與商店街入口作行程收尾。','35.70718,139.77472','15:15–15:30',35.70718,139.77472]
  ];
  window.TRIP_SPOTS.ameyoko.notice = '上野夏祭 2026 已於 8/11 結束，8/21 不要誤排。最後採買請先設定預算與行李重量上限，並預留回飯店領行李、到京成上野與 Skyliner 指定席的時間。';

  addSources('ueno-toshogu', [
    ['上野東照宮交通與地圖','https://www.uenotoshogu.com/access/','神社官方'],
    ['上野東照宮拍攝與參拜 FAQ','https://www.uenotoshogu.com/contact/','神社官方'],
    ['上野東照宮牡丹苑','https://uenobotanen.com/','景點官方'],
    ['台東區上野觀光地圖 PDF','https://t-navi.city.taito.lg.jp/storage/pamphlet_pdf/20240430173115_Web%E4%B8%8A%E9%87%8E%E8%A6%B3%E5%85%89%E3%83%9E%E3%83%83%E3%83%97_%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%89%88.pdf','地方官方'],
    ['台東區綜合觀光指南 PDF','https://t-navi.city.taito.lg.jp/storage/pamphlet_pdf/20240606110019_%E5%8F%B0%E6%9D%B1%E5%8C%BA%E7%B7%8F%E5%90%88%E8%A6%B3%E5%85%89%E3%82%AC%E3%82%A4%E3%83%89%E3%83%96%E3%83%83%E3%82%AF.pdf','地方官方'],
    ['上野動物園','https://www.tokyo-zoo.net/zoo/ueno/','設施官方'],
    ['東京國立博物館','https://www.tnm.jp/','設施官方'],
    ['國立西洋美術館','https://www.nmwa.go.jp/','設施官方'],
    ['東京都美術館','https://www.tobikan.jp/','設施官方'],
    ['京成上野站','https://www.keisei.co.jp/keisei/tetudou/accessj/keisei-ueno.php','交通官方']
  ]);

  addSources('kochikame-statues', [
    ['こち亀記念館官方','https://kochikame-kinenkan-official.jp/','設施官方'],
    ['こち亀記念館利用案內','https://kochikame-kinenkan-official.jp/usage-guide','設施官方'],
    ['東京都觀光資訊站介紹','https://tokyotouristinfo.com/detail/M0613','地方官方'],
    ['亀有中央商店街','https://www.kameari-chuo.net/','商店街官方'],
    ['こち亀銅像集章路線','https://www.kameari-chuo.net/special/mk/km.html','商店街官方'],
    ['こち亀商品與美食','https://www2.city.katsushika.lg.jp/tourism/1000064/1030204/1037609.html','地方官方'],
    ['JR 亀有站構內與無障礙','https://www.jreast.co.jp/estation/stations/507.html','交通官方'],
    ['亀有香取神社交通','https://kameari-katori.or.jp/access/','神社官方'],
    ['こち亀遊戲館','https://kameari.ario.jp/shop/1300000041/','商場官方'],
    ['葛飾觀光協會亀有公園','https://katsushika-kanko.jp/kame-ao/004kamearikouen.html','地方官方']
  ]);

  addSources('odaiba', [
    ['海上公園官方台場海濱公園','https://www.tptc.co.jp/park/01_02','地方官方'],
    ['實物大獨角獸鋼彈','https://www.unicorn-gundam-statue.jp/','設施官方'],
    ['THE GUNDAM BASE TOKYO','https://www.gundam-base.net/','商店官方'],
    ['東京 JOYPOLIS','https://tokyo-joypolis.com/','設施官方'],
    ['日本科學未來館','https://www.miraikan.jst.go.jp/','設施官方'],
    ['SMALL WORLDS','https://smallworlds.jp/','設施官方'],
    ['東京御台場觀光指南','https://www.tokyo-odaiba.net/','地方官方'],
    ['御台場步行指南 PDF','https://www.tokyo-odaiba.net/wordpress/wp-content/themes/odaiba_2018/assets/images/arukikata/arukikata_2024.pdf','地方官方'],
    ['東京國際郵輪碼頭','https://www.tptc.co.jp/terminal/guide/cruise','交通官方'],
    ['水上巴士台場海濱公園','https://www.suijobus.co.jp/','交通官方']
  ]);

  addSources('tokyo-skytree', [
    ['晴空塔票價','https://www.tokyo-skytree.jp/ticket/','設施官方'],
    ['晴空塔交通','https://www.tokyo-skytree.jp/access/','交通官方'],
    ['晴空塔樓層指南','https://www.tokyo-skytree.jp/floor/','設施官方'],
    ['晴空塔活動','https://www.tokyo-skytree.jp/event/','設施官方'],
    ['晴空塔營業時間','https://www.tokyo-skytree.jp/open-hours/','設施官方'],
    ['墨田水族館','https://www.sumida-aquarium.com/','設施官方'],
    ['柯尼卡美能達星象館天空','https://planetarium.konicaminolta.jp/tenku/','設施官方'],
    ['郵政博物館','https://www.postalmuseum.jp/','設施官方'],
    ['東武東京晴空塔站','https://www.tobu.co.jp/railway/guide/station/info/1402/','交通官方'],
    ['押上站東京 Metro','https://www.tokyometro.jp/station/oshiage/','交通官方']
  ]);

  addPhotos('ueno-toshogu', [
    ['大石鳥居','從參道入口稍偏右拍鳥居與石燈籠深度。','35.71510,139.77161','10:00–10:10',35.71510,139.77161],
    ['銅燈籠列','以中焦段壓縮燈籠層次，不站在參拜主線中央。','35.71537,139.77179','10:05–10:15',35.71537,139.77179],
    ['神樂殿','從參道側拍屋頂曲線與前景燈籠。','35.71541,139.77190','10:10–10:20',35.71541,139.77190],
    ['透塀細部','近拍金箔、透雕與色彩，避免使用閃光。','35.71561,139.77183','10:15–10:25',35.71561,139.77183],
    ['御神木與靜心所','使用直幅保留樹冠與參拜者比例。','35.71569,139.77190','10:20–10:30',35.71569,139.77190],
    ['牡丹苑入口','八月非花季，以入口牌示與參道作紀錄即可。','35.71482,139.77170','10:25–10:30',35.71482,139.77170],
    ['參道回望','回程朝公園方向拍石燈籠形成的對稱線。','35.71519,139.77162','10:25–10:35',35.71519,139.77162]
  ]);
  addPhotos('kochikame-statues', [
    ['北口歡迎兩津像','由北口廣場側拍站名與銅像，保留行人動線。','35.76672,139.84762','12:00–12:10',35.76672,139.84762],
    ['南口歡迎兩津像','在南口圓環內側取景，避免靠近車道。','35.76519,139.84806','12:15–12:25',35.76519,139.84806],
    ['敬禮兩津像','用眼平視角拍角色動作與商店街背景。','35.76501,139.84865','12:20–12:30',35.76501,139.84865],
    ['麗子像','使用直幅並讓周邊店舖招牌成為街區線索。','35.76479,139.84908','12:25–12:35',35.76479,139.84908],
    ['中川像','稍微降低視角，避免人物與後方招牌重疊。','35.76455,139.84942','12:30–12:40',35.76455,139.84942],
    ['少年兩津像','適合人物蹲低與銅像同高合照。','35.76424,139.84977','12:35–12:45',35.76424,139.84977],
    ['香取神社狛龜','從鳥居內側拍狛龜與參道，先完成參拜。','35.76390,139.85059','13:40–13:55',35.76390,139.85059]
  ]);
  addPhotos('odaiba', [
    ['DiverCity Festival Plaza','從廣場外圈納入完整鋼彈與建築尺度。','35.62505,139.77528','16:35–16:50',35.62505,139.77528],
    ['AQUA CiTY 西側露台','面向彩虹大橋拍東京灣全景。','35.62782,139.77245','17:25–17:45',35.62782,139.77245],
    ['台場海濱公園沙灘','沿岸線斜拍沙灘、橋梁與城市天際線。','35.62955,139.77263','17:45–18:10',35.62955,139.77263],
    ['LOVE 台場裝置','站在裝置正面稍低角度拍字樣與天空。','35.62695,139.77305','17:15–17:30',35.62695,139.77305],
    ['富士電視台球體展望室外觀','由海側廣場仰拍球體與階梯。','35.62678,139.77412','17:05–17:20',35.62678,139.77412],
    ['Decks 海濱甲板西端','藍調時刻用欄杆引導線拍彩虹大橋。','35.62924,139.77442','18:15–18:35',35.62924,139.77442],
    ['女神像背面平台','從雕像後方把人物、雕像與橋面疊在同一軸線。','35.62773,139.77165','17:50–18:10',35.62773,139.77165]
  ]);
  addPhotos('tokyo-skytree', [
    ['十間橋中央','貼近人行側以河面倒影拍完整塔身。','35.70858,139.81509','16:30–17:00',35.70858,139.81509],
    ['西十間橋','用河道欄杆引導視線至塔身。','35.70901,139.81195','16:15–16:40',35.70901,139.81195],
    ['押上站 B3 出口','從街角仰拍塔身與站口資訊。','35.71010,139.81333','15:30–15:45',35.71010,139.81333],
    ['晴空塔城 4F Sky Arena','廣角仰拍塔基鋼構與人物比例。','35.71042,139.81081','15:45–16:05',35.71042,139.81081],
    ['天望甲板 Floor 350','貼近玻璃遮光，先找隅田川與淺草方向。','35.71006,139.81070','17:00–17:25',35.71006,139.81070],
    ['天望回廊 Floor 450','沿螺旋坡道拍高度變化，避免拍到他人正面。','35.71006,139.81070','17:25–17:45',35.71006,139.81070],
    ['玻璃地板','將鏡頭貼近地面向下拍，握緊手機。','35.71006,139.81070','17:45–17:55',35.71006,139.81070],
    ['枕橋','傍晚由淺草側拍東武列車、河道與塔身。','35.71155,139.80437','18:00–18:25',35.71155,139.80437],
    ['隅田公園櫻橋方向','以樹木作前景，藍調時刻拍亮燈塔身。','35.71424,139.80394','18:20–18:45',35.71424,139.80394]
  ]);
  [
    ['ueno-toshogu','石燈籠參道','10:05–10:15',35.71537,139.77179],
    ['ueno-toshogu','唐門正面','10:15–10:25',35.71557,139.77186],
    ['ueno-toshogu','五重塔方向','10:20–10:30',35.71569,139.77095],
    ['kochikame-statues','北口兩津像','12:00–12:10',35.76671,139.84763],
    ['kochikame-statues','南口祭典像','12:15–12:25',35.76517,139.84808],
    ['kochikame-statues','商店街角色群','12:25–12:40',35.76478,139.84916],
    ['odaiba','鋼彈廣場','16:40–17:10',35.62513,139.77537],
    ['odaiba','自由女神平台','17:45–18:15',35.62782,139.77148],
    ['odaiba','Decks 海側','18:20–18:45',35.62917,139.77518],
    ['tokyo-skytree','北十間川方向','16:30–17:00',35.70858,139.81509],
    ['tokyo-skytree','Solamachi 外圍廣場','15:45–16:05',35.71042,139.81081],
    ['tokyo-skytree','天望甲板','17:00–17:25',35.71006,139.81070],
    ['tokyo-skytree','隅田公園','18:20–18:45',35.71424,139.80394]
  ].forEach((item) => setPhotoMeta(...item));

  addSocial('ueno-toshogu', [
    ['YouTube 實訪','上野公園散步順訪東照宮','公開散步影片由韻松亭一路走到上野東照宮，可觀察參道距離與現場步行節奏。','https://www.youtube.com/watch?v=HnnOxslbV18','上野東照宮へ参拝してきました'],
    ['YouTube 紀錄','正式參拜與境內樣貌','德川紀念財團的公開紀錄可核對金色殿、境內空間與參拜氣氛。','https://www.youtube.com/watch?v=O8hCfuGmoD0','変わらない姿を拝むことができます']
  ]);
  addSocial('kochikame-statues', [
    ['YouTube Vlog','こち亀記念館與銅像集章','公開街走影片完成記念館與集章路線，適合預估館外銅像巡禮所需時間。','https://www.youtube.com/watch?v=akDFbnxYme0','街全体が作品とともに歩んできた'],
    ['YouTube 實訪','記念館與香取神社無障礙視角','公開實訪同時走訪記念館與香取神社，並補充輪椅動線觀察。','https://www.youtube.com/watch?v=wMisRWz_awg','バリアフリー情報も満載']
  ]);
  addSocial('odaiba', [
    ['Lemon8 實訪','夜間獨角獸鋼彈拍攝','實訪建議抵達後先確認變身演出告示，夜間可把鋼彈與台場燈光安排在同一路線。','https://www.lemon8-app.com/%40user5316115471502/7554231461998592523?region=jp','到着したらまず案内板をチェック'],
    ['Reddit 實訪','台場夕陽後的彩虹大橋','公開旅客貼文提到日落後能看見彩虹大橋與東京鐵塔亮燈，支持把海濱安排在黃昏。','https://www.reddit.com/r/lowlevelaware/comments/1fpscse','夕阳之后能看到彩虹桥']
  ]);
  addSocial('tokyo-skytree', [
    ['note 實訪','展望台方向辨識與鐵道路線','2025 個人旅行照片紀錄指出從高處辨識放射狀鐵道很有趣，可作為展望台找景物的提示。','https://note.com/gentle_tern358/n/nd913dd322a53','線路が分かれている所を見る'],
    ['note 實訪','展望台與回廊照片紀錄','公開照片實訪整理從塔下、電梯到 350m 與 450m 的視角，可先理解兩層展望差異。','https://note.com/akmima7/n/nb1d7a721c0c4','天空のパノラマ']
  ]);
  addSocial('ameyoko', [
    ['Reddit 實訪','阿美橫町像主題樂園般熱鬧','公開旅客貼文記錄逛中田商店與購買紀念服飾的互動，顯示商店街適合邊走邊比較。','https://www.reddit.com/r/lowlevelaware/comments/1pxlcej/','テーマパークに来たみたい'],
    ['Ameblo 實訪','阿美橫町地下街文化混合','公開實訪提到地下街語言與商品文化多元；若進地下層應留意環境與個人財物。','https://ameblo.jp/sekaino-world-0714/entry-12952581608.html','外国語が飛び交い']
  ]);
  addSocial('gotokuji', [
    ['note 實訪','招福貓右手與無小判特色','近期個人實訪整理招福貓造型差異，適合作為奉納所近拍時的觀察重點。','https://note.com/kt_west/n/n2c1743df12d1','小判を持ってない'],
    ['ことりっぷ投稿','使用者的豪德寺貓散步','公開使用者投稿以貓主題街區與招福貓作記錄，適合搭配商店街順走。','https://co-trip.jp/post/662302','お金を持たず右手を上げて縁を招く']
  ]);
  addSocial('meiji-jingu', [
    ['ホトカミ投稿','慢走參拜比只在初詣到訪舒適','個人參拜投稿提到避開初詣人潮後慢慢走更能感受森林與參道。','https://hotokami.jp/area/tokyo/Hkrtp/Hkrtptk/Dztam/143882/23075/','ゆっくり参拝するととても気持ちよかった'],
    ['note 實訪','親子由原宿進入明治神宮','公開個人投稿記錄週日親子參拜，可作為一般假日人流情境參考。','https://note.com/yuki_no_ko/n/n65ee3454f2bb','息子と共に参拝']
  ]);
  addSocial('shinagawa-aquarium', [
    ['攝影實訪','暗水槽適合高感光拍攝','個人攝影實訪指出水族館光線偏暗，拍攝前宜關閉閃光並調高感光度。','https://www.yozoutsutsu.com/%CE%B17siii-shinasui','暗い水槽でもかなり綺麗に撮れる'],
    ['個人遊記','2026 品川水族館展示觀察','近期個人遊記特別留意人工物結合生物展示與海龜細節，可作為慢看重點。','https://seasawher.hatenadiary.jp/entry/2026/03/02/002338','人工物と一緒に見せる展示']
  ]);

  // 2026-08-10：以日文關鍵字核對的近期公開實訪。保留摘要與原文連結，
  // 讓人流、拍攝與停留時間建議能回饋到實際行程，不複製貼文全文。
  addSocial('ueno-toshogu', [
    ['note 近期實訪','上午九點人流較少','2026 年初的週六實訪在 09:00 後抵達時仍相對清靜，支持把唐門與石燈籠拍攝排在上午。','https://note.com/hanamuguri0611/n/n45e8da91ac8a','AM９時過ぎ・人はまばら']
  ]);
  addSocial('kochikame-statues', [
    ['note 聖地巡禮','南口銅像起步最直覺','實訪由南口三人像開始，再前往伊勢屋與街區景點；適合依車站南北出口拆成兩段。','https://note.com/lush_zephyr406/n/nd0c29f726f10','聖地巡礼 vol.1 こち亀の街']
  ]);
  addSocial('sunshine-city', [
    ['note 2026 實訪','NAMJATOWN 票種與體感','近期實訪認為入園票加單項付費適合只想逛場景者，想玩多項設施再比較一日券。','https://note.com/undergarden/n/n2851309a5032','半額の日に見てきた']
  ]);
  addSocial('akihabara', [
    ['note 夏季實訪','熱門遊戲機台可能排隊','8 月實訪顯示遊戲中心與 Yodobashi 玩具樓層人流明顯，推し店應先排、逛街清單不要塞滿。','https://note.com/myogayt/n/ndfa199bdf33f','秋葉原に行ってきた']
  ]);
  addSocial('tokyo-tower', [
    ['note 拍攝實訪','芝公園四號地是完整塔身視角','在地拍攝紀錄以芝公園四號地尋找正面塔景，夕暮至亮燈時段最適合安排新舊建築同框。','https://note.com/hachimitsu_tany/n/ne0fef598de77','東京タワーを観るスポットを探して']
  ]);
  addSocial('shichirigahama', [
    ['note 2026 實訪','先海灘再吃 bills 早午餐','近期衝浪實訪在早晨海況活動後進 bills，窗邊能看海；熱門日仍建議先預約或提早候位。','https://note.com/whiterocky/n/n33d603cf1ab4','七里ヶ浜・billsから見た海']
  ]);
  addSocial('enoshima', [
    ['note 2026 實訪','Sea Candle 後續走岩屋可行','實訪 15:00 離開 Sea Candle 後續走山二つ、見晴亭與岩屋，證明單向深走可行但需預留回程。','https://note.com/y3k_27/n/n2bfcefc2112a','江の島日帰り絶景旅']
  ]);
  addSocial('atami-fireworks', [
    ['note 觀賞整理','親水公園端點可避開核心人流','公開經驗整理把親水公園海釣設施側列為較舒緩區域；仍應以 2026 官方分區與管制為準。','https://note.com/hanabisokuho04/n/n9a76f7c51815','親水公園の海釣り施設エリア']
  ]);
  addSocial('gotokuji', [
    ['note 近期散策','小尺寸招福貓可能售罄','平日實訪仍遇到部分小尺寸招福貓缺貨，伴手禮不應列為一定買得到，參拜與拍照才是主行程。','https://note.com/namae_myoji/n/ned8adc3eda39','小さいサイズは売り切れ']
  ]);
  addSocial('meiji-jingu', [
    ['note 夫妻實訪','南參道進入後體感明顯降溫','夏季實訪描述進入森林後較涼且安靜；可把御苑設為有餘裕才加入的支線。','https://note.com/pd_bloger/n/n3d82402bec7b','原宿の癒し穴場スポット']
  ]);
  addSocial('shibuya-sky', [
    ['note 2026 實訪','臨時想去不一定訂得到','近期實訪需先協調時段才能訂票，支持把 SHIBUYA SKY 視為固定預約錨點，其餘澀谷景點前後調整。','https://note.com/violet_003173/n/n773e88cf95e4','意外と予約が取れない']
  ]);
  addSocial('hebikubo', [
    ['note 平日實訪','朝一明顯比巳日舒適','2025 實訪於平日 08:50 抵達時人少；遇巳日或祭典則應另抓排隊緩衝。','https://note.com/canna_chun/n/nf6e2f6047dea','平日朝一番']
  ]);
  addSocial('shinagawa-aquarium', [
    ['note 夏季實訪','真珠取出體驗宜上午先登記','夏休實訪建議上午先報名體驗，再以海豚秀與館內展示填補等待時間。','https://note.com/fine_hyssop7317/n/n748d1156808d','午前中に受付するのがおすすめ']
  ]);
  addSocial('minatomirai', [
    ['note 2026 實訪','赤磚倉庫館內比外觀看起來更大','近期實訪由日本大通站步行，指出館內三層適合保留購物時間，並能順帶完成柯南場景打卡。','https://note.com/clear_lion4645/n/n84d213b66a8c','赤レンガ倉庫に行ってきた']
  ]);
  addSocial('sensoji', [
    ['note 參拜實訪','先御朱印再本堂可避開一波隊伍','一月實訪先辦御朱印、待本堂稍空再參拜；旺季可依現場隊伍彈性調換支線順序。','https://note.com/otoha0522/n/n9f26b9d01b90','御本堂がちょっと空いてきた']
  ]);
  addSocial('tokyo-skytree', [
    ['note 2026 實訪','展望台慢走約一小時可完成','親子實訪以約一小時完成展望台主要視角；若加入 450m 回廊與 Solamachi 購物需另加時間。','https://note.com/sano_mama2525/n/n339e4c67dae6','ゆっくり回っても1時間くらい']
  ]);

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
