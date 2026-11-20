/* post-rebuild visual check: instant-scroll sweep, then viewport shots of every band */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT = '/tmp/candy-after';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);

// instant sweep so every Reveal fires (html is scroll-behavior:smooth)
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 130)); }
  window.scrollTo({ top: 0, behavior: 'instant' });
});
await page.waitForTimeout(1400);

const H = await page.evaluate(() => document.body.scrollHeight);
console.log('page height', H);

// band shots at fixed document offsets
const shots = [
  ['hero', 0], ['units', 1000], ['flame', 2350], ['motion', 3300],
  ['taste', 4850], ['snack', 5950], ['method', 6800], ['stickers', 7550],
  ['dress', 8350], ['cta', 9450], ['footer', H - 900],
];
for (const [name, y] of shots) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), Math.max(0, y));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}
console.log('band shots saved');
await browser.close();
