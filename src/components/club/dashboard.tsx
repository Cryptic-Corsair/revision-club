"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { m } from "framer-motion";
import {
  Award,
  Check,
  Clock,
  Flame,
  Footprints,
  Gauge,
  Lock,
  MoveRight,
  PieChart,
  Sparkles,
  Target,
  Timer,
  Trophy,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { useRevised, useHydrated } from "@/lib/spectra/progress";
import { fmtClock, fmtShort, useTimeData } from "@/lib/spectra/time";
import {
  ACHIEVEMENTS,
  achievementEarned,
  goalChipLabel,
  progressSummary,
  revisedLine,
} from "@/lib/spectra/progress-derive";
import {
  activeDaysOf,
  avgDayOf,
  barMaxOf,
  bestDayOf,
  heatWeeksOf,
  lastNDays,
  recentTopicsOf,
  unitStatOf,
  weekBarsOf,
  type DayBar,
} from "@/lib/spectra/dashboard";
import { findTopic } from "@/lib/spectra/suggest";
import { shade, tint } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the dashboard system
   A kit of Material-3-flavoured widgets dressed in the club's own
   candy: Rings, WeekBars, the Heatmap, Segmented controls, StatTiles
   and DashCards — the aurora surfaces that carry the gradients.
   Everything reads the shared ledgers through lib/spectra/dashboard.ts,
   so the desk's dashboard and the progress room render the same
   numbers from the same maths.

   The kit's look: big M3 radii, tonal candy washes instead of flat
   greys, gradient strokes, honest ink. Gradients are built from the
   unit candies and mixed against var(--color-paper), so every lab —
   daylight, dune, the dark moods — inks them correctly for free.
   ═══════════════════════════════════════════════════════════════ */

/* ————— DashCard — the aurora surface —————
   Four candy lights (CSS vars --a1…--a4) bloom through a paper base;
   the CSS dress in globals.css does the layering and the grain. */

export function DashCard({
  a1 = "#12B886",
  a2 = "#9775FA",
  a3 = "#FF6B6B",
  a4 = "#F59F00",
  className,
  children,
  style,
}: {
  a1?: string;
  a2?: string;
  a3?: string;
  a4?: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`dash-aurora relative overflow-hidden ${className ?? ""}`}
      style={{ "--a1": a1, "--a2": a2, "--a3": a3, "--a4": a4, ...style } as CSSProperties}
    >
      <div className="dash-grain" aria-hidden />
      {children}
    </div>
  );
}

/* ————— Ring — the M3 circular progress —————
   Gradient stroke along the sweep, candy c1 → c2, rounded caps,
   anything can sit in the middle. */

