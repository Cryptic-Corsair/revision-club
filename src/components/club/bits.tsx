"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · bits — the candy box
   Mascot (Bubbles the beaker) · doodles · buttons · bubbles ·
   waves · confetti · scroll reveals · progress beaker
   ═══════════════════════════════════════════════════════════════ */

/* ————— colour helpers (all mixing, no hard-coded shades) ————— */

/* Pastels lean on --tint-base: white paper by day, violet-ink
   charcoal after dark — so every tinted chip/card adapts to the mood. */
export const tint = (main: string, pct: number, base = "var(--tint-base)") =>
  `color-mix(in oklab, ${main} ${pct}%, ${base})`;

export const shade = (main: string, pct = 78) =>
  `color-mix(in oklab, ${main} ${pct}%, var(--shade-ink, #2e2016))`;

/* Dark ink on light candy (lemon, sun yellows), white on the rest. */
export function readableInk(main: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(main.trim());
  if (!m) return "#FFFFFF";
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  return lum > 0.44 ? "#33241A" : "#FFFFFF";
}

export const fade = (main: string, pct: number) =>
  `color-mix(in oklab, ${main} ${pct}%, transparent)`;

/* ————— content-surface washes —————
   The BIG candy washes (table headers, panels, step pills) mix
   through token pairs instead of tint()'s fixed --tint-base, so each
   lab grades its own content: daylight keeps the candy pastel over
   white paper; after dark the big surfaces fold into the room —
   headers & on-card insets sink just under the card, ground-level
   panels lift as quiet whisper sheets, zebra rows go neutral milk.
   (Deep-inspection fix: candy-over-chestnut read as muddy stripes at
   ~2.5× the chroma of their daylight pastels. Tokens live in
   globals.css under html.dark and html.classic .room.) */
export const wash = (
  main: string,
  shareToken: string,
  pct: number,
  baseToken = "--wash-base",
  fallbackBase = "#ffffff",
) =>
  `color-mix(in oklab, ${main} var(${shareToken}, ${pct}%), var(${baseToken}, ${fallbackBase}))`;

/* the sunk family — on-card insets & table headers (darker than card) */
export const sunkWash = (main: string, pct: number) =>
  wash(main, "--sunk-share", pct, "--sunk-base");

/* the lift family — panels & pills sitting on the room ground */
export const liftWash = (main: string, pct: number) =>
  wash(main, "--lift-share", pct, "--lift-base");

/* the honey family — the lemon sticky note. Lemon is the most
   luminous candy on the shelf, so after dark it mixes over its own
   deeper well instead of the room ground: at the ground's level an
   18% lemon wash floats ~0.04 L ABOVE the paper card (the note would
   out-glow every surface around it). 14% over the well tucks it just
   under the card. Daylight keeps the plain pastel over white. */
export const honeyWash = (main: string, pct: number) =>
  wash(main, "--honey-share", pct, "--honey-base");

/* the chip family — small candy chips hug the card they sit on, so
   their candy text pops the way its daylight pastels do instead of
   muddying over the mid-tone chestnut. */
export const chipWash = (main: string, pct: number) =>
  wash(main, "--chip-share", pct, "--chip-base");

/* ————— scroll fade —————
   Wraps a horizontally scrollable child (big tables, wide figures) and
   paints a soft fade over whichever side is hiding content — the
   affordance that says "keep swiping". The fade picks up the local
   surface from --color-paper, so it is correct on cards, in rooms and
   after dark without a single prop. */

export function ScrollFade({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cut, setCut] = useState({ l: false, r: false });
  const measure = () => {
    const el = ref.current;
    if (!el) return;
    setCut({
      l: el.scrollLeft > 6,
      r: el.scrollLeft + el.clientWidth < el.scrollWidth - 6,
    });
  };
  useEffect(() => {
    const el = ref.current;
    measure();
    el?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);
  const mask =
    cut.l && cut.r
      ? "linear-gradient(to right, transparent 0, black 34px, black calc(100% - 34px), transparent)"
      : cut.r
        ? "linear-gradient(to right, black calc(100% - 34px), transparent)"
        : cut.l
          ? "linear-gradient(to right, transparent 0, black 34px)"
          : undefined;
  return (
    <div className={`relative${className ? ` ${className}` : ""}`}>
      <div
        ref={ref}
        className="scroll-glide overflow-x-auto"
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/* ————— scroll reveals ————— */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 240, damping: 22, delay }}
    >
      {children}
    </m.div>
  );
}

export function PopIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, scale: 0.72, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 17, delay }}
    >
      {children}
    </m.div>
  );
}

