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
  const w = 760;
  const h = 320;
  const pad = { l: 58, r: 16, t: 24, b: 46 };
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const yMax = 2500;
  const X = (i: number) => pad.l + (i / (IE_VALUES.length - 1)) * plotW;
  const Y = (v: number) => h - pad.b - (v / yMax) * plotH;
  const pts = IE_VALUES.map(([, v], i) => `${X(i)},${Y(v as number)}`).join(" ");
  const nobles = new Set([1, 9, 17]);
  const group1 = new Set([2, 10, 18]);
  const dips = new Set([4, 7, 12, 15]); // B, O, Al, S

  return (
    <ChartFrame w={w} h={h} xLabel="atomic number (Z)" yLabel="1st IE / kJ mol⁻¹">
      {[0, 500, 1000, 1500, 2000, 2500].map((t) => (
        <g key={t}>
          <line x1={pad.l - 6} y1={Y(t)} x2={pad.l} y2={Y(t)} stroke={INK} strokeWidth="2" />
          <text x={pad.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
            {t}
          </text>
        </g>
      ))}
      <polyline points={pts} fill="none" stroke="#FF6B6B" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      {IE_VALUES.map(([sym, v], i) => (
        <g key={sym}>
          <circle cx={X(i)} cy={Y(v as number)} r={nobles.has(i) ? 7 : 5} fill={nobles.has(i) ? "#12B886" : group1.has(i) ? "#FF6B6B" : dips.has(i) ? "#9775FA" : INK} />
          <text x={X(i)} y={h - pad.b + 20} textAnchor="middle" fontSize="10" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {sym}
          </text>
          <text x={X(i)} y={h - pad.b + 33} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
            {i + 1}
          </text>
        </g>
      ))}
      <text x={X(1)} y={Y(2370) - 14} textAnchor="middle" fontSize="11" fontWeight="800" fill="#12B886" fontFamily="var(--font-body)">
        noble-gas peaks
      </text>
      <text x={X(18)} y={Y(418) - 16} textAnchor="middle" fontSize="11" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">
        Group 1 cliffs
      </text>
    </ChartFrame>
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
