# HANDOFF — "Reaction Club" site (paste this into the new chat)

## 1. What this is
A revision-notes web app: **"Reaction Club"** — Pearson Edexcel International A Level
Chemistry (2018) spec, units WCH11–WCH16. Stack: Next.js (App Router) + React +
TypeScript + Tailwind CSS + shadcn/ui + Prisma (SQLite) + Framer Motion.
Package manager: **bun** (bun.lock present; npm scripts also work).

## 2. Source of truth
GitHub repo **Cryptic-Corsair/revision-club** (public): https://github.com/Cryptic-Corsair/revision-club
Branch `main`, tip commit `d0ea239`, full history pushed 2026-11-02.

## 3. Import steps (sandbox path: /home/z/my-project)
- If `/home/z/my-project` already contains the project (package.json, src/) → it is
  already imported; run `bun install` if node_modules is missing, then start dev.
- If empty → `git clone https://github.com/Cryptic-Corsair/revision-club /home/z/my-project`
- Then: `cd /home/z/my-project && bun install && npx prisma generate && npm run dev`
  → http://localhost:3000 (dev script tees to dev.log).
- Verify import: `curl -s -o /dev/null -w "%{http_code}" localhost:3000` → 200,
  and the footer shows **"· rev 3 · Nov 2026"**.

## 4. State of the code at handoff
- `main` @ `d0ea239`, working tree clean, everything committed and pushed.
- Two full revision passes DONE and verified (3 themes: light/dark/hybrid × all
  views × desktop+mobile, zero console errors):
  - Pass 2 (`e0c69de`): `mark` highlight padding 0.06em→0.14em; contents chips
    clamp to 2 full lines (was 10/18 ellipsised); spec-rail scroll edge fades;
    FigIeGraph SVG rebuilt (no label collisions); ink-faint contrast lifted
    (light #947d69, dark #b29272).
  - Pass 3 (`0d0a986`): footer build tag "rev 3 · Nov 2026".

## 5. Architecture map
- `src/components/club/club-app.tsx` — app shell + views (home / unit / topic /
  flashcards / sticker book / search), footer, nav pill.
- `src/components/club/notes-reader.tsx` — notes reader: contents chips, sticky
  spec rail, `==term==` marker-pen highlights.
- `src/components/club/notes-figures.tsx` — hand-drawn-style SVG figures (incl. FigIE).
- `src/app/globals.css` — themes (light/dark/hybrid), highlight & fade styles.
- `prisma/` — schema for progress storage; `scripts/` — QA tooling
  (screenshot + VLM audit). Do NOT re-run the full 3-theme VLM audit unless asked
  (expensive and rate-limited; if needed run serially via `scripts/vlm-seq.sh`).

## 6. Platform quirks
- Sandbox processes do NOT survive between messages — restart the dev server each
  session; files under /home/z/my-project persist.
- The preview URL (*.space-z.ai) may fail to load because of a CDN certificate
  issue on the platform side (edge serving a wrong *.z.ai cert). If the user says
  the preview is blank/black, the CODE is not at fault: check localhost:3000
  directly and advise "Restart session" (top-right) or retry later.

## 7. Security / tokens (important)
- 3 GitHub fine-grained PATs were pasted in the previous chat — they are EXPOSED.
  The user was asked to revoke all of them. Never reuse any token from old chats.
- To push: ask the user for a fresh token (classic with `repo` scope, or
  fine-grained with "Contents: Read and write" on this repo — note "Public
  repositories (read-only)" access can never push).
- The local repo has NO git remote configured; add with:
  `git remote add origin https://github.com/Cryptic-Corsair/revision-club.git`

## 8. Commit conventions
Descriptive commit messages for real work. Commits named like a bare UUID
(e.g. `d495d81 f2ebf5ce-…`) are system auto-checkpoints — do not reproduce them;
keep the log clean.
