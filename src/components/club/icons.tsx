import type { ComponentType, SVGProps } from "react";
import type { UnitCode } from "@/lib/spectra/types";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · icons — the house ink set, v2
   Still drawn for this site, not pulled from a stock box — but
   now drawn to one shared discipline so the whole set sits
   together on any page:
     · 24 × 24 grid, ~2px breathing room on every edge
     · primary stroke 2, interior detail 1.7 — nothing between
     · accent dots are filled circles at r 1.05 (glints 0.8)
     · round caps & joins everywhere, no square corners
     · bodies centre on (12, 12); nothing rides the viewport edge
   The chemistry stories stay (bubbles, flasks, orbits, flames) —
   the wobble is now on purpose, not a leftover.
   Names kept identical so call sites read the same.
   ═══════════════════════════════════════════════════════════════ */

type IcoProps = SVGProps<SVGSVGElement>;

function Ico({ children, strokeWidth = 2, ...rest }: IcoProps) {
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
      <rect x="5" y="3.9" width="14" height="16.4" rx="3.2" />
      <path d="M9.2 4.7 V4.1 a1.9 1.9 0 0 1 1.9-1.9 h1.8 a1.9 1.9 0 0 1 1.9 1.9 v.6" />
      <circle cx="8.9" cy="9.7" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 9.7 h3.7" />
      <circle cx="8.9" cy="13.6" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 13.6 h4.5" />
      <path d="M8.8 17.5 h6.4" strokeWidth={1.7} />
    </Ico>
  );
}

/* two overlapping sheets — copy the pack as text */
export function Copy(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="8.7" y="8.7" width="11" height="11" rx="3" />
      <path d="M15.3 5.3 H7.6 a3.2 3.2 0 0 0-3.2 3.2 V16" strokeWidth={1.9} />
    </Ico>
  );
}

/* a printer with a warm little light */
export function Printer(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M7.2 8.9 V5 a1.8 1.8 0 0 1 1.8-1.8 h6 a1.8 1.8 0 0 1 1.8 1.8 V8.9" />
      <rect x="3.9" y="8.9" width="16.2" height="7.1" rx="2.6" />
      <rect x="7.2" y="13.5" width="9.6" height="6.7" rx="1.8" />
      <circle cx="17.1" cy="12" r="1.05" fill="currentColor" stroke="none" />
    </Ico>
  );
}

/* a bookmark ribbon — saved revision sets */
export function Bookmark(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.6 6.7 a3.4 3.4 0 0 1 3.4-3.4 h4 a3.4 3.4 0 0 1 3.4 3.4 V20.9 L12 16.9 6.6 20.9 Z" />
    </Ico>
  );
}

export function Search(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="10.9" cy="10.9" r="6.6" />
      <path d="M15.9 15.9 L20.3 20.3" />
      <path d="M7.9 9.5 a3.5 3.5 0 0 1 2.5-2.5" strokeWidth={1.7} />
    </Ico>
  );
}

export function Home(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.1 11.7 L12 4.3 L19.9 11.7" />
      <path d="M6.3 10.6 V18.7 a1.9 1.9 0 0 0 1.9 1.9 h7.6 a1.9 1.9 0 0 0 1.9-1.9 V10.6" />
      <path d="M10.3 20.4 v-3.3 a1.7 1.7 0 0 1 3.4 0 v3.3" />
    </Ico>
  );
}

export function ArrowLeft(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M19.6 12 H4.9" />
      <path d="M10.8 6.1 L4.8 12 l6 5.9" />
    </Ico>
  );
}

export function ArrowRight(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.4 12 h14.7" />
      <path d="M13.2 6.1 l6 5.9-6 5.9" />
    </Ico>
  );
}

export function MoveRight(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.6 12 h14.6" />
      <path d="M14.1 6.9 L19.2 12 14.1 17.1" />
    </Ico>
  );
}

export function ArrowUp(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 19.6 V4.9" />
      <path d="M6.1 10.8 L12 4.8 l5.9 6" />
    </Ico>
  );
}

export function ChevronDown(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M5.9 9.5 L12 15.5 18.1 9.5" />
    </Ico>
  );
}

export function Check(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.6 12.7 l4.5 4.5 L19.4 6.7" />
    </Ico>
  );
}

export function X(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.4 6.4 L17.6 17.6" />
      <path d="M17.6 6.4 L6.4 17.6" />
    </Ico>
  );
}

