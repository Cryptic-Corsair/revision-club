"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · home canvas engines — the living hero
   Two scenes power the rebuilt front door:

   · HeroLattice — a full-bleed molecular drift behind the headline:
     candy atoms wandering, bonds fading in as they drift near each
     other, the whole field leaning gently toward the pointer.
   · MoleculeStage — caffeine (C8H10N4O2) drawn as a ball-and-stick
     model in hand-rolled 3D: rotate + perspective projection on a
     2D canvas, drag to spin with inertia, a slow idle turn
     otherwise. No WebGL, no three.js — the whole model is 15 atoms
     and 16 bonds, so each frame is a rounding error.

   Both engines follow one discipline so the GPU never breaks a
   sweat: a single canvas each, device-pixel-ratio capped at 1.75,
   the rAF loop torn down when the canvas leaves the viewport or
   the tab hides, one static frame painted when the motion knob is
   off or the visitor prefers reduced motion. Colors are read from
   the site's CSS custom properties and re-read whenever the lab
   changes, so every one of the four labs re-inks both scenes in
   one hop.
   ═══════════════════════════════════════════════════════════════ */

/* ————— colour plumbing —————
   The tokens we read are plain hexes in every lab (see globals.css),
   so a tiny hex parser is all the resolution these scenes need. */

const VAR_NAMES = [
  "--color-ink",
  "--color-ink-soft",
  "--color-ink-faint",
  "--color-paper",
  "--color-coral",
  "--color-tangerine",
  "--color-mint",
  "--color-grape",
  "--color-bubble",
  "--color-lemon",
] as const;

type Vars = Partial<Record<(typeof VAR_NAMES)[number], string>>;

const rgbCache = new Map<string, readonly [number, number, number]>();

function hexRgb(hex: string): readonly [number, number, number] | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1]!;
  if (h.length === 3) {
    return [
      parseInt(h[0]! + h[0]!, 16),
      parseInt(h[1]! + h[1]!, 16),
      parseInt(h[2]! + h[2]!, 16),
    ];
  }
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function resolveColor(v: string | undefined, fallback: readonly [number, number, number]): readonly [number, number, number] {
  if (!v) return fallback;
  const hit = rgbCache.get(v);
  if (hit) return hit;
  const rgb = hexRgb(v);
  if (rgb) {
    rgbCache.set(v, rgb);
    return rgb;
  }
  return fallback;
}

