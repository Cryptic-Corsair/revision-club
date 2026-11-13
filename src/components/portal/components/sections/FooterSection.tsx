'use client';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Mascot } from '@/components/club/bits';
import { GLOBAL_METRICS, IAL_UNITS, unitCandy, type IalUnit, type SiteTheme } from '../../data/ialData';
import { FlaskMark } from '../FlaskMark';

interface FooterSectionProps {
  theme: SiteTheme;
  onLaunchWorkspace: () => void;
  onOpenSpecIndex: () => void;
  onOpenUnit: (unitCode: IalUnit['code']) => void;
  onNavigate: (anchor: string) => void;
  onToggleTheme: () => void;
}

const hours = Math.round(GLOBAL_METRICS.totalMinutes / 60);

/* The workspace's own footer, re-cut for the showcase: the same cocoa
   band under the same wave (the club footer's exact path), Bubbles
   perched on the crest, the stat grid, candy-numbered unit links and
   the eyebrow sections. Above the wave the closing CTA stage keeps
   the portal's exit ramps — Launch IAL CHEM hands the visitor over.
   The stage stands on the descent's last step (--room-step-5, now the
   interlude's ground), so the one surviving wave pours that ground
   into the band. */
export function FooterSection({
  theme,
  onLaunchWorkspace,
  onOpenSpecIndex,
  onOpenUnit,
  onNavigate,
  onToggleTheme,
}: FooterSectionProps) {
  return (
    <footer className="relative mt-auto">
      {/* Closing CTA stage — the band's candy buttons + display voice.
          It stands on the descent's last step: the wave below pours
          that ground into the band. */}
      <div
        className="relative py-20 sm:py-28"
        style={{ backgroundColor: 'var(--room-step-5)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
          style={{
            background:
              'radial-gradient(ellipse 68% 58% at 50% 100%, var(--spotlight) 0%, transparent 72%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p
            className="font-mono text-[11px] tracking-[0.16em] uppercase"
            style={{ color: 'var(--ink-muted)' }}
          >
            READY TO REVISE
          </p>
          <h2
            className="mx-auto mt-3 max-w-2xl text-balance font-display font-bold leading-[1.1]"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
          >
            Open the bench. Start your{' '}
            <span style={{ color: 'var(--accent)' }}>first topic.</span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onLaunchWorkspace}
              className="portal-candy-btn group inline-flex h-12 items-center gap-2 rounded-full px-6 font-display text-sm font-semibold whitespace-nowrap shrink-0"
            >
              <span>Launch IAL CHEM</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onOpenSpecIndex}
              className="inline-flex h-12 items-center rounded-full px-6 font-display text-sm font-semibold transition-transform duration-200 hover:-translate-y-px whitespace-nowrap shrink-0"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--ink)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              Open Spec Index
            </button>
          </div>
        </div>
      </div>

      {/* The wave, Bubbles and the band share one positioning root — the
          same trick the club footer uses: she anchors to the root above
          the wave with z-10, because the wave and the band would
          otherwise paint over her. */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute right-[6%] top-[calc(30px*var(--ui-scale))] z-10 hidden -translate-y-1/2 lg:block"
        >
          <span className="bobble block">
            <Mascot main="#FF6B6B" size={92} bubbles={false} />
          </span>
        </span>

      {/* The wave — the club footer's exact path, draining the last
          room's ground into the cocoa band. The page's one wave. */}
      <div
        aria-hidden="true"
        className="relative h-[calc(54px*var(--ui-scale))] sm:h-[calc(74px*var(--ui-scale))]"
        style={{ background: 'var(--room-step-5)' }}
      >
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-full w-full">
          <path
            d="M0 48 C190 80 350 12 555 31 C760 50 900 88 1105 65 C1265 47 1375 27 1440 39 L1440 90 L0 90 Z"
            fill="var(--band)"
          />
        </svg>
      </div>

      {/* The cocoa band */}
      <div style={{ backgroundColor: 'var(--band)', color: 'var(--band-ink)' }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Intro row: brand + the course's vital statistics */}
          <div className="flex flex-col gap-6 border-b border-white/[0.11] py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <FlaskMark size={44} />
              <div className="min-w-0">
                <div className="font-display text-xl font-bold leading-none tracking-tight">
                  IAL CHEM
                </div>
                <p
                  className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: 'var(--band-ink-muted)' }}
                >
                  Pearson Edexcel · International A Level Chemistry
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/[0.12] rounded-2xl border border-white/[0.1] bg-white/[0.035] px-1 py-3 sm:min-w-[390px] sm:px-3">
              {[
                { value: String(GLOBAL_METRICS.units), label: 'Units' },
                { value: String(GLOBAL_METRICS.topics), label: 'Topics' },
                { value: '≈' + hours + ' h', label: 'Reading time' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center px-2">
                  <span className="font-display text-xl font-bold leading-none tabular-nums">
                    {stat.value}
                  </span>
                  <span
                    className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--band-ink-muted)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Columns: the course + the showcase */}
          <div className="grid gap-10 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)] lg:gap-14">
            <section aria-labelledby="portal-footer-course-heading">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: 'var(--band-ink-muted)' }}
                  >
                    The course
                  </p>
                  <h2
                    id="portal-footer-course-heading"
                    className="mt-1 font-display text-lg font-semibold tracking-tight"
                  >
                    Explore by unit
                  </h2>
                </div>
                <span
                  className="pb-1 font-mono text-[10px] tracking-[0.12em]"
                  style={{ color: 'var(--band-ink-muted)' }}
                >
                  WCH11 — WCH16
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {IAL_UNITS.map((unit) => {
                  const candy = unitCandy(unit.code);
                  return (
                    <button
                      key={unit.code}
                      type="button"
                      onClick={() => onOpenUnit(unit.code)}
                      className="group flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/[0.05]"
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-[14px] font-bold"
                        style={{
                          background: candy,
                          color: '#fff6ea',
                          boxShadow: `0 2px 0 color-mix(in oklab, ${candy} 72%, var(--band))`,
                        }}
                      >
                        {unit.code.replace('WCH', '')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block truncate text-[12.5px] font-bold transition-colors group-hover:text-white"
                          style={{ color: 'var(--band-ink)' }}
                        >
                          {unit.shortLabel.split(' · ')[0]}
                        </span>
                        <span
                          className="mt-1 block text-[9.5px] font-bold uppercase tracking-[0.14em]"
                          style={{ color: 'var(--band-ink-muted)' }}
                        >
                          {unit.code}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 opacity-25 transition-all group-hover:opacity-70" />
                    </button>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="portal-footer-tools-heading">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: 'var(--band-ink-muted)' }}
              >
                The showcase
              </p>
              <h2
                id="portal-footer-tools-heading"
                className="mt-1 font-display text-lg font-semibold tracking-tight"
              >
                Look around
              </h2>
              <div className="mt-3 flex flex-col">
                {[
                  { label: 'Back to the top', act: () => onNavigate('#top') },
                  { label: 'Revision pack builder', act: () => onNavigate('#workflow') },
                  { label: 'The showcase machines', act: () => onNavigate('#showcase') },
                  { label: 'Units matrix', act: () => onNavigate('#units') },
                  { label: 'The living laboratory', act: () => onNavigate('#lab') },
                  { label: 'Search (⌘K)', act: onOpenSpecIndex },
                ].map((row) => (
                  <button
                    key={row.label}
                    type="button"
                    onClick={row.act}
                    className="flex items-center justify-between border-b border-white/[0.09] py-3 text-left text-[13px] font-bold transition-colors last:border-b-0 hover:text-white"
                    style={{ color: 'var(--band-ink)' }}
                  >
                    {row.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-30" />
                  </button>
                ))}
              </div>

              {/* The room knob, footer-grade — same toggle as the navbar */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-3 py-1.5 text-[11px] font-bold transition-colors hover:border-white/[0.3] hover:bg-white/[0.1]"
                style={{ color: 'var(--band-ink)' }}
              >
                {theme === 'dune' ? 'Dune lab' : 'Light lab'}
              </button>
            </section>
          </div>

          {/* Bottom line — the club's own small print */}
          <div className="flex flex-col gap-3 border-t border-white/[0.1] py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
            <p
              className="max-w-2xl text-[10.5px] leading-relaxed font-semibold"
              style={{ color: 'var(--band-ink-muted)' }}
            >
              © 2026 IAL CHEM · Notes for the Pearson Edexcel International A Level Chemistry (2018) specification, WCH11–WCH16. Not affiliated with or endorsed by Pearson Education Ltd.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('#top')}
              className="inline-flex w-fit items-center gap-1.5 text-[11px] font-bold transition-colors"
              style={{ color: 'var(--band-ink-muted)' }}
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
