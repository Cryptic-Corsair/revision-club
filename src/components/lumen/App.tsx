'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { FlaskMark } from '../portal/components/FlaskMark';
import { GLOBAL_METRICS } from '../portal/data/ialData';
import { UNITS } from '@/lib/spectra/units';
import { Reveal } from './bits';
import { HeroField, MotionBand } from './Scenes';
import { FlameBand, UnitsBand } from './Units';
import { ProtocolBand, ReadoutBand } from './Method';
import { TasteBand } from './Example';
import { AnatomyBand, CtaBand, DressBand } from './Features';
import { LumenFlask } from './Flask';
import { motionAllowed, useLive, useRotator } from './lib';

/* ═══════════════════════════════════════════════════════════════════════
   the luminous laboratory — IAL CHEM’s night front door.

   The page in one breath: a pill nav with a reaction-progress hairline;
   the hero (the drift field behind, the living flask beside, formula
   chips and quips orbiting it); the two-way formula marquee; the shelf
   of six units; the flame bench; three canvas machines; the scroll-
   drawn bench protocol; the instrument readout; a fully worked
   titration; the anatomy of a note; the five labs and two dresses; the
   closing panel; and the after-hours footer, where the flask sleeps.

   Exits are the same ?v= deep links the daylight door and twilight use;
   the front doors cross-link each other in the footer. Nothing here
   persists anything — the leaf is a showcase, the workspace does the
   remembering.
   ═══════════════════════════════════════════════════════════════════════ */

const NAV_LINKS: Array<[string, string]> = [
  ['The six units', '#units'],
  ['In motion', '#motion'],
  ['The method', '#method'],
  ['A taste', '#taste'],
];

const QUIPS = [
  'hi — I’m the reaction. nice bench, isn’t it.',
  'every mole gets counted here. twice.',
  'exothermic? that’s just chemistry for cosy.',
  'watch the curve — the endpoint’s a show.',
  'equilibrium: when both ways feel the same.',
  'I run on collisions and encouragement.',
];

const CHIPS: Array<{ t: ReactNode; style: CSSProperties; hide?: boolean }> = [
  { t: <>PV = nRT</>, style: { top: '-2%', left: '5%', ['--d' as string]: '6.2s', ['--r' as string]: '-3deg' } },
  { t: <>ΔG = ΔH − TΔS</>, style: { top: '23%', right: '-2%', ['--d' as string]: '7.4s', ['--r' as string]: '3deg' } },
  { t: <>n = m / M<sub>r</sub></>, style: { top: '45%', left: '-3%', ['--d' as string]: '5.8s', ['--r' as string]: '-2deg' } },
  { t: <>K<sub>c</sub></>, style: { top: '61%', right: '1%', ['--d' as string]: '6.6s', ['--r' as string]: '4deg' }, hide: true },
  { t: <>pH = −log[H<sup>+</sup>]</>, style: { bottom: '6%', left: '3%', ['--d' as string]: '7s', ['--r' as string]: '2deg' } },
  { t: <>1 mol = 6.02 × 10<sup>23</sup></>, style: { bottom: '-1%', right: '9%', ['--d' as string]: '6.4s', ['--r' as string]: '-2deg' }, hide: true },
];

const SPARKS: Array<{ style: CSSProperties; c: string; s: number }> = [
  { style: { top: '3%', left: '36%', ['--dl' as string]: '.6s' }, c: '#ffc46b', s: 24 },
  { style: { bottom: '12%', left: '14%', ['--dl' as string]: '1.4s' }, c: '#ff8fd6', s: 18 },
  { style: { top: '24%', right: '14%', ['--dl' as string]: '2s' }, c: '#74d7ff', s: 15 },
];

/* ————— the two-way formula marquee ————— */

const MQ_COLORS = ['#FF6B6B', '#ffc46b', '#6fe8a3', '#74d7ff', '#b8a3ff'];

const MQ_A: ReactNode[] = [
  <>n = m / M<sub>r</sub></>,
  <>PV = nRT</>,
  <>Q = m × c × ΔT</>,
  <>ΔH = −Q / n</>,
  <>pH = −log<sub>10</sub>[H<sup>+</sup>(aq)]</>,
  <>rate = k[A]<sup>m</sup>[B]<sup>n</sup></>,
  <>amount n = c × V</>,
  <>E = h × f</>,
];

const MQ_B: ReactNode[] = [
  <>ΔG = ΔH − TΔS</>,
  <>K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / [A]<sup>a</sup>[B]<sup>b</sup></>,
  <>K<sub>a</sub> = [H<sup>+</sup>][A<sup>−</sup>] / [HA]</>,
  <>% yield = actual ÷ theoretical × 100</>,
  <>atom economy = M<sub>r</sub> wanted ÷ M<sub>r</sub> all × 100</>,
  <>2NO<sub>2</sub> ⇌ N<sub>2</sub>O<sub>4</sub></>,
  <>1 mol = 6.02 × 10<sup>23</sup> particles</>,
  <>ΔT = q / (m × c)</>,
];

