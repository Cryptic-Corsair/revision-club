# IAL CHEM — Site Handbook

**Purpose:** the authoritative orientation and operating manual for human developers and AI agents working on this repository. It explains the product, architecture, protected material, design boundaries, development workflow and verification requirements.

**Repository:** Cryptic-Corsair/revision-club  
**Primary branch:** main  
**Product:** IAL CHEM  
**Scope:** Pearson Edexcel International A Level Chemistry (2018 specification), units WCH11–WCH16.

> Read this before changing the site. Then read the relevant sections of DEVELOPMENT.md and INTERFACES-ROADMAP.md. This handbook describes the current intended architecture; current source code is the final authority when implementation and prose disagree.

---

## 1. Operating instructions for every contributor

This document is written for people and autonomous coding agents. It is not optional background reading.

Before making a change:

1. Identify the exact request and its scope. Do not turn a narrow request into an unsolicited redesign.
2. Inspect the current implementation on main. Do not rely on old chat summaries, old screenshots or assumptions.
3. Read the relevant documentation and trace the feature from its data source through state, components, styling and navigation.
4. Identify which invariants apply. Preserve them unless the user explicitly authorises a change.
5. Make the smallest coherent change that solves the request.
6. Run appropriate checks and inspect affected states.
7. Report what changed and what was actually verified.

### Source-of-truth order

When sources disagree, use this order:

1. The user's latest explicit instruction for the requested change.
2. The current implementation on the target branch.
3. This handbook and the specialised architecture documents.
4. Historical commits, old screenshots and prior conversation summaries.

Comments and documents can become stale. Verify claims against code and update documentation when architecture genuinely changes.

### Scope discipline

- Touch only the requested surface and the dependencies necessary to implement it correctly.
- Do not replace a whole component to adjust one small section.
- Do not restyle unrelated pages while fixing a bug.
- Do not remove working features, content, compatibility behaviour or saved data as cleanup.
- Do not add a new parallel system when an existing shared system already owns the behaviour.
- If a request conflicts with a protected invariant, explain the conflict and seek approval before changing it.
- Prefer incremental and reversible changes when the visual outcome is uncertain.

---

## 2. Product identity and purpose

IAL CHEM is an educational revision site, not a generic chemistry portal or social platform. Its core value is structured, specification-aligned learning material and the ability to navigate, revise and track personal study activity.

The site covers Pearson Edexcel International A Level Chemistry (2018 specification):

- WCH11 — Unit 1
- WCH12 — Unit 2
- WCH13 — Unit 3
- WCH14 — Unit 4
- WCH15 — Unit 5
- WCH16 — Unit 6

The product includes a home/desk experience, unit and topic navigation, specification-organised notes, Rooms and Editorial interfaces, revision packs, progress/sticker features, topic search, a specification map and a customization panel.

### Brand and language rules

- The public-facing product name is **IAL CHEM**.
- Do not reintroduce the old public-facing name Reaction Club in visible copy, metadata, logos, labels or UI.
- Some browser storage keys still contain the historical string reaction-club. These are compatibility identifiers, not public branding. Do not rename them casually; doing so can make existing saved preferences and progress appear to disappear.
- The site UI is English.
- Keep copy precise, professional and natural. Avoid generic AI-sounding filler, exaggerated claims, artificial slogans and casual legal language.
- Preserve the Pearson non-affiliation disclaimer. The site is not affiliated with or endorsed by Pearson Education Ltd.

---

## 3. Technology and runtime model

| Area | Current implementation |
|---|---|
| Framework | Next.js 16, App Router |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4, CSS-first configuration |
| Animation | Framer Motion |
| Package manager | Bun; bun.lock is the lockfile source of truth |
| Persistence | Browser localStorage; no application database |
| Authentication | None |
| Deployment target | Vercel |
| Main route | Single app route rendered through the client-side app shell |

There is no server-side user account, cloud profile or database synchronising study activity. Preferences, progress, reading time, desk state and revision-pack state are stored in the visitor's browser.

Consequences:

