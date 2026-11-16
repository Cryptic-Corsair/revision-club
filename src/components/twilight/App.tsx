'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { EASE_EXPO } from '../portal/lib/motion';
import { useRoomLive } from '../portal/lib/still';
import { FlaskMark } from '../portal/components/FlaskMark';
import {
  GLOBAL_METRICS,
  IAL_UNITS,
} from '../portal/data/ialData';
import { ShaderCanvas } from './ShaderCanvas';
import type { TwilightEngineId } from './shader-engines';

/* ═══════════════════════════════════════════════════════════════════════
   the twilight front door — an ALTERNATE landing page for IAL CHEM,
   dressed in the Shader-water-v2 UI type: deep twilight slate, one
   amber accent, publication-grade serif over every room, and a GLSL
   backdrop that belongs to each room.

   It is a sibling of the daylight showcase (src/components/portal/),
   not a fork of it: it is its own leaf route (/twilight, noindexed),
   theme tokens scoped under .twilight-root in twilight.css, persists
   nothing, and hands visitors into the workspace at /club through the
   same ?v= deep links the portal uses. It reuses the portal's shared
   machinery rather than rebuilding it — the still-contract referee
   (lib/still.tsx), the motion helpers (lib/motion.ts), the flask mark
   and the real course data (data/ialData.ts).

   The motion contract (handbook §17) governs every loop here:
   exactly one room's shader animates at any scroll position — the
   referee's verdict gates the canvas — backdrops sit under scrims so
   the serif always wins, and every entrance settles. The shader
   canvases themselves carry the lag contract in ShaderCanvas.tsx.
   ═══════════════════════════════════════════════════════════════════════ */

interface RoomProps {
  id?: string;
  ground: string;
  from: string;
  engine: TwilightEngineId;
  interactive?: boolean;
  scrim: string;
  reducedMotion: boolean;
  className?: string;
  children: React.ReactNode;
}

/* One room of the descent. Same shape as the daylight portal's Room:
   the ground fades in from the previous room over the first 240px so
   no junction is a hard edge, the room's shader + scrim sit behind the
   content, and the whole room rises gently into view once. The
   referee's ref lives on the room root; the shader receives the
   verdict as its live prop. */
