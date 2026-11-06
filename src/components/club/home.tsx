"use client";

import type { CSSProperties } from "react";
import {
  Atom,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Flame,
  Gauge,
  ListChecks,
  MoveRight,
  NotebookPen,
  Palette,
  PencilRuler,
  Sparkles,
  Sticker,
  Target,
  TestTubes,
  Timer,
} from "./icons";
import type { Unit, UnitCode } from "@/lib/spectra/types";
import { TOTALS } from "@/lib/spectra/units";
import { useRevised } from "@/lib/spectra/progress";
import { usePacks } from "@/lib/spectra/packs";
import { useTimeData } from "@/lib/spectra/time";
import { pickSuggestion } from "@/lib/spectra/suggest";
import { Mascot } from "./bits";

export const UNIT_ICONS = {
  WCH11: Atom,
  WCH12: Flame,
  WCH13: TestTubes,
  WCH14: Gauge,
  WCH15: Palette,
  WCH16: ClipboardCheck,
} as const;

type HomeProps = {
  units: Unit[];
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenTopic: (code: UnitCode, topicId: string) => void;
  onOpenPack: () => void;
  onOpenSpec: () => void;
};

const STATS = [
  { icon: Atom, label: "units", key: "units" },
  { icon: ListChecks, label: "topics", key: "topics" },
  { icon: PencilRuler, label: "worked examples", key: "examples" },
  { icon: ClipboardCheck, label: "checkpoints", key: "checks" },
] as const;

