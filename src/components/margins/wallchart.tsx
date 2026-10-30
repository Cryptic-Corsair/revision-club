"use client";

import { useState, type CSSProperties } from "react";
import { ELEMENTS, blockOf, gridPos, type Element } from "@/lib/elements";
import { MarginNote, Reveal, Stamp } from "./primitives";

/* ————— geometry: fixed pitch so the pen annotations can be placed exactly ————— */
const CELL = 38;
const GAP = 3;
const PITCH = CELL + GAP;
const PADL = 18;
const PADT = 16;
const COLS = 18;
const ROWS = 9; // 7 main + 2 detached f-block rows
const xOf = (col: number) => PADL + (col - 1) * PITCH;
const yOf = (row: number) => PADT + (row - 1) * PITCH;
const CHART_W = xOf(COLS) + CELL; // 753
const CHART_H = yOf(ROWS) + CELL; // 380

type Mode = "blocks" | "ie" | "states";

const MODES: { id: Mode; label: string }[] = [
  { id: "blocks", label: "Blocks" },
  { id: "ie", label: "First IE" },
  { id: "states", label: "States" },
];

const VOID_NOTE: Record<Mode, string[]> = {
  blocks: [
    "the block = the sub-shell of the distinguishing electron",
    "s and p make Groups; d is the transition strip",
  ],
  ie: [
    "↑ across: same shell, charge up — dips at Al & S (circled)",
    "↓ down: a whole new shell every step — IE falls",
  ],
  states: [
    "two liquids on the whole chart: Br and Hg",
    "the examiner knows. Now you do too",
  ],
};

const LEGENDS: Record<Mode, { label: string; swatch: CSSProperties }[]> = {
  blocks: [
    { label: "s", swatch: { background: "rgba(240,225,78,0.55)" } },
    { label: "p", swatch: { background: "rgba(47,83,130,0.16)" } },
    { label: "d", swatch: { background: "rgba(191,59,43,0.13)" } },
    { label: "f", swatch: { background: "rgba(33,28,20,0.10)" } },
  ],
  states: [
    { label: "solid", swatch: { background: "var(--paper-card)" } },
    { label: "liquid", swatch: { background: "rgba(240,225,78,0.65)" } },
    { label: "gas", swatch: { background: "rgba(47,83,130,0.18)" } },
  ],
  ie: [],
};

function cellStyle(el: Element, mode: Mode): CSSProperties {
  if (mode === "ie") {
    if (!el.ie) return {};
    const a = Math.max(0, Math.min(1, (el.ie - 350) / 2050));
    return { background: `rgba(191,59,43,${(0.07 + 0.66 * a).toFixed(3)})` };
  }
  if (mode === "blocks") {
    const bg: Record<string, string> = {
      s: "rgba(240,225,78,0.55)",
      p: "rgba(47,83,130,0.16)",
      d: "rgba(191,59,43,0.13)",
      f: "rgba(33,28,20,0.10)",
    };
    return { background: bg[blockOf(el)] };
  }
  // states
  if (el.state === "gas") return { background: "rgba(47,83,130,0.18)" };
  if (el.state === "liquid") return { background: "rgba(240,225,78,0.65)" };
  return {};
}

/* hand-drawn ellipse around a cell (the teacher's red ring) */
function ringPath(cx: number, cy: number, rx: number, ry: number) {
  return [
    `M ${cx + rx - 3},${cy - 4}`,
    `C ${cx + rx + 2},${cy + ry * 0.55} ${cx + rx * 0.4},${cy + ry + 2} ${cx - 3},${cy + ry - 2}`,
    `C ${cx - rx - 1},${cy + ry - 3} ${cx - rx + 1},${cy - ry + 10} ${cx - 1},${cy - ry + 3}`,
    `C ${cx + rx * 0.7},${cy - ry - 3} ${cx + rx - 1},${cy - ry * 0.3} ${cx + rx - 5},${cy + 2}`,
  ].join(" ");
}

