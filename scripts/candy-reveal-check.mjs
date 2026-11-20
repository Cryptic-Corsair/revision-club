/* does the fast scroll pass (as used for fullpage shots) trigger all Reveals? */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);

// exact same pass as the screenshot script — but instant: html has
// scroll-behavior:smooth, so plain scrollTo() smooth-animates and the
// sweep never actually reaches the bottom
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 90)); }
  window.scrollTo({ top: 0, behavior: 'instant' });
});
await page.waitForTimeout(1200);

const states = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.cd-tile, .cd-flamestage, .cd-stage, .cd-qcard, .cd-snack, .cd-station, .cd-sticker, .cd-labcard, .cd-cta-panel, .cd-head, .cd-step').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (out.length > 25) return;
    out.push({ cls: el.className.toString().slice(0, 24), top: Math.round(r.top + window.scrollY), op: getComputedStyle(el).opacity });
  });
  return out;
});
console.table(states.map(s => ({ cls: s.cls, top: s.top, op: s.op })));
const stuck = states.filter(s => parseFloat(s.op) < 0.9);
console.log(`STUCK (opacity<0.9): ${stuck.length}/${states.length}`);
stuck.forEach(s => console.log('  stuck:', s.cls, 'at y', s.top));
await browser.close();
