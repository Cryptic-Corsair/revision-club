#!/bin/bash
# Batch VLM audit of walkthrough screenshots.
# Usage: vlm-audit.sh <screenshot...>  → /tmp/render/audits/<name>.txt
set -u
mkdir -p /tmp/render/audits
PROMPT='You are a strict UI reviewer for "Reaction Club", an Edexcel IAL Chemistry revision site. Design language: playful candy colors, big rounded pill shapes, soft drop shadows, mascot, wavy section dividers, NO hard-edged bordered boxes, generous whitespace. Audit this screenshot and list ONLY real, visible flaws: (1) text clipped/overflowing/overlapping, (2) low contrast text, (3) misalignment or uneven spacing, (4) hard-edged boxes or borders that break the pill language, (5) broken images/icons, (6) awkward or crowded layout, (7) anything that looks unstyled or bugged. For each flaw give the location. If the screenshot looks clean, reply exactly "CLEAN". Max 200 words.'

audit() {
  local f=$1
  local name=$(basename "$f" .png)
  [ -s "/tmp/render/audits/$name.txt" ] && return 0
  z-ai vision -p "$PROMPT" -i "$f" -o "/tmp/render/audits/$name.json" >/dev/null 2>&1
  python3 -c "
import json,sys
try:
    d=json.load(open('/tmp/render/audits/$name.json'))
    print(d['choices'][0]['message']['content'])
except Exception as e:
    print('AUDIT_FAILED', e)
" > "/tmp/render/audits/$name.txt" 2>/dev/null
}

for f in "$@"; do audit "$f" & done
wait
echo "batch done: $*"
