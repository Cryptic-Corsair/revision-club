'use client';
import { motion } from 'framer-motion';
import { useId } from 'react';
import { HAIRLINE, HAIRLINE_FAINT, liquidSurface } from './LabGraphics';
import { useStill } from '../../lib/still';

/* ————— the living laboratory's later pieces —————
   Four more loops of the subject itself, in the same line-art
   voice and on the same dress tokens: the titration drop, ions
   drifting across an electrolysis cell, two populations crossing
   at dynamic equilibrium, and a fractional distillation running
   its column. Every loop freezes to an honest still under
   reduced motion. */

/* ————— 05 · the falling drop —————
   A titration mid-run: the burette drains its graduations, drops
   leave the tip on a metronome, land in the pool and push rings
   across the surface while the indicator slowly turns over. */

const BURETTE_INTERIOR = 'M 192 22 L 208 22 L 208 98 L 192 98 Z';
const BEAKER_INTERIOR =
  'M 132 148 L 268 148 L 268 206 Q 268 216 258 216 L 142 216 Q 132 216 132 206 Z';

export function DropVignette({ reducedMotion }: { reducedMotion: boolean }) {
  const still = useStill(reducedMotion);
  const id = useId().replace(/:/g, '');
  const buretteClipId = `lab-burette-clip-${id}`;
  const beakerClipId = `lab-beaker-clip-${id}`;
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id={buretteClipId}>
          <path d={BURETTE_INTERIOR} />
        </clipPath>
        <clipPath id={beakerClipId}>
          <path d={BEAKER_INTERIOR} />
        </clipPath>
      </defs>

      {/* the burette's charge, draining through the graduations */}
      <g clipPath={`url(#${buretteClipId})`}>
        <motion.rect
          x={192}
          width={16}
          style={{ fill: 'var(--accent)', opacity: 0.26 }}
          animate={
            still
              ? { y: 40, height: 58 }
              : { y: [40, 90, 40], height: [58, 8, 58] }
          }
          transition={still ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </g>
      {/* graduations */}
      {[32, 44, 56, 68, 80].map((y) => (
        <path key={y} d={`M 195 ${y} H 205`} style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1} />
      ))}
      {/* the burette itself */}
      <path
        d="M 192 22 V 98 M 208 22 V 98 M 186 104 H 214 M 200 104 V 96 M 196 112 V 124 M 204 112 V 124"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
        strokeLinecap="round"
      />

      {/* the drops, leaving the tip on a metronome */}
      {[0, 0.75].map((delay, i) => (
        <motion.circle
          key={i}
          cx={200}
          r={3.2}
          cy={128}
          style={{ fill: 'var(--accent)' }}
          animate={
            still
              ? { cy: 168, opacity: 0.5 }
              : { cy: [128, 148, 174, 176], opacity: [0, 0.9, 0.9, 0] }
          }
          transition={
            still
              ? { duration: 0.6, delay: i * 0.3 }
              : {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeIn',
                  delay,
                  times: [0, 0.35, 0.85, 1],
                }
          }
        />
      ))}

      {/* the pool in the beaker, lapping and slowly turning over */}
      <g clipPath={`url(#${beakerClipId})`}>
        <motion.g
          animate={still ? undefined : { x: [0, -50] }}
          transition={still ? undefined : { duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <path d={liquidSurface(176, 2.6)} style={{ fill: 'var(--accent)', opacity: 0.22 }} />
        </motion.g>
        <motion.g
          animate={still ? undefined : { x: [0, 50] }}
          transition={still ? undefined : { duration: 11, repeat: Infinity, ease: 'linear' }}
        >
          <path d={liquidSurface(180, 2)} style={{ fill: 'var(--accent)', opacity: 0.14 }} />
        </motion.g>
        <motion.rect
          x={130}
          y={150}
          width={140}
          height={70}
          style={{ fill: 'var(--accent-warm)' }}
          animate={
            still
              ? { opacity: 0.1 }
              : { opacity: [0.04, 0.24, 0.04] }
          }
          transition={still ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* impact rings where the drops land */}
        {[1.2, 1.95].map((delay, i) => (
          <motion.ellipse
            key={i}
            cx={200}
            cy={176}
            ry={1}
            style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.3 }}
            animate={
              still
                ? { rx: 8, opacity: 0.2 }
                : { rx: [2, 20], opacity: [0.5, 0] }
            }
            transition={
              still
                ? { duration: 0.4, delay: i * 0.2 }
                : { duration: 1.5, repeat: Infinity, ease: 'easeOut', delay }
            }
          />
        ))}

        {/* splash flecks kicked up on impact */}
        {[
          { dx: -1, delay: 1.3 },
          { dx: 1, delay: 2.05 },
        ].map((fleck, i) => (
          <motion.circle
            key={i}
            r={1.8}
            style={{ fill: 'var(--accent)' }}
            animate={
              still
                ? { cx: 200 + fleck.dx * 6, cy: 170, opacity: 0.3 }
                : {
                    cx: [200, 200 + fleck.dx * 3.5, 200 + fleck.dx * 7],
                    cy: [174, 163, 171],
                    opacity: [0, 0.7, 0],
                  }
            }
            transition={
              still
                ? { duration: 0.3 }
                : {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2.4,
                    ease: 'easeOut',
                    delay: fleck.delay,
                    times: still ? undefined : [0, 0.6, 1],
                  }
            }
          />
        ))}
      </g>

      {/* the beaker itself */}
      <path
        d="M 132 148 V 206 Q 132 216 142 216 H 258 Q 268 216 268 206 V 148"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path d="M 112 216 H 288" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}

