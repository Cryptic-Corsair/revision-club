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


### 2026-11-08 — Refine Dune Rooms and expose the deployed build version

- **Contributor:** AI agent.
- **Request / objective:** improve the Dune palette specifically within Rooms; display the build version at the end of the site footer and include it in implementation chat reports going forward.
- **Investigation:** inspected the Dune-specific Rooms token block, the shared footer, Next.js configuration and the existing work journal.
- **Changes made:** tuned Dune Rooms toward a more legible sandstone-and-chocolate balance: brighter brass primary accent, clearer sea-glass secondary accent, slightly more distinct section grounds, lifted paper surfaces and stronger callout definition. Added a build-version value sourced from Vercel's commit SHA (or GitHub Actions SHA), shortened to seven characters in the footer; local builds display `local`.
- **Preserved invariants:** changes are scoped to Dune note Rooms; other theme palettes, homepage styling, chemistry content, wave structures, note ordering, progress state and preference storage are untouched.
- **Decisions and rationale:** brass provides a visible warm accent without returning to an orange-heavy palette; sea-glass remains a secondary cue. The footer reports the actual source revision rather than a manually maintained release label.
- **Verification:** source edits were prepared against the current main branch and are committed together. No lint, production build, deployment or browser visual inspection was run.
- **Deployment:** not verified.
- **Commit(s):** see the implementation commit containing this entry.
- **Follow-up / known limitations:** verify the Vercel build injects `VERCEL_GIT_COMMIT_SHA` and inspect Dune Rooms at desktop and mobile widths. The footer uses `local` outside Vercel/GitHub Actions.

### 2026-11-09 — Simplify footer build label

- **Contributor:** AI agent.
- **Request / objective:** make the displayed build version simpler.
- **Changes made:** removed the redundant word “build” from the footer suffix; the existing seven-character commit identifier and its source remain unchanged.
- **Preserved invariants:** build identification remains tied to the deployed source commit; no theme, layout, or build configuration changes.
- **Verification:** confirmed the exact previous footer label before editing. No lint, production build, deployment or browser visual inspection was run.
- **Deployment:** not verified.
- **Commit(s):** see the implementation commit containing this entry.

### 2026-11-09 — Refine and collapse the Editorial contents rail

- **Contributor:** AI agent.
- **Request / objective:** prevent long specification titles from overflowing the Editorial contents sidebar and add a ChatGPT-style expand/collapse control.
- **Changes made:** made the contents rail width-aware, allowed long titles to wrap within the expanded rail, and added a compact collapsed state that retains only specification numbers. Added an accessible toggle with descriptive labels and hover titles for number-only links. The rail keeps its horizontal mobile presentation while the desktop uses a two-column reading layout.
- **Preserved invariants:** section order, anchors, active-section tracking, Spec Map registration, note text, theme styling and the note body content are unchanged.
- **Verification:** inspected the existing Editorial note layout and exact contents markup before editing. No lint, production build, deployment or browser visual inspection was run.
- **Deployment:** not verified.
- **Commit(s):** see the implementation commit containing this entry.
- **Responsive follow-up:** kept the two-column rail layout desktop-only and removed the links’ intrinsic max-content minimum width, which was the source of the original horizontal overflow. On narrow screens, the contents remain in their existing horizontal strip.

### 2026-11-09 — Rebuild the Editorial contents rail as a wayfinder

