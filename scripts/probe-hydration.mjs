#!/usr/bin/env node
// One-shot diagnostic: load the portal in Playwright's Chromium and
// report console errors, failed requests and hydration evidence.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/home/z/.npm-global/lib/node_modules/playwright'));
}

const BASE = process.argv[2] ?? 'http://localhost:3001';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleMsgs = [];
page.on('console', (m) => consoleMsgs.push(`[${m.type()}] ${m.text().slice(0, 300)}`));
const failures = [];
page.on('requestfailed', (r) => failures.push(`${r.url().slice(0, 160)} :: ${r.failure()?.errorText}`));
const badResponses = [];
page.on('response', (r) => {
  if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url().slice(0, 160)}`);
});

await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5000);

const evidence = await page.evaluate(() => ({
  heroLive: document.querySelector('#top')?.getAttribute('data-live') ?? '(absent)',
  nextData: !!window.__NEXT_DATA__,
  hasNext: typeof window.next !== 'undefined',
  scripts: [...document.querySelectorAll('script[src]')].length,
  rooms: document.querySelectorAll('[data-live]').length,
}));

console.log('EVIDENCE', JSON.stringify(evidence, null, 2));
console.log('CONSOLE', consoleMsgs.length ? consoleMsgs.slice(0, 12).join('\n') : '(none)');
console.log('FAILED REQUESTS', failures.length ? failures.join('\n') : '(none)');
console.log('HTTP >=400', badResponses.length ? badResponses.join('\n') : '(none)');
await browser.close();
