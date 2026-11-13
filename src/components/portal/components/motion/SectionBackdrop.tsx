'use client';
import { motion } from 'framer-motion';

interface SectionBackdropProps {
  variant: 'showcase' | 'workflow' | 'lab' | 'units';
  reducedMotion: boolean;
}

/* ————— the section backdrops —————
   The hero's own decorative language, carried into the rooms below:
   thin concentric rings blooming behind the content and (in the
   units room) the faint vertical columns the hero's architectural
   grid draws. The hairline waves are gone — the page's one wave is
   the footer's — so the rings carry the rooms alone, re-inked
   through .portal-bd-* classes: pale sand on the chocolate ground
   by night, cocoa on cream by day. */

interface RingSpec {
  cx: number;
  cy: number;
  start: number;
  step: number;
  count: number;
}

const RINGS: Record<SectionBackdropProps['variant'], RingSpec> = {
  showcase: { cx: 1150, cy: 150, start: 90, step: 70, count: 6 },
  workflow: { cx: 190, cy: 560, start: 80, step: 78, count: 5 },
  lab: { cx: 720, cy: 620, start: 84, step: 74, count: 6 },
  units: { cx: 720, cy: 130, start: 72, step: 66, count: 7 },
};

const COLUMN_XS = [120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320];

export function SectionBackdrop({ variant }: SectionBackdropProps) {
  const ring = RINGS[variant];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-testid={`section-backdrop-${variant}`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        role="presentation"
      >
        {variant === 'units' && (
          <g className="portal-bd-faint" strokeWidth={1}>
            {COLUMN_XS.map((x) => (
              <line key={x} x1={x} y1={-20} x2={x} y2={780} />
            ))}
          </g>
        )}

        <g strokeWidth={1.2}>
          {Array.from({ length: ring.count }, (_, i) => (
            <circle
              key={i}
              cx={ring.cx}
              cy={ring.cy}
              r={ring.start + i * ring.step}
              className="portal-bd-line"
              opacity={Math.max(0.85 - i * 0.09, 0.3)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
