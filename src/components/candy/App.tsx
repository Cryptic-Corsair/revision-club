'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { FlaskMark } from '../portal/components/FlaskMark';
import { GLOBAL_METRICS } from '../portal/data/ialData';
import { UNITS } from '@/lib/spectra/units';
import { BlobDivider, Reveal } from './bits';
import { HeroField, MotionBand } from './Scenes';
import { FlameBand, UnitsBand } from './Units';
import { MethodBand, StickerBand } from './Method';
import { TasteBand } from './Example';
import { CtaBand, DressBand, SnackBand } from './Features';
import { Bubbles } from './Mascot';
import { boopConfetti, motionAllowed, useLive, useRotator } from './lib';

/* ═══════════════════════════════════════════════════════════════════════
   the candy lab — IAL CHEM's alternate homepage, the fun one.

   A bright candy workshop deliberately unlike the dark sea-slate portal:
   cream grounds, Fredoka headlines, sticker cards, blob seams, and
   Bubbles the beaker mascot front and centre — blinking, waving, gliding
   her pupils toward your cursor, and boopable (confetti included). The
   playful coat is wired to the same ?v= deep links, the same registry
   numbers, and the same motion contract as every other front door.
   ═══════════════════════════════════════════════════════════════════════ */

const NAV_LINKS: Array<[string, string]> = [
  ['The six units', '#units'],
  ['In motion', '#motion'],
  ['Try one', '#taste'],
  ['Snack table', '#snack'],
];

const QUIPS = [
  'boop me. i dare you.',
  'i’m 60% water, 40% enthusiasm.',
  'moles are friends, not pests.',
  'shake well before use. that’s me.',
  'ΔG < 0 — this way happens on its own.',
  'every bond here has a story.',
];

const BOOP_LINES = ['hehe — that tickles!', 'wow! do it again!', 'boop received. science intensified.'];

const CHIPS: Array<{ t: ReactNode; style: CSSProperties; c: string; hide?: boolean }> = [
  { t: <>PV = nRT</>, c: '#FF6B6B', style: { top: '-2%', left: '5%', ['--d' as string]: '6.2s', ['--r' as string]: '-3deg' } },
  { t: <>ΔG = ΔH − TΔS</>, c: '#FF922B', style: { top: '22%', right: '-2%', ['--d' as string]: '7.4s', ['--r' as string]: '3deg' } },
  { t: <>n = m / M<sub>r</sub></>, c: '#12B886', style: { top: '45%', left: '-3%', ['--d' as string]: '5.8s', ['--r' as string]: '-2deg' } },
  { t: <>K<sub>c</sub></>, c: '#9775FA', style: { top: '62%', right: '0%', ['--d' as string]: '6.6s', ['--r' as string]: '4deg' }, hide: true },
  { t: <>pH = −log[H<sup>+</sup>]</>, c: '#5BB4E8', style: { bottom: '6%', left: '3%', ['--d' as string]: '7s', ['--r' as string]: '2deg' } },
  { t: <>1 mol = 6.02 × 10<sup>23</sup></>, c: '#F06595', style: { bottom: '-1%', right: '8%', ['--d' as string]: '6.4s', ['--r' as string]: '-2deg' }, hide: true },
];

const SPARKS: Array<{ style: CSSProperties; c: string; s: number }> = [
  { style: { top: '4%', left: '38%', ['--dl' as string]: '.6s' }, c: '#FFC64B', s: 24 },
  { style: { bottom: '13%', left: '13%', ['--dl' as string]: '1.4s' }, c: '#F06595', s: 18 },
  { style: { top: '25%', right: '13%', ['--dl' as string]: '2s' }, c: '#5BB4E8', s: 15 },
];

