// panel-adv-test.mjs <url>
// The Advanced section end-to-end under v3: factory-born sliders read
// the preset (150% at a 1280 desk), a drag writes plain factors +
// lights the Custom chip, persistence round-trips, and "Back to the
// rung" restores the active preset's vector.
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3001';
const KEY = 'reaction-club-prefs-v1';
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  userAgent:
    'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/157.0.0.0 Mobile Safari/537.36',
});
const page = await ctx.newPage();
const openDrawer = async () => {
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.click('[aria-label="Customize the site"]');
  await page.waitForTimeout(600);
};
const unfoldAdv = async () => {
  const btn = page
    .locator('button[aria-expanded]', { hasText: 'moves all five sliders together' })
    .first();
  // idempotent — the drawer auto-opens the disclosure when the mix is
  // custom, so a blind toggle would fold it back shut
  if ((await btn.getAttribute('aria-expanded')) !== 'true') {
    await btn.click();
    await page.waitForTimeout(500);
  }
};
const setSlider = async (i, v) => {
  await page.locator('input.adv-range').nth(i).evaluate((el, val) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(el, String(val));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, v);
  await page.waitForTimeout(400);
};

// — fresh desk → factory XL, sliders born at 150% —
await page.goto(url + '/club', { waitUntil: 'domcontentloaded' });
await page.evaluate((k) => localStorage.removeItem(k), KEY);
await openDrawer();
await unfoldAdv();
const sliders = page.locator('input.adv-range');
check('5 role sliders rendered', (await sliders.count()) === 5);
let vals = await sliders.evaluateAll((els) => els.map((el) => parseFloat(el.value)));
check('factory sliders at 150%', vals.every((v) => Math.abs(v - 1.5) < 0.005), vals.join('/'));
check('no chip at the preset', (await page.locator('text=Custom mix').count()) === 0);

// — drag headings to 120% → plain factor + Custom chip —
await setSlider(0, 1.2);
const varH = await page.evaluate(() =>
  getComputedStyle(document.documentElement).getPropertyValue('--type-heading').trim(),
);
check('headings slider → plain --type-heading 1.2', varH === '1.2', `got ${varH}`);
check('Custom chip appears', (await page.locator('text=Custom mix').count()) === 1);
const backBtn = page.locator('button', { hasText: 'Back to the rung' });
check('"Back to the rung" appears', (await backBtn.count()) === 1);

await page.screenshot({ path: '/tmp/panel/panel-adv-open.png' });

// — persistence round-trip —
await setSlider(4, 1.6); // width → 160% (the E% headroom)
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.click('[aria-label="Customize the site"]');
await page.waitForTimeout(600);
const persisted = await page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  return {
    h: cs.getPropertyValue('--type-heading').trim(),
    w: cs.getPropertyValue('--type-width').trim(),
  };
});
check('persisted after reload (h)', persisted.h === '1.2', `got ${persisted.h}`);
check('persisted after reload (w)', persisted.w === '1.6', `got ${persisted.w}`);
check('chip persists', (await page.locator('text=Custom mix').count()) === 1);
await unfoldAdv();

await page.screenshot({ path: '/tmp/panel/desk-tuned.png' });

// — "Back to the rung" restores XL's vector —
await backBtn.click();
await page.waitForTimeout(400);
vals = await sliders.evaluateAll((els) => els.map((el) => parseFloat(el.value)));
check('back to rung → sliders at 150%', vals.every((v) => Math.abs(v - 1.5) < 0.005), vals.join('/'));
const varH2 = await page.evaluate(() =>
  getComputedStyle(document.documentElement).getPropertyValue('--type-heading').trim(),
);
check('back to rung → --type-heading 1.5', varH2 === '1.5', `got ${varH2}`);
check('chip gone after restore', (await page.locator('text=Custom mix').count()) === 0);

await browser.close();
console.log(fails ? `${fails} FAILURES` : 'ALL PANEL CHECKS PASSED');
process.exit(fails ? 1 : 0);
