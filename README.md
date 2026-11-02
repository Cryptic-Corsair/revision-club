# Reaction Club

Revision notes for the **Pearson Edexcel International A Level Chemistry (2018)** specification — WCH11–WCH16. Read topic-by-topic notes with worked figures, checkpoint questions, flashcards, progress stickers and full-text search.

> Not affiliated with or endorsed by Pearson Education Ltd.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** components
- **Prisma** ORM (local SQLite) for progress tracking
- **Framer Motion** for animations

## Getting started

```bash
# install dependencies
bun install        # or: npm install

# run the dev server → http://localhost:3000
bun run dev        # or: npm run dev

# production build & serve
bun run build && bun run start
```

Database (progress tracking):

```bash
npm run db:push      # sync Prisma schema
npm run db:generate  # regenerate the Prisma client
```

## Project structure

```
src/
  app/                # Next.js app router entry
  components/
    club/             # feature components (notes reader, figures,
                      #   flashcards, search, sticker book, footer …)
    ui/               # shadcn/ui primitives
prisma/               # schema for progress storage
scripts/              # dev/QA utilities (screenshot + audit tooling)
```

## Features

- **Units & topics** — the full WCH11–WCH16 specification split into readable topics
- **Notes reader** — sticky spec rail, contents chips, marker-pen highlights (`==term==`), hand-drawn SVG figures
- **Checkpoints & flashcards** — shuffled self-test questions per topic
- **Progress stickers** — track which topics you have revised
- **Search** — ⌘K full-text search across all notes
- **Light / dark / hybrid themes**