export function RotateCcw(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M3.7 4.5 v4.8 h4.8" />
      <path d="M4.5 9.3 a8.1 8.1 0 1 1 -0.5 4.5" />
    </Ico>
  );
}

export function Eye(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M2.9 12 C5.1 7.7 8.3 5.5 12 5.5 s6.9 2.2 9.1 6.5 C18.9 16.3 15.7 18.5 12 18.5 S5.1 16.3 2.9 12 Z" />
      <circle cx="12" cy="12" r="2.9" />
      <circle cx="12.9" cy="11.1" r="0.75" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function EyeOff(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M10.6 5.2 C11.1 5.1 11.5 5.1 12 5.1 c3.7 0 6.9 2.2 9.1 6.5 -0.6 1.1-1.2 2-2 2.9" />
      <path d="M6.2 6.2 C4.1 7.6 2.9 9.7 2.9 12 c2.2 4.3 5.4 6.5 9.1 6.5 1.5 0 2.9-0.4 4.2-1" />
      <path d="M9.9 9.9 a3 3 0 0 0 4.2 4.2" />
      <path d="M4.2 4.2 L19.8 19.8" />
    </Ico>
  );
}

export function Lock(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="4.7" y="10.9" width="14.6" height="9.5" rx="2.7" />
      <path d="M8.5 10.9 V7.9 a3.5 3.5 0 0 1 7 0 V10.9" />
      <circle cx="12" cy="15.6" r="1.05" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Info(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="8.1" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 11.5 V16.3" />
    </Ico>
  );
}

/* ————— chemistry & subjects ————— */

export function FlaskConical(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M9.4 3.4 h5.2" />
      <path d="M10.6 3.6 v4.7 L5.6 18.5 a1.27 1.27 0 0 0 1.15 1.8 h10.5 a1.27 1.27 0 0 0 1.15-1.8 L13.4 8.3 V3.6" />
      <path d="M7.7 14.7 h8.6" strokeWidth={1.8} />
      <circle cx="11" cy="17.4" r="0.85" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Atom(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.1" ry="3.6" strokeWidth={1.7} />
      <ellipse cx="12" cy="12" rx="9.1" ry="3.6" strokeWidth={1.7} transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.1" ry="3.6" strokeWidth={1.7} transform="rotate(120 12 12)" />
    </Ico>
  );
}

export function Flame(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 3.3 C12 3.3 6.3 8.3 6.3 13.4 a5.7 5.7 0 0 0 11.4 0 C17.7 8.3 12 3.3 12 3.3 Z" />
      <path d="M12 10.7 c-1.4 1.6-2.1 2.8-2.1 3.9 a2.1 2.1 0 0 0 4.2 0 c0-1.1-0.7-2.3-2.1-3.9 Z" strokeWidth={1.8} />
    </Ico>
  );
}

export function TestTubes(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M5.4 4.2 h5.8" />
      <path d="M6.5 4.4 v9.2 a1.85 1.85 0 0 0 3.7 0 V4.4" />
      <path d="M6.5 10.1 h3.7" strokeWidth={1.7} />
      <path d="M12.8 4.2 h5.8" />
      <path d="M13.9 4.4 v9.2 a1.85 1.85 0 0 0 3.7 0 V4.4" />
      <path d="M4.4 20.2 c2.3-1.4 4.3-1.4 5.5 0 1.4-1.5 3.1-1.5 4.5 0 1.2-1.3 2.9-1.3 5.2 0" strokeWidth={1.8} />
      <circle cx="16.9" cy="8.4" r="0.8" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Gauge(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M3.9 16.9 A8.1 8.1 0 0 1 20.1 16.9" />
      <path d="M12 16.9 L16.1 11.6" />
      <circle cx="12" cy="16.9" r="1.1" fill="currentColor" stroke="none" />
      <path d="M6.2 12.4 l0.9 0.8 M17.8 12.4 l-0.9 0.8" strokeWidth={1.7} />
      <path d="M7.6 20.1 h8.8" />
    </Ico>
  );
}

export function Palette(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 3.4 a8.6 8.6 0 1 0 0.4 17.2 c1.8 0 2.2-1.3 1.4-2.4 -0.9-1.3 0-2.8 1.7-2.8 h1.8 a3.1 3.1 0 0 0 3.1-3.1 C20.2 7.3 16.6 3.4 12 3.4 Z" />
      <circle cx="8.1" cy="9.1" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="12.4" cy="7.1" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="16.2" cy="9.7" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="7.7" cy="13.7" r="1.05" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function ClipboardCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="4.7" y="4.5" width="14.6" height="16.2" rx="2.8" />
      <path d="M9.1 4.5 V4.1 a1.9 1.9 0 0 1 1.9-1.9 h2 a1.9 1.9 0 0 1 1.9 1.9 V4.5" />
      <path d="M9 13.7 l2.2 2.2 3.9-4.3" />
    </Ico>
  );
}

