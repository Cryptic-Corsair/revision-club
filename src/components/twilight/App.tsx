'use client';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { EASE_EXPO } from '../portal/lib/motion';
import { useRoomLive } from '../portal/lib/still';
import { FlaskMark } from '../portal/components/FlaskMark';
import {
  GLOBAL_METRICS,
  IAL_UNITS,
} from '../portal/data/ialData';
import { WaterCanvas, type WaterParams } from '../shared/WaterCanvas';
import {
  WATER_ART_BACKDROP,
  WATER_ART_FOOTER,
  WATER_ART_FRAME,
} from '../shared/water.frag';
import { MonsoonRain } from './MonsoonRain';
import { PondSculpture } from './PondSculpture';
import { WaveArt } from './WaveArt';

/* ═══════════════════════════════════════════════════════════════════════
   the twilight front door, rebuilt faithfully on the reference at
   water-shafer.vercel.app: ONE continuous water field behind the whole
   page (the global backdrop, its caustics refracting a baked gradient
   wash), the monsoon rain machine over the hero, the arch pond
   sculpture, a water-refracted reading frame, the giant two-tone
   quotes, the scroll-scrubbed collections carousel with horizon-wave
   art cards, the spec marquee, the drawn-on-scroll chronology thread,
   and the diagonal-cut footer with its own golden-horizon water layer.

   Content stays the site's own truth: IAL_UNITS / GLOBAL_METRICS /
   real clause sentences, exits into /club through the same ?v= deep
   links, Pearson disclaimer preserved.

   The lag contract (handbook §17 discipline + the reference's own
   budgets): every water instance carries device-pixel budgets and
   stops advancing shader-time when its room isn't on stage (speed 0
   = the reference's `active ? .24 : 0`); the rain and the wave cards
   render in CSS-pixel space with 32 ms gaps behind IntersectionObserver
   + referee gates; the only CSS loops are compositor transform/opacity
   keyframes; every entrance settles.
   ═══════════════════════════════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* the reference's global backdrop preset (its own prop table, verbatim;
   layering drops to 0 on software renderers — handled in WaterCanvas;
   the mount's `scale` prop zooms art and pattern together — the
   reference's global backdrop runs 1.38) */
const GLOBAL_WATER: WaterParams = {
  highlights: 0.52,
  layering: 0.34,
  edges: 0,
  caustic: 0.38,
  waves: 0.34,
  size: 0.72,
  scale: 1.38,
  speed: 0.24,
};

/* the reference's footer water preset (its table passes no scale → 1) */
const FOOTER_WATER: WaterParams = {
  highlights: 0.85,
  layering: 0.45,
  edges: 0.16,
  caustic: 0.62,
  waves: 0.55,
  size: 1.75,
  scale: 1,
  speed: 0.24,
};

/* the reading frame's water preset (reference card table — no scale) */
const FRAME_WATER: WaterParams = {
  highlights: 0.34,
  layering: 0.25,
  edges: 0.1,
  caustic: 0.25,
  waves: 0.3,
  size: 1.05,
  scale: 1,
  speed: 0.24,
};

/* the reference's global-water budgets */
const GLOBAL_BUDGET = { software: 220_000, mobile: 260_000, desktop: 400_000 };
const FOOTER_BUDGET = { software: 200_000, mobile: 260_000, desktop: 340_000 };

function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* a giant ghost numeral watermark — the reference's giant glyph watermarks */
function Ghost({ children, className }: { children: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`twilight-ghost pointer-events-none absolute select-none font-display ${className}`}
    >
      {children}
    </span>
  );
}

