# Reaction Club — Edexcel IAL Chemistry Notes Site

## AI Studio / design-engineering prompt (v6 — replaces all "Spectra" versions)

Build a single-page React/Next.js study site for **Pearson Edexcel International A Level
Chemistry, 2018 specification (WCH11–WCH16)**. It must feel like a **playground, not a
document** — candy-bright, round, springy, and fun. The single most important rule:

> **No edged box layouts. Ever.** No hairline-bordered rectangles, no rigid data tables,
> no dashboard grids. Every surface is rounded, tinted, tilted or floating.

---

## 1. Design language — "Candy Lab"

**Mood:** a chemistry set drawn by a Saturday-morning cartoon. Warm, sugary, confident.

**Canvas**
- Background: warm cream `#FFF6EA` with a fine polka-dot texture
  (`radial-gradient(rgb(61 43 31 / 5%) 1.6px, transparent 1.7px)`, 26px tile).
- Surfaces: paper white `#FFFDF7` cards with **fluffy cloud shadows**
  (`0 2px 0 rgba(61,43,31,.04), 0 18px 42px -20px rgba(61,43,31,.22)`) — never borders.
- Ink: warm chocolate `#3D2B1F`; soft ink `#8A7261`; faint `#C9B6A6`; cocoa `#2E2016`
  for the footer and the recap card.

**Type**
- Display: **Fredoka** (500–700) — chunky rounded headlines, chips, buttons.
- Body: **Nunito** (400–900) — friendly, rounded.
- Mono (equations only): **IBM Plex Mono**.

**The six flavours (unit colours)**

| Unit | Flavour | Hex | Nickname |
|---|---|---|---|
| WCH11 | strawberry | `#FF6B6B` | The Toolkit |
| WCH12 | orange fizz | `#FF922B` | Feel the Heat |
| WCH13 | mint chip | `#12B886` | Lab Coat On |
| WCH14 | grape soda | `#9775FA` | Push & Pull |
| WCH15 | bubblegum | `#F06595` | Colour Me Complex |
| WCH16 | lemon sherbet | `#F59F00` | The Final Check |

Tints via `color-mix(in oklab, MAIN x%, white)`; darker pedestal shadows via
`color-mix(in oklab, MAIN 78%, #2E2016)`. Never pure black.

**Motion (framer-motion, springs everywhere)**
- Entrances: `PopIn` on mount (scale .72 → 1, spring, stagger 60–90ms);
  `Reveal` on scroll (y 26, spring, `viewport once`).
- Hover: cards lift `y:-6…-8` and un-tilt to 0°; buttons `y:-2`.
- Tap: squish `scale:.94–.97`.
- Tilt rhythm: alternating rotations of ±0.6–1.6° so nothing sits in a rigid row.
- Ambient: CSS `float` (7s/11s), morphing `blob` border-radius, `bubble-up`,
  dual marquee ribbons (one reversed), mascot bubble loop.
- Respect `prefers-reduced-motion`.

**Signature primitives**
- **Candy button:** pill, flat fill, pedestal shadow `0 5px 0 <darker>`,
  presses down to `0 1px` on active (Duolingo squish). Min touch height 44–48px.
- **Sticker card:** paper-white, 26–32px radius, cloud shadow, slight tilt.
- **Speech bubble:** rounded 24px + rotated-square tail (Bubbles talks in these).
- **Wave divider:** single SVG swell between cream and cocoa sections.
- **Doodles:** atom orbits, benzene hexagon, molecule, 4-point sparkles, plus signs,
  hand-drawn squiggle underline — stroke `currentColor` at 25–50% opacity.

**Mascot — "Bubbles" the beaker (inline SVG, no images)**
Rounded beaker with thick chocolate outline (7px), flavoured liquid with a wavy
surface, measurement ticks, oval eyes with highlights, smile, pink cheeks; bubbles
rise inside on a loop. `mood="cheer"` swaps to ^ ^ eyes. Clickable everywhere
(`boop`) — in the footer it answers with a speech bubble. It fronts the hero,
delivers "Bubbles says" tip bubbles, and its silhouette fills like a gauge
(`BeakerMeter`) to show revision progress per unit.

---

## 2. Information architecture (single route, client view state)

Only `/` exists. Three client views with spring `AnimatePresence` transitions and
scroll-to-top on change:

