"use client";

import type { CSSProperties } from "react";
import {
  ClipboardList,
  Clock,
  Command,
  Check,
  MoveRight,
  Target,
  Timer,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { useRevised, useHydrated } from "@/lib/spectra/progress";
import { usePacks } from "@/lib/spectra/packs";
import {
  fmtClock,
  fmtShort,
  topicSeconds,
  useTimeData,
} from "@/lib/spectra/time";
import { findTopic, pickSuggestion } from "@/lib/spectra/suggest";
import type { DeskState } from "@/lib/spectra/desk";
import { BeakerMeter, CandyButton, SectionTag, shade, tint } from "./bits";
import { BandWave } from "./bands";
import { DeskDashboard } from "./dashboard";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the desk — the homepage for members (no account,
   just a flag in the browser). Where the introduction sells the
   club, the desk assumes you're in: your last topic up front, your
   week at a glance, and every topic of the course one quiet tap
   away — rows, not brochures. Nothing here animates: a returning
   visitor wants the bench, not a show. Paints once, answers with
   CSS hovers, saves every tap.
   ═══════════════════════════════════════════════════════════════ */

/** the streak maths lives in progress-derive.ts — shared with the
    progress room and any interface that comes next */

export function Desk({
  units,
  desk,
  onOpenUnit,
  onOpenTopic,
  onOpenSticker,
  onOpenPack,
  onOpenSpec,
  onSearch,
  onShowLanding,
}: {
  units: Unit[];
  desk: DeskState;
  onOpenUnit: (code: string) => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
  onOpenSticker: () => void;
  onOpenPack: () => void;
  onOpenSpec: () => void;
  onSearch: () => void;
  onShowLanding: () => void;
}) {
  const hydrated = useHydrated();
  const revised = useRevised();
  const { picks } = usePacks();
  const time = useTimeData();
  const suggestion = pickSuggestion(units, revised, time);

  /* ————— the continue pick —————
     the last topic you had on the bench leads, unless it's already
     marked revised — then the daily suggestion takes over and the
     last topic demotes to a quiet footnote */
  const lastKey =
    desk.lastUnit && desk.lastTopic ? `${desk.lastUnit}/${desk.lastTopic}` : null;
  const last = lastKey ? findTopic(units, desk.lastUnit as UnitCode, desk.lastTopic as string) : undefined;
  const lastDone = lastKey ? revised.includes(lastKey) : false;
  const lead = last && !lastDone ? last : suggestion ? { unit: suggestion.unit, topic: suggestion.topic } : null;
  const leadTag = last && !lastDone ? "pick up where you left off" : "start here";

  const todayLine = hydrated
    ? new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "short" }).format(new Date())
    : "";

  return (
    <div>
      {/* ————— header + continue ————— */}
      <section className="bg-paper" style={{ paddingTop: "calc(5.25rem + var(--sa-top))" }}>
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-2 sm:px-8">
          <SectionTag main="#12B886" tilt={-1.5}>
            welcome back{todayLine ? ` · ${todayLine}` : ""}
          </SectionTag>
          <h1 className="mt-5 font-display text-[calc(clamp(2.1rem,4.5vw,3.1rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.08] font-semibold tracking-tight text-ink">
            Back to{" "}
            <span className="hero-glow relative inline-block -rotate-2 rounded-[0.35em] px-[0.18em]">
              the bench.
            </span>
          </h1>

          {lead && (
            <div className="mt-7 rounded-[calc(26px*var(--ui-scale))] border border-ink/[0.06] bg-cream p-5 sm:p-6">
              <div className="text-[calc(11px*var(--ui-scale))] font-bold tracking-[0.18em] text-ink-faint uppercase">
                {leadTag}
              </div>
              <div className="mt-2.5 flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: lead.unit.candy.main }}
                />
                <h2 className="font-display text-[calc(18px*var(--ui-scale))] leading-snug font-semibold text-ink sm:text-[calc(20px*var(--ui-scale))]">
                  {lead.topic.label} · {lead.topic.title}
                </h2>
              </div>
              <p className="mt-2 text-[calc(13.5px*var(--ui-scale))] leading-relaxed text-ink-soft">
                {last && !lastDone
                  ? topicSeconds(time, lastKey as string) > 0
                    ? `You've spent ${fmtClock(topicSeconds(time, lastKey as string))} here — the full read is about ${lead.topic.minutes} min.`
                    : `Fresh read — about ${lead.topic.minutes} min all in.`
                  : suggestion
                    ? `${suggestion.reason} — about ${lead.topic.minutes} min of reading.`
                    : ""}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <CandyButton
                  main={lead.unit.candy.main}
                  onClick={() => onOpenTopic(lead.unit.code, lead.topic.id)}
                >
                  {last && !lastDone ? "Resume reading" : "Start reading"}{" "}
                  <MoveRight className="h-5 w-5" />
                </CandyButton>
                {last && !lastDone && suggestion && suggestion.key !== lastKey && (
                  <button
                    type="button"
                    onClick={() => onOpenTopic(suggestion.unit.code, suggestion.topic.id)}
                    className="inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-1.5 rounded-full px-3 font-display text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink-soft transition-colors hover:text-ink"
                  >
                    instead: {suggestion.topic.label} — {suggestion.topic.title}
                    <MoveRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ————— the dashboard — the ledger, dressed ————— */}
      <DeskDashboard
        units={units}
        onOpenUnit={onOpenUnit}
        onOpenTopic={onOpenTopic}
        onOpenSticker={onOpenSticker}
      />

      {/* ————— all topics, one tap away ————— */}
      <BandWave from="var(--color-paper)" to="var(--color-cream)" wave={1} />
      <div className="bg-cream">
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
            <h2 className="font-display text-[calc(22px*var(--ui-scale))] font-semibold tracking-tight text-ink sm:text-[calc(24px*var(--ui-scale))]">
              All topics, one tap away
            </h2>
            <p className="text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-faint">
              no stops, no menus — pick a topic and you&apos;re reading
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:gap-5">
            {units.map((u) => {
              const done = revised.filter((k) => k.startsWith(`${u.code}/`)).length;
              return (
                <div key={u.code} className="rounded-[calc(26px*var(--ui-scale))] bg-paper p-3 puff sm:p-4">
                  {/* unit header */}
                  <button
                    type="button"
                    onClick={() => onOpenUnit(u.code)}
                    aria-label={`Open ${u.code} — ${u.title}`}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-2 pt-2 pb-3 text-left"
                  >
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-[calc(14px*var(--ui-scale))] font-display text-[calc(17px*var(--ui-scale))] font-bold"
                      style={{ background: tint(u.candy.main, 15), color: shade(u.candy.main, 62) }}
                    >
                      {u.index}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.14em]"
                        style={{ color: u.candy.main }}
                      >
                        {u.code}
                      </span>
                      <span className="block truncate font-display text-[calc(16.5px*var(--ui-scale))] leading-tight font-semibold text-ink">
                        {u.shortTitle}
                        <span className="ml-2 text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint">
                          {u.topicRange}
                        </span>
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2.5">
                      <span className="text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint">
                        {done}/{u.topics.length} revised
                      </span>
                      <BeakerMeter pct={u.topics.length ? done / u.topics.length : 0} main={u.candy.main} size={30} />
                    </span>
                  </button>

                  {/* the topic rows */}
                  <div className="flex flex-col">
                    {u.topics.map((t, i) => {
                      const key = `${u.code}/${t.id}`;
                      const isRevised = revised.includes(key);
                      const secs = topicSeconds(time, key);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onOpenTopic(u.code, t.id)}
                          aria-label={`Open ${t.label} — ${t.title}`}
                          className={`group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-ink/[0.035] ${i > 0 ? "border-t border-ink/[0.06]" : ""}`}
                        >
                          <span
                            className="w-7 shrink-0 text-center font-display text-[calc(14px*var(--ui-scale))] font-bold"
                            style={{ color: u.candy.main }}
                          >
                            {t.no}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[calc(14.5px*var(--ui-scale))] leading-snug font-semibold text-ink">
                              {t.title}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2.5">
                            {secs > 0 && (
                              <span className="inline-flex items-center gap-1 text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint tabular-nums">
                                <Clock className="h-3 w-3" /> {fmtShort(secs)}
                              </span>
                            )}
                            {isRevised && (
                              <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/20 text-mint">
                                <Check className="h-3 w-3" strokeWidth={3.2} />
                              </span>
                            )}
                            <MoveRight
                              className="h-4 w-4 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                              strokeWidth={2.4}
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ————— the toolkit strip ————— */}
      <BandWave from="var(--color-cream)" to="var(--color-paper)" wave={4} />
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 pt-6 pb-14 sm:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                {
                  icon: Command,
                  color: "#9775FA",
                  label: "Search",
                  hint: "press ⌘K anywhere",
                  open: onSearch,
                },
                {
                  icon: ClipboardList,
                  color: "#FFD43B",
                  label: "Revision pack",
                  hint: picks.length > 0 ? `${picks.length} points ticked` : "tick points, get one read",
                  open: onOpenPack,
                },
                {
                  icon: Target,
                  color: "#FF6B6B",
                  label: "Spec index",
                  hint: "every statement, A to Z",
                  open: onOpenSpec,
                },
                {
                  icon: Timer,
                  color: "#12B886",
                  label: "Time & goals",
                  hint: "your beaker and your streak",
                  open: onOpenSticker,
                },
              ] as const
            ).map((tool) => (
              <button
                key={tool.label}
                type="button"
                onClick={tool.open}
                className="flex cursor-pointer items-center gap-3.5 rounded-[calc(22px*var(--ui-scale))] border border-ink/[0.06] bg-cream px-4 py-4 text-left transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[calc(15px*var(--ui-scale))]"
                  style={
                    {
                      background: tint(tool.color, 16),
                      color: shade(tool.color, 55),
                    } as CSSProperties
                  }
                >
                  <tool.icon className="h-5 w-5" strokeWidth={2.3} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[calc(15px*var(--ui-scale))] leading-tight font-semibold text-ink">
                    {tool.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[calc(11.5px*var(--ui-scale))] font-semibold text-ink-faint">
                    {tool.hint}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* the escape hatch back to the introduction */}
          <p className="mt-10 text-center text-[calc(12.5px*var(--ui-scale))] font-semibold text-ink-faint">
            New here, or feeling nostalgic?{" "}
            <button
              type="button"
              onClick={onShowLanding}
              className="cursor-pointer font-bold text-ink-soft underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
            >
              Read the introduction
            </button>
          </p>
        </div>
      </section>

      {/* hand the page to the footer: the same cream the footer wave
          rises from, so the seam stays a same-colour handshake */}
      <BandWave from="var(--color-paper)" to="var(--color-cream)" wave={0} />
    </div>
  );
}
