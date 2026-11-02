import type { SVGProps } from "react";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · icons — the house ink set
   Drawn for this site, not pulled from a stock box: chunky round
   strokes, wobbly paths, and little chemistry stories in every
   glyph (bubbles, flasks, orbits, flames).
   Names kept identical to the old stock set so call sites read
   the same; the shapes are all ours.
   ═══════════════════════════════════════════════════════════════ */

type IcoProps = SVGProps<SVGSVGElement>;

function Ico({ children, strokeWidth = 2.1, ...rest }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ————— navigation & chrome ————— */

/* the revision pack — a clipboard with a checklist */
export function ClipboardList(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="5" y="4.4" width="14" height="16.2" rx="3.4" />
      <path d="M9 4.8 V3.8 a1.6 1.6 0 0 1 1.6-1.6 h2.8 A1.6 1.6 0 0 1 15 3.8 V4.8" />
      <path d="M8.8 10.2 h1.6" />
      <path d="M13.4 10.2 h2" />
      <path d="M8.8 14.4 h1.6" />
      <path d="M13.4 14.4 h2" />
      <path d="M8.8 18.4 h6.6" strokeWidth={1.7} />
    </Ico>
  );
}

/* two overlapping sheets — copy the pack as text */
export function Copy(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="8.6" y="8.6" width="11.4" height="11.4" rx="3" />
      <path d="M15.4 5.4 H7 A3.2 3.2 0 0 0 3.8 8.6 V16" />
    </Ico>
  );
}

/* a printer with a warm little light */
export function Printer(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M7 8.6 V4.6 a1.6 1.6 0 0 1 1.6-1.6 h6.8 A1.6 1.6 0 0 1 17 4.6 V8.6" />
      <path d="M7 17.4 H5.6 A1.8 1.8 0 0 1 3.8 15.6 V11.2 a2.6 2.6 0 0 1 2.6-2.6 h11.2 a2.6 2.6 0 0 1 2.6 2.6 V15.6 a1.8 1.8 0 0 1-1.8 1.8 H17" />
      <rect x="7" y="14.6" width="10" height="6.2" rx="1.6" />
      <circle cx="17.2" cy="11.8" r="0.9" strokeWidth={1.6} />
    </Ico>
  );
}

/* a bookmark ribbon — saved revision sets */
export function Bookmark(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.4 6.2 A3 3 0 0 1 9.4 3.2 h5.2 a3 3 0 0 1 3 3 V20.6 L12 16.8 L6.4 20.6 Z" />
    </Ico>
  );
}

export function Search(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="10.6" cy="10.6" r="6.6" />
      <path d="M15.6 15.6 L20.4 20.4" />
      <path d="M7.6 9.2 a3.4 3.4 0 0 1 2.4-2" strokeWidth={1.7} />
    </Ico>
  );
}

export function Home(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.2 11.6 L12 4.4 L19.8 11.6" />
      <path d="M6.2 10.4 V18.6 a1.8 1.8 0 0 0 1.8 1.8 h8 a1.8 1.8 0 0 0 1.8-1.8 V10.4" />
      <path d="M10.4 20.2 v-3.6 a1.6 1.6 0 0 1 3.2 0 v3.6" />
    </Ico>
  );
}

export function ArrowLeft(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M19.4 12 H4.8" />
      <path d="M10.6 6.2 L4.6 12 l6 5.8" />
    </Ico>
  );
}

export function ArrowRight(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.6 12 h14.6" />
      <path d="M13.4 6.2 l6 5.8 -6 5.8" />
    </Ico>
  );
}

export function MoveRight(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.6 12 h14" />
      <path d="M13.2 6.8 L18.6 12 l-5.4 5.2" />
    </Ico>
  );
}

export function ChevronDown(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M5.8 9.4 L12 15.4 L18.2 9.4" />
    </Ico>
  );
}

export function Check(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.4 12.8 l4.6 4.6 L19.6 6.6" />
    </Ico>
  );
}

export function X(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.2 6.2 L17.8 17.8" />
      <path d="M17.8 6.2 L6.2 17.8" />
    </Ico>
  );
}

export function RotateCcw(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M3.6 4.4 v4.8 h4.8" />
      <path d="M4.4 9.2 a8.2 8.2 0 1 1 -0.5 4.6" />
    </Ico>
  );
}

