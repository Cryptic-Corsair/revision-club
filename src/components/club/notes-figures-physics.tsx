"use client";

import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   WPH11 · physics figures — the mechanics and materials diagrams
   for the physics notes, in the same candy-styled SVG language as
   the chemistry library (notes-figures.tsx). Theme-aware inks ride
   the mood tokens; motion classes follow the §16 toolkit: curves
   draw on once, nothing loops.
   ═══════════════════════════════════════════════════════════════ */

const INK = "var(--color-ink)";
const SOFT = "var(--color-ink-soft)";
const FAINT = "color-mix(in oklab, var(--color-ink) 30%, transparent)";

function Frame({
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
  const pad = { l: 52, r: 16, t: 18, b: 38 };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img">
      <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      {xLabel && (
        <text x={(w + pad.l) / 2} y={h - 8} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text x={13} y={(h - pad.b + pad.t) / 2} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform={`rotate(-90 13 ${(h - pad.b + pad.t) / 2})`}>
          {yLabel}
        </text>
      )}
      {children}
    </svg>
  );
}

function Arrow({ id = "" }: { id?: string }) {
  return (
    <defs>
      <marker id={id || "pharrow"} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} />
      </marker>
    </defs>
  );
}

/* ————— 2 · the three motion graphs of one journey ————— */

export function FigPhMotionGraphs({ accent = "#339AF0" }: { accent?: string }) {
  const g = { w: 230, h: 190 };
  return (
    <svg viewBox="0 0 740 240" className="fig-live w-full" role="img" aria-label="Displacement-time, velocity-time and acceleration-time graphs for uniform acceleration from rest">
      <Arrow id="phmg-a" />
      {[0, 1, 2].map((i) => {
        const ox = 16 + i * 246;
        return (
          <g key={i}>
            <line x1={ox + 34} y1={196} x2={ox + 214} y2={196} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <line x1={ox + 34} y1={186} x2={ox + 34} y2={36} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <text x={ox + 124} y={222} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">time</text>
            <text x={ox + 8} y={116} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)" transform={`rotate(-90 ${ox + 8} 116)`}>
              {i === 0 ? "displacement" : i === 1 ? "velocity" : "acceleration"}
            </text>
          </g>
        );
      })}
      <path d="M 50 196 Q 130 196 214 44" fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" className="fig-draw" pathLength={1} />
      <text x={124} y={30} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">curve steepens — speeding up</text>
      <line x1={296} y1={196} x2={476} y2={62} stroke={accent} strokeWidth="3.4" strokeLinecap="round" className="fig-draw" pathLength={1} />
      <text x={386} y={46} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">constant gradient = a</text>
      <line x1={542} y1={130} x2={722} y2={130} stroke={accent} strokeWidth="3.4" strokeLinecap="round" className="fig-draw" pathLength={1} />
      <text x={632} y={116} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">constant a — flat line</text>
      {[1, 2].map((i) =>
        [60, 130].map((t) => (
          <line key={`${i}-${t}`} x1={16 + i * 246 + t} y1={190} x2={16 + i * 246 + t} y2={60} stroke={FAINT} strokeWidth="1.6" strokeDasharray="4 6" />
        )),
      )}
    </svg>
  );
}

/* ————— 7 · the projectile and its two components ————— */

export function FigPhProjectile({ accent = "#339AF0" }: { accent?: string }) {
  const path = "M 40 320 Q 240 20 480 320";
  return (
    <svg viewBox="0 0 560 380" className="fig-live w-full" role="img" aria-label="Projectile launched at 40 degrees: horizontal velocity constant, vertical velocity changing by g each second">
      <Arrow id="php-a" />
      <line x1={30} y1={340} x2={520} y2={340} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <line x1={40} y1={348} x2={40} y2={20} stroke={FAINT} strokeWidth="1.8" strokeDasharray="4 7" />
      <path d={path} fill="none" stroke={accent} strokeWidth="3.6" strokeLinecap="round" className="fig-draw" pathLength={1} />
      {[
        { x: 85, y: 240, vx: 60, vy: -60 },
        { x: 165, y: 130, vx: 60, vy: -18 },
        { x: 262, y: 95, vx: 60, vy: 0 },
        { x: 360, y: 130, vx: 60, vy: 24 },
        { x: 442, y: 240, vx: 60, vy: 62 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="6" fill={INK} />
          <line x1={p.x} y1={p.y} x2={p.x + p.vx} y2={p.y} stroke={SOFT} strokeWidth="2.6" markerEnd="url(#php-a)" />
          <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + p.vy} stroke={accent} strokeWidth="2.6" markerEnd="url(#php-a)" />
        </g>
      ))}
      <text x={320} y={58} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">horizontal velocity — never changes</text>
      <text x={110} y={70} fontSize="12" fontWeight="700" fill={accent} fontFamily="var(--font-body)">vertical velocity: −g every second</text>
      <text x={497} y={360} textAnchor="end" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">launch at 40°: u sin θ up, u cos θ along</text>
    </svg>
  );
}

