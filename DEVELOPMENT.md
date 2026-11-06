# DEVELOPMENT.md — Reaction Club developer guide

Everything a future developer needs to work on this site: what it is, how it
runs, how the content and theming systems work, the hard rules, and the
platform quirks that will bite you if you don't know them.

---

## 1. What this is

**Reaction Club** — revision notes for **Pearson Edexcel International A Level
Chemistry (2018 spec)**, units **WCH11–WCH16**. Single-page-style app with a
home feed, unit views, topic readers, flashcard packs, a sticker book, search
and a customization panel ("control panel").

- **Live repo:** <https://github.com/Cryptic-Corsair/revision-club> (branch `main`)
- **Deploy target:** Vercel (works out of the box — no env vars, no database)
- **Content language:** English. Site UI text is English throughout.

## 2. Stack & toolchain

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | **Next.js 16**, App Router, React 19, TypeScript   |
| Styling    | **Tailwind CSS 4** (CSS-first config in `globals.css`) + shadcn/ui components |
| Animation  | **Framer Motion** — entrance/interaction only; **never** infinite loops (see §8) |
| Package mgr | **bun** (bun.lock is the source of truth; don't mix npm/yarn) |
| Database   | **None.** All user state lives in the browser (localStorage) |
| Env vars   | **None required.** Keep it that way                 |

**Non-negotiables baked into config:**

- `next.config.ts` — `output: "standalone"` (Vercel ignores it; the sandbox
  image build uses it), `typescript.ignoreBuildErrors: false` (the build fails
  loudly on type errors — never flip this), `poweredByHeader: false`.
- `package.json` — `dev` runs `next dev -p 3000`; `db:push` is a **deliberate
  no-op echo** (the platform boot pipeline runs it; do not delete it).

## 3. Quick start

```bash
bun install          # install deps
bun run dev          # dev server on http://localhost:3000 (tees to dev.log)
bun run lint         # eslint
bun run build        # type-checks + production build (the quality gate)
bun run start        # serve the standalone build
bun run db:push      # no-op; exists only so platform boot scripts never abort
```

Port **3000** matters: the workspace preview chain proxies to it (see §10).

## 4. Architecture map

```
src/
├─ app/
│  ├─ layout.tsx        Root layout: fonts, metadata, pre-hydration prefs script
│  ├─ page.tsx          Renders <ClubApp/>
│  ├─ globals.css       ALL theming (four labs, fonts, highlights, seams)
│  └─ fonts/            Self-hosted woff2 (see §6 — do NOT revert to Google)
├─ components/club/
│  ├─ club-app.tsx      App shell + view switching + nav pill + footer
│  ├─ home.tsx          Homepage: hero, static blobs, bands, glass footer
│  ├─ bands.tsx         The horizontal "band" sections (BandWave visuals)
│  ├─ unit-view.tsx     Unit landing (WCH11–16)
│  ├─ topic-view.tsx    Topic landing
│  ├─ notes-reader.tsx  The reader: contents chips, sticky spec rail,
│  │                    ==marker-pen== highlight rendering
│  ├─ note-section.tsx  Section/block renderer for note content
│  ├─ notes-figures.tsx Hand-drawn-style SVG figures (incl. FigIE graph)
│  ├─ pack-sets.tsx / pack-view.tsx   Flashcard packs
│  ├─ sticker-book.tsx  Sticker book (progress rewards)
│  ├─ search.tsx        Search view
│  ├─ customize.tsx     The control panel (theme/scale/fonts/motion/dots)
│  ├─ icons.tsx         **Central icon set** — every icon comes from here
│  ├─ bits.tsx / blocks.tsx / format.tsx   Shared small components
│  └─ spec-index.tsx / spec-map.tsx    Spec navigation helpers
└─ lib/spectra/
   ├─ types.ts          Core shared types
   ├─ units.ts          Unit registry: WCH11–WCH16 → topic lists
   ├─ content/          wch11.ts … wch16.ts (unit topic lists) +
   │                    notes-t02-a.ts … notes-t10-c.ts (the actual notes)
   ├─ notes-types.ts    NotesDoc / SpecSection / NotesBlock / FigureKind
   ├─ notes.ts / notes-meta.ts          Notes loading + metadata
   ├─ registry.ts / deck.ts / packs.ts  Flashcard content
   ├─ search-index.ts / suggest.ts      Search
   ├─ prefs.ts          User preferences (theme, scale, fonts, motion, dots)
   ├─ progress.ts       Reading progress / marks
   ├─ dark-mood.ts      DARK_MOOD_COUNT — daily "roast" variants for dark lab
   └─ time.ts           Reading-time estimates
```

**State model:** everything user-specific is localStorage, versioned keys:
`reaction-club-prefs-v1` (settings), `reaction-club-packs-v1` (flashcard
progress), `reaction-club-time-v1` (reading time), `reaction-club-v1` (general
progress). No server, no session, no accounts. If you change a prefs shape,
bump the key version and write a migration — don't read/write old keys loosely.

**Pre-hydration flash guard:** `layout.tsx` inlines a tiny script
(`rc-prefs`, `beforeInteractive`) that applies the saved lab, fonts, content
scale and dark "mood" to `<html>` before first paint. `prefs.ts` re-applies on
hydration and then owns every change. If you add a preference, wire it into
**both** places and add a `html[data-*]` selector in `globals.css`.

## 5. Content system

Notes live in `src/lib/spectra/content/` as typed TS modules (no CMS, no MDX):

- `wch11.ts` … `wch16.ts` — per-unit topic ordering (`WCH11_TOPICS`, …).
- `notes-tNN-x.ts` — one file per topic part (`-a`, `-b`, `-c`): e.g. topic 8
  is split `notes-t08-a/b/c.ts`. Registered in the unit's topic list.

Content model (`src/lib/spectra/notes-types.ts`): a topic is a `NotesDoc`
containing `SpecSection`s; each section renders ordered `NotesBlock`s
(paragraphs, lists, equations, callouts, figures…). `FigureKind` enumerates the
SVG figure types rendered by `notes-figures.tsx`.

**How to add/extend a topic:** copy the shape of an existing `notes-tNN-x.ts`,
build the `NotesDoc`, register it in the unit's `wchNN.ts` topic list, run
`bun run build` (type errors in content are caught there), then eyeball all
four labs in the reader (contents chips clamp, spec rail, highlights).

### Content hard rules (violations have been reverted before — don't repeat them)

1. **Verbatim only.** Note sentences come verbatim from the approved source
   notes. Never paraphrase, "improve", or reorder the chemistry prose. The
   value of this site is that the text is exactly what students were given.
2. **Marker-pen highlights are rationed.** `==term==` renders as a highlighter
   mark. Use it only for genuinely load-bearing terms (a section gets a
   handful at most). Highlight spam destroys the signal.
3. **Figures must be perfect.** Hand-drawn-style SVGs in
   `notes-figures.tsx` are checked for label collisions, alignment and
   three-theme legibility. A figure ships only when it looks right in light,
   dark and classic.
4. **Spec fidelity.** Section numbering follows the 2018 spec (3.10, 3.11 …).
   Keep spec references in `SpecSection` accurate — the spec rail depends on it.

## 6. Fonts — self-hosted, do NOT revert

All six families (Fredoka, Baloo 2, Nunito, Quicksand, Patrick Hand,
IBM Plex Mono) are **local woff2 files** in `src/app/fonts/`, loaded with
`next/font/local` in `layout.tsx`, exposed as CSS variables
`--font-fredoka`, `--font-baloo`, `--font-patrick`, `--font-nunito`,
`--font-quicksand`, `--font-plex`.

**Why not `next/font/google`:** its Turbopack resolver repeatedly corrupted
its own import map between dev-server restarts
(`next/font/google queries have exactly one entry`) → every page 500-ed and
the workspace preview died. Self-hosting removed the build-time network
dependency entirely. This was a deliberate fix (commit `65ddc4f`) — do not
"clean it up" back to Google imports.

To update/refresh fonts, re-download latin woff2 from the Google Fonts css2
API (a fetch script exists at `scripts/fetch-fonts.sh`, untracked — the
`scripts/` dir is gitignored; keep it that way or move it into `docs/`),
replace the files in `src/app/fonts/`, and keep the `weight` ranges in
`layout.tsx` matching the file's variable axis (e.g. Fredoka `"300 700"`).

## 7. Theming — four labs

`globals.css` defines four skins, selected by classes/attributes on `<html>`:

- `:root` → **light** lab
- `html.dark` → **night** lab (violet-ink charcoal); plus
  `html.dark[data-mood="N"]` daily mood variants (`DARK_MOOD_COUNT` in
  `dark-mood.ts`; mood = days-since-epoch mod count, set pre-hydration)
- `html.dune` → **dune** lab (the chocolate room) — always paired with
  `html.dark` (both classes on `<html>`): the dark class carries every
  `dark:` utility, dune re-tints the tokens on top. No mood rotation.
- `html.classic` → **classic** lab (the default): daylight cream `#fdf6e3`
  rooms with espresso `#2c2013` ink — this is the theme new visitors see

User prefs (`prefs.ts`, default in parentheses): `theme` (`"classic"`),
`headFont` (`"fredoka"`), `bodyFont` (`"nunito"`), `scale` (`"M"`; S/M/L/XL —
legacy saved `zoom` values 0.9/1/1.15/1.3 migrate onto the matching step),
`specHeight` (`0.94` — the spec-map drawer's viewport fraction; set by the
panel's Peek/Tall/Full presets and by dragging the drawer's grabber, which
persists any fraction in between), `specDensity` (`"comfy"`; compact/comfy/
roomy — the chip min-width the drawer's grid packs against), `dots` (on),
`motion` (on).

### Theme chips (THEME_CHIP)

Each theme wears a fixed signature swatch — yellow sun for **light**, navy
moon for **night**, chocolate moon for **dune**, and the split
espresso/cream chip for **classic** — defined once as `THEME_CHIP` in
`prefs.ts` and used by the nav's theme button, the lab toast and the
panel's theme cards. The glyph carries the family (sun for the daylight
themes, moon for the night rooms; classic takes the rimmed two-tone
`ClassicSun` because its chip is split and no single ink crosses both
halves) while the chip names the room. These are fixed brand values that
deliberately do NOT flip with the active lab — that is the whole point of
a chip that says which room you're in.

### Content scale (S/M/L/XL)

The size knob does NOT zoom. The retired `html.style.zoom` scaled the whole
coordinate system — layout viewport included — which squeezed the spec map
drawer and every fixed surface on zoomed tablets. Instead the pref stamps
`html[data-scale]`, which `globals.css` maps onto one custom property,
`--ui-scale` (0.9/1/1.15/1.3):

- Named Tailwind tokens ride it via the `@theme inline` block (`--spacing`,
  `--radius-md/xl/2xl`). It MUST stay `inline`: a plain `@theme` token resolves
  `var(--ui-scale)` once at `:root` and the computed length inherits into every
  subtree, which would defeat the freeze pins below.
- **Widths widen with the text (the e-reader rule).** The named `max-w-*`
  frames (`max-w-3xl` reading column, `max-w-6xl` page frame, figure caps) are
  re-declared in an `@layer utilities` block in `globals.css` as
  `calc(Nrem * var(--ui-scale))`. Tailwind ignores `@theme inline`
  redeclarations of its default `--container-*` keys (spacing/radius take,
  container silently falls back), so the layer override is the mechanism; the
  calc still resolves at the element, so the freeze pins re-freeze it too.
  `width:auto` and the screen remain the final caps — widening shows only
  where there is room; a phone just wraps more, never clips.
- Paragraph measures are `max-w-[Nch]` on scaled fonts, so they widen with the
  knob for free (same characters per line, more room).
- Side-by-side rows must compress, not overflow: Tailwind's fixed
  `grid-cols-N` already emits `minmax(0, 1fr)`; any arbitrary template must be
  written `lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]` — never bare `fr`.
- Wide tables scroll inside their rounded card: `CandyTable` wraps the table
  (`min-w-[calc(Npx*var(--ui-scale))]`) in `ScrollFade` (`overflow-x-auto` +
  edge fade masks). Full-size text, swipe inside the card.
- All px sizing utilities in components are written as
  `calc(Npx * var(--ui-scale))` (borders, shadows, blurs, textures and
  scrollbars stay literal px — thickness/material, not size).
- Two subtrees are pinned: `.site-header` and `.spec-map` set `--ui-scale: 1`,
  so the navbar pill and the spec-map drawer (incl. the shared SpecChip)
  measure identical at every step. The customize panel deliberately does NOT
  pin — it is content.
- **The spec tray owns its size, outside the scale system.** Its height
  (`--spec-h`, an inline style — a continuous drag fraction can't ride a
  data-attribute ladder) and chip density (`data-spec-density` → `--spec-chip`
  in `globals.css`) are absolute numbers that ignore `--ui-scale`, page size
  and zoom on purpose. Don't wire them into the content-scale engine.
- Root font-size never moves: rem breakpoints and dvh drawers stay honest.
- New components: size with normal Tailwind utilities or
  `calc(Npx * var(--ui-scale))`; never reintroduce bare px sizing, and never
  `html.style.zoom`.
- Verify with `bash scripts/measure-scale.sh /tmp/scale.json` — frozen-surface
  rects must not differ between steps; content must scale ×0.9/×1.15/×1.3.

**Iron rule: every visual change must hold in all four labs.** A change that
looks great in classic but breaks night or dune is a bug. Verify
nothing in dark room mode uses light-only tokens — and there are many.

## 8. Design rules

- **No infinite animations.** The hero blobs once drifted forever; users hated
  it. Framer Motion is for entrance, hover and interaction only. Anything
  ambient must settle.
- **No seam hairlines.** Band joins in `home.tsx`/`bands.tsx` must be seamless;
  a visible 1px line between sections is a regression (this exact bug shipped
  and was killed in `9bfe1fd`).
- **Glass morphism pattern** (footer, control panel): translucent surface +
  backdrop-blur + hairline border + subtle top highlight — implemented so it
  survives all four labs. Copy the existing footer treatment rather than
  inventing a new one.
- **Iconography is centralized.** Every icon comes from `icons.tsx`. Never
  inline a stray `<svg>` in a view or import a second icon library.
- **Typography is variable-font driven** via the `--font-*` variables; respect
  the head/body font prefs rather than hardcoding families.

## 9. Git conventions

- **Descriptive commit messages** that say what changed and why
  (`"Seam hairline killed, liquid-glass footer, control panel redesigned"`).
- The platform auto-creates bare-UUID checkpoints (`d495d81 f2ebf5ce-…`) —
  never imitate that style, and never build on top of one silently.
- Before risky work, branch a backup: `git branch keep/<name>` (existing
  examples: `keep/home-redesign`, `backup/home-pre-redesign`).
- Working tree stays clean; `.log` files, `.env*`, `scripts/`, `.zscripts/`,
  `mini-services/` are gitignored on purpose.
- **Never commit tokens.** See §11.

## 10. Deployment & the sandbox preview chain

**Vercel:** import the repo, zero config — `vercel.json` pins
`framework: nextjs`, `buildCommand: next build`. No env vars. Node >= 20.9
(engines floor). Progress stays in each visitor's browser by design.

**Workspace preview chain (sandbox dev):**

```
browser → platform edge (*.space-z.ai) → Caddy :81 → Next dev :3000
```

- Caddy is platform-managed and proxies :81 → localhost:3000 (config mirrors
  the workspace `Caddyfile`; the `XTransformPort` query allows port overrides).
- If the preview shows "Recycled"/blank after a sandbox restart, the edge
  routing entry is stale — a **session restart** on the platform side
  refreshes it. The code is not at fault; verify `curl localhost:3000`
  returns 200 first.
- Sandbox processes die between sessions/messages. On a fresh boot the
  platform pipeline runs `bun install` → `bun run db:push` (now a safe no-op —
  it previously aborted the boot when the script didn't exist) → then the dev
  server can be started (`bun run dev`).
- If pages 500 on a cold start, suspect the font cache first — but with
  self-hosted fonts (§6) this class of failure is gone. Purging `.next/` is
  always a safe reset.

## 11. Security rules

1. **Never paste a GitHub PAT anywhere it doesn't have to go** — and assume
   any token that touched a chat log is burned: rotate it after the push.
2. Prefer fine-grained PATs with **Contents: Read and write** on this repo
   only. Note: "Public repositories (read-only)" access can never push.
3. Push with a one-off URL rather than saving the token into `.git/config`:
   `git push https://<token>@github.com/Cryptic-Corsair/revision-club.git main`
4. `.env*` is gitignored; the app needs no env vars — don't add any without a
   very good reason.

## 12. QA checklist before any push

1. `bun run lint` — clean.
2. `bun run build` — clean (this is the type gate).
3. **Four labs × the touched views × desktop + mobile widths** — walk light,
   night (moods you touched), dune and classic. Zero console errors.
4. Reader checks for content work: contents chips clamp to two lines, spec
   rail scrolls with edge fades, `==highlights==` look right in all labs,
   figures have no collisions.
5. Home page: bands seamless, blobs static after entrance, glass footer and
   control panel legible in all labs.
6. Commit with a real message, push, then confirm `origin/main == HEAD`.

---

*Keep this file honest: when the architecture or the rules change, update it
in the same commit.*