- Clearing browser storage can clear saved state.
- Different browsers/devices do not automatically share progress.
- Storage can be unavailable or throw; stores must fail safely.
- Cross-tab storage updates must continue to work.
- Never introduce a backend, account system, remote persistence or transmission of personal study data without explicit product approval.

### Commands

    bun install
    bun run dev       # local development on port 3000
    bun run lint      # ESLint
    bun run build     # production build and standalone asset copy
    bun run start     # run standalone output
    bun run db:push   # deliberate no-op for platform compatibility

Use Bun and keep bun.lock consistent. Do not casually regenerate or mix lockfiles with npm/yarn. Node 20.9+ is specified by the package.

Important configuration constraints:

- next.config.ts intentionally uses standalone output and does not ignore TypeScript build errors.
- Never set typescript.ignoreBuildErrors to true.
- db:push is intentionally a no-op because there is no database. Do not remove it without checking deployment/boot integrations.
- Port 3000 is used by the local preview environment.
- The build script copies static assets and public into standalone output after next build. Understand this before replacing it with a generic command.

---

## 4. Repository map

The application source lives under src/.

    src/
      app/
        layout.tsx             Root layout, metadata, local fonts, pre-paint preferences
        page.tsx               Entry point rendering the app shell
        globals.css            Global tokens, themes and interface-specific styling
        fonts/                 Self-hosted font files
      components/club/
        club-app.tsx           App shell, view state, navigation, shared chrome, lazy swaps
        home.tsx               Home/landing experience
        desk.tsx               Returning-user desk / study continuation
        unit-view.tsx          Rooms unit view
        unit-editorial.tsx     Editorial unit view
        topic-view.tsx         Rooms topic view
        topic-editorial.tsx    Editorial topic view
        notes-reader.tsx       Rooms notes reader
        notes-editorial.tsx    Editorial notes reader
        note-section.tsx       Rooms section/block renderer
        spec-section-editorial.tsx Editorial section/block renderer
        notes-figures.tsx      Chemistry SVG figure library
        spec-map.tsx           Shared spec-map provider and drawer
        spec-index.tsx         Rooms specification index
        spec-editorial.tsx     Editorial specification index
        pack-view.tsx          Rooms revision-pack view
        pack-editorial.tsx     Editorial revision-pack view
        pack-sets.tsx          Revision-pack set management
        progress-editorial.tsx Editorial progress/sticker view
        sticker-book.tsx       Rooms progress/sticker view
        search.tsx             Search drawer/palette
        customize.tsx          Control panel and preference controls
        legal.tsx              Legal/disclaimer surface
        bands.tsx              Rooms band/wave and accent helpers
        icons.tsx              Central icon definitions
        bits.tsx               Shared UI primitives
        blocks.tsx             Shared block-level UI
        format.tsx             Inline note formatting
      lib/spectra/
        types.ts               Shared unit/topic types
        units.ts               Unit registry and derived totals
        content/               Unit topic lists and authored chemistry notes
        notes-types.ts         Note document, section, block and figure model
        notes.ts               Note document registry/loading
        notes-meta.ts          Lightweight note metadata for navigation
        registry.ts            Flashcard/pack registry
        packs.ts               Revision-pack state and saved sets
        progress.ts            Revised-mark state
        progress-derive.ts     Derived progress calculations
        desk.ts                First-visit/returning-desk state
        time.ts                Reading-time tracking
        prefs.ts               Preferences, validation, persistence and DOM application
        search-index.ts        Derived topic search index
        scroll-helpers.ts      Shared spec-anchor navigation and scroll spy
        dark-mood.ts           Daily dark-theme mood selection
        suggest.ts             Related-topic suggestions
    public/                    Static assets

This is a functional map, not a guarantee every filename remains forever. Verify the tree before relying on a path. Put new work with the domain it belongs to rather than creating a parallel architecture.

---

## 5. Architecture: data, state and presentation

Keep these responsibilities separate.

### Data

Chemistry content and the unit/topic catalog live in src/lib/spectra/. This is the source of truth for what the site teaches and how it is organised.

### State

Preference and study stores live in src/lib/spectra/. They own persistence, validation, subscriptions and cross-tab behaviour. Components should consume their public hooks/actions rather than create duplicate state.

### Presentation

