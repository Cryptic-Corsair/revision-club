"use client";

/* ═══════════════════════════════════════════════════════════════
   THE LAB · Split — a headline cut into per-character spans

   The kinetic-typography primitive: every char rides in its own
   overflow-hidden cell so GSAP can slide it up a line box at a
   time. Words stay unbreakable so lines never re-wrap mid-act.
   ═══════════════════════════════════════════════════════════════ */

export function Split({
  text,
  className = "",
  outline = false,
}: {
  text: string;
  className?: string;
  outline?: boolean;
}) {
  return (
    <span className={className} aria-hidden>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="l-word">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="l-cell">
              <span className={`l-char${outline ? " l-outline" : ""}`}>
                {ch}
              </span>
            </span>
          ))}
          {wi < text.split(" ").length - 1 && (
            <span className="l-cell">
              <span className="l-char">&nbsp;</span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
