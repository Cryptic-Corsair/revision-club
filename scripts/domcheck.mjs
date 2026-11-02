// DOM fact-check for audit claims. Run with: node scripts/domcheck.mjs (page must be open in agent-browser)
// Uses agent-browser eval via child_process.
import { execSync } from "node:child_process";

const ev = (js) => {
  try {
    return execSync(`agent-browser eval '${js.replace(/'/g, "'\\''")}'`, { timeout: 30000 }).toString().trim();
  } catch (e) {
    return "ERR " + e.message.slice(0, 120);
  }
};

console.log("== 1. mark (highlight) clipping ==");
console.log(ev("(()=>{const m=document.querySelector('main mark'); if(!m)return 'no mark'; const r=m.getBoundingClientRect(); const cs=getComputedStyle(m); return 'rect.h='+Math.round(r.height)+' lineH='+cs.lineHeight+' fontSize='+cs.fontSize+' padding='+cs.padding+' display='+cs.display+' inlineSize='+cs.inlineSize})()"));

console.log("== 2. contents chip truncation ==");
console.log(ev("(()=>{const chips=[...document.querySelectorAll('main button')].filter(b=>b.querySelector('span.truncate')); const t=chips.filter(c=>c.querySelector('span.truncate').scrollWidth>c.querySelector('span.truncate').clientWidth); return chips.length+' chips, '+t.length+' truncated: '+t.map(c=>c.textContent.trim().slice(0,30)).join(' | ')})()"));

console.log("== 3. topic-hub contrast: body text colour vs bg ==");
console.log("NOTE: check on topic page separately");

console.log("== 4. sticky rail fade hint ==");
console.log(ev("(()=>{const r=document.querySelector('.no-scrollbar'); return r?('rail exists, clientW='+r.clientWidth+' scrollW='+r.scrollWidth):'none'})()"));

console.log("== 5. note block left bars (ionisation) ==");
console.log(ev("(()=>{const b=[...document.querySelectorAll('main div')].filter(d=>d.style.borderLeft&&d.style.borderLeft.includes('px solid')); return b.length+' blocks; first='+b[0]?.style.borderLeft+' bg='+b[0]?.style.background+' borderRadius from class='+b[0]?.className.slice(0,60)})()"));

console.log("== 6. figure containers ==");
console.log(ev("(()=>{const f=[...document.querySelectorAll('main svg')]; return f.length+' svgs; parents: '+f.slice(0,3).map(s=>(s.parentElement.className||'').toString().slice(0,70)).join(' || ')})()"));