/* the quote block — index eyebrow, ivory line, gold line, note */
function QuoteBlock({
  index,
  source,
  lead,
  accent,
  note,
  align,
}: {
  index: string;
  source: string;
  lead: string;
  accent: string;
  note: string;
  align: 'left' | 'center' | 'right';
}) {
  const alignClass =
    align === 'left'
      ? 'mr-auto text-left'
      : align === 'right'
        ? 'ml-auto text-right'
        : 'mx-auto text-center';
  return (
    <Reveal className={`max-w-[38ch] sm:max-w-[30ch] ${alignClass}`}>
      <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
        {index} · {source}
      </p>
      <blockquote className="twilight-quote mt-4 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-[1.16]">
        <span className="text-[#F6F4EF]">&ldquo;{lead}</span>
        <br />
        <span className="text-[#DFBC91]">{accent}.&rdquo;</span>
      </blockquote>
      <p className="mt-4 font-body text-sm leading-relaxed text-[#F6F4EF]/62">
        {note}
      </p>
    </Reveal>
  );
}

/* ————— the collections carousel ————— */

interface CollectionSlide {
  id: string;
  title: string;
  quote: string;
  meta: string;
  cta: string;
  href: string;
  colors: [string, string, string];
  amplitude: number;
  phase: number;
}

const COLLECTION_SLIDES: CollectionSlide[] = [
  {
    id: 'units',
    title: 'The six units',
    quote:
      'Structure to synthesis, one unit at a time — WCH11 to WCH16, each opening straight into its topics.',
    meta: '6 units · 33 topics',
    cta: 'Open the unit map',
    href: '/club',
    colors: [
      'rgba(246, 244, 239, 0.66)',
      'rgba(223, 188, 145, 0.55)',
      'rgba(178, 194, 212, 0.5)',
    ],
    amplitude: 9,
    phase: 0,
  },
  {
    id: 'spec',
    title: 'The spec index',
    quote:
      'Every clause of the 2018 specification, in the order the exam follows, one jump from anywhere.',
    meta: 'The 2018 order · clickable clauses',
    cta: 'Open the spec index',
    href: '/club?v=spec',
    colors: [
      'rgba(178, 194, 212, 0.6)',
      'rgba(246, 244, 239, 0.5)',
      'rgba(223, 188, 145, 0.5)',
    ],
    amplitude: 7,
    phase: 2.1,
  },
  {
    id: 'packs',
    title: 'Revision packs',
    quote:
      'Built from the spec points you tick — assembled in syllabus order, ready to walk.',
    meta: 'The pack bench · your ticks',
    cta: 'Open the pack bench',
    href: '/club?v=pack',
    colors: [
      'rgba(223, 188, 145, 0.6)',
      'rgba(246, 244, 239, 0.52)',
      'rgba(198, 190, 180, 0.48)',
    ],
    amplitude: 11,
    phase: 4.2,
  },
  {
    id: 'practicals',
    title: 'The practicals',
    quote:
      'Titration rigs, ion and gas tests, uncertainty — WCH13 and WCH16, written as method.',
    meta: 'Units 3 & 6 · core practicals',
    cta: 'Open the practicals',
    href: '/club?v=wch13',
    colors: [
      'rgba(198, 190, 180, 0.55)',
      'rgba(178, 194, 212, 0.52)',
      'rgba(246, 244, 239, 0.46)',
    ],
    amplitude: 6,
    phase: 5.6,
  },
];

