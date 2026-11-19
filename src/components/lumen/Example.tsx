'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_LUM, Meniscus, Reveal, SectionHead } from './bits';
import { useLive } from './lib';

/* ═══════════════════════════════════════════════════════════════════════
   a taste — a real WCH11-style titration question, solved the bench way.

   The numbers are the machine's own (the motion section runs this same
   titration live): 25.0 cm³ of 0.100 mol dm⁻³ NaOH against a 20.0 cm³
   titre of HCl gives exactly 0.125 mol dm⁻³ — verified in
   scripts/lumen-numbers.py. The question card stays pinned while the
   four steps light up in order, and the answer arrives as a pill.
   ═══════════════════════════════════════════════════════════════════════ */

const INK70 = 'rgba(242,238,250,0.7)';
const INK40 = 'rgba(242,238,250,0.4)';

/* the little rig on the question card — burette, drop, flask whose
   phenolphthalein pink drains at the endpoint, on a loop */
function MiniTitration() {
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      {/* burette */}
      <rect x="40" y="10" width="12" height="60" rx="2" fill="rgba(116,215,255,0.16)" stroke={INK70} strokeWidth="2" />
      <line x1="41" y1="22" x2="51" y2="22" stroke="#74d7ff" strokeWidth="2.2" />
      <path d="M52 18 h4 M52 28 h3 M52 38 h3 M52 48 h3" stroke={INK40} strokeWidth="1.5" />
      <path d="M44 70 L45.4 80 M48 70 L46.6 80 M45.4 80 H46.6" stroke={INK70} strokeWidth="1.8" fill="none" />
      {/* the drop */}
      <circle className="lum-loop lum-drip" style={{ transformBox: 'fill-box' }} cx="46" cy="86" r="3" fill="#74d7ff" />
      {/* flask */}
      <path d="M40 100 V110 L16 138 Q14 142 19 142 H73 Q78 142 76 138 L52 110 V100" fill="none" stroke={INK70} strokeWidth="2.2" />
      <path d="M36 100 H56" stroke={INK70} strokeWidth="2.4" strokeLinecap="round" />
      {/* the liquid — pink while alkaline, drained past the endpoint */}
      <path className="lum-loop lum-pinkcycle" d="M30 124 L22 136 Q21 139 25 139 H67 Q71 139 70 136 L62 124 Z" fill="#ff8fd6" opacity="0.8" />
      {/* labels */}
      <text x="62" y="20" fontSize="10" fontFamily="var(--font-plex), monospace" fill={INK40}>
        HCl
      </text>
      <text x="96" y="132" fontSize="10" fontFamily="var(--font-plex), monospace" fill={INK40}>
        25.0 cm
        <tspan dy="3" fontSize="7.5">
          3
        </tspan>
        <tspan dy="-3"> · 0.100 mol dm</tspan>
        <tspan dy="-4" fontSize="7.5">
          −3
        </tspan>
        <tspan dy="4"> NaOH</tspan>
      </text>
      {/* the pH curve, miniature */}
      <path d="M180 30 H310" stroke={INK40} strokeWidth="1.4" strokeDasharray="2 5" />
      <path d="M180 24 V136" stroke={INK40} strokeWidth="1.4" strokeDasharray="2 5" />
      <path
        className="lum-loop lum-drawcurve"
        d="M182 34 C 230 36, 236 128, 246 130 C 256 132, 262 38, 308 40"
        fill="none"
        stroke="#6fe8a3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="246" cy="130" r="4.5" fill="#ffc46b" />
      <text x="252" y="146" fontSize="9.5" fontFamily="var(--font-plex), monospace" fill={INK40}>
        equivalence
      </text>
      <text x="312" y="146" fontSize="9.5" fontFamily="var(--font-plex), monospace" fill={INK40} textAnchor="end">
        acid added →
      </text>
    </svg>
  );
}

