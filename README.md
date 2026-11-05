# Reaction Club

Revision notes for the **Pearson Edexcel International A Level Chemistry (2018)** specification — WCH11–WCH16. Topic-by-topic notes with hand-drawn SVG figures, checkpoint questions, flashcards, revision packs, progress stickers and full-text search.

> Not affiliated with or endorsed by Pearson Education Ltd.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (tokens in `src/app/globals.css` `@theme`)
- **Framer Motion** for animations
- **No backend** — the whole app is client-side; progress, packs and
  preferences live in the browser's `localStorage`. Content is
  type-checked TypeScript under `src/lib/spectra/content/`.

## Getting started

```bash
bun install          # or: npm install

bun run dev          # dev server → http://localhost:3000
bun run build        # production build (also emits .next/standalone)
bun run start        # serve the standalone build
bun run lint         # eslint
```

Requires **Bun** (or Node 20+ with npm — swap `bun` for `npm`/`npx`).

## Deploying to Vercel

Zero-config beyond this repo:

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo — the Next.js
   framework is detected automatically (`vercel.json` pins it).
3. Deploy. No environment variables are needed; the build command is
   `next build` (the `cp` steps in `package.json`'s `build` script serve
   the sandbox's container deploy and never run on Vercel).

## Project structure

```
src/
  app/                  # one route: the club (client-side app) + layout
  components/club/      # all features: notes reader, SVG figures, packs,
                        #   search, sticker book, customize panel, themes
  lib/spectra/          # content + data model
    content/            # the notes themselves, one file per topic part
    notes.ts            # registry: topics → spec sections → content
    prefs.ts            # theme/accent/font preferences (localStorage)
public/                 # favicon, logo, robots.txt
```

Notes content is written against the 2018 spec, kept verbatim from the
source text, and marked up with a small inline syntax (`==highlight==`).

## Themes

Four labs, switchable in-app (theme button or customize panel):

- **Light** — the daylight cream look
- **Night** — violet-ink charcoal; rotates one of four night moods per day
- **Dune** — the chocolate room: deep cocoa grounds, sand inks, warm lamp
- **Classic** *(default)* — daylight page with sections stepping between
  deep espresso `#2c2013` and warm cream `#fdf6e3`

Six accent colours rotate through the sections; the customize panel
narrows the wheel, swaps fonts, zoom and motion.
