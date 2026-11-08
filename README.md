# IAL CHEM

Revision notes for the **Pearson Edexcel International A Level Chemistry (2018)** specification — WCH11–WCH16. Topic-by-topic notes with hand-drawn SVG figures, checkpoint questions, flashcards, revision packs, progress stickers and full-text search.

> Not affiliated with or endorsed by Pearson Education Ltd.

## Documentation

- **[SITE-HANDBOOK.md](docs/SITE-HANDBOOK.md)** — the comprehensive guide for human developers and AI agents. Covers protected content, architecture, themes, interfaces, persistence, design rules, safe workflows and verification.
- **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** — detailed implementation and development guide.
- **[INTERFACES-ROADMAP.md](docs/INTERFACES-ROADMAP.md)** — Rooms and Editorial architecture and design boundaries.

Read [the Site Handbook](docs/SITE-HANDBOOK.md) before making changes. All repository guides and the append-only work journal are in [docs/](docs/README.md).

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (tokens in `src/app/globals.css` `@theme`)
- **Framer Motion** for animations
- **No backend** — the whole app is client-side; progress, packs and preferences live in the browser's `localStorage`. Content is type-checked TypeScript under `src/lib/spectra/content/`.

## Getting started

```bash
bun install
bun run dev          # dev server → http://localhost:3000
bun run build        # production build (also emits .next/standalone)
bun run start        # serve the standalone build
bun run lint         # eslint
```

Requires **Bun** (or Node 20+ with npm).

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, import the repository — Next.js is detected automatically (`vercel.json` pins it).
3. Deploy. No environment variables are required.

## Project structure

```
src/
  app/                  # app entry, layout, global styling
  components/club/      # app shell, interfaces, notes, figures, packs, search and settings
  lib/spectra/          # content, registries, preferences and study-state stores
    content/            # unit topic lists and chemistry notes
public/                 # static assets
```

Notes content is written against the 2018 specification, kept verbatim from the approved source text, and marked up with a small inline syntax (`==highlight==`).

## Themes and interfaces

Four global themes are available: **Light**, **Night**, **Dune** and **Classic**. The site also has two presentation interfaces: **Rooms** and **Editorial**. Theme and interface are independent preferences; the active theme applies globally while each interface has its own presentation system. See the Site Handbook and Interface Roadmap for the rules governing them.
