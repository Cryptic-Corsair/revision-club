/* Focused re-check: is the hero field actually animating (pixel diff
 * between two snapshots), and does the marquee run when on screen? */
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/lumen', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const heroAnim = await page.evaluate(async () => {
  const cv = document.querySelector('canvas.lum-hero-canvas');
  const ctx = cv.getContext('2d');
  const snap = () => {
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    const s = new Set();
    for (let i = 0; i < d.length; i += 4 * 53) s.add(`${d[i]},${d[i + 1]},${d[i + 2]},${i}`);
    return s;
  };
  const a = snap();
  await new Promise((r) => setTimeout(r, 500));
  const b = snap();
  let changed = 0;
  for (const k of a) if (!b.has(k)) changed++;
  return { sampled: a.size, changed };
});
console.log(
  `hero field: ${heroAnim.changed}/${heroAnim.sampled} sampled pixels changed over 500ms → ${
    heroAnim.changed > 3 ? 'ANIMATING' : 'STATIC (problem)'
  }`
);

const marquee = await page.evaluate(() => {
  const m = document.querySelector('.lum-marquee');
  const r = m.getBoundingClientRect();
  const track = m.querySelector('.lum-mq-track');
  return {
    live: m.classList.contains('lum-live'),
    play: getComputedStyle(track).animationPlayState,
    top: Math.round(r.top),
    height: Math.round(r.height),
    inViewport: r.top < innerHeight && r.bottom > 0,
  };
});
console.log(
  `marquee at scroll 0: live=${marquee.live} play=${marquee.play} top=${marquee.top} h=${marquee.height} inView=${marquee.inViewport}`
);

await browser.close();
