# Instructions for coding agents

Before inspecting or changing this repository, read:

1. [docs/README.md](docs/README.md)
2. [docs/SITE-HANDBOOK.md](docs/SITE-HANDBOOK.md)
3. The relevant specialist guide in `docs/`.
4. [docs/HANDOVER-IAL-PHYSICS.md](docs/HANDOVER-IAL-PHYSICS.md) — if your task involves the physics fork (cloning this site into the physics project, stripping chemistry, rebranding, or continuing WPH11 development), read it before planning. It carries the mission, the approved physics register and the traps already found.

The handbook defines protected chemistry content, architecture and design boundaries, persistence compatibility, safe implementation workflow and verification expectations.

**Journal requirement:** every meaningful code, content, styling, architecture, configuration or documentation task must append a factual entry to [docs/WORK-LOG.md](docs/WORK-LOG.md), preferably in the same commit. Record investigation, decisions, files changed, preserved invariants, checks actually run, deployment status, commit SHA and remaining limitations. Never invent verification or rewrite historical entries.

Keep repository guides inside `docs/`. This root file is only the agent-discovery pointer.