export function Eye(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M2.9 12 C 5.1 7.6 8.3 5.4 12 5.4 s 6.9 2.2 9.1 6.6 C 18.9 16.4 15.7 18.6 12 18.6 s -6.9 -2.2 -9.1 -6.6 Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12.9" cy="11.1" r="0.7" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function EyeOff(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.4 8.3 C 3.8 9.3 3.3 10.5 2.9 12 c 2.2 4.4 5.4 6.6 9.1 6.6 1.6 0 3.1-0.4 4.5-1.2" />
      <path d="M19.6 15.4 c 0.6-0.9 1.1-2.1 1.5-3.4 C 18.9 7.6 15.7 5.4 12 5.4 c -0.9 0-1.8 0.1-2.6 0.4" />
      <path d="M9.9 9.9 a 3 3 0 0 0 4.2 4.2" />
      <path d="M4.2 4.2 L19.8 19.8" />
    </Ico>
  );
}

export function Lock(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="4.4" y="11" width="15.2" height="9.4" rx="2.4" />
      <path d="M8.4 11 V7.8 a3.6 3.6 0 0 1 7.2 0 V11" />
      <circle cx="12" cy="15.4" r="0.9" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Info(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="8.1" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 11.4 v5.2" />
    </Ico>
  );
}

/* ————— chemistry & subjects ————— */

export function FlaskConical(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M9.4 3.4 h5.2" />
      <path d="M10.5 3.6 v4.6 L5.6 18.4 a1.25 1.25 0 0 0 1.14 1.76 h10.52 a1.25 1.25 0 0 0 1.14-1.76 L13.5 8.2 V3.6" />
      <path d="M7.7 14.6 h8.6" />
      <circle cx="11" cy="17.4" r="0.85" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Atom(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.7" strokeWidth={1.8} />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.7" strokeWidth={1.8} transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.7" strokeWidth={1.8} transform="rotate(-60 12 12)" />
    </Ico>
  );
}

export function Flame(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 3.2 C 12 3.2 6.2 8.2 6.2 13.4 a5.8 5.8 0 0 0 11.6 0 C 17.8 8.2 12 3.2 12 3.2 Z" />
      <path d="M12 10.6 c-1.5 1.7-2.2 2.9-2.2 4 a2.2 2.2 0 0 0 4.4 0 c 0-1.1-0.7-2.3-2.2-4 Z" strokeWidth={1.9} />
    </Ico>
  );
}

export function TestTubes(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M5.2 4.2 h6.2" />
      <path d="M6.4 4.4 v9.4 a1.9 1.9 0 0 0 3.8 0 V4.4" />
      <path d="M6.4 10.2 h3.8" strokeWidth={1.8} />
      <path d="M12.6 4.2 h6.2" />
      <path d="M13.8 4.4 v9.4 a1.9 1.9 0 0 0 3.8 0 V4.4" />
      <path d="M4.2 20.2 c2.4-1.4 4.4-1.4 5.6 0 1.4-1.5 3.2-1.5 4.6 0 1.2-1.3 3-1.3 5.4 0" strokeWidth={1.9} />
      <circle cx="16.9" cy="8.6" r="0.8" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Gauge(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M3.8 17 a8.6 8.6 0 0 1 16.4 0" />
      <path d="M12 17 L16.4 11" />
      <circle cx="12" cy="17" r="1.15" fill="currentColor" stroke="none" />
      <path d="M5.6 12.6 l1 0.9 M18.4 12.6 l-1 0.9" strokeWidth={1.8} />
      <path d="M7.4 20 h9.2" />
    </Ico>
  );
}

export function Palette(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 3.4 a8.6 8.6 0 1 0 0.4 17.2 c 1.8 0 2.2-1.3 1.4-2.4 -0.9-1.3 0-2.8 1.7-2.8 h1.8 a3.1 3.1 0 0 0 3.1-3.1 C 20.2 7.3 16.6 3.4 12 3.4 Z" />
      <circle cx="8" cy="9" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12.4" cy="7" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="16.2" cy="9.6" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="7.6" cy="13.6" r="1.15" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function ClipboardCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="4.6" y="4.6" width="14.8" height="16" rx="2.2" />
      <path d="M9 4.6 V3.4 a1.2 1.2 0 0 1 1.2-1.2 h3.6 A1.2 1.2 0 0 1 15 3.4 v1.2 z" />
      <path d="M9 13.4 l2.2 2.2 4-4.4" />
    </Ico>
  );
}

