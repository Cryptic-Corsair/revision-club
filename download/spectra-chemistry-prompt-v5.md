# Spectra — "Colour is data" · IAL Chemistry Edition
### v5 Prompt for Google AI Studio (Build mode) — Chemistry only

> **What changed in v5:** total redesign. The paper-and-red-pen concept is retired. The site is now **Spectra** — a dark observatory for Pearson Edexcel International A Level Chemistry (WCH11–WCH16, 2018 spec), where **each unit is identified by a real flame-test emission line** and every surface is an instrument: instrument-black panels, hairline rules, mono measurement labels, and colour that is never decoration — always data.

---

## PROMPT 1 — Master build prompt (paste this first)

Build a complete, production-quality revision-notes website called **Spectra**, for **one subject only: Pearson Edexcel International A Level Chemistry (2018 specification, units WCH11–WCH16)**. No database, no auth, no backend — one client-side app with a typed content layer.

### The design concept — "an observatory, not a dashboard" (this is the product, not decoration)

Chemistry is learned by *looking closely*. The site is a dark optical instrument: the visible spectrum is the only gradient allowed, the six units are six real emission lines, and reading a topic feels like reading off a measurement. Every screen must feel *authored* — editorial-scientific, never SaaS, never neon cyberpunk.

**Palette (use exactly these):**
- Instrument black `#0a0d13` (page), raised `#0d121a`, panel `#101624`, panel-2 `#141b2b`
- Hairlines `#212a3b` / soft `#182031`
- Ink `#e9ecf4`, ink-2 `#a9b1c2`, ink-faint `#6d7688`
- The six flames — real visible emission lines, one per unit:
  - WCH11 **Li 670.8 nm** crimson `#ff4d5e` · WCH12 **Na 589.0 nm** gold `#ffb224` · WCH13 **Ba 553.5 nm** green `#43e08c` · WCH14 **Cu 510.5 nm** blue-green `#2cd9c7` · WCH15 **Cs 455.5 nm** deep blue `#5e8bff` · WCH16 **K 404.4 nm** lilac `#a06bff`
- The full visible spectrum appears only as the `spectrum-rule` gradient (violet → red) and in the SVG spectrum bands computed from wavelength→RGB.

**Typography (3 voices, via next/font/google):**
- `Space Grotesk` — headlines and UI (400–700), tight tracking on display sizes
- `Instrument Serif` — italic display accents and one-line editorial blurbs
- `IBM Plex Mono` — everything instrumental: unit codes, wavelengths, figures, table data, chips, axis labels, stats (uppercase + letterspaced)

**Atmosphere:** hairline borders (radius max 4px), soft flame glows via `color-mix` shadows, a `.flame-line` flicker animation (7s, staggered, disabled under reduced motion), selection and focus rings tinted by the active unit's flame (`--flame` is redefined per page wrapper).

### Signature components (build all of these)

