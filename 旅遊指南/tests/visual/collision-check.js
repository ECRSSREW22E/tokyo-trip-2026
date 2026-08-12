(() => {
  const rect = element => element?.getBoundingClientRect();
  const overlaps = (a,b) => Boolean(a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top);
  const insideViewport = r => Boolean(r && r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight);
  window.runTokyoVisualCollisionCheck = () => {
    const title=rect(document.querySelector('.rain-hero h1'));
    const media=rect(document.querySelector('.rain-hero-image'));
    const eyebrow=rect(document.querySelector('.rain-hero .eyebrow'));
    const cta=rect(document.querySelector('.rain-hero-cta'));
    const openDialog=document.querySelector('dialog[open]');
    const close=rect(openDialog?.querySelector('[data-close-dialog],.dialog-close'));
    const dialog=rect(openDialog);
    return {
      viewport:{width:innerWidth,height:innerHeight},
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
      hero:{titleInside:insideViewport(title),mediaInside:insideViewport(media),titleMediaOverlap:overlaps(title,media),titleEyebrowOverlap:overlaps(title,eyebrow),titleCtaOverlap:overlaps(title,cta)},
      dialog:openDialog?{inside:insideViewport(dialog),closeInside:insideViewport(close),closeInsideDialog:Boolean(close&&dialog&&close.left>=dialog.left&&close.right<=dialog.right&&close.top>=dialog.top&&close.bottom<=dialog.bottom)}:null
    };
  };
})();
