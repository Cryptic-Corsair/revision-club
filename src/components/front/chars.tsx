"use client";

import type { CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · split type

   Headlines arrive as single words and leave as characters, each
   one wrapped in an overflow-hidden cell so GSAP can slide it up
   from below its own baseline. Transforms only — no layout writes,
   nothing reflows after the split.
   ═══════════════════════════════════════════════════════════════ */

/** Split one word into masked characters. `offset` staggers the
    data indexes across words so a whole line can rise as one wave. */
export function Word({
  text,
  offset = 0,
  className = "",
  style,
}: {
  text: string;
  offset?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`l-word ${className}`} style={style} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="l-cell" aria-hidden>
          <span className="l-char" data-char={offset + i}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Split a whole line on spaces — words keep their gaps, every
    character keeps its cell. Outline variants dress from CSS. */
export function SplitLine({
  text,
  className = "",
  outline = false,
}: {
  text: string;
  className?: string;
  outline?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span
      className={`l-line ${outline ? "l-outline" : ""} ${className}`}
      aria-label={text}
    >
      {words.map((w, wi) => {
        const before = words.slice(0, wi).reduce((n, s) => n + s.length, 0);
        return (
          <span key={wi}>
            <Word text={w} offset={before + wi} />
            {wi < words.length - 1 && <span aria-hidden> </span>}
          </span>
        );
      })}
    </span>
  );
}
