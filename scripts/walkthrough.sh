#!/bin/bash
# Site walkthrough — captures every view × theme for audit.
# Usage: walkthrough.sh <theme: light|dark|hybrid> <prefix>
set -u
THEME=$1
P=$2
SS=/tmp/render

shot() { agent-browser screenshot "$SS/$P-$1.png" >/dev/null; }

# 0. reset theme via localStorage + reload (theme init script reads it)
agent-browser eval "localStorage.setItem('rc-theme','$THEME'); 'ok'" >/dev/null
agent-browser open http://localhost:3000 >/dev/null
agent-browser wait 2 >/dev/null
agent-browser eval "window.scrollTo(0,0,{behavior:'instant'}); document.documentElement.className" >/dev/null

# 1. home hero
shot home-hero
# 2. home units grid
agent-browser eval "document.querySelectorAll('h2')[0]?.scrollIntoView({behavior:'instant',block:'start'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot home-units
# 3. home how-it-works + CTA
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot home-tail
# 4. unit page WCH11
agent-browser find role button name "Open WCH11 — Structure, Bonding and Introduction to Organic Chemistry" click >/dev/null 2>&1 || agent-browser click "text=WCH11" >/dev/null 2>&1
agent-browser wait 1 >/dev/null
shot unit-top
agent-browser eval "window.scrollTo(0,document.body.scrollHeight*0.55,{behavior:'instant'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot unit-mid
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot unit-tail
echo "=== errors after unit ==="
agent-browser errors
# 5. topic hub (Topic 2 of WCH11)
agent-browser eval "
  const btns=[...document.querySelectorAll('button')];
  const t2=btns.find(b=>/topic|2\./i.test(b.textContent)&&/2/.test(b.textContent)&&b.closest('main'));
  t2?t2.click():'notfound'" >/dev/null
agent-browser wait 1 >/dev/null
shot topic-hub
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot topic-tail
# 6. notes reader — click the read-notes CTA on topic hub
agent-browser eval "
  const btns=[...document.querySelectorAll('button,a')];
  const read=btns.find(b=>/read the notes|open notes|start reading|read/i.test(b.textContent)&&b.closest('main')&&b.textContent.length<40);
  read?read.click():'notfound'" >/dev/null
agent-browser wait 2 >/dev/null
shot notes-1
# scroll through note sections
for f in 0.15 0.35 0.55 0.75 0.95; do
  agent-browser eval "window.scrollTo(0,document.body.scrollHeight*$f,{behavior:'instant'}); 'ok'" >/dev/null
  agent-browser wait 0.4 >/dev/null
  shot notes-$(echo $f | tr -d '.')
done
echo "=== errors after notes ==="
agent-browser errors
# 7. back home, open flashcards (blend)
agent-browser eval "document.querySelector('[aria-label=\"Reaction Club — home\"]').click(); 'ok'" >/dev/null
agent-browser wait 1 >/dev/null
agent-browser eval "document.querySelector('[aria-label=\"Open flashcards\"]').click(); 'ok'" >/dev/null
agent-browser wait 1.5 >/dev/null
shot blend-1
# start a run if there's a start button
agent-browser eval "
  const b=[...document.querySelectorAll('button')].find(x=>/start|deal|shuffle|begin/i.test(x.textContent));
  b?b.click():'nostart'" >/dev/null
agent-browser wait 1 >/dev/null
shot blend-2
# flip the card
agent-browser eval "
  const c=document.querySelector('[style*=perspective], [class*=perspective]');
  c?c.click():'noclick'" >/dev/null
agent-browser wait 0.8 >/dev/null
shot blend-3
echo "=== errors after blend ==="
agent-browser errors
# 8. sticker book (progress)
agent-browser eval "document.querySelector('[aria-label=\"Open your progress\"]').click(); 'ok'" >/dev/null
agent-browser wait 1 >/dev/null
shot sticker-1
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot sticker-2
# 9. search palette
agent-browser eval "document.querySelector('[aria-label=\"Search topics\"]').click(); 'ok'" >/dev/null
agent-browser wait 0.8 >/dev/null
shot search-empty
agent-browser eval "
  const i=document.querySelector('input[type=text],input:not([type])');
  if(i){i.focus();i.value='mole';i.dispatchEvent(new Event('input',{bubbles:true}))}
  'typed'" >/dev/null
agent-browser wait 0.8 >/dev/null
shot search-mole
agent-browser press Escape >/dev/null
echo "=== final errors ==="
agent-browser errors
echo "DONE $THEME"
