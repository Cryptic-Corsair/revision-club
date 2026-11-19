/* Visual + console audit for the /lumen front door.
 * Captures section screenshots at three viewports (into /tmp/render),
 * checks horizontal overflow, and reports console/page errors.
 * Run: node scripts/lumen-screens.mjs */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3000/lumen';
const OUT = '/tmp/render';
mkdirSync(OUT, { recursive: true });

const SECTIONS = [
  ['hero', 0],
  ['units', '#units'],
  ['flames', 'section.lum-flameband'],
  ['motion', '#motion'],
  ['method', '#method'],
  ['readout', 'section.lum-band-readout'],
  ['taste', '#taste'],
  ['anatomy', '#inside'],
  ['dress', 'section.lum-band-dress'],
  ['footer', 'footer.lum-foot'],
];

const browser = await chromium.launch();
const problems = [];

for (const [w, h] of [
  [1440, 900],
  [768, 1024],
  [375, 812],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => errors.push(`PAGEERROR: ${String(e).slice(0, 200)}`));

  await page.goto(BASE, { waitUntil: 'networkidle' });
  // scroll through slowly so every whileInView fires, then rest
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    await new Promise((r) => setTimeout(r, 400));
  });

  const overflow = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
    bw: document.body.scrollWidth,
  }));
  if (overflow.sw > overflow.cw + 1 || overflow.bw > overflow.cw + 1) {
    problems.push(`viewport ${w}: horizontal overflow scrollWidth=${overflow.sw} clientWidth=${overflow.cw} body=${overflow.bw}`);
  }

  const shots = w === 1440 ? SECTIONS : [['hero', 0], ['units', '#units'], ['footer', 'footer.lum-foot']];
  for (const [name, sel] of shots) {
    if (sel === 0) await page.evaluate(() => window.scrollTo(0, 0));
    else await page.locator(sel).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({
      path: `${OUT}/lumen-${w}-${name}.jpg`,
      type: 'jpeg',
      quality: 62,
    });
  }

  if (errors.length) problems.push(`viewport ${w}: console errors: ${errors.slice(0, 4).join(' | ')}`);
  const title = await page.title();
  console.log(`${w}px done — title: ${title}`);
  await page.close();
}

await browser.close();
console.log(problems.length ? `PROBLEMS:\n${problems.join('\n')}` : 'NO overflow or console problems detected');
