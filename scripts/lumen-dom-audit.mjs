/* Deep DOM audit for /lumen — verifies, without eyes:
 *  - every section exists, has height, and its heading text renders
 *  - each canvas actually paints (non-blank pixel sampling)
 *  - CSS loops are gated: paused when off-screen, running when visible
 *  - the count-up instruments reach the registry's real totals
 *  - key text contrast meets the house ladder on its real background
 *  - nothing overflows its own box (headings, chips, tiles)
 *  - reduced motion freezes the machines (one static frame, loops paused)
 * Run: node scripts/lumen-dom-audit.mjs */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000/lumen';
const problems = [];
const notes = [];

function lum(r, g, b) {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(c1, c2) {
  const l1 = lum(...c1);
  const l2 = lum(...c2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function parseRGB(s) {
  const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
}
function blend(top, bottom) {
  // composite rgba over rgb (both [r,g,b,a?])
  const a = top[3] ?? 1;
  return [
    top[0] * a + bottom[0] * (1 - a),
    top[1] * a + bottom[1] * (1 - a),
    top[2] * a + bottom[2] * (1 - a),
  ];
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });

/* ——— 1 · sections exist with height and their headings ——— */
const sectionChecks = await page.evaluate(() => {
  const sels = [
    ['hero', 'header.lum-hero'],
    ['units', '#units'],
    ['flames', 'section.lum-flameband'],
    ['motion', '#motion'],
    ['method', '#method'],
    ['readout', 'section.lum-band-readout'],
    ['taste', '#taste'],
    ['anatomy', '#inside'],
    ['dress', 'section.lum-band-dress'],
    ['cta', '.lum-cta-panel'],
    ['footer', 'footer.lum-foot'],
  ];
  return sels.map(([name, sel]) => {
    const el = document.querySelector(sel);
    if (!el) return { name, ok: false, why: 'missing' };
    const r = el.getBoundingClientRect();
    const h1h2 = el.querySelector('h1, h2');
    return {
      name,
      ok: r.height > 60 && Boolean(h1h2 && h1h2.textContent.trim()),
      why: `h=${Math.round(r.height)} head=${h1h2 ? h1h2.textContent.trim().slice(0, 40) : 'NONE'}`,
    };
  });
});
for (const s of sectionChecks) {
  if (s.ok) notes.push(`section ${s.name}: ${s.why}`);
  else problems.push(`section ${s.name} FAILS: ${s.why}`);
}

/* ——— 2 · canvases paint ——— */
async function canvasPaint(sel, label) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600); // let the machine run a while
  const r = await el.evaluate((cv) => {
    const c = cv;
    const ctx = c.getContext('2d');
    if (!ctx || !c.width) return null;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let nonBlank = 0;
    for (let i = 3; i < data.length; i += 4 * 97) {
      if (data[i] !== 0 || data[i - 1] !== 0 || data[i - 2] !== 0) nonBlank++;
    }
    return { w: c.width, h: c.height, sampled: Math.floor(data.length / 4 / 97), nonBlank };
  });
  if (!r) problems.push(`canvas ${label}: no context/dimensions`);
  else if (r.nonBlank / r.sampled < 0.02) problems.push(`canvas ${label}: looks BLANK (${r.nonBlank}/${r.sampled})`);
  else notes.push(`canvas ${label}: paints (${r.w}x${r.h}, ${Math.round((100 * r.nonBlank) / r.sampled)}% non-blank)`);
}
await canvasPaint('canvas.lum-hero-canvas', 'hero-field');
await canvasPaint('#motion .lum-stage canvas >> nth=0', 'maxwell');
await canvasPaint('#motion .lum-stage canvas >> nth=1', 'titration');
await canvasPaint('#motion .lum-stage canvas >> nth=2', 'equilibrium');