export function Magnet(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6 3.8 h4.2 V11 a1.8 1.8 0 0 0 3.6 0 V3.8 H18 V11 a6 6 0 0 1 -12 0 Z" />
      <path d="M6 7.4 h4.2 M13.8 7.4 H18" strokeWidth={1.8} />
    </Ico>
  );
}

export function Droplets(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M9.4 3.6 c-2.3 3-3.8 5.3-3.8 7.5 a3.8 3.8 0 0 0 7.6 0 c 0-2.2-1.5-4.5-3.8-7.5 Z" />
      <path d="M17.2 11.2 c-1.7 2.2-2.6 3.7-2.6 5.2 a2.6 2.6 0 0 0 5.2 0 c 0-1.5-0.9-3-2.6-5.2 Z" strokeWidth={1.9} />
    </Ico>
  );
}

/* ————— reading & writing ————— */

export function BookOpen(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 6.6 C 10.1 4.9 7.4 4.3 3.9 4.5 a0.85 0.85 0 0 0-0.8 0.85 V17.6 c 0 0.5 0.4 0.85 0.85 0.85 3.4 0 6.1 0.6 8.05 2.15 1.95-1.55 4.65-2.15 8.05-2.15 a0.85 0.85 0 0 0 0.85-0.85 V5.35 a0.85 0.85 0 0 0-0.8-0.85 C 16.6 4.3 13.9 4.9 12 6.6 Z" />
      <path d="M12 6.9 V20.4" strokeWidth={1.8} />
    </Ico>
  );
}

export function BookOpenCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 6.6 C 10.1 4.9 7.4 4.3 3.9 4.5 a0.85 0.85 0 0 0-0.8 0.85 V17.6 c 0 0.5 0.4 0.85 0.85 0.85 3.4 0 6.1 0.6 8.05 2.15 1.95-1.55 4.65-2.15 8.05-2.15 a0.85 0.85 0 0 0 0.85-0.85 V5.35 a0.85 0.85 0 0 0-0.8-0.85 C 16.6 4.3 13.9 4.9 12 6.6 Z" strokeWidth={1.9} />
      <path d="M14.6 12.4 l2 2 3.4-4" />
    </Ico>
  );
}

export function BookMarked(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.8 3.6 h10.7 a2.2 2.2 0 0 1 2.2 2.2 v12.4 a2.2 2.2 0 0 1-2.2 2.2 H6.8 a2.5 2.5 0 0 1-2.5-2.5 V6.1 a2.5 2.5 0 0 1 2.5-2.5 Z" />
      <path d="M4.5 18.4 a2.3 2.3 0 0 1 2.3-2.3 h12.9" strokeWidth={1.9} />
      <path d="M14.2 3.8 v5.6 l1.9-1.5 1.9 1.5 V3.8" />
    </Ico>
  );
}

export function StickyNote(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M20 13.6 V7 a3 3 0 0 0-3-3 H7 a3 3 0 0 0-3 3 v10 a3 3 0 0 0 3 3 h6.4 z" />
      <path d="M13.4 20 v-3.4 a3 3 0 0 1 3-3 H20" strokeWidth={1.9} />
      <path d="M8 9.4 h6" strokeWidth={1.8} />
    </Ico>
  );
}

export function NotebookPen(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M8.2 3.6 H6.4 a2.2 2.2 0 0 0-2.2 2.2 v12.4 a2.2 2.2 0 0 0 2.2 2.2 h11.2 a2.2 2.2 0 0 0 2.2-2.2 V5.8 a2.2 2.2 0 0 0-2.2-2.2 h-1.8" />
      <path d="M8.2 2.6 v2" />
      <path d="M15.8 2.6 v2" />
      <path d="M8.4 8.2 h7.2" strokeWidth={1.8} />
      <path d="M14.6 12.4 l4 4 -5.2 5.2 -4.3 0.7 0.7-4.3 z" strokeWidth={1.9} />
    </Ico>
  );
}

