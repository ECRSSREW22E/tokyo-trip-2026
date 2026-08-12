const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..','..');
const file=path.join(root,'data','research','source-inventory.json');
const output=path.join(root,'data','research','source-url-audit.json');
const reportFile=path.join(root,'data','research','source-url-audit-report.json');
const sources=JSON.parse(fs.readFileSync(file,'utf8'));
const overrides=JSON.parse(fs.readFileSync(path.join(__dirname,'status-overrides.json'),'utf8'));
const timeoutMs=10000;
const restricted=new Set(['threads.net','www.threads.net','instagram.com','www.instagram.com','facebook.com','www.facebook.com','xiaohongshu.com','www.xiaohongshu.com','tiktok.com','www.tiktok.com']);
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function official(source){return /官方|official|institution|交通|寺院|神社|商場|地方/i.test(`${source.kind} ${source.title}`)}
function social(source){return /social|dcard|ptt|threads|instagram|facebook|youtube|tiktok|reddit|x\b|實訪|分享/i.test(`${source.kind} ${source.platform} ${source.title}`)}
function classify(source,status,redirected,error){
  if(source.sourceAccessible===false)return'SEARCH_INDEX_ONLY';
  if(error)return'BLOCKED';
  if(status===404||status===410)return'DEAD_LINK';
  if(status===401)return'LOGIN_REQUIRED';
  if(status===403||status===429)return'BLOCKED';
  if(redirected)return'REDIRECTED';
  if(status>=200&&status<400){if(official(source))return'OFFICIAL_CURRENT';if(social(source))return'SOCIAL_FULLTEXT_VERIFIED';return'EDITORIAL_VERIFIED'}
  return'UNSUPPORTED';
}
async function audit(source){
  const started=Date.now();let response,error=null;
  try{
    const host=new URL(source.url).hostname.toLowerCase();
    if(restricted.has(host)&&source.sourceAccessible===false)return{...source,sourceStatus:'SEARCH_INDEX_ONLY',httpStatus:null,finalUrl:null,redirected:false,auditedAt:new Date().toISOString(),durationMs:0,error:null};
    response=await fetch(source.url,{redirect:'follow',signal:AbortSignal.timeout(timeoutMs),headers:{'user-agent':'TokyoTripSourceAudit/1.0 (+noncommercial-personal-guide)'}});
  }catch(err){error=err.name||err.message}
  const finalUrl=response?.url||null,redirected=Boolean(finalUrl&&source.canonicalUrl&&finalUrl.replace(/\/$/,'')!==source.canonicalUrl.replace(/\/$/,''));
  const override=overrides[source.sourceId];
  return{...source,sourceStatus:override?.sourceStatus||classify(source,response?.status||0,redirected,error),statusReason:override?.reason||null,httpStatus:response?.status||null,finalUrl,redirected,auditedAt:new Date().toISOString(),durationMs:Date.now()-started,error};
}
async function main(){
  const results=new Array(sources.length);let cursor=0;
  async function worker(){while(true){const index=cursor++;if(index>=sources.length)return;results[index]=await audit(sources[index]);await sleep(120)}}
  await Promise.all(Array.from({length:8},worker));
  const statuses=Object.fromEntries([...new Set(results.map(x=>x.sourceStatus))].sort().map(status=>[status,results.filter(x=>x.sourceStatus===status).length]));
  const report={auditedAt:new Date().toISOString(),total:results.length,statuses,redirected:results.filter(x=>x.redirected).length,dead:results.filter(x=>x.sourceStatus==='DEAD_LINK').length,blocked:results.filter(x=>['BLOCKED','LOGIN_REQUIRED'].includes(x.sourceStatus)).length,errors:results.filter(x=>x.error).length};
  fs.writeFileSync(output,JSON.stringify(results,null,2)+'\n');fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1});
