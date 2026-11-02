"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "./icons";
import { tint, shade } from "./bits";

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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Filling order energy ladder">
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
        numbering left to right gives 2,3 — from the other end it would be 4,5, so the lowest set wins
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
      <text x={600} y={96} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">boiling point climbs as chain length grows,</text>
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
        any two radicals collide and pair up — the chain stops. The trace of ethane (C₂H₆) is the giveaway
      </text>
      <text x={236} y={432} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        that two •CH₃ found each other, and the examiner's favourite explanation.
      </text>

      {stage(466, "OVERALL", PAPER)}
      <text x={236} y={471} fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-mono)">CH₄ + Cl₂ → CH₃Cl + HCl   —   but it rarely stops there</text>
    </svg>
  );
}
