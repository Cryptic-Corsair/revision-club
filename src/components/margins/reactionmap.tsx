"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Formula, MarginNote, Reveal, Stamp, parseChem } from "./primitives";

/* ————————————————————————————————————————————————
   THE REACTION MAP — organic chemistry as a wall map.
   Nine families pinned to the wall, thirteen exam
   routes drawn between them in ink. Click a route for
   reagents and conditions; click a family for its
   tests and observations.
   ———————————————————————————————————————————————— */

interface Fam {
  id: string;
  name: string;
  example: string;
  unit: string;
  test: string;
  note: string;
  x: number;
  y: number;
  w?: number;
}

const FAMS: Fam[] = [
  { id: "alkene", name: "Alkene", example: "CH_{2}=CH_{2}", unit: "WCH11–12", test: "Decolourises bromine water — orange to colourless, in seconds.", note: "the π bond is the reactivity", x: 10, y: 300, w: 160 },
  { id: "haloalkane", name: "Haloalkane", example: "CH_{3}CHBrCH_{3}", unit: "WCH11–12", test: "Warm with NaOH(aq), acidify with HNO_{3}, add AgNO_{3} — a cream precipitate for Br⁻.", note: "one halogen, five reactions", x: 290, y: 60 },
  { id: "alcohol", name: "Alcohol", example: "CH_{3}CH_{2}OH", unit: "WCH12", test: "1° and 2° turn acidified dichromate orange → green; a 3° does not.", note: "1° or 2°? that word decides everything", x: 290, y: 300 },
  { id: "aldehyde", name: "Aldehyde", example: "CH_{3}CHO", unit: "WCH14", test: "A silver mirror with Tollens' reagent, warmed gently.", note: "distil to stop it here", x: 580, y: 140 },
  { id: "ketone", name: "Ketone", example: "CH_{3}COCH_{3}", unit: "WCH14", test: "No mirror with Tollens' — the test that tells it from the aldehyde.", note: "2° alcohols stop here", x: 580, y: 420 },
  { id: "acid", name: "Carboxylic acid", example: "CH_{3}COOH", unit: "WCH12–14", test: "Fizzes with Na_{2}CO_{3} — carbon dioxide given off.", note: "a weak acid — it holds its proton", x: 830, y: 140 },
  { id: "ester", name: "Ester", example: "CH_{3}COOC_{2}H_{5}", unit: "WCH14", test: "The sweet, fruity smell — and hydrolysis takes you back.", note: "the perfume industry's group", x: 830, y: 420 },
  { id: "nitrile", name: "Nitrile", example: "CH_{3}CN", unit: "WCH15", test: "C≡N stretch near 2250 cm^{-1} in the infrared spectrum.", note: "the carbon-chain extender", x: 290, y: 560 },
  { id: "amine", name: "Amine", example: "CH_{3}CH_{2}NH_{2}", unit: "WCH15", test: "Fishy smell; turns damp red litmus paper blue.", note: "a weak base — NH₂ does what N does", x: 580, y: 580 },
];

interface Route {
  id: string;
  from: string;
  to: string;
  label: string;
  reagents: string;
  conditions: string;
  mech: string;
  unit: string;
  note: string;
  asked: string;
  d: string;
  lx: number;
  ly: number;
}

