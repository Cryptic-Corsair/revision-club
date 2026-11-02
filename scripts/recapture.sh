#!/bin/bash
# Robust re-capture: waits for real content before shooting.
# Usage: recapture.sh <theme> <prefix>
set -u
THEME=$1; P=$2; SS=/tmp/render
shot() { agent-browser screenshot "$SS/$P-$1.png" >/dev/null; }
# poll until eval expr is truthy (max ~8s)
waitfor() { # until <js-expr>
  for i in $(seq 1 16); do
    r=$(agent-browser eval "$1" 2>/dev/null)
    [[ "$r" == "true" ]] && return 0
    sleep 0.5
  done
  echo "TIMEOUT waiting: $1" >&2
  return 1
}

agent-browser eval "localStorage.setItem('rc-theme','$THEME'); 'ok'" >/dev/null
agent-browser open http://localhost:3000 >/dev/null
waitfor "!!document.querySelector('h1')"
agent-browser eval "window.scrollTo(0,0,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.8
shot home-hero
agent-browser eval "document.querySelectorAll('h2')[0]?.scrollIntoView({behavior:'instant',block:'start'}); 'ok'" >/dev/null; sleep 0.8; shot home-units
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.8; shot home-tail

# unit page
agent-browser find role button name "Open WCH11 — Structure, Bonding and Introduction to Organic Chemistry" click >/dev/null 2>&1
waitfor "!!document.querySelector('button[aria-label^=\"Open 1.\"]')"
sleep 0.6; shot unit-top
agent-browser eval "window.scrollTo(0,document.body.scrollHeight*0.55,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.6; shot unit-mid
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.6; shot unit-tail

# topic hub: click topic 2 card
agent-browser eval 'const b=[...document.querySelectorAll("button")].find(x=>(x.getAttribute("aria-label")||"").startsWith("Open 2.")); b?(b.click(),"ok"):"nf"' >/dev/null
waitfor "!!document.querySelector('nav[aria-label=\"Topic navigation\"]')"
sleep 0.6; shot topic-hub
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.6; shot topic-tail

# notes reader: find the CTA into notes
agent-browser eval "const b=[...document.querySelectorAll('button,a')].find(b=>/read/i.test(b.textContent)&&b.closest('main')&&b.textContent.length<50); b?(b.click(),'ok'):'nf'"
waitfor "!!document.querySelector('main h1') && !document.querySelector('nav[aria-label=\"Topic navigation\"]')"
sleep 1; shot notes-1
for f in 0.2 0.4 0.6 0.8 0.97; do
  agent-browser eval "window.scrollTo(0,document.body.scrollHeight*$f,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.7
  shot notes-$(echo $f | tr -d '.')
done
echo "=== errors: $THEME notes ==="; agent-browser errors 2>/dev/null | head -4
echo "RECAPTURE-A DONE $THEME"