/* ————— 06 · ions on the move —————
   An electrolysis cell wired to a battery: cations drifting to the
   cathode, anions to the anode, a fresh metal shimmer plating onto
   the left electrode while little gas bubbles climb the right one. */

const CATIONS = [
  { x0: 210, y: 140, dur: 3.0, delay: 0 },
  { x0: 224, y: 156, dur: 3.4, delay: 1.2 },
  { x0: 198, y: 128, dur: 3.8, delay: 2.2 },
];
const ANIONS = [
  { x0: 186, y: 136, dur: 3.6, delay: 0.6 },
  { x0: 174, y: 152, dur: 4.0, delay: 1.8 },
  { x0: 198, y: 124, dur: 4.4, delay: 2.8 },
];

export function IonsVignette({ reducedMotion }: { reducedMotion: boolean }) {
  const still = useStill(reducedMotion);
  const clipId = `lab-cell-clip-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x={93} y={97} width={214} height={102} rx={11} />
        </clipPath>
      </defs>

      {/* the circuit above the cell */}
      <path
        d="M 149.5 76 V 58 H 191 M 209 58 H 250.5 V 76"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* the battery glyph */}
      <path d="M 203 50 V 66" style={{ stroke: HAIRLINE }} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M 197 55 V 61" style={{ stroke: HAIRLINE }} strokeWidth={2.4} strokeLinecap="round" />
      {/* the current, streaming both leads */}
      {['M 149.5 76 V 58 H 191', 'M 209 58 H 250.5 V 76'].map((d) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          style={{ stroke: 'var(--accent-warm)', strokeDasharray: '2 7' }}
          strokeWidth={1.4}
          strokeLinecap="round"
          animate={still ? undefined : { strokeDashoffset: [0, -18] }}
          transition={still ? undefined : { duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* polarity */}
      <text
        x={149.5}
        y={46}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
        }}
      >
        &minus;
      </text>
      <text
        x={250.5}
        y={46}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
        }}
      >
        +
      </text>

      {/* the solution */}
      <g clipPath={`url(#${clipId})`}>
        <rect x={93} y={120} width={214} height={80} style={{ fill: 'var(--accent)', opacity: 0.07 }} />
        <path d="M 93 120 H 307" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.1} />

        {/* cations drifting to the cathode */}
        {CATIONS.map((ion, i) => {
          const m1 = ion.x0 + (160 - ion.x0) * 0.25;
          const m2 = ion.x0 + (160 - ion.x0) * 0.75;
          return (
            <motion.circle
              key={`cat-${i}`}
              cy={ion.y}
              r={3.2}
              style={{ fill: 'var(--accent)' }}
              animate={
                still
                  ? { cx: ion.x0, opacity: 0.5 }
                  : { cx: [ion.x0, m1, m2, 160], opacity: [0, 0.9, 0.9, 0] }
              }
              transition={
                still
                  ? { duration: 0.4, delay: i * 0.15 }
                  : {
                      duration: ion.dur,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: ion.delay,
                      times: [0, 0.18, 0.82, 1],
                    }
              }
            />
          );
        })}
        {/* anions drifting to the anode */}
        {ANIONS.map((ion, i) => {
          const m1 = ion.x0 + (242 - ion.x0) * 0.25;
          const m2 = ion.x0 + (242 - ion.x0) * 0.75;
          return (
            <motion.circle
              key={`an-${i}`}
              cy={ion.y}
              r={3.2}
              style={{ fill: 'var(--accent-warm)' }}
              animate={
                still
                  ? { cx: ion.x0, opacity: 0.5 }
                  : { cx: [ion.x0, m1, m2, 242], opacity: [0, 0.9, 0.9, 0] }
              }
              transition={
                still
                  ? { duration: 0.4, delay: i * 0.15 }
                  : {
                      duration: ion.dur,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: ion.delay,
                      times: [0, 0.18, 0.82, 1],
                    }
              }
            />
          );
        })}

        {/* the fresh metal, shimmering onto the cathode */}
        {[128, 140, 152, 164].map((y, i) => (
          <motion.circle
            key={`plate-${y}`}
            cx={155.5}
            cy={y}
            r={1.8}
            style={{ fill: 'var(--accent)' }}
            animate={
              still
                ? { opacity: 0.7 }
                : { opacity: [0.25, 0.85, 0.25] }
            }
            transition={
              still
                ? undefined
                : {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }
            }
          />
        ))}

        {/* gas climbing the anode */}
        {[0.4, 1.7].map((delay, i) => (
          <motion.circle
            key={`gas-${i}`}
            cx={250.5}
            r={2.2}
            cy={172}
            style={{ fill: 'var(--accent-warm)' }}
            animate={
              still
                ? { cy: 140, opacity: 0.4 }
                : { cy: [172, 150, 132], opacity: [0, 0.7, 0] }
            }
            transition={
              still
                ? { duration: 0.5, delay: i * 0.2 }
                : {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay,
                    times: [0, 0.85, 1],
                  }
            }
          />
        ))}
      </g>

      {/* electrodes, dipping in from the leads */}
      <rect
        x={146}
        y={76}
        width={7}
        height={100}
        rx={2}
        style={{ fill: 'var(--surface-elevated)', stroke: HAIRLINE, strokeWidth: 1.2 }}
      />
      <rect
        x={247}
        y={76}
        width={7}
        height={100}
        rx={2}
        style={{ fill: 'var(--surface-elevated)', stroke: HAIRLINE, strokeWidth: 1.2 }}
      />

      {/* the cell */}
      <rect
        x={92}
        y={96}
        width={216}
        height={104}
        rx={12}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
      />
    </svg>
  );
}