const ROUTES: Route[] = [
  {
    id: "alkene-halo", from: "alkene", to: "haloalkane",
    label: "HBr", reagents: "Hydrogen bromide, HBr", conditions: "Room temperature — no catalyst, no UV",
    mech: "Electrophilic addition", unit: "WCH11",
    note: "Markovnikov — via the more stable carbocation",
    asked: "State the major product when propene reacts with hydrogen bromide. Justify your answer. (2)",
    d: "M 132 300 C 178 232, 224 160, 287 112", lx: 205, ly: 185,
  },
  {
    id: "halo-alkene", from: "haloalkane", to: "alkene",
    label: "NaOH / ethanol", reagents: "Sodium hydroxide dissolved in ethanol", conditions: "Heat",
    mech: "Elimination", unit: "WCH12",
    note: "ethanolic = elimination; aqueous = substitution. One word, two reactions",
    asked: "But-2-ene can be formed from 2-bromobutane. Give the reagent and condition. (2)",
    d: "M 291 127 C 240 180, 196 244, 137 296", lx: 218, ly: 252,
  },
  {
    id: "halo-alcohol", from: "haloalkane", to: "alcohol",
    label: "NaOH(aq), warm", reagents: "Aqueous sodium hydroxide", conditions: "Warm — reflux works too",
    mech: "Nucleophilic substitution", unit: "WCH12",
    note: "OH⁻ swaps for Br⁻ — one curly arrow from the lone pair",
    asked: "Butan-1-ol can be made from 1-bromobutane. Give the reagent and condition. (2)",
    d: "M 352 137 C 352 190, 352 245, 352 296", lx: 352, ly: 218,
  },
  {
    id: "alcohol-alkene", from: "alcohol", to: "alkene",
    label: "conc. H_{2}SO_{4}, 180 °C", reagents: "Concentrated sulfuric acid (catalyst)", conditions: "170–180 °C — or hot Al_{2}O_{3}",
    mech: "Elimination", unit: "WCH12",
    note: "water leaves — it is a dehydration",
    asked: "Cyclohexene is made from cyclohexanol. Give the reagent and condition. (2)",
    d: "M 288 352 C 258 352, 228 352, 174 348", lx: 231, ly: 398,
  },
  {
    id: "alcohol-aldehyde", from: "alcohol", to: "aldehyde",
    label: "dichromate · distil", reagents: "Acidified potassium dichromate(VI), K_{2}Cr_{2}O_{7}/H_{2}SO_{4}", conditions: "Distil as it forms",
    mech: "Oxidation (1° alcohol)", unit: "WCH12",
    note: "distil = stop at the aldehyde",
    asked: "Ethanal can be prepared from ethanol. Give the reagent and the technique. (2)",
    d: "M 430 300 C 490 272, 520 245, 577 208", lx: 497, ly: 268,
  },
  {
    id: "alcohol-acid", from: "alcohol", to: "acid",
    label: "dichromate · reflux", reagents: "Acidified potassium dichromate(VI), K_{2}Cr_{2}O_{7}/H_{2}SO_{4}", conditions: "Reflux — oxidise it all the way",
    mech: "Oxidation (1° alcohol)", unit: "WCH12",
    note: "reflux = do not stop at the aldehyde",
    asked: "Ethanoic acid is prepared from ethanol. Give the reagent and condition. (2)",
    d: "M 462 330 C 610 300, 700 260, 826 192", lx: 645, ly: 282,
  },
  {
    id: "alcohol-ketone", from: "alcohol", to: "ketone",
    label: "dichromate · reflux (2°)", reagents: "Acidified potassium dichromate(VI), K_{2}Cr_{2}O_{7}/H_{2}SO_{4}", conditions: "Reflux",
    mech: "Oxidation (2° alcohol)", unit: "WCH12",
    note: "2° alcohols have nowhere further to go",
    asked: "Propanone is prepared from propan-2-ol. Give the reagent and condition. (2)",
    d: "M 430 376 C 490 405, 515 420, 577 446", lx: 490, ly: 415,
  },
  {
    id: "aldehyde-acid", from: "aldehyde", to: "acid",
    label: "dichromate · reflux", reagents: "Acidified potassium dichromate(VI), K_{2}Cr_{2}O_{7}/H_{2}SO_{4}", conditions: "Reflux",
    mech: "Oxidation", unit: "WCH12",
    note: "the step every exam chain question includes",
    asked: "Ethanoic acid is made from ethanal. Give the reagent and condition. (2)",
    d: "M 752 178 C 778 178, 800 178, 826 178", lx: 786, ly: 130,
  },
  {
    id: "acid-ester", from: "acid", to: "ester",
    label: "alcohol + H_{2}SO_{4} (warm)", reagents: "An alcohol + concentrated H_{2}SO_{4} as catalyst", conditions: "Warm, in a water bath",
    mech: "Esterification (condensation)", unit: "WCH14",
    note: "reversible — use excess alcohol to push it right",
    asked: "Write the equation for the formation of ethyl ethanoate. (3)",
    d: "M 900 218 C 900 285, 900 340, 900 414", lx: 900, ly: 318,
  },
  {
    id: "ester-acid", from: "ester", to: "acid",
    label: "dilute NaOH, heat", reagents: "Dilute NaOH (then acidify)", conditions: "Heat under reflux",
    mech: "Hydrolysis", unit: "WCH14",
    note: "the way back — with NaOH it goes all the way to the carboxylate",
    asked: "The ester was hydrolysed with dilute sodium hydroxide. Name the organic product. (2)",
    d: "M 930 418 C 930 345, 930 280, 930 224", lx: 930, ly: 250,
  },
  {
    id: "halo-nitrile", from: "haloalkane", to: "nitrile",
    label: "KCN / ethanol, reflux", reagents: "Potassium cyanide in ethanol", conditions: "Heat under reflux",
    mech: "Nucleophilic substitution", unit: "WCH15",
    note: "CN⁻, never HCN — and the chain grows by one carbon",
    asked: "Extend the chain: 1-bromobutane → butanenitrile. Give the reagents. (2)",
    d: "M 430 136 C 505 190, 505 460, 430 558", lx: 540, ly: 352,
  },
  {
    id: "nitrile-amine", from: "nitrile", to: "amine",
    label: "LiAlH_{4}", reagents: "Lithium tetrahydridoaluminate(III) in dry ether", conditions: "Room temperature — or H_{2}/Ni as catalyst",
    mech: "Reduction", unit: "WCH15",
    note: "C≡N → CH_{2}NH_{2}: the chain keeps its length",
    asked: "Butan-1-amine can be made from butanenitrile. Give the reducing agent. (1)",
    d: "M 462 600 C 500 606, 535 612, 574 616", lx: 518, ly: 588,
  },
  {
    id: "nitrile-acid", from: "nitrile", to: "acid",
    label: "dilute H_{2}SO_{4}, reflux", reagents: "Dilute sulfuric acid", conditions: "Heat under reflux",
    mech: "Hydrolysis", unit: "WCH15",
    note: "another way to build the acid — one carbon longer than where you started",
    asked: "Butanoic acid is made from butanenitrile. Give the reagent and condition. (2)",
    d: "M 380 640 C 460 672, 700 665, 785 590 C 850 530, 810 300, 878 226", lx: 565, ly: 674,
  },
];

