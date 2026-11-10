/* ═══════════════════════════════════════════════════════════════
   THE FILM · the char splitter
   Headlines are split into spans so GSAP can spring them in one
   glyph at a time. The heading keeps an aria-label; the spans are
   aria-hidden, so screen readers hear words, not letters.
   ═══════════════════════════════════════════════════════════════ */

export function Chars({ text, outline }: { text: string; outline?: boolean }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`f-char${outline ? " f-outline" : ""}`}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}
