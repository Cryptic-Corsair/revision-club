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