export function Magnet(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.2 3.9 h4.1 V11 a1.7 1.7 0 0 0 3.4 0 V3.9 H17.8 V11 a5.8 5.8 0 0 1-11.6 0 Z" />
      <path d="M6.2 7.5 h4.1 M13.7 7.5 h4.1" strokeWidth={1.7} />
    </Ico>
  );
}

export function Droplets(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M9.5 3.7 c-2.2 2.9-3.7 5.2-3.7 7.3 a3.7 3.7 0 0 0 7.4 0 c0-2.1-1.5-4.4-3.7-7.3 Z" />
      <path d="M17.1 11.3 c-1.6 2.1-2.5 3.6-2.5 5 a2.5 2.5 0 0 0 5 0 c0-1.4-0.9-2.9-2.5-5 Z" strokeWidth={1.8} />
    </Ico>
  );
}

/* two atoms joined by a double bond — structure & bonding */
export function BondDuo(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="7.8" cy="15.2" r="3.2" />
      <circle cx="16.2" cy="8.8" r="3.2" />
      <path d="M9.6 12.3 L12.9 9.8" strokeWidth={1.7} />
      <path d="M11.1 14.2 L14.4 11.7" strokeWidth={1.7} />
    </Ico>
  );
}

/* the balance — rates, equilibria, opposing pulls even out */
export function Balance(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.9 6.4 H19.1" />
      <circle cx="12" cy="6.4" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 6.4 V19.9" />
      <path d="M8.5 20 H15.5" />
      <path d="M4.9 6.4 L3 10.6 M4.9 6.4 L6.8 10.6" strokeWidth={1.7} />
      <path d="M3 10.6 q1.9 2.1 3.8 0" strokeWidth={1.7} />
      <path d="M19.1 6.4 L17.2 10.6 M19.1 6.4 L21 10.6" strokeWidth={1.7} />
      <path d="M17.2 10.6 q1.9 2.1 3.8 0" strokeWidth={1.7} />
    </Ico>
  );
}

/* the benzene ring — aromatics and the nitrogen chemistry on it */
export function HexRing(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 4.6 L18.3 8.3 V15.7 L12 19.4 L5.7 15.7 V8.3 Z" />
      <circle cx="12" cy="12" r="3.3" strokeWidth={1.7} />
    </Ico>
  );
}

/* the burette — practical skills: measured, one drop at a time */
export function Burette(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M9.5 3.6 h5" />
      <path d="M10.3 3.6 V12.2 M13.7 3.6 V12.2" />
      <path d="M10.3 7.9 h3.4" strokeWidth={1.7} />
      <path d="M10.3 12.2 L11.6 15.5 M13.7 12.2 L12.4 15.5" />
      <path d="M10.5 14 h3" strokeWidth={1.7} />
      <path d="M12 15.5 V17.1" />
      <circle cx="12" cy="19.6" r="1.05" fill="currentColor" stroke="none" />
    </Ico>
  );
}

/* ————— unit glyphs ————— one chemistry story per unit, in spec
   order. The glyph rides wherever a unit needs a face: home cards,
   the unit header badge, the desk tray, the footer, the sticker
   book. Numbers still label the pages; the glyph says what the
   unit is about. */

export const UNIT_GLYPH: Record<UnitCode, ComponentType<IcoProps>> = {
  WCH11: BondDuo,
  WCH12: Flame,
  WCH13: TestTubes,
  WCH14: Balance,
  WCH15: HexRing,
  WCH16: Burette,
};

export function UnitGlyph({ code, ...rest }: IcoProps & { code: UnitCode }) {
  const Glyph = UNIT_GLYPH[code];
  return <Glyph {...rest} />;
}

/* ————— reading & writing ————— */

export function BookOpen(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 6.7 C10.1 5 7.4 4.4 3.9 4.6 a0.86 0.86 0 0 0-0.8 0.86 V17.7 c0 0.48 0.4 0.86 0.87 0.86 3.4 0.02 6.1 0.62 8.03 2.14 1.93-1.52 4.63-2.12 8.03-2.14 a0.86 0.86 0 0 0 0.87-0.86 V5.46 a0.86 0.86 0 0 0-0.8-0.86 C16.6 4.4 13.9 5 12 6.7 Z" />
      <path d="M12 7 V20.5" strokeWidth={1.7} />
    </Ico>
  );
}

