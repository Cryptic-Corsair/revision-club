"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "./icons";
import { tint, shade, readableInk } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · notes figures — candy-styled SVG data pictures
   Every chart plots real values taken from the revision note.
   ═══════════════════════════════════════════════════════════════ */

/* ————— theme-aware ink — colours ride the mood tokens ————— */

const INK = "var(--color-ink)";
const SOFT = "var(--color-ink-soft)";
const PAPER = "var(--color-paper)";
const FAINT = "color-mix(in oklab, var(--color-ink) 30%, transparent)";

/* ————— shared chart scaffold ————— */

function ChartFrame({
  w,
  h,
  xLabel,
  yLabel,
  children,
}: {
  w: number;
  h: number;
  xLabel?: string;
  yLabel?: string;
  children: ReactNode;
}) {
  const pad = { l: 56, r: 18, t: 20, b: 40 };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img">
      <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {xLabel && (
        <text x={(w + pad.l) / 2} y={h - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text
          x={14}
          y={(h - pad.b + pad.t) / 2}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={INK}
          fontFamily="var(--font-body)"
          transform={`rotate(-90 14 ${(h - pad.b + pad.t) / 2})`}
        >
          {yLabel}
        </text>
      )}
      {children}
    </svg>
  );
}

/* ————— 2.1 · the atom ————— */

