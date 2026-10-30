"use client";

import { useState } from "react";
import { SUBJECTS } from "@/lib/data";
import { Reveal, Stamp, Tick } from "./primitives";
import { StatusBadge } from "./library";

export function SubjectView({
  slug,
  back,
  openTopic,
}: {
  slug: string;
  back: () => void;
  openTopic: (unitSlug: string, topicSlug: string) => void;
}) {
  const subject = SUBJECTS.find((s) => s.slug === slug);
  const [open, setOpen] = useState<Set<string>>(() => new Set(subject?.units[0]?.slug ? [subject.units[0].slug] : []));

  if (!subject) {
    return (
      <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-20 pb-24">
        <p className="font-display text-3xl">Subject not found.</p>
        <button type="button" onClick={back} className="balllink mt-4 inline-block">
          Back to the library
        </button>
      </div>
    );
  }

  const toggle = (u: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(u)) next.delete(u);
      else next.add(u);
      return next;
    });

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-12 pb-8">
      <button
        type="button"
        onClick={back}
        className="font-marks text-[11.5px] uppercase tracking-[0.16em] text-ink-faint hover:text-pen-deep transition-colors mb-8"
      >
        ◂ Back to the library
      </button>

      <Reveal>
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="font-marks text-[12px] tracking-[0.16em] text-pen-deep border-[1.5px] border-pen/50 rounded-[2px] px-2.5 py-1">
              {subject.code}
            </span>
            <StatusBadge status={subject.status} />
          </div>
          <h1 className="font-display font-semibold text-[2.4rem] md:text-[3rem] leading-[1.05] tracking-[-0.015em] mb-4">
            {subject.name}
          </h1>
          <p className="font-body text-[18px] leading-[1.7] text-ink-soft max-w-[62ch]">{subject.blurb}</p>
        </div>
      </Reveal>

      {subject.examStructure && (
        <Reveal>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {subject.examStructure.map((row) => (
              <div key={row.label} className="paper-card px-5 py-4">
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep mb-1.5">{row.label}</p>
                <p className="font-body text-[15.5px] leading-[1.55] text-ink/90">{row.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal>
        <p className="instruction mb-5">
          Unit map — <span className="normal-case">tick what you have revised</span>
        </p>
      </Reveal>

      <div className="space-y-3">
        {subject.units.map((unit, i) => {
          const isOpen = open.has(unit.slug);
          return (
            <Reveal key={unit.slug} delay={Math.min(i * 50, 200)}>
              <div className="paper-card">
                <button
                  type="button"
                  onClick={() => toggle(unit.slug)}
                  className="w-full flex items-center gap-4 md:gap-5 px-5 md:px-6 py-4.5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep w-[4.6rem] shrink-0">
                    Unit {i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-display font-semibold text-[1.15rem] leading-snug block">{unit.name}</span>
                    <span className="font-marks text-[11px] tracking-[0.12em] text-ink-faint">
                      {unit.code}
                      {unit.weight ? ` · ${unit.weight}` : ""}
                      {unit.topics.length > 0 ? ` · ${unit.topics.length} topics` : ""}
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
                      {unit.topics.length === 0 && (
                        <p className="font-body italic text-[15.5px] text-ink-faint py-2">
                          Topic breakdown in progress — this unit is being mapped to the spec.
                        </p>
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
                            <span
                              className="w-4 h-4 rounded-full border border-rule shrink-0"
                              aria-hidden="true"
                            />
                            <span className="font-body text-[16.5px] text-ink-soft flex-1">{topic.title}</span>
                            <span className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                              TBC
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
