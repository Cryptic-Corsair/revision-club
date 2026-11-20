/* final visual pass: hero (period fix), snack row, mobile 390 overflow */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT = '/tmp/candy-final';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2600);
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/hero.png` });

// snack row
await page.evaluate(() => window.scrollTo({ top: 6000, behavior: 'instant' }));
await page.waitForTimeout(1300);
await page.screenshot({ path: `${OUT}/snack.png` });

// mobile overflow check at 390
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await m.waitForTimeout(2500);
const overflow = await m.evaluate(() => {
  const doc = document.documentElement;
  const bad = [];
  document.querySelectorAll('.candy-root *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > doc.clientWidth + 1 && r.width > 8) {
      bad.push(el.className.toString().slice(0, 40) + ' right=' + Math.round(r.right));
    }
  });
  return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, bad: bad.slice(0, 8) };
});
console.log('mobile overflow:', JSON.stringify(overflow, null, 1));
await m.screenshot({ path: `${OUT}/mobile-hero.png` });
await m.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
await m.waitForTimeout(1200);
await m.screenshot({ path: `${OUT}/mobile-units.png` });
await browser.close();
console.log('done');
