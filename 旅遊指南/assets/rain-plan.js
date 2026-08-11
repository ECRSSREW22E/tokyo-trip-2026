(() => {
  const buttons = [...document.querySelectorAll('[data-weather]')];
  const title = document.querySelector('[data-weather-title]');
  const copy = document.querySelector('[data-weather-copy]');
  if (!buttons.length || !title || !copy) return;
  const states = {
    clear:['A PLAN','依原訂動線前進，仍在每一站出發前確認交通與設施公告。'],
    light:['A PLAN / SHORTER OUTDOOR','保留原行程，縮短海岸、神社與戶外拍攝；把室內休息點提早。'],
    heavy:['B PLAN','切換頁面中的 RAIN ROUTE，優先保留已預約餐廳與重要票券。'],
    severe:['B2 / SAFETY FIRST','雷暴、強風、交通異常或官方取消時啟用；不追景點，先確保列車、行李與住宿安全。']
  };
  const apply = (key) => {
    document.documentElement.dataset.weather = key;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.weather === key)));
    [title.textContent, copy.textContent] = states[key];
    try { sessionStorage.setItem('tokyo-trip-weather-plan', key); } catch (_) {}
  };
  buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.weather)));
  let saved = 'clear'; try { saved = sessionStorage.getItem('tokyo-trip-weather-plan') || saved; } catch (_) {}
  apply(states[saved] ? saved : 'clear');
})();
