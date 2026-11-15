// font-persistence-test.mjs <url>
// THE FONT SHELF TEST — the expanded font set:
//  · every pickable head font id renders via html[data-head] and
//    re-points --font-display (computed style font-family)
//  · every pickable body font id renders via html[data-body] and
//    re-points --font-body
//  · a pick survives reload (localStorage persistence)
//  · a junk saved font id is sanitized back to the factory pair
//    and the page still renders (no bogus dataset)
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3001';
const KEY = 'reaction-club-prefs-v1';
const HEAD = ['fredoka', 'baloo', 'patrick', 'fraunces', 'figtree'];
const BODY = ['nunito', 'quicksand', 'figtree'];
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};
const waitFor = async (page, fn, ms = 4000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await fn()) return true; } catch { /* page busy */ }
    await page.waitForTimeout(150);
  }
  return false;
};

const browser = await chromium.launch({ headless: true });

/* — 1 · each head font id renders and re-points the display token — */
for (const id of HEAD) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(
    (payload) => localStorage.setItem('reaction-club-prefs-v1', payload),
    JSON.stringify({ theme: 'classic', iface: 'gallery', headFont: id, bodyFont: 'quicksand', v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  const got = await page.evaluate(() => ({
    head: document.documentElement.dataset.head,
    ff: getComputedStyle(document.documentElement).getPropertyValue('--font-display'),
  }));
  /* next/font inlines the var: --font-fraunces computes to
     "fraunces","fraunces Fallback",Georgia,serif — the family name
     leading the computed stack is the proof the rule re-pointed */
  check(
    `head="${id}" renders — dataset + --font-display`,
    got.head === id && got.ff.includes(`"${id}"`),
    `dataset=${got.head} token="${got.ff.trim().slice(0, 40)}…"`,
  );
  await ctx.close();
}

/* — 2 · each body font id renders and re-points the body token — */
for (const id of BODY) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(
    (payload) => localStorage.setItem('reaction-club-prefs-v1', payload),
    JSON.stringify({ theme: 'classic', iface: 'gallery', headFont: 'fredoka', bodyFont: id, v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  const got = await page.evaluate(() => ({
    body: document.documentElement.dataset.body,
    ff: getComputedStyle(document.documentElement).getPropertyValue('--font-body'),
  }));
  check(
    `body="${id}" renders — dataset + --font-body`,
    got.body === id && got.ff.includes(`"${id}"`),
    `dataset=${got.body} token="${got.ff.trim().slice(0, 40)}…"`,
  );
  await ctx.close();
}

/* — 3 · a Fraunces+Figtree pick survives reload — */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(
    (payload) => {
      if (!localStorage.getItem('rc-test-marker')) {
        localStorage.setItem('reaction-club-prefs-v1', payload);
        localStorage.setItem('rc-test-marker', '1');
      }
    },
    JSON.stringify({ theme: 'classic', iface: 'gallery', headFont: 'fraunces', bodyFont: 'figtree', v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  const got = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
  check(
    'fraunces+figtree pick survives reload',
    got && got.headFont === 'fraunces' && got.bodyFont === 'figtree',
    got ? `saved=${got.headFont}/${got.bodyFont}` : 'no save',
  );
  await ctx.close();
}

/* — 4 · a junk saved font id is sanitized to the factory pair — */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(
    (payload) => {
      if (!localStorage.getItem('rc-test-marker')) {
        localStorage.setItem('reaction-club-prefs-v1', payload);
        localStorage.setItem('rc-test-marker', '1');
      }
    },
    JSON.stringify({ theme: 'classic', iface: 'gallery', headFont: 'comic-sans', bodyFont: 42, v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  /* load() sanitizes for DISPLAY (applyPrefs corrects the dataset so
     the factory pair renders) without rewriting the save — picks
     persist, loads don't (same contract the theme suite asserts) */
  const ok = await waitFor(page, () =>
    page.evaluate(() => {
      const r = document.documentElement;
      return r.dataset.head === 'fredoka' && r.dataset.body === 'quicksand';
    }),
  );
  const got = await page.evaluate(() => ({
    head: document.documentElement.dataset.head,
    body: document.documentElement.dataset.body,
    ff: getComputedStyle(document.documentElement).getPropertyValue('--font-display'),
  }));
  check(
    'junk font ids render the factory pair (dataset sanitized)',
    ok && got.head === 'fredoka' && got.body === 'quicksand' && got.ff.includes('"fredoka"'),
    `dataset=${got.head}/${got.body} token="${got.ff.trim().slice(0, 40)}…"`,
  );
  await ctx.close();
}

await browser.close();
console.log(fails === 0 ? 'ALL FONT CHECKS PASSED' : `${fails} FONT CHECK(S) FAILED`);
process.exit(fails === 0 ? 0 : 1);
