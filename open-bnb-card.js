const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://bnb-card.vercel.app/');
  await page.screenshot({ path: 'bnb-card.png' });
  // 保持浏览器打开，方便你手动操作
  // await browser.close();
})(); 