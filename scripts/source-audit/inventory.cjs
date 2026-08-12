const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..', '..');
const guide = path.join(root, '旅遊指南');
const assets = path.join(guide, 'assets');
const out = path.join(root, 'data', 'research');
const now = '2026-08-12';

const hash = value => crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 16);
const canonicalUrl = value => {
  try {
    const url = new URL(value);
    url.hash = '';
    ['utm_source','utm_medium','utm_campaign','fbclid','gclid'].forEach(key => url.searchParams.delete(key));
    url.hostname = url.hostname.toLowerCase();
    return url.toString().replace(/\/$/, '');
  } catch { return value; }
};
const claimType = text => {
  const s = String(text);
  if (/¥|NT\$|價格|價差|price/i.test(s)) return 'PRICE';
  if (/營業|時間|hours|open/i.test(s)) return 'OPENING_HOURS';
  if (/限定|limited|季節|夏詣|御守|御朱印/i.test(s)) return 'LIMITED_STATUS';
  if (/活動|祭|花火|event|collab/i.test(s)) return 'EVENT_DATE';
  if (/排隊|人潮|擁擠|混雑|行列|queue/i.test(s)) return 'QUEUE';
  if (/拍|攝影|角度|構圖|photo/i.test(s)) return 'PHOTO_TIP';
  if (/雨|強風|關閉|weather|rain/i.test(s)) return 'RAIN_ACCESS';
  if (/取景|場景|作品|anime|drama|film/i.test(s)) return 'FILMING_LOCATION';
  return 'TRAVELER_RECOMMENDATION';
};
const volatility = type => ['STOCK','PRICE','OPENING_HOURS','STORE_STATUS','LIMITED_STATUS','EVENT_DATE','RAIN_ACCESS'].includes(type) ? 'HIGH' : ['QUEUE','SOCIAL_POPULARITY','FOOD_RECOMMENDATION','PHOTO_TIP'].includes(type) ? 'MEDIUM' : 'LOW';
const claims = [], sources = new Map();
function addSource(raw, context = {}) {
  if (!raw) return null;
  const obj = Array.isArray(raw) ? { title:raw[0], url:raw[1], kind:raw[2] } : raw;
  const url = obj.url || obj.canonicalUrl || obj.officialUrl;
  if (!url || !/^https?:/i.test(url)) return obj.id || null;
  const canonical = canonicalUrl(url);
  const id = obj.id || `src-${hash(canonical)}`;
  if (!sources.has(id)) sources.set(id, {
    sourceId:id, title:obj.title || obj.name || context.title || id, url, canonicalUrl:canonical,
    kind:obj.kind || obj.type || context.kind || 'UNCLASSIFIED', platform:obj.platform || context.platform || null,
    sourceAccessible:obj.sourceAccessible !== false, evidenceType:obj.evidenceType || null,
    sourceStatus:'UNAUDITED', currentClaimIds:[], firstSeenIn:context.file || null
  });
  return id;
}
function addClaim(entityType, entityId, text, sourceIds = [], extra = {}) {
  if (!text) return;
  const type = extra.claimType || claimType(text);
  const id = `claim-${hash([entityType,entityId,type,text].join('|'))}`;
  const validSources = [...new Set(sourceIds.filter(Boolean))];
  const claim = {claimId:id,entityType,entityId,claimType:type,claimText:String(text).slice(0,800),currentSourceIds:validSources,currentConfidence:extra.confidence || (validSources.length ? 'UNREVIEWED' : 'UNSUPPORTED'),dateSensitive:extra.dateSensitive ?? volatility(type)==='HIGH',volatility:extra.volatility || volatility(type),userFacing:extra.userFacing !== false,needsVerification:extra.needsVerification ?? !validSources.length};
  claims.push(claim);
  validSources.forEach(sourceId => sources.get(sourceId)?.currentClaimIds.push(id));
}
function evaluate(file, transform = value => value, seed = {}) {
  const code = transform(fs.readFileSync(path.join(assets,file),'utf8'));
  const window = {...seed};
  const noop = () => {};
  const document = {getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:noop,createElement:()=>({setAttribute:noop,before:noop,after:noop})};
  const context = {window,document,console,location:{search:'',href:'http://localhost/'},history:{replaceState:noop},localStorage:{getItem:()=>null,setItem:noop},URL,URLSearchParams,setTimeout,clearTimeout};
  vm.createContext(context); vm.runInContext(code,context,{filename:file}); return window;
}

