"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MarkChip, parseChem } from "./primitives";

/* ————————————————————————————————————————————————
   MECHANISM THEATRE
   Organic mechanisms that draw their own curly arrows.
   Exam-style parts (a)(b)(c); step through like a marker.
   All geometry hand-placed in the FIGURES below.
   ———————————————————————————————————————————————— */

type C = "ink" | "red" | "faint" | "blue";

interface Mol {
  x: number;
  y: number;
  t: string; // _{...} subscript, ^{...} superscript
  s?: number; // font size
  c?: C;
  it?: boolean;
  mono?: boolean;
}
interface Bond {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dbl?: boolean;
  dashed?: boolean;
}
interface Curly {
  d: string;
  head: string;
  delay?: number;
}
interface Stamp {
  kind: "tick" | "cross" | "ring";
  x: number;
  y: number;
  label?: string;
}
interface Step {
  chip: string;
  caption: string;
  note?: string; // handwriting annotation shown beside the stage
  mols: Mol[];
  bonds: Bond[];
  curlys?: Curly[];
  arcs?: string[]; // dashed π clouds
  dots?: { x: number; y: number }[];
  stamps?: Stamp[];
}

interface Figure {
  title: string;
  steps: Step[];
}

/* ——— runs of normal / sub / sup for SVG text (same markup as data.ts) ——— */
function chemRuns(text: string) {
  const runs: { t: string; m: "n" | "sub" | "sup" }[] = [];
  const re = /([_^])\{([^}]*)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) runs.push({ t: text.slice(last, m.index), m: "n" });
    runs.push({ t: m[2], m: m[1] === "_" ? "sub" : "sup" });
    last = m.index + m[0].length;
  }
  if (last < text.length) runs.push({ t: text.slice(last), m: "n" });
  return runs;
}

function SvgChem({ x, y, t, s = 19, c = "ink", it, mono }: Mol) {
  const runs = chemRuns(t);
  let off = 0;
  const fill = c === "red" ? "var(--red-ink)" : c === "faint" ? "var(--ink-faint)" : c === "blue" ? "var(--blue)" : "var(--ink)";
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      className={`mol-text ${mono ? "mol-mono" : ""} ${it ? "italic" : ""}`}
      fill={fill}
      fontSize={s}
    >
      {runs.map((r, i) => {
        const dy = r.m === "sub" ? 5 : r.m === "sup" ? -7 : -off;
        if (r.m === "sub") off = 5;
        else if (r.m === "sup") off = -7;
        else off = 0;
        return (
          <tspan key={i} dy={dy} fontSize={r.m === "n" ? undefined : "0.72em"}>
            {r.t}
          </tspan>
        );
      })}
    </text>
  );
}

const H = (x: number, y: number): Mol => ({ x, y, t: "H", s: 16 });
const Cm = (x: number, y: number): Mol => ({ x, y, t: "C" });

/* —————————————————— figure 1: ethene + HBr —————————————————— */

