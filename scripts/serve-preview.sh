#!/usr/bin/env bash
# One-command preview recovery (DEVELOPMENT.md §10; worklog 47).
# Frees :3000, rebuilds only when source is newer than the build
# stamp, starts the production standalone server detached, then
# health-checks the home page and a deep reader path before reporting.
cd "$(dirname "$0")/.."

# 1 · free the port
pkill -f "next/standalone/server.js" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 1

# 2 · rebuild only when needed
NEWEST_SRC=$(find src app public package.json -newer .next/BUILD_ID 2>/dev/null | head -1)
if [ ! -f .next/BUILD_ID ] || [ -n "$NEWEST_SRC" ]; then
  echo "building (source newer than build)…"
  bun run build || { echo "BUILD FAILED"; tail -20 server.log 2>/dev/null; exit 1; }
fi

# 3 · start detached
NODE_ENV=production bun .next/standalone/server.js > server.log 2>&1 &

# 4 · health gates
for i in $(seq 1 60); do
  curl -sf localhost:3000/club >/dev/null 2>&1 && break
  sleep 1
done
curl -sf localhost:3000/club >/dev/null 2>&1 || { echo "home FAILED"; tail -5 server.log; exit 1; }
curl -sf localhost:3000/club/notes/wch11-t01 >/dev/null 2>&1 || { echo "reader FAILED"; tail -5 server.log; exit 1; }
echo "preview live → http://localhost:3000/club  (home 200, reader 200; log: server.log)"