function Room({
  id,
  ground,
  from,
  engine,
  interactive = false,
  scrim,
  reducedMotion,
  className = '',
  children,
}: RoomProps) {
  const { ref, live } = useRoomLive<HTMLDivElement>();
  return (
    <div
      ref={ref}
      id={id}
      className={`relative overflow-x-clip ${className}`}
      style={{
        background: `linear-gradient(180deg, ${from} 0px, ${ground} 240px)`,
      }}
    >
      <ShaderCanvas
        engine={engine}
        live={live}
        interactive={interactive}
        reducedMotion={reducedMotion}
        testId={`twilight-shader-${id ?? engine}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: scrim }}
      />
      <motion.div
        className="relative z-10"
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
      {children}
    </p>
  );
}

export default function TwilightApp() {
  const osReducedMotion = Boolean(useReducedMotion());
  const router = useRouter();
  /* the hero is a registered room like every other — exactly one
     shader animates at any scroll position, hero included */
  const { ref: heroRef, live: heroLive } = useRoomLive<HTMLElement>();

  /* Exit ramps into the workspace at /club — the same deep links the
     daylight front door uses; club-app.tsx reads ?v= on mount. */
  const startReading = useCallback(() => {
    router.push('/club?v=notes&doc=wch11-t01');
  }, [router]);

  const openWorkspace = useCallback(() => {
    router.push('/club');
  }, [router]);

  const openSpecIndex = useCallback(() => {
    router.push('/club?v=spec');
  }, [router]);

  const openPackBench = useCallback(() => {
    router.push('/club?v=pack');
  }, [router]);

  const openUnit = useCallback(
    (code: string) => {
      router.push(`/club?v=${code.toLowerCase()}`);
    },
    [router],
  );

  const openProgress = useCallback(() => {
    router.push('/club?v=sticker');
  }, [router]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-testid="twilight-root"
        className="twilight-root relative min-h-screen w-full overflow-x-clip"
        style={{ backgroundColor: 'var(--tx-bg)', color: 'var(--tx-ink)' }}
      >
        {/* ————— the glass bar ————— */}
        <header
          className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-5 sm:pt-3"
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="twilight-nav mx-auto flex h-12 max-w-2xl items-center justify-between gap-2.5 rounded-2xl px-3 sm:h-13 sm:px-4"
            style={{ pointerEvents: 'auto' }}
            data-testid="twilight-navbar"
          >
            <a
              href="#tx-top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg pl-1 pr-1.5 focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ color: 'var(--tx-accent)' }}
              aria-label="IAL CHEM — back to the top"
            >
              <FlaskMark size={22} />
              <span className="font-display text-xs font-bold uppercase tracking-[0.12em]">
                IAL CHEM
              </span>
              <span
                aria-hidden="true"
                className="hidden h-3.5 w-px sm:inline-block"
                style={{ backgroundColor: 'var(--tx-border-strong)' }}
              />
              <span className="hidden font-mono text-[9px] font-medium uppercase tracking-[0.12em] sm:inline-block"
                style={{ color: 'var(--tx-ink-muted)' }}>
                2018 SPEC
              </span>
            </a>
            <button
              type="button"
              onClick={openWorkspace}
              data-testid="twilight-open-workspace"
              className="twilight-btn inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 font-body text-xs font-semibold whitespace-nowrap"
            >
              Open the workspace
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </header>

        <main>
          {/* ————— the hero: the wet-ink ripple ————— */}
          <section
            ref={heroRef}
            id="tx-top"
            className="relative flex min-h-[92svh] items-center overflow-x-clip"
            style={{
              background:
                'linear-gradient(180deg, var(--tx-bg) 0px, var(--tx-bg) 240px)',
            }}
          >
            <ShaderCanvas
              engine="wet-ink"
              live={heroLive}
              interactive={true}
              reducedMotion={osReducedMotion}
              testId="twilight-shader-hero"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(18, 22, 30, 0.72) 0%, rgba(18, 22, 30, 0.42) 46%, rgba(18, 22, 30, 0.1) 100%), linear-gradient(180deg, rgba(18, 22, 30, 0.3) 0%, transparent 30%, rgba(18, 22, 30, 0.42) 100%)',
              }}
            />
            <motion.div
              className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 sm:px-8"
              initial={osReducedMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO }}
            >
              <Eyebrow>
                Pearson Edexcel International A Level · WCH11–WCH16
              </Eyebrow>
              <h1 className="twilight-display mt-5 max-w-[13ch] font-display text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[1.02] tracking-tight">
                Revision notes, written the way they&apos;re taught.
              </h1>
              <p className="mt-6 max-w-[46ch] font-body text-base leading-relaxed sm:text-lg"
                style={{ color: 'var(--tx-ink-muted)' }}>
                Every topic in the 2018 chemistry specification —
                definitions, equations and thirty worked examples — with
                your progress and reading time saved in your browser. No
                account, nothing to set up.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={startReading}
                  data-testid="twilight-start-reading"
                  className="twilight-btn twilight-btn-primary inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold"
                >
                  Start reading
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={openWorkspace}
                  className="twilight-btn inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold"
                >
                  Open the workspace
                </button>
              </div>
              <p className="twilight-pointer-note mt-10 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: 'var(--tx-ink-faint)' }}>
                Move your pointer — the ink answers · the canvas is drawn,
                not filmed
              </p>
            </motion.div>
          </section>

          {/* ————— room 1: the method — the silk field ————— */}
          <Room
            id="tx-method"
            ground="var(--tx-step-1)"
            from="var(--tx-bg)"
            engine="silk"
            scrim="linear-gradient(180deg, rgba(18, 22, 30, 0.52) 0%, rgba(18, 22, 30, 0.3) 50%, rgba(18, 22, 30, 0.56) 100%)"
            reducedMotion={osReducedMotion}
          >
            <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
              <Eyebrow>The method</Eyebrow>
              <h2 className="twilight-display mt-4 max-w-[24ch] font-display text-[clamp(1.7rem,3.6vw,2.7rem)] font-semibold leading-[1.12] tracking-tight">
                Read to the spec. Tick what you know. Walk the pack.
              </h2>
              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    step: '01',
                    title: 'Read to the spec',
                    body: 'Every note is organised by specification point — 2.7a means 2.7a, in the 2018 order the exam follows. The spec index is one jump from anywhere.',
                    action: 'Open the spec index',
                    onAction: openSpecIndex,
                  },
                  {
                    step: '02',
                    title: 'Tick as you revise',
                    body: 'Mark a clause revised and it stays marked — progress, reading time and your desk state live in your own browser, never on a server.',
                    action: 'See your progress',
                    onAction: openProgress,
                  },
                  {
                    step: '03',
                    title: 'Build a pack',
                    body: 'Select the spec points you need and the pack bench assembles them into a revision deck, in syllabus order, ready to walk.',
                    action: 'Open the pack bench',
                    onAction: openPackBench,
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="twilight-card rounded-2xl p-6"
                    data-testid={`twilight-method-${item.step}`}
                  >
                    <span className="font-mono text-xs font-medium tracking-[0.2em]"
                      style={{ color: 'var(--tx-accent)' }}>
                      {item.step}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 font-body text-sm leading-relaxed"
                      style={{ color: 'var(--tx-ink-muted)' }}>
                      {item.body}
                    </p>
                    <button
                      type="button"
                      onClick={item.onAction}
                      className="twilight-link mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold"
                    >
                      {item.action}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Room>

          {/* ————— room 2: the six units — the orbital torus ————— */}
          <Room
            id="tx-units"
            ground="var(--tx-step-2)"
            from="var(--tx-step-1)"
            engine="torus"
            scrim="radial-gradient(70% 62% at 72% 36%, rgba(18, 22, 30, 0.24) 0%, rgba(18, 22, 30, 0.62) 100%)"
            reducedMotion={osReducedMotion}
          >
            <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
              <Eyebrow>The course</Eyebrow>
              <h2 className="twilight-display mt-4 max-w-[26ch] font-display text-[clamp(1.7rem,3.6vw,2.7rem)] font-semibold leading-[1.12] tracking-tight">
                Six units, thirty-three topics, one specification.
              </h2>
              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {IAL_UNITS.map((unit, index) => (
                  <button
                    key={unit.code}
                    type="button"
                    onClick={() => openUnit(unit.code)}
                    data-testid={`twilight-unit-${unit.code.toLowerCase()}`}
                    className="twilight-card twilight-card-hover rounded-2xl p-6 text-left"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className="font-mono text-2xl font-semibold tracking-tight"
                        style={{ color: 'var(--tx-accent)' }}
                      >
                        {unit.code.replace('WCH', '')}
                      </span>
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]"
                        style={{ color: 'var(--tx-ink-faint)' }}>
                        {unit.shortLabel}
                      </span>
                    </div>
                    <h3 className="mt-3.5 font-display text-base font-semibold leading-snug">
                      {unit.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed"
                      style={{ color: 'var(--tx-ink-muted)' }}>
                      {unit.scope}
                    </p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: 'var(--tx-ink-faint)' }}>
                      Unit {index + 1} · {unit.topicsCount}{' '}
                      {unit.topicsCount === 1 ? 'topic' : 'topics'} · ≈
                      {Math.round(unit.minutes / 60)} h
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </Room>
        </main>

        {/* ————— the band: the quiet colophon ————— */}
        <footer
          className="relative overflow-x-clip"
          style={{
            background: 'linear-gradient(180deg, var(--tx-step-2) 0px, var(--tx-band) 240px)',
          }}
        >
          <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <Eyebrow>Begin anywhere</Eyebrow>
                <p className="twilight-display mt-4 max-w-[22ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.15] tracking-tight">
                  The first topic is waiting.
                </p>
              </div>
              <button
                type="button"
                onClick={startReading}
                data-testid="twilight-footer-start"
                className="twilight-btn twilight-btn-primary inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold"
              >
                Start reading
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>

            <div
              className="mt-12 grid gap-10 border-t pt-10 sm:grid-cols-[1fr_1fr]"
              style={{ borderColor: 'var(--tx-border)' }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: 'var(--tx-ink-faint)' }}>
                  The course
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed"
                  style={{ color: 'var(--tx-ink-muted)' }}>
                  {GLOBAL_METRICS.units} units · {GLOBAL_METRICS.topics}{' '}
                  topics · {GLOBAL_METRICS.workedExamples} worked examples ·
                  ≈{Math.round(GLOBAL_METRICS.totalMinutes / 60)} hours of
                  reading. Written to the Pearson Edexcel International A
                  Level Chemistry (2018) specification, WCH11–WCH16.
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <FlaskMark size={20} />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.12em]">
                    IAL CHEM
                  </span>
                </div>
              </div>
              <div className="grid gap-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: 'var(--tx-ink-faint)' }}>
                  The two front doors
                </p>
                <a
                  href="/"
                  className="twilight-footer-link font-body text-sm"
                >
                  The daylight showcase — the other front door
                </a>
                <a
                  href="/club"
                  className="twilight-footer-link font-body text-sm"
                >
                  The workspace — the desk, the notes, the packs
                </a>
                <a
                  href="/club?v=spec"
                  className="twilight-footer-link font-body text-sm"
                >
                  The specification index
                </a>
              </div>
            </div>

            <p
              className="mt-12 font-body text-xs leading-relaxed"
              style={{ color: 'var(--tx-ink-faint)' }}
            >
              IAL CHEM is an independent revision resource. It is not
              affiliated with, sponsored or endorsed by Pearson Education
              Ltd. Edexcel and Pearson are registered trademarks of Pearson
              Education Ltd.
            </p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
