#!/usr/bin/env node
// ————— the portal's motion regression audit —————
// Guards the two incidents this homepage has already had: loops that
// kept burning the main thread for nobody (the hero once wrote 13,974
// SVG attributes in 3s while offscreen) and a carousel glide that
// re-rendered its machines on every scroll event. Run it before
// merging any homepage change — the still-when-unseen contract and
// its budgets are documented in docs/SITE-HANDBOOK.md under
// "Motion performance contract".
//
// Usage: node scripts/portal-motion-audit.mjs [base_url]
//   base_url defaults to http://localhost:3000 — pass a production
//   build's URL (e.g. http://localhost:3001) for budget-accurate
//   numbers; React dev overhead can push the cadence budgets over.
// Needs Playwright (project node_modules, or the sandbox's global
// install) and ~40s of quiet. An earlier shell variant drove the
// agent-browser CLI, but its eval answers `{}` intermittently; a
// single in-process Playwright page is deterministic, so this is the
// canonical form.
//
// Note: the cadence budgets assume headless Chromium's SwiftShader
// renderer (software GL, the worst case). Attribute-write and referee
// budgets are renderer-independent and hold anywhere.
//
// Environment notes — both have falsified an audit run once:
//   - Close every other live browser session of the site first. A
//     second Chromium rendering the page steals CPU from SwiftShader
//     and wrecks the cadence budgets (the hero read 104ms frames with
//     a sibling open and 21ms without — same build).
//   - Verify the server is actually the build you think it is. A
//     stale `next start` that failed to bind (EADDRINUSE) keeps
//     serving the old build, whose chunk hashes no longer exist on
//     disk — the page then never hydrates and every check fails
//     against a ghost. Kill the listener by PID (`ss -tlnp`), and
//     confirm one referenced chunk URL returns 200 before auditing.
//   scripts/probe-hydration.mjs and scripts/probe-hero-frames.mjs
//   are the two diagnostic probes that caught each of these.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright'));
}

const BASE = process.argv[2] ?? 'http://localhost:3000';
let failed = false;

const pass = (name, value) => console.log(`PASS  ${name} (${value})`);
const fail = (name, expected, got) => {
  console.log(`FAIL  ${name}: expected ${expected}, got ${got}`);
  failed = true;
};
const checkEq = (name, expected, got) =>
  expected === String(got) ? pass(name, got) : fail(name, expected, got);
const checkLe = (name, max, got) =>
  Number(got) <= max ? pass(`${name}`, `${got} <= ${max}`) : fail(name, `<= ${max}`, got);

/* ————— the instrument ————— */

const installCounters = (page) =>
  page.evaluate(() => {
    if (!window.__auditInstalled) {
      const orig = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function (k, v) {
        window.__auditW.n++;
        return orig.call(this, k, v);
      };
      window.__auditInstalled = true;
    }
    window.__auditW = { n: 0 };
    window.__auditF = [];
    window.__auditLast = performance.now();
    window.__auditOn = true;
    const loop = (t) => {
      if (!window.__auditOn) return;
      window.__auditF.push(t - window.__auditLast);
      window.__auditLast = t;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

const readCounters = (page) =>
  page.evaluate(() => {
    window.__auditOn = false;
    const f = window.__auditF.slice(1);
    const avg = f.length ? f.reduce((a, b) => a + b, 0) / f.length : 0;
    const max = f.length ? Math.max(...f) : 0;
    return {
      frames: f.length,
      avg: +avg.toFixed(1),
      max: +max.toFixed(1),
      writes: window.__auditW.n,
    };
  });

const liveRooms = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('[data-live=true]')]
      .map((e) => e.id || e.getAttribute('aria-label') || '?')
      .join(','),
  );

const gotoCenter = async (page, selector) => {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`missing section ${sel}`);
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, selector);
};

const counterText = (page) =>
  page.evaluate(() => {
    const el = document.querySelector('[data-testid=showcase-counter]');
    return el ? el.textContent : 'missing-counter';
  });

/* ————— the audit ————— */