/* ————— buttons ————— */

export function CandyButton({
  children,
  main = "#FF6B6B",
  onClick,
  className,
  ariaLabel,
  type = "button",
}: {
  children: ReactNode;
  main?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}) {
  return (
    <m.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95, y: 2 }}
      className={`candy inline-flex min-h-[calc(48px*var(--ui-scale))] cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[calc(15.5px*var(--ui-scale))] font-semibold tracking-wide select-none ${className ?? ""}`}
      style={{ "--candy-bg": main, "--candy-side": shade(main), color: readableInk(main) } as CSSProperties}
    >
      {children}
    </m.button>
  );
}

export function SoftButton({
  children,
  onClick,
  className,
  ariaLabel,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}) {
  return (
    <m.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex min-h-[calc(48px*var(--ui-scale))] cursor-pointer items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 font-display text-[calc(15.5px*var(--ui-scale))] font-semibold text-ink puff select-none ${className ?? ""}`}
    >
      {children}
    </m.button>
  );
}

/* ————— little label chips ————— */
/* (bg-paper / text-ink ride the theme vars, so chips flip with the mood) */

export function Chip({
  children,
  main,
  className,
}: {
  children: ReactNode;
  main?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-[calc(11.5px*var(--ui-scale))] font-semibold tracking-wide ${className ?? ""}`}
      style={
        main
          ? { background: tint(main, 16), color: shade(main, 60) }
          : {
              background: "color-mix(in oklab, var(--color-ink) 7%, transparent)",
              color: "var(--color-ink-soft)",
            }
      }
    >
      {children}
    </span>
  );
}