const ETHENE_HBR: Figure = {
  title: "Electrophilic addition — HBr to ethene",
  steps: [
    {
      chip: "M1",
      caption:
        "The π cloud is electron-rich — it is the nucleophile. It swings towards the δ⁺ hydrogen of HBr, and the H–Br bond breaks at the same instant, both electrons leaving with bromine.",
      note: "both arrows at once — never in two moves",
      mols: [
        H(128, 86), Cm(170, 124), Cm(244, 124), H(286, 86),
        H(128, 168), H(286, 168),
        { x: 207, y: 66, t: "π", s: 13, it: true, c: "faint" },
        { x: 420, y: 124, t: "H", s: 18 },
        { x: 494, y: 124, t: "Br", s: 19 },
        { x: 418, y: 98, t: "δ^{+}", s: 12, c: "red", it: true },
        { x: 496, y: 150, t: "δ^{−}", s: 12, c: "red", it: true },
      ],
      bonds: [
        { x1: 134, y1: 94, x2: 160, y2: 112 },
        { x1: 134, y1: 160, x2: 160, y2: 136 },
        { x1: 178, y1: 118, x2: 236, y2: 118 },
        { x1: 178, y1: 130, x2: 236, y2: 130 },
        { x1: 254, y1: 112, x2: 280, y2: 94 },
        { x1: 254, y1: 136, x2: 280, y2: 160 },
        { x1: 436, y1: 124, x2: 478, y2: 124 },
      ],
      arcs: [
        "M 188 98 C 207 84, 207 84, 226 98",
        "M 188 154 C 207 168, 207 168, 226 154",
      ],
      curlys: [
        { d: "M 216 94 C 268 34, 372 38, 418 98", head: "M 420 106 l -14 -6 M 420 106 l -2 13" },
        { d: "M 458 132 C 468 172, 496 176, 506 150", head: "M 508 143 l -12 8 M 508 143 l 0 13", delay: 0.45 },
      ],
    },
    {
      chip: "M1",
      caption:
        "A carbocation forms: the carbon that lost its share of the π bond is now short of electrons, with a full positive charge. Bromide leaves with the lone pair that used to be the bond.",
      note: "name the intermediate — 'carbocation' earns the mark",
      mols: [
        H(98, 124), H(128, 86), H(128, 168), Cm(150, 124), Cm(224, 124),
        H(256, 86), H(256, 168),
        { x: 224, y: 92, t: "+", s: 20, c: "red" },
        { x: 470, y: 124, t: "Br", s: 20 },
        { x: 496, y: 94, t: "−", s: 16, c: "red" },
      ],
      bonds: [
        { x1: 110, y1: 124, x2: 138, y2: 124 },
        { x1: 134, y1: 94, x2: 146, y2: 112 },
        { x1: 134, y1: 160, x2: 146, y2: 136 },
        { x1: 160, y1: 124, x2: 212, y2: 124 },
        { x1: 230, y1: 112, x2: 248, y2: 94 },
        { x1: 230, y1: 136, x2: 248, y2: 160 },
      ],
      dots: [
        { x: 470, y: 100 },
        { x: 470, y: 148 },
      ],
      curlys: [
        { d: "M 458 102 C 380 34, 300 44, 238 94", head: "M 234 98 l 13 -7 M 234 98 l 14 3" },
      ],
    },
    {
      chip: "A1",
      caption:
        "The bromide lone pair donates to the positive carbon and the product is bromoethane. In the exam, name the mechanism in full — electrophilic addition — for the independent mark.",
      note: "lone pair → positive carbon. that sentence is a mark",
      mols: [
        H(98, 124), H(128, 86), H(128, 168), Cm(150, 124), Cm(224, 124),
        H(224, 86), H(224, 168), { x: 300, y: 124, t: "Br", s: 19 },
      ],
      bonds: [
        { x1: 110, y1: 124, x2: 138, y2: 124 },
        { x1: 134, y1: 94, x2: 146, y2: 112 },
        { x1: 134, y1: 160, x2: 146, y2: 136 },
        { x1: 160, y1: 124, x2: 212, y2: 124 },
        { x1: 224, y1: 112, x2: 224, y2: 96 },
        { x1: 224, y1: 136, x2: 224, y2: 152 },
        { x1: 238, y1: 124, x2: 284, y2: 124 },
      ],
      stamps: [
        { kind: "tick", x: 420, y: 118 },
        { kind: "ring", x: 486, y: 118, label: "A1" },
      ],
    },
  ],
};

/* —————————————————— figure 2: propene + HBr (Markovnikov) —————————————————— */

