'use client';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SiteTheme } from '../../data/ialData';
import { useRoomLive } from '../../lib/still';
import { KineticInterludeCanvas } from '../motion/KineticInterludeCanvas';

interface KineticInterludeProps {
  theme: SiteTheme;
  reducedMotion: boolean;
  /* the closing exits — the old pre-footer CTA stage folded into
     this room, so the page's final word and its buttons live
     together on the descent's last step */
  onStartReading: () => void;
  onOpenSpecIndex: () => void;
}

/* The closing room. The kinetic lattice breathes behind two display
   lines that slide apart on scroll, and beneath them — where the old
   floating "ready to revise" stage used to stand alone — the page's
   final word: one honest sentence, the two real exits, and the
   reassurance. The footer's wave pours this room's ground straight
   into the cocoa band from here. */
export function KineticInterlude({
  theme,
  reducedMotion,
  onStartReading,
  onOpenSpecIndex,
}: KineticInterludeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  // the closing room is a motion room too: its lattice breathes only
  // while the referee has this room on stage
  const { live: roomLive } = useRoomLive(sectionRef);
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
  });

  const topTrackX = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['-6%', '4%'],
  );
  const bottomTrackX = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['6%', '-4%'],
  );

  return (
    <section
      ref={sectionRef}
      aria-label="In closing"
      className="relative w-full overflow-hidden py-16 sm:py-24"
      data-live={roomLive}
    >
      <KineticInterludeCanvas
        theme={theme}
        velocitySmooth={smoothVelocity}
        reducedMotion={reducedMotion}
        live={roomLive}
      />

      {/* Top & Bottom Opposite-Sliding Editorial Tracks */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-5 px-6 text-center sm:gap-7">
        <div className="w-full overflow-hidden py-1">
          <motion.p
            style={{
              x: topTrackX,
              fontSize: 'clamp(1.85rem, 5.1vw, 4.65rem)',
              color: 'var(--ink)',
            }}
            className="text-balance font-display font-bold leading-[1.12] sm:whitespace-nowrap"
          >
            Six units. Thirty-three topics.
          </motion.p>
        </div>

        {/* Floating Center Coordinate Label */}
        <div
          className="inline-flex items-center rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase tabular-nums"
          style={{
            borderColor: 'var(--border-strong)',
            backgroundColor: 'var(--surface)',
            color: 'var(--ink-muted)',
          }}
        >
          WCH11 — WCH16
        </div>

        <div className="w-full overflow-hidden py-2">
          <motion.p
            style={{
              x: bottomTrackX,
              fontSize: 'clamp(1.6rem, 4.15vw, 3.85rem)',
              color: 'var(--ink)',
            }}
            className="text-balance font-display font-bold leading-[1.14] sm:whitespace-nowrap"
          >
            More{' '}
            <span style={{ color: 'var(--accent)' }}>
              lesson
            </span>{' '}
            than textbook.
          </motion.p>
        </div>
      </div>

      {/* The closing word — the exits that used to float between this
          room and the footer, standing in the room where they belong */}
      <div className="relative z-10 mx-auto mt-14 max-w-2xl px-6 text-center sm:mt-20">
        <p className="portal-kicker justify-center">When you're ready</p>
        <h2 className="portal-h2" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)' }}>
          Start at <span className="accent">topic one.</span>
        </h2>
        <p className="portal-lede mx-auto">
          The notes open straight into the reading — no sign-up, nothing
          to set up first.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartReading}
            className="portal-candy-btn group inline-flex h-12 items-center gap-2 rounded-full px-6 font-display text-sm font-semibold whitespace-nowrap shrink-0"
          >
            <span>Start reading</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={onOpenSpecIndex}
            className="inline-flex h-12 items-center rounded-full px-6 font-display text-sm font-semibold transition-transform duration-200 hover:-translate-y-px whitespace-nowrap shrink-0"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--ink)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            Browse the spec index
          </button>
        </div>

        <p
          className="mt-7 font-mono text-[11px] tracking-[0.14em] uppercase tabular-nums"
          style={{ color: 'var(--ink-muted)' }}
        >
          No account — your progress stays in this browser
        </p>
      </div>
    </section>
  );
}