export function PenLine(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M14.8 4.8 l4.4 4.4 L8.6 19.8 l-5.2 0.8 L4.2 15.4 Z" />
      <path d="M12.6 7 l4.4 4.4" strokeWidth={1.8} />
      <path d="M13.4 21 h7.2" />
    </Ico>
  );
}

export function PencilRuler(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.6 19.4 l0.9-3.6 L15.2 6.1 a1.9 1.9 0 0 1 2.7 0 l0.4 0.4 a1.9 1.9 0 0 1 0 2.7 L8.6 18.9 l-3.6 0.9 z" strokeWidth={1.9} />
      <path d="M13.6 7.7 l2.7 2.7" strokeWidth={1.8} />
      <path d="M3.4 8.6 L8.6 3.4 l2 2 -5.2 5.2 z M5 7 l1.4 1.4 M6.8 5.2 l1.4 1.4" strokeWidth={1.5} />
    </Ico>
  );
}

export function ListChecks(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.2 6.4 l1.5 1.5 2.4-2.8" />
      <path d="M11.6 6.6 h8.2" />
      <path d="M4.2 12.4 l1.5 1.5 2.4-2.8" />
      <path d="M11.6 12.6 h8.2" />
      <path d="M4.2 18.4 l1.5 1.5 2.4-2.8" />
      <path d="M11.6 18.6 h8.2" />
    </Ico>
  );
}

/* ————— time, scores & rewards ————— */

export function Clock(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4 V12 l3.1 2" />
      <path d="M12 3.4 v1" strokeWidth={1.8} />
    </Ico>
  );
}

export function Timer(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="13.6" r="7.4" />
      <path d="M10 2.6 h4" />
      <path d="M12 2.8 v3.2" />
      <path d="M12 13.6 l2.9-2.4" />
      <path d="M12 9.4 v0.9" strokeWidth={1.8} />
    </Ico>
  );
}

export function Target(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.7" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function PieChart(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 12 V3.4" />
      <path d="M12 12 l7.4 4.3" />
    </Ico>
  );
}

export function Trophy(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M7.2 4 h9.6 v5.4 a4.8 4.8 0 0 1-9.6 0 Z" />
      <path d="M7.2 5.4 H3.6 c 0 3.1 1.5 4.8 3.6 5.1" strokeWidth={1.9} />
      <path d="M16.8 5.4 h3.6 c 0 3.1-1.5 4.8-3.6 5.1" strokeWidth={1.9} />
      <path d="M12 14.2 v3" />
      <path d="M8.2 20.4 c 0.2-2 1.7-3.2 3.8-3.2 s 3.6 1.2 3.8 3.2 z" />
    </Ico>
  );
}

export function Award(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="9.4" r="5.7" />
      <path d="M9.2 14.2 L7.6 21.2 12 18.7 16.4 21.2 14.8 14.2" />
    </Ico>
  );
}

export function PartyPopper(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M13.6 10.4 L4.8 19.2 a1.42 1.42 0 0 0 2 2 L15.6 12.4 Z" />
      <path d="M12.4 7.4 c 1-1.7 0.3-2.7 1.3-4.4" strokeWidth={1.9} />
      <path d="M16.6 10.4 c 1.8-0.6 2.3-1.9 4-2.3" strokeWidth={1.9} />
      <circle cx="17.9" cy="4.4" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="3.2" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="20.6" cy="8.4" r="0.85" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function BadgeCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 2.8 l6.6 4 v10.4 l-6.6 4 -6.6-4 V6.8 Z" strokeWidth={1.9} />
      <path d="M8.8 12.2 l2.2 2.2 4.2-4.6" />
    </Ico>
  );
}

export function Sparkles(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M10.4 3.6 c 0.65 3.7 2.05 5.1 5.75 5.75 -3.7 0.65-5.1 2.05-5.75 5.75 -0.65-3.7-2.05-5.1-5.75-5.75 3.7-0.65 5.1-2.05 5.75-5.75 Z" />
      <path d="M18.3 14.2 c 0.34 1.95 1.08 2.7 3.03 3.03 -1.95 0.34-2.7 1.08-3.03 3.03 -0.34-1.95-1.08-2.7-3.03-3.03 1.95-0.34 2.7-1.08 3.03-3.03 Z" strokeWidth={1.8} />
    </Ico>
  );
}