/* ————— 5/6 · resolving and combining ————— */

export function FigPhVectors({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 760 300" className="fig-live w-full" role="img" aria-label="Resolving a force into components, and adding two forces nose-to-tail to find a resultant">
      <Arrow id="phv-a" />
      <line x1={70} y1={220} x2={290} y2={220} stroke={INK} strokeWidth="2.4" markerEnd="url(#phv-a)" />
      <line x1={70} y1={220} x2={70} y2={70} stroke={INK} strokeWidth="2.4" markerEnd="url(#phv-a)" />
      <line x1={70} y1={220} x2={244} y2={96} stroke={accent} strokeWidth="3.6" strokeLinecap="round" markerEnd="url(#phv-a)" />
      <line x1={244} y1={96} x2={244} y2={220} stroke={accent} strokeWidth="2.2" strokeDasharray="6 6" className="fig-flow" />
      <line x1={70} y1={220} x2={244} y2={220} stroke={accent} strokeWidth="2.2" strokeDasharray="6 6" />
      <text x={258} y={212} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">F cos 35°</text>
      <text x={82} y={150} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">F sin 35°</text>
      <text x={150} y={140} fontSize="13" fontWeight="800" fill={INK} fontFamily="var(--font-body)">F</text>
      <path d="M 106 220 A 36 36 0 0 0 100 194" fill="none" stroke={SOFT} strokeWidth="2" />
      <text x={114} y={202} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">35°</text>
      <text x={180} y={262} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">resolve: one vector, two components</text>
      <line x1={450} y1={210} x2={580} y2={210} stroke={INK} strokeWidth="3" markerEnd="url(#phv-a)" />
      <text x={492} y={200} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">X</text>
      <line x1={580} y1={210} x2={650} y2={100} stroke={INK} strokeWidth="3" markerEnd="url(#phv-a)" />
      <text x={618} y={170} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">Y</text>
      <line x1={450} y1={210} x2={650} y2={100} stroke={accent} strokeWidth="3.4" markerEnd="url(#phv-a)" className="fig-appear" />
      <text x={522} y={128} fontSize="12.5" fontWeight="800" fill={accent} fontFamily="var(--font-body)">resultant</text>
      <text x={560} y={262} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">combine: tip-to-tail, then close</text>
    </svg>
  );
}

/* ————— 8 · the free-body diagram on a slope ————— */

export function FigPhFreebody({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 560 330" className="w-full" role="img" aria-label="Free-body diagram of a block on a slope: weight from the centre of gravity, normal contact force perpendicular to the slope, friction along it">
      <Arrow id="phf-a" />
      <path d="M 40 290 L 460 130 L 460 290 Z" fill="color-mix(in oklab, var(--color-ink) 8%, transparent)" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <g transform="rotate(-20 250 210)">
        <rect x={200} y={175} width={100} height={70} rx={12} fill="color-mix(in oklab, var(--color-paper) 60%, transparent)" stroke={INK} strokeWidth="2.8" />
      </g>
      <circle cx={250} cy={210} r="5" fill={INK} />
      <line x1={250} y1={210} x2={250} y2={70} stroke={accent} strokeWidth="3.2" markerEnd="url(#phf-a)" />
      <text x={260} y={86} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">weight, W = mg — from the centre of gravity</text>
      <line x1={250} y1={210} x2={352} y2={172} stroke={INK} strokeWidth="3" markerEnd="url(#phf-a)" />
      <text x={330} y={160} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">normal contact force — ⊥ surface</text>
      <line x1={250} y1={210} x2={168} y2={240} stroke={INK} strokeWidth="3" markerEnd="url(#phf-a)" />
      <text x={70} y={266} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">friction — along surface</text>
      <path d="M 120 290 A 80 80 0 0 0 116 262" fill="none" stroke={SOFT} strokeWidth="2" />
      <text x={126} y={278} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">θ</text>
      <text x={410} y={318} textAnchor="end" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">component of W along slope = mg sin θ</text>
    </svg>
  );
}

/* ————— 9 · the terminal-velocity v–t curve ————— */