export function Wallchart({ openTopic }: { openTopic: (unit: string, topic: string) => void }) {
  const [mode, setMode] = useState<Mode>("ie");
  const [selZ, setSelZ] = useState(11); // Na — familiar from the notes
  const sel = ELEMENTS.find((e) => e.z === selZ)!;

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-14 pb-8">
      <Reveal>
        <div className="mb-8">
          <p className="instruction mb-3 text-pen">Fig. 2 · The wallchart</p>
          <h1 className="font-display font-semibold text-[2.4rem] md:text-[3rem] leading-[1.05] tracking-[-0.015em] mb-4">
            Every element, teacher-annotated
          </h1>
          <p className="font-body text-[18px] leading-[1.7] text-ink-soft max-w-[64ch]">
            The chart from the chemistry room wall — minus the coffee stains, plus the notes a good
            teacher would pin over it. Paint the first ionisation energies across Period 3 and the two
            dips stop being a fact to memorise and become a thing you can see.
          </p>
        </div>
      </Reveal>

      {/* mode switch — printed like an MCQ instruction */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mb-7">
          <span className="font-marks text-[11px] uppercase tracking-[0.18em] text-ink-faint">Shade the chart by</span>
          <div className="flex flex-wrap gap-6" role="group" aria-label="Chart shading mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                className="mcq"
                data-active={mode === m.id}
                onClick={() => setMode(m.id)}
                aria-pressed={mode === m.id}
              >
                <span className="bubble" aria-hidden="true" />
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-8 xl:grid-cols-[auto_300px] xl:gap-10 items-start">
          {/* ————— the pinned poster ————— */}
          <div className="overflow-x-auto pb-3 -mx-1 px-1">
            <div className="relative origin-top-left" style={{ width: CHART_W, height: CHART_H, transform: "rotate(-0.35deg)" }}>
              {/* tape */}
              <div className="tape" style={{ left: 140, top: -6 }} aria-hidden="true" />
              <div className="tape" style={{ right: 130, top: -4, transform: "rotate(3deg)" }} aria-hidden="true" />

              {/* group + period numbers, printed faint */}
              {Array.from({ length: COLS }, (_, i) => i + 1).map((c) => (
                <span
                  key={`g${c}`}
                  className="font-marks text-[8px] text-ink-faint absolute select-none"
                  style={{ left: xOf(c) + CELL / 2 - 4, top: 2 }}
                  aria-hidden="true"
                >
                  {c}
                </span>
              ))}
              {Array.from({ length: 7 }, (_, i) => i + 1).map((r) => (
                <span
                  key={`p${r}`}
                  className="font-marks text-[8px] text-ink-faint absolute select-none"
                  style={{ left: 3, top: yOf(r) + CELL / 2 - 5 }}
                  aria-hidden="true"
                >
                  {r}
                </span>
              ))}

              {/* f-block placeholder cells in the main table */}
              {[
                { row: 6, label: "57–71" },
                { row: 7, label: "89–103" },
              ].map((g) => (
                <div
                  key={g.label}
                  className="absolute grid place-items-center font-marks text-[7.5px] text-ink-faint border border-dashed border-rule"
                  style={{ left: xOf(3), top: yOf(g.row), width: CELL, height: CELL }}
                  aria-hidden="true"
                >
                  {g.label}
                </div>
              ))}

              {/* element cells */}
              {ELEMENTS.map((el) => {
                const { row, col } = gridPos(el);
                const isSel = el.z === selZ;
                return (
                  <button
                    key={el.z}
                    type="button"
                    onClick={() => setSelZ(el.z)}
                    onMouseEnter={() => setSelZ(el.z)}
                    onFocus={() => setSelZ(el.z)}
                    aria-label={`${el.name}, atomic number ${el.z}`}
                    className={`element-cell-pt absolute grid select-none ${isSel ? "z-20" : "z-10"}`}
                    style={{
                      left: xOf(col),
                      top: yOf(row),
                      width: CELL,
                      height: CELL,
                      ...cellStyle(el, mode),
                      borderColor: isSel ? "var(--red)" : undefined,
                      borderWidth: isSel ? 2 : 1,
                      boxShadow: isSel ? "2px 2px 0 rgba(191,59,43,0.35)" : undefined,
                    }}
                  >
                    <span className="znum">{el.z}</span>
                    <span className="sym">{el.sym}</span>
                    {mode === "ie" && el.ie && <span className="ieval">{el.ie}</span>}
                  </button>
                );
              })}

              {/* ————— the teacher's pen, drawn over the print ————— */}
              {mode === "ie" && (
                <svg
                  key="ie-overlay"
                  className="absolute inset-0 z-30 pointer-events-none"
                  width={CHART_W}
                  height={CHART_H}
                  viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                  aria-hidden="true"
                >
                  {/* rises across period 3 — drawn over the cells */}
                  <g className="trend-arrow">
                    <path d="M 14 126 C 210 119, 470 110, 716 110" />
                    <path className="head" d="M 730 109 l -14 -3 M 730 109 l -10 9" />
                  </g>
                  {/* falls down group 2 */}
                  <g className="trend-arrow slow">
                    <path d="M 76 62 C 81 110, 73 190, 77 248" />
                    <path className="head" d="M 77 262 l -3 -13 M 77 262 l 9 -10" />
                  </g>
                  {/* the two dips — ringed like an examiner's target */}
                  <g className="trend-ring">
                    <path d={ringPath(xOf(13) + CELL / 2, yOf(3) + CELL / 2, 25, 23)} />
                  </g>
                  <g className="trend-ring slow">
                    <path d={ringPath(xOf(16) + CELL / 2, yOf(3) + CELL / 2, 25, 23)} />
                  </g>
                </svg>
              )}

              {/* margin notes + legend pinned into the top-left void */}
              <div className="absolute z-30 pointer-events-none" style={{ left: xOf(3) + 6, top: yOf(1) - 2, width: 240 }}>
                {VOID_NOTE[mode].map((line, i) => (
                  <p key={i} className="margin-note text-[14.5px] leading-[1.4] mb-1.5">
                    {line}
                  </p>
                ))}
              </div>
              <div
                className="absolute z-30 pointer-events-none"
                style={{ left: xOf(9) + 10, top: yOf(1) + 4, width: 150 }}
              >
                {mode === "ie" ? (
                  <div>
                    <div className="ie-scale" aria-hidden="true" />
                    <div className="flex justify-between font-marks text-[8px] text-ink-soft mt-1">
                      <span>350</span>
                      <span>2400 kJ mol⁻¹</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {LEGENDS[mode].map((l) => (
                      <span key={l.label} className="flex items-center gap-1.5">
                        <span className="inline-block w-3 h-3 border border-rule rounded-[1px]" style={l.swatch} aria-hidden="true" />
                        <span className="font-marks text-[10px] text-ink-soft">{l.label}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ————— the reading glass: selected element ————— */}
          <div>
            <div className="paper-card p-6">
              <div className="flex items-start gap-5">
                <div
                  className="grid shrink-0 relative"
                  style={{ width: 88, height: 88, border: "2px solid var(--ink)", background: "var(--paper)", borderRadius: 2 }}
                >
                  <span className="font-marks text-[10px] text-pen-deep absolute top-1.5 left-2">{sel.z}</span>
                  <span className="font-display font-bold text-[34px] absolute inset-0 grid place-items-center translate-y-[3px]">
                    {sel.sym}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-[22px] leading-tight">{sel.name}</p>
                  <p className="font-marks text-[11px] uppercase tracking-[0.14em] text-ink-faint mt-1.5">
                    Z = {sel.z} · {blockOf(sel)}-block · {sel.state}
                  </p>
                  <p className="mt-3 flex items-baseline gap-2">
                    <span className="font-marks text-[10px] uppercase tracking-[0.14em] text-ink-faint">First IE</span>
                    <span className="font-hand text-pen-deep text-[21px]">
                      {sel.ie ? `${sel.ie} kJ mol⁻¹` : "— not measured"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-dashed border-rule">
                {sel.quip ? (
                  <MarginNote className="text-[16.5px]">{sel.quip}</MarginNote>
                ) : (
                  <p className="font-body italic text-[14.5px] text-ink-faint">no margin note here — yet.</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openTopic("unit-1", "ionisation-energy")}
              className="balllink font-body text-[15.5px] mt-5 inline-block"
            >
              Read the note behind the arrows — ionisation energy →
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <Stamp pressed>Shading = data · rings = exam targets</Stamp>
          <p className="font-marks text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            IE values from the data booklet, kJ mol⁻¹ · elements 104+ too short-lived to measure
          </p>
        </div>
      </Reveal>
    </div>
  );
}
