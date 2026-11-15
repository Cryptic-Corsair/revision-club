// type-roles-test.mjs <url>
// The advanced type roles — CANONICAL v3 semantics:
//  1. a custom mix's raw factors land as plain numbers; --preset-k
//     carries the rung's factor; --tch / --tch-ed resolve as ratios
//  2. THE CORE RULE: the same % is the same px on every rung
//  3. legacy migration — v1 (no type), v2 ride-along (1s), v2 mixed,
//     v2 custom-absolute — every save renders exactly what it rendered
//     under v2, and an exact preset vector relights that rung
//  4. display heads: at a preset --tch-ed resolves to the designed
//     half-strength D; the ratio moves them with the headings system
//  5. sanitize clamps off-ladder saves (.8–1.6)
//  6. overflowX stays 0 at the extremes (0.8 / 1.6) on three widths
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3001';
const KEY = 'reaction-club-prefs-v1';
let fails = 0;
// getComputedStyle substitutes var() references in custom props and
// varies spacing — compare space-stripped
const norm = (s) => String(s).replace(/\s+/g, '');
const check = (name, got, want, tol = 0.35) => {
  const ok =
    typeof want === 'number'
      ? got !== null && Math.abs(parseFloat(got) - want) <= tol
      : norm(got) === norm(want);
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}: ${got}${typeof want === 'number' ? ` (want ${want})` : ''}`);
};
const SAVE = (o) => JSON.stringify(o);
// resolved at 1280 (grow 1.05); the browser substitutes --ui-grow
const G = 1.05;
const CUSTOM = { headings: 1.2, sub: 0.9, body: 1.1, other: 1.15, width: 1.2 };

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  userAgent:
    'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/157.0.0.0 Mobile Safari/537.36',
});
const page = await ctx.newPage();
const seed = (save) =>
  page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, SAVE(save)]);
const gotoPortal = async () => {
  await page.goto(url + '/?front', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1100);
};
const gotoClub = async () => {
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1100);
};
const readClub = () =>
  page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const g = (n) => cs.getPropertyValue(n).trim();
    const el = (sel) => {
      const e = document.querySelector(sel);
      return e ? getComputedStyle(e).fontSize : null;
    };
    return {
      dscale: document.documentElement.dataset.scale,
      typeH: g('--type-heading'), typeS: g('--type-sub'), typeB: g('--type-body'),
      typeO: g('--type-other'), typeW: g('--type-width'),
      presetK: g('--preset-k'), tch: g('--tch'), tched: g('--tch-ed'),
      deskBody: el('[class*="calc(14px*var(--ts-body)"]'),
      displayHead: el('h1'),
    };
  });
const readPortal = () =>
  page.evaluate(() => {
    const el = (sel) => {
      const e = document.querySelector(sel);
      return e ? getComputedStyle(e).fontSize : null;
    };
    return { kicker: el('.portal-kicker'), h1: el('h1') };
  });

// — 1. v3 custom mix: raw factors + ratios + role math —
await gotoClub();
await seed({ theme: 'classic', scale: 'XL', v: 3, type: CUSTOM });
await gotoClub();
let r = await readClub();
check('v3 --type-heading plain', r.typeH, '1.2');
check('v3 --preset-k = rung factor', r.presetK, '1.5');
check('v3 --tch ratio = type/preset', norm(r.tch), 'calc(1.2 / 1.5)');
await gotoPortal();
let p = await readPortal();
check('kicker @XL custom — 11 × grow × other', p.kicker, 11 * G * 1.15);
check('portal h1 @XL — clamp × tch ratio (1.2/1.5)', p.h1, Math.min(1280 * 0.053, 68) * (1.2 / 1.5), 0.5);

// — 2. THE CORE RULE: same %, same px, different rungs —
for (const scale of ['S', 'L']) {
  await seed({ theme: 'classic', scale, v: 3, type: CUSTOM });
  await gotoPortal();
  p = await readPortal();
  check(`kicker @${scale} = kicker @XL rule`, p.kicker, 11 * G * 1.15);
}
for (const scale of ['L', 'XL']) {
  await seed({ theme: 'classic', scale, v: 3, type: CUSTOM });
  await gotoClub();
  r = await readClub();
  check(`desk label @${scale} — 14 × grow × body`, r.deskBody, 14 * G * 1.1);
}

// — 3. legacy migrations —
await seed({ theme: 'classic', scale: 'XL' }); // v1: no type field
await gotoClub();
r = await readClub();
check('v1 XL → becomes the 1.5 vector', r.typeB, '1.5');
check('v1 XL keeps its rung', r.dscale, 'XL');
await gotoPortal();
p = await readPortal();
check('v1 XL kicker = old XL default', p.kicker, 11 * G * 1.5);

await seed({ theme: 'classic', scale: 'XL', type: { headings: 1, sub: 1, body: 1, other: 1, width: 1 } }); // v2 ride-along (THE TRAP)
await gotoClub();
r = await readClub();
check('v2 ride-along XL → 1.5 vector, NOT M', r.typeB, '1.5');
await gotoPortal();
p = await readPortal();
check('v2 ride-along XL kicker preserved', p.kicker, 11 * G * 1.5);

await seed({ theme: 'classic', scale: 'L', type: { headings: 1.2, sub: 1, body: 1, other: 1, width: 1 } }); // v2 mixed → all-L vector
await gotoClub();
r = await readClub();
check('v2 mixed L → full L vector', r.typeB, '1.2');
check('v2 mixed L relights L', r.dscale, 'L');
await gotoPortal();
p = await readPortal();
check('v2 mixed L kicker preserved', p.kicker, 11 * G * 1.2);

await seed({ theme: 'classic', scale: 'XL', type: { headings: 1.3, sub: 1, body: 1, other: 1, width: 1 } }); // v2 custom-absolute
await gotoClub();
r = await readClub();
check('v2 custom XL keeps tuned headings', r.typeH, '1.3');
check('v2 custom XL ride roles → rung factor', r.typeB, '1.5');
await gotoPortal();
p = await readPortal();
// the kicker rides the OTHER role, which migrated to the rung's 1.5 —
// exactly what v2 rendered (headings 1.3 is checked above via typeH)
check('v2 custom XL kicker preserved (other rides 1.5)', p.kicker, 11 * G * 1.5);

await seed({ theme: 'classic', scale: 'M', v: 3, type: { headings: 1.2, sub: 0.9, body: 1.1, other: 1.15, width: 1.2 } }); // v3 custom on M
await gotoClub();
r = await readClub();
check('v3 custom on M keeps its mix', r.typeH, '1.2');
check('v3 custom on M stays M (no false match)', r.dscale, 'M');
await gotoPortal();
p = await readPortal();
check('v3 custom on M kicker', p.kicker, 11 * G * 1.15);

// — 4. display heads: --tch-ed at a preset = the designed D —
await seed({ theme: 'light', iface: 'editorial', scale: 'L', v: 3, type: { headings: 1.2, sub: 1.2, body: 1.2, other: 1.2, width: 1.2 } });
await gotoClub();
r = await readClub();
// the desk's first h1 (desk.tsx) = clamp(2.1rem,4.5vw,3.1rem) ×
// --tch-ed; at 1280 the clamp resolves to 3.1rem = 49.6px,
// D(1.2×1.05) = 1 + (1.26−1)×0.5 = 1.13, ratio t/k = 1 at the preset
check('editorial desk h1 @L preset — clamp × D × 1', r.displayHead, 49.6 * (1 + (1.2 * G - 1) * 0.5), 0.8);
// tuned headings 1.44 → ratio 1.2 → h1 moves proportionally
await seed({ theme: 'light', iface: 'editorial', scale: 'L', v: 3, type: { headings: 1.44, sub: 1.2, body: 1.2, other: 1.2, width: 1.2 } });
await gotoClub();
r = await readClub();
check('editorial desk h1 tuned — clamp × D × ratio', r.displayHead, 49.6 * (1 + (1.2 * G - 1) * 0.5) * (1.44 / 1.2), 0.8);

// — 5. clamps (.8–1.6) —
await seed({ theme: 'classic', scale: 'M', v: 3, type: { headings: 3, sub: -2, body: 1.9, other: 0.1, width: 99 } });
await gotoClub();
r = await readClub();
check('clamp headings 3 → 1.6', r.typeH, '1.6');
check('clamp sub -2 → 0.8', r.typeS, '0.8');
check('clamp body 1.9 → 1.6', r.typeB, '1.6');
check('clamp other 0.1 → 0.8', r.typeO, '0.8');
check('clamp width 99 → 1.6', r.typeW, '1.6');
check('clamp tch ratio = type/preset', norm(r.tch), 'calc(1.6 / 1)');

// — 6. extremes: all roles 0.8 and 1.6, overflow must stay 0 —
for (const extreme of [1.6, 0.8]) {
  for (const w of [600, 820, 1280]) {
    await page.setViewportSize({ width: w, height: Math.round(w * 0.78) });
    for (const path of ['/?front', '/club']) {
      await page.goto(url + path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(900);
      // apply the extreme the same way applyPrefs does, then reflow
      await page.evaluate((v) => {
        const rs = document.documentElement.style;
        for (const n of ['--type-heading', '--type-sub', '--type-body', '--type-other', '--type-width'])
          rs.setProperty(n, String(v));
      }, extreme);
      await page.waitForTimeout(500);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(`overflowX @ ${w} ${path} (roles ${extreme})`, ov, 0, 0.01);
    }
  }
}

await browser.close();
console.log(fails ? `${fails} FAILURES` : 'ALL ROLE CHECKS PASSED');
process.exit(fails ? 1 : 0);
