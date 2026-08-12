const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..','..');
const claims=JSON.parse(fs.readFileSync(path.join(root,'data','research','claim-inventory.json'),'utf8'));
const sources=JSON.parse(fs.readFileSync(path.join(root,'data','research','source-url-audit.json'),'utf8'));
const byId=new Map(sources.map(x=>[x.sourceId,x]));
const officialStatuses=new Set(['OFFICIAL_CURRENT','OFFICIAL_ARCHIVE']);
const officialTypes=new Set(['PRICE','OPENING_HOURS','STORE_STATUS','BRANCH_EXISTENCE','PRODUCT_EXISTENCE','LIMITED_STATUS','SEASONAL_ITEM','EVENT_DATE','RESERVATION_STATUS','RAIN_ACCESS']);
const socialTypes=new Set(['QUEUE','TRAVELER_RECOMMENDATION','TRAVELER_WARNING','FOOD_RECOMMENDATION','SOCIAL_POPULARITY']);
const verdicts=claims.map(claim=>{
  const linked=claim.currentSourceIds.map(id=>byId.get(id)).filter(Boolean),current=linked.filter(x=>!['DEAD_LINK','BLOCKED','LOGIN_REQUIRED','SEARCH_INDEX_ONLY','UNSUPPORTED'].includes(x.sourceStatus));
  const hasOfficial=current.some(x=>officialStatuses.has(x.sourceStatus)),hasFullSocial=current.some(x=>x.sourceStatus==='SOCIAL_FULLTEXT_VERIFIED'),hasIndex=linked.some(x=>x.sourceStatus==='SEARCH_INDEX_ONLY');
  let verdict='MEDIUM_CONFIDENCE',reason='Source exists; semantic support requires review.';
  if(!linked.length||!current.length){verdict=hasIndex?'SEARCH_INDEX_ONLY':'UNSUPPORTED';reason='No currently readable supporting source.'}
  else if(officialTypes.has(claim.claimType)){if(hasOfficial){verdict=claim.dateSensitive?'CHECK_BEFORE_VISIT':'VERIFIED_CURRENT';reason=claim.dateSensitive?'Official source exists; volatile fact still needs trip-date confirmation.':'Current official source supports the entity/fact class.'}else{verdict='UNSUPPORTED';reason='Volatile/official fact lacks a current official source.'}}
  else if(socialTypes.has(claim.claimType)){if(hasFullSocial){verdict='SOCIAL_ONLY';reason='Readable field report; not an official fact.'}else if(hasIndex){verdict='SEARCH_INDEX_ONLY';reason='Only search-index evidence is readable.'}else{verdict='MEDIUM_CONFIDENCE';reason='Non-social source exists; traveler experience not independently verified.'}}
  else if(claim.claimType==='PHOTO_TIP'){verdict=hasFullSocial?'SOCIAL_ONLY':'MEDIUM_CONFIDENCE';reason=hasFullSocial?'Field report supports the shooting advice.':'Editorial route inference; exact angle not necessarily stated by source.'}
  if(linked.some(x=>x.sourceStatus==='DEAD_LINK')&&verdict==='VERIFIED_CURRENT'){verdict='CONFLICTING';reason='Claim references both current and dead evidence.'}
  return{...claim,verdict,reason,sourceStatuses:Object.fromEntries(linked.map(x=>[x.sourceId,x.sourceStatus]))};
});
const counts=Object.fromEntries([...new Set(verdicts.map(x=>x.verdict))].sort().map(v=>[v,verdicts.filter(x=>x.verdict===v).length]));
fs.writeFileSync(path.join(root,'data','research','claim-verdicts.json'),JSON.stringify(verdicts,null,2)+'\n');
fs.writeFileSync(path.join(root,'data','research','claim-verdict-report.json'),JSON.stringify({generatedAt:new Date().toISOString(),claims:verdicts.length,counts,highVolatilityCheckBeforeVisit:verdicts.filter(x=>x.volatility==='HIGH'&&x.verdict==='CHECK_BEFORE_VISIT').length},null,2)+'\n');
console.log(JSON.stringify({claims:verdicts.length,counts},null,2));
