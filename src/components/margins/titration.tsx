"use client";

import { useMemo, useState } from "react";
import { MarginNote, Mcq, Reveal, Stamp } from "./primitives";

/* ————————————————————————————————————————————————
   THE BENCH — an interactive titration.
   Add NaOH from the burette; the pH curve is drawn
   on graph paper by the examiner's red pen, with the
   half-equivalence and equivalence points ringed the
   moment you cross them. The flask tells the truth
   about the indicator.
   ———————————————————————————————————————————————— */

type Acid = "hcl" | "ethanoic";
type Indicator = "none" | "mo" | "phph";

const ACIDS: Record<
  Acid,
  { label: string; formula: string; pKa?: number; Ka?: number; blurb: string }
> = {
  hcl: {
    label: "HCl",
    formula: "HCl — strong",
    blurb: "fully dissociated from the first drop",
  },
  ethanoic: {
    label: "CH_{3}COOH",
    formula: "CH_{3}COOH — weak",
    pKa: 4.76,
    Ka: 1.74e-5,
    blurb: "a buffer waiting to happen",
  },
};

const INDICATORS: Record<
  Indicator,
  { label: string; range: [number, number]; acid: string; base: string; note: string }
> = {
  none: { label: "None", range: [7, 7], acid: "#dfe5ea", base: "#dfe5ea", note: "no indicator — read the maths, not the colour" },
  mo: { label: "Methyl orange", range: [3.1, 4.4], acid: "#d94f2b", base: "#e8c63f", note: "red → yellow across 3.1–4.4" },
  phph: { label: "Phenolphthalein", range: [8.3, 10.0], acid: "#eef0e9", base: "#e15b8f", note: "colourless → pink across 8.3–10.0" },
};

const KA = 1.74e-5;         // ethanoic acid, 25 °C
const PKA = 4.76;
const CA = 0.1;             // mol dm⁻³ acid
const CB = 0.1;             // mol dm⁻³ NaOH
const VA = 25.0;            // cm³ of acid in the flask
const VEQ = 25.0;           // cm³ of base at equivalence
const VMAX = 50;            // burette capacity

/** pH after adding v cm³ of base — the A-level treatment, 25 °C */
function pHAt(v: number, acid: Acid): number {
  const nH = (CA * VA) / 1000; // mol of acid originally
  const nB = (CB * v) / 1000;  // mol of base added
  const Vt = (VA + v) / 1000;  // total volume, dm³
  if (acid === "hcl") {
    if (v < VEQ - 1e-9) return -Math.log10((nH - nB) / Vt);
    if (Math.abs(v - VEQ) < 1e-9) return 7;
    return 14 + Math.log10((nB - nH) / Vt);
  }
  // weak acid
  if (v <= 1e-9) return 0.5 * (PKA - Math.log10(CA)); // sqrt(Ka·C) approximation
  if (v < 2) {
    // Henderson–Hasselbalch only holds once a real buffer exists; blend the
    // pure-acid start into it so the curve never dips below its own pH₀
    const ph0 = 0.5 * (PKA - Math.log10(CA));
    const n2 = (CB * 2) / 1000;
    const ph2 = PKA + Math.log10(n2 / (nH - n2));
    return ph0 + (ph2 - ph0) * (v / 2);
  }
  if (v < VEQ - 1e-9) return PKA + Math.log10(nB / (nH - nB)); // Henderson–Hasselbalch
  if (Math.abs(v - VEQ) < 1e-9) {
    const cSalt = nH / Vt;
    return 14 + Math.log10(Math.sqrt((1e-14 / KA) * cSalt));
  }
  return 14 + Math.log10((nB - nH) / Vt);
}

function lerpColour(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const pc = pa.map((x, i) => Math.round(x + (pb[i] - x) * t));
  return `rgb(${pc[0]},${pc[1]},${pc[2]})`;
}

