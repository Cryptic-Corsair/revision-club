# Axiom — "The Margins" · IAL Chemistry Edition
### v3 Prompt for Google AI Studio (Build mode) — Chemistry only

> **What changed in v3:** the site grows from 3 views to **5**, and the concept gains three chemistry-native instruments no notes site has: **The Wallchart** (an interactive periodic table hung like a teacher-annotated poster), **The Mechanism Theatre** (organic mechanisms whose curly arrows draw themselves), and **The Mark Sheet** (progress tracking styled as an exam cover sheet with test-tube meters and tally marks), plus **printed handouts** and a **command-word decoder**. A working reference build of this exact spec exists; the prompts below rebuild or extend it.

---

## PROMPT 1 — Master build prompt (paste this first)

Build a complete, production-quality revision-notes website called **Axiom**, for **one subject only: Pearson Edexcel International A Level Chemistry (2018 specification, units WCH11–WCH16)**.

### The design concept — "The Margins" (this is the product, not decoration)

The site must look like a **beautifully marked exam script**: warm paper, ink typography, and a red marking pen that speaks to the student in the margins. Reference the aesthetic of a hand-marked Edexcel paper crossed with an editorial magazine (The Economist print layout meets a tutor's marked script). Every screen must feel *authored*, never "SaaS dashboard".

**Palette (use exactly these):**
- Paper `#F5F1E6` (page), paper-card `#FAF7EE` (cards), paper-deep `#EDE7D6` (wells)
- Ink `#211C14` (text), ink-soft `#5C5546`, ink-faint `#8B8271`
- Red marking pen `#BF3B2B` / deep red `#9C2E21` — accents, stamps, margin notes, ticks, curly arrows
- Ballpoint blue `#2F5382` — links and the candidate's own handwriting only
- Highlighter yellow `#F0E14E` — key-phrase swipes, tape, "liquid" fills
- Rule lines `#D9D0BB`
- Do NOT use pure white, pure black, indigo/violet gradients, glassmorphism, neon, or rounded-xl SaaS cards.

**Typography (4 voices, via next/font/google):**
- `Fraunces` — display serif for headlines (the exam board's masthead voice)
- `Newsreader` — body text (editorial reading voice), 17px / 1.65+
- `IBM Plex Mono` — everything exam-mechanical: unit codes, spec refs, formulas, marks, stamps, table data (always uppercase + letterspaced for labels)
- `Caveat` — the red-pen handwriting for margin notes and asides (19–20px, slightly rotated); in ballpoint blue only for the candidate name input and signature

**Always-on paper atmosphere:**
- Fixed SVG feTurbulence grain overlay at ~5% opacity
- A fixed double red margin rule down the left side of the viewport on desktop (hidden on mobile)
- `::selection` styled as highlighter yellow
- Border radius max 2–3px everywhere; shadows are hard offset "print" shadows (`3px 3px 0 …`), never blurry glows

### Signature components (build all of these)

1. **Element-cell logo** — the brand mark is a periodic-table cell: atomic number "01", symbol **Ax**, name "axiom". Top bar nav: logo + "Axiom / IAL CHEMISTRY" + centre strip "PEARSON EDEXCEL IAL · WCH11–WCH16 · SPEC-ALIGNED" + nav **Unit map · Wallchart · Mark sheet**.
2. **Stamps** — bordered, uppercase, letterspaced mono labels, rotated −1.6deg (`SPEC-ALIGNED`, `FREE · NO ADS`, `WIP`, `118 ELEMENTS`, `CURLY ARROWS`, `MARKED BY HAND`). Stamp-in animation (scale 1.25 → 0.96 → 1).
3. **Margin notes** — Caveat, deep red, rotated −1.8deg, with a hand-drawn SVG arrow. In notes they sit in a dedicated 186px left gutter (right-aligned desktop, above content mobile).
4. **Mark-scheme chips** — tiny mono boxes `M1` `A1` `B1` (method / accuracy / independent). Every note ends with a "Mark scheme recap"; a legend strip sits at the top of every note.
5. **Formula boxes** — dashed "exam answer box" containers with floating mono label ("LEARN THESE"). Chemistry-aware typesetting: `H_{2}O`, `10^{23}`, `mol dm^{-3}` in data; rendered as real sub/superscripts.
6. **Highlighter swipe**, **hand-drawn self-drawing underline**, **grade circle** (hand-drawn red ellipse that draws itself), **red tick / red cross** — as in v2.
7. **Section headings like an exam paper** — mono red eyebrow "Section A", Fraunces title, italic mono instruction, double rule.
8. **Paper cards** — hard-offset shadows; some subtly rotated (±0.5–0.9deg) like loose sheets; "stacked paper" variant for hero artifacts.
9. **Titration/practical blocks**, **mono data tables with dashed row rules**, **"Turn over" pagination** — as in v2.
10. **MCQ radios** — exam-bubble styled toggles used for *filters and modes* (chart shading, command words): empty circle + label; active = red ring with red dot, spring-scale in.

### Site structure — 5 client-side views (single route is fine)

**View 1 — Home**
- Hero (as v2): stamps, headline "Chemistry notes your teacher would write *if they had the time.*" with self-drawing underline and Caveat aside, marked titration artifact card with `A*` grade circle, `OPEN THE UNIT MAP` button. Stats line: `6 UNITS · 20 TOPICS MAPPED · 150+ SPEC POINTS · WALLCHART + MECHANISM THEATRE`.
- Section A "The six papers": 6 unit cards (WCH11–16) with code chip, status stamp, name, spec points, weight.
- Section B "How every note is built" · Section C "The examiner's voice" (as v2).
- **Section D "The lab annex"** — two instrument cards, each with a small live SVG preview that animates (curly arrow draws itself):
  - *The Wallchart* — preview is a mini periodic-table silhouette with tinted cells, a red trend arrow and two red rings. Copy: "Shade it by block, state or first ionisation energy — and watch the two Period 3 dips appear under the examiner's red ring."
  - *The Mechanism Theatre* — preview shows `C=C` + `H—Br` with δ+/δ− and a red curly arrow. Copy: "Mechanisms that draw their own curly arrows. Step through electrophilic addition and Markovnikov the way a marker reads it."
- **Section E "The examiner's dictionary"** — a command-word decoder: MCQ-style word buttons `STATE · DESCRIBE · EXPLAIN · DEDUCE · CALCULATE · COMPARE`; selecting one fades in a dashed "DECODED" box: the word in Fraunces, a red hint chip ("the word 'because' must appear", "working = method marks", "two columns, one sentence"…), what it demands, and an italic example question. Default selection: "Explain".
- Quote band + CTA "Start with your weakest unit." (as v2).

**View 2 — Unit map (library)** — as v2 (exam structure cards, 6 accordion rows with spec-ordered topics, Units 3 & 6 listing practical skills), **plus revision tracking**: every live topic row has a circular tick-toggle (aria-pressed; empty ring → red hand-drawn tick inside, yellow wash) beside the title; unit headers show `· x/y ticked`; progress persists via the store below.

**View 3 — Note reader** — as v2 (red reading-progress bar, spec-ref header, mark-code legend, all content sections, quiz with hand-drawn cross/tick marking, mark scheme recap, Turn back / Turn over), **plus**:
- **"Print this note"** link in the header → `window.print()`.
- **"Revised this one?"** card at the end of every note: big red tick illustration + toggle button ("TICK AS REVISED ✓" / "UNTICK ↺"); state text changes to "Ticked — on the mark sheet".
- New section types (below): `mechanism` and `ref`.

**View 4 — The Wallchart** (`Fig. 2 · The wallchart`)
- A full **118-element periodic table** rendered as a pinned poster: the chart is rotated −0.35deg and held up by two strips of translucent yellow tape; group numbers 1–18 run along the top, period numbers 1–7 down the left; the lanthanides (57–71) and actinides (89–103) sit in two detached rows at the bottom, with dashed placeholder cells reading `57–71` / `89–103` in the main table.
- **Fixed-pitch geometry** (e.g. cell 38px, gap 3px) so pen annotations can be positioned over exact cells with pixel math.
- Each cell: atomic number (tiny mono), symbol (Fraunces bold), and in IE mode the IE value (6px red mono).
- **Shading modes** via MCQ radios: `BLOCKS` (s = highlighter yellow, p = ballpoint tint, d = red tint, f = ink tint) · `FIRST IE` (red-pen heatmap from 350 → 2400 kJ mol⁻¹, gradient legend) · `STATES` (gas = blue tint, liquid = yellow tint, solid = plain). Superheavy elements with no measured IE stay plain.
- **The teacher's pen drawn OVER the print** (IE mode): a long red arrow rising across Period 3, a red arrow falling down Group 2, and hand-drawn red rings around **Al** and **S** — the two dips — all animating with stroke-dashoffset draw-in when the mode activates. Handwritten margin notes sit in the top-left void of the chart ("↑ across: same shell, charge up — dips at Al & S (circled)" / "↓ down: a whole new shell every step — IE falls").
- **Reading-glass detail card** beside the chart (right on xl, below on mobile): large element cell, name, `Z · block · state`, first IE written in red handwriting, and a Caveat teacher quip for ~30 elements ("Al — dip no. 1: first electron in 3p", "Zn — a d-block element that isn't a transition metal — why?", "Br — the only liquid nonmetal", "Hg — gone from labs, still in questions"). Elements without a quip get "no margin note here — yet."
- Ballpoint link: "Read the note behind the arrows — ionisation energy →" opens that note. On mobile the chart scrolls horizontally inside its own container.
- Element data: all 118 with symbol, name, group, period, category, state, and first ionisation energies from the data booklet (kJ mol⁻¹, rounded; omit for elements 104+).

**View 5 — The Mark Sheet** (`Section D · The mark sheet`)
- A stacked, slightly rotated **candidate cover sheet**: header "AXIOM · IAL CHEMISTRY / CANDIDATE MARK SHEET" + `MARKED BY HAND` stamp + auto date.
- Candidate fields: **name input styled as blue ballpoint handwriting** on a dashed rule (placeholder "sign here"), centre no. `AX·01`, paper `WCH/24`.
- One row per unit: a **test-tube progress meter** (SVG tube with rounded bottom, red-ink liquid filled to the revised fraction, two bubbles rising on a loop), unit name + code + live count, **examiner's tally marks** (groups of 5: four red bars + a diagonal strike), the fraction `x/y`, quiz marks `quiz x/y`, and a `next ▸` link opening the first unticked live topic.
- Totals band: topics revised, quiz marks, "UP NEXT →" (first unticked topic), and the big total `x/y` inside a hand-drawn red grade circle.
- **Examiner's comment** in Caveat red that reacts to progress ("A blank paper. Begin at Unit 1 — the mole opens every door." → "Full marks for effort. On to past papers — timed, then marked.") + a blue signature squiggle SVG.
- `START A FRESH PAPER ↺` reset; privacy line "saved on this device only · nothing leaves your browser".

### The Mechanism Theatre (inside notes)

A `mechanism` note section renders a **steppable, animated reaction diagram**:
- An SVG stage (viewBox ~640×240) with hand-placed molecules: atom labels as SVG text (sub/superscripts via an SVG-tspan parser mirroring `parseChem`), bonds as round-capped lines (double bonds = two lines), lone pairs as dot pairs, δ⁺/δ⁻ in red italic, and a dashed π-cloud arc over the double bond.
- **Red curly arrows** — bezier paths that draw themselves (stroke-dashoffset, ~0.8s) with arrowheads fading in after; multiple arrows stagger via a `--d` CSS variable.
- Controls styled as exam parts: square buttons **(a) (b) (c)** + "step 1 of 3" + `NEXT STEP ▸` / `PLAY AGAIN ↺`. Each step's caption carries a mark chip and a one-line margin note ("both arrows at once — never in two moves", "the rich get richer — H goes to the H-rich carbon").
- Step content cross-fades (framer-motion on SVG groups); reduced-motion shows everything instantly.
- Stamps draw in: red tick, red cross (for the rejected carbocation), red ring around `A1`.
- Two figures ship: **ethene + HBr** (3 steps: electrophile attack → carbocation + Br⁻ → bromoethane) and **propene + HBr** (3 steps: unsymmetrical attack → secondary vs primary carbocation compared with tick/cross → 2-bromopropane, Markovnikov).

### Progress store (localStorage)

- `src/lib/progress.ts`: `useSyncExternalStore` over `{ name, revised: string[], quiz: Record<id, {correct, attempts}> }`, key `axiom-progress-v1`, cross-tab via the `storage` event. `recordQuiz(id, correct)` is terminal once correct (1 mark per quiz).
- Quiz IDs = `"unit-slug/topic-slug#q<sectionIndex>"`, passed down from the reader.
- All progress-dependent UI is behind a `mounted` guard to avoid hydration mismatch.

### Print — every note is a handout

`@media print`: hide top bar, footer, back buttons, revised card, quiz interactivity chrome and the grain; force `.reveal` visible; white background, no shadows; `@page { margin: 15mm }`. A **print-only header** appears at the top of the reader: `AXIOM · IAL CHEMISTRY · WCH11 · SPEC 5.1–5.7` on the left and `NAME ______________ CLASS ______` on the right, over a dashed rule. Print and check: 6 clean pages, mechanism diagrams intact.

### The real data (do not invent)

Units/topics exactly as v2 (WCH11–WCH16, 20 topics, spec refs). Three notes are **LIVE** (full exam-accurate content):
1. **The mole and titration calculations (1.3–1.9)** — as v2 (mole/Avogadro definitions, the three bridges, titration technique, results table, worked example → 0.0892 mol dm⁻³, mistakes, quiz, recap).
2. **First ionisation energy and periodicity (2.5–2.6)** — as v2 (word-perfect definition, three levers, Period 3 with two dips, down-group trend, S < P worked example, quiz), **ending with a `ref` section**: a blue-edged card "See the two dips painted across Period 3 for yourself — open the wallchart." linking to View 4.
3. **Alkenes and electrophilic addition (5.1–5.7)** — σ/π bond definition, electrophilic addition definition, **mechanism figure `ethene-hbr`**, Markovnikov section, **mechanism figure `propene-hbr`**, exam tip (double-barbed arrows only; δ charges required), practical "The unsaturation test" (bromine water decolourises — the mark-scheme word), mistakes (arrow from H instead of π cloud; missing polarity), quiz (major product = 2-bromopropane via secondary carbocation), mark scheme recap.

New section types in the `NoteSection` union: `{ type: "mechanism"; figure: "ethene-hbr" | "propene-hbr"; caption?; margin? }` and `{ type: "ref"; text; to: "wallchart" }`.

### Engineering rules

- Next.js (App Router) + TypeScript + Tailwind + framer-motion. No database, no auth, no backend. Content in **one typed data file** (`src/lib/data.ts`) — adding a note requires zero UI changes. Element data in `src/lib/elements.ts`; progress in `src/lib/progress.ts`.
- `parseChem()` for HTML sub/sup AND an SVG-tspan twin for mechanism labels. Never paste Unicode sub/superscripts.
- Every animation respects `prefers-reduced-motion` with a static fallback; scroll-reveal has a timer failsafe; content is never left invisible (including in print).
- Fully responsive: margin rule/gutter hide on mobile, margin notes reflow, wallchart scrolls horizontally inside its own container, touch targets ≥ 44px.
- Accessibility: aria-pressed on quizzes/toggles/modes, aria-expanded on accordions, aria-labels on element cells ("Sulfur, atomic number 16"), focus-visible red outlines.
- Footer as v2 ("Not affiliated with or endorsed by Pearson Edexcel" + `FREE · NO ADS · NO SIGN-UP` + "Turn over ▸").

### Quality bar (acceptance checklist)

- [ ] Feels like a marked exam paper on every screen — zero generic SaaS patterns
- [ ] Wallchart: 118 cells correctly laid out; all three shading modes work; arrows/rings land on the right cells (Period 3 row, Group 2 column, Al + S ringed)
- [ ] Mechanism Theatre: (a)(b)(c) stepping works; curly arrows draw themselves; both carbocations compared with tick/cross in the propene figure
- [ ] Quiz answers + revision ticks persist to localStorage and surface on the Mark Sheet (tally marks, test tubes, totals circle, reactive examiner comment)
- [ ] Print: no navigation/back buttons; handout header with NAME line; mechanism diagrams intact
- [ ] Command-word decoder cycles all six words
- [ ] Sub/superscripts correct everywhere (H₂O, mol dm⁻³, 3p⁴, δ⁺)
- [ ] Works at 390px and 1440px; reduced-motion never hides content
- [ ] Adding a new note = editing only the data file

---

## PROMPT 2 — Note-writer prompt (use repeatedly to fill the library)

Write the complete note content for topic **"[TOPIC TITLE]" ([SPEC REF], Unit [CODE] — Pearson Edexcel IAL Chemistry)** and add it to `src/lib/data.ts`.

Rules:
1. Structure it as `NoteSection[]` using exactly the existing section types: `p` (optional `margin` aside, tutor's red-pen voice, max 8 words), `definition`, `formula`, `table`, `practical`, `examTip`, `mistake`, `worked` (M1/A1/B1-marked lines + answer), `quiz` (4 options, one correct, full explanation), `keyPoints`, **`mechanism`** (if the topic has a mechanism: reference the figure name and write the 3 step captions with chips + margin notes), **`ref`** (cross-link to the wallchart when periodicity data visualises the point).
2. Chemistry must be exam-accurate: correct equations with state symbols, correct units, answers to 3 s.f., realistic mark allocations, correct mechanism arrow conventions (from electron pair to δ⁺ atom).
3. 12–18 sections per note, including at least: 2 definitions, 1 formula box, 1 worked example with mark chips, 2 mistakes, 1 exam tip, 1 quiz, 1 mark scheme recap.
4. Set the topic's `status: "live"` and `minutes`. Change nothing else in the UI.

## PROMPT 3 — Polish pass

Audit the site as a design reviewer at 390px and 1440px: (a) wallchart annotations aligned to the right cells in all three modes, (b) mechanism molecules readable — no label collisions, arrows touching the right atoms, (c) margin notes never overlapping content, (d) mark sheet totals matching the store, (e) reveal animations and draw-ins never leaving content invisible (test with reduced motion + print). Fix root causes, then verify the acceptance checklist from Prompt 1.

---

## Using this in AI Studio

1. Paste **Prompt 1** alone first; let it finish before pasting anything else.
2. If output drifts generic, reply: "You are drifting toward SaaS-dashboard styling. Re-read the design concept section. Paper, ink, red pen — nothing else."
3. To add notes later, paste **Prompt 2** once per topic. To polish, use **Prompt 3**.
4. A reference build of this exact spec exists (same concept, data files, components, five views). If a choice is ambiguous, choose whatever keeps the five views consistent with each other.