export function FigAtom({ accent = "#FF6B6B" }: { accent?: string }) {
  const shells = [
    { r: 52, electrons: [0] },
    { r: 86, electrons: [0, 72, 144, 216, 288] },
    { r: 118, electrons: [20] },
  ];
  return (
    <svg viewBox="0 0 360 300" className="w-full max-w-md" role="img" aria-label="Atom diagram">
      {shells.map((s, i) => (
        <ellipse
          key={i}
          cx="180"
          cy="150"
          rx={s.r + 22}
          ry={s.r * 0.62 + 6}
          fill="none"
          stroke={tint(accent, 45)}
          strokeWidth="3.5"
          strokeDasharray="7 8"
          strokeLinecap="round"
        />
      ))}
      {shells.map((s, i) =>
        s.electrons.map((a, j) => {
          const rx = s.r + 22;
          const ry = s.r * 0.62 + 6;
          const rad = (a * Math.PI) / 180;
          const cx = 180 + rx * Math.cos(rad);
          const cy = 150 + ry * Math.sin(rad);
          return (
            <g key={`${i}-${j}`}>
              <circle cx={cx} cy={cy} r="7.5" fill={INK} />
              <circle cx={cx - 2} cy={cy - 2.4} r="2.2" fill={PAPER} />
            </g>
          );
        })
      )}
      {/* nucleus cluster */}
      {(
        [
          [-10, -6, "#FF6B6B"],
          [6, -10, "var(--color-ink-faint)"],
          [-2, 8, "#FF6B6B"],
          [12, 6, "var(--color-ink-faint)"],
          [-14, 8, "var(--color-ink-faint)"],
          [4, -1, "#FF6B6B"],
        ] as const
      ).map(([dx, dy, c], i) => (
        <circle key={i} cx={180 + dx} cy={150 + dy} r="8.5" fill={c} stroke={INK} strokeWidth="2" />
      ))}
      {/* labels */}
      <text x="298" y="42" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        electron
      </text>
      <path d="M294 46 Q 262 62 243 96" fill="none" stroke={FAINT} strokeWidth="2.5" strokeLinecap="round" />
      <text x="24" y="52" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        quantum shell
      </text>
      <text x="24" y="68" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        (energy level)
      </text>
      <text x="182" y="228" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        nucleus = protons + neutrons
      </text>
      <path d="M180 218 Q 180 196 180 172" fill="none" stroke={FAINT} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ————— 2.3 · A/Z notation ————— */

export function FigNotation({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 560 240" className="w-full" role="img" aria-label="Mass number and atomic number notation">
      <text x="205" y="98" textAnchor="middle" fontSize="40" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        12
      </text>
      <text x="205" y="176" textAnchor="middle" fontSize="40" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        6
      </text>
      <text x="252" y="152" textAnchor="middle" fontSize="96" fontWeight="800" fill={INK} fontFamily="var(--font-display)">
        C
      </text>
      <path d="M240 84 Q 290 34 356 46" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
      <text x="366" y="40" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        mass number = 12
      </text>
      <text x="366" y="58" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        protons + neutrons
      </text>
      <path d="M236 172 Q 300 196 356 188" fill="none" stroke="#12B886" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
      <text x="366" y="182" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        atomic (proton) number = 6
      </text>
      <text x="366" y="200" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        the protons
      </text>
    </svg>
  );
}

/* ————— spectra ————— */

interface Peak {
  x: number;
  h: number;
  label: string;
  sub?: string;
  color?: string;
}

function Spectrum({
  w = 560,
  h = 250,
  peaks,
  xTicks,
  xMax,
  xMin = 0,
  xLabel = "m/z",
  yMax = 110,
}: {
  peaks: Peak[];
  xTicks: number[];
  xMax: number;
  xMin?: number;
  xLabel?: string;
  yMax?: number;
  w?: number;
  h?: number;
}) {
  const pad = { l: 56, r: 20, t: 22, b: 42 };
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const X = (v: number) => pad.l + ((v - xMin) / (xMax - xMin)) * plotW;
  const Y = (v: number) => h - pad.b - (v / yMax) * plotH;
  return (
    <ChartFrame w={w} h={h} xLabel={xLabel} yLabel="relative abundance">
      {[0, 50, 100].map((t) => (
        <g key={t}>
          <line x1={pad.l - 6} y1={Y(t)} x2={pad.l} y2={Y(t)} stroke={INK} strokeWidth="2" />
          <text x={pad.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
            {t}
          </text>
        </g>
      ))}
      {xTicks.map((t, i) => (
        <text key={i} x={X(t)} y={h - pad.b + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
          {t}
        </text>
      ))}
      {peaks.map((p, i) => (
        <g key={i}>
          <line x1={X(p.x)} y1={Y(0)} x2={X(p.x)} y2={Y(p.h)} stroke={p.color ?? INK} strokeWidth="4.5" strokeLinecap="round" />
          {p.label && (
            <text x={X(p.x)} y={Y(p.h) - 8} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={p.color ?? INK} fontFamily="var(--font-body)">
              {p.label}
            </text>
          )}
        </g>
      ))}
    </ChartFrame>
  );
}

export function FigSpectrumNeon() {
  return (
    <Spectrum
      xMin={18.6}
      xMax={23.4}
      xTicks={[19, 20, 21, 22, 23]}
      peaks={[
        { x: 20, h: 100, label: "90.92%" },
        { x: 21, h: 3, label: "0.26%" },
        { x: 22, h: 9.7, label: "8.82%" },
      ]}
    />
  );
}

export function FigSpectrumBoron() {
  return (
    <Spectrum
      xMax={13.5}
      xTicks={[2, 4, 6, 8, 10, 12]}
      peaks={[
        { x: 10, h: 23, label: "18.7" },
        { x: 11, h: 100, label: "81.3" },
      ]}
    />
  );
}

export function FigSpectrumBromine() {
  return (
    <Spectrum
      w={620}
      xMin={0}
      xMax={185}
      xTicks={[0, 40, 80, 120, 160]}
      peaks={[
        { x: 79, h: 13, label: "79" },
        { x: 81.5, h: 13, label: "81" },
        { x: 158, h: 49, label: "158" },
        { x: 160.5, h: 100, label: "160" },
        { x: 163, h: 49, label: "162" },
      ]}
    />
  );
}

export function FigSpectrumCl2() {
  return (
    <Spectrum
      xMax={80}
      xTicks={[35, 37, 70, 72, 74]}
      peaks={[
        { x: 35, h: 33, label: "A · 3", color: "#12B886" },
        { x: 37, h: 11, label: "B · 1", color: "#12B886" },
        { x: 70, h: 100, label: "C · 9", color: "#FF6B6B" },
        { x: 72, h: 67, label: "D · 6", color: "#FF6B6B" },
        { x: 74, h: 11, label: "E · 1", color: "#FF6B6B" },
      ]}
    />
  );
}

export function FigSpectrumEthanol() {
  return (
    <Spectrum
      xMax={50}
      xTicks={[10, 20, 30, 40, 46]}
      peaks={[
        { x: 15, h: 26, label: "", color: "color-mix(in oklab, var(--color-ink) 25%, transparent)" },
        { x: 29, h: 62, label: "", color: "color-mix(in oklab, var(--color-ink) 25%, transparent)" },
        { x: 31, h: 88, label: "", color: "color-mix(in oklab, var(--color-ink) 25%, transparent)" },
        { x: 45, h: 40, label: "", color: "color-mix(in oklab, var(--color-ink) 25%, transparent)" },
        { x: 46, h: 74, label: "M⁺ 46", color: "#FF6B6B" },
      ]}
    />
  );
}

/* ————— 2.12 · orbital shapes ————— */

export function FigOrbitals({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 660 240" className="w-full" role="img" aria-label="Orbital shapes">
      {/* s orbital */}
      <g transform="translate(110,120)">
        <circle r="72" fill={tint(accent, 14)} stroke={INK} strokeWidth="3.5" />
        <circle r="9" fill={INK} />
        <text y="108" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          s — sphere
        </text>
      </g>
      {/* p orbital */}
      <g transform="translate(330,120)">
        <ellipse rx="86" ry="34" fill={tint("#12B886", 18)} stroke={INK} strokeWidth="3.5" transform="rotate(-18)" />
        <ellipse rx="86" ry="34" fill={tint("#12B886", 18)} stroke={INK} strokeWidth="3.5" transform="rotate(162)" />
        <circle r="9" fill={INK} />
        <text y="108" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          p — dumbbell
        </text>
      </g>
      {/* d orbital */}
      <g transform="translate(552,120)">
        <ellipse rx="62" ry="26" fill={tint("#9775FA", 16)} stroke={INK} strokeWidth="3.5" transform="rotate(45)" />
        <ellipse rx="62" ry="26" fill={tint("#9775FA", 16)} stroke={INK} strokeWidth="3.5" transform="rotate(135)" />
        <circle r="9" fill={INK} />
        <text y="108" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          d — four lobes
        </text>
      </g>
    </svg>
  );
}

/* ————— 2.13 · fill-demo (interactive) ————— */

export function FigFillDemo({ accent = "#FF6B6B" }: { accent?: string }) {
  const [count, setCount] = useState(0);
  const full = count >= 6;
  const status = full
    ? "2p is full — 6 electrons, three pairs, all opposite spins."
    : count <= 3
      ? count === 0
        ? "Empty. Add the first electron."
        : "Each new electron takes its own box first — Hund's rule."
      : "Boxes are full, so electrons start pairing — opposite spins, Pauli Exclusion Principle.";

  return (
    <div className="rounded-[26px] bg-paper p-5 puff sm:p-6">
      <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4">
        {[0, 1, 2].map((box) => {
          const up = count > box;
          const down = count > box + 3;
          return (
            <div key={box} className="flex flex-col items-center gap-2">
              <motion.div
                layout
                className="grid h-16 w-16 place-items-center rounded-[18px] bg-paper font-display text-[30px] font-bold"
                style={{ boxShadow: "inset 0 0 0 3px color-mix(in oklab, var(--color-ink) 10%, transparent), 0 4px 0 color-mix(in oklab, var(--color-ink) 7%, transparent)" }}
                animate={up && down ? { rotate: [0, -3, 3, 0] } : {}}
              >
                {up && <span className="text-[26px]" style={{ color: shade(accent) }}>↑</span>}
                {up && down && <span className="ml-0.5 text-[26px]" style={{ color: "#12B886" }}>↓</span>}
              </motion.div>
              {box === 0 && <span className="font-display text-[12px] font-bold tracking-wide text-ink-faint">2p</span>}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-col items-center gap-3">
        <p className="text-center text-[14.5px] font-bold text-ink">{status}</p>
        <p className="text-center text-[12.5px] font-bold text-ink-faint">{count}/6 electrons placed</p>
        <div className="flex gap-2.5">
          {!full ? (
            <motion.button
              type="button"
              onClick={() => setCount((c) => Math.min(6, c + 1))}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[14px] font-semibold text-white"
              style={{ background: accent, boxShadow: `0 4px 0 ${shade(accent)}` }}
            >
              +1 electron
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={() => setCount(0)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-ink/5 px-5 py-2.5 font-display text-[14px] font-semibold text-ink-soft"
            >
              <RotateCcw className="h-4 w-4" /> Empty the sub-shell
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ————— 2.14 · box notation + filling order ————— */

const CAP: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };
const ORBITALS: Record<string, number> = { s: 1, p: 3, d: 5, f: 7 };
const ORDER = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"];

export function buildConfig(z: number): { sub: string; e: number }[] {
  const parts: { sub: string; e: number }[] = [];
  let left = z;
  for (const sub of ORDER) {
    if (left <= 0) break;
    const e = Math.min(CAP[sub[1]], left);
    parts.push({ sub, e });
    left -= e;
  }
  if (z === 24) {
    // Cr: donate one 4s electron to 3d → half-filled d
    for (const p of parts) {
      if (p.sub === "4s") p.e = 1;
      if (p.sub === "3d") p.e = 5;
    }
  }
  if (z === 29) {
    // Cu: donate one 4s electron to 3d → filled d
    for (const p of parts) {
      if (p.sub === "4s") p.e = 1;
      if (p.sub === "3d") p.e = 10;
    }
  }
  return parts;
}

export function spdfString(parts: { sub: string; e: number }[]): string {
  return parts.map((p) => `${p.sub}${p.e}`).join(" ");
}

export function BoxNotation({
  parts,
  accent = "#FF6B6B",
  compact = false,
}: {
  parts: { sub: string; e: number }[];
  accent?: string;
  compact?: boolean;
}) {
  const boxSize = compact ? 20 : 30;
  return (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
      {parts.map((p) => {
        const orbitals = ORBITALS[p.sub[1]] ?? 1;
        const boxes = Array.from({ length: orbitals }, (_, i) => {
          const up = i < p.e;
          const down = i < p.e - orbitals;
          return { up, down };
        });
        return (
          <div key={p.sub} className="flex flex-col items-center gap-1.5">
            <div className="flex gap-1">
              {boxes.map((b, i) => (
                <div
                  key={i}
                  className="grid place-items-center rounded-[8px] bg-paper font-bold"
                  style={{
                    width: boxSize,
                    height: boxSize,
                    boxShadow: "inset 0 0 0 2.5px color-mix(in oklab, var(--color-ink) 10%, transparent), 0 2.5px 0 color-mix(in oklab, var(--color-ink) 6%, transparent)",
                    fontSize: compact ? 12 : 15,
                  }}
                >
                  {b.up && (
                    <span style={{ color: shade(accent) }}>
                      ↑{b.down ? <span style={{ color: "#12B886" }}>↓</span> : null}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <span className="font-mono text-[11.5px] font-bold text-ink-soft">
              {p.sub}
              {p.e}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function FigBoxesC({ accent = "#FF6B6B" }: { accent?: string }) {
  const parts = buildConfig(6);
  return (
    <div className="rounded-[26px] bg-paper p-5 puff sm:p-6">
      <div className="mb-3 font-display text-[15px] font-semibold text-ink">
        Carbon (Z = 6): <span className="font-mono">1s² 2s² 2p²</span>
      </div>
      <BoxNotation parts={parts} accent={accent} />
    </div>
  );
}

export function FigBoxesS({ accent = "#FF6B6B" }: { accent?: string }) {
  const parts = buildConfig(16);
  return (
    <div className="rounded-[26px] bg-paper p-5 puff sm:p-6">
      <div className="mb-3 font-display text-[15px] font-semibold text-ink">
        Sulfur (Z = 16): <span className="font-mono">1s² 2s² 2p⁶ 3s² 3p⁴</span>
      </div>
      <BoxNotation parts={parts} accent={accent} />
    </div>
  );
}

export function FigFillOrder({ accent = "#FF6B6B" }: { accent?: string }) {
  const steps: { label: string; note?: string }[] = [
    { label: "1s" },
    { label: "2s" },
    { label: "2p" },
    { label: "3s" },
    { label: "3p" },
    { label: "4s", note: "lower energy than 3d!" },
    { label: "3d", note: "waits for 4s" },
    { label: "4p" },
  ];
  const w = 640;
  const rowH = 44;
  const h = steps.length * rowH + 60;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Filling order of orbitals, lowest energy first">
      <text x="26" y="26" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        energy ↑
      </text>
      {steps.map((s, i) => {
        const y = 46 + i * rowH;
        const isD = s.label === "3d";
        const indent = isD ? 210 : 60;
        return (
          <g key={s.label}>
            {i < steps.length - 1 && (
              <path
                d={`M${indent + 130} ${y + 14} Q ${indent + 150} ${y + rowH / 2} ${indent + (steps[i + 1].label === "3d" ? 210 : 60) + 130} ${y + rowH - 8}`}
                fill="none"
                stroke={FAINT}
                strokeWidth="2.5"
                strokeDasharray="2 6"
                strokeLinecap="round"
              />
            )}
            <rect x={indent} y={y} width="130" height="32" rx="16" fill={isD ? tint("#9775FA", 20) : tint(accent, 14)} stroke={INK} strokeWidth="2.5" />
            <text x={indent + 65} y={y + 21} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
              {s.label}
            </text>
            {s.note && (
              <text x={indent + 146} y={y + 21} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
                ← {s.note}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ————— 2.17 · first IE graph + radius ————— */

const IE_VALUES = [
  ["H", 1310], ["He", 2370], ["Li", 519], ["Be", 900], ["B", 799], ["C", 1090], ["N", 1400], ["O", 1310],
  ["F", 1680], ["Ne", 2080], ["Na", 494], ["Mg", 736], ["Al", 577], ["Si", 786], ["P", 1060], ["S", 1000],
  ["Cl", 1260], ["Ar", 1520], ["K", 418], ["Ca", 590], ["Sc", 632], ["Ti", 661], ["V", 648], ["Cr", 653],
  ["Mn", 716], ["Fe", 762], ["Co", 757], ["Ni", 736],
] as const;

export function FigIeGraph() {
  /* self-contained frame: three stacked rows under the axis (symbols,
     atomic numbers, axis title) need more bottom room than ChartFrame's
     single-label layout gives, and the annotations must clear the
     y-axis ticks — so this chart draws its own axes. */
  const w = 760;
  const h = 380;
  const pad = { l: 58, r: 18, t: 30, b: 68 };
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const yMax = 2500;
  const axisY = h - pad.b;
  const X = (i: number) => pad.l + (i / (IE_VALUES.length - 1)) * plotW;
  const Y = (v: number) => axisY - (v / yMax) * plotH;
  const pts = IE_VALUES.map(([, v], i) => `${X(i)},${Y(v as number)}`).join(" ");
  const nobles = new Set([1, 9, 17]);
  const group1 = new Set([2, 10, 18]);
  const dips = new Set([4, 7, 12, 15]); // B, O, Al, S

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="First ionisation energy against atomic number">
      {/* axes */}
      <line x1={pad.l} y1={axisY} x2={w - pad.r} y2={axisY} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={axisY} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* y ticks */}
      {[0, 500, 1000, 1500, 2000, 2500].map((t) => (
        <g key={t}>
          <line x1={pad.l - 6} y1={Y(t)} x2={pad.l} y2={Y(t)} stroke={INK} strokeWidth="2" />
          <text x={pad.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
            {t}
          </text>
        </g>
      ))}
      {/* y label, rotated like ChartFrame's */}
      <text
        x={14}
        y={(axisY + pad.t) / 2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={INK}
        fontFamily="var(--font-body)"
        transform={`rotate(-90 14 ${(axisY + pad.t) / 2})`}
      >
        1st IE / kJ mol⁻¹
      </text>
      <polyline points={pts} fill="none" stroke="#FF6B6B" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      {IE_VALUES.map(([sym, v], i) => (
        <g key={sym}>
          <circle cx={X(i)} cy={Y(v as number)} r={nobles.has(i) ? 7 : 5} fill={nobles.has(i) ? "#12B886" : group1.has(i) ? "#FF6B6B" : dips.has(i) ? "#9775FA" : INK} />
          <text x={X(i)} y={axisY + 18} textAnchor="middle" fontSize="10" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {sym}
          </text>
          <text x={X(i)} y={axisY + 31} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
            {i + 1}
          </text>
        </g>
      ))}
      {/* x label — sits clear below the symbol + number rows */}
      <text x={(w + pad.l) / 2} y={axisY + 52} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
        atomic number (Z)
      </text>
      {/* annotations — nudged clear of the y-axis ticks and the data line */}
      <text x={X(2)} y={Y(2370) - 12} textAnchor="middle" fontSize="11" fontWeight="800" fill="#12B886" fontFamily="var(--font-body)">
        noble-gas peaks
      </text>
      <text x={X(19)} y={axisY - 16} textAnchor="middle" fontSize="11" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        Group 1 cliffs
      </text>
    </svg>
  );
}

export function FigRadius({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 640 260" className="w-full" role="img" aria-label="Atomic vs ionic radius">
      {/* Na → Na+ */}
      <g transform="translate(120,120)">
        <circle r="62" fill={tint("#5FB8E8", 40)} stroke={INK} strokeWidth="3.5" />
        <text textAnchor="middle" y="6" fontSize="22" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          Na
        </text>
        <text textAnchor="middle" y="88" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          11 protons
        </text>
        <text textAnchor="middle" y="104" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          11 electrons
        </text>
      </g>
      <path d="M195 112 L232 112" stroke={FAINT} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <g transform="translate(300,120)">
        <circle r="40" fill={tint("#5FB8E8", 55)} stroke={INK} strokeWidth="3.5" />
        <text textAnchor="middle" y="6" fontSize="17" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          Na⁺
        </text>
        <text textAnchor="middle" y="68" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          11 protons
        </text>
        <text textAnchor="middle" y="84" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          10 electrons
        </text>
      </g>
      {/* Cl → Cl- */}
      <path d="M352 112 L382 112" stroke={FAINT} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <g transform="translate(420,120)">
        <circle r="34" fill={tint("#51CF66", 45)} stroke={INK} strokeWidth="3.5" />
        <text textAnchor="middle" y="5" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          Cl
        </text>
        <text textAnchor="middle" y="62" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          17 protons
        </text>
        <text textAnchor="middle" y="78" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          17 electrons
        </text>
      </g>
      <g transform="translate(545,120)">
        <circle r="58" fill={tint("#51CF66", 30)} stroke={INK} strokeWidth="3.5" />
        <text textAnchor="middle" y="6" fontSize="20" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          Cl⁻
        </text>
        <text textAnchor="middle" y="86" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          17 protons
        </text>
        <text textAnchor="middle" y="102" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          18 electrons
        </text>
      </g>
      <text x="210" y="228" textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
        cation = smaller
      </text>
      <text x="482" y="228" textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
        anion = larger
      </text>
    </svg>
  );
}

/* ————— 2.11 · successive IE (log) ————— */

const NA_IE = [496, 4563, 6913, 9544, 13352, 16611, 20115, 25491, 28934, 141367, 159079];

export function FigSuccIe() {
  const w = 720;
  const h = 330;
  const pad = { l: 54, r: 16, t: 26, b: 46 };
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const logs = NA_IE.map((v) => Math.log10(v));
  const yMin = 2.4;
  const yMax = 5.4;
  const X = (i: number) => pad.l + (i / (NA_IE.length - 1)) * plotW;
  const Y = (v: number) => h - pad.b - ((v - yMin) / (yMax - yMin)) * plotH;
  const pts = logs.map((v, i) => `${X(i)},${Y(v)}`).join(" ");

  return (
    <ChartFrame w={w} h={h} xLabel="electron removed" yLabel="log₁₀(IE / kJ mol⁻¹)">
      {/* shell bands */}
      <rect x={X(0) - 20} y={pad.t} width={X(1) - X(0) + 34} height={plotH} fill={tint("#FF6B6B", 8)} />
      <rect x={X(1) - 14} y={pad.t} width={X(8) - X(1) + 30} height={plotH} fill={tint("#FFD43B", 16)} />
      <rect x={X(9) - 14} y={pad.t} width={X(10) - X(9) + 30} height={plotH} fill={tint("#12B886", 12)} />
      <text x={(X(0) + X(1)) / 2} y={pad.t + 14} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        3rd shell
      </text>
      <text x={(X(1) + X(8)) / 2} y={pad.t + 14} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        2nd shell
      </text>
      <text x={(X(9) + X(10)) / 2} y={pad.t + 14} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        1st shell
      </text>
      {[3, 4, 5].map((t) => (
        <g key={t}>
          <line x1={pad.l - 6} y1={Y(t)} x2={pad.l} y2={Y(t)} stroke={INK} strokeWidth="2" />
          <text x={pad.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
            {t}
          </text>
        </g>
      ))}
      <polyline points={pts} fill="none" stroke="#FF922B" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      {logs.map((v, i) => (
        <g key={i}>
          <circle cx={X(i)} cy={Y(v)} r="5.5" fill={i === 1 || i === 9 ? "#FF6B6B" : INK} />
          <text x={X(i)} y={h - pad.b + 20} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {i + 1}
          </text>
        </g>
      ))}
      <text x={X(1)} y={Y(logs[1]) - 16} textAnchor="middle" fontSize="11" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        jump → new shell
      </text>
      <text x={X(9)} y={Y(logs[9]) - 16} textAnchor="middle" fontSize="11" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        jump → 1s
      </text>
    </ChartFrame>
  );
}

/* ————— 2.18 · melting points ————— */

const MELT: [string, number][] = [
  ["Na", 371], ["Mg", 923], ["Al", 933], ["Si", 1683], ["P", 317], ["S", 386], ["Cl", 172], ["Ar", 84],
];

export function FigMelting() {
  const w = 640;
  const h = 300;
  const pad = { l: 58, r: 16, t: 24, b: 46 };
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const yMax = 1800;
  const X = (i: number) => pad.l + (i / (MELT.length - 1)) * plotW;
  const Y = (v: number) => h - pad.b - (v / yMax) * plotH;
  const pts = MELT.map(([, v], i) => `${X(i)},${Y(v)}`).join(" ");
  return (
    <ChartFrame w={w} h={h} xLabel="element" yLabel="melting point / K">
      {[0, 400, 800, 1200, 1600].map((t) => (
        <g key={t}>
          <line x1={pad.l - 6} y1={Y(t)} x2={pad.l} y2={Y(t)} stroke={INK} strokeWidth="2" />
          <text x={pad.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
            {t}
          </text>
        </g>
      ))}
      <polyline points={pts} fill="none" stroke="#FF6B6B" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      {MELT.map(([sym, v], i) => (
        <g key={sym}>
          <circle cx={X(i)} cy={Y(v)} r={sym === "Si" ? 7.5 : 5.5} fill={sym === "Si" ? "#9775FA" : INK} />
          <text x={X(i)} y={h - pad.b + 20} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {sym}
          </text>
          {sym === "Si" && (
            <text x={X(i)} y={Y(v) - 14} textAnchor="middle" fontSize="11" fontWeight="800" fill="#9775FA" fontFamily="var(--font-body)">
              giant covalent peak
            </text>
          )}
        </g>
      ))}
    </ChartFrame>
  );
}

/* ————— 2.16 · periodic table blocks ————— */

export function FigPtBlocks() {
  const cw = 34;
  const ch = 30;
  const gap = 3;
  const ox = 60;
  const oy = 30;
  const cell = (c: number, r: number, color: string, label?: string) => (
    <rect key={`${c}-${r}`} x={ox + c * (cw + gap)} y={oy + r * (ch + gap)} width={cw} height={ch} rx="9" fill={color} stroke={INK} strokeWidth="2" />
  );
  const rows = 6;
  return (
    <svg viewBox="0 0 700 320" className="w-full" role="img" aria-label="Periodic table blocks">
      {/* s block: cols 0-1, rows 0-5 */}
      {Array.from({ length: rows }).map((_, r) => (
        <g key={`s${r}`}>
          {cell(0, r, tint("#FF6B6B", 30))}
          {cell(1, r, tint("#FF6B6B", 30))}
        </g>
      ))}
      {/* d block: cols 3-12, rows 3-5 */}
      {Array.from({ length: 3 }).map((_, rr) =>
        Array.from({ length: 10 }).map((_, c) => cell(3 + c, 3 + rr, tint("#9775FA", 26)))
      )}
      {/* p block: cols 13-18, rows 1-5 */}
      {Array.from({ length: 5 }).map((_, rr) =>
        Array.from({ length: 6 }).map((_, c) => cell(13 + c, 1 + rr, tint("#12B886", 28)))
      )}
      {/* f block below */}
      {Array.from({ length: 14 }).map((_, c) => cell(3 + c, 6.6, tint("#FFD43B", 45)))}
      {/* labels */}
      <text x={ox + cw} y={oy + rows * (ch + gap) + 26} textAnchor="middle" fontSize="14" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        s
      </text>
      <text x={ox + 1.5 * (cw + gap)} y={oy - 10} fontSize="12" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        groups 1–2
      </text>
      <text x={ox + 8.5 * (cw + gap)} y={oy + 2.5 * (ch + gap) - 4} textAnchor="middle" fontSize="13" fontWeight="800" fill="#9775FA" fontFamily="var(--font-body)">
        d — between groups 2 and 3
      </text>
      <text x={ox + 16 * (cw + gap)} y={oy - 10} textAnchor="middle" fontSize="12" fontWeight="800" fill="#12B886" fontFamily="var(--font-body)">
        groups 3–8
      </text>
      <text x={ox + 18.5 * (cw + gap)} y={oy + 3 * (ch + gap) + 10} textAnchor="middle" fontSize="14" fontWeight="800" fill="#12B886" fontFamily="var(--font-body)">
        p
      </text>
      <text x={ox + 10 * (cw + gap)} y={oy + 7.4 * (ch + gap)} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        f — lanthanides &amp; actinides
      </text>
    </svg>
  );
}

/* ————— 2.6 · the mass spectrometer, drawn as a machine ————— */

function StageBadge({ x, y, n, label, below = true }: { x: number; y: number; n: number; label: string; below?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="12" fill="#FF6B6B" stroke="var(--color-ink)" strokeWidth="2" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff" fontFamily="var(--font-body)">
        {n}
      </text>
      <text
        x={x}
        y={below ? y + 32 : y - 20}
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill={INK}
        fontFamily="var(--font-body)"
      >
        {label}
      </text>
    </g>
  );
}

export function FigMassSpec() {
  return (
    <svg viewBox="0 0 780 400" className="w-full" role="img" aria-label="How a mass spectrometer works">
      {/* vacuum chamber */}
      <rect x="18" y="58" width="744" height="252" rx="26" fill="none" stroke={FAINT} strokeWidth="2.5" strokeDasharray="7 8" />
      <text x="44" y="86" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)" fontStyle="italic">
        the whole tube sits inside a high vacuum
      </text>

      {/* ion paths — drawn first so the chambers sit on top */}
      <path d="M67 180 H 380 C 462 180 520 202 590 258" fill="none" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" strokeDasharray="9 8" />
      <path d="M380 180 C 470 180 540 194 618 240" fill="none" stroke={FAINT} strokeWidth="3" strokeLinecap="round" strokeDasharray="4 8" />

      {/* sample vial + inlet */}
      <circle cx="52" cy="180" r="15" fill={PAPER} stroke={INK} strokeWidth="3" />
      <path d="M52 165 v-10 M46 155 h12" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M67 180 h48" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {/* heater coil */}
      <path d="M76 212 q6 -8 12 0 q6 8 12 0 q6 -8 12 0" fill="none" stroke="#FF922B" strokeWidth="3.5" strokeLinecap="round" />
      <StageBadge x={95} y={252} n={1} label="vapourisation" />

      {/* ionisation chamber */}
      <rect x="172" y="140" width="92" height="80" rx="16" fill={tint("#9775FA", 12)} stroke={INK} strokeWidth="3" />
      <circle cx="188" cy="180" r="6.5" fill={INK} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${198 + i * 16} 175 l9 5 l-9 5`} fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <text x="218" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        electron gun knocks off e⁻
      </text>
      <StageBadge x={218} y={252} n={2} label="ionisation" />

      {/* acceleration plates */}
      <rect x="298" y="128" width="16" height="42" rx="7" fill={tint("#12B886", 30)} stroke={INK} strokeWidth="2.5" />
      <rect x="298" y="190" width="16" height="42" rx="7" fill={tint("#FF6B6B", 30)} stroke={INK} strokeWidth="2.5" />
      <text x="327" y="155" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">+</text>
      <text x="327" y="226" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">−</text>
      {[168, 186, 204].map((y) => (
        <path key={y} d={`M282 ${y} l9 5 l-9 5`} fill="none" stroke={SOFT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <StageBadge x={306} y={252} n={3} label="acceleration" />

      {/* magnet poles */}
      <rect x="398" y="88" width="150" height="38" rx="11" fill={tint("#FF6B6B", 22)} stroke={INK} strokeWidth="3" />
      <text x="473" y="113" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">N</text>
      <rect x="398" y="234" width="150" height="38" rx="11" fill={tint("#FF6B6B", 22)} stroke={INK} strokeWidth="3" />
      <text x="473" y="259" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">S</text>
      {[146, 180, 214].map((y) => (
        <line key={y} x1="412" y1={y} x2="534" y2={y} stroke={FAINT} strokeWidth="2" strokeDasharray="3 7" />
      ))}
      <StageBadge x={473} y={306} n={4} label="deflection" />

      <text x="560" y="176" fontSize="11" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        lighter ions deflect more
      </text>

      {/* detector + amplifier */}
      <rect x="600" y="248" width="14" height="52" rx="7" fill={PAPER} stroke={INK} strokeWidth="3" />
      <path d="M607 300 v14" stroke={FAINT} strokeWidth="2.5" strokeDasharray="3 5" />
      <rect x="556" y="318" width="112" height="42" rx="13" fill={tint("#12B886", 16)} stroke={INK} strokeWidth="3" />
      <text x="612" y="344" textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        amplifier → recorder
      </text>
      <StageBadge x={712} y={272} n={5} label="detection" />
      <text x="712" y="322" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        → mass
      </text>
      <text x="712" y="337" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        spectrum
      </text>
    </svg>
  );
}

/* ————— 2.10 · shielding — why outer electrons pull less ————— */

export function FigShielding({ accent = "#FF6B6B" }: { accent?: string }) {
  const cx = 180;
  const cy = 160;
  const shell2: [number, number][] = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const rad = (a * Math.PI) / 180;
    return [cx + 100 * Math.cos(rad), cy + 100 * Math.sin(rad)];
  });
  return (
    <svg viewBox="0 0 640 320" className="w-full" role="img" aria-label="Shielding of the outer electron">
      {/* shells */}
      <circle cx={cx} cy={cy} r="55" fill="none" stroke={FAINT} strokeWidth="2.5" strokeDasharray="6 8" />
      <circle cx={cx} cy={cy} r="100" fill="none" stroke={FAINT} strokeWidth="2.5" strokeDasharray="6 8" />
      <path d={`M ${cx + 142} ${cy} A 145 145 0 0 0 ${cx + 103} ${cy - 104}`} fill="none" stroke={FAINT} strokeWidth="2.5" strokeDasharray="6 8" />

      {/* inner electrons */}
      <circle cx={cx} cy={cy - 55} r="7" fill={INK} />
      <circle cx={cx} cy={cy + 55} r="7" fill={INK} />
      {shell2.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={INK} />
      ))}

      {/* nucleus */}
      <circle cx={cx} cy={cy} r="21" fill="#FF6B6B" stroke={INK} strokeWidth="3" />
      <text x={cx} y={cy + 5.5} textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="var(--font-body)">
        +11
      </text>

      {/* outer electron */}
      <circle cx={cx + 150} cy={cy} r="10" fill="#9775FA" stroke={INK} strokeWidth="3" />

      {/* full pull vs effective pull */}
      <path d={`M ${cx + 26} ${cy - 12} L ${cx + 122} ${cy - 26}`} fill="none" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 6" />
      <text x={cx + 84} y={cy - 40} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        the full pull of +11 …
      </text>
      <path d={`M ${cx + 122} ${cy + 34} L ${cx + 26} ${cy + 22}`} fill="none" stroke="#12B886" strokeWidth="3.5" strokeLinecap="round" />
      <text x={cx + 78} y={cy + 62} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#12B886" fontFamily="var(--font-body)">
        … what the outer electron actually feels
      </text>

      {/* annotations */}
      <path d="M416 92 Q 340 96 288 134" fill="none" stroke={FAINT} strokeWidth="2.5" strokeLinecap="round" />
      <text x="424" y="84" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        inner-shell electrons sit
      </text>
      <text x="424" y="101" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        between: they shield the charge
      </text>
      <path d="M416 236 Q 372 228 348 184" fill="none" stroke={FAINT} strokeWidth="2.5" strokeLinecap="round" />
      <text x="424" y="240" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        so the outer electron is held
      </text>
      <text x="424" y="257" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        less tightly — easier to remove
      </text>
      <text x={cx + 176} y={cy + 4} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        ← the electron being removed
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Topic 3 · bonding figures — σ/π overlap, dot-and-cross,
   the carbon lattices, VSEPR shapes and molecular dipoles
   ═══════════════════════════════════════════════════════════════ */

/* small arrow with a solid head */
function t3Arrow(x1: number, y1: number, x2: number, y2: number, c: string, w = 2.5) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 7.5;
  const head = `${x2},${y2} ${x2 - h * Math.cos(a - 0.42)},${y2 - h * Math.sin(a - 0.42)} ${x2 - h * Math.cos(a + 0.42)},${y2 - h * Math.sin(a + 0.42)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - h * 0.55 * Math.cos(a)} y2={y2 - h * 0.55 * Math.sin(a)} stroke={c} strokeWidth={w} strokeLinecap="round" />
      <polygon points={head} fill={c} />
    </g>
  );
}

/* ————— 3.10 · σ head-on overlaps vs the sideways π overlap ————— */

export function FigSigmaPi({ accent = "#FF6B6B" }: { accent?: string }) {
  const ghost = tint(accent, 78);
  const mid = tint(accent, 42);
  return (
    <svg viewBox="0 0 780 320" className="w-full" role="img" aria-label="Sigma and pi bonding">
      {/* watermarks + dividers */}
      <text x={127} y={86} textAnchor="middle" fontSize="44" fontWeight="800" fill={tint(accent, 55)} fontFamily="var(--font-display)">σ</text>
      <text x={387} y={86} textAnchor="middle" fontSize="44" fontWeight="800" fill={tint(accent, 55)} fontFamily="var(--font-display)">σ</text>
      <text x={647} y={86} textAnchor="middle" fontSize="44" fontWeight="800" fill={tint(accent, 55)} fontFamily="var(--font-display)">π</text>
      <line x1={258} y1={38} x2={258} y2={284} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={514} y1={38} x2={514} y2={284} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* panel 1 · s + s (H₂) */}
      <circle cx={85} cy={168} r={52} fill={ghost} stroke={FAINT} strokeWidth="2.5" />
      <circle cx={168} cy={168} r={52} fill={ghost} stroke={FAINT} strokeWidth="2.5" />
      <path d="M 126.5 136.7 A 52 52 0 0 1 126.5 199.3 A 52 52 0 0 1 126.5 136.7 Z" fill={mid} />
      <circle cx={120.5} cy={168} r={3.4} fill={INK} />
      <g stroke={INK} strokeWidth={1.8} strokeLinecap="round">
        <line x1={129.8} y1={164.8} x2={136.2} y2={171.2} />
        <line x1={129.8} y1={171.2} x2={136.2} y2={164.8} />
      </g>
      <text x={127} y={252} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H₂ · s + s</text>
      <text x={127} y={270} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">head-on, directly between the nuclei</text>

      {/* panel 2 · p + p (F₂) */}
      <ellipse cx={346} cy={168} rx={50} ry={17} fill={ghost} stroke={FAINT} strokeWidth="2.5" />
      <ellipse cx={428} cy={168} rx={50} ry={17} fill={ghost} stroke={FAINT} strokeWidth="2.5" />
      <ellipse cx={387} cy={168} rx={10} ry={15} fill={mid} />
      <circle cx={381.5} cy={168} r={3.4} fill={INK} />
      <g stroke={INK} strokeWidth={1.8} strokeLinecap="round">
        <line x1={390.8} y1={164.8} x2={397.2} y2={171.2} />
        <line x1={390.8} y1={171.2} x2={397.2} y2={164.8} />
      </g>
      <text x={387} y={252} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">F₂ · p + p</text>
      <text x={387} y={270} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">one σ only — ever</text>

      {/* panel 3 · π sideways (C=C) */}
      <line x1={600} y1={168} x2={700} y2={168} stroke={FAINT} strokeWidth="2" strokeDasharray="3 6" />
      <ellipse cx={633} cy={168} rx={16} ry={52} fill={ghost} stroke={FAINT} strokeWidth="2.5" />
      <ellipse cx={661} cy={168} rx={16} ry={52} fill={ghost} stroke={FAINT} strokeWidth="2.5" />
      <rect x={643} y={118} width={8} height={100} fill={mid} opacity={0.85} />
      <circle cx={647} cy={162} r={3.4} fill={INK} />
      <g stroke={INK} strokeWidth={1.8} strokeLinecap="round">
        <line x1={651.8} y1={158.8} x2={658.2} y2={165.2} />
        <line x1={651.8} y1={165.2} x2={658.2} y2={158.8} />
      </g>
      <text x={647} y={104} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">density above…</text>
      <text x={647} y={240} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">…and below the axis</text>
      <text x={647} y={266} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">C=C · p + p sideways</text>
      <text x={647} y={284} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">lateral overlap — weaker than σ</text>

      {/* bond axis label */}
      <text x={580} y={172} textAnchor="end" fontSize="10.5" fontWeight="700" fill={FAINT} fontFamily="var(--font-body)">bond axis</text>
    </svg>
  );
}

/* ————— 3.11 · dot-and-cross essentials ————— */

function t3Dot(x: number, y: number, c = INK) {
  return <circle cx={x} cy={y} r={3.4} fill={c} />;
}
function t3Cross(x: number, y: number, c = INK) {
  return (
    <g stroke={c} strokeWidth={1.8} strokeLinecap="round">
      <line x1={x - 3.4} y1={y - 3.4} x2={x + 3.4} y2={y + 3.4} />
      <line x1={x - 3.4} y1={y + 3.4} x2={x + 3.4} y2={y - 3.4} />
    </g>
  );
}

export function FigDotCross({ accent = "#FF6B6B" }: { accent?: string }) {
  const shell = "none";
  return (
    <svg viewBox="0 0 780 330" className="w-full" role="img" aria-label="Dot and cross diagrams for HCl, CO2 and NH4+">
      {/* legend */}
      <text x={24} y={34} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        ·  electron from Cl / O / N        ×  electron from H / C        ———  outer shell
      </text>
      <line x1={248} y1={54} x2={248} y2={296} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={518} y1={54} x2={518} y2={296} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* HCl · single bond */}
      <circle cx={105} cy={172} r={44} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={187} cy={172} r={60} fill={shell} stroke={INK} strokeWidth="2.5" />
      {/* shared pair: dot (Cl) + cross (H) */}
      {t3Dot(140.5, 172)}
      {t3Cross(152.5, 172)}
      {/* chlorine lone pairs */}
      {t3Dot(183.5, 112)}{t3Dot(190.5, 112)}
      {t3Dot(239, 168.5)}{t3Dot(239, 175.5)}
      {t3Dot(183.5, 232)}{t3Dot(190.5, 232)}
      <text x={98} y={179} textAnchor="middle" fontSize="22" fontWeight="800" fill={INK} fontFamily="var(--font-display)">H</text>
      <text x={172} y={179} textAnchor="middle" fontSize="22" fontWeight="800" fill={INK} fontFamily="var(--font-display)">Cl</text>
      <text x={146} y={304} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">HCl · single bond</text>
      <text x={146} y={321} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">one shared pair</text>

      {/* CO₂ · double bonds */}
      <circle cx={287} cy={172} r={46} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={345} cy={172} r={36} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={403} cy={172} r={46} fill={shell} stroke={INK} strokeWidth="2.5" />
      {/* left double bond: two mixed pairs in the lens */}
      {t3Dot(315.5, 152)}{t3Cross(326.5, 152)}
      {t3Dot(315.5, 192)}{t3Cross(326.5, 192)}
      {/* right double bond */}
      {t3Dot(363.5, 152)}{t3Cross(374.5, 152)}
      {t3Dot(363.5, 192)}{t3Cross(374.5, 192)}
      {/* oxygen lone pairs (two each) */}
      {t3Dot(283.5, 118)}{t3Dot(290.5, 118)}
      {t3Dot(283.5, 226)}{t3Dot(290.5, 226)}
      {t3Dot(399.5, 118)}{t3Dot(406.5, 118)}
      {t3Dot(399.5, 226)}{t3Dot(406.5, 226)}
      <text x={280} y={179} textAnchor="middle" fontSize="20" fontWeight="800" fill={INK} fontFamily="var(--font-display)">O</text>
      <text x={338} y={179} textAnchor="middle" fontSize="20" fontWeight="800" fill={INK} fontFamily="var(--font-display)">C</text>
      <text x={396} y={179} textAnchor="middle" fontSize="20" fontWeight="800" fill={INK} fontFamily="var(--font-display)">O</text>
      <text x={345} y={304} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">CO₂ · double bonds</text>
      <text x={345} y={321} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">two shared pairs per C=O</text>

      {/* NH₄⁺ · dative bond */}
      <circle cx={640} cy={186} r={50} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={640} cy={118} r={28} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={594} cy={228} r={28} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={686} cy={228} r={28} fill={shell} stroke={INK} strokeWidth="2.5" />
      <circle cx={700} cy={146} r={30} fill={shell} stroke={SOFT} strokeWidth="2.5" strokeDasharray="6 5" />
      {/* three ordinary N—H pairs — dots from N, crosses from H */}
      {t3Dot(634.5, 152)}{t3Cross(645.5, 152)}
      {t3Dot(611, 206)}{t3Cross(621, 213)}
      {t3Dot(669, 206)}{t3Cross(659, 213)}
      {/* dative pair — BOTH electrons from N */}
      {t3Dot(668, 162, accent)}{t3Dot(676, 155, accent)}
      <path d="M 662 138 Q 686 108 704 124" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 6" />
      <text x={700} y={92} textAnchor="end" fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">dative — both e⁻ from N</text>
      <text x={633} y={193} textAnchor="middle" fontSize="20" fontWeight="800" fill={INK} fontFamily="var(--font-display)">N</text>
      <text x={634} y={125} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-display)">H</text>
      <text x={588} y={235} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-display)">H</text>
      <text x={680} y={235} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-display)">H</text>
      <text x={712} y={143} textAnchor="middle" fontSize="15" fontWeight="800" fill={SOFT} fontFamily="var(--font-display)">H⁺</text>
      <circle cx={640} cy={252} r={11} fill={accent} stroke={INK} strokeWidth="2" />
      <text x={640} y={256.5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="var(--font-body)">+</text>
      <text x={645} y={304} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">NH₄⁺ · three ordinary + one dative</text>
      <text x={645} y={321} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the coloured pair = donated by N</text>
    </svg>
  );
}

/* ————— 3.12 · diamond / graphite / graphene ————— */

function t3Hex(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export function FigCarbonLattices({ accent = "#FF6B6B" }: { accent?: string }) {
  const r = 19.5;
  const dx = 33.8;
  const dy = 29;
  const hexFill = tint(accent, 88);
  const graphiteRows = [0, 1].flatMap((row) =>
    [0, 1, 2, 3, 4].map((c) => ({ x: 298 + c * dx + (row % 2 ? dx / 2 : 0), y: 104 + row * dy }))
  );
  const graphiteRows2 = [0, 1].flatMap((row) =>
    [0, 1, 2, 3, 4].map((c) => ({ x: 298 + c * dx + (row % 2 ? dx / 2 : 0), y: 204 + row * dy }))
  );
  const grapheneRows = [0, 1, 2, 3].flatMap((row) =>
    [0, 1, 2, 3, 4, 5].map((c) => ({ x: 566 + c * dx + (row % 2 ? dx / 2 : 0), y: 108 + row * dy }))
  );
  return (
    <svg viewBox="0 0 780 330" className="w-full" role="img" aria-label="Diamond, graphite and graphene lattices">
      <line x1={256} y1={40} x2={256} y2={296} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={520} y1={40} x2={520} y2={296} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* diamond — tetrahedral network */}
      {([
        [130, 158, 130, 100],
        [130, 158, 72, 214],
        [130, 158, 188, 214],
        [130, 158, 190, 120],
      ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
        <line key={`b${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      ))}
      {([
        [130, 100, 104, 62],
        [130, 100, 158, 66],
        [72, 214, 40, 244],
        [72, 214, 84, 266],
        [188, 214, 222, 244],
        [188, 214, 178, 268],
        [190, 120, 238, 108],
        [190, 120, 230, 164],
      ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
        <line key={`s${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={FAINT} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      {([[130, 158], [130, 100], [72, 214], [188, 214], [190, 120]] as [number, number][]).map(([x, y], i) => (
        <g key={`a${i}`}>
          <circle cx={x} cy={y} r={10} fill={INK} />
          <circle cx={x - 3} cy={y - 3} r={2.6} fill={PAPER} />
        </g>
      ))}
      {([[104, 62], [158, 66], [40, 244], [84, 266], [222, 244], [178, 268], [238, 108], [230, 164]] as [number, number][]).map(([x, y], i) => (
        <circle key={`t${i}`} cx={x} cy={y} r={6} fill={tint(accent, 40)} stroke={INK} strokeWidth={1.6} />
      ))}
      <text x={130} y={306} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">diamond · tetrahedral 3-D network</text>
      <text x={130} y={323} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">every C bonded to four others — very hard</text>

      {/* graphite — two layers + London gap */}
      {graphiteRows.map((p, i) => (
        <polygon key={`g1-${i}`} points={t3Hex(p.x, p.y, r)} fill={hexFill} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      ))}
      {graphiteRows2.map((p, i) => (
        <polygon key={`g2-${i}`} points={t3Hex(p.x, p.y, r)} fill={hexFill} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      ))}
      <line x1={278} y1={172} x2={496} y2={172} stroke={accent} strokeWidth={2} strokeDasharray="2 7" />
      <text x={388} y={165} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">weak London forces — layers slide</text>
      <circle cx={296} cy={68} r={5} fill={accent} stroke={INK} strokeWidth={1.6} />
      <text x={308} y={72} fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">one free electron per atom → conducts</text>
      <text x={388} y={306} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">graphite · trigonal layers at 120°</text>
      <text x={388} y={323} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">slippery lubricant · pencil ‘lead’ · electrodes</text>

      {/* graphene — one sheet */}
      {grapheneRows.map((p, i) => (
        <polygon key={`gn-${i}`} points={t3Hex(p.x, p.y, r)} fill={hexFill} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      ))}
      <text x={648} y={306} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">graphene · one atom thick</text>
      <text x={648} y={323} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">transparent · flexible · highly conductive</text>
    </svg>
  );
}

/* ————— 3.16–3.19 · the VSEPR shape gallery ————— */

function t3Lobe(cx: number, cy: number, rx: number, ry: number, accent: string, keyId: string) {
  return (
    <g key={keyId}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={tint(accent, 14)} stroke={FAINT} strokeWidth={2} strokeDasharray="5 5" />
      <circle cx={cx - 4.5} cy={cy} r={3} fill={INK} />
      <circle cx={cx + 4.5} cy={cy} r={3} fill={INK} />
    </g>
  );
}

export function FigShapes({ accent = "#FF6B6B" }: { accent?: string }) {
  const atom = tint(accent, 30);
  const L = 56;
  const cap1 = (x: number, name: string, ex: string, ang: string) => (
    <g>
      <text x={x} y={218} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{name}</text>
      <text x={x} y={236} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{ex} · {ang}</text>
    </g>
  );
  const cap2 = (x: number, name: string, ex: string, ang: string) => (
    <g>
      <text x={x} y={386} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{name}</text>
      <text x={x} y={404} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{ex} · {ang}</text>
    </g>
  );
  const bond = (x2: number, y2: number, cx: number, cy: number, keyId: string, dashed = false) => (
    <g key={keyId}>
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={dashed ? SOFT : INK} strokeWidth={dashed ? 2.5 : 3.2} strokeLinecap="round" strokeDasharray={dashed ? "5 5" : undefined} />
      <circle cx={x2} cy={y2} r={7.5} fill={atom} stroke={INK} strokeWidth={2} />
    </g>
  );
  const wedge = (cx: number, cy: number, tx: number, ty: number, keyId: string) => (
    <g key={keyId}>
      <polygon points={`${cx},${cy} ${tx - 7},${ty - 4} ${tx + 7},${ty + 4}`} fill={tint(accent, 45)} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
      <circle cx={tx} cy={ty} r={7.5} fill={atom} stroke={INK} strokeWidth={2} />
    </g>
  );
  return (
    <svg viewBox="0 0 780 430" className="w-full" role="img" aria-label="VSEPR shapes and bond angles">
      {/* row 1 */}
      {/* linear */}
      {bond(110 - L, 140, 110, 140, "lin-l")}
      {bond(110 + L, 140, 110, 140, "lin-r")}
      <path d="M 84 140 A 26 26 0 0 1 136 140" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <text x={110} y={106} textAnchor="middle" fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">180°</text>
      {cap1(110, "linear", "BeCl₂ · CO₂", "180°")}
      {/* trigonal planar */}
      {bond(295, 140 - L, 295, 140, "tp-u")}
      {bond(295 - L * 0.87, 140 + L * 0.5, 295, 140, "tp-l")}
      {bond(295 + L * 0.87, 140 + L * 0.5, 295, 140, "tp-r")}
      <path d="M 271 154 A 30 30 0 0 0 319 154" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <text x={295} y={196} textAnchor="middle" fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">120°</text>
      {cap1(295, "trigonal planar", "BCl₃", "120°")}
      {/* tetrahedral */}
      {bond(480 - L * 0.7, 140 - L * 0.7, 480, 140, "te-ul")}
      {bond(480 + L * 0.7, 140 - L * 0.7, 480, 140, "te-ur")}
      {wedge(480, 140, 480 - L * 0.7, 140 + L * 0.7, "te-w")}
      {bond(480 + L * 0.7, 140 + L * 0.7, 480, 140, "te-dr", true)}
      <path d="M 456 116 A 30 30 0 0 1 504 116" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <text x={480} y={88} textAnchor="middle" fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">109.5°</text>
      {cap1(480, "tetrahedral", "CH₄ · NH₄⁺", "109.5°")}
      {/* trigonal bipyramidal */}
      {bond(665, 140 - L, 665, 140, "tb-u")}
      {bond(665, 140 + L, 665, 140, "tb-d")}
      {bond(665 - L, 140, 665, 140, "tb-l")}
      {bond(665 + L, 140, 665, 140, "tb-r")}
      {wedge(665, 140, 665 - L * 0.45, 140 + L * 0.62, "tb-w")}
      <text x={648} y={104} fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">90°</text>
      <text x={700} y={170} fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">120°</text>
      {cap1(665, "trigonal bipyramidal", "PCl₅ (gaseous)", "90° & 120°")}

      {/* row 2 */}
      {/* trigonal pyramidal */}
      {t3Lobe(170, 258, 17, 24, accent, "py-lp")}
      {bond(170 - L * 0.87, 310 + L * 0.5, 170, 310, "py-l")}
      {bond(170 + L * 0.87, 310 + L * 0.5, 170, 310, "py-r")}
      {wedge(170, 310, 170, 310 + L, "py-w")}
      <path d="M 143 322 A 32 32 0 0 0 197 322" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <text x={170} y={288} textAnchor="middle" fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">107°</text>
      {cap2(170, "trigonal pyramidal", "NH₃ · PCl₃ · H₃O⁺", "107°")}
      {/* bent */}
      {t3Lobe(375, 262, 15, 21, accent, "be-lp1")}
      {t3Lobe(415, 262, 15, 21, accent, "be-lp2")}
      {bond(395 - L * 0.7, 310 + L * 0.7, 395, 310, "be-l")}
      {bond(395 + L * 0.7, 310 + L * 0.7, 395, 310, "be-r")}
      <path d="M 377 334 A 26 26 0 0 0 413 334" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <text x={395} y={296} textAnchor="middle" fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">104.5°</text>
      {cap2(395, "non-linear (bent)", "H₂O · OF₂ · ICl₂⁺", "104.5°")}
      {/* octahedral */}
      {bond(620, 310 - L, 620, 310, "oc-u")}
      {bond(620, 310 + L, 620, 310, "oc-d")}
      {bond(620 - L, 310, 620, 310, "oc-l")}
      {bond(620 + L, 310, 620, 310, "oc-r")}
      {wedge(620, 310, 620 - L * 0.55, 310 + L * 0.55, "oc-w")}
      {bond(620 + L * 0.55, 310 - L * 0.55, 620, 310, "oc-b", true)}
      <text x={640} y={266} fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">90°</text>
      {cap2(620, "octahedral", "SF₆ · PF₆⁻", "90°")}

      {/* footer note */}
      <text x={390} y={424} textAnchor="middle" fontSize="11.5" fontWeight="700" fontStyle="italic" fill={SOFT} fontFamily="var(--font-body)">
        dashed lobes = lone pairs — invisible in the shape, but they squeeze the angles ≈2.5° each
      </text>
    </svg>
  );
}

/* ————— 3.15 · bond dipoles: cancel or not ————— */

export function FigDipoles({ accent = "#FF6B6B" }: { accent?: string }) {
  const atom = tint(accent, 30);
  const chip = (x: number, y: number, label: string, fill: string) => (
    <g>
      <rect x={x - 74} y={y - 16} width={148} height={32} rx={16} fill={fill} stroke={INK} strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const crossedTail = (x: number, y: number, c: string) => (
    <g stroke={c} strokeWidth={2.2} strokeLinecap="round">
      <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} />
      <line x1={x - 4} y1={y + 4} x2={x + 4} y2={y - 4} />
    </g>
  );
  return (
    <svg viewBox="0 0 780 290" className="w-full" role="img" aria-label="Molecular dipoles: cancellation and net dipoles">
      <line x1={256} y1={30} x2={256} y2={272} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={520} y1={30} x2={520} y2={272} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* CO₂ */}
      <line x1={88} y1={120} x2={172} y2={120} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <circle cx={130} cy={120} r={12} fill={INK} />
      <circle cx={76} cy={120} r={17} fill={atom} stroke={INK} strokeWidth={2} />
      <circle cx={184} cy={120} r={17} fill={atom} stroke={INK} strokeWidth={2} />
      <text x={76} y={92} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={130} y={96} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      <text x={184} y={92} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      {crossedTail(112, 146, INK)}
      {t3Arrow(112, 146, 84, 146, INK)}
      {crossedTail(148, 146, INK)}
      {t3Arrow(148, 146, 176, 146, INK)}
      <text x={130} y={182} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">equal & opposite — the dipoles cancel</text>
      {chip(130, 232, "NON-POLAR", tint(accent, 18))}
      <text x={130} y={52} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">CO₂ · linear</text>

      {/* CCl₄ */}
      <g>
        {([
          [388, 124, 340, 76],
          [388, 124, 436, 76],
          [388, 124, 340, 172],
          [388, 124, 436, 172],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={`cc-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        ))}
        <circle cx={388} cy={124} r={12} fill={INK} />
        {([[340, 76], [436, 76], [340, 172], [436, 172]] as [number, number][]).map(([x, y], i) => (
          <circle key={`cl-${i}`} cx={x} cy={y} r={15} fill={atom} stroke={INK} strokeWidth={2} />
        ))}
        <text x={388} y={64} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
        <text x={388} y={102} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
        {crossedTail(370, 106, INK)}
        {t3Arrow(370, 106, 352, 88, INK)}
        {crossedTail(406, 106, INK)}
        {t3Arrow(406, 106, 424, 88, INK)}
        {crossedTail(370, 142, INK)}
        {t3Arrow(370, 142, 352, 160, INK)}
        {crossedTail(406, 142, INK)}
        {t3Arrow(406, 142, 424, 160, INK)}
        <text x={388} y={204} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">four identical dipoles — perfectly balanced</text>
        {chip(388, 232, "NON-POLAR", tint(accent, 18))}
        <text x={388} y={52} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">CCl₄ · tetrahedral</text>
      </g>

      {/* CHCl₃ */}
      <g>
        {([
          [650, 124, 602, 88],
          [650, 124, 698, 88],
          [650, 124, 624, 172],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={`ch-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        ))}
        <line x1={650} y1={124} x2={676} y2={172} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <circle cx={650} cy={124} r={12} fill={INK} />
        {([[602, 88], [698, 88], [624, 172]] as [number, number][]).map(([x, y], i) => (
          <circle key={`c3-${i}`} cx={x} cy={y} r={15} fill={atom} stroke={INK} strokeWidth={2} />
        ))}
        <circle cx={676} cy={172} r={10} fill={PAPER} stroke={INK} strokeWidth={2} />
        <text x={602} y={68} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
        <text x={698} y={68} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
        <text x={612} y={200} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
        <text x={694} y={192} textAnchor="middle" fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
        {t3Arrow(650, 196, 650, 244, accent, 3.5)}
        <text x={662} y={226} fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">net dipole</text>
        {chip(650, 268, "POLAR", tint(accent, 45))}
        <text x={650} y={52} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">CHCl₃ · unsymmetrical</text>
      </g>
    </svg>
  );
}

/* ————— 4.5 · butane, five ways — one molecule, every formula type ————— */

export function FigFormulaTypes({ accent = "#FF6B6B" }: { accent?: string }) {
  const card = tint(accent, 13);
  const stroke = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const };
  const cards = [
    { x: 12, tag: "MOLECULAR", note: ["the exact number of", "atoms of each element"] },
    { x: 194, tag: "EMPIRICAL", note: ["the simplest whole-", "number ratio of atoms"] },
    { x: 376, tag: "STRUCTURAL", note: ["minimal detail of how", "the atoms are arranged"] },
    { x: 558, tag: "DISPLAYED", note: ["every bond drawn —", "all H atoms shown"] },
    { x: 740, tag: "SKELETAL", note: ["a carbon at every join —", "H atoms are implied"] },
  ];
  return (
    <svg viewBox="0 0 920 330" className="w-full" role="img" aria-label="Butane drawn as molecular, empirical, structural, displayed and skeletal formulae">
      {cards.map((c, i) => (
        <g key={c.tag}>
          <rect x={c.x} y={22} width={168} height={286} rx={22} fill={i === 3 ? tint(accent, 22) : card} stroke={tint(accent, 45)} strokeWidth={2} />
          <text x={c.x + 84} y={56} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">{c.tag}</text>
          {c.note.map((ln, j) => (
            <text key={j} x={c.x + 84} y={282 + j * 17} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{ln}</text>
          ))}
        </g>
      ))}

      {/* molecular */}
      <text x={96} y={160} textAnchor="middle" fontSize="34" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">C₄H₁₀</text>

      {/* empirical */}
      <text x={278} y={160} textAnchor="middle" fontSize="34" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">C₂H₅</text>

      {/* structural */}
      <text x={460} y={155} textAnchor="middle" fontSize="17.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₃CH₂CH₂CH₃</text>

      {/* displayed */}
      {(() => {
        const cy = 148;
        const cx = [586, 624, 662, 700];
        const H: [number, number, number, number][] = [
          // cx, cy of carbon, hx, hy of hydrogen
          [cx[0], cy, cx[0], cy - 38],
          [cx[0], cy, cx[0], cy + 38],
          [cx[0], cy, cx[0] - 36, cy],
          [cx[1], cy, cx[1], cy - 38],
          [cx[1], cy, cx[1], cy + 38],
          [cx[2], cy, cx[2], cy - 38],
          [cx[2], cy, cx[2], cy + 38],
          [cx[3], cy, cx[3], cy - 38],
          [cx[3], cy, cx[3], cy + 38],
          [cx[3], cy, cx[3] + 36, cy],
        ];
        return (
          <g>
            {cx.slice(0, -1).map((x, i) => (
              <line key={`cc-${i}`} x1={x + 9} y1={cy} x2={cx[i + 1] - 9} y2={cy} {...stroke} />
            ))}
            {H.map(([x1, y1, x2, y2], i) => {
              const dx = x2 - x1, dy = y2 - y1;
              const len = Math.hypot(dx, dy);
              const t = (len - 12) / len;
              return <line key={`ch-${i}`} x1={x1} y1={y1} x2={x1 + dx * t} y2={y1 + dy * t} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />;
            })}
            {H.map(([, , hx, hy], i) => (
              <text key={`h-${i}`} x={hx} y={hy + 4.5} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>
            ))}
            {cx.map((x, i) => (
              <text key={`c-${i}`} x={x} y={cy + 5.5} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">C</text>
            ))}
          </g>
        );
      })()}

      {/* skeletal */}
      <polyline points="768,168 804,128 840,168 876,128" fill="none" {...stroke} strokeWidth={3.4} />
      {[[768, 168], [804, 128], [840, 168], [876, 128]].map(([x, y], i) => (
        <circle key={`v-${i}`} cx={x} cy={y} r={5} fill={accent} />
      ))}
    </svg>
  );
}

/* ————— 4.5 · anatomy of an IUPAC name ————— */

export function FigNaming({ accent = "#FF6B6B" }: { accent?: string }) {
  const chipBg = tint(accent, 16);
  const chip = (label: string) => (
    <text x={115} y={0} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">{label}</text>
  );
  const rows: { part: string; y: number; text: string; strong?: boolean }[] = [
    { part: "3-ethyl", y: 150, text: "side-chain — named first: ethyl before methyl (alphabetical)", strong: true },
    { part: "2", y: 188, text: "locant — the number of the carbon the methyl sits on" },
    { part: "methyl", y: 226, text: "second side-chain — CH₃, its stem plus -yl" },
    { part: "hex", y: 264, text: "stem — the longest continuous chain holds 6 carbons" },
    { part: "ane", y: 302, text: "suffix — the family: an alkane" },
  ];
  return (
    <svg viewBox="0 0 820 356" className="w-full" role="img" aria-label="The parts of the name 3-ethyl-2-methylhexane, labelled">
      {/* the name itself */}
      <text x={410} y={62} textAnchor="middle" fontSize="27" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">
        <tspan fill={accent}>3-ethyl</tspan>
        <tspan fill={FAINT}>-</tspan>
        <tspan>2-</tspan>
        <tspan fill={accent}>methyl</tspan>
        <tspan>hexane</tspan>
      </text>
      <text x={410} y={92} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        numbering left to right gives 2,3 — from the other end it would be 4,5, so 2,3 is the lower set
      </text>

      <line x1={40} y1={112} x2={780} y2={112} stroke={tint(accent, 40)} strokeWidth={2} />

      {rows.map((r) => (
        <g key={r.part}>
          <rect x={40} y={r.y - 21} width={150} height={30} rx={15} fill={r.strong ? tint(accent, 34) : chipBg} stroke={tint(accent, 48)} strokeWidth={1.6} />
          {(() => {
            const t = chip(r.part);
            return <g transform={`translate(0 ${r.y - 0.5})`}>{t}</g>;
          })()}
          <text x={210} y={r.y} fontSize="13.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{r.text}</text>
        </g>
      ))}

      <text x={40} y={340} fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        punctuation — numbers join numbers with commas, numbers join letters with hyphens
      </text>
    </svg>
  );
}

/* ————— 4.12 · the fractionating column ————— */

export function FigFracCol({ accent = "#FF6B6B" }: { accent?: string }) {
  const fractions = [
    { y: 76, name: "REFINERY GAS", c: "C₁ – C₄", use: "bottled fuel · feedstock for other synthesis" },
    { y: 146, name: "GASOLINE", c: "C₅ – C₁₀", use: "petrol for car engines — the more branched, the better" },
    { y: 216, name: "KEROSENE", c: "C₁₁ – C₁₂", use: "aircraft fuel · cracked for extra gasoline" },
    { y: 286, name: "DIESEL · GAS OIL", c: "longer chains", use: "diesel engines · industrial boilers" },
    { y: 356, name: "RESIDUE", c: "the heaviest", use: "lubricating oil · fuel oil · waxes · bitumen" },
  ];
  const colX = 128, colW = 74;
  return (
    <svg viewBox="0 0 880 440" className="w-full" role="img" aria-label="A fractionating column with its five fractions and their uses">
      <defs>
        <linearGradient id="fracGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint(accent, 16)} />
          <stop offset="100%" stopColor={tint(accent, 58)} />
        </linearGradient>
      </defs>

      {/* temperature rail */}
      <text x={96} y={70} textAnchor="end" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">cool</text>
      <text x={96} y={382} textAnchor="end" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">hot</text>
      <line x1={104} y1={80} x2={104} y2={370} stroke={FAINT} strokeWidth={2.4} />
      <polygon points="104,382 98,368 110,368" fill={FAINT} />
      <text x={30} y={230} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)" transform="rotate(-90 30 230)" textAnchor="middle">temperature rises down the column</text>

      {/* column */}
      <rect x={colX} y={40} width={colW} height={370} rx={18} fill="url(#fracGrad)" stroke={INK} strokeWidth={2.6} />
      {[80, 136, 192, 248, 304, 360].map((y) => (
        <line key={y} x1={colX + 10} y1={y} x2={colX + colW - 10} y2={y} stroke={PAPER} strokeWidth={3} strokeLinecap="round" opacity={0.75} />
      ))}

      {/* crude oil in */}
      <text x={165} y={432} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">crude oil in, heated</text>
      <polygon points={`${colX + 37},400 ${colX + 29},414 ${colX + 45},414`} fill={INK} />

      {fractions.map((f, i) => {
        const fill = tint(accent, 14 + i * 11);
        return (
          <g key={f.name}>
            <line x1={colX + colW} y1={f.y} x2={268} y2={f.y} stroke={tint(accent, 55)} strokeWidth={2.6} strokeDasharray="1 6" strokeLinecap="round" />
            <circle cx={colX + colW} cy={f.y} r={4.5} fill={INK} />
            <rect x={268} y={f.y - 20} width={250} height={40} rx={20} fill={fill} stroke={INK} strokeWidth={2} />
            <text x={288} y={f.y - 2} fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{f.name}</text>
            <text x={288 + 250 - 22} y={f.y - 2} textAnchor="end" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">{f.c}</text>
            <text x={288} y={f.y + 36} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{f.use}</text>
          </g>
        );
      })}

      <text x={600} y={52} fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">each level takes off a fraction —</text>
      <text x={600} y={72} fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">compounds with a similar boiling range</text>
      <text x={600} y={96} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">boiling point increases as chain length grows,</text>
      <text x={600} y={114} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">so longer molecules condense lower down</text>
    </svg>
  );
}

/* ————— 4.11 · the three skeletal isomers of C₅H₁₂ ————— */

export function FigIsomers({ accent = "#FF6B6B" }: { accent?: string }) {
  const s = { stroke: INK, strokeWidth: 3.4, strokeLinecap: "round" as const, fill: "none" } as const;
  const vertex = (x: number, y: number, k: string) => <circle key={k} cx={x} cy={y} r={5} fill={accent} />;
  return (
    <svg viewBox="0 0 880 250" className="w-full" role="img" aria-label="Skeletal formulae of pentane, 2-methylbutane and 2,2-dimethylpropane">
      <text x={440} y={30} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        C₅H₁₂ — one molecular formula, three different skeletons
      </text>

      {/* pentane */}
      <text x={160} y={66} textAnchor="middle" fontSize="14" fontWeight="800" fill={accent} fontFamily="var(--font-body)">pentane</text>
      <polyline points="70,150 115,108 160,150 205,108 250,150" {...s} />
      {[[70, 150], [115, 108], [160, 150], [205, 108], [250, 150]].map(([x, y], i) => vertex(x, y, `p-${i}`))}
      <text x={160} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the straight chain — CH₃(CH₂)₃CH₃</text>

      {/* 2-methylbutane */}
      <text x={450} y={66} textAnchor="middle" fontSize="14" fontWeight="800" fill={accent} fontFamily="var(--font-body)">2-methylbutane</text>
      <polyline points="375,150 420,108 465,150 510,108" {...s} />
      <line x1={420} y1={108} x2={420} y2={64} {...s} />
      {[[375, 150], [420, 108], [465, 150], [510, 108], [420, 64]].map(([x, y], i) => vertex(x, y, `m-${i}`))}
      <text x={450} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">a four-carbon chain, one methyl branch on C-2</text>

      {/* 2,2-dimethylpropane */}
      <text x={740} y={66} textAnchor="middle" fontSize="14" fontWeight="800" fill={accent} fontFamily="var(--font-body)">2,2-dimethylpropane</text>
      <g>
        <line x1={740} y1={118} x2={740} y2={80} {...s} />
        <line x1={740} y1={118} x2={740} y2={156} {...s} />
        <line x1={740} y1={118} x2={700} y2={118} {...s} />
        <line x1={740} y1={118} x2={780} y2={118} {...s} />
        {[[740, 80], [740, 156], [700, 118], [780, 118]].map(([x, y], i) => vertex(x, y, `d-${i}`))}
        <circle cx={740} cy={118} r={5} fill={INK} />
      </g>
      <text x={740} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">a central carbon carrying four methyls</text>
    </svg>
  );
}

/* ————— 4.18 · homolytic free-radical substitution, the chain ————— */

/* single-barb (half-headed) arrow — one electron moves */
function halfHook(x: number, y: number, dx: number, dy: number, c: string) {
  const ex = x + dx, ey = y + dy;
  const mx = x + dx * 0.5, my = y + dy * 0.5 - 12;
  const a = Math.atan2(ey - my, ex - mx);
  return (
    <g stroke={c} strokeWidth={2.4} fill="none" strokeLinecap="round">
      <path d={`M ${x} ${y} Q ${mx} ${my} ${ex} ${ey}`} />
      <path d={`M ${ex} ${ey} L ${ex - 9 * Math.cos(a - 1.15)} ${ey - 9 * Math.sin(a - 1.15)}`} />
    </g>
  );
}

export function FigRadChain({ accent = "#FF6B6B" }: { accent?: string }) {
  const stage = (y: number, label: string, fill: string) => (
    <g>
      <rect x={36} y={y - 17} width={158} height={34} rx={17} fill={fill} stroke={INK} strokeWidth={2} />
      <text x={115} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="1" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const stepBox = (y: number, w: number, eq: string, note: string) => (
    <g>
      <rect x={236} y={y - 24} width={w} height={48} rx={20} fill={tint(accent, 12)} stroke={tint(accent, 42)} strokeWidth={2} />
      <text x={256} y={y + 2} fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">{eq}</text>
      <text x={256 + w - 36} y={y + 2} textAnchor="end" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{note}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 880 480" className="w-full" role="img" aria-label="The three stages of free-radical substitution: initiation, propagation, termination">
      {/* ————— initiation ————— */}
      {stage(76, "INITIATION", tint(accent, 22))}
      <text x={236} y={62} fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">Cl—Cl</text>
      {/* half-headed arrows: each atom keeps one electron */}
      {halfHook(300, 56, -34, -18, accent)}
      {halfHook(312, 56, 34, -18, accent)}
      <text x={470} y={62} fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">Cl•   +   •Cl</text>
      {(() => {
        // wavy UV arrow
        const d = "M 238 96 q 9 -9 18 0 q 9 9 18 0 q 9 -9 18 0 q 9 9 18 0";
        return (
          <g>
            <path d={d} stroke={accent} strokeWidth={2.4} fill="none" strokeLinecap="round" />
            <text x={346} y={100} fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">UV light supplies the energy</text>
          </g>
        );
      })()}
      <text x={236} y={128} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        homolytic fission — the bond splits evenly, one electron each way (half-headed arrows)
      </text>

      <line x1={36} y1={156} x2={856} y2={156} stroke={tint(accent, 40)} strokeWidth={2} />

      {/* ————— propagation ————— */}
      {stage(206, "PROPAGATION", tint(accent, 38))}
      {stepBox(198, 560, "Cl• + CH₄ → •CH₃ + HCl", "a H atom is substituted")}
      {stepBox(252, 560, "•CH₃ + Cl₂ → CH₃Cl + Cl•", "the Cl• is back — the chain turns over")}
      {/* loop arrow = chain */}
      <path d="M 800 180 C 836 196 836 250 800 266" fill="none" stroke={accent} strokeWidth={2.4} strokeLinecap="round" />
      <polygon points="800,266 812,258 813,270" fill={accent} />
      <text x={236} y={296} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        each step makes a new radical — one photon can churn out thousands of molecules
      </text>

      <line x1={36} y1={318} x2={856} y2={318} stroke={tint(accent, 40)} strokeWidth={2} />

      {/* ————— termination ————— */}
      {stage(356, "TERMINATION", tint(accent, 54))}
      {[
        { eq: "Cl• + Cl• → Cl₂", x: 316 },
        { eq: "•CH₃ + Cl• → CH₃Cl", x: 520 },
        { eq: "•CH₃ + •CH₃ → C₂H₆", x: 724 },
      ].map((t) => (
        <g key={t.eq}>
          <rect x={t.x - 92} y={340} width={184} height={40} rx={20} fill={tint(accent, 12)} stroke={tint(accent, 42)} strokeWidth={2} />
          <text x={t.x} y={365} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">{t.eq}</text>
        </g>
      ))}
      <text x={236} y={412} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        two free radicals combine to form a neutral product — the chain stops. The trace of ethane (C₂H₆) is the evidence
      </text>
      <text x={236} y={432} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        that two •CH₃ radicals combined together in a termination step.
      </text>

      {stage(466, "OVERALL", PAPER)}
      <text x={236} y={471} fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₄ + Cl₂ → CH₃Cl + HCl   —   further substitution continues</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Topic 5 · alkene figures — sp² hybridisation, geometric (cis–trans
   and E–Z) isomerism, the electrophilic-addition mechanisms,
   carbocation stability and addition polymerisation
   ═══════════════════════════════════════════════════════════════ */

/* full-headed curly arrow — an electron PAIR moves */
function curlyPair(x: number, y: number, dx: number, dy: number, c: string) {
  const ex = x + dx, ey = y + dy;
  const mx = x + dx * 0.5, my = y + dy * 0.5 - 13;
  const a = Math.atan2(ey - my, ex - mx);
  return (
    <g stroke={c} strokeWidth={2.4} fill="none" strokeLinecap="round">
      <path d={`M ${x} ${y} Q ${mx} ${my} ${ex} ${ey}`} />
      <path d={`M ${ex} ${ey} L ${ex - 10 * Math.cos(a - 0.85)} ${ey - 10 * Math.sin(a - 0.85)}`} />
      <path d={`M ${ex} ${ey} L ${ex - 10 * Math.cos(a + 0.85)} ${ey - 10 * Math.sin(a + 0.85)}`} />
    </g>
  );
}

/* priority badge — the numbered dot of the E–Z ranking */
function prioBadge(x: number, y: number, n: number, accent: string) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={accent} stroke={INK} strokeWidth={1.6} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={readableInk(accent)} fontFamily="var(--font-body)">{n}</text>
    </g>
  );
}

/* ————— 5.1 · sp² hybridisation in the C=C carbons ————— */

export function FigSp2({ accent = "#FF6B6B" }: { accent?: string }) {
  const ghost = tint(accent, 78);
  const mid = tint(accent, 40);
  const sOrb = (x: number, y: number, label: string) => (
    <g>
      <circle cx={x} cy={y} r={24} fill={ghost} stroke={FAINT} strokeWidth={2.5} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const pH = (x: number, y: number, label: string) => (
    <g>
      <ellipse cx={x - 25} cy={y} rx={24} ry={12} fill={ghost} stroke={FAINT} strokeWidth={2.5} />
      <ellipse cx={x + 25} cy={y} rx={24} ry={12} fill={ghost} stroke={FAINT} strokeWidth={2.5} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const pV = (x: number, y: number, label?: string) => (
    <g>
      <ellipse cx={x} cy={y - 26} rx={12} ry={24} fill={ghost} stroke={FAINT} strokeWidth={2.5} />
      <ellipse cx={x} cy={y + 26} rx={12} ry={24} fill={ghost} stroke={FAINT} strokeWidth={2.5} />
      {label && <text x={x + 18} y={y + 4} fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{label}</text>}
    </g>
  );
  const sp2 = (cx: number, cy: number, a: number) => (
    <g transform={`rotate(${a}, ${cx}, ${cy})`}>
      <ellipse cx={cx + 36} cy={cy} rx={32} ry={13} fill={mid} stroke={FAINT} strokeWidth={2} />
    </g>
  );
  return (
    <svg viewBox="0 0 780 320" className="w-full" role="img" aria-label="sp2 hybridisation: an s and two p orbitals give three sp2 hybrids plus one unhybridized p orbital; in ethene the p orbitals overlap sideways to make the pi bond">
      <text x={127} y={48} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={SOFT} fontFamily="var(--font-body)">GROUND STATE</text>
      <text x={387} y={48} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={SOFT} fontFamily="var(--font-body)">HYBRIDISED</text>
      <text x={647} y={48} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={SOFT} fontFamily="var(--font-body)">IN ETHENE</text>
      <line x1={258} y1={60} x2={258} y2={284} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={514} y1={60} x2={514} y2={284} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* panel 1 · an s and two p's */}
      {sOrb(127, 110, "s")}
      {pH(127, 200, "p")}
      <text x={127} y={262} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">an s and two p's —</text>
      <text x={127} y={278} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the three orbitals that hybridise</text>

      {/* panel 2 · three sp² + one p */}
      {sp2(370, 168, 0)}
      {sp2(370, 168, 120)}
      {sp2(370, 168, 240)}
      <circle cx={370} cy={168} r={5} fill={INK} />
      {pV(462, 168, "p")}
      <text x={370} y={242} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">three sp² hybrid orbitals…</text>
      <text x={370} y={258} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">…and one normal p orbital left over</text>

      {/* panel 3 · ethene */}
      <ellipse cx={647} cy={136} rx={40} ry={11} fill={mid} opacity={0.7} />
      <ellipse cx={647} cy={222} rx={40} ry={11} fill={mid} opacity={0.7} />
      <line x1={612} y1={172} x2={682} y2={172} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={612} y1={184} x2={682} y2={184} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={612} y1={178} x2={578} y2={138} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={612} y1={178} x2={578} y2={218} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={682} y1={178} x2={716} y2={138} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={682} y1={178} x2={716} y2={218} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <circle cx={612} cy={178} r={6.5} fill={INK} />
      <circle cx={682} cy={178} r={6.5} fill={INK} />
      <text x={568} y={130} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>
      <text x={568} y={232} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>
      <text x={726} y={130} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>
      <text x={726} y={232} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>
      <text x={700} y={140} fontSize="11.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">π</text>
      <text x={700} y={226} fontSize="11.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">π</text>
      <path d="M 596 162 A 26 26 0 0 0 596 194" fill="none" stroke={SOFT} strokeWidth={1.8} />
      <text x={583} y={183} textAnchor="middle" fontSize="10" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">120°</text>
      <text x={647} y={262} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">bonds at 120° — the unhybridized p's</text>
      <text x={647} y={278} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">overlap sideways to add the π bond</text>
    </svg>
  );
}

/* ————— 5.2 · cis–trans, but-2-ene ————— */

export function FigGeometric({ accent = "#FF6B6B" }: { accent?: string }) {
  const bond = { stroke: INK, strokeWidth: 3.2, strokeLinecap: "round" as const };
  const molecule = (lx: number, rx: number, cy: number, trans: boolean, key: string) => {
    const mx = (lx + rx) / 2;
    const leftTop = trans ? "H" : "CH₃";
    const leftBot = trans ? "CH₃" : "H";
    const rightTop = trans ? "H" : "CH₃";
    const rightBot = trans ? "CH₃" : "H";
    return (
      <g key={key}>
        <line x1={lx} y1={cy - 6} x2={rx} y2={cy - 6} {...bond} />
        <line x1={lx} y1={cy + 6} x2={rx} y2={cy + 6} {...bond} />
        <line x1={lx} y1={cy} x2={lx - 46} y2={cy - 46} {...bond} />
        <line x1={lx} y1={cy} x2={lx - 46} y2={cy + 46} {...bond} />
        <line x1={rx} y1={cy} x2={rx + 46} y2={cy - 46} {...bond} />
        <line x1={rx} y1={cy} x2={rx + 46} y2={cy + 46} {...bond} />
        <circle cx={lx} cy={cy} r={6.5} fill={INK} />
        <circle cx={rx} cy={cy} r={6.5} fill={INK} />
        <text x={lx - 60} y={cy - 50} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{leftTop}</text>
        <text x={lx - 60} y={cy + 60} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{leftBot}</text>
        <text x={rx + 60} y={cy - 50} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{rightTop}</text>
        <text x={rx + 60} y={cy + 60} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{rightBot}</text>
        <text x={mx} y={cy + 34} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={FAINT} fontFamily="var(--font-body)">locked</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 780 320" className="w-full" role="img" aria-label="cis-but-2-ene and trans-but-2-ene: the double bond cannot rotate, so the two shapes are different compounds">
      <rect x={288} y={16} width={204} height={32} rx={16} fill={tint(accent, 18)} stroke={INK} strokeWidth={2} />
      <text x={390} y={37} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={INK} fontFamily="var(--font-body)">C=C CANNOT ROTATE</text>
      <line x1={390} y1={64} x2={390} y2={284} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {molecule(200, 280, 170, false, "cis")}
      <text x={220} y={66} textAnchor="middle" fontSize="15" fontWeight="800" fill={accent} fontFamily="var(--font-body)">cis-but-2-ene</text>
      <text x={220} y={286} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">similar groups on the SAME side</text>

      {molecule(500, 580, 170, true, "trans")}
      <text x={560} y={66} textAnchor="middle" fontSize="15" fontWeight="800" fill={accent} fontFamily="var(--font-body)">trans-but-2-ene</text>
      <text x={560} y={286} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">similar groups ACROSS the double bond</text>
    </svg>
  );
}

/* ————— 5.3 · the E–Z tie-break worked example ————— */

export function FigEz({ accent = "#FF6B6B" }: { accent?: string }) {
  const bond = { stroke: INK, strokeWidth: 3.2, strokeLinecap: "round" as const };
  const chip = (x: number, y: number, label: string, w: number) => (
    <g>
      <rect x={x - w / 2} y={y - 16} width={w} height={32} rx={16} fill="var(--color-paper)" stroke={INK} strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 780 340" className="w-full" role="img" aria-label="E-Z priority assignment for 1-chloro-2-methylbut-1-ene: chlorine has the higher priority on the right-hand carbon, the ethyl group has the higher priority on the tie-break on the left-hand carbon, and the higher priority groups are on opposite sides, so E">
      {/* the molecule */}
      <line x1={300} y1={175} x2={410} y2={175} {...bond} />
      <line x1={300} y1={185} x2={410} y2={185} {...bond} />
      <line x1={300} y1={180} x2={244} y2={128} {...bond} />
      <line x1={300} y1={180} x2={244} y2={232} {...bond} />
      <line x1={410} y1={180} x2={466} y2={128} {...bond} />
      <line x1={410} y1={180} x2={466} y2={232} {...bond} />
      <circle cx={300} cy={180} r={6.5} fill={INK} />
      <circle cx={410} cy={180} r={6.5} fill={INK} />
      {chip(222, 118, "CH₃", 64)}
      {prioBadge(258, 96, 2, accent)}
      {chip(218, 242, "C₂H₅", 72)}
      {prioBadge(254, 264, 1, accent)}
      {chip(490, 118, "Cl", 52)}
      {prioBadge(452, 96, 1, accent)}
      {chip(492, 242, "H", 44)}
      {prioBadge(454, 264, 2, accent)}
      <text x={222} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">② lower priority</text>
      <text x={218} y={288} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">① higher priority</text>
      <text x={490} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">① higher priority</text>
      <text x={492} y={288} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">② lower priority</text>

      {/* the tie-break callout */}
      <rect x={130} y={306} width={400} height={30} rx={15} fill={tint(accent, 12)} stroke={tint(accent, 40)} strokeWidth={2} />
      <text x={330} y={326} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">tie on the left C (C vs C) → next shell: CH₃ = H,H,H · C₂H₅ = C,H,H → the ethyl group has the higher priority</text>

      {/* the E/Z verdict card */}
      <rect x={570} y={84} width={186} height={200} rx={22} fill={tint(accent, 9)} stroke={tint(accent, 36)} strokeWidth={2} />
      <text x={663} y={116} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Z · zusammen = together</text>
      <text x={663} y={134} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">higher-priority groups on the same side</text>
      <text x={663} y={162} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">E · entgegen = opposite</text>
      <text x={663} y={180} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">higher-priority groups across</text>
      <line x1={590} y1={196} x2={736} y2={196} stroke={FAINT} strokeWidth="2" strokeDasharray="4 6" />
      <text x={663} y={220} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">here: Cl above · C₂H₅ below</text>
      <text x={663} y={238} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">opposite sides → the E-isomer</text>
      <text x={663} y={266} textAnchor="middle" fontSize="13" fontWeight="800" fill={accent} fontFamily="var(--font-body)">E-1-chloro-2-methylbut-1-ene</text>
    </svg>
  );
}

/* ————— 5.6 · the electrophilic addition mechanisms ————— */

export function FigElecAdd({ accent = "#FF6B6B" }: { accent?: string }) {
  const rowChip = (y: number, label: string, fill: string) => (
    <g>
      <rect x={36} y={y - 17} width={168} height={34} rx={17} fill={fill} stroke={INK} strokeWidth={2} />
      <text x={120} y={y + 5} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const major = (x: number, y: number, label: string, on: boolean) => (
    <g>
      <rect x={x - 46} y={y - 15} width={92} height={30} rx={15} fill={on ? accent : "none"} stroke={on ? INK : SOFT} strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1.5" fill={on ? readableInk(accent) : SOFT} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 880 580" className="w-full" role="img" aria-label="Electrophilic addition mechanisms: HBr to ethene via a carbocation, Br2 polarised by the electrons of the pi bond, and HBr to propene forming the major product via the more stable carbocation">
      <line x1={28} y1={198} x2={852} y2={198} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={28} y1={390} x2={852} y2={390} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— row 1 · HBr + ethene ————— */}
      {rowChip(100, "HBr + ETHENE", tint(accent, 22))}
      {/* stage 1: pi pair bonds to H, H–Br pair leaves */}
      <text x={250} y={78} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">H₂C=CH₂</text>
      <text x={415} y={72} fontSize="11.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      <text x={470} y={72} fontSize="11.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={412} y={92} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">H</text>
      <text x={430} y={92} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">—</text>
      <text x={452} y={92} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">Br</text>
      <text x={505} y={78} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">+</text>
      <text x={640} y={84} fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">[CH₃—CH₂]⁺</text>
      <text x={788} y={88} fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">Br⁻</text>
      <text x={640} y={106} fontSize="11" fontWeight="700" fill={accent} fontFamily="var(--font-body)">carbocation</text>
      <circle cx={793} cy={70} r={2.4} fill={INK} /><circle cx={799} cy={66} r={2.4} fill={INK} />
      <circle cx={793} cy={102} r={2.4} fill={INK} /><circle cx={799} cy={106} r={2.4} fill={INK} />
      {curlyPair(310, 68, 92, 8, accent)}
      {curlyPair(440, 84, 26, 18, accent)}
      {t3Arrow(556, 84, 606, 84, INK)}
      <text x={330} y={132} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the π pair bonds to the δ⁺ H — heterolytic fission of H—Br</text>
      {/* stage 2: Br⁻ attacks the carbocation */}
      {curlyPair(776, 84, -58, 2, accent)}
      {t3Arrow(700, 118, 700, 148, INK)}
      <text x={640} y={172} fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₃—CH₂—Br</text>
      <text x={250} y={166} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Br⁻ (nucleophile) attacks the carbocation</text>
      <text x={250} y={186} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">overall: HBr added across the double bond</text>

      {/* ————— row 2 · Br₂ + ethene ————— */}
      {rowChip(292, "Br₂ + ETHENE", tint(accent, 22))}
      <text x={250} y={288} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">H₂C=CH₂</text>
      <text x={418} y={264} fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">δ+</text>
      <text x={474} y={264} fontSize="11.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={412} y={288} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">Br</text>
      <text x={442} y={288} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">—</text>
      <text x={462} y={288} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">Br</text>
      {t3Arrow(330, 276, 400, 278, SOFT, 2.2)}
      {t3Arrow(330, 296, 400, 294, SOFT, 2.2)}
      <text x={250} y={330} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the π electrons repel the Br—Br pair → a dipole is induced —</text>
      <text x={250} y={348} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">so the non-polar bromine can act as an electrophile</text>
      {t3Arrow(540, 288, 592, 288, INK)}
      <text x={648} y={294} fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₂Br—CH₂Br</text>
      <text x={648} y={316} fontSize="11" fontWeight="700" fill={accent} fontFamily="var(--font-body)">di-substituted halogenoalkane</text>

      {/* ————— row 3 · HBr + propene ————— */}
      {rowChip(486, "HBr + PROPENE", tint(accent, 22))}
      <text x={250} y={452} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₃—CH=CH₂</text>
      <text x={402} y={452} fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">+ HBr</text>
      {t3Arrow(510, 446, 556, 420, INK)}
      {t3Arrow(510, 462, 556, 488, SOFT, 2.2)}
      <text x={562} y={412} fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₃—C⁺H—CH₃</text>
      <text x={562} y={430} fontSize="11" fontWeight="700" fill={accent} fontFamily="var(--font-body)">secondary carbocation · 2 alkyl groups</text>
      {t3Arrow(712, 416, 748, 416, INK)}
      <text x={758} y={421} fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₃CHBrCH₃</text>
      {major(790, 448, "MAJOR", true)}
      <text x={562} y={500} fontSize="14.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">CH₃—CH₂—CH₂⁺</text>
      <text x={562} y={518} fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">primary carbocation · 1 alkyl group</text>
      {t3Arrow(712, 504, 748, 504, SOFT, 2.2)}
      <text x={758} y={509} fontSize="14.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">CH₃CH₂CH₂Br</text>
      {major(790, 536, "MINOR", false)}
      <text x={250} y={556} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the major product is the one formed via the more stable carbocation</text>
    </svg>
  );
}

/* ————— 5.6 · primary, secondary, tertiary carbocations ————— */

export function FigCarbocation({ accent = "#FF6B6B" }: { accent?: string }) {
  const rChip = (x: number, y: number, key: string) => (
    <g key={key}>
      <rect x={x - 23} y={y - 14} width={46} height={28} rx={14} fill={tint(accent, 30)} stroke={INK} strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">R</text>
    </g>
  );
  const ion = (cx: number, cy: number, up: "H" | "R", left: "H" | "R", right: "H" | "R", key: string) => (
    <g key={key}>
      <line x1={cx} y1={cy} x2={cx} y2={cy - 44} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx - 44} y2={cy} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 44} y2={cy} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      {up === "R" ? rChip(cx, cy - 62, `${key}-u`) : <text x={cx} y={cy - 52} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>}
      {left === "R" ? rChip(cx - 62, cy, `${key}-l`) : <text x={cx - 62} y={cy + 5} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>}
      {right === "R" ? rChip(cx + 62, cy, `${key}-r`) : <text x={cx + 62} y={cy + 5} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>}
      <circle cx={cx} cy={cy} r={17} fill="var(--color-paper)" stroke={INK} strokeWidth={2.5} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">C⁺</text>
    </g>
  );
  return (
    <svg viewBox="0 0 780 300" className="w-full" role="img" aria-label="Primary, secondary and tertiary carbocations — stability increases with the number of alkyl groups">
      <text x={127} y={48} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={SOFT} fontFamily="var(--font-body)">PRIMARY (1°)</text>
      <text x={387} y={48} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={SOFT} fontFamily="var(--font-body)">SECONDARY (2°)</text>
      <text x={647} y={48} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill={SOFT} fontFamily="var(--font-body)">TERTIARY (3°)</text>
      <line x1={258} y1={60} x2={258} y2={216} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={514} y1={60} x2={514} y2={216} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      {ion(127, 150, "H", "H", "R", "p")}
      {ion(387, 150, "H", "R", "R", "s")}
      {ion(647, 150, "R", "R", "R", "t")}
      <text x={127} y={212} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">one alkyl group</text>
      <text x={387} y={212} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">two alkyl groups</text>
      <text x={647} y={212} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">three alkyl groups</text>
      {t3Arrow(120, 254, 660, 254, accent, 3)}
      <text x={390} y={280} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">stability increases — alkyl groups are electron releasing and help to stabilize the positive charge</text>
      <text x={700} y={30} textAnchor="end" fontSize="11.5" fontWeight="700" fill={FAINT} fontFamily="var(--font-body)">R = any alkyl group</text>
    </svg>
  );
}

/* ————— 5.7 · addition polymerisation ————— */

export function FigPolymer({ accent = "#FF6B6B" }: { accent?: string }) {
  const bracketL = (x: number, y: number, h: number) => (
    <path d={`M ${x + 10} ${y} L ${x} ${y} L ${x} ${y + h} L ${x + 10} ${y + h}`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
  );
  const bracketR = (x: number, y: number, h: number) => (
    <path d={`M ${x - 10} ${y} L ${x} ${y} L ${x} ${y + h} L ${x - 10} ${y + h}`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
  );
  const mini = (cx: number, name: string, unit: string, monomer: string, key: string) => (
    <g key={key}>
      <text x={cx} y={252} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">{name}</text>
      <text x={cx} y={282} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">{unit}</text>
      {t3Arrow(cx, 296, cx, 320, SOFT, 2.2)}
      <text x={cx} y={342} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-mono)">{monomer}</text>
      <text x={cx} y={362} textAnchor="middle" fontSize="11" fontWeight="700" fill={FAINT} fontFamily="var(--font-body)">restore the C=C → monomer</text>
    </g>
  );
  return (
    <svg viewBox="0 0 880 380" className="w-full" role="img" aria-label="Ethene polymerises to polyethene; the repeat units of polypropene, polychloroethene and polytetrafluoroethene trace back to their monomers">
      <text x={60} y={100} fontSize="15" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">n</text>
      <rect x={84} y={74} width={118} height={42} rx={21} fill={tint(accent, 14)} stroke={tint(accent, 42)} strokeWidth={2} />
      <text x={143} y={101} textAnchor="middle" fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₂=CH₂</text>
      {t3Arrow(230, 95, 330, 95, INK)}
      <text x={280} y={72} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">addition polymerisation</text>
      <line x1={338} y1={95} x2={352} y2={95} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      {bracketL(356, 68, 56)}
      <text x={446} y={102} textAnchor="middle" fontSize="15.5" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">—CH₂—CH₂—</text>
      {bracketR(536, 68, 56)}
      <line x1={536} y1={95} x2={550} y2={95} stroke={INK} strokeWidth={3.2} strokeLinecap="round" />
      <text x={560} y={118} fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">n</text>
      <text x={446} y={152} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">polyethene — the C=C opens, the chain carries on through the brackets</text>
      <line x1={28} y1={182} x2={852} y2={182} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <text x={440} y={212} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">THE EXERCISE THREE — REPEAT UNIT → MONOMER</text>
      <line x1={293} y1={226} x2={293} y2={366} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={587} y1={226} x2={587} y2={366} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      {mini(160, "poly(propene)", "—[CH₂—CH(CH₃)]—ₙ", "CH₂=CHCH₃", "pp")}
      {mini(440, "poly(chloroethene)", "—[CH₂—CHCl]—ₙ", "CH₂=CHCl", "pvc")}
      {mini(720, "poly(tetrafluoroethene)", "—[CF₂—CF₂]—ₙ", "CF₂=CF₂", "ptfe")}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Topic 6 · Energetics — ΔH levels and profiles, calorimetry,
   Hess's cycles, bond enthalpies and the cooling curve.
   ═══════════════════════════════════════════════════════════════ */

/* small tspan helpers — sub/superscripts inside SVG text */
const SubT = ({ children }: { children: ReactNode }) => (
  <tspan dy="3.5" fontSize="10">{children}</tspan>
);
const SubBack = ({ children }: { children: ReactNode }) => (
  <tspan dy="-3.5">{children}</tspan>
);
const SupT = ({ children }: { children: ReactNode }) => (
  <tspan dy="-5.5" fontSize="10">{children}</tspan>
);

/* mini chart axes with arrowheads, shared by the level/profile panels */
function MiniAxes({ ox, oy, w, up, yLabel }: { ox: number; oy: number; w: number; up: number; yLabel: string }) {
  return (
    <g>
      {t3Arrow(ox, oy, ox + w, oy, INK, 3)}
      {t3Arrow(ox, oy, ox, oy - up, INK, 3)}
      <text
        x={ox - 22}
        y={oy - up / 2}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill={INK}
        fontFamily="var(--font-body)"
        transform={`rotate(-90 ${ox - 22} ${oy - up / 2})`}
      >
        {yLabel}
      </text>
      <text x={ox + w / 2} y={oy + 26} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
        Progress of reaction
      </text>
    </g>
  );
}

/* ————— 6.2 · the chemical system and its surroundings ————— */

export function FigThermo({ accent = "#FF6B6B" }: { accent?: string }) {
  const hot = "#FF6B6B";
  const cold = "#9775FA";
  const thermo = (cx: number, top: number, bottom: number, mercury: number, c: string) => (
    <g>
      <rect x={cx - 9} y={top} width={18} height={bottom - top - 14} rx={9} fill="var(--color-paper)" stroke={INK} strokeWidth={2.4} />
      <circle cx={cx} cy={bottom - 8} r={12} fill={c} stroke={INK} strokeWidth={2.4} />
      <rect x={cx - 3.2} y={mercury} width={6.4} height={bottom - 18 - mercury} rx={3.2} fill={c} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={cx + 9} y1={top + 18 + i * 22} x2={cx + 15} y2={top + 18 + i * 22} stroke={INK} strokeWidth={2} strokeLinecap="round" />
      ))}
    </g>
  );
  const flowArrow = (x: number, y: number, out: boolean, c: string) =>
    out ? t3Arrow(x, y, x < 0 ? x - 34 : x + 34, y, c, 3.2) : t3Arrow(x < 0 ? x - 34 : x + 34, y, x, y, c, 3.2);
  return (
    <svg viewBox="0 0 880 330" className="w-full" role="img" aria-label="Exothermic: heat flows out of the chemical system to the surroundings, temperature rises, delta T positive, the chemicals lose energy, delta H is negative. Endothermic: heat flows in from the surroundings, temperature falls, delta T negative, the chemicals gain energy, delta H is positive.">
      <line x1={440} y1={26} x2={440} y2={304} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— exothermic panel ————— */}
      <text x={225} y={44} textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="1.5" fill={hot} fontFamily="var(--font-body)">EXOTHERMIC</text>
      <rect x={148} y={128} width={154} height={64} rx={14} fill={tint(hot, 18)} stroke={INK} strokeWidth={2.4} />
      <text x={225} y={156} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Chemical</text>
      <text x={225} y={174} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">system</text>
      {flowArrow(140, 160, true, hot)}
      {flowArrow(310, 160, true, hot)}
      {t3Arrow(225, 122, 225, 96, hot, 3.2)}
      {t3Arrow(225, 198, 225, 224, hot, 3.2)}
      <text x={112} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      <text x={338} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      <text x={112} y={248} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      <text x={338} y={248} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      {thermo(415, 84, 246, 150, hot)}
      {t3Arrow(452, 230, 452, 110, hot, 3)}
      <text x={466} y={128} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Temperature</text>
      <text x={466} y={144} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">rise</text>
      <text x={466} y={166} fontSize="12.5" fontWeight="800" fill={hot} fontFamily="var(--font-body)">ΔT+ve</text>
      <text x={225} y={286} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">The chemicals lose energy. ΔH is negative.</text>

      {/* ————— endothermic panel ————— */}
      <text x={640} y={44} textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="1.5" fill={cold} fontFamily="var(--font-body)">ENDOTHERMIC</text>
      <rect x={548} y={128} width={154} height={64} rx={14} fill={tint(cold, 16)} stroke={INK} strokeWidth={2.4} />
      <text x={625} y={156} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Chemical</text>
      <text x={625} y={174} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">system</text>
      {flowArrow(540, 160, false, cold)}
      {flowArrow(710, 160, false, cold)}
      {t3Arrow(625, 96, 625, 122, cold, 3.2)}
      {t3Arrow(625, 224, 625, 198, cold, 3.2)}
      <text x={512} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      <text x={762} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      <text x={512} y={248} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      <text x={762} y={248} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Surroundings</text>
      {thermo(848, 84, 246, 108, cold)}
      {t3Arrow(812, 110, 812, 230, cold, 3)}
      <text x={625} y={286} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">The chemicals gain energy. ΔH is positive.</text>
      <text x={750} y={118} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Temperature</text>
      <text x={750} y={134} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">fall</text>
      <text x={750} y={156} fontSize="12.5" fontWeight="800" fill={cold} fontFamily="var(--font-body)">ΔT−ve</text>
    </svg>
  );
}

/* ————— 6.3 · energy level diagrams, exothermic + endothermic ————— */

export function FigLevels({ accent = "#FF6B6B" }: { accent?: string }) {
  const hot = "#FF6B6B";
  const cold = "#9775FA";
  return (
    <svg viewBox="0 0 880 340" className="w-full" role="img" aria-label="Energy level diagrams. Exothermic: reactants level above products level, delta H = negative. Endothermic: reactants level below products level, delta H = positive. Both axes are enthalpy H against progress of reaction.">
      {/* ————— exothermic ————— */}
      <MiniAxes ox={100} oy={272} w={280} up={210} yLabel="Enthalpy, H" />
      <line x1={130} y1={116} x2={262} y2={116} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <text x={196} y={102} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
      <line x1={262} y1={230} x2={386} y2={230} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <text x={330} y={216} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
      {t3Arrow(262, 120, 262, 226, hot, 3.4)}
      <text x={276} y={178} fontSize="13" fontWeight="800" fill={hot} fontFamily="var(--font-body)">ΔH = − ve</text>
      <text x={238} y={52} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">EXOTHERMIC</text>

      {/* ————— endothermic ————— */}
      <MiniAxes ox={520} oy={272} w={280} up={210} yLabel="Enthalpy, H" />
      <line x1={550} y1={230} x2={682} y2={230} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <text x={616} y={252} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
      <line x1={682} y1={116} x2={806} y2={116} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <text x={748} y={102} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
      {t3Arrow(682, 226, 682, 120, cold, 3.4)}
      <text x={612} y={178} fontSize="13" fontWeight="800" fill={cold} fontFamily="var(--font-body)">ΔH = + ve</text>
      <text x={658} y={52} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">ENDOTHERMIC</text>
    </svg>
  );
}

/* ————— 6.3 · energy profile diagrams, exothermic + endothermic ————— */

export function FigProfiles({ accent = "#FF6B6B" }: { accent?: string }) {
  const hot = "#FF6B6B";
  const cold = "#9775FA";
  const mint = "#12B886";
  return (
    <svg viewBox="0 0 880 380" className="w-full" role="img" aria-label="Energy profile diagrams. Exothermic: the curve climbs the activation energy from the reactants to the peak and falls to products below the reactants, delta H negative. Endothermic: products sit above the reactants, delta H positive.">
      {/* ————— exothermic ————— */}
      <MiniAxes ox={100} oy={300} w={280} up={244} yLabel="Enthalpy, H" />
      <line x1={126} y1={206} x2={214} y2={206} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={214} y1={206} x2={340} y2={206} stroke={FAINT} strokeWidth={2.4} strokeDasharray="5 6" />
      <text x={160} y={192} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
      <line x1={288} y1={284} x2={388} y2={284} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <text x={344} y={270} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
      <path d={`M 214 206 C 240 150, 262 112, 292 112 C 322 112, 336 220, 362 284`} fill="none" stroke={tint(accent, 45)} strokeWidth={4.5} strokeLinecap="round" />
      {t3Arrow(292, 202, 292, 118, mint, 3.2)}
      <text x={306} y={152} fontSize="11.5" fontWeight="700" fill={mint} fontFamily="var(--font-body)">Activation</text>
      <text x={306} y={167} fontSize="11.5" fontWeight="700" fill={mint} fontFamily="var(--font-body)">energy</text>
      {t3Arrow(254, 210, 254, 280, hot, 3.2)}
      <text x={168} y={252} fontSize="12.5" fontWeight="800" fill={hot} fontFamily="var(--font-body)">ΔH − ve</text>
      <text x={238} y={52} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">EXOTHERMIC</text>

      {/* ————— endothermic ————— */}
      <MiniAxes ox={520} oy={300} w={280} up={244} yLabel="Enthalpy, H" />
      <line x1={546} y1={284} x2={634} y2={284} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={634} y1={284} x2={760} y2={284} stroke={FAINT} strokeWidth={2.4} strokeDasharray="5 6" />
      <text x={580} y={304} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
      <line x1={708} y1={206} x2={808} y2={206} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <text x={764} y={192} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
      <path d={`M 634 284 C 660 210, 682 118, 712 118 C 742 118, 756 150, 782 206`} fill="none" stroke={tint(accent, 45)} strokeWidth={4.5} strokeLinecap="round" />
      {t3Arrow(712, 280, 712, 124, mint, 3.2)}
      <text x={726} y={164} fontSize="11.5" fontWeight="700" fill={mint} fontFamily="var(--font-body)">Activation</text>
      <text x={726} y={179} fontSize="11.5" fontWeight="700" fill={mint} fontFamily="var(--font-body)">energy</text>
      {t3Arrow(774, 280, 774, 210, cold, 3.2)}
      <text x={700} y={252} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={cold} fontFamily="var(--font-body)">ΔH + ve</text>
      <text x={658} y={52} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">ENDOTHERMIC</text>
    </svg>
  );
}

/* ————— 6.5 · the two calorimeters ————— */

export function FigCalorimetry({ accent = "#FF6B6B" }: { accent?: string }) {
  const water = tint(accent, 20);
  const label = (x: number, y: number, t: string, anchor: "start" | "middle" | "end" = "start") => (
    <text x={x} y={y} textAnchor={anchor} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{t}</text>
  );
  return (
    <svg viewBox="0 0 880 350" className="w-full" role="img" aria-label="Combustion calorimetry: a spirit burner below a beaker of water with a thermometer. Mixing calorimetry: a polystyrene cup held in a beaker with a thermometer stirring the solution.">
      <line x1={440} y1={26} x2={440} y2={324} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— spirit burner + beaker ————— */}
      {/* beaker (open top) */}
      <path d="M 130 96 L 130 250 Q 130 258 138 258 L 322 258 Q 330 258 330 250 L 330 96" fill="none" stroke={INK} strokeWidth={3.4} strokeLinecap="round" />
      <rect x={134} y={132} width={192} height={122} rx={4} fill={water} />
      {/* thermometer */}
      <rect x={262} y={44} width={16} height={168} rx={8} fill="var(--color-paper)" stroke={INK} strokeWidth={2.4} />
      <circle cx={270} cy={216} r={10} fill={accent} stroke={INK} strokeWidth={2.4} />
      <rect x={266.4} y={150} width={5.2} height={58} rx={2.6} fill={accent} />
      {/* spirit burner */}
      <path d="M 194 296 Q 194 288 202 288 L 258 288 Q 266 288 266 296 L 266 322 L 194 322 Z" fill="var(--color-paper)" stroke={INK} strokeWidth={2.8} strokeLinejoin="round" />
      <rect x={222} y={276} width={16} height={12} fill="var(--color-paper)" stroke={INK} strokeWidth={2.4} />
      <path d="M 230 276 C 224 266, 226 258, 230 250 C 234 258, 236 266, 230 276 Z" fill={accent} stroke={shade(accent)} strokeWidth={1.6} />
      {/* heat rays */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M ${206 + i * 24} 246 q 4 -7 0 -14`} fill="none" stroke={tint(accent, 45)} strokeWidth={2.4} strokeLinecap="round" />
      ))}
      {label(120, 40, "thermometer", "start")}
      <line x1={186} y1={46} x2={258} y2={56} stroke={FAINT} strokeWidth={2} />
      {label(348, 130, "beaker")}
      <line x1={344} y1={126} x2={330} y2={140} stroke={FAINT} strokeWidth={2} />
      {label(348, 200, "water")}
      <line x1={344} y1={196} x2={326} y2={200} stroke={FAINT} strokeWidth={2} />
      {label(180, 344, "spirit burner", "middle")}
      <text x={230} y={66} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">COMBUSTION</text>

      {/* ————— polystyrene cup in a beaker ————— */}
      <path d="M 560 96 L 560 250 Q 560 258 568 258 L 752 258 Q 760 258 760 250 L 760 96" fill="none" stroke={INK} strokeWidth={3.4} strokeLinecap="round" />
      {/* cup */}
      <path d="M 592 118 L 610 244 L 710 244 L 728 118" fill="var(--color-paper)" stroke={INK} strokeWidth={2.8} strokeLinejoin="round" />
      <path d="M 598 160 L 610 244 L 710 244 L 722 160" fill={water} opacity={0.75} />
      {/* thermometer */}
      <rect x={652} y={40} width={16} height={158} rx={8} fill="var(--color-paper)" stroke={INK} strokeWidth={2.4} />
      <circle cx={660} cy={204} r={10} fill={accent} stroke={INK} strokeWidth={2.4} />
      <rect x={656.4} y={168} width={5.2} height={28} rx={2.6} fill={accent} />
      {label(560, 40, "thermometer", "start")}
      <line x1={626} y1={46} x2={648} y2={54} stroke={FAINT} strokeWidth={2} />
      {label(776, 130, "beaker")}
      <line x1={772} y1={126} x2={758} y2={140} stroke={FAINT} strokeWidth={2} />
      {label(776, 190, "polystyrene cup")}
      <line x1={772} y1={186} x2={726} y2={200} stroke={FAINT} strokeWidth={2} />
      {label(776, 250, "solution")}
      <line x1={772} y1={246} x2={712} y2={230} stroke={FAINT} strokeWidth={2} />
      <text x={660} y={66} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1" fill={SOFT} fontFamily="var(--font-body)">MIXING</text>
      <text x={660} y={344} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">stir with the thermometer</text>
    </svg>
  );
}

/* ————— 6.8 · the cooling curve, plotted with the Exercise 6 data ————— */

const COOLING_DATA: [number, number][] = [
  [0, 20.0], [1, 20.0], [2, 20.0], [3, 20.0],
  [4, 63.0], [5, 60.5], [6, 59.0], [7, 57.0], [8, 55.5], [9, 53.0],
];

export function FigCoolingCurve({ accent = "#FF6B6B" }: { accent?: string }) {
  const w = 760;
  const h = 420;
  const pad = { l: 66, r: 26, t: 28, b: 64 };
  const axisY = h - pad.b;
  const xMax = 9.5;
  const yMax = 70;
  const X = (t: number) => pad.l + (t / xMax) * (w - pad.l - pad.r);
  const Y = (v: number) => axisY - (v / yMax) * (axisY - pad.t);
  const rise = COOLING_DATA.slice(3, 5).map(([t, v]) => `${X(t)},${Y(v)}`).join(" ");
  const cool = COOLING_DATA.slice(4).map(([t, v]) => `${X(t)},${Y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Cooling curve of the zinc and copper sulfate experiment: temperature flat at 20 degrees, a sharp rise when the reactants are mixed at 3.5 minutes, then a gradual fall. The cooling line is extrapolated back and the start line forward; delta T is read between them at the moment of mixing.">
      {/* gridlines + y ticks */}
      {[0, 10, 20, 30, 40, 50, 60, 70].map((t) => (
        <g key={t}>
          <line x1={pad.l - 6} y1={Y(t)} x2={pad.l} y2={Y(t)} stroke={INK} strokeWidth={2} />
          <text x={pad.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">{t}</text>
        </g>
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={axisY} x2={X(t)} y2={axisY + 6} stroke={INK} strokeWidth={2} />
          <text x={X(t)} y={axisY + 20} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">{t}</text>
        </g>
      ))}
      <line x1={pad.l} y1={axisY} x2={w - pad.r} y2={axisY} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={axisY} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={14} y={(axisY + pad.t) / 2} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform={`rotate(-90 14 ${(axisY + pad.t) / 2})`}>
        Temperature / °C
      </text>
      <text x={(w + pad.l) / 2} y={h - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Time / minutes</text>

      {/* extrapolations */}
      <line x1={X(0)} y1={Y(20)} x2={X(4.4)} y2={Y(20)} stroke={FAINT} strokeWidth={2.2} strokeDasharray="6 6" />
      <line x1={X(3.42)} y1={Y(64.2)} x2={X(9.4)} y2={Y(52.2)} stroke={FAINT} strokeWidth={2.2} strokeDasharray="6 6" />
      {/* the two curves */}
      <polyline points={rise} fill="none" stroke={tint(accent, 45)} strokeWidth={4} strokeLinecap="round" />
      <polyline points={cool} fill="none" stroke={tint(accent, 45)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {COOLING_DATA.map(([t, v]) => (
        <circle key={t} cx={X(t)} cy={Y(v)} r={4.5} fill={INK} />
      ))}
      {/* ΔT construction at the moment of mixing */}
      {t3Arrow(X(3.5), Y(20), X(3.5), Y(64), accent, 3.4)}
      <circle cx={X(3.5)} cy={Y(64)} r={4.5} fill="none" stroke={accent} strokeWidth={2.4} />
      <text x={X(3.5) - 26} y={Y(42)} textAnchor="end" fontSize="17" fontWeight="800" fill={accent} fontFamily="var(--font-body)">ΔT</text>
      {/* annotations */}
      <text x={X(1.5)} y={Y(20) - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">before mixing</text>
      <text x={X(6.8)} y={Y(56) - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the mixture cools</text>
      <text x={X(3.5) + 10} y={Y(64) - 10} fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">extrapolated lines</text>
    </svg>
  );
}

/* ————— 6.6 · the two general Hess routes ————— */

function CycleBox({ x, y, w, lines }: { x: number; y: number; w: number; lines: ReactNode[] }) {
  const h = 30 + (lines.length - 1) * 19;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={13} fill={tint("#FF6B6B", 10)} stroke={INK} strokeWidth={2.4} />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 20 + i * 19} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">
          {l}
        </text>
      ))}
    </g>
  );
}

export function FigHessGeneral({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  const dH = (sub: string, rest: string) => (
    <>
      ΔH<SubT>{sub}</SubT><SubBack>{rest}</SubBack>
    </>
  );
  return (
    <svg viewBox="0 0 880 430" className="w-full" role="img" aria-label="The two general Hess cycles. With combustion data: reactants plus oxygen go to products plus oxygen via delta H reaction, and both burn to the combustion products. With formation data: the elements form the reactants and the products, and delta H reaction runs between them.">
      <text x={222} y={40} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="0.8" fill={SOFT} fontFamily="var(--font-body)">when combustion data is given</text>
      <text x={662} y={40} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="0.8" fill={SOFT} fontFamily="var(--font-body)">when formation data is given</text>
      <line x1={440} y1={24} x2={440} y2={406} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— combustion route ————— */}
      <CycleBox x={30} y={86} w={150} lines={["Reactants + oxygen"]} />
      <CycleBox x={262} y={86} w={150} lines={["Products + oxygen"]} />
      {t3Arrow(186, 101, 256, 101, INK, 3)}
      <text x={221} y={82} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{dH("", "[reaction]")}</text>
      <CycleBox x={121} y={290} w={200} lines={["Combustion products"]} />
      {t3Arrow(100, 122, 185, 284, INK, 2.8)}
      {t3Arrow(342, 122, 257, 284, INK, 2.8)}
      <text x={88} y={216} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{dH("com", " [reactants]")}</text>
      <text x={354} y={216} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{dH("com", " [products]")}</text>

      {/* ————— formation route ————— */}
      <CycleBox x={502} y={86} w={116} lines={["Reactants"]} />
      <CycleBox x={716} y={86} w={116} lines={["Products"]} />
      {t3Arrow(624, 101, 710, 101, INK, 3)}
      <text x={667} y={82} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{dH("", "[reaction]")}</text>
      <CycleBox x={596} y={290} w={136} lines={["Elements"]} />
      {t3Arrow(640, 284, 556, 122, INK, 2.8)}
      {t3Arrow(688, 284, 778, 122, INK, 2.8)}
      <text x={512} y={216} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{dH("f", " [reactants]")}</text>
      <text x={818} y={216} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{dH("f", " [products]")}</text>
    </svg>
  );
}

/* ————— 6.6 · Example 1 — ΔfH of CO from two ΔcH values ————— */

export function FigHessCo({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  const dfH = (
    <>
      Δ<SubT>f</SubT><SubBack>H</SubBack><SupT>θ</SupT>
    </>
  );
  return (
    <svg viewBox="0 0 720 330" className="w-full" role="img" aria-label="Hess cycle for carbon monoxide: C solid graphite plus half O2 gas forms CO gas along the top with delta f H theta; both the elements and CO burn to CO2 with minus 394 and minus 283 kJ per mol.">
      <CycleBox x={56} y={70} w={240} lines={["C(s, graphite) + ½O₂(g)"]} />
      <CycleBox x={478} y={70} w={120} lines={["CO(g)"]} />
      {t3Arrow(302, 88, 472, 88, INK, 3)}
      <text x={387} y={64} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{dfH}</text>
      <CycleBox x={268} y={240} w={136} lines={["CO₂(g)"]} />
      {t3Arrow(148, 116, 300, 236, INK, 2.8)}
      {t3Arrow(518, 116, 396, 236, INK, 2.8)}
      <text x={168} y={186} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−394</text>
      <text x={122} y={206} fontSize="11.5" fontWeight="700" fill={FAINT} fontFamily="var(--font-mono)">+ ½O₂(g)</text>
      <text x={486} y={186} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−283</text>
      <text x={492} y={206} fontSize="11.5" fontWeight="700" fill={FAINT} fontFamily="var(--font-mono)">+ ½O₂(g)</text>
    </svg>
  );
}

/* ————— 6.6 · Example 2 — ΔfH of methane from combustion data ————— */

export function FigHessCh4({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  const dfH = (
    <>
      Δ<SubT>f</SubT><SubBack>H</SubBack><SupT>θ</SupT>
    </>
  );
  return (
    <svg viewBox="0 0 760 340" className="w-full" role="img" aria-label="Hess cycle for methane: C graphite plus 2 H2 gas forms CH4 gas along the top with delta f H theta; the elements burn with minus 394 and 2 times minus 286, and methane burns with minus 890, all reaching CO2 plus 2 H2O liquid.">
      <CycleBox x={56} y={70} w={234} lines={["C(graphite) + 2H₂(g)"]} />
      <CycleBox x={508} y={70} w={128} lines={["CH₄(g)"]} />
      {t3Arrow(296, 88, 502, 88, INK, 3)}
      <text x={399} y={64} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{dfH}</text>
      <CycleBox x={224} y={244} w={280} lines={["CO₂(g) + 2H₂O(l)"]} />
      {t3Arrow(140, 116, 268, 240, INK, 2.8)}
      {t3Arrow(230, 116, 350, 240, INK, 2.8)}
      {t3Arrow(552, 116, 470, 240, INK, 2.8)}
      <text x={132} y={186} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−394</text>
      <text x={252} y={196} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">2×−286</text>
      <text x={540} y={186} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−890</text>
    </svg>
  );
}

/* ————— 6.6 · Example 3 — ΔrH of CaCO₃ decomposition from formation data ————— */

export function FigHessCaco3({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  const drH = (
    <>
      Δ<SubT>r</SubT><SubBack>H</SubBack><SupT>θ</SupT>
    </>
  );
  return (
    <svg viewBox="0 0 760 340" className="w-full" role="img" aria-label="Hess cycle for calcium carbonate decomposition: CaCO3 solid goes to CaO solid plus CO2 gas along the top with delta r H theta; the elements form CaCO3 with minus 1207 and the products with minus 635 and minus 394.">
      <CycleBox x={90} y={70} w={150} lines={["CaCO₃(s)"]} />
      <CycleBox x={470} y={70} w={230} lines={["CaO(s) + CO₂(g)"]} />
      {t3Arrow(246, 88, 464, 88, INK, 3)}
      <text x={355} y={64} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{drH}</text>
      <CycleBox x={292} y={244} w={150} lines={["Elements"]} />
      {t3Arrow(330, 240, 196, 116, INK, 2.8)}
      {t3Arrow(398, 240, 496, 116, INK, 2.8)}
      {t3Arrow(442, 240, 606, 116, INK, 2.8)}
      <text x={188} y={186} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−1207</text>
      <text x={440} y={200} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−635</text>
      <text x={600} y={190} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">−394</text>
    </svg>
  );
}

/* ————— Exercise 8 · the atomisation cycle for butane ————— */

export function FigHessButane({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  return (
    <svg viewBox="0 0 780 320" className="w-full" role="img" aria-label="The atomisation cycle for butane: C4H10 gas plus six and a half O2 gas going to 4 CO2 gas plus 5 H2O liquid along the top; both sides are pulled apart into 4 C gas, 10 H gas and 13 O gas atoms with plus 8410 and plus 11280 kJ per mol.">
      <CycleBox x={80} y={56} w={620} lines={["C₄H₁₀(g) + 6½O₂(g) → 4CO₂(g) + 5H₂O(l)"]} />
      <CycleBox x={228} y={228} w={320} lines={["4C(g) + 10H(g) + 13O(g)"]} />
      {t3Arrow(268, 96, 348, 224, INK, 2.8)}
      {t3Arrow(512, 96, 432, 224, INK, 2.8)}
      <text x={196} y={170} textAnchor="end" fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">+8410 kJ mol⁻¹</text>
      <text x={584} y={170} fontSize="13.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">+11280 kJ mol⁻¹</text>
    </svg>
  );
}

/* ————— 6.9 · the bond-enthalpy cycle for gaseous water ————— */

export function FigBondH2O({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  const dHr = (
    <>
      ΔH<SubT>r</SubT>
    </>
  );
  return (
    <svg viewBox="0 0 720 330" className="w-full" role="img" aria-label="Bond enthalpy cycle for gaseous water: H2 gas plus half O2 gas goes to H2O gas along the top with delta H r; breaking the reactant bonds costs E of H-H plus half E of O=O, making the two O-H bonds returns 2 E of O-H, with gaseous atoms below.">
      <CycleBox x={56} y={70} w={220} lines={["H₂(g) + ½O₂(g)"]} />
      <CycleBox x={488} y={70} w={130} lines={["H₂O(g)"]} />
      {t3Arrow(282, 88, 482, 88, INK, 3)}
      <text x={382} y={64} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{dHr}</text>
      <CycleBox x={252} y={240} w={180} lines={["2H(g) + O(g)"]} />
      {t3Arrow(148, 116, 296, 236, INK, 2.8)}
      {t3Arrow(534, 236, 560, 116, INK, 2.8)}
      <text x={148} y={186} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">E(H—H) + ½E(O=O)</text>
      <text x={470} y={186} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-mono)">2E(O—H)</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Topic 7 · intermolecular forces — the drawings
   Shared molecule helpers; hydrogen bonds always dashed in the
   section accent, covalent bonds solid ink.
   ═══════════════════════════════════════════════════════════════ */

function t7Hbond(x1: number, y1: number, x2: number, y2: number, accent: string) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth={3.2} strokeDasharray="7 6" strokeLinecap="round" />
  );
}

function t7Water(x: number, y: number, rot: number, accent: string) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <line x1={x} y1={y} x2={x - 27} y2={y + 23} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + 27} y2={y + 23} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={x} cy={y} r={15} fill={tint(accent, 26)} stroke={INK} strokeWidth={2.4} />
      <circle cx={x - 27} cy={y + 23} r={8.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={x + 27} cy={y + 23} r={8.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* two lone pairs on the oxygen */}
      <circle cx={x - 9.5} cy={y - 12.5} r={2.4} fill={INK} />
      <circle cx={x - 4.5} cy={y - 16.5} r={2.4} fill={INK} />
      <circle cx={x + 4.5} cy={y - 16.5} r={2.4} fill={INK} />
      <circle cx={x + 9.5} cy={y - 12.5} r={2.4} fill={INK} />
    </g>
  );
}

function t7Ammonia(x: number, y: number, accent: string) {
  return (
    <g>
      <line x1={x} y1={y} x2={x - 26} y2={y + 24} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + 26} y2={y + 24} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x} y2={y + 32} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={x} cy={y} r={14.5} fill={tint(accent, 26)} stroke={INK} strokeWidth={2.4} />
      <circle cx={x - 26} cy={y + 24} r={8.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={x + 26} cy={y + 24} r={8.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={x} cy={y + 32} r={8.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* the one lone pair on nitrogen */}
      <circle cx={x - 4.5} cy={y - 16} r={2.4} fill={INK} />
      <circle cx={x + 4.5} cy={y - 16} r={2.4} fill={INK} />
    </g>
  );
}

/* ————— 7.1 · the flickering dipole and its induced neighbour ————— */

export function FigLondon({ accent = "#FF6B6B" }: { accent?: string }) {
  const cloud = tint(accent, 30);
  const shell = tint(accent, 74);
  const Molecule = ({ x, y, shift }: { x: number; y: number; shift: number }) => (
    <g>
      <circle cx={x} cy={y} r={34} fill={shell} stroke={INK} strokeWidth={2.4} />
      <ellipse cx={x + shift} cy={y} rx={20} ry={27} fill={cloud} opacity={0.85} />
    </g>
  );
  return (
    <svg viewBox="0 0 780 300" className="w-full" role="img" aria-label="An instantaneous dipole in one molecule inducing the opposite dipole in its neighbour; the two attract">
      {/* pair one — the teaching pair */}
      <Molecule x={150} y={104} shift={-11} />
      <Molecule x={330} y={104} shift={11} />
      <text x={112} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={188} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      <text x={296} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={368} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      <line x1={252} y1={104} x2={228} y2={104} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={228} y1={104} x2={236} y2={97} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={228} y1={104} x2={236} y2={111} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <text x={240} y={172} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">opposite sign — the pair attracts</text>
      <text x={150} y={190} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">instantaneous dipole</text>
      <text x={330} y={190} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">induced dipole</text>

      {/* pair two — and so on through the liquid */}
      <Molecule x={520} y={104} shift={-11} />
      <Molecule x={700} y={104} shift={11} />
      <line x1={622} y1={104} x2={598} y2={104} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={598} y1={104} x2={606} y2={97} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={598} y1={104} x2={606} y2={111} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <text x={482} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={558} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      <text x={666} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={738} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>

      {/* the flicker: same pair a moment later */}
      <Molecule x={240} y={248} shift={11} />
      <Molecule x={420} y={248} shift={-11} />
      <text x={150} y={254} fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">…a moment later, everywhere:</text>
      <text x={330} y={292} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the dipoles keep forming, vanishing and re-forming</text>
    </svg>
  );
}

/* ————— 7.5 · points of contact — methane vs hexane ————— */

export function FigContact({ accent = "#FF6B6B" }: { accent?: string }) {
  const blob = tint(accent, 20);
  const chip = (x: number, y: number, label: string, w: number) => (
    <g>
      <rect x={x - w / 2} y={y - 15} width={w} height={30} rx={15} fill={blob} stroke={INK} strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const methane = (x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r={26} fill={blob} stroke={INK} strokeWidth={2.2} />
      <circle cx={x} cy={y} r={8} fill={INK} />
      {([[-24, -24], [24, -24], [-24, 24], [24, 24]] as [number, number][]).map(([dx, dy], i) => (
        <g key={i}>
          <line x1={x + dx * 0.42} y1={y + dy * 0.42} x2={x + dx} y2={y + dy} stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
          <circle cx={x + dx} cy={y + dy} r={6} fill={PAPER} stroke={INK} strokeWidth={1.8} />
        </g>
      ))}
    </g>
  );
  const chain = (x: number, y: number, n: number) => {
    const seg = 26;
    const pts: [number, number][] = [];
    for (let i = 0; i < n; i++) pts.push([x + i * seg, y + (i % 2 === 0 ? -8 : 8)]);
    return (
      <g>
        <rect x={x - 20} y={y - 26} width={n * seg + 6} height={52} rx={26} fill="transparent" stroke={FAINT} strokeWidth={1.6} />
        {pts.slice(0, -1).map(([px, py], i) => (
          <line key={i} x1={px} y1={py} x2={pts[i + 1][0]} y2={pts[i + 1][1]} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
        ))}
        {pts.map(([px, py], i) => (
          <circle key={`c${i}`} cx={px} cy={py} r={7.5} fill={PAPER} stroke={INK} strokeWidth={2} />
        ))}
      </g>
    );
  };
  return (
    <svg viewBox="0 0 920 330" className="w-full" role="img" aria-label="Two methane molecules touch at one point; two hexane chains lie alongside each other with many points of contact">
      {/* methane — one contact */}
      {methane(180, 130)}
      {methane(330, 130)}
      <line x1={286} y1={130} x2={226} y2={130} stroke={accent} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="6 6" />
      <text x={255} y={196} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">one point of contact</text>
      <text x={255} y={218} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">fewer contact points —</text>
      <text x={255} y={236} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">weaker London forces</text>

      {/* hexane — many contacts */}
      {chain(560, 108, 6)}
      {chain(560, 176, 6)}
      {[[566, 142], [626, 142], [686, 142], [746, 142]].map(([x, y], i) => (
        <line key={i} x1={x + 14} y1={y} x2={x - 14} y2={y} stroke={accent} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="6 6" />
      ))}
      <text x={660} y={218} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">many points of contact</text>
      <text x={660} y={240} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">more contact — stronger London forces</text>

      {chip(255, 292, "CH₄ · small sphere", 190)}
      {chip(660, 292, "C₆H₁₄ · long chain", 200)}
    </svg>
  );
}

/* ————— 7.2 · hydrogen bonding in water ————— */

export function FigHbondWater({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 760 340" className="w-full" role="img" aria-label="Three water molecules: dashed hydrogen bonds from an oxygen lone pair to a hydrogen of the neighbour, delta minus on oxygen and delta plus on hydrogen">
      {/* central water */}
      {t7Water(360, 170, 0, accent)}
      <text x={332} y={150} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={416} y={218} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      {/* neighbour upper-right: its H points down-left at the central lone pair */}
      {t7Water(586, 84, 138, accent)}
      <text x={620} y={70} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      {t7Hbond(400, 152, 512, 128, accent)}
      <text x={452} y={116} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">hydrogen bond</text>
      {/* neighbour lower-left: receives the central water's H */}
      {t7Water(130, 258, -42, accent)}
      <text x={92} y={236} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      {t7Hbond(340, 200, 226, 246, accent)}
      <text x={168} y={316} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">two lone pairs → water donates two</text>
      <text x={168} y={334} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">and accepts two — up to four bonds</text>
    </svg>
  );
}

/* ————— 7.2 · hydrogen bonding in ammonia ————— */

export function FigHbondNh3({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 720 250" className="w-full" role="img" aria-label="Two ammonia molecules: the lone pair on one nitrogen attracts a delta-plus hydrogen of the neighbour, labelled hydrogen bond and lone pair">
      {t7Ammonia(220, 120, accent)}
      {t7Ammonia(500, 120, accent)}
      <text x={220} y={88} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">Nδ−</text>
      <text x={500} y={88} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">Nδ−</text>
      <text x={292} y={182} fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">Hδ+</text>
      {t7Hbond(252, 102, 472, 132, accent)}
      <text x={362} y={96} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">hydrogen bond</text>
      <text x={168} y={186} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">lone pair</text>
      <line x1={196} y1={172} x2={212} y2={136} stroke={INK} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

/* ————— 7.2 · the zig-zag (HF)n chain in the solid ————— */

export function FigHbondHf({ accent = "#FF6B6B" }: { accent?: string }) {
  const F = (x: number, y: number, k: string) => (
    <g key={k}>
      <circle cx={x} cy={y} r={15} fill={tint(accent, 30)} stroke={INK} strokeWidth={2.4} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">F</text>
      <text x={x - 4} y={y - 22} fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
    </g>
  );
  const H = (x: number, y: number, k: string) => (
    <g key={k}>
      <circle cx={x} cy={y} r={9} fill={PAPER} stroke={INK} strokeWidth={2.2} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">H</text>
      <text x={x + 4} y={y - 16} fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 240" className="w-full" role="img" aria-label="Hydrogen fluoride solid: a zig-zag chain of F covalently bonded to H, each H hydrogen bonded to the next F">
      {/* covalent F—H bonds (solid) */}
      <line x1={130} y1={186} x2={196} y2={110} stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      <line x1={266} y1={172} x2={332} y2={96} stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      <line x1={402} y1={186} x2={468} y2={110} stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      {/* hydrogen bonds (dashed) */}
      {t7Hbond(205, 118, 252, 160, accent)}
      {t7Hbond(341, 104, 388, 160, accent)}
      {t7Hbond(477, 118, 524, 160, accent)}
      {F(130, 186, "f1")}
      {H(196, 110, "h1")}
      {F(266, 172, "f2")}
      {H(332, 96, "h2")}
      {F(402, 186, "f3")}
      {H(468, 110, "h3")}
      {F(538, 172, "f4")}
      <text x={320} y={226} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">solid HF — one long zig-zag chain, H bond angle ≈ 134°</text>
    </svg>
  );
}

/* ————— 7.4 · the ethanoic acid dimer ————— */

export function FigDimer({ accent = "#FF6B6B" }: { accent?: string }) {
  const lab = (x: number, y: number, t: string, s = 13) => (
    <text x={x} y={y} textAnchor="middle" fontSize={s} fontWeight="800" fill={INK} fontFamily="var(--font-body)">{t}</text>
  );
  const bond = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
  );
  return (
    <svg viewBox="0 0 720 330" className="w-full" role="img" aria-label="Two ethanoic acid molecules face each other; two dashed hydrogen bonds run from each O-H hydrogen to the carbonyl oxygen of the other molecule, closing a ring">
      {/* left molecule: CH3 · C(=O) · O–H */}
      {lab(238, 96, "O")}
      <text x={238} y={62} textAnchor="middle" fontSize="11" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">··</text>
      <line x1={234} y1={106} x2={234} y2={134} stroke={INK} strokeWidth={2.6} />
      <line x1={244} y1={106} x2={244} y2={134} stroke={INK} strokeWidth={2.6} />
      {lab(238, 160, "C")}
      {bond(226, 170, 168, 208)}
      {lab(146, 224, "C")}
      {bond(146, 208, 110, 186)} {lab(102, 176, "H")}
      {bond(146, 240, 110, 262)} {lab(102, 278, "H")}
      {bond(146, 224, 182, 262)} {lab(192, 278, "H")}
      {bond(250, 168, 316, 202)}
      {lab(330, 212, "O")}
      <text x={348} y={196} fontSize="11" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">··</text>
      {bond(344, 220, 390, 244)}
      {lab(402, 254, "H")}

      {/* right molecule: mirrored */}
      {lab(482, 96, "O")}
      <text x={482} y={62} textAnchor="middle" fontSize="11" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">··</text>
      <line x1={478} y1={106} x2={478} y2={134} stroke={INK} strokeWidth={2.6} />
      <line x1={488} y1={106} x2={488} y2={134} stroke={INK} strokeWidth={2.6} />
      {lab(482, 160, "C")}
      {bond(494, 170, 552, 208)}
      {lab(574, 224, "C")}
      {bond(574, 208, 610, 186)} {lab(618, 176, "H")}
      {bond(574, 240, 610, 262)} {lab(618, 278, "H")}
      {bond(574, 224, 538, 262)} {lab(528, 278, "H")}
      {bond(470, 168, 404, 202)}
      {lab(390, 212, "O")}
      <text x={408} y={230} fontSize="11" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">··</text>
      {bond(376, 220, 330, 244)}
      {lab(318, 254, "H")}

      {/* the two hydrogen bonds: each O–H hydrogen to the other
          molecule's carbonyl oxygen — ring sides, never crossing */}
      {t7Hbond(398, 242, 474, 118, accent)}
      {t7Hbond(322, 242, 246, 118, accent)}
      <text x={360} y={54} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">two hydrogen bonds close the ring</text>
      <text x={360} y={306} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the (CH₃COOH)₂ dimer — held as one unit in the solvent</text>
    </svg>
  );
}

/* ————— 7.5 · more –OH groups, thicker pour ————— */

export function FigViscosity({ accent = "#FF6B6B" }: { accent?: string }) {
  const cards = [
    { name: "propan-1-ol", f: "CH₃CH₂CH₂OH", oh: 1 },
    { name: "propan-1,2-diol", f: "CH₃CH(OH)CH₂OH", oh: 2 },
    { name: "propan-1,2,3-triol", f: "CH₂(OH)CH(OH)CH₂OH", oh: 3 },
  ];
  return (
    <svg viewBox="0 0 880 240" className="w-full" role="img" aria-label="Propan-1-ol, propan-1,2-diol and propan-1,2,3-triol with an increasing viscosity arrow; each extra OH group adds hydrogen bonds">
      {cards.map((c, i) => {
        const x = 150 + i * 290;
        return (
          <g key={c.name}>
            <rect x={x - 132} y={26} width={264} height={124} rx={22} fill={tint(accent, 12)} stroke={tint(accent, 42)} strokeWidth={2} />
            <text x={x} y={56} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{c.name}</text>
            <text x={x} y={86} textAnchor="middle" fontSize="13" fontWeight="700" fill={SOFT} fontFamily="var(--font-mono)">{c.f}</text>
            {Array.from({ length: 3 }).map((_, d) => (
              <circle key={d} cx={x - 24 + d * 24} cy={116} r={7} fill={d < c.oh ? accent : "transparent"} stroke={d < c.oh ? accent : FAINT} strokeWidth={2} />
            ))}
          </g>
        );
      })}
      <line x1={120} y1={196} x2={760} y2={196} stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      <polygon points="760,196 746,189 746,203" fill={INK} />
      <text x={440} y={222} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">increasing viscosity — more hydrogen bonds per molecule</text>
    </svg>
  );
}

/* ————— 7.5 · boiling temperatures of the hydrides ————— */

export function FigHydrides({ accent = "#FF6B6B" }: { accent?: string }) {
  void accent;
  const w = 920;
  const h = 380;
  const pad = { l: 56, r: 24, t: 24, b: 44 };
  const px = (p: number) => pad.l + ((p - 1) / 4) * (w - pad.l - pad.r);
  const py = (v: number) => h - pad.b - ((v + 200) / 350) * (h - pad.t - pad.b);
  const groups: { pts: [number, number, string][]; hot?: boolean[] }[] = [
    { pts: [[2, -162, "CH₄"], [3, -112, "SiH₄"], [4, -88, "GeH₄"], [5, -52, "SnH₄"]] },
    { pts: [[2, -33, "NH₃"], [3, -88, "PH₃"], [4, -62, "AsH₃"], [5, -17, "SbH₃"]], hot: [true, false, false, false] },
    { pts: [[2, 100, "H₂O"], [3, -60, "H₂S"], [4, -41, "H₂Se"], [5, -2, "H₂Te"]], hot: [true, false, false, false] },
    { pts: [[2, 20, "HF"], [3, -85, "HCl"], [4, -67, "HBr"], [5, -35, "HI"]], hot: [true, false, false, false] },
  ];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Boiling temperature against period for the group 4, 5, 6 and 7 hydrides: water, ammonia and hydrogen fluoride sit far above the trend lines at period 2, then every series climbs steadily as the electron cloud grows">
      {/* gridlines + y ticks */}
      {[-200, -150, -100, -50, 0, 50, 100, 150].map((v) => (
        <g key={v}>
          <line x1={pad.l} y1={py(v)} x2={w - pad.r} y2={py(v)} stroke={FAINT} strokeWidth={1.2} strokeDasharray="3 7" />
          <text x={pad.l - 8} y={py(v) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {[1, 2, 3, 4, 5].map((p) => (
        <text key={p} x={px(p)} y={h - pad.b + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">{p}</text>
      ))}
      <text x={(w + pad.l) / 2} y={h - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Period</text>
      <text x={14} y={(h - pad.b + pad.t) / 2} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform={`rotate(-90 14 ${(h - pad.b + pad.t) / 2})`}>Boiling temperature (°C)</text>

      {groups.map((g, gi) => (
        <g key={gi}>
          <polyline
            points={g.pts.map(([p, v]) => `${px(p)},${py(v)}`).join(" ")}
            fill="none"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.75}
          />
          {g.pts.map(([p, v, name], i) => {
            const hot = g.hot?.[i];
            const dy = hot ? -12 : gi === 0 ? 20 : gi === 1 ? -14 : gi === 2 ? -14 : 20;
            const dx = gi === 1 ? 14 : gi === 3 ? -14 : 0;
            return (
              <g key={name}>
                {hot && <circle cx={px(p)} cy={py(v)} r={11} fill={tint(accent, 26)} stroke={accent} strokeWidth={2.4} />}
                <circle cx={px(p)} cy={py(v)} r={hot ? 5.5 : 4.5} fill={hot ? accent : INK} />
                <text
                  x={px(p) + dx}
                  y={py(v) + dy}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  fill={hot ? accent : SOFT}
                  fontFamily="var(--font-body)"
                >
                  {name}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x={px(2)} y={py(100) - 26} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">100 °C</text>
      <text x={px(2) + 26} y={py(20) - 14} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">20 °C</text>
      <text x={px(2) + 24} y={py(-33) + 26} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">−33 °C</text>
      <text x={px(4) + 10} y={py(-160) + 24} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">every series climbs as the electron cloud grows</text>
    </svg>
  );
}

/* ————— 7.3 · ice rings vs liquid water ————— */

export function FigIce({ accent = "#FF6B6B" }: { accent?: string }) {
  const ring = (cx: number, cy: number, r: number) => {
    const waters: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      waters.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return waters;
  };
  const hex = ring(200, 158, 74);
  return (
    <svg viewBox="0 0 760 350" className="w-full" role="img" aria-label="Ice: water molecules in open rings of six; liquid water: the same molecules packed closer with bonds constantly breaking and re-forming">
      {/* ice */}
      <circle cx={200} cy={158} r={122} fill={tint(accent, 88)} stroke={FAINT} strokeWidth={2} />
      {hex.map(([x, y], i) => {
        const [nx, ny] = hex[(i + 1) % 6];
        return <line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke={accent} strokeWidth={2.6} strokeDasharray="6 6" strokeLinecap="round" />;
      })}
      {hex.map(([x, y], i) => (
        <g key={`w${i}`}>
          {t7Water(x, y, i * 60 + 30, accent)}
        </g>
      ))}
      <text x={200} y={316} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Ice — hydrogen bonds are stable</text>

      {/* liquid */}
      <circle cx={560} cy={158} r={132} fill={tint(accent, 88)} stroke={FAINT} strokeWidth={2} />
      {([[490, 100], [560, 88], [630, 102], [476, 168], [546, 152], [620, 164], [498, 232], [574, 222], [638, 226], [544, 268]] as [number, number][]).map(([x, y], i) => (
        <g key={`l${i}`}>
          {i > 0 && i % 2 === 0 && t7Hbond(x - 14, y - 6, x - 46, y - 34, accent)}
          {t7Water(x, y, (i * 47) % 360, accent)}
        </g>
      ))}
      <text x={560} y={316} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Liquid water — bonds constantly break and re-form</text>
      <text x={200} y={46} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">rings of six — open space inside</text>
      <text x={560} y={46} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">rings collapse — molecules sit closer</text>
    </svg>
  );
}

/* ————— 7.6 · hydration of the ions ————— */

export function FigHydration({ accent = "#FF6B6B" }: { accent?: string }) {
  const ion = (x: number, y: number, positive: boolean, k: string) => (
    <g key={k}>
      <circle cx={x} cy={y} r={15} fill={positive ? tint("#F59F00", 30) : tint("#9775FA", 30)} stroke={INK} strokeWidth={2.2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{positive ? "+" : "−"}</text>
    </g>
  );
  const miniWater = (x: number, y: number, rot: number, accent2: string) => (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <circle cx={x} cy={y} r={10.5} fill={tint(accent2, 24)} stroke={INK} strokeWidth={1.8} />
      <circle cx={x - 9} cy={y + 11} r={5} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={x + 9} cy={y + 11} r={5} fill={PAPER} stroke={INK} strokeWidth={1.5} />
    </g>
  );
  return (
    <svg viewBox="0 0 760 390" className="w-full" role="img" aria-label="Sodium chloride lattice at the top; below, the separated ions each surrounded by water molecules — oxygen delta minus facing the sodium, hydrogens delta plus facing the chloride">
      {/* the lattice */}
      {([[330, 60], [386, 60], [442, 60], [330, 116], [386, 116], [442, 116], [330, 172], [386, 172], [442, 172]] as [number, number][]).map(([x, y], i) => (
        ion(x, y, (Math.floor(i / 3) + i) % 2 === 0, `lat${i}`)
      ))}
      <text x={386} y={214} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the lattice — held by strong electrostatic attraction</text>

      {t3Arrow(330, 208, 240, 262, FAINT, 3)}
      {t3Arrow(442, 208, 530, 262, FAINT, 3)}

      {/* Na+ hydrated: O faces the ion */}
      {ion(240, 320, true, "na")}
      {([[0, -40], [34, -20], [34, 20], [0, 40], [-34, 20], [-34, -20]] as [number, number][]).map(([dx, dy], i) => (
        <g key={`nw${i}`}>{miniWater(240 + dx, 320 + dy, Math.atan2(-dy, -dx) * (180 / Math.PI) + 90, accent)}</g>
      ))}
      <text x={240} y={382} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Na⁺ — Oδ− turns toward it</text>

      {/* Cl− hydrated: H faces the ion */}
      {ion(530, 320, false, "cl")}
      {([[0, -40], [34, -20], [34, 20], [0, 40], [-34, 20], [-34, -20]] as [number, number][]).map(([dx, dy], i) => (
        <g key={`cw${i}`}>{miniWater(530 + dx, 320 + dy, Math.atan2(dy, dx) * (180 / Math.PI) - 90, accent)}</g>
      ))}
      <text x={530} y={382} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Cl⁻ — Hδ+ turns toward it</text>
    </svg>
  );
}

/* ————— 7.6 · ethanol meets water ————— */

export function FigEthanolWater({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 700 240" className="w-full" role="img" aria-label="Ethanol and water: a dashed hydrogen bond from the ethanol oxygen lone pair to a water hydrogen, labelled hydrogen bond and lone pair">
      <text x={90} y={128} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">CH₃CH₂</text>
      <text x={218} y={132} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Oδ−</text>
      <circle cx={244} cy={112} r={2.4} fill={INK} />
      <circle cx={251} cy={105} r={2.4} fill={INK} />
      <line x1={150} y1={122} x2={192} y2={126} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={244} y1={124} x2={286} y2={120} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <text x={296} y={126} fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Hδ+</text>
      {t7Hbond(330, 120, 418, 120, accent)}
      <text x={374} y={102} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">hydrogen bond</text>
      <text x={452} y={126} fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Hδ+</text>
      <line x1={486} y1={122} x2={528} y2={126} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <text x={556} y={132} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Oδ−</text>
      <line x1={586} y1={124} x2={628} y2={120} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <text x={638} y={126} fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Hδ+</text>
      <text x={252} y={186} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">lone pair</text>
      <line x1={258} y1={168} x2={248} y2={140} stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <text x={180} y={62} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">ethanol</text>
      <text x={556} y={62} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">water</text>
    </svg>
  );
}

/* ————— 7.6 · the non-polar share grows ————— */

export function FigSolubility({ accent = "#FF6B6B" }: { accent?: string }) {
  const cards = [
    { name: "methanol", f: "CH₃OH", c: 1, note: "very soluble in water" },
    { name: "butanol", f: "CH₃(CH₂)₃OH", c: 4, note: "slightly soluble in water" },
    { name: "octanol", f: "CH₃(CH₂)₇OH", c: 8, note: "very insoluble in water" },
  ];
  return (
    <svg viewBox="0 0 920 300" className="w-full" role="img" aria-label="Methanol, butanol and octanol with the non-polar hydrocarbon share growing: solubility falls as the chain lengthens">
      {cards.map((c, i) => {
        const x = 160 + i * 300;
        return (
          <g key={c.name}>
            <rect x={x - 138} y={30} width={276} height={188} rx={24} fill={tint(accent, 10)} stroke={tint(accent, 40)} strokeWidth={2} />
            <text x={x} y={62} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{c.name}</text>
            <text x={x} y={92} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-mono)">{c.f}</text>
            {/* the chain of carbons vs the OH */}
            {Array.from({ length: c.c }).map((_, d) => (
              <circle key={d} cx={x - c.c * 13 + 6 + d * 26} cy={128} r={9} fill={FAINT} stroke={INK} strokeWidth={1.8} />
            ))}
            <text x={x + c.c * 13 + 4} y={134} fontSize="13" fontWeight="800" fill={accent} fontFamily="var(--font-body)">OH</text>
            {c.c > 1 && (
              <>
                <path d={`M ${x - c.c * 13} 150 Q ${x} 168 ${x + c.c * 13 - 6} 150`} fill="none" stroke={INK} strokeWidth={1.8} />
                <text x={x} y={188} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">Non-polar</text>
              </>
            )}
            <text x={x} y={238} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{c.note}</text>
          </g>
        );
      })}
      <line x1={90} y1={272} x2={830} y2={272} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <polygon points="830,272 816,265 816,279" fill={INK} />
      <text x={460} y={292} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">solubility in water falls as the non-polar share grows</text>
    </svg>
  );
}

/* ————— 7.6 · two layers vs complete mixing ————— */

export function FigMixing({ accent = "#FF6B6B" }: { accent?: string }) {
  const blob = (x: number, y: number, dark: boolean, k: string) => (
    <ellipse key={k} cx={x} cy={y} rx={13} ry={8.5} fill={dark ? FAINT : "transparent"} stroke={dark ? INK : SOFT} strokeWidth={1.8} />
  );
  return (
    <svg viewBox="0 0 920 340" className="w-full" role="img" aria-label="A beaker of vegetable oil over water in two layers; beside it hexane and octane molecules mixing completely">
      {/* water + oil layers */}
      <g>
        <path d="M 120 84 L 120 288 Q 120 306 138 306 L 274 306 Q 292 306 292 288 L 292 84" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <rect x={124} y={104} width={164} height={70} rx={6} fill="rgb(245 159 0 / 0.30)" />
        <rect x={124} y={178} width={164} height={122} rx={6} fill="rgb(18 184 134 / 0.22)" />
        <line x1={124} y1={174} x2={288} y2={174} stroke={SOFT} strokeWidth={2} strokeDasharray="5 5" />
        <text x={306} y={136} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">oil layer</text>
        <text x={306} y={156} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">non-polar — no H-bonds to offer</text>
        <text x={306} y={210} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">water layer</text>
        <text x={306} y={230} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">hydrogen bonds hold it together</text>
        <text x={206} y={70} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">two immiscible layers</text>
      </g>

      {/* hexane + octane mix */}
      <g>
        <rect x={560} y={84} width={300} height={222} rx={24} fill={tint(accent, 88)} stroke={FAINT} strokeWidth={2} />
        {([[600, 130, 0], [668, 112, 1], [738, 128, 0], [806, 116, 1], [588, 186, 1], [658, 172, 0], [730, 190, 1], [800, 180, 0], [620, 244, 0], [692, 234, 1], [762, 250, 0], [822, 240, 1]] as [number, number, number][]).map(([x, y, d], i) => (
          blob(x, y, d === 1, `m${i}`)
        ))}
        {([[600, 130, 668, 112], [668, 112, 738, 128], [658, 172, 730, 190], [620, 244, 692, 234], [692, 234, 762, 250], [588, 186, 658, 172]] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={`lk${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth={2} strokeDasharray="5 6" strokeLinecap="round" />
        ))}
        <text x={710} y={70} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">hexane and octane — one uniform mix</text>
        <text x={710} y={330} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">weak London forces throughout — so they mix completely</text>
      </g>
    </svg>
  );
}