function CollectionsCarousel({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const { ref, live } = useRoomLive<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* the reference's scroll-scrubbed track — x tied to section progress */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.45'],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ['4%', '-62%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(
      COLLECTION_SLIDES.length - 1,
      Math.max(0, Math.round(v * (COLLECTION_SLIDES.length - 1))),
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const jumpTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[index] as HTMLElement | undefined;
      card?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    },
    [reducedMotion],
  );

  return (
    <div
      ref={ref}
      id="tx-collections"
      className="relative min-h-[115svh] w-full overflow-x-clip py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
            The collections
          </p>
          <h2 className="twilight-quote mt-4 max-w-[24ch] font-display text-[clamp(1.7rem,3.6vw,2.7rem)] font-semibold leading-[1.12] text-[#F6F4EF]">
            Four doors into the same water.
          </h2>
        </Reveal>
      </div>

      <div ref={sectionRef} className="relative mt-14 overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-6 px-[8vw] will-change-transform sm:gap-8"
          style={reducedMotion ? undefined : { x: trackX }}
        >
          {COLLECTION_SLIDES.map((slide, index) => (
            <a
              key={slide.id}
              href={slide.href}
              data-testid={`twilight-collection-${slide.id}`}
              className="twilight-glass-card relative flex w-[min(84vw,540px)] shrink-0 flex-col rounded-[28px] p-4 pb-6 sm:w-[min(60vw,540px)]"
            >
              <div
                className="h-40 overflow-hidden rounded-[20px] border sm:h-44"
                style={{ borderColor: 'rgba(255,255,255,0.14)' }}
              >
                <WaveArt
                  colors={slide.colors}
                  amplitude={slide.amplitude}
                  phase={slide.phase}
                  live={live}
                  testId={`twilight-wave-art-${slide.id}`}
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-3 px-2">
                <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
                  {String(index + 1).padStart(2, '0')} · {slide.meta}
                </p>
              </div>
              <h3 className="twilight-quote mt-2 px-2 font-display text-2xl font-semibold text-[#F6F4EF]">
                {slide.title}
              </h3>
              <p className="mt-2 px-2 font-body text-sm leading-relaxed text-[#F6F4EF]/68">
                &ldquo;{slide.quote}&rdquo;
              </p>
              <span className="twilight-link mt-4 inline-flex items-center gap-1.5 px-2 font-body text-sm font-semibold">
                {slide.cta}
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <div
          className="flex items-center gap-2.5"
          role="tablist"
          aria-label="Collections"
        >
          {COLLECTION_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={slide.title}
              onClick={() => jumpTo(index)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? 26 : 8,
                backgroundColor:
                  activeIndex === index
                    ? 'var(--tx-accent)'
                    : 'rgba(246, 244, 239, 0.28)',
              }}
            />
          ))}
        </div>
        <p className="hidden font-body text-xs text-[#F6F4EF]/55 sm:block">
          The cards open straight into the workspace&apos;s rooms.
        </p>
      </div>
    </div>
  );
}

/* ————— the chronology thread (drawn on scroll) ————— */

