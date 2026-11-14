'use client';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Mascot } from '@/components/club/bits';
import { GLOBAL_METRICS, IAL_UNITS, unitCandy, type SiteTheme } from '../../data/ialData';
import { FlaskMark } from '../FlaskMark';

interface FooterSectionProps {
  theme: SiteTheme;
  onNavigate: (anchor: string) => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
}

const hours = Math.round(GLOBAL_METRICS.totalMinutes / 60);

/* The closing band. The page's final word and its buttons live in the
   interlude above; this band is the quiet colophon under the one
   surviving wave: the flask, the course's vital statistics, the six
   units and the workspace's rooms as real deep links (plain anchors —
   a full-page hand-off keeps both wrappers' scroll and theme state
   honest), a look-around column for the homepage's own rooms, and the
   small print. Bubbles perches on the wave's crest, as she does on
   every IAL CHEM page. */
export function FooterSection({
  theme,
  onNavigate,
  onOpenSearch,
  onToggleTheme,
}: FooterSectionProps) {
  const stats = [
    { value: String(GLOBAL_METRICS.units), label: 'Units' },
    { value: String(GLOBAL_METRICS.topics), label: 'Topics' },
    { value: `≈${hours} h`, label: 'Reading' },
  ];

  const aroundRows: Array<{ label: string; onClick: () => void }> = [
    { label: 'Back to the top', onClick: () => onNavigate('#top') },
    { label: 'How packs work', onClick: () => onNavigate('#workflow') },
    { label: 'The machines', onClick: () => onNavigate('#showcase') },
    { label: 'Syllabus coverage', onClick: () => onNavigate('#units') },
    { label: 'The living laboratory', onClick: () => onNavigate('#lab') },
    { label: 'Search ⌘K', onClick: onOpenSearch },
  ];

  const workspaceRows: Array<{ label: string; href: string }> = [
    { label: 'Open the notes', href: '/club?v=notes&doc=wch11-t01' },
    { label: 'The spec index', href: '/club?v=spec' },
    { label: 'The pack bench', href: '/club?v=pack' },
    { label: 'Your progress', href: '/club?v=sticker' },
    { label: 'The desk', href: '/club' },
  ];

  return (
    <footer className="relative mt-auto">
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
            {/* Row 1 — the flask, the course in one sentence, the vital
                statistics as plain numerals with hairline dividers */}
            <div className="flex flex-col gap-8 border-b border-white/[0.11] py-9 sm:py-11 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <div className="flex items-center gap-3.5">
                  <FlaskMark size={42} />
                  <span className="font-display text-xl font-semibold leading-none tracking-tight">
                    IAL CHEM
                  </span>
                </div>
                <p
                  className="mt-4 text-[13px] font-semibold leading-[1.75]"
                  style={{ color: 'var(--band-ink-muted)' }}
                >
                  Revision notes for the Pearson Edexcel International A
                  Level Chemistry (2018) specification — written the way
                  they're taught.
                </p>
              </div>

              <div className="flex items-center">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={i === 0 ? 'pr-8 sm:pr-10' : 'border-l border-white/[0.12] pl-8 sm:pl-10'}
                  >
                    <span className="block font-display text-[26px] font-bold leading-none tabular-nums">
                      {stat.value}
                    </span>
                    <span
                      className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: 'var(--band-ink-muted)' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — three quiet columns: the units, this page, the
                workspace. Every workspace row is a real deep link. */}
            <div className="grid gap-x-10 gap-y-11 py-10 sm:py-11 md:grid-cols-3">
              <nav aria-label="The six units">
                <p className="portal-band-label">The units</p>
                <div className="mt-4 flex flex-col">
                  {IAL_UNITS.map((unit) => {
                    const candy = unitCandy(unit.code);
                    return (
                      <a
                        key={unit.code}
                        href={`/club?v=${unit.code.toLowerCase()}`}
                        className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.05]"
                      >
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-[13px] font-bold"
                          style={{
                            background: candy,
                            color: '#fff6ea',
                            boxShadow: `0 2px 0 color-mix(in oklab, ${candy} 72%, var(--band))`,
                          }}
                        >
                          {unit.code.replace('WCH', '')}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-bold transition-colors group-hover:text-white">
                            {unit.title}
                          </span>
                          <span
                            className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.14em] tabular-nums"
                            style={{ color: 'var(--band-ink-muted)' }}
                          >
                            {unit.code} · {unit.topicsCount} topics · {unit.minutes} min
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-25 transition-opacity group-hover:opacity-70" />
                      </a>
                    );
                  })}
                </div>
              </nav>

              <nav aria-label="Around this page">
                <p className="portal-band-label">This page</p>
                <div className="mt-3 flex flex-col">
                  {aroundRows.map((row) => (
                    <button
                      key={row.label}
                      type="button"
                      onClick={row.onClick}
                      className="portal-band-row"
                    >
                      <span>{row.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </nav>

              <nav aria-label="The workspace">
                <p className="portal-band-label">The workspace</p>
                <div className="mt-3 flex flex-col">
                  {workspaceRows.map((row) => (
                    <a key={row.label} href={row.href} className="portal-band-row">
                      <span>{row.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            {/* Row 3 — the small print and the room knob */}
            <div className="flex flex-col gap-4 border-t border-white/[0.1] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
              <p
                className="max-w-2xl text-[10.5px] font-semibold leading-relaxed"
                style={{ color: 'var(--band-ink-muted)' }}
              >
                © 2026 IAL CHEM · Notes for the Pearson Edexcel International A Level Chemistry (2018) specification, WCH11–WCH16. Not affiliated with or endorsed by Pearson Education Ltd.
              </p>
              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-3 py-1.5 text-[11px] font-bold transition-colors hover:border-white/[0.3] hover:bg-white/[0.1]"
                  style={{ color: 'var(--band-ink)' }}
                >
                  {theme === 'dune' ? 'Daylight mode' : 'Dune mode'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('#top')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-3 py-1.5 text-[11px] font-bold transition-colors hover:border-white/[0.3] hover:bg-white/[0.1]"
                  style={{ color: 'var(--band-ink)' }}
                >
                  Back to top
                  <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
