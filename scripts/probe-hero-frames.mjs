#!/usr/bin/env node
// One-shot: measure hero frame cadence with and without the shader canvas,
// and print the canvas backing resolution (DPR-cap evidence).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright')); }

const BASE = process.argv[2] ?? 'http://localhost:3001';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(() => document.querySelector('#top').scrollIntoView({ behavior: 'instant', block: 'center' }));
await page.waitForTimeout(1500);

const sample = (ms) => page.evaluate((duration) => new Promise((resolve) => {
  const deltas = [];
  let last = performance.now();
  let on = true;
  const loop = (t) => { if (!on) return; deltas.push(t - last); last = t; requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  setTimeout(() => { on = false; resolve({ n: deltas.length, avg: +(deltas.slice(1).reduce((a, b) => a + b, 0) / Math.max(deltas.length - 1, 1)).toFixed(1) }); }, duration);
}), ms);

console.log('CANVAS', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('#top canvas')].map((c) => ({ w: c.width, h: c.height, cssW: c.clientWidth, cssH: c.clientHeight })))));
console.log('WITH CANVAS', JSON.stringify(await sample(2000)));
await page.evaluate(() => [...document.querySelectorAll('#top canvas')].forEach((c) => c.remove()));
await page.waitForTimeout(400);
console.log('NO CANVAS', JSON.stringify(await sample(2000)));
await browser.close();
