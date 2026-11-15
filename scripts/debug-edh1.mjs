// debug-edh1.mjs — one-off: what does /club render with an editorial
// save, and does the --tch-ed h1 exist?
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3001';
const KEY = 'reaction-club-prefs-v1';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  userAgent:
    'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/157.0.0.0 Mobile Safari/537.36',
});
const page = await ctx.newPage();
await page.goto(url + '/club', { waitUntil: 'domcontentloaded' });
await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, JSON.stringify({
  theme: 'light', iface: 'editorial', scale: 'L', v: 3,
  type: { headings: 1.2, sub: 1.2, body: 1.2, other: 1.2, width: 1.2 },
})]);
await page.goto(url + '/club', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => ({
  iface: document.documentElement.dataset.iface,
  scale: document.documentElement.dataset.scale,
  tched: getComputedStyle(document.documentElement).getPropertyValue('--tch-ed').trim(),
  typeH: getComputedStyle(document.documentElement).getPropertyValue('--type-heading').trim(),
  presetK: getComputedStyle(document.documentElement).getPropertyValue('--preset-k').trim(),
  h1s: [...document.querySelectorAll('h1')].map((h) => ({
    cls: h.className.slice(0, 90),
    size: getComputedStyle(h).fontSize,
  })),
  tchEdEls: document.querySelectorAll('[class*="var(--tch-ed)"]').length,
}));
console.log(JSON.stringify(info, null, 1));
await browser.close();
