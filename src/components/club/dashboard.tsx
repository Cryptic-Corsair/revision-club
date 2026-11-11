"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { Check, Clock, Footprints, Gauge, MoveRight, Trophy } from "./icons";
import { useHydrated } from "@/lib/spectra/progress";
import { fmtClock, fmtShort, todaySeconds, useTimeData } from "@/lib/spectra/time";
import { streakOf } from "@/lib/spectra/progress-derive";
import {
  activeDaysOf,
  avgDayOf,
  barMaxOf,
  bestDayOf,
  heatWeeksOf,
  lastNDays,
  type DayBar,
} from "@/lib/spectra/dashboard";
import { shade, tint } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the dashboard system
   A kit of Material-3-flavoured widgets dressed in the club's own
   candy: Rings, WeekBars, the Heatmap, Segmented controls, StatTiles
   and the two buttons. Everything reads the shared ledgers through
   lib/spectra/dashboard.ts, so the desk's ledger and the progress
   room render the same numbers from the same maths.

   The kit's one colour law: ONE flat candy per element. A ring is
   one solid stroke, a bar one solid fill, a chip one tonal tint —
   structure comes from hairlines, big radii and honest ink, never
   from a wash. (The one gradient exception lives elsewhere: none
   here.) Tints mix against var(--tint-base) so every lab — daylight,
   dune, the dark moods — inks them correctly for free.
   ═══════════════════════════════════════════════════════════════ */

/* ————— Ring — the M3 circular progress —————
   One solid candy stroke along the sweep, rounded caps, anything
   can sit in the middle. */

export function Ring({
  pct,
  size = 96,
  stroke = 10,
  main = "#12B886",
  track = "color-mix(in oklab, var(--color-ink) 9%, transparent)",
  children,
  className,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  main?: string;
  track?: string;
  children?: ReactNode;
  className?: string;
}) {
  const p = Math.max(0, Math.min(1, pct));
  const r = (100 - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      className={`relative inline-grid shrink-0 place-items-center ${className ?? ""}`}
      style={{ width: `calc(${size}px*var(--ui-scale))`, height: `calc(${size}px*var(--ui-scale))` }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <m.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={main}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - p) }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
      </svg>
      <div className="relative z-10 grid place-items-center text-center leading-none">{children}</div>
    </div>
  );
}

/* ————— WeekBars — the week as a bar chart —————
   One rounded column per day; today's bar wears the full candy,
   the past days a tint of the same candy, the days that haven't
   happened yet sit as hollow slots. */