export function Ring({
  pct,
  size = 96,
  stroke = 10,
  c1 = "#12B886",
  c2 = "#9775FA",
  track = "color-mix(in oklab, var(--color-ink) 9%, transparent)",
  children,
  className,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  c1?: string;
  c2?: string;
  track?: string;
  children?: ReactNode;
  className?: string;
}) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = `ring-grad-${raw}`;
  const p = Math.max(0, Math.min(1, pct));
  const r = (100 - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      className={`relative inline-grid shrink-0 place-items-center ${className ?? ""}`}
      style={{ width: `calc(${size}px*var(--ui-scale))`, height: `calc(${size}px*var(--ui-scale))` }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <m.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
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
   One rounded column per day; today's bar wears the full candy
   gradient and a dot, the past weeks wear it faded, the days that
   haven't happened yet sit as hollow slots. */

export function WeekBars({
  bars,
  c1 = "#12B886",
  c2 = "#9775FA",
  height = 96,
}: {
  bars: DayBar[];
  c1?: string;
  c2?: string;
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
                    background: b.today
                      ? `linear-gradient(180deg, ${c2}, ${c1})`
                      : `linear-gradient(180deg, ${tint(c2, 30)}, ${tint(c1, 25)})`,
                    opacity: b.future ? 0 : b.today ? 1 : 0.66,
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
            {b.today && (
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: `linear-gradient(135deg, ${c2}, ${c1})` }}
              />
            )}
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
                ? {
                    background: `linear-gradient(135deg, ${tint(main, 18)}, ${tint(main, 4)})`,
                    color: shade(main, 55),
                  }
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
  c1 = "#12B886",
  c2 = "#9775FA",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  c1?: string;
  c2?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m3-press inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-bold text-white shadow-[0_8px_20px_-8px_color-mix(in_oklab,${c1}_55%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 ${className ?? ""}`}
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
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
   THE DESK DASHBOARD — the assembled system in the desk.
   Three tabs on a segmented control: Bench (the clock), Course
   (the six units), Activity (the grid, the streaks, the badges).
   ═══════════════════════════════════════════════════════════════ */

type TabId = "bench" | "course" | "activity";

export function DeskDashboard({
  units,
  onOpenUnit,
  onOpenTopic,
  onOpenSticker,
}: {
  units: Unit[];
  onOpenUnit: (code: string) => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
  onOpenSticker: () => void;
}) {
  const hydrated = useHydrated();
  const revised = useRevised();
  const time = useTimeData();
  const [tab, setTab] = useState<TabId>("bench");
  const s = progressSummary(units, revised, time);
  const mint = "#12B886";

  const days14 = lastNDays(time, 14);
  const week = weekBarsOf(time);
  const best = bestDayOf(time);
  const avg = avgDayOf(time, 14);
  const active = activeDaysOf(days14);
  const recents = recentTopicsOf(time, 4);

  const TABS = [
    { id: "bench" as const, label: "Bench", icon: Timer },
    { id: "course" as const, label: "Course", icon: PieChart },
    { id: "activity" as const, label: "Activity", icon: Flame },
  ];

  return (
    <section aria-label="Your dashboard" className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[calc(11px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
            {hydrated ? "live from your ledger" : "your ledger"}
          </p>
          <h2 className="mt-1 font-display text-[calc(24px*var(--ui-scale))] font-semibold tracking-tight text-ink sm:text-[calc(26px*var(--ui-scale))]">
            Your dashboard
          </h2>
        </div>
        <Segmented value={tab} onChange={setTab} options={TABS} main={mint} />
      </div>

      {/* ————— BENCH — the clock ————— */}
      {tab === "bench" && (
        <m.div
          key="bench"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
        >
          <DashCard className="rounded-[calc(28px*var(--ui-scale))] p-6 sm:p-7" a1="#12B886" a2="#9775FA" a4="#F59F00">
            <div className="relative z-10 flex flex-wrap items-center gap-6">
              <Ring pct={s.weekPct} size={104} stroke={11} c1="#12B886" c2="#9775FA">
                <span className="font-display text-[calc(20px*var(--ui-scale))] font-bold text-ink tabular-nums">
                  {Math.round(s.weekPct * 100)}%
                </span>
                <span className="mt-0.5 text-[calc(9px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                  of goal
                </span>
              </Ring>
              <div className="min-w-0 flex-1">
                <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
                  this week on the bench
                </p>
                <p className="mt-1 font-display text-[calc(30px*var(--ui-scale))] leading-none font-bold text-ink tabular-nums">
                  {fmtClock(s.week)}
                </p>
                <p className="mt-1.5 text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-soft">
                  goal {goalChipLabel(s.goalMin)} · {s.today > 0 ? `${fmtClock(s.today)} today` : "today still at zero"}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {s.streak >= 2 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[calc(11px*var(--ui-scale))] font-extrabold text-white"
                      style={{ background: "linear-gradient(135deg, #FF6B6B, #FF922B)" }}>
                      <Flame className="h-3.5 w-3.5" strokeWidth={2.4} /> {s.streak}-day streak
                    </span>
                  )}
                  {s.goalMet && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1.5 text-[calc(11px*var(--ui-scale))] font-extrabold text-mint">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} /> weekly goal met
                    </span>
                  )}
                  <FilledButton
                    c1="#12B886"
                    c2="#9775FA"
                    onClick={onOpenSticker}
                    className="!min-h-[calc(36px*var(--ui-scale))] !px-4 !py-1.5 !text-[calc(11.5px*var(--ui-scale))]"
                  >
                    Time &amp; goals <MoveRight className="h-4 w-4" />
                  </FilledButton>
                </div>
              </div>
            </div>
          </DashCard>

          <div className="rounded-[calc(28px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
                the last fortnight
              </p>
              <span className="text-[calc(10.5px*var(--ui-scale))] font-bold text-ink-faint">{active}/14 active days</span>
            </div>
            <div className="mt-4">
              <WeekBars bars={days14} c1="#12B886" c2="#9775FA" height={86} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
            <StatTile icon={Clock} main="#12B886" value={fmtClock(s.today)} label="today" hint="banked so far" />
            <StatTile
              icon={Trophy}
              main="#F59F00"
              value={best ? fmtClock(best.total) : "0 min"}
              label="best day"
              hint={hydrated && best ? new Date(`${best.key}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—"}
            />
            <StatTile icon={Gauge} main="#9775FA" value={fmtClock(avg)} label="daily average" hint="last 14 days" />
          </div>
        </m.div>
      )}

      {/* ————— COURSE — the six units ————— */}
      {tab === "course" && (
        <m.div
          key="course"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]"
        >
          <DashCard className="rounded-[calc(28px*var(--ui-scale))] p-6 sm:p-7" a1="#FF6B6B" a2="#F59F00" a3="#9775FA" a4="#12B886">
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <Ring pct={s.pct} size={124} stroke={12} c1="#FF6B6B" c2="#F59F00">
                <span className="font-display text-[calc(26px*var(--ui-scale))] font-bold text-ink tabular-nums">
                  {Math.round(s.pct * 100)}%
                </span>
                <span className="mt-0.5 text-[calc(9px*var(--ui-scale))] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                  revised
                </span>
              </Ring>
              <p className="font-display text-[calc(17px*var(--ui-scale))] leading-snug font-semibold text-ink">
                {s.revisedCount} of {TOTALS.topics} topics
              </p>
              <p className="-mt-2 text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-soft">{revisedLine(s.pct, s.revisedCount)}</p>
              <FilledButton
                c1="#FF6B6B"
                c2="#F59F00"
                onClick={onOpenSticker}
                className="!min-h-[calc(36px*var(--ui-scale))] !px-4 !py-1.5 !text-[calc(11.5px*var(--ui-scale))]"
              >
                Mark topics <MoveRight className="h-4 w-4" />
              </FilledButton>
            </div>
          </DashCard>

          <div className="flex flex-col gap-2.5">
            {units.map((u) => {
              const stat = unitStatOf(u, revised, time);
              return (
                <button
                  key={u.code}
                  type="button"
                  onClick={() => onOpenUnit(u.code)}
                  className="m3-press group flex cursor-pointer items-center gap-3.5 rounded-[calc(20px*var(--ui-scale))] border border-ink/[0.06] bg-paper px-4 py-3 text-left transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Ring pct={stat.pct} size={40} stroke={5} c1={u.candy.main} c2={shade(u.candy.main, 25)}>
                    <span className="text-[calc(8.5px*var(--ui-scale))] font-extrabold text-ink-soft tabular-nums">
                      {Math.round(stat.pct * 100)}
                    </span>
                  </Ring>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.14em]" style={{ color: u.candy.main }}>
                        {u.code}
                      </span>
                      <span className="text-[calc(10px*var(--ui-scale))] font-bold text-ink-faint">{stat.done}/{stat.topics} revised</span>
                    </span>
                    <span className="block truncate font-display text-[calc(14px*var(--ui-scale))] font-semibold text-ink">
                      {u.shortTitle}
                    </span>
                    <span className="mt-1.5 block h-[calc(5px*var(--ui-scale))] w-full overflow-hidden rounded-full bg-ink/[0.06]">
                      <m.span
                        className="block h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${u.candy.main}, ${shade(u.candy.main, 30)})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(stat.pct * 100, stat.done > 0 ? 4 : 0)}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 22 }}
                      />
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-1 text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint tabular-nums sm:flex">
                    <Clock className="h-3.5 w-3.5" /> {fmtShort(stat.seconds)}
                  </span>
                  <MoveRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.4} />
                </button>
              );
            })}
          </div>
        </m.div>
      )}

      {/* ————— ACTIVITY — the grid, streaks, badges ————— */}
      {tab === "activity" && (
        <m.div
          key="activity"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
        >
          <div className="flex flex-col gap-4">
            <div className="rounded-[calc(28px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
                  the activity grid
                </p>
                <span className="inline-flex items-center gap-1.5 text-[calc(11px*var(--ui-scale))] font-bold text-ink-soft">
                  <Footprints className="h-3.5 w-3.5 text-coral" /> {s.streak}-day streak
                </span>
              </div>
              <div className="mt-4">
                <Heatmap main="#12B886" weeks={20} />
              </div>
            </div>

            {recents.length > 0 && (
              <div className="rounded-[calc(28px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
                <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
                  recent sessions
                </p>
                <div className="mt-3 flex flex-col">
                  {recents.map((r) => {
                    const [code, topicId] = r.key.split("/");
                    const t = findTopic(units, code as UnitCode, topicId);
                    if (!t) return null;
                    return (
                      <button
                        key={`${r.key}-${r.when}`}
                        type="button"
                        onClick={() => onOpenTopic(code as UnitCode, topicId)}
                        className="m3-press -mx-2 flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-2.5 text-left transition-colors hover:bg-ink/[0.035]"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: t.unit.candy.main }} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[calc(13px*var(--ui-scale))] font-semibold text-ink">
                            {t.topic.label} · {t.topic.title}
                          </span>
                          <span className="text-[calc(10.5px*var(--ui-scale))] font-bold text-ink-faint">{r.when}</span>
                        </span>
                        <span className="shrink-0 text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-soft tabular-nums">
                          {fmtShort(r.seconds)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[calc(28px*var(--ui-scale))] border border-ink/[0.06] bg-paper p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
                badges
              </p>
              <span className="text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint">
                {ACHIEVEMENTS.filter((a) => achievementEarned(a.id, { units, revised, revisedCount: s.revisedCount, pct: s.pct, all: s.all, deepDive: s.deepDive })).length}/{ACHIEVEMENTS.length}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {ACHIEVEMENTS.map((a) => {
                const earned = achievementEarned(a.id, { units, revised, revisedCount: s.revisedCount, pct: s.pct, all: s.all, deepDive: s.deepDive });
                return (
                  <div
                    key={a.id}
                    title={a.hint}
                    className={`flex min-w-0 items-center gap-3 rounded-[calc(16px*var(--ui-scale))] border px-3.5 py-3 ${
                      earned ? "border-transparent" : "border-dashed border-ink/[0.12]"
                    }`}
                    style={
                      earned
                        ? { background: "linear-gradient(135deg, color-mix(in oklab, #12B886 10%, var(--color-paper)), color-mix(in oklab, #9775FA 10%, var(--color-paper)))" }
                        : undefined
                    }
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-[calc(10px*var(--ui-scale))]"
                      style={
                        earned
                          ? { background: "linear-gradient(135deg, #12B886, #9775FA)", color: "#fff" }
                          : { color: "var(--color-ink-faint)" }
                      }
                    >
                      {earned ? <BadgeIcon id={a.id} /> : <Lock className="h-4 w-4" strokeWidth={2.2} />}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-display text-[calc(12.5px*var(--ui-scale))] leading-tight font-bold ${earned ? "text-ink" : "text-ink-faint"}`}>
                        {a.label}
                      </span>
                      <span className="block truncate text-[calc(10px*var(--ui-scale))] font-semibold text-ink-faint">{a.hint}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </m.div>
      )}
    </section>
  );
}

function BadgeIcon({ id }: { id: string }) {
  const cls = "h-4 w-4";
  switch (id) {
    case "first-topic": return <Sparkles className={cls} strokeWidth={2.4} />;
    case "unit-complete": return <Check className={cls} strokeWidth={2.8} />;
    case "halfway": return <Gauge className={cls} strokeWidth={2.4} />;
    case "first-hour": return <Timer className={cls} strokeWidth={2.4} />;
    case "deep-dive": return <Target className={cls} strokeWidth={2.4} />;
    default: return <Award className={cls} strokeWidth={2.4} />;
  }
}