export function Lightbulb(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M8.2 10 a3.8 3.8 0 1 1 7.6 0 c 0 1.7-0.85 2.8-1.7 3.7 -0.6 0.65-0.75 1.1-0.75 2 v0.5 h-2.7 v-0.5 c 0-0.9-0.15-1.35-0.75-2 C 9.05 12.8 8.2 11.7 8.2 10 Z" />
      <path d="M10.9 10.4 c 0.75 0.7 1.45 0.7 2.2 0" strokeWidth={1.7} />
      <path d="M10.2 19.2 h3.6 M10.8 21.4 h2.4" />
    </Ico>
  );
}

export function Footprints(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M3.6 20.4 h4.4 v-4.2 h4.2 v-4.2 h4.2 V7.8 h4" />
      <circle cx="19.4" cy="5.4" r="1" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Gamepad2(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.4" />
      <path d="M13.1 7.6 l-3.5 4.7 h2.6 L11.1 16.4 14.6 11.7 H12 Z" strokeWidth={1.8} />
    </Ico>
  );
}

export function Play(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M8.2 5.9 c 0-1.05 1.15-1.7 2.05-1.15 l 9.3 5.5 c 0.9 0.55 0.9 1.85 0 2.4 l-9.3 5.5 c-0.9 0.55-2.05-0.1-2.05-1.15 Z" />
    </Ico>
  );
}

export function Zap(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M13.4 2.9 L5.6 13.1 h5 L10.4 21.1 18.4 10.7 h-5.2 Z" />
    </Ico>
  );
}

export function Sticker(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M20 12.6 V7 a3 3 0 0 0-3-3 H7 a3 3 0 0 0-3 3 v10 a3 3 0 0 0 3 3 h5.4 z" />
      <path d="M12.4 20 v-3.4 a3 3 0 0 1 3-3 H20" strokeWidth={1.9} />
      <circle cx="9.4" cy="9.8" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="9.8" r="0.95" fill="currentColor" stroke="none" />
      <path d="M9.6 13 c 1.4 1.2 3.4 1.2 4.8 0" strokeWidth={1.8} />
    </Ico>
  );
}

/* ————— theme ————— */

export function Sun(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 2.8 v2.2 M12 19 v2.2 M2.8 12 h2.2 M19 12 h2.2 M5.5 5.5 l1.6 1.6 M16.9 16.9 l1.6 1.6 M18.5 5.5 l-1.6 1.6 M7.1 16.9 l-1.6 1.6" />
    </Ico>
  );
}

export function Moon(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M20.2 14.6 A 8.6 8.6 0 1 1 9.4 3.8 a 6.9 6.9 0 0 0 10.8 10.8 Z" />
      <circle cx="16.8" cy="6.4" r="0.8" fill="currentColor" stroke="none" />
    </Ico>
  );
}

/* sun-moon — the hybrid lab: half day, half night */
export function SunMoon(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 8.6 a 2.7 2.7 0 0 0 3.8 3.8 a 4 4 0 0 1 -3.8 -3.8 Z" />
      <path d="M12 2.6 v1.9 M12 19.5 v1.9 M2.6 12 h1.9 M19.5 12 h1.9 M5.3 5.3 l1.4 1.4 M17.3 17.3 l1.4 1.4 M18.7 5.3 l-1.4 1.4" />
      <path d="M13.2 20.9 A 8.9 8.9 0 1 1 3.1 10.8" />
    </Ico>
  );
}

/* ————— the workshop ————— */

/* sliders — the customize panel: three faders mid-set */
export function Sliders(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M5.4 4.2 v5.4 M5.4 14.4 v5.4" />
      <circle cx="5.4" cy="12" r="2.2" />
      <path d="M12 4.2 v2.4 M12 11.4 v8.4" />
      <circle cx="12" cy="9" r="2.2" />
      <path d="M18.6 4.2 v8.4 M18.6 17.4 v2.4" />
      <circle cx="18.6" cy="15" r="2.2" />
    </Ico>
  );
}