React components under src/components/club/ render data and state. CSS in src/app/globals.css defines shared tokens and visual systems. Rooms and Editorial can render the same domain data differently, but must not create separate copies of that data or separate progress systems.

**Core rule: one underlying product and one set of study records; presentation can vary, content and behaviour must not drift.**

---

## 6. Chemistry content: protected source material

This is the most important preservation rule in the repository.

### 6.1 What must remain verbatim and intact

Treat the following as protected educational source material:

- Approved chemistry note prose in src/lib/spectra/content/notes-*.ts.
- Official specification statements stored in each SpecSection.statement.
- The order of paragraphs, lists, worked examples, tables and figures where it reflects the source teaching sequence.
- Chemical equations, formulae, charges, state symbols, units, significant figures, reaction conditions and numerical data.
- Table headings, row/column associations, footnotes and captions that carry scientific meaning.
- Figure labels, axis labels, legends, plotted values and captions.
- Unit/topic identity, topic ordering and specification numbering.
- Source attribution and document metadata identifying the origin of material.

**Do not paraphrase, rewrite, simplify, polish, shorten, expand, reorder or silently correct chemistry prose.** A stylistic improvement is still a content alteration. A developer or AI agent must not decide that wording is awkward and rewrite it.

If a scientific error, typo or inconsistency is suspected:

1. Do not silently change the source text.
2. Identify the exact passage and explain why it appears incorrect.
3. Check the approved source/specification or ask the site owner for confirmation.
4. Obtain explicit authorisation for a content correction.
5. Make the smallest authorised correction and document it.

This restriction applies even when a request concerns note-page appearance. Styling must not mutate content.

### 6.2 What may change around protected content

With the meaning and order preserved, authorised presentation changes may include spacing, indentation, typographic hierarchy, responsive layout, scroll behaviour, card/band/rail framing, accessible wrappers, theme-aware colours and rendering improvements.

A renderer may transform markup for display (for example, render ==term== as a highlight) but must not change the stored sentence.

### 6.3 Content model

notes-types.ts defines the typed structure:

- NotesDoc: one note document associated with a unit and topic.
- SpecSection: one specification point, including its number, official statement, title and ordered blocks.
- NotesBlock: a discriminated union of supported block kinds.
- FigureKind: the finite set of figure identifiers supported by the SVG renderer.

Current block kinds include paragraphs, headings, bullet lists, notes, definitions, equations, tables, worked examples, steps, figures and callouts. The TypeScript union is authoritative. Do not invent a new block kind without updating every relevant renderer and validating both interfaces.

### 6.4 Adding or repairing content

Content changes require explicit authorisation. When authorised:

1. Find the correct unit/topic source module.
2. Confirm its source and specification coverage.
3. Preserve existing block order and exact text unless a correction is explicitly approved.
4. Keep document id, unit code, topic id and spec numbering consistent with registries.
5. Ensure each figure kind exists in the figure renderer.
6. Ensure tables have consistent column counts and correctly paired headings/cells.
7. Run the production build to catch type errors.
8. Inspect the rendered topic in both interfaces and all four themes.

Do not edit content merely to make a screenshot look more balanced.

---

## 7. Unit and topic registry

src/lib/spectra/units.ts is the central unit catalog. It imports topic arrays for WCH11–WCH16 and exposes helpers such as getUnit, getTopic and derived totals.

The content/wchNN.ts files define each unit's topic list and order. Note documents are registered separately through the note registry and metadata.

Registry invariants:

- A unit code is an identity, not a decorative label. Keep WCH11–WCH16 exact.
- A topic id must remain stable when referenced by notes, search, saved progress, packs or navigation.
- Topic ordering must match the intended syllabus structure.
- Do not duplicate a topic in another unit to make a view easier to render.
- Do not hardcode a second copy of unit/topic metadata in a component if it can be derived from the registry.
- Search and derived totals should continue to use the registry as their source.
- Unit labels use the plain unit number where the established design calls for it. Do not invent per-unit element/glyph identities. Rooms unit colours are presentation tokens held in `ROOM_UNIT_ACCENTS`; the homepage's existing `Unit.candy.main` values remain separate.