const STEPS: Array<{ n: string; body: React.ReactNode }> = [
  {
    n: '1',
    body: (
      <>
        <b>Write the equation.</b>{' '}
        <span className="lum-mono">HCl + NaOH → NaCl + H<sub>2</sub>O</span> — one acid, one
        base, and a clean 1&nbsp;:&nbsp;1 ratio across the arrow.
      </>
    ),
  },
  {
    n: '2',
    body: (
      <>
        <b>Count the base.</b> n(NaOH) = c × V ={' '}
        <span className="lum-mono">
          0.100 × 0.0250 dm<sup>3</sup> = 2.50 × 10<sup>−3</sup> mol
        </span>{' '}
        — the pipette did the measuring; you only convert it.
      </>
    ),
  },
  {
    n: '3',
    body: (
      <>
        <b>Cross the ratio.</b> The equation says 1&nbsp;:&nbsp;1, so{' '}
        <span className="lum-mono">
          n(HCl) = 2.50 × 10<sup>−3</sup> mol
        </span>{' '}
        — the same amount, delivered in a 20.0 cm<sup>3</sup> titre.
      </>
    ),
  },
  {
    n: '4',
    body: (
      <>
        <b>Share it out.</b> V(HCl) = 20.0 cm<sup>3</sup> ={' '}
        <span className="lum-mono">0.0200 dm<sup>3</sup></span>, so{' '}
        <span className="lum-mono">
          c = n ÷ V = 2.50 × 10<sup>−3</sup> ÷ 0.0200
        </span>
        .
      </>
    ),
  },
];

export function TasteBand() {
  const liveRef = useLive<HTMLElement>();
  const reduced = Boolean(useReducedMotion());

  return (
    <section id="taste" ref={liveRef} className="lum-sec lum-band-taste">
      <Meniscus />
      <div className="lum-wrap">
        <SectionHead
          dot="#ff8fd6"
          eyebrow="a taste of the notes"
          title="Watch a question react."
          lead="A WCH11 classic — the same titration the machine below the shelf is running live. Four steps, no skipped lines, the way every worked example in the notes is written."
        />
        <div className="lum-taste-grid">
          <Reveal className="lum-qcard">
            <span className="lum-qchip">WCH11 · formulae &amp; amount of substance</span>
            <p className="lum-qtext">
              25.0 cm<sup>3</sup> of 0.100 mol dm<sup>−3</sup> sodium hydroxide is titrated with
              hydrochloric acid. The titre is 20.0 cm<sup>3</sup>. Find the concentration of the
              hydrochloric acid.
            </p>
            <span className="lum-qeq">
              HCl + NaOH → NaCl + H<sub>2</sub>O
            </span>
            <div className="lum-tsvg">
              <MiniTitration />
            </div>
            <p className="lum-qfoot">the rig on the left, the curve on the right — one loop, every 8 seconds</p>
          </Reveal>

          <motion.div
            className="lum-steps"
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.16 } },
            }}
          >
            {STEPS.map((s) => (
              <motion.div
                key={s.n}
                className="lum-step"
                variants={{
                  hidden: reduced ? {} : { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_LUM } },
                }}
              >
                <span className="lum-stepn">{s.n}</span>
                <p>{s.body}</p>
              </motion.div>
            ))}
            <motion.div
              className="lum-step lum-answrap"
              variants={{
                hidden: reduced ? {} : { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: EASE_LUM, delay: 0.25 },
                },
              }}
            >
              <span className="lum-stepn">∴</span>
              <p>
                <b>Three significant figures,</b> as the paper expects — four marks, gently
                earned.
                <br />
                <motion.span
                  className="lum-answer"
                  initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.5 }}
                  style={{ display: 'inline-flex', marginTop: 10 }}
                >
                  c(HCl) = 0.125 mol dm<sup>−3</sup>
                </motion.span>
              </p>
              <svg
                className="lum-ans-spark"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
