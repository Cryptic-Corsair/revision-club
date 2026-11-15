// url-routing-test.mjs <url>
// THE URL↔ROOM TEST — every room owns an accurate address:
//  · a clean /club/… path lands in its room and the URL stays put
//  · a legacy ?v= deep link upgrades to its path form (replaceState)
//  · an unknown /club/… path normalizes to /club (no junk address)
//  · the browser's real back/forward walks rooms (popstate re-derives)
//  · in-app room changes push paths; the URL never drifts from the room
import { createRequire } from 'module';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const url = process.argv[2] || 'http://localhost:3001';
let fails = 0;
const check = (name, ok, detail = '') => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};
const stateOf = (page) =>
  page.evaluate(() => ({
    view: document.querySelector('[data-view]')?.getAttribute('data-view') ?? null,
    path: window.location.pathname,
    search: window.location.search,
  }));
const waitFor = async (page, fn, ms = 8000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await fn()) return true; } catch { /* page busy */ }
    await page.waitForTimeout(150);
  }
  return false;
};
/* full page load at `path`, then wait for the room + address to agree */
const visit = async (page, path) => {
  await page.goto(url + path, { waitUntil: 'networkidle' });
  return waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view !== null && s.path === (path === '/' ? '/' : path.replace(/\/+$/, ''));
  });
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

/* — 1 · clean paths land in their room, address stays put — */
const cleanPaths = [
  ['/club', 'home'],
  ['/club/spec', 'spec'],
  ['/club/pack', 'pack'],
  ['/club/sticker', 'sticker'],
  ['/club/legal', 'legal'],
  ['/club/wch12', 'unit-WCH12'],
  ['/club/notes/wch11-t02', 'notes-wch11-t02'],
];
for (const [path, view] of cleanPaths) {
  const ok = await visit(page, path);
  const s = await stateOf(page);
  check(
    `deep path ${path} → ${view}`,
    ok && s.view === view && s.search === '',
    `view=${s.view} path=${s.path} search=${s.search || '∅'}`,
  );
}
/* the notes reader at one clause — the doc view is the same room, so
   the view id is the doc; the clause rides in the URL only */
{
  const ok = await visit(page, '/club/notes/wch11-t02/2.3');
  const s = await stateOf(page);
  check(
    'deep path /club/notes/wch11-t02/2.3 → notes at clause 2.3',
    ok && s.view === 'notes-wch11-t02' && s.path === '/club/notes/wch11-t02/2.3',
    `view=${s.view} path=${s.path}`,
  );
}

/* — 2 · legacy ?v= links upgrade to their path form — */
{
  await page.goto(url + '/club?v=notes&doc=wch11-t02&spec=2.3', { waitUntil: 'networkidle' });
  const ok = await waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view === 'notes-wch11-t02' && s.path === '/club/notes/wch11-t02/2.3' && s.search === '';
  });
  const s = await stateOf(page);
  check(
    'legacy ?v=notes&doc=…&spec=… upgrades to the path form',
    ok, `view=${s.view} path=${s.path} search=${s.search || '∅'}`,
  );
}
{
  await page.goto(url + '/club?v=WCH12', { waitUntil: 'networkidle' });
  const ok = await waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view === 'unit-WCH12' && s.path === '/club/wch12' && s.search === '';
  });
  const s = await stateOf(page);
  check('legacy ?v=WCH12 upgrades to /club/wch12', ok, `view=${s.view} path=${s.path}`);
}
{
  await page.goto(url + '/club?v=notes', { waitUntil: 'networkidle' });
  const ok = await waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view === 'notes-wch11-t01' && s.path === '/club/notes/wch11-t01' && s.search === '';
  });
  const s = await stateOf(page);
  check('bare legacy ?v=notes lands on the first doc', ok, `view=${s.view} path=${s.path}`);
}

/* — 3 · an unknown path renders the desk and normalizes its address — */
{
  await page.goto(url + '/club/nonsense', { waitUntil: 'networkidle' });
  const ok = await waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view === 'home' && s.path === '/club' && s.search === '';
  });
  const s = await stateOf(page);
  check('unknown /club/nonsense → desk at /club', ok, `view=${s.view} path=${s.path}`);
}

/* — 4 · the browser's real back/forward walks rooms — */
{
  await visit(page, '/club/notes/wch11-t02');
  await visit(page, '/club/spec');
  await page.goBack({ waitUntil: 'networkidle' });
  const backOk = await waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view === 'notes-wch11-t02' && s.path === '/club/notes/wch11-t02';
  });
  const s1 = await stateOf(page);
  check('real back from /club/spec → notes room + address', backOk, `view=${s1.view} path=${s1.path}`);
  await page.goForward({ waitUntil: 'networkidle' });
  const fwdOk = await waitFor(page, async () => {
    const s = await stateOf(page);
    return s.view === 'spec' && s.path === '/club/spec';
  });
  const s2 = await stateOf(page);
  check('real forward → spec room + address', fwdOk, `view=${s2.view} path=${s2.path}`);
}

/* — 5 · in-app navigation writes the room's address (no drift) — */
{
  await visit(page, '/club/spec');
  /* the navbar's home tool — stable aria-label, in-app setView */
  const homeBtn = page.locator('[aria-label="Home"]').first();
  const present = (await homeBtn.count()) > 0;
  if (present) {
    await homeBtn.click();
    const ok = await waitFor(page, async () => {
      const s = await stateOf(page);
      return s.view === 'home' && s.path === '/club' && s.search === '';
    });
    const s = await stateOf(page);
    check(
      'in-app nav (spec → home) writes /club into the address bar',
      ok, `view=${s.view} path=${s.path} search=${s.search || '∅'}`,
    );
  } else {
    console.log('SKIP  in-app nav — Home tool not found');
  }
}

await browser.close();
console.log(fails === 0 ? 'ALL URL-ROUTING CHECKS PASSED' : `${fails} URL-ROUTING CHECK(S) FAILED`);
process.exit(fails === 0 ? 0 : 1);