const rgba = (c: readonly [number, number, number], a: number) =>
  `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

/* ————— hooks ————— */

/* A live ref of the current lab's palette. Re-read on any class or
   data-mood change on <html> — theme switches are atomic for CSS and
   picked up by the very next frame here. */
function useThemeVars() {
  const ref = useRef<Vars>({});
  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const v: Vars = {};
      for (const name of VAR_NAMES) v[name] = cs.getPropertyValue(name).trim();
      ref.current = v;
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-mood"],
    });
    return () => mo.disconnect();
  }, []);
  return ref;
}

/* Motion is allowed only when the site's motion knob is on AND the
   visitor hasn't asked the browser for reduced motion. */
function useMotionOk() {
  const prefs = usePrefs();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return prefs.motion && !reduced;
}

/* ————— the molecular lattice ————— */

export function HeroLattice({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const vars = useThemeVars();
  const motionOk = useMotionOk();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    const LINK = 118;
    let w = 1;
    let h = 1;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let nodes: Node[] = [];
    const mouse = { x: -1e4, y: -1e4 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const v = vars.current;
      const shelf = [v["--color-coral"], v["--color-tangerine"], v["--color-mint"], v["--color-grape"], v["--color-bubble"], v["--color-lemon"]].filter(
        (c): c is string => !!c,
      );
      const target = Math.round(Math.min(84, Math.max(30, (w * h) / 16500)));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 24,
        vy: (Math.random() - 0.5) * 24,
        r: 1.8 + Math.random() * 1.9,
        c: shelf.length ? shelf[Math.floor(Math.random() * shelf.length)]! : "#FF6B6B",
      }));
    };

    const draw = (dt: number) => {
      const v = vars.current;
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -24) n.x = w + 24;
        else if (n.x > w + 24) n.x = -24;
        if (n.y < -24) n.y = h + 24;
        else if (n.y > h + 24) n.y = -24;
        /* the field leans toward the pointer — a gentle pull, never a
           swarm: capped by distance, eased by dt, gone when the
           pointer leaves */
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150 && d2 > 4) {
          const d = Math.sqrt(d2);
          const pull = (1 - d / 150) * 130 * dt;
          n.x += (dx / d) * pull;
          n.y += (dy / d) * pull;
        }
      }

      ctx.clearRect(0, 0, w, h);
      const ink = resolveColor(v["--color-ink"], [61, 43, 31]);

      /* bonds first, so atoms sit on top of their own sticks */
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.1;
            ctx.strokeStyle = rgba(ink, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const c = resolveColor(n.c, [255, 107, 107]);
        ctx.fillStyle = rgba(c, 0.42);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let last = 0;
    let live = false;
    let seen = true;

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (live || !seen || document.hidden) return;
      live = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      live = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        seen = entries[0]?.isIntersecting ?? true;
        if (seen) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const host = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });

    const ro = new ResizeObserver(() => {
      build();
      if (!live) draw(0);
    });
    ro.observe(canvas);

    build();
    if (motionOk) start();
    else draw(0);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [motionOk, vars]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

/* ————— caffeine, the ball-and-stick way —————
   1,3,7-trimethylxanthine: the purine skeleton (two fused rings,
   four nitrogens, two carbonyls) plus three methyls. Coordinates
   are hand-laid in a rough plane with slight puckers, so the idle
   rotation shows real depth. Methyls draw as one labelled sphere
   (CH3), the way a stick model renders them.

   Element colours ride the site's own tokens so every lab re-inks
   the model: ring carbons in the room's ink, nitrogens grape,
   oxygens coral, methyl carbons tangerine, the lone hydrogen a
   faint whisper. */

type El = "C" | "N" | "O" | "M" | "H";

const ATOMS: { el: El; x: number; y: number; z: number }[] = [
  { el: "N", x: 2.3, y: 0.55, z: 0.05 }, // N1
  { el: "C", x: 1.75, y: -0.75, z: 0 }, // C2 (carbonyl)
  { el: "N", x: 0.45, y: -1.05, z: 0.05 }, // N3
  { el: "C", x: -0.6, y: -0.25, z: 0 }, // C4
  { el: "C", x: -0.55, y: 1.1, z: 0 }, // C5
  { el: "C", x: 0.6, y: 1.75, z: -0.05 }, // C6 (carbonyl)
  { el: "N", x: -1.55, y: 1.95, z: 0.1 }, // N7
  { el: "C", x: -2.35, y: 0.85, z: 0 }, // C8
  { el: "N", x: -1.65, y: -0.3, z: 0.1 }, // N9
  { el: "O", x: 2.45, y: -1.75, z: -0.3 }, // O on C2
  { el: "O", x: 0.75, y: 3.05, z: -0.3 }, // O on C6
  { el: "M", x: 3.55, y: 1.15, z: 0.35 }, // methyl on N1
  { el: "M", x: 0.75, y: -2.35, z: 0.35 }, // methyl on N3
  { el: "M", x: -1.75, y: 3.3, z: 0.45 }, // methyl on N7
  { el: "H", x: -3.45, y: 1.0, z: -0.15 }, // H on C8
];

/* [a, b, double?] — the ring walk, then carbonyls and substituents */
const BONDS: [number, number, number?][] = [
  [0, 1], // N1–C2
  [1, 2], // C2–N3
  [2, 3], // N3–C4
  [3, 4, 2], // C4=C5
  [4, 5], // C5–C6
  [5, 0], // C6–N1
  [4, 6], // C5–N7
  [6, 7], // N7–C8
  [7, 8, 2], // C8=N9
  [8, 3], // N9–C4
  [1, 9, 2], // C2=O
  [5, 10, 2], // C6=O
  [0, 11], // N1–CH3
  [2, 12], // N3–CH3
  [6, 13], // N7–CH3
  [7, 14], // C8–H
];

const EL_RADIUS: Record<El, number> = { C: 7.6, N: 8.1, O: 8.6, M: 9.4, H: 4.1 };

/* the model's own centre, subtracted before rotating */
const CX = 0.05;
const CY = 0.475;

export function MoleculeStage({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const vars = useThemeVars();
  const motionOk = useMotionOk();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 1;
    let h = 1;

    /* rotation state — driven by drag events, integrated by the frame */
    let rotY = 0.65;
    let rotX = 0.34;
    let velY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const colors = () => {
      const v = vars.current;
      return {
        C: resolveColor(v["--color-ink"], [61, 43, 31]),
        N: resolveColor(v["--color-grape"], [151, 117, 250]),
        O: resolveColor(v["--color-coral"], [255, 107, 107]),
        M: resolveColor(v["--color-tangerine"], [255, 146, 43]),
        H: resolveColor(v["--color-ink-faint"], [148, 125, 105]),
      } as Record<El, readonly [number, number, number]>;
    };

    const draw = () => {
      const v = vars.current;
      const col = colors();
      const ink = resolveColor(v["--color-ink"], [61, 43, 31]);
      const paper = resolveColor(v["--color-paper"], [255, 253, 247]);

      ctx.clearRect(0, 0, w, h);

      const S = Math.min(w, h) / 8.6;
      const ox = w / 2;
      const oy = h / 2;
      const f = 9;

      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cxr = Math.cos(rotX);
      const sxr = Math.sin(rotX);

      const pts = ATOMS.map((a) => {
        const x = a.x - CX;
        const y = a.y - CY;
        const z = a.z;
        const X = x * cy + z * sy;
        let Z = -x * sy + z * cy;
        const Y = y * cxr - Z * sxr;
        Z = y * sxr + Z * cxr;
        const p = f / (f - Z);
        return { x: ox + X * S * p, y: oy + Y * S * p, z: Z, p };
      });

      /* a soft shadow pools under the model — grounding, not glow */
      const sh = ctx.createRadialGradient(ox, oy + S * 3.4, 2, ox, oy + S * 3.4, S * 3.1);
      sh.addColorStop(0, rgba(ink, 0.1));
      sh.addColorStop(1, rgba(ink, 0));
      ctx.fillStyle = sh;
      ctx.beginPath();
      ctx.ellipse(ox, oy + S * 3.4, S * 3.1, S * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      /* bonds — a stick per pair, doubled where caffeine doubles it,
         each stick a gradient between its two atoms */
      for (const [ai, bi, dbl] of BONDS) {
        const a = pts[ai]!;
        const b = pts[bi]!;
        const ca = col[ATOMS[ai]!.el];
        const cb = col[ATOMS[bi]!.el];
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, rgba(ca, 1));
        grad.addColorStop(1, rgba(cb, 1));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4 * ((a.p + b.p) / 2);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        if (dbl) {
          /* the second line of a double bond, offset perpendicular */
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const nx = (-dy / len) * 3.2;
          const ny = (dx / len) * 3.2;
          ctx.strokeStyle = rgba(ink, 0.45);
          ctx.lineWidth = 2 * ((a.p + b.p) / 2);
          ctx.beginPath();
          ctx.moveTo(a.x + nx, a.y + ny);
          ctx.lineTo(b.x + nx, b.y + ny);
          ctx.stroke();
        }
      }

      /* atoms, painted back to front */
      const order = ATOMS.map((_, i) => i).sort((a, b) => pts[a]!.z - pts[b]!.z);
      const labelFont = getComputedStyle(canvas).fontFamily || "system-ui";
      for (const i of order) {
        const atom = ATOMS[i]!;
        const pt = pts[i]!;
        const r = EL_RADIUS[atom.el] * pt.p;
        const c = col[atom.el];

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, 1);
        ctx.fill();
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = rgba(paper, 0.55);
        ctx.stroke();

        if (atom.el === "N" || atom.el === "O" || atom.el === "M") {
          ctx.fillStyle = "#FFF9EF";
          if (atom.el === "M") {
            const fs = Math.max(8, 8.5 * pt.p);
            ctx.font = `700 ${fs}px ${labelFont}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("CH", pt.x - fs * 0.16, pt.y);
            ctx.font = `700 ${fs * 0.78}px ${labelFont}`;
            ctx.fillText("3", pt.x + fs * 0.44, pt.y + fs * 0.24);
          } else {
            const fs = Math.max(8.5, 9.5 * pt.p);
            ctx.font = `700 ${fs}px ${labelFont}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(atom.el, pt.x, pt.y + 0.5);
          }
        }
      }
    };

    /* ————— drag to spin, with inertia ————— */
    const onDown = (e: PointerEvent) => {
      dragging = true;
      velY = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.classList.add("dragging");
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* capture is best-effort */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.pointerType === "mouse" ? e.clientY - lastY : 0;
      rotY += dx * 0.0085;
      rotX = Math.max(-0.45, Math.min(0.95, rotX + dy * 0.005));
      velY = dx * 0.55;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
      canvas.classList.remove("dragging");
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    let raf = 0;
    let last = 0;
    let live = false;
    let seen = true;

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      if (!dragging) {
        /* inertia decays into the idle drift; the tilt eases home */
        velY += (0.26 - velY) * Math.min(1, dt * 1.6);
        rotY += velY * dt;
        rotX += (0.34 - rotX) * Math.min(1, dt * 0.8);
      }
      draw();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (live || !seen || document.hidden) return;
      live = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      live = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        seen = entries[0]?.isIntersecting ?? true;
        if (seen) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (!live) draw();
    });
    ro.observe(canvas);

    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, rect.width);
    h = Math.max(1, rect.height);
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    if (motionOk) start();
    else draw();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [motionOk, vars]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