1. **Top bar** — logo mark (three emission lines in a 26px frame) + `SPECTRA` (letterspaced) + `IAL CHEMISTRY` mono tag; right nav: `OVERVIEW` + the six unit codes. The active code is tinted its flame colour with a glowing underline that flickers. On mobile the nav becomes a left-aligned horizontal scroll strip (scrollbar hidden).
2. **Fig. 1 — The spectrum** (home hero instrument): a 380–720 nm SVG band built from per-2nm wavelength→RGB rects (Bruton approximation), with the six unit lines plotted at their true nm (glow filter, dominant line fatter), unit codes above, `symbol + nm` below, wavelength ticks at 400–700. Every line is a keyboard-reachable button → opens the unit.
3. **Unit spectrum strip** — same instrument for one unit; line labels above the band (collision-safe: only label when >24 nm from the last label), ticks below.
4. **Mini spectrum** — 6px strip on unit cards: the spectrum gradient at 45% with the unit's lines as glowing dots at their true positions.
5. **Unit cards** — flame-tinted code chip, huge flame-glow element symbol (Li/Na/Ba/Cu/Cs/K), serif-italic blurb, mini spectrum, paper facts in a mono footer row. Hover: border and shadow tint with the unit's colour, card lifts 2px.
6. **Topic blocks** (the reader): `p` (72ch, 1.85 leading) · `def` (flame left-rule panel, serif italic term) · `eq` (mono equation on instrument-black, note below, "remember" chips) · `ex` (numbered steps + dashed answer strip) · `tips` (examiner's notes, diamond bullets) · `table` (mono uppercase headers, hairline rows, caption) · `check` (reveal-answer toggles, answers in a flame-ruled panel) · `recap` (numbered 90-second summary).
7. **Inline markup renderer `<Fmt/>`** — `**bold**`, `*em*`, `==highlight==` (flame-tinted `mark`), `~subscript~`, `^superscript^`. Chemistry must render as real sub/superscripts: `CH~3~COOH`, `10^23^`, `Fe^2+^`. Never paste Unicode sub/superscripts.
8. **Reading progress** — 2px flame-coloured bar fixed at the very top of topic pages.
9. **Reading-time chart** — honest per-unit horizontal bars computed from topic minutes; plus `x/y revised` counter.
10. **Revised toggle** — circular tick that fills with the unit colour; persists via a `useSyncExternalStore` localStorage store (key `spectra-progress-v1`, cross-tab via the `storage` event).
11. **Turn back / Turn over** — prev/next topic cards at the end of every reader (end-of-unit falls back to "Back to {code}").

### Site structure — 3 client-side views (single route)

**View 1 — Home**
- Hero: mono eyebrow `PEARSON EDEXCEL INTERNATIONAL A LEVEL · CHEMISTRY · 2018 SPECIFICATION`; display headline **"Chemistry, read by the *light it gives off.*"** (serif italic on the second phrase); intro paragraph on colour-is-data; `Begin with Unit 1` + `Read the spectrum` buttons; a mono stats band computed from the data file (6 units · 27 topics · ≈10 h · 26 worked examples · 54 check questions · 25 tables).
- **Fig. 1** panel: the interactive spectrum (above) with caption "Every flame test in the course, plotted where it truly falls…".
- **Section 1 — The six papers**: 6 unit cards in a 1/2/3-column grid.
- **Section 2 — How every note is built**: 4 method cards (Definitions first / Worked chains / Examiner's notes / Check & recap) with icons and serif-italic quotes.
- **Colour is data** band: six clickable element glyphs with dot, name, wavelength and flame colour.
- Closing quote: *"Start where you are weakest — the flames don't judge."*

**View 2 — Unit page** (`--flame` wrapper set to the unit colour): back link; code chip + stage + topic range; display title + serif blurb; 4-cell paper-facts grid (duration / marks / stage weight / IAL weight — real values: 1 h 30 m & 80 for Units 1–2, 1 h 45 m & 90 for Units 4–5, 1 h 20 m & 50 for Units 3 & 6; AS 40/40/20, A2 40/40/20, IAL 20/20/10/20/20/10); **the flame of this unit** panel (huge symbol + spectrum strip + note); story paragraph; reading-time chart; topic list rows (mono number, label, minutes, AO chips, title, summary, revised tick, arrow); prev/next unit cards.

**View 3 — Topic reader**: reading-progress bar; label/minutes/AO header; tick-rule divider; all blocks via `<Fmt/>`; check questions with reveal toggles; recap; **Mark this topic as revised** button (persists); Turn back / Turn over; unit footer line.

### The data layer (content is the product — do not invent chemistry)

- `src/lib/spectra/types.ts` — `Unit`, `Topic`, `Block` (discriminated union: p/def/eq/ex/tips/table/check/recap), `SpectralLine`, `PaperInfo`, `ElementId`.
- `src/lib/spectra/content/wch11.ts … wch16.ts` — one file per unit:
  - WCH11 · Topics 1–5: the mole & titrations, atomic structure & ionisation energy, bonding & shapes, organic intro & alkanes (radical substitution), alkenes (electrophilic addition, Markownikoff).
  - WCH12 · Topics 6–10: energetics & Hess, intermolecular forces, redox & Groups 1/2/7, intro kinetics & equilibria, halogenoalkanes/alcohols & spectra.
  - WCH13 · Practicals 1–3: uncertainty, solutions & titration, graphs & evaluation.
  - WCH14 · Topics 11–16: kinetics (orders, Arrhenius), entropy & ΔG, Kc/Kp, acid–base (Ka, buffers, indicators), carbonyls/carboxylic acids/chirality, spectroscopy & chromatography (IR, MS, 1H NMR, Rf, GC-MS).
  - WCH15 · Topics 17–21: electrode potentials, transition metals, arenes, amines/amino acids/proteins/DNA (incl. cis-platin), synthesis.
  - WCH16 · Practicals 1–3: rates methods, organic techniques & tests, observations/EMF/evaluation.
  - Every topic: summary, minutes, AO tags, 7–14 blocks, all calculations checked (e.g. 0.0892 mol dm−3 titres, Ea ≈ 49 kJ mol−1, CaCO3 > 1110 K, pH 2.88 weak acid, Kc = 4.00 ICE, 1.10 V Daniell, 0.0972 mol dm−3 iron titration).
- `src/lib/spectra/units.ts` — the registry: code, stage, titles, paper facts, element (symbol/name/flameName/nm), color, cssVar, **real emission lines** (Li 670.8/610.4/460.3; Na 589.0/589.6/615.4; Ba 553.5/614.2/649.7; Cu 510.5/515.3/521.8/570.0; Cs 455.5/459.3; K 404.4/404.7 — with the 766.5/769.9 IR pair mentioned in the note, not drawn), spectrumNote, story, blurb, topics.
- `src/lib/spectra/progress.ts` — the revised-topics store.

### Engineering rules

- Next.js App Router + TypeScript + Tailwind v4 (`@theme inline` mapping of CSS variables) + lucide-react. No router needed — client-side view state in `SpectraApp`.
- A custom `scripts/validate-markup.ts` (run with bun) walks every string in the data files and fails on unbalanced `~ ^ * ==` or swallowed tokens — keep it green.
- Every animation has a `prefers-reduced-motion` static fallback; scroll-reveal uses IntersectionObserver with a 2.5 s failsafe and is always visible in print.
- Fully responsive at 390 px and 1440 px: nav scrolls instead of wrapping, tables scroll horizontally, spectrum SVGs are fluid, touch targets ≥ 40px.
- Accessibility: `aria-current` on nav, `aria-expanded`/`aria-controls` on reveals, `role="button"` + keyboard handlers on spectrum lines, aria-labels on all SVG instruments, focus-visible flame outlines.
- Print: `@media print` hides chrome, forces reveals visible, 15 mm margins — every topic is a handout.

### Quality bar (acceptance checklist)

- [ ] Home hero + Fig. 1: six lines at the right wavelengths, all clickable, keyboard-reachable
- [ ] Unit pages: paper facts exact, flame panel + strip correct, honest reading-time chart
- [ ] Reader: every block type renders; chemistry shows real sub/superscripts; highlights tint with the unit flame
- [ ] Check answers reveal; revised ticks persist across reload and tabs
- [ ] No console errors; reduced-motion never hides content
- [ ] Markup validator passes on all content
- [ ] Adding a topic = editing only the unit's content file

---

## PROMPT 2 — Note-writer prompt (use repeatedly to extend the library)

Write the complete topic content for **"[TOPIC TITLE]" (Unit [CODE], Pearson Edexcel IAL Chemistry)** and append it to that unit's file in `src/lib/spectra/content/`.

Rules:
1. Use exactly the `Block` union: `p`, `def`, `eq` (with `note` and optional `ok` chips), `ex` (steps + answer), `tips`, `table`, `check`, `recap`. 7–14 blocks per topic, always ending with `check` then `recap`.
2. Inline markup only via `<Fmt/>` conventions (`**…**`, `*…*`, `==…==`, `~sub~`, `^sup^`). Never Unicode sub/superscripts. Never a bare `~` for "approximately" — write `≈`.
3. Chemistry must be exam-accurate: correct equations and state symbols, units on every answer, 3 s.f., realistic numbers (verify every calculation before writing it).
4. Run `bun scripts/validate-markup.ts` — it must print `✓ … markup clean`.

## PROMPT 3 — Polish pass

Audit at 390 px and 1440 px as a design reviewer: spectrum labels never collide (labels above the band, ticks below); panels align to the 4px radius system; glow never reduces text contrast; the nav scrolls cleanly on mobile; print output is a clean handout. Fix root causes, then re-verify the acceptance checklist.

---

## Using this in AI Studio

1. Paste **Prompt 1** alone first; let it finish before pasting anything else.
2. If output drifts generic: "You are drifting toward SaaS-dashboard styling. Re-read the design concept section. Instrument black, hairlines, flame data — nothing else."
3. To add topics, paste **Prompt 2** once per topic. To polish, paste **Prompt 3**.
4. A working reference build of this exact spec exists (same data files, same components). If a choice is ambiguous, choose whatever keeps the three views consistent.