- **Contributor:** AI agent.
- **Request / objective:** rebuild the Editorial note contents section to be better, more convenient and refined — after the user's own earlier attempts (rail collapse refinements, later reverted redesign experiments) landed at the 47b5b72 state.
- **Investigation:** read the current `notes-editorial.tsx` rail, the shared `legal-index` styling (also used by the legal, topic and progress rails), `scroll-helpers.ts` (verified hops and the rect-based scroll spy), the lab-scoped `--legal-rust` token system, the SITE-HANDBOOK interface-scope rules, and the diff of the user's reverted redesign commits (`637e4c1`..`b59d92c`) to avoid repeating rejected ideas (a boxed card panel with animated column transitions).
- **Changes made:** rebuilt the rail in `notes-editorial.tsx` with a new scoped `etoc-*` class system in `globals.css`. Added: a live reading-position counter (`3/11`) in the header; a hairline progress track under the header whose rust fill follows the scroll spy; a clearly inked active clause (rust left bar, rust number, quiet wash) on desktop; a collapsed state that still orients (the active spec number rusted solid, others as a number spine, tooltips kept); smooth scrolling of the active link into view inside the rail's own scroller via scrollTop/scrollLeft math (never the page); remembered expansion posture under the new `editorial-contents-expanded` localStorage key (deliberately outside the prefs schema — purely presentational, guarded with try/catch); a refined mobile chip rail (single-line truncated pills, rust fill for the active chip, hidden scrollbar, 36 px touch height, overscroll containment); a self-scrolling desktop nav (`max-height: calc(100dvh - 14rem)`, thin scrollbar, `overscroll-behavior: contain`) so a long note can never push the rail's tail off-screen while sticky; `aria-controls`/`id` wiring and `aria-current="location"`; a smooth `grid-template-columns` transition on collapse/expand; shortened the footnote. Titles clamp to two lines on desktop with tabular-numeral spec numbers on a fixed min-width so titles align.
- **Preserved invariants:** section order and all anchors; `scrollToSpec` verified hops; `useSpecSpy` and Spec Map registration untouched; note content, pack ticks and progress state untouched; the shared `.legal-index` / `.legal-index-link` rails on the legal, topic and progress pages untouched (new `etoc-*` names only); Rooms interface untouched; no separate copy of domain data.
- **Decisions and rationale:** the user's reverted redesign was rejected for its boxed-card look, so the rebuild keeps the flat document aesthetic and earns "better" through wayfinding (position counter, track, rusted active states) rather than a new container. Collapsed-state orientation and posture memory were the biggest convenience wins; the scroll-position indicator deliberately duplicates the top progress bar because it answers "which clause am I on" rather than "how far through the note". Mobile chips stay non-sticky since the navbar Spec Map is the always-available navigator and a second sticky strip would crowd small screens.
- **Verification:** `bunx tsc --noEmit` clean; `bunx eslint` on the touched component clean. Dev-server walkthrough with agent-browser: Editorial dune note at 1440 px — counter 1/11, track 9%, active 1.1 with rust bar; after jumping to 1.12 — counter 3/11, track 27%, active rusted; collapse — 56 px spine with solid active square (screenshot reviewed), `aria-expanded="false"`, titles hidden; reload — posture persisted (`editorial-contents-expanded=collapsed`), re-expand OK. 390 px — no page horizontal scroll, chip rail scrolls with hidden scrollbar, active chip auto-scrolled into view, chip height 36 px. Labs light, classic, dark on the Editorial note — all clean, `aria-current="location"`, no horizontal scroll. Rooms dune note — 12 wave seams, mascot present, zero `etoc-*` leakage, no horizontal scroll. `agent-browser errors` silent throughout. A stale Turbopack CSS chunk initially served old chip padding; cleared `.next` and restarted — resolved, not a code issue.
- **Deployment:** not attempted.
- **Commit(s):** see the implementation commit containing this entry.
- **Follow-up / known limitations:** spec numbers in the rail follow the note's teaching order (e.g. 1.1, 1.3, 1.12, 1.4 …) by design; if a strictly ascending spec order is ever wanted it is a content-level change, not a rail change. The counter treats the visible clause as read up to its start; it does not measure partial-paragraph progress.

### 2026-11-09 — Polish the contents wayfinder

- **Contributor:** AI agent.
- **Request / objective:** polish the rebuilt Editorial contents rail's UI so it feels premium (follow-up to the wayfinder rebuild earlier the same day); push to GitHub explicitly not required — the user deleted the token.
- **Investigation:** re-read the wayfinder's `etoc-*` rules and the component's spy/cursor effects; confirmed `--edge` is a per-lab token and that Tailwind preflight's `border-box` and flex layout interact with an absolutely-placed indicator.
- **Changes made:** `notes-editorial.tsx` — replaced the per-link active bar with a single sliding cursor (`<span class="etoc-cursor">`, positioned in a `useLayoutEffect` from the laid-out active link's `offsetTop`/`offsetHeight`, re-placed on resize and once fonts settle); zero-padded counter (`04/11`, current clause rusted). `globals.css` — the cursor glides on a 300 ms rust-ease (desktop expanded only, hidden collapsed/mobile); the expanded active link wears a directional rust gradient wash instead of a flat block; the track's fill now carries a small rust bead with a paper-clearing ring riding its edge; the header meta grows an engraved hairline rule out to the toggle; collapsed active square gains an edge line plus a 16 % rust halo so it reads as a bead; mobile active chip gains a soft lift shadow; hover tints any link's number toward rust; the desktop rail's scrollbar reveals itself only on hover; press feedback (`scale` on `:active`) for links and toggle; reduced-motion list extended.
- **Preserved invariants:** same functionality as the rebuild (spy, verified hops, posture memory, self-scrolling rail, keep-in-view); shared `.legal-index` rails untouched; Rooms untouched; no new dependencies.
- **Decisions and rationale:** a single gliding cursor reads as more considered than per-link bars appearing/disappearing, and it removes the bar/row double-render; the bead turns the bare progress line into an instrument; hover-gated scrollbar keeps the spine quiet until reached for. Fixed en route: the cursor initially rendered as a static flex child (stealing a 34 px row above the links) — now `position: absolute`.
- **Verification:** `bunx tsc --noEmit` and `bunx eslint` clean. agent-browser walkthrough: cursor aligned with the active link at load (translateY 3 px, h 32 px) and after jumps (1.4 → aligned true); bead, header rule and zero-padded counter confirmed live; collapsed halo present, cursor hidden; mobile chips 36 px with titles (33 px collapsed — number-only rows), active chip shadow present, no page horizontal scroll; labs classic, dark, dune all cursor-visible and aligned with no horizontal scroll; Rooms note — 12 waves, mascot, no `etoc-*` leakage; `agent-browser errors` silent. Two stale Turbopack CSS chunks required `.next` clears (dev-cache only, no code issue).
- **Deployment:** not attempted (per user: token deleted; push not required).
- **Commit(s):** see the implementation commit containing this entry.
- **Follow-up / known limitations:** none known.
