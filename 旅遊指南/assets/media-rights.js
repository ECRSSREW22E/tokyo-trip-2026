/* Media deployment ledger · audited 2026-08-11
 * A local file is eligible for GitHub Pages only when sourceUrl, licenseUrl and
 * required credit are recorded. Unknown provenance is never treated as public-domain.
 */
(() => {
  const reviewedAt = '2026-08-11';
  const unknownImage = (id, fileName, area, metadataNote = '') => ({
    id, fileName, area, kind: 'image', deploymentStatus: 'DO_NOT_DEPLOY',
    sourceUrl: '', licenseUrl: '', credit: '', reviewedAt,
    reason: `原始下載頁與授權條款未留存；非營利用途不等於可重製。${metadataNote}`
  });
  const referencePdf = (id, fileName, area) => ({
    id, fileName, area, kind: 'pdf', deploymentStatus: 'REFERENCE_ONLY',
    sourceUrl: '', licenseUrl: '', credit: '', reviewedAt,
    reason: '檔名顯示可能為官方旅遊資料，但尚未逐份留存原始下載頁與再散布條款；目前只供行程研究。'
  });

  const media = [
    unknownImage('shichirigahama-coast-local','七里濱海岸.jpg','七里濱'),
    unknownImage('ameyoko-local','阿美橫町.jpg','上野'),
    unknownImage('tokyo-tower-local','東京鐵塔實景.jpg','六本木・東京鐵塔'),
    unknownImage('harajuku-local','原宿街景.jpg','原宿・明治神宮・表參道'),
    unknownImage('meiji-local','明治神宮.jpg','原宿・明治神宮・表參道'),
    unknownImage('odaiba-local','台場實景.jpg','台場'),
    unknownImage('shinagawa-aquarium-local','品川水族館.jpg','品川・大井町'),
    unknownImage('hebikubo-local','蛇窪神社.jpg','品川・大井町'),
    unknownImage('shinjuku-local','新宿街景.jpg','新宿',' 檔案中可見作者 Basile Morin，但缺原始作品頁與授權版本。'),
    unknownImage('red-brick-local','橫濱紅磚倉庫.jpg','橫濱'),
    unknownImage('minatomirai-local','港未來夜景.jpg','橫濱'),
    unknownImage('enoshima-local','江之島全景.jpg','江之島'),
    unknownImage('sensoji-local','淺草寺.jpg','淺草',' 檔案中可見作者 Ajay Suresh／@Epicsunwarrior，但缺原始作品頁與授權版本。'),
    unknownImage('shibuya-local','澀谷十字路口.jpg','澀谷'),
    unknownImage('atami-local','熱海灣.jpg','熱海'),
    unknownImage('akihabara-local','秋葉原街景.png','秋葉原'),
    unknownImage('gotokuji-local','豪德寺招財貓.jpg','豪德寺'),
    unknownImage('ikebukuro-local','池袋街景.jpg','駒込・池袋'),
    unknownImage('kochikame-local','龜有角色銅像示意.png','龜有'),
    referencePdf('minato-guide-pdf','港區歷史觀光指南_2026.pdf','六本木・東京鐵塔'),
    referencePdf('shinagawa-guide-pdf','品川觀光指南.pdf','品川・大井町'),
    referencePdf('enoshima-accessibility-pdf','江之島無障礙地圖_2025.pdf','江之島'),
    referencePdf('enoshima-accessibility-duplicate','Enoshimap_LF_Hantaiji_250411.pdf','江之島'),
    referencePdf('enoshima-zh-map-pdf','江之島繁中地圖.pdf','江之島'),
    referencePdf('enoshima-zh-map-duplicate','Enoshima_Map_tw_2021.pdf','江之島'),
    referencePdf('atami-guide-1-pdf','熱海活動指南_2026_1.pdf','熱海'),
    referencePdf('atami-guide-2-pdf','熱海活動指南_2026_2.pdf','熱海'),
    referencePdf('kochikame-map-pdf','龜有こち亀銅像地圖_2025.pdf','龜有')
  ];

  const policySources = [
    {id:'gotokyo-terms',title:'GO TOKYO 網站利用規約',url:'https://www.gotokyo.org/jp/about-tcvb/index.html',decision:'一般網站圖片不可因私人／非營利目的直接轉載。'},
    {id:'gotokyo-photo-terms',title:'GO TOKYO Stock Photos 利用規約',url:'https://www.gotokyo.org/photo/ja/cart/agree',decision:'需要申請、核准、指定標示與成果回報；核准前不得部署。'},
    {id:'fujisawa-photo-terms',title:'藤澤市觀光官方照片庫利用規約',url:'https://photo.fujisawa-kanko.jp/termsofservice/',decision:'可依條款申請使用，但下載需提供聯絡資料，且第三方權利仍由使用者確認。'},
    {id:'jnto-terms',title:'JNTO Terms of Use',url:'https://www.japan.travel/en/terms-of-use/',decision:'一般網站圖片不可未經許可複製。'},
    {id:'japan-heritage-copyright',title:'Japan Heritage Copyright',url:'https://www.japan.travel/japan-heritage/copyright',decision:'只有明確落在該授權頁範圍的內容，並遵守第三方權利與標示時才可重用。'}
  ];

  const eligible = media.filter(item => item.deploymentStatus === 'APPROVED');
  window.TokyoMediaRights = {reviewedAt, media, policySources, eligible};
})();
