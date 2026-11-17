// theme-persistence-test.mjs <url>
// THE THEME PERSISTENCE TEST — the user's core requirement:
//  · the last-selected theme persists across reload — no matter what
//  · the night mood is CACHED (stamped at the pick), not calendared:
//    a hand-set mood renders and survives reload even when it is not
//    today's rotation pick
//  · a legacy night save without a mood gets today's pick stamped in
//  · editorial+classic DISPLAYS light but the save keeps classic —
//    switching back to Cards restores Classic without a re-pick
//  · water (the fifth lab) is offered and worn only where its ledger
//    serves it — /club/notes/wch11-t01 in the Cards dress: the chip
//    names Water there, the field mounts, reload keeps it; another
//    doc and the Document dress display Light while the save keeps
//    water, so returning to the ledgered doc puts it straight back
//  · a fresh Night pick in another tab stamps today's mood and the
//    first tab follows the storage event (dedup'd listener)
//  · no unexpected storage keys appear
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3001';
const KEY = 'reaction-club-prefs-v1';
const DAY_MOOD = Math.floor(Date.now() / 86_400_000) % 4;
const OTHER_MOOD = (DAY_MOOD + 1) % 4;
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};
const classesOf = (page) =>
  page.evaluate(() => document.documentElement.className);
const storedPrefs = (page) =>
  page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
const storageKeys = (page) =>
  page.evaluate(() => Object.keys(localStorage));
const waitFor = async (page, fn, ms = 4000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await fn()) return true; } catch { /* page busy */ }
    await page.waitForTimeout(150);
  }
  return false;
};

const browser = await chromium.launch({ headless: true });

/* — 1 · classic + gallery persists across reload — */
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
    JSON.stringify({ theme: 'classic', iface: 'gallery', v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  let cls = await classesOf(page);
  check('classic+gallery first load wears classic', cls.includes('classic') && !cls.includes('dark'));
  await page.reload({ waitUntil: 'networkidle' });
  cls = await classesOf(page);
  check('classic survives reload', cls.includes('classic') && !cls.includes('dark'));
  const st = await storedPrefs(page);
  check('stored theme untouched by reload', st?.theme === 'classic', `got ${st?.theme}`);
  await ctx.close();
}

/* — 2 · the cached night mood wins over the calendar — */
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
    JSON.stringify({ theme: 'dark', iface: 'gallery', v: 3, mood: OTHER_MOOD }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  let mood = await page.evaluate(() => document.documentElement.dataset.mood);
  check(`cached mood renders (picked ${OTHER_MOOD}, today is ${DAY_MOOD})`, mood === String(OTHER_MOOD), `got ${mood}`);
  await page.reload({ waitUntil: 'networkidle' });
  mood = await page.evaluate(() => document.documentElement.dataset.mood);
  check('cached mood survives reload — no calendar rotation', mood === String(OTHER_MOOD), `got ${mood}`);
  const st = await storedPrefs(page);
  check('cached mood stays in storage', st?.mood === OTHER_MOOD, `got ${st?.mood}`);
  await ctx.close();
}

/* — 3 · legacy night save (no mood field) gets today's pick stamped — */
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
    JSON.stringify({ theme: 'dark', iface: 'gallery', v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  const mood = await page.evaluate(() => document.documentElement.dataset.mood);
  check('legacy save falls back to today\u2019s mood', mood === String(DAY_MOOD), `got ${mood}`);
  const st = await storedPrefs(page);
  check('today\u2019s mood stamped into the save', st?.mood === DAY_MOOD, `got ${st?.mood}`);
  await page.reload({ waitUntil: 'networkidle' });
  const mood2 = await page.evaluate(() => document.documentElement.dataset.mood);
  check('stamped mood survives reload', mood2 === String(DAY_MOOD), `got ${mood2}`);
  await ctx.close();
}

/* — 4 · editorial+classic: displays light, keeps classic in the save — */
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
    JSON.stringify({ theme: 'classic', iface: 'editorial', v: 3 }),
  );
  await page.goto(url + '/club', { waitUntil: 'networkidle' });
  let cls = await classesOf(page);
  check('editorial+classic displays as light (no classic class)', !cls.includes('classic') && !cls.includes('dark'));
  const st0 = await storedPrefs(page);
  check('save keeps classic — no destructive coercion', st0?.theme === 'classic', `got ${st0?.theme}`);
  const chip = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label^="Theme:"]');
    return b?.getAttribute('aria-label') || '';
  });
  check('navbar chip reads the display lab (Light)', chip.includes('Theme: Light'), chip.slice(0, 40));
  /* switch back to Cards through the panel — classic must come back */
  await page.click('button[aria-label="Customize the site"]');
  await page.waitForSelector('button[aria-label^="Cards interface"]', { timeout: 5000 });
  await page.click('button[aria-label^="Cards interface"]');
  const back = await waitFor(page, async () =>
    (await classesOf(page)).includes('classic'));
  check('switching to Cards restores Classic live (no re-pick)', back);
  const st1 = await storedPrefs(page);
  check('save still classic after the round trip', st1?.theme === 'classic', `got ${st1?.theme}`);
  await ctx.close();
}

