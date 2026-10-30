"use client";

import { useState } from "react";
import { SUBJECTS, GROUPS, type Subject, type Status } from "@/lib/data";
import { Mcq, Reveal, SectionHead, Stamp, Tick } from "./primitives";

export function StatusBadge({ status }: { status: Status }) {
  if (status === "live") return <Stamp pressed>Notes live</Stamp>;
  if (status === "partial") return <Stamp graphite pressed>In progress</Stamp>;
  return <Stamp graphite>Coming soon</Stamp>;
}

export function SubjectCard({
  subject,
  onOpen,
  delay = 0,
}: {
  subject: Subject;
  onOpen: () => void;
  delay?: number;
}) {
  const unitCount = subject.units.length;
  const topicCount = subject.units.reduce((n, u) => n + u.topics.length, 0);
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={onOpen}
        className="paper-card group text-left w-full p-6 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[4px_4px_0_rgba(191,59,43,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-pen"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="font-marks text-[11.5px] tracking-[0.14em] text-pen-deep border border-pen/45 rounded-[2px] px-2 py-1">
            {subject.code}
          </span>
          <StatusBadge status={subject.status} />
        </div>
        <h3 className="font-display text-[1.45rem] font-semibold leading-snug mb-2 group-hover:underline decoration-pen decoration-2 underline-offset-4">
          {subject.name}
        </h3>
        <p className="font-body text-[15px] leading-[1.6] text-ink-soft mb-5">{subject.blurb}</p>
        <div className="flex items-center justify-between font-marks text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          <span>
            {unitCount > 0 ? `${unitCount} unit${unitCount === 1 ? "" : "s"} · ${topicCount} topics` : "Unit map in preparation"}
          </span>
          <span className="text-pen text-[15px] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export function Library({ openSubject }: { openSubject: (slug: string) => void }) {
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? SUBJECTS : SUBJECTS.filter((s) => s.group === filter);

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-14 pb-8">
      <SectionHead section="Section A" title="The library" instruction="Answer all questions. Browse every subject." />

      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mb-10" role="group" aria-label="Filter subjects">
        <span className="font-marks text-[11px] uppercase tracking-[0.16em] text-ink-faint mr-1">Choose one:</span>
        <Mcq label="All" active={filter === "All"} onClick={() => setFilter("All")} />
        {GROUPS.map((g) => (
          <Mcq key={g} label={g} active={filter === g} onClick={() => setFilter(g)} />
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((s, i) => (
          <SubjectCard key={s.slug} subject={s} onOpen={() => openSubject(s.slug)} delay={(i % 3) * 70} />
        ))}
      </div>

      {filter !== "All" && visible.length === 0 && (
        <p className="font-body italic text-ink-soft mt-6">Nothing filed under this section yet.</p>
      )}

      <div className="flex items-center gap-3 mt-12 text-ink-faint">
        <Tick size={16} animated={false} />
        <p className="font-marks text-[11px] uppercase tracking-[0.14em]">
          Showing {visible.length} of {SUBJECTS.length} subjects · unit codes follow the 2018 IAL specification
        </p>
      </div>
    </div>
  );
}
