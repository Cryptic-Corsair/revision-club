'use client';

import { BlobDivider, Reveal, SectionHead } from './bits';
import { useLive } from './lib';
import { Bubbles } from './Mascot';

/* ═══════════════════════════════════════════════════════════════════════
   the periodic snack table — eight real elements as wobble tiles with
   true one-line facts; then dress the bench (the workspace's five real
   labs and two interfaces); then the closing panel with Bubbles in her
   cheer mood.
   ═══════════════════════════════════════════════════════════════════════ */

/* real tiles: Z, symbol, name, category colour, one true fact */
const SNACKS: Array<{ z: number; sym: string; nm: string; c: string; cat: string; fact: string }> = [
  { z: 1, sym: 'H', nm: 'Hydrogen', c: '#5BB4E8', cat: 'nonmetal', fact: 'the lightest of them all — 1 proton, no company' },
  { z: 2, sym: 'He', nm: 'Helium', c: '#9775FA', cat: 'noble gas', fact: 'floats balloons and squeaks voices' },
  { z: 3, sym: 'Li', nm: 'Lithium', c: '#FF922B', cat: 'alkali metal', fact: 'inside every phone battery you own' },
  { z: 6, sym: 'C', nm: 'Carbon', c: '#3D2B1F', cat: 'nonmetal', fact: 'diamond and pencil lead — same atoms, different moods' },
  { z: 7, sym: 'N', nm: 'Nitrogen', c: '#12B886', cat: 'nonmetal', fact: '78% of every breath you take' },
  { z: 8, sym: 'O', nm: 'Oxygen', c: '#FF6B6B', cat: 'nonmetal', fact: 'the one no candle can live without' },
  { z: 11, sym: 'Na', nm: 'Sodium', c: '#F59F00', cat: 'alkali metal', fact: 'goes fzz, dramatically, in water' },
  { z: 10, sym: 'Ne', nm: 'Neon', c: '#F06595', cat: 'noble gas', fact: 'glows orange-red in every shop sign' },
];

