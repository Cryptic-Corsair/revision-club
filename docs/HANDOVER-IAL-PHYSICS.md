# HANDOVER — the IAL PHYSICS fork

**Written:** 2026-11-21, at `main` @ `d232fcf` (clean tree).
**For:** the next agent chat that will clone this site, remove chemistry, rebrand to physics, and carry the development forward.
**From:** the chat that built the WPH11 physics notes with the owner (Topic 2 shipped in the approved register; Topic 1 still awaits the same treatment).

This document exists because the next chat starts with zero memory of this one. It carries the mission, the working relationship, the exact technical state, the decisions already made (so they are not re-litigated), and the traps already stepped in (so they are not stepped in again). Read it **after** the standard orientation, in this order:

1. Root `AGENTS.md` (discovery pointer)
2. `docs/README.md`
3. `docs/SITE-HANDBOOK.md` — all of it; the workflow and invariants carry over to the fork
4. `docs/DEVELOPMENT.md`
5. `docs/INTERFACES-ROADMAP.md`
6. `docs/WORK-LOG.md` — read the physics entries at the bottom (2026-11-20/21); they record how the register was reached
7. This handover
8. `research/wph11/approved-draft-wph11-t02.md` — the owner-approved draft, the canonical style specimen
9. `research/wph11/approved-draft-analysis.md` — its companion evidence file

---

## 1 · The mission, in the owner's own framing

The owner is splitting the site in two. This repository (revision-club) stays the chemistry home. A **new, separate project** gets a clone of this codebase with chemistry removed and physics as the whole product:

1. Clone this repository into the new project.
2. Remove the chemistry content and rebrand to **IAL PHYSICS**.
3. Rebuild **WPH11 Unit 1, Topic 1 (Mechanics)** in the approved register (Topic 2 is already done — it is your style reference).
4. Later: add Units 2–6 (WPH12–WPH16), one unit at a time, research-first, same register.

The owner's words for the standard they expect: *"I want to feel just like in this chat in the new chat. I really don't want to mess up."* That means: same care, same honesty about verification, same register, same journal discipline — carried across the fork boundary.

## 2 · What exists for physics right now (exact state)

Everything below is committed and verified at `d232fcf`:

| Surface | File(s) | State |
| --- | --- | --- |
| Unit code registered | `src/lib/spectra/types.ts` (`WPH11` in `UnitCode`), `units.ts`, `prefs.ts` | done |
| Notes docs registry | `src/lib/spectra/notes.ts` — `wph11-t01`, `wph11-t02` docs | t02 intro rewritten for the new register |
| Topic list + landing previews | `src/lib/spectra/content/wph11.ts` | previews still describe the research style (deliberately untouched) |
| **Topic 1 (Mechanics)** | `notes-ph01-a.ts`, `notes-ph01-b.ts`, `notes-ph01-c.ts` | **OLD register** — "source-note teaching style": worked examples, session citations, "If the question were asked differently" notes. This is what the owner moved away from. It is the rebuild target. |
| **Topic 2 (Materials)** | `notes-ph02-a.ts`, `notes-ph02-b.ts` | **NEW register** ✓ — statements 23–32, formula-first, built this week and approved |
| Physics figures | `notes-figures-physics.tsx` — 10 hand-drawn SVGs (`ph-motion-graphs`, `ph-projectile`, `ph-vectors`, `ph-freebody`, `ph-terminal`, `ph-moments`, `ph-force-extension`, `ph-stress-strain`, `ph-falling-ball`, `ph-young-rig`) | wired into all three renderers |
| Meta mirror | `notes-meta.ts` | mirrors doc-level fields only; ids unchanged → no regen needed |
| Research corpus | `research/wph11/` — digests A–D (tracked), agent analyses 1–5 (tracked), `kinetics-style.txt` (tracked), raw Pearson PDFs + extractions (untracked by design) | basis of every physics claim |

Chemistry is the rest of the content surface: `notes-p01…p09`, `notes-t01…t10-*`, `wch11…wch16.ts`, `notes-figures.tsx` (chemistry figures), plus chemistry copy in `home.tsx`, `legal.tsx`, `dashboard.tsx`, `search.tsx`, `spec-map.tsx`, `sample-blocks.tsx`, pack/deck registries and metadata. The handbook's protected-chemistry rule applies to the **original** repo; in the fork, the owner's explicit instruction authorizes removal.

## 3 · The style contract — the physics register

This is the heart of the handover. The owner reviewed a draft, rejected v1, and approved v2 with one clarifying message: *"<>= symbols are fine. Problem was using arrows. But anyways, this is good so let's rebuild topic 2 of physics unit 1 now. Take time and be careful."* The six standing requirements:

1. **Formula first.** The named equation is stated first, then every line after it is explained in a sentence. On the site this is the `eq` block: the formula in the band, the unpacking sentence in its italic `note`.
2. **Mark-scheme-wise.** One bullet = one sentence that could earn a mark. The accepted wording first. Conditions, units, "deduce" habits are taught as marking behaviour.
3. **Symbols in the sentences.** Write =, ×, <, > inside prose — never "equals", "times", "greater than". The owner's clarification: `= < >` symbols are fine.
4. **Elaborate.** Scenarios get their own headed groups (a Cartesian diver, a submarine lifted by a crane, a sphere sinking into colder, deeper water…), built up one logical step per bullet, cause before effect. Nothing is "left as an exercise".
5. **No arrows.** Never write → in notes prose. Spell the direction out in words ("the drag on it grows", "the resultant force acts upwards"). This was the owner's one hard complaint about v1.
6. **No citations in the notes; perfect formula formatting.** No "January 2024 Q15" inside the notes themselves — the evidence trail lives in the companion research file. Formulas must render properly: in markdown drafts, KaTeX between dollar signs; **on the site, the decision already made is the native system** (see below) — do not re-open it unless the owner asks.

Additional standing conventions, all visible in `notes-ph02-a/b.ts`:

- Defined terms are `def` cards; "Not accepted" rejections are `note` blocks with `label: "Not accepted"`; marker highlights `==…==` are rationed to a handful per section.
- Formulas in running text are **bold**, in parentheses after the sentence where the formula genuinely helps: "(**U = W**)".
- Subscripts via `~sub~`, superscripts via `^sup^`, unicode Greek (ρ, η, σ, ε, Δ, π), unicode ² ³ ½, `−` for minus. Units stay unicode (`kg m⁻³`).
- The note closes with "The marking rules that never change" at the end of the **last** section (doc `outro` is walked for anchors but never rendered — do not use it).
- Force ownership everywhere: "the upthrust **on the sphere**", "the weight **of the sphere**", "the drag **upwards**".

**The no-KaTeX-on-site decision (recorded, do not silently reverse):** the site's own formula system (Fmt real sub/superscripts, unicode Greek, bold, equation chips) renders every WPH11 formula faithfully in the house design; KaTeX would add a foreign font stack to the shared formatter for a physics-only need. If the owner ever wants true typeset math, that is a platform feature to scope deliberately — not a content-port shortcut.

**Research discipline:** every physics claim traces to the WPH11/01 papers, mark schemes and Principal Examiners' reports, 2019–2025 (plus 01A papers; 2026 sessions as extra evidence). The digests and analyses in `research/wph11/` are the record. For new topics, do the same research pass first, then write.

## 4 · The clone plan, phase by phase

**Phase A — orientation and baseline (before any change).** Read everything in §0's order. `bun install`, `bun run build` (must be green before you touch anything), `bun run lint` (expect exactly one pre-existing error, see §6), `bash scripts/serve-preview.sh`, open `/club` in a browser. Confirm the site works before stripping.

**Phase B — the new repository.** Confirm with the owner: repo name (suggested `ial-physics`), public or private, and whether deployment moves now or later. The owner will paste a GitHub token in chat when a push is needed (see §7 for token handling). Create the repo, push the cloned baseline, and only then start stripping.

**Phase C — strip chemistry, surface by surface.** One coherent commit per surface, build between commits:

1. Content: delete `notes-p*.ts`, `notes-t*.ts`, `wch11…16.ts` and their imports in `notes.ts`; remove their doc entries, units and topic lists (`units.ts`, `wch*.ts` topic lists, `notes-meta.ts` — regenerate it with its gen script after).
2. Chemistry figures: `notes-figures.tsx` imports/case arms in all three renderers (`note-section.tsx`, `gallery-section.tsx`, `sample-blocks.tsx`).
3. Chemistry packs/decks/spec-map/search entries and chemistry copy in `home.tsx`, `legal.tsx`, `dashboard.tsx`, `sample-blocks.tsx`, metadata.
4. Keep intact: the app shell, prefs/theme/interface systems, deck and registry mechanics, all physics content and figures, storage keys (see Phase D).

**Phase D — rebrand.** Public name **IAL PHYSICS** (confirm the exact wording with the owner before committing copy). Update metadata, legal page, home hero/bands, OG images (`make-og-image.mjs`), sitemap, robots, README. **Do NOT rename the browser storage keys** — the historical `reaction-club` strings are compatibility identifiers (handbook §2); renaming them makes saved preferences and progress vanish. This rule carries into the fork unchanged.

**Phase E — rebuild WPH11 Topic 1.** The old ph01 files are the content basis; the approved t02 files are the register. Work statement by statement (22 statements of Mechanics): research is already digested in `research/wph11/`; port each section to the style contract in §3, dropping worked examples and session citations, adding the eq-band-first structure, scenario groups and Not-accepted notes. Split across parts like t02 if the file gets long (t02 chose a/b at statements 23–26 / 27–32). Verify like t02: build, then DOM-level browser checks (see §6 for the `innerText` trap), then the honest journal entry.

**Phase F — Units 2–6 (WPH12–16).** Later, one unit at a time. Same loop: research pass first (papers, mark schemes, examiner reports into `research/`), draft in `download/` for owner review, revise on the owner's word, then port to content files and verify. The owner reviews drafts — expect corrections; implement exactly what they say.

