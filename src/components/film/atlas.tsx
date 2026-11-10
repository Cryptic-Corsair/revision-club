"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { NOTES_META } from "@/lib/spectra/notes-meta";
import { stage, filmScroll } from "./stage";
import { Chars } from "./chars";

/* ═══════════════════════════════════════════════════════════════
   THE FILM · the atlas — eighteen stations on one line

   The finale. The particle sky disperses into a starfield and the
   whole syllabus rises as a metro map: WCH11's five topics, WCH12's
   five, WCH13's eight practicals — one continuous line, three unit
   colours, eighteen stations. Each station is a real door: click it
   and its revision note opens on the same wall.

   The line draws itself and the stations pop as the section
   scrubs through — stroke-dashoffset for the line (one path, one
   paint), transform/opacity for the stations.
   ═══════════════════════════════════════════════════════════════ */

/* short names for the map — the full titles live in the notes */
const SHORT: Record<string, string> = {
  "wch11-t01": "The mole",
  "wch11-t02": "The atom",
  "wch11-t03": "Bonding",
  "wch11-t04": "Alkanes",
  "wch11-t05": "Alkenes",
  "wch12-t06": "Energetics",
  "wch12-t07": "Forces",
  "wch12-t08": "Redox & groups",
  "wch12-t09": "Kinetics & eq.",
  "wch12-t10": "Organic & spectra",
  "wch13-p01": "Gas volumes",
  "wch13-p02": "Titrations",
  "wch13-p04": "Cation tests",
  "wch13-p05": "Anion tests",
  "wch13-p06": "Halide tests",
  "wch13-p07": "Distillation",
  "wch13-p08": "Calorimetry",
  "wch13-p09": "Organic tests",
};

const UNIT_COLOR: Record<string, string> = {
  WCH11: "#3ED2FF",
  WCH12: "#FFAA4D",
  WCH13: "#35D08F",
};

/* stations, hand-laid on three rows: unit 1 left→right, unit 2
   right→left, unit 3 left→right — the line snakes down the wall */
const ROWS = [150, 340, 530];
const X1 = [140, 350, 560, 770, 980];
const X2 = [980, 770, 560, 350, 140];
const X3 = [100, 240, 380, 520, 660, 800, 940, 1080];

type Station = {
  id: string;
  x: number;
  y: number;
  color: string;
  code: string;
  name: string;
  spec: string;
  labelAbove: boolean;
};

const stations: Station[] = NOTES_META.map((m, i) => {
  const row = m.unitCode === "WCH11" ? 0 : m.unitCode === "WCH12" ? 1 : 2;
  const col = row === 0 ? i : row === 1 ? i - 5 : i - 10;
  const xs = row === 0 ? X1 : row === 1 ? X2 : X3;
  return {
    id: m.id,
    x: xs[col],
    y: ROWS[row],
    color: UNIT_COLOR[m.unitCode],
    code: m.unitCode === "WCH13"
      ? `P${m.topicId.slice(1).replace(/^0/, "")}`
      : `T${m.topicId.slice(1).replace(/^0/, "")}`,
    name: SHORT[m.id] ?? m.title,
    spec: m.specRange,
    labelAbove: row !== 1,
  };
});

const LINE_PATH =
  "M 140 150 L 980 150 Q 1090 150 1090 245 Q 1090 340 980 340 L 140 340 Q 30 340 30 435 Q 30 530 140 530 L 1080 530";