export function BookOpenCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 6.7 C10.1 5 7.4 4.4 3.9 4.6 a0.86 0.86 0 0 0-0.8 0.86 V17.7 c0 0.48 0.4 0.86 0.87 0.86 3.4 0.02 6.1 0.62 8.03 2.14 1.93-1.52 4.63-2.12 8.03-2.14 a0.86 0.86 0 0 0 0.87-0.86 V5.46 a0.86 0.86 0 0 0-0.8-0.86 C16.6 4.4 13.9 5 12 6.7 Z" strokeWidth={1.9} />
      <path d="M14.7 12.6 l2 2 3.3-3.9" />
    </Ico>
  );
}

export function BookMarked(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M6.9 3.7 h10.6 a2.2 2.2 0 0 1 2.2 2.2 v12.3 a2.2 2.2 0 0 1-2.2 2.2 H6.9 a2.4 2.4 0 0 1-2.4-2.4 V6.1 a2.4 2.4 0 0 1 2.4-2.4 Z" />
      <path d="M4.6 18.4 a2.3 2.3 0 0 1 2.3-2.3 h12.8" strokeWidth={1.8} />
      <path d="M14.3 3.9 v5.5 l1.85-1.5 1.85 1.5 V3.9" />
    </Ico>
  );
}

export function StickyNote(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M20 13.5 V7 a3 3 0 0 0-3-3 H7 a3 3 0 0 0-3 3 v10 a3 3 0 0 0 3 3 h6.5 Z" />
      <path d="M13.5 20 v-3.5 a3 3 0 0 1 3-3 H20" strokeWidth={1.9} />
      <path d="M8 9.5 h6" strokeWidth={1.7} />
    </Ico>
  );
}

export function NotebookPen(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M8.3 3.6 H6.5 a2.2 2.2 0 0 0-2.2 2.2 v12.4 a2.2 2.2 0 0 0 2.2 2.2 h11 a2.2 2.2 0 0 0 2.2-2.2 V5.8 a2.2 2.2 0 0 0-2.2-2.2 h-1.8" />
      <path d="M8.3 2.6 v2 M15.7 2.6 v2" strokeWidth={1.8} />
      <path d="M8.5 8.3 h7" strokeWidth={1.7} />
      <path d="M14.6 12.5 l3.9 3.9-5 5-4.2 0.7 0.7-4.2 Z" strokeWidth={1.9} />
    </Ico>
  );
}

export function PenLine(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M14.9 4.9 l4.2 4.2 L8.7 19.5 3.6 20.4 4.5 15.3 Z" />
      <path d="M12.8 7 l4.2 4.2" strokeWidth={1.8} />
      <path d="M13.5 21 h7" />
    </Ico>
  );
}

export function PencilRuler(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.6 19.4 l0.9-3.5 L16.1 5.3 a1.85 1.85 0 0 1 2.6 0 l0.55 0.55 a1.85 1.85 0 0 1 0 2.6 L8.6 18.9 l-4 0.5 Z" strokeWidth={1.9} />
      <path d="M13.9 7.5 l2.6 2.6" strokeWidth={1.7} />
      <path d="M3.5 8.5 L8.5 3.5 l2 2-5 5 Z M5.1 6.9 6.5 8.3 M6.9 5.1 8.3 6.5" strokeWidth={1.5} />
    </Ico>
  );
}

export function ListChecks(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M4.1 6.4 l1.5 1.5 2.4-2.8" />
      <path d="M11.7 6.6 h8.2" />
      <path d="M4.1 12.2 l1.5 1.5 2.4-2.8" />
      <path d="M11.7 12.4 h8.2" />
      <path d="M4.1 18 l1.5 1.5 2.4-2.8" />
      <path d="M11.7 18.2 h8.2" />
    </Ico>
  );
}

/* ————— time, scores & rewards ————— */

export function Clock(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.3 V12 l3.1 2" />
      <circle cx="12" cy="12" r="1.05" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Timer(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="13.7" r="7.3" />
      <path d="M10 2.7 h4" />
      <path d="M12 2.9 V6.3" />
      <path d="M12 13.7 l2.9-2.4" />
    </Ico>
  );
}