console.log(`———— portal motion audit vs ${BASE} ————`);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // sanity: the driver can actually reach the page, and the app's
  // client JS actually hydrated (a dead renderer once answered with
  // SSR HTML — every referee verdict empty, controls frozen). Probe
  // the hero's referee verdict and reload once if it never spoke.
  const title = await page.evaluate(() => document.title.slice(0, 8));
  checkEq('driver reaches page', 'IAL CHEM', title);
  const hydrated = () =>
    page.evaluate(() => document.querySelector('#top')?.getAttribute('data-live') ?? '');
  if ((await hydrated()) === '') {
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
  }
  checkEq('app hydrated (hero verdict present)', 'true', await hydrated());

  // — 1. the referee: exactly one room on stage, none between rooms —
  const rooms = [
    ['[id="top"]', 'top', 'referee@hero (one live room: top)'],
    ['[id="workflow"]', '', 'referee@workflow (all rooms still)'],
    ['[id="showcase"]', 'showcase', 'referee@showcase (one live room: showcase)'],
    ['[id="units"]', 'units', 'referee@units (one live room: units)'],
    ['[id="lab"]', 'lab', 'referee@lab (one live room: lab)'],
    ['section[aria-label="In closing"]', 'In closing', 'referee@interlude (one live room)'],
  ];
  for (const [selector, expected, name] of rooms) {
    await gotoCenter(page, selector);
    await page.waitForTimeout(800);
    checkEq(name, expected, await liveRooms(page));
  }

  // — 2. hero: cadence + attribute-write budget (the 13,974-writes bug) —
  await gotoCenter(page, '[id="top"]');
  await page.waitForTimeout(500);
  await installCounters(page);
  await page.waitForTimeout(3000);
  const hero = await readCounters(page);
  checkLe('hero frame avg (ms)', 25, hero.avg);
  checkLe('hero frame max (ms)', 100, hero.max);
  checkLe('hero setAttribute per 3s', 500, hero.writes);

  // — 3. units + lab: write budgets while on stage —
  await gotoCenter(page, '[id="units"]');
  await page.waitForTimeout(500);
  await installCounters(page);
  await page.waitForTimeout(3000);
  const units = await readCounters(page);
  checkLe('units setAttribute per 3s', 3000, units.writes);

  await gotoCenter(page, '[id="lab"]');
  await page.waitForTimeout(500);
  await installCounters(page);
  await page.waitForTimeout(3000);
  const lab = await readCounters(page);
  checkLe('lab setAttribute per 3s', 16000, lab.writes);

  // — 4. showcase glide: locked cadence through a smooth scroll —
  await gotoCenter(page, '[id="showcase"]');
  await page.waitForTimeout(800);
  const before = await counterText(page);
  await page.evaluate(() => {
    window.__auditF = [];
    window.__auditLast = performance.now();
    window.__auditOn = true;
    const loop = (t) => {
      if (!window.__auditOn) return;
      window.__auditF.push(t - window.__auditLast);
      window.__auditLast = t;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  // the carousel disables its controls mid-glide; wait for a clickable one
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="Next showcase card"]')?.disabled,
    { timeout: 8000 },
  );
  await page.click('[aria-label="Next showcase card"]');
  await page.waitForTimeout(1200);
  const glide = await page.evaluate(() => {
    window.__auditOn = false;
    const f = window.__auditF.slice(1);
    return {
      over25: f.filter((x) => x > 25).length,
      avg: +(f.reduce((a, b) => a + b, 0) / Math.max(f.length, 1)).toFixed(1),
    };
  });
  const after = await counterText(page);
  // One frame over 25ms is the trusted click's own reaction cost (input
  // handling, scrollTo initiation) — a re-render storm shows up as many
  // long frames and a dragged-out average instead.
  checkLe('glide frames over 25ms', 1, glide.over25);
  checkLe('glide frame avg (ms)', 20, glide.avg);
  if (before !== after) pass(`glide counter advanced (${before} -> ${after})`);
  else fail('glide counter advanced', 'changed', before);
  // restore slide 01 for repeat runs
  await page.click('[aria-label="Previous showcase card"]');
  await page.waitForTimeout(1000);

  // — 5. no horizontal overflow at desktop or phone —
  const overflowAt = () =>
    page.evaluate(() => document.body.scrollWidth - window.innerWidth);
  checkEq('overflow-x @1440', '0', await overflowAt());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(800);
  checkEq('overflow-x @390', '0', await overflowAt());
  await page.setViewportSize({ width: 1440, height: 900 });
} finally {
  await browser.close();
}

console.log('————');
if (!failed) {
  console.log('ALL CHECKS PASSED');
  process.exit(0);
} else {
  console.log('AUDIT FAILED — fix before merging (see docs/SITE-HANDBOOK.md, Motion performance contract)');
  process.exit(1);
}
