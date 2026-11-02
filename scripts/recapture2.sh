#!/bin/bash
# Robust re-capture v2: JS clicks in IIFEs, content-verified steps.
# Usage: recapture2.sh <theme> <prefix>
set -u
THEME=$1; P=$2; SS=/tmp/render
shot() { agent-browser screenshot "$SS/$P-$1.png" >/dev/null; }
waitfor() { # waitfor <js-expr>
  for i in $(seq 1 20); do
    r=$(agent-browser eval "$1" 2>/dev/null)
    [[ "$r" == "true" ]] && return 0
    sleep 0.5
  done
  echo "TIMEOUT: $1" >&2
  return 1
}
jclick() { # jclick <matcher-js> — click in page, IIFE-safe
  agent-browser eval "(()=>{const b=$1; b?b.click():0; return b?'ok':'nf'})()" >/dev/null
}

agent-browser eval "localStorage.setItem('rc-theme','$THEME'); 'ok'" >/dev/null
agent-browser open http://localhost:3000 >/dev/null
waitfor "!!document.querySelector('h1')"
sleep 0.5; agent-browser eval "window.scrollTo(0,0,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.5
shot home-hero
agent-browser eval "document.querySelectorAll('h2')[0]?.scrollIntoView({behavior:'instant',block:'start'}); 'ok'" >/dev/null; sleep 0.7; shot home-units
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.7; shot home-tail

# unit WCH11
jclick "[...document.querySelectorAll('button')].find(b=>(b.getAttribute('aria-label')||'').startsWith('Open WCH11'))"
waitfor "(()=>{const h=document.querySelector('main h1'); return !!h && !h.textContent.includes('spec point')})()"
sleep 0.7; shot unit-top
agent-browser eval "window.scrollTo(0,document.body.scrollHeight*0.55,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.6; shot unit-mid
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.6; shot unit-tail

# topic 2 of WCH11 (hub)
agent-browser eval "window.scrollTo(0,0,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.4
jclick "[...document.querySelectorAll('button')].find(b=>/^Open (Topic )?2[\.:]/.test(b.getAttribute('aria-label')||''))"
waitfor "!!document.querySelector('nav[aria-label=\"Topic navigation\"]')"
sleep 0.7; shot topic-hub
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.6; shot topic-tail

# notes reader CTA
agent-browser eval "window.scrollTo(0,0,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.4
jclick "[...document.querySelectorAll('button,a')].find(b=>/full revision note/i.test(b.textContent))"
waitfor "!!document.querySelector('main button[aria-label=\"Back to the topic page\"]')"
sleep 1.2; shot notes-1
for f in 0.2 0.4 0.6 0.8 0.97; do
  agent-browser eval "window.scrollTo(0,document.body.scrollHeight*$f,{behavior:'instant'}); 'ok'" >/dev/null; sleep 2
  shot notes-$(echo $f | tr -d '.')
done
echo "=== errors: $THEME ==="; agent-browser errors 2>/dev/null | head -4
echo "RECAPTURE DONE $THEME"
