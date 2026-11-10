# IAL CHEM · Two Interfaces — The Roadmap

**Goal:** a second, site-wide interface — the editorial dress already proven by the
disclaimer page and the sample note — selectable by the user, applied everywhere except
the homepage. Content, data, progress and behaviour stay byte-identical; only the
presentation swaps.

**Reference studied:** ch-t1to10.vercel.app — three modes (Focus / Studio / Hybrid)
switched instantly from the nav, no reload, identical content, persisted as a first-class
`uiMode` axis alongside theme/accent, with per-mode memory of each. We adopt the axis
idea; we do **not** need their per-mode theme memory because our editorial skin is built
on the theme-aware `legal-*` token system — it automatically wears all four labs.

---

## 0 · The invariants (what must never change)

1. **Notes content** — `src/lib/spectra/content/*` (31 files), `notes.ts`, `notes-meta.ts`,
   `notes-types.ts` are read-only for this project. No block kind is added, renamed or restyled in data.
2. **Stores & saved data** — `progress.ts`, `packs.ts`, `time.ts`, `desk.ts`, `prefs.ts`
   localStorage keys and schemas unchanged. The new knob rides the existing
   `reaction-club-prefs-v1` object with a sanitized default, so old saves load untouched.
3. **Homepage** — `view.kind === "home"` (Home + Desk) always renders the classic dress.
   Hard-coded by absence: we simply never build a home twin.
4. **Shared chrome** — TopBar, Footer, search palette, customize drawer, spec-map drawer:
   one implementation, both interfaces (v1 contract; editorial micro-dress via CSS is a later option).
5. **Spec map contract** — `SpecMapData { id, sections, main, active, jump }` and the
   provider are skin-agnostic; both readers register into it exactly as today.
6. **Diagrams** — `notes-figures.tsx` (7k lines, theme-var-driven SVG) reused verbatim;
   only the frame they sit in changes per skin.
7. **Classic pixel parity** — after every release, the classic interface must look and
   behave exactly as before (baseline screenshots kept for diffing).

---

## 1 · Architecture

### The axis
One new pref, independent of lab / accents / scale / fonts:

```ts
// prefs.ts
export type Iface = "rooms" | "editorial";   // internal ids — "classic" is taken by a lab
// Prefs gains:  iface: Iface   (DEFAULT_PREFS.iface = "rooms")
// sanitize:     p.iface === "editorial" ? "editorial" : "rooms"
// applyPrefs:   root.dataset.iface = p.iface   (the one applier stays the one applier)
// layout.tsx pre-paint script: +1 line mirrors dataset.iface (same contract as data-scale)
```

Cross-tab sync, SSR-safety, reset — all inherited free from the existing prefs store.

### The swap point — where the seam already exists
Every room is already a lazy single-component chunk with `RoomLoading` fallback. The
interface switch is a **twin swap at the `dynamic()` import boundary** in `club-app.tsx`:

```
classic component          editorial twin            shared props contract
─────────────────────      ─────────────────────     ─────────────────────────────
NotesReader          ⇄     NotesEditorial      ·     { docId, unit, onBack, jumpToSpec }
PackView             ⇄     PackEditorial       ·     { onHome, onOpenSpec, onOpenNotes }
StickerBook          ⇄     ProgressEditorial   ·     { units, onBack, onOpenUnit, onOpenTopic }
TopicView (fallback) ⇄     TopicEditorial      ·     (R5)
SpecIndex            ⇄     SpecEditorial       ·     (R5)
```

Each twin accepts **identical props** to its classic twin, so the view switch JSX in
`club-app.tsx` never changes — only the component picked, via one small swap table.
Because the swap happens *inside* the keyed `<m.div>` (viewKey unchanged), switching
does **not** replay the room-enter animation: instant, seamless, no reload.

### The section seam — one renderer under two readers
`SpecSectionView({ section, accent, hideStatement, bannerAction })` is "the one true way
a spec section looks". We build the editorial sibling with the **same four props**:

```
note-section.tsx  (classic, untouched)   ⇄   spec-section-editorial.tsx  (new)
  BlockView / CandyTable / Worked /           EditorialSectionView / legal-card exhibits /
  StepsPanel / Figure                         clause-rail furniture — generalised from
                                              sample-blocks.tsx + sample-notes.tsx
```

Both the notes reader and the pack delegate to it, so one editorial renderer serves both
surfaces — exactly as `SpecSectionView` does today. `sample-notes.tsx` is then refactored
to consume `EditorialSectionView` too (the sample becomes a thin client of the real thing;
one place to perfect the dress).

