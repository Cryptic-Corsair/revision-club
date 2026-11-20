/* instrument IO to see what entries .cd-head observers receive during the fast sweep */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
  const Orig = window.IntersectionObserver;
  window.IntersectionObserver = class extends Orig {
    constructor(cb, opts) {
      super((entries, obs) => {
        for (const e of entries) {
          const t = e.target;
          if (t && t.classList && t.classList.contains('cd-head')) {
            console.log(
              '[IO-head] top=' + Math.round(e.boundingClientRect.top + window.scrollY) +
              ' isInt=' + e.isIntersecting + ' ratio=' + e.intersectionRatio.toFixed(2) +
              ' scrollY=' + Math.round(window.scrollY) +
              ' rootMargin=' + (this.rootMargin || '?'),
            );
          }
        }
        cb(entries, obs);
      }, opts);
      Object.defineProperty(this, 'rootMargin', { value: opts && opts.rootMargin ? opts.rootMargin : '0px', writable: false });
    }
  };
});
page.on('console', (m) => { if (m.text().startsWith('[IO-head]')) console.log(m.text()); });

await page.goto(`${BASE}/candy`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);

await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const heads = await page.evaluate(() =>
  [...document.querySelectorAll('.cd-head')].map((el) => ({
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    in: el.classList.contains('cd-in'),
  })),
);
console.log('FINAL:', JSON.stringify(heads));
await browser.close();
