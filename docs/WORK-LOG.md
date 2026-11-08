# Work Journal

An append-only engineering journal for IAL CHEM. It records what humans and AI agents actually did, why they did it, what they deliberately left untouched, and how the result was verified.

This is an engineering record, not a marketing changelog. Be factual, concise and specific enough that a future contributor can understand the reasoning without reconstructing the entire conversation.

## Mandatory rule

Every meaningful work session that changes code, content, styling, architecture, configuration, documentation or repository structure **must append an entry**. Investigations that lead to an important decision or a deliberate no-change outcome should also be recorded when the finding will help future work.

- Add the entry in the same commit as the work whenever practical.
- If the work spans several commits, append one coherent entry when the task is complete and reference all relevant commits.
- Do not rewrite, delete or silently amend historical entries. Correct a mistake with a dated follow-up entry.
- Do not fabricate checks, screenshots, deployments, outcomes or reasons.
- If no tests were run, say so.
- Do not record secrets, tokens, personal data or sensitive user information.
- Do not log every trivial typo or automated formatting operation separately; group related work into one useful entry.
- Documentation-only work counts and must be journaled.

## Required entry format

Append newest entries at the bottom. Use this structure:

### YYYY-MM-DD — Short task title

- **Contributor:** human name/handle or AI agent identifier (use a neutral identifier if unknown).
- **Request / objective:** what was asked and the intended outcome.
- **Investigation:** relevant files, systems, dependencies or existing behaviour inspected.
- **Changes made:** concrete files and behaviours changed. Mention important implementation details.
- **Preserved invariants:** content, data, interfaces, compatibility or styling deliberately kept intact.
- **Decisions and rationale:** meaningful choices, rejected approaches and why.
- **Verification:** exact commands, build/lint results, manual checks, viewport/theme/interface combinations. State "not run" where applicable.
- **Deployment:** not attempted / triggered but unverified / verified, with evidence if verified.
- **Commit(s):** short and full SHA(s), or "not committed".
- **Follow-up / known limitations:** remaining work, risks or explicit "none known".

Not every heading needs a long paragraph, but keep every field. Write "Not applicable" where appropriate rather than silently omitting it.

## Journal integrity

The journal is chronological and append-only. A journal entry describes completed work, not proposed work. Distinguish observed facts from assumptions. Link to files and commits using repository-relative paths or full commit URLs when useful.

---

## Entries

### 2026-11-08 — Establish documentation handbook

- **Contributor:** AI agent.
- **Request / objective:** create a comprehensive guide that allows future humans and AI agents to understand the site, its protected material, architecture and safe working practices.
- **Investigation:** reviewed the repository README and the existing developer and interface documentation; inspected the application structure and established theme/interface boundaries.
- **Changes made:** created the Site Handbook at the repository root in commit `315740071cc1abb8c2651b65b7f392ae638b7b1c`; linked it from README in commit `bdea2690fcbfa323dd76788da994cf2676d61f66`.
- **Preserved invariants:** no application source, chemistry content, styling, runtime behaviour or user data changed.
- **Decisions and rationale:** established verbatim protection for chemistry source material, shared data across Rooms and Editorial, global theme ownership, storage compatibility and explicit verification/reporting rules.
- **Verification:** handbook and README were fetched back from GitHub and their contents confirmed. Lint/build and visual checks were not run because no application code changed.
- **Deployment:** not verified.
- **Commit(s):** `315740071cc1abb8c2651b65b7f392ae638b7b1c`, `bdea2690fcbfa323dd76788da994cf2676d61f66`.
- **Follow-up / known limitations:** move the repository guides into a dedicated documentation directory and establish a mandatory append-only work journal. The handbook describes source-code paths; moving the guides must not alter those application paths.

### 2026-11-08 — Organise repository documentation and establish work journal

- **Contributor:** AI agent.
- **Request / objective:** consolidate all repository guides in a dedicated folder and require humans and AI agents to document their work.
- **Investigation:** inspected the root repository listing, current README and documentation files; confirmed the latest main commit and tree before preparing a single structural commit.
- **Changes made:** moved the existing Site Handbook, Development Guide and Interface Roadmap into `docs/`; added a documentation index, this append-only journal and a root `AGENTS.md` discovery pointer; updated README links to the new locations.
- **Preserved invariants:** document contents are moved without rewriting their technical guidance; application code, chemistry source content, user data and runtime behaviour are untouched.
- **Decisions and rationale:** use `docs/` as the single home for guides and journals. Keep only a short root `AGENTS.md` pointer because coding agents commonly discover that filename automatically; it directs them into `docs/` rather than duplicating policy.
- **Verification:** repository file contents and current branch head were inspected before the structural change. Post-commit path verification is required. Lint/build and visual checks are not applicable to this documentation-only change and were not run.
- **Deployment:** not verified; no application code changed.
- **Commit(s):** see the commit that adds this journal entry in the repository history.
- **Follow-up / known limitations:** future meaningful work must append a completed entry to this journal. Keep the index and root README links current.