When adding or changing a unit/topic, trace every consumer: home, unit view, topic view, note metadata, note registry, search index, progress, revision packs, suggested topics and both interface variants.

---

## 8. Rooms and Editorial: two interfaces, one product

The site has two presentation modes:

- **Rooms** (iface: rooms): the established band/room presentation, waves, mascot and Rooms note renderer.
- **Editorial** (iface: editorial): a document-oriented presentation with editorial hero, index/rails, numbered clauses and exhibit/card framing.

The interface preference is independent of the theme preference. They are two separate axes.

### 8.1 What is shared

The following remain based on shared data and shared behaviour:

- Unit/topic/note registries and chemistry text.
- Saved progress and revision-pack data.
- User preferences and persistence mechanisms.
- Navigation state and deep-link meaning.
- Specification point identities.
- Scroll targets and active specification tracking.
- Chemistry figure definitions.
- Search results and destination identities.

Interfaces must not create separate copies of notes or separate progress histories.

### 8.2 What can be interface-specific

Page composition, component tree, spacing, typography hierarchy, layout, section framing, index/rail treatment, interface-scoped CSS tokens and responsive presentation can differ, provided the same information and actions remain available.

### 8.3 Twin component contract

Where a Rooms component has an Editorial twin, the twins must accept equivalent props and represent the same domain state. The app shell should select the appropriate presentation at the existing swap point in club-app.tsx rather than forking the entire navigation system.

Before changing a twin:

1. Compare public props and callbacks.
2. Confirm both render the same underlying document/registry data.
3. Confirm all actions are available and have equivalent effects.
4. Confirm spec-map registration and deep links work in both.
5. Confirm switching interface does not reset the current route, progress or pack selections unexpectedly.
6. Confirm the home/desk exception: the homepage retains its established presentation rather than being casually duplicated.

Do not create a new twin unless there is a clear presentation requirement and the owner approves the added maintenance cost.

See INTERFACES-ROADMAP.md for the detailed interface contract and planned boundaries.

---

## 9. Themes, tokens and CSS ownership

There are four global themes (called labs internally):

- light
- dark (Night)
- dune
- classic (current default)

The theme is global. Rooms and Editorial do **not** have independent theme selectors or separate theme persistence. Each interface interprets the active global theme through its own presentation system.

### 9.1 Theme application

prefs.ts owns preference validation and the central applyPrefs() mechanism that applies selected theme/interface/font/scale settings to the document root. layout.tsx contains a pre-hydration script that mirrors relevant saved values before first paint to prevent a flash of the wrong theme.

If a preference affects first paint, changing only the React store is insufficient. Update pre-paint and runtime application together. Test first load, refresh, preference changes and cross-tab updates.

Dune uses the dark-mode foundation plus Dune-specific token overrides. Do not assume html.dune is independent of html.dark; inspect the actual root-class application before changing selectors.

### 9.2 CSS ownership rules

- Shared foundations and global theme tokens belong in the global theme/token layer.
- Rooms-specific rules must be scoped to .note-rooms and relevant theme-qualified selectors.
- Editorial-specific rules belong to the .legal-* / editorial styling system and appropriate interface scope (for example html[data-iface="editorial"] where needed).
- Do not let a Rooms selector leak into Editorial or vice versa.
- Avoid broad element selectors for local visual changes.
- Prefer existing design tokens and component classes over scattering one-off hex values through components.
- If a colour is part of a system, define it once at the appropriate token boundary.
- Never fix a local surface by changing a global token unless every consumer is intended to change.

### 9.3 Accent ownership

Rooms and Editorial are intentionally neutral reading interfaces. Do not add unit-specific accent colours, rotating section colours, coloured spec chips, rust/lilac/amber clause markers or accent-tinted callouts to either interface.

- Rooms section bands use only the active theme's neutral paper surfaces. Teaching cues use the theme's ink and soft-ink values.
- Editorial's `--legal-rust` is a compatibility token for neutral soft ink; do not restore a coloured rust identity.
- The six stored accent IDs remain part of the preference schema because Home still uses the independent accent palette. The Customize palette must describe and preview Home only.
- Chemistry diagrams may retain colour where it conveys scientific meaning (atoms, ions, apparatus, indicator changes or plotted series). Do not confuse semantic scientific colour with interface accent decoration.
Search all consumers before changing accent behaviour.