export function Target(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.7" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
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
      <path d="M7.3 4 h9.4 v5.3 a4.7 4.7 0 0 1-9.4 0 Z" />
      <path d="M7.3 5.4 H3.7 c0 3 1.5 4.7 3.6 5" strokeWidth={1.9} />
      <path d="M16.7 5.4 h3.6 c0 3-1.5 4.7-3.6 5" strokeWidth={1.9} />
      <path d="M12 14 v3" />
      <path d="M8.3 20.3 c0.2-1.9 1.7-3 3.7-3 s3.5 1.1 3.7 3 Z" />
    </Ico>
  );
}

export function Award(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="9.4" r="5.6" />
      <path d="M9.3 14.1 L7.7 21 12 18.6 16.3 21 14.7 14.1" />
    </Ico>
  );
}

export function PartyPopper(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M13.7 10.3 L4.9 19.1 a1.4 1.4 0 0 0 2 2 L15.7 12.3 Z" />
      <path d="M12.5 7.5 c1-1.7 0.3-2.7 1.3-4.4" strokeWidth={1.9} />
      <path d="M16.7 10.5 c1.8-0.6 2.3-1.9 4-2.3" strokeWidth={1.9} />
      <circle cx="17.9" cy="4.5" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="3.3" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="20.6" cy="8.5" r="0.85" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function BadgeCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 2.8 l6.6 4 V17.2 L12 21.2 5.4 17.2 V6.8 Z" strokeWidth={1.9} />
      <path d="M8.8 12.2 l2.2 2.2 4.2-4.6" />
    </Ico>
  );
}

export function Sparkles(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M10.4 3.6 c0.65 3.7 2.05 5.1 5.75 5.75 -3.7 0.65-5.1 2.05-5.75 5.75 -0.65-3.7-2.05-5.1-5.75-5.75 3.7-0.65 5.1-2.05 5.75-5.75 Z" />
      <path d="M18.3 14.2 c0.34 1.95 1.08 2.7 3.03 3.03 -1.95 0.34-2.7 1.08-3.03 3.03 -0.34-1.95-1.08-2.7-3.03-3.03 1.95-0.34 2.7-1.08 3.03-3.03 Z" strokeWidth={1.8} />
    </Ico>
  );
}

export function Lightbulb(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M8.2 10 a3.8 3.8 0 1 1 7.6 0 c0 1.7-0.85 2.8-1.7 3.7 -0.6 0.65-0.75 1.1-0.75 2 v0.5 h-2.7 v-0.5 c0-0.9-0.15-1.35-0.75-2 C9.05 12.8 8.2 11.7 8.2 10 Z" />
      <path d="M10.9 10.4 c0.75 0.7 1.45 0.7 2.2 0" strokeWidth={1.7} />
      <path d="M10.2 19.2 h3.6 M10.8 21.4 h2.4" strokeWidth={1.8} />
    </Ico>
  );
}

/* rising steps — progress, one topic at a time */
export function Footprints(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M3.6 20.3 h4.3 v-4.2 h4.3 v-4.2 h4.3 V7.7 h4" />
      <circle cx="19.4" cy="5.3" r="1.05" fill="currentColor" stroke="none" />
    </Ico>
  );
}

export function Gamepad2(p: IcoProps) {
  return (
    <Ico {...p}>
      <rect x="3.7" y="3.7" width="16.6" height="16.6" rx="4.4" />
      <path d="M13 7.9 l-3.1 3.8 h2.3 L11 16.1 14.1 12.3 h-2.3 Z" strokeWidth={1.8} />
    </Ico>
  );
}

export function Play(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M8.3 6 c0-1 1.1-1.65 2-1.1 l9.1 5.4 c0.9 0.55 0.9 1.85 0 2.4 L10.3 18.1 c-0.9 0.55-2-0.1-2-1.1 Z" />
    </Ico>
  );
}

export function Zap(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M13.3 2.9 L5.7 13 h4.9 L10.6 21.1 18.3 10.9 h-5 Z" />
    </Ico>
  );
}

export function Sticker(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M20 12.6 V7 a3 3 0 0 0-3-3 H7 a3 3 0 0 0-3 3 v10 a3 3 0 0 0 3 3 h5.5 Z" />
      <path d="M12.5 20 v-3.4 a3 3 0 0 1 3-3 H20" strokeWidth={1.9} />
      <circle cx="9.5" cy="9.9" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="9.9" r="0.95" fill="currentColor" stroke="none" />
      <path d="M9.7 13 c1.35 1.15 3.25 1.15 4.6 0" strokeWidth={1.8} />
    </Ico>
  );
}

