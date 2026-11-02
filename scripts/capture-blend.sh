#!/bin/bash
# Blend + sticker + search captures with verified interactions.
# Usage: capture-blend.sh <theme> <prefix>
set -u
THEME=$1; P=$2; SS=/tmp/render
shot() { agent-browser screenshot "$SS/$P-$1.png" >/dev/null; }
jclick() { agent-browser eval "(()=>{const b=$1; b?b.click():0; return b?'ok':'nf'})()"; }
waitfor() {
  for i in $(seq 1 20); do
    r=$(agent-browser eval "$1" 2>/dev/null)
    [[ "$r" == "true" ]] && return 0
    sleep 0.5
  done
  echo "TIMEOUT: $1" >&2; return 1
}

agent-browser eval "localStorage.setItem('rc-theme','$THEME'); 'ok'" >/dev/null
agent-browser open http://localhost:3000 >/dev/null
waitfor "!!document.querySelector('h1')"
jclick "document.querySelector('[aria-label=\"Open flashcards\"]')"
waitfor "!!document.querySelector('main h1')"
sleep 1.2; shot blend-1
# start default run
jclick "[...document.querySelectorAll('button')].find(b=>/^(Start|Deal|Shuffle)/i.test(b.textContent.trim()))"
waitfor "!!document.querySelector('[class*=perspective]')"
sleep 1.5; shot blend-2
# flip via the tap-to-flip button
jclick "[...document.querySelectorAll('button')].find(b=>/tap to flip/i.test(b.textContent))"
sleep 1.5; shot blend-3
# judge 'got it' then screenshot next card
jclick "[...document.querySelectorAll('button')].find(b=>/got it/i.test(b.textContent))"
sleep 1.5; shot blend-4
echo "=== blend errors $THEME ==="; agent-browser errors 2>/dev/null | head -3

# sticker book
jclick "document.querySelector('[aria-label=\"Reaction Club — home\"]')"
waitfor "(()=>{const h=document.querySelector('main h1'); return !!h&&/spec point/i.test(h.textContent)})()"
jclick "document.querySelector('[aria-label=\"Open your progress\"]')"
waitfor "(()=>{const h=document.querySelector('main h1'); return !!h&&!/spec point/i.test(h.textContent)})()"
sleep 1.2; shot sticker-1
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null; sleep 1.5; shot sticker-2
agent-browser eval "window.scrollTo(0,0,{behavior:'instant'}); 'ok'" >/dev/null; sleep 0.5

# search
jclick "document.querySelector('[aria-label=\"Search topics\"]')"
waitfor "!!document.querySelector('input')"
sleep 0.8; shot search-empty
agent-browser eval "(()=>{const i=document.querySelector('input'); i.focus(); i.value='mole'; i.dispatchEvent(new Event('input',{bubbles:true})); return 't'})()" >/dev/null
sleep 1; shot search-mole
agent-browser press Escape >/dev/null 2>&1
echo "DONE capture-blend $THEME"