### 9.4 Visual design principles

The site should feel deliberately art-directed, polished and readable—not like a generic template.

- Maintain clear typographic hierarchy.
- Use spacing and indentation to show semantic nesting; do not replace actual indentation with a long decorative vertical line.
- Keep table headers legible, prominent and correctly aligned with their columns.
- Use bright accents with restraint and sufficient contrast.
- Preserve calm reading surfaces; decoration must not compete with chemistry content.
- Avoid excessive gloss or glassmorphism. A treatment that looks attractive in isolation may not fit the surrounding visual language.
- Avoid unnecessary gradients, glow, borders and shadows.
- Do not add ambient infinite animations. Motion should be purposeful and settle.
- Keep the site responsive across phones, tablets, laptops and large desktop screens.
- Preserve carefully tuned navbar dimensions and fixed-surface behaviour unless the request explicitly targets them.

### 9.5 Theme switching

Theme switching must be atomic. Do not add document-wide transitions that animate every background, border, text colour or pseudo-element. The reader can contain hundreds of nodes and global animation can cause jank, especially on mobile.

Use local transitions for the control itself, not a whole-page theme animation. Test repeated switching and switching while a drawer or reader is open.

---

## 10. Typography and content scale

Fonts are self-hosted under src/app/fonts/ and loaded in layout.tsx using next/font/local. Current families include Fredoka, Baloo 2, Nunito, Quicksand, Patrick Hand and IBM Plex Mono. The default pair is Fredoka for headings and Quicksand for body text.

**Do not replace local fonts with next/font/google.** This was deliberately avoided because the Google font resolver caused repeated Turbopack import-map failures and page errors. Keep font assets local and declared weight ranges consistent with the files.

Font preferences are applied through CSS variables. Avoid hardcoding font families in components where a preference-aware variable exists.

### Content scale is not browser zoom

The S/M/L/XL preference drives --ui-scale, not html.style.zoom. Consult prefs.ts for current values rather than copying them into components.

- Do not reintroduce html.style.zoom.
- Keep root font-size stable so breakpoints and viewport units remain reliable.
- Use the established scaled sizing pattern for component dimensions.
- The site header and spec-map drawer intentionally pin their scale so they do not grow with note text.
- The customization panel is content and does scale.
- The spec-map drawer has independent height and density preferences; do not wire these into content scale.
- Responsive grids must shrink without horizontal overflow.
- Wide tables should scroll inside their own card, not widen the whole page.

The detailed calculations, Tailwind token behaviour and measurement procedure are in DEVELOPMENT.md. Read that section before changing scale-related CSS.

---

## 11. Persistence and user data

The stores are browser-local and use historical key names. Current key families include:

| Store | Key | Purpose |
|---|---|---|
| Preferences | reaction-club-prefs-v1 | Theme, interface, accents, scale, fonts, spec-map sizing, dots and motion |
| Revision packs | reaction-club-packs-v1 | Selected spec points, pack read state and saved sets |
| Reading time | reaction-club-time-v1 | Reading-time records |
| General progress | reaction-club-v1 | Revised marks |
| Desk | reaction-club-desk-v1 | First-visit/engaged state and last unit/topic |

Always verify the current store source before relying on a field list; schemas may evolve.

### Persistence rules

1. Keep storage keys stable. Renaming a key without migration strands existing user data.
2. Keep sanitisation defensive. Local storage is untrusted input and may be malformed or from an older version.
3. Add new preference fields with safe defaults and validation.
4. If a schema change is unavoidable, implement an explicit migration and preserve old values where possible.
5. Keep writes centralised in the owning store; components should not independently write the same key.
6. Preserve same-tab subscription updates and cross-tab storage event behaviour.
7. Handle unavailable storage without crashing the app.
8. Keep server snapshots deterministic and safe; do not access window/localStorage during server rendering.
9. Do not clear or reset a store as a side effect of changing themes, interfaces, fonts or scale.
10. Do not add remote persistence or transmit personal study data without explicit approval.