function flaskColour(pH: number, ind: Indicator): string {
  const cfg = INDICATORS[ind];
  if (ind === "none") return cfg.acid;
  const [lo, hi] = cfg.range;
  if (pH <= lo) return cfg.acid;
  if (pH >= hi) return cfg.base;
  return lerpColour(cfg.acid, cfg.base, (pH - lo) / (hi - lo));
}

/* ————— chart geometry ————— */
const X0 = 58, X1 = 542, Y0 = 22, Y1 = 356; // plot rect in a 560×400 viewBox
const px = (v: number) => X0 + (Math.min(Math.max(v, 0), VMAX) / VMAX) * (X1 - X0);
const py = (pH: number) => Y1 - (Math.min(Math.max(pH, 0), 14) / 14) * (Y1 - Y0);

/* hand-drawn ellipse (the examiner's ring) */
function ring(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx + rx - 2},${cy - 3} C ${cx + rx + 3},${cy + ry * 0.5} ${cx + rx * 0.4},${cy + ry + 2} ${cx - 2},${cy + ry - 2} C ${cx - rx - 1},${cy + ry - 3} ${cx - rx + 1},${cy - ry + 8} ${cx - 1},${cy - ry + 3} C ${cx + rx * 0.6},${cy - ry - 3} ${cx + rx - 2},${cy - ry * 0.4} ${cx + rx - 4},${cy + 2}`;
}

function Zone({ v, acid }: { v: number; acid: Acid }): { chip: string; note: string } {
  if (v <= 0.001) return { chip: "nothing added", note: "pure acid in the flask — the starting pH is a calculation of its own" };
  const weak = acid === "ethanoic";
  if (Math.abs(v - VEQ) <= 0.05)
    return weak
      ? { chip: "equivalence point", note: "pH above 7 — the salt is a weak base. Ringed!" }
      : { chip: "equivalence point", note: "pH 7 exactly — strong met strong. Ringed!" };
  if (weak && Math.abs(v - VEQ / 2) <= 0.05)
    return { chip: "half-equivalence", note: "pH = pKa = 4.76 — the line to memorise" };
  if (weak) {
    if (v < 2) return { chip: "buffer forming", note: "a little A⁻ — the shelf begins" };
    if (v < 23.5) return { chip: "buffer region", note: "the flat shelf — pH barely moves" };
    if (v < VEQ) return { chip: "approaching the jump", note: "buffer nearly exhausted — hold on" };
    return { chip: "base in excess", note: "OH⁻ rules now — the curve settles near 12" };
  }
  if (v < 24.5) return { chip: "acid in excess", note: "a steady climb — the acid is boss" };
  if (v < VEQ) return { chip: "the jump", note: "this vertical wall is where an indicator must change" };
  return { chip: "base in excess", note: "OH⁻ rules now — the curve settles near 13" };
}

export function Bench() {
  const [acid, setAcid] = useState<Acid>("ethanoic");
  const [ind, setInd] = useState<Indicator>("phph");
  const [v, setV] = useState(0);
  const [showFull, setShowFull] = useState(false);

  const pH = pHAt(v, acid);
  const colour = flaskColour(pH, ind);
  const zone = Zone({ v, acid: acid });
  const crossedHalf = acid === "ethanoic" && v >= VEQ / 2 - 0.05;
  const crossedEq = v >= VEQ - 0.05;
  const weak = acid === "ethanoic";

  const trail = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0; x <= v + 1e-9; x += 0.1) {
      pts.push(`${px(Math.round(x * 10) / 10).toFixed(1)},${py(pHAt(x, acid)).toFixed(1)}`);
    }
    if (pts.length) pts.push(`${px(v).toFixed(1)},${py(pH).toFixed(1)}`);
    return pts.join(" ");
  }, [v, acid, pH]);

  const full = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0; x <= VMAX; x += 0.1) pts.push(`${px(x).toFixed(1)},${py(pHAt(x, acid)).toFixed(1)}`);
    return pts.join(" ");
  }, [acid]);

  const setAndReset = (a: Acid) => {
    setAcid(a);
    setV(0);
  };
  const add = (d: number) => setV((x) => Math.min(VMAX, Math.round((x + d) * 100) / 100));

  const pHDisplay = pH >= 13.5 ? pH.toFixed(1) : pH.toFixed(2);

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-14 pb-8">
      <Reveal>
        <div className="mb-8">
          <p className="instruction mb-3 text-pen">Fig. 3 · The bench</p>
          <h1 className="font-display font-semibold text-[2.4rem] md:text-[3rem] leading-[1.05] tracking-[-0.015em] mb-4">
            Run the titration, read the pen
          </h1>
          <p className="font-body text-[18px] leading-[1.7] text-ink-soft max-w-[64ch]">
            25.00 cm³ of acid in the flask, 0.100 mol dm⁻³ NaOH in the burette. Add base and watch the
            pH curve being drawn — then find the buffer shelf, the half-equivalence line and the
            equivalence ring the way the examiner wants you to know them.
          </p>
        </div>
      </Reveal>

      {/* setup — printed like an MCQ instruction line */}
      <Reveal>
        <div className="paper-card px-5 py-4 mb-8 flex flex-wrap gap-x-10 gap-y-4 items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">Acid in the flask</span>
            {(Object.keys(ACIDS) as Acid[]).map((a) => (
              <Mcq key={a} label={ACIDS[a].label} active={acid === a} onClick={() => setAndReset(a)} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">Indicator</span>
            {(Object.keys(INDICATORS) as Indicator[]).map((i) => (
              <Mcq key={i} label={INDICATORS[i].label} active={ind === i} onClick={() => setInd(i)} />
            ))}
          </div>
          <div className="ml-auto">
            <Mcq label="Show full curve" active={showFull} onClick={() => setShowFull((s) => !s)} />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-8 xl:grid-cols-[236px_1fr] xl:gap-10 items-start">
          {/* ————— the apparatus ————— */}
          <div>
            <div className="paper-card px-4 pt-5 pb-4 relative overflow-hidden">
              <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-2 text-center">
                Apparatus · {ACIDS[acid].formula}
              </p>
              <svg viewBox="0 0 150 430" className="w-[130px] h-auto mx-auto" role="img" aria-label="Burette delivering NaOH into a conical flask">
                {/* stand */}
                <line x1="14" y1="18" x2="14" y2="418" stroke="var(--rule)" strokeWidth="4" strokeLinecap="round" />
                <rect x="4" y="416" width="70" height="7" rx="2" fill="var(--paper-deep)" stroke="var(--rule)" />

                {/* burette */}
                <g>
                  <rect x="92" y="14" width="26" height="196" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
                  {/* liquid — level falls as you deliver */}
                  <rect
                    x="93.5"
                    y={16 + (v / VMAX) * 172}
                    width="23"
                    height={Math.max(0, 192 - (16 + (v / VMAX) * 172) - 6)}
                    fill="rgba(47,83,130,0.28)"
                  />
                  {/* graduations: 0 at the top, 50 at the bottom */}
                  {[0, 10, 20, 30, 40, 50].map((mark) => (
                    <g key={mark}>
                      <line x1="118" y1={16 + (mark / VMAX) * 176} x2={mark % 10 === 0 ? 108 : 112} y2={16 + (mark / VMAX) * 176} stroke="var(--ink)" strokeWidth="1.2" />
                      <text x="104" y={16 + (mark / VMAX) * 176 - 3} textAnchor="end" fontSize="8" fill="var(--ink-faint)" className="font-marks">
                        {50 - mark}
                      </text>
                    </g>
                  ))}
                  {[5, 15, 25, 35, 45].map((mark) => (
                    <line key={mark} x1="118" y1={16 + (mark / VMAX) * 176} x2="112" y2={16 + (mark / VMAX) * 176} stroke="var(--ink)" strokeWidth="0.9" />
                  ))}
                  {/* the reading line + tip */}
                  <line x1="88" y1={16 + (v / VMAX) * 176} x2="122" y2={16 + (v / VMAX) * 176} stroke="var(--red)" strokeWidth="1.6" strokeDasharray="3 2" />
                  <path d="M 100 210 L 110 210 L 106 228 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
                  {/* droplet — re-keyed per addition */}
                  {v > 0 && v < VMAX && (
                    <ellipse key={Math.round(v * 10)} className="drop" cx="105" cy="234" rx="2.6" ry="3.8" fill="rgba(47,83,130,0.55)" />
                  )}
                </g>

                {/* flask */}
                <g>
                  <path
                    d="M 93 248 L 117 248 L 117 268 L 149 386 Q 150 396 140 396 L 70 396 Q 60 396 61 386 L 93 268 Z"
                    fill="var(--paper)"
                    stroke="var(--ink)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* liquid with indicator colour */}
                  <path
                    d="M 92.5 300 L 117.5 300 L 149 386 Q 150 396 140 396 L 70 396 Q 60 396 61 386 Z"
                    fill={colour}
                    opacity="0.85"
                  />
                  <ellipse cx="105" cy="300" rx="12.6" ry="3.2" fill="none" stroke="rgba(33,28,20,0.35)" strokeWidth="1" />
                  {/* label */}
                  <text x="105" y="416" textAnchor="middle" fontSize="8.5" fill="var(--ink-faint)" className="font-marks" letterSpacing="0.06em">
                    25.00 cm³ ACID + {INDICATORS[ind].label.toUpperCase()}
                  </text>
                </g>
              </svg>
              <p className="font-marks text-[10px] text-ink-faint text-center mt-1 tabular-nums">
                burette reads {(VMAX - v).toFixed(2)} cm³
              </p>
            </div>

            {/* controls */}
            <div className="paper-card px-4 py-4 mt-5">
              <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-3">Add NaOH</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { d: 0.1, l: "+0.10" },
                  { d: 1, l: "+1.00" },
                  { d: 5, l: "+5.00" },
                ].map((b) => (
                  <button
                    key={b.l}
                    type="button"
                    onClick={() => add(b.d)}
                    className="font-marks text-[11.5px] tracking-[0.08em] py-2 border border-ink/50 rounded-[2px] hover:bg-hl/40 hover:border-pen transition-colors"
                  >
                    {b.l}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                {[
                  { l: "½ V", v: 12.5 },
                  { l: "equivalence", v: 25 },
                  { l: "overshoot +5", v: 30 },
                ].map((p) => (
                  <button
                    key={p.l}
                    type="button"
                    onClick={() => setV(p.v)}
                    className="font-marks text-[10.5px] uppercase tracking-[0.1em] text-pen-deep underline decoration-pen/50 underline-offset-[4px] hover:text-ink transition-colors"
                  >
                    {p.l}
                  </button>
                ))}
              </div>
              <label className="block mb-3">
                <span className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint flex justify-between mb-1.5">
                  <span>scrub</span>
                  <span className="tabular-nums text-ink">{v.toFixed(2)} cm³</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={VMAX}
                  step={0.05}
                  value={v}
                  onChange={(e) => setV(parseFloat(e.target.value))}
                  className="bench-slider w-full"
                  aria-label="Volume of NaOH added"
                />
              </label>
              <button
                type="button"
                onClick={() => setV(0)}
                className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint hover:text-pen-deep transition-colors"
              >
                empty the flask ↺
              </button>
            </div>
          </div>

          {/* ————— the graph ————— */}
          <div>
            <div className="paper-card px-4 md:px-6 pt-6 pb-5 relative" style={{ transform: "rotate(-0.25deg)" }}>
              <div className="tape" style={{ left: "42%", top: -6 }} aria-hidden="true" />
              <svg viewBox="0 0 560 400" className="w-full h-auto" role="img" aria-label="pH against volume of sodium hydroxide added">
                {/* graph-paper grid */}
                {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                  <line key={`vg${n}`} x1={px(n * 5)} y1={Y0} x2={px(n * 5)} y2={Y1} stroke="var(--rule)" strokeWidth="0.7" opacity="0.55" />
                ))}
                {Array.from({ length: 15 }, (_, i) => i).map((n) => (
                  <g key={`hg${n}`}>
                    <line x1={X0} y1={py(n)} x2={X1} y2={py(n)} stroke="var(--rule)" strokeWidth="0.7" opacity="0.55" />
                    {(n % 2 === 0) && (
                      <text x={X0 - 8} y={py(n) + 3} textAnchor="end" fontSize="9.5" fill="var(--ink-faint)" className="font-marks">
                        {n}
                      </text>
                    )}
                  </g>
                ))}
                {Array.from({ length: 6 }, (_, i) => i).map((n) => (
                  <text key={`vl${n}`} x={px(n * 10)} y={Y1 + 16} textAnchor="middle" fontSize="9.5" fill="var(--ink-faint)" className="font-marks">
                    {n * 10}
                  </text>
                ))}
                {/* axes */}
                <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="var(--ink)" strokeWidth="1.6" />
                <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke="var(--ink)" strokeWidth="1.6" />
                {/* axis titles */}
                <text x={X0 - 40} y={(Y0 + Y1) / 2} textAnchor="middle" fontSize="11" fill="var(--ink-soft)" className="font-marks" transform={`rotate(-90 ${X0 - 40} ${(Y0 + Y1) / 2})`} letterSpacing="0.12em">
                  pH
                </text>
                <text x={(X0 + X1) / 2} y={Y1 + 34} textAnchor="middle" fontSize="11" fill="var(--ink-soft)" className="font-marks" letterSpacing="0.1em">
                  VOLUME OF NaOH ADDED / cm³
                </text>

                {/* the buffer shelf — pale highlighter band (weak acid only) */}
                {weak && (
                  <g>
                    <rect x={px(2)} y={Y0 + 6} width={px(23) - px(2)} height={py(3.4) - Y0 - 6} fill="rgba(240,225,78,0.22)" />
                    <line x1={px(2)} y1={Y0 + 6} x2={px(2)} y2={py(3.4)} stroke="rgba(156,46,33,0.35)" strokeWidth="1" strokeDasharray="2 4" />
                    <line x1={px(23)} y1={Y0 + 6} x2={px(23)} y2={py(3.4)} stroke="rgba(156,46,33,0.35)" strokeWidth="1" strokeDasharray="2 4" />
                    <text x={(px(2) + px(23)) / 2} y={Y0 + 18} textAnchor="middle" fontSize="12.5" fill="var(--red-ink)" className="font-hand" transform={`rotate(-0.8 ${(px(2) + px(23)) / 2} ${Y0 + 18})`}>
                      buffer region — the flat shelf
                    </text>
                  </g>
                )}

                {/* optional ghost of the full run */}
                {showFull && <polyline points={full} fill="none" stroke="var(--ink-faint)" strokeWidth="1.6" strokeDasharray="3 5" />}

                {/* the drawn trail — the examiner's red pen */}
                {v > 0 && (
                  <g>
                    <polyline points={trail} fill="none" stroke="var(--red)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    {/* current point */}
                    <circle cx={px(v)} cy={py(pH)} r="4" fill="var(--red)" stroke="var(--paper-card)" strokeWidth="1.6" />
                  </g>
                )}

                {/* half-equivalence ring — pH = pKa */}
                {weak && crossedHalf && (
                  <g>
                    <path className="bench-ring" d={ring(px(12.5), py(PKA), 17, 15)} />
                    <line x1={px(12.5) + 18} y1={py(PKA) - 12} x2={px(12.5) + 44} y2={py(PKA) - 26} stroke="var(--red)" strokeWidth="1.6" strokeLinecap="round" />
                    <text x={px(12.5) + 47} y={py(PKA) - 26} fontSize="13" fill="var(--red-ink)" className="font-hand">
                      pH = pKa = 4.76
                    </text>
                  </g>
                )}

                {/* equivalence ring + the jump */}
                {crossedEq && (
                  <g>
                    <path className="bench-ring slow" d={ring(px(25), py(pHAt(25, acid)), 17, 20)} />
                    <text x={px(25) - 4} y={py(pHAt(25, acid)) + (weak ? -18 : -26)} textAnchor="middle" fontSize="13" fill="var(--red-ink)" className="font-hand">
                      equivalence — n(OH⁻) = n(H⁺)
                    </text>
                  </g>
                )}

                {/* starting point marker */}
                {v > 0 && (
                  <text x={px(0) + 6} y={py(pHAt(0, acid)) - 7} fontSize="10.5" fill="var(--ink-faint)" className="font-marks">
                    start pH {pHAt(0, acid).toFixed(2)}
                  </text>
                )}
              </svg>
            </div>

            {/* readout — results-table style */}
            <div className="paper-card mt-5 px-5 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div>
                <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint">Added</p>
                <p className="font-marks text-[17px] tabular-nums">{v.toFixed(2)} <span className="text-[12px] text-ink-faint">cm³</span></p>
              </div>
              <div>
                <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint">pH of the flask</p>
                <p className="font-marks text-[17px] tabular-nums text-pen-deep">{pHDisplay}</p>
              </div>
              <div>
                <p className="font-marks text-[10px] uppercase tracking-[0.18em] text-ink-faint">Zone</p>
                <p className="font-marks text-[13px] uppercase tracking-[0.08em]">{zone.chip}</p>
              </div>
              <MarginNote className="ml-auto text-[17px] max-w-[300px] text-right">{zone.note}</MarginNote>
            </div>

            {/* the examiner's margin — indicator verdict */}
            <div className="mt-5 flex flex-wrap items-start gap-4">
              <div className="paper-card border-l-[3px] border-pen px-5 py-4 max-w-[62ch]">
                <p className="font-marks text-[11px] uppercase tracking-[0.16em] text-pen-deep mb-1">
                  Indicator verdict — {INDICATORS[ind].label}
                </p>
                <p className="font-body text-[15.5px] leading-[1.65] text-ink/90">
                  {ind === "none" &&
                    "No indicator in the flask — the curve is the only evidence. In the exam you would follow the pH meter."}
                  {ind === "mo" &&
                    (weak
                      ? "Bad choice. The end-point (pH 4.76 at 25.00 cm³) sits on the wall of the jump, but the colour change 3.1–4.4 completes before equivalence — it would finish early and read low. Wrong side of the jump, wrong titre."
                      : "Works, barely. The jump spans pH 3–11, so 3.1–4.4 lands inside it — but the change is early on the wall. Fine for strong-acid/strong-base; phenolphthalein is the safer habit.")}
                  {ind === "phph" &&
                    (weak
                      ? "The right choice. Equivalence sits at pH ≈ 8.7, the jump sweeps through 7–11, and phenolphthalein's 8.3–10.0 lives inside it. The first permanent pink is the end-point."
                      : "Safe. The jump sweeps pH 3–11 at 25.00 cm³, so 8.3–10.0 sits comfortably inside. First permanent pink = equivalence.")}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Stamp pressed>{INDICATORS[ind].note}</Stamp>
                <Stamp graphite pressed>
                  {weak ? "pKa = 4.76 · Ka 1.74 × 10⁻⁵" : "fully dissociated · Ka ≫ 1"}
                </Stamp>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <Stamp pressed>Hand-drawn · data exact</Stamp>
          <p className="font-marks text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            25 °C · Kw = 1.00 × 10⁻¹⁴ · weak-acid curve uses Henderson–Hasselbalch
          </p>
        </div>
      </Reveal>
    </div>
  );
}
