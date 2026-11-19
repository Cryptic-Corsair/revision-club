'use client';

import { Reveal, SectionHead, Meniscus } from './bits';
import { useLive } from './lib';
import { LumenFlask } from './Flask';

/* ═══════════════════════════════════════════════════════════════════════
   anatomy of a note — a miniature of the real reader clause (the same
   WCH12 6.2 material the daylight portal previews, verbatim), with
   callouts for what every clause carries; then dress the bench (the
   workspace's five real labs and two interfaces); then the closing
   panel with the flask in its cheer mood.
   ═══════════════════════════════════════════════════════════════════════ */

const CALLOUTS_L = [
  {
    c: '#FF6B6B',
    text: (
      <>
        <b>The statement, verbatim.</b> The official specification point leads every clause —
        the notes follow it, never the other way round.
      </>
    ),
  },
  {
    c: '#6fe8a3',
    text: (
      <>
        <b>Definitions built to quote.</b> Exam-ready wording, highlighted exactly where the
        marks look.
      </>
    ),
  },
];

const CALLOUTS_R = [
  {
    c: '#74d7ff',
    text: (
      <>
        <b>Equations with conditions.</b> Every formula carries its units, its state symbols
        and its caveats.
      </>
    ),
  },
  {
    c: '#ffc46b',
    text: (
      <>
        <b>Worked examples, every step.</b> Thirty across the course — no skipped lines, no
        magic numbers.
      </>
    ),
  },
  {
    c: '#b8a3ff',
    text: (
      <>
        <b>Figures that move.</b> Currents, curves, mechanisms — the physics animated, not
        just drawn.
      </>
    ),
  },
];

function Callout({ c, text }: { c: string; text: React.ReactNode }) {
  return (
    <div className="lum-callout">
      <span className="dot" style={{ ['--c' as string]: c }} />
      <p>{text}</p>
    </div>
  );
}

export function AnatomyBand() {
  return (
    <section id="inside" className="lum-sec">
      <div className="lum-wrap">
        <SectionHead
          dot="#6fe8a3"
          eyebrow="what's inside a note"
          title="One clause, anatomised."
          lead="Every clause of every note is built the same way. This is a real one — WCH12, Topic 6, the heart of energetics — shown the way the reader shows it."
        />
        <div className="lum-anatomy-grid">
          <div className="lum-callouts">
            {CALLOUTS_L.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Callout c={c.c} text={c.text} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.05}>
            <div className="lum-mock">
              <span className="lum-mock-tag">the reader, miniaturised</span>
              <span className="specno">6.2 · WCH12 · TOPIC 6</span>
              <h5>Exothermic and endothermic reactions</h5>
              <p className="statement">
                know that, by convention, exothermic reactions have a negative enthalpy change
                and endothermic reactions have a positive enthalpy change
              </p>
              <div className="def">
                <b>Exothermic reactions</b> — reactions which{' '}
                <mark>liberate heat energy</mark> to the surrounding. Enthalpy of reactants{' '}
                <b>&gt;</b> enthalpy of products. The sign on ΔH = <b>− ve</b>.
              </div>
              <div className="eq">Q = m × c × ΔT</div>
              <div className="worked">
                <span className="tick">✓</span> worked example · Δ<sub>c</sub>H of ethanol,
                all three steps
              </div>
            </div>
          </Reveal>
          <div className="lum-callouts right">
            {CALLOUTS_R.map((c, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <Callout c={c.c} text={c.text} />
              </Reveal>
            ))}
          </div>
        </div>
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
      <rect x="4" y="6" width="14" height="10" rx="3" stroke="rgba(242,238,250,0.7)" strokeWidth="2.2" fill="rgba(255,255,255,0.05)" />
      <rect x="22" y="6" width="14" height="10" rx="3" stroke="rgba(242,238,250,0.7)" strokeWidth="2.2" fill="rgba(255,255,255,0.05)" />
      <rect x="4" y="20" width="14" height="10" rx="3" stroke="rgba(242,238,250,0.7)" strokeWidth="2.2" fill="rgba(255,255,255,0.05)" />
      <rect x="22" y="20" width="14" height="10" rx="3" stroke="#6fe8a3" strokeWidth="2.2" fill="rgba(111,232,163,0.08)" />
    </svg>
  );
}

function IfaceDoc() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="24" height="32" rx="3" stroke="rgba(242,238,250,0.7)" strokeWidth="2.2" fill="rgba(255,255,255,0.05)" />
      <path d="M13 12 h10 M13 17 h14 M13 22 h12 M13 27 h8" stroke="rgba(242,238,250,0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 12 h4" stroke="#6fe8a3" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function DressBand() {
  const liveRef = useLive<HTMLElement>();
  return (
    <section ref={liveRef} className="lum-sec lum-band-dress">
      <Meniscus />
      <div className="lum-wrap">
        <SectionHead
          dot="#ff8fd6"
          eyebrow="dress the bench"
          title="Five labs. Two dresses."
          lead="The workspace keeps five full themes and two ways to read — the band-and-room gallery and the document editorial. Both render the same notes, the same packs, the same progress; pick in the panel, switch any time."
        />
        <div className="lum-dress-grid">
          {LABS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.06}>
              <div className="lum-labcard">
                <div className="lum-dots" aria-hidden="true">
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
        <div className="lum-ifaces">
          <Reveal delay={0.05}>
            <div className="lum-iface">
              <IfaceCards />
              <div>
                <b>Cards — the gallery</b>
                <span>the band-and-room walk, mascot and waves included</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="lum-iface">
              <IfaceDoc />
              <div>
                <b>Document — the editorial</b>
                <span>numbered clauses on handout sheets, built for study</span>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="lum-dress-note" delay={0.15}>
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
    <section ref={liveRef} className="lum-sec" style={{ paddingTop: 'clamp(30px, 4vw, 48px)' }}>
      <div className="lum-wrap">
        <Reveal className="lum-cta-panel">
          <svg className="lum-cta-deco" style={{ top: 30, left: '8%', ['--dl' as string]: '0s' }} width="22" height="22" viewBox="0 0 24 24" fill="#ff8fd6" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>
          <svg className="lum-cta-deco" style={{ top: 56, right: '9%', ['--dl' as string]: '1.2s' }} width="28" height="28" viewBox="0 0 24 24" fill="#74d7ff" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>
          <svg className="lum-cta-deco" style={{ bottom: 34, left: '14%', ['--dl' as string]: '2s' }} width="16" height="16" viewBox="0 0 24 24" fill="#6fe8a3" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>
          <svg className="lum-cta-deco" style={{ bottom: 26, right: '13%', ['--dl' as string]: '.5s' }} width="18" height="18" viewBox="0 0 24 24" fill="#b8a3ff" aria-hidden="true">
            <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
          </svg>

          <div className="lum-cta-flask">
            <LumenFlask idp="lumen-flask-cta" mood="cheer" />
          </div>
          <h2>The bench is open.</h2>
          <p className="lum-lead">
            Start where the course starts — Topic 1, formulae and the mole — or wander the
            specification index first. Either way, the flask will be here when you get back.
          </p>
          <div className="lum-cta-row" style={{ justifyContent: 'center' }}>
            <a className="lum-btn" href="/club?v=notes&doc=wch11-t01">
              Start reading Topic 1
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h14M13 6.5 18.5 12 13 17.5" />
              </svg>
            </a>
            <a className="lum-btn lum-btn-ghost" href="/club?v=spec">
              Open the spec index
            </a>
          </div>
          <p className="lum-cta-note">free · no account · your progress stays in your browser</p>
        </Reveal>
      </div>
    </section>
  );
}