### Adding a preference

A preference may require coordinated updates in the Prefs type/default, sanitisation/migration, applyPrefs() and root classes/datasets, the pre-hydration script in layout.tsx, CSS selectors/tokens, Control Panel UI, reset behaviour and manual verification.

Do not implement a preference in only one of these places. Theme/interface/scale flash bugs often come from pre-paint and hydrated application disagreeing.

---

## 12. App shell, navigation and lazy loading

club-app.tsx is the app shell. It owns current view state, navigation transitions, top navigation, shared footer/chrome, global drawers and selection of Rooms/Editorial twins.

The site is a single-route app with internal view state. Do not introduce new Next.js routes for internal views unless the user explicitly asks for route-level URLs and the architecture is deliberately revised.

Many larger surfaces are loaded through next/dynamic with client-side rendering and a common loading fallback. This keeps the first-load bundle smaller. Preserve this lazy-loading boundary; do not pull the full notes reader, large SVG figure library or all tools into the initial shell without a measured reason.

### Navigation and responsive behaviour

- Keep navigation controls focused and uncluttered.
- On smaller screens, the navbar deliberately exposes fewer actions than desktop.
- The Control Panel is a settings surface, not a second general-purpose navigation system.
- The spec-map drawer is a dedicated navigation surface; do not replace it with a floating modal or unrelated full-screen overlay without explicit direction.
- Search is a drawer/palette experience. Do not autofocus and summon the mobile keyboard immediately when opened unless specifically requested.
- Preserve fullscreen control behaviour and established responsive navbar sizing.
- Do not change control dimensions just because text scale changes; fixed chrome is intentionally independent.

When changing navigation, test keyboard access, focus return, escape/close behaviour, small screens and view transitions.

---

## 13. Specification map, anchors and scrolling

The specification map is shared infrastructure. Readers register their current document, section list, active section and jump callback with the shared provider.

scroll-helpers.ts centralises specification anchor identity, verified jump behaviour and scroll spy. This logic exists because simple scrollIntoView and IntersectionObserver behaviour proved unreliable for long smooth jumps and content-visibility-rendered sections.

Preserve these contracts:

- A specification point keeps its exact identity, such as 2.6.
- Anchor ids are generated consistently from the spec number.
- Rooms and Editorial readers agree on which spec point is active.
- Deep links from indexes and packs land on the same section.
- The navbar's spec map refers to the currently displayed note/pack document.
- Map height and density remain independent from content scale.

Do not build a second scroll spy or anchor naming convention in one interface. Reuse shared helpers and registration contracts.

---

## 14. Search

The topic search index is derived from the central UNITS registry in search-index.ts. It is not a manually maintained parallel list.

When adding a topic, ensure it is registered correctly and verify search can find it by relevant title, unit code, label and summary terms.

When changing search UI:

- Preserve the drawer/palette interaction model.
- Do not autofocus on open in a way that immediately opens the mobile keyboard.
- Keep result labels clear and destinations correct.
- Preserve keyboard navigation and dismissal behaviour.
- Avoid floating-window clutter.
- Do not change the underlying topic registry to make the search UI easier.

---

## 15. Revision packs, progress, desk and reading time

These features represent saved study activity. They are not decorative widgets.

- **Revision packs:** specification points can be selected from note sections and assembled into packs. Preserve stable spec identifiers and syllabus ordering.
- **Progress:** revised marks are stored independently from interface presentation.
- **Progress derivation:** pure calculations should live in the shared derivation module where appropriate, not be duplicated in each interface.
- **Desk:** remembers whether the visitor has begun studying and their most recent unit/topic.
- **Reading time:** records reading activity and feeds time/continuation information.

Test both interfaces and verify state remains identical after switching Rooms/Editorial or changing theme. A UI twin must not own its own copy of the study store.

Never silently discard, reset, re-key or reinterpret saved progress.

---

## 16. Chemistry figures and visual assets

notes-figures.tsx contains a large, specialised library of chemistry diagrams rendered as SVG. These are educational assets, not disposable decoration.

Preserve scientific geometry and relationships, chemical labels/symbols/charges, axis direction and scale, plotted data and legends, legibility at realistic size, theme-aware contrast and consistent framing in Rooms and Editorial.

