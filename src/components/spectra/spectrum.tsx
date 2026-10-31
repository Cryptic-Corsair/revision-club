"use client";

import { useId } from "react";
import type { SpectralLine, Unit } from "@/lib/spectra/types";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · spectrum instruments
   nmToRgb: CIE-style approximation of the visible spectrum
   ═══════════════════════════════════════════════════════════════ */

export const NM_MIN = 380;
export const NM_MAX = 720;

export function nmToRgb(nm: number): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;

  if (nm >= 380 && nm < 440) {
    r = -(nm - 440) / 60;
    b = 1;
  } else if (nm < 490) {
    g = (nm - 440) / 50;
    b = 1;
  } else if (nm < 510) {
    g = 1;
    b = -(nm - 510) / 20;
  } else if (nm < 580) {
    r = (nm - 510) / 70;
    g = 1;
  } else if (nm < 645) {
    r = 1;
    g = -(nm - 645) / 65;
  } else if (nm <= 780) {
    r = 1;
  } else {
    return [0, 0, 0];
  }

  let f = 1;
  if (nm < 420) f = 0.35 + 0.65 * ((nm - 380) / 40);
  else if (nm > 700) f = 0.55 + 0.45 * ((780 - nm) / 80);

  const gamma = 0.85;
  const c = (v: number) =>
    Math.round(255 * Math.pow(Math.min(1, Math.max(0, v)) * f, gamma));
  return [c(r), c(g), c(b)];
}

export function nmColor(nm: number): string {
  const [r, g, b] = nmToRgb(nm);
  return `rgb(${r},${g},${b})`;
}

export const nmX = (nm: number, w: number) =>
  ((nm - NM_MIN) / (NM_MAX - NM_MIN)) * w;

/* ————— shared bits ————— */

function GlowFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="2.4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