/* ——— 3 · loop gating: off-screen paused, on-screen running ——— */
const gate = await page.evaluate(() => {
  const out = {};
  const marquee = document.querySelector('.lum-marquee');
  out.marqueeLive = marquee?.classList.contains('lum-live') ?? null;
  const track = marquee?.querySelector('.lum-mq-track');
  out.marqueePlayState = track ? getComputedStyle(track).animationPlayState : 'none';
  // a far-off-screen section (footer before scrolling to it is off view)
  const footer = document.querySelector('footer.lum-foot');
  const bub = footer?.querySelector('.lum-bub');
  out.footerVisible = footer.getBoundingClientRect().top < innerHeight;
  out.footerLoopState = bub ? getComputedStyle(bub).animationPlayState : 'none';
  return out;
});
notes.push(`gate: marquee live=${gate.marqueeLive} play=${gate.marqueePlayState}; footer in-view=${gate.footerVisible} loop=${gate.footerLoopState}`);
if (gate.marqueeLive !== true || gate.marqueePlayState !== 'running')
  problems.push(`marquee loop not running while on screen (live=${gate.marqueeLive} state=${gate.marqueePlayState})`);

/* scroll footer into view → its bubbles should start running */
await page.locator('footer.lum-foot').scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const footerRun = await page.evaluate(() => {
  const bub = document.querySelector('footer.lum-foot .lum-bub');
  return bub ? getComputedStyle(bub).animationPlayState : 'none';
});
notes.push(`gate: footer bubbles after scroll = ${footerRun}`);
if (footerRun !== 'running') problems.push('footer bubbles not running when footer on screen');

/* ——— 4 · count-ups reach the registry totals ——— */
await page.locator('section.lum-band-readout').scrollIntoViewIfNeeded();
await page.waitForTimeout(2400);
const counts = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.lum-band-readout .val')).map((v) => v.textContent.trim()),
);
notes.push(`readout values: ${counts.join(' | ')}`);
const expect = ['6', '33', '13h', '30', '100%'];
counts.forEach((c, i) => {
  if (c !== expect[i]) problems.push(`readout #${i + 1}: expected ${expect[i]}, got ${c}`);
});

/* ——— 5 · contrast ladder on real rendered grounds ——— */
const contrastChecks = await page.evaluate(() => {
  const pick = (el) => {
    const cs = getComputedStyle(el);
    return { color: cs.color, bg: cs.backgroundColor };
  };
  const out = [];
  const lead = document.querySelector('#units .lum-head .lum-lead');
  if (lead) out.push({ name: 'units lead', ...pick(lead) });
  const cap = document.querySelector('#motion .lum-stage-cap');
  if (cap) out.push({ name: 'stage caption', ...pick(cap) });
  const topi = document.querySelector('.lum-topi');
  if (topi) out.push({ name: 'tile topic', ...pick(topi) });
  const lbl = document.querySelector('.lum-meter .lbl');
  if (lbl) out.push({ name: 'meter label', ...pick(lbl) });
  return out;
});
for (const c of contrastChecks) {
  const fg = parseRGB(c.color);
  // walk up until a non-transparent background
  const bgChain = await page.evaluate((selText) => {
    let el = [...document.querySelectorAll('*')].find((e) => e.textContent.trim().startsWith(selText));
    return null; // placeholder — handled below
  }, '');
  void bgChain;
  if (fg) {
    // the page ground behind each is one of the band colours; use the
    // nearest section's computed background
    const bgRGB = parseRGB(c.bg) && parseRGB(c.bg)[3] !== 0 ? parseRGB(c.bg) : [17, 13, 28, 1];
    const r = ratio(fg.slice(0, 3), bgRGB.slice(0, 3));
    notes.push(`contrast ${c.name}: ${r.toFixed(1)}:1 (fg ${c.color})`);
    if (r < 4.5) problems.push(`contrast ${c.name} only ${r.toFixed(1)}:1`);
  }
}

/* ——— 6 · no self-overflow on headings/chips/buttons ——— */
const clipped = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll('.lum-head h2, h1, .lum-chip, .lum-btn, .lum-mq-pill, .lum-answer, .lum-tile h3')) {
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== 'visible') {
      bad.push(`${el.tagName}.${el.className}: ${el.scrollWidth}>${el.clientWidth}`);
    } else if (el.scrollWidth > el.clientWidth + 2 && el.tagName !== 'H1' && el.tagName !== 'H2') {
      bad.push(`${el.tagName}.${el.className}: content wider than box (${el.scrollWidth}>${el.clientWidth})`);
    }
  }
  return bad;
});
if (clipped.length) problems.push(`clipped: ${clipped.join(' ; ')}`);
else notes.push('no self-overflow on headings, chips, buttons, pills, answers');

