(() => {
  'use strict';

  const verifiedAt = '2026-08-11';
  const enumSet = values => Object.freeze([...values]);
  const shoppingTaxonomy = Object.freeze({
    venueTypes: enumSet(['department-store','urban-mall','station-mall','shopping-center','shopping-street','market-street','flagship-district','electronics-complex','specialty-complex','outlet','local-shopping']),
    brandCategories: enumSet(['FASHION','SELECT_SHOP','DESIGNER','STREETWEAR','SNEAKERS','SPORTS','BEAUTY','DRUGSTORE','LIFESTYLE','HOME','TRAVEL','STATIONERY','ANIME','CHARACTER','GAME','HOBBY','ELECTRONICS','CAMERA','FOOD','SOUVENIR','LUXURY','VINTAGE']),
    styles: enumSet(['BASIC','MINIMAL','CLEAN','CASUAL','SMART_CASUAL','CONTEMPORARY','JAPANESE_DESIGNER','STREETWEAR','HARAJUKU','KAWAII','Y2K','VINTAGE','AMERICAN_CASUAL','WORKWEAR','OUTDOOR','SPORT','SNEAKER','TECHWEAR','AVANT_GARDE','LUXURY','MODE','HYPE','UNISEX']),
    targets: enumSet(['MEN','WOMEN','UNISEX','TEEN','YOUNG_ADULT','ADULT','FAMILY','COLLECTOR','TOURIST']),
    priceLevels: enumSet([1,2,3,4]),
    japanValues: enumSet(['NONE','LOW','MEDIUM','HIGH','VERY_HIGH']),
    trends: enumSet(['TRENDING_2026','TRENDING','EVERGREEN','NICHE','HYPE','REVIVAL','DECLINING','UNKNOWN']),
    routeSegments: enumSet(['TAKESHITA_STREET','HARAJUKU','JINGUMAE','CAT_STREET','OMOTESANDO','SHIBUYA_CENTER','SHIBUYA_PARCO','SHIBUYA_STATION','MIYASHITA_PARK']),
    fashionCategories: enumSet(['YOUTH_FAST_FASHION','STREETWEAR','SELECT_SHOP','JAPANESE_DESIGNER','INTERNATIONAL_DESIGNER','BASICS','CASUAL','SNEAKERS','SPORTS_FASHION','HARAJUKU_FASHION','KAWAII','VINTAGE','SECONDHAND','ACCESSORIES','BAGS','JEWELRY','LUXURY','LIFESTYLE_FASHION']),
    shoppingIntents: enumSet(['CHEAP_TREND','EVERYDAY_BASIC','JAPANESE_FASHION','TREND_HUNTING','DESIGNER_DISCOVERY','STREETWEAR','SNEAKER_HUNT','VINTAGE_HUNT','GIFTS','ACCESSORIES','FLAGSHIP_EXPERIENCE']),
    ageStyles: enumSet(['TEEN','COLLEGE','YOUNG_ADULT','ADULT','ALL_AGES']),
    fashionAudiences: enumSet(['TREND_FOCUSED','VALUE_FOCUSED','DESIGN_FOCUSED','BRAND_FOCUSED','COLLECTOR','CASUAL_SHOPPER']),
    pricePositions: enumSet(['BUDGET','AFFORDABLE','MID','PREMIUM','LUXURY']),
    visitTimes: enumSet(['QUICK','NORMAL','DEEP','ZONE_DESTINATION']),
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
    ['dir-src-kicks-lab','KICKS LAB. official store guide','OFFICIAL','https://www.kickslab.com/pages/shop','Official branch address, opening hours and notices.'],
    ['dir-src-pokemon','Pokémon Center official shop list','OFFICIAL','https://www.pokemon.co.jp/shop/en/','Official shop locator.'],
    ['dir-src-social-haul-2025','2025 Tokyo shopping haul and product feedback','SOCIAL','https://www.dcard.tw/f/japan_travel/p/259158508','Traveller field report covering drugstore, beauty, stationery and department-store food; subjective experience only.'],
    ['dir-src-social-shinjuku-2025','2025 Shinjuku / Harajuku / Roppongi trip report','SOCIAL','https://www.dcard.tw/f/japan_travel/p/258963711','Field report notes crowd pressure at @cosme TOKYO and calmer alternatives; used for visit strategy, not opening facts.'],
    ['dir-src-social-shopping-review','Tokyo drugstore and souvenir shopping review','SOCIAL','https://www.dcard.tw/f/japan_travel/p/256006872','Traveller price and availability observations; prices are not treated as current facts.'],
    ['dir-src-social-route-report','Tokyo route and shopping field report','SOCIAL','https://www.dcard.tw/f/japan_travel/p/254553652','Field report references LUMINE EST, BEAMS JAPAN and department-store food; used as a route-fit signal.'],
    ['dir-src-social-shinjuku-video','2025 Shinjuku shopping field video','SOCIAL','https://www.youtube.com/watch?v=uVhymusmvH0','Creator field report used only as a discovery and crowd / district orientation signal.'],
    ['dir-src-social-dcard','Dcard Japan travel shopping discussions','SOCIAL','https://www.dcard.tw/topics/%E6%97%A5%E6%9C%AC%E6%97%85%E9%81%8A','Used only for recurring shopping questions and traveller sentiment; never branch status.'],
    ['dir-src-social-youtube','YouTube Japan shopping field reports','SOCIAL','https://www.youtube.com/results?search_query=2026+%E6%9D%B1%E4%BA%AC+%E8%B3%BC%E7%89%A9','Used only as a discovery and trend signal.'],
    ['dir-src-takeshita','Takeshita Street official shop list','OFFICIAL_VENUE','https://www.takeshita-street.com/shop.html','Current merchant list for Takeshita Street.'],
    ['dir-src-wego','WEGO official store list','OFFICIAL_BRANCH','https://wego.jp/a/shops','Current Harajuku and Shibuya branch addresses.'],
    ['dir-src-wego-summer26','WEGO SUMMER FES 2026','OFFICIAL_BRAND','https://wego.jp/blogs/news/wego-summer-fes-2026','Official 2026 seasonal event evidence; not a stock guarantee.'],
    ['dir-src-spinns-close','SPINNS Harajuku Takeshita closure notice','OFFICIAL_BRANCH','https://www.spinns.com/topics/58143/','Confirms the former Takeshita branch closed in 2023.'],
    ['dir-src-spinns-109','SPINNS SHIBUYA109 official tenant page','OFFICIAL_BRANCH','https://www.shibuya109.jp/shop/SPN/','Current SHIBUYA109 branch evidence.'],
    ['dir-src-angelic-laforet','Angelic Pretty Laforet official tenant page','OFFICIAL_BRANCH','https://www.laforet.ne.jp/shop_search/shop2','Current Laforet tenant and floor evidence.'],
    ['dir-src-acdcrag','ACDC RAG official company / store page','OFFICIAL_BRANCH','https://acdcrag.com/pages/company','Current Harajuku shop addresses and hours.'],
    ['dir-src-ragtag','RAGTAG Harajuku official store page','OFFICIAL_BRANCH','https://www.ragtag.jp/real-store/0000000001','Current Cat Street secondhand store, address, hours and fashion mix.'],
    ['dir-src-2ndstreet','2nd STREET Harajuku official store page','OFFICIAL_BRANCH','https://www.2ndstreet.jp/shop/details?shopsId=30887','Current Harajuku flagship secondhand store and hours.'],
    ['dir-src-sacai','sacai official store locator','OFFICIAL_BRANCH','https://www.sacai.jp/en/pages/store-locator','Current Aoyama flagship address.'],
    ['dir-src-hm','H&M Japan official store locator','OFFICIAL_BRANCH','https://www2.hm.com/ja_jp/customer-service/shopping-at-hm/store-locator.html','Current Harajuku and Shibuya stores.'],
    ['dir-src-zara','ZARA Shibuya official store page','OFFICIAL_BRANCH','https://www.zara.com/jp/ja/stores-locator/zara-%E6%9D%B1%E4%BA%AC-shibuya-s3048','Current Udagawacho branch.'],
    ['dir-src-stussy','Stussy Harajuku official chapter page','OFFICIAL_BRANCH','https://www.stussy.com/blogs/chapters/stussy-harajuku','Current Harajuku chapter address.'],
    ['dir-src-supreme','Supreme official store list','OFFICIAL_BRANCH','https://supreme.com/stores','Current Harajuku store listing.'],
    ['dir-src-xlarge','XLARGE official shop list','OFFICIAL_BRANCH','https://xlarge.jp/shoplist','Current Harajuku branch listing.'],
    ['dir-src-atmos','atmos official shop list','OFFICIAL_BRANCH','https://www.atmos-tokyo.com/shop/store/shoplist','Current Harajuku, Omotesando and Shibuya branches.'],
    ['dir-src-atmos-pink26','atmos pink Harajuku relocation 2026','OFFICIAL_BRANCH','https://www.atmos-tokyo.com/news/560','Official July 2026 relocation and reopen notice.'],
    ['dir-src-adidas','adidas Originals Flagship Store Tokyo official page','OFFICIAL_BRANCH','https://www.adidas.jp/stores/japan/tokyo/jingumae-shibuya-5-17-4/9990017853','Current Jingumae flagship address and hours.'],
    ['dir-src-fashion-snap26','FASHIONSNAP Harajuku street snap July 2026','FASHION_MEDIA','https://www.fashionsnap.com/article/2026-07-04/fashion-snap-harajuku/','Editorial evidence for current Harajuku layering and Y2K signals; not branch status.'],
    ['dir-src-timeout-select26','Time Out Tokyo Harajuku select shops 2026','FASHION_MEDIA','https://www.timeout.jp/tokyo/ja/shopping-style/13-unique-select-shops-in-harajuku-andjingumae','Recent editorial discovery source; branches rechecked officially.'],
    ['dir-src-reddit-harajuku26','Public Harajuku fashion discussion','SOCIAL','https://www.reddit.com/r/HarajukuFashion/comments/1kkq5dw','Subjective style and shopping signal only; never used for store existence.'],
    ['dir-src-reddit-stussy26','Public Stussy Harajuku visit discussion 2026','SOCIAL','https://www.reddit.com/r/stussy/comments/1rykw5d/harajuku_32026/','Queue and stock uncertainty signal only; stock is never guaranteed.']
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
    routeSegments:extras.routeSegments || [],sourceIds,status:extras.status || 'OPEN',lastVerified:verifiedAt,needsVerification:extras.needsVerification ?? false
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
    venue('v-takeshita-street','Takeshita Street','竹下通',4,'shopping-street',['dir-src-takeshita'],{nearestStation:'原宿站竹下口',rainyDay:false,taxFree:'STORE_DEPENDENT',routeSegments:['TAKESHITA_STREET'],summary:'青年平價、原宿系與配件的快速掃街段，只收錄有官方現存證據的代表店。'}),
    venue('v-jingumae-fashion','Harajuku / Jingumae Fashion District','原宿／神宮前',4,'flagship-district',['dir-src-stussy','dir-src-2ndstreet'],{nearestStation:'原宿／明治神宮前',rainyDay:false,taxFree:'STORE_DEPENDENT',routeSegments:['HARAJUKU','JINGUMAE'],summary:'原宿街頭、球鞋、古著與旗艦店的分店級節點。'}),
    venue('v-laforet','Laforet Harajuku','原宿',4,'urban-mall',['dir-src-laforet'],{nearestStation:'明治神宮前',routeSegments:['HARAJUKU']}),
    venue('v-harakado','Tokyu Plaza Harajuku HARAKADO','原宿',4,'urban-mall',['dir-src-tokyu-plaza'],{nearestStation:'明治神宮前',routeSegments:['HARAJUKU']}),
    venue('v-omokado','Tokyu Plaza Omotesando OMOKADO','原宿',4,'urban-mall',['dir-src-omohara'],{nearestStation:'明治神宮前',routeSegments:['HARAJUKU','OMOTESANDO']}),
    venue('v-omotesando-hills','Omotesando Hills','表參道',4,'urban-mall',['dir-src-omotesando-hills'],{nearestStation:'表參道／明治神宮前',taxFree:'TENANT_DEPENDENT',routeSegments:['OMOTESANDO']}),
    venue('v-atcosme','@cosme TOKYO','原宿',4,'specialty-complex',['dir-src-atcosme'],{nearestStation:'原宿站',taxFree:'AVAILABLE',routeSegments:['HARAJUKU']}),
    venue('v-cat-street','Cat Street','原宿／澀谷',4,'flagship-district',['dir-src-ua','dir-src-baycrews'],{nearestStation:'明治神宮前／澀谷',rainyDay:false,taxFree:'STORE_DEPENDENT',routeSegments:['CAT_STREET','JINGUMAE']}),
    venue('v-omotesando-aoyama','Omotesando / Aoyama Flagship District','表參道／青山',4,'flagship-district',['dir-src-sacai','dir-src-atmos'],{nearestStation:'表參道站',rainyDay:false,taxFree:'STORE_DEPENDENT',routeSegments:['OMOTESANDO'],summary:'日本設計師與國際旗艦建築的目的型購物段。'}),
    venue('v-shibuya-center','Shibuya Center / Udagawacho','澀谷中心街／宇田川町',4,'flagship-district',['dir-src-zara','dir-src-atmos'],{nearestStation:'澀谷站',rainyDay:false,taxFree:'STORE_DEPENDENT',routeSegments:['SHIBUYA_CENTER'],summary:'青年服飾、運動鞋與大型街邊店的快速比較段。'}),
    venue('v-shibuya-parco','Shibuya PARCO','澀谷',4,'urban-mall',['dir-src-shibuya-parco'],{nearestStation:'澀谷站',routeSegments:['SHIBUYA_PARCO']}),
    venue('v-scramble','Shibuya Scramble Square','澀谷',4,'station-mall',['dir-src-scramble'],{nearestStation:'澀谷站',routeSegments:['SHIBUYA_STATION']}),
    venue('v-hikarie','Shibuya Hikarie ShinQs','澀谷',4,'station-mall',['dir-src-hikarie'],{nearestStation:'澀谷站',routeSegments:['SHIBUYA_STATION']}),
    venue('v-miyashita','RAYARD MIYASHITA PARK','澀谷',4,'urban-mall',['dir-src-miyashita'],{nearestStation:'澀谷站',routeSegments:['MIYASHITA_PARK']}),
    venue('v-shibuya109','SHIBUYA109','澀谷',4,'urban-mall',['dir-src-109'],{nearestStation:'澀谷站',routeSegments:['SHIBUYA_CENTER']}),
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
    priceLevel:price,pricePosition:extras.pricePosition || ({1:'BUDGET',2:'AFFORDABLE',3:'MID',4:'PREMIUM'}[price]),
    fashionCategories:extras.fashionCategories || [],shoppingIntent:extras.shoppingIntent || [],ageStyle:extras.ageStyle || [],fashionAudience:extras.fashionAudience || [],
    bestFor:extras.bestFor || [],notIdealFor:extras.notIdealFor || [],whyGo:extras.whyGo || '',skipIf:extras.skipIf || '',japanValue,trend,trendStatus:trend,
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
    B('b-kicks-lab','KICKS LAB.','SNEAKERS',['SNEAKER','STREETWEAR'],['UNISEX','YOUNG_ADULT','COLLECTOR'],3,'HIGH','NICHE',{officialUrl:'https://www.kickslab.com/pages/shop',sourceIds:['dir-src-kicks-lab']}),
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
    B('b-salomon','SALOMON','SPORTS',['OUTDOOR','TECHWEAR','SNEAKER'],['MEN','WOMEN','UNISEX'],3,'MEDIUM','TRENDING_2026',{japaneseBrand:false,originCountry:'France'}),
    B('b-acdcrag','ACDC RAG','FASHION',['HARAJUKU','KAWAII','Y2K'],['MEN','WOMEN','UNISEX','TEEN','YOUNG_ADULT'],2,'VERY_HIGH','REVIVAL',{fashionCategories:['HARAJUKU_FASHION','KAWAII','ACCESSORIES'],shoppingIntent:['CHEAP_TREND','TREND_HUNTING','JAPANESE_FASHION'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED','VALUE_FOCUSED'],whyGo:'原宿系圖案、配件與平價造型一次看。',skipIf:'只找低調基本款或成熟設計師服飾。',officialUrl:'https://acdcrag.com/',sourceIds:['dir-src-acdcrag','dir-src-fashion-snap26']}),
    B('b-angelic-pretty','Angelic Pretty','FASHION',['HARAJUKU','KAWAII'],['WOMEN','TEEN','YOUNG_ADULT','COLLECTOR'],3,'VERY_HIGH','EVERGREEN',{fashionCategories:['HARAJUKU_FASHION','KAWAII','ACCESSORIES'],shoppingIntent:['JAPANESE_FASHION','TREND_HUNTING'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],whyGo:'代表性的日本 Lolita／Kawaii 品牌與完整造型。',skipIf:'不穿甜美原宿系或只找中性日常服。',officialUrl:'https://angelicpretty.com/',sourceIds:['dir-src-angelic-laforet']}),
    B('b-hm','H&M','FASHION',['BASIC','CASUAL','Y2K'],['MEN','WOMEN','UNISEX','TEEN','YOUNG_ADULT'],1,'LOW','TRENDING',{japaneseBrand:false,originCountry:'Sweden',fashionCategories:['YOUTH_FAST_FASHION','BASICS','CASUAL'],shoppingIntent:['CHEAP_TREND','EVERYDAY_BASIC'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT','ALL_AGES'],fashionAudience:['VALUE_FOCUSED','CASUAL_SHOPPER'],whyGo:'快速補齊平價流行與基本款。',skipIf:'希望買日本品牌或日本限定設計。',officialUrl:'https://www2.hm.com/ja_jp/',sourceIds:['dir-src-hm']}),
    B('b-zara','ZARA','FASHION',['CONTEMPORARY','CASUAL','MODE'],['MEN','WOMEN','YOUNG_ADULT','ADULT'],2,'LOW','TRENDING',{japaneseBrand:false,originCountry:'Spain',fashionCategories:['YOUTH_FAST_FASHION','CASUAL'],shoppingIntent:['TREND_HUNTING','EVERYDAY_BASIC'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['TREND_FOCUSED','CASUAL_SHOPPER'],whyGo:'在澀谷快速查看當季都會輪廓。',skipIf:'這趟只想買日本品牌。',officialUrl:'https://www.zara.com/jp/',sourceIds:['dir-src-zara']}),
    B('b-ragtag','RAGTAG','VINTAGE',['VINTAGE','MODE','JAPANESE_DESIGNER'],['MEN','WOMEN','UNISEX','YOUNG_ADULT','ADULT','COLLECTOR'],3,'VERY_HIGH','REVIVAL',{fashionCategories:['SECONDHAND','VINTAGE','JAPANESE_DESIGNER'],shoppingIntent:['VINTAGE_HUNT','DESIGNER_DISCOVERY','JAPANESE_FASHION'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','VALUE_FOCUSED','COLLECTOR'],whyGo:'同時比較日本設計師、街頭與精品二手單品。',skipIf:'只接受全新品或沒有時間翻找。',officialUrl:'https://www.ragtag.jp/',sourceIds:['dir-src-ragtag','dir-src-fashion-snap26']}),
    B('b-2ndstreet','2nd STREET','VINTAGE',['VINTAGE','CASUAL','STREETWEAR'],['MEN','WOMEN','UNISEX','TEEN','YOUNG_ADULT','ADULT'],2,'HIGH','REVIVAL',{fashionCategories:['SECONDHAND','VINTAGE','CASUAL'],shoppingIntent:['VINTAGE_HUNT','CHEAP_TREND'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['VALUE_FOCUSED','TREND_FOCUSED','CASUAL_SHOPPER'],whyGo:'在大型二手旗艦用較寬的預算帶搜尋日常與街頭古著。',skipIf:'只找特定高端設計師收藏。',officialUrl:'https://www.2ndstreet.jp/',sourceIds:['dir-src-2ndstreet','dir-src-timeout-select26']}),
    B('b-stussy','Stüssy','STREETWEAR',['STREETWEAR','AMERICAN_CASUAL','HYPE'],['MEN','WOMEN','UNISEX','YOUNG_ADULT','COLLECTOR'],3,'MEDIUM','HYPE',{japaneseBrand:false,originCountry:'United States',fashionCategories:['STREETWEAR'],shoppingIntent:['STREETWEAR','FLAGSHIP_EXPERIENCE'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR','TREND_FOCUSED'],whyGo:'原宿 Chapter 的街頭文化與店舖體驗。',skipIf:'期待特定庫存、限定款或不想排隊。',officialUrl:'https://www.stussy.com/',sourceIds:['dir-src-stussy','dir-src-reddit-stussy26']}),
    B('b-supreme','Supreme','STREETWEAR',['STREETWEAR','HYPE'],['MEN','WOMEN','UNISEX','YOUNG_ADULT','COLLECTOR'],4,'MEDIUM','HYPE',{japaneseBrand:false,originCountry:'United States',fashionCategories:['STREETWEAR'],shoppingIntent:['STREETWEAR','FLAGSHIP_EXPERIENCE'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR'],whyGo:'具代表性的原宿 Hype streetwear 節點。',skipIf:'預算偏低或不追品牌發售文化。',officialUrl:'https://supreme.com/',sourceIds:['dir-src-supreme']}),
    B('b-xlarge','XLARGE','STREETWEAR',['STREETWEAR','AMERICAN_CASUAL'],['MEN','WOMEN','UNISEX','TEEN','YOUNG_ADULT'],3,'VERY_HIGH','EVERGREEN',{fashionCategories:['STREETWEAR','CASUAL'],shoppingIntent:['STREETWEAR','JAPANESE_FASHION'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT'],fashionAudience:['BRAND_FOCUSED','CASUAL_SHOPPER'],whyGo:'日本街頭品牌、圖像 T 恤與日常休閒較容易入手。',skipIf:'主要找前衛設計師剪裁。',officialUrl:'https://xlarge.jp/',sourceIds:['dir-src-xlarge']})
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
    ['v-takeshita-street',['b-wego','b-acdcrag','b-hm']],
    ['v-jingumae-fashion',['b-acdcrag','b-2ndstreet','b-stussy','b-supreme','b-xlarge','b-asics']],
    ['v-laforet',['b-angelic-pretty']],
    ['v-harakado',['b-porter','b-muji','b-nakagawa']],
    ['v-omokado',['b-tomorrowland','b-urban-research','b-american-eagle']],
    ['v-omotesando-hills',['b-yohji','b-goldwin','b-jins','b-porter']],
    ['v-atcosme',['b-atcosme']],
    ['v-cat-street',['b-bape','b-neighborhood','b-wtaps','b-carhartt-wip','b-new-balance','b-atmos','b-journal-standard','b-pulp','b-north-face','b-nike','b-adidas','b-salomon','b-ragtag']],
    ['v-omotesando-aoyama',['b-sacai','b-atmos','b-onitsuka','b-issey']],
    ['v-shibuya-center',['b-atmos','b-zara','b-hm']],
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

  const fashionDefaults = {
    FASHION:['CASUAL'],SELECT_SHOP:['SELECT_SHOP'],DESIGNER:['JAPANESE_DESIGNER'],STREETWEAR:['STREETWEAR'],
    SNEAKERS:['SNEAKERS'],SPORTS:['SPORTS_FASHION'],LUXURY:['LUXURY'],VINTAGE:['VINTAGE'],TRAVEL:['BAGS']
  };
  const d4BrandProfiles = {
    'b-wego':{fashionCategories:['YOUTH_FAST_FASHION','HARAJUKU_FASHION'],styleTags:['HARAJUKU','STREETWEAR','Y2K','UNISEX'],shoppingIntent:['CHEAP_TREND','TREND_HUNTING'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED','VALUE_FOCUSED'],pricePosition:'BUDGET',whyGo:'青年平價、快速看當季日系流行。',skipIf:'主要找高品質日本設計師品牌。',sourceIds:['dir-src-wego','dir-src-wego-summer26']},
    'b-spinns':{fashionCategories:['YOUTH_FAST_FASHION','HARAJUKU_FASHION'],styleTags:['HARAJUKU','KAWAII','Y2K'],shoppingIntent:['CHEAP_TREND','TREND_HUNTING'],ageStyle:['TEEN','COLLEGE'],fashionAudience:['TREND_FOCUSED','VALUE_FOCUSED'],pricePosition:'BUDGET',whyGo:'SHIBUYA109 內快速看青年原宿系與配件。',skipIf:'想找成熟剪裁或設計師服飾。',sourceIds:['dir-src-spinns-109']},
    'b-hare':{fashionCategories:['CASUAL','JAPANESE_DESIGNER'],styleTags:['MINIMAL','STREETWEAR','MODE'],shoppingIntent:['JAPANESE_FASHION','TREND_HUNTING'],ageStyle:['COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED','DESIGN_FOCUSED'],pricePosition:'AFFORDABLE'},
    'b-lowrys-farm':{fashionCategories:['YOUTH_FAST_FASHION','CASUAL'],shoppingIntent:['CHEAP_TREND','EVERYDAY_BASIC'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT'],fashionAudience:['VALUE_FOCUSED','CASUAL_SHOPPER'],pricePosition:'AFFORDABLE'},
    'b-rageblue':{fashionCategories:['YOUTH_FAST_FASHION','CASUAL'],shoppingIntent:['CHEAP_TREND','STREETWEAR'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT'],fashionAudience:['VALUE_FOCUSED','TREND_FOCUSED'],pricePosition:'AFFORDABLE'},
    'b-sly':{fashionCategories:['YOUTH_FAST_FASHION','CASUAL'],styleTags:['STREETWEAR','Y2K','MODE'],shoppingIntent:['TREND_HUNTING'],ageStyle:['COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED'],pricePosition:'AFFORDABLE'},
    'b-moussy':{fashionCategories:['CASUAL','YOUTH_FAST_FASHION'],styleTags:['CONTEMPORARY','CASUAL','MODE'],shoppingIntent:['TREND_HUNTING','EVERYDAY_BASIC'],ageStyle:['COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED','CASUAL_SHOPPER'],pricePosition:'AFFORDABLE'},
    'b-beams':{fashionCategories:['SELECT_SHOP','CASUAL'],shoppingIntent:['JAPANESE_FASHION','DESIGNER_DISCOVERY'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID'},
    'b-united-arrows':{fashionCategories:['SELECT_SHOP'],shoppingIntent:['JAPANESE_FASHION','DESIGNER_DISCOVERY'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED'],pricePosition:'MID'},
    'b-beauty-youth':{fashionCategories:['SELECT_SHOP','CASUAL'],shoppingIntent:['JAPANESE_FASHION','TREND_HUNTING'],ageStyle:['COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED','DESIGN_FOCUSED'],pricePosition:'MID'},
    'b-journal-standard':{fashionCategories:['SELECT_SHOP','CASUAL'],shoppingIntent:['JAPANESE_FASHION','TREND_HUNTING'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID'},
    'b-pulp':{fashionCategories:['SELECT_SHOP','STREETWEAR'],shoppingIntent:['STREETWEAR','DESIGNER_DISCOVERY'],ageStyle:['COLLEGE','YOUNG_ADULT'],fashionAudience:['TREND_FOCUSED','DESIGN_FOCUSED'],pricePosition:'MID'},
    'b-tomorrowland':{fashionCategories:['SELECT_SHOP','LUXURY'],shoppingIntent:['DESIGNER_DISCOVERY'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','BRAND_FOCUSED'],pricePosition:'PREMIUM'},
    'b-issey':{fashionCategories:['JAPANESE_DESIGNER','LUXURY'],shoppingIntent:['DESIGNER_DISCOVERY','JAPANESE_FASHION','FLAGSHIP_EXPERIENCE'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],pricePosition:'LUXURY',whyGo:'日本設計師品牌與服裝結構的代表性體驗。',skipIf:'預算只在 ¥／¥¥。'},
    'b-yohji':{fashionCategories:['JAPANESE_DESIGNER','LUXURY'],shoppingIntent:['DESIGNER_DISCOVERY','JAPANESE_FASHION'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],pricePosition:'LUXURY'},
    'b-sacai':{fashionCategories:['JAPANESE_DESIGNER','LUXURY'],shoppingIntent:['DESIGNER_DISCOVERY','FLAGSHIP_EXPERIENCE','JAPANESE_FASHION'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],pricePosition:'LUXURY',whyGo:'青山旗艦可直接理解 sacai 的混種剪裁與品牌世界。',skipIf:'只想快速買平價日常服。',sourceIds:['dir-src-sacai']},
    'b-undercover':{fashionCategories:['JAPANESE_DESIGNER','STREETWEAR'],shoppingIntent:['DESIGNER_DISCOVERY','STREETWEAR'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],pricePosition:'LUXURY'},
    'b-comme-des-garcons':{fashionCategories:['JAPANESE_DESIGNER','LUXURY'],shoppingIntent:['DESIGNER_DISCOVERY','JAPANESE_FASHION'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],pricePosition:'LUXURY'},
    'b-mihara':{fashionCategories:['JAPANESE_DESIGNER','SNEAKERS'],shoppingIntent:['DESIGNER_DISCOVERY','SNEAKER_HUNT'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['DESIGN_FOCUSED','COLLECTOR'],pricePosition:'LUXURY'},
    'b-human-made':{fashionCategories:['STREETWEAR'],shoppingIntent:['STREETWEAR','JAPANESE_FASHION'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR'],pricePosition:'PREMIUM',whyGo:'日本 Streetwear／Hype 品牌與明確品牌語彙。',skipIf:'只想找便宜日常服。'},
    'b-bape':{fashionCategories:['STREETWEAR'],shoppingIntent:['STREETWEAR','FLAGSHIP_EXPERIENCE'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR'],pricePosition:'PREMIUM'},
    'b-neighborhood':{fashionCategories:['STREETWEAR'],styleTags:['STREETWEAR','AMERICAN_CASUAL','WORKWEAR'],shoppingIntent:['STREETWEAR','JAPANESE_FASHION'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR'],pricePosition:'PREMIUM'},
    'b-wtaps':{fashionCategories:['STREETWEAR'],styleTags:['STREETWEAR','AMERICAN_CASUAL','WORKWEAR'],shoppingIntent:['STREETWEAR','JAPANESE_FASHION'],ageStyle:['YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR'],pricePosition:'PREMIUM'},
    'b-carhartt-wip':{fashionCategories:['STREETWEAR','CASUAL'],styleTags:['STREETWEAR','AMERICAN_CASUAL','WORKWEAR'],shoppingIntent:['STREETWEAR'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID'},
    'b-atmos':{fashionCategories:['SNEAKERS','STREETWEAR'],shoppingIntent:['SNEAKER_HUNT','JAPANESE_FASHION'],ageStyle:['TEEN','COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['TREND_FOCUSED','COLLECTOR'],pricePosition:'MID',whyGo:'日本球鞋選貨與聯名文化，D4 有多個順路分店。',skipIf:'只找最低價基本鞋款。',sourceIds:['dir-src-atmos','dir-src-atmos-pink26']},
    'b-new-balance':{fashionCategories:['SNEAKERS','SPORTS_FASHION'],shoppingIntent:['SNEAKER_HUNT','FLAGSHIP_EXPERIENCE'],ageStyle:['ALL_AGES'],fashionAudience:['BRAND_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID'},
    'b-nike':{fashionCategories:['SNEAKERS','SPORTS_FASHION'],shoppingIntent:['SNEAKER_HUNT','FLAGSHIP_EXPERIENCE'],ageStyle:['ALL_AGES'],fashionAudience:['BRAND_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID'},
    'b-adidas':{fashionCategories:['SNEAKERS','SPORTS_FASHION'],shoppingIntent:['SNEAKER_HUNT','FLAGSHIP_EXPERIENCE'],ageStyle:['ALL_AGES'],fashionAudience:['BRAND_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID',sourceIds:['dir-src-adidas']},
    'b-onitsuka':{fashionCategories:['SNEAKERS','LIFESTYLE_FASHION'],shoppingIntent:['SNEAKER_HUNT','JAPANESE_FASHION','FLAGSHIP_EXPERIENCE'],ageStyle:['ALL_AGES'],fashionAudience:['DESIGN_FOCUSED','BRAND_FOCUSED'],pricePosition:'MID'},
    'b-asics':{fashionCategories:['SNEAKERS','SPORTS_FASHION'],shoppingIntent:['SNEAKER_HUNT','FLAGSHIP_EXPERIENCE'],ageStyle:['ALL_AGES'],fashionAudience:['CASUAL_SHOPPER','BRAND_FOCUSED'],pricePosition:'AFFORDABLE'},
    'b-porter':{fashionCategories:['BAGS','ACCESSORIES'],shoppingIntent:['ACCESSORIES','JAPANESE_FASHION'],ageStyle:['ALL_AGES'],fashionAudience:['DESIGN_FOCUSED','CASUAL_SHOPPER'],pricePosition:'MID'},
    'b-kith':{fashionCategories:['STREETWEAR','SNEAKERS'],shoppingIntent:['STREETWEAR','SNEAKER_HUNT'],ageStyle:['COLLEGE','YOUNG_ADULT','ADULT'],fashionAudience:['BRAND_FOCUSED','COLLECTOR'],pricePosition:'PREMIUM'}
  };
  shoppingBrands.forEach(item => {
    if (!item.fashionCategories.length && fashionDefaults[item.primaryCategory]) item.fashionCategories = fashionDefaults[item.primaryCategory];
    const profile = d4BrandProfiles[item.id];
    if (profile) Object.assign(item,profile);
    item.styleTags = [...new Set(item.styleTags || item.styles || [])];
    item.styles = item.styleTags;
    item.shoppingIntent = item.shoppingIntent || [];
    item.ageStyle = item.ageStyle?.length ? item.ageStyle : (item.targetAudience.includes('TEEN')?['TEEN']:(item.targetAudience.includes('ADULT')?['ADULT']:['ALL_AGES']));
    item.fashionAudience = item.fashionAudience?.length ? item.fashionAudience : ['CASUAL_SHOPPER'];
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
      branchFormat,routeSegments:v?.routeSegments || [],d4Priority:(v?.tripDays || []).includes(4)?1:3,suggestedVisitTime:'NORMAL',
      branchStrengths:['ON_ROUTE',v?.rainyDay?'INDOOR':'OPEN_AIR'],exclusivePotential:'CHECK',flagship:false,
      whyGo:b?.whyGo || b?.summary || '依品牌定位與本次路線判斷是否入店。',bestFor:b?.bestFor || [],skipIf:b?.skipIf || b?.notIdealFor?.join('；') || '',
      storeSize:['v-beams-japan','v-animate-ikebukuro','v-atcosme'].includes(venueId)?'FLAGSHIP_SCALE':'UNKNOWN',
      branchExclusivePotential:['OFFICIAL_STORE','FLAGSHIP'].includes(branchFormat)?'HIGH':'CHECK',
      openingHours:'CHECK OFFICIAL GUIDE',
      mapUrl:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((b?.name || brandId)+' '+(v?.name || venueId))}`,
      officialUrl:b?.officialUrl || v?.officialUrl || '',sourceIds:evidence || v?.sourceIds || [],lastVerified:verifiedAt,
      needsVerification:!evidence,displayOrder:index
    };
  }));

  const d4BranchOverrides = {
    'br-takeshita-street-wego':{name:'WEGO 1.3.5 Harajuku',address:'東京都渋谷区神宮前1-8-2 SoLaDo竹下通り B1F',openingHours:'10:30–20:00',sourceIds:['dir-src-wego','dir-src-wego-summer26'],currentStatus:'OPEN',status:'OPEN',branchFormat:'IN_VENUE',d4Priority:0,suggestedVisitTime:'QUICK',taxFree:'AVAILABLE',needsVerification:false},
    'br-takeshita-street-acdcrag':{name:'ACDC RAG Harajuku Main',address:'東京都渋谷区神宮前1-16-7',openingHours:'11:00–19:00',sourceIds:['dir-src-acdcrag'],currentStatus:'OPEN',status:'OPEN',branchFormat:'STREET_STORE',d4Priority:0,suggestedVisitTime:'QUICK',needsVerification:false},
    'br-takeshita-street-hm':{name:'H&M WITH HARAJUKU',address:'東京都渋谷区神宮前1丁目14-30',openingHours:'CHECK OFFICIAL STORE LOCATOR',sourceIds:['dir-src-hm'],currentStatus:'OPEN',status:'OPEN',branchFormat:'LARGE_STORE',d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-jingumae-fashion-acdcrag':{name:'ACDC RAG Wharf Harajuku',address:'東京都渋谷区神宮前1-9-1 2F',openingHours:'11:00–19:00',sourceIds:['dir-src-acdcrag'],currentStatus:'OPEN',status:'OPEN',branchFormat:'STREET_STORE',d4Priority:1,suggestedVisitTime:'QUICK',needsVerification:false},
    'br-jingumae-fashion-2ndstreet':{name:'2nd STREET Harajuku',address:'東京都渋谷区神宮前4-26-4',openingHours:'11:00–21:00',sourceIds:['dir-src-2ndstreet'],currentStatus:'OPEN',status:'OPEN',branchFormat:'FLAGSHIP',flagship:true,storeSize:'FLAGSHIP_SCALE',d4Priority:0,suggestedVisitTime:'DEEP',taxFree:'AVAILABLE',needsVerification:false},
    'br-jingumae-fashion-stussy':{name:'Stüssy Harajuku Chapter',address:'東京都渋谷区神宮前4-28-2',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-stussy','dir-src-reddit-stussy26'],currentStatus:'OPEN',status:'OPEN',branchFormat:'CHAPTER_STORE',flagship:true,d4Priority:1,suggestedVisitTime:'QUICK',needsVerification:false},
    'br-jingumae-fashion-supreme':{name:'Supreme Harajuku',address:'東京都渋谷区神宮前4丁目32-7',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-supreme'],currentStatus:'OPEN',status:'OPEN',branchFormat:'STREET_STORE',d4Priority:1,suggestedVisitTime:'QUICK',needsVerification:false},
    'br-jingumae-fashion-xlarge':{name:'XLARGE Harajuku',address:'東京都渋谷区神宮前4丁目25-29',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-xlarge'],currentStatus:'OPEN',status:'OPEN',branchFormat:'STREET_STORE',d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-jingumae-fashion-asics':{name:'ASICS Harajuku Flagship',address:'東京都渋谷区神宮前1-5-8',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-takeshita'],currentStatus:'OPEN',status:'OPEN',branchFormat:'FLAGSHIP',flagship:true,d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-laforet-angelic-pretty':{name:'Angelic Pretty Laforet Harajuku',floor:'B1.5F',address:'東京都渋谷区神宮前1-11-6',openingHours:'CHECK LAFORet OFFICIAL',sourceIds:['dir-src-angelic-laforet'],currentStatus:'OPEN',status:'OPEN',d4Priority:1,suggestedVisitTime:'QUICK',taxFree:'AVAILABLE',needsVerification:false},
    'br-cat-street-ragtag':{name:'RAGTAG Harajuku',address:'東京都渋谷区神宮前5-17-9 1F・2F',openingHours:'11:00–20:00',sourceIds:['dir-src-ragtag'],currentStatus:'OPEN',status:'OPEN',branchFormat:'LARGE_STORE',d4Priority:0,suggestedVisitTime:'DEEP',needsVerification:false},
    'br-cat-street-atmos':{name:'atmos pink flagship Harajuku',address:'東京都渋谷区神宮前6-5-3',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-atmos','dir-src-atmos-pink26'],currentStatus:'OPEN',status:'OPEN',branchFormat:'FLAGSHIP',flagship:true,d4Priority:0,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-cat-street-adidas':{name:'adidas Originals Flagship Store Tokyo',address:'東京都渋谷区神宮前5-17-4 B1F–2F',openingHours:'11:00–20:00',sourceIds:['dir-src-adidas'],currentStatus:'OPEN',status:'OPEN',branchFormat:'FLAGSHIP',flagship:true,d4Priority:0,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-omotesando-aoyama-sacai':{name:'sacai Aoyama',address:'東京都港区南青山5-4-44 1F・2F',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-sacai'],currentStatus:'OPEN',status:'OPEN',branchFormat:'FLAGSHIP',flagship:true,d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-omotesando-aoyama-atmos':{name:'atmos BLUE Omotesando',address:'東京都渋谷区神宮前4丁目29-4',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-atmos'],currentStatus:'OPEN',status:'OPEN',branchFormat:'STREET_STORE',d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-shibuya-center-atmos':{name:'atmos Shibuya',address:'東京都渋谷区宇田川町31-8',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-atmos'],currentStatus:'OPEN',status:'OPEN',branchFormat:'STREET_STORE',d4Priority:0,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-shibuya-center-zara':{name:'ZARA Shibuya',address:'東京都渋谷区宇田川町25-10',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-zara'],currentStatus:'OPEN',status:'OPEN',branchFormat:'LARGE_STORE',d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-shibuya-center-hm':{name:'H&M Shibuya',address:'東京都渋谷区宇田川町33-6',openingHours:'CHECK OFFICIAL',sourceIds:['dir-src-hm'],currentStatus:'OPEN',status:'OPEN',branchFormat:'LARGE_STORE',d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false},
    'br-shibuya109-spinns':{sourceIds:['dir-src-spinns-109'],currentStatus:'OPEN',status:'OPEN',d4Priority:1,suggestedVisitTime:'NORMAL',needsVerification:false}
  };
  shoppingBranches.forEach(branch => {
    const override = d4BranchOverrides[branch.id];
    if (override) Object.assign(branch,override);
    if (branch.tripDays.includes(4)) {
      if (!override && ['v-harakado','v-omokado','v-omotesando-hills','v-scramble','v-hikarie'].includes(branch.venueId)) branch.d4Priority = 2;
      branch.routeSegments = [...new Set(branch.routeSegments || [])];
      branch.bestFor = branch.bestFor?.length ? branch.bestFor : (brandById.get(branch.brandId)?.shoppingIntent || []);
      branch.whyGo = branch.whyGo || brandById.get(branch.brandId)?.whyGo || '';
      branch.skipIf = branch.skipIf || brandById.get(branch.brandId)?.skipIf || '';
    }
  });

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
    4:['v-takeshita-street','v-jingumae-fashion','v-laforet','v-atcosme','v-cat-street','v-omotesando-aoyama','v-shibuya-center','v-shibuya-parco','v-scramble','v-miyashita'],
    5:['v-sogo-yokohama','v-landmark','v-markis-mm','v-world-porters','v-redbrick'],
    6:['v-asakusa-rox','v-ekimise','v-ameyoko','v-matsuzakaya-ueno','v-parcoya']
  });

  window.TokyoShoppingDirectory = {
    verifiedAt,shoppingTaxonomy,directorySources,shoppingVenues,shoppingBrands,shoppingBranches,brandAliases,routePriority,
    meta:{schemaVersion:2,recordCounts:{venues:shoppingVenues.length,brands:shoppingBrands.length,branches:shoppingBranches.length},officialFirst:true,d4FashionV2:true}
  };
})();
