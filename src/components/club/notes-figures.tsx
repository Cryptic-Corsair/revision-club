"use client";

import { useState, type ReactNode } from "react";
import { m } from "framer-motion";
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
              <m.div
                layout
                className="grid h-16 w-16 place-items-center rounded-[18px] bg-paper font-display text-[30px] font-bold"
                style={{ boxShadow: "inset 0 0 0 3px color-mix(in oklab, var(--color-ink) 10%, transparent), 0 4px 0 color-mix(in oklab, var(--color-ink) 7%, transparent)" }}
                animate={up && down ? { rotate: [0, -3, 3, 0] } : {}}
              >
                {up && <span className="text-[26px]" style={{ color: shade(accent) }}>↑</span>}
                {up && down && <span className="ml-0.5 text-[26px]" style={{ color: "#12B886" }}>↓</span>}
              </m.div>
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
            <m.button
              type="button"
              onClick={() => setCount((c) => Math.min(6, c + 1))}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-display text-[14px] font-semibold text-white"
              style={{ background: accent, boxShadow: `0 4px 0 ${shade(accent)}` }}
            >
              +1 electron
            </m.button>
          ) : (
            <m.button
              type="button"
              onClick={() => setCount(0)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-ink/5 px-5 py-2.5 font-display text-[14px] font-semibold text-ink-soft"
            >
              <RotateCcw className="h-4 w-4" /> Empty the sub-shell
            </m.button>
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
  /* a plain draw helper, called directly — creating it as a
     component would remount the whole figure on every render */
  const molecule = (x: number, y: number, shift: number) => (
    <g>
      <circle cx={x} cy={y} r={34} fill={shell} stroke={INK} strokeWidth={2.4} />
      <ellipse cx={x + shift} cy={y} rx={20} ry={27} fill={cloud} opacity={0.85} />
    </g>
  );
  return (
    <svg viewBox="0 0 780 300" className="w-full" role="img" aria-label="An instantaneous dipole in one molecule inducing the opposite dipole in its neighbour; the two attract">
      {/* pair one — the teaching pair */}
      {molecule(150, 104, -11)}
      {molecule(330, 104, 11)}
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
      {molecule(520, 104, -11)}
      {molecule(700, 104, 11)}
      <line x1={622} y1={104} x2={598} y2={104} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={598} y1={104} x2={606} y2={97} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={598} y1={104} x2={606} y2={111} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <text x={482} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={558} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>
      <text x={666} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ−</text>
      <text x={738} y={62} fontSize="13" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">δ+</text>

      {/* the flicker: same pair a moment later */}
      {molecule(240, 248, 11)}
      {molecule(420, 248, -11)}
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

/* ————— 8.5 · electron transfer, zinc and copper(II) ————— */

export function FigETransfer({ accent = "#FF6B6B" }: { accent?: string }) {
  const COPPER_BLUE = "#4a90d9"; // the Cu²⁺(aq) tint of copper(II) sulfate
  const COPPER_METAL = "#c9834e";
  const GREY = "color-mix(in oklab, var(--color-ink) 34%, var(--tint-base))";
  const ZN_DOT = "color-mix(in oklab, var(--color-ink) 22%, transparent)";

  /* one open beaker: walls, rim ticks, solution, surface line */
  const beaker = (bx: number, solution: string) => (
    <g>
      <path
        d={`M ${bx - 122} 104 L ${bx - 122} 228 Q ${bx - 122} 248 ${bx - 102} 248 L ${bx + 102} 248 Q ${bx + 122} 248 ${bx + 122} 228 L ${bx + 122} 104 Z`}
        fill={solution}
      />
      <line x1={bx - 122} y1={104} x2={bx + 122} y2={104} stroke={FAINT} strokeWidth={1.8} />
      <path
        d={`M ${bx - 122} 72 L ${bx - 122} 228 Q ${bx - 122} 248 ${bx - 102} 248 L ${bx + 102} 248 Q ${bx + 122} 248 ${bx + 122} 228 L ${bx + 122} 72`}
        fill="none"
        stroke={INK}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <line x1={bx - 134} y1={72} x2={bx - 122} y2={72} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={bx + 122} y1={72} x2={bx + 134} y2={72} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
    </g>
  );

  return (
    <svg viewBox="0 0 920 400" className="w-full" role="img" aria-label="Two beakers side by side: a zinc rod in the left beaker dissolves to zinc(II) ions, giving up two electrons, which travel across to the right beaker where copper(II) ions in blue solution take them up and deposit as copper metal">
      {/* the electron crossing — dashed guide with two electrons on it */}
      <path d="M 250 50 Q 460 22 628 50" fill="none" stroke={accent} strokeWidth={3.2} strokeLinecap="round" strokeDasharray="9 8" />
      <polygon points="648,50 626,41 630,59" fill={accent} />
      <circle cx={372} cy={38} r={10} fill={accent} />
      <text x={372} y={41.5} textAnchor="middle" fontSize="10" fontWeight="800" fill={readableInk(accent)} fontFamily="var(--font-body)">e⁻</text>
      <circle cx={523} cy={38} r={10} fill={accent} />
      <text x={523} y={41.5} textAnchor="middle" fontSize="10" fontWeight="800" fill={readableInk(accent)} fontFamily="var(--font-body)">e⁻</text>
      <text x={460} y={16} textAnchor="middle" fontSize="15" fontWeight="800" fill={accent} fontFamily="var(--font-body)">2e⁻</text>

      {/* zinc half — the rod goes greyer as Zn²⁺ drifts into a colourless solution */}
      {beaker(225, tint(accent, 7))}
      <rect x={208} y={46} width={34} height={168} rx={6} fill={GREY} stroke={INK} strokeWidth={2.4} />
      <text x={225} y={38} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Zn(s)</text>
      <circle cx={270} cy={148} r={5.5} fill={ZN_DOT} />
      <circle cx={318} cy={192} r={5.5} fill={ZN_DOT} />
      <text x={296} y={172} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Zn²⁺(aq)</text>
      <text x={225} y={282} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Zn(s) → Zn²⁺(aq) + 2e⁻</text>
      <rect x={120} y={300} width={210} height={28} rx={14} fill={tint(accent, 15)} />
      <text x={225} y={319} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">oxidation — Zn: 0 → +2</text>

      {/* copper half — blue Cu²⁺ solution, copper plating onto the rod */}
      {beaker(695, tint(COPPER_BLUE, 16))}
      <rect x={678} y={46} width={34} height={168} rx={6} fill={COPPER_METAL} stroke={shade(COPPER_METAL, 62)} strokeWidth={2.4} />
      <text x={695} y={38} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Cu(s)</text>
      <circle cx={600} cy={142} r={6.5} fill={COPPER_BLUE} />
      <circle cx={648} cy={196} r={6.5} fill={COPPER_BLUE} />
      <circle cx={757} cy={148} r={6.5} fill={COPPER_BLUE} />
      <circle cx={742} cy={204} r={6.5} fill={COPPER_BLUE} />
      <text x={625} y={172} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Cu²⁺(aq)</text>
      <text x={695} y={282} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Cu²⁺(aq) + 2e⁻ → Cu(s)</text>
      <rect x={590} y={300} width={210} height={28} rx={14} fill={tint("var(--color-ink)", 8)} />
      <text x={695} y={319} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">reduction — Cu: +2 → 0</text>

      {/* the two halves added together */}
      <rect x={230} y={348} width={460} height={42} rx={21} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={375} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)</text>
    </svg>
  );
}

/* ————— 8.6 · oxidising and reducing agents, chlorine displacing bromine ————— */

export function FigAgents({ accent = "#FF6B6B" }: { accent?: string }) {
  /* the equation, one species at a time, so the number chips sit true */
  const eq = [
    { t: "Cl₂", x: 277 },
    { t: "+", x: 333 },
    { t: "2KBr", x: 399 },
    { t: "→", x: 465 },
    { t: "2KCl", x: 531 },
    { t: "+", x: 587 },
    { t: "Br₂", x: 643 },
  ];
  /* oxidation-number chips under the species that change + arrows */
  const chip = (x: number, label: string) => (
    <g>
      <rect x={x - 20} y={76} width={40} height={26} rx={13} fill={tint(accent, 26)} stroke={FAINT} strokeWidth={1.8} />
      <text x={x} y={94} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const triUp = (x: number, y: number) => <polygon points={`${x},${y + 5} ${x + 9},${y + 5} ${x + 4.5},${y - 4}`} fill={accent} />;
  const triDown = (x: number, y: number) => <polygon points={`${x},${y - 5} ${x + 9},${y - 5} ${x + 4.5},${y + 4}`} fill={INK} />;
  return (
    <svg viewBox="0 0 920 348" className="w-full" role="img" aria-label="Chlorine oxidises bromide ions: chlorine is reduced from oxidation number 0 to minus 1 and is the oxidising agent, bromide is oxidised from minus 1 to 0 and is the reducing agent, and the two electrons pass from the bromide to the chlorine">
      {/* the equation with its oxidation-number row */}
      {eq.map((s) => (
        <text key={s.t + s.x} x={s.x} y={58} textAnchor="middle" fontSize="18" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{s.t}</text>
      ))}
      {chip(277, "0")}
      {chip(410, "−1")}
      {chip(542, "−1")}
      {chip(643, "0")}
      {triDown(301, 89)}
      {triUp(434, 89)}
      <text x={460} y={126} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">K⁺ stays +1 on both sides — a spectator ion, unchanged</text>

      {/* the handover — electrons cross from the donor to the acceptor */}
      <path d="M 508 210 Q 460 176 412 206" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeDasharray="9 8" />
      <polygon points="398,206 419,197 417,215" fill={accent} />
      <text x={460} y="182" textAnchor="middle" fontSize="14" fontWeight="800" fill={accent} fontFamily="var(--font-body)">2e⁻</text>
      <text x={460} y="240" textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">handed across</text>

      {/* left card — the species that accepts them */}
      <rect x={56} y={146} width={348} height={126} rx={24} fill={tint(accent, 16)} stroke={FAINT} strokeWidth={2} />
      <text x={230} y={178} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Cl₂ — the oxidising agent</text>
      <rect x={141} y={192} width={178} height={24} rx={12} fill={tint(accent, 26)} />
      <text x={230} y={209} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">electron acceptor · gains 2e⁻</text>
      <text x={230} y={238} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Cl: 0 → −1 — a decrease, reduced</text>
      <text x={230} y={260} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">so it oxidizes the KBr</text>

      {/* right card — the species that donates them */}
      <rect x={516} y={146} width={348} height={126} rx={24} fill={tint("var(--color-ink)", 7)} stroke={FAINT} strokeWidth={2} />
      <text x={690} y={178} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Br⁻ in KBr — the reducing agent</text>
      <rect x={591} y={192} width={198} height={24} rx={12} fill={tint("var(--color-ink)", 12)} />
      <text x={690} y={209} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">electron donor · loses 2e⁻</text>
      <text x={690} y={238} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Br: −1 → 0 — an increase, oxidized</text>
      <text x={690} y={260} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">so it reduces the Cl₂</text>

      {/* bottom rule */}
      <text x={460} y={318} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the oxidising agent is reduced · the reducing agent is oxidized — at the same time</text>
    </svg>
  );
}

/* ————— 8.7 · disproportionation — chlorine in sodium hydroxide ————— */

export function FigDisprop({ accent = "#FF6B6B" }: { accent?: string }) {
  const AX = 280; // the vertical oxidation-number axis
  const RUNG = { "+1": 146, "0": 214, "−1": 282 };
  const chip = (x: number, y: number, w: number, label: string, fill: string) => (
    <g>
      <rect x={x - w / 2} y={y - 20} width={w} height={40} rx={20} fill={fill} stroke={INK} strokeWidth={2.2} />
      <text x={x} y={y + 6} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 920 400" className="w-full" role="img" aria-label="Chlorine gas in aqueous sodium hydroxide, drawn on a vertical oxidation-number ladder: chlorine starts at zero, one atom climbs the axis to plus one in chlorate(I), oxidation, while the other falls to minus one in chloride, reduction — in the same reaction">
      {/* the equation */}
      <text x={460} y={54} textAnchor="middle" fontSize="17" fontWeight="800" fill={INK} fontFamily="var(--font-body)">2NaOH + Cl₂ → NaOCl + NaCl + H₂O</text>

      {/* the ladder — up the axis is oxidation, down is reduction */}
      <line x1={AX} y1={330} x2={AX} y2={102} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <polygon points={`${AX},88 ${AX - 8},106 ${AX + 8},106`} fill={INK} />
      <text x={250} y={216} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)" transform={`rotate(-90 250 216)`}>oxidation number</text>
      {(["+1", "0", "−1"] as const).map((n) => (
        <g key={n}>
          <line x1={AX - 9} y1={RUNG[n]} x2={AX + 9} y2={RUNG[n]} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
          <text x={AX - 18} y={RUNG[n] + 4.5} textAnchor="end" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{n}</text>
        </g>
      ))}
      {/* rung guides out to the products */}
      <line x1={AX + 12} y1={RUNG["+1"]} x2={566} y2={RUNG["+1"]} stroke={FAINT} strokeWidth={1.8} strokeDasharray="2 7" />
      <line x1={AX + 12} y1={RUNG["−1"]} x2={566} y2={RUNG["−1"]} stroke={FAINT} strokeWidth={1.8} strokeDasharray="2 7" />

      {/* the chlorine — one species at 0, two fates */}
      {chip(AX, RUNG["0"], 96, "Cl₂", tint(accent, 22))}

      {/* oxidation branch — the climb */}
      <path d="M 332 202 C 420 168 500 150 577 148" fill="none" stroke={accent} strokeWidth={3.2} strokeLinecap="round" />
      <polygon points="593,146 571,138 573,156" fill={accent} />
      <text x={452} y={134} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">oxidation · 0 → +1</text>
      {chip(664, RUNG["+1"], 132, "NaOCl", tint(accent, 24))}
      <text x={664} y={184} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">chlorate(I) — the chlorine climbed</text>

      {/* reduction branch — the fall */}
      <path d="M 332 226 C 420 262 500 280 577 282" fill="none" stroke={INK} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="8 7" />
      <polygon points="593,284 571,276 573,294" fill={INK} />
      <text x={452} y={246} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">reduction · 0 → −1</text>
      {chip(664, RUNG["−1"], 132, "NaCl", tint("var(--color-ink)", 9))}
      <text x={664} y={320} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">chloride — the chlorine fell</text>

      {/* the rest of the equation rides along */}
      <text x={845} y={208} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Na⁺, H and O</text>
      <text x={845} y={224} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">keep their numbers</text>

      {/* bottom line */}
      <rect x={185} y={344} width={550} height={42} rx={21} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={371} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the same element is oxidized and reduced simultaneously</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8B · the elements of Groups 1 and 2
   ═══════════════════════════════════════════════════════════════ */

/* ————— 8.11 · why ionisation energy falls down group 1 ————— */

export function FigIeDownGroup({ accent = "#FF6B6B" }: { accent?: string }) {
  const atoms = [
    { x: 170, el: "Li", z: "+3", shells: [30, 54], ie: "519" },
    { x: 460, el: "Na", z: "+11", shells: [26, 48, 74], ie: "494" },
    { x: 750, el: "K", z: "+19", shells: [21, 42, 64, 92], ie: "418" },
  ];
  return (
    <svg viewBox="0 0 920 400" className="w-full" role="img" aria-label="Three group 1 atoms, lithium, sodium and potassium, each with one outer s-electron: the atoms stack on more shells down the group, the outer electron sits further from the nucleus behind more shielding, and the first ionisation energy falls from 519 to 494 to 418 kilojoules per mole">
      <text x={460} y={34} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">group 1 — the same one outer s-electron, behind more and more shells</text>

      {atoms.map((a) => (
        <g key={a.el}>
          {a.shells.map((r, i) => (
            <circle key={r} cx={a.x} cy={180} r={r} fill="none" stroke={i === a.shells.length - 1 ? SOFT : FAINT} strokeWidth={i === a.shells.length - 1 ? 2.2 : 1.6} />
          ))}
          <circle cx={a.x} cy={180} r={17} fill={tint(accent, 24)} />
          <text x={a.x} y={184.5} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{a.z}</text>
          {/* the single outer electron, further out at every step */}
          <circle cx={a.x} cy={180 - a.shells[a.shells.length - 1]} r={7} fill={accent} />
          <text x={a.x + 12} y={180 - a.shells[a.shells.length - 1] - 10} fontSize="11.5" fontWeight="700" fill={accent} fontFamily="var(--font-body)">1 outer s-electron</text>
          <text x={a.x} y={316} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{a.el}</text>
        </g>
      ))}

      {/* the falling first IE */}
      <text x={460} y={342} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">1st ionisation energy / kJ mol⁻¹</text>
      {atoms.map((a, i) => (
        <g key={a.ie}>
          <rect x={a.x - 62} y={350} width={124} height={32} rx={16} fill={tint(accent, 10 + i * 6)} />
          <text x={a.x} y={371} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{a.ie}</text>
        </g>
      ))}
      <path d="M 240 366 L 390 366 M 530 366 L 680 366" fill="none" stroke={accent} strokeWidth={2.6} strokeLinecap="round" strokeDasharray="7 7" opacity={0.55} />
      <polygon points="700,366 679,358 681,374" fill={accent} opacity={0.55} />
      <text x={460} y={396} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">radius ↑ · shielding ↑ · attraction on the outer electron ↓ — so the reactivity ↑</text>
    </svg>
  );
}

/* ————— 8.15 · the two Group 2 solubility ladders ————— */

export function FigG2Solubility({ accent = "#FF6B6B" }: { accent?: string }) {
  const rows = [
    { f: "Be", oh: "insoluble", ohW: 12, su: "very soluble", suW: 170 },
    { f: "Mg", oh: "sparingly soluble", ohW: 48, su: "quite soluble", suW: 132 },
    { f: "Ca", oh: "slightly soluble", ohW: 86, su: "slightly soluble", suW: 86 },
    { f: "Sr", oh: "quite soluble", ohW: 132, su: "sparingly soluble", suW: 48 },
    { f: "Ba", oh: "very soluble", ohW: 170, su: "insoluble", suW: 12 },
  ];
  const panel = (px: number, title: string, sub: string, key: "oh" | "su", wKey: "ohW" | "suW") => (
    <g>
      <text x={px + 210} y={44} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{title}</text>
      <text x={px + 210} y={64} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{sub}</text>
      {rows.map((r, i) => (
        <g key={r.f}>
          <text x={px + 48} y={104 + i * 42} textAnchor="end" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{key === "oh" ? `${r.f}(OH)₂` : `${r.f}SO₄`}</text>
          <rect x={px + 56} y={90 + i * 42} width={r[wKey]} height={20} rx={10} fill={tint(accent, 14 + i * 9)} />
          <text x={px + 56 + r[wKey] + 10} y={105 + i * 42} fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{r[key]}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 920 360" className="w-full" role="img" aria-label="Two bar ladders: the solubility of group 2 hydroxides grows from insoluble beryllium hydroxide to very soluble barium hydroxide, while the solubility of group 2 sulfates shrinks from very soluble beryllium sulfate to insoluble barium sulfate">
      {panel(20, "hydroxides", "solubility increases down the group", "oh", "ohW")}
      <line x1={460} y1={40} x2={460} y2={310} stroke={FAINT} strokeWidth={1.6} strokeDasharray="2 8" />
      {panel(480, "sulfates", "solubility decreases down the group", "su", "suW")}
      <rect x={150} y={318} width={620} height={34} rx={17} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={340} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the ladders run opposite ways — and BaSO₄'s insolubility is the sulfate test</text>
    </svg>
  );
}

/* ————— 8.16 · polarising power — the cation grips the anion ————— */

export function FigPolarise({ accent = "#FF6B6B" }: { accent?: string }) {
  const anion = (cx: number, squashed: boolean) => (
    <g>
      <ellipse cx={cx} cy={168} rx={squashed ? 84 : 92} ry={squashed ? 56 : 68} fill={tint(accent, 8)} stroke={INK} strokeWidth={2.4} />
      <text x={cx} y={175} textAnchor="middle" fontSize="16" fontWeight="800" fill={INK} fontFamily="var(--font-body)">CO₃²⁻</text>
      {/* the C–O bonds inside the anion */}
      <line x1={cx - 26} y1={122} x2={cx - 52} y2={96} stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={cx + 26} y1={122} x2={cx + 52} y2={96} stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={cx - 58} cy={90} r={7.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={cx + 58} cy={90} r={7.5} fill={PAPER} stroke={INK} strokeWidth={2} />
      <text x={cx - 58} y={94} textAnchor="middle" fontSize="10" fontWeight="800" fill={INK} fontFamily="var(--font-body)">O</text>
      <text x={cx + 58} y={94} textAnchor="middle" fontSize="10" fontWeight="800" fill={INK} fontFamily="var(--font-body)">O</text>
    </g>
  );
  return (
    <svg viewBox="0 0 920 400" className="w-full" role="img" aria-label="Two panels: a small highly charged magnesium two-plus cation pulls hard on the carbonate anion, distorting it and weakening its carbon-oxygen bonds so the compound decomposes easily, while a large lowly charged barium two-plus cation barely grips the anion, which survives heating">
      <text x={460} y={34} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">how hard the cation grips the anion decides how easily it decomposes</text>

      {/* small, hungry cation */}
      {anion(330, true)}
      <circle cx={140} cy={168} r={32} fill={accent} />
      <text x={140} y={173.5} textAnchor="middle" fontSize="14" fontWeight="800" fill={readableInk(accent)} fontFamily="var(--font-body)">Mg²⁺</text>
      <text x={140} y={222} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">small · high charge</text>
      <path d="M 178 152 Q 214 130 240 122" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" />
      <polygon points="252,118 231,113 234,131" fill={accent} />
      <path d="M 184 190 Q 216 206 238 212" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" />
      <polygon points="250,215 232,202 229,219" fill={accent} />
      <text x={200} y={74} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">pulls the electron cloud</text>
      <rect x={80} y={288} width={320} height={44} rx={22} fill={tint(accent, 16)} />
      <text x={240} y={305} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">C–O bonds weaken — the anion gives way</text>
      <text x={240} y={323} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">decomposes easily → XO + CO₂</text>

      {/* large, gentle cation */}
      {anion(768, false)}
      <circle cx={548} cy={168} r={44} fill={tint("var(--color-ink)", 14)} />
      <text x={548} y={173.5} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Ba²⁺</text>
      <text x={548} y={234} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">large · low charge density</text>
      <rect x={548} y={288} width={330} height={44} rx={22} fill={tint("var(--color-ink)", 7)} />
      <text x={713} y={305} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the anion keeps its shape</text>
      <text x={713} y={323} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">more energy needed to break it — stable to heat</text>

      <rect x={205} y={352} width={510} height={36} rx={18} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={375} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">small + high charge → high polarizing power → less thermally stable</text>
    </svg>
  );
}

/* ————— 8.17 · excitation and the fall back that makes the colour ————— */

export function FigFlameEtc({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 920 380" className="w-full" role="img" aria-label="An energy level diagram: heat excites the electron up to a higher energy level, the excited electron is unstable and falls back to the ground state, emitting light whose frequency and colour are fixed by the energy gap between the two shells">
      {/* energy axis */}
      <line x1={64} y1={330} x2={64} y2={66} stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      <polygon points="64,54 56,72 72,72" fill={INK} />
      <text x={46} y={198} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 46 198)">energy</text>

      {/* the levels */}
      <line x1={110} y1={110} x2={400} y2={110} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={408} y={114} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">higher energy level</text>
      <line x1={110} y1={330} x2={400} y2={330} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={408} y={334} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">ground state</text>

      {/* up — excitation */}
      <circle cx={170} cy={330} r={9} fill={accent} />
      <path d="M 186 318 Q 232 220 178 126" fill="none" stroke={accent} strokeWidth={3.2} strokeLinecap="round" />
      <polygon points="174,110 165,132 184,128" fill={accent} />
      <text x={318} y={210} fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">excitation —</text>
      <text x={318} y={228} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">heat gives the electron</text>
      <text x={318} y={244} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">energy to climb</text>

      {/* down — the fall back */}
      <circle cx={330} cy={110} r={9} fill={tint(accent, 30)} stroke={accent} strokeWidth={2} strokeDasharray="3 3" />
      <text x={330} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">unstable up here</text>
      <path d="M 318 122 Q 276 226 322 316" fill="none" stroke={INK} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="8 7" />
      <polygon points="326,332 312,312 332,310" fill={INK} />
      <text x={252} y={290} textAnchor="end" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">falls back,</text>
      <text x={252} y={306} textAnchor="end" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">giving out light</text>

      {/* the photon */}
      <polyline points="420,220 464,196 488,244 536,196 560,244 608,196 632,244 668,224" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="684,220 660,212 664,234" fill={accent} />
      <text x={545} y={176} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">light of a characteristic frequency</text>
      <text x={545} y={272} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">its energy = the gap between the two shells</text>

      <rect x={640} y={310} width={244} height={40} rx={20} fill={tint(accent, 16)} />
      <text x={762} y={335} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">that light is the flame's colour</text>
    </svg>
  );
}

/* ————— 8.18(ii) · the flame colours to know ————— */

const FLAME_COLOURS: { ion: string; grp: string; word: string; hex: string | null }[] = [
  { ion: "Li⁺", grp: "Group 1", word: "crimson", hex: "#C2255C" },
  { ion: "Na⁺", grp: "Group 1", word: "golden yellow", hex: "#F59F00" },
  { ion: "K⁺", grp: "Group 1", word: "lilac", hex: "#B78FD6" },
  { ion: "Mg²⁺", grp: "Group 2", word: "no colour", hex: null },
  { ion: "Ca²⁺", grp: "Group 2", word: "brick red", hex: "#B04A2F" },
  { ion: "Sr²⁺", grp: "Group 2", word: "crimson red", hex: "#E03131" },
  { ion: "Ba²⁺", grp: "Group 2", word: "apple green", hex: "#74B816" },
];

export function FigFlameColours({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 920 320" className="w-full" role="img" aria-label="Seven cards showing the flame colours of the group 1 and 2 cations: lithium crimson, sodium golden yellow, potassium lilac, magnesium no colour, calcium brick red, strontium crimson red and barium apple green">
      <text x={460} y={32} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the flame colours the specification asks for</text>
      {FLAME_COLOURS.map((c, i) => {
        const x = 24 + i * 126;
        const cx = x + 58;
        const flame = c.hex
          ? <path d={`M ${cx} 176 C ${cx - 21} 156, ${cx - 16} 124, ${cx} 100 C ${cx + 16} 124, ${cx + 21} 156, ${cx} 176 Z`} fill={c.hex} />
          : <path d={`M ${cx} 176 C ${cx - 21} 156, ${cx - 16} 124, ${cx} 100 C ${cx + 16} 124, ${cx + 21} 156, ${cx} 176 Z`} fill="none" stroke={FAINT} strokeWidth={2.4} strokeDasharray="5 5" />;
        return (
          <g key={c.ion}>
            <rect x={x} y={48} width={116} height={196} rx={20} fill={c.hex ? tint(c.hex, 13) : tint("var(--color-ink)", 5)} stroke={FAINT} strokeWidth={1.8} />
            <text x={cx} y={72} textAnchor="middle" fontSize="9.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">{c.grp}</text>
            {flame}
            <text x={cx} y={206} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{c.ion}</text>
            <text x={cx} y={226} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{c.word}</text>
          </g>
        );
      })}
      <rect x={185} y={266} width={550} height={36} rx={18} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={289} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">each colour is its cation's own set of electron transitions — magnesium's give none</text>
      <line x1={392} y1={40} x2={528} y2={40} stroke={accent} strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

/* ————— 8.18(i) · the thermal decomposition experiment ————— */

export function FigThermalExp({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 920 440" className="w-full" role="img" aria-label="The thermal decomposition apparatus: a hard glass test tube holding the salt is clamped above a Bunsen burner, a delivery tube carries the gas to a water bath where an inverted test tube collects it up to a mark, and the time taken to reach the mark is measured">
      {/* stand */}
      <rect x={52} y={386} width={250} height={16} rx={8} fill={tint("var(--color-ink)", 10)} />
      <rect x={72} y={80} width={12} height={308} rx={6} fill={tint("var(--color-ink)", 16)} />
      <rect x={84} y={128} width={64} height={10} rx={5} fill={tint("var(--color-ink)", 16)} />

      {/* the hard-glass test tube, tilted up to the right */}
      <g transform="rotate(-25 200 160)">
        <rect x={120} y={144} width={160} height={32} rx={16} fill={tint(accent, 5)} stroke={INK} strokeWidth={2.6} />
        <rect x={128} y={162} width={40} height={10} rx={5} fill={tint(accent, 30)} />
        <circle cx={136} cy={167} r={2.4} fill={INK} opacity={0.5} />
        <circle cx={146} cy={164} r={2.4} fill={INK} opacity={0.5} />
        <circle cx={155} cy={168} r={2.4} fill={INK} opacity={0.5} />
      </g>
      <text x={36} y={230} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">same amount</text>
      <text x={36} y={246} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">of each salt</text>
      <text x={236} y={96} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">hard-glass test tube</text>

      {/* Bunsen burner under the low end */}
      <rect x={110} y={290} width={26} height={54} rx={7} fill="none" stroke={INK} strokeWidth={2.6} />
      <path d="M 100 344 L 146 344 L 138 358 L 108 358 Z" fill="none" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M 123 286 C 112 268, 116 256, 123 244 C 130 256, 134 268, 123 286 Z" fill={accent} />
      <text x={163} y={352} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Bunsen burner</text>

      {/* delivery tube */}
      <path d="M 276 122 L 402 122 C 462 122, 478 156, 478 208 L 478 290 C 478 314, 486 330, 498 340" fill="none" stroke={INK} strokeWidth={2.8} strokeLinecap="round" />
      <text x={310} y={108} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">delivery tube</text>

      {/* water bath + collecting tube */}
      <path d="M 424 254 L 424 384 Q 424 402 442 402 L 622 402 Q 640 402 640 384 L 640 254" fill={tint("#4a90d9", 12)} />
      <path d="M 424 254 L 424 384 Q 424 402 442 402 L 622 402 Q 640 402 640 384 L 640 254" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={424} y1={290} x2={640} y2={290} stroke="#4a90d9" strokeWidth={2.4} />
      <text x={532} y={424} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">water bath</text>

      {/* inverted collecting tube with its mark */}
      <path d="M 500 258 L 500 346 M 548 258 L 548 346 M 500 258 Q 524 246 548 258" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={500} y={262} width={48} height={38} rx={6} fill={tint(accent, 14)} />
      <line x1={500} y1={306} x2={548} y2={306} stroke={accent} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={514} cy={354} r={4} fill={tint(accent, 26)} />
      <circle cx={524} cy={346} r={3} fill={tint(accent, 26)} />
      <text x={566} y={310} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the mark — time taken</text>
      <text x={566} y={326} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">for the gas to reach it</text>

      {/* the verdict card */}
      <rect x={690} y={150} width={198} height={92} rx={20} fill={tint(accent, 12)} />
      <text x={789} y={184} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">shorter time =</text>
      <text x={789} y={204} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">faster decomposition</text>
      <text x={789} y={226} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">repeat with each salt</text>
      <text x={789} y={106} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">same flame · same amounts</text>
    </svg>
  );
}

/* ————— 8.20 / CP3 · the titration rig ————— */

export function FigTitrationRig({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 920 440" className="w-full" role="img" aria-label="The titration set-up: a burette clipped to a stand delivers solution to a conical flask standing on a white tile, a drop falling from the stopcock, while a pipette with its filler stands ready to transfer a fixed volume">
      {/* stand */}
      <rect x={64} y={404} width={260} height={16} rx={8} fill={tint("var(--color-ink)", 10)} />
      <rect x={86} y={64} width={12} height={342} rx={6} fill={tint("var(--color-ink)", 16)} />
      <rect x={98} y={116} width={92} height={10} rx={5} fill={tint("var(--color-ink)", 16)} />

      {/* burette */}
      <rect x={214} y={62} width={36} height={252} rx={9} fill={tint(accent, 6)} stroke={INK} strokeWidth={2.6} />
      <rect x={218} y={96} width={28} height={210} rx={6} fill={tint(accent, 20)} />
      {[110, 150, 190, 230, 270].map((y) => (
        <line key={y} x1={218} y1={y} x2={228} y2={y} stroke={INK} strokeWidth={1.8} opacity={0.45} />
      ))}
      <rect x={206} y={318} width={52} height={16} rx={6} fill={INK} />
      <path d="M 232 334 L 232 362" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <text x={262} y={90} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">burette</text>
      <text x={262} y={108} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">definite but variable</text>
      <text x={262} y={124} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">volumes of liquid</text>
      <text x={276} y={332} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">stopcock</text>

      {/* conical flask on the white tile */}
      <path d="M 196 300 L 270 300 L 270 322 M 196 300 L 196 322" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <path d="M 158 404 L 188 322 L 258 322 L 288 404 Z" fill={tint(accent, 9)} />
      <path d="M 166 396 L 190 340 L 256 340 L 280 396 Z" fill={tint(accent, 16)} />
      <path d="M 158 404 L 188 322 L 258 322 L 288 404 Z" fill="none" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <rect x={140} y={404} width={168} height={12} rx={4} fill={tint("var(--color-ink)", 9)} />
      <text x={300} y={372} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">conical flask</text>
      <text x={300} y={390} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">mixes the solutions</text>
      <text x={300} y={414} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">white tile — shows the colour change</text>

      {/* pipette with filler */}
      <rect x={590} y={40} width={120} height={34} rx={17} fill={tint(accent, 14)} />
      <text x={650} y={62} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">pipette filler</text>
      <rect x={634} y={74} width={32} height={170} rx={8} fill={tint(accent, 6)} stroke={INK} strokeWidth={2.6} />
      <rect x={638} y={110} width={24} height={100} rx={6} fill={tint(accent, 20)} />
      <ellipse cx={650} cy={272} rx={30} ry={44} fill={tint(accent, 6)} stroke={INK} strokeWidth={2.6} />
      <ellipse cx={650} cy={272} rx={24} ry={36} fill={tint(accent, 20)} />
      <path d="M 650 316 L 650 356" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <text x={700} y={200} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">pipette</text>
      <text x={700} y={218} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">delivers one fixed</text>
      <text x={700} y={234} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">volume — accurately</text>

      <rect x={470} y={384} width={380} height={40} rx={20} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={660} y={409} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the indicator calls the end point</text>
    </svg>
  );
}

/* ————— 8.23 / CP4 · preparing a standard solution ————— */

export function FigStdSolution({ accent = "#FF6B6B" }: { accent?: string }) {
  const step = (x: number, n: number, label: string) => (
    <g>
      <rect x={x} y={296} width={280} height={36} rx={18} fill={tint(accent, 12)} />
      <circle cx={x + 22} cy={314} r={11} fill={accent} />
      <text x={x + 22} y={318.5} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={readableInk(accent)} fontFamily="var(--font-body)">{n}</text>
      <text x={x + 42} y={319} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{label}</text>
    </g>
  );
  const volFlask = (cx: number, fillTo: number, withStopper: boolean) => (
    <g>
      {fillTo > 0 && (
        <g>
          <circle cx={cx} cy={236} r={46} fill={tint(accent, 16)} />
          <rect x={cx - 15} y={fillTo} width={30} height={236 - fillTo} fill={tint(accent, 16)} />
        </g>
      )}
      <circle cx={cx} cy={236} r={46} fill="none" stroke={INK} strokeWidth={2.6} />
      <path d={`M ${cx - 15} 156 L ${cx - 15} 200 M ${cx + 15} 156 L ${cx + 15} 200`} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <path d={`M ${cx - 15} 200 Q ${cx - 15} 208 ${cx - 24} 214 M ${cx + 15} 200 Q ${cx + 15} 208 ${cx + 24} 214`} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={cx - 13} y1={172} x2={cx + 13} y2={172} stroke={accent} strokeWidth={2.6} strokeLinecap="round" />
      {withStopper && <rect x={cx - 17} y={136} width={34} height={20} rx={6} fill={tint("var(--color-ink)", 12)} stroke={INK} strokeWidth={2} />}
    </g>
  );
  return (
    <svg viewBox="0 0 920 348" className="w-full" role="img" aria-label="Three stations for making a standard solution: dissolve the weighed solid in a beaker, transfer it through a funnel into the volumetric flask and rinse everything in, then make up to the graduation mark, stopper and shake">
      {/* 1 · the beaker with the weighed solid */}
      <path d="M 56 130 L 56 246 Q 56 262 72 262 L 212 262 Q 228 262 228 246 L 228 130" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={46} y1={130} x2={56} y2={130} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={228} y1={130} x2={238} y2={130} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={56} y={196} width={172} height={66} rx={10} fill={tint(accent, 12)} />
      <ellipse cx={142} cy={244} rx={38} ry={12} fill={tint("var(--color-ink)", 14)} />
      <circle cx={120} cy={240} r={3} fill={INK} opacity={0.5} />
      <circle cx={146} cy={246} r={3} fill={INK} opacity={0.5} />
      <circle cx={168} cy={238} r={3} fill={INK} opacity={0.5} />
      <line x1={186} y1={148} x2={142} y2={238} stroke={INK} strokeWidth={3} strokeLinecap="round" opacity={0.7} />
      <text x={142} y={112} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the weighed solid, dissolving</text>
      {step(30, 1, "dissolve it completely")}

      {/* 2 · transfer through the funnel */}
      <path d="M 372 118 L 452 118 L 416 162 Z" fill="none" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <g transform="rotate(-18 398 92)">
        <rect x={370} y={70} width={56} height={44} rx={6} fill={tint(accent, 8)} stroke={INK} strokeWidth={2.4} />
        <line x1={370} y1={86} x2={426} y2={86} stroke={accent} strokeWidth={2.4} />
      </g>
      <path d="M 424 116 Q 420 130 412 142" fill="none" stroke={accent} strokeWidth={2.6} strokeLinecap="round" strokeDasharray="4 5" />
      {volFlask(412, 0, false)}
      {step(330, 2, "transfer & rinse in")}

      {/* 3 · made up to the mark */}
      {volFlask(770, 172, true)}
      <text x={770} y={124} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">meniscus on the mark</text>
      {step(630, 3, "to the mark — stopper, shake")}

      <path d="M 316 210 L 336 210" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeDasharray="6 6" />
      <polygon points="348,210 332,204 332,216" fill={accent} />
      <path d="M 620 210 L 660 210" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeDasharray="6 6" />
      <polygon points="672,210 656,204 656,216" fill={accent} />
    </svg>
  );
}

/* ————— 8.22 · accuracy and precision, the archery trial ————— */

export function FigTitreTargets({ accent = "#FF6B6B" }: { accent?: string }) {
  const hit = (cx: number, cy: number, i: number) => (
    <g key={i}>
      <circle cx={cx} cy={cy} r={6.5} fill={INK} />
      <circle cx={cx} cy={cy} r={2.2} fill={PAPER} />
    </g>
  );
  const target = (cx: number, name: string, verdict: string, chipFill: string, hits: [number, number][], note: string) => (
    <g>
      <text x={cx} y={54} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{name}</text>
      <circle cx={cx} cy={168} r={84} fill="none" stroke={FAINT} strokeWidth={2} />
      <circle cx={cx} cy={168} r={56} fill="none" stroke={SOFT} strokeWidth={2} />
      <circle cx={cx} cy={168} r={28} fill="none" stroke={SOFT} strokeWidth={2} />
      <circle cx={cx} cy={168} r={7} fill={accent} />
      {hits.map(([hx, hy], i) => hit(cx + hx, 168 + hy, i))}
      <rect x={cx - 116} y={278} width={232} height={36} rx={18} fill={chipFill} />
      <text x={cx} y={301} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">{verdict}</text>
      <text x={cx} y={338} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{note}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 920 360" className="w-full" role="img" aria-label="Three archery targets for three students' titres: student A's arrows cluster tightly but off the bullseye, precise but not accurate; student B's arrows scatter with a lucky mean, neither precise nor accurate; student C's arrows cluster on the bullseye, both accurate and precise">
      <text x={460} y={24} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">the titre values as an archery competition — the cluster is precision, the bullseye is accuracy</text>
      {target(
        170,
        "Student A",
        "precise · not accurate",
        tint(accent, 14),
        [
          [38, -20],
          [48, -12],
          [33, -8],
        ],
        "all concordant — mean 0.57 cm³ high",
      )}
      {target(
        460,
        "Student B",
        "neither — a lucky mean",
        tint("var(--color-ink)", 7),
        [
          [-46, -30],
          [42, 36],
          [6, -52],
        ],
        "not concordant — mean within 0.07 cm³",
      )}
      {target(
        750,
        "Student C",
        "accurate and precise",
        tint(accent, 22),
        [
          [5, -4],
          [-4, 6],
          [7, 7],
        ],
        "all concordant — mean within 0.03 cm³",
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8C · inorganic chemistry of Group 7
   ═══════════════════════════════════════════════════════════════ */

/* ————— 8.24 · the group 7 trend panel ————— */

export function FigG7Trends({ accent = "#FF6B6B" }: { accent?: string }) {
  const cy = 150;
  const atoms = [
    { x: 130, el: "F", shells: [16, 30], r: "0.064", c: "#EFE77F", state: "gas" },
    { x: 330, el: "Cl", shells: [14, 26, 40], r: "0.099", c: "#8FC97E", state: "gas" },
    { x: 530, el: "Br", shells: [13, 24, 35, 47], r: "0.111", c: "#8E3B2F", state: "liquid" },
    { x: 730, el: "I", shells: [12, 22, 32, 42, 53], r: "0.128", c: "#3B3B44", state: "solid" },
  ];
  return (
    <svg viewBox="0 0 920 430" className="w-full" role="img" aria-label="Four halogen atoms, fluorine chlorine bromine and iodine, growing bigger across the panel, each with seven outer electrons on its outermost shell: the colour swatches run pale yellow gas, green gas, red-brown liquid, grey-black solid, the atomic radii climb from 0.064 to 0.128 nanometres, melting and boiling temperatures rise as electrons and London forces increase, while electronegativity, reactivity, oxidising power and electron affinity all fall">
      <text x={460} y={30} textAnchor="middle" fontSize="14.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        group 7 — heavier molecules, weaker grip
      </text>

      {/* the rising band — mp/bp */}
      <text x={460} y={58} textAnchor="middle" fontSize="12" fontWeight="800" fill={accent} fontFamily="var(--font-body)">
        melting &amp; boiling temperature ↑ — more electrons per molecule, stronger London forces
      </text>
      {atoms.map((a) => (
        <polygon key={`up-${a.el}`} points={`${a.x - 5},82 ${a.x + 5},82 ${a.x},72`} fill={accent} />
      ))}

      {/* the atoms — shells stack up, seven outer electrons each */}
      {atoms.map((a) => (
        <g key={a.el}>
          {a.shells.map((r, i) => (
            <circle key={r} cx={a.x} cy={cy} r={r} fill="none" stroke={i === a.shells.length - 1 ? SOFT : FAINT} strokeWidth={i === a.shells.length - 1 ? 2.2 : 1.6} />
          ))}
          {a.shells.slice(-1).map((r) =>
            [0, 1, 2, 3, 4, 5, 6].map((i) => {
              const th = ((-90 + (360 / 7) * i) * Math.PI) / 180;
              return (
                <circle
                  key={`d${i}`}
                  cx={a.x + r * Math.cos(th)}
                  cy={cy + r * Math.sin(th)}
                  r={3}
                  fill={SOFT}
                />
              );
            })
          )}
          <circle cx={a.x} cy={cy} r={13} fill={tint(accent, 26)} />
          <text x={a.x} y={cy + 4} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {a.el}
          </text>
        </g>
      ))}

      {/* colour-at-RTP swatches + radius chips */}
      {atoms.map((a) => (
        <g key={`sw-${a.el}`}>
          <rect x={a.x - 48} y={212} width={96} height={24} rx={12} fill={a.c} />
          <text x={a.x} y={228} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={readableInk(a.c)} fontFamily="var(--font-body)">
            {a.state}
          </text>
          <rect x={a.x - 48} y={250} width={96} height={26} rx={13} fill={tint(accent, 12)} />
          <text x={a.x} y={268} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {a.r} nm
          </text>
        </g>
      ))}

      {/* the falling band — electronegativity & reactivity */}
      {atoms.map((a) => (
        <polygon key={`dn-${a.el}`} points={`${a.x - 5},290 ${a.x + 5},290 ${a.x},300`} fill={INK} opacity={0.75} />
      ))}
      <text x={460} y={330} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        electronegativity ↓ · reactivity ↓ · oxidising power ↓ · electron affinity ↓
      </text>

      <rect x={125} y={366} width={670} height={40} rx={20} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={391} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        down the group: F → Cl → Br → I (→ At) — radius ↑ · melting &amp; boiling ↑ · electronegativity ↓ · reactivity ↓
      </text>
    </svg>
  );
}

/* ————— 8.25 · the colour rows to memorise ————— */

export function FigHalogenColours({ accent = "#FF6B6B" }: { accent?: string }) {
  const cols = [
    { x: 233, el: "F₂" },
    { x: 421, el: "Cl₂" },
    { x: 609, el: "Br₂" },
    { x: 797, el: "I₂" },
  ];
  const rows = [
    { y: 92, label: "the element, at RTP" },
    { y: 152, label: "in water" },
    { y: 212, label: "in cyclohexane" },
  ];
  const swatches = [
    [
      { c: "#EFE77F", t: "pale yellow · gas" },
      { c: "#8FC97E", t: "green · gas" },
      { c: "#8E3B2F", t: "red-brown · liquid" },
      { c: "#3B3B44", t: "grey-black · solid" },
    ],
    [
      { c: "#F7F5C0", t: "very pale yellow" },
      { c: "#CFE8C6", t: "pale green" },
      { c: "#9C4A3A", t: "reddish brown" },
      { c: "#C7A78B", t: "pale brown" },
    ],
    [
      { c: "", t: "—" },
      { c: "#CFE8C6", t: "pale green" },
      { c: "#9C4A3A", t: "reddish brown" },
      { c: "#7A5FA0", t: "violet" },
    ],
  ];
  return (
    <svg viewBox="0 0 920 310" className="w-full" role="img" aria-label="A colour chart of the halogens in three rows: the elements themselves are pale yellow gas, green gas, red-brown liquid and grey-black solid; in water they are very pale yellow, pale green, reddish brown and pale brown; in the hydrocarbon solvent cyclohexane the iodine shows its true violet while the note leaves the fluorine cell blank">
      <text x={460} y={28} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        the colours to know — element, in water, in a hydrocarbon solvent
      </text>

      {cols.map((c) => (
        <g key={c.el}>
          <rect x={c.x - 32} y={46} width={64} height={26} rx={13} fill={tint(accent, 22)} />
          <text x={c.x} y={64} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {c.el}
          </text>
        </g>
      ))}

      {rows.map((r, ri) => (
        <g key={r.label}>
          <text x={133} y={r.y + 27} textAnchor="end" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {r.label}
          </text>
          {cols.map((c, ci) => {
            const sw = swatches[ri][ci];
            return (
              <g key={`${ri}-${ci}`}>
                {sw.c ? (
                  <rect x={c.x - 88} y={r.y} width={176} height={44} rx={14} fill={sw.c} />
                ) : (
                  <rect x={c.x - 88} y={r.y} width={176} height={44} rx={14} fill="none" stroke={FAINT} strokeWidth={1.6} strokeDasharray="4 5" />
                )}
                <text x={c.x} y={r.y + 27} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={sw.c ? readableInk(sw.c) : SOFT} fontFamily="var(--font-body)">
                  {sw.t}
                </text>
              </g>
            );
          })}
        </g>
      ))}

      <rect x={150} y={272} width={620} height={32} rx={16} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={292} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        shake with the non-polar solvent: iodine's violet shows at its best — every aqueous colour is paler
      </text>
    </svg>
  );
}

/* ————— 8.25 · the displacement matrix ————— */

export function FigDisplacement({ accent = "#FF6B6B" }: { accent?: string }) {
  const GREEN = "#CFE8C6";
  const BROWN = "#9C4A3A";
  const PALEBROWN = "#C7A78B";
  const cols = [
    { x: 350, el: "KCl(aq)" },
    { x: 550, el: "KBr(aq)" },
    { x: 750, el: "KI(aq)" },
  ];
  const rows = [
    { y: 135, el: "Cl₂ added" },
    { y: 235, el: "Br₂ added" },
    { y: 335, el: "I₂ added" },
  ];
  /* r: "no" = no reaction (the tube keeps the added halogen's own colour) · "dis" = displacement */
  const cells = [
    [
      { r: "no", c: GREEN, t: "very pale green" },
      { r: "dis", c: BROWN, t: "reddish brown", who: "Br₂" },
      { r: "dis", c: PALEBROWN, t: "pale brown", who: "I₂", hex: true },
    ],
    [
      { r: "no", c: BROWN, t: "reddish brown" },
      { r: "no", c: BROWN, t: "reddish brown" },
      { r: "dis", c: PALEBROWN, t: "pale brown", who: "I₂", hex: true },
    ],
    [
      { r: "no", c: PALEBROWN, t: "pale brown" },
      { r: "no", c: PALEBROWN, t: "pale brown" },
      { r: "no", c: PALEBROWN, t: "pale brown" },
    ],
  ];
  return (
    <svg viewBox="0 0 920 440" className="w-full" role="img" aria-label="The displacement matrix: chlorine added to potassium chloride stays very pale green but displaces bromine from potassium bromide, reddish brown, and iodine from potassium iodide, pale brown and violet in cyclohexane; bromine only displaces iodide; iodine displaces nothing — a halogen oxidises the halides below it on the ladder fluorine, chlorine, bromine, iodine, never one above">
      <text x={460} y={28} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        who displaces whom — halogen added, halide in solution
      </text>

      {cols.map((c) => (
        <g key={c.el}>
          <rect x={c.x - 55} y={48} width={110} height={30} rx={15} fill={tint("var(--color-ink)", 9)} />
          <text x={c.x} y={68} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {c.el}
          </text>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.el}>
          <rect x={88} y={r.y - 15} width={104} height={30} rx={15} fill={tint(accent, 22)} />
          <text x={140} y={r.y + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {r.el}
          </text>
        </g>
      ))}

      {rows.map((r, ri) =>
        cols.map((c, ci) => {
          const cell = cells[ri][ci];
          const dis = cell.r === "dis";
          return (
            <g key={`${ri}-${ci}`} data-cell={`${ri}-${ci}`}>
              <rect
                x={c.x - 100}
                y={r.y - 38}
                width={200}
                height={76}
                rx={16}
                fill={dis ? tint(accent, 16) : tint("var(--color-ink)", 5)}
                stroke={dis ? accent : FAINT}
                strokeWidth={dis ? 2.2 : 1.8}
              />
              {dis ? (
                <text x={c.x} y={r.y - 12} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
                  {cell.who} displaced
                </text>
              ) : (
                <text x={c.x} y={r.y - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
                  no change
                </text>
              )}
              <circle cx={c.x - 66} cy={r.y + 12} r={6} fill={cell.c} stroke={FAINT} strokeWidth={1.2} />
              <text x={c.x - 54} y={r.y + 16} fontSize="11" fontWeight="700" fill={dis ? INK : SOFT} fontFamily="var(--font-body)">
                {cell.t}
              </text>
              {"hex" in cell && cell.hex && (
                <text x={c.x} y={r.y + 32} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
                  violet in cyclohexane
                </text>
              )}
            </g>
          );
        })
      )}

      <rect x={150} y={396} width={620} height={36} rx={18} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={419} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        a halogen oxidises the halides below it on the ladder F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂ — never one above
      </text>
    </svg>
  );
}

/* ————— 8.26 · chlorine's three disproportionations ————— */

export function FigCl2Fates({ accent = "#FF6B6B" }: { accent?: string }) {
  const panels = [
    {
      x: 170,
      head: "with water",
      eq: "Cl₂ + H₂O → HCl + HClO",
      top: "+1",
      up: "HClO",
      upSub: "chloric(I) acid",
      down: "HCl",
      downSub: "hydrochloric acid · −1",
      foot: "kills bacteria — water treatment",
    },
    {
      x: 460,
      head: "with cold dilute NaOH",
      eq: "2NaOH + Cl₂ → NaCl + NaOCl + H₂O",
      top: "+1",
      up: "NaOCl",
      upSub: "chlorate(I) — the bleach",
      down: "NaCl",
      downSub: "chloride · −1",
      foot: "active ingredient in household bleach",
    },
    {
      x: 750,
      head: "with hot concentrated NaOH",
      eq: "6NaOH + 3Cl₂ → 5NaCl + NaClO₃ + 3H₂O",
      top: "+5",
      up: "NaClO₃",
      upSub: "chlorate(V) · +5",
      down: "NaCl",
      downSub: "chloride · −1",
      foot: "bleaching + weed killer",
    },
  ];
  return (
    <svg viewBox="0 0 920 470" className="w-full" role="img" aria-label="Three panels each with a small oxidation-number ladder for chlorine: with water and with cold dilute sodium hydroxide one chlorine atom falls to minus one, hydrochloric acid or chloride, while its partner climbs to plus one, chloric(I) acid or the chlorate(I) that is household bleach; with the hot concentrated alkali the climbing atom reaches plus five, sodium chlorate(V), used in bleaching and as a weed killer">
      <text x={460} y={24} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        chlorine's three disproportionations — one atom falls, its partner climbs
      </text>

      {panels.map((p) => {
        const ax = p.x - 75; // the mini oxidation-number ladder
        const px = p.x + 55; // the product chips
        return (
          <g key={p.head}>
            <rect x={p.x - 115} y={42} width={230} height={28} rx={14} fill={tint("var(--color-ink)", 7)} />
            <text x={p.x} y={61} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
              {p.head}
            </text>
            <text x={p.x} y={92} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
              {p.eq}
            </text>

            {/* the ladder */}
            <line x1={ax} y1={362} x2={ax} y2={140} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
            <polygon points={`${ax},128 ${ax - 7},146 ${ax + 7},146`} fill={INK} />
            {[
              { y: 160, n: p.top },
              { y: 255, n: "0" },
              { y: 350, n: "−1" },
            ].map((r) => (
              <g key={r.n}>
                <line x1={ax - 8} y1={r.y} x2={ax + 8} y2={r.y} stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
                <text x={ax - 52} y={r.y + 4} textAnchor="end" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
                  {r.n}
                </text>
              </g>
            ))}
            <rect x={p.x - 120} y={238} width={90} height={34} rx={17} fill={tint(accent, 24)} />
            <text x={p.x - 75} y={260} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
              Cl₂
            </text>

            {/* oxidation branch — the climb */}
            <path d={`M ${p.x - 26} 240 C ${p.x + 34} 228 ${p.x - 36} 186 ${p.x - 58} 164`} fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" />
            <polygon points={`${px - 52},160 ${px - 70},152 ${px - 68},168`} fill={accent} />
            <rect x={px - 55} y={144} width={110} height={32} rx={16} fill={tint(accent, 26)} />
            <text x={px} y={165} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
              {p.up}
            </text>
            <text x={px} y={192} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
              {p.upSub}
            </text>

            {/* reduction branch — the fall */}
            <path d={`M ${p.x - 26} 270 C ${p.x + 34} 282 ${p.x - 36} 324 ${p.x - 58} 346`} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" strokeDasharray="7 6" />
            <polygon points={`${px - 52},350 ${px - 70},342 ${px - 68},358`} fill={INK} />
            <rect x={px - 55} y={334} width={110} height={32} rx={16} fill={tint("var(--color-ink)", 9)} />
            <text x={px} y={355} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
              {p.down}
            </text>
            <text x={px} y={382} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
              {p.downSub}
            </text>

            <text x={p.x} y={410} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
              {p.foot}
            </text>
          </g>
        );
      })}

      <rect x={150} y={428} width={620} height={36} rx={18} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={451} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        chlorine starts at 0 and lands on both sides at once — disproportionation in every panel
      </text>
    </svg>
  );
}

/* ————— 8.27(i) · the halide / H₂SO₄ staircase ————— */

export function FigH2so4Ladder({ accent = "#FF6B6B" }: { accent?: string }) {
  type Chip = { t: string; w: number; fill: string; stroke?: boolean; on?: string };
  const steps: { x: number; y: number; salt: string; note: string; chips: Chip[] }[] = [
    {
      x: 40,
      y: 190,
      salt: "NaCl(s)",
      note: "H₂SO₄ acts only as an acid",
      chips: [{ t: "HCl — misty fumes", w: 150, fill: PAPER, stroke: true }],
    },
    {
      x: 330,
      y: 290,
      salt: "NaBr(s)",
      note: "acid — and oxidising agent too",
      chips: [
        { t: "HBr — misty fumes", w: 150, fill: PAPER, stroke: true },
        { t: "Br₂ — brown fumes", w: 150, fill: "#9C4A3A" },
        { t: "SO₂ — colourless, choking", w: 196, fill: "#DFDFD9", on: "+4" },
      ],
    },
    {
      x: 620,
      y: 390,
      salt: "NaI(s)",
      note: "oxidising agent — S fully reduced",
      chips: [
        { t: "HI — misty fumes", w: 140, fill: PAPER, stroke: true },
        { t: "I₂ — purple fumes, black solid", w: 214, fill: "#4A2A4A" },
        { t: "SO₂ — colourless, choking", w: 196, fill: "#DFDFD9", on: "+4" },
        { t: "S — yellow solid", w: 150, fill: "#F0DC7E", on: "0" },
        { t: "H₂S — rotten-egg gas", w: 176, fill: "#EAE3B8", on: "−2" },
      ],
    },
  ];
  return (
    <svg viewBox="0 0 920 480" className="w-full" role="img" aria-label="A descending staircase of reducing power: sodium chloride with concentrated sulfuric acid gives only misty hydrogen chloride fumes, sodium bromide adds brown bromine fumes and choking sulfur dioxide, and sodium iodide adds everything — purple iodine fumes with a black solid, sulfur dioxide, a yellow sulfur precipitate and rotten-egg hydrogen sulfide, as the sulfur of the acid is dragged down from plus six to plus four, zero and minus two">
      <text x={460} y={24} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        the sodium halides vs concentrated H₂SO₄ — the staircase of reducing power
      </text>

      {steps.map((s) => {
        const cx = s.x + 130;
        return (
          <g key={s.salt}>
            {s.chips.map((c, i) => {
              const y = s.y - 58 - i * 30;
              return (
                <g key={c.t}>
                  <rect x={cx - c.w / 2} y={y} width={c.w} height={24} rx={12} fill={c.fill} stroke={c.stroke ? FAINT : "none"} strokeWidth={1.6} />
                  <text x={cx} y={y + 16.5} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={c.stroke ? INK : readableInk(c.fill)} fontFamily="var(--font-body)">
                    {c.t}
                  </text>
                  {c.on && (
                    <g>
                      <circle cx={cx + c.w / 2 + 11} cy={y + 12} r={10.5} fill={tint(accent, 30)} />
                      <text x={cx + c.w / 2 + 11} y={y + 15.5} textAnchor="middle" fontSize="9" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
                        {c.on}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            <rect x={cx - 48} y={s.y - 28} width={96} height={28} rx={14} fill={tint(accent, 24)} />
            <text x={cx} y={s.y - 9} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
              {s.salt}
            </text>
            <rect x={s.x} y={s.y} width={260} height={16} rx={8} fill={tint("var(--color-ink)", 10)} />
            <text x={cx} y={s.y + 34} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
              {s.note}
            </text>
          </g>
        );
      })}

      {/* the descent — each halide reduces the acid further */}
      <path d="M 302 198 C 316 230 322 252 328 276" fill="none" stroke={accent} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="7 6" />
      <polygon points="336,284 320,276 328,266" fill={accent} />
      <path d="M 592 298 C 606 330 612 352 618 376" fill="none" stroke={accent} strokeWidth={2.8} strokeLinecap="round" strokeDasharray="7 6" />
      <polygon points="626,384 610,376 618,366" fill={accent} />

      <rect x={130} y={440} width={660} height={34} rx={17} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={461} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        reducing power of the halide climbs the staircase — and the sulfur in H₂SO₄ steps down: +6 → +4 → 0 → −2
      </text>
    </svg>
  );
}

/* ————— 8.27(ii) · the silver-nitrate halide test ————— */

export function FigHalideTest({ accent = "#FF6B6B" }: { accent?: string }) {
  const stations = [
    {
      x: 190,
      ion: "Cl⁻",
      ppt: "#F2EFE4",
      name: "white precipitate",
      eq: "Ag⁺ + Cl⁻ → AgCl(s)",
      nh3: [
        { t: "dilute NH₃ → dissolves", level: "hot" },
        { t: "conc. NH₃ → dissolves", level: "hot" },
      ],
    },
    {
      x: 460,
      ion: "Br⁻",
      ppt: "#E3D3AE",
      name: "cream precipitate",
      eq: "Ag⁺ + Br⁻ → AgBr(s)",
      nh3: [
        { t: "dilute NH₃ → slightly soluble", level: "warm" },
        { t: "conc. NH₃ → dissolves", level: "hot" },
      ],
    },
    {
      x: 730,
      ion: "I⁻",
      ppt: "#E2C64B",
      name: "yellow precipitate",
      eq: "Ag⁺ + I⁻ → AgI(s)",
      nh3: [
        { t: "dilute NH₃ → insoluble", level: "cold" },
        { t: "conc. NH₃ → insoluble", level: "cold" },
      ],
    },
  ];
  const chipFill = (level: string) =>
    level === "hot" ? tint(accent, 18) : level === "warm" ? tint(accent, 8) : tint("var(--color-ink)", 8);
  return (
    <svg viewBox="0 0 920 440" className="w-full" role="img" aria-label="Three test tubes after silver nitrate is added to acidified halide solutions: chloride gives a white precipitate of silver chloride that dissolves in both dilute and concentrated ammonia, bromide gives a cream precipitate slightly soluble in dilute ammonia but soluble in concentrated ammonia, and iodide gives a yellow precipitate insoluble in both — the nitric acid is added first to remove carbonate ions">
      <text x={460} y={26} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        the halide test — silver nitrate first, then ammonia
      </text>
      <text x={460} y={48} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        dilute HNO₃ added first — removes other anions (especially carbonates) that would also precipitate
      </text>

      {stations.map((s) => (
        <g key={s.ion}>
          <rect x={s.x - 32} y={62} width={64} height={26} rx={13} fill={tint(accent, 22)} />
          <text x={s.x} y={80} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {s.ion}
          </text>

          {/* the tube */}
          <path d={`M ${s.x - 30} 120 L ${s.x - 30} 214 Q ${s.x - 30} 250 ${s.x} 250 Q ${s.x + 30} 250 ${s.x + 30} 214 L ${s.x + 30} 120 Z`} fill={tint(accent, 9)} />
          <path d={`M ${s.x - 30} 100 L ${s.x - 30} 214 Q ${s.x - 30} 250 ${s.x} 250 Q ${s.x + 30} 250 ${s.x + 30} 214 L ${s.x + 30} 100`} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
          <line x1={s.x - 42} y1={100} x2={s.x - 30} y2={100} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
          <line x1={s.x + 30} y1={100} x2={s.x + 42} y2={100} stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
          <ellipse cx={s.x} cy={236} rx={21} ry={10} fill={s.ppt} stroke={FAINT} strokeWidth={1.4} />

          <text x={s.x} y={276} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
            {s.name}
          </text>
          <text x={s.x} y={296} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
            {s.eq}
          </text>

          {s.nh3.map((n, i) => (
            <g key={n.t}>
              <rect x={s.x - 90} y={310 + i * 30} width={180} height={24} rx={12} fill={chipFill(n.level)} />
              <text x={s.x} y={326 + i * 30} textAnchor="middle" fontSize="10" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
                {n.t}
              </text>
            </g>
          ))}
        </g>
      ))}

      <text x={460} y={390} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        AgX(s) + 2NH₃(aq) → [Ag(NH₃)₂]⁺(aq) + X⁻(aq) — dissolves AgCl and AgBr
      </text>
      <rect x={155} y={402} width={610} height={32} rx={16} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={460} y={422} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        white → cream → yellow down the group — and only silver iodide refuses to dissolve in ammonia
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9A · Kinetics — rate graphs, collision theory, Maxwell–
   Boltzmann distributions and the catalyst pictures
   ═══════════════════════════════════════════════════════════════ */

/* vertical double-headed measuring arrow (for Ea spans) */
function t9Gauge(x: number, yTop: number, yBot: number, c: string, w = 3) {
  return (
    <g>
      {t3Arrow(x, (yTop + yBot) / 2, x, yTop, c, w)}
      {t3Arrow(x, (yTop + yBot) / 2, x, yBot, c, w)}
    </g>
  );
}

/* tiny atoms for the collision / surface pictures */
function t9Atom(x: number, y: number, label: string, dark: boolean, r = 8.5) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={dark ? INK : PAPER} stroke={INK} strokeWidth={dark ? 1 : 2} />
      <text x={x} y={y + 3} textAnchor="middle" fontSize={r * 0.95} fontWeight="800" fill={dark ? PAPER : INK} fontFamily="var(--font-body)">
        {label}
      </text>
    </g>
  );
}

/* a row-pair of metal atoms — the catalyst surface */
function t9Surface(cx: number, y: number, n: number) {
  const atoms: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const x = cx - (n - 1) * 14 + i * 28;
    atoms.push(<circle key={`a${i}`} cx={x} cy={y} r={11} fill={tint("var(--color-ink)", 10)} stroke={FAINT} strokeWidth={1.4} />);
    atoms.push(<circle key={`b${i}`} cx={x + 14} cy={y + 19} r={11} fill={tint("var(--color-ink)", 16)} stroke={FAINT} strokeWidth={1.4} />);
  }
  return <g>{atoms}</g>;
}

/* ————— 9.1 · the three physical rate factors ————— */

export function FigRateFactors({ accent = "#FF6B6B" }: { accent?: string }) {
  const spA = tint(accent, 26); /* species A chip */
  const dot = (x: number, y: number, alt: boolean, k?: number | string) => (
    <circle key={k} cx={x} cy={y} r={6.5} fill={alt ? PAPER : spA} stroke={INK} strokeWidth={alt ? 2 : 1.4} />
  );
  const chip = (x: number, t: string) => (
    <g>
      <rect x={x - 92} y={14} width={184} height={27} rx={13.5} fill={tint(accent, 24)} />
      <text x={x} y={32} textAnchor="middle" fontSize="11.5" fontWeight="800" letterSpacing="0.6" fill={INK} fontFamily="var(--font-body)">
        {t}
      </text>
    </g>
  );
  const note = (x: number, y: number, lines: string[]) =>
    lines.map((t, i) => (
      <text key={i} x={x} y={y + i * 15} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        {t}
      </text>
    ));
  return (
    <svg viewBox="0 0 960 350" className="w-full" role="img" aria-label="Three panels. Concentration: a vessel with a few molecules has few collisions and a low rate; adding more particles packs more collisions into the same volume and the rate is greater. Pressure: the same number of gas molecules squeezed into a smaller vessel sit closer together and collide more often. Surface area: one lump of solid only reacts at its outer surface, while the powdered solid exposes far more surface for collision.">
      <line x1={320} y1={40} x2={320} y2={300} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={640} y1={40} x2={640} y2={300} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— concentration ————— */}
      {chip(160, "CONCENTRATION")}
      <rect x={38} y={62} width={118} height={104} rx={16} fill="none" stroke={INK} strokeWidth={2.6} />
      {[0, 1, 2, 3, 4].map((i) => dot(62 + (i % 3) * 36, 88 + Math.floor(i / 3) * 38, i % 2 === 1, i))}
      <rect x={214} y={62} width={118} height={104} rx={16} fill="none" stroke={INK} strokeWidth={2.6} />
      {[
        [232, 84], [262, 76], [292, 92], [314, 78], [240, 112], [272, 104], [302, 120], [320, 106], [250, 140], [282, 134], [312, 148],
      ].map(([x, y], i) => dot(x, y, i % 2 === 1, i))}
      {t3Arrow(166, 114, 208, 114, accent, 3.4)}
      {note(160, 190, ["few molecules → few collisions", "the rate is low", "many molecules → more collisions", "the rate is greater"])}
      {note(160, 268, ["more particles crowded into", "the same volume"])}
      <g>
        <rect x={82} y={288} width={156} height={24} rx={12} fill={tint(accent, 10)} />
        <text x={160} y={304} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          collisions more frequent
        </text>
      </g>

      {/* ————— pressure ————— */}
      {chip(480, "PRESSURE — GASES ONLY")}
      <rect x={352} y={54} width={128} height={120} rx={16} fill="none" stroke={INK} strokeWidth={2.6} />
      {[
        [376, 80], [412, 72], [448, 88], [384, 112], [420, 106], [452, 122], [396, 144], [432, 140],
      ].map(([x, y], i) => dot(x, y, i % 2 === 1, i))}
      <rect x={548} y={92} width={76} height={82} rx={14} fill="none" stroke={INK} strokeWidth={2.6} />
      {[
        [562, 110], [588, 102], [608, 120], [566, 134], [592, 130], [610, 148], [576, 156], [598, 162],
      ].map(([x, y], i) => dot(x, y, i % 2 === 1, i))}
      {t3Arrow(486, 114, 540, 114, accent, 3.4)}
      <text x={513} y={100} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={accent} fontFamily="var(--font-body)">
        squeeze
      </text>
      {note(480, 190, ["the same molecules in a", "smaller space — they sit", "closer together", "collisions more frequent"])}
      {note(480, 268, ["solids and liquids barely", "compress — almost no effect"])}
      <g>
        <rect x={402} y={288} width={156} height={24} rx={12} fill={tint(accent, 10)} />
        <text x={480} y={304} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          collisions more frequent
        </text>
      </g>

      {/* ————— surface area ————— */}
      {chip(800, "SURFACE AREA")}
      {/* one lump — collisions only at its outer surface */}
      <rect x={664} y={100} width={84} height={62} rx={12} fill={tint(accent, 22)} stroke={INK} strokeWidth={2.4} />
      {t3Arrow(648, 90, 666, 108, accent, 2.4)}
      {t3Arrow(650, 152, 666, 140, accent, 2.4)}
      {t3Arrow(706, 82, 708, 98, accent, 2.4)}
      {t3Arrow(764, 90, 748, 108, accent, 2.4)}
      {/* powder it */}
      {t3Arrow(758, 132, 790, 132, accent, 3)}
      <text x={774} y={121} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={accent} fontFamily="var(--font-body)">
        powder it
      </text>
      {/* the powder — far more surface exposed */}
      <rect x={798} y={96} width={102} height={70} rx={12} fill="none" stroke={FAINT} strokeWidth={1.8} strokeDasharray="4 5" />
      {[
        [812, 110], [832, 104], [852, 114], [872, 108], [888, 118],
        [818, 132], [840, 128], [862, 134], [882, 130], [826, 150], [848, 148], [872, 154],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={tint(accent, 22)} stroke={INK} strokeWidth={1.6} />
      ))}
      {note(800, 190, ["one lump — only the outer", "surface can be attacked", "powdered — far more", "surface is exposed"])}
      {note(800, 268, ["the H⁺ ions meet magnesium", "atoms everywhere at once"])}
      <g>
        <rect x={722} y={288} width={156} height={24} rx={12} fill={tint(accent, 10)} />
        <text x={800} y={304} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          collisions more frequent
        </text>
      </g>

      <rect x={230} y={322} width={500} height={24} rx={12} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={480} y={338} textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        all three raise the collision frequency → more effective collisions → faster rate
      </text>
    </svg>
  );
}

/* ————— 9.1 · volume of CO₂ collected, fast vs slow acid ————— */

export function FigCo2Curves({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 540 360" className="w-full max-w-lg" role="img" aria-label="Volume of carbon dioxide against time for marble chips with hydrochloric acid. Curve A rises steeply and levels off quickly; curve B rises gently and takes longer to reach the same final volume. Same final volume, different rates.">
      <line x1={62} y1={318} x2={508} y2={318} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={62} y1={320} x2={62} y2={40} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={285} y={348} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Time</text>
      <text x={20} y={180} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 20 180)">
        Volume of CO₂
      </text>
      {/* same-final-volume guide */}
      <line x1={62} y1={65} x2={508} y2={65} stroke={FAINT} strokeWidth={2} strokeDasharray="6 7" />
      <text x={504} y={54} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        same final volume
      </text>
      {/* curve B — the slower acid */}
      <path d="M 62 318 C 140 306, 210 252, 268 200 C 320 154, 366 112, 420 88 C 452 74, 480 68, 506 66" fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" opacity={0.55} />
      {/* curve A — the faster acid */}
      <path d="M 62 318 C 96 210, 118 122, 152 90 C 176 68, 206 64, 250 64 L 506 64" fill="none" stroke={accent} strokeWidth={4.5} strokeLinecap="round" />
      <text x={92} y={168} fontSize="15" fontWeight="800" fill={accent} fontFamily="var(--font-body)">A</text>
      <text x={296} y={222} fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)" opacity={0.65}>B</text>
      <text x={200} y={86} fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        A levels off quickly — faster completion
      </text>
    </svg>
  );
}

/* ————— 9.2 · orientation — only one geometry reacts ————— */

export function FigOrientation({ accent = "#FF6B6B" }: { accent?: string }) {
  const ethene = (cx: number, cy: number) => {
    const c1 = [cx - 17, cy];
    const c2 = [cx + 17, cy];
    return (
      <g>
        <line x1={c1[0]} y1={cy} x2={c2[0]} y2={cy} stroke={INK} strokeWidth={2.6} />
        <line x1={c1[0]} y1={cy + 4.5} x2={c2[0]} y2={cy + 4.5} stroke={INK} strokeWidth={2.6} />
        {[
          [cx - 34, cy - 22], [cx + 34, cy - 22], [cx - 34, cy + 26], [cx + 34, cy + 26],
        ].map(([hx, hy], i) => (
          <g key={i}>
            <line x1={hx > cx ? c2[0] : c1[0]} y1={hy < cy ? cy - 4 : cy + 6} x2={hx > cx ? hx - 9 : hx + 9} y2={hy < cy ? hy + 8 : hy - 8} stroke={INK} strokeWidth={2.2} />
            {t9Atom(hx, hy, "H", false, 7.5)}
          </g>
        ))}
        {t9Atom(c1[0], cy, "C", true)}
        {t9Atom(c2[0], cy, "C", true)}
      </g>
    );
  };
  const verdict = (cx: number, ok: boolean) => (
    <g>
      <rect x={cx - 74} y={288} width={148} height={28} rx={14} fill={ok ? tint("#12B886", 22) : tint("var(--color-ink)", 8)} />
      <text x={cx} y={306} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        {ok ? "possible reaction" : "no reaction"}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 960 340" className="w-full" role="img" aria-label="Ethene meeting hydrogen bromide in three orientations. Collision 1: the hydrogen end of H—Br swings up into the carbon-carbon double bond — possible reaction. Collision 2: the bromine end leads — no reaction. Collision 3: H—Br attacks a hydrogen atom on the carbon instead of the double bond — no reaction.">
      <line x1={320} y1={50} x2={320} y2={310} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={640} y1={50} x2={640} y2={310} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      {[
        { cx: 160, n: "collision 1", ok: true },
        { cx: 480, n: "collision 2", ok: false },
        { cx: 800, n: "collision 3", ok: false },
      ].map((p) => (
        <g key={p.n}>
          <text x={p.cx} y={44} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
            {p.n}
          </text>
          {ethene(p.cx, 118)}
          {verdict(p.cx, p.ok)}
        </g>
      ))}
      {/* collision 1 — H end leads, up into the π bond */}
      <line x1={160} y1={196} x2={160} y2={228} stroke={INK} strokeWidth={2.4} />
      {t9Atom(160, 196, "H", false)}
      {t9Atom(160, 228, "Br", false, 10)}
      {t3Arrow(160, 180, 160, 152, accent, 3)}
      {/* collision 2 — Br end leads */}
      <line x1={480} y1={196} x2={480} y2={228} stroke={INK} strokeWidth={2.4} />
      {t9Atom(480, 196, "Br", false, 10)}
      {t9Atom(480, 228, "H", false)}
      {t3Arrow(480, 182, 480, 152, accent, 3)}
      {/* collision 3 — attacks an H instead of the π bond */}
      <line x1={856} y1={144} x2={888} y2={144} stroke={INK} strokeWidth={2.4} />
      {t9Atom(856, 144, "H", false)}
      {t9Atom(888, 144, "Br", false, 10)}
      {t3Arrow(842, 144, 822, 144, accent, 3)}
      <text x={480} y={336} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        same energy in all three — only the proper geometry can break the right bond
      </text>
    </svg>
  );
}

/* ————— 9.3 · the class note's two rate graphs ————— */

export function FigRateGraphs({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 1000 400" className="w-full" role="img" aria-label="Two concentration-time graphs. Left, a reactant: concentration falls steeply then flattens; a tangent drawn at point A forms a gradient triangle with legs y (concentration change) and x (time change); the gradient is zero when the reaction is complete. Right, a product: concentration rises fast at first then flattens; the opening slope gives the initial rate, a tangent at time t gives the rate then, and the rate at the end is zero.">
      <line x1={500} y1={30} x2={500} y2={370} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— fig A · with respect to a reactant ————— */}
      <g>
        <rect x={62} y={12} width={210} height={26} rx={13} fill={tint(accent, 22)} />
        <text x={167} y={30} textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          with respect to a reactant
        </text>
        <line x1={78} y1={330} x2={452} y2={330} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <line x1={78} y1={332} x2={78} y2={58} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <text x={30} y={200} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 30 200)">
          Concentration
        </text>
        <text x={430} y={356} fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Time</text>
        <path d="M 82 74 C 122 190, 172 258, 246 292 C 306 316, 380 326, 446 329" fill="none" stroke={tint(accent, 35)} strokeWidth={4.5} strokeLinecap="round" />
        {/* tangent at A + gradient triangle */}
        <line x1={168} y1={248} x2={318} y2={318} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <line x1={318} y1={248} x2={318} y2={318} stroke={FAINT} strokeWidth={2.2} strokeDasharray="5 5" />
        <line x1={168} y1={318} x2={318} y2={318} stroke={FAINT} strokeWidth={2.2} strokeDasharray="5 5" />
        <circle cx={243} cy={283} r={5.5} fill={INK} />
        <text x={222} y={266} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">A</text>
        <text x={326} y={288} fontSize="12" fontWeight="800" fontStyle="italic" fill={INK} fontFamily="var(--font-body)">y</text>
        <text x={238} y={314} fontSize="12" fontWeight="800" fontStyle="italic" fill={INK} fontFamily="var(--font-body)">x</text>
        <text x={400} y={140} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          gradient = zero when
        </text>
        <text x={400} y={156} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          the reaction is complete
        </text>
        {t3Arrow(404, 164, 428, 312, FAINT, 2.2)}
        <text x={130} y={130} fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          tangent at A → rate = y / x
        </text>
        {t3Arrow(196, 138, 230, 268, FAINT, 2.2)}
      </g>

      {/* ————— fig B · with respect to a product ————— */}
      <g>
        <rect x={562} y={12} width={210} height={26} rx={13} fill={tint(accent, 22)} />
        <text x={667} y={30} textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          with respect to a product
        </text>
        <line x1={578} y1={330} x2={952} y2={330} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <line x1={578} y1={332} x2={578} y2={58} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <text x={530} y={200} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 530 200)">
          Concentration
        </text>
        <text x={930} y={356} fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Time</text>
        <path d="M 582 328 C 622 254, 668 202, 726 172 C 786 142, 862 128, 948 124" fill="none" stroke={tint(accent, 35)} strokeWidth={4.5} strokeLinecap="round" />
        {/* initial-rate tangent */}
        <line x1={582} y1={328} x2={688} y2={168} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <text x={688} y={156} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          initial rate
        </text>
        {t3Arrow(672, 164, 660, 235, FAINT, 2.2)}
        {/* tangent at time t */}
        <line x1={726} y1={177} x2={852} y2={119} stroke={INK} strokeWidth={2.6} strokeLinecap="round" strokeDasharray="8 6" />
        <line x1={782} y1={330} x2={782} y2={155} stroke={FAINT} strokeWidth={2.2} strokeDasharray="5 5" />
        <text x={782} y={348} textAnchor="middle" fontSize="11.5" fontWeight="800" fontStyle="italic" fill={INK} fontFamily="var(--font-body)">t</text>
        <text x={788} y={106} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          rate at time, t
        </text>
        <text x={950} y={100} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          rate at end = zero
        </text>
        {t3Arrow(918, 108, 900, 122, FAINT, 2.2)}
      </g>
    </svg>
  );
}

/* ————— 9.4 · the Maxwell–Boltzmann distribution ————— */

function t9MbPath(): string {
  return "M 58 318 C 88 232, 126 116, 186 94 C 234 78, 276 148, 326 202 C 376 254, 446 292, 516 303";
}

export function FigMbCurve({ accent = "#FF6B6B" }: { accent?: string }) {
  const eaX = 326;
  return (
    <svg viewBox="0 0 560 360" className="w-full max-w-xl" role="img" aria-label="A Maxwell-Boltzmann distribution curve: number of molecules against molecular energy. The curve starts at the origin because no molecule has zero energy, peaks at the most probable energy, and trails off towards the axis without ever touching it. A dashed line marks the activation energy; the small shaded tail beyond it holds the few molecules with enough energy to react.">
      <line x1={58} y1={318} x2={530} y2={318} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={58} y1={320} x2={58} y2={40} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={300} y={348} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Molecular energy</text>
      <text x={24} y={180} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 24 180)">
        Number of molecules
      </text>
      {/* shaded reactive tail — the exact curve segment beyond Ea */}
      <path d={`M ${eaX} 202 C 376 254, 446 292, 516 303 L 516 318 L ${eaX} 318 Z`} fill={tint(accent, 30)} />
      <path d={t9MbPath()} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      {/* Ea */}
      <line x1={eaX} y1={318} x2={eaX} y2={192} stroke={INK} strokeWidth={2.2} strokeDasharray="6 5" />
      <text x={eaX - 10} y={206} textAnchor="end" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        Ea
      </text>
      {/* most probable energy */}
      <text x={186} y={56} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        most probable energy
      </text>
      {t3Arrow(186, 62, 186, 86, FAINT, 2.2)}
      {/* origin annotations */}
      <text x={96} y={266} fontSize="10" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        starts at the origin —
      </text>
      <text x={96} y={281} fontSize="10" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        no molecule has zero energy
      </text>
      <text x={430} y={240} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
        the few with E ≥ Ea
      </text>
      {t3Arrow(430, 248, 434, 282, FAINT, 2.2)}
      <text x={452} y={334} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        the tail approaches the axis but never touches it
      </text>
    </svg>
  );
}

/* ————— 9.4 · the same distribution at two temperatures ————— */

export function FigMbTemperature({ accent = "#FF6B6B" }: { accent?: string }) {
  const eaX = 410;
  return (
    <svg viewBox="0 0 560 360" className="w-full max-w-xl" role="img" aria-label="Two Maxwell-Boltzmann curves at temperatures T one and T two, where T two is higher. The T two curve is broader and flatter with its peak shifted to the right; the area under both curves is the same. Beyond the activation energy line the shaded wedge between the curves is the extra molecules that now have sufficient energy to react.">
      <line x1={58} y1={318} x2={530} y2={318} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={58} y1={320} x2={58} y2={40} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={300} y={348} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Molecular energy</text>
      <text x={24} y={180} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 24 180)">
        Number of molecules
      </text>
      <rect x={196} y={14} width={168} height={26} rx={13} fill={tint(accent, 22)} />
      <text x={280} y={32} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        TEMPERATURE T₂ &gt; T₁
      </text>
      {/* T2 — hot: broader, flatter, peak right */}
      <path d="M 58 318 C 108 288, 178 216, 238 178 C 280 152, 316 156, 356 186 C 406 224, 474 282, 528 306" fill="none" stroke={INK} strokeWidth={3.6} strokeLinecap="round" opacity={0.55} />
      {/* T1 — cooler: tall, peak left */}
      <path d="M 58 318 C 86 234, 124 120, 182 100 C 228 86, 268 158, 318 214 C 366 266, 442 300, 526 310" fill="none" stroke={accent} strokeWidth={4.2} strokeLinecap="round" />
      <text x={162} y={84} fontSize="14" fontWeight="800" fill={accent} fontFamily="var(--font-body)">T₁</text>
      <text x={330} y={148} fontSize="14" fontWeight="800" fill={INK} fontFamily="var(--font-body)" opacity={0.65}>T₂</text>
      {/* Ea */}
      <line x1={eaX} y1={318} x2={eaX} y2={208} stroke={INK} strokeWidth={2.2} strokeDasharray="6 5" />
      <text x={eaX - 10} y={222} textAnchor="end" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Ea</text>
      {/* the extra catch beyond Ea — exactly between the two curves */}
      <path d="M 408.5 226.9 C 448.1 257.7, 491.3 289.7, 528 306 L 526 310 C 484.4 305.1, 444.8 294.3, 409.6 278.3 Z" fill={tint(accent, 45)} />
      <text x={430} y={116} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
        extra molecules with enough
      </text>
      <text x={430} y={132} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
        energy to overcome the barrier
      </text>
      {t3Arrow(436, 140, 452, 252, FAINT, 2.2)}
    </svg>
  );
}

/* ————— 9.6 · catalysed vs uncatalysed profiles ————— */

export function FigCatalystProfile({ accent = "#FF6B6B" }: { accent?: string }) {
  const mint = "#12B886";
  return (
    <svg viewBox="0 0 960 400" className="w-full" role="img" aria-label="Two reaction profile diagrams. Left: the same exothermic reaction with and without a catalyst — both routes start at the reactants and end at the products, but the catalysed hump peaks lower, so its activation energy is smaller. Right: a catalysed route that forms an intermediate — two smaller humps with a dip between them, one hump per step of the reaction.">
      <line x1={480} y1={30} x2={480} y2={380} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— left · one hump, two heights ————— */}
      <g>
        <text x={240} y={26} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
          the catalysed route clears a lower Eₐ
        </text>
        <line x1={64} y1={344} x2={438} y2={344} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <line x1={64} y1={346} x2={64} y2={64} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <text x={30} y={200} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 30 200)">
          Energy
        </text>
        <text x={250} y={372} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
          progress of reaction
        </text>
        <line x1={76} y1={254} x2={170} y2={254} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <text x={120} y={240} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
        <line x1={400} y1={324} x2={438} y2={324} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <text x={400} y={310} textAnchor="end" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
        {/* uncatalysed */}
        <path d="M 170 254 C 200 112, 222 96, 246 96 C 272 96, 302 222, 362 294 C 384 316, 398 322, 416 324" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
        {/* catalysed */}
        <path d="M 170 254 C 220 206, 262 164, 330 164 C 372 164, 398 272, 420 324" fill="none" stroke={accent} strokeWidth={4.4} strokeLinecap="round" />
        {t9Gauge(246, 100, 250, mint)}
        <text x={246} y={80} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={mint} fontFamily="var(--font-body)">
          Ea without catalyst
        </text>
        {t9Gauge(330, 168, 250, accent)}
        <text x={338} y={144} fontSize="10.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">
          Ea with catalyst
        </text>
        {t9Gauge(210, 258, 320, "#FF6B6B", 2.6)}
        <text x={222} y={294} fontSize="11" fontWeight="800" fill="#FF6B6B" fontFamily="var(--font-body)">ΔH</text>
      </g>

      {/* ————— right · two humps + intermediate ————— */}
      <g>
        <text x={720} y={26} textAnchor="middle" fontSize="12" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
          an intermediate splits the climb in two
        </text>
        <line x1={544} y1={344} x2={918} y2={344} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <line x1={544} y1={346} x2={544} y2={64} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <text x={510} y={200} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 510 200)">
          Enthalpy, H
        </text>
        <text x={730} y={372} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
          progress of reaction
        </text>
        <line x1={556} y1={254} x2={650} y2={254} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <text x={600} y={240} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
        <line x1={880} y1={324} x2={918} y2={324} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <text x={914} y={310} textAnchor="end" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
        <path d="M 650 254 C 668 158, 686 140, 706 140 C 726 140, 736 210, 756 210 C 776 210, 786 160, 806 160 C 830 160, 858 292, 902 324" fill="none" stroke={accent} strokeWidth={4.4} strokeLinecap="round" />
        <text x={756} y={252} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
          intermediate
        </text>
        {t3Arrow(756, 240, 756, 218, INK, 2.4)}
        <text x={706} y={122} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          step 1
        </text>
        <text x={806} y={142} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          step 2
        </text>
        <text x={585} y={108} textAnchor="middle" fontSize="10" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          e.g. S₂O₈²⁻ + 2I⁻ with an Fe²⁺ catalyst
        </text>
      </g>
    </svg>
  );
}

/* ————— 9.7 · adsorption → reaction → desorption ————— */

export function FigHetCatalyst({ accent = "#FF6B6B" }: { accent?: string }) {
  const stage = (cx: number, n: string, t: string) => (
    <g>
      <rect x={cx - 82} y={22} width={164} height={28} rx={14} fill={tint(accent, 24)} />
      <text x={cx} y={41} textAnchor="middle" fontSize="11.5" fontWeight="800" letterSpacing="0.5" fill={INK} fontFamily="var(--font-body)">
        {n} · {t}
      </text>
    </g>
  );
  const caption = (cx: number, y: number, lines: string[]) =>
    lines.map((t, i) => (
      <text key={i} x={cx} y={y + i * 15} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        {t}
      </text>
    ));
  const h2 = (x: number, y: number) => (
    <g>
      <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={INK} strokeWidth={2.2} />
      {t9Atom(x - 7, y, "H", false, 7)}
      {t9Atom(x + 7, y, "H", false, 7)}
    </g>
  );
  /* ethene lying flat: two carbons double-bonded, two hydrogens each */
  const c2h4 = (x: number, y: number) => (
    <g>
      <line x1={x - 11} y1={y - 2} x2={x + 11} y2={y - 2} stroke={INK} strokeWidth={2.2} />
      <line x1={x - 11} y1={y + 2.5} x2={x + 11} y2={y + 2.5} stroke={INK} strokeWidth={2.2} />
      <line x1={x - 11} y1={y} x2={x - 26} y2={y} stroke={INK} strokeWidth={2} />
      <line x1={x + 11} y1={y} x2={x + 26} y2={y} stroke={INK} strokeWidth={2} />
      {t9Atom(x - 26, y, "H", false, 6.5)}
      {t9Atom(x + 26, y, "H", false, 6.5)}
      {t9Atom(x - 11, y, "C", true, 8)}
      {t9Atom(x + 11, y, "C", true, 8)}
    </g>
  );
  /* ethyl intermediate: ethene plus one extra H hanging off the left carbon */
  const c2h5 = (x: number, y: number) => (
    <g>
      <line x1={x - 11} y1={y} x2={x + 11} y2={y} stroke={INK} strokeWidth={2.4} />
      <line x1={x - 11} y1={y} x2={x - 26} y2={y} stroke={INK} strokeWidth={2} />
      <line x1={x + 11} y1={y} x2={x + 26} y2={y} stroke={INK} strokeWidth={2} />
      <line x1={x - 11} y1={y} x2={x - 11} y2={y - 16} stroke={INK} strokeWidth={2} />
      {t9Atom(x - 26, y, "H", false, 6.5)}
      {t9Atom(x + 26, y, "H", false, 6.5)}
      {t9Atom(x - 11, y - 16, "H", false, 6.5)}
      {t9Atom(x - 11, y, "C", true, 8)}
      {t9Atom(x + 11, y, "C", true, 8)}
    </g>
  );
  /* ethane: single C—C with three H per carbon */
  const c2h6 = (x: number, y: number) => (
    <g>
      <line x1={x - 11} y1={y} x2={x + 11} y2={y} stroke={INK} strokeWidth={2.4} />
      {[
        [x - 11, y - 16], [x - 11, y + 16], [x - 27, y],
        [x + 11, y - 16], [x + 11, y + 16], [x + 27, y],
      ].map(([hx, hy], i) => (
        <g key={i}>
          <line x1={hx < x - 20 ? x - 11 : hx > x + 20 ? x + 11 : hx} y1={hy === y - 16 ? y - 5 : hy === y + 16 ? y + 5 : y} x2={hx > x - 20 && hx < x + 20 ? hx : hx + (hx < x ? 6 : -6)} y2={hy} stroke={INK} strokeWidth={1.8} />
          {t9Atom(hx, hy, "H", false, 6.5)}
        </g>
      ))}
      {t9Atom(x - 11, y, "C", true, 8)}
      {t9Atom(x + 11, y, "C", true, 8)}
    </g>
  );
  return (
    <svg viewBox="0 0 960 470" className="w-full" role="img" aria-label="How a heterogeneous catalyst works, in three stages on a metal surface. One, adsorption: hydrogen and ethene molecules adsorb onto active sites, forming weak bonds with surface metal atoms. Two, reaction: the hydrogen-hydrogen bond breaks and the hydrogen atoms migrate along the surface; one attaches to the adsorbed ethene making the C2H5 intermediate, and the second is about to attach. Three, desorption: the completed ethane molecule releases from the surface, leaving the active sites free to work again.">
      <line x1={320} y1={40} x2={320} y2={440} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />
      <line x1={640} y1={40} x2={640} y2={440} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— 1 · adsorption ————— */}
      <g>
        {stage(160, "1", "ADSORPTION")}
        {h2(232, 92)}
        {t3Arrow(232, 108, 226, 288, accent, 2.8)}
        {c2h4(110, 120)}
        {t3Arrow(110, 146, 108, 288, accent, 2.8)}
        {t9Surface(160, 316, 9)}
        <line x1={103} y1={300} x2={98} y2={308} stroke={accent} strokeWidth={2} strokeDasharray="3 3" />
        <line x1={226} y1={296} x2={222} y2={306} stroke={accent} strokeWidth={2} strokeDasharray="3 3" />
        {caption(160, 396, ["H₂ and C₂H₄ adsorb onto active sites —", "weak bonds form with the metal atoms"])}
      </g>

      {/* ————— 2 · reaction ————— */}
      <g>
        {stage(480, "2", "REACTION")}
        {t9Surface(480, 316, 9)}
        {c2h5(430, 296)}
        {t9Atom(560, 296, "H", false, 7)}
        {t3Arrow(548, 292, 470, 292, accent, 2.6)}
        <text x={560} y={278} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
          2nd H
        </text>
        {caption(480, 396, ["the H—H bond breaks; H atoms migrate", "one H joins C₂H₄ → the C₂H₅ intermediate,", "the second is about to attach"])}
      </g>

      {/* ————— 3 · desorption ————— */}
      <g>
        {stage(800, "3", "DESORPTION")}
        {t9Surface(800, 316, 9)}
        {c2h6(800, 130)}
        {t3Arrow(800, 292, 800, 172, accent, 3)}
        {caption(800, 396, ["ethane, C₂H₆, desorbs —", "the products leave the active", "sites free to work again"])}
      </g>

      <rect x={240} y={444} width={480} height={24} rx={12} fill="none" stroke={FAINT} strokeWidth={2} />
      <text x={480} y={460} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        adsorption → reaction → desorption — then the same active sites start over
      </text>
    </svg>
  );
}

/* ————— 9.8 · the Maxwell–Boltzmann curve with a catalyst ————— */

export function FigMbCatalyst({ accent = "#FF6B6B" }: { accent?: string }) {
  const eaCat = 300;
  const eaNo = 408;
  return (
    <svg viewBox="0 0 560 360" className="w-full max-w-xl" role="img" aria-label="A Maxwell-Boltzmann distribution curve with two activation energy lines. Without a catalyst the threshold sits far right and only the small tail beyond it can react. With a catalyst the threshold slides left; every molecule in the shaded wedge between the two lines now has sufficient energy, so the number of effective collisions increases and the rate rises.">
      <line x1={58} y1={318} x2={530} y2={318} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={58} y1={320} x2={58} y2={40} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={300} y={348} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Molecular energy</text>
      <text x={24} y={180} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 24 180)">
        Number of molecules
      </text>
      {/* the extra catch between the two thresholds — exact curve sub-segments */}
      <path d="M 299.7 171.9 C 308.3 182.1, 317 192.3, 326 202 C 349.6 226.5, 377.6 247.9, 407.9 264.8 L 407.9 318 L 299.7 318 Z" fill={tint(accent, 32)} />
      <path d={t9MbPath()} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={eaCat} y1={318} x2={eaCat} y2={168} stroke={accent} strokeWidth={2.4} strokeDasharray="6 5" />
      <line x1={eaNo} y1={318} x2={eaNo} y2={252} stroke={INK} strokeWidth={2.2} strokeDasharray="6 5" />
      <text x={eaCat - 10} y={152} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">
        Ea with catalyst
      </text>
      <text x={eaNo + 12} y={242} fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        Ea without
      </text>
      <text x={eaNo + 12} y={257} fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        catalyst
      </text>
      <text x={354} y={296} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        the extra particles
      </text>
      <text x={354} y={311} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">
        that can now react
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9B · Equilibria — the equilibrium story: establishment, the
   chromate see-saw, pressure & temperature shifts, the NO₂/N₂O₄
   conflict, and the two industrial compromise graphs
   ═══════════════════════════════════════════════════════════════ */

/* smooth path through data points (Catmull–Rom → cubic béziers) */
function t9Smooth(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/* the reversible harpoons, drawn — two stacked arrows, one each way */
function t9Harpoons({ x1, x2, y, gap = 13 }: { x1: number; x2: number; y: number; gap?: number }) {
  return (
    <g>
      {t3Arrow(x1, y - gap / 2, x2, y - gap / 2, INK, 3.4)}
      {t3Arrow(x2, y + gap / 2, x1, y + gap / 2, INK, 3.4)}
    </g>
  );
}

/* ————— 9.9 · the class note's fig A — how equilibrium is reached ————— */

export function FigEqDynamic({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 560 340" className="w-full max-w-xl" role="img" aria-label="Rate of reaction against time for a reversible reaction. The forward reaction starts fast and its rate falls as the reactants are used up. The backward reaction starts from zero rate because there is no product yet, and its rate climbs as products accumulate. The two curves meet, and from that moment both reactions continue at one common rate: dynamic equilibrium is established.">
      <line x1={60} y1={302} x2={528} y2={302} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={60} y1={304} x2={60} y2={40} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <text x={300} y={330} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Time</text>
      <text x={26} y={171} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 26 171)">
        Rate of reaction
      </text>
      {/* the common rate the two curves settle onto */}
      <line x1={230} y1={252} x2={505} y2={252} stroke={tint(accent, 45)} strokeWidth={2.2} strokeDasharray="6 6" />
      {/* forward — starts fast, falls as reactants thin out */}
      <path d="M 66 62 C 110 100, 158 176, 214 220 C 262 256, 330 252.4, 400 252.2 C 440 252.1, 480 252, 505 252" fill="none" stroke={accent} strokeWidth={4.4} strokeLinecap="round" />
      {/* backward — starts at zero, climbs as products pile up */}
      <path d="M 66 302 C 100 284, 140 268, 190 261 C 240 255.5, 310 252.6, 400 252.2 C 440 252.1, 480 252, 505 252" fill="none" stroke={INK} strokeWidth={3.8} strokeLinecap="round" opacity={0.72} />
      <text x={148} y={126} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">forward reaction</text>
      <text x={148} y={290} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)" opacity={0.72}>backward reaction</text>
      <text x={402} y={196} textAnchor="middle" fontSize="11" fontWeight="800" fill={accent} fontFamily="var(--font-body)">
        equilibrium established
      </text>
      <text x={402} y={211} textAnchor="middle" fontSize="10" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        forward rate = backward rate
      </text>
      {t3Arrow(402, 218, 384, 247, FAINT, 2.2)}
    </svg>
  );
}

/* ————— 9.10 · the chromate/dichromate see-saw ————— */

export function FigEqChromate({ accent = "#FF6B6B" }: { accent?: string }) {
  const YELLOW = "#F2C40F";
  const ORANGE = "#F76707";
  const tube = (cx: number, liquid: string) => (
    <g>
      <rect x={cx - 29} y={116} width={58} height={152} rx={27} fill={PAPER} stroke={INK} strokeWidth={2.6} />
      <rect x={cx - 24} y={166} width={48} height={97} rx={21} fill={liquid} opacity={0.9} />
    </g>
  );
  return (
    <svg viewBox="0 0 860 330" className="w-full" role="img" aria-label="The chromate and dichromate equilibrium as a see-saw. On the left, yellow chromate(VI) ions in solution; on the right, orange dichromate(VI) ions. Adding acid, hydrogen ions, pushes the position of equilibrium to the right and the solution turns orange. Adding alkali, hydroxide ions, pulls the position back to the left and the solution turns yellow again.">
      {/* top arc — acid pushes right */}
      <path d="M 208 92 C 330 38, 530 38, 652 92" fill="none" stroke={accent} strokeWidth={3.4} strokeLinecap="round" />
      <polygon points="657,95 640,79 636,96" fill={accent} />
      <text x={430} y={30} textAnchor="middle" fontSize="13" fontWeight="800" fill={accent} fontFamily="var(--font-body)">
        add acid (H⁺) — the position moves right
      </text>
      {/* bottom arc — alkali pulls left */}
      <path d="M 652 234 C 530 288, 330 288, 208 234" fill="none" stroke={INK} strokeWidth={3.4} strokeLinecap="round" opacity={0.65} />
      <polygon points="203,231 220,247 224,230" fill={INK} opacity={0.65} />
      <text x={430} y={313} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)" opacity={0.75}>
        add alkali (OH⁻) — the position moves left
      </text>
      {/* the two solutions */}
      {tube(122, YELLOW)}
      {tube(738, ORANGE)}
      {t9Harpoons({ x1: 330, x2: 530, y: 192, gap: 18 })}
      <text x={122} y={300} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">2CrO₄²⁻(aq)</text>
      <text x={122} y={318} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">chromate(VI) — YELLOW</text>
      <text x={738} y={300} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Cr₂O₇²⁻(aq)</text>
      <text x={738} y={318} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">dichromate(VI) — ORANGE</text>
    </svg>
  );
}

/* ————— 9.10 · ammonia at equilibrium against pressure ————— */

export function FigEqPressure({ accent = "#FF6B6B" }: { accent?: string }) {
  const x = (atm: number) => 60 + atm * 0.78;
  const y = (pct: number) => 322 - pct * 2.7;
  const pts: [number, number][] = [
    [x(0), y(0)],
    [x(80), y(42)],
    [x(160), y(62)],
    [x(240), y(74)],
    [x(330), y(82)],
    [x(430), y(87.5)],
    [x(520), y(90)],
    [x(600), y(91.5)],
  ];
  return (
    <svg viewBox="0 0 560 390" className="w-full max-w-xl" role="img" aria-label="Percentage of ammonia in the equilibrium mixture against pressure in atmospheres for the reaction between nitrogen and hydrogen. The curve rises steeply at first and then flattens: at high pressure the equilibrium mixture contains far more ammonia, because the equilibrium has shifted to the side with fewer moles of gas.">
      <line x1={60} y1={322} x2={528} y2={322} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={60} y1={324} x2={60} y2={52} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {[
        [0, 322],
        [50, 187],
        [100, 52],
      ].map(([v, ty]) => (
        <g key={v}>
          <line x1={52} y1={ty} x2={60} y2={ty} stroke={INK} strokeWidth={2} />
          <text x={46} y={ty + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      {[
        [0, 60],
        [300, 294],
        [600, 528],
      ].map(([v, tx]) => (
        <g key={v}>
          <line x1={tx} y1={322} x2={tx} y2={330} stroke={INK} strokeWidth={2} />
          <text x={tx} y={346} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      <text x={294} y={372} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Pressure/atm</text>
      <text x={20} y={187} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 20 187)">
        % of ammonia in equilibrium mixture
      </text>
      <path d={t9Smooth(pts)} fill="none" stroke={accent} strokeWidth={4.4} strokeLinecap="round" />
    </svg>
  );
}

/* ————— 9.10 · the ΔH direction map ————— */

export function FigEqTemperature({ accent = "#FF6B6B" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 560 240" className="w-full max-w-xl" role="img" aria-label="A reversible reaction drawn as two opposite arrows between reactants and products. The forward direction, reactants to products, is exothermic and releases energy, delta H negative. The backward direction, products to reactants, is endothermic and absorbs energy, delta H positive.">
      <rect x={40} y={94} width={134} height={52} rx={24} fill={tint(accent, 20)} />
      <text x={107} y={126} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Reactants</text>
      <rect x={386} y={94} width={134} height={52} rx={24} fill={tint(accent, 20)} />
      <text x={453} y={126} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Products</text>
      <g>
        {t3Arrow(214, 111, 346, 111, accent, 3.6)}
        <text x={280} y={92} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">ΔH = −ve</text>
        {t3Arrow(346, 143, 214, 143, INK, 3.6)}
        <text x={280} y={172} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)" opacity={0.72}>ΔH = +ve</text>
      </g>
      <text x={280} y={210} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
        forward = exothermic · backward = endothermic
      </text>
    </svg>
  );
}

/* ————— 9.10 · one disturbance, two predictions — the NO₂/N₂O₄ conflict ————— */

export function FigEqConflict({ accent = "#FF6B6B" }: { accent?: string }) {
  const BROWN = "#A8651C";
  const MINT = "#12B886";
  const steam = (cx: number, y: number) => (
    <path
      d={`M ${cx - 10} ${y} c 4 -7, -4 -12, 0 -19 c 4 -7, -4 -12, 0 -19`}
      fill="none"
      stroke={SOFT}
      strokeWidth={2.2}
      strokeLinecap="round"
      opacity={0.7}
    />
  );
  return (
    <svg viewBox="0 0 860 360" className="w-full" role="img" aria-label="A sealed tube containing the brown nitrogen dioxide and colourless dinitrogen tetroxide equilibrium, stood in a beaker of hot water. Both the temperature and the pressure of the gas rise, so two predictions compete: the temperature rise predicts the equilibrium shifts left producing more brown nitrogen dioxide, while the pressure rise predicts a shift right towards fewer moles. In practice the mixture becomes darker, so the temperature effect must be the greater.">
      <line x1={430} y1={30} x2={430} y2={340} stroke={FAINT} strokeWidth="2" strokeDasharray="4 8" />

      {/* ————— left · the scene ————— */}
      <g>
        <text x={160} y={44} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
          the sealed tube goes into hot water —
        </text>
        <text x={160} y={62} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
          temperature AND pressure both rise
        </text>
        {steam(120, 140)}
        {steam(160, 132)}
        {steam(200, 140)}
        {/* beaker of hot water */}
        <rect x={66} y={158} width={188} height={152} rx={14} fill="none" stroke={INK} strokeWidth={3} />
        <rect x={72} y={200} width={176} height={104} rx={10} fill={tint("#FF922B", 18)} />
        <path d="M 78 200 q 14 -9, 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0" fill="none" stroke={tint("#FF922B", 45)} strokeWidth={2.4} />
        <text x={160} y={262} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">hot water</text>
        {/* sealed tube with the brown gas */}
        <rect x={136} y={92} width={48} height={176} rx={13} fill={PAPER} stroke={INK} strokeWidth={2.8} />
        <rect x={141} y={97} width={38} height={166} rx={9} fill={BROWN} opacity={0.3} />
        <text x={160} y={338} textAnchor="middle" fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">2NO₂(g) ⇌ N₂O₄(g) — sealed</text>
      </g>

      {/* ————— right · two predictions, one observation ————— */}
      <g>
        <text x={648} y={52} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={SOFT} fontFamily="var(--font-body)">
          two predictions, one observation
        </text>
        <rect x={470} y={72} width={356} height={66} rx={18} fill={tint(accent, 16)} />
        <text x={648} y={98} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Temperature rises…</text>
        <text x={648} y={120} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">predicts a shift LEFT — more brown NO₂</text>
        {t3Arrow(648, 142, 648, 158, FAINT, 2.2)}
        <rect x={470} y={162} width={356} height={66} rx={18} fill={FAINT} opacity={0.22} />
        <text x={648} y={188} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Pressure rises…</text>
        <text x={648} y={210} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">predicts a shift RIGHT — fewer moles, colourless N₂O₄</text>
        {t3Arrow(648, 232, 648, 248, FAINT, 2.2)}
        <rect x={470} y={252} width={356} height={76} rx={18} fill={tint(MINT, 18)} />
        <text x={648} y={280} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Observed: the mixture becomes DARKER</text>
        <text x={648} y={302} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">the temperature effect wins — the position moved LEFT,</text>
        <text x={648} y={318} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">producing more NO₂</text>
      </g>
    </svg>
  );
}

/* ————— 9.11 · Haber process — equilibrium yield against pressure ————— */

export function FigEqHaber({ accent = "#FF6B6B" }: { accent?: string }) {
  const x = (atm: number) => 74 + atm * 1.6;
  const y = (pct: number) => 380 - pct * (320 / 70);
  const series: { t: string; data: [number, number][]; op: number }[] = [
    { t: "350", data: [[0, 0], [50, 26], [100, 40], [150, 50], [200, 57], [250, 61.5], [300, 65], [350, 68.5], [400, 72]], op: 0.85 },
    { t: "400", data: [[0, 0], [50, 20], [100, 31], [150, 39], [200, 44.5], [250, 48.5], [300, 51.5], [350, 54], [400, 56]], op: 0.68 },
    { t: "500", data: [[0, 0], [50, 11], [100, 17], [150, 21], [200, 24], [250, 26], [300, 27.5], [350, 29], [400, 30.5]], op: 0.52 },
    { t: "550", data: [[0, 0], [50, 7.5], [100, 12], [150, 15], [200, 17.5], [250, 19.5], [300, 21], [350, 22], [400, 23]], op: 0.4 },
    { t: "600", data: [[0, 0], [50, 5.5], [100, 8.5], [150, 11], [200, 13], [250, 14.5], [300, 15.5], [350, 16.5], [400, 17.5]], op: 0.3 },
  ];
  const t450: [number, number][] = [[0, 0], [50, 15.5], [100, 24], [150, 29.5], [200, 33], [250, 35.5], [300, 37.5], [350, 39.5], [400, 41]];
  return (
    <svg viewBox="0 0 780 460" className="w-full" role="img" aria-label="The equilibrium yield of ammonia against pressure at six temperatures, from 350 degrees to 600 degrees Celsius. At every pressure the cooler curves sit higher, so the highest yield belongs to low temperature and high pressure. Dashed guide lines mark the working compromise: at 250 atmospheres the 450 degrees Celsius curve reads about 35 percent ammonia.">
      <line x1={74} y1={380} x2={718} y2={380} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={74} y1={382} x2={74} y2={48} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {[0, 10, 20, 30, 40, 50, 60, 70].map((v) => (
        <g key={v}>
          <line x1={66} y1={y(v)} x2={74} y2={y(v)} stroke={INK} strokeWidth={2} />
          <text x={60} y={y(v) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      {[0, 100, 200, 300, 400].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={380} x2={x(v)} y2={388} stroke={INK} strokeWidth={2} />
          <text x={x(v)} y={404} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      <text x={396} y={430} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Pressure/atm</text>
      <text x={22} y={214} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 22 214)">
        Percentage yield of ammonia
      </text>
      {/* the compromise guides — 250 atm on the 450 °C curve */}
      <line x1={x(250)} y1={380} x2={x(250)} y2={y(35.5)} stroke={FAINT} strokeWidth={2.2} strokeDasharray="6 5" />
      <line x1={74} y1={y(35.5)} x2={x(250)} y2={y(35.5)} stroke={FAINT} strokeWidth={2.2} strokeDasharray="6 5" />
      {series.map((s) => (
        <g key={s.t}>
          <path
            d={t9Smooth(s.data.map(([a, p]) => [x(a), y(p)]))}
            fill="none"
            stroke={INK}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={s.op}
          />
          <text x={x(400) + 10} y={y(s.data[s.data.length - 1][1]) + 4} fontSize="11" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">
            {s.t} °C
          </text>
        </g>
      ))}
      <path d={t9Smooth(t450.map(([a, p]) => [x(a), y(p)]))} fill="none" stroke={accent} strokeWidth={4.6} strokeLinecap="round" />
      <text x={x(400) + 10} y={y(41) + 4} fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">450 °C</text>
      <circle cx={x(250)} cy={y(35.5)} r={5} fill={accent} stroke={PAPER} strokeWidth={2} />
      <text x={x(250)} y={y(35.5) - 12} textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="var(--font-body)">250 atm</text>
    </svg>
  );
}

/* ————— 9.11 · Contact process — SO₃ yield against temperature ————— */

export function FigEqContact({ accent = "#FF6B6B" }: { accent?: string }) {
  const x = (t: number) => 70 + (t - 350) * (460 / 300);
  const y = (pct: number) => 330 - (pct - 80) * 13.7;
  const pts: [number, number][] = [
    [x(350), y(99.6)],
    [x(400), y(98.8)],
    [x(450), y(97)],
    [x(500), y(93.8)],
    [x(550), y(87.5)],
    [x(600), y(82.8)],
    [x(650), y(80.6)],
  ];
  return (
    <svg viewBox="0 0 560 400" className="w-full max-w-xl" role="img" aria-label="The percentage yield of sulfur trioxide against temperature at one atmosphere pressure for the Contact process. The yield is almost complete at 350 degrees Celsius and falls as temperature rises. Dashed guides mark the working point: at 450 degrees Celsius the yield still reads 97 percent, which is why the process runs there.">
      <line x1={70} y1={330} x2={530} y2={330} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={70} y1={332} x2={70} y2={44} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {[80, 85, 90, 95, 100].map((v) => (
        <g key={v}>
          <line x1={62} y1={y(v)} x2={70} y2={y(v)} stroke={INK} strokeWidth={2} />
          <text x={56} y={y(v) + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      {[350, 450, 550, 650].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={330} x2={x(v)} y2={338} stroke={INK} strokeWidth={2} />
          <text x={x(v)} y={354} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">{v}</text>
        </g>
      ))}
      <text x={300} y={382} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">Temperature/°C</text>
      <text x={20} y={187} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 20 187)">
        % yield of SO₃
      </text>
      {/* the 97% at 450 °C reading */}
      <line x1={70} y1={y(97)} x2={x(450)} y2={y(97)} stroke={FAINT} strokeWidth={2.2} strokeDasharray="6 5" />
      <line x1={x(450)} y1={330} x2={x(450)} y2={y(97)} stroke={FAINT} strokeWidth={2.2} strokeDasharray="6 5" />
      <path d={t9Smooth(pts)} fill="none" stroke={accent} strokeWidth={4.4} strokeLinecap="round" />
      <circle cx={x(450)} cy={y(97)} r={5} fill={accent} stroke={PAPER} strokeWidth={2} />
      <text x={x(450) + 14} y={y(97) - 12} fontSize="11.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">97% at 450 °C</text>
    </svg>
  );
}