1. **Home (the clubhouse)**
   - Hero: eyebrow tag pill → display headline "Chemistry that *actually* **sticks.**"
     (squiggle underline + lemon marker block) → playful sub → candy CTA "Join the
     club" (scroll) + soft CTA "Peek inside WCH12" → stat chips (6 units, N topics,
     ≈h reading, worked stairs, checkpoint Qs) → mascot scene on a morphing blob with
     floating sticker badges ("spec-mapped 2018", "0% boring") and doodles.
   - Two crossing marquee ribbons (coral + cocoa, reverse directions) listing topic
     words: ENTHALPY · HESS'S LAW · TITRATIONS · CHIRALITY · BUFFERS …
   - "Six units. Six flavours." grid: tilted white sticker cards, ghost numerals 01–06,
     icon chip (Atom/Flame/TestTubes/Gauge/Palette/ClipboardCheck), flavour dot,
     nickname headline, official title, blurb, "stops" + minutes chips, a mini
     BeakerMeter fed by real localStorage progress, and an arrow puck.
   - "Revision that plays like a game": three numbered candy-dot steps
     (read sticky-sweet notes → play the checkpoints → fill your sticker book) with
     bouncing arrow pucks between.
   - CTA band: cocoa rounded-44px stage, blobs, cheer mascot, candy buttons.

2. **Unit view (the trail)**
   - Back pill; rotated code badge on a pedestal; flavour chip; huge nickname H1 with
     official title beneath; blurb in a mascot speech bubble; paper-fact chips
     (duration / marks / stage weight / IAL weight).
   - **Sticker-book card** (flavour tint): big BeakerMeter + "X of Y topics collected"
     + spring-animated progress bar.
   - **The trail:** vertical dotted path with numbered candy dots (mint check when
     revised) and tilted topic cards (label/minutes/AO chips, display title, summary,
     "sticker!" tag when done).
   - Flame-trivia card: the real element behind the flavour (symbol tile + flame name
     + wavelength + note) — fun, but real chemistry.
   - Prev/next flavour pills (soft white / next flavour's candy).

3. **Topic reader**
   - Candy scroll-progress strip (unit colour → lemon) filling across the top.
   - Chips (label · minutes · AOs), display H1, summary, squiggle divider.
   - Blocks (below).
   - **Collect this sticker** button → flips to flavoured "In your sticker book!"
     with a 26-piece confetti burst; persists to localStorage
     (`reaction-club-v1: { revised: string[] }`, cross-tab sync).
   - "Turn back / Turn over" pills; end-of-trail pill says "Back to WCHxx" with a
     party icon.

---

## 3. Notes content — rendered like a sticker book

Content model per topic: paragraph / definition / equation / worked example / tips /
table / check / recap. Render each with personality:

- **p** — 16.5px Nunito, 1.85 line height; inline markup renders `**bold**`,
  `*em*`, `==highlight==` as a lemon marker stroke, `~sub~`, `^sup^`.
- **def — word-wall sticker:** white card, icon chip, Fredoka term, slight tilt,
  lifts on hover.
- **eq — equation pills:** flavour-tint panel, rotated label chip, each formula in a
  white mono pill, "what earns marks" badges with a check icon, note line with info icon.
- **ex — worked staircase:** "Show me how" reveals numbered steps one at a time,
  each indented further with dotted connectors; the final answer pops in a candy pill
  with a party icon; "Climb again" resets.
- **tips — "Bubbles says":** mascot + speech bubble with sparkle bullets.
- **table — candy table:** rotated caption sticker above; rounded 26px shell, flavour
  header band, dashed row separators, zebra tinting, zero gridline torture.
- **check — checkpoint:** quick-fire Q cards on a tint stage; "Answer" candy button
  springs open a mint panel; the card wiggles on reveal; counter "n/N revealed".
- **recap — the 90-second recap:** dark cocoa card, rainbow numbered dots, cream text.

Voice: second person, cheeky but precise. Explanations stay examiner-accurate; the
jokes live in labels and transitions ("Turn over", "sticker!", "Go be smug.").

---

## 4. Rules of the club

1. Rounded corners everywhere (18–44px). If a rectangle shows an edge, it is wrong.
2. Colour = flavour. Each unit page and its blocks bathe in the unit's candy colour.
3. Motion is springy, never linear-easing-only; stagger everything; nothing jumps.
4. Accessibility: semantic landmarks, aria-labels on icon buttons, `aria-pressed` on
   toggles, visible dashed-coral focus rings, 44px+ touch targets, reduced-motion off.
5. Footer sticks to the viewport bottom (`min-h-screen flex flex-col` + `mt-auto`);
   cocoa with a wave top, six flavour links, and the not-affiliated-with-Pearson line.
6. Selection colour lemon; scrollbar a coral→tangerine candy cane.
7. Single route, client-side views; no data fetching required; progress in localStorage.

## 5. Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 (`@theme inline`
tokens) · framer-motion springs · lucide-react icons · fonts via `next/font/google`
(Fredoka, Nunito, IBM Plex Mono). No image assets — mascot, doodles, waves and meters
are all inline SVG.