export function SnackBand() {
  const liveRef = useLive<HTMLElement>();
  return (
    <section id="snack" ref={liveRef} className="cd-sec cd-band-snack">
      <BlobDivider kind="bubble" at="top" color="var(--cd-rose-soft)" />
      <div className="cd-wrap">
        <SectionHead
          dot="var(--cd-green)"
          eyebrow="the periodic snack table"
          title="Eight elements, no homework."
          lead="A little taster platter from the table itself — hover them, they wobble. Every fact is the real thing; the full periodic story lives in Topic 2 of the notes."
        />
        <div className="cd-snacks">
          {SNACKS.map((s, i) => (
            <Reveal key={s.sym} delay={i * 0.05}>
              <div className="cd-snack" style={{ ['--cc' as string]: s.c }} tabIndex={0}>
                <div className="cd-snack-top">
                  <span>{s.z}</span>
                  <span>{s.cat}</span>
                </div>
                <div className="sym">{s.sym}</div>
                <div className="nm">{s.nm}</div>
                <div className="fact">{s.fact}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="cd-snacknote" delay={0.2}>
          hover a tile — it wobbles; the notes' own periodic table lives in Topic 2
        </Reveal>
      </div>
    </section>
  );
}

/* ————— dress the bench ————— */

/* the workspace's five real labs, in their own token values */
const LABS = [
  { name: 'Light', sub: 'daylight cream', dots: ['#FFF6EA', '#FFFDF7', '#ff6b6b'] },
  { name: 'Night', sub: 'plum dusk', dots: ['#17131d', '#30263d', '#f5eff7'] },
  { name: 'Dune', sub: 'chocolate', dots: ['#1e1b16', '#2e2820', '#f6f0e6'] },
  { name: 'Classic', sub: 'espresso', dots: ['#2c2013', '#4a3c2b', '#fff6ea'] },
  { name: 'Pistachio', sub: 'the orchard', dots: ['#e9eddb', '#f2f5e3', '#262c10'] },
];

function IfaceCards() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="14" height="10" rx="3" stroke="rgba(61, 43, 31, 0.7)" strokeWidth="2.2" fill="rgba(255, 198, 75, 0.14)" />
      <rect x="22" y="6" width="14" height="10" rx="3" stroke="rgba(61, 43, 31, 0.7)" strokeWidth="2.2" fill="rgba(91, 180, 232, 0.14)" />
      <rect x="4" y="20" width="14" height="10" rx="3" stroke="rgba(61, 43, 31, 0.7)" strokeWidth="2.2" fill="rgba(18, 184, 134, 0.12)" />
      <rect x="22" y="20" width="14" height="10" rx="3" stroke="#12B886" strokeWidth="2.2" fill="rgba(18, 184, 134, 0.16)" />
    </svg>
  );
}

function IfaceDoc() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="24" height="32" rx="3" stroke="rgba(61, 43, 31, 0.7)" strokeWidth="2.2" fill="rgba(255, 198, 75, 0.1)" />
      <path d="M13 12 h10 M13 17 h14 M13 22 h12 M13 27 h8" stroke="rgba(61, 43, 31, 0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 12 h4" stroke="#FF6B6B" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function DressBand() {
  const liveRef = useLive<HTMLElement>();
  return (
    <section ref={liveRef} className="cd-sec cd-band-dress">
      <BlobDivider kind="melt" at="top" color="var(--cd-cream)" />
      <div className="cd-wrap">
        <SectionHead
          dot="var(--cd-violet)"
          eyebrow="dress the bench"
          title="Five labs. Two dresses."
          lead="The workspace keeps five full themes and two ways to read — the band-and-room gallery and the document editorial. Both render the same notes, the same packs, the same progress; pick in the panel, switch any time."
        />
        <div className="cd-dress-grid">
          {LABS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.06}>
              <div className="cd-labcard">
                <div className="cd-dots" aria-hidden="true">
                  {l.dots.map((d, j) => (
                    <span key={j} style={{ background: d }} />
                  ))}
                </div>
                <div className="nm">{l.name}</div>
                <div className="sub">{l.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="cd-ifaces">
          <Reveal delay={0.05}>
            <div className="cd-iface">
              <IfaceCards />
              <div>
                <b>Cards — the gallery</b>
                <span>the band-and-room walk, mascot and waves included</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="cd-iface">
              <IfaceDoc />
              <div>
                <b>Document — the editorial</b>
                <span>numbered clauses on handout sheets, built for study</span>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="cd-dress-note" delay={0.15}>
          one product, one set of study records — the dress changes, the chemistry doesn’t
        </Reveal>
      </div>
    </section>
  );
}

/* ————— the closing panel ————— */

export function CtaBand() {
  const liveRef = useLive<HTMLElement>();
  return (
    <section ref={liveRef} className="cd-sec" style={{ paddingTop: 'clamp(28px, 4vw, 44px)' }}>
      <div className="cd-wrap">
        <Reveal className="cd-cta-panel">
          <svg className="cd-cta-deco" style={{ top: 34, left: '8%', ['--dl' as string]: '0s' }} width="24" height="24" viewBox="0 0 24 24" fill="#FF6B6B" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>
          <svg className="cd-cta-deco" style={{ top: 60, right: '9%', ['--dl' as string]: '1.2s' }} width="30" height="30" viewBox="0 0 24 24" fill="#5BB4E8" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>
          <svg className="cd-cta-deco" style={{ bottom: 36, left: '15%', ['--dl' as string]: '2s' }} width="17" height="17" viewBox="0 0 24 24" fill="#12B886" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>
          <svg className="cd-cta-deco" style={{ bottom: 28, right: '14%', ['--dl' as string]: '.5s' }} width="19" height="19" viewBox="0 0 24 24" fill="#FFC64B" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>

          <div className="cd-cta-flask">
            <Bubbles idp="cd-bubbles-cta" mood="cheer" />
          </div>
          <h2>The lab is open. Come fizz.</h2>
          <p className="cd-lead">
            Start where the course starts — Topic 1, formulae and the mole — or wander the
            specification index first. Either way, Bubbles will be here when you get back.
          </p>
          <div className="cd-cta-row" style={{ justifyContent: 'center' }}>
            <a className="cd-btn cd-btn-coral" href="/club?v=notes&doc=wch11-t01">
              Start reading Topic 1
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h14M13 6.5 18.5 12 13 17.5" />
              </svg>
            </a>
            <a className="cd-btn cd-btn-ghost" href="/club?v=spec">
              Open the spec index
            </a>
          </div>
          <p className="cd-cta-note">free · no account · your progress stays in your browser</p>
        </Reveal>
      </div>
    </section>
  );
}