export function WeekBars({
  bars,
  main = "#12B886",
  height = 96,
}: {
  bars: DayBar[];
  main?: string;
  height?: number;
}) {
  const max = barMaxOf(bars);
  return (
    <div>
      <div
        className="flex items-end gap-[calc(4px*var(--ui-scale))]"
        style={{ height: `calc(${height}px*var(--ui-scale))` }}
        role="img"
        aria-label="Reading time per day"
      >
        {bars.map((b, i) => {
          const h = b.total > 0 ? Math.max((b.total / max) * 100, 7) : 0;
          return (
            <div key={b.key} className="group relative flex h-full min-w-0 flex-1 flex-col justify-end">
              {b.total > 0 && (
                <m.div
                  className="w-full rounded-t-full rounded-b-[3px]"
                  style={{
                    background: b.today ? main : tint(main, 30),
                    opacity: b.future ? 0 : b.today ? 1 : 0.85,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 24, delay: i * 0.015 }}
                />
              )}
              {b.total === 0 && (
                <div
                  className="w-full rounded-t-full rounded-b-[3px] bg-ink/[0.05]"
                  style={{ height: b.future ? "5%" : "7%", opacity: b.future ? 0.6 : 1 }}
                />
              )}
              {/* the hover read-out */}
              <span className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-ink px-2 py-1 text-[calc(10px*var(--ui-scale))] font-bold tabular-nums text-paper opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {b.day} {b.date} · {fmtShort(b.total)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-[calc(4px*var(--ui-scale))]">
        {bars.map((b) => (
          <div
            key={b.key}
            className="flex min-w-0 flex-1 flex-col items-center gap-0.5"
          >
            <span
              className={`font-display text-[calc(9.5px*var(--ui-scale))] leading-none font-bold ${
                b.today ? "text-ink" : "text-ink-faint"
              }`}
            >
              {b.day.slice(0, 1)}
            </span>
            {b.today && <span className="h-1 w-1 rounded-full" style={{ background: main }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ————— Heatmap — the activity grid —————
   Monday-anchored columns, five mixes of one hue, today ringed. */

const HEAT_MIX = ["0%", "18%", "42%", "68%", "100%"] as const;

export function Heatmap({ main = "#12B886", weeks = 20 }: { main?: string; weeks?: number }) {
  const time = useTimeData();
  const grid = heatWeeksOf(time, weeks);
  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="flex w-max gap-[calc(3px*var(--ui-scale))]">
          {grid.map((w) => (
            <div key={w.key} className="flex flex-col gap-[calc(3px*var(--ui-scale))]">
              {w.days.map((d) => (
                <span
                  key={d.key}
                  title={`${d.key} · ${d.total > 0 ? fmtShort(d.total) : "no reading"}`}
                  className="h-[calc(11px*var(--ui-scale))] w-[calc(11px*var(--ui-scale))] rounded-[4px]"
                  style={{
                    background:
                      d.level === 0
                        ? "color-mix(in oklab, var(--color-ink) 7%, transparent)"
                        : `color-mix(in oklab, ${main} ${HEAT_MIX[d.level]}, var(--color-paper))`,
                    boxShadow: d.today ? "0 0 0 2px var(--color-coral)" : undefined,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[calc(10.5px*var(--ui-scale))] font-bold text-ink-faint">
        <span>less</span>
        {HEAT_MIX.map((mix, i) => (
          <span
            key={i}
            className="h-[calc(10px*var(--ui-scale))] w-[calc(10px*var(--ui-scale))] rounded-[3px]"
            style={{
              background:
                i === 0
                  ? "color-mix(in oklab, var(--color-ink) 7%, transparent)"
                  : `color-mix(in oklab, ${main} ${mix}, var(--color-paper))`,
            }}
          />
        ))}
        <span>more</span>
        <span className="ml-auto hidden sm:inline">the last {weeks} weeks, monday-anchored</span>
      </div>
    </div>
  );
}

/* ————— Segmented — the M3 segmented control ————— */

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  main = "#12B886",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string; icon: (p: { className?: string; strokeWidth?: number }) => ReactNode }[];
  main?: string;
}) {
  return (
    <div
      className="grid w-full max-w-md grid-flow-col auto-cols-fr rounded-full border border-ink/[0.09] bg-paper p-1"
      role="tablist"
    >
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            className={`m3-press flex min-h-[calc(38px*var(--ui-scale))] cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 font-display text-[calc(12.5px*var(--ui-scale))] font-bold transition-colors ${
              active ? "" : "text-ink-soft hover:text-ink"
            }`}
            style={
              active
                ? { background: tint(main, 16), color: shade(main, 55) }
                : undefined
            }
          >
            {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            <o.icon className="h-4 w-4" strokeWidth={2.3} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ————— StatTile — the M3 stat card ————— */

export function StatTile({
  icon,
  main,
  value,
  label,
  hint,
  onClick,
}: {
  icon: (p: { className?: string; strokeWidth?: number }) => ReactNode;
  main: string;
  value: string;
  label: string;
  hint?: string;
  onClick?: () => void;
}) {
  const Icon = icon;
  const body = (
    <>
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[calc(12px*var(--ui-scale))]"
        style={{ background: tint(main, 16), color: shade(main, 55) }}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.3} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[calc(17px*var(--ui-scale))] leading-tight font-bold text-ink tabular-nums">
          {value}
        </span>
        <span className="block text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
          {label}
        </span>
        {hint && <span className="mt-0.5 block truncate text-[calc(10.5px*var(--ui-scale))] font-semibold text-ink-soft">{hint}</span>}
      </span>
    </>
  );
  const cls =
    "flex items-center gap-3 rounded-[calc(20px*var(--ui-scale))] border border-ink/[0.06] bg-paper px-4 py-3.5 text-left transition-transform duration-200";
  return onClick ? (
    <button type="button" onClick={onClick} className={`m3-press cursor-pointer hover:-translate-y-0.5 ${cls}`}>
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/* ————— M3 buttons used across the system ————— */

export function FilledButton({
  children,
  onClick,
  main = "#12B886",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  main?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m3-press inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-bold text-white shadow-[0_8px_20px_-8px_color-mix(in_oklab,${main}_55%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 ${className ?? ""}`}
      style={{ background: main }}
    >
      {children}
    </button>
  );
}

export function TonalButton({
  children,
  onClick,
  main = "#12B886",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  main?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m3-press inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-bold transition-transform duration-200 hover:-translate-y-0.5 ${className ?? ""}`}
      style={{ background: tint(main, 15), color: shade(main, 55) }}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THE DESK LEDGER — the dashboard system's spot in the desk.
   One quiet strip, no tabs: the fortnight as bars, the small
   records, and the activity grid. The header's week card carries
   the goal and the streak; this strip carries the shape of the
   days around them. The progress room wears the same kit whole.
   ═══════════════════════════════════════════════════════════════ */

const MINT = "#12B886";

export function DeskDashboard({ onOpenSticker }: { onOpenSticker: () => void }) {
  const hydrated = useHydrated();
  const time = useTimeData();
  const today = todaySeconds(time);
  const streak = streakOf(time.days);

  const days14 = lastNDays(time, 14);
  const avg = avgDayOf(time, 14);
  const active = activeDaysOf(days14);
  const best = bestDayOf(time);

  const recordRow =
    "flex items-center gap-3.5 py-3 [&+&]:border-t [&+&]:border-ink/[0.07]";

  return (
    <div className="bg-cream">
      <section aria-label="Your ledger" className="mx-auto max-w-6xl px-5 pt-3 pb-16 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
        <h2 className="font-display text-[calc(22px*var(--ui-scale))] font-semibold tracking-tight text-ink sm:text-[calc(24px*var(--ui-scale))]">
          The ledger
        </h2>
        <button
          type="button"
          onClick={onOpenSticker}
          className="group inline-flex cursor-pointer items-center gap-1.5 text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-faint transition-colors hover:text-ink"
        >
          time &amp; goals
          <MoveRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.4} />
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {/* the last fortnight */}
        <div className="rounded-[calc(24px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              the last fortnight
            </p>
            <span className="text-[calc(10.5px*var(--ui-scale))] font-bold text-ink-faint tabular-nums">
              {active}/14 active days
            </span>
          </div>
          <div className="mt-4">
            <WeekBars bars={days14} main={MINT} height={96} />
          </div>
        </div>

        {/* the record */}
        <div className="rounded-[calc(24px*var(--ui-scale))] border border-ink/[0.06] bg-paper px-5 py-2 sm:px-6">
          <div className={recordRow}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[calc(12px*var(--ui-scale))]" style={{ background: tint(MINT, 16), color: shade(MINT, 55) }}>
              <Clock className="h-[18px] w-[18px]" strokeWidth={2.3} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[calc(17px*var(--ui-scale))] leading-tight font-bold text-ink tabular-nums">
                {fmtClock(today)}
              </span>
              <span className="block text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                today
              </span>
            </span>
          </div>
          <div className={recordRow}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[calc(12px*var(--ui-scale))]" style={{ background: tint("#F59F00", 16), color: shade("#F59F00", 55) }}>
              <Trophy className="h-[18px] w-[18px]" strokeWidth={2.3} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[calc(17px*var(--ui-scale))] leading-tight font-bold text-ink tabular-nums">
                {best ? fmtClock(best.total) : "0 min"}
              </span>
              <span className="block text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                best day
                {hydrated && best && (
                  <span className="ml-1.5 normal-case tracking-[0.02em] text-ink-soft">
                    {new Date(`${best.key}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                )}
              </span>
            </span>
          </div>
          <div className={recordRow}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[calc(12px*var(--ui-scale))]" style={{ background: tint("#9775FA", 16), color: shade("#9775FA", 55) }}>
              <Gauge className="h-[18px] w-[18px]" strokeWidth={2.3} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[calc(17px*var(--ui-scale))] leading-tight font-bold text-ink tabular-nums">
                {fmtClock(avg)}
              </span>
              <span className="block text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                daily average
              </span>
            </span>
          </div>
        </div>

        {/* the activity grid */}
        <div className="rounded-[calc(24px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              the activity grid
            </p>
            {streak >= 2 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/15 px-2.5 py-1 text-[calc(10.5px*var(--ui-scale))] font-extrabold text-coral">
                <Footprints className="h-3.5 w-3.5" strokeWidth={2.4} />
                {streak}-day streak
              </span>
            )}
          </div>
          <div className="mt-4">
            <Heatmap main={MINT} weeks={12} />
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
