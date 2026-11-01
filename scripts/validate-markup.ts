/* Validate Spectra inline markup across all content.
   Run: bun scripts/validate-markup.ts */
import { UNITS } from "../src/lib/spectra/units";
import type { Block } from "../src/lib/spectra/types";

const TOKEN =
  /(\*\*(.+?)\*\*|\*(.+?)\*|==(.+?)==|~(.+?)~|\^(.+?)\^)/;

const MAXLEN: Record<string, number> = {
  bold: 60,
  em: 45,
  mark: 55,
  sub: 8,
  sup: 8,
};

function check(s: string): string[] {
  const issues: string[] = [];
  let rest = s;
  let guard = 0;
  while (rest.length && guard++ < 800) {
    const m = TOKEN.exec(rest);
    if (!m) break;
    const inner = m[2] ?? m[3] ?? m[4] ?? m[5] ?? m[6] ?? "";
    const kind = m[2] ? "bold" : m[3] ? "em" : m[4] ? "mark" : m[5] ? "sub" : "sup";
    if (inner.length > MAXLEN[kind])
      issues.push(
        `${kind} swallowed ${inner.length} chars: "${inner.slice(0, 64)}…"`
      );
    rest = rest.slice(m.index + m[0].length);
  }
  if (/[~^]/.test(rest))
    issues.push(`unbalanced residue: "${rest.slice(0, 80)}"`);
  if (rest.includes("*"))
    issues.push(`stray asterisk: "${rest.slice(0, 80)}"`);
  if (rest.includes("=="))
    issues.push(`stray highlight: "${rest.slice(0, 80)}"`);
  return issues;
}

const texts: { where: string; s: string }[] = [];
for (const u of UNITS) {
  texts.push({ where: `${u.code} story`, s: u.story });
  texts.push({ where: `${u.code} blurb`, s: u.blurb });
  texts.push({ where: `${u.code} spectrumNote`, s: u.spectrumNote ?? "" });
  u.topics.forEach((t, ti) => {
    texts.push({ where: `${u.code}/${t.id} title`, s: t.title });
    texts.push({ where: `${u.code}/${t.id} summary`, s: t.summary });
    t.blocks.forEach((b: Block, bi) => {
      const at = `${u.code}/${t.id} block#${bi}(${b.k})`;
      switch (b.k) {
        case "p":
          texts.push({ where: at, s: b.text });
          break;
        case "def":
          texts.push({ where: at, s: b.term });
          texts.push({ where: at, s: b.text });
          break;
        case "eq":
          texts.push({ where: at, s: b.eq });
          if (b.note) texts.push({ where: at, s: b.note });
          break;
        case "ex":
          texts.push({ where: at, s: b.title });
          b.steps.forEach((s, i) => texts.push({ where: `${at} step${i}`, s }));
          texts.push({ where: at, s: b.answer });
          break;
        case "tips":
          b.items.forEach((s, i) => texts.push({ where: `${at} tip${i}`, s }));
          break;
        case "table":
          if (b.caption) texts.push({ where: at, s: b.caption });
          b.head.forEach((s, i) => texts.push({ where: `${at} head${i}`, s }));
          b.rows.forEach((r, i) =>
            r.forEach((s, j) => texts.push({ where: `${at} row${i}[${j}]`, s }))
          );
          break;
        case "check":
          b.qs.forEach((q, i) => {
            texts.push({ where: `${at} q${i}`, s: q.q });
            texts.push({ where: `${at} a${i}`, s: q.a });
          });
          break;
        case "recap":
          b.items.forEach((s, i) => texts.push({ where: `${at} recap${i}`, s }));
          break;
      }
    });
  });
}

let bad = 0;
for (const { where, s } of texts) {
  if (!s) continue;
  const issues = check(s);
  if (issues.length) {
    bad++;
    console.log(`✗ ${where}`);
    for (const i of issues) console.log(`    ${i}`);
  }
}
console.log(
  bad === 0
    ? `✓ ${texts.length} strings checked — markup clean`
    : `✗ ${bad} strings with issues (of ${texts.length})`
);