Do not replace an existing figure with generic stock art or a visually similar but scientifically different drawing. Do not change figure identifiers casually; content modules refer to them through the FigureKind union.

A figure change requires visual inspection at realistic reading size, in all four themes and both interfaces where the figure appears. Check narrow screens for clipping and label collisions.

---

## 17. Icons, animation and shared primitives

- Use the central icons.tsx icon set. Do not add a second icon library or scatter bespoke inline SVG icons through feature components.
- Reuse shared primitives from bits.tsx, blocks.tsx and format.tsx where they already represent the needed behaviour.
- Framer Motion is for deliberate entrances, hovers and interactions.
- Do not add infinite ambient animations, permanently drifting blobs, continuous marquees or perpetual wiggles.
- Respect reduced-motion preferences.
- Avoid making a shared primitive feature-specific. If a component is genuinely unique to one interface, keep it scoped there.

---

## 18. Accessibility, interaction and responsive quality

Every feature must remain usable, not merely attractive.

- Use semantic buttons for actions and links for navigation.
- Provide accessible names for icon-only controls.
- Keep visible keyboard focus.
- Preserve aria-pressed, expanded/selected states and other state semantics where relevant.
- Ensure drawers and overlays can be dismissed and do not trap users unexpectedly.
- Avoid focus loss when switching a view or closing a panel.
- Keep text and controls readable at all content scales.
- Do not communicate state by colour alone.
- Check contrast in all themes, including highlighted text and table headers.
- Ensure tables and diagrams remain usable on small screens.
- Respect prefers-reduced-motion.
- Avoid horizontal page overflow.

Test at minimum: narrow phone, larger phone, tablet, laptop and desktop widths. Check portrait and landscape where a drawer or fixed control is involved.

---

## 19. Safe development workflow

### Before editing

- Confirm the repository is Cryptic-Corsair/revision-club and branch is main.
- Fetch the latest version of every file being edited.
- Read the relevant component and its related data/store/CSS dependencies.
- Search for every use of a helper, token, class, storage key, id or prop before changing it.
- Identify whether the change is global, Rooms-only, Editorial-only, shared, content-only or state-related.
- For visual changes, identify the baseline and exact surface the user wants changed.

### While editing

- Prefer a small patch over replacing a whole file.
- Preserve unrelated code and comments that document historical constraints.
- Keep TypeScript types precise; do not use any to bypass a design problem.
- Do not suppress lint/build errors to get a green result.
- Do not add dependencies for functionality already available in the stack.
- Do not add scripts/files under ignored paths and assume they will be committed.
- Do not commit secrets, logs, generated build output or local environment files.
- Avoid parallel writes to the same file.
- If several files must change, write sequentially and use the latest file SHA each time.

### After editing

Run the strongest practical checks available:

    bun run lint
    bun run build

Then manually verify affected flows. A successful build does not prove that the design is correct or that a localStorage migration works.

For visual changes, test:

- all four themes: Light, Night/Dark, Dune and Classic;
- both interfaces: Rooms and Editorial;
- affected content types: paragraph, heading, table, worked example, callout, steps and figure as applicable;
- phone/tablet/desktop breakpoints;
- preference changes without refresh and after refresh;
- repeated theme/interface switching;
- drawers open and closed;
- reduced-motion behaviour.

Not every change requires every combination, but changes to shared tokens, global selectors, preference application or common chrome do. State exactly which combinations were tested.

### Reversibility

For risky visual or architectural changes, identify the last known-good commit, make a focused commit, avoid mixing unrelated refactors and preserve a straightforward revert path. Do not rewrite history or force-push unless explicitly authorised.

If asked to revert, restore the requested known-good state rather than layering another redesign on top.

---

## 20. Verification and reporting

Never claim something was tested, visually inspected, deployed or fixed unless that action actually happened.

Distinguish between:

- **Implemented:** source changes were committed.
- **Build-verified:** production build completed successfully.
- **Lint-verified:** lint completed successfully.
- **Visually inspected:** the actual rendered page was examined at the stated viewport/theme/interface.
- **Deployment-verified:** the deployed site was opened and checked after deployment.