const PROPPENE_HBR: Figure = {
  title: "Markovnikov — HBr to propene",
  steps: [
    {
      chip: "M1",
      caption:
        "Propene is unsymmetrical, so the δ⁺ hydrogen could add to either carbon. The π cloud attacks exactly as before — but the question is which carbocation forms next.",
      note: "which carbon gets the H?",
      mols: [
        H(78, 140), H(108, 102), H(108, 178), Cm(130, 140),
        Cm(204, 140), H(204, 102), Cm(278, 140), H(322, 102), H(322, 178),
        { x: 450, y: 140, t: "H", s: 18 },
        { x: 522, y: 140, t: "Br", s: 19 },
        { x: 448, y: 114, t: "δ^{+}", s: 12, c: "red", it: true },
        { x: 524, y: 166, t: "δ^{−}", s: 12, c: "red", it: true },
      ],
      bonds: [
        { x1: 90, y1: 140, x2: 118, y2: 140 },
        { x1: 114, y1: 110, x2: 126, y2: 128 },
        { x1: 114, y1: 170, x2: 126, y2: 152 },
        { x1: 140, y1: 140, x2: 192, y2: 140 },
        { x1: 204, y1: 112, x2: 204, y2: 128 },
        { x1: 212, y1: 134, x2: 270, y2: 134 },
        { x1: 212, y1: 146, x2: 270, y2: 146 },
        { x1: 286, y1: 128, x2: 310, y2: 110 },
        { x1: 286, y1: 152, x2: 310, y2: 170 },
        { x1: 466, y1: 140, x2: 506, y2: 140 },
      ],
      arcs: ["M 220 112 C 240 98, 242 98, 262 112"],
      curlys: [
        { d: "M 240 110 C 300 44, 400 54, 448 114", head: "M 450 122 l -14 -6 M 450 122 l -2 13" },
      ],
    },
    {
      chip: "B1",
      caption:
        "Two carbocations are possible. The secondary one wins: two alkyl groups push electron density towards the positive carbon and stabilise it. The primary ion gets barely any product.",
      note: "stability: the alkyl groups donate to the charge",
      mols: [
        // secondary (left)
        H(34, 140), H(64, 102), H(64, 178), Cm(86, 140), Cm(160, 140),
        H(160, 102), Cm(234, 140), H(286, 140), H(256, 102), H(256, 178),
        { x: 160, y: 84, t: "+", s: 19, c: "red" },
        { x: 160, y: 210, t: "secondary", s: 10, mono: true, c: "red" },
        // primary (right)
        H(368, 140), H(398, 102), H(398, 178), Cm(420, 140), Cm(494, 140),
        H(494, 102), H(494, 178), Cm(568, 140), H(604, 116), H(604, 164),
        { x: 568, y: 84, t: "+", s: 19, c: "red" },
        { x: 494, y: 210, t: "primary", s: 10, mono: true, c: "faint" },
      ],
      bonds: [
        { x1: 46, y1: 140, x2: 74, y2: 140 },
        { x1: 70, y1: 110, x2: 82, y2: 128 },
        { x1: 70, y1: 170, x2: 82, y2: 152 },
        { x1: 96, y1: 140, x2: 148, y2: 140 },
        { x1: 160, y1: 112, x2: 160, y2: 126 },
        { x1: 172, y1: 140, x2: 222, y2: 140 },
        { x1: 246, y1: 128, x2: 258, y2: 110 },
        { x1: 246, y1: 152, x2: 258, y2: 170 },
        { x1: 260, y1: 140, x2: 288, y2: 140 },
        { x1: 380, y1: 140, x2: 408, y2: 140 },
        { x1: 404, y1: 110, x2: 416, y2: 128 },
        { x1: 404, y1: 170, x2: 416, y2: 152 },
        { x1: 430, y1: 140, x2: 482, y2: 140 },
        { x1: 494, y1: 112, x2: 494, y2: 128 },
        { x1: 494, y1: 152, x2: 494, y2: 168 },
        { x1: 506, y1: 140, x2: 558, y2: 140 },
        { x1: 576, y1: 130, x2: 590, y2: 120 },
        { x1: 576, y1: 150, x2: 590, y2: 160 },
      ],
      stamps: [
        { kind: "tick", x: 112, y: 62 },
        { kind: "cross", x: 448, y: 62 },
      ],
    },
    {
      chip: "A1",
      caption:
        "So bromide attacks the secondary carbocation and the major product is 2-bromopropane. The hydrogen has added to the carbon that already had more hydrogens — Markovnikov's rule.",
      note: "'the rich get richer' — H goes to the H-rich carbon",
      mols: [
        H(68, 150), H(98, 112), H(98, 188), Cm(120, 150),
        Cm(194, 150), H(194, 112), Cm(268, 150), H(320, 150), H(290, 112), H(290, 188),
        { x: 194, y: 214, t: "Br", s: 19 },
      ],
      bonds: [
        { x1: 80, y1: 150, x2: 108, y2: 150 },
        { x1: 104, y1: 120, x2: 116, y2: 138 },
        { x1: 104, y1: 180, x2: 116, y2: 162 },
        { x1: 130, y1: 150, x2: 182, y2: 150 },
        { x1: 194, y1: 122, x2: 194, y2: 136 },
        { x1: 206, y1: 150, x2: 258, y2: 150 },
        { x1: 194, y1: 162, x2: 194, y2: 198 },
        { x1: 276, y1: 138, x2: 288, y2: 120 },
        { x1: 276, y1: 162, x2: 288, y2: 180 },
        { x1: 290, y1: 150, x2: 322, y2: 150 },
      ],
      stamps: [
        { kind: "tick", x: 420, y: 130 },
        { kind: "ring", x: 486, y: 130, label: "A1" },
      ],
    },
  ],
};