### 2026-11-08 — Verify documentation reorganisation

- **Contributor:** AI agent.
- **Request / objective:** complete post-commit verification of the documentation folder and journal setup.
- **Investigation:** fetched the repository root listing, the complete `docs/` directory listing and the structural commit details from GitHub.
- **Changes made:** no additional application or documentation content changes; this entry records verification of the preceding reorganisation.
- **Preserved invariants:** all three existing guides were moved with their original blob contents unchanged; application source, chemistry material, preferences and saved user data were not modified.
- **Decisions and rationale:** the root `AGENTS.md` remains a minimal discovery pointer so coding agents are directed to the central documentation folder before editing.
- **Verification:** confirmed `docs/DEVELOPMENT.md`, `docs/INTERFACES-ROADMAP.md`, `docs/SITE-HANDBOOK.md`, `docs/README.md` and `docs/WORK-LOG.md` exist on main; confirmed the three original root-level guide paths are absent; confirmed root `README.md` and `AGENTS.md` exist and link to the new documentation structure. Lint/build and visual checks were not run because only documentation and repository paths changed.
- **Deployment:** not verified; no application code changed.
- **Commit(s):** structural reorganisation: `d855e6010c644b7e1788301def68e874296660e5`. This verification entry is recorded in the following commit.
- **Follow-up / known limitations:** future contributors must continue appending journal entries for meaningful work. No known path-verification issues.


### 2026-11-08 — Restore pre-accent-reconstruction state

- **Contributor:** AI agent.
- **Request / objective:** return the repository to the state represented by commits `4e411de` and `d855e60`, immediately before the accent reconstruction work.
- **Investigation:** confirmed `4e411de` is the documentation-verification commit directly following `d855e60`; used its exact Git tree as the restoration target.
- **Changes made:** restored the complete repository tree to `4e411de`, removing all subsequent accent-reconstruction and neutralisation changes. Recorded this rollback in the work journal.
- **Preserved invariants:** all source files, documentation, chemistry content, preferences and configuration match the requested pre-reconstruction snapshot, except for this journal entry.
- **Decisions and rationale:** used a new forward-moving restore commit rather than rewriting branch history. This preserves the intervening commits for audit while restoring their pre-change file state.
- **Verification:** confirmed the restored branch points to a commit using the exact tree from `4e411de`; no build, lint or visual checks were run.
- **Deployment:** not verified.
- **Commit(s):** restoration commit and journal entry follow.
- **Follow-up / known limitations:** none known.


### 2026-11-08 — Add paired accents to the Dune Rooms theme

- **Contributor:** AI agent.
- **Request / objective:** use warm cream (`#FDF6E3`) as one Dune accent and introduce a complementary second accent.
- **Investigation:** reviewed the theme preference store, Rooms accent helper and note renderer, Dune-specific CSS tokens, homepage accent helper and interface/theme documentation.
- **Changes made:** added a render-time active-lab accessor; Dune Rooms now alternates warm cream (`#FDF6E3`) with muted sea-glass (`#9DB9B0`) across its section details and shared specification chips. Set the Dune Rooms accent token to warm cream and added a secondary accent token. Kept the homepage's existing mineral treatment unchanged. Updated the interface roadmap and development guide.
- **Preserved invariants:** no chemistry content, specification wording, note ordering, identifiers, persistence keys, theme selection behaviour or Editorial styling was changed. The Dune chocolate surface palette remains intact; the new pair is scoped to Rooms.
- **Decisions and rationale:** selected muted sea-glass as a cool, low-chroma counterpoint to warm cream. It separates the two accent roles while sitting comfortably against the existing chocolate surfaces, without introducing a bright candy colour.
- **Verification:** fetched the changed source and documentation files back from GitHub and confirmed the two Dune accent values, active-lab accessor and homepage separation. Build, lint and browser/visual checks were not run.
- **Deployment:** not verified.
- **Commit(s):** implementation commits are recorded immediately before this journal entry in the main branch history.
- **Follow-up / known limitations:** visually inspect Dune Rooms, including section markers, callouts and Spec Map chips, at desktop and mobile widths; confirm contrast and balance in the rendered page.


### 2026-11-08 — Align Dune callouts with the paired accent palette

