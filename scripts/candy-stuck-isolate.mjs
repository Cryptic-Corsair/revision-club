/* isolate the stuck heads: slow scroll vs direct scrollIntoView per element */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);

// slow scroll: 300px steps, 200ms each
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200)); }
});
await page.waitForTimeout(800);

const slow = await page.evaluate(() =>
  [...document.querySelectorAll('.cd-head')].map((el) => ({
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    in: el.classList.contains('cd-in'),
    pre: el.classList.contains('cd-pre'),
  })),
);
console.log('after SLOW sweep:', JSON.stringify(slow));

// now go to top, fresh load, and scrollIntoView each formerly-stuck head
await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
for (const sel of ['#motion .cd-head', '#taste .cd-head', '#snack .cd-head']) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel);
  await page.waitForTimeout(1200);
  const st = await page.evaluate((s) => {
    const el = document.querySelector(s);
    return el ? { in: el.classList.contains('cd-in'), pre: el.classList.contains('cd-pre') } : 'missing';
  }, sel);
  console.log(sel, 'after scrollIntoView:', JSON.stringify(st));
}
await browser.close();
