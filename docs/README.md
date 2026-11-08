# Documentation

All project documentation, operating guides, architecture notes and engineering journals live in this directory.

## Start here

1. [Site Handbook](SITE-HANDBOOK.md) — required orientation for every human contributor and AI agent. Product invariants, protected content, architecture, design ownership, persistence, safe changes and verification.
2. [Development Guide](DEVELOPMENT.md) — practical implementation details, toolchain, content model, themes, scale engine and deployment quirks.
3. [Interface Roadmap](INTERFACES-ROADMAP.md) — Rooms and Editorial design boundaries, component twins and interface evolution.
4. [Work Journal](WORK-LOG.md) — append-only record of meaningful implementation work, investigations, decisions and verification.

## Directory rules

- Put guides, architecture documents, policies, technical references and journals here.
- Keep the root README concise: product summary, quick start and links into this directory.
- Do not scatter new Markdown guides across the repository root.
- Root-level `AGENTS.md` is an intentional exception: it is a short discovery pointer so AI coding agents find the rules before editing. The full documentation remains here.
- Keep application source and user-facing site content in their existing source locations. This directory is for repository/development documentation, not chemistry note content displayed by the site.

## Documentation maintenance

When implementation changes invalidate a documented fact, update the relevant guide in the same task. Avoid duplicating detailed rules across multiple files; link to the owning document instead.

Every meaningful task must append an entry to [WORK-LOG.md](WORK-LOG.md). See its entry format and requirements. Do not rewrite or delete historical entries to make the journal look cleaner.