export default function Atlas({
  onOpenDoc,
  onActive,
}: {
  onOpenDoc: (docId: string) => void;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const sec = ref.current!;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sec);
      const path = pathRef.current!;
      const dash = path.getTotalLength();
      path.style.setProperty("--dash", String(Math.ceil(dash)));

      /* the sky disperses 4 → 5 as the atlas rises — written, not
         tweened, continuous with chapter IV's end */
      gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top bottom",
          end: "top 15%",
          scrub: 0.6,
          onToggle: (self) => self.isActive && onActive(4),
          onUpdate: (self) => {
            stage.target = 4 + Math.min(self.progress / 0.85, 1);
          },
          onRefresh: (self) => {
            filmScroll.atlas = self.start;
          },
        },
      });

      /* the map draws itself */
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          end: "top 8%",
          scrub: 0.6,
        },
      })
        .fromTo(
          q(".f-atl-kicker"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          0,
        )
        .fromTo(
          q(".f-atl-head .f-char"),
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.16, stagger: 0.012, ease: "power2.out" },
          0.03,
        )
        .fromTo(
          q(".f-atl-lede"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power1.out" },
          0.16,
        )
        .fromTo(
          path,
          { strokeDashoffset: dash },
          { strokeDashoffset: 0, duration: 0.5 },
          0.18,
        )
        .fromTo(
          q(".atlas-station .st-core"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.035, stagger: 0.012, ease: "back.out(2.2)" },
          0.24,
        )
        .fromTo(
          q(".atlas-station .st-labelg"),
          { opacity: 0 },
          { opacity: 1, duration: 0.06, stagger: 0.01 },
          0.3,
        )
        .fromTo(
          q(".f-atl-hint"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" },
          0.6,
        );
    }, sec);
    return () => ctx.revert();
  }, [onActive]);

  const open = (id: string) => onOpenDoc(id);

  return (
    <section
      id="film-atlas"
      ref={ref}
      className="relative z-10 px-6 py-[16svh] sm:px-14"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="f-atl-kicker flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-white/40" />
          <span className="f-mono text-[10px] text-white/70 sm:text-[11px]">
            The atlas · WCH11 — WCH13
          </span>
        </div>
        <h2
          className="f-atl-head f-display mt-7 font-extrabold uppercase leading-[1.02] tracking-[-0.015em] text-[clamp(2.1rem,5.8vw,5.7rem)]"
          aria-label="Eighteen chapters. One story."
        >
          <span aria-hidden>
            <span className="block whitespace-nowrap">
              <Chars text="EIGHTEEN" />
            </span>
            <span className="block whitespace-nowrap">
              <Chars text="CHAPTERS." />
            </span>
            <span className="f-outline block whitespace-nowrap">
              <Chars text="ONE STORY." outline />
            </span>
          </span>
        </h2>
        <p className="f-atl-lede mt-8 max-w-[52ch] font-light text-[clamp(1rem,1.45vw,1.26rem)] leading-[1.8] text-white/65">
          Every formation the film just showed you — the mole, the atom,
          the ring, the flame, the helix — exists as a full revision note,
          spec by spec, definition by definition, worked example by worked
          example. The line below is the whole syllabus. Pick a station.
        </p>

        {/* ————— the line —————
            the map keeps its proportions and swipes sideways on
            phones — a metro map squeezed to 390px is a rumor */}
        <div className="atlas-scroll mt-16 sm:mt-20">
          <svg
            viewBox="0 0 1200 640"
            className="h-auto w-full min-w-[880px]"
            role="group"
            aria-label="Map of the eighteen revision notes"
          >
            <defs>
              <linearGradient id="atlas-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5EE6FF" />
                <stop offset="23%" stopColor="#3ED2FF" />
                <stop offset="53%" stopColor="#FFAA4D" />
                <stop offset="83%" stopColor="#35D08F" />
                <stop offset="100%" stopColor="#35D08F" />
              </linearGradient>
            </defs>

            <path
              ref={pathRef}
              d={LINE_PATH}
              fill="none"
              stroke="url(#atlas-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
              className="atlas-path"
            />

            {stations.map((s) => (
              <g
                key={s.id}
                className="atlas-station"
                transform={`translate(${s.x} ${s.y})`}
                role="button"
                tabIndex={0}
                aria-label={`Open the note: ${s.name} (${s.code})`}
                onClick={() => open(s.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open(s.id);
                  }
                }}
              >
                <circle r="34" fill="transparent" />
                <circle
                  className="st-halo"
                  r="15"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="1.5"
                />
                <circle
                  className="st-core"
                  r="6.5"
                  fill="#050507"
                  stroke={s.color}
                  strokeWidth="2.25"
                />
                <g className="st-labelg">
                  <g
                    className="st-label"
                    transform={
                      s.labelAbove ? "translate(0 -34)" : "translate(0 38)"
                    }
                  >
                    <text
                      textAnchor="middle"
                      y={s.labelAbove ? -10 : 0}
                      fill="#f2f1ee"
                      style={{
                        fontFamily: "var(--font-grotesk)",
                        fontSize: "13.5px",
                        fontWeight: 500,
                      }}
                    >
                      {s.name}
                    </text>
                    <text
                      textAnchor="middle"
                      y={s.labelAbove ? 6 : 16}
                      fill="rgba(242,241,238,0.45)"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {s.code} · {s.spec}
                    </text>
                  </g>
                </g>
              </g>
            ))}
          </svg>
        </div>

        <p className="f-atl-hint f-mono mt-12 text-center text-[9px] text-white/45">
          Select a station — its note opens on the same wall
          <span className="sm:hidden"> · swipe the line →</span>
        </p>
      </div>
    </section>
  );
}
