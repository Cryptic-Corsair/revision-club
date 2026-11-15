// One-shot codemod pass 3: fold the inline half-strength display-head
// formula (1+(var(--ui-scale)-1)*0.5) into the --tch-ed var. At any
// preset --tch-ed resolves to exactly D = 1 + (scale−1)×0.5 (the
// ratio term is 1), so rendering is pixel-identical; with the
// headings role tuned, these heads now move proportionally with the
// rest of the headings system instead of ignoring it. Idempotent.
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'node:fs';

const root = '/home/z/my-project';
const RE = /\(1\+\(var\(--ui-scale\)-1\)\*0\.5\)/g;

let n = 0;
for (const f of globSync(`${root}/src/components/**/*.tsx`)) {
  const before = readFileSync(f, 'utf8');
  const m = before.match(RE);
  if (!m) continue;
  writeFileSync(f, before.replace(RE, 'var(--tch-ed)'));
  n += m.length;
  console.log(`${String(m.length).padStart(3)}  ${f.replace(root + '/', '')}`);
}
console.log(`total: ${n} display heads folded to --tch-ed`);