/* ————— 07 · the exchange at equilibrium —————
   Dynamic equilibrium, the picture topic 9 and 13 lean on: two
   populations in two boxes, particles crossing the road between
   them in both directions at once — equal traffic, different
   rooms, nothing settling down. */

const RESIDENTS_A = [
  { x: 94, y: 118 },
  { x: 110, y: 142 },
  { x: 126, y: 118 },
  { x: 142, y: 142 },
];
const RESIDENTS_B = [
  { x: 272, y: 118 },
  { x: 304, y: 142 },
];
const FORWARD = [
  { dur: 3.8, delay: 0 },
  { dur: 4.2, delay: 1.5 },
  { dur: 4.6, delay: 2.8 },
];
const REVERSE = [
  { dur: 3.4, delay: 0.7 },
  { dur: 3.9, delay: 2.0 },
  { dur: 4.4, delay: 3.3 },
];

export function EquilibriumVignette({ reducedMotion }: { reducedMotion: boolean }) {
  const still = useStill(reducedMotion);
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      {/* the two rooms */}
      <rect
        x={72}
        y={102}
        width={80}
        height={58}
        rx={8}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.5}
      />
      <rect
        x={248}
        y={102}
        width={80}
        height={58}
        rx={8}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.5}
      />
      <text
        x={112}
        y={92}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
        }}
      >
        A
      </text>
      <text
        x={288}
        y={92}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
        }}
      >
        B
      </text>

      {/* the road between the rooms */}
      <path d="M 152 131 H 248" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.2} strokeDasharray="2 6" />

      {/* particles crossing A → B */}
      {FORWARD.map((run, i) => (
        <motion.circle
          key={`fwd-${i}`}
          cy={131}
          r={3}
          style={{ fill: 'var(--accent)' }}
          animate={
            still
              ? { cx: 200, opacity: 0.5 }
              : { cx: [154, 190, 220, 246], opacity: [0, 0.9, 0.9, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.15 }
              : {
                  duration: run.dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: run.delay,
                  times: [0, 0.15, 0.85, 1],
                }
          }
        />
      ))}
      {/* particles crossing B → A */}
      {REVERSE.map((run, i) => (
        <motion.circle
          key={`rev-${i}`}
          cy={131}
          r={3}
          style={{ fill: 'var(--accent-warm)' }}
          animate={
            still
              ? { cx: 200, opacity: 0.5 }
              : { cx: [246, 210, 180, 154], opacity: [0, 0.9, 0.9, 0] }
          }
          transition={
            still
              ? { duration: 0.4, delay: i * 0.15 }
              : {
                  duration: run.dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: run.delay,
                  times: [0, 0.15, 0.85, 1],
                }
          }
        />
      ))}

      {/* the residents, breathing where they stand */}
      {[...RESIDENTS_A, ...RESIDENTS_B].map((dot, i) => (
        <motion.circle
          key={`res-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={2.6}
          style={{ fill: 'var(--ink-muted)' }}
          animate={
            still
              ? { opacity: 0.6 }
              : { opacity: [0.35, 0.8, 0.35] }
          }
          transition={
            still
              ? undefined
              : {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4,
                }
          }
        />
      ))}

      {/* the two rate arcs */}
      <path
        d="M 166 86 Q 200 70 234 86"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d="M 226 80 L 234 86 L 227 91"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 234 176 Q 200 192 166 176"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d="M 174 170 L 166 176 L 173 181"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x={200}
        y={236}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 9,
          letterSpacing: '0.14em',
        }}
      >
        DYNAMIC EQUILIBRIUM
      </text>
    </svg>
  );
}

/* ————— 08 · the distillation column —————
   Fractional distillation at work: vapour climbing the plates,
   the arm handing it across, a drop leaving the tip on its way
   into the receiver while the collected level quietly rises. */

const RECEIVER_INTERIOR =
  'M 170 128 L 226 128 L 226 196 Q 226 204 218 204 L 178 204 Q 170 204 170 196 Z';

export function DistillVignette({ reducedMotion }: { reducedMotion: boolean }) {
  const still = useStill(reducedMotion);
  const id = useId().replace(/:/g, '');
  const flaskClipId = `lab-still-flask-clip-${id}`;
  const receiverClipId = `lab-receiver-clip-${id}`;
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id={flaskClipId}>
          <circle cx={128} cy={196} r={23} />
        </clipPath>
        <clipPath id={receiverClipId}>
          <path d={RECEIVER_INTERIOR} />
        </clipPath>
      </defs>

      {/* the boiling flask */}
      <g clipPath={`url(#${flaskClipId})`}>
        <rect x={104} y={188} width={48} height={34} style={{ fill: 'var(--accent)', opacity: 0.22 }} />
      </g>
      <circle
        cx={128}
        cy={196}
        r={24}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
      />
      <path d="M 100 224 H 156" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.2} strokeLinecap="round" />

      {/* the column with its plates */}
      <path
        d="M 120 178 V 92 M 136 178 V 92"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      {[164, 148, 132].map((y) => (
        <path key={y} d={`M 120 ${y} H 136`} style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.1} />
      ))}

      {/* vapour climbing the plates */}
      {[
        { x: 124, dur: 2.6, delay: 0 },
        { x: 132, dur: 3.0, delay: 0.8 },
        { x: 124, dur: 3.4, delay: 1.6 },
        { x: 132, dur: 2.8, delay: 2.4 },
      ].map((vap, i) => (
        <motion.circle
          key={i}
          cx={vap.x}
          r={2.4}
          cy={170}
          style={{ fill: 'var(--accent-warm)' }}
          animate={
            still
              ? { cy: 110, opacity: 0.4 }
              : { cy: [170, 140, 112, 96], opacity: [0, 0.8, 0.8, 0] }
          }
          transition={
            still
              ? { duration: 0.5, delay: i * 0.15 }
              : {
                  duration: vap.dur,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: vap.delay,
                  times: [0, 0.2, 0.8, 1],
                }
          }
        />
      ))}

      {/* the delivery arm, sloping down to the tip */}
      <path
        d="M 136 92 H 164 L 194 116 M 136 102 H 156 L 186 122 M 186 122 L 194 116"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* the drop leaving the tip */}
      {[0, 0.55].map((delay, i) => (
        <motion.circle
          key={i}
          cx={190}
          r={2.6}
          cy={124}
          style={{ fill: 'var(--accent)' }}
          animate={
            still
              ? { cy: 170, opacity: 0.5 }
              : { cy: [124, 150, 182, 188], opacity: [0, 1, 1, 0] }
          }
          transition={
            still
              ? { duration: 0.5, delay: i * 0.25 }
              : {
                  duration: 1.1,
                  repeat: Infinity,
                  ease: 'easeIn',
                  delay,
                  times: [0, 0.1, 0.9, 1],
                }
          }
        />
      ))}

      {/* the receiver, its collected level quietly rising */}
      <g clipPath={`url(#${receiverClipId})`}>
        <motion.rect
          x={170}
          width={56}
          style={{ fill: 'var(--accent)', opacity: 0.2 }}
          animate={
            still
              ? { y: 188, height: 16 }
              : { y: [194, 178, 194], height: [10, 26, 10] }
          }
          transition={still ? undefined : { duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        {[0.95, 1.5].map((delay, i) => (
          <motion.ellipse
            key={i}
            cx={190}
            cy={188}
            ry={1}
            style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.2 }}
            animate={
              still
                ? { rx: 6, opacity: 0.2 }
                : { rx: [2, 13], opacity: [0.4, 0] }
            }
            transition={
              still
                ? { duration: 0.4, delay: i * 0.2 }
                : { duration: 1.1, repeat: Infinity, ease: 'easeOut', delay }
            }
          />
        ))}
      </g>
      <path
        d="M 170 128 V 196 Q 170 204 178 204 H 218 Q 226 204 226 196 V 128"
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path d="M 154 204 H 242" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}
