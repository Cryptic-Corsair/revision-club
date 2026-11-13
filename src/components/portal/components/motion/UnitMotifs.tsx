'use client';
import { motion } from 'framer-motion';
import { useId } from 'react';
import { HAIRLINE, HAIRLINE_FAINT } from './LabGraphics';
import { StillProvider, useLive, useStill } from '../../lib/still';

/* ————— the unit motifs —————
   Six miniature motion graphics, one per syllabus unit, cut from
   the same line-art shelf as the living laboratory's tiles but at
   card-stage scale (360×140): an atom for structure and bonding,
   the activation hill for energetics and kinetics, the falling
   drop for practical skills, two populations exchanging at
   equilibrium, a ligand shell swapping hands, and a distillation
   running its column. Every loop rides the dress tokens and
   freezes to an honest still under reduced motion. */

export type UnitMotifId =
  | 'atom'
  | 'hill'
  | 'drop'
  | 'equilibrate'
  | 'complex'
  | 'distill';

type MotifProps = { reducedMotion: boolean };

/* ————— atom — two tilted shells, two electrons ————— */
function AtomMotif({ reducedMotion }: MotifProps) {
  const still = useStill(reducedMotion);
  const shells = [
    { tilt: -18, rx: 46, ry: 16, dur: 4.6, electron: 'var(--accent)' },
    { tilt: 30, rx: 62, ry: 21, dur: 8, electron: 'var(--accent-warm)' },
  ];
  return (
    <svg viewBox="0 0 360 140" className="block h-auto w-full" aria-hidden="true">
      <motion.circle
        cx={180}
        cy={70}
        r={11}
        style={{ fill: 'var(--accent)' }}
        animate={still ? undefined : { opacity: [0.1, 0.22, 0.1] }}
        transition={still ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={180} cy={70} r={6} style={{ fill: 'var(--accent)' }} />
      {shells.map((shell) => (
        <g key={shell.tilt} transform={`rotate(${shell.tilt} 180 70)`}>
          <ellipse
            cx={180}
            cy={70}
            rx={shell.rx}
            ry={shell.ry}
            fill="none"
            style={{ stroke: HAIRLINE }}
            strokeWidth={1.1}
          />
          <motion.g
            animate={
              still
                ? undefined
                : { rotate: shell.dur > 7 ? -360 : 360 }
            }
            transition={
              still
                ? undefined
                : { duration: shell.dur, repeat: Infinity, ease: 'linear' }
            }
            style={{ transformBox: 'view-box', transformOrigin: '180px 70px' }}
          >
            <circle cx={180 + shell.rx} cy={70} r={2.8} style={{ fill: shell.electron }} />
            <circle cx={180 + shell.rx} cy={70} r={5.5} style={{ fill: shell.electron, opacity: 0.2 }} />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

/* ————— hill — the Ea hump with a parcel crossing ————— */
const MINI_HILL =
  'M 40 96 C 84 96, 118 46, 160 46 C 202 46, 224 108, 272 108 L 312 108';

function HillMotif({ reducedMotion }: MotifProps) {
  const still = useStill(reducedMotion);
  const ride = {
    duration: 3.4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    repeatDelay: 0.7,
  };
  return (
    <svg viewBox="0 0 360 140" className="block h-auto w-full" aria-hidden="true">
      <path d="M 40 96 H 272" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1} strokeDasharray="2 5" />
      <path
        d={MINI_HILL}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <motion.path
        d={MINI_HILL}
        fill="none"
        style={{ stroke: 'var(--accent)' }}
        strokeWidth={1.8}
        strokeLinecap="round"
        initial={still ? false : { pathLength: 0 }}
        animate={still ? undefined : { pathLength: [0, 1] }}
        transition={still ? undefined : ride}
      />
      <motion.circle
        r={5}
        style={{ fill: 'var(--accent)' }}
        animate={
          still
            ? { cx: 40, cy: 96, opacity: 0.4 }
            : {
                cx: [40, 100, 160, 216, 272],
                cy: [96, 62, 46, 84, 108],
                opacity: [0, 1, 1, 1, 0.85],
              }
        }
        transition={still ? undefined : { ...ride, times: [0, 0.25, 0.5, 0.72, 1] }}
      />
      <path d="M 300 96 V 108" style={{ stroke: 'var(--accent-warm)' }} strokeWidth={1.2} />
    </svg>
  );
}

/* ————— drop — the burette metronome ————— */
function DropMotif({ reducedMotion }: MotifProps) {
  const still = useStill(reducedMotion);
  const clipId = `unit-burette-clip-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 360 140" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x={172} y={14} width={16} height={50} />
        </clipPath>
      </defs>
      {/* the charge, draining */}
      <g clipPath={`url(#${clipId})`}>
        <motion.rect
          x={172}
          width={16}
          style={{ fill: 'var(--accent)', opacity: 0.26 }}
          animate={
            still
              ? { y: 22, height: 42 }
              : { y: [22, 52, 22], height: [42, 12, 42] }
          }
          transition={still ? undefined : { duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      </g>
      {[28, 40, 52].map((y) => (
        <path key={y} d={`M 175 ${y} H 185`} style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1} />
      ))}
      <path
        d="M 172 14 V 64 M 188 14 V 64 M 168 68 H 192 M 176 74 V 84 M 184 74 V 84"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* the drops */}
      {[0, 0.65].map((delay, i) => (
        <motion.circle
          key={i}
          cx={180}
          r={2.8}
          cy={86}
          style={{ fill: 'var(--accent)' }}
          animate={
            still
              ? { cy: 104, opacity: 0.5 }
              : { cy: [86, 104, 108, 108], opacity: [0, 0.9, 0.9, 0] }
          }
          transition={
            still
              ? { duration: 0.5, delay: i * 0.25 }
              : { duration: 1.3, repeat: Infinity, ease: 'easeIn', delay, times: [0, 0.5, 0.9, 1] }
          }
        />
      ))}
      {/* the pool and its rings */}
      <rect
        x={132}
        y={104}
        width={96}
        height={22}
        rx={8}
        style={{ fill: 'var(--accent)', opacity: 0.18 }}
      />
      {[0.55, 1.2].map((delay, i) => (
        <motion.ellipse
          key={i}
          cx={180}
          cy={110}
          ry={1}
          style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.1 }}
          animate={
            still
              ? { rx: 6, opacity: 0.2 }
              : { rx: [2, 13], opacity: [0.45, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.2 }
              : { duration: 1.3, repeat: Infinity, ease: 'easeOut', delay }
          }
        />
      ))}
    </svg>
  );
}

/* ————— equilibrate — two populations exchanging ————— */
function EquilibrateMotif({ reducedMotion }: MotifProps) {
  const still = useStill(reducedMotion);
  const forward = [
    { dur: 3.4, delay: 0 },
    { dur: 3.9, delay: 1.4 },
    { dur: 4.4, delay: 2.6 },
  ];
  const reverse = [
    { dur: 3.1, delay: 0.7 },
    { dur: 3.6, delay: 2.0 },
  ];
  return (
    <svg viewBox="0 0 360 140" className="block h-auto w-full" aria-hidden="true">
      <rect x={56} y={48} width={62} height={44} rx={7} fill="none" style={{ stroke: HAIRLINE }} strokeWidth={1.4} />
      <rect x={242} y={48} width={62} height={44} rx={7} fill="none" style={{ stroke: HAIRLINE }} strokeWidth={1.4} />
      <text
        x={87}
        y={40}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 9,
          letterSpacing: '0.14em',
        }}
      >
        A
      </text>
      <text
        x={273}
        y={40}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 9,
          letterSpacing: '0.14em',
        }}
      >
        B
      </text>
      <path d="M 118 70 H 242" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.1} strokeDasharray="2 5" />
      {forward.map((run, i) => (
        <motion.circle
          key={`f-${i}`}
          cy={70}
          r={2.6}
          style={{ fill: 'var(--accent)' }}
          animate={
            still
              ? { cx: 180, opacity: 0.5 }
              : { cx: [118, 158, 202, 242], opacity: [0, 0.9, 0.9, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.15 }
              : { duration: run.dur, repeat: Infinity, ease: 'easeInOut', delay: run.delay, times: [0, 0.15, 0.85, 1] }
          }
        />
      ))}
      {reverse.map((run, i) => (
        <motion.circle
          key={`r-${i}`}
          cy={70}
          r={2.6}
          style={{ fill: 'var(--accent-warm)' }}
          animate={
            still
              ? { cx: 180, opacity: 0.5 }
              : { cx: [242, 202, 158, 118], opacity: [0, 0.9, 0.9, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.15 }
              : { duration: run.dur, repeat: Infinity, ease: 'easeInOut', delay: run.delay, times: [0, 0.15, 0.85, 1] }
          }
        />
      ))}
      {/* residents breathing */}
      {[
        { x: 72, y: 60 },
        { x: 92, y: 80 },
        { x: 108, y: 60 },
        { x: 260, y: 60 },
        { x: 290, y: 80 },
      ].map((dot, i) => (
        <motion.circle
          key={`res-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={2.2}
          style={{ fill: 'var(--ink-muted)' }}
          animate={still ? { opacity: 0.6 } : { opacity: [0.35, 0.8, 0.35] }}
          transition={
            still
              ? undefined
              : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }
          }
        />
      ))}
    </svg>
  );
}

/* ————— complex — a ligand shell, one slowly orbiting ————— */
function ComplexMotif({ reducedMotion }: MotifProps) {
  const still = useStill(reducedMotion);
  const ligands = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i);
    return { x: 180 + 30 * Math.cos(angle), y: 70 + 30 * Math.sin(angle) };
  });
  return (
    <svg viewBox="0 0 360 140" className="block h-auto w-full" aria-hidden="true">
      <circle cx={180} cy={70} r={30} fill="none" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1} />
      <motion.g
        animate={still ? undefined : { rotate: 360 }}
        transition={still ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ transformBox: 'view-box', transformOrigin: '180px 70px' }}
      >
        {ligands.map((ligand, i) => (
          <g key={i}>
            <path
              d={`M 180 70 L ${ligand.x.toFixed(1)} ${ligand.y.toFixed(1)}`}
              style={{ stroke: HAIRLINE_FAINT }}
              strokeWidth={1}
            />
            <circle
              cx={ligand.x}
              cy={ligand.y}
              r={3.4}
              style={{ fill: i % 2 ? 'var(--accent-warm)' : 'var(--accent)', opacity: 0.9 }}
            />
          </g>
        ))}
      </motion.g>
      <circle
        cx={180}
        cy={70}
        r={10}
        style={{ fill: 'var(--surface-elevated)', stroke: HAIRLINE, strokeWidth: 1.2 }}
      />
      {/* a lone ligand drifting in from outside */}
      <motion.circle
        r={3}
        style={{ fill: 'var(--accent)' }}
        animate={
          still
            ? { cx: 232, cy: 40, opacity: 0.4 }
            : {
                cx: [232, 218, 210, 210],
                cy: [40, 50, 55, 40],
                opacity: [0.15, 0.7, 0.9, 0.15],
              }
        }
        transition={
          still
            ? undefined
            : { duration: 5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.75, 1] }
        }
      />
    </svg>
  );
}

/* ————— distill — the column handing vapour to a receiver ————— */
function DistillMotif({ reducedMotion }: MotifProps) {
  const still = useStill(reducedMotion);
  const id = useId().replace(/:/g, '');
  const flaskClipId = `unit-still-flask-clip-${id}`;
  const receiverClipId = `unit-receiver-clip-${id}`;
  return (
    <svg viewBox="0 0 360 140" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id={flaskClipId}>
          <circle cx={88} cy={106} r={17} />
        </clipPath>
        <clipPath id={receiverClipId}>
          <path d="M 178 62 L 224 62 L 224 108 Q 224 113 219 113 L 183 113 Q 178 113 178 108 Z" />
        </clipPath>
      </defs>
      {/* the boiling flask */}
      <g clipPath={`url(#${flaskClipId})`}>
        <rect x={71} y={100} width={34} height={24} style={{ fill: 'var(--accent)', opacity: 0.22 }} />
      </g>
      <circle cx={88} cy={106} r={18} fill="none" style={{ stroke: HAIRLINE }} strokeWidth={1.4} />
      <path d="M 66 126 H 110" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.1} strokeLinecap="round" />
      {/* the column */}
      <path
        d="M 83 96 V 46 M 93 96 V 46"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path d="M 83 82 H 93 M 83 68 H 93" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1} />
      {/* vapour climbing */}
      {[
        { x: 85, dur: 2.4, delay: 0 },
        { x: 91, dur: 2.8, delay: 0.7 },
        { x: 85, dur: 3.0, delay: 1.4 },
      ].map((vap, i) => (
        <motion.circle
          key={i}
          cx={vap.x}
          r={2}
          cy={88}
          style={{ fill: 'var(--accent-warm)' }}
          animate={
            still
              ? { cy: 60, opacity: 0.4 }
              : { cy: [88, 62, 50, 50], opacity: [0, 0.8, 0.8, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.15 }
              : { duration: vap.dur, repeat: Infinity, ease: 'easeOut', delay: vap.delay, times: [0, 0.25, 0.875, 1] }
          }
        />
      ))}
      {/* the delivery arm */}
      <path
        d="M 93 46 H 122 L 146 66 M 93 54 H 116 L 138 72 M 138 72 L 146 66"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* the drip */}
      {[0, 0.5].map((delay, i) => (
        <motion.circle
          key={`d-${i}`}
          cx={142}
          r={2.2}
          cy={74}
          style={{ fill: 'var(--accent)' }}
          animate={
            still
              ? { cy: 100, opacity: 0.5 }
              : { cy: [74, 100, 106, 106], opacity: [0, 1, 1, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.2 }
              : { duration: 1, repeat: Infinity, ease: 'easeIn', delay, times: [0, 0.1, 0.9, 1] }
          }
        />
      ))}
      {/* the receiver, its level rising */}
      <g clipPath={`url(#${receiverClipId})`}>
        <motion.rect
          x={178}
          width={46}
          style={{ fill: 'var(--accent)', opacity: 0.2 }}
          animate={
            still
              ? { y: 100, height: 12 }
              : { y: [104, 94, 104], height: [8, 18, 8] }
          }
          transition={still ? undefined : { duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </g>
      <path
        d="M 178 62 V 108 Q 178 113 183 113 H 219 Q 224 113 224 108 V 62"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path d="M 164 113 H 238" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.1} strokeLinecap="round" />
    </svg>
  );
}

const MOTIFS: Record<UnitMotifId, (props: MotifProps) => React.ReactNode> = {
  atom: AtomMotif,
  hill: HillMotif,
  drop: DropMotif,
  equilibrate: EquilibrateMotif,
  complex: ComplexMotif,
  distill: DistillMotif,
};

export function UnitMotif({
  motif,
  reducedMotion,
}: {
  motif: UnitMotifId;
  reducedMotion: boolean;
}) {
  const Render = MOTIFS[motif];
  const { ref, live } = useLive<HTMLElement>(120);
  return (
    <div ref={ref} className="block w-full">
      <StillProvider live={live}>
        <Render reducedMotion={reducedMotion} />
      </StillProvider>
    </div>
  );
}
