const crypto=require('node:crypto');
const canonicalUrl=value=>{const url=new URL(value);url.hash='';['utm_source','utm_medium','utm_campaign','fbclid','gclid'].forEach(key=>url.searchParams.delete(key));url.hostname=url.hostname.toLowerCase();return url.toString().replace(/\/$/,'')};
const hash=value=>crypto.createHash('sha256').update(String(value)).digest('hex');
const normalizeRecord=raw=>{const url=canonicalUrl(raw.canonicalUrl);return{platform:raw.platform,canonicalUrl:url,publishedAt:raw.publishedAt||null,retrievedAt:raw.retrievedAt||new Date().toISOString(),query:raw.query,entityIds:[...new Set(raw.entityIds||[])],shortSummary:String(raw.shortSummary||'').slice(0,280),positiveSignals:[...new Set(raw.positiveSignals||[])],negativeSignals:[...new Set(raw.negativeSignals||[])],accessMode:raw.accessMode,sourceAccessible:raw.sourceAccessible!==false,confidence:raw.sourceAccessible===false?'SEARCH_INDEX_ONLY':raw.confidence||'LOW',evidenceType:raw.sourceAccessible===false?'SEARCH_INDEX_ONLY':raw.evidenceType||'PUBLIC_POST',officialVerification:raw.officialVerification||'PENDING',sourceHash:hash([url,raw.publishedAt,raw.shortSummary].join('|')),authorHash:raw.author?hash(raw.platform+'|'+raw.author).slice(0,16):null}};
const dedupe=records=>{const seenUrl=new Set(),seenHash=new Set(),seenAuthorSummary=new Set();return records.filter(item=>{const key=`${item.authorHash}|${hash(item.shortSummary)}`;if(seenUrl.has(item.canonicalUrl)||seenHash.has(item.sourceHash)||(item.authorHash&&seenAuthorSummary.has(key)))return false;seenUrl.add(item.canonicalUrl);seenHash.add(item.sourceHash);if(item.authorHash)seenAuthorSummary.add(key);return true})};
const confidence=records=>{const accessible=records.filter(x=>x.sourceAccessible),platforms=new Set(accessible.map(x=>x.platform)),recent=accessible.filter(x=>x.publishedAt&&Date.now()-Date.parse(x.publishedAt)<1000*60*60*24*730);if(accessible.length>=3&&platforms.size>=2&&recent.length>=2)return'HIGH';if(accessible.length>=1)return'MEDIUM';return'SEARCH_INDEX_ONLY'};
const publishable=record=>record.sourceAccessible&&['HIGH','MEDIUM'].includes(record.confidence)&&record.officialVerification==='CONFIRMED';
const rotateQueries=(registry,state,entities)=>{
  const rotation=registry.scheduledRotation;
  const previous=new Set(state.previousQueries||[]);
  const lastIndex=Math.max(-1,rotation.indexOf(state.lastFamily));
  const familyId=rotation[(lastIndex+1)%rotation.length];
  const family=registry.families.find(item=>item.id===familyId);
  const queries=[];
  for(const entity of entities){
    for(const [language,terms] of Object.entries(family.terms)){
      const term=terms[(queries.length+entity.id.length)%terms.length];
      const query=`${entity.name} ${term}`.trim();
      if(!previous.has(query)&&!queries.some(item=>item.query===query)) queries.push({entityId:entity.id,language,family:familyId,query});
    }
  }
  return {familyId,queries,nextState:{lastFamily:familyId,previousQueries:[...(state.previousQueries||[]),...queries.map(item=>item.query)].slice(-120)}};
};
const perplexityStatus=env=>env.PERPLEXITY_API_KEY||env.PPLX_API_KEY?'AVAILABLE':'PERPLEXITY_USER_ACTION_REQUIRED';
module.exports={canonicalUrl,normalizeRecord,dedupe,confidence,publishable,rotateQueries,perplexityStatus};
