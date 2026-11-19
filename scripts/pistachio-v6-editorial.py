#!/usr/bin/env python3
"""Pistachio editorial v6 — the handout on the orchard desk.

v5's husk ground with milk text measured fine (6.9:1) but read badly
for study: dense body text sat RAW on a mid-dark saturated green (the
clauses are transparent panels), sheets were near-identical deep
greens, and the whole page was one dark soup. v6 restores the study
standard while keeping the pistachio identity loud:

· page ground: the REAL kernel #a9b665 — the orchard desk
· clause bands become warm-white handout sheets (#fbfcf3), rounded
  and lifted, alternating a pale pistachio #edf1dd (kernel 16% into
  the sheet) — the document's band rhythm, on paper
· ink: the dark olive ladder on paper — body 14:1, study-grade
· accents: plum numerals/labels/selection (13.8:1 on paper); the
  lemon highlighter keeps its dark pen
All pairs in scripts/pistachio-palette.py — ALL PASS.
"""
import pathlib

GS = pathlib.Path('/home/z/my-project/src/app/globals.css')
s = GS.read_text()

def sub(old, new, tag):
    global s
    n = s.count(old)
    assert n == 1, (tag, f"found {n}")
    s = s.replace(old, new)
    print("ok", tag)

# ————— 1 · the dress tokens: kernel page, white paper, olive ink —————
sub('''/* the grounds ride on body:has(.legal-room) so the homepage and the
   shared chrome keep their own dress — the husk belongs to the
   document reader's pages alone (the reader mounts client-side, so
   a deep link paints the pale page behind the loading state first,
   exactly like every other reader load) */
html[data-iface="editorial"].pistachio body:has(.legal-room) {
  --color-cream: #4e5a28; /* the husk fills the page */
  --color-paper: color-mix(in oklab, #262c10 18%, #4e5a28);
  --tint-base: color-mix(in oklab, #262c10 25%, var(--color-paper));
  --color-ink: #f6f8e8;
  --color-ink-soft: color-mix(in oklab, #4e5a28 14%, #fffdf7);
  --color-ink-faint: color-mix(in oklab, #4e5a28 28%, #fffdf7);
  --shade-ink: #4e5a28;
  --edge: rgb(8 10 3 / 0.3);
}
html[data-iface="editorial"].pistachio {
  --iface-rust: #ffd43b; /* chrome-wide accent, the base pattern */
}''',
'''/* the grounds ride on body:has(.legal-room) so the homepage and the
   shared chrome keep their own dress — the document reader's dress
   belongs to its pages alone (the reader mounts client-side, so a
   deep link paints the pale page behind the loading state first,
   exactly like every other reader load). v6 is the handout on the
   orchard desk: the kernel fills the page, the reading happens on
   warm-white sheets, and the ink is the dark olive study ladder —
   dense text never sits raw on a coloured ground (v5's husk-and-milk
   measured 6.9:1 and still read like wading through green). */
html[data-iface="editorial"].pistachio body:has(.legal-room) {
  --color-cream: #a9b665; /* the kernel fills the page */
  --color-paper: #fbfcf3; /* warm-white handout sheets */
  --tint-base: color-mix(in oklab, #a9b665 16%, var(--color-paper));
  --color-ink: #262c10;
  --color-ink-soft: #3a4115;
  --color-ink-faint: #515925;
  --shade-ink: #a9b665;
  --edge: rgb(38 44 16 / 0.14);
}
html[data-iface="editorial"].pistachio {
  --iface-rust: #3a2337; /* plum chrome, the base pattern */
}''', "dress-tokens")

# ————— 2 · rust + clause sheets + selection —————
sub('''html.pistachio .legal-room {
  --legal-rust: #ffd43b;
}
/* on the husk, the lemon selection and the marker keep their dark
   pen — light ink on lemon would vanish */
html[data-iface="editorial"].pistachio body:has(.legal-room) ::selection {
  background: #ffd43b;
  color: #2b3114;
}
html[data-iface="editorial"].pistachio body:has(.legal-room) mark {
  color: #2b3114;
}''',
'''html.pistachio .legal-room {
  --legal-rust: #3a2337; /* plum labels and clause numerals on paper */
}
/* the clause bands become the handout sheets — alternating warm white
   and pale pistachio (kernel 16% into the sheet), rounded, lifted off
   the kernel desk with a soft olive shadow: the document keeps its
   band rhythm, on paper */
html[data-iface="editorial"].pistachio .legal-clauses {
  gap: 14px;
}
html[data-iface="editorial"].pistachio .legal-clause {
  background: #fbfcf3;
  border-radius: calc(18px * var(--ui-scale));
  border-bottom: none;
  padding: 22px 26px 26px;
  box-shadow:
    0 1px 0 rgb(38 44 16 / 0.05),
    0 14px 30px -22px rgb(38 44 16 / 0.4);
}
html[data-iface="editorial"].pistachio .legal-clause.is-band-espresso {
  background: color-mix(in oklab, #a9b665 16%, #fbfcf3);
}
html[data-iface="editorial"].pistachio .legal-clause:first-child {
  padding-top: 22px;
}
/* the plum selection; the marker keeps the daylight lemon + dark pen
   — the one swipe of brightness on the paper */
html[data-iface="editorial"].pistachio body:has(.legal-room) ::selection {
  background: #3a2337;
  color: #fffdf7;
}
html[data-iface="editorial"].pistachio body:has(.legal-room) mark {
  color: #2b3114;
}''', "clause-sheets + selection")

GS.write_text(s)
print("v6 applied")
