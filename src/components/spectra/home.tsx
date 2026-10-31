"use client";

import { ArrowUpRight, BookOpen, FlaskConical, ListChecks, Sigma } from "lucide-react";
import type { Unit } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { SpectrumHero, MiniSpectrum } from "./spectrum";
import { Reveal } from "./blocks";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · home — the observatory entrance
   ═══════════════════════════════════════════════════════════════ */

export function Home({ units, onOpenUnit }: { units: Unit[]; onOpenUnit: (code: string) => void }) {
  const hours = Math.round(TOTALS.minutes / 60);

  return (
    <div>
      {/* ————— hero ————— */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
        <Reveal>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-ink-3">
            Pearson Edexcel International A Level · Chemistry · 2018 specification
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6.4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
            Chemistry, read by the{" "}
            <span className="font-serif italic tracking-normal">light it gives off.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-[1.8] text-ink-2">
            Complete revision notes for WCH11 to WCH16, written to the 2018 specification.
            Each unit carries the colour of a flame test — because colour is data. Lithium
            burns crimson at 670.8&nbsp;nm, sodium gold at 589.0. Learn to look closely, and
            the subject organises itself.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenUnit("WCH11")}
              className="group inline-flex items-center gap-2 rounded-[4px] bg-ink px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Begin with Unit 1
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#spectrum"
              className="inline-flex items-center gap-2 rounded-[4px] border border-line px-5 py-2.5 text-[14px] font-medium text-ink-2 transition-colors hover:border-flame hover:text-ink"
            >
              Read the spectrum
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-y border-line-soft py-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
            <span>
              <span className="text-ink">6</span> units
            </span>
            <span>
              <span className="text-ink">{TOTALS.topics}</span> topics
            </span>
            <span>
              <span className="text-ink">≈{hours} h</span> of reading
            </span>
            <span>
              <span className="text-ink">{TOTALS.examples}</span> worked examples
            </span>
            <span>
              <span className="text-ink">{TOTALS.checks}</span> check questions
            </span>
            <span>
              <span className="text-ink">{TOTALS.tables}</span> reference tables
            </span>
          </div>
        </Reveal>
      </section>

      {/* ————— fig. 1 — the spectrum ————— */}
      <section id="spectrum" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="rounded-[4px] border border-line bg-bg-raise px-4 py-6 sm:px-8">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-3">
                Fig. 1 — six units on one wavelength axis
              </h2>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 sm:block">
                click a line · open its unit
              </span>
            </div>
            <SpectrumHero units={units} onOpenUnit={onOpenUnit} />
            <p className="mt-4 max-w-[70ch] text-[13px] leading-relaxed text-ink-3">
              Every flame test in the course, plotted where it truly falls. The units of the
              A level are not a list to memorise — they are six colours in one continuum, and
              each colour opens a door.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ————— the six papers ————— */}
      <section id="units" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-flame">
                Section 1
              </p>
              <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.01em] text-ink">
                The six papers
              </h2>
            </div>
            <p className="max-w-sm text-right text-[13.5px] leading-relaxed text-ink-3">
              Two written units, one practical, twice. Each carries a flame, a wavelength and
              a paper with fixed weight.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u, i) => (
            <Reveal key={u.code} delay={i * 55}>
              <button
                onClick={() => onOpenUnit(u.code)}
                className="unit-card group block w-full rounded-[4px] bg-bg-raise p-5 text-left"
                style={{ "--u": u.color } as React.CSSProperties}
                aria-label={`Open ${u.code} — ${u.title}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-[2px] border px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.14em]"
                    style={{ color: u.color, borderColor: `color-mix(in oklab, ${u.color} 45%, transparent)` }}
                  >
                    {u.code}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">
                    {u.stage} · {u.paper.ialWeight}
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-3">
                  <span
                    className="flame-glow text-[42px] font-bold leading-none tracking-tight"
                    style={{ color: u.color, "--fd": `${i * 0.7}s` } as React.CSSProperties}
                  >
                    {u.element.symbol}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                    {u.element.name} · {u.element.flameName}
                    <br />
                    λ {u.element.nm} nm
                  </span>
                </div>

                <h3 className="mt-4 text-[16.5px] font-semibold leading-snug text-ink">
                  {u.title}
                </h3>
                <p className="mt-1.5 font-serif text-[14.5px] italic leading-relaxed text-ink-2">
                  {u.blurb}
                </p>

                <div className="mt-4">
                  <MiniSpectrum unit={u} />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  <span>
                    {u.topicRange} · {u.topics.length} topics · {u.paper.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-ink-2 transition-transform group-hover:translate-x-0.5">
                    open <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— the method ————— */}
      <section id="method" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-flame">
            Section 2
          </p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.01em] text-ink">
            How every note is built
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              eyebrow: "Definitions first",
              body: "Every term the spec can ask for, in one bordered box with the examiner's exact wording.",
              quote: "“gaseous atoms — both states, or the mark is gone.”",
            },
            {
              icon: Sigma,
              eyebrow: "Worked chains",
              body: "Calculations shown step by step, from the numbers given to a 3-significant-figure answer with its unit.",
              quote: "“÷1000 for cm³ — before touching the calculator.”",
            },
            {
              icon: FlaskConical,
              eyebrow: "Examiner's notes",
              body: "The phrases that carry marks, the classic traps, and the vocabulary each command word demands.",
              quote: "“decolourises — not 'goes clear'.”",
            },
            {
              icon: ListChecks,
              eyebrow: "Check & recap",
              body: "Self-test questions with hidden answers, then a numbered recap you can read in ninety seconds.",
              quote: "“revised this topic? tick it — the site remembers.”",
            },
          ].map((f, i) => (
            <Reveal key={f.eyebrow} delay={i * 60}>
              <div className="h-full rounded-[4px] border border-line bg-bg-raise p-5">
                <f.icon className="h-[18px] w-[18px] text-flame" strokeWidth={1.75} />
                <h3 className="mt-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink">
                  {f.eyebrow}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-ink-2">{f.body}</p>
                <p className="mt-3 font-serif text-[13.5px] italic leading-snug text-ink-3">
                  {f.quote}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— colour is data ————— */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="rounded-[4px] border border-line bg-bg-raise px-6 py-8 sm:px-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.01em] text-ink">
                Colour is <span className="font-serif italic">data</span>
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
                the six flames · real emission lines
              </p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
              {units.map((u, i) => (
                <button
                  key={u.code}
                  onClick={() => onOpenUnit(u.code)}
                  className="group text-left"
                  aria-label={`${u.code}: ${u.element.name}, ${u.element.nm} nanometres`}
                >
                  <span
                    className="mb-3 block h-2 w-2 rounded-full transition-transform group-hover:scale-150"
                    style={{ background: u.color, boxShadow: `0 0 10px ${u.color}`, "--fd": `${i * 0.5}s` } as React.CSSProperties}
                  />
                  <span
                    className="flame-glow block text-[26px] font-bold leading-none"
                    style={{ color: u.color, "--fd": `${i * 0.5}s` } as React.CSSProperties}
                  >
                    {u.element.symbol}
                  </span>
                  <span className="mt-2 block text-[12.5px] text-ink-2">{u.element.name}</span>
                  <span className="mt-0.5 block font-mono text-[10px] tracking-[0.12em] text-ink-3">
                    {u.element.nm} nm · {u.element.flameName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ————— CTA ————— */}
      <section className="mx-auto max-w-6xl px-5 pb-24 text-center sm:px-8">
        <Reveal>
          <p className="mx-auto max-w-xl font-serif text-[clamp(1.35rem,2.6vw,1.8rem)] italic leading-snug text-ink">
            “Start where you are weakest — the flames don&rsquo;t judge.”
          </p>
          <a
            href="#units"
            className="mt-7 inline-flex items-center gap-2 rounded-[4px] bg-ink px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Browse the six papers <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