function WavelengthTicks({
  w,
  h,
  bandTop,
  bandH,
}: {
  w: number;
  h: number;
  bandTop: number;
  bandH: number;
}) {
  const ticks = [400, 450, 500, 550, 600, 650, 700];
  return (
    <g aria-hidden>
      {ticks.map((nm) => {
        const x = nmX(nm, w);
        return (
          <g key={nm}>
            <line
              x1={x}
              y1={bandTop + bandH}
              x2={x}
              y2={bandTop + bandH + 5}
              stroke="var(--ink-3)"
              strokeWidth="1"
            />
            <text
              x={x}
              y={bandTop + bandH + 16}
              fill="var(--ink-3)"
              fontSize="9"
              fontFamily="var(--font-plex)"
              textAnchor="middle"
            >
              {nm}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ————— the hero: the whole course on one wavelength axis ————— */

export function SpectrumHero({
  units,
  onOpenUnit,
}: {
  units: Unit[];
  onOpenUnit: (code: string) => void;
}) {
  const uid = useId();
  const W = 720;
  const BAND_Y = 34;
  const BAND_H = 58;
  const H = 128;

  const rects: number[] = [];
  for (let nm = NM_MIN; nm <= NM_MAX; nm += 2) rects.push(nm);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="group"
      aria-label="The visible spectrum with the six units' flame lines — click a line to open its unit"
    >
      <defs>
        <GlowFilter id={`${uid}-glow`} />
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y={BAND_Y} width={W} height={BAND_H} rx="3" />
        </clipPath>
      </defs>

      {/* faint grid */}
      <g opacity="0.16">
        {Array.from({ length: 14 }, (_, i) => NM_MIN + i * 25).map((nm) => (
          <line
            key={nm}
            x1={nmX(nm, W)}
            y1={BAND_Y}
            x2={nmX(nm, W)}
            y2={BAND_Y + BAND_H}
            stroke="var(--line)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* the continuum */}
      <g clipPath={`url(#${uid}-clip)`} opacity="0.9">
        {rects.map((nm) => (
          <rect
            key={nm}
            x={nmX(nm, W)}
            y={BAND_Y}
            width={2.4}
            height={BAND_H}
            fill={nmColor(nm)}
          />
        ))}
      </g>

      {/* frame */}
      <rect
        x="0"
        y={BAND_Y}
        width={W}
        height={BAND_H}
        rx="3"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
      />

      {/* the six flame lines */}
      {units.map((u, i) => {
        const x = nmX(u.element.nm, W);
        return (
          <g
            key={u.code}
            className="spec-link"
            role="button"
            tabIndex={0}
            aria-label={`${u.code} — ${u.element.name}, ${u.element.nm} nanometres. Open unit.`}
            style={{ outline: "none" }}
            onClick={() => onOpenUnit(u.code)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenUnit(u.code);
              }
            }}
          >
            <rect
              x={x - 14}
              y={4}
              width="28"
              height={BAND_Y + BAND_H - 4}
              fill="transparent"
            />
            <line
              className="spec-line"
              x1={x}
              y1={BAND_Y - 6}
              x2={x}
              y2={BAND_Y + BAND_H + 6}
              stroke={u.color}
              strokeWidth={2.6}
              strokeLinecap="round"
              filter={`url(#${uid}-glow)`}
              style={{ "--fd": `${i * 0.9}s` } as React.CSSProperties}
            />
            <text
              className="spec-code flame-line"
              x={x}
              y={14}
              fill="var(--ink-2)"
              fontSize="9.5"
              fontFamily="var(--font-plex)"
              letterSpacing="1.5"
              textAnchor="middle"
              style={{ "--fd": `${i * 0.9}s` } as React.CSSProperties}
            >
              {u.code.slice(3)}
            </text>
            <text
              x={x}
              y={H - 8}
              fill="var(--ink-3)"
              fontSize="9"
              fontFamily="var(--font-plex)"
              textAnchor="middle"
            >
              {u.element.symbol} {u.element.nm}
            </text>
          </g>
        );
      })}

      <WavelengthTicks w={W} h={H} bandTop={BAND_Y} bandH={BAND_H} />
    </svg>
  );
}

/* ————— a unit's own spectrum strip ————— */

export function SpectrumStrip({
  unit,
  height = 92,
}: {
  unit: Unit;
  height?: number;
}) {
  const uid = useId();
  const W = 640;
  const BAND_Y = 18;
  const BAND_H = 42;
  const H = height;

  const rects: number[] = [];
  for (let nm = NM_MIN; nm <= NM_MAX; nm += 2) rects.push(nm);

  const width = (rel: SpectralLine["rel"]) =>
    rel === 3 ? 3 : rel === 2 ? 2 : 1.3;
  const op = (rel: SpectralLine["rel"]) =>
    rel === 3 ? 1 : rel === 2 ? 0.9 : 0.75;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={`Emission spectrum of ${unit.element.name} — dominant line ${unit.element.nm} nm`}
    >
      <defs>
        <GlowFilter id={`${uid}-glow`} />
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y={BAND_Y} width={W} height={BAND_H} rx="2" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}-clip)`} opacity="0.85">
        {rects.map((nm) => (
          <rect
            key={nm}
            x={nmX(nm, W)}
            y={BAND_Y}
            width={2.4}
            height={BAND_H}
            fill={nmColor(nm)}
          />
        ))}
      </g>

      <rect
        x="0"
        y={BAND_Y}
        width={W}
        height={BAND_H}
        rx="2"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
      />

      {(() => {
        const sorted = [...unit.lines].sort((a, b) => a.nm - b.nm);
        let lastLabeled = -999;
        return sorted.map((ln) => {
          const x = nmX(ln.nm, W);
          const inBand = ln.nm >= NM_MIN + 8 && ln.nm <= NM_MAX - 8;
          // avoid label collisions: only label when clearly separated
          const showLabel = inBand && ln.nm - lastLabeled > 24;
          if (showLabel) lastLabeled = ln.nm;
          return (
            <g key={ln.nm}>
              <line
                x1={x}
                y1={BAND_Y - 8}
                x2={x}
                y2={BAND_Y + BAND_H + 8}
                stroke={unit.color}
                strokeWidth={width(ln.rel)}
                strokeLinecap="round"
                opacity={op(ln.rel)}
                filter={`url(#${uid}-glow)`}
                className="flame-line"
              />
              {showLabel && (
                <text
                  x={x}
                  y={10}
                  fill="var(--ink-3)"
                  fontSize="8.5"
                  fontFamily="var(--font-plex)"
                  textAnchor="middle"
                >
                  {ln.nm}
                </text>
              )}
            </g>
          );
        });
      })()}

      <WavelengthTicks w={W} h={H} bandTop={BAND_Y} bandH={BAND_H} />
    </svg>
  );
}

/* ————— miniature strip for unit cards ————— */

export function MiniSpectrum({ unit }: { unit: Unit }) {
  return (
    <div
      className="relative h-[6px] w-full overflow-hidden rounded-full"
      aria-hidden
    >
      <div className="spectrum-rule absolute inset-0 opacity-45" />
      {unit.lines.map((ln) => (
        <span
          key={ln.nm}
          className="absolute top-0 h-full rounded-full"
          style={{
            left: `${((ln.nm - NM_MIN) / (NM_MAX - NM_MIN)) * 100}%`,
            width: ln.rel === 3 ? 3 : 2,
            background: unit.color,
            boxShadow: `0 0 6px ${unit.color}`,
          }}
        />
      ))}
    </div>
  );
}