export function SectionTag({
  children,
  main = "#FF6B6B",
  tilt = -2,
}: {
  children: ReactNode;
  main?: string;
  tilt?: number;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-semibold tracking-[0.16em] uppercase select-none"
      style={{ background: main, color: readableInk(main), transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </span>
  );
}

/* ————— the kicker —————
   ONE small-caps label for the tailored rooms: a short accent dash,
   then the label. Before this there were five competing treatments
   (0.14em / 0.16em / 0.18em / 0.2em tracking, various weights) —
   every small-caps label in the classic interface now borrows this
   one. Editorial keeps its own EditorialLabel; classic-only callers
   import this so the shared surfaces never move. */

export function Kicker({
  children,
  color,
  className,
}: {
  children: ReactNode;
  /** dash + text colour; defaults to the room's quiet ink */
  color?: string;
  className?: string;
}) {
  const ink = color ?? "var(--color-ink-faint)";
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[calc(10.5px*var(--ui-scale))] leading-none font-bold tracking-[0.16em] uppercase ${className ?? ""}`}
      style={{ color: ink }}
    >
      <span
        aria-hidden
        className="h-[calc(3px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))] shrink-0 rounded-full"
        style={{ background: ink }}
      />
      {children}
    </span>
  );
}

/* ————— speech bubble (with a proper tail) ————— */

export function SpeechBubble({
  children,
  bg = "var(--color-paper)",
  className,
  tailClass = "left-9",
}: {
  children: ReactNode;
  bg?: string;
  className?: string;
  tailClass?: string;
}) {
  return (
    <div
      className={`relative rounded-[calc(24px*var(--ui-scale))] px-5 py-4 ${className ?? ""}`}
      style={{ background: bg }}
    >
      {children}
      <span
        aria-hidden
        className={`absolute -bottom-[calc(7px*var(--ui-scale))] ${tailClass} h-5 w-5 rotate-45 rounded-[calc(5px*var(--ui-scale))]`}
        style={{ background: bg }}
      />
    </div>
  );
}

/* ————— wave divider ————— */

export function Wave({
  fill = "var(--color-cocoa)",
  flip = false,
  className,
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-[calc(54px*var(--ui-scale))] w-full sm:h-[calc(74px*var(--ui-scale))] ${className ?? ""}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0,52 C160,92 340,8 540,30 C740,52 900,96 1100,68 C1260,46 1370,22 1440,40 L1440,90 L0,90 Z"
        fill={fill}
      />
    </svg>
  );
}

/* ————— floating blob backdrop ————— */

export function Blob({
  color,
  shape = "a",
  still = false,
  settle = false,
  className,
  style,
}: {
  color: string;
  /* static organic silhouettes (.blob-shape-* in globals); the drift is
     compositor-only (transform rotate/scale). still drops the motion for
     quiet zones; settle plays the one-time entrance and then freezes —
     the hero's answer to "stop drifting"; data-freeze pauses whatever
     remains while it sits offscreen. */
  shape?: "a" | "b" | "c";
  still?: boolean;
  settle?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const anim = still ? "" : settle ? "animate-blob-settle " : "animate-blob ";
  return (
    <div
      aria-hidden
      data-freeze
      className={`${anim}blob-shape-${shape} absolute ${className ?? ""}`}
      style={{ background: color, ...style }}
    />
  );
}

/* ————— hand-drawn doodles ————— */

export function DoodleAtom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none" stroke="currentColor">
      <circle cx="32" cy="32" r="5.5" fill="currentColor" stroke="none" />
      <ellipse cx="32" cy="32" rx="26" ry="10.5" strokeWidth="3" />
      <ellipse cx="32" cy="32" rx="26" ry="10.5" strokeWidth="3" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="10.5" strokeWidth="3" transform="rotate(-60 32 32)" />
    </svg>
  );
}

export function DoodleHex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none" stroke="currentColor">
      <polygon
        points="32,6 54,19 54,45 32,58 10,45 10,19"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="9" strokeWidth="3" />
    </svg>
  );
}

export function DoodleSparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        d="M24 2c2.2 10.8 6 18.6 22 22-16 3.4-19.8 11.2-22 22-2.2-10.8-6-18.6-22-22 16-3.4 19.8-11.2 22-22z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DoodlePlus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} stroke="currentColor" fill="none">
      <path d="M16 4v24M4 16h24" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleMolecule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" aria-hidden className={className} stroke="currentColor" fill="none">
      <path d="M14 34 L36 14 L58 32" strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="34" r="8" strokeWidth="3" fill="white" />
      <circle cx="36" cy="14" r="8" strokeWidth="3" fill="white" />
      <circle cx="58" cy="32" r="8" strokeWidth="3" fill="white" />
    </svg>
  );
}

export function Squiggle({
  color = "#FF6B6B",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 220 22" aria-hidden className={className} fill="none">
      <path
        d="M5 14 C 30 4, 52 20, 78 12 C 104 4, 126 20, 152 12 C 178 4, 200 16, 215 8"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ————— Bubbles, the club mascot ————— */

export function Mascot({
  main = "#FF6B6B",
  mood = "idle",
  size = 220,
  className,
  boop = false,
  onBoop,
  bubbles = true,
}: {
  main?: string;
  mood?: "idle" | "cheer";
  size?: number;
  className?: string;
  boop?: boolean;
  onBoop?: () => void;
  bubbles?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `mascot-clip-${id}`;

  const body =
    "M70 55 L150 55 L150 168 Q150 196 122 196 L98 196 Q70 196 70 168 Z";

  const inner = (
    <>
      {/* bubbles floating up */}
      {bubbles && (
        <g aria-hidden>
          <circle cx="84" cy="120" r="5" fill={tint(main, 70)} className="animate-bubble" />
          <circle
            cx="112"
            cy="132"
            r="7"
            fill={tint(main, 55)}
            className="animate-bubble"
            style={{ animationDelay: "1.4s" }}
          />
          <circle
            cx="136"
            cy="126"
            r="4"
            fill={tint(main, 80)}
            className="animate-bubble"
            style={{ animationDelay: "2.8s" }}
          />
        </g>
      )}

      {/* ground shadow */}
      <ellipse cx="110" cy="212" rx="58" ry="10" fill="#3D2B1F" opacity="0.10" />

      {/* beaker body */}
      {/* clip ids may wobble between the server pass and a fast client
          pass in dev — the shapes are identical, so hydration is told
          to look the other way instead of crying wolf in the console */}
      <clipPath id={clip} suppressHydrationWarning>
        <path d={body} />
      </clipPath>
      <path d={body} fill="#FFFDF7" />

      {/* liquid */}
      <g clipPath={`url(#${clip})`} suppressHydrationWarning>
        <path
          d="M66 128 C 80 118, 94 118, 108 128 C 122 138, 136 138, 154 126 L154 200 L66 200 Z"
          fill={main}
        />
        <ellipse cx="92" cy="166" rx="14" ry="8" fill="#FFFFFF" opacity="0.25" />
      </g>

      {/* glass outline + rim */}
      <path
        d={body}
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M60 55 H160"
        stroke="#3D2B1F"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* measurement ticks */}
      <path
        d="M132 150 h12 M132 170 h12"
        stroke="#3D2B1F"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* face */}
      {mood === "cheer" ? (
        <g>
          <path
            d="M84 92 Q 91 82, 98 92"
            stroke="#3D2B1F"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M122 92 Q 129 82, 136 92"
            stroke="#3D2B1F"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M94 106 Q 110 124, 126 106"
            stroke="#3D2B1F"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ) : (
        <g>
          <circle cx="92" cy="92" r="7" fill="#3D2B1F" />
          <circle cx="128" cy="92" r="7" fill="#3D2B1F" />
          <circle cx="94.5" cy="89.5" r="2.4" fill="#FFFFFF" />
          <circle cx="130.5" cy="89.5" r="2.4" fill="#FFFFFF" />
          <path
            d="M98 108 Q 110 118, 122 108"
            stroke="#3D2B1F"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
      {/* cheeks */}
      <circle cx="78" cy="104" r="6" fill="#F06595" opacity="0.4" />
      <circle cx="142" cy="104" r="6" fill="#F06595" opacity="0.4" />
    </>
  );

  if (!boop) {
    return (
      <svg
        viewBox="0 0 220 230"
        width={size}
        height={size}
        aria-hidden
        className={className}
      >
        {inner}
      </svg>
    );
  }

  return (
    <m.button
      type="button"
      onClick={onBoop}
      whileHover={{ scale: 1.04, rotate: -2 }}
      whileTap={{ scale: 0.88, rotate: 3 }}
      transition={{ type: "spring", stiffness: 320, damping: 12 }}
      className={`cursor-pointer ${className ?? ""}`}
      aria-label="Mascot"
    >
      <svg viewBox="0 0 220 230" width={size} height={size} aria-hidden>
        {inner}
      </svg>
    </m.button>
  );
}

/* ————— progress meter ————— */

export function BeakerMeter({
  pct,
  main,
  size = 86,
  className,
}: {
  pct: number;
  main: string;
  size?: number;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `meter-clip-${id}`;
  const p = Math.max(0, Math.min(1, pct));
  const top = 100 - p * 74;

  return (
    <svg viewBox="0 0 90 112" width={size} height={size * 1.18} aria-hidden className={className}>
      <clipPath id={clip} suppressHydrationWarning>
        <path d="M27 20 L27 86 Q27 102 43 102 L47 102 Q63 102 63 86 L63 20 Z" />
      </clipPath>
      <path
        d="M27 20 L27 86 Q27 102 43 102 L47 102 Q63 102 63 86 L63 20 Z"
        fill="var(--color-paper)"
      />
      <g clipPath={`url(#${clip})`} suppressHydrationWarning>
        <path
          d={`M24 ${top + 4} C 33 ${top - 3}, 41 ${top - 3}, 48 ${top + 3} C 53 ${top + 7}, 58 ${top + 7}, 66 ${top + 2} L66 106 L24 106 Z`}
          fill={main}
        />
        {p > 0.12 && (
          <>
            <circle cx="38" cy={top + 26} r="3" fill="#FFFFFF" opacity="0.5" />
            <circle cx="52" cy={top + 44} r="2.4" fill="#FFFFFF" opacity="0.45" />
          </>
        )}
      </g>
      <path
        d="M27 20 L27 86 Q27 102 43 102 L47 102 Q63 102 63 86 L63 20 Z"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M20 20 H70" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M55 44 h8 M55 62 h8 M55 80 h8"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

/* ————— confetti burst ————— */

let confettiColors: string[] = ["#FF6B6B", "#FFD43B", "#12B886", "#9775FA", "#FF922B"];

export function Confetti({
  fire,
  colors,
  className,
}: {
  fire: number;
  colors?: string[];
  className?: string;
}) {
  const palette = colors ?? confettiColors;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (fire <= 0) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1150);
    return () => clearTimeout(t);
  }, [fire]);

  const pieces = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => {
      const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.6;
      const dist = 70 + Math.random() * 100;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 44,
        size: 7 + Math.random() * 9,
        color: palette[i % palette.length],
        round: Math.random() > 0.35,
        rot: Math.random() * 280 - 140,
      };
    });
  }, [fire, palette]);

  return (
    <AnimatePresence>
      {visible && (
        <span
          aria-hidden
          className={`pointer-events-none absolute top-1/2 left-1/2 z-30 ${className ?? ""}`}
        >
          {pieces.map((p, i) => (
            <m.span
              key={`${fire}-${i}`}
              className="absolute block"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                borderRadius: p.round ? "999px" : "5px",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.1, rotate: p.rot }}
              transition={{ duration: 0.95, ease: [0.16, 0.84, 0.44, 1] }}
            />
          ))}
        </span>
      )}
    </AnimatePresence>
  );
}

/* ————— gentle bobbing wrapper ————— */

export function Float({
  children,
  delay = 0,
  slow = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div
      data-freeze
      className={`${slow ? "animate-float-slow" : "animate-float"} ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