### New files (all additive; classic files untouched except the swap table)
```
src/lib/spectra/progress-derive.ts     — achievements/pct/goal math lifted from sticker-book & desk (pure)
src/lib/spectra/scroll-helpers.ts      — scrollToSpec + rect scroll-spy, parameterised per skin
src/components/club/spec-section-editorial.tsx
src/components/club/notes-editorial.tsx
src/components/club/pack-editorial.tsx
src/components/club/progress-editorial.tsx
src/components/club/topic-editorial.tsx, spec-editorial.tsx   (R5)
src/components/club/iface-cards.tsx    — the panel's two interface cards + miniatures
```

### What the editorial notes reader wears (the sample-note blueprint, generalised)
`legal-room` root → `legal-hero` (kicker, giant display title with `legal-heading-accent`,
meta row, orbit emblem) → sticky `legal-index` contents rail → `legal-summary` key-points
card → `legal-clauses` rails (numbered 01…n, `--legal-accent` icon chip, spec statement
box with the 5px accent border) → `EditorialSectionView` per spec section → `legal-closing`.
Figures ride inside `legal-card` exhibit frames. Pack ticks plug into `bannerAction`
unchanged. Reading time, scroll-spy and deep-links behave identically.

---

## 2 · Releases (each shippable, each revertible)

> **Status: R0–R6 shipped — the two-interface site is complete.** The
> interface axis is live everywhere except the homepage: notes, pack,
> progress, unit walk, topic reader and spec index all wear both dresses,
> the switch works live from the customize panel in both directions with
> no reload, and a mid-note switch re-lands you on the same spec
> statement. Classic parity holds (fresh 28-shot classic reference in
> `.baselines-check/`, editorial matrix in `.baselines-editorial/`,
> capture script in `scripts/baseline-capture.sh`).

### R0 — Groundwork (no visible change)
1. Lift progress derivations → `progress-derive.ts`; lift `scrollToSpec`/scroll-spy → `scroll-helpers.ts` (classic views now import them — behaviour-identical refactor).
2. Legal token hygiene in globals.css: give `--legal-accent` a fallback (`var(--legal-rust)`); consolidate the three scattered per-lab legal override blocks into one token re-tint per lab; **fill the dune gaps** (kicker, grain, index-link, clause numerals) — today dune is only partially tuned.
3. Baseline screenshot set: all views × 4 labs × desktop + 390px, archived.
**Gate:** tsc → eslint → full walkthrough → classic parity vs baselines.

### R1 — The switch (plumbing)
`iface` in prefs + dataset + pre-paint line; "Interface" section at the top of the
customize panel — two cards with live miniatures (Rooms: band-room miniature;
Editorial: legal miniature); swap table in club-app where the editorial branch initially
resolves to the same classic components. Switching is already instant and persisted.
**Gate:** as R0 + switch flips with no flash, no animation replay, cross-tab consistent.

### R2 — Editorial notes reader (the flagship)
`spec-section-editorial.tsx` + `notes-editorial.tsx`; sample-notes refactored onto the
shared renderer. Spec map registers and hops; pack ticks; figures; scroll-spy re-lands
on the exact spec statement. All four labs verified (dune especially).
**Gate:** as R0 + spec-map drawer interaction screenshots + figure rendering in every lab.

### R3 — Editorial pack
`pack-editorial.tsx` reusing `EditorialSectionView`; registry/packs store untouched;
read-ticks, sets dialog, copy, print (editorial gets its own `@media print` pass).
**Gate:** as R0 + print preview + set save/load round-trip.

### R4 — Editorial progress
`progress-editorial.tsx` on `progress-derive.ts`: stat pillars → summary stamps, sticker
grid → index grid, achievements → stamps; goal bench keeps its maths, loses the candy.
**Gate:** as R0 + toggle-revised still writes the same store keys (verify via localStorage).

### R5 — The rest of the site
Topic fallback, unit walk, spec index twins; optional editorial micro-dress of nav/footer
via `html[data-iface="editorial"]` CSS (scrollbar thumb, selection, dots policy).
**Gate:** as R0 + full-matrix walkthrough.

### R6 — Seamlessness polish
Scroll-anchor preservation across a switch (you stay on the same statement); idle
preload of editorial chunks; reduced-motion & focus passes; final full matrix.
**Gate:** the whole checklist, then push.

### R7 — The tailored rooms (classic sophistication pass)

With Editorial standing next to it, the classic interface read "old-fashioned":
too many hard pedestal shadows, per-item zebra rotations, five competing
small-caps label treatments, chunky dashed rules, extrabold body text. This
release keeps every structure, colour and behaviour — it re-tailors the suit:

1. **One pedestal rule** — hard `0 3–6px 0` shadows demoted everywhere except
   true primary CTAs; cards ride `puff` + hairline `border-ink/[0.06–0.09]` or
   `0 2px 0 var(--edge)`. Trail stones / unit tiles swap pedestals for soft
   colour halos (`0 0 0 5px tint(main, 18)`).
2. **Rotation discipline** — the only surviving tilts are the SectionTag and
   the hero highlight. Topic cards, trail stones, def cards, recap, banner
   pills, badge pills, worked pills, sticker tiles and badge-wall fans all
   stand square.
3. **The Kicker** (`bits.tsx`, classic-only) — one small-caps label: 10.5px,
   bold, 0.16em tracking, accent dash. Replaces the 0.14/0.16/0.18/0.2em
   mélange in notes-reader, pack, progress, spec-index, topic blocks.
4. **Print-style equations** — note-section + blocks `eq` blocks re-set as
   border-y hairline bands with flat framed mono chips (no more shadowed
   lozenges). Statement/def cards: 3px accent left rule on paper, Kicker label,
   italic ink-soft statement.
5. **Tables** — hairline solid row rules (was 2.5px dashed), quiet 11.5px caps
   headers in ink-soft, zebra fallback rides `--tint-base` (was hard `#ffffff` —
   a dark-lab bug), radius 14.
6. **Type weights** — body/meta `font-extrabold` → semibold across unit/topic/
   notes/pack/progress/spec-index; kickers font-bold only.
7. **Header unification** — unit code badge, "Revision note", "Your pack",
   "Spec index" badges all stand square on one recipe (lemon badge now uses
   `readableInk`, not the hard-coded `#5f4a00`).
8. **Theme-bug fixes in shared surfaces** — customize Aa tile roast shadow →
   hairline; goal chips / minutes rows / dashed ticks route through
   `var(--color-ink)` mixes so dark, dune and espresso labs stay coherent;
   reset button pairs coral with `shade()` (was `#e8590c`).
9. **Desk** — cream cards gain hairline borders for definition on paper.

**Files:** bits · note-section · blocks · unit-view · topic-view · notes-reader ·
pack-view · sticker-book · spec-index · desk · customize. Homepage untouched;
editorial twins untouched (verified by file diff); spec-map untouched.
**Gate:** tsc → eslint → walkthrough (desk, unit, trail, notes incl. espresso
rooms + tables + equations + worked examples, pack, spec index, progress,
customize) × labs (classic/dune/night) × 1440+390 → zero console/page errors;
editorial swap verified live mid-session.

---

## 3 · Risk register

| # | Risk | Mitigation |
|---|------|-----------|
| 1 | Classic regression | Twins are new files; classic diff = one swap table + one pref field. Baselines diffed every release. |
| 2 | Content drift | Content/registry/stores never edited; both skins render the same `SpecSection` objects through the same `Fmt` vocabulary. |
| 3 | `--legal-accent` unset → invisible chip break | Fallback token (R0) + renderer always sets it inline. |
| 4 | Dune lab gaps in legal-* | Dedicated R0 pass; dune screenshots in every gate. |
| 5 | ui-scale blind spots in legal CSS (fixed 42px rails etc.) | Audit in R0; twins use `calc(Npx * var(--ui-scale))`; documented exceptions only. |
| 6 | Scroll-spy drift between skins | Shared, parameterised helper; per-skin scroll-mt measured. |
| 7 | Bundle weight | Twins ride their own lazy chunks; `figureArt`/figures reused, not duplicated. |
| 8 | Flash of wrong skin | `data-iface` mirrored in the pre-paint script; all twins `ssr:false` behind RoomLoading. |
| 9 | Switch loses your place | R6 scroll-anchor: both readers know the active spec; the switch re-lands you there. |
| 10 | Print regression | Classic `.pack-sheet` print rules untouched; editorial pack gets its own print block (R3). |

---

## 4 · Open decisions (user)

1. **Names** — internal `rooms` / `editorial`. Display options: **"Rooms" & "Editorial"** (recommended, honest) · "The Club" & "The Archive" · "Standard" & "Manuscript".
2. **Switcher placement** — customize panel section (recommended for v1) vs a FOCUS/STUDIO-style segmented pill in the nav (can add in R6).
3. **v1 scope of R5** — unit/topic/spec in editorial from the start, or accepted as classic until R5 lands (recommended: the three named surfaces first).
