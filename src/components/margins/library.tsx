"use client";

import { useState } from "react";
import { CHEMISTRY, type Unit } from "@/lib/data";
import { Reveal, SectionHead, Stamp, Tick } from "./primitives";

export function StatusBadge({ status }: { status: "live" | "partial" | "coming-soon" }) {
  if (status === "live") return <Stamp pressed>Notes live</Stamp>;
  if (status === "partial") return <Stamp graphite pressed>In progress</Stamp>;
  return <Stamp graphite>Coming soon</Stamp>;
}

export function UnitCard({ unit, onOpen, delay = 0 }: { unit: Unit; onOpen: () => void; delay?: number }) {
  const isPractical = unit.practical !== undefined;
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={onOpen}
        className="paper-card group text-left w-full p-6 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[4px_4px_0_rgba(191,59,43,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-pen"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="font-marks text-[11.5px] tracking-[0.14em] text-pen-deep border border-pen/45 rounded-[2px] px-2 py-1">
            {unit.code}
          </span>
          <StatusBadge status={unit.status} />
        </div>
        <h3 className="font-display text-[1.35rem] font-semibold leading-snug mb-2 group-hover:underline decoration-pen decoration-2 underline-offset-4">
          {unit.name}
        </h3>
        <p className="font-body text-[15px] leading-[1.6] text-ink-soft mb-5">
          {isPractical
            ? `The ${unit.period} practical paper — technique and calculations from the lab, set in writing.`
            : `Topic ${unit.topics[0]?.ref?.split("–")[0] ?? ""} onwards · ${unit.points}`}
        </p>
        <div className="flex items-center justify-between font-marks text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          <span>
            Unit {unit.code.slice(-1)} · {unit.weight}
          </span>
          <span className="text-pen text-[15px] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export function Library({ focus, openTopic }: { focus?: string; openTopic: (unitSlug: string, topicSlug: string) => void }) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(focus ? [focus] : [CHEMISTRY.units[0].slug])
  );

  const toggle = (u: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(u)) next.delete(u);
      else next.add(u);
      return next;
    });

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-14 pb-8">
      <Reveal>
        <div className="mb-10">
          <p className="instruction mb-3 text-pen">Section A · The unit map</p>
          <h1 className="font-display font-semibold text-[2.4rem] md:text-[3rem] leading-[1.05] tracking-[-0.015em] mb-4">
            IAL Chemistry, unit by unit
          </h1>
          <p className="font-body text-[18px] leading-[1.7] text-ink-soft max-w-[62ch]">
            {CHEMISTRY.blurb}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {CHEMISTRY.examStructure.map((row) => (
            <div key={row.label} className="paper-card px-5 py-4">
              <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep mb-1.5">{row.label}</p>
              <p className="font-body text-[15.5px] leading-[1.55] text-ink/90">{row.value}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className="instruction mb-5">
          Answer all questions — <span className="normal-case">open a unit and tick what you have revised</span>
        </p>
      </Reveal>

      <div className="space-y-3">
        {CHEMISTRY.units.map((unit, i) => {
          const isOpen = open.has(unit.slug);
          const isPractical = unit.practical !== undefined;
          return (
            <Reveal key={unit.slug} delay={Math.min(i * 50, 200)}>
              <div className="paper-card">
                <button
                  type="button"
                  onClick={() => toggle(unit.slug)}
                  className="w-full flex items-center gap-4 md:gap-5 px-5 md:px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep w-[4.6rem] shrink-0">
                    Unit {i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-display font-semibold text-[1.15rem] leading-snug block">{unit.name}</span>
                    <span className="font-marks text-[11px] tracking-[0.12em] text-ink-faint">
                      {unit.code} · {unit.weight}
                      {!isPractical && unit.topics.length > 0 ? ` · ${unit.topics.length} topics` : ""}
                    </span>
                  </span>
                  <span className="hidden sm:block shrink-0">
                    {unit.topics.some((t) => t.status === "live") ? (
                      <Tick size={20} animated={false} />
                    ) : (
                      <Stamp graphite>WIP</Stamp>
                    )}
                  </span>
                  <span
                    className={`text-ink-faint transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 md:px-6 pb-5">
                    <div className="border-t border-dashed border-rule pt-4 space-y-1">
                      {isPractical && (
                        <ul className="pb-2">
                          {unit.practical!.map((p, pi) => (
                            <li key={pi} className="flex items-center gap-4 px-2 py-2">
                              <span className="font-marks text-[11px] text-ink-faint w-6 shrink-0">
                                {String(pi + 1).padStart(2, "0")}
                              </span>
                              <span className="w-4 h-4 rounded-full border border-rule shrink-0" aria-hidden="true" />
                              <span className="font-body text-[16px] text-ink-soft flex-1">{p}</span>
                            </li>
                          ))}
                          <li className="px-2 pt-2">
                            <MarginNoteInline />
                          </li>
                        </ul>
                      )}
                      {unit.topics.map((topic, ti) =>
                        topic.status === "live" ? (
                          <button
                            key={topic.slug}
                            type="button"
                            onClick={() => openTopic(unit.slug, topic.slug)}
                            className="w-full flex items-center gap-4 px-2 py-2.5 rounded-[2px] text-left hover:bg-paper-deep/60 transition-colors group"
                          >
                            <span className="font-marks text-[11px] text-ink-faint w-6 shrink-0">
                              {String(ti + 1).padStart(2, "0")}
                            </span>
                            <Tick size={16} animated={false} className="shrink-0" />
                            <span className="font-body text-[16.5px] text-ink group-hover:text-pen-deep transition-colors flex-1">
                              {topic.title}
                            </span>
                            {topic.minutes && (
                              <span className="font-marks text-[11px] tracking-[0.1em] text-ink-faint hidden sm:block">
                                {topic.minutes} min
                              </span>
                            )}
                            <span className="font-marks text-[11px] uppercase tracking-[0.12em] text-pen-deep group-hover:translate-x-0.5 transition-transform">
                              Read →
                            </span>
                          </button>
                        ) : (
                          <div key={topic.slug} className="flex items-center gap-4 px-2 py-2.5 opacity-60">
                            <span className="font-marks text-[11px] text-ink-faint w-6 shrink-0">
                              {String(ti + 1).padStart(2, "0")}
                            </span>
                            <span className="w-4 h-4 rounded-full border border-rule shrink-0" aria-hidden="true" />
                            <span className="font-body text-[16.5px] text-ink-soft flex-1">{topic.title}</span>
                            <span className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint hidden sm:inline">
                              {topic.ref ? `spec ${topic.ref}` : "TBC"}
                            </span>
                          </div>
                        )
                      )}
                      {unit.topics.length === 0 && !isPractical && (
                        <p className="font-body italic text-[15.5px] text-ink-faint py-2">
                          Topic breakdown in progress — this unit is being mapped to the spec.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-12 text-ink-faint">
        <Tick size={16} animated={false} />
        <p className="font-marks text-[11px] uppercase tracking-[0.14em]">
          Topic numbering follows the Pearson 2018 specification — 20 topics across 6 units
        </p>
      </div>
    </div>
  );
}


function MarginNoteInline() {
  return (
    <span className="margin-note text-[15px]">
      Units 3 & 6 are written papers — the lab is the syllabus too
    </span>
  );
}