const FIGURES: Record<string, Figure> = {
  "ethene-hbr": ETHENE_HBR,
  "propene-hbr": PROPPENE_HBR,
};

export function MechanismStage({ figure }: { figure: "ethene-hbr" | "propene-hbr" }) {
  const fig = FIGURES[figure];
  const [step, setStep] = useState(0);
  const cur = fig.steps[step];
  const last = step === fig.steps.length - 1;

  return (
    <div className="paper-card relative my-5 max-w-[64ch] px-5 py-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-pen-deep">
          Mechanism theatre · {fig.title}
        </p>
        <p className="font-marks text-[10.5px] tracking-[0.12em] text-ink-faint">
          step {step + 1} of {fig.steps.length}
        </p>
      </div>

      <div className="relative">
        <svg viewBox="0 0 640 240" className="w-full h-auto" role="img" aria-label={`${fig.title}, step ${step + 1}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.g
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {cur.arcs?.map((d, i) => (
                <path key={`a${i}`} d={d} className="pi-arc" />
              ))}
              {cur.bonds.map((b, i) => (
                <g key={`b${i}`} className="svg-bond">
                  <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
                  {b.dbl && <line x1={b.x1} y1={b.y1 + 12} x2={b.x2} y2={b.y2 + 12} />}
                </g>
              ))}
              {cur.dots?.map((p, i) => (
                <g key={`d${i}`} className="lone-pair">
                  <circle cx={p.x - 3.5} cy={p.y} r="2" />
                  <circle cx={p.x + 3.5} cy={p.y} r="2" />
                </g>
              ))}
              {cur.mols.map((m, i) => (
                <SvgChem key={`m${i}`} {...m} />
              ))}
              {cur.curlys?.map((c, i) => (
                <g key={`c${i}`} className="curly" style={{ "--d": `${c.delay ?? 0}s` } as React.CSSProperties}>
                  <path d={c.d} />
                  <path className="head" d={c.head} />
                </g>
              ))}
              {cur.stamps?.map((s, i) =>
                s.kind === "tick" ? (
                  <path
                    key={`s${i}`}
                    className="svg-tick"
                    d={`M ${s.x - 13} ${s.y + 1} L ${s.x - 3} ${s.y + 11} L ${s.x + 15} ${s.y - 11}`}
                  />
                ) : s.kind === "cross" ? (
                  <g key={`s${i}`} className="svg-cross">
                    <path d={`M ${s.x - 11} ${s.y - 10} L ${s.x + 11} ${s.y + 10}`} />
                    <path d={`M ${s.x + 11} ${s.y - 10} L ${s.x - 11} ${s.y + 10}`} />
                  </g>
                ) : (
                  <g key={`s${i}`} className="svg-ring">
                    <ellipse cx={s.x} cy={s.y} rx="26" ry="19" />
                    <text x={s.x} y={s.y + 1} textAnchor="middle" dominantBaseline="middle" className="mol-mono" fontSize="12" fill="var(--red-ink)">
                      {s.label}
                    </text>
                  </g>
                )
              )}
            </motion.g>
          </AnimatePresence>
        </svg>

        {cur.note && (
          <p className="margin-note absolute -top-1 right-2 text-[15px] bg-paper-card/90 px-2 py-0.5 max-w-[220px] text-right hidden md:block">
            {cur.note}
          </p>
        )}
      </div>

      {/* the marker's controls — exam parts (a)(b)(c) */}
      <div className="mt-4 pt-4 border-t border-dashed border-rule">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2" role="group" aria-label="Mechanism steps">
            {fig.steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                aria-pressed={step === i}
                className={`font-marks text-[12px] w-9 h-9 grid place-items-center border rounded-[2px] transition-colors ${
                  step === i
                    ? "border-pen text-pen-deep bg-paper-deep/60"
                    : "border-rule text-ink-faint hover:border-ink-faint hover:text-ink"
                }`}
              >
                {String.fromCharCode(97 + i)}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[140px]">
            <p className="font-body text-[15px] leading-[1.6] text-ink/90">
              <MarkChip>{cur.chip}</MarkChip> <span className="ml-1">{parseChem(cur.caption)}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(last ? 0 : step + 1)}
            className="font-marks text-[11.5px] uppercase tracking-[0.14em] text-pen-deep underline decoration-pen/50 underline-offset-[5px] hover:text-ink transition-colors shrink-0"
          >
            {last ? "Play again ↺" : "Next step ▸"}
          </button>
        </div>
      </div>
    </div>
  );
}
