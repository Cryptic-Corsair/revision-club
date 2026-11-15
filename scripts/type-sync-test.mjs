// type-sync-test.mjs <url>
// THE SYNCHRONIZATION TEST — the user's core requirement:
//  · picking a rung MOVES the five sliders (atomic preset write)
//  · dragging a slider relights the rung row as "Custom mix"
//  · dragging back onto a preset vector relights that rung
//  · everything persists across reload
//  · "Back to the rung" returns the mix to the active preset
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
const near = (a, b, tol = 0.005) => Math.abs(parseFloat(a) - b) <= tol;

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
const sliderVals = async () =>
  page.evaluate(() =>
    [...document.querySelectorAll('input.adv-range')].map((el) => parseFloat(el.value)),
  );
const rungLit = async (rung) =>
  page.evaluate((r) => {
    const b = [...document.querySelectorAll('button[aria-pressed]')].find((x) =>
      (x.getAttribute('aria-label') || '').startsWith(`Text size ${r}`),
    );
    return b ? b.getAttribute('aria-pressed') === 'true' : null;
  }, rung);
const setSlider = async (i, v) => {
  await page.locator('input.adv-range').nth(i).evaluate((el, val) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(el, String(val));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, v);
  await page.waitForTimeout(400);
};
const kicker = async () => {
  await page.goto(url + '/?front', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1100);
  return page.evaluate(() => {
    const el = document.querySelector('.portal-kicker');
    return el ? getComputedStyle(el).fontSize : null;
  });
};

// — fresh 1280 → factory XL: sliders born at 150%, XL lit —
await page.goto(url + '/club', { waitUntil: 'domcontentloaded' });
await page.evaluate((k) => localStorage.removeItem(k), KEY);
await openDrawer();
await unfoldAdv();
let vals = await sliderVals();
check('fresh XL: 5 sliders rendered', vals.length === 5, `${vals.length}`);
check('fresh XL: sliders born at 150%', vals.every((v) => near(v, 1.5)), vals.join('/'));
check('fresh XL: XL rung lit', (await rungLit('XL')) === true);
check('fresh XL: no Custom chip', (await page.locator('text=Custom mix').count()) === 0);

// — rung pick MOVES the sliders: L —
await page.click('button[aria-label="Text size L — sets every role to 120%"]');
await page.waitForTimeout(400);
vals = await sliderVals();
check('pick L → sliders move to 120%', vals.every((v) => near(v, 1.2)), vals.join('/'));
check('pick L → L lit', (await rungLit('L')) === true);
check('pick L → XL unlit', (await rungLit('XL')) === false);

// — S pick, portal px follows the preset —
await page.click('button[aria-label="Text size S — sets every role to 90%"]');
await page.waitForTimeout(400);
vals = await sliderVals();
check('pick S → sliders 90%', vals.every((v) => near(v, 0.9)), vals.join('/'));
const kS = await kicker();
check('kicker @S preset — 11 × grow × 0.9', near(kS, 11 * 1.05 * 0.9, 0.35), `${kS}`);

// — drag one slider OFF the vector → Custom mix, rung unlit —
await openDrawer();
await unfoldAdv();
await setSlider(2, 1.3); // body → 130%
check('drag body off S → Custom chip', (await page.locator('text=Custom mix').count()) === 1);
check('drag body off S → no rung lit', (await rungLit('S')) === false && (await rungLit('M')) === false);
vals = await sliderVals();
check('custom mix: body 130%, others 90%', near(vals[2], 1.3) && vals.filter((v, i) => i !== 2).every((v) => near(v, 0.9)), vals.join('/'));

// — persistence across reload —
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.click('[aria-label="Customize the site"]');
await page.waitForTimeout(600);
check('reload: chip persists', (await page.locator('text=Custom mix').count()) === 1);
const autoCount = await page.locator('input.adv-range').count();
console.log(`  (auto-open when tuned, after reload: ${autoCount}/5 sliders visible)`);
if (autoCount < 5) await unfoldAdv();
vals = await sliderVals();
check('reload: mix persists', near(vals[2], 1.3) && vals.filter((v, i) => i !== 2).every((v) => near(v, 0.9)), vals.join('/'));

// — drag back ONTO the vector → rung relights, chip dies —
await setSlider(2, 0.9);
check('drag back onto S vector → chip gone', (await page.locator('text=Custom mix').count()) === 0);
check('drag back onto S vector → S relit', (await rungLit('S')) === true);

// — "Back to the rung" —
await setSlider(0, 1); // headings → 100% while on S
check('off-vector again → chip', (await page.locator('text=Custom mix').count()) === 1);
await page.locator('button', { hasText: 'Back to the rung' }).first().click();
await page.waitForTimeout(400);
vals = await sliderVals();
check('Back to the rung → sliders at preset', vals.every((v) => near(v, 0.9)), vals.join('/'));
check('Back to the rung → chip gone', (await page.locator('text=Custom mix').count()) === 0);

// — XL preset equivalence: sliders 150%, portal px = the old XL default —
await page.click('button[aria-label="Text size XL — sets every role to 150%"]');
await page.waitForTimeout(400);
vals = await sliderVals();
check('pick XL → sliders 150%', vals.every((v) => near(v, 1.5)), vals.join('/'));
const kXL = await kicker();
check('kicker @XL preset — 11 × grow × 1.5', near(kXL, 11 * 1.05 * 1.5, 0.35), `${kXL}`);

await browser.close();
console.log(fails ? `${fails} FAILURES` : 'ALL SYNC CHECKS PASSED');
process.exit(fails ? 1 : 0);
