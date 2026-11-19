'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/* the candy lab's shared primitives — the springy entrance voice, the
   section heading, and the blob seams between bands. */

export const EASE_CD: [number, number, number, number] = [0.2, 1.3, 0.4, 1];

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: EASE_CD, delay }}
    >
      {children}
    </motion.div>
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