const NH = 78; // node height

const CANVAS_W = 1080;
const CANVAS_H = 700;

/* the teacher's pen, scattered over the print */
const SQUIGGLES: { text: string; x: number; y: number; r: number; w: number }[] = [
  { text: "two reagents, two directions — learn both", x: 24, y: 128, r: -6, w: 165 },
  { text: "where every chain starts", x: 62, y: 412, r: -3, w: 170 },
  { text: "distil vs reflux — the question that never dies", x: 460, y: 502, r: -3, w: 125 },
  { text: "the chain grows here →", x: 298, y: 448, r: -3, w: 160 },
  { text: "the sweet-smelling one", x: 848, y: 528, r: -3, w: 160 },
];

const fam = (id: string) => FAMS.find((f) => f.id === id)!;

export function ReactionMap() {
  const [selRoute, setSelRoute] = useState<string | null>(null);
  const [selFam, setSelFam] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const selectRoute = (id: string) => {
    setSelRoute(id);
    setSelFam(null);
    // the card lives below the fold on most screens — bring it in
    requestAnimationFrame(() =>
      cardsRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" })
    );
  };
  const selectFam = (id: string | null) => {
    setSelFam(id);
    setSelRoute(null);
    if (id) {
      requestAnimationFrame(() =>
        cardsRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" })
      );
    }
  };

  const route = ROUTES.find((r) => r.id === selRoute) ?? null;
  const family = selFam ? fam(selFam) : null;
  const activeRoute = hover ?? selRoute;

  const touchFam = (r: Route) => r.from === selFam || r.to === selFam;

  return (
    <div className="mx-auto max-w-[1160px] px-5 md:px-10 pt-14 pb-8">
      <Reveal>
        <div className="mb-8">
          <p className="instruction mb-3 text-pen">Fig. 4 · The reaction map</p>
          <h1 className="font-display font-semibold text-[2.4rem] md:text-[3rem] leading-[1.05] tracking-[-0.015em] mb-4">
            Every route through organic chemistry
          </h1>
          <p className="font-body text-[18px] leading-[1.7] text-ink-soft max-w-[64ch]">
            Nine families pinned to the wall, thirteen routes drawn between them — every reagent and
            condition the specification can ask for. Click a route for the exam card; click a family
            for its tests. Distil or reflux is usually the mark.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mb-7">
          <span className="font-marks text-[11px] uppercase tracking-[0.18em] text-ink-faint">Legend</span>
          <span className="flex items-center gap-2">
            <svg width="34" height="10" aria-hidden="true"><line x1="0" y1="5" x2="26" y2="5" stroke="var(--ink-soft)" strokeWidth="1.8" /><path d="M 26 5 l -7 -3 M 26 5 l -7 3" stroke="var(--ink-soft)" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
            <span className="font-marks text-[11px] text-ink-soft">a route — click it</span>
          </span>
          <span className="flex items-center gap-2">
            <svg width="34" height="10" aria-hidden="true"><line x1="0" y1="5" x2="26" y2="5" stroke="var(--red)" strokeWidth="2.2" /><path d="M 26 5 l -7 -3 M 26 5 l -7 3" stroke="var(--red)" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
            <span className="font-marks text-[11px] text-ink-soft">selected / connected</span>
          </span>
          <span className="font-marks text-[11px] uppercase tracking-[0.14em] text-pen-deep ml-auto">
            9 families · 13 routes · scroll sideways on a phone →
          </span>
        </div>
      </Reveal>

      {/* ————— the pinned map ————— */}
      <Reveal>
        <div className="overflow-x-auto pb-3 -mx-1 px-1">
          <div className="relative shrink-0" style={{ width: CANVAS_W, height: CANVAS_H, transform: "rotate(-0.25deg)" }}>
            <div className="tape" style={{ left: 200, top: -6 }} aria-hidden="true" />
            <div className="tape" style={{ right: 180, top: -4, transform: "rotate(3deg)" }} aria-hidden="true" />

            {/* click-away layer */}
            <button
              type="button"
              aria-label="Clear selection"
              onClick={() => {
                setSelRoute(null);
                setSelFam(null);
              }}
              className="absolute inset-0 z-0 cursor-default"
              tabIndex={-1}
            />

            {/* routes */}
            <svg className="absolute inset-0 z-10 pointer-events-none" width={CANVAS_W} height={CANVAS_H} aria-hidden="true">
              <defs>
                <marker id="rm-arr" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-soft)" />
                </marker>
                <marker id="rm-arr-red" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--red)" />
                </marker>
                <marker id="rm-arr-dim" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-faint)" />
                </marker>
              </defs>
              {ROUTES.map((r) => {
                const hot = selFam ? touchFam(r) : activeRoute === r.id;
                const dim = selFam ? !touchFam(r) : activeRoute !== null && activeRoute !== r.id;
                return (
                  <g key={r.id} opacity={dim ? 0.2 : 1} style={{ transition: "opacity 0.2s ease" }}>
                    <path
                      d={r.d}
                      fill="none"
                      stroke={hot ? "var(--red)" : "var(--ink-soft)"}
                      strokeWidth={hot ? 2.4 : 1.8}
                      strokeLinecap="round"
                      markerEnd={hot ? "url(#rm-arr-red)" : dim ? "url(#rm-arr-dim)" : "url(#rm-arr)"}
                      style={{ transition: "stroke 0.15s ease, stroke-width 0.15s ease" }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* route hit-areas — fat invisible strokes over each path */}
            <svg className="absolute inset-0 z-20" width={CANVAS_W} height={CANVAS_H} aria-hidden="true">
              {ROUTES.map((r) => (
                  <path
                  key={`hit-${r.id}`}
                  d={r.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={22}
                  style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onMouseEnter={() => setHover(r.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => {
                    selectRoute(r.id);
                  }}
                />
              ))}
            </svg>

            {/* route labels */}
            {ROUTES.map((r) => {
              const hot = selFam ? touchFam(r) : activeRoute === r.id;
              const dim = selFam ? !touchFam(r) : activeRoute !== null && activeRoute !== r.id;
              return (
                <button
                  key={`lb-${r.id}`}
                  type="button"
                  onClick={() => {
                    selectRoute(r.id);
                  }}
                  onMouseEnter={() => setHover(r.id)}
                  onMouseLeave={() => setHover(null)}
                  className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 font-marks text-[10px] tracking-[0.06em] whitespace-nowrap px-1.5 py-[3px] border rounded-[2px] transition-colors ${
                    hot
                      ? "border-pen/70 text-pen-deep bg-paper-card"
                      : dim
                        ? "border-rule/60 text-ink-faint bg-paper-card/80 opacity-60"
                        : "border-rule text-ink-soft bg-paper-card hover:border-pen/50 hover:text-pen-deep"
                  }`}
                  style={{ left: r.lx, top: r.ly }}
                  aria-pressed={selRoute === r.id}
                >
                  <Formula text={r.label} />
                </button>
              );
            })}

            {/* families */}
            {FAMS.map((f) => {
              const selected = selFam === f.id;
              const w = f.w ?? 170;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    selectFam(selected ? null : f.id);
                  }}
                  aria-pressed={selected}
                  className={`absolute z-20 paper-card text-left px-4 py-3 transition-all duration-150 hover:-translate-y-[2px] ${
                    selected ? "border-pen shadow-[3px_3px_0_rgba(191,59,43,0.3)]" : ""
                  }`}
                  style={{ left: f.x, top: f.y, width: w, height: NH, transform: selected ? "rotate(0.6deg)" : undefined }}
                >
                  <p className="font-display font-semibold text-[16.5px] leading-none">{f.name}</p>
                  <p className="font-marks text-[10px] text-ink-faint mt-1.5 tracking-[0.04em]">
                    <Formula text={f.example} />
                  </p>
                  <p className="font-marks text-[8.5px] uppercase tracking-[0.14em] text-pen-deep mt-1.5">{f.unit}</p>
                </button>
              );
            })}

            {/* the teacher's pen */}
            {SQUIGGLES.map((s, i) => (
              <p
                key={i}
                className="margin-note absolute z-10 text-[14.5px] leading-[1.3]"
                style={{ left: s.x, top: s.y, width: s.w, transform: `rotate(${s.r}deg)`, pointerEvents: "none" }}
              >
                {s.text}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ————— the reading room: route / family cards ————— */}
      <Reveal>
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 mt-8 items-start scroll-mt-20">
          <div className="paper-card relative px-6 py-5 min-h-[240px]">
            {route ? (
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">Route card</p>
                  <button
                    type="button"
                    onClick={() => setSelRoute(null)}
                    className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint hover:text-pen-deep transition-colors"
                  >
                    clear ×
                  </button>
                </div>
                <h2 className="font-display font-semibold text-[1.55rem] leading-tight mb-3">
                  {fam(route.from).name} <span className="text-pen-deep">→</span> {fam(route.to).name}
                </h2>
                <dl className="space-y-2 mb-4">
                  <div className="flex gap-3">
                    <dt className="font-marks text-[10px] uppercase tracking-[0.16em] text-ink-faint w-[86px] shrink-0 pt-1">Reagents</dt>
                    <dd className="font-body text-[15.5px] leading-[1.5]">{parseChem(route.reagents)}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="font-marks text-[10px] uppercase tracking-[0.16em] text-ink-faint w-[86px] shrink-0 pt-1">Conditions</dt>
                    <dd className="font-body text-[15.5px] leading-[1.5]">{parseChem(route.conditions)}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="font-marks text-[10px] uppercase tracking-[0.16em] text-ink-faint w-[86px] shrink-0 pt-1">Mechanism</dt>
                    <dd className="font-body text-[15.5px] leading-[1.5]">{route.mech}</dd>
                  </div>
                </dl>
                <p className="font-marks text-[10px] uppercase tracking-[0.14em] text-pen-deep border border-pen/45 rounded-[2px] px-2 py-1 inline-block mb-4">
                  {route.unit}
                </p>
                <p className="margin-note text-[17px] mb-3">{route.note}</p>
                <p className="font-body italic text-[14.5px] leading-[1.6] text-ink-soft border-l-[3px] border-rule pl-4">
                  Asked like: “{parseChem(route.asked)}”
                </p>
              </div>
            ) : family ? (
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">Family card</p>
                  <button
                    type="button"
                    onClick={() => setSelFam(null)}
                    className="font-marks text-[10.5px] uppercase tracking-[0.14em] text-ink-faint hover:text-pen-deep transition-colors"
                  >
                    clear ×
                  </button>
                </div>
                <h2 className="font-display font-semibold text-[1.55rem] leading-tight mb-1">{family.name}</h2>
                <p className="font-marks text-[12px] text-ink-soft mb-3">
                  <Formula text={family.example} />
                </p>
                <p className="font-marks text-[10px] uppercase tracking-[0.14em] text-pen-deep border border-pen/45 rounded-[2px] px-2 py-1 inline-block mb-4">
                  {family.unit}
                </p>
                <p className="font-body text-[15.5px] leading-[1.65] text-ink/90 mb-3">
                  <span className="font-marks text-[10px] uppercase tracking-[0.16em] text-ink-faint block mb-1">The test</span>
                  {parseChem(family.test)}
                </p>
                <p className="margin-note text-[17px]">{family.note}</p>
              </div>
            ) : (
              <div className="py-6">
                <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint mb-4">Route card — select a route</p>
                <p className="font-display italic text-[1.35rem] leading-snug mb-4">
                  Click any arrow on the wall — the reagents, the conditions and the mechanism name
                  appear here, with the mark-scheme voice beside them.
                </p>
                <MarginNote className="text-[17px]">the reagents are the marks</MarginNote>
              </div>
            )}
          </div>

          <div className="paper-card px-6 py-5">
            <p className="font-marks text-[10.5px] uppercase tracking-[0.18em] text-ink-faint mb-4">How to revise with the map</p>
            <ol className="space-y-3">
              {[
                "Pick a family and follow every arrow out of it — say the reagents out loud before you click.",
                "Trace the two-carbon-carbon routes from the alkene all the way to the ester — the chain question in disguise.",
                "Close your eyes: what is the only family that leads to a nitrile? Open them and check.",
                "The dichromate family — alcohol, aldehyde, ketone, acid — is one reagent used three ways. Only the technique changes.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="font-marks text-[10.5px] text-pen-deep border border-pen/40 rounded-[2px] px-1.5 py-0.5 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[15.5px] leading-[1.6] text-ink/90">{parseChem(t)}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 pt-4 border-t border-dashed border-rule flex flex-wrap items-center gap-4">
              <Stamp pressed>Distil or reflux?</Stamp>
              <p className="font-body text-[14px] text-ink-soft max-w-[34ch] leading-[1.55]">
                The technique is part of the reagent line — “reflux” alone has rescued a thousand lost marks.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