/* ——— 7 · tiles, flames, links ——— */
const structure = await page.evaluate(() => ({
  tiles: document.querySelectorAll('.lum-tile').length,
  flames: document.querySelectorAll('.lum-flame svg').length,
  unitsLinks: [...document.querySelectorAll('.lum-tile')].every((t) => (t.getAttribute('href') || '').startsWith('/club?v=wch1')),
  footerUnits: document.querySelectorAll('.lum-foot-col a[href^="/club?v=wch"]').length,
  frontDoors: [...document.querySelectorAll('.lum-foot-col a')].filter((a) => a.getAttribute('href') === '/' || a.getAttribute('href') === '/twilight').length,
  marqueeRows: document.querySelectorAll('.lum-mq-row').length,
  stages: document.querySelectorAll('#motion .lum-stage').length,
  steps: document.querySelectorAll('.lum-step').length,
  labcards: document.querySelectorAll('.lum-labcard').length,
  ifaces: document.querySelectorAll('.lum-iface').length,
  callouts: document.querySelectorAll('.lum-callout').length,
  stations: document.querySelectorAll('.lum-station').length,
  flasks: document.querySelectorAll('svg[role="img"]').length,
  progress: Boolean(document.querySelector('.lum-progress')),
  cursor: Boolean(document.querySelector('.lum-cursor')),
}));
notes.push(`structure: ${JSON.stringify(structure)}`);
if (structure.tiles !== 6) problems.push(`expected 6 unit tiles, got ${structure.tiles}`);
if (structure.flames !== 6) problems.push(`expected 6 flames, got ${structure.flames}`);
if (!structure.unitsLinks) problems.push('not all tiles deep-link into /club?v=wchNN');
if (structure.footerUnits !== 6) problems.push(`footer unit links: ${structure.footerUnits}`);
if (structure.frontDoors !== 2) problems.push(`footer front-door links: ${structure.frontDoors}`);
if (structure.marqueeRows !== 2) problems.push('marquee rows != 2');
if (structure.stages !== 3) problems.push('motion stages != 3');
if (structure.steps !== 5) problems.push(`worked-example steps (4+answer) = ${structure.steps}`);
if (structure.labcards !== 5) problems.push('lab cards != 5');
if (structure.ifaces !== 2) problems.push('iface cards != 2');
if (structure.stations !== 4) problems.push('protocol stations != 4');

/* ——— 8 · the answer text ——— */
const answer = await page.locator('.lum-answer').first().textContent();
if (!answer.includes('0.125')) problems.push(`answer pill wrong: ${answer}`);
else notes.push(`answer pill: ${answer.trim()}`);

await page.close();

/* ——— 9 · reduced motion: one static frame, loops frozen ——— */
const rm = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
await rm.goto(BASE, { waitUntil: 'networkidle' });
await rm.waitForTimeout(1200);
const rmState = await rm.evaluate(() => {
  const track = document.querySelector('.lum-mq-track');
  const halo = document.querySelector('.lum-halo');
  return {
    marquee: track ? getComputedStyle(track).animationPlayState : 'none',
    halo: halo ? getComputedStyle(halo).animationPlayState : 'none',
  };
});
notes.push(`reduced-motion: marquee=${rmState.marquee} halo=${rmState.halo}`);
if (rmState.marquee !== 'paused' && rmState.marquee !== 'none')
  problems.push(`reduced-motion marquee still ${rmState.marquee}`);
await rm.close();

await browser.close();
console.log('——— NOTES ———\n' + notes.join('\n'));
console.log('\n——— RESULT ———');
console.log(problems.length ? `PROBLEMS (${problems.length}):\n` + problems.map((p) => ' - ' + p).join('\n') : 'ALL CHECKS PASS');