- **Contributor:** AI agent.
- **Request / objective:** ensure Dune Rooms callouts use the new two-colour accent system rather than retaining the previous amber detail.
- **Investigation:** audited remaining Dune-specific accent values in the Rooms stylesheet after the paired accents were introduced.
- **Changes made:** replaced the legacy amber callout wash and border with tints derived from the muted sea-glass secondary accent.
- **Preserved invariants:** Dune surfaces, note content, other themes, homepage styling and Editorial styling remain unchanged.
- **Decisions and rationale:** callouts now reinforce the secondary accent, keeping Dune's note details within the warm-cream / sea-glass pair.
- **Verification:** confirmed the old amber callout values were replaced in the source fetched from GitHub. Build, lint and browser/visual checks were not run.
- **Deployment:** not verified.
- **Commit(s):** stylesheet change immediately precedes this journal entry in main.
- **Follow-up / known limitations:** visual inspection remains outstanding.


### 2026-11-08 — Refine the Rooms reading flow

- **Contributor:** AI agent.
- **Request / objective:** enhance the Rooms interface with a more restrained, coherent visual hierarchy.
- **Investigation:** reviewed the Rooms unit, topic and note readers, their shared topic-block renderer, the Rooms accent helper, Dune contrast tokens and the interface design contract.
- **Changes made:** unified unit/topic/note-reader accents around the Rooms mineral accent outside Dune; retained Dune's warm-cream primary and cream/sea-glass note-detail pair; replaced the topic's full-colour revision-note panel and forward-navigation fills with paper surfaces and restrained accent details; simplified reading progress to a single accent; derived foreground text on accent-filled controls with `readableInk()`. Increased specification-section heading size to create a clearer step between section titles, subheadings and body copy.
- **Preserved invariants:** chemistry source files, specification statements, figures, block order, topic/unit registries, saved progress, preference schemas and storage keys were not changed. Editorial and the homepage were not modified.
- **Decisions and rationale:** Rooms keeps its own band-and-room composition, but uses a quieter accent and secondary-action system so the learning flow has clearer hierarchy without copying Editorial's layout.
- **Verification:** fetched the updated source files from GitHub after each write and checked the relevant accent, foreground-contrast and action styles. Build, lint and browser/visual checks were not run.
- **Deployment:** not verified.
- **Commit(s):** implementation commits: `94616cde`, `d3e8fb1`, `ae9a5b6`, `904d965`, `b6e4257`, `69d3b11`, `3d8b78d`, `3e39e53`, `a8ff334`, `282d273`, `fb67f46`. Roadmap documentation commits: `02988ce388336095ac1452031bea9a086728c84c`.
- **Follow-up / known limitations:** run lint and the production build; visually inspect Rooms in all four themes at desktop and mobile sizes, with particular attention to Dune contrast and wrapping. Deployment remains unverified.

- **Documentation follow-up:** updated the roadmap's Dune callout accent description and added the specification-heading hierarchy change. Roadmap commit: `4006f941f17950e42b4f6d10c0187b2bb5f184e3`.


### 2026-11-08 — Rebuild the Rooms interface as a field atlas

- **Contributor:** AI agent.
- **Request / objective:** rebuild the Rooms presentation with full visual freedom while preserving the wave structures between every specification section.
- **Investigation:** inspected the current Rooms unit, topic, notes, shared section renderer, revision pack, progress and spec-index components; reviewed the theme token system, existing wave helper and interface ownership rules. Created `backup/rooms-before-rebuild-2026-11-08` at the starting main commit before implementation.
- **Changes made:** introduced a scoped Rooms field-atlas design system in `globals.css`; established shared page foundations and dedicated treatments for unit/topic headers, topic rows, revision-note links, progress cards, note contents, specification banners/statements, chemistry block types, tables, worked examples, figures, revision packs, the spec index and progress dashboard. Added Rooms-specific structural classes to the corresponding components. Reworked note block accent details to use the current Rooms accent rather than an unrelated purple.
- **Preserved invariants:** kept the `BandWave` component, wave paths and section sequencing in both `NotesReader` and `PackView`. Both still have the leading transition and a wave after every mapped specification section, including the final transition back to the page surface. No chemistry content, official specification text, equations, figure data, section order, identifiers, registries, storage keys, progress state or preference schema was changed. Editorial, homepage and shared navigation chrome were not edited.
- **Decisions and rationale:** the new Rooms direction is a scientific field atlas rather than a playful sticker interface or a copy of Editorial: mineral accents, disciplined display typography, compact technical metadata, quieter controls, structured reading surfaces and theme-aware contrast. Existing room-band backgrounds and waves remain the defining spatial structure.
- **Verification:** fetched the changed source files back from GitHub; confirmed page classes exist across all targeted Rooms surfaces, CSS braces balance, and the note reader still maps each specification section followed by a `BandWave`. Confirmed `bands.tsx` and its wave paths are unchanged. Build, lint and browser/visual checks were not run in this environment.
- **Deployment:** GitHub changes were committed on `main`; Vercel deployment status requires confirmation. No successful deployment is claimed.
- **Commit(s):** component and styling commits: `61fa87e3`, `65485362`, `e16cd37f`, `8c5d3ec9`, `3a08dd0e`, `1ca7bac4`, `306a35e8`, `13d0318f`, `8e764247`, `5765321f`, `2dca85d7`, `f923e16f`, `99642174`, `e90167b9`. Documentation commits: handbook `859824c8`; roadmap `70f5afa8`.
- **Follow-up / known limitations:** perform TypeScript/ESLint/production-build checks and visually inspect each Rooms surface in Light, Night, Dune and Classic at desktop and mobile sizes. Pay particular attention to long tables, figure frames, Dune accent contrast, content-scale behaviour and the visible wave joins. Check that Editorial and homepage remain visually unchanged. Deployment remains unverified.