export function FigPhTerminal({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <Frame w={560} h={300} xLabel="time" yLabel="velocity">
      <Arrow />
      <path d="M 52 242 Q 140 60 320 52 L 520 52" fill="none" stroke={accent} strokeWidth="3.6" strokeLinecap="round" className="fig-draw" pathLength={1} />
      <line x1={340} y1={242} x2={340} y2={52} stroke={FAINT} strokeWidth="1.8" strokeDasharray="5 7" />
      <text x={344} y={230} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">terminal velocity: gradient → 0, ΣF = 0</text>
      <line x1={52} y1={120} x2={92} y2={84} stroke={INK} strokeWidth="2.2" markerEnd="url(#pharrow)" />
      <text x={96} y={80} fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)">initial gradient ≈ g (drag ≈ 0)</text>
      <text x={180} y={160} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">gradient decays as drag grows —</text>
      <text x={180} y={178} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">velocity still increasing</text>
    </Frame>
  );
}

/* ————— 15/16 · moments on a beam ————— */

export function FigPhMoments({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 640 320" className="w-full" role="img" aria-label="A uniform beam pivoted at one end: the weight acts at the centre of gravity, a load pulls down along the beam, and moments are taken about the pivot">
      <Arrow id="phm-a" />
      <path d="M 110 240 L 130 210 L 138 218 L 118 248 Z M 96 242 L 116 212 L 124 220 L 104 250 Z" fill={INK} />
      <rect x={110} y={200} width={420} height={26} rx={6} fill="color-mix(in oklab, var(--color-paper) 55%, transparent)" stroke={INK} strokeWidth="2.8" />
      <circle cx={320} cy={213} r="5" fill={INK} />
      <line x1={320} y1={213} x2={320} y2={72} stroke={accent} strokeWidth="3.2" markerEnd="url(#phm-a)" />
      <text x={332} y={92} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">weight of beam, W = mg</text>
      <text x={332} y={110} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">at the centre of gravity — the midpoint</text>
      <line x1={500} y1={226} x2={500} y2={150} stroke={INK} strokeWidth="3" markerEnd="url(#phm-a)" />
      <text x={452} y={140} fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">load, L</text>
      <line x1={320} y1={276} x2={320} y2={268} stroke={FAINT} strokeWidth="2" />
      <line x1={118} y1={272} x2={318} y2={272} stroke={FAINT} strokeWidth="1.8" strokeDasharray="4 6" />
      <line x1={322} y1={272} x2={498} y2={272} stroke={FAINT} strokeWidth="1.8" strokeDasharray="4 6" />
      <text x={200} y={294} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">x/2</text>
      <text x={410} y={294} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">d</text>
      <text x={120} y={294} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">pivot</text>
      <text x={520} y={306} textAnchor="end" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">equilibrium: W·(x/2) = L·d</text>
    </svg>
  );
}

/* ————— 29/32 · the force-extension graph ————— */

export function FigPhForceExtension({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <Frame w={560} h={310} xLabel="extension Δx" yLabel="force F">
      <path d="M 52 242 L 300 110 L 360 132 L 430 180 L 470 232" fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" className="fig-draw" pathLength={1} />
      <path d="M 52 242 L 300 110 L 52 242 Z" fill="color-mix(in oklab, var(--color-ink) 10%, transparent)" />
      <line x1={300} y1={110} x2={300} y2={242} stroke={FAINT} strokeWidth="1.8" strokeDasharray="5 7" />
      <circle cx={248} cy={131} r="5" fill={INK} />
      <text x={252} y={124} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">limit of proportionality</text>
      <circle cx={300} cy={110} r="5" fill={INK} />
      <text x={310} y={100} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">elastic limit</text>
      <circle cx={360} cy={132} r="5" fill={INK} />
      <text x={368} y={124} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">yield point</text>
      <text x={168} y={204} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-body)">ΔEel = ½FΔx</text>
      <text x={168} y={222} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">area under the line</text>
      <text x={430} y={70} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">plastic region → breaking</text>
    </Frame>
  );
}

/* ————— 30 · the stress-strain curve ————— */

export function FigPhStressStrain({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <Frame w={580} h={310} xLabel="strain ε" yLabel="stress σ">
      <path d="M 52 242 L 250 120 Q 290 96 320 108 Q 360 122 400 168 L 430 214" fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" className="fig-draw" pathLength={1} />
      <line x1={52} y1={242} x2={260} y2={113} stroke={FAINT} strokeWidth="1.8" strokeDasharray="5 7" />
      <text x={130} y={158} fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">gradient = Young modulus</text>
      <circle cx={250} cy={120} r="5" fill={INK} />
      <text x={200} y={92} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">E — elastic limit</text>
      <circle cx={330} cy={106} r="5" fill={INK} />
      <text x={316} y={88} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">Y — yield point</text>
      <circle cx={400} cy={168} r="5" fill={INK} />
      <text x={396} y={150} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">UTS — maximum stress</text>
      <circle cx={430} cy={214} r="5" fill={INK} />
      <text x={424} y={236} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">breaking stress ✕</text>
    </Frame>
  );
}

