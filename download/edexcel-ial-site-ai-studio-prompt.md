# AI Studio Prompt Pack — Edexcel IAL Notes Platform

**How to use:**
1. Go to aistudio.google.com → **Build** (app mode, not chat).
2. Paste **Prompt 1** below. If generation truncates, reply: *"Continue exactly where you stopped. Do not restart."*
3. Right after it finishes, paste **Prompt 2** (design audit). Then 3 and 4, one at a time.
4. When happy: Export → GitHub → deploy free on Vercel/Netlify (it's a standard Vite React app).
5. To rename the site: find/replace "Axiom", and ask AI Studio to swap the logo mark. Colors live in one place (CSS variables), so retheming is one message.

---

## PROMPT 1 — MASTER BUILD PROMPT

```text
ROLE
You are a senior product designer and frontend engineer who ships websites at the quality bar of Linear, Vercel, and Stripe. You are building "Axiom" — a premium revision-notes platform for Pearson Edexcel International A Level (IAL) students. Every pixel must look intentionally designed by a human designer, not generated. Prioritize typographic detail, spacing rhythm, restrained color, and micro-interactions over decorative effects.

PRODUCT
- Axiom: a free, spec-aligned revision-notes library for Edexcel IAL subjects, organized subject → unit → topic.
- Audience: 16–19 year old IAL students worldwide; secondary: teachers and tutors.
- The site ships first; notes are added over the coming months. Therefore: all content is data-driven, and every "content not added yet" surface must be an elegant, designed state — never blank, never lorem ipsum.
- Independent project. Include in the footer: "Axiom is an independent revision resource and is not affiliated with or endorsed by Pearson Edexcel."

TECH STACK (strict)
- React + TypeScript + Tailwind CSS, organized into multiple files (src/components, src/pages, src/data).
- Routing: react-router-dom with routes /, /subjects, /subjects/:slug, /notes/:subjectSlug/:unitSlug/:topicSlug, /about, and a 404. If react-router-dom is unavailable, implement equivalent hash routing with the same routes.
- Icons: lucide-react ONLY. Never use emojis as icons or decoration.
- Animation: framer-motion, subtle and consistent.
- Fonts loaded in index.html from Google Fonts: Space Grotesk (display), Inter (UI and body), JetBrains Mono (codes, formulas, labels).
- No backend, no auth, no external network calls. localStorage is fine.
- All subjects, units, topics, and note content live in ONE typed data file: src/data/subjects.ts. Pages render exclusively from it — no hardcoded content inside components. Adding a note later must require zero UI changes.
- Define every theme color once as CSS variables (or a Tailwind theme object). Components reference variables, never raw hex values, so the palette can be rethemed in one place.
- No photos or placeholder images. The visual identity comes from typography, icon tiles, hairlines, and styled cards.

DESIGN SYSTEM
Mood: "midnight library" — dark-first, calm, premium, editorial. Marketing pages are dark; the notes reader switches to a paper-light reading theme. This deliberate contrast (night-mode site, daylight reading) is part of the identity.

Dark theme tokens:
- bg #0A0C10, surface #10141B, surface-2 #161B24
- border rgba(148,163,184,0.12) → brighten to 0.22 on hover
- text: primary #EDF1F7, secondary #9AA5B5, muted #5D6B7E
- accent #7B8CFF; gradient accent: 135deg, #7B8CFF → #4FD8EB. Use the gradient ONLY for: one key hero phrase, active states, 1px highlight hairlines, and icon tiles. Never full-section backgrounds.
- status colors: live #3DDC97, partial #7B8CFF, coming-soon #E8B45A

Paper theme (notes routes only): paper #FBFAF7, ink #23262C, ink-secondary #565D68, rule #E7E4DC, formula/code background #F1EFE9, accent stays #7B8CFF for links and callouts.

Typography:
- Display: Space Grotesk, weight 500–600, letter-spacing -0.02em. Hero clamp(40px, 6vw, 64px); section H2 36–44px; card H3 20–24px.
- Body: Inter. UI text 15–16px / 1.6. Note body 18px / 1.75 with max-width 68ch.
- Mono: JetBrains Mono for subject codes (WPH11), formulas, breadcrumbs, stat chips, and eyebrows. Eyebrows: 12px uppercase, tracking +0.08em.
- Type scale: 12, 13, 14, 16, 18, 20, 24, 30, 38, 48, 60. Nothing smaller than 12px.

Spacing and shape:
- 4px spacing grid. Section padding-y 96px desktop / 56px mobile. Container max-width 1120px. Card padding 24px. Grid gap 24px.
- Radii: buttons and inputs 10px, cards 16px, icon tiles 12px, badges pill.
- Dark theme uses borders and subtle background elevation instead of drop shadows. Paper theme may use 0 1px 2px rgba(35,38,44,0.06).
- All card grids use CSS grid with equal-height cards.

Texture (subtle, site-wide):
- One fixed radial glow behind the hero: accent at 7% opacity, ~900px, top center.
- Faint 1px grid pattern at 3% opacity, radially masked, hero area only.
- 1px gradient hairlines (accent → transparent) to separate major sections.

Motion:
- Hovers 200ms, entrances 300–400ms, ease cubic-bezier(0.16,1,0.3,1).
- Cards: translateY(-2px) + border brighten + arrow icon nudges right on hover.
- Scroll reveal: fade-up 12px with 60ms stagger (framer-motion whileInView, once: true).
- Respect prefers-reduced-motion: disable transforms.
- Every interactive element has a visible focus-visible ring: 2px, accent at 50%, offset 2px.

Component standards:
- Primary button: accent gradient background, near-black text #0A0C10, 600 weight, radius 10, 44px height, hover brightness 1.08. Secondary button: transparent, 1px border, text-primary, hover bg surface-2.
- Eyebrow label: mono, uppercase, accent color, preceded by a 24px hairline.
- SubjectCard: icon tile (subject tint at 12% background, icon at full tint), subject name in Space Grotesk 20px, unit code in mono muted, "N units · N topics" secondary line, StatusBadge, bottom-right arrow slides on hover.
- StatusBadge: 6px dot + 12px label. live = green "Notes available", partial = indigo "In progress", coming-soon = amber "Coming soon".
- Note callouts: Definition (cyan left border, 8% tint), KeyFormula (indigo tint, mono equation lines), ExamTip (amber), CommonMistake (rose). Each: 3px left border, tinted background, small lucide icon + mono uppercase label.
- Nav: sticky, backdrop-blur, background rgba(10,12,16,0.7), 1px bottom border. Logo: inline SVG geometric mark — a triangle/delta inside a rounded square with gradient stroke — plus "Axiom" in Space Grotesk.
- Footer: 4 columns (brand + disclaimer, Subjects, Resources, meta), muted text, generous padding.

FORBIDDEN (redesign immediately if any of these appear): emojis anywhere; Tailwind default blue #3B82F6 as primary; pure #000 or #FFF backgrounds; purple-pink mesh gradients; lorem ipsum; dead buttons that do nothing; uniform rows of identical cards with no hierarchy; drop shadows in the dark theme; more than 4 border/badge colors visible at once; generic copy like "Feature One" or "Lorem"; alert(); loading spinners.

DATA MODEL (src/data/subjects.ts)
TypeScript types:
- Subject { slug, name, code, group: 'Mathematics' | 'Sciences' | 'Business & Economics' | 'Humanities & English', tint (hex), icon (lucide name), blurb, status: 'live'|'partial'|'coming-soon', examStructure?, units: Unit[] }
- Unit { slug, code, name, status, topics: Topic[] }
- Topic { slug, title, status: 'live'|'coming-soon', minutes?, note? }
- Note { updated, sections: NoteSection[] } where NoteSection is a discriminated union: { type: 'h2' | 'p' | 'list' | 'formula' | 'definition' | 'examTip' | 'mistake' | 'keyPoints', ...content }

Seed content (real, spec-aligned — use exactly this):
1. Mathematics (code WMA, group Mathematics, tint #7B8CFF, status partial): units — P1 Pure Mathematics 1 (WMA11), P2 Pure Mathematics 2 (WMA12), P3 Pure Mathematics 3 (WMA13), P4 Pure Mathematics 4 (WMA14), M1 Mechanics 1 (WME01), M2 Mechanics 2 (WME02), S1 Statistics 1 (WST01), S2 Statistics 2 (WST02), D1 Decision 1 (WDM11).
2. Further Mathematics (WFM, tint #9D7BFF, coming-soon): FP1 (WFM11), FP2 (WFM12), FP3 (WFM13) plus applied options.
3. Physics (WPH, Sciences, tint #4FD8EB, partial): Unit 1 Mechanics and Materials (WPH11) — live; Unit 2 Waves and Electricity (WPH12); Unit 3 Practical Skills in Physics I (WPH13); Unit 4 Further Mechanics, Fields and Particles (WPH14); Unit 5 Thermodynamics, Radiation and Oscillations (WPH15); Unit 6 Practical Skills in Physics II (WPH16). examStructure: AS = U1 40% + U2 40% + U3 20%; A level adds U4 20% + U5 20% + U6 10%.
4. Chemistry (WCH, tint #3DDC97, coming-soon): Unit 1 Structure, Bonding and Introduction to Organic Chemistry; Unit 2 Energetics, Group Chemistry, Halogenoalkanes and Alcohols; Unit 3 Practical Skills in Chemistry I; Unit 4 Rates, Equilibria and Further Organic Chemistry; Unit 5 Transition Metals and Organic Nitrogen Chemistry; Unit 6 Practical Skills in Chemistry II.
5. Biology (WBI, tint #5AD8A6, coming-soon): Unit 1 Molecules, Diet, Transport and Health; Unit 2 Membranes, Proteins, DNA and Gene Expression; Unit 3 Practical Skills in Biology I; Unit 4 Energy, Environment, Microbiology and Immunity; Unit 5 Respiration, Coordination and Homeostasis; Unit 6 Practical Skills in Biology II.
6. Economics (WEC, Business & Economics, tint #E8B45A, partial): Unit 1 Markets in Action; Unit 2 Macroeconomic Performance and Policy; Unit 3 Business Behaviour; Unit 4 Developments in the Global Economy.
7. Business (WBS, tint #F08D6B, coming-soon): Unit 1 Marketing and People; Unit 2 Managing Business Activities; Unit 3 Business Decisions and Strategy; Unit 4 Global Business.
8. Accounting (WAC, tint #8BD0F0, coming-soon): Unit 1 The Accounting System and Costing; Unit 2 Corporate and Management Accounting.
9. Stubs (Humanities & English + IT, coming-soon, empty units array with "Unit breakdown coming soon"): Psychology (WPS), Information Technology (WIT), English Literature (WET), History (WHI).

Topic seeds — Physics Unit 1: "Motion: SUVAT and graphs" (live), "Forces and Newton's laws", "Work, energy and power", "Momentum", "Materials: Hooke's law, stress and strain", "Fluids and Stokes' law".
Topic seeds — Economics Unit 1: "Demand and the demand curve" (live), "Supply", "Price elasticity of demand", "Market equilibrium", "Market failure", "Government intervention".

Sample note 1 — Physics U1, "Motion: SUVAT and graphs" (write real teaching content): definition callout distinguishing displacement vs distance and velocity vs speed; KeyFormula block listing the five SUVAT equations as mono lines (v = u + at, s = ut + ½at², v² = u² + 2as, s = vt − ½at², s = ½(u+v)t); paragraphs explaining how to choose the right equation; a worked example in a styled block; ExamTip: "Write down which SUVAT equation you're using — method marks depend on it"; CommonMistake: forgetting to convert km/h to m/s before substituting; keyPoints summary list.
Sample note 2 — Economics U1, "Demand and the demand curve": definition of demand, the law of demand, list distinguishing movements along the curve vs shifts of the curve, ExamTip about ceteris paribus phrasing, keyPoints.
Write these as genuine, well-taught content — a strong student should actually be able to revise from them.

PAGES
1. / Home:
   a. Hero (min-height ~92vh): eyebrow "PEARSON EDEXCEL IAL · SPEC-ALIGNED NOTES"; H1 "Every unit. Every topic. Explained properly." with "Explained properly." in the gradient; subline (18px secondary): "Axiom is a free, exam-focused notes library for International A Levels — mapped unit-by-unit to the Edexcel specification and written to be understood the first time."; primary CTA "Browse subjects" → /subjects, ghost CTA "See how it's organised" → scrolls to #how; a row of mono stat chips: "12 SUBJECTS", "40+ UNITS MAPPED", "UNIT-BY-UNIT STRUCTURE". Beside/below the copy: a floating bento-style preview card — a miniature mock of the notes reader (topic title, a KeyFormula callout, an ExamTip callout) rendered as a real styled card with a soft glow.
   b. #how — "Built around the exam, not a textbook": three steps with mono numerals 01/02/03 — "Pick your subject", "Follow the unit map", "Revise topic by topic" — connected by a thin hairline.
   c. Bento features grid, hallmark-style with mixed spans (not a uniform 3-column row): "Mapped to the spec" (unit chips WPH11… WPH16), "Exam-first callouts" (embed a mini ExamTip card inside), "Formulas that stick" (mono formula card), "Designed for focus" (paper reading theme), "No account, no paywall", "Print-ready notes" — each with a lucide icon and one genuine sentence of copy.
   d. Popular subjects: grid of 6 SubjectCards (Mathematics, Physics, Chemistry, Biology, Economics, Business) + "View all subjects →" link.
   e. Quote band: one centered line in Space Grotesk 28px: "Notes that read like a great teacher explained it — not like a textbook dumped it."
   f. CTA band: gradient hairline on top, H2 "Start with your weakest unit.", primary button.
   g. Footer.
2. /subjects — page header ("Subject library" + live count); filter pills by group (All, Mathematics, Sciences, Business & Economics, Humanities & English) with a real active state; responsive grid 3/2/1 of SubjectCards.
3. /subjects/:slug — mono breadcrumb; header with icon tile, name, code, blurb, StatusBadge; exam structure strip rendered only when examStructure exists; units list: each unit is a row-card with unit code in mono, unit name, topic count, status, expandable topic list — topic rows show status dot, title, minutes, and arrow; live topics navigate to /notes/....
4. /notes/:subjectSlug/:unitSlug/:topicSlug — the notes reader. Force the paper theme on this route. A 2px scroll-linked progress hairline (accent) at the very top; sticky table of contents on desktop (active section highlighted, scroll-spy), collapsible on mobile; article max-width 68ch, 18px/1.75; mono eyebrow breadcrumb subject → unit → topic; H1; muted "Last updated · N min read" line; sections rendered per NoteSection type using the callout components; after the content: keyPoints recap card, previous/next topic navigation, "Back to unit" link. Coming-soon topics render a designed empty state: icon, "This topic is being written", CTA back to unit — never a blank area.
5. /about — short editorial page: what Axiom is, how the notes are written (spec-first, exam-technique focused), who it's for, contact link. Generous whitespace, no cards grid.
6. 404 — oversized "404" in Space Grotesk with the gradient, "This page hasn't been written yet.", button home.

Global behavior: document.title per route; scroll to top on route change; active nav link state; mobile nav = full-screen overlay with staggered link animation.

QUALITY BAR — verify every item before you finish:
1. Zero emojis; lucide-react icons only. 2. Hover + focus-visible states on every interactive element. 3. All grids equal-height with consistent 24px gaps. 4. All spacing on the 4px grid; identical section padding. 5. AA contrast — secondary text #9AA5B5 only on dark, never on paper. 6. At 375px: no horizontal scroll, hero clamps, grids collapse to 1 column, TOC collapses. 7. Every route reachable through the UI; no dead links or buttons. 8. No hardcoded subject/topic content outside src/data/subjects.ts. 9. TypeScript compiles cleanly. 10. The result reads as ONE designed system: same radii, borders, motion, and voice everywhere.

BUILD ORDER: design tokens and fonts → data file → shared components → nav/footer shell → Home → /subjects → subject detail → notes reader → about/404 → final spacing/motion polish pass.
```

---

## PROMPT 2 — DESIGN AUDIT (paste immediately after Prompt 1)

```text
Act as a ruthless design lead reviewing this site against a Linear/Vercel/Stripe quality bar. AUDIT AND FIX — do not just list findings:
1. Spacing rhythm: all padding/gaps on the 4px grid, identical section padding, consistent card padding.
2. Typography: letter-spacing on all display text, nothing below 12px, clear hierarchy inside every card, mono used for all codes/labels.
3. Color discipline: accent gradient used only for highlights, active states, hairlines, CTAs; status colors consistent everywhere; no stray colors.
4. Every card grid renders equal-height cards with identical internal layout.
5. Every interactive element has hover, active, and focus-visible states.
6. All coming-soon and empty states look deliberately designed.
7. Responsive at 375px, 768px, 1440px: no overflow, tap targets ≥ 44px, nav overlay works.
8. Motion: consistent 200–400ms, staggered reveals, prefers-reduced-motion respected.
Fix everything you find, then briefly list what you changed.
```

## PROMPT 3 — MOBILE & MOTION POLISH

```text
Polish pass, two parts.
Mobile (375–768px): hamburger opens a full-screen overlay nav with staggered links; hero text scales with clamp(); bento and subject grids collapse to one column; notes TOC collapses into a collapsible "On this page" accordion; add a sticky bottom bar in the notes reader with prev/next topic.
Desktop: scroll-linked progress hairline on notes routes; hover arrow nudges on cards; staggered whileInView fade-ups; add page-transition fade of 200ms. Ensure prefers-reduced-motion disables all transforms and transitions. No layout shift anywhere.
```

## PROMPT 4 — NOTES READER UPGRADE

```text
Upgrade the /notes/* reading experience while keeping the paper theme tokens unchanged:
1. Sticky "On this page" TOC with scroll-spy highlighting of the active section.
2. Reading progress bar at the top of the article.
3. Formula blocks: add a small copy-to-clipboard button that appears on hover.
4. Print stylesheet via @media print: paper colors, hide nav/footer/TOC/buttons, avoid breaking callouts across pages.
5. Keyboard ← / → navigates to previous/next topic when not typing in an input.
6. Estimated read time per topic computed from the data file and shown on topic rows and the reader header.
```

---

## Pro tips for AI Studio

- **One change per message.** AI Studio's quality collapses when you stack five requests into one prompt.
- **If it truncates**, say: *"Continue exactly where you stopped. Do not restart the file."*
- **If it drifts generic**, re-paste the FORBIDDEN list and the QUALITY BAR from Prompt 1.
- **Retheme later** is one message because everything references CSS variables: *"Change accent #7B8CFF to #22D3EE and regenerate the gradient."*
- **Verify before publishing:** unit codes and names in the seed data are spec-aligned, but confirm them against Pearson Edexcel's current specification pages, and update the footer disclaimer if needed.

---

## PROMPT 5 — V2 ART DIRECTION: "THE MARGINS" (use instead of the design section of Prompt 1)

*The v1 design ("midnight library", dark SaaS, bento) is deliberately conventional. A working prototype of the concept below exists — ask me for screenshots if you want a visual target. To make AI Studio build this, replace PROMPT 1's DESIGN SYSTEM, Texture, Motion and Component standards sections with the following, keeping everything else (stack, data model, pages, quality bar):*

```text
DESIGN SYSTEM — "THE MARGINS"
Concept: the entire site is a beautifully typeset, teacher-annotated exam paper. Warm paper, ink serif typography, red marking pen, highlighter. Every component comes from the exam experience: stamps, tick marks, MCQ bubbles, mark-scheme chips, answer boxes. Sharp corners (2px max radius) — paper is square. No gradients, no glassmorphism, no dark mode, no bento grids, no drop shadows (use offset print shadows: 3px 3px 0 rgba(33,28,20,0.07)).

Palette (CSS variables, light only):
- paper #F5F1E6, paper-deep #EDE7D6, paper-card #FAF7EE
- ink #211C14, ink-soft #5C5546, ink-faint #8B8271, rule #D9D0BB
- pen red #BF3B2B (accent: stamps, ticks, annotations, active states, the CTA shadow)
- ballpoint blue #2F5382 (links and Definition callouts ONLY)
- highlighter #F0E14E (key phrases, selected formulas)

Typography:
- Display/headings: Fraunces (Google Font), 500–600 weight, -0.015em tracking; hero 40–64px.
- Body: Newsreader (Google Font); UI 15–16px/1.65; note body 17.5px/1.8, max 64ch.
- Codes/labels/stamps: IBM Plex Mono, 11–13px, uppercase, tracking +0.14em.
- The "hand voice": margin annotations in Fraunces ITALIC, red, rotated -1.5deg, 15px.

Signature elements:
- A fixed double red margin rule down the left edge of the viewport (1px lines, 5px apart, 38% opacity), desktop only — the exercise-book margin. Margin annotations live in a 186px left gutter column of the notes reader, right-aligned toward the text.
- Stamps: 1.5px bordered mono uppercase labels, rotated -1.6deg, double-border inset. Status = stamps: "NOTES LIVE" (red), "IN PROGRESS" / "COMING SOON" (graphite).
- Hand-drawn red tick (SVG polyline with draw-in stroke animation) marks anything live/correct.
- Hand-drawn underline: squiggly SVG path under one key hero phrase, draws itself on load (stroke-dashoffset 0.9s).
- Highlighter swipe: key phrases get #F0E14E at 60% height, animating background-size 0→100% on load.
- Filters are MCQ bubbles: ○ circle that fills with a red dot when active — like multiple-choice options.
- Mark-scheme chips: B1/M1/A1 in tiny red-bordered mono squares beside revision points.
- Exam box: 1.5px dashed border with a small mono label punched into the top border ("LEARN THESE", "WORKED EXAMPLE").
- Buttons: solid ink with a 3px solid red offset shadow that shifts on hover/active (translate -1px/+1px).
- Paper grain: SVG feTurbulence noise data-URI overlay at ~5% opacity, plus subtle section double-rules (1px line with 3px shadow line under it) like exam paper headers.

Motion: understated "ink on paper" — 200ms hovers (lift 2px, red shadow grows), 600ms fade-up scroll reveals with 2.2s failsafe so content is never stuck invisible, draw-in underlines/ticks on first view, stamps "press in" (scale 1.25→1 with rotate settle). prefers-reduced-motion disables everything. No parallax, no bounces.

Notes reader (the showpiece): paper-white article at 64ch in a grid with a 186px margin gutter; margin notes render in the gutter on desktop and inline below paragraphs on mobile; Definition callouts have a 3px ballpoint-blue left border; ExamTip cards have a 3px red left border; formula boxes are dashed exam boxes with mono equations and one highlighted line; end with a "Mark scheme recap" card (B1/M1/A1 chips) and "Turn back ◂ / Turn over ▸" pagination cards.

Homepage sections are named like exam paper parts: "Section A — The library", "Section B — How it works" (instruction line: "Answer ALL questions. Show your reasoning."), "Section C — The examiner's voice" (three specimen callout cards, each slightly rotated). Top bar is an exam board header: centered mono "PEARSON EDEXCEL · INTERNATIONAL A LEVEL · SPEC-ALIGNED". Footer reads "END OF SECTION" between rules, with the Pearson non-affiliation disclaimer and a "Turn over ▸" link.

FORBIDDEN additionally: dark backgrounds; purple/indigo anything; rounded-xl cards; glass/blur; gradient text; Inter as the identity font; emoji as icons (the only "hand" marks are the SVG tick, arrow, underline and stamps).
```
