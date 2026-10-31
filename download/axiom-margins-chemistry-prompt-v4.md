# Axiom — "The Margins" · IAL Chemistry Edition
### v4 Prompt for Google AI Studio (Build mode) — Chemistry only

> **What changed in v4:** the site grows from 5 views to **7**, and the lab annex doubles to **four chemistry-native instruments**. Two new arrivals: **The Bench** — a live titration simulator whose pH curve is drawn in red pen on graph paper as you add base, with the buffer shelf, half-equivalence line and equivalence point ringed by the examiner and a conical flask that actually changes colour with the indicator — and **The Reaction Map** — organic chemistry as a pinned wall map: nine families, thirteen exam routes, click any arrow for a reagent/conditions route card. The top bar gains a self-drawing red underline on the active view; the reader's Turn back / Turn over cards now navigate; the hydration guard is a clean `useHydrated()` hook. A working reference build of this exact spec exists; the prompts below rebuild or extend it.

---

## PROMPT 1 — Master build prompt (paste this first)

Build a complete, production-quality revision-notes website called **Axiom**, for **one subject only: Pearson Edexcel International A Level Chemistry (2018 specification, units WCH11–WCH16)**.

### The design concept — "The Margins" (this is the product, not decoration)

The site must look like a **beautifully marked exam script**: warm paper, ink typography, and a red marking pen that speaks to the student in the margins. Reference the aesthetic of a hand-marked Edexcel paper crossed with an editorial magazine (The Economist print layout meets a tutor's marked script). Every screen must feel *authored*, never "SaaS dashboard".

**Palette (use exactly these):**
- Paper `#F5F1E6` (page), paper-card `#FAF7EE` (cards), paper-deep `#EDE7D6` (wells)
- Ink `#211C14` (text), ink-soft `#5C5546`, ink-faint `#8B8271`
- Red marking pen `#BF3B2B` / deep red `#9C2E21` — accents, stamps, margin notes, ticks, curves, curly arrows
- Ballpoint blue `#2F5382` — links and the candidate's own handwriting only
- Highlighter yellow `#F0E14E` — key-phrase swipes, tape, buffer-region band, "liquid" fills
- Rule lines `#D9D0BB`
- Do NOT use pure white, pure black, indigo/violet gradients, glassmorphism, neon, or rounded-xl SaaS cards.

**Typography (4 voices, via next/font/google):**
- `Fraunces` — display serif for headlines (the exam board's masthead voice)
- `Newsreader` — body text (editorial reading voice), 17px / 1.65+
- `IBM Plex Mono` — everything exam-mechanical: unit codes, spec refs, formulas, marks, stamps, table data, axis labels (always uppercase + letterspaced for labels)
- `Caveat` — the red-pen handwriting for margin notes and asides (19–20px, slightly rotated); in ballpoint blue only for the candidate name input and signature

**Always-on paper atmosphere:**
- Fixed SVG feTurbulence grain overlay at ~5% opacity
- A fixed double red margin rule down the left side of the viewport on desktop (hidden on mobile)
- `::selection` styled as highlighter yellow
- Border radius max 2–3px everywhere; shadows are hard offset "print" shadows (`3px 3px 0 …`), never blurry glows

### Signature components (build all of these)

1. **Element-cell logo** — the brand mark is a periodic-table cell: atomic number "01", symbol **Ax**, name "axiom". Top bar nav: logo + "Axiom / IAL CHEMISTRY" + centre strip "PEARSON EDEXCEL IAL · WCH11–WCH16 · SPEC-ALIGNED" + nav **Unit map · Wallchart · The bench · Reaction map · Mark sheet** (5 items; type scales down and gaps tighten below `sm` so it never wraps). The **active item carries a self-drawing red underline** (SVG path, stroke-dashoffset draw-in ~0.5s) — the pen marks where you are.
2. **Stamps** — bordered, uppercase, letterspaced mono labels, rotated −1.6deg (`SPEC-ALIGNED`, `FREE · NO ADS`, `WIP`, `118 ELEMENTS`, `CURLY ARROWS`, `LIVE pH CURVE`, `13 ROUTES`, `MARKED BY HAND`, `DISTIL OR REFLUX?`). Stamp-in animation (scale 1.25 → 0.96 → 1).
3. **Margin notes** — Caveat, deep red, rotated −1.8deg, with a hand-drawn SVG arrow. In notes they sit in a dedicated 186px left gutter (right-aligned desktop, above content mobile); on the instruments they are scattered over the canvas like a teacher writing on a print.
4. **Mark-scheme chips** — tiny mono boxes `M1` `A1` `B1` (method / accuracy / independent). Every note ends with a "Mark scheme recap"; a legend strip sits at the top of every note.
5. **Formula boxes** — dashed "exam answer box" containers with floating mono label ("LEARN THESE"). Chemistry-aware typesetting: `H_{2}O`, `10^{23}`, `mol dm^{-3}` in data; rendered as real sub/superscripts.
6. **Highlighter swipe**, **hand-drawn self-drawing underline**, **grade circle** (hand-drawn red ellipse that draws itself), **red tick / red cross** — as before.
7. **Section headings like an exam paper** — mono red eyebrow "Section A", Fraunces title, italic mono instruction, double rule.
8. **Paper cards** — hard-offset shadows; some subtly rotated (±0.5–0.9deg) like loose sheets; "stacked paper" variant for hero artifacts.
9. **Practical blocks**, **mono data tables with dashed row rules**, **"Turn over" pagination** — as before.
10. **MCQ radios** — exam-bubble styled toggles used for *filters, modes and instrument controls* (acid choice, indicator, chart shading, command words, show-full-curve): empty circle + label; active = red ring with red dot, spring-scale in.

### Site structure — 7 client-side views (single route is fine)

**View 1 — Home**
- Hero: stamps, headline "Chemistry notes your teacher would write *if they had the time.*" with self-drawing underline and Caveat aside ("better, honestly"), marked titration artifact card with `A*` grade circle, `OPEN THE UNIT MAP` button. Stats line: `6 UNITS · 20 TOPICS MAPPED · 150+ SPEC POINTS · FOUR LAB INSTRUMENTS`.
- Section A "The six papers": 6 unit cards (WCH11–16) with code chip, status stamp, name, spec points, weight.
- Section B "How every note is built" · Section C "The examiner's voice" — as before.
- **Section D "The lab annex" — a 2×2 grid of four instrument cards**, each with a small live SVG preview that animates (arrow/curve draws itself on scroll):
  - *The Wallchart* — mini periodic-table silhouette with tinted cells, a red trend arrow and two red rings. Copy: "Shade it by block, state or first ionisation energy — and watch the two Period 3 dips appear under the examiner's red ring."
  - *The Mechanism Theatre* — preview shows `C=C` + `H—Br` with δ+/δ− and a red curly arrow. Copy: "Mechanisms that draw their own curly arrows…"
  - *The Bench* — preview is a mini graph-paper pH curve with the examiner's ring at equivalence. Copy: "Run a titration with your own hands: add the base, watch the pH curve draw itself on graph paper, and see the equivalence point ringed in red while the flask changes colour."
  - *The Reaction Map* — preview is four tiny family cells joined by arrows, one red, plus Caveat "reflux!". Copy: "Organic chemistry as a wall map: nine families pinned up and thirteen exam routes between them."
- **Section E "The examiner's dictionary"** — command-word decoder: MCQ buttons `STATE · DESCRIBE · EXPLAIN · DEDUCE · CALCULATE · COMPARE`; selecting one fades in a dashed "DECODED" box with the word in Fraunces, a red hint chip, what it demands, an italic example. Default: "Explain".
- Quote band + CTA "Start with your weakest unit."

**View 2 — Unit map (library)** — exam structure cards, 6 accordion rows with spec-ordered topics, Units 3 & 6 listing practical skills, plus revision tracking: circular tick-toggle per live topic (empty ring → red hand-drawn tick inside, yellow wash); unit headers show `· x/y ticked`; progress persists via the store below.

**View 3 — Note reader** — red reading-progress bar, spec-ref header, mark-code legend, all content sections, quiz with hand-drawn cross/tick marking, mark scheme recap, "Print this note" (`window.print()`), "Revised this one?" tick card at the end, and **Turn back / Turn over cards that now actually navigate** to the previous/next topic of the unit (cards lift and gain a red print-shadow on hover; coming-soon topics are dimmed with "— being written" and still open the placeholder reader).

**View 4 — The Wallchart** (`Fig. 2 · The wallchart`) — as v3: 118-element pinned poster, rotated −0.35deg with two tape strips, fixed-pitch geometry, shading modes BLOCKS / FIRST IE / STATES via MCQ radios, the teacher's pen drawn OVER the print in IE mode (red arrow rising across Period 3, red arrow falling down Group 2, hand-drawn rings on **Al** and **S** — the two dips), reading-glass element card with Caveat quips, link into the ionisation-energy note. Horizontally scrollable on small screens.

**View 5 — The Bench** (`Fig. 3 · The bench`) — the interactive titration. Header "Run the titration, read the pen".
- **Setup bar** (paper card, MCQ radios): **Acid in the flask** — `HCl` (strong) or `CH_{3}COOH` (weak); **Indicator** — `None` / `Methyl orange` / `Phenolphthalein`; right-aligned toggle `SHOW FULL CURVE`. Switching acid empties the flask (the run restarts).
- **Fixed chemistry**: 25.00 cm³ of 0.100 mol dm⁻³ acid, 0.100 mol dm⁻³ NaOH in a 50 cm³ burette, 25 °C, Kw = 1.00 × 10⁻¹⁴, pKa 4.76 (Ka 1.74 × 10⁻⁵).
- **Apparatus column** (left; stacks on mobile): one SVG of burette + conical flask + stand. The burette has 0-at-top graduations every 5 cm³ (numbers every 10), its liquid level **falls as you deliver**, a dashed red reading line tracks the meniscus, and the readout prints `burette reads x.xx cm³`. A droplet re-mounts and falls from the tip on every addition (CSS animation). The flask holds **25.00 cm³ of liquid whose colour is the indicator's true colour at the current pH**: methyl orange interpolates red → yellow across pH 3.1–4.4; phenolphthalein colourless → pink across 8.3–10.0; none = faint blue-grey.
- **Controls card** below the apparatus: `+0.10 / +1.00 / +5.00` mono buttons; preset links `½ V · equivalence · overshoot +5`; a **scrub slider** (0–50 cm³, step 0.05, thumb = red dot on a ruler track) with live `x.xx cm³` label; `EMPTY THE FLASK ↺`.
- **The graph** (right; 560×400 SVG in a rotated paper card with tape): graph-paper grid (rule-coloured, every 5 cm³ / every pH unit), ink axes, mono axis titles `pH` and `VOLUME OF NaOH ADDED / cm³`, y numerals every 2. The **trail is drawn in red pen** (2.6px round-capped polyline) from 0 to the current volume, current point a red dot; the START pH is annotated. With *show full curve* on, a dashed ink-faint ghost of the whole run sits beneath the pen.
- **Examiner annotations** (weak acid): a pale **highlighter-yellow buffer band** from ~2–23 cm³ with dashed rules and Caveat "buffer region — the flat shelf" along the top; once **half-equivalence is crossed**, a hand-drawn red ring at (12.50 cm³, pH 4.76) with a leader line to Caveat "pH = pKa = 4.76"; once **equivalence is crossed**, a larger red ring at the equivalence point with Caveat "equivalence — n(OH⁻) = n(H⁺)". Rings draw themselves (stroke-dashoffset, staggered).
- **Readout strip** under the graph, results-table style: `ADDED x.xx cm³` · `pH OF THE FLASK x.xx` (deep red) · `ZONE` chip · a Caveat margin note that reacts to the zone ("pure acid in the flask — the starting pH is a calculation of its own" / "the flat shelf — pH barely moves" / "pH = pKa = 4.76 — the line to memorise" / "pH above 7 — the salt is a weak base. Ringed!" / "OH⁻ rules now…").
- **Indicator verdict card**: an exam-tip card that judges the chosen indicator for the chosen acid — e.g. for the weak acid + methyl orange: "Bad choice. The colour change 3.1–4.4 completes before equivalence — it would finish early and read low." For weak acid + phenolphthalein: "The right choice… first permanent pink = equivalence." Beside it, stamps with the indicator range and the Ka line.
- **pH model (exact, A-level treatment)**: strong acid — [H⁺] from excess, pH 7 at equivalence, pOH route after; weak acid — √(Ka·C) at V=0, a short blend from the pure-acid pH into the buffer region (so the curve never dips below its own start), Henderson–Hasselbalch through the buffer, salt hydrolysis √(Kw/Ka · C_salt) at equivalence, excess-OH⁻ after. Verify: HCl start 1.00; weak start 2.88; weak half-eq 4.76; weak equivalence ≈ 8.7; both +5 over ≈ 11.96; the weak curve strictly non-decreasing.

**View 6 — The Reaction Map** (`Fig. 4 · The reaction map`) — organic chemistry as a wall map. Header "Every route through organic chemistry".
- **A 1080×700 canvas** (rotated −0.25deg, two tape strips, horizontally scrollable container) holding **nine family cards** positioned by hand: Alkene, Haloalkane, Alcohol, Aldehyde, Ketone, Carboxylic acid, Ester, Nitrile, Amine — each a paper-card button with the family name (Fraunces), an example formula (`CH_{3}CHBrCH_{3}` etc., mono, real sub/superscripts) and a unit chip (WCH11…WCH15).
- **Thirteen routes** as cubic-bezier SVG paths with arrowheads between them: alkene→haloalkane (HBr, electrophilic addition, WCH11), haloalkane→alkene (NaOH/ethanol, elimination), haloalkane→alcohol (NaOH(aq) warm, nucleophilic substitution), alcohol→alkene (conc. H₂SO₄ 180 °C, elimination), alcohol→aldehyde (acidified dichromate, **distil**), alcohol→acid (dichromate, **reflux**), alcohol→ketone (dichromate, reflux, 2°), aldehyde→acid (dichromate, reflux), acid→ester (alcohol + H₂SO₄ warm, esterification), ester→acid (dilute NaOH heat, hydrolysis), haloalkane→nitrile (KCN/ethanol, nucleophilic substitution), nitrile→amine (LiAlH₄, reduction), nitrile→acid (dilute H₂SO₄ reflux, hydrolysis). Every path has a **hand-placed mono label chip** sitting on it (`HBr`, `NaOH(aq), warm`, `dichromate · distil`, `KCN / ethanol, reflux`…).
- **Interaction**: fat invisible stroke hit-areas over every path (22px, pointer-events:stroke) + the label chips are buttons too. Hover thickens and reddens the route. **Click a route → it turns red and a "Route card" appears below**: title `Alkene → Haloalkane`, definition-list rows *Reagents / Conditions / Mechanism*, a unit chip, a Caveat mark-note ("ethanolic = elimination; aqueous = substitution. One word, two reactions"), and an italic "Asked like:" one-mark-style question. **Click a family → its card rotates 0.6deg with a red border, all connected routes stay red while the rest dim to 20%, and a "Family card" shows the example, unit chip, *The test* (bromine water, Tollens' silver mirror, AgNO₃ cream ppt, litmus, IR 2250 cm⁻¹…), and a Caveat note.** Clicking the canvas clears. Selecting scrolls the card grid into view (smooth; `block:'nearest'`).
- **The teacher's pen** — five Caveat squiggles scattered over the print at hand-picked coordinates, each rotated and width-constrained so nothing collides: "two reagents, two directions — learn both" (by the alkene↔haloalkane pair), "where every chain starts", "the chain grows here →" (by the KCN route), "distil vs reflux — the question that never dies" (under the oxidation split), "the sweet-smelling one" (by the ester).
- Below the canvas, a two-column "reading room": the route/family card (or a hint card: "Click any arrow on the wall — the reagents, the conditions and the mechanism name appear here" + margin note "the reagents are the marks") beside a numbered **"How to revise with the map"** card (four moves: follow every arrow out of a family saying reagents aloud; trace alkene→ester; recall which family leads to a nitrile; the dichromate family is one reagent used three ways) with a `DISTIL OR REFLUX?` stamp.

**View 7 — The Mark Sheet** (`Section D · The mark sheet`) — as v3: stacked candidate cover sheet, blue-handwriting name input on a dashed rule, centre no. `AX·01`, paper `WCH/24`, per-unit rows with **test-tube meters** (red-ink fill + rising bubbles), **examiner's tally marks** in fives, quiz marks, `next ▸` links, totals with the hand-drawn grade circle, a reactive examiner's comment in Caveat, blue signature squiggle, `START A FRESH PAPER ↺`, privacy line.

### The Mechanism Theatre (inside notes)

As v3: steppable animated reaction diagrams — SVG stage with hand-placed molecules (SVG-tspan sub/superscripts), bonds, lone pairs, δ charges, dashed π-cloud, **red curly arrows that draw themselves** (staggered via a `--d` CSS variable), controls styled as exam parts **(a)(b)(c)** with mark-chip captions and margin notes, cross-fading steps, tick/cross/ring stamps. Two figures: **ethene + HBr** (3 steps) and **propene + HBr** (Markovnikov, secondary-vs-primary carbocation compared with tick/cross).

### Progress store (localStorage)

- `src/lib/progress.ts`: `useSyncExternalStore` over `{ name, revised: string[], quiz: Record<id, {correct, attempts}> }`, key `axiom-progress-v1`, cross-tab via the `storage` event. `recordQuiz(id, correct)` is terminal once correct.
- **`useHydrated()`** — a tiny `useSyncExternalStore(() => true, () => false)` hook that is false during SSR/hydration and true after; used instead of `useEffect(setMounted)` guards to avoid setState-in-effect cascades.
- Quiz IDs = `"unit-slug/topic-slug#q<sectionIndex>"`.

### Print — every note is a handout

`@media print`: hide top bar, footer, back buttons, revised card, quiz chrome and grain; force `.reveal` visible; white background, no shadows; `@page { margin: 15mm }`; print-only handout header `AXIOM · IAL CHEMISTRY · WCH11 · SPEC 5.1–5.7` + `NAME ______________ CLASS ______` over a dashed rule.

### The real data (do not invent)

Units/topics exactly as before (WCH11–WCH16, 20 topics, spec refs). Three notes are **LIVE** with full exam-accurate content: **The mole and titration calculations (1.3–1.9)**, **First ionisation energy and periodicity (2.5–2.6, ending with a `ref` card into the wallchart)**, and **Alkenes and electrophilic addition (5.1–5.7, with both mechanism figures)**. Element data (all 118, with data-booklet first ionisation energies) in `src/lib/elements.ts`. Section types in `src/lib/data.ts`'s `NoteSection` union include `mechanism` and `ref`.

### Engineering rules

- Next.js (App Router) + TypeScript + Tailwind + framer-motion. No database, no auth, no backend. Content in **one typed data file** (`src/lib/data.ts`) — adding a note requires zero UI changes.
- `parseChem()` for HTML sub/sup and an SVG-tspan twin for mechanism/map labels. Never paste Unicode sub/superscripts.
- Every animation respects `prefers-reduced-motion` with a static fallback (draw-ins snap to offset 0; bubbles and droplets freeze); scroll-reveal has a timer failsafe; content is never left invisible (including in print).
- Fully responsive: margin rule/gutter hide on mobile, margin notes reflow, wallchart and reaction map scroll horizontally inside their own containers, 5-item nav tightens instead of wrapping, touch targets ≥ 44px (fat stroke hit-areas on map routes).
- Accessibility: aria-pressed on quizzes/toggles/modes/families, aria-expanded on accordions, aria-labels on element cells and the apparatus SVG, focus-visible red outlines, keyboard-reachable route labels.

### Quality bar (acceptance checklist)

- [ ] Feels like a marked exam paper on every screen — zero generic SaaS patterns
- [ ] Bench: flask colour tracks the indicator; equivalence ring lands at 25.00 cm³; weak curve shows the flat buffer shelf, pH = pKa ring, and never dips below its starting pH; strong/weak switch restarts the run; scrub slider redraws the trail
- [ ] Reaction map: all 13 routes land between the right families with readable, non-colliding labels; route cards scroll into view on click; family selection dims unconnected routes; squiggles overlap nothing important
- [ ] Wallchart: 118 cells correctly laid out; three shading modes work; arrows/rings land on the right cells (Period 3 row, Group 2 column, Al + S ringed)
- [ ] Mechanism Theatre: (a)(b)(c) stepping works; curly arrows draw themselves; both carbocations compared in the propene figure
- [ ] Quiz answers + revision ticks persist to localStorage and surface on the Mark Sheet
- [ ] Print: no navigation; handout header with NAME line; mechanism diagrams intact
- [ ] Active nav underline draws itself on all 7 views; Turn back / Turn over navigate
- [ ] Works at 390px and 1440px; reduced-motion never hides content
- [ ] Adding a new note = editing only the data file

---

## PROMPT 2 — Note-writer prompt (use repeatedly to fill the library)

Write the complete note content for topic **"[TOPIC TITLE]" ([SPEC REF], Unit [CODE] — Pearson Edexcel IAL Chemistry)** and add it to `src/lib/data.ts`.

Rules:
1. Structure it as `NoteSection[]` using exactly the existing section types: `p` (optional `margin` aside, tutor's red-pen voice, max 8 words), `definition`, `formula`, `table`, `practical`, `examTip`, `mistake`, `worked` (M1/A1/B1-marked lines + answer), `quiz` (4 options, one correct, full explanation), `keyPoints`, **`mechanism`** (if the topic has a mechanism), **`ref`** (cross-link to the wallchart or the bench when the point is visualised there).
2. Chemistry must be exam-accurate: correct equations with state symbols, correct units, answers to 3 s.f., realistic mark allocations, correct mechanism arrow conventions.
3. 12–18 sections per note, including at least: 2 definitions, 1 formula box, 1 worked example with mark chips, 2 mistakes, 1 exam tip, 1 quiz, 1 mark scheme recap.
4. Set the topic's `status: "live"` and `minutes`. Change nothing else in the UI.

## PROMPT 3 — Polish pass

Audit the site as a design reviewer at 390px and 1440px: (a) bench annotations aligned to the true curve (half-eq ring at 4.76, equivalence ring on the jump, buffer band ends before the wall), (b) reaction map — no label chip or squiggle overlapping a family card or making a route unreadable; every hit-area clicks; (c) wallchart annotations on the right cells in all three modes, (d) mechanism molecules readable — no label collisions, (e) margin notes never overlapping content, (f) mark sheet totals matching the store, (g) reveal animations and draw-ins never leaving content invisible (test with reduced motion + print). Fix root causes, then verify the acceptance checklist from Prompt 1.

---

## Using this in AI Studio

1. Paste **Prompt 1** alone first; let it finish before pasting anything else.
2. If output drifts generic, reply: "You are drifting toward SaaS-dashboard styling. Re-read the design concept section. Paper, ink, red pen — nothing else."
3. To add notes later, paste **Prompt 2** once per topic. To polish, use **Prompt 3**.
4. A reference build of this exact spec exists (same concept, data files, components, seven views). If a choice is ambiguous, choose whatever keeps the seven views consistent with each other.