### 2026-11-08 — Finalize Rooms mobile spacing and ownership documentation

- **Contributor:** AI agent.
- **Request / objective:** complete responsive refinements discovered during source-level review of the Rooms field-atlas rebuild.
- **Changes made:** removed the redundant mobile page-shell inset, added the progress introduction to the shared no-mascot/no-tail header treatment, and updated the Site Handbook and Interface Roadmap to recognise both `.rooms-page` and `.note-rooms` as explicit Rooms styling scopes.
- **Preserved invariants:** no chemistry content, wave components, wave paths or section sequencing changed. Editorial and homepage styling remain outside the new scope.
- **Verification:** fetched the affected source and documentation back from GitHub. Browser and build checks were not run.
- **Deployment:** not verified.
- **Commit(s):** progress component `5283e65f`; CSS `a5931dd6`; handbook `a02d1d7cd86e2a7e3416ed2a2e2b360686308df7`; roadmap `c78a5c91693b375c078793915b65eaab4fccbfcb`.
- **Follow-up / known limitations:** desktop/mobile visual inspection and all four theme checks remain outstanding.


### 2026-11-08 — Refine and unify the Rooms field-atlas system

- **Contributor:** AI agent.
- **Request / objective:** continue the Rooms rebuild with a consistency and finish pass across progress, revision packs, the specification index and shared reading surfaces.
- **Changes made:** introduced a paired primary/secondary Rooms accent contract with theme-specific readable foregrounds; retained Dune warm cream `#FDF6E3` and sea-glass `#9DB9B0`, and adjusted Classic's mineral primary for readable white-on-accent contrast. Reworked progress stat pillars, weekly goal controls, progress fills, pack metadata, selected/read controls, toolbar states, empty/completed pack states and spec-index actions to use the shared pair. Added semantic class hooks to replace brittle positional selectors in the pack and progress layouts; tightened the progress stats into a compact three-column mobile layout. Corrected the Rooms callout accent token and added an optional `className` prop to `SectionTag` so the progress tag can be scoped without affecting other callers.
- **Preserved invariants:** chemistry source text, official specification statements, equations, figures, section order, IDs, navigation, revision state, storage keys and preference schemas remain unchanged. The `BandWave` helper and paths were not edited; the note reader and pack each retain their leading transition and one wave after every mapped section. Editorial and homepage components remain untouched.
- **Verification:** re-fetched all changed source files; confirmed JSX hook classes, the corrected stat markup, balanced CSS braces, and two `BandWave` call sites in each reader. Confirmed `bands.tsx` is unchanged. The latest Vercel status reports a build-rate-limit failure (the linked status target explicitly identifies the account build-rate limit), so it did not provide a successful compile/build result. No browser/visual inspection was available.
- **Deployment:** no successful deployment is claimed; Vercel is currently blocked by its build-rate limit.
- **Commit(s):** refinement commits include `c227f17a`, `631e3eda`, `f7f4ee6b`, `b67e4edb`, `5daf9ae1`, `71c634a3`, `c8763cfc`, `2986fb80`, `58bd8f95`, `4f0b0d61`, `3676d915`, `0ee652a0`, `f62d96ba`, `109763b4`, and `e480a374`.
- **Follow-up / known limitations:** rerun TypeScript/ESLint/production build when Vercel's build quota permits; visually inspect desktop/mobile in Light, Night, Dune and Classic, especially the three-column progress stats, long pack toolbars, figure/table widths, contrast and wave joins.
