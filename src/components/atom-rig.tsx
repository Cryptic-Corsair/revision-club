"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useId } from "react";
import { ellipsePath, smoothBlob, useActAnim } from "./front/kit";

/* ═══════════════════════════════════════════════════════════════
   THE PLATE RIG — a Bohr atom, printed.

   The self-contained Bohr model behind the loop act, recast as an
   editorial journal figure: two inks on paper. Black ink draws the
   structure (orbits, shell, protons filled, neutrons open); red ink
   is reserved for everything alive (electrons, trails, the exhale,
   the reaction's energy). Any page can drop one in:

     <AtomRig motion={gate} className="whatever-sizes-it" />

   It fills its container (give the className a square box), reads
   the --ed-* tokens with hard fallbacks, registers its own plugin,
   and runs on its own clocks — no ScrollTrigger, no scroll
   coupling, nothing from the page around it. Everything loops on
   repeat: -1 and never stops:

     · the printed shell spins (44s), the dashed boundary ring
       counter-spins (66s), the nucleon cluster counter-spins
       slower still (30s) — three relative rotations, one breath
     · four electrons ride three elliptical orbits on MotionPath,
       each dragging a comet trail phase-locked to its own dot
     · the nucleus exhales two offset red rings, forever
     · every ~11s the atom winks: the cluster pops, a paper-white
       flash, a red shockwave — and one electron escapes the
       nucleus and flies off the plate (ionization, told without
       a word)

   The figure also annotates itself, the way a journal plate does:
   two fixed leader lines (nucleus, orbit) and one live one — the
   "electron" label's hairline chases its electron around the wide
   orbit on a gsap ticker, lerping so the probe feels elastic. The
   line's rest state points at the resting electron, so the still
   poster (motion off) annotates correctly too.

   Trail lock, for the record: each trail is its orbit's path with
   stroke-dasharray "L P−L L P−L" (a 2P pattern whose second dash
   renders the seam wrap) and a stroke-dashoffset tween of exactly
   −P per lap, sharing the dot's duration and delay — GSAP's own
   negative delay phases both tweens identically, so the dash
   segment ends on the dot at all times. No math at runtime beyond
   one getTotalLength() — and one getBBox(), which pins the live
   leader line to the electron's actual center.
   ═══════════════════════════════════════════════════════════════ */

/* the nucleus: one center nucleon, a ring of six, a crown of six —
   packed hexagonally around (100, 100); protons print filled,
   neutrons print open */
const NUCLEONS: Array<{ x: number; y: number; r: number; p: boolean }> = [
  { x: 100, y: 100, r: 6.2, p: true },
];
for (let i = 0; i < 6; i++) {
  const a = (i / 6) * Math.PI * 2;
  NUCLEONS.push({
    x: 100 + Math.cos(a) * 11.5,
    y: 100 + Math.sin(a) * 11.5,
    r: 5.1,
    p: i % 2 === 0,
  });
}
for (let i = 0; i < 6; i++) {
  const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
  NUCLEONS.push({
    x: 100 + Math.cos(a) * 20,
    y: 100 + Math.sin(a) * 20,
    r: 4.3,
    p: i % 2 === 1,
  });
}

/* the specks: printers' motes scattered in the plate's negative space */
const SPARKS: Array<[number, number, number]> = [
  [24, 42, 1.8],
  [170, 26, 1.4],
  [186, 148, 2.0],
  [12, 124, 1.3],
  [44, 182, 1.6],
  [156, 184, 1.3],
  [104, 10, 1.7],
  [94, 190, 1.3],
];

/* the electrons: two sharing the wide orbit half a lap apart, one
   on the tilted steep orbit, one drifting on the great flat one */
const RIDES = [
  { el: "ed-el-a", trail: "ed-tr-a", orbit: "oa", dur: 7, delay: 0 },
  { el: "ed-el-a2", trail: "ed-tr-a2", orbit: "oa", dur: 7, delay: -3.5 },
  { el: "ed-el-b", trail: "ed-tr-b", orbit: "ob", dur: 9.5, delay: -2.2 },
  { el: "ed-el-c", trail: "ed-tr-c", orbit: "oc", dur: 11.5, delay: -6.4 },
] as const;

