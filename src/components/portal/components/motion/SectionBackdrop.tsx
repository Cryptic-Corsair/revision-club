'use client';
import { motion } from 'framer-motion';

interface SectionBackdropProps {
  variant: 'showcase' | 'workflow' | 'units';
  reducedMotion: boolean;
}

/* ————— the section backdrops —————
   The hero's own decorative language, carried into the rooms below:
   thin concentric rings blooming behind the content, two or three
   hairline waves crossing the full width, and (in the units room)
   the faint vertical columns the hero's architectural grid draws.
   Everything is stroked through .portal-bd-* classes so the rings
   re-ink themselves with the dress — pale sand on the chocolate
   ground by night, cocoa on cream by day — with the amber roast and
   sea-glass keeping their posts as the accent pair. The waves drift
   on a very slow lozenge loop; reduced motion hangs them still. */

interface RingSpec {
  cx: number;
  cy: number;
  start: number;
  step: number;
  count: number;
}

interface WaveSpec {
  d: string;
  tone: 'line' | 'accent' | 'warm';
  group: 'a' | 'b';
  width: number;
}

const RINGS: Record<SectionBackdropProps['variant'], RingSpec> = {
  showcase: { cx: 1150, cy: 150, start: 90, step: 70, count: 6 },
  workflow: { cx: 190, cy: 560, start: 80, step: 78, count: 5 },
  units: { cx: 720, cy: 130, start: 72, step: 66, count: 7 },
};

const WAVES: Record<SectionBackdropProps['variant'], WaveSpec[]> = {
  showcase: [
    {
      d: 'M -60 470 C 260 428, 540 512, 880 470 S 1300 420, 1500 478',
      tone: 'accent',
      group: 'a',
      width: 1.4,
    },
    {
      d: 'M -60 540 C 300 505, 620 575, 980 535 S 1330 505, 1500 545',
      tone: 'line',
      group: 'a',
      width: 1.1,
    },
    {
      d: 'M -60 610 C 340 570, 700 650, 1060 606 S 1380 574, 1500 616',
      tone: 'warm',
      group: 'b',
      width: 1.2,
    },
  ],
  workflow: [
    {
      d: 'M -60 150 C 320 118, 640 186, 1000 148 S 1360 118, 1500 156',
      tone: 'line',
      group: 'a',
      width: 1.1,
    },
    {
      d: 'M -60 640 C 380 600, 760 676, 1120 636 S 1400 606, 1500 644',
      tone: 'accent',
      group: 'b',
      width: 1.4,
    },
    {
      d: 'M -60 700 C 400 668, 800 730, 1200 696 S 1420 672, 1500 700',
      tone: 'warm',
      group: 'b',
      width: 1.1,
    },
  ],
  units: [
    {
      d: 'M -60 560 C 300 520, 620 600, 960 556 S 1340 516, 1500 566',
      tone: 'accent',
      group: 'a',
      width: 1.4,
    },
    {
      d: 'M -60 628 C 340 592, 680 664, 1040 622 S 1380 592, 1500 630',
      tone: 'line',
      group: 'a',
      width: 1.1,
    },
    {
      d: 'M -60 692 C 420 656, 840 724, 1220 686 S 1440 662, 1500 694',
      tone: 'warm',
      group: 'b',
      width: 1.2,
    },
  ],
};

const COLUMN_XS = [120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320];

const DRIFT_A = { x: [0, 24, 0], y: [0, -6, 0] };
const DRIFT_B = { x: [0, -18, 0], y: [0, 5, 0] };
const DRIFT_TRANSITION = (seconds: number) => ({
  duration: seconds,
  repeat: Infinity,
  ease: 'easeInOut' as const,
});

export function SectionBackdrop({ variant, reducedMotion }: SectionBackdropProps) {
  const ring = RINGS[variant];
  const waves = WAVES[variant];
  const groupA = waves.filter((w) => w.group === 'a');
  const groupB = waves.filter((w) => w.group === 'b');

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

        <motion.g
          animate={reducedMotion ? undefined : DRIFT_A}
          transition={DRIFT_TRANSITION(26)}
        >
          {groupA.map((w, i) => (
            <path
              key={i}
              d={w.d}
              className={`portal-bd-${w.tone}`}
              strokeWidth={w.width}
              strokeLinecap="round"
            />
          ))}
        </motion.g>

        <motion.g
          animate={reducedMotion ? undefined : DRIFT_B}
          transition={DRIFT_TRANSITION(32)}
        >
          {groupB.map((w, i) => (
            <path
              key={i}
              d={w.d}
              className={`portal-bd-${w.tone}`}
              strokeWidth={w.width}
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
