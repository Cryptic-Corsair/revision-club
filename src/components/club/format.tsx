import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · <Fmt/> — inline markup → typography
   **bold** · *em* · ==highlight== · ~subscript~ · ^superscript^

   Plus plural() — the count-word helper the hero stat lines share
   ("1 diagram", not "1 diagrams").
   ═══════════════════════════════════════════════════════════════ */

/* "2 diagrams" / "1 diagram" — the plural supplies its own 's' */
export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const TOKEN = /(\*\*(.+?)\*\*|\*(.+?)\*|==(.+?)==|~(.+?)~|\^(.+?)\^)/;

export function Fmt({ text }: { text: string }) {
  return <>{parse(text)}</>;
}

function parse(text: string, keyPrefix = "f"): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let i = 0;
  let guard = 0;

  while (rest.length > 0 && guard++ < 500) {
    const m = TOKEN.exec(rest);
    if (!m) {
      out.push(rest);
      break;
    }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const key = `${keyPrefix}-${i++}`;
    const inner = m[2] ?? m[3] ?? m[4] ?? m[5] ?? m[6] ?? "";

    if (m[2] !== undefined) {
      out.push(
        <strong key={key} className="font-extrabold text-ink">
          {parse(inner, key)}
        </strong>
      );
    } else if (m[3] !== undefined) {
      out.push(
        <em key={key} className="font-bold italic">
          {parse(inner, key)}
        </em>
      );
    } else if (m[4] !== undefined) {
      out.push(<mark key={key}>{parse(inner, key)}</mark>);
    } else if (m[5] !== undefined) {
      out.push(
        <sub key={key} className="text-[0.72em]">
          {inner}
        </sub>
      );
    } else {
      out.push(
        <sup key={key} className="text-[0.72em]">
          {inner}
        </sup>
      );
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

/** Plain-text twin for aria-labels and search strings */
export function fmtPlain(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/==([^=]+)==/g, "$1")
    .replace(/~([^~]+)~/g, "$1")
    .replace(/\^([^^]+)\^/g, "$1");
}
