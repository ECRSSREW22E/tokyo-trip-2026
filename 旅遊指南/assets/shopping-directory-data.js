(() => {
  'use strict';

  const verifiedAt = '2026-08-11';
  const enumSet = values => Object.freeze([...values]);
  const shoppingTaxonomy = Object.freeze({
    venueTypes: enumSet(['department-store','urban-mall','station-mall','shopping-center','shopping-street','market-street','flagship-district','electronics-complex','specialty-complex','outlet','local-shopping']),
    brandCategories: enumSet(['FASHION','SELECT_SHOP','DESIGNER','STREETWEAR','SNEAKERS','SPORTS','BEAUTY','DRUGSTORE','LIFESTYLE','HOME','TRAVEL','STATIONERY','ANIME','CHARACTER','GAME','HOBBY','ELECTRONICS','CAMERA','FOOD','SOUVENIR','LUXURY','VINTAGE']),
    styles: enumSet(['BASIC','MINIMAL','CLEAN','CONTEMPORARY','JAPANESE_DESIGNER','STREETWEAR','HARAJUKU','KAWAII','LUXURY','VINTAGE','OUTDOOR','SNEAKER','TECHWEAR','AVANT_GARDE','SMART_CASUAL','AMERICAN_CASUAL']),
    targets: enumSet(['MEN','WOMEN','UNISEX','TEEN','YOUNG_ADULT','ADULT','FAMILY','COLLECTOR','TOURIST']),
    priceLevels: enumSet([1,2,3,4]),
    japanValues: enumSet(['NONE','LOW','MEDIUM','HIGH','VERY_HIGH']),
    trends: enumSet(['TRENDING_2026','TRENDING','EVERGREEN','NICHE','HYPE','DECLINING','UNKNOWN']),
    branchStatuses: enumSet(['OPEN','TEMPORARILY_CLOSED','RENOVATING','RELOCATING','OPENING_SOON','CHECK_BEFORE_VISIT','CLOSED'])
  });

  const directorySources = [
    ['dir-src-lumine-shinjuku','LUMINE Shinjuku official floor guide','OFFICIAL','https://www.lumine.ne.jp/shinjuku/floorguide/','LUMINE 1 / 2 current tenant and floor lookup.'],
    ['dir-src-lumine-est','LUMINE EST official floor guide','OFFICIAL','https://www.lumine.ne.jp/est/floorguide/','Current tenant guide and opening / closing notices.'],
    ['dir-src-newoman','NEWoMan Shinjuku official shop list','OFFICIAL','https://www.newoman.jp/shinjuku/floorguide/','Official Shinjuku tenant guide.'],
    ['dir-src-isetan','Isetan Shinjuku official floor guide','OFFICIAL','https://www.mistore.jp/store/shinjuku/shops.html','Official department store floor and brand guide.'],
    ['dir-src-takashimaya','Shinjuku Takashimaya official floor guide','OFFICIAL','https://www.takashimaya.co.jp/shinjuku/floor/','Official floor guide.'],
    ['dir-src-flags','Shinjuku Flags official shop guide','OFFICIAL','https://www.flagsweb.jp/shop/','Official tenant guide.'],
    ['dir-src-beams-japan','BEAMS JAPAN official store page','OFFICIAL','https://www.beams.co.jp/beams_japan/','Shinjuku store address and floors.'],
    ['dir-src-baycrews','BAYCREW’S official Kanto store list','OFFICIAL','https://baycrews.jp/store/list?area=kanto','Official branch locator for group brands.'],
    ['dir-src-sunshine','Sunshine City official shop directory','OFFICIAL','https://sunshinecity.jp/en/shop/','Official tenant, floor, hours and tax-free details.'],
    ['dir-src-parco-ikebukuro','Ikebukuro PARCO official floor guide','OFFICIAL','https://ikebukuro.parco.jp/floor/','Official tenant guide.'],
    ['dir-src-animate','Animate Ikebukuro official store page','OFFICIAL','https://www.animate.co.jp/shop/ikebukuro/','Official flagship store information.'],
    ['dir-src-seibu-ikebukuro','Seibu Ikebukuro official site','OFFICIAL','https://www.sogo-seibu.jp/ikebukuro/','Official notices and floor information; renovation may affect access.'],
    ['dir-src-akiba-radio','Akihabara Radio Kaikan official shop list','OFFICIAL','https://www.akihabara-radiokaikan.co.jp/shop/','Official tenant list.'],
    ['dir-src-yodobashi-akiba','Yodobashi Akiba official floor guide','OFFICIAL','https://www.yodobashi-akiba.com/floor/','Official floor guide.'],
    ['dir-src-atre-akiba','atre Akihabara official shop list','OFFICIAL','https://www.atre.co.jp/akihabara/shop/','Official tenant guide.'],
    ['dir-src-divercity','DiverCity Tokyo Plaza official shop guide','OFFICIAL','https://mitsui-shopping-park.com/divercity-tokyo/shopguide/','Official tenant guide.'],
    ['dir-src-aquacity','AQUA CiTY Odaiba official shop guide','OFFICIAL','https://www.aquacity.jp/shop/','Official tenant guide.'],
    ['dir-src-decks','DECKS Tokyo Beach official shop guide','OFFICIAL','https://www.odaiba-decks.com/shop/','Official tenant guide.'],
    ['dir-src-laforet','Laforet Harajuku official floor guide','OFFICIAL','https://www.laforet.ne.jp/shop_search/','Official tenant guide.'],
    ['dir-src-tokyu-plaza','Tokyu Plaza Harajuku Harakado official shop list','OFFICIAL','https://harakado.tokyu-plaza.com/shop/','Official tenant guide.'],
    ['dir-src-omohara','Tokyu Plaza Omotesando Omokado official shop list','OFFICIAL','https://omohara.tokyu-plaza.com/shop/','Official tenant guide.'],
    ['dir-src-omotesando-hills','Omotesando Hills official shop list','OFFICIAL','https://www.omotesandohills.com/shops/','Official tenant guide.'],
    ['dir-src-atcosme','@cosme TOKYO official store page','OFFICIAL','https://www.cosme.net/flagship/','Official flagship information.'],
    ['dir-src-shibuya-parco','Shibuya PARCO official floor guide','OFFICIAL','https://shibuya.parco.jp/floor/','Official tenant guide.'],
    ['dir-src-scramble','Shibuya Scramble Square official shop list','OFFICIAL','https://www.shibuya-scramble-square.com/shops_restaurants/','Official tenant guide.'],
    ['dir-src-hikarie','Shibuya Hikarie ShinQs official floor guide','OFFICIAL','https://www.tokyu-dept.co.jp/shinqs/floor/','Official tenant guide.'],
    ['dir-src-miyashita','RAYARD MIYASHITA PARK official shop guide','OFFICIAL','https://mitsui-shopping-park.com/urban/miyashita/shopguide/','Official tenant guide.'],
    ['dir-src-109','SHIBUYA109 official shop list','OFFICIAL','https://www.shibuya109.jp/shops/','Official tenant guide.'],
    ['dir-src-midtown','Tokyo Midtown official shop list','OFFICIAL','https://www.tokyo-midtown.com/jp/shop/','Official tenant guide.'],
    ['dir-src-roppongi-hills','Roppongi Hills official shop list','OFFICIAL','https://www.roppongihills.com/shops_restaurants/','Official tenant guide.'],
    ['dir-src-matsuya-ueno','Matsuzakaya Ueno official floor guide','OFFICIAL','https://www.matsuzakaya.co.jp/ueno/floor/','Official floor guide.'],
    ['dir-src-parcoya','PARCO_ya Ueno official floor guide','OFFICIAL','https://parcoya-ueno.parco.jp/floor/','Official tenant guide.'],
    ['dir-src-asakusa-rox','Asakusa ROX official shop guide','OFFICIAL','https://www.rox.co.jp/shop/','Official tenant guide.'],
    ['dir-src-ekimise','Asakusa EKIMISE official shop guide','OFFICIAL','https://www.ekimise.jp/shop/','Official tenant guide.'],
    ['dir-src-yokohama-sogo','Sogo Yokohama official floor guide','OFFICIAL','https://www.sogo-seibu.jp/yokohama/floor_guide/','Official floor guide.'],
    ['dir-src-yokohama-takashimaya','Yokohama Takashimaya official floor guide','OFFICIAL','https://www.takashimaya.co.jp/yokohama/floor/','Official floor guide.'],
    ['dir-src-yokohama-joinus','JOINUS official shop guide','OFFICIAL','https://www.sotetsu-joinus.com/shop','Official tenant guide.'],
    ['dir-src-yokohama-mores','Yokohama MORE’S official shop guide','OFFICIAL','https://yokohama-mores.jp/shop/','Official tenant guide.'],
    ['dir-src-landmark','Landmark Plaza official shop guide','OFFICIAL','https://www.yokohama-landmark.jp/shop/','Official tenant guide.'],
    ['dir-src-markis-mm','MARK IS Minatomirai official shop guide','OFFICIAL','https://www.mec-markis.jp/mm/shop/','Official tenant guide.'],
    ['dir-src-world-porters','Yokohama World Porters official shop guide','OFFICIAL','https://www.yim.co.jp/shops','Official tenant guide.'],
    ['dir-src-redbrick','Yokohama Red Brick Warehouse official shop list','OFFICIAL','https://www.yokohama-akarenga.jp/shops/','Official tenant guide.'],
    ['dir-src-ua','UNITED ARROWS official store locator','OFFICIAL','https://store.united-arrows.co.jp/storelocator/','Official group branch locator.'],
    ['dir-src-adam','JUN official shop locator','OFFICIAL','https://www.junonline.jp/shop/','Official ADAM ET ROPÉ and group locator.'],
    ['dir-src-uniqlo','UNIQLO official store locator','OFFICIAL','https://map.uniqlo.com/jp/ja/','Official branch locator.'],
    ['dir-src-muji','MUJI official store locator','OFFICIAL','https://www.muji.com/jp/shop/','Official branch locator.'],
    ['dir-src-nintendo','Nintendo TOKYO official page','OFFICIAL','https://www.nintendo.com/jp/officialstore/index.html','Official store and admission notices.'],
    ['dir-src-pokemon','Pokémon Center official shop list','OFFICIAL','https://www.pokemon.co.jp/shop/en/','Official shop locator.'],
    ['dir-src-social-haul-2025','2025 Tokyo shopping haul and product feedback','SOCIAL','https://www.dcard.tw/f/japan_travel/p/259158508','Traveller field report covering drugstore, beauty, stationery and department-store food; subjective experience only.'],
    ['dir-src-social-shinjuku-2025','2025 Shinjuku / Harajuku / Roppongi trip report','SOCIAL','https://www.dcard.tw/f/japan_travel/p/258963711','Field report notes crowd pressure at @cosme TOKYO and calmer alternatives; used for visit strategy, not opening facts.'],
    ['dir-src-social-shopping-review','Tokyo drugstore and souvenir shopping review','SOCIAL','https://www.dcard.tw/f/japan_travel/p/256006872','Traveller price and availability observations; prices are not treated as current facts.'],
    ['dir-src-social-route-report','Tokyo route and shopping field report','SOCIAL','https://www.dcard.tw/f/japan_travel/p/254553652','Field report references LUMINE EST, BEAMS JAPAN and department-store food; used as a route-fit signal.'],
    ['dir-src-social-shinjuku-video','2025 Shinjuku shopping field video','SOCIAL','https://www.youtube.com/watch?v=uVhymusmvH0','Creator field report used only as a discovery and crowd / district orientation signal.'],
    ['dir-src-social-dcard','Dcard Japan travel shopping discussions','SOCIAL','https://www.dcard.tw/topics/%E6%97%A5%E6%9C%AC%E6%97%85%E9%81%8A','Used only for recurring shopping questions and traveller sentiment; never branch status.'],
    ['dir-src-social-youtube','YouTube Japan shopping field reports','SOCIAL','https://www.youtube.com/results?search_query=2026+%E6%9D%B1%E4%BA%AC+%E8%B3%BC%E7%89%A9','Used only as a discovery and trend signal.']
  ].map(([id,title,kind,url,note]) => ({
    id,title,kind,url,note,checkedAt:verifiedAt,
    platform:kind === 'SOCIAL' ? (url.includes('youtube.com')?'youtube':'dcard') : 'official',
    evidence:kind === 'SOCIAL' ? 'PUBLIC FIELD REPORT · SUBJECTIVE SIGNAL ONLY' : 'OFFICIAL PAGE · FACT CHECK',
    sourceAccessible:true,freshness:kind === 'SOCIAL'?'2025–2026 PRIORITY':'CHECKED 2026-08-11',
    confidence:kind === 'SOCIAL'?'MEDIUM':'HIGH'
  }));

  const sourceUrl = id => directorySources.find(item => item.id === id)?.url || '';
  const venue = (id, name, area, day, type, sourceIds, extras={}) => ({
    id,name,nameZh:extras.nameZh || name,nameJa:extras.nameJa || name,nameEn:extras.nameEn || name,
    area,areaId:extras.areaId || area,city:extras.city || (area.includes('橫濱')?'Yokohama':'Tokyo'),
    days:Array.isArray(day)?day:[day],tripDays:Array.isArray(day)?day:[day],type,venueType:type,
    routeFit:extras.routeFit ?? true,onRouteLevel:extras.onRouteLevel || 'PRIMARY',rainyDay:extras.rainyDay ?? true,
    indoor:extras.indoor ?? !['shopping-street','market-street','flagship-district'].includes(type),
    rainyDayFriendly:extras.rainyDay ?? true,taxFree:extras.taxFree ?? 'CHECK_TENANT',
    nearestStation:extras.nearestStation || area,address:extras.address || 'CHECK OFFICIAL ACCESS PAGE',coordinates:extras.coordinates || null,
    positioning:extras.positioning || type.replaceAll('-',' '),priceRange:extras.priceRange || '¥–¥¥¥¥',
    strengths:extras.strengths || [],bestFor:extras.bestFor || [],notIdealFor:extras.notIdealFor || [],
    detourLevel:extras.detourLevel || 'ON_ROUTE',timeNeeded:extras.timeNeeded || '30–90 min',summary:extras.summary || '',
    officialUrl:extras.officialUrl || sourceUrl(sourceIds[0]),
    mapUrl:extras.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+' '+area)}`,
    sourceIds,status:extras.status || 'OPEN',lastVerified:verifiedAt,needsVerification:extras.needsVerification ?? false
  });

  const shoppingVenues = [
    venue('v-isetan-shinjuku','Isetan Shinjuku','新宿',1,'department-store',['dir-src-isetan'],{nearestStation:'新宿三丁目',taxFree:'AVAILABLE'}),
    venue('v-lumine1','LUMINE 1 Shinjuku','新宿',1,'station-mall',['dir-src-lumine-shinjuku'],{nearestStation:'新宿站南口'}),
    venue('v-lumine2','LUMINE 2 Shinjuku','新宿',1,'station-mall',['dir-src-lumine-shinjuku'],{nearestStation:'新宿站南口'}),
    venue('v-lumine-est','LUMINE EST Shinjuku','新宿',1,'station-mall',['dir-src-lumine-est'],{nearestStation:'新宿站東口'}),
    venue('v-newoman','NEWoMan Shinjuku','新宿',1,'station-mall',['dir-src-newoman'],{nearestStation:'新宿站新南口'}),
    venue('v-takashimaya-shinjuku','Takashimaya Times Square','新宿',1,'department-store',['dir-src-takashimaya'],{nearestStation:'新宿站新南口',taxFree:'AVAILABLE'}),
    venue('v-flags','Shinjuku Flags','新宿',1,'urban-mall',['dir-src-flags'],{nearestStation:'新宿站東南口'}),
    venue('v-beams-japan','BEAMS JAPAN Shinjuku','新宿',1,'specialty-complex',['dir-src-beams-japan'],{nearestStation:'新宿三丁目',taxFree:'CHECK_STORE'}),
    venue('v-sunshine','Sunshine City alpa','池袋',2,'shopping-center',['dir-src-sunshine'],{nearestStation:'東池袋／池袋東口',taxFree:'TENANT_DEPENDENT'}),
    venue('v-ikebukuro-parco','Ikebukuro PARCO','池袋',2,'station-mall',['dir-src-parco-ikebukuro'],{nearestStation:'池袋站東口'}),
    venue('v-animate-ikebukuro','Animate Ikebukuro Main Store','池袋',2,'specialty-complex',['dir-src-animate'],{nearestStation:'池袋站東口'}),
    venue('v-seibu-ikebukuro','Seibu Ikebukuro','池袋',2,'department-store',['dir-src-seibu-ikebukuro'],{nearestStation:'池袋站東口',status:'RENOVATING'}),
    venue('v-radio-kaikan','Akihabara Radio Kaikan','秋葉原',2,'specialty-complex',['dir-src-akiba-radio'],{nearestStation:'秋葉原站電氣街口'}),
    venue('v-yodobashi-akiba','Yodobashi Akiba','秋葉原',2,'electronics-complex',['dir-src-yodobashi-akiba'],{nearestStation:'秋葉原站昭和通口',taxFree:'AVAILABLE'}),
    venue('v-atre-akiba','atre Akihabara','秋葉原',2,'station-mall',['dir-src-atre-akiba'],{nearestStation:'秋葉原站'}),
    venue('v-divercity','DiverCity Tokyo Plaza','台場',1,'shopping-center',['dir-src-divercity'],{nearestStation:'台場站／東京電訊站'}),
    venue('v-aquacity','AQUA CiTY Odaiba','台場',1,'shopping-center',['dir-src-aquacity'],{nearestStation:'台場站'}),
    venue('v-decks','DECKS Tokyo Beach','台場',1,'shopping-center',['dir-src-decks'],{nearestStation:'御台場海濱公園站'}),
    venue('v-laforet','Laforet Harajuku','原宿',4,'urban-mall',['dir-src-laforet'],{nearestStation:'明治神宮前'}),
    venue('v-harakado','Tokyu Plaza Harajuku HARAKADO','原宿',4,'urban-mall',['dir-src-tokyu-plaza'],{nearestStation:'明治神宮前'}),
    venue('v-omokado','Tokyu Plaza Omotesando OMOKADO','原宿',4,'urban-mall',['dir-src-omohara'],{nearestStation:'明治神宮前'}),
    venue('v-omotesando-hills','Omotesando Hills','表參道',4,'urban-mall',['dir-src-omotesando-hills'],{nearestStation:'表參道／明治神宮前',taxFree:'TENANT_DEPENDENT'}),
    venue('v-atcosme','@cosme TOKYO','原宿',4,'specialty-complex',['dir-src-atcosme'],{nearestStation:'原宿站',taxFree:'AVAILABLE'}),
    venue('v-cat-street','Cat Street','原宿／澀谷',4,'flagship-district',['dir-src-ua','dir-src-baycrews'],{nearestStation:'明治神宮前／澀谷',rainyDay:false,taxFree:'STORE_DEPENDENT'}),
    venue('v-shibuya-parco','Shibuya PARCO','澀谷',4,'urban-mall',['dir-src-shibuya-parco'],{nearestStation:'澀谷站'}),
    venue('v-scramble','Shibuya Scramble Square','澀谷',4,'station-mall',['dir-src-scramble'],{nearestStation:'澀谷站'}),
    venue('v-hikarie','Shibuya Hikarie ShinQs','澀谷',4,'station-mall',['dir-src-hikarie'],{nearestStation:'澀谷站'}),
    venue('v-miyashita','RAYARD MIYASHITA PARK','澀谷',4,'urban-mall',['dir-src-miyashita'],{nearestStation:'澀谷站'}),
    venue('v-shibuya109','SHIBUYA109','澀谷',4,'urban-mall',['dir-src-109'],{nearestStation:'澀谷站'}),
    venue('v-midtown','Tokyo Midtown','六本木',2,'urban-mall',['dir-src-midtown'],{nearestStation:'六本木站'}),
    venue('v-roppongi-hills','Roppongi Hills','六本木',2,'urban-mall',['dir-src-roppongi-hills'],{nearestStation:'六本木站'}),
    venue('v-matsuzakaya-ueno','Matsuzakaya Ueno','上野／御徒町',6,'department-store',['dir-src-matsuya-ueno'],{nearestStation:'上野廣小路／御徒町',taxFree:'AVAILABLE'}),
    venue('v-parcoya','PARCO_ya Ueno','上野／御徒町',6,'urban-mall',['dir-src-parcoya'],{nearestStation:'上野廣小路／御徒町'}),
    venue('v-ameyoko','Ameyoko Shopping Street','上野／御徒町',6,'market-street',['dir-src-matsuya-ueno'],{nearestStation:'上野／御徒町',rainyDay:false,taxFree:'STORE_DEPENDENT'}),
    venue('v-asakusa-rox','Asakusa ROX','淺草',6,'shopping-center',['dir-src-asakusa-rox'],{nearestStation:'TX 淺草站'}),
    venue('v-ekimise','EKIMISE Asakusa','淺草',6,'station-mall',['dir-src-ekimise'],{nearestStation:'東武淺草站'}),
    venue('v-sogo-yokohama','Sogo Yokohama','橫濱',5,'department-store',['dir-src-yokohama-sogo'],{nearestStation:'橫濱站東口',taxFree:'AVAILABLE'}),
    venue('v-takashimaya-yokohama','Yokohama Takashimaya','橫濱',5,'department-store',['dir-src-yokohama-takashimaya'],{nearestStation:'橫濱站西口',taxFree:'AVAILABLE'}),
    venue('v-joinus','JOINUS','橫濱',5,'station-mall',['dir-src-yokohama-joinus'],{nearestStation:'橫濱站西口'}),
    venue('v-yokohama-mores','Yokohama MORE’S','橫濱',5,'station-mall',['dir-src-yokohama-mores'],{nearestStation:'橫濱站西口'}),
    venue('v-landmark','Landmark Plaza','橫濱港未來',5,'shopping-center',['dir-src-landmark'],{nearestStation:'櫻木町／港未來'}),
    venue('v-markis-mm','MARK IS Minatomirai','橫濱港未來',5,'shopping-center',['dir-src-markis-mm'],{nearestStation:'港未來站'}),
    venue('v-world-porters','Yokohama World Porters','橫濱港未來',5,'shopping-center',['dir-src-world-porters'],{nearestStation:'馬車道／櫻木町'}),
    venue('v-redbrick','Yokohama Red Brick Warehouse','橫濱港未來',5,'local-shopping',['dir-src-redbrick'],{nearestStation:'馬車道／日本大通'}),
  ];

  const brand = (id,name,category,styles,targets,price,japanValue,trend,extras={}) => ({
    id,name,nameZh:extras.nameZh || name,nameJa:extras.nameJa || name,nameEn:extras.nameEn || name,
    originCountry:extras.originCountry || ((extras.japaneseBrand ?? true)?'Japan':'International'),japaneseBrand:extras.japaneseBrand ?? true,
    category,primaryCategory:category,categories:extras.categories || [category],subcategories:extras.subcategories || [],
    styles,styleTags:styles,targets,targetGender:targets.filter(value => ['MEN','WOMEN','UNISEX'].includes(value)),targetAudience:targets,
    priceLevel:price,bestFor:extras.bestFor || [],notIdealFor:extras.notIdealFor || [],japanValue,trend,trendStatus:trend,
    taiwanAvailability:extras.taiwanAvailability || 'CHECK',japanSelectionAdvantage:extras.japanSelectionAdvantage || japanValue,
    exclusivePotential:extras.exclusivePotential || (['HIGH','VERY_HIGH'].includes(japanValue)?'MEDIUM':'LOW'),
    touristFriendly:extras.touristFriendly ?? true,taxFreeLikely:extras.taxFreeLikely ?? true,
    summary:extras.summary || '',signature:extras.signature || '',officialUrl:extras.officialUrl || '',sourceIds:extras.sourceIds || [],
    popularity:extras.popularity || {social:null,local:null,tourist:null,trend:null,evergreen:null},
    socialConfidence:extras.socialConfidence || 'LOW',factConfidence:extras.factConfidence || (extras.sourceIds?.length?'HIGH':'MEDIUM'),
    socialProof:extras.socialProof || {signal:'INSUFFICIENT',sourceIds:[]},lastVerified:verifiedAt,
    needsVerification:extras.needsVerification ?? !(extras.officialUrl || extras.sourceIds?.length)
  });

  const B = brand;
  const shoppingBrands = [
    B('b-beams','BEAMS','SELECT_SHOP',['CONTEMPORARY','AMERICAN_CASUAL'],['MEN','WOMEN','UNISEX','YOUNG_ADULT'],3,'HIGH','EVERGREEN',{officialUrl:'https://www.beams.co.jp/',sourceIds:['dir-src-beams-japan']}),
    B('b-beams-japan','BEAMS JAPAN','SOUVENIR',['JAPANESE_DESIGNER','CONTEMPORARY'],['UNISEX','TOURIST'],3,'VERY_HIGH','TRENDING',{officialUrl:'https://www.beams.co.jp/beams_japan/',sourceIds:['dir-src-beams-japan']}),
    B('b-united-arrows','UNITED ARROWS','SELECT_SHOP',['CLEAN','SMART_CASUAL'],['MEN','WOMEN','ADULT'],3,'HIGH','EVERGREEN',{officialUrl:'https://store.united-arrows.co.jp/',sourceIds:['dir-src-ua']}),
    B('b-beauty-youth','BEAUTY&YOUTH UNITED ARROWS','SELECT_SHOP',['CONTEMPORARY','CLEAN'],['MEN','WOMEN','YOUNG_ADULT'],3,'HIGH','TRENDING',{sourceIds:['dir-src-ua']}),
    B('b-green-label','green label relaxing','FASHION',['BASIC','SMART_CASUAL'],['MEN','WOMEN','FAMILY'],2,'HIGH','EVERGREEN',{sourceIds:['dir-src-ua']}),
    B('b-steven-alan','Steven Alan','SELECT_SHOP',['MINIMAL','CONTEMPORARY'],['MEN','WOMEN','YOUNG_ADULT'],3,'HIGH','TRENDING',{sourceIds:['dir-src-ua']}),
    B('b-tomorrowland','TOMORROWLAND','SELECT_SHOP',['CLEAN','LUXURY'],['MEN','WOMEN','ADULT'],4,'HIGH','EVERGREEN',{officialUrl:'https://store.tomorrowland.co.jp/'}),
    B('b-edition','EDITION','SELECT_SHOP',['MINIMAL','JAPANESE_DESIGNER'],['MEN','WOMEN','YOUNG_ADULT'],4,'HIGH','NICHE',{officialUrl:'https://store.tomorrowland.co.jp/'}),
    B('b-journal-standard','JOURNAL STANDARD','SELECT_SHOP',['AMERICAN_CASUAL','CONTEMPORARY'],['MEN','WOMEN','YOUNG_ADULT'],3,'HIGH','EVERGREEN',{sourceIds:['dir-src-baycrews']}),
    B('b-js-relume','JOURNAL STANDARD relume','SELECT_SHOP',['BASIC','AMERICAN_CASUAL'],['MEN','WOMEN','FAMILY'],2,'HIGH','EVERGREEN',{sourceIds:['dir-src-baycrews']}),
    B('b-js-lessage','JOURNAL STANDARD L’ESSAGE','FASHION',['CLEAN','CONTEMPORARY'],['WOMEN','ADULT'],3,'HIGH','TRENDING',{sourceIds:['dir-src-baycrews']}),
    B('b-edifice','EDIFICE','FASHION',['SMART_CASUAL','CLEAN'],['MEN','ADULT'],3,'HIGH','EVERGREEN',{sourceIds:['dir-src-baycrews']}),
    B('b-iena','IÉNA','FASHION',['CLEAN','CONTEMPORARY'],['WOMEN','ADULT'],3,'HIGH','EVERGREEN',{sourceIds:['dir-src-baycrews']}),
    B('b-cityshop','CITYSHOP','SELECT_SHOP',['CONTEMPORARY','AVANT_GARDE'],['WOMEN','YOUNG_ADULT'],3,'HIGH','TRENDING',{sourceIds:['dir-src-baycrews']}),
    B('b-lechoppe','L’ÉCHOPPE','SELECT_SHOP',['MINIMAL','JAPANESE_DESIGNER'],['MEN','UNISEX','ADULT'],4,'VERY_HIGH','NICHE',{sourceIds:['dir-src-baycrews']}),
    B('b-pulp','PULP','STREETWEAR',['STREETWEAR','AVANT_GARDE'],['MEN','UNISEX','YOUNG_ADULT'],3,'HIGH','HYPE',{sourceIds:['dir-src-baycrews']}),
    B('b-adam-et-rope','ADAM ET ROPÉ','SELECT_SHOP',['CONTEMPORARY','CLEAN'],['MEN','WOMEN','YOUNG_ADULT'],3,'HIGH','EVERGREEN',{sourceIds:['dir-src-adam']}),
    B('b-public-tokyo','PUBLIC TOKYO','DESIGNER',['JAPANESE_DESIGNER','MINIMAL'],['MEN','WOMEN','YOUNG_ADULT'],3,'VERY_HIGH','TRENDING',{officialUrl:'https://public-tokyo.com/'}),
    B('b-united-tokyo','UNITED TOKYO','DESIGNER',['JAPANESE_DESIGNER','MINIMAL'],['MEN','WOMEN','YOUNG_ADULT'],3,'VERY_HIGH','TRENDING',{officialUrl:'https://united-tokyo.com/'}),
    B('b-maison-special','MAISON SPECIAL','FASHION',['CONTEMPORARY','AVANT_GARDE'],['MEN','WOMEN','UNISEX','YOUNG_ADULT'],3,'HIGH','TRENDING_2026',{officialUrl:'https://maisonspecial.co.jp/'}),
    B('b-urban-research','URBAN RESEARCH','SELECT_SHOP',['CONTEMPORARY','CLEAN'],['MEN','WOMEN','YOUNG_ADULT'],3,'HIGH','EVERGREEN'),
    B('b-urban-doors','URBAN RESEARCH DOORS','LIFESTYLE',['BASIC','MINIMAL'],['MEN','WOMEN','FAMILY'],2,'HIGH','EVERGREEN'),
    B('b-bshop','Bshop','SELECT_SHOP',['BASIC','MINIMAL'],['MEN','WOMEN','UNISEX'],3,'HIGH','EVERGREEN',{officialUrl:'https://bshop-inc.com/'}),
    B('b-uniqlo','UNIQLO','FASHION',['BASIC','MINIMAL'],['MEN','WOMEN','UNISEX','FAMILY','TOURIST'],1,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.uniqlo.com/jp/ja/',sourceIds:['dir-src-uniqlo']}),
    B('b-gu','GU','FASHION',['BASIC','STREETWEAR'],['MEN','WOMEN','TEEN','YOUNG_ADULT'],1,'HIGH','TRENDING',{officialUrl:'https://www.gu-global.com/jp/ja/'}),
    B('b-muji','MUJI','LIFESTYLE',['MINIMAL','BASIC'],['UNISEX','FAMILY','TOURIST'],2,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.muji.com/jp/',sourceIds:['dir-src-muji']}),
    B('b-niko-and','niko and ...','LIFESTYLE',['BASIC','AMERICAN_CASUAL'],['MEN','WOMEN','YOUNG_ADULT'],2,'HIGH','TRENDING'),
    B('b-global-work','GLOBAL WORK','FASHION',['BASIC','SMART_CASUAL'],['MEN','WOMEN','FAMILY'],2,'HIGH','EVERGREEN'),
    B('b-rageblue','RAGEBLUE','FASHION',['STREETWEAR','BASIC'],['MEN','TEEN','YOUNG_ADULT'],2,'HIGH','TRENDING'),
    B('b-lowrys-farm','LOWRYS FARM','FASHION',['BASIC','CONTEMPORARY'],['WOMEN','TEEN','YOUNG_ADULT'],2,'HIGH','TRENDING'),
    B('b-wego','WEGO','STREETWEAR',['HARAJUKU','STREETWEAR'],['TEEN','YOUNG_ADULT','UNISEX'],1,'HIGH','TRENDING'),
    B('b-spinns','SPINNS','STREETWEAR',['HARAJUKU','KAWAII'],['TEEN','YOUNG_ADULT'],1,'HIGH','TRENDING'),
    B('b-onitsuka','Onitsuka Tiger','SNEAKERS',['SNEAKER','JAPANESE_DESIGNER'],['MEN','WOMEN','UNISEX','TOURIST'],3,'VERY_HIGH','TRENDING_2026',{officialUrl:'https://www.onitsukatiger.com/jp/ja-jp/'}),
    B('b-asics','ASICS','SPORTS',['SNEAKER','TECHWEAR'],['MEN','WOMEN','UNISEX'],2,'HIGH','EVERGREEN',{officialUrl:'https://www.asics.com/jp/ja-jp/'}),
    B('b-snow-peak','Snow Peak','LIFESTYLE',['OUTDOOR','MINIMAL'],['MEN','WOMEN','UNISEX','FAMILY'],3,'VERY_HIGH','TRENDING',{officialUrl:'https://www.snowpeak.co.jp/'}),
    B('b-montbell','mont-bell','SPORTS',['OUTDOOR','BASIC'],['MEN','WOMEN','UNISEX','FAMILY'],2,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.montbell.jp/'}),
    B('b-goldwin','Goldwin','SPORTS',['TECHWEAR','MINIMAL'],['MEN','WOMEN','UNISEX'],4,'VERY_HIGH','TRENDING'),
    B('b-north-face','THE NORTH FACE','SPORTS',['OUTDOOR','STREETWEAR'],['MEN','WOMEN','UNISEX'],3,'MEDIUM','EVERGREEN',{japaneseBrand:false}),
    B('b-comme-ca','COMME CA','FASHION',['MINIMAL','SMART_CASUAL'],['MEN','WOMEN','ADULT'],3,'HIGH','EVERGREEN',{officialUrl:'https://www.fivefoxes.co.jp/brand/comme-ca/'}),
    B('b-issey','ISSEY MIYAKE','DESIGNER',['JAPANESE_DESIGNER','AVANT_GARDE'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.isseymiyake.com/'}),
    B('b-pleats','PLEATS PLEASE ISSEY MIYAKE','DESIGNER',['JAPANESE_DESIGNER','AVANT_GARDE'],['WOMEN','COLLECTOR'],4,'VERY_HIGH','EVERGREEN'),
    B('b-homme-plisse','HOMME PLISSÉ ISSEY MIYAKE','DESIGNER',['JAPANESE_DESIGNER','AVANT_GARDE'],['MEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','TRENDING'),
    B('b-yohji','Yohji Yamamoto','DESIGNER',['JAPANESE_DESIGNER','AVANT_GARDE'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','EVERGREEN'),
    B('b-sacai','sacai','DESIGNER',['JAPANESE_DESIGNER','AVANT_GARDE'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','HYPE'),
    B('b-undercover','UNDERCOVER','DESIGNER',['JAPANESE_DESIGNER','STREETWEAR'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','HYPE'),
    B('b-human-made','HUMAN MADE','STREETWEAR',['STREETWEAR','AMERICAN_CASUAL'],['MEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','HYPE'),
    B('b-bape','A BATHING APE','STREETWEAR',['STREETWEAR','HARAJUKU'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'HIGH','HYPE'),
    B('b-neighborhood','NEIGHBORHOOD','STREETWEAR',['STREETWEAR','AMERICAN_CASUAL'],['MEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','HYPE'),
    B('b-carhartt-wip','Carhartt WIP','STREETWEAR',['STREETWEAR','AMERICAN_CASUAL'],['MEN','WOMEN','UNISEX'],3,'LOW','EVERGREEN',{japaneseBrand:false}),
    B('b-new-balance','New Balance','SNEAKERS',['SNEAKER','BASIC'],['MEN','WOMEN','UNISEX'],3,'MEDIUM','EVERGREEN',{japaneseBrand:false}),
    B('b-atmos','atmos','SNEAKERS',['SNEAKER','STREETWEAR'],['MEN','WOMEN','UNISEX','COLLECTOR'],3,'VERY_HIGH','HYPE'),
    B('b-abc','ABC-MART GRAND STAGE','SNEAKERS',['SNEAKER','BASIC'],['MEN','WOMEN','UNISEX','FAMILY'],2,'HIGH','EVERGREEN'),
    B('b-kicks-lab','KICKS LAB.','SNEAKERS',['SNEAKER','STREETWEAR'],['UNISEX','YOUNG_ADULT','COLLECTOR'],3,'HIGH','NICHE'),
    B('b-loft','LOFT','LIFESTYLE',['BASIC','CONTEMPORARY'],['FAMILY','TOURIST','YOUNG_ADULT'],2,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.loft.co.jp/'}),
    B('b-hands','HANDS','LIFESTYLE',['BASIC','CONTEMPORARY'],['FAMILY','TOURIST'],2,'VERY_HIGH','EVERGREEN',{officialUrl:'https://hands.net/'}),
    B('b-plaza','PLAZA','BEAUTY',['KAWAII','CONTEMPORARY'],['WOMEN','TEEN','YOUNG_ADULT','TOURIST'],2,'HIGH','TRENDING'),
    B('b-cosme-kitchen','Cosme Kitchen','BEAUTY',['CLEAN','MINIMAL'],['WOMEN','YOUNG_ADULT','ADULT'],3,'HIGH','TRENDING'),
    B('b-atcosme','@cosme','BEAUTY',['CONTEMPORARY'],['WOMEN','YOUNG_ADULT','TOURIST'],2,'VERY_HIGH','TRENDING_2026',{sourceIds:['dir-src-atcosme']}),
    B('b-ainz','AINZ & TULPE','BEAUTY',['CONTEMPORARY'],['WOMEN','YOUNG_ADULT','TOURIST'],2,'HIGH','TRENDING',{officialUrl:'https://ainz-tulpe.jp/'}),
    B('b-matsukiyo','Matsumoto Kiyoshi','DRUGSTORE',['BASIC'],['FAMILY','TOURIST'],1,'VERY_HIGH','EVERGREEN'),
    B('b-sundrug','SUNDRUG','DRUGSTORE',['BASIC'],['FAMILY','TOURIST'],1,'VERY_HIGH','EVERGREEN'),
    B('b-cocokara','Cocokara Fine','DRUGSTORE',['BASIC'],['FAMILY','TOURIST'],1,'VERY_HIGH','EVERGREEN'),
    B('b-donki','Don Quijote','LIFESTYLE',['BASIC'],['FAMILY','TOURIST','YOUNG_ADULT'],1,'VERY_HIGH','EVERGREEN'),
    B('b-standard-products','Standard Products','HOME',['MINIMAL','BASIC'],['FAMILY','TOURIST'],1,'VERY_HIGH','TRENDING'),
    B('b-3coins','3COINS','HOME',['BASIC','KAWAII'],['WOMEN','FAMILY','TOURIST'],1,'VERY_HIGH','TRENDING'),
    B('b-travelers-factory','TRAVELER’S FACTORY','STATIONERY',['MINIMAL','JAPANESE_DESIGNER'],['ADULT','COLLECTOR','TOURIST'],2,'VERY_HIGH','TRENDING',{officialUrl:'https://www.travelers-factory.com/'}),
    B('b-smith','Smith','STATIONERY',['MINIMAL','CONTEMPORARY'],['YOUNG_ADULT','ADULT','TOURIST'],2,'HIGH','EVERGREEN'),
    B('b-ito-ya','G. Itoya','STATIONERY',['MINIMAL','LUXURY'],['ADULT','COLLECTOR','TOURIST'],3,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.ito-ya.co.jp/'}),
    B('b-nintendo','Nintendo TOKYO','GAME',['KAWAII','CONTEMPORARY'],['FAMILY','COLLECTOR','TOURIST'],2,'VERY_HIGH','HYPE',{sourceIds:['dir-src-nintendo']}),
    B('b-pokemon','Pokémon Center','CHARACTER',['KAWAII'],['FAMILY','COLLECTOR','TOURIST'],2,'VERY_HIGH','EVERGREEN',{sourceIds:['dir-src-pokemon']}),
    B('b-capcom','CAPCOM STORE TOKYO','GAME',['CONTEMPORARY'],['COLLECTOR','TOURIST','YOUNG_ADULT'],2,'VERY_HIGH','TRENDING'),
    B('b-jump','JUMP SHOP','ANIME',['CONTEMPORARY'],['COLLECTOR','TOURIST','YOUNG_ADULT'],2,'VERY_HIGH','EVERGREEN'),
    B('b-mugiwara','ONE PIECE MUGIWARA STORE','ANIME',['CONTEMPORARY'],['COLLECTOR','TOURIST','YOUNG_ADULT'],2,'VERY_HIGH','TRENDING',{sourceIds:['dir-src-sunshine']}),
    B('b-donguri','Donguri Republic','CHARACTER',['KAWAII'],['FAMILY','COLLECTOR','TOURIST'],2,'VERY_HIGH','EVERGREEN',{sourceIds:['dir-src-sunshine']}),
    B('b-sanrio','Sanrio','CHARACTER',['KAWAII'],['FAMILY','COLLECTOR','TOURIST'],2,'VERY_HIGH','EVERGREEN'),
    B('b-kiddy-land','KIDDY LAND','CHARACTER',['KAWAII'],['FAMILY','COLLECTOR','TOURIST'],2,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.kiddyland.co.jp/'}),
    B('b-animate','Animate','ANIME',['CONTEMPORARY'],['COLLECTOR','TOURIST','YOUNG_ADULT'],2,'VERY_HIGH','EVERGREEN',{sourceIds:['dir-src-animate']}),
    B('b-mandarake','Mandarake','VINTAGE',['VINTAGE'],['COLLECTOR','TOURIST'],2,'VERY_HIGH','NICHE'),
    B('b-surugaya','Surugaya','VINTAGE',['VINTAGE'],['COLLECTOR','TOURIST'],2,'VERY_HIGH','TRENDING'),
    B('b-lashinbang','Lashinbang','ANIME',['VINTAGE'],['COLLECTOR','TOURIST'],1,'VERY_HIGH','NICHE'),
    B('b-amiami','AmiAmi','HOBBY',['CONTEMPORARY'],['COLLECTOR','TOURIST'],2,'VERY_HIGH','EVERGREEN'),
    B('b-tamashii','TAMASHII NATIONS STORE TOKYO','HOBBY',['CONTEMPORARY'],['COLLECTOR','TOURIST'],3,'VERY_HIGH','TRENDING'),
    B('b-bic-camera','BicCamera','ELECTRONICS',['BASIC'],['FAMILY','TOURIST'],2,'HIGH','EVERGREEN',{officialUrl:'https://www.biccamera.com/bc/i/shop/shoplist/index.jsp'}),
    B('b-yodobashi','Yodobashi Camera','ELECTRONICS',['BASIC'],['FAMILY','TOURIST'],2,'HIGH','EVERGREEN',{sourceIds:['dir-src-yodobashi-akiba']}),
    B('b-map-camera','Map Camera','CAMERA',['CONTEMPORARY'],['ADULT','COLLECTOR','TOURIST'],3,'VERY_HIGH','NICHE',{officialUrl:'https://www.mapcamera.com/'}),
    B('b-fujiya-camera','Fujiya Camera','CAMERA',['CONTEMPORARY'],['ADULT','COLLECTOR','TOURIST'],3,'VERY_HIGH','NICHE',{officialUrl:'https://www.fujiya-camera.co.jp/'}),
    B('b-sony','Sony Store','ELECTRONICS',['MINIMAL','TECHWEAR'],['ADULT','TOURIST'],3,'MEDIUM','EVERGREEN',{officialUrl:'https://www.sony.jp/store/retail/'}),
    B('b-nakagawa','Nippon Department Store','SOUVENIR',['MINIMAL','JAPANESE_DESIGNER'],['ADULT','TOURIST'],2,'VERY_HIGH','TRENDING'),
    B('b-akomeya','AKOMEYA TOKYO','FOOD',['MINIMAL','JAPANESE_DESIGNER'],['ADULT','FAMILY','TOURIST'],2,'VERY_HIGH','TRENDING'),
    B('b-toraya','TORAYA','FOOD',['MINIMAL','LUXURY'],['ADULT','TOURIST'],3,'VERY_HIGH','EVERGREEN'),
    B('b-yokumoku','YOKU MOKU','FOOD',['LUXURY'],['FAMILY','TOURIST'],2,'VERY_HIGH','EVERGREEN'),
    B('b-funawa','FUNAWA','FOOD',['BASIC'],['FAMILY','TOURIST'],1,'VERY_HIGH','EVERGREEN'),
    B('b-godiva','GODIVA','FOOD',['LUXURY'],['ADULT','TOURIST'],3,'LOW','EVERGREEN',{japaneseBrand:false,originCountry:'Belgium',officialUrl:'https://www.godiva.co.jp/'}),
    B('b-jins','JINS','LIFESTYLE',['MINIMAL','BASIC'],['MEN','WOMEN','UNISEX','TOURIST'],2,'VERY_HIGH','EVERGREEN'),
    B('b-zoff','Zoff','LIFESTYLE',['BASIC','CONTEMPORARY'],['MEN','WOMEN','UNISEX','TOURIST'],2,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.zoff.co.jp/shop/'}),
    B('b-porter','PORTER / Yoshida & Co.','TRAVEL',['JAPANESE_DESIGNER','MINIMAL'],['MEN','WOMEN','UNISEX','TOURIST'],3,'VERY_HIGH','EVERGREEN'),
    B('b-ace','ACE Bags & Luggage','TRAVEL',['BASIC','SMART_CASUAL'],['MEN','WOMEN','UNISEX','TOURIST'],3,'VERY_HIGH','EVERGREEN',{officialUrl:'https://www.ace.jp/'}),
    B('b-hare','HARE','FASHION',['MINIMAL','STREETWEAR'],['MEN','WOMEN','UNISEX','YOUNG_ADULT'],2,'VERY_HIGH','TRENDING'),
    B('b-ships','SHIPS','SELECT_SHOP',['CLEAN','SMART_CASUAL'],['MEN','WOMEN','ADULT'],3,'HIGH','EVERGREEN'),
    B('b-freaks','FREAK’S STORE','SELECT_SHOP',['AMERICAN_CASUAL','OUTDOOR'],['MEN','WOMEN','UNISEX','YOUNG_ADULT'],2,'HIGH','TRENDING'),
    B('b-comme-des-garcons','COMME des GARÇONS','DESIGNER',['JAPANESE_DESIGNER','AVANT_GARDE'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','EVERGREEN'),
    B('b-mihara','Maison MIHARA YASUHIRO','DESIGNER',['JAPANESE_DESIGNER','SNEAKER'],['MEN','WOMEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','HYPE'),
    B('b-wtaps','WTAPS','STREETWEAR',['STREETWEAR','AMERICAN_CASUAL'],['MEN','UNISEX','COLLECTOR'],4,'VERY_HIGH','HYPE'),
    B('b-nike','Nike','SPORTS',['SNEAKER','STREETWEAR'],['MEN','WOMEN','UNISEX'],3,'MEDIUM','EVERGREEN',{japaneseBrand:false,originCountry:'United States'}),
    B('b-adidas','adidas','SPORTS',['SNEAKER','STREETWEAR'],['MEN','WOMEN','UNISEX'],3,'MEDIUM','EVERGREEN',{japaneseBrand:false,originCountry:'Germany'}),
    B('b-salomon','SALOMON','SPORTS',['OUTDOOR','TECHWEAR','SNEAKER'],['MEN','WOMEN','UNISEX'],3,'MEDIUM','TRENDING_2026',{japaneseBrand:false,originCountry:'France'})
  ];

  const openEvidence = new Map([
    ['v-lumine1',['dir-src-lumine-shinjuku']],['v-lumine2',['dir-src-lumine-shinjuku']],['v-lumine-est',['dir-src-lumine-est']],
    ['v-beams-japan',['dir-src-beams-japan']],['v-sunshine',['dir-src-sunshine']],['v-yodobashi-akiba',['dir-src-yodobashi-akiba']],
    ['v-shibuya-parco',['dir-src-shibuya-parco']],['v-miyashita',['dir-src-miyashita']]
  ]);
  const branchGroups = [
    ['v-isetan-shinjuku',['b-issey','b-pleats','b-homme-plisse','b-yohji','b-sacai','b-tomorrowland','b-onitsuka','b-porter','b-toraya','b-yokumoku']],
    ['v-lumine1',['b-tomorrowland','b-united-arrows','b-edition','b-js-lessage','b-iena','b-bshop','b-snow-peak','b-urban-doors','b-cosme-kitchen']],
    ['v-lumine2',['b-beauty-youth','b-steven-alan','b-js-relume','b-adam-et-rope','b-maison-special','b-cityshop','b-plaza','b-smith']],
    ['v-lumine-est',['b-beams','b-onitsuka','b-abc','b-wego','b-lowrys-farm','b-rageblue','b-hare','b-3coins']],
    ['v-newoman',['b-beams','b-muji','b-cosme-kitchen','b-akomeya','b-smith']],
    ['v-takashimaya-shinjuku',['b-hands','b-uniqlo','b-snow-peak','b-porter','b-yokumoku','b-toraya']],
    ['v-flags',['b-journal-standard','b-gap','b-abc','b-tower-records']],
    ['v-beams-japan',['b-beams-japan']],
    ['v-sunshine',['b-pokemon','b-mugiwara','b-donguri','b-sanrio','b-muji','b-wego','b-jins','b-niko-and']],
    ['v-ikebukuro-parco',['b-edifice','b-beams','b-united-tokyo','b-lowrys-farm','b-porter']],
    ['v-animate-ikebukuro',['b-animate']],
    ['v-seibu-ikebukuro',['b-loft','b-muji','b-yokumoku','b-toraya']],
    ['v-radio-kaikan',['b-amiami','b-mandarake','b-lashinbang','b-kotobukiya']],
    ['v-yodobashi-akiba',['b-yodobashi','b-jins','b-abc','b-uniqlo']],
    ['v-atre-akiba',['b-tamashii','b-muji','b-3coins']],
    ['v-divercity',['b-uniqlo','b-gu','b-wego','b-hands','b-donguri','b-abc']],
    ['v-aquacity',['b-north-face','b-onitsuka','b-matsukiyo','b-jump']],
    ['v-decks',['b-surugaya','b-daiso','b-sanrio']],
    ['v-laforet',['b-undercover','b-wego','b-spinns','b-atmos','b-kicks-lab']],
    ['v-harakado',['b-porter','b-muji','b-nakagawa']],
    ['v-omokado',['b-tomorrowland','b-urban-research','b-american-eagle']],
    ['v-omotesando-hills',['b-yohji','b-goldwin','b-jins','b-porter']],
    ['v-atcosme',['b-atcosme']],
    ['v-cat-street',['b-bape','b-neighborhood','b-wtaps','b-carhartt-wip','b-new-balance','b-atmos','b-journal-standard','b-pulp','b-north-face','b-nike','b-adidas','b-salomon']],
    ['v-shibuya-parco',['b-nintendo','b-pokemon','b-capcom','b-jump','b-human-made','b-undercover','b-comme-des-garcons','b-mihara','b-issey','b-mandarake','b-muji']],
    ['v-scramble',['b-iena','b-edifice','b-journal-standard','b-united-arrows','b-beams','b-porter']],
    ['v-hikarie',['b-cosme-kitchen','b-plaza','b-loft','b-akomeya','b-yokumoku']],
    ['v-miyashita',['b-lechoppe','b-kith','b-north-face','b-new-balance','b-beams']],
    ['v-shibuya109',['b-wego','b-spinns','b-lowrys-farm','b-sly','b-moussy']],
    ['v-midtown',['b-beams','b-issey','b-porter','b-muji','b-toraya']],
    ['v-roppongi-hills',['b-united-arrows','b-beams','b-estnation','b-adam-et-rope']],
    ['v-matsuzakaya-ueno',['b-matsukiyo','b-yokumoku','b-toraya','b-jins']],
    ['v-parcoya',['b-beams','b-urban-research','b-akomeya']],
    ['v-ameyoko',['b-matsukiyo','b-sundrug','b-cocokara','b-donki']],
    ['v-asakusa-rox',['b-uniqlo','b-gu','b-3coins','b-matsukiyo']],
    ['v-ekimise',['b-abc','b-loft','b-funawa']],
    ['v-sogo-yokohama',['b-loft','b-muji','b-beams','b-porter','b-toraya','b-yokumoku']],
    ['v-takashimaya-yokohama',['b-hands','b-united-arrows','b-tomorrowland','b-issey','b-yokumoku']],
    ['v-joinus',['b-beauty-youth','b-green-label','b-urban-research','b-plaza','b-3coins']],
    ['v-yokohama-mores',['b-beams','b-abc','b-loft']],
    ['v-landmark',['b-snow-peak','b-north-face','b-porter','b-montbell']],
    ['v-markis-mm',['b-uniqlo','b-global-work','b-niko-and','b-freaks','b-ships','b-muji','b-3coins']],
    ['v-world-porters',['b-wego','b-village-vanguard','b-standard-products','b-sanrio']],
    ['v-redbrick',['b-nakagawa','b-yokohama-local']]
  ];

  const inferredBrands = {
    'b-gap':['GAP','FASHION',['BASIC'],['MEN','WOMEN','FAMILY'],2,'LOW','EVERGREEN',false],
    'b-tower-records':['Tower Records','LIFESTYLE',['CONTEMPORARY'],['YOUNG_ADULT','COLLECTOR','TOURIST'],2,'HIGH','EVERGREEN',true],
    'b-kotobukiya':['Kotobukiya','HOBBY',['CONTEMPORARY'],['COLLECTOR','TOURIST'],2,'VERY_HIGH','EVERGREEN',true],
    'b-daiso':['DAISO','HOME',['BASIC'],['FAMILY','TOURIST'],1,'VERY_HIGH','EVERGREEN',true],
    'b-american-eagle':['American Eagle','FASHION',['AMERICAN_CASUAL'],['MEN','WOMEN','YOUNG_ADULT'],2,'LOW','EVERGREEN',false],
    'b-kith':['KITH TOKYO','STREETWEAR',['STREETWEAR','SNEAKER'],['UNISEX','COLLECTOR'],4,'MEDIUM','HYPE',false],
    'b-sly':['SLY','FASHION',['STREETWEAR'],['WOMEN','YOUNG_ADULT'],2,'HIGH','TRENDING',true],
    'b-moussy':['MOUSSY','FASHION',['CONTEMPORARY'],['WOMEN','YOUNG_ADULT'],2,'HIGH','TRENDING',true],
    'b-estnation':['ESTNATION','SELECT_SHOP',['LUXURY','CONTEMPORARY'],['MEN','WOMEN','ADULT'],4,'HIGH','EVERGREEN',true],
    'b-village-vanguard':['Village Vanguard','LIFESTYLE',['KAWAII','CONTEMPORARY'],['TEEN','YOUNG_ADULT','COLLECTOR'],2,'VERY_HIGH','EVERGREEN',true],
    'b-yokohama-local':['Yokohama local makers','SOUVENIR',['MINIMAL','JAPANESE_DESIGNER'],['TOURIST','ADULT'],2,'VERY_HIGH','NICHE',true]
  };
  Object.entries(inferredBrands).forEach(([id,[name,category,styles,targets,price,value,trend,japaneseBrand]]) => {
    if (!shoppingBrands.some(item => item.id === id)) shoppingBrands.push(B(id,name,category,styles,targets,price,value,trend,{japaneseBrand}));
  });

  const socialSignalGroups = [
    [['b-atcosme','b-ainz','b-matsukiyo','b-sundrug','b-cocokara','b-donki'],['dir-src-social-haul-2025','dir-src-social-shopping-review']],
    [['b-beams-japan','b-beams','b-united-arrows','b-tomorrowland','b-lumine-est'],['dir-src-social-route-report','dir-src-social-shinjuku-video']],
    [['b-loft','b-hands','b-muji','b-yokumoku','b-toraya'],['dir-src-social-haul-2025']],
    [['b-pokemon','b-nintendo','b-animate','b-mugiwara'],['dir-src-social-dcard']]
  ];
  socialSignalGroups.forEach(([brandIds,sourceIds]) => brandIds.forEach(id => {
    const item = shoppingBrands.find(candidate => candidate.id === id);
    if (!item) return;
    item.socialProof = {signal:'MULTI_REPORT',sourceIds};
    item.socialConfidence = sourceIds.length > 1?'MEDIUM':'LOW';
    item.popularity = {...item.popularity,tourist:Math.max(item.popularity.tourist || 0,4)};
  }));

  const venueById = new Map(shoppingVenues.map(item => [item.id,item]));
  const brandById = new Map(shoppingBrands.map(item => [item.id,item]));
  const shoppingBranches = branchGroups.flatMap(([venueId,brandIds]) => brandIds.map((brandId,index) => {
    const v = venueById.get(venueId);
    const b = brandById.get(brandId);
    const evidence = openEvidence.get(venueId);
    const branchFormat = ['v-beams-japan','v-animate-ikebukuro','v-atcosme'].includes(venueId)
      ? 'FLAGSHIP' : ['b-nintendo','b-pokemon','b-capcom','b-jump','b-mugiwara','b-donguri','b-animate','b-atcosme','b-beams-japan'].includes(brandId)
        ? 'OFFICIAL_STORE' : 'IN_VENUE';
    return {
      id:`br-${venueId.slice(2)}-${brandId.slice(2)}`,brandId,venueId,name:`${b?.name || brandId} — ${v?.name || venueId}`,
      nameZh:`${b?.name || brandId} — ${v?.name || venueId}`,nameJa:`${b?.nameJa || b?.name || brandId} — ${v?.nameJa || v?.name || venueId}`,
      nameEn:`${b?.nameEn || b?.name || brandId} — ${v?.nameEn || v?.name || venueId}`,
      area:v?.area || '',areaId:v?.areaId || '',days:v?.days || [],tripDays:v?.tripDays || [],floor:'CHECK OFFICIAL GUIDE',
      address:v?.address || 'CHECK OFFICIAL ACCESS PAGE',coordinates:null,status:evidence?'OPEN':'CHECK_BEFORE_VISIT',currentStatus:evidence?'OPEN':'CHECK_BEFORE_VISIT',
      onRoute:v?.routeFit ?? false,onRouteLevel:v?.routeFit?'PRIMARY':'DETOUR',rainyDay:v?.rainyDay ?? false,taxFree:v?.taxFree || 'CHECK_TENANT',
      branchFormat,
      storeSize:['v-beams-japan','v-animate-ikebukuro','v-atcosme'].includes(venueId)?'FLAGSHIP_SCALE':'UNKNOWN',
      branchStrengths:['ON_ROUTE',v?.rainyDay?'INDOOR':'OPEN_AIR'],
      branchExclusivePotential:['OFFICIAL_STORE','FLAGSHIP'].includes(branchFormat)?'HIGH':'CHECK',
      openingHours:'CHECK OFFICIAL GUIDE',
      mapUrl:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((b?.name || brandId)+' '+(v?.name || venueId))}`,
      officialUrl:b?.officialUrl || v?.officialUrl || '',sourceIds:evidence || v?.sourceIds || [],lastVerified:verifiedAt,
      needsVerification:!evidence,displayOrder:index
    };
  }));

  shoppingBrands.forEach(item => {
    if (item.officialUrl && !item.sourceIds.length) {
      const sourceId = `dir-src-brand-${item.id.slice(2)}`;
      directorySources.push({
        id:sourceId,title:`${item.name} official website`,kind:'OFFICIAL_BRAND',url:item.officialUrl,
        note:'Official brand site used for identity and classification; branch status still comes from venue or store locator.',checkedAt:verifiedAt,
        platform:'official',evidence:'OFFICIAL BRAND SITE · IDENTITY / CLASSIFICATION',sourceAccessible:true,
        freshness:'CHECKED 2026-08-11',confidence:'HIGH'
      });
      item.sourceIds = [sourceId];
      item.factConfidence = 'HIGH';
      item.needsVerification = false;
      return;
    }
    if (!item.sourceIds.length) {
      const branchSources = shoppingBranches
        .filter(branch => branch.brandId === item.id)
        .flatMap(branch => branch.sourceIds)
        .filter((id,index,list) => list.indexOf(id) === index)
        .slice(0,3);
      item.sourceIds = branchSources;
      item.factConfidence = 'MEDIUM';
      item.needsVerification = true;
    }
  });

  const brandAliases = {
    'BEAMS JAPAN':'b-beams-japan','UNIQLO':'b-uniqlo','MUJI':'b-muji','Onitsuka Tiger':'b-onitsuka','Animate':'b-animate',
    'Pokémon Center':'b-pokemon','Nintendo':'b-nintendo','Nintendo / SONY':'b-nintendo','@COSME':'b-atcosme',
    'MATSUKIYO COCOKARA':'b-matsukiyo','SUNDRUG':'b-sundrug','DAIKOKU DRUG':'b-sundrug','DON QUIJOTE':'b-donki',
    'YODOBASHI':'b-yodobashi','Standard Products':'b-standard-products','TRAVELER’S COMPANY':'b-travelers-factory','mont-bell':'b-montbell',
    'TORAYA':'b-toraya','YOKU MOKU':'b-yokumoku','FUNAWA':'b-funawa','SUQQU':'b-atcosme','AINZ & TULPE':'b-ainz'
  };

  const routePriority = Object.freeze({
    1:['v-isetan-shinjuku','v-lumine1','v-lumine2','v-lumine-est','v-beams-japan','v-divercity'],
    2:['v-sunshine','v-animate-ikebukuro','v-ikebukuro-parco','v-yodobashi-akiba','v-radio-kaikan','v-midtown'],
    3:[],
    4:['v-atcosme','v-laforet','v-cat-street','v-shibuya-parco','v-scramble','v-miyashita'],
    5:['v-sogo-yokohama','v-landmark','v-markis-mm','v-world-porters','v-redbrick'],
    6:['v-asakusa-rox','v-ekimise','v-ameyoko','v-matsuzakaya-ueno','v-parcoya']
  });

  window.TokyoShoppingDirectory = {
    verifiedAt,shoppingTaxonomy,directorySources,shoppingVenues,shoppingBrands,shoppingBranches,brandAliases,routePriority,
    meta:{schemaVersion:1,recordCounts:{venues:shoppingVenues.length,brands:shoppingBrands.length,branches:shoppingBranches.length},officialFirst:true}
  };
})();