const ORBIT_D = {
  oa: ellipsePath(100, 100, 84, 50),
  ob: ellipsePath(100, 100, 58, 76),
  oc: ellipsePath(100, 100, 92, 30),
};

export default function AtomRig({
  motion,
  className,
}: {
  motion: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const root = useActAnim<HTMLDivElement>(motion, run);

  function run() {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(MotionPathPlugin);
    const q = gsap.utils.selector(el);

    /* — the machinery: every part on its own endless clock — */
    gsap.to(q(".ed-shell"), {
      rotation: 360, duration: 44, repeat: -1, ease: "none", svgOrigin: "100 100",
    });
    gsap.to(q(".ed-cluster"), {
      rotation: -360, duration: 30, repeat: -1, ease: "none", svgOrigin: "100 100",
    });
    gsap.to(q(".ed-ring"), {
      rotation: -360, duration: 66, repeat: -1, ease: "none", svgOrigin: "100 100",
    });
    gsap.fromTo(
      q(".ed-halo"),
      { scale: 0.94, opacity: 0.5, svgOrigin: "100 100" },
      { scale: 1.05, opacity: 0.85, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", svgOrigin: "100 100" },
    );

    /* — the exhale: two red rings, offset half a breath — */
    gsap.fromTo(
      q(".ed-pulse-a"),
      { scale: 1, opacity: 0.4, svgOrigin: "100 100" },
      { scale: 1.55, opacity: 0, duration: 2.6, repeat: -1, ease: "power1.out", svgOrigin: "100 100" },
    );
    gsap.fromTo(
      q(".ed-pulse-b"),
      { scale: 1, opacity: 0.4, svgOrigin: "100 100" },
      { scale: 1.55, opacity: 0, duration: 2.6, repeat: -1, ease: "power1.out", delay: 1.3, svgOrigin: "100 100" },
    );

    /* — the electrons + their phase-locked comet trails — */
    RIDES.forEach(({ el: eSel, trail: tSel, orbit, dur, delay }) => {
      const dot = q(`.${eSel}`)[0];
      const path = `#${uid}${orbit}`;
      if (dot) {
        gsap.to(dot, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          duration: dur,
          repeat: -1,
          ease: "none",
          delay,
        });
      }
      const trail = q(`.${tSel}`)[0] as unknown as SVGPathElement | undefined;
      if (trail) {
        const P = trail.getTotalLength();
        const L = P * 0.15;
        /* dash L, gap P−L, twice: a 2P pattern carrying two dashes,
           one full lap apart — the second renders the piece of trail
           that wraps across the path's start/end seam */
        trail.style.strokeDasharray = `${L} ${P - L} ${L} ${P - L}`;
        gsap.set(trail, { opacity: 1 });
        /* offset starts at L and sheds exactly one lap per lap — the
           shared negative delay phases both tweens identically, so
           the dash always ends on its dot */
        gsap.fromTo(
          trail,
          { strokeDashoffset: L },
          { strokeDashoffset: L - P, duration: dur, ease: "none", repeat: -1, delay },
        );
      }
    });

    /* — the specks twinkle on random clocks — */
    (q(".ed-spark") as unknown as SVGElement[]).forEach((s) => {
      gsap.to(s, {
        opacity: gsap.utils.random(0.28, 0.6),
        scale: gsap.utils.random(1.05, 1.35),
        duration: gsap.utils.random(1.6, 3.2),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: -Math.random() * 3,
        transformOrigin: "center",
      });
    });

    /* — the live annotation: the "electron" leader line chases its
         dot around the wide orbit, forever. The dot rides a MotionPath
         in local units; the group's resting bbox center turns those
         x/y reads back into plate coordinates. A lerp per tick keeps
         the probe elastic — the line never quite catches its charge. */
    let cleanup: (() => void) | undefined;
    const gA = q(".ed-el-a")[0] as unknown as SVGGElement | undefined;
    const lead = q(".ed-note-line-e")[0] as unknown as SVGLineElement | undefined;
    if (gA && lead) {
      const bb = gA.getBBox();
      const cx0 = bb.x + bb.width / 2;
      const cy0 = bb.y + bb.height / 2;
      let x2 = Number(lead.getAttribute("x1"));
      let y2 = Number(lead.getAttribute("y1"));
      const probe = () => {
        const px = (Number(gsap.getProperty(gA, "x")) || 0) + cx0;
        const py = (Number(gsap.getProperty(gA, "y")) || 0) + cy0;
        x2 += (px - x2) * 0.14;
        y2 += (py - y2) * 0.14;
        lead.setAttribute("x2", x2.toFixed(2));
        lead.setAttribute("y2", y2.toFixed(2));
      };
      gsap.ticker.add(probe);
      cleanup = () => {
        gsap.ticker.remove(probe);
      };
    }

    /* — the wink: every ~11s the nucleus fires and one electron
         escapes — pop, flash, shockwave, departure, quiet — */
    const flyPath = `#${uid}fly`;
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.fromTo(q(".ed-el-fly"), { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power1.in" }, 8.3);
    tl.to(q(".ed-el-fly"), {
      motionPath: { path: flyPath, align: flyPath, alignOrigin: [0.5, 0.5] },
      duration: 1.9, ease: "power2.in",
    }, 8.45);
    tl.to(q(".ed-el-fly"), { opacity: 0, duration: 0.4, ease: "power1.in" }, 9.95);

    tl.to(q(".ed-cluster"), { scale: 1.15, duration: 0.22, ease: "power2.out" }, 9.5);
    tl.to(q(".ed-cluster"), { scale: 1, duration: 0.65, ease: "power3.out" }, 9.72);

    tl.fromTo(q(".ed-flash"), { opacity: 0 }, { opacity: 0.9, duration: 0.12, ease: "power1.in" }, 9.55);
    tl.to(q(".ed-flash"), { opacity: 0, duration: 0.55, ease: "power2.out" }, 9.67);

    /* a keyframed .to(), not a fromTo: the off-phase then renders the
       recorded resting state (invisible) instead of the from state,
       and one svgOrigin serves every keyframe — no origin jump */
    tl.to(q(".ed-shock"), {
      keyframes: [
        { scale: 0.35, opacity: 0.65, duration: 0.01 },
        { scale: 1.9, opacity: 0, duration: 1.29, ease: "power2.out" },
      ],
      svgOrigin: "100 100",
      ease: "none",
    }, 9.62);

    return cleanup;
  }

  return (
    <div ref={root} className={className} aria-hidden>
      <svg viewBox="0 0 200 200" className="ed-svg">
        <defs>
          <radialGradient id={`${uid}cg`}>
            <stop offset="0%" stopColor="var(--ed-accent, #c22b4a)" stopOpacity="0.32" />
            <stop offset="55%" stopColor="var(--ed-accent, #c22b4a)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--ed-accent, #c22b4a)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}eg`}>
            <stop offset="0%" stopColor="var(--ed-accent, #c22b4a)" stopOpacity="0.5" />
            <stop offset="45%" stopColor="var(--ed-accent, #c22b4a)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--ed-accent, #c22b4a)" stopOpacity="0" />
          </radialGradient>
          <path id={`${uid}fly`} d="M 100 100 Q 152 42 197 20" fill="none" />
        </defs>

        {/* the printers' specks, first so everything rides over them */}
        {SPARKS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} className="ed-spark" cx={x} cy={y} r={r} />
        ))}

        {/* the three orbit planes, drawn in black ink; the dashed
            boundary ring is the one orbit that visibly turns */}
        <path id={`${uid}oa`} className="ed-orbit" d={ORBIT_D.oa} />
        <path id={`${uid}ob`} className="ed-orbit" d={ORBIT_D.ob} transform="rotate(-24 100 100)" />
        <path id={`${uid}oc`} className="ed-orbit" d={ORBIT_D.oc} transform="rotate(16 100 100)" />
        <circle className="ed-ring" cx="100" cy="100" r="92" />

        {/* the comet trails — same geometry as their orbits */}
        <path className="ed-trail ed-tr-a" d={ORBIT_D.oa} />
        <path className="ed-trail ed-tr-a2 ed-tr-ink" d={ORBIT_D.oa} />
        <path className="ed-trail ed-tr-b" d={ORBIT_D.ob} transform="rotate(-24 100 100)" />
        <path className="ed-trail ed-tr-c ed-tr-soft" d={ORBIT_D.oc} transform="rotate(16 100 100)" />

        {/* the exhale */}
        <circle className="ed-pulse ed-pulse-a" cx="100" cy="100" r="32" />
        <circle className="ed-pulse ed-pulse-b" cx="100" cy="100" r="32" />

        {/* the nucleus: red wash, hex-packed cluster, printed shell */}
        <g className="ed-cluster">
          <circle className="ed-halo" cx="100" cy="100" r="34" fill={`url(#${uid}cg)`} />
          {NUCLEONS.map((n, i) => (
            <circle
              key={i}
              className={n.p ? "ed-nucleon ed-nucleon-p" : "ed-nucleon ed-nucleon-n"}
              cx={n.x.toFixed(2)}
              cy={n.y.toFixed(2)}
              r={n.r}
            />
          ))}
        </g>
        <path className="ed-shell" d={smoothBlob(100, 100, 42, 9, 0.16)} />
        <circle className="ed-flash" cx="100" cy="100" r="26" />
        <circle className="ed-shock" cx="100" cy="100" r="30" />

        {/* the electrons: a red wash riding with each dot */}
        <g className="ed-el-a">
          <circle className="ed-el-wash" cx="16" cy="100" r="16" fill={`url(#${uid}eg)`} />
          <circle className="ed-electron ed-dot-a" cx="16" cy="100" r="7" />
        </g>
        <g className="ed-el-a2">
          <circle className="ed-el-wash ed-el-wash-dim" cx="184" cy="100" r="12" fill={`url(#${uid}eg)`} />
          <circle className="ed-electron ed-dot-a2" cx="184" cy="100" r="4.5" />
        </g>
        <g className="ed-el-b">
          <circle className="ed-el-wash ed-el-wash-dim" cx="100" cy="24" r="13" fill={`url(#${uid}eg)`} />
          <circle className="ed-electron ed-dot-b" cx="100" cy="24" r="5.5" />
        </g>
        <g className="ed-el-c">
          <circle className="ed-el-wash" cx="8" cy="100" r="14" fill={`url(#${uid}eg)`} />
          <circle className="ed-electron ed-dot-c" cx="8" cy="100" r="5" />
        </g>

        {/* the escape artist, waiting at the nucleus */}
        <g className="ed-el-fly">
          <circle className="ed-el-wash" cx="100" cy="100" r="13" fill={`url(#${uid}eg)`} />
          <circle className="ed-electron ed-dot-fly" cx="100" cy="100" r="5" />
        </g>

        {/* the annotations — the plate labels itself. Two leaders are
            fixed; the electron's chases its charge (the ticker in
            run() rewrites x2/y2 every frame). Their rest states point
            at the resting parts, so the still poster reads true. */}
        <g className="ed-notes">
          <text className="ed-note-text" x="8" y="18">electron</text>
          <line className="ed-note-line ed-note-line-e" x1="11" y1="23" x2="16" y2="93" />
          <text className="ed-note-text ed-note-text-end" x="193" y="15">orbit</text>
          <line className="ed-note-line" x1="183" y1="19" x2="122" y2="52" />
          <circle className="ed-note-dot" cx="122" cy="52" r="1.2" />
          <text className="ed-note-text ed-note-text-end" x="193" y="190">nucleus</text>
          <line className="ed-note-line" x1="180" y1="184" x2="128" y2="128" />
          <circle className="ed-note-dot" cx="128" cy="128" r="1.2" />
        </g>
      </svg>
    </div>
  );
}
