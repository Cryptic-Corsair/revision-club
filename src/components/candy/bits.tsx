'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motionAllowed } from './lib';

/* ═══════════════════════════════════════════════════════════════════════
   the candy lab's shared primitives — the entrance voice, the section
   heading, and the blob seams between bands.

   The reveal engine is deliberately NOT framer's whileInView: measured
   on the live page, whileInView raced hydration and the font swap, and
   whole bands could end up permanently stuck at opacity 0 (8 of 26
   sampled elements after one ordinary scroll sweep). This engine is the
   house pattern instead — the same IntersectionObserver gating the
   site's other front doors use for their loops:

   · server HTML is visible (no-JS and crawlers see everything);
   · on mount, motion allowed, below the fold → hidden + observed;
     one IO tick adds .cd-in exactly once — it can never stick;
   · already in the first viewport → a quick, delayed load-in;
   · reduced motion / motion-off → never hidden at all.
   ═══════════════════════════════════════════════════════════════════════ */

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  onIn,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** fires once when the element reveals (the answer pill's confetti) */
  onIn?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onInRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    onInRef.current = onIn;
  }, [onIn]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    const setVars = () => {
      el.style.setProperty('--rd', `${delay}s`);
      el.style.setProperty('--ry', `${Math.max(0, Math.min(y, 60))}px`);
    };
    let io: IntersectionObserver | null = null;

    if (r.top >= vh) {
      /* below the fold: hide, observe, reveal exactly once on arrival */
      setVars();
      el.classList.add('cd-pre');
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              el.classList.add('cd-in');
              io?.disconnect();
              onInRef.current?.();
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -7% 0px' },
      );
      io.observe(el);
    } else if (r.bottom > 0) {
      /* in the first viewport: a short load-in choreography */
      setVars();
      el.classList.add('cd-pre');
      /* double rAF so the hidden state is committed before the reveal */
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.classList.add('cd-in');
          onInRef.current?.();
        }),
      );
      return () => cancelAnimationFrame(id);
    }
    /* else: scrolled past (hash landing) — stays visible, no animation */

    return () => io?.disconnect();
  }, [delay, y]);

  return (
    <div ref={ref} className={`cd-reveal${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}

export function SectionHead({
  dot = 'var(--cd-coral)',
  eyebrow,
  title,
  lead,
}: {
  dot?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <Reveal className="cd-head">
      <span className="cd-eyebrow">
        <span className="dot" style={{ background: dot }} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {lead && <p className="cd-lead">{lead}</p>}
    </Reveal>
  );
}

/* the blob seam — where one band melts into the next. Position the
   divider just outside the band's edge and let it carry the OTHER
   band's colour, so the seam reads as a soft melt, not a hard edge. */
const BLOBS: Record<string, string> = {
  melt:
    'M0 40 C 140 10, 300 66, 480 38 C 660 10, 800 62, 980 40 C 1160 18, 1300 58, 1440 34 L 1440 100 L 0 100 Z',
  drips:
    'M0 52 C 120 22, 260 8, 420 34 C 560 56, 640 12, 800 26 C 960 40, 1080 64, 1220 40 C 1320 24, 1380 34, 1440 46 L 1440 100 L 0 100 Z',
  bubble:
    'M0 44 C 180 70, 340 14, 540 40 C 720 62, 860 10, 1040 36 C 1200 58, 1330 24, 1440 44 L 1440 100 L 0 100 Z',
};

export function BlobDivider({
  kind = 'melt',
  at = 'top',
  color,
}: {
  kind?: keyof typeof BLOBS;
  at?: 'top' | 'bottom';
  color?: string;
}) {
  return (
    <div
      className={`cd-blobdiv ${at}`}
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d={BLOBS[kind]} />
      </svg>
    </div>
  );
}