const spots = evaluate('spots-data.js').TRIP_SPOTS;
Object.entries(spots).forEach(([id, spot]) => {
  const formal = (spot.sources || []).map(item => addSource(item,{file:'spots-data.js',kind:item[2],title:item[0]}));
  addClaim('DESTINATION',id,spot.desc,formal,{claimType:'TRAVELER_RECOMMENDATION'});
  (spot.flow || []).forEach(text => addClaim('DESTINATION',id,text,formal,{claimType:'ROUTE_ORDER'}));
  (spot.photos || []).forEach(([place,text]) => addClaim('DESTINATION',id,`${place}：${text}`,formal,{claimType:'PHOTO_TIP'}));
  (spot.social || []).forEach(item => { const sid=addSource({title:item[1],url:item[3],kind:'SOCIAL',platform:item[0]},{file:'spots-data.js'}); addClaim('DESTINATION',id,`${item[1]}：${item[2]}`,[sid],{claimType:'TRAVELER_RECOMMENDATION',confidence:'SOCIAL_ONLY'}); });
});

const special = evaluate('special-items-data.js').TokyoSpecialItems;
const specialSourceIds = new Map((special.sources||[]).map(source => [source.id,addSource(source,{file:'special-items-data.js'})]));
(special.items||[]).forEach(item => {
  const ids=(item.sourceIds||[]).map(id=>specialSourceIds.get(id)).filter(Boolean);
  addClaim('SEASONAL',item.id,`${item.nameZh}｜${item.startDate||'未公布'}–${item.endDate||'未公布'}｜${item.tripDateOverlap}`,ids,{claimType:item.category==='OMAMORI'?'SEASONAL_ITEM':'LIMITED_STATUS',needsVerification:item.needsVerification,dateSensitive:true});
  addClaim('SEASONAL',item.id,item.whyLookForIt,ids,{claimType:'TRAVELER_RECOMMENDATION',needsVerification:item.needsVerification});
  addClaim('SEASONAL',item.id,item.watchOut,ids,{claimType:'TRAVELER_WARNING',needsVerification:item.needsVerification});
});

const shopping = evaluate('shopping-v3-data.js').TokyoShoppingV3;
const shoppingSourceIds = new Map((shopping.sources||[]).map(source => [source.id,addSource(source,{file:'shopping-v3-data.js'})]));
(shopping.products||[]).forEach(product => {
  const ids=[product.officialJapanSource,product.officialTaiwanSource,...(product.socialSourceIds||[])].map(id=>shoppingSourceIds.get(id)).filter(Boolean);
  addClaim('PRODUCT',product.id,`${product.nameZh} 日本價 ${product.japanPrice ?? '待確認'}；台灣價 ${product.taiwanOfficialPrice ?? '待確認'}`,ids,{claimType:'PRICE',needsVerification:product.needsVerification});
  addClaim('PRODUCT',product.id,product.whyBuy,ids,{claimType:'TRAVELER_RECOMMENDATION',needsVerification:product.needsVerification});
  addClaim('PRODUCT',product.id,product.whySkip,ids,{claimType:'TRAVELER_WARNING',needsVerification:product.needsVerification});
  if(product.exclusiveType!=='NONE') addClaim('PRODUCT',product.id,`${product.exclusiveType}｜${product.availability}`,ids,{claimType:'LIMITED_STATUS',needsVerification:true});
});

const directory = evaluate('shopping-directory-data.js').TokyoShoppingDirectory;
const directorySourceIds = new Map((directory.directorySources||[]).map(source => [source.id,addSource(source,{file:'shopping-directory-data.js'})]));
for (const [type, list] of [['VENUE',directory.shoppingVenues],['BRAND',directory.shoppingBrands],['BRANCH',directory.shoppingBranches]]) (list||[]).forEach(item => {
  const ids=(item.sourceIds||item.sources||[]).map(id=>typeof id==='string'?directorySourceIds.get(id):addSource(id,{file:'shopping-directory-data.js'})).filter(Boolean);
  addClaim(type,item.id,item.description||item.routeNote||item.whyVisit||item.nameZh||item.name,ids,{claimType:type==='BRANCH'?'BRANCH_EXISTENCE':'PRODUCT_EXISTENCE'});
});

