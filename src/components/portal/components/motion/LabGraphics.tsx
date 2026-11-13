'use client';
import { motion } from 'framer-motion';

/* ————— the living laboratory's graphics shelf —————
   The four founding pieces of the subject, running on loop —
   electron shells, the delocalised ring, a bubbling reaction,
   reactants crossing the activation hill. Every stroke rides the
   dress tokens, every loop freezes to an honest still frame under
   reduced motion. The four later pieces live in LabGraphicsExtra. */

export const HAIRLINE = 'color-mix(in oklab, var(--ink) 14%, transparent)';
export const HAIRLINE_FAINT = 'color-mix(in oklab, var(--ink) 8%, transparent)';

/* ————— 01 · electron shells —————
   The energy-level picture every structure topic leans on: a
   breathing nucleus, two tilted elliptical shells, and an electron
   on each — the inner one brisk, the outer one lazy and
   counter-running. */

const SHELLS = [
  { tilt: -18, rx: 70, ry: 26, dur: 5.4, electron: 'var(--accent)' },
  { tilt: 38, rx: 98, ry: 34, dur: 9.2, electron: 'var(--accent-warm)' },
];

export function ShellsVignette({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      {/* the nucleus — a soft pulse under a solid core */}
      <motion.circle
        cx={200}
        cy={130}
        r={17}
        style={{ fill: 'var(--accent)' }}
        animate={reducedMotion ? undefined : { opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={200} cy={130} r={9} style={{ fill: 'var(--accent)' }} />

      {SHELLS.map((shell) => (
        <g
          key={shell.tilt}
          transform={`rotate(${shell.tilt} 200 130)`}
        >
          <ellipse
            cx={200}
            cy={130}
            rx={shell.rx}
            ry={shell.ry}
            fill="none"
            style={{ stroke: HAIRLINE }}
            strokeWidth={1.2}
          />
          <motion.g
            animate={
              reducedMotion
                ? undefined
                : { rotate: shell.dur > 7 ? -360 : 360 }
            }
            transition={{
              duration: shell.dur,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformBox: 'view-box',
              transformOrigin: '200px 130px',
            }}
          >
            <circle
              cx={200 + shell.rx}
              cy={130}
              r={4.5}
              style={{ fill: shell.electron }}
            />
            <circle
              cx={200 + shell.rx}
              cy={130}
              r={9}
              style={{ fill: shell.electron, opacity: 0.22 }}
            />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

/* ————— 02 · the delocalised ring —————
   Benzene, the arene shorthand: a pointy-top hexagon of six carbons
   turning almost imperceptibly, and the delocalised cloud inside it
   as a dashed ring whose dashes stream around the loop — the picture
   topic 17 builds the whole arene chapter on. */

export const ringPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

export function RingVignette({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      <motion.g
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        style={{ transformBox: 'view-box', transformOrigin: '200px 130px' }}
      >
        <polygon
          points={ringPoints(200, 130, 62)}
          fill="none"
          style={{ stroke: HAIRLINE }}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />

        {/* the delocalised cloud — dashes streaming around the loop */}
        <motion.circle
          cx={200}
          cy={130}
          r={37}
          fill="none"
          strokeWidth={2.2}
          strokeLinecap="round"
          style={{ stroke: 'var(--accent)', strokeDasharray: '3 8' }}
          animate={
            reducedMotion ? undefined : { strokeDashoffset: [0, -88] }
          }
          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
        />

        {/* six carbons, breathing one after another */}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 180) * (60 * i - 30);
          const cx = 200 + 62 * Math.cos(angle);
          const cy = 130 + 62 * Math.sin(angle);
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={5.5}
              style={{ fill: 'var(--surface-elevated)', stroke: HAIRLINE, strokeWidth: 1.2 }}
              animate={
                reducedMotion
                  ? undefined
                  : { opacity: [1, 0.55, 1] }
              }
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.55,
              }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}

/* ————— 03 · a bubbling reaction —————
   Gas coming off a warm solution: a line-art Erlenmeyer clipped
   liquid whose surface laps in two opposite drifts, and a loose
   stream of bubbles rising to pop at the surface. */

export const FLASK_OUTLINE =
  'M 172 34 L 172 96 L 124 194 Q 118 208 134 208 L 266 208 Q 282 208 276 194 L 228 96 L 228 34';
export const FLASK_INTERIOR =
  'M 172 34 L 172 96 L 124 194 Q 118 208 134 208 L 266 208 Q 282 208 276 194 L 228 96 L 228 34 Z';

export const liquidSurface = (baseline: number, amp: number) => {
  let d = `M -70 ${baseline} Q -57.5 ${baseline - amp * 2} -45 ${baseline}`;
  for (let x = -45; x <= 470; x += 25) d += ` T ${x + 25} ${baseline}`;
  return `${d} V 260 H -70 Z`;
};

const BUBBLES = [
  { x: 186, r: 3.2, dur: 3.1, delay: 0 },
  { x: 201, r: 2.4, dur: 2.6, delay: 0.7 },
  { x: 215, r: 3.8, dur: 3.5, delay: 1.3 },
  { x: 196, r: 2.0, dur: 2.2, delay: 1.9 },
  { x: 224, r: 2.8, dur: 2.9, delay: 2.5 },
  { x: 208, r: 3.4, dur: 3.3, delay: 3.0 },
];

export function FlaskVignette({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id="lab-flask-clip">
          <path d={FLASK_INTERIOR} />
        </clipPath>
      </defs>

      {/* the liquid, clipped to the flask interior */}
      <g clipPath="url(#lab-flask-clip)">
        <motion.g
          animate={reducedMotion ? undefined : { x: [0, -50] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          <path d={liquidSurface(152, 3.2)} style={{ fill: 'var(--accent)', opacity: 0.24 }} />
        </motion.g>
        <motion.g
          animate={reducedMotion ? undefined : { x: [0, 50] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'linear' }}
        >
          <path d={liquidSurface(156, 2.2)} style={{ fill: 'var(--accent)', opacity: 0.16 }} />
        </motion.g>

        {/* the bubble stream */}
        {BUBBLES.map((b, i) => (
          <motion.circle
            key={i}
            cx={b.x}
            r={b.r}
            cy={207}
            style={{ fill: 'var(--accent-warm)' }}
            animate={
              reducedMotion
                ? { cy: 185, opacity: 0.4 }
                : { cy: [207, 207, 148, 146], opacity: [0, 0.85, 0.7, 0] }
            }
            transition={{
              duration: b.dur,
              repeat: Infinity,
              ease: 'easeOut',
              delay: reducedMotion ? i * 0.12 : b.delay,
              times: reducedMotion ? undefined : [0, 0.12, 0.9, 1],
            }}
          />
        ))}
      </g>

      {/* the flask itself, line art over the liquid */}
      <path
        d={FLASK_OUTLINE}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* the bench line it stands on */}
      <path d="M 96 208 H 304" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}

/* ————— 04 · over the activation hill —————
   The energy profile every kinetics chapter opens with: reactants on
   their plateau, the Ea hump, products resting lower — an exothermic
   step. A glowing parcel of reactant crosses on loop while the
   accent trace draws the same road behind it. */

export const HILL_PROFILE =
  'M 56 172 C 104 172, 148 82, 200 82 C 252 82, 268 192, 322 192 L 352 192';

export function HillVignette({ reducedMotion }: { reducedMotion: boolean }) {
  const ride = {
    duration: 3.6,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    repeatDelay: 0.9,
  };
  return (
    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
      {/* axes */}
      <path d="M 44 42 V 212 H 366" fill="none" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1.2} />
      <text
        x={36}
        y={128}
        transform="rotate(-90 36 128)"
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 9,
          letterSpacing: '0.14em',
        }}
      >
        ENERGY
      </text>
      <text
        x={205}
        y={234}
        textAnchor="middle"
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 9,
          letterSpacing: '0.14em',
        }}
      >
        REACTION PROGRESS
      </text>

      {/* the plateau hairlines the measures stand on */}
      <path d="M 56 172 H 322" style={{ stroke: HAIRLINE_FAINT }} strokeWidth={1} strokeDasharray="3 6" />

      {/* the profile itself */}
      <path
        d={HILL_PROFILE}
        fill="none"
        style={{ stroke: HAIRLINE }}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      {/* the accent trace, drawing the same road on loop */}
      <motion.path
        d={HILL_PROFILE}
        fill="none"
        style={{ stroke: 'var(--accent)' }}
        strokeWidth={2}
        strokeLinecap="round"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={reducedMotion ? undefined : { pathLength: [0, 1] }}
        transition={ride}
      />

      {/* the reacting parcel riding the profile */}
      <motion.circle
        r={9}
        style={{ fill: 'var(--accent)' }}
        animate={
          reducedMotion
            ? undefined
            : {
                cx: [56, 132, 200, 258, 322],
                cy: [172, 112, 82, 150, 192],
                opacity: [0, 1, 1, 1, 0.9],
              }
        }
        transition={{ ...ride, times: [0, 0.25, 0.5, 0.72, 1] }}
      />
      <motion.circle
        r={16}
        style={{ fill: 'var(--accent)' }}
        animate={
          reducedMotion
            ? { cx: 56, cy: 172, opacity: 0.15 }
            : {
                cx: [56, 132, 200, 258, 322],
                cy: [172, 112, 82, 150, 192],
                opacity: [0, 0.22, 0.22, 0.22, 0.1],
              }
        }
        transition={{ ...ride, times: [0, 0.25, 0.5, 0.72, 1] }}
      />

      {/* the measures: Ea up to the hump, ΔH down to the trough */}
      <path d="M 200 90 V 164" style={{ stroke: HAIRLINE }} strokeWidth={1} strokeDasharray="2 4" />
      <text
        x={210}
        y={130}
        style={{
          fill: 'var(--ink-muted)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
        }}
      >
        Ea
      </text>
      <path d="M 344 172 V 192" style={{ stroke: 'var(--accent-warm)' }} strokeWidth={1.4} />
      <path d="M 340 176 L 344 171 L 348 176" fill="none" style={{ stroke: 'var(--accent-warm)' }} strokeWidth={1.4} strokeLinecap="round" />
      <path d="M 340 188 L 344 193 L 348 188" fill="none" style={{ stroke: 'var(--accent-warm)' }} strokeWidth={1.4} strokeLinecap="round" />
      <text
        x={332}
        y={186}
        textAnchor="end"
        style={{
          fill: 'var(--accent-warm)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
        }}
      >
        &minus;&Delta;H
      </text>
    </svg>
  );
}