function Chronology({ reducedMotion }: { reducedMotion: boolean }) {
  const threadRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: threadRef,
    offset: ['start 0.8', 'end 0.55'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      id="tx-chronology"
      className="relative min-h-[120svh] w-full overflow-x-clip py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
              2018–2028 specification · IAS to IA2
            </p>
            <h2 className="twilight-quote mt-4 max-w-[22ch] font-display text-[clamp(1.7rem,3.6vw,2.7rem)] font-semibold leading-[1.12] text-[#F6F4EF]">
              The course chronology.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[44ch]">
            <p className="font-body text-sm leading-relaxed text-[#F6F4EF]/62">
              {GLOBAL_METRICS.units} units from IAS to IA2,{' '}
              {GLOBAL_METRICS.topics} topics and{' '}
              {GLOBAL_METRICS.workedExamples} fully worked examples — every
              one written to its specification point, in the order the exam
              asks for it.
            </p>
          </Reveal>
        </div>

        <div ref={threadRef} className="relative mt-16 pl-8 sm:pl-12">
          {/* the thread — draws itself as you scroll */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-[7px] top-2 h-[calc(100%-1rem)] w-6 sm:left-[11px]"
            viewBox="0 0 6 1000"
            preserveAspectRatio="none"
          >
            <line
              x1="3"
              y1="0"
              x2="3"
              y2="1000"
              stroke="rgba(246, 244, 239, 0.16)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <motion.line
              x1="3"
              y1="0"
              x2="3"
              y2="1000"
              stroke="#DFBC91"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={reducedMotion ? { pathLength: 1 } : { pathLength }}
            />
          </svg>
          {IAL_UNITS.slice(0, 6).map((unit, index) => (
            <Reveal key={unit.code} delay={index * 0.04}>
              <button
                type="button"
                data-testid={`twilight-chrono-${unit.code.toLowerCase()}`}
                onClick={() => {
                  window.location.href = `/club?v=${unit.code.toLowerCase()}`;
                }}
                className="twilight-chrono-row group relative -ml-8 flex w-[calc(100%+2rem)] items-baseline justify-between gap-4 rounded-xl py-5 pl-8 pr-4 text-left sm:-ml-12 sm:w-[calc(100%+3rem)] sm:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="twilight-thread-node absolute left-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#F6F4EF]/52">
                    {unit.shortLabel} · {unit.code}
                  </span>
                  <span className="mt-1.5 block truncate font-display text-lg font-semibold text-[#F6F4EF] sm:text-xl">
                    {unit.title}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#DFBC91]/85">
                  {unit.topicsCount} topics · ≈{Math.round(unit.minutes / 60)} h
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ————— the app ————— */

export default function TwilightApp() {
  const osReducedMotion = Boolean(useReducedMotion());
  const router = useRouter();

  /* room liveness — each section registers with the referee; its
     verdict gates that room's machines and its water's speed */
  const { ref: heroSectionRef, live: heroLive } =
    useRoomLive<HTMLElement>();
  const { ref: readerSectionRef, live: readerLive } =
    useRoomLive<HTMLDivElement>();
  const { ref: footerSectionRef, live: footerLive } =
    useRoomLive<HTMLElement>();

  const startReading = useCallback(() => {
    router.push('/club?v=notes&doc=wch11-t01');
  }, [router]);

  const openWorkspace = useCallback(() => {
    router.push('/club');
  }, [router]);

  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-testid="twilight-root"
        className="twilight-root relative min-h-screen w-full overflow-x-clip"
      >
        {/* ————— the one continuous water ————— */}
        <div
          data-water-active="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          style={{ backgroundColor: '#1D2430' }}
        >
          <WaterCanvas
            art={WATER_ART_BACKDROP}
            imageAspect={1440 / 900}
            colorBack="#1B222E"
            colorHighlight="#E6C99E"
            params={GLOBAL_WATER}
            budget={GLOBAL_BUDGET}
            active={true}
            reducedMotion={osReducedMotion}
            testId="twilight-water-global"
          />
        </div>

        <div className="relative z-10">
          {/* ————— the glass bar ————— */}
          <header
            className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-5 sm:pt-3"
            style={{ pointerEvents: 'none' }}
          >
            <nav
              className="twilight-nav mx-auto flex h-12 max-w-3xl items-center justify-between gap-3 rounded-full px-3 sm:h-13 sm:px-4"
              style={{ pointerEvents: 'auto' }}
              data-testid="twilight-navbar"
            >
              <a
                href="#tx-top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg pl-1 pr-1.5"
                aria-label="IAL CHEM — back to the top"
              >
                <FlaskMark size={20} />
                <span className="font-display text-sm font-semibold tracking-wide text-[#171A21]">
                  IAL CHEM
                </span>
              </a>
              <div className="hidden items-center gap-1 sm:flex">
                {[
                  ['The method', 'tx-reader'],
                  ['Collections', 'tx-collections'],
                  ['Chronology', 'tx-chronology'],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="twilight-nav-link rounded-full px-3 py-1.5 font-body text-xs font-medium text-[#F6F4EF]/72"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/"
                  className="twilight-btn hidden h-8 items-center gap-1.5 rounded-full px-3.5 font-body text-xs font-semibold text-[#F6F4EF] sm:inline-flex"
                >
                  Daylight door
                </a>
                <button
                  type="button"
                  onClick={openWorkspace}
                  data-testid="twilight-open-workspace"
                  className="twilight-btn-dark inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 font-body text-xs font-semibold"
                >
                  The workspace
                  <ArrowUpRight size={13} aria-hidden="true" />
                </button>
              </div>
            </nav>
          </header>

          {/* ————— the hero ————— */}
          <section
            ref={heroSectionRef}
            id="tx-top"
            className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-x-clip px-5 pb-10 pt-28 sm:px-8 sm:pt-32"
          >
            <MonsoonRain reducedMotion={osReducedMotion} />
            <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <Reveal>
                  <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
                    IAL CHEM · Pearson Edexcel · 2018 spec
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h1 className="twilight-quote mt-6 max-w-[15ch] font-display text-[clamp(2.4rem,6.4vw,4.9rem)] font-medium leading-[1.04] text-[#F6F4EF]">
                    Revision notes, written the way they&apos;re taught.
                  </h1>
                </Reveal>
                <Reveal delay={0.16}>
                  <div className="twilight-rule mt-8 h-px w-56" />
                  <p className="mt-6 max-w-[46ch] font-display text-lg italic leading-relaxed text-[#F6F4EF]/78 sm:text-xl">
                    Every topic in the 2018 chemistry specification —
                    definitions, equations and thirty worked examples — with
                    your progress and reading time saved in your browser.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={startReading}
                      data-testid="twilight-start-reading"
                      className="twilight-btn-dark inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold"
                    >
                      Start reading
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollTo('tx-reader')}
                      className="twilight-btn inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold text-[#F6F4EF]"
                    >
                      The method first
                      <ArrowDown size={15} aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              </div>
              <div className="relative">
                <PondSculpture reducedMotion={osReducedMotion} />
              </div>
            </div>
            <div className="mx-auto mt-14 flex w-full max-w-6xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollTo('tx-reader')}
                data-testid="twilight-scroll-pill"
                className="twilight-btn inline-flex h-9 items-center gap-2 rounded-full px-4 font-body text-xs font-medium text-[#F6F4EF]/85"
              >
                Scroll to read
                <ArrowDown size={13} aria-hidden="true" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F6F4EF]/48">
                WCH11–WCH16 · 2018–2028
              </p>
            </div>
          </section>

          {/* ————— the reader — the refracted frame ————— */}
          <section
            ref={readerSectionRef}
            id="tx-reader"
            className="relative flex min-h-[125svh] w-full items-center overflow-x-clip px-5 py-24 sm:px-8"
          >
            <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">
              <Reveal className="order-2 lg:order-1">
                <div
                  className="twilight-portrait-frame relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border shadow-[0_24px_60px_rgba(24,28,36,0.24)]"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <div className="absolute inset-x-0 -inset-y-5 will-change-transform">
                    <WaterCanvas
                      art={WATER_ART_FRAME}
                      imageAspect={800 / 1000}
                      colorBack="#5A6372"
                      colorHighlight="#EFEAE2"
                      params={FRAME_WATER}
                      budget={{
                        software: 160_000,
                        mobile: 200_000,
                        desktop: 260_000,
                      }}
                      active={readerLive}
                      reducedMotion={osReducedMotion}
                      testId="twilight-water-frame"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(60% 42% at 46% 34%, rgba(246, 244, 239, 0.14) 0%, transparent 70%)',
                    }}
                  />
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#F6F4EF]/70">
                      The notes reader · highlighted clauses · reading time
                      kept
                    </p>
                  </div>
                </div>
              </Reveal>
              <div className="order-1 lg:order-2">
                <Reveal>
                  <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
                    The method · WCH11–WCH16
                  </p>
                  <h2 className="twilight-quote mt-4 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.1] text-[#F6F4EF]">
                    Written to the spec, read like a book.
                  </h2>
                  <p className="mt-6 max-w-[52ch] font-body text-base leading-relaxed text-[#F6F4EF]/72">
                    Each topic opens into clause-by-clause notes with
                    marker-pen highlights, hand-drawn figures and worked
                    examples set out the way examiners mark them. The spec
                    index and the pack bench hang off the same ticks — one
                    mark, everywhere.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="twilight-rule mt-8 h-px w-full max-w-md" />
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F6F4EF]/55">
                    <span>The spec index</span>
                    <span aria-hidden="true" className="text-[#DFBC91]/70">
                      ·
                    </span>
                    <span>The pack bench</span>
                    <span aria-hidden="true" className="text-[#DFBC91]/70">
                      ·
                    </span>
                    <span>Your progress</span>
                  </div>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = '/club?v=spec';
                      }}
                      data-testid="twilight-open-spec"
                      className="twilight-btn-dark inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold"
                    >
                      Open the spec index
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollTo('tx-quotes')}
                      className="twilight-btn inline-flex h-11 items-center gap-2 rounded-full px-6 font-body text-sm font-semibold text-[#F6F4EF]"
                    >
                      Hear the notes
                      <ArrowDown size={15} aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ————— the quotes ————— */}
          <section
            id="tx-quotes"
            className="relative flex min-h-[150svh] w-full flex-col justify-center gap-24 overflow-x-clip py-24 sm:gap-32"
          >
            <Ghost className="left-[4%] top-[6%] text-[26vw] leading-none">
              01
            </Ghost>
            <Ghost className="bottom-[10%] right-[3%] text-[30vw] leading-none">
              02
            </Ghost>
            <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
              <div className="flex flex-col gap-24 sm:gap-32">
                <QuoteBlock
                  index="01"
                  source="WCH11 · Topic 1"
                  lead="Isotopes are atoms of the same element,"
                  accent="same protons, different neutrons"
                  note="Topic 1 · Atomic structure and periodicity — every definition carries the clause it belongs to."
                  align="left"
                />
                <QuoteBlock
                  index="02"
                  source="WCH12 · Topic 6"
                  lead="Reactions which liberate heat energy to the surrounding,"
                  accent="the sign on ΔH is negative"
                  note="Topic 6 · Energetics and Hess cycles — worked examples set out the way the marks fall."
                  align="center"
                />
                <QuoteBlock
                  index="03"
                  source="WCH15 · Topic 18"
                  lead="Transition metals, ligand exchange,"
                  accent="electrode potentials read from the data book"
                  note="Topics 17–21 · redox equilibria, arenes and nitrogen chemistry, to the last clause."
                  align="right"
                />
              </div>
            </div>
          </section>

          {/* ————— the collections carousel ————— */}
          <CollectionsCarousel reducedMotion={osReducedMotion} />

          {/* ————— the spec marquee ————— */}
          <section className="relative overflow-x-clip py-16 sm:py-24">
            <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
              <p className="twilight-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
                From the 2018 specification
              </p>
            </Reveal>
            <div className="twilight-marquee mt-8" data-testid="twilight-marquee">
              <div className="twilight-marquee-track font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-medium text-[#F6F4EF]/85">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    aria-hidden={copy === 1}
                    className="twilight-marquee-group"
                  >
                    {[
                      '1.4c · Ionisation energy trends',
                      '2.7a · Hess cycle calculations',
                      '4.3b · Buffer calculations',
                      '5.2e · Electrophilic substitution',
                      '1.5b · Alkene reaction pathways',
                      '3.2c · Qualitative ion tests',
                    ].map((chip) => (
                      <span
                        key={`${copy}-${chip}`}
                        className="twilight-marquee-item"
                      >
                        &ldquo;{chip}&rdquo;
                        <span
                          aria-hidden="true"
                          className="twilight-marquee-dot"
                        >
                          ·
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ————— the chronology ————— */}
          <Chronology reducedMotion={osReducedMotion} />

          {/* ————— the closing ————— */}
          <section
            ref={footerSectionRef}
            className="relative flex min-h-[80svh] flex-col items-center justify-center px-5 py-24 text-center sm:px-8"
          >
            <Reveal>
              <div className="twilight-glass-pill mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full px-5 py-3">
                <span className="font-body text-xs font-medium text-[#F6F4EF]/75">
                  {GLOBAL_METRICS.units} units · {GLOBAL_METRICS.topics}{' '}
                  topics · {GLOBAL_METRICS.workedExamples} worked examples
                </span>
                <span aria-hidden="true" className="text-[#DFBC91]/70">
                  ·
                </span>
                <button
                  type="button"
                  onClick={openWorkspace}
                  className="twilight-link font-body text-xs font-semibold"
                >
                  Open the workspace
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="twilight-quote mx-auto mt-10 max-w-[30ch] font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.18] text-[#F6F4EF]">
                &ldquo;Start anywhere. The first clause is{' '}
                <span className="text-[#DFBC91]">already waiting</span>
                .&rdquo;
              </blockquote>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#DFBC91]/85">
                The twilight door · 2018–2028 spec
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <button
                type="button"
                onClick={startReading}
                data-testid="twilight-footer-start"
                className="twilight-btn-glass-dark mt-10 inline-flex h-12 items-center gap-2 rounded-full px-7 font-body text-sm font-semibold text-[#F6F4EF]"
              >
                Start reading
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </Reveal>
          </section>

          {/* ————— the diagonal footer shell ————— */}
          <footer
            data-testid="twilight-footer"
            className="relative w-full overflow-hidden"
            style={{
              clipPath: 'polygon(0 3.5rem, 100% 0, 100% 100%, 0 100%)',
              WebkitClipPath: 'polygon(0 3.5rem, 100% 0, 100% 100%, 0 100%)',
              backgroundColor: '#232934',
            }}
          >
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <WaterCanvas
                art={WATER_ART_FOOTER}
                imageAspect={1200 / 420}
                colorBack="#232934"
                colorHighlight="#DFBC91"
                params={FOOTER_WATER}
                budget={FOOTER_BUDGET}
                active={footerLive}
                reducedMotion={osReducedMotion}
                testId="twilight-water-footer"
              />
            </div>
            <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8 sm:pt-16">
              {/* the reference seats its footer row in one big glass bar */}
              <div
                className="rounded-[24px] border p-6 sm:p-8"
                style={{
                  background: 'rgba(18, 22, 29, 0.58)',
                  WebkitBackdropFilter: 'blur(14px)',
                  backdropFilter: 'blur(14px)',
                  borderColor: 'rgba(246, 241, 231, 0.16)',
                }}
              >
              <div className="flex flex-wrap items-end justify-between gap-8">
                <div>
                  <p className="font-display text-sm font-semibold tracking-wide text-[#F6F4EF]">
                    IAL CHEM ·{' '}
                    <span className="text-[#DFBC91]">
                      the twilight front door
                    </span>
                  </p>
                  <p className="mt-2 max-w-[52ch] font-body text-xs leading-relaxed text-[#F6F4EF]/60">
                    Pearson Edexcel International A Level Chemistry (2018
                    specification), WCH11–WCH16. Progress and reading time
                    stay in your browser.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/"
                    className="twilight-btn hidden h-9 items-center gap-1.5 rounded-full px-4 font-body text-xs font-semibold text-[#F6F4EF] sm:inline-flex"
                  >
                    Daylight door
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'auto' })
                    }
                    className="twilight-btn-dark inline-flex h-9 items-center gap-1.5 rounded-full px-4 font-body text-xs font-semibold"
                  >
                    Back to top
                    <ArrowUp size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div
                className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                style={{ borderColor: 'rgba(246, 244, 239, 0.14)' }}
              >
                <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {[
                    ['The workspace', '/club'],
                    ['The spec index', '/club?v=spec'],
                    ['The pack bench', '/club?v=pack'],
                    ['The candy lab', '/candy'],
                    ['Legal', '/club/legal'],
                  ].map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      className="twilight-footer-link font-body text-xs"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <p className="max-w-[56ch] font-body text-[11px] leading-relaxed text-[#F6F4EF]/45">
                  IAL CHEM is an independent revision resource, not affiliated
                  with, sponsored or endorsed by Pearson Education Ltd. Edexcel
                  and Pearson are registered trademarks of Pearson Education
                  Ltd.
                </p>
              </div>
              </div>
            </div>
          </footer>
        </div>

        {/* ————— the right scroll rail ————— */}
        <ScrollRail reducedMotion={osReducedMotion} />
      </div>
    </MotionConfig>
  );
}

/* the right-edge thread with the glowing node — the reference's rail */
function ScrollRail({ reducedMotion }: { reducedMotion: boolean }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  if (reducedMotion) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-64 w-4 -translate-y-1/2 lg:block xl:right-6"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#F6F4EF]/14" />
      <motion.div
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
        style={{
          y,
          backgroundColor: '#DFBC91',
          boxShadow: '0 0 12px rgba(223, 188, 145, 0.8)',
        }}
      />
    </div>
  );
}
