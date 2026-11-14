'use client';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { KeystrokeMachine } from '../showcase/KeystrokeMachine';
import { PackFlowMachine } from '../showcase/PackFlowMachine';
import { PrismSweepMachine } from '../showcase/PrismSweepMachine';
import { ChronoWaveMachine } from '../showcase/ChronoWaveMachine';
import { SectionBackdrop } from '../motion/SectionBackdrop';
import { EASE_EXPO, VIEWPORT_ONCE } from '../../lib/motion';
import { useCalmScale, useRoomLive } from '../../lib/still';

interface ShowcaseCarouselProps {
  reducedMotion: boolean;
}

const SHOWCASE_CARDS = [
  {
    id: 'command',
    index: '01',
    title: 'Search that starts at ⌘K',
    description:
      'Type a statement number, a topic, a word from a definition — enter opens it.',
    renderMachine: (reducedMotion: boolean) => (
      <KeystrokeMachine reducedMotion={reducedMotion} />
    ),
  },
  {
    id: 'compiler',
    index: '02',
    title: 'Packs instead of chapters',
    description:
      'Tick the spec points you\u2019re revising; read one continuous pack, not six documents.',
    renderMachine: (reducedMotion: boolean) => (
      <PackFlowMachine reducedMotion={reducedMotion} />
    ),
  },
  {
    id: 'themes',
    index: '03',
    title: 'Four rooms to work in',
    description:
      'Night, Light, Dune and Classic — whichever is easiest on your eyes tonight.',
    renderMachine: (reducedMotion: boolean) => (
      <PrismSweepMachine reducedMotion={reducedMotion} />
    ),
  },
  {
    id: 'progress',
    index: '04',
    title: 'Progress that stays private',
    description:
      'Reading time and finished topics, saved in your browser. No account anywhere.',
    renderMachine: (reducedMotion: boolean) => (
      <ChronoWaveMachine reducedMotion={reducedMotion} />
    ),
  },
] as const;

/* The four cards live in their own memoized component. The track's
   scroll handler updates the counter and the button states on every
   scroll event; with the cards behind a memo boundary those updates
   re-render only the header row — never the four machines riding the
   glide. Before this split, every scroll event re-rendered the whole
   carousel mid-glide and the smooth scroll visibly stuttered. */
const ShowcaseCards = memo(function ShowcaseCards({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const calm = useCalmScale();
  return (
    <>
      {SHOWCASE_CARDS.map((card, i) => (
        <motion.article
          key={card.id}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{
            duration: 0.55 * calm,
            ease: EASE_EXPO,
            delay: reducedMotion ? 0 : i * 0.07 * calm,
          }}
          className="flex w-[86vw] sm:w-[340px] lg:w-[360px] shrink-0 snap-start flex-col justify-between rounded-3xl p-4 sm:p-5"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {card.renderMachine(reducedMotion)}

          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold tracking-tight">
                {card.title}
              </h3>
              <span
                className="font-mono text-[11px] tabular-nums"
                style={{ color: 'var(--ink-muted)' }}
              >
                {card.index}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--ink-muted)' }}
            >
              {card.description}
            </p>
          </div>
        </motion.article>
      ))}
    </>
  );
});

export function ShowcaseCarousel({ reducedMotion }: ShowcaseCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  // The track reserves a trailing card-width runway, so every card can
  // reach a true flush-left snap point at every viewport size. Button
  // state follows the actual scroll bounds, never an unreachable target.
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  // the showcase is a motion room: its machines' own visibility
  // observers do the frame-level gating, the referee owns the room
  const { ref: roomRef, live: roomLive } = useRoomLive<HTMLElement>();

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    if (children.length === 0) return;

    const currentScroll = track.scrollLeft;
    let closestIndex = 0;
    let minDiff = Infinity;
    children.forEach((child, idx) => {
      const diff = Math.abs(child.offsetLeft - currentScroll);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    // functional update: React bails out when the index hasn't moved,
    // so a smooth scroll across one card re-renders at most once
    setActiveSlide((prev) => (prev === closestIndex ? prev : closestIndex));

    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(currentScroll > 2);
    setCanNext(currentScroll < max - 2);
  }, []);

  // scroll events arrive faster than frames; one sync per frame is
  // all the button state and the counter can visibly use
  const scheduleSync = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = 0;
      syncScrollState();
    });
  }, [syncScrollState]);

  useEffect(() => {
    syncScrollState();
    window.addEventListener('resize', scheduleSync);
    return () => {
      window.removeEventListener('resize', scheduleSync);
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = 0;
      }
    };
  }, [syncScrollState, scheduleSync]);

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(SHOWCASE_CARDS.length - 1, index));
    const targetChild = track.children[clamped] as HTMLElement | undefined;
    if (!targetChild) return;
    const max = track.scrollWidth - track.clientWidth;
    const left = Math.min(targetChild.offsetLeft, max);
    if (Math.abs(left - track.scrollLeft) < 4) {
      syncScrollState();
      return;
    }
    track.scrollTo({
      left,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="showcase"
      ref={roomRef}
      className="relative py-20 sm:py-28"
      data-live={roomLive}
    >
      {/* The hero's ring-and-wave backdrop, tuned for this room */}
      <SectionBackdrop variant="showcase" reducedMotion={reducedMotion} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header with Prev/Next and Slide Counter */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="portal-kicker">The details</p>
            <h2 className="portal-h2">
              The parts you'll touch{' '}
              <span className="accent">every day.</span>
            </h2>
            <p className="portal-lede">
              Four things you'll use every session — search, packs,
              themes and your progress — each thought through properly.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              data-testid="showcase-counter"
              className="font-mono text-xs tabular-nums"
              style={{ color: 'var(--ink-muted)' }}
            >
              0{activeSlide + 1} / 0{SHOWCASE_CARDS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous showcase card"
                onClick={() => scrollToSlide(activeSlide - 1)}
                disabled={!canPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 disabled:opacity-35"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--ink)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next showcase card"
                onClick={() => scrollToSlide(activeSlide + 1)}
                disabled={!canNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 disabled:opacity-35"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--ink)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Card Track — snap-proximity, not
            mandatory: a mandatory snap fights every free wheel/trackpad
            gesture on a track that barely overflows, jerking the row
            back to the nearest card mid-glide. Proximity keeps the
            flush alignment after the buttons and a swipe's settle, but
            lets a small gesture rest where the visitor left it. */}
        <div
          ref={trackRef}
          onScroll={scheduleSync}
          className="portal-showcase-track relative mt-10 flex gap-5 overflow-x-auto pb-2 snap-x snap-proximity no-scrollbar"
        >
          <ShowcaseCards reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