const screen = evaluate('screen-locations-data.js').TokyoScreenData;
const screenSourceIds = new Map((screen.screenSources||[]).map(source => [source.id,addSource(source,{file:'screen-locations-data.js'})]));
(screen.screenAppearances||[]).forEach(item => {
  const ids=(item.sourceIds||[]).map(id=>screenSourceIds.get(id)).filter(Boolean);
  addClaim('SCREEN_APPEARANCE',item.id,`${item.workId}｜${item.locationId}｜${item.evidenceType||item.evidenceLevel||'未標示'}`,ids,{claimType:item.type==='ANIME'?'ANIME_MODEL':'FILMING_LOCATION',confidence:item.confidence||item.evidenceLevel,needsVerification:!ids.length||/REFERENCE|COMMUNITY/.test(item.evidenceType||item.evidenceLevel||'')});
});

const restaurantWindow = evaluate('restaurants.js', code => code.replace('const restaurants = [','window.__restaurants = [').replace('const localFoods = [','window.__localFoods = ['));
(restaurantWindow.__restaurants||[]).forEach(item => {
  const ids=[addSource({title:`${item.name} official`,url:item.official,kind:'OFFICIAL'},{file:'restaurants.js'}),...(item.sources||[]).map(source=>addSource(source,{file:'restaurants.js'}))].filter(Boolean);
  addClaim('RESTAURANT',item.id,`${item.status}｜${item.meal}｜${item.time||'彈性'}｜${item.name}`,ids,{claimType:item.status==='RESERVED'?'RESERVATION_STATUS':'STORE_STATUS',dateSensitive:true});
  (item.menu||[]).forEach(([name,price])=>addClaim('RESTAURANT',item.id,`${name} ${price}`,ids,{claimType:'PRICE',dateSensitive:true}));
  if(item.queue) addClaim('RESTAURANT',item.id,item.queue,ids,{claimType:'QUEUE',needsVerification:true});
});

for(let day=1;day<=6;day++){
  const html=fs.readFileSync(path.join(guide,`day${day}.html`),'utf8');
  const times=[...html.matchAll(/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/g)].map(match=>match[0]);
  addClaim('TRIP',`day${day}`,`Word-derived displayed times: ${[...new Set(times)].join(', ')}`,[],{claimType:'TRIP_TIME',currentConfidence:'WORD_SOURCE_OF_TRUTH',needsVerification:false});
}

const sourceList=[...sources.values()];
const canonicalGroups=Object.values(sourceList.reduce((acc,item)=>((acc[item.canonicalUrl]??=[]).push(item.sourceId),acc),{})).filter(group=>group.length>1);
const report={generatedAt:now,claims:claims.length,sources:sourceList.length,userFacingClaims:claims.filter(x=>x.userFacing).length,claimsWithoutSources:claims.filter(x=>!x.currentSourceIds.length).length,dateSensitiveClaims:claims.filter(x=>x.dateSensitive).length,duplicateCanonicalGroups:canonicalGroups.length,entityDistribution:Object.fromEntries([...new Set(claims.map(x=>x.entityType))].sort().map(type=>[type,claims.filter(x=>x.entityType===type).length])),claimTypeDistribution:Object.fromEntries([...new Set(claims.map(x=>x.claimType))].sort().map(type=>[type,claims.filter(x=>x.claimType===type).length]))};
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'claim-inventory.json'),JSON.stringify(claims,null,2)+'\n');
fs.writeFileSync(path.join(out,'source-inventory.json'),JSON.stringify(sourceList,null,2)+'\n');
fs.writeFileSync(path.join(out,'canonical-source-set.json'),JSON.stringify(sourceList.reduce((acc,item)=>{const key=item.canonicalUrl;const existing=acc.find(group=>group.canonicalUrl===key);if(existing)existing.sourceIds.push(item.sourceId);else acc.push({canonicalUrl:key,sourceIds:[item.sourceId],primarySourceId:item.sourceId});return acc},[]),null,2)+'\n');
fs.writeFileSync(path.join(out,'inventory-report.json'),JSON.stringify({...report,duplicateCanonicalGroups:canonicalGroups},null,2)+'\n');
console.log(JSON.stringify(report,null,2));
