'use client';
import { motion } from 'framer-motion';
import { Clock, MoveRight } from 'lucide-react';
import { Chip, readableInk, SectionTag, shade, tint } from '@/components/club/bits';
import { GLOBAL_METRICS, IAL_UNITS, unitCandy, type IalUnit } from '../../data/ialData';
import { EASE_EXPO, VIEWPORT_ONCE } from '../../lib/motion';

interface UnitMatrixProps {
  reducedMotion: boolean;
  onSelectUnit: (unitCode: IalUnit['code']) => void;
}

/* The syllabus coverage walk, rebuilt in the club home's own voice:
   the six units hang as tilted candy stickers on the section's seam
   ground — the exact card anatomy the workspace's "The six units"
   grid wears (ghost number, candy tin, code in the candy's shade,
   Chips, candy arrow circle), with one portal-honest swap: the
   personal BeakerMeter becomes a coverage rail, filled with the
   unit's factual share of the 756-minute course. Tapping a card
   still opens the command palette filtered to the unit's code. */

const TILTS = [-1.4, 1.1, -0.9, 1.2, -1.1, 0.9];

export function UnitMatrix({ reducedMotion, onSelectUnit }: UnitMatrixProps) {
  return (
    <section id="units" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered sticker header — the club home's units-stage voice */}
        <div className="text-center">
          <SectionTag main="#FF922B" tilt={2}>
            Syllabus coverage
          </SectionTag>
          <h2
            className="mx-auto mt-5 max-w-2xl text-balance font-display font-bold leading-[1.12]"
            style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)' }}
          >
            The six units, in{' '}
            <span style={{ color: 'var(--accent)' }}>
              specification order.
            </span>
          </h2>
          <p
            className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-relaxed"
            style={{ color: 'var(--ink-muted)' }}
          >
            Tap a unit to inspect its topics — the palette opens filtered
            to its code, exactly like the workspace's own quick switcher.
          </p>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55, ease: EASE_EXPO }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {IAL_UNITS.map((unit, i) => {
            const candy = unitCandy(unit.code);
            const sharePct = Math.round((unit.minutes / GLOBAL_METRICS.totalMinutes) * 100);
            const tilt = reducedMotion ? 0 : TILTS[i % TILTS.length];
            return (
              <motion.button
                key={unit.code}
                type="button"
                onClick={() => onSelectUnit(unit.code)}
                aria-label={`Open ${unit.code} — ${unit.title} in the palette`}
                initial={reducedMotion ? false : { opacity: 0, y: 16, rotate: tilt }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                viewport={VIEWPORT_ONCE}
                whileHover={reducedMotion ? undefined : { rotate: 0, y: -4 }}
                whileTap={reducedMotion ? undefined : { y: 1, scale: 0.99 }}
                transition={{ duration: 0.5, ease: EASE_EXPO, delay: reducedMotion ? 0 : i * 0.05 }}
                className="sticker group relative block h-full w-full cursor-pointer overflow-hidden rounded-[calc(28px*var(--ui-scale))] p-6 text-left"
                style={{ background: tint(candy, 9) }}
              >
                {/* The ghost number — the club home's watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 right-3 select-none font-display text-[88px] font-bold leading-none"
                  style={{ color: 'color-mix(in oklab, var(--ink) 6%, transparent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Candy tin + code, the club's pairing */}
                <div className="relative flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-[calc(16px*var(--ui-scale))] font-display text-[20px] font-bold"
                    style={{
                      background: candy,
                      color: readableInk(candy),
                      boxShadow: `0 3px 0 ${shade(candy)}`,
                    }}
                  >
                    {unit.code.replace('WCH', '')}
                  </span>
                  <span>
                    <span
                      className="block font-display text-[13px] font-bold tracking-[0.14em]"
                      style={{ color: shade(candy, 68) }}
                    >
                      {unit.code}
                    </span>
                    <span
                      className="mt-0.5 flex items-center gap-1.5 text-[11.5px] font-bold"
                      style={{ color: 'var(--color-ink-faint)' }}
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ background: candy }}
                      />
                      {unit.shortLabel}
                    </span>
                  </span>
                </div>

                <h3
                  className="relative mt-4 font-display text-[21px] font-semibold leading-tight"
                  style={{ color: 'var(--ink)' }}
                >
                  {unit.title}
                </h3>
                <p
                  className="relative mt-2.5 line-clamp-3 text-[14px] leading-relaxed"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {unit.scope}
                </p>

                {/* Chips + the candy arrow circle — the club card's feet */}
                <div className="relative mt-5 flex items-end justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Chip main={candy}>{unit.topicsCount} topics</Chip>
                    <Chip>
                      <Clock className="h-3 w-3" aria-hidden="true" /> {unit.minutes} min
                    </Chip>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-6"
                    style={{
                      background: candy,
                      color: readableInk(candy),
                      boxShadow: `0 2px 0 ${shade(candy)}`,
                    }}
                  >
                    <MoveRight className="h-4.5 w-4.5" strokeWidth={2.5} />
                  </span>
                </div>

                {/* The coverage rail — the unit's factual share of the
                    course's 756 reading minutes, in its own candy */}
                <div className="relative mt-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                  <div
                    className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: 'var(--color-ink-faint)' }}
                  >
                    <span>Share of the course</span>
                    <span className="tabular-nums">{sharePct}%</span>
                  </div>
                  <div
                    className="mt-2 h-2 overflow-hidden rounded-full"
                    style={{ background: 'color-mix(in oklab, var(--ink) 10%, transparent)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: candy }}
                      initial={reducedMotion ? false : { width: 0 }}
                      whileInView={{ width: `${Math.max(sharePct, 6)}%` }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 0.7, ease: EASE_EXPO, delay: reducedMotion ? 0 : 0.15 + i * 0.05 }}
                    />
                  </div>
                  <p
                    className="mt-2 font-mono text-[10px] tabular-nums"
                    style={{ color: 'var(--color-ink-faint)' }}
                  >
                    {unit.minutes} of {GLOBAL_METRICS.totalMinutes} reading minutes
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