A GitHub commit to main may trigger Vercel, but that alone does not prove successful deployment. Check deployment status/logs or the live site before saying it shipped.

When reporting a change, include the result, files/systems touched, commit identifier if committed, checks actually completed and known limitations/unverified areas. Keep the report concise and factual.

---

## 21. High-risk changes: stop and trace first

| Change | Why it is risky | Required care |
|---|---|---|
| Note prose/spec statement | Changes educational source material | Explicit approval; verify against source |
| Unit/topic/spec ids | Referenced by registries and saved data | Trace consumers; preserve compatibility |
| localStorage key/schema | Can make saved data inaccessible | Migration, sanitisation and cross-tab verification |
| Theme root classes/datasets | Affects every page and first paint | Update runtime + pre-paint + CSS |
| Interface selection | Can switch component trees | Keep twin props/data/actions equivalent |
| Global CSS tokens | Can alter unrelated surfaces | Search consumers; test both interfaces and all themes |
| Content scale engine | Can break drawers, fixed chrome and layout | Follow scale contract and measurement procedure |
| Spec-map anchor/scroll logic | Can break deep links and active section state | Reuse shared helper; test long jumps |
| FigureKind/SVG figures | Scientific meaning and labels can be damaged | Preserve identifiers; inspect diagrams |
| App shell/view state | Can break navigation and lazy loading | Preserve view contracts and loading boundaries |
| Font loading | Can break app build/render | Keep local font setup and weight ranges |
| Package/deployment config | Can break local preview or Vercel | Understand scripts and output model |

If a requested change requires altering one of these, first explain the impact and get approval where it changes a protected invariant.

---

## 22. Non-negotiable checklist

Before committing, confirm:

- [ ] Product remains IAL CHEM; no old public brand references reintroduced.
- [ ] Chemistry prose and official specification statements remain verbatim unless explicitly authorised.
- [ ] Unit/topic/spec identities and ordering remain stable.
- [ ] No user data or storage keys were silently reset, renamed or discarded.
- [ ] Rooms and Editorial still render the same underlying data and provide equivalent behaviour.
- [ ] Global theme remains independent of interface selection.
- [ ] CSS changes are scoped to the correct ownership boundary.
- [ ] Theme switching remains atomic and does not animate the whole document.
- [ ] Content scale does not use browser zoom or resize fixed chrome.
- [ ] Spec map, deep links and active-section tracking still work.
- [ ] Search derives from the registry and opens the correct destination.
- [ ] Figures remain scientifically correct and legible.
- [ ] No infinite ambient animation or unnecessary dependency was introduced.
- [ ] Responsive and keyboard interaction remain usable.
- [ ] Lint/build and relevant manual checks were completed and reported accurately.

---

## 23. Companion documentation

Read these documents alongside this handbook:

- **README.md** — product summary, stack and quick start.
- **DEVELOPMENT.md** — deeper implementation details, especially content, fonts, themes, scale engine, CSS behaviour and deployment/workspace quirks.
- **INTERFACES-ROADMAP.md** — Rooms/Editorial architecture, invariants, component twins and theme/interface separation.

If a change makes any of these documents inaccurate, update the relevant documentation in the same work. Do not leave future agents with contradictory instructions.

---

## 24. Final operating principle

IAL CHEM is an existing, carefully tuned educational product. Treat it as a system with established content, data contracts, visual decisions and compatibility obligations—not as a blank canvas.

**Preserve the source. Trace the system. Respect ownership boundaries. Change only what is needed. Verify the result. Document any new rule that future contributors must know.**


## Neutral reading-interface colour policy

Rooms and Editorial do not have independent accent palettes. Their unit identifiers, progress indicators, section markers, specification chips, callouts, tables and editorial clause markers use neutral theme tokens. Home retains its independent accent palette and the existing stored accent IDs remain in the preference schema for compatibility. The Customize palette must be described and previewed as a Home setting only.

Keep scientifically meaningful diagram colours intact. Verify Rooms and Editorial in Light, Night, Dune and Classic. Theme switching must remain atomic, and no global transition should be introduced.
