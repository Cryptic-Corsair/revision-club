# Axiom — "The Margins" · IAL Chemistry Edition
### v2 Prompt for Google AI Studio (Build mode) — Chemistry only

> **What changed in v2:** the site is now **one subject — Pearson Edexcel IAL Chemistry (WCH11–WCH16)** — done deeply, instead of a shallow all-subject library. The design concept is **"The Margins"**: the entire site is an exam paper that a brilliant teacher has marked by hand. A working prototype of this exact spec already exists; use the prompts below to rebuild, extend, or port it.

---

## PROMPT 1 — Master build prompt (paste this first)

Build a complete, production-quality revision-notes website called **Axiom**, for **one subject only: Pearson Edexcel International A Level Chemistry (2018 specification, units WCH11–WCH16)**.

### The design concept — "The Margins" (this is the product, not decoration)

The site must look like a **beautifully marked exam script**: warm paper, ink typography, and a red marking pen that speaks to the student in the margins. Reference the aesthetic of a hand-marked Edexcel paper crossed with an editorial magazine (think: The Economist print layout meets a tutor's marked script). Every screen must feel *authored*, never "SaaS dashboard".

**Palette (use exactly these):**
- Paper `#F5F1E6` (page), paper-card `#FAF7EE` (cards), paper-deep `#EDE7D6` (wells)
- Ink `#211C14` (text), ink-soft `#5C5546`, ink-faint `#8B8271`
- Red marking pen `#BF3B2B` / deep red `#9C2E21` — accents, stamps, margin notes, ticks
- Ballpoint blue `#2F5382` — links only
- Highlighter yellow `#F0E14E` — key-phrase swipes
- Rule lines `#D9D0BB`
- Do NOT use pure white, pure black, indigo/violet gradients, glassmorphism, neon, or rounded-xl SaaS cards.

**Typography (4 voices, via next/font/google):**
- `Fraunces` — display serif for headlines (the exam board's masthead voice)
- `Newsreader` — body text (editorial reading voice), 17px / 1.65+
- `IBM Plex Mono` — everything exam-mechanical: unit codes, spec refs, formulas, marks, stamps, table data (always uppercase + letterspaced for labels)
- `Caveat` — the red-pen handwriting for margin notes and asides (19–20px, slightly rotated)

**Always-on paper atmosphere:**
- Fixed SVG feTurbulence grain overlay at ~5% opacity
- A fixed double red margin rule down the left side of the viewport on desktop (hidden on mobile)
- `::selection` styled as highlighter yellow
- Border radius max 2–3px everywhere; shadows are hard offset "print" shadows (`3px 3px 0 …`), never blurry glows

### Signature components (build all of these)

1. **Element-cell logo** — the brand mark is a periodic-table cell: grid with atomic number "01", symbol **Ax**, name "axiom". Top bar: logo + "Axiom / IAL CHEMISTRY" + centre strip "PEARSON EDEXCEL IAL · WCH11–WCH16 · SPEC-ALIGNED" + nav ("Unit map") + a small red tick.
2. **Stamps** — bordered, uppercase, letterspaced mono labels, rotated −1.6deg, e.g. `SPEC-ALIGNED · WCH11–WCH16`, `FREE · NO ADS`, `WIP`, `IN PROGRESS`. They land on the page with a stamp animation (scale 1.25 → 0.96 → 1).
3. **Margin notes** — Caveat, deep red, rotated −1.8deg, with a hand-drawn SVG arrow. In notes, they sit in a dedicated 186px left gutter (right-aligned on desktop, above content on mobile).
4. **Mark-scheme chips** — tiny mono boxes `M1` `A1` `B1` (method / accuracy / independent). Every note ends with a "Mark scheme recap" list pairing chips to the exact behaviour that earns each mark. Include a legend strip at the top of every note.
5. **Formula boxes** — dashed "exam answer box" containers with a floating mono label ("LEARN THESE"). Formulas use **chemistry-aware typesetting**: write `H_{2}O`, `10^{23}`, `mol dm^{-3}` in the data; render as real sub/superscripts.
6. **Highlighter swipe** — key phrases animate a yellow swipe (background-size 0% → 100%, skewed gradient, 0.7s) when they enter the viewport.
7. **Hand-drawn underline** — red SVG path under hero words that draws itself (stroke-dashoffset animation).
8. **Grade circle** — hand-drawn red ellipse that draws itself around text, used for the hero `A*` and for quiz scores (`1 / 1`).
9. **Red tick / red cross** — hand-drawn SVG marks with draw-in animation; used for live topics, correct/wrong quiz answers.
10. **Section headings like an exam paper** — mono red eyebrow "Section A", Fraunces title, italic mono instruction ("ANSWER ALL QUESTIONS…"), then a double rule (1px + 3px offset shadow).
11. **Paper cards** — hard-offset shadows; some subtly rotated (±0.5–0.9deg) like loose sheets.
12. **Titration/practical blocks** — numbered steps with mono index chips; data tables in mono with dashed row rules.
13. **"Turn over" pagination** — prev/next note cards styled as paper instructions ("◂ TURN BACK", "TURN OVER ▸").

### Site structure (client-side views, single route is fine)

**View 1 — Home**
- Hero: stamps, headline "Chemistry notes your teacher would write *if they had the time.*" (last line gets the self-drawing red underline; a Caveat aside "better, honestly ↘" floats beside), intro paragraph with highlighter swipe on "in the margins, where it counts.", buttons: `OPEN THE UNIT MAP` (ink block, red offset shadow) + "READ A SAMPLE NOTE →".
- Right side: **the artifact** — a rotated paper card showing a marked titration extract: "CHEMISTRY — UNIT 1 / WCH11", formula box (n = m/M · n = cV/1000 · pV = nRT with the middle line highlighted), a red margin note "÷1000 — before you forget" with a tick, result row "Mean concordant titre 22.30 cm³ / A1 / 0.0892 mol dm⁻³ circled in red pen", link "From the full note — read it in the reader →". A hand-circled `A*` sits on its top-right corner; "start here ↘" floats at its left.
- Stats line: `6 UNITS · 20 TOPICS MAPPED · 150+ SPEC POINTS · MARK-SCHEME FLUENT`.
- Section A "The six papers": 6 unit cards (one per WCH unit) with code chip, status stamp, name, spec-point count, weight; hover lifts with red offset shadow.
- Section B "How every note is built": 3 numbered steps with red mono numerals and Caveat asides.
- Section C "The examiner's voice": three tilted artifacts (exam tip card, formula box, common-mistake card) as a preview of note anatomy.
- Quote band, then CTA "Start with your weakest unit."

**View 2 — Unit map (library)**
- Title "IAL Chemistry, unit by unit" + exam structure cards (AS: U1 40% · U2 40% · U3 20%; A level: U4 40% · U5 40% · U6 20%; Practicals: written papers, no coursework).
- 6 accordion rows (Unit 1–6): red mono "UNIT n", Fraunces unit name, mono meta (code · weight · topic count), right side either red tick (has live notes) or WIP stamp, rotating chevron.
- Expanded rows list topics in **spec order** with mono index (01, 02…), red tick + "READ →" for live notes, dimmed rows with spec refs for upcoming ones. Units 3 & 6 list the practical skills the written papers actually test (titrations, calorimetry, rates/qualitative tests, organic prep; rates/quenching, redox titrations, transition metal tests, multi-step organic prep).

**View 3 — Note reader**
- Red reading-progress bar across the top (scales with scroll).
- Header: mono red "PEARSON EDEXCEL IAL CHEMISTRY · UNIT 1 · WCH11 · SPEC 1.3–1.9", huge Fraunces title, "SPEC-CHECKED" stamp + "Last updated Oct 2026 · 16 min read".
- Mark-code legend strip (M1 method · A1 accuracy · B1 independent recall).
- Body sections rendered from data, each with optional margin note in the left gutter: paragraphs, blue-edged **Definition** blocks, **formula boxes**, **practical blocks**, **titration data tables**, **exam tips** (red-edged), **common mistakes** (grey-edged), **worked examples** with step-by-step M1/A1-marked lines and a final answer row, **interactive "Test yourself" quiz** (pick an option: wrong → hand-drawn red cross + "Not this one — the examiner is still waiting. Try again."; correct → highlighter fill, red tick, "1 / 1" in a drawn grade circle + full explanation), and the **mark scheme recap**.
- Ends with "END OF NOTE" rule and Turn back / Turn over cards.

### The real data (do not invent; hardcode in `src/data/chemistry.ts`)

Units and topics (Pearson 2018 spec, in order):
- **WCH11** Structure, Bonding and Introduction to Organic Chemistry — 40% of AS — 42 spec points. Topics: 1 Formulae, Equations and Amount of Substance (1.1–1.10) · 2 Atomic Structure and the Periodic Table (2.1–2.9) · 3 Bonding and Structure (3.1–3.9) · 4 Introductory Organic Chemistry and Alkanes (4.1–4.7) · 5 Alkenes (5.1–5.7)
- **WCH12** Energetics, Group Chemistry, Halogenoalkanes and Alcohols — 40% of AS — 43 spec points. Topics: 6 Energetics · 7 Intermolecular Forces · 8A Redox · 8B Groups 1 & 2 · 8C Group 7 · 9 Introduction to Kinetics and Equilibria · 10A–10B Halogenoalkanes · 10C–10D Alcohols, MS & IR
- **WCH13** Practical Skills in Chemistry I — 20% of AS (written practical paper)
- **WCH14** Rates, Equilibria and Further Organic Chemistry — 40% of A level — 29 spec points. Topics: 11 Kinetics · 12 Entropy and Energetics · 13 Chemical Equilibria · 14 Acid–Base Equilibria · 15 Carbonyls, Carboxylic Acids and Chirality
- **WCH15** Transition Metals and Organic Nitrogen Chemistry — 40% of A level — 25 spec points. Topics: 16 Redox Equilibria · 17 Transition Metals · 18 Arenes · 19 Organic Nitrogen Compounds · 20 Organic Synthesis and Analysis
- **WCH16** Practical Skills in Chemistry II — 20% of A level (written practical paper)

Two notes are LIVE (write the full real content, exam-accurate):
1. **The mole and titration calculations (1.3–1.9)** — definitions of mole/Avogadro (6.02 × 10^{23} mol^{-1}) and molar mass; the three bridges (n = m/M · n = cV/1000 · pV = nRT with R = 8.31 J K^{-1} mol^{-1}); titration technique steps (rinse with the solution it will hold, read meniscus to 0.05 cm³, rough first, concordant within 0.10 cm³); a results table (titres 22.35/22.30/22.25 → mean 22.30); worked example: 25.00 cm³ NaOH vs 0.100 mol dm^{-3} HCl, mean titre 22.30 cm³ → M1 n(HCl) = 2.23 × 10^{-3} mol → M1 1:1 ratio → A1 c(NaOH) = 0.0892 mol dm^{-3}; exam tip on 3 s.f. + units; mistakes (forgetting ÷1000, averaging non-concordant titres); quiz on which titres to average (22.35/22.30/22.90/22.25 → the three concordant ones); mark scheme recap.
2. **First ionisation energy and periodicity (2.5–2.6)** — word-perfect definition (gaseous atoms → gaseous 1+ ions, one mole of each); equations M(g) → M^{+}(g) + e^{-}; the three levers (nuclear charge, distance, shielding); Period 3 trend with the two dips (Al 3p^{1}, S 3p^{4} pairing repulsion) as evidence for sub-shells; down-group trend; exam tip ("explain why" = name the lever in full sentences); worked example (S < P); quiz (why Na's 2nd IE ≫ 1st — electron pulled from full 2p, closer to nucleus); mark scheme recap.

Everything else: `status: "coming-soon"` with spec refs — the UI shows dimmed rows and a "This note is being written. The margin will be full soon." placeholder box.

### Engineering rules
- Next.js (App Router) + TypeScript + Tailwind. No database, no auth, no backend calls. All content in **one typed data file** (`src/data/chemistry.ts`): units → topics → notes as a discriminated-union `NoteSection[]`. The UI must render entirely from that file — adding note #3 must require zero UI changes.
- Include a tiny `parseChem()` helper that converts `_{…}` → `<sub>` and `^{…}` → `<sup>` everywhere formulas render. Never paste Unicode sub/superscripts.
- Animations: framer-motion for view transitions + reading progress; CSS for draws/swipes/stamps. **Every animation must respect `prefers-reduced-motion`** and have a non-animation fallback (content never stays invisible).
- Scroll-reveal must fail safe: if IntersectionObserver never fires, a timer shows the content anyway.
- Fully responsive: the margin-line and gutter hide on mobile; margin notes move above their content; all touch targets ≥ 44px; footer sticks to the bottom via flex.
- Accessibility: semantic landmarks, aria-pressed on quiz options, aria-expanded on accordions, alt text, focus-visible outlines in red.
- Footer: "Axiom · IAL Chemistry — written to the Pearson Edexcel IAL Chemistry specification (2018). Not affiliated with or endorsed by Pearson Edexcel." + stamp `FREE · NO ADS · NO SIGN-UP` + "Turn over ▸".

### Quality bar (acceptance checklist)
- [ ] Feels like a marked exam paper on every screen — zero generic SaaS patterns
- [ ] All four typefaces load and are visibly distinct
- [ ] Handwriting margin notes render in Caveat, red, slightly rotated
- [ ] Sub/superscripts correct everywhere (H₂O, mol dm⁻³, 10²³, 3p⁴)
- [ ] Quiz marks wrong/correct answers with hand-drawn cross/tick + explanation
- [ ] View transitions, reading progress, stamp/underline/highlight animations all respect reduced motion
- [ ] Works at 390px and 1440px without overflow or clipped artifacts
- [ ] Adding a new note = editing only `src/data/chemistry.ts`

---

## PROMPT 2 — Note-writer prompt (use repeatedly to fill the library)

Write the complete note content for topic **"[TOPIC TITLE]" ([SPEC REF], Unit [CODE] — Pearson Edexcel IAL Chemistry)** and add it to `src/data/chemistry.ts`.

Rules:
1. Structure it as `NoteSection[]` using exactly the existing section types: `p` (with optional `margin` aside in a tutor's red-pen voice — max 8 words), `definition`, `formula` (caption + lines using `_{}`/`^{}` markup), `table`, `practical` (numbered steps), `examTip`, `mistake`, `worked` (body + `marks` with M1/A1/B1 chips + answer), `quiz` (4 options, one correct, full explanation), `keyPoints` (mark scheme recap).
2. Chemistry must be exam-accurate: correct equations with state symbols, correct units (mol dm^{-3}, g mol^{-1}, J K^{-1} mol^{-1}), answers to 3 s.f., realistic mark allocations.
3. 12–18 sections per note. Include at least: 2 definitions, 1 formula box, 1 worked example with mark chips, 2 common mistakes, 1 exam tip, 1 quiz, 1 mark scheme recap.
4. Set the topic's `status: "live"` and `minutes`. Change nothing else in the UI.

## PROMPT 3 — Polish pass

Audit the site as a design reviewer: check every screen at 390px and 1440px for (a) margin notes overlapping content, (b) artifact clipping, (c) reveal animations leaving content invisible, (d) sub/superscript baseline breakage inside mono tables. Fix root causes, then verify the acceptance checklist from Prompt 1.

---

## Using this in AI Studio
1. Paste **Prompt 1** alone first; let it finish before pasting anything else.
2. If output drifts generic, reply: "You are drifting toward SaaS-dashboard styling. Re-read the design concept section. Paper, ink, red pen — nothing else."
3. To add notes later, paste **Prompt 2** once per topic. To polish, use **Prompt 3**.
4. A reference build of this exact spec exists (same concept, data file, components). If a choice is ambiguous, choose whatever keeps the three views consistent with each other.
