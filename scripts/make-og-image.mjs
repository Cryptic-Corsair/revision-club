// make-og-image.mjs — renders public/og.png (1200×630): the site's
// brand card, set in its own fonts (Fredoka + Nunito, self-hosted
// woff2 via file://) and house palette (cream parchment, espresso
// ink). Screenshot by headless Chromium at exact size.
import { createRequire } from 'module';
import { writeFileSync } from 'fs';
const require = createRequire('/home/z/my-project/scripts/');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face { font-family: "Fredoka"; src: url("file:///home/z/my-project/src/app/fonts/fredoka-var.woff2") format("woff2"); font-weight: 300 700; }
  @font-face { font-family: "Nunito"; src: url("file:///home/z/my-project/src/app/fonts/nunito-var.woff2") format("woff2"); font-weight: 400 800; }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #fdf6e3; color: #2c2013;
    font-family: "Nunito", sans-serif;
    display: flex; align-items: center; justify-content: center;
  }
  .card { position: relative; width: 100%; height: 100%; padding: 72px 84px;
    display: flex; flex-direction: column; justify-content: space-between; }
  /* the polka-dot paper, quietly */
  .dots { position: absolute; inset: 0;
    background-image: radial-gradient(rgb(44 32 19 / 0.07) 1.6px, transparent 1.6px);
    background-size: 26px 26px; }
  .brand { position: relative;
    font-family: "Fredoka", sans-serif; font-weight: 600;
    font-size: 64px; letter-spacing: 0.02em; line-height: 1; }
  .brand .chem { color: #b3541e; }
  .rule { position: relative; width: 132px; height: 5px; background: #b3541e;
    border-radius: 3px; margin: 28px 0 0; }
  h1 { position: relative;
    font-family: "Fredoka", sans-serif; font-weight: 600;
    font-size: 76px; line-height: 1.08; margin-top: 34px; max-width: 900px; }
  .sub { position: relative; font-size: 30px; font-weight: 600;
    color: rgb(44 32 19 / 0.72); margin-top: 26px; max-width: 880px; line-height: 1.4; }
  .chips { position: relative; display: flex; gap: 14px; }
  .chip { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 24px;
    padding: 10px 22px; border: 2.5px solid rgb(44 32 19 / 0.25);
    border-radius: 999px; }
  .chip.alt { background: #2c2013; color: #fdf6e3; border-color: #2c2013; }
</style></head>
<body><div class="card">
  <div class="dots"></div>
  <div>
    <div class="brand">IAL <span class="chem">CHEM</span></div>
    <div class="rule"></div>
    <h1>Revision notes, written the way they're taught</h1>
    <div class="sub">Complete class notes for the Pearson Edexcel International A Level Chemistry spec — six units, thirty-three topics, thirty worked examples.</div>
  </div>
  <div class="chips">
    <div class="chip alt">WCH11</div><div class="chip">WCH12</div>
    <div class="chip">WCH13</div><div class="chip">WCH14</div>
    <div class="chip">WCH15</div><div class="chip">WCH16</div>
  </div>
</div></body></html>`;

/* served from a real file:// page — setContent pages run on an
   about:blank origin, and Chromium refuses file:// font URLs there */
writeFileSync('/tmp/og-card.html', html);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto('file:///tmp/og-card.html', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/home/z/my-project/public/og.png' });
await browser.close();
console.log('og.png written');
