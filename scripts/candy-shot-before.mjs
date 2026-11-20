/* full-page screenshot of /candy at desktop + mobile, for the polish pass */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT = '/tmp/candy-before';
const fs = await import('fs');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
// settle entrances: scroll through the page once
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/candy-full.png`, fullPage: true });
console.log('full page saved');

// hero close-up
await page.screenshot({ path: `${OUT}/candy-hero.png` });
console.log('hero saved');
await browser.close();