function MarqueeRow({ items, rev }: { items: ReactNode[]; rev?: boolean }) {
  return (
    <div className={`lum-mq-row${rev ? ' rev' : ''}`}>
      <div className="lum-mq-track lum-loop">
        {/* four copies: the −50 % loop stays seamless on any viewport */}
        {[0, 1, 2, 3].map((copy) =>
          items.map((it, i) => (
            <span className="lum-mq-pill" key={`${copy}-${i}`}>
              <i
                style={{
                  background: MQ_COLORS[(i + copy) % MQ_COLORS.length],
                  color: MQ_COLORS[(i + copy) % MQ_COLORS.length],
                }}
              />
              {it}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function Marquee() {
  const liveRef = useLive<HTMLDivElement>();
  return (
    <div className="lum-marquee" ref={liveRef} aria-hidden="true">
      <MarqueeRow items={MQ_A} />
      <MarqueeRow items={MQ_B} rev />
    </div>
  );
}

/* ————— the cursor light ————— */

function CursorLight() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!motionAllowed()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let shown = false;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        el.classList.add('on');
      }
    };
    const onLeave = () => {
      shown = false;
      el.classList.remove('on');
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target instanceof Element ? e.target.closest('a, button, .lum-tile, .lum-stage') : null;
      el.classList.toggle('big', Boolean(t));
    };
    const loop = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="lum-cursor" aria-hidden="true" />;
}

/* ————— the app ————— */

export default function LumenApp() {
  const reduced = Boolean(useReducedMotion());
  const navRef = useRef<HTMLElement | null>(null);
  const quip = useRotator(QUIPS.length);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  /* the nav gains its deeper shadow once the page moves */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        navRef.current?.classList.toggle('scrolled', window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (hash: string) => {
    if (hash === '#top') {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const hours = Math.round(GLOBAL_METRICS.totalMinutes / 60);

  return (
    <MotionConfig reducedMotion="user">
      <div className="lumen-root">
        <CursorLight />
        <motion.div className="lum-progress" style={{ scaleX }} aria-hidden="true" />

        {/* ————— the nav ————— */}
        <nav className="lum-nav" ref={navRef} aria-label="The luminous laboratory">
          <a
            className="lum-brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go('#top');
            }}
          >
            <FlaskMark size={34} />
            IAL&nbsp;CHEM
            <span className="lum-brand-sub">/ lumen</span>
          </a>
          <div className="lum-links">
            {NAV_LINKS.map(([label, hash]) => (
              <a
                key={hash}
                href={hash}
                onClick={(e) => {
                  e.preventDefault();
                  go(hash);
                }}
              >
                {label}
              </a>
            ))}
          </div>
          <a className="lum-btn" href="/club">
            Open the notes
          </a>
        </nav>

        {/* ————— the hero ————— */}
        <header className="lum-hero" id="top">
          <HeroField />
          <div className="lum-wrap lum-hero-grid">
            <div className="lum-hero-copy">
              <Reveal>
                <span className="lum-eyebrow">
                  <span className="dot" />
                  Edexcel IAL Chemistry · WCH11–WCH16
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1>
                  Every reaction,
                  <br />
                  <span className="lum-glowword">illuminated.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lum-lead">
                  IAL CHEM after dark — the same six units and thirty-three topics as the
                  daylight door, retold as a night laboratory: notes keyed statement by
                  statement to the specification, figures that move, and a bench that never
                  stops reacting.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="lum-cta-row">
                  <a className="lum-btn" href="/club?v=notes&doc=wch11-t01">
                    Start with Topic 1
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h14M13 6.5 18.5 12 13 17.5" />
                    </svg>
                  </a>
                  <a
                    className="lum-btn lum-btn-ghost"
                    href="#units"
                    onClick={(e) => {
                      e.preventDefault();
                      go('#units');
                    }}
                  >
                    Wander the six units
                  </a>
                </div>
                <div className="lum-proof">
                  <span>
                    <b>{GLOBAL_METRICS.units}</b> units
                  </span>
                  <span className="sep" />
                  <span>
                    <b>{GLOBAL_METRICS.topics}</b> topics
                  </span>
                  <span className="sep" />
                  <span>
                    <b>≈{hours} h</b> of notes
                  </span>
                  <span className="sep" />
                  <span>
                    <b>{GLOBAL_METRICS.workedExamples}</b> worked examples
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="lum-art">
              <div className="lum-halo lum-loop" aria-hidden="true" />
              <div className="lum-flask-wrap">
                <LumenFlask idp="lumen-flask-hero" />
              </div>
              <div className="lum-quip" aria-hidden="true">
                <span key={quip}>{QUIPS[quip]}</span>
              </div>
              {CHIPS.map((c, i) => (
                <span
                  key={i}
                  className={`lum-chip lum-loop${c.hide ? ' hide-s' : ''}`}
                  style={c.style}
                  aria-hidden="true"
                >
                  {c.t}
                </span>
              ))}
              {SPARKS.map((s, i) => (
                <svg
                  key={i}
                  className="lum-spark lum-loop"
                  style={s.style}
                  width={s.s}
                  height={s.s}
                  viewBox="0 0 24 24"
                  fill={s.c}
                  aria-hidden="true"
                >
                  <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
                </svg>
              ))}
            </div>
          </div>
        </header>

        {/* ————— the long page ————— */}
        <Marquee />
        <main>
          <UnitsBand />
          <FlameBand />
          <MotionBand />
          <ProtocolBand />
          <ReadoutBand />
          <TasteBand />
          <AnatomyBand />
          <DressBand />
          <CtaBand />
        </main>

        {/* ————— the after-hours footer ————— */}
        <LumenFooter go={go} />
      </div>
    </MotionConfig>
  );
}

/* ————— the footer ————— */

const BUBS: Array<{ x: string; s: number; d: string; dl: string }> = [
  { x: '7%', s: 12, d: '13s', dl: '0s' },
  { x: '17%', s: 8, d: '11s', dl: '2.5s' },
  { x: '31%', s: 14, d: '15s', dl: '5s' },
  { x: '46%', s: 7, d: '10s', dl: '1.2s' },
  { x: '58%', s: 11, d: '12.5s', dl: '6.4s' },
  { x: '71%', s: 9, d: '11.5s', dl: '3.6s' },
  { x: '84%', s: 13, d: '14s', dl: '7.8s' },
  { x: '93%', s: 8, d: '12s', dl: '4.4s' },
];

function LumenFooter({ go }: { go: (hash: string) => void }) {
  const liveRef = useLive<HTMLElement>();
  const anchor = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    go(hash);
  };
  return (
    <footer ref={liveRef} className="lum-foot">
      <div className="lum-meniscus" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0 36 C 200 8, 340 54, 560 28 C 740 8, 880 52, 1080 32 C 1220 18, 1340 8, 1440 30 L 1440 60 L 0 60 Z" />
        </svg>
      </div>

      {BUBS.map((b, i) => (
        <span
          key={i}
          className="lum-bub lum-loop"
          style={{
            left: b.x,
            width: b.s,
            height: b.s,
            ['--bd' as string]: b.d,
            ['--dl' as string]: b.dl,
          }}
          aria-hidden="true"
        />
      ))}

      <svg className="lum-moon" viewBox="0 0 54 54" aria-hidden="true">
        <path d="M36 6 A 22 22 0 1 0 36 48 A 17 17 0 1 1 36 6 Z" fill="#6fe8a3" opacity="0.92" />
      </svg>

      <div className="lum-wrap">
        <div className="lum-foot-grid">
          <div>
            <div className="lum-foot-brand">
              <FlaskMark size={40} />
              IAL CHEM
            </div>
            <p className="lum-foot-tag">
              The luminous laboratory — IAL CHEM’s night front door. The same notes, the same
              packs, the same progress, kept in the same browser you left them in.
            </p>
          </div>
          <div className="lum-foot-col">
            <h5>the front doors</h5>
            <a href="/">The daylight door</a>
            <a href="/twilight">The twilight door</a>
            <a href="/club">The workspace</a>
          </div>
          <div className="lum-foot-col">
            <h5>the six units</h5>
            {UNITS.map((u) => (
              <a key={u.code} href={`/club?v=${u.code.toLowerCase()}`}>
                {u.code} · {u.shortTitle}
              </a>
            ))}
          </div>
          <div className="lum-foot-col">
            <h5>this page</h5>
            {(
              [
                ['The shelf of six', '#units'],
                ['Chemistry in motion', '#motion'],
                ['The bench protocol', '#method'],
                ['A taste of the notes', '#taste'],
              ] as Array<[string, string]>
            ).map(([label, hash]) => (
              <a key={hash} href={hash} onClick={anchor(hash)}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="lum-foot-bottom">
          <span>© 2026 IAL CHEM — written the way it’s taught</span>
          <span style={{ maxWidth: '58ch' }}>
            Notes for the Pearson Edexcel International A Level Chemistry (2018)
            specification, WCH11–WCH16. Not affiliated with or endorsed by Pearson Education
            Ltd.
          </span>
        </div>
      </div>

      <div className="lum-sleeper" aria-hidden="true">
        <div className="lum-zzz">
          <span>z</span>
          <span>z</span>
          <span>z</span>
        </div>
        <LumenFlask idp="lumen-flask-sleep" mood="sleep" />
      </div>
    </footer>
  );
}