export function Home({
  units,
  onOpenUnit,
  onOpenSticker,
  onOpenTopic,
  onOpenPack,
  onOpenSpec,
}: HomeProps) {
  const revised = useRevised();
  const { picks } = usePacks();
  const time = useTimeData();
  const suggestion = pickSuggestion(units, revised, time);
  const hours = Math.round(TOTALS.minutes / 60);
  const progress = TOTALS.topics ? Math.round((revised.length / TOTALS.topics) * 100) : 0;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const statValue = (key: (typeof STATS)[number]["key"]) => {
    if (key === "units") return String(units.length);
    if (key === "topics") return String(TOTALS.topics);
    if (key === "examples") return String(TOTALS.examples);
    return String(TOTALS.checks);
  };

  return (
    <main className="rc-home">
      <div className="rc-atmosphere rc-atmosphere-a" aria-hidden />
      <div className="rc-atmosphere rc-atmosphere-b" aria-hidden />

      <section className="rc-hero" aria-labelledby="rc-hero-title">
        <div className="rc-hero-grid">
          <div className="rc-hero-copy">
            <div className="rc-eyebrow"><span className="rc-live-dot" /> PEARSON EDEXCEL · INTERNATIONAL A LEVEL</div>
            <div className="rc-hero-edition">CHEMISTRY / 2018 SPECIFICATION</div>
            <h1 id="rc-hero-title">Chemistry,<br /><em>clicking into place.</em></h1>
            <p className="rc-hero-lede">
              Meet your new favourite revision space. Clear notes, worked examples and
              checkpoints for every point of the Edexcel IAL Chemistry specification —
              all in one beautifully organised place.
            </p>
            <div className="rc-hero-actions">
              <button className="rc-button rc-button-primary" onClick={() => scrollTo("rc-units")}>
                Explore the six units <MoveRight />
              </button>
              <button className="rc-button rc-button-quiet" onClick={onOpenSpec}>
                <BookOpen /> Open specification
              </button>
            </div>
            <div className="rc-trust-line">
              <span className="rc-trust-avatars"><i>R</i><i>C</i><i>+</i></span>
              <span>Built around the spec. Made for the long game.</span>
            </div>
          </div>

          <div className="rc-hero-art" aria-label="A preview of the Reaction Club study experience">
            <div className="rc-art-orbit rc-art-orbit-one" />
            <div className="rc-art-orbit rc-art-orbit-two" />
            <div className="rc-art-glow" />
            <div className="rc-art-label rc-art-label-top"><span>THE STUDY SYSTEM</span><b>01 / 06</b></div>
            <div className="rc-glass-stage">
              <div className="rc-stage-shine" />
              <div className="rc-stage-core"><Mascot main="#FF6B6B" size={154} mood="cheer" bubbles={false} /></div>
              <div className="rc-stage-ring rc-stage-ring-a" />
              <div className="rc-stage-ring rc-stage-ring-b" />
            </div>
            <div className="rc-float-card rc-float-note">
              <span className="rc-float-kicker"><i className="rc-dot rc-dot-mint" /> DEFINITION</span>
              <strong>Enthalpy change</strong>
              <span className="rc-skeleton rc-skeleton-long" />
              <span className="rc-skeleton rc-skeleton-short" />
            </div>
            <div className="rc-float-card rc-float-equation">
              <span className="rc-float-kicker"><i className="rc-dot rc-dot-coral" /> EQUATION</span>
              <strong>pV = nRT</strong>
              <small>Ideal gas equation</small>
            </div>
            <div className="rc-float-pill"><Sparkles /> Read · practise · remember</div>
            <div className="rc-art-label rc-art-label-bottom"><span>WCH11—WCH16</span><b>EDITION 2018</b></div>
          </div>
        </div>

        <div className="rc-hero-stats" aria-label="Course content at a glance">
          {STATS.map((stat) => (
            <div className="rc-stat" key={stat.key}>
              <span className="rc-stat-icon"><stat.icon /></span>
              <span className="rc-stat-number">{statValue(stat.key)}</span>
              <span className="rc-stat-label">{stat.label}</span>
            </div>
          ))}
          <div className="rc-stat rc-stat-reading">
            <span className="rc-stat-icon"><Clock /></span>
            <span className="rc-stat-number">≈{hours}h</span>
            <span className="rc-stat-label">of focused reading</span>
          </div>
        </div>
        <div className="rc-scroll-cue"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section id="rc-units" className="rc-section rc-units">
        <div className="rc-section-heading">
          <div>
            <div className="rc-eyebrow"><span className="rc-eyebrow-index">01</span> THE COURSE</div>
            <h2>Six units. <em>One clear route.</em></h2>
          </div>
          <p>Every topic follows the 2018 specification in order. Pick up where you left off, or open a new unit and start fresh.</p>
        </div>

        <div className="rc-unit-grid">
          {units.map((unit, index) => {
            const Icon = UNIT_ICONS[unit.code];
            const done = revised.filter((item) => item.startsWith(unit.code + "/")).length;
            const pct = unit.topics.length ? Math.round((done / unit.topics.length) * 100) : 0;
            const minutes = unit.topics.reduce((total, topic) => total + topic.minutes, 0);
            return (
              <button
                key={unit.code}
                type="button"
                className="rc-unit-card"
                onClick={() => onOpenUnit(unit.code)}
                aria-label={"Open " + unit.code + " — " + unit.title}
                style={{ "--unit-accent": unit.candy.main } as CSSProperties}
              >
                <span className="rc-unit-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="rc-unit-top">
                  <span className="rc-unit-icon"><Icon /></span>
                  <span className="rc-unit-code">{unit.code}</span>
                  <span className="rc-unit-arrow"><MoveRight /></span>
                </span>
                <span className="rc-unit-title">{unit.title}</span>
                <span className="rc-unit-range">{unit.topicRange}</span>
                <span className="rc-unit-blurb">{unit.blurb}</span>
                <span className="rc-unit-meta">
                  <span>{unit.topics.length} topics</span><i />
                  <span>{minutes} min</span>
                </span>
                <span className="rc-progress-track"><span style={{ width: pct + "%" }} /></span>
                <span className="rc-unit-progress"><b>{done}/{unit.topics.length}</b> topics revised <strong>{pct}%</strong></span>
              </button>
            );
          })}
        </div>
        <div className="rc-spec-footnote">
          <span><span className="rc-live-dot" /> YOUR PROGRESS SAVES AUTOMATICALLY</span>
          <button onClick={onOpenSpec}>Explore the full spec index <MoveRight /></button>
        </div>
      </section>

      <section className="rc-pack-section">
        <div className="rc-pack-panel">
          <div className="rc-pack-copy">
            <div className="rc-eyebrow"><span className="rc-eyebrow-index">02</span> THE REVISION BUILDER</div>
            <h2>Your syllabus.<br /><em>Your revision pack.</em></h2>
            <p>Choose the specification points you want to revisit. Reaction Club gathers the matching notes into one continuous pack you can read, tick off, print or copy.</p>
            <div className="rc-pack-actions">
              <button className="rc-button rc-button-light" onClick={onOpenPack}>
                {picks.length ? "Continue your pack (" + picks.length + ")" : "Build a revision pack"} <MoveRight />
              </button>
              <button className="rc-button rc-button-glass" onClick={onOpenSpec}>Browse spec points</button>
            </div>
          </div>
          <div className="rc-pack-visual">
            <div className="rc-pack-sheet rc-pack-sheet-back"><span>WCH12 / UNIT 2</span><b>Energetics</b><i>Specification checklist</i></div>
            <div className="rc-pack-sheet rc-pack-sheet-front">
              <div className="rc-sheet-top"><span>REACTION CLUB</span><span>YOUR PACK / 001</span></div>
              <h3>Selected<br /><em>spec points.</em></h3>
              <div className="rc-sheet-line"><i /> 2.1 Enthalpy changes <b>✓</b></div>
              <div className="rc-sheet-line"><i /> 2.2 Hess&apos;s law <b>✓</b></div>
              <div className="rc-sheet-line"><i /> 2.3 Born–Haber cycles <b>✓</b></div>
              <div className="rc-sheet-footer"><span>{picks.length} POINTS SELECTED</span><span>↗</span></div>
            </div>
            <div className="rc-pack-count"><ClipboardList /><span><b>{picks.length}</b><small>points selected</small></span></div>
          </div>
        </div>
      </section>

      <section className="rc-section rc-method">
        <div className="rc-section-heading rc-section-heading-center">
          <div>
            <div className="rc-eyebrow"><span className="rc-eyebrow-index">03</span> THE METHOD</div>
            <h2>Understand it. <em>Own it.</em></h2>
          </div>
          <p>Not another wall of text. A simple loop that turns reading into recall and recall into progress.</p>
        </div>
        <div className="rc-method-grid">
          {[
            { number: "01", icon: NotebookPen, title: "Learn the idea", text: "Topic-by-topic notes with definitions, diagrams, equations and worked examples that follow the specification." },
            { number: "02", icon: ClipboardCheck, title: "Test what stuck", text: "Checkpoint questions at the end of topics. Attempt each one, reveal the answer, and compare your working." },
            { number: "03", icon: Sticker, title: "Make progress visible", text: "Mark topics as revised, build a streak of focused sessions and see how far you have come." },
          ].map((step) => (
            <article className="rc-method-card" key={step.number}>
              <div className="rc-method-card-top"><span>{step.number}</span><step.icon /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="rc-method-rule" />
            </article>
          ))}
        </div>
      </section>

      <section className="rc-section rc-tools">
        <div className="rc-section-heading">
          <div>
            <div className="rc-eyebrow"><span className="rc-eyebrow-index">04</span> YOUR WORKSPACE</div>
            <h2>A little structure.<br /><em>A lot more momentum.</em></h2>
          </div>
          <p>Your revision space adapts to your pace. Keep an eye on the time you put in, then let the next useful topic find you.</p>
        </div>
        <div className="rc-tool-grid">
          <button className="rc-tool-card rc-tool-progress" onClick={onOpenSticker}>
            <span className="rc-tool-icon"><Timer /></span>
            <span className="rc-tool-overline">TIME / GOALS / PROGRESS</span>
            <strong>See your progress.</strong>
            <span className="rc-tool-description">Track reading time, weekly goals and the topics you have already revised.</span>
            <span className="rc-tool-bottom"><span className="rc-tool-meter"><i style={{ width: progress + "%" }} /></span><b>{progress}% complete</b><MoveRight /></span>
          </button>
          {suggestion ? (
            <button className="rc-tool-card rc-tool-pick" onClick={() => onOpenTopic(suggestion.unit.code, suggestion.topic.id)} style={{ "--unit-accent": suggestion.unit.candy.main } as CSSProperties}>
              <span className="rc-tool-icon"><Target /></span>
              <span className="rc-tool-overline">A GOOD NEXT STEP</span>
              <strong>Today&apos;s pick.</strong>
              <span className="rc-tool-topic">{suggestion.topic.label} · {suggestion.topic.title}</span>
              <span className="rc-tool-description">{suggestion.reason} — around {suggestion.topic.minutes} minutes.</span>
              <span className="rc-tool-bottom"><b>Open suggested topic</b><MoveRight /></span>
            </button>
          ) : (
            <button className="rc-tool-card rc-tool-pick" onClick={onOpenSticker}>
              <span className="rc-tool-icon"><Sparkles /></span>
              <span className="rc-tool-overline">ALL CAUGHT UP</span>
              <strong>Beautifully done.</strong>
              <span className="rc-tool-description">You have revised every topic. Take a look at your progress and celebrate the work.</span>
              <span className="rc-tool-bottom"><b>View your progress</b><MoveRight /></span>
            </button>
          )}
        </div>
      </section>

      <section className="rc-closing">
        <div className="rc-closing-orb rc-closing-orb-a" />
        <div className="rc-closing-orb rc-closing-orb-b" />
        <div className="rc-closing-inner">
          <div className="rc-closing-mascot"><Mascot main="#FFD43B" mood="cheer" size={118} bubbles={false} /></div>
          <div className="rc-eyebrow rc-eyebrow-invert">THE NEXT REACTION IS YOURS</div>
          <h2>Ready when<br /><em>you are.</em></h2>
          <p>Pick a unit. Find your rhythm. Make every spec point count.</p>
          <div className="rc-closing-actions">
            <button className="rc-button rc-button-light" onClick={() => onOpenUnit("WCH11")}>Start with Unit 1 <MoveRight /></button>
            <button className="rc-button rc-button-glass" onClick={onOpenPack}>Build a revision pack</button>
          </div>
          <div className="rc-closing-foot"><span>REACTION CLUB / EDEXCEL IAL CHEMISTRY</span><span>WCH11—WCH16 · 2018 SPEC</span></div>
        </div>
      </section>
    </main>
  );
}
