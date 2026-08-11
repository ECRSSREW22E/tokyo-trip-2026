const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname,'..');
const htmlFiles = [];
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).forEach(entry => {
  const full = path.join(dir,entry.name);
  if (entry.isDirectory()) walk(full);
  else if (entry.name.endsWith('.html')) htmlFiles.push(full);
});
walk(root);

const missing = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file,'utf8');
  const links = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map(match => match[1]);
  for (const raw of links) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(raw)) continue;
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue;
    let decoded;
    try { decoded = decodeURIComponent(clean); } catch { decoded = clean; }
    let target = path.resolve(path.dirname(file),decoded);
    if (decoded.endsWith('/') || (fs.existsSync(target) && fs.statSync(target).isDirectory())) target = path.join(target,'index.html');
    checked += 1;
    if (!fs.existsSync(target)) missing.push({file:path.relative(root,file),link:raw,target:path.relative(root,target)});
  }
}

if (missing.length) {
  console.error(JSON.stringify({ok:false,htmlFiles:htmlFiles.length,checked,missing},null,2));
  process.exit(1);
}
console.log(JSON.stringify({ok:true,htmlFiles:htmlFiles.length,checked,missing:0},null,2));
