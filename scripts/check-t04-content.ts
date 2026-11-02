/* Sanity-check the Topic 4 note content with bun:
   - inline markup balance (==, ~, ^, *)
   - figure kinds all registered
   - checkpoint pages within the 30-page PDF
   - no leftover placeholders */
import { SECTIONS_T04_A } from "../src/lib/spectra/content/notes-t04-a";
import { SECTIONS_T04_B } from "../src/lib/spectra/content/notes-t04-b";

const FIGS = new Set([
  "atom", "notation", "mass-spec", "shielding", "spectrum-neon", "spectrum-boron",
  "spectrum-bromine", "spectrum-cl2", "spectrum-ethanol", "orbitals", "fill-demo",
  "fill-order", "boxes-c", "boxes-s", "ie-graph", "succ-ie", "melting", "pt-blocks",
  "radius", "sigma-pi", "dotcross", "carbon-lattices", "shapes", "dipoles",
  "formula-types", "naming", "frac-col", "isomers", "radchain",
]);

let problems = 0;
const strings: { from: string; s: string }[] = [];
const add = (from: string, s: string | undefined) => { if (s) strings.push({ from, s }); };

for (const part of [["A", SECTIONS_T04_A], ["B", SECTIONS_T04_B]] as const) {
  for (const sec of part[1]) {
    const tag = `${part[0]}·${sec.spec}`;
    add(`${tag}/title`, sec.title);
    add(`${tag}/statement`, sec.statement);
    for (const b of sec.blocks) {
      if ("text" in b) add(`${tag}/${b.k}`, b.text);
      if (b.k === "def") add(`${tag}/def-term`, b.term);
      if (b.k === "eq") add(`${tag}/eq`, b.eq);
      if (b.k === "bullets") b.items.forEach((it, i) => add(`${tag}/bullets#${i}`, it));
      if (b.k === "table") {
        b.head.forEach((h, i) => add(`${tag}/table-head#${i}`, h));
        b.rows.forEach((r, i) => r.forEach((c, j) => add(`${tag}/table#${i}.${j}`, c)));
      }
      if (b.k === "worked") {
        add(`${tag}/worked`, b.title);
        add(`${tag}/worked-q`, b.question);
        b.steps.forEach((st, i) => add(`${tag}/worked-step#${i}`, st));
        add(`${tag}/worked-a`, b.answer);
      }
      if (b.k === "steps") b.items.forEach((it, i) => add(`${tag}/step#${i}`, it.text));
      if (b.k === "figure") {
        if (!FIGS.has(b.kind)) { console.log(`✗ unknown figure kind ${b.kind} in ${tag}`); problems++; }
      }
      if (b.k === "checkpoint" && (b.page < 1 || b.page > 30)) {
        console.log(`✗ checkpoint page ${b.page} out of range in ${tag}`); problems++;
      }
    }
  }
}

for (const { from, s } of strings) {
  const count = (re: RegExp) => (s.match(re) ?? []).length;
  const bad: string[] = [];
  if (count(/==/g) % 2) bad.push("==");
  if (count(/~/g) % 2) bad.push("~");
  if (count(/\^/g) % 2) bad.push("^");
  if (count(/\*/g) % 2) bad.push("*");
  if (bad.length) { console.log(`✗ unbalanced ${bad.join(",")} in ${from}: ${s.slice(0, 90)}`); problems++; }
  if (/TODO|XXX|PLACEHOLDER|待补充/.test(s)) { console.log(`✗ placeholder text in ${from}`); problems++; }
}

console.log(`checked ${strings.length} strings across ${SECTIONS_T04_A.length + SECTIONS_T04_B.length} sections`);
console.log(problems === 0 ? "ALL CLEAN" : `${problems} PROBLEM(S)`);
