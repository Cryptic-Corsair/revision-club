'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GLOBAL_METRICS, IAL_UNITS, type IalUnit } from '../../data/ialData';
import { EASE_EXPO } from '../../lib/motion';
import { UnitMotif, type UnitMotifId } from '../motion/UnitMotifs';

interface UnitMatrixProps {
  reducedMotion: boolean;
  onSelectUnit: (unitCode: IalUnit['code']) => void;
}

/* The syllabus coverage, dressed as motion graphics cards: each of
   the six units carries its own miniature loop from the same shelf
   the living laboratory draws from — an atom, the activation hill,
   the falling drop, two populations exchanging, a ligand shell, a
   distillation column — sitting on a card of the lab tiles' chrome
   (rounded surface, the card shadow, an inner stage on the page
   ground). The honest coverage facts stay: each unit's share of
   the 756 reading minutes on a hairline rail. The room's backdrop
   patterns are gone — the cards float on the bare, deepening
   ground. The stages still group behind the glass-morphism
   capsule: AS slides to units 1–3 (WCH11–WCH13), A2 to units 4–6
   (WCH14–WCH16). Tapping a card opens the command palette filtered
   to the unit's code. */

type CourseStage = 'as' | 'a2';

const MOTIF_BY_CODE: Record<IalUnit['code'], UnitMotifId> = {
  WCH11: 'atom',
  WCH12: 'hill',
  WCH13: 'drop',
  WCH14: 'equilibrate',
  WCH15: 'complex',
  WCH16: 'distill',
};

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
            Tap a unit to browse its spec points in the index — each card
            shows how much of the course it takes.
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

        {/* The motion graphics cards — swapped by stage */}
        <div className="mx-auto mt-8 max-w-5xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              id="units-document"
              role="tabpanel"
              aria-label={`${stageSpec.big} units — ${stageSpec.sub}`}
              className="grid grid-cols-1 gap-5 sm:grid-cols-3"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: EASE_EXPO }}
            >
              {stageSpec.units.map((unit, i) => {
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
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE_EXPO, delay: reducedMotion ? 0 : i * 0.07 }}
                    whileHover={reducedMotion ? undefined : { y: -4 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                    className="rounded-3xl p-4 text-left"
                    style={{
                      backgroundColor: 'var(--surface)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                    data-testid={`unit-card-${unit.code}`}
                  >
                    {/* the unit's own loop, on the stage ground */}
                    <div
                      className="overflow-hidden rounded-2xl"
                      style={{ backgroundColor: 'var(--bg)' }}
                    >
                      <UnitMotif
                        motif={MOTIF_BY_CODE[unit.code]}
                        reducedMotion={reducedMotion}
                      />
                    </div>

                    <span className="mt-4 block px-1">
                      <span className="portal-ed-meta-row">
                        <span>{unit.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.levelTag}</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.topicsCount} topics</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.minutes} min</span>
                      </span>

                      <span className="portal-ed-title" style={{ fontSize: '17px' }}>
                        {unit.title}
                      </span>
                      <span className="portal-ed-scope" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>
                        {unit.scope}
                      </span>

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
