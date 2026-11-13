'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GLOBAL_METRICS, IAL_UNITS, type IalUnit } from '../../data/ialData';
import { EASE_EXPO } from '../../lib/motion';
import { SectionBackdrop } from '../motion/SectionBackdrop';

interface UnitMatrixProps {
  reducedMotion: boolean;
  onSelectUnit: (unitCode: IalUnit['code']) => void;
}

/* The syllabus coverage, re-set as an editorial document:
   the workspace's document-room voice (uppercase kicker on the band
   ground, hairline clause rows led by rust numerals and a falling
   rail line, meta labels in the Plex voice) carrying the portal's
   honest coverage facts — each unit's share of the 756 reading
   minutes on a hairline rail. The six clauses are grouped into the
   course's two stages behind a glass-morphism capsule: AS slides
   the document to units 1–3 (WCH11–WCH13), A2 to units 4–6
   (WCH14–WCH16). Tapping a clause still opens the command palette
   filtered to the unit's code. The hero's own decorative language —
   rings, waves, the faint columns — blooms behind the document. */

type CourseStage = 'as' | 'a2';

const STAGES: Array<{
  id: CourseStage;
  big: string;
  sub: string;
  units: readonly IalUnit[];
}> = [
  { id: 'as', big: 'AS', sub: 'Units 1–3', units: IAL_UNITS.slice(0, 3) },
  { id: 'a2', big: 'A2', sub: 'Units 4–6', units: IAL_UNITS.slice(3) },
];

export function UnitMatrix({ reducedMotion, onSelectUnit }: UnitMatrixProps) {
  const [stage, setStage] = useState<CourseStage>('as');
  const stageSpec = STAGES.find((s) => s.id === stage) ?? STAGES[0];

  return (
    <section id="units" className="relative py-20 sm:py-28">
      {/* The hero's ring-and-wave backdrop, tuned for this room */}
      <SectionBackdrop variant="units" reducedMotion={reducedMotion} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header — kicker, document heading, meta line */}
        <div className="text-center">
          <span className="portal-ed-kicker">Syllabus coverage</span>
          <h2
            className="mx-auto mt-6 max-w-2xl text-balance font-display font-bold leading-[1.12]"
            style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)' }}
          >
            The six units, in{' '}
            <span className="portal-ed-heading-accent">
              specification order.
            </span>
          </h2>
          <p
            className="portal-ed-meta mx-auto mt-4 max-w-[60ch] leading-[1.9]"
          >
            Tap a clause to inspect its unit — the palette opens filtered
            to the code, exactly like the workspace's own quick switcher.
          </p>
        </div>

        {/* The glass stage capsule — AS / A2 */}
        <div className="mt-9 flex justify-center">
          <div
            role="tablist"
            aria-label="Course stage"
            className="portal-glass-capsule"
            data-testid="stage-capsule"
          >
            {STAGES.map((spec) => {
              const active = stage === spec.id;
              return (
                <button
                  key={spec.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls="units-document"
                  data-active={active}
                  data-testid={`stage-tab-${spec.id}`}
                  type="button"
                  onClick={() => setStage(spec.id)}
                  className="portal-capsule-tab"
                >
                  {active && !reducedMotion && (
                    <motion.span
                      layoutId="stage-capsule-pill"
                      className="portal-capsule-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.85 }}
                    />
                  )}
                  {active && reducedMotion && (
                    <span className="portal-capsule-pill" />
                  )}
                  <span className="portal-capsule-big">{spec.big}</span>
                  <span className="portal-capsule-sub">{spec.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The document stream — clause rows, swapped by stage */}
        <div className="mx-auto mt-6 max-w-4xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              id="units-document"
              role="tabpanel"
              aria-label={`${stageSpec.big} units — ${stageSpec.sub}`}
              className="portal-ed-clauses"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: EASE_EXPO }}
            >
              {stageSpec.units.map((unit) => {
                const absoluteIndex = IAL_UNITS.indexOf(unit);
                const sharePct = Math.round(
                  (unit.minutes / GLOBAL_METRICS.totalMinutes) * 100,
                );
                return (
                  <motion.button
                    key={unit.code}
                    type="button"
                    onClick={() => onSelectUnit(unit.code)}
                    aria-label={`Open ${unit.code} — ${unit.title} in the palette`}
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: EASE_EXPO, delay: reducedMotion ? 0 : (absoluteIndex % 3) * 0.06 }}
                    whileHover={reducedMotion ? undefined : { x: 4 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.995 }}
                    className="portal-ed-clause group"
                    data-testid={`unit-clause-${unit.code}`}
                  >
                    {/* The rust numeral and its falling rail */}
                    <span className="flex flex-col items-center">
                      <span className="portal-ed-num tabular-nums">
                        {String(absoluteIndex + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true" className="portal-ed-rail-line" />
                    </span>

                    <span className="min-w-0">
                      <span className="portal-ed-meta-row">
                        <span>{unit.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.levelTag}</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.topicsCount} topics</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.minutes} min</span>
                      </span>

                      <span className="portal-ed-title">{unit.title}</span>
                      <span className="portal-ed-scope">{unit.scope}</span>

                      {/* The coverage rail — the unit's factual share
                          of the course's 756 reading minutes */}
                      <span className="portal-ed-share">
                        <span className="portal-ed-share-label tabular-nums">
                          {sharePct}% of the course
                        </span>
                        <span className="portal-ed-share-bar">
                          <motion.span
                            className="portal-ed-share-fill"
                            initial={reducedMotion ? false : { width: 0 }}
                            animate={{ width: `${Math.max(sharePct, 6)}%` }}
                            transition={{ duration: 0.7, ease: EASE_EXPO, delay: reducedMotion ? 0 : 0.18 }}
                          />
                        </span>
                        <span className="portal-ed-share-label tabular-nums">
                          {unit.minutes} / {GLOBAL_METRICS.totalMinutes} min
                        </span>
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