/* ————— 26 · the falling-ball viscometer ————— */

export function FigPhFallingBall({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 520 380" className="fig-live w-full" role="img" aria-label="The falling-ball viscometer: a wide tube of liquid with timing marks, a ball falling between them at terminal velocity">
      <Arrow id="phb-a" />
      <rect x={130} y={30} width={190} height={320} rx={14} fill="color-mix(in oklab, var(--color-ink) 7%, transparent)" stroke={INK} strokeWidth="3" />
      <rect x={136} y={36} width={178} height={308} rx={10} fill="color-mix(in oklab, var(--color-ink) 3%, transparent)" />
      <line x1={136} y1={120} x2={314} y2={120} stroke={accent} strokeWidth="3" />
      <line x1={136} y1={270} x2={314} y2={270} stroke={accent} strokeWidth="3" />
      <text x={330} y={124} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">mark A — start timing</text>
      <text x={330} y={140} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body">(ball already at terminal velocity)</text>
      <text x={330} y={274} fontSize="12" fontWeight="800" fill={INK} fontFamily="var(--font-body)">mark B — stop</text>
      <circle cx={225} cy={84} r="9" fill={INK} className="fig-drift" />
      <circle cx={225} cy={195} r="9" fill={INK} />
      <line x1={225} y1={195} x2={225} y2={146} stroke={SOFT} strokeWidth="2" strokeDasharray="4 6" className="fig-flow" />
      <text x={150} y={340} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">wide tube — laminar flow</text>
      <line x1={90} y1={120} x2={90} y2={270} stroke={INK} strokeWidth="2" markerEnd="url(#phb-a)" />
      <text x={78} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily="var(--font-body)" transform="rotate(-90 78 200)">measure d</text>
      <text x={225} y={370} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">v = d ÷ t → F = 6πηrv → η = F/(6πrv)</text>
    </svg>
  );
}

/* ————— 31 · the Young modulus rig ————— */

export function FigPhYoungRig({ accent = "#339AF0" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 640 360" className="w-full" role="img" aria-label="The Young modulus rig: a long test wire and a reference wire hang from a ceiling clamp, joined by a vernier scale; masses load the test wire; a micrometer measures the diameter">
      <Arrow id="phy-a" />
      <rect x={60} y={26} width={380} height={16} rx={6} fill={INK} />
      <line x1={160} y1={42} x2={160} y2={250} stroke={FAINT} strokeWidth="2.4" strokeDasharray="6 7" />
      <line x1={300} y1={42} x2={300} y2={150} stroke={INK} strokeWidth="2.6" />
      <text x={312} y={70} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">reference wire</text>
      <text x={110} y={70} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">test wire</text>
      <rect x={230} y={150} width={40} height={26} rx={6} fill={accent} opacity={0.85} stroke={INK} strokeWidth="2.4" />
      <text x={250} y={196} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK} fontFamily="var(--font-body)">vernier scale</text>
      <line x1={300} y1={150} x2={300} y2={196} stroke={INK} strokeWidth="1.6" />
      <rect x={270} y={236} width={60} height={34} rx={8} fill="color-mix(in oklab, var(--color-ink) 12%, transparent)" stroke={INK} strokeWidth="2.6" />
      <circle cx={284} cy={246} r="9" fill={INK} />
      <circle cx={306} cy={252} r="9" fill={INK} />
      <line x1={160} y1={42} x2={230} y2={150} stroke={INK} strokeWidth="2.6" />
      <line x1={300} y1={164} x2={160} y2={278} stroke={FAINT} strokeWidth="2" />
      <text x={120} y={300} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">mass hanger: F = mg, added in steps</text>
      <text x={160} y={220} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">original length x: clamp → marker</text>
      <g transform="translate(470 120)">
        <text x={0} y={-6} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">micrometer:</text>
        <text x={0} y={12} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">diameter, several</text>
        <text x={0} y={30} fontSize="11.5" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">positions + orientations</text>
        <line x1={-14} y1={44} x2={44} y2={44} stroke={INK} strokeWidth="2.4" />
        <line x1={-14} y1={54} x2={44} y2={54} stroke={INK} strokeWidth="2.4" />
        <line x1={-6} y1={44} x2={-6} y2={54} stroke={INK} strokeWidth="2.4" />
        <line x1={36} y1={44} x2={36} y2={54} stroke={INK} strokeWidth="2.4" />
      </g>
      <text x={320} y={344} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOFT} fontFamily="var(--font-body)">plot force against extension: E = gradient × (x ÷ A)</text>
    </svg>
  );
}
