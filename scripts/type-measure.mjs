// type-measure.mjs <url> <width> <height>
// The type baseline probe — a FRESH visitor (no saved prefs → the
// screen-aware factory rung + its preset vector). Measures the portal
// kicker / lede / footer band-row and the club notes body, plus
// overflowX, so the preset-equivalence table can be compared run over
// run. Pixel values must be IDENTICAL across refactors that promise
// preservation.
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3000';
const w = parseInt(process.argv[3] || '1280', 10);
const h = parseInt(process.argv[4] || '800', 10);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: w, height: h },
  userAgent:
    'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/157.0.0.0 Mobile Safari/537.36',
});
const page = await ctx.newPage();
const probe = async (path, sels) => {
  await page.goto(url + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1100);
  const out = await page.evaluate((s) => {
    const o = {};
    for (const [k, sel] of Object.entries(s)) {
      if (!sel) {
        o[k] = null;
        continue;
      }
      const el = document.querySelector(sel);
      o[k] = el ? getComputedStyle(el).fontSize : null;
    }
    o._overflowX = document.documentElement.scrollWidth - window.innerWidth;
    return o;
  }, sels);
  console.log(`=== ${url}${path} @ ${w}x${h} ===`);
  console.log(JSON.stringify(out));
};
await probe('/', {
  kicker: '.portal-kicker',
  lede: '.portal-lede',
  bandRow: '.portal-band-row',
  noteBody: null,
});
await probe('/club', {
  kicker: null,
  lede: null,
  bandRow: null,
  noteBody: '[class*="px*var(--ts-body)"]',
});
await browser.close();