const MQ_COLORS = ['#FF6B6B', '#FF922B', '#12B886', '#5BB4E8', '#9775FA', '#F06595'];

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
    <div className={`cd-mq-row${rev ? ' rev' : ''}`}>
      <div className="cd-mq-track cd-loop">
        {/* four copies: the −50 % loop stays seamless on any viewport */}
        {[0, 1, 2, 3].map((copy) =>
          items.map((it, i) => (
            <span className="cd-mq-pill" key={`${copy}-${i}`}>
              <i
                style={{
                  background: MQ_COLORS[(i + copy) % MQ_COLORS.length],
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
    <div className="cd-marquee" ref={liveRef} aria-hidden="true">
      <MarqueeRow items={MQ_A} />
      <MarqueeRow items={MQ_B} rev />
    </div>
  );
}

/* ————— the cursor bubble trail ————— */

function BubbleTrail() {
  useEffect(() => {
    if (!motionAllowed()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let lastSpawn = 0;
    let alive = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 120 || alive > 13) return;
      lastSpawn = now;
      alive++;
      const bit = document.createElement('span');
      bit.className = 'cd-trail';
      const size = 7 + Math.random() * 9;
      bit.style.left = `${e.clientX}px`;
      bit.style.top = `${e.clientY}px`;
      bit.style.setProperty('--s', `${size}px`);
      const cols = ['rgba(91, 180, 232, 0.3)', 'rgba(255, 198, 75, 0.32)', 'rgba(255, 107, 107, 0.28)', 'rgba(18, 184, 134, 0.28)'];
      bit.style.setProperty('--c', cols[Math.floor(Math.random() * cols.length)]);
      document.body.appendChild(bit);
      setTimeout(() => {
        bit.remove();
        alive--;
      }, 900);
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);
  return null;
}

/* ————— the app ————— */

export default function CandyApp() {
  const reduced = Boolean(useReducedMotion());
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useLive<HTMLElement>();
  const artRef = useRef<HTMLDivElement | null>(null);
  const mascotRef = useRef<HTMLDivElement | null>(null);
  const [boopMood, setBoopMood] = useState<'idle' | 'wow'>('idle');
  const [boopLine, setBoopLine] = useState<string | null>(null);
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

  /* the pupils glide toward the cursor — CSS vars on the art container,
     no re-renders, no work on touch devices */
  useEffect(() => {
    const art = artRef.current;
    if (!art || !motionAllowed()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      const r = art.getBoundingClientRect();
      const px = Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / r.width) * 2));
      const py = Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height / 2)) / r.height) * 2));
      art.style.setProperty('--px', px.toFixed(2));
      art.style.setProperty('--py', py.toFixed(2));
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  /* the boop — a springy hop, a confetti ring, a special line */
  const boop = useCallback(() => {
    if (!motionAllowed()) return;
    setBoopMood('wow');
    setBoopLine(BOOP_LINES[Math.floor(Math.random() * BOOP_LINES.length)]);
    const wrap = mascotRef.current;
    if (wrap) {
      wrap.classList.remove('booped');
      void wrap.offsetWidth; // restart the spring
      wrap.classList.add('booped');
      boopConfetti(wrap);
    }
    setTimeout(() => {
      setBoopMood('idle');
      setBoopLine(null);
    }, 1700);
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
      <div className="candy-root">
        <BubbleTrail />
        <motion.div className="cd-progress" style={{ scaleX }} aria-hidden="true" />

        {/* ————— the nav ————— */}
        <nav className="cd-nav" ref={navRef} aria-label="The candy lab">
          <a
            className="cd-brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go('#top');
            }}
          >
            <FlaskMark size={34} />
            IAL&nbsp;CHEM
            <span className="cd-brand-sub">/ candy lab</span>
          </a>
          <div className="cd-links">
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
          <a className="cd-btn cd-btn-ghost" href="/club">
            Open the notes
          </a>
        </nav>

        {/* ————— the hero ————— */}
        <header className="cd-hero" id="top" ref={heroRef}>
          <HeroField />
          <div className="cd-wrap cd-hero-grid">
            <div className="cd-hero-copy">
              <Reveal>
                <span className="cd-eyebrow">
                  <span className="dot" style={{ background: 'var(--cd-green)' }} />
                  Edexcel IAL Chemistry · WCH11–WCH16
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1>
                  Chemistry,
                  <br />
                  but make it{' '}
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    fun.
                    <svg
                      className="cd-squiggle"
                      viewBox="0 0 220 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      fill="none"
                    >
                      <path
                        d="M5 14 C 30 4, 52 20, 78 12 C 104 4, 126 20, 152 12 C 178 4, 200 16, 215 8"
                        stroke="#FF6B6B"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="cd-lead">
                  The whole Edexcel IAL course — six units, thirty-three topics, every
                  specification point — wearing its candy colours: sticker cards, figures that
                  move, a beaker mascot who would very much like to be booped. Serious notes,
                  silly wrapper.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="cd-cta-row">
                  <a className="cd-btn cd-btn-coral" href="/club?v=notes&doc=wch11-t01">
                    Start with Topic 1
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h14M13 6.5 18.5 12 13 17.5" />
                    </svg>
                  </a>
                  <a
                    className="cd-btn cd-btn-ghost"
                    href="#units"
                    onClick={(e) => {
                      e.preventDefault();
                      go('#units');
                    }}
                  >
                    Wander the six units
                  </a>
                </div>
                <div className="cd-proof">
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

            <div className="cd-art" ref={artRef}>
              <div className="cd-halo cd-loop" aria-hidden="true" />
              <div className="cd-mascot-wrap" ref={mascotRef} onClick={boop}>
                <Bubbles idp="cd-bubbles-hero" mood={boopMood} />
              </div>
              <div className="cd-bubble" aria-hidden="true">
                <span key={boopLine ?? quip}>{boopLine ?? QUIPS[quip]}</span>
              </div>
              {CHIPS.map((c, i) => (
                <span key={i} className={`cd-chip cd-loop${c.hide ? ' hide-s' : ''}`} style={c.style} aria-hidden="true">
                  <i style={{ background: c.c }} />
                  {c.t}
                </span>
              ))}
              {SPARKS.map((s, i) => (
                <svg
                  key={i}
                  className="cd-spark cd-loop"
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
          <TasteBand />
          <SnackBand />
          <MethodBand />
          <StickerBand />
          <DressBand />
          <CtaBand />
        </main>

        {/* ————— the after-hours footer ————— */}
        <CandyFooter go={go} />
      </div>
    </MotionConfig>
  );
}

/* ————— the footer: the lab after hours ————— */

/* stars live in the sky strip above the link columns (y ≤ 14 %) and the
   outer margins — never twinkling over the footer's text */
const STARS: Array<{ x: string; y: string; s: number; dl: string }> = [
  { x: '7%', y: '9%', s: 3, dl: '0s' },
  { x: '17%', y: '13%', s: 2.5, dl: '.7s' },
  { x: '31%', y: '6%', s: 3, dl: '1.3s' },
  { x: '44%', y: '11%', s: 2.5, dl: '.4s' },
  { x: '57%', y: '5%', s: 3, dl: '1.9s' },
  { x: '68%', y: '12%', s: 2.5, dl: '1s' },
  { x: '80%', y: '7%', s: 3, dl: '2.4s' },
  { x: '92%', y: '12%', s: 2.5, dl: '1.6s' },
  { x: '3%', y: '38%', s: 2.5, dl: '2s' },
  { x: '97%', y: '44%', s: 2.5, dl: '.2s' },
];

function CandyFooter({ go }: { go: (hash: string) => void }) {
  const liveRef = useLive<HTMLElement>();
  const anchor = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    go(hash);
  };
  return (
    <footer ref={liveRef} className="cd-foot">
      <BlobDivider kind="drips" at="top" color="var(--cd-cream)" />

      {STARS.map((st, i) => (
        <span
          key={i}
          className="cd-star cd-loop"
          style={{ left: st.x, top: st.y, width: st.s, height: st.s, ['--dl' as string]: st.dl }}
          aria-hidden="true"
        />
      ))}

      <svg className="cd-moon" viewBox="0 0 54 54" aria-hidden="true">
        <path d="M36 6 A 22 22 0 1 0 36 48 A 17 17 0 1 1 36 6 Z" fill="#FFC64B" opacity="0.95" />
      </svg>

      <div className="cd-wrap">
        <div className="cd-foot-grid">
          <div>
            <div className="cd-foot-brand">
              <FlaskMark size={40} />
              IAL CHEM
            </div>
            <p className="cd-foot-tag">
              The candy lab — IAL CHEM’s alternate front door. The same notes, the same packs,
              the same progress, kept in the same browser you left them in.
            </p>
          </div>
          <div className="cd-foot-col">
            <h5>the front doors</h5>
            <a href="/">The daylight door</a>
            <a href="/twilight">The twilight door</a>
            <a href="/club">The workspace</a>
          </div>
          <div className="cd-foot-col">
            <h5>the six units</h5>
            {UNITS.slice(0, 6).map((u) => (
              <a key={u.code} href={`/club?v=${u.code.toLowerCase()}`}>
                {u.code} · {u.shortTitle}
              </a>
            ))}
          </div>
          <div className="cd-foot-col">
            <h5>this page</h5>
            {(
              [
                ['The sticker shelf', '#units'],
                ['Chemistry in motion', '#motion'],
                ['Try one on me', '#taste'],
                ['The snack table', '#snack'],
                ['How Bubbles helps', '#method'],
              ] as Array<[string, string]>
            ).map(([label, hash]) => (
              <a key={hash} href={hash} onClick={anchor(hash)}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="cd-foot-bottom">
          <span>© 2026 IAL CHEM — serious notes, silly wrapper</span>
          <span style={{ maxWidth: '58ch' }}>
            Notes for the Pearson Edexcel International A Level Chemistry (2018)
            specification, WCH11–WCH16. Not affiliated with or endorsed by Pearson Education
            Ltd.
          </span>
        </div>
      </div>

      <div className="cd-sleeper" aria-hidden="true">
        <div className="cd-zzz">
          <span>z</span>
          <span>z</span>
          <span>z</span>
        </div>
        <Bubbles idp="cd-bubbles-sleep" mood="sleep" />
      </div>
    </footer>
  );
}
