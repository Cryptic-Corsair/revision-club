#!/bin/bash
# Stage 2: blend + sticker + search (continues from wherever the browser is)
set -u
P=$1
SS=/tmp/render
shot() { agent-browser screenshot "$SS/$P-$1.png" >/dev/null; }

# reset to home
agent-browser eval "document.querySelector('[aria-label=\"Reaction Club — home\"]').click(); 'ok'" >/dev/null
agent-browser wait 1 >/dev/null
# flashcards
agent-browser eval "document.querySelector('[aria-label=\"Open flashcards\"]').click(); 'ok'" >/dev/null
agent-browser wait 1.5 >/dev/null
shot blend-1
agent-browser eval "
  const b=[...document.querySelectorAll('button')].find(x=>/start|deal|shuffle|begin/i.test(x.textContent));
  b?b.click():'nostart'" >/dev/null
agent-browser wait 1 >/dev/null
shot blend-2
agent-browser eval "
  const c=document.querySelector('[class*=perspective]');
  c?c.click():'noclick'" >/dev/null
agent-browser wait 0.8 >/dev/null
shot blend-3
echo "=== errors after blend ==="; agent-browser errors
# sticker book
agent-browser eval "document.querySelector('[aria-label=\"Open your progress\"]').click(); 'ok'" >/dev/null
agent-browser wait 1 >/dev/null
shot sticker-1
agent-browser eval "window.scrollTo(0,document.body.scrollHeight,{behavior:'instant'}); 'ok'" >/dev/null
agent-browser wait 0.5 >/dev/null
shot sticker-2
# search
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
echo "=== final errors ==="; agent-browser errors
echo "DONE stage2"