/* ————— theme — one glyph across the whole set: the moon. The
   chip behind it (see THEME_CHIP in prefs.ts) names the room —
   daylight white for light, navy for night, chocolate for dune and
   the diagonal black/white cut for classic. SunMoon survives for
   prose that talks about the whole set. */

/* night — the crescent with a four-point star beside it */
export function Moon(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M20.2 14.7 A8.5 8.5 0 1 1 9.3 3.8 a6.8 6.8 0 0 0 10.9 10.9 Z" />
      <path
        d="M16.6 3.9 c0.28 1.55 0.75 2.02 2.3 2.3 -1.55 0.28-2.02 0.75-2.3 2.3 -0.28-1.55-0.75-2.02-2.3-2.3 1.55-0.28 2.02-0.75 2.3-2.3 Z"
        strokeWidth={1.5}
      />
    </Ico>
  );
}

/* the whole set, in prose — rays off a sun, a crescent riding it */
export function SunMoon(p: IcoProps) {
  return (
    <Ico {...p}>
      <circle cx="12" cy="12" r="5.2" />
      <path d="M12 7.8 a4.2 4.2 0 0 1 0 8.4 a3.2 3.2 0 0 0 0 -8.4 Z" strokeWidth={1.7} />
      <path d="M5.4 12 H3.4" strokeWidth={1.8} />
      <path d="M7.6 7.6 L6.1 6.1" strokeWidth={1.8} />
      <path d="M7.6 16.4 L6.1 17.9" strokeWidth={1.8} />
    </Ico>
  );
}

/* classic's chip is cut on the diagonal — espresso on the top-left,
   cream on the bottom-right, the exact pair the classic notes step
   through — so no single ink reads across it. This moon is painted
   twice: a wide cream rim underneath (reads on the espresso half)
   and an espresso face on top (reads on the cream half). Same
   crescent and star as the night moon above. */
const MOON_PATHS = [
  "M20.2 14.7 A8.5 8.5 0 1 1 9.3 3.8 a6.8 6.8 0 0 0 10.9 10.9 Z",
  "M16.6 3.9 c0.28 1.55 0.75 2.02 2.3 2.3 -1.55 0.28-2.02 0.75-2.3 2.3 -0.28-1.55-0.75-2.02-2.3-2.3 1.55-0.28 2.02-0.75 2.3-2.3 Z",
] as const;

export function ClassicMoon(p: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      aria-hidden
      {...p}
    >
      {/* rim pass — the cream that carries the shape on espresso */}
      <g
        stroke="#FDF6E3"
        strokeWidth={4.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {MOON_PATHS.map((d) => (
          <path key={`rim-${d}`} d={d} />
        ))}
      </g>
      {/* face pass — the espresso that carries it on cream */}
      <g
        stroke="#2C2013"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {MOON_PATHS.map((d, i) => (
          <path key={d} d={d} strokeWidth={i === 0 ? 2.1 : 1.5} />
        ))}
      </g>
    </svg>
  );
}

/* ————— privacy & keys ————— */

/* shield with a tick — private by design */
export function ShieldCheck(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M12 3 L19.4 6 V11.5 C19.4 16.3 16.2 19.2 12 20.6 7.8 19.2 4.6 16.3 4.6 11.5 V6 Z" strokeWidth={1.9} />
      <path d="M8.9 11.9 l2.2 2.2 4.2-4.6" />
    </Ico>
  );
}

/* the command key — press ⌘K anywhere */
export function Command(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M15 6 V18 a3 3 0 1 0 3-3 H6 a3 3 0 1 0 3 3 V6 a3 3 0 1 0-3 3 h12 a3 3 0 1 0-3-3" strokeWidth={1.9} />
    </Ico>
  );
}

/* ————— the workshop ————— */

/* sliders — the customize panel: three faders mid-set */
export function Sliders(p: IcoProps) {
  return (
    <Ico {...p}>
      <path d="M5.4 4.2 v5.6 M5.4 14.2 v5.6" />
      <circle cx="5.4" cy="12" r="2.1" />
      <path d="M12 4.2 v2.6 M12 11.2 v8.6" />
      <circle cx="12" cy="9" r="2.1" />
      <path d="M18.6 4.2 v8.6 M18.6 17.2 v2.6" />
      <circle cx="18.6" cy="15" r="2.1" />
    </Ico>
  );
}
