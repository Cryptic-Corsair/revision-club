'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/* the lumen shared primitives — the entrance voice and the section
   heading, so every band across the page settles the same way. */

export const EASE_LUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
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
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: EASE_LUM, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  dot = 'var(--lum-green)',
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
    <Reveal className="lum-head">
      <span className="lum-eyebrow">
        <span className="dot" style={{ background: dot, boxShadow: `0 0 10px ${dot}` }} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {lead && <p className="lum-lead">{lead}</p>}
    </Reveal>
  );
}

/** the liquid seam — where a band rises out of the page, its top edge
 *  is the curve a liquid makes against glass, in the band's own colour
 *  (inherited through `color`) */
export function Meniscus() {
  return (
    <div className="lum-meniscus" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0 30 C 240 58, 420 2, 660 30 C 900 58, 1080 6, 1290 28 C 1350 34, 1400 30, 1440 26 L 1440 60 L 0 60 Z" />
      </svg>
    </div>
  );
}