/* — 5 · a fresh Night pick in one tab reaches the other (dedup'd listener) — */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageA = await ctx.newPage();
  const pageB = await ctx.newPage();
  for (const p of [pageA, pageB]) {
    await p.addInitScript(
      (payload) => {
        if (!localStorage.getItem('rc-test-marker')) {
          localStorage.setItem('reaction-club-prefs-v1', payload);
          localStorage.setItem('rc-test-marker', '1');
        }
      },
      JSON.stringify({ theme: 'classic', iface: 'gallery', v: 3 }),
    );
  }
  await pageA.goto(url + '/club', { waitUntil: 'networkidle' });
  await pageB.goto(url + '/club', { waitUntil: 'networkidle' });
  /* pick Night on B through the navbar dropdown */
  await pageB.click('button[aria-label^="Theme:"]');
  await pageB.click('[aria-label="Appearance themes"] button:has-text("Night")');
  const st = await storedPrefs(pageB);
  check('Night pick stamped today\u2019s mood into the save', st?.theme === 'dark' && st?.mood === DAY_MOOD, `theme ${st?.theme} mood ${st?.mood}`);
  /* A must follow the storage event without a reload */
  const followed = await waitFor(pageA, async () =>
    (await classesOf(pageA)).includes('dark'));
  check('tab A follows the cross-tab theme change', followed);
  const moodA = await pageA.evaluate(() => document.documentElement.dataset.mood);
  check('tab A wears the same stamped mood', moodA === String(DAY_MOOD), `got ${moodA}`);
  /* — 6 · storage key stability — */
  const keys = await storageKeys(pageA);
  const allowed = ['reaction-club-prefs-v1', 'reaction-club-packs-v1', 'reaction-club-time-v1', 'reaction-club-v1', 'reaction-club-desk-v1', 'rc-test-marker'];
  const extra = keys.filter((k) => !allowed.includes(k));
  check('no unexpected storage keys', extra.length === 0, extra.join(', ') || 'none');
  await ctx.close();
}

/* — 7 · the water lab: worn and offered only where its ledger serves it — */
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
    JSON.stringify({ theme: 'water', iface: 'gallery', v: 3 }),
  );
  /* the pilot doc — Topic 1 — wears the field */
  await page.goto(url + '/club/notes/wch11-t01', { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-view="notes-wch11-t01"]', { timeout: 15000 });
  const chip = await page.evaluate(() =>
    document.querySelector('button[aria-label^="Theme:"]')?.getAttribute('aria-label') || '');
  check('ledgered doc wears Water (chip names it)', chip.includes('Theme: Water'), chip.slice(0, 40));
  const cls = await classesOf(page);
  check('water first-paints the daylight tokens (no dark/classic class)', !cls.includes('dark') && !cls.includes('classic'));
  const field = await page.evaluate(() =>
    Boolean(document.querySelector('[data-testid="water-theme-field"] > [data-testid="water-theme-canvas"] canvas')));
  check('the living field mounts behind the reader', field);
  await page.reload({ waitUntil: 'networkidle' });
  const chip2 = await page.evaluate(() =>
    document.querySelector('button[aria-label^="Theme:"]')?.getAttribute('aria-label') || '');
  check('water survives reload (pre-paint resolves it to light tokens)', chip2.includes('Theme: Water'));
  const field2 = await page.evaluate(() =>
    Boolean(document.querySelector('[data-testid="water-theme-field"]')));
  check('field remounts after reload', field2);
  /* another doc — the offer and the field stand down, the save keeps water */
  await page.goto(url + '/club/notes/wch11-t02', { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-view="notes-wch11-t02"]', { timeout: 15000 });
  const opts = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#theme-picker-options button span.font-display'))
      .map((s) => s.textContent));
  check('Water not offered on a doc off the ledger', !opts.includes('Water'), opts.join('|'));
  const chip3 = await page.evaluate(() =>
    document.querySelector('button[aria-label^="Theme:"]')?.getAttribute('aria-label') || '');
  check('off-ledger doc displays Light', chip3.includes('Theme: Light'), chip3.slice(0, 40));
  const field3 = await page.evaluate(() =>
    Boolean(document.querySelector('[data-testid="water-theme-field"]')));
  check('no field off the ledger', !field3);
  const st = await storedPrefs(page);
  check('save keeps water — no destructive coercion', st?.theme === 'water', `got ${st?.theme}`);
  /* the Document dress never serves it */
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('reaction-club-prefs-v1') || '{}');
    s.iface = 'editorial';
    localStorage.setItem('reaction-club-prefs-v1', JSON.stringify(s));
  });
  await page.goto(url + '/club/notes/wch11-t01', { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-view="notes-wch11-t01"]', { timeout: 15000 });
  const optsEd = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#theme-picker-options button span.font-display'))
      .map((s) => s.textContent));
  check('Document dress offers no Water either', !optsEd.includes('Water'), optsEd.join('|'));
  const field4 = await page.evaluate(() =>
    Boolean(document.querySelector('[data-testid="water-theme-field"]')));
  check('no field in the Document dress', !field4);
  const st2 = await storedPrefs(page);
  check('save still water after the editorial detour', st2?.theme === 'water', `got ${st2?.theme}`);
  await ctx.close();
}

await browser.close();
console.log(fails ? `\n${fails} CHECK(S) FAILED` : '\nALL THEME CHECKS PASSED');
process.exit(fails ? 1 : 0);