**Deployment:** the fork's Vercel project is the owner's platform action (`vercel.json` exists; no env vars; `output: "standalone"` is deliberate). Do not deploy without the owner asking.

## 5 · Working with the owner — how this chat felt

- The owner is hands-on and precise. They review markdown drafts (delivered under `download/`, the only owner-visible directory) and reply with terse, exact corrections. Implement what they say, verbatim in spirit; when something is genuinely ambiguous, decide and **state the interpretation** in the reply — nobody can answer a clarifying question mid-task.
- "Take time and be careful" means: thoroughness over speed, full verification, honest reporting. The model report is the 2026-11-21 work-log entry for the Topic 2 rebuild — including its caveat paragraph.
- Never claim unverified work. Say what was checked and how, and what was not. The t02 verification was DOM-level because this sandbox's model cannot view images — say that plainly when it applies, and suggest the owner eyeball the live page.
- Every meaningful task appends a factual entry to `docs/WORK-LOG.md`, in the same commit where possible: investigation, decisions, files changed, preserved invariants, checks actually run, deployment status, commit, remaining limitations. Never rewrite history in the journal.
- Commits: descriptive, `feat(physics): …` style with an em-dash detail clause. The platform auto-creates bare-UUID checkpoint commits between turns — never imitate that style, and always make your own real commit for meaningful work.

## 6 · Traps already found (do not re-discover these)

1. **The docs' component map is stale.** There is no `notes-reader.tsx`. The real readers are `notes-gallery.tsx` (Cards/gallery interface) and `notes-editorial.tsx` (Document/editorial interface). Sections render through **three** dispatchers that must stay in sync: `note-section.tsx` (`SpecSectionView`, also used by packs), `gallery-section.tsx` (cards), `sample-blocks.tsx` (via `spec-section-editorial.tsx`, editorial). All three support every block kind: p, h, bullets, note, def, eq, table, worked, steps, figure, wow.
2. **`doc.outro` is walked for anchors but never rendered.** Doc-level closing content goes at the end of the last section (t01/t02 precedent).
3. **`content-visibility` hides offscreen sections from `innerText`.** Headless DOM checks must use `textContent`; scrolling near a section renders it. Also: the spec pill text is CSS-uppercased ("SPEC 24" in `innerText`).
4. **Lint has one pre-existing error** at handover: `src/components/lumen/lib.ts` (`react-hooks/refs`, "Cannot access refs during render"). Present at `d232fcf`, unrelated to physics work; fix it only if the owner asks.
5. **`minutes` fields are rough display estimates** (t01 58, t02 42→52). Scale them honestly when content grows; state the reasoning in the journal.
6. **`notes-meta.ts` mirrors doc-level fields only.** Changing section content needs no regen; changing doc ids/titles/kickers does (gen script in `scripts/`).
7. **bun is the package manager** (`bun.lock` is the source of truth; do not mix npm/yarn). Port 3000 matters. `scripts/serve-preview.sh` is the one-command production preview (rebuild-if-stale + health gates).
8. **Inline-markup tokens are the single shared system.** `**bold**`, `*em*`, `==highlight==`, `~sub~`, `^sup^` — rendered by `<Fmt/>` in `format.tsx`, plain-text twin `fmtPlain` for search/aria. Any new inline convention must go through Fmt or it will leak raw into some surface. There is no `$` in any existing content.
9. **The draft's KaTeX is draft-notation, not site-notation.** Port `$…$` formulas to the native markup per §3 (see `notes-ph02-a.ts` for dozens of worked examples of the conversion).
10. **Untracked-by-design:** `download/`, `upload/`, `scripts/`, `skills/`, raw `research/wph11/*.pdf` and text extractions. Scripts you write go in `scripts/` (persisted in the sandbox, not the repo) unless they are repo tooling.

## 7 · Tokens and secrets — non-negotiable handling

- The owner may paste a GitHub token in chat to enable pushes. **Never** print it back, write it to any file, commit it, or persist it in `.git/config` or `gh`'s stored auth. Use it one-shot (e.g. a push URL built in the same command, or an env var that dies with the shell), then it's gone.
- Recommend the owner keep tokens fine-grained (contents: read/write on the one repo; metadata: read) and rotate after the fork is set up, since it has passed through chat plaintext.
- The token shared in the handover chat itself was used exactly once — to push this handover document — and was not stored anywhere in the repo or sandbox.

## 8 · The kickoff, verbatim expectations

The owner will open the new chat with something like: *"clone the repository and import the entire site; we're separating chemistry and physics."* What they will expect from you, in order:

1. Read the orientation chain and this handover **before** touching anything.
2. Baseline: install, build, lint (known error acknowledged), preview, confirm green.
3. Ask nothing that §4 already answers; state your phase plan; start with the strip in coherent commits.
4. Keep the journal from the first task on — the fork inherits this discipline.
5. When the fork is stripped and rebranded and the baseline is green again, report, and the owner will steer Topic 1 next.

Good luck. The register is yours to guard: formula first, one mark per bullet, symbols in sentences, no arrows, scenarios built step by step, rejected wordings flagged, marking rules at the end. That is what "feels like this chat" means on the page.
