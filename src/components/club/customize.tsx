"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, RotateCcw, Sparkles, Maximize, Minimize, Palette, Home, BookOpen, ClipboardList, Sticker, ShieldCheck, NotebookPen, X } from "./icons";
import { readableInk, shade, tint } from "./bits";
import { accentOf } from "./bands";
import { EditorialLabel } from "./sample-blocks";
import {
  ACCENTS,
  DEFAULT_PREFS,
  IFACE_DESCRIPTION,
  IFACE_LABEL,
  IFACE_ORDER,
  LAB_DESCRIPTION,
  LAB_LABEL,
  LAB_ORDER,
  SCALES,
  SPEC_DENSITIES,
  SPEC_HEIGHTS,
  setPrefs,
  THEME_CHIP,
  usePrefs,
  type AccentId,
  type BodyFont,
  type HeadFont,
  type Iface,
  type Lab,
  type Prefs,
} from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the customize panel
   A slide-over workshop with two dresses, one per interface:

   · editorial — the workshop set as a document: the legal
     room's own furniture (kicker pill, numbered clauses with their
     running hairlines, exhibit trays, the etoc toggle, the rust
     cursor) re-dresses every knob, and the rust reads --iface-rust
     so it travels the labs exactly as the document room does.
   · gallery — the same workshop hung as a leaflet: the white-wall
     room's own furniture (dash-caps labels, accent numerals,
     hairline-ruled tables, the reader's pack tick as the on/off
     knob) re-dresses every knob, and the accent reads
     --iface-accent so it travels the labs exactly as the reader
     does — plum-grounded after dark, lamplit by champagne.

   Every knob lands in prefs.ts and re-skins the site from <html>
   outward; switching interface inside the panel swaps the dress
   live. Only the furniture differs — the prefs contract is one.
   ═══════════════════════════════════════════════════════════════ */

const HEAD_FONTS: { id: HeadFont; label: string; stack: string }[] = [
  { id: "fredoka", label: "Fredoka", stack: "var(--font-fredoka), 'Trebuchet MS', sans-serif" },
  { id: "baloo", label: "Baloo 2", stack: "var(--font-baloo), 'Trebuchet MS', sans-serif" },
  { id: "patrick", label: "Patrick Hand", stack: "var(--font-patrick), 'Comic Sans MS', cursive" },
];

const BODY_FONTS: { id: BodyFont; label: string; stack: string }[] = [
  { id: "quicksand", label: "Quicksand", stack: "var(--font-quicksand), 'Trebuchet MS', sans-serif" },
  { id: "nunito", label: "Nunito", stack: "var(--font-nunito), 'Trebuchet MS', sans-serif" },
];

const SCALE_PX = [12, 14, 16, 19];

/* the interface cards' live miniatures — two abstract rooms. The
   gallery dress shows the white-wall room: accent dash, big quiet
   headline, a hairline ledger of accent numerals (the rollout
   plaque — little T9, "Topic 9 today" — retired now the dress
   serves every note); the editorial dress shows the document
   room: kicker pill, headline rule, numbered clause rails. */
function IfaceStage({ id }: { id: Iface }) {
  if (id === "gallery") {
    return (
      <span aria-hidden className="relative block rounded-[12px] border border-ink/[0.08] bg-paper px-2.5 py-2.5">
        <span className="block h-[2px] w-[14px] rounded-full" style={{ background: "#b3762f" }} />
        <span className="mt-2 block h-[7px] w-3/4 rounded-full bg-ink/40" />
        <span className="mt-1.5 block h-[7px] w-1/2 rounded-full bg-ink/15" />
        <span className="mt-2.5 block h-px w-full bg-ink/10" />
        <span className="mt-2 flex items-center gap-1.5">
          <span className="font-display text-[11px] leading-none font-semibold tabular-nums" style={{ color: "#b3762f" }}>
            01
          </span>
          <span className="block h-[5px] flex-1 rounded-full bg-ink/15" />
        </span>
        <span className="mt-1.5 flex items-center gap-1.5">
          <span className="font-display text-[11px] leading-none font-semibold tabular-nums" style={{ color: "#b3762f" }}>
            02
          </span>
          <span className="block h-[5px] flex-1 rounded-full bg-ink/15" />
        </span>
      </span>
    );
  }
  return (
    <span aria-hidden className="block rounded-[12px] border border-ink/[0.08] bg-paper p-2.5">
      <span className="block h-[8px] w-[40px] rounded-full" style={{ background: "#b66c4e" }} />
      <span className="mt-1.5 block h-[6px] w-3/4 rounded-full bg-ink/30" />
      <span className="mt-1 block h-[6px] w-1/2 rounded-full bg-ink/15" />
      <span className="mt-2.5 block h-px w-full bg-ink/12" />
      <span className="mt-2 flex items-center gap-1.5">
        <span className="h-[9px] w-[9px] shrink-0 rounded-full border border-ink/30" />
        <span className="block h-[5px] flex-1 rounded-full bg-ink/15" />
      </span>
      <span className="mt-1.5 flex items-center gap-1.5">
        <span className="h-[9px] w-[9px] shrink-0 rounded-full border border-ink/30" />
        <span className="block h-[5px] flex-1 rounded-full bg-ink/15" />
      </span>
    </span>
  );
}

function Section({
  title,
  hint,
  dot = "#FF922B",
  children,
}: {
  title: string;
  hint?: string;
  dot?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: dot }} />
        <div className="font-display text-[11.5px] font-bold tracking-[0.18em] text-ink-faint uppercase">
          {title}
        </div>
      </div>
      {hint && <p className="mt-1.5 text-[12px] leading-snug font-bold text-ink-faint">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Toggle({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[calc(22px*var(--ui-scale))] bg-ink/[0.045] px-4 py-3.5 text-left transition-colors hover:bg-ink/[0.08]"
    >
      <span className="min-w-0">
        <span className="block font-display text-[14px] font-semibold text-ink">{label}</span>
        {hint && (
          <span className="block text-[11.5px] font-bold text-ink-faint">{hint}</span>
        )}
      </span>
      <span
        aria-hidden
        className="relative h-[calc(26px*var(--ui-scale))] w-[calc(46px*var(--ui-scale))] shrink-0 rounded-full transition-colors"
        style={{
          background: on ? "#12B886" : "color-mix(in oklab, var(--color-ink) 16%, transparent)",
          boxShadow: on
            ? "inset 0 1px 2px rgb(0 0 0 / 0.18)"
            : "inset 0 1px 2px rgb(0 0 0 / 0.14)",
        }}
      >
        <m.span
          className="absolute top-[calc(3px*var(--ui-scale))] h-5 w-5 rounded-full bg-white shadow-sm"
          /* percentage targets, not px: the track (w-[46px]) and the
             knob (h-5 w-5) both ride --ui-scale, so a percentage
             stays aligned at every scale step while a px target
             would strand the knob short of its end stop */
          animate={{ left: on ? "50%" : "6.5217%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </span>
    </button>
  );
}

/* ————— one lab, as a live miniature —————
   the actual palette each room wears, painted at stamp size so
   picking a lab is picking what you see, not reading a label.
   The dark miniature is Night (velvet dusk), and Dune is the
   chocolate room with its low amber lamp. */

function LabStage({ id }: { id: Lab }) {
  if (id === "light") {
    return (
      <span className="relative block h-14 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[#fff6ea] shadow-[inset_0_0_0_1px_rgb(61_43_31/0.08)]">
        <span className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-[#ffd43b]/70" />
        <span className="absolute top-3 left-2 h-5 w-9 rounded-md bg-[#fffdf7] shadow-[0_1.5px_0_rgb(61_43_31/0.1)]" />
        <span className="absolute bottom-2 left-2 flex items-center gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#ff922b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#12b886]" />
        </span>
      </span>
    );
  }
  if (id === "dark") {
    return (
      <span className="relative block h-14 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[#17131d] shadow-[inset_0_0_0_1px_rgb(255_246_234/0.08)]">
        <span
          className="absolute inset-0"
          style={{ background: "radial-gradient(42px 30px at 68% 12%, rgb(174 130 194 / 0.28), transparent 70%)" }}
        />
        <span className="absolute top-3 left-2 h-5 w-9 rounded-md bg-[#30263d] shadow-[0_1.5px_0_rgb(0_0_0/0.35)]" />
        <span className="absolute bottom-2 left-2 flex items-center gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-[#f59f00]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#12b886]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
        </span>
      </span>
    );
  }
  if (id === "dune") {
    return (
      <span className="relative block h-14 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[#1e1b16] shadow-[inset_0_0_0_1px_rgb(246_240_230/0.08)]">
        <span
          className="absolute inset-0"
          style={{ background: "radial-gradient(42px 30px at 68% 12%, rgb(255 196 120 / 0.22), transparent 70%)" }}
        />
        <span className="absolute top-3 left-2 h-5 w-9 rounded-md bg-[#2e2820] shadow-[0_1.5px_0_rgb(0_0_0/0.35)]" />
        <span className="absolute bottom-2 left-2 flex items-center gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-[#ffd43b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#12b886]" />
        </span>
      </span>
    );
  }
  return (
    <span className="relative block h-14 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[linear-gradient(115deg,#2c2013_49.5%,#fdf6e3_50.5%)] shadow-[inset_0_0_0_1px_rgb(61_43_31/0.1)]">
      <span className="absolute top-3 left-2 h-5 w-7 rounded-md bg-[#fdf6e3]/90" />
      <span className="absolute top-4.5 right-2 h-5 w-7 rounded-md bg-[#2c2013]/90" />
      <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1">
        <i className="h-1.5 w-1.5 rounded-full bg-[#fdf6e3]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#2c2013]" />
      </span>
    </span>
  );
}

/* The same palette mark and theme swatches used by the navbar. */
function LabChip({ id }: { id: Lab }) {
  const chip = THEME_CHIP[id];
  return (
    <span
      aria-hidden
      className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
      style={{ background: chip.bg, boxShadow: `0 1.5px 0 ${chip.side}` }}
    >
      <Palette className="h-[11px] w-[11px]" strokeWidth={2.2} style={{ color: chip.ink }} />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The editorial dress — the same workshop, set as a document.
   When the site wears the editorial interface the drawer re-sets
   itself in the legal room's own language: the real .legal-kicker
   pill, numbered clause headers with their running hairline,
   .legal-card exhibit trays, the etoc toggle as the exit, the
   revised-checkbox recipe for the on/off knobs, and the
   wayfinder's rust cursor as the drawer grip. Every knob writes
   the same prefs; only the furniture changes. The rust reads
   var(--iface-rust) — the token html[data-iface="editorial"]
   already travels with, so it follows the labs on its own.
   ═══════════════════════════════════════════════════════════════ */

const RUST = "var(--iface-rust)";

/* the state stamp — IN USE flooded with the room's rust, SELECT a
   quiet ink-washed chip; the .legal-summary-stamp recipe at the
   etoc-link.is-active colours */
function EdStamp({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2 py-[3px] font-display text-[calc(8px*var(--ui-scale))] leading-none font-extrabold tracking-[0.12em] uppercase"
      style={
        on
          ? { background: RUST, color: "var(--color-paper)" }
          : {
              background: "color-mix(in oklab, var(--color-ink) 5%, transparent)",
              color: "var(--color-ink-faint)",
            }
      }
    >
      {children}
    </span>
  );
}

/* a numbered clause header — rust numeral, caps title, and the
   hairline that runs out to the section's right edge, exactly as
   the etoc head rules its CONTENTS line */
function EdSection({
  n,
  title,
  meta,
  children,
}: {
  n: number;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-ink/[0.09] pt-4">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="font-display text-[calc(10px*var(--ui-scale))] leading-none font-extrabold tabular-nums"
          style={{ color: RUST }}
        >
          {String(n).padStart(2, "0")}
        </span>
        <span className="legal-meta">{title}</span>
        <span
          aria-hidden
          className="h-px min-w-4 flex-1"
          style={{ background: "color-mix(in oklab, var(--color-ink) 10%, transparent)" }}
        />
        {meta && <span className="legal-meta">{meta}</span>}
      </div>
      <div className="mt-3.5">{children}</div>
    </section>
  );
}

/* the on/off knob, editorially — the mark-as-revised checkbox: a
   dashed square that floods with rust and ticks when it's on */
function EdCheckboxRow({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="flex w-full cursor-pointer items-center gap-3.5 border-t border-ink/[0.08] py-3.5 text-left transition-colors first:border-t-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-rust)]"
    >
      <span
        aria-hidden
        className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[8px] transition-colors"
        style={
          on
            ? { background: RUST, color: "var(--color-paper)" }
            : {
                border:
                  "1.5px dashed color-mix(in oklab, var(--color-ink) 30%, transparent)",
                color: "var(--color-ink-faint)",
              }
        }
      >
        {on && <Check className="h-3.5 w-3.5" strokeWidth={2.8} />}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[calc(14px*var(--ui-scale))] font-semibold text-ink">
          {label}
        </span>
        <span className="block text-[calc(11px*var(--ui-scale))] leading-snug text-ink-faint">
          {hint}
        </span>
      </span>
    </button>
  );
}

/* the typeface table — a hairline-ruled list with each family set
   in its own hand, the chosen one washed and stamped */
function EdFontTable<T extends { id: string; label: string; stack: string }>({
  rows,
  activeId,
  onPick,
  ariaPrefix,
}: {
  rows: T[];
  activeId: string;
  onPick: (id: T["id"]) => void;
  ariaPrefix: string;
}) {
  return (
    <div className="mt-2 overflow-hidden rounded-[14px] border border-ink/[0.09]">
      {rows.map((f, i) => {
        const active = activeId === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onPick(f.id)}
            aria-pressed={active}
            aria-label={`${ariaPrefix} ${f.label}`}
            className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--iface-rust)] ${
              i > 0 ? "border-t border-ink/[0.08]" : ""
            }`}
            style={
              active
                ? { background: "color-mix(in oklab, var(--color-ink) 4%, var(--color-paper))" }
                : undefined
            }
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-ink/[0.12] bg-paper text-[calc(18px*var(--ui-scale))] leading-none font-bold text-ink"
              style={{ fontFamily: f.stack }}
            >
              Aa
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink">
                {f.label}
              </span>
              <span
                className="block truncate text-[calc(11.5px*var(--ui-scale))] text-ink-faint"
                style={{ fontFamily: f.stack }}
              >
                The quick brown fox
              </span>
            </span>
            <EdStamp on={active}>{active ? "In use" : "Select"}</EdStamp>
          </button>
        );
      })}
    </div>
  );
}

export function CustomizePanel({
  open,
  onClose,
  onHome,
  onOpenSpec,
  onOpenPack,
  onOpenProgress,
  onOpenLegal,
  fullscreen,
  onToggleFullscreen,
}: {
  open: boolean;
  onClose: () => void;
  onHome: () => void;
  onOpenSpec: () => void;
  onOpenPack: () => void;
  onOpenProgress: () => void;
  onOpenLegal: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const prefs = usePrefs();
  /* which dress the panel itself wears — flipping interface inside
     the panel re-dresses it live; the prefs contract never changes */
  const ed = prefs.iface === "editorial";
  const gal = prefs.iface === "gallery";

  /* Esc closes · the page behind holds still while the panel is out */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const pickLab = (lab: Lab) => {
    if (lab === prefs.theme) return;
    setPrefs({ theme: lab });
  };

  /* tap a swatch to put it on (or take it off) the wheel — the
     bands behind the panel re-dress as you tap. The wheel keeps at
     least one colour on: with nothing to alternate, there's no
     wheel. */
  const toggleAccent = (id: AccentId) => {
    if (prefs.accents.length === 1 && prefs.accents[0] === id) return;
    setPrefs({
      accents: prefs.accents.includes(id)
        ? prefs.accents.filter((x) => x !== id)
        : [...prefs.accents, id],
    });
  };

  /* what the rotation reads as, in words — kept to a glance */
  const pickedLabels = prefs.accents.map(
    (id) => ACCENTS.find((a) => a.id === id)!.label,
  );
  const rotationCaption =
    pickedLabels.length === ACCENTS.length
      ? "All six, taking turns."
      : pickedLabels.length === 1
        ? `${pickedLabels[0]} everywhere.`
        : pickedLabels.length === 2
          ? `${pickedLabels[0]} ↔ ${pickedLabels[1]}`
          : `${pickedLabels.join(" → ")} …`;

  /* the tray's height pref only sits ON a preset when a drag hasn't
     left it between rungs — off-rung, the panel says so honestly */
  const heightOnPreset = SPEC_HEIGHTS.some(
    (h) => Math.abs(prefs.specHeight - h.fraction) < 0.025,
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.button
            type="button"
            aria-label="Close the customize panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] cursor-pointer bg-cocoa/45 backdrop-blur-[2px]"
          />
          <m.aside
            role="dialog"
            aria-label="Customize IAL CHEM"
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={`customize-drawer fixed inset-y-0 right-0 z-[95] flex w-[min(460px,94vw)] max-[639px]:w-[min(420px,92vw)] flex-col overflow-hidden border-l border-ink/10 bg-paper shadow-[-24px_0_70px_-38px_rgb(0_0_0/0.42)] ${
              /* the editorial drawer sits print-sharp on the page
                 ground; the gallery drawer hangs like a mounted
                 plate — the sharpest hairline edge of the two */
              gal
                ? "rounded-l-[14px] max-[639px]:rounded-l-[12px]"
                : "rounded-l-[20px] max-[639px]:rounded-l-[16px]"
            }`}
            style={
              ed
                ? /* the legal furniture inside speaks --legal-rust;
                     point it at the editorial chrome's rust so the
                     whole dress follows the labs in one hop */
                  ({ "--legal-rust": "var(--iface-rust)" } as CSSProperties)
                : undefined
            }
          >
            {ed && (
              <>
                {/* the editorial ground: one quiet rust wash off the
                    masthead's corner, and the wayfinder's cursor as
                    the drawer grip — a rust bar, not a frost pill */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute -top-16 right-0 h-56 w-72"
                    style={{ background: "radial-gradient(ellipse at 82% 0%, color-mix(in oklab, var(--iface-rust) 10%, transparent), transparent 58%)" }}
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 z-20 h-[46px] w-[3px] -translate-y-1/2 rounded-r-full"
                  style={{ background: "var(--iface-rust)", opacity: 0.85 }}
                />
              </>
            )}
            {gal && (
              <>
                {/* the gallery ground: one whisper of the accent off
                    the masthead's corner — wide light, no candy — and
                    the room's label dash standing as the drawer grip,
                    a hairline the reader would stamp a plaque with */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute -top-14 right-0 h-52 w-72"
                    style={{ background: "radial-gradient(ellipse at 85% 0%, color-mix(in oklab, var(--iface-accent) 8%, transparent), transparent 62%)" }}
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 z-20 h-[46px] w-[2px] -translate-y-1/2 rounded-full"
                  style={{ background: "var(--iface-accent)", opacity: 0.9 }}
                />
              </>
            )}

            <div
              className="no-scrollbar relative flex flex-1 flex-col gap-6 overflow-y-auto px-6 max-[639px]:px-4 pt-0"
              style={{ paddingTop: "calc(1.25rem + var(--sa-top))", paddingBottom: "calc(2rem + var(--sa-bottom))" }}
            >
              {ed && (
                <EditorialDress
                  prefs={prefs}
                  onClose={onClose}
                  onHome={onHome}
                  onOpenSpec={onOpenSpec}
                  onOpenPack={onOpenPack}
                  onOpenProgress={onOpenProgress}
                  onOpenLegal={onOpenLegal}
                  fullscreen={fullscreen}
                  onToggleFullscreen={onToggleFullscreen}
                  pickLab={pickLab}
                  toggleAccent={toggleAccent}
                  rotationCaption={rotationCaption}
                  heightOnPreset={heightOnPreset}
                />
              )}
              {gal && (
                <GalleryDress
                  prefs={prefs}
                  onClose={onClose}
                  onHome={onHome}
                  onOpenSpec={onOpenSpec}
                  onOpenPack={onOpenPack}
                  onOpenProgress={onOpenProgress}
                  onOpenLegal={onOpenLegal}
                  fullscreen={fullscreen}
                  onToggleFullscreen={onToggleFullscreen}
                  pickLab={pickLab}
                  toggleAccent={toggleAccent}
                  rotationCaption={rotationCaption}
                  heightOnPreset={heightOnPreset}
                />
              )}
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function FontRow({
  active,
  label,
  stack,
  onClick,
  ariaLabel,
}: {
  active: boolean;
  label: string;
  stack: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className="flex cursor-pointer items-center gap-3.5 rounded-[calc(22px*var(--ui-scale))] px-4 py-3 text-left transition-colors"
      style={
        active
          ? { background: "rgb(255 107 107 / 0.11)", boxShadow: "inset 0 0 0 2.5px #FF6B6B" }
          : { background: "color-mix(in oklab, var(--color-ink) 5%, transparent)" }
      }
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/[0.08] bg-paper text-[calc(19px*var(--ui-scale))] leading-none font-bold text-ink"
        style={{ fontFamily: stack }}
      >
        Aa
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[14px] font-semibold text-ink">{label}</span>
        <span className="block truncate text-[12px] font-bold text-ink-soft" style={{ fontFamily: stack }}>
          The quick brown fox
        </span>
      </span>
      <span
        aria-hidden
        className={`ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          active ? "bg-coral text-white" : "border-2 border-ink/15"
        }`}
      >
        {active && <Check className="h-3 w-3" strokeWidth={3.5} />}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The editorial body — eight numbered clauses and a colophon.
   The Navigate row becomes a contents rail, the pickers become
   exhibit trays, the segmented pills become ruled tables, and the
   whole thing closes like a document: a text-button reset and a
   small-caps line about where the choices live.
   ═══════════════════════════════════════════════════════════════ */

function EditorialDress({
  prefs,
  onClose,
  onHome,
  onOpenSpec,
  onOpenPack,
  onOpenProgress,
  onOpenLegal,
  fullscreen,
  onToggleFullscreen,
  pickLab,
  toggleAccent,
  rotationCaption,
  heightOnPreset,
}: {
  prefs: Prefs;
  onClose: () => void;
  onHome: () => void;
  onOpenSpec: () => void;
  onOpenPack: () => void;
  onOpenProgress: () => void;
  onOpenLegal: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  pickLab: (lab: Lab) => void;
  toggleAccent: (id: AccentId) => void;
  rotationCaption: string;
  heightOnPreset: boolean;
}) {
  return (
    <>
      {/* ————— the masthead ————— */}
      <header className="relative">
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="legal-kicker">The control room</span>
            <h2 className="mt-3.5 font-display text-[calc(25px*var(--ui-scale))] leading-[1.08] font-bold tracking-[-.03em] text-ink">
              Set the room<span aria-hidden style={{ color: RUST }}>.</span>
            </h2>
            <p className="legal-meta mt-2.5">Every knob re-skins the site at once</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Exit Control Panel"
            title="Exit Control Panel"
            className="etoc-toggle mt-0.5 shrink-0 cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </header>

      {/* 01 · contents — the navigate row as a rail */}
      <EdSection n={1} title="Contents">
        <div className="grid grid-cols-2 gap-1">
          {[
            { label: fullscreen ? "Exit full screen" : "Full screen", action: onToggleFullscreen },
            { label: "Home", action: onHome },
            { label: "Specification", action: onOpenSpec },
            { label: "Revision pack", action: onOpenPack },
            { label: "Progress", action: onOpenProgress },
            { label: "Disclaimer", action: onOpenLegal },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.action();
                onClose();
              }}
              aria-label={item.label}
              className="legal-index-link cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-rust)]"
            >
              <span aria-hidden>—</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </EdSection>

      {/* 02 · interface — the two dresses as exhibits */}
      <EdSection n={2} title="Interface">
        <div className="grid grid-cols-2 gap-2.5">
          {IFACE_ORDER.map((f, i) => {
            const active = prefs.iface === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setPrefs({ iface: f })}
                aria-pressed={active}
                aria-label={`${IFACE_LABEL[f]} interface — ${IFACE_DESCRIPTION[f]}`}
                className="legal-card flex min-w-0 cursor-pointer flex-col gap-2.5 rounded-[16px] p-2.5 text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-rust)]"
                style={
                  active
                    ? { boxShadow: `0 0 0 1.5px ${RUST}, 0 2px 0 var(--edge)` }
                    : undefined
                }
              >
                <IfaceStage id={f} />
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span
                      aria-hidden
                      className="font-display text-[calc(10px*var(--ui-scale))] leading-none font-extrabold tabular-nums"
                      style={{ color: RUST }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink">
                      {IFACE_LABEL[f]}
                    </span>
                  </span>
                  <EdStamp on={active}>{active ? "In use" : "Select"}</EdStamp>
                </span>
              </button>
            );
          })}
        </div>
      </EdSection>

      {/* 03 · appearance — the four labs as exhibits */}
      <EdSection n={3} title="Appearance">
        <div className="grid grid-cols-2 gap-2.5">
          {LAB_ORDER.map((l) => {
            const active = prefs.theme === l;
            return (
              <button
                key={l}
                type="button"
                onClick={() => pickLab(l)}
                aria-pressed={active}
                aria-label={`${LAB_LABEL[l]} theme — ${LAB_DESCRIPTION[l]}`}
                className="legal-card flex min-w-0 cursor-pointer flex-col gap-2.5 rounded-[16px] p-2.5 text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-rust)]"
                style={
                  active
                    ? { boxShadow: `0 0 0 1.5px ${RUST}, 0 2px 0 var(--edge)` }
                    : undefined
                }
              >
                <LabStage id={l} />
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <LabChip id={l} />
                    <span className="truncate font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink">
                      {LAB_LABEL[l]}
                    </span>
                  </span>
                  <EdStamp on={active}>{active ? "In use" : "Select"}</EdStamp>
                </span>
              </button>
            );
          })}
        </div>
      </EdSection>

      {/* 04 · colours — the candy wheel, printed */}
      <EdSection n={4} title="Colours" meta={`${prefs.accents.length} OF 6`}>
        <div className="legal-card rounded-[16px] p-3.5">
          <EditorialLabel>The accent palette</EditorialLabel>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {ACCENTS.map((a) => {
              const on = prefs.accents.includes(a.id);
              const lastOne = on && prefs.accents.length === 1;
              return (
                <m.button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAccent(a.id)}
                  whileTap={lastOne ? undefined : { scale: 0.94 }}
                  aria-pressed={on}
                  aria-disabled={lastOne || undefined}
                  aria-label={`${a.label} — ${
                    lastOne
                      ? "the wheel keeps one colour on"
                      : on
                        ? "selected, tap to remove"
                        : "not selected, tap to add"
                  }`}
                  className="group flex min-w-0 cursor-pointer flex-col items-center gap-2 rounded-[12px] px-1 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-rust)]"
                  style={{
                    background: on
                      ? "color-mix(in oklab, var(--color-ink) 4%, transparent)"
                      : "transparent",
                  }}
                >
                  <span
                    aria-hidden
                    className="relative grid h-9 w-9 place-items-center rounded-full"
                    style={{
                      background: a.hex,
                      /* chosen: a paper gap and a ring in the swatch's
                         own ink — the print registration mark; waiting:
                         the flat pedestal edge the cards wear */
                      boxShadow: on
                        ? `0 0 0 2px var(--color-paper), 0 0 0 3.5px ${a.hex}`
                        : "0 1.5px 0 var(--edge)",
                      opacity: on ? 1 : 0.82,
                    }}
                  >
                    {on && (
                      <Check
                        className="h-4 w-4"
                        strokeWidth={3.2}
                        style={{ color: readableInk(a.hex) }}
                      />
                    )}
                  </span>
                  <span
                    className={`max-w-full truncate font-display text-[calc(10px*var(--ui-scale))] font-semibold ${
                      on ? "text-ink" : "text-ink-faint"
                    }`}
                  >
                    {a.label}
                  </span>
                </m.button>
              );
            })}
          </div>
          <div className="mt-3.5 border-t border-ink/10 pt-3">
            <p className="legal-meta">The wheel, in order</p>
            {/* the sequence as a print colour bar — squared segments,
                parted by the paper itself */}
            <div
              aria-hidden
              className="mt-2 flex h-2.5 overflow-hidden rounded-[3px] border border-ink/10"
            >
              {Array.from({ length: 8 }, (_, k) => (
                <span
                  key={k}
                  className="min-w-0 flex-1"
                  style={{
                    background: accentOf(k),
                    borderRight: k < 7 ? "1px solid var(--color-paper)" : undefined,
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-[calc(11px*var(--ui-scale))] leading-snug text-ink-soft">
              {rotationCaption}
            </p>
          </div>
        </div>
      </EdSection>

      {/* 05 · text size — the rungs as a ruled table */}
      <EdSection n={5} title="Text size">
        <div
          className="grid grid-cols-4 overflow-hidden rounded-[12px] border border-ink/[0.12]"
          style={{ boxShadow: "0 1.5px 0 var(--edge)" }}
        >
          {SCALES.map((s, i) => {
            const active = prefs.scale === s;
            return (
              <m.button
                key={s}
                type="button"
                onClick={() => setPrefs({ scale: s })}
                whileTap={{ scale: 0.95 }}
                aria-pressed={active}
                aria-label={`Text size ${s}`}
                className={`flex cursor-pointer flex-col items-center py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--iface-rust)] ${
                  i > 0 ? "border-l border-ink/[0.10]" : ""
                } ${
                  active
                    ? ""
                    : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                }`}
                style={
                  active ? { background: RUST, color: "var(--color-paper)" } : undefined
                }
              >
                <span
                  className="font-display leading-none font-bold"
                  style={{
                    fontSize: `calc(${SCALE_PX[i]}px * var(--ui-scale))`,
                  }}
                >
                  Aa
                </span>
                <span className="mt-1 font-display text-[calc(9px*var(--ui-scale))] font-bold tracking-[0.08em]">
                  {s}
                </span>
              </m.button>
            );
          })}
        </div>
      </EdSection>

      {/* 06 · fonts — the families as a ruled table */}
      <EdSection n={6} title="Fonts">
        <div className="flex flex-col gap-4">
          <div>
            <EditorialLabel>Headings</EditorialLabel>
            <EdFontTable
              rows={HEAD_FONTS}
              activeId={prefs.headFont}
              onPick={(id) => setPrefs({ headFont: id })}
              ariaPrefix="Heading font"
            />
          </div>
          <div>
            <EditorialLabel>Body</EditorialLabel>
            <EdFontTable
              rows={BODY_FONTS}
              activeId={prefs.bodyFont}
              onPick={(id) => setPrefs({ bodyFont: id })}
              ariaPrefix="Body font"
            />
          </div>
        </div>
      </EdSection>

      {/* 07 · spec map — the tray's own knobs as ruled tables */}
      <EdSection
        n={7}
        title="Spec map"
        meta={heightOnPreset ? undefined : `CUSTOM ${Math.round(prefs.specHeight * 100)}%`}
      >
        <div className="flex flex-col gap-2.5">
          <div
            className="grid grid-cols-3 overflow-hidden rounded-[12px] border border-ink/[0.12]"
            style={{ boxShadow: "0 1.5px 0 var(--edge)" }}
          >
            {SPEC_HEIGHTS.map((h, i) => {
              const active = Math.abs(prefs.specHeight - h.fraction) < 0.025;
              return (
                <m.button
                  key={h.id}
                  type="button"
                  onClick={() => setPrefs({ specHeight: h.fraction })}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={active}
                  aria-label={`Spec map height ${h.label}`}
                  className={`flex cursor-pointer flex-col items-center py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--iface-rust)] ${
                    i > 0 ? "border-l border-ink/[0.10]" : ""
                  } ${active ? "" : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"}`}
                  style={
                    active ? { background: RUST, color: "var(--color-paper)" } : undefined
                  }
                >
                  <span className="font-display text-[calc(14px*var(--ui-scale))] leading-none font-bold">
                    {Math.round(h.fraction * 100)}
                    <span className="text-[calc(9.5px*var(--ui-scale))]">%</span>
                  </span>
                  <span className="mt-1 font-display text-[calc(9px*var(--ui-scale))] font-bold tracking-[0.08em]">
                    {h.label}
                  </span>
                </m.button>
              );
            })}
          </div>
          <div
            className="grid grid-cols-3 overflow-hidden rounded-[12px] border border-ink/[0.12]"
            style={{ boxShadow: "0 1.5px 0 var(--edge)" }}
          >
            {SPEC_DENSITIES.map((d, i) => {
              const active = prefs.specDensity === d.id;
              return (
                <m.button
                  key={d.id}
                  type="button"
                  onClick={() => setPrefs({ specDensity: d.id })}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={active}
                  aria-label={`Spec map density ${d.label}`}
                  className={`flex cursor-pointer items-center justify-center py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--iface-rust)] ${
                    i > 0 ? "border-l border-ink/[0.10]" : ""
                  } ${active ? "" : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"}`}
                  style={
                    active ? { background: RUST, color: "var(--color-paper)" } : undefined
                  }
                >
                  <span className="font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.04em]">
                    {d.label}
                  </span>
                </m.button>
              );
            })}
          </div>
        </div>
      </EdSection>

      {/* 08 · details — the quiet knobs as checkbox rows */}
      <EdSection n={8} title="Details">
        <div className="flex flex-col">
          <EdCheckboxRow
            on={prefs.dots}
            onChange={(v) => setPrefs({ dots: v })}
            label="Dots"
            hint="The polka-dot paper grain"
          />
          <EdCheckboxRow
            on={prefs.motion}
            onChange={(v) => setPrefs({ motion: v })}
            label="Motion"
            hint="Floating blobs, marquees & wiggles"
          />
        </div>
      </EdSection>

      {/* the colophon */}
      <div className="flex flex-col items-center gap-2.5 border-t border-ink/[0.09] pt-5">
        <button
          type="button"
          onClick={() => {
            setPrefs(DEFAULT_PREFS);
          }}
          className="legal-back-link cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--iface-rust)]"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset everything
        </button>
        <p className="legal-meta">Saved on this device</p>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The gallery dress — the same workshop, hung as a leaflet.
   When the site wears the gallery interface the drawer re-sets
   itself in the white-wall room's own language: the dash-caps
   label, the accent numeral, hairline-ruled tables, framed plates,
   the reader's pack tick re-cut as the on/off knob — and a
   colophon that closes like the reader's end matter. Every knob
   writes the same prefs; only the furniture changes. The accent
   reads var(--iface-accent) — the token html[data-iface="gallery"]
   already travels with — so it follows the labs on its own:
   daylight bronze, night champagne, dune sand, classic espresso.
   ═══════════════════════════════════════════════════════════════ */

const GAL_A = "var(--iface-accent)";

/* the reader's own hairline recipe, re-cut for the leaflet */
const galHair = (pct: number) =>
  `color-mix(in oklab, var(--color-ink) ${pct}%, transparent)`;
const galWash = (pct: number) =>
  `color-mix(in oklab, var(--iface-accent) ${pct}%, transparent)`;
const galPad2 = (n: number) => String(n).padStart(2, "0");

/* the state mark — the editorial IN USE stamp, spoken in the
   gallery's register: no pill, just small caps in the accent */
function GalStamp({ on }: { on: boolean }) {
  return (
    <span
      className="shrink-0 font-display text-[calc(9px*var(--ui-scale))] leading-none font-semibold tracking-[0.16em] uppercase"
      style={
        on
          ? { color: GAL_A }
          : { color: "var(--color-ink-faint)", opacity: 0.75 }
      }
    >
      {on ? "In use" : "Select"}
    </span>
  );
}

/* a catalog entry header — the reader's section opener at leaflet
   scale: accent numeral, caps title, the hairline running out to
   the drawer's edge */
function GalSection({
  n,
  title,
  meta,
  children,
}: {
  n: number;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t pt-5" style={{ borderColor: galHair(9) }}>
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className="w-[26px] shrink-0 font-display text-[calc(16px*var(--ui-scale))] leading-none font-medium tracking-[-0.02em] tabular-nums"
          style={{ color: GAL_A }}
        >
          {galPad2(n)}
        </span>
        <span className="min-w-0 font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase text-ink-faint">
          {title}
        </span>
        <span
          aria-hidden
          className="h-px min-w-4 flex-1 self-center"
          style={{ background: galHair(8) }}
        />
        {meta && (
          <span className="shrink-0 font-display text-[calc(9.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase tabular-nums text-ink-faint">
            {meta}
          </span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* the on/off knob, gallery-style — the reader's pack tick: a
   hairline square that floods with the room's accent when it's on */
function GalTickRow({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="flex w-full cursor-pointer items-center gap-3.5 border-t py-4 text-left transition-colors first:border-t-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-accent)]"
      style={{ borderColor: galHair(8) }}
    >
      <span
        aria-hidden
        className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[9px] transition-colors"
        style={
          on
            ? { background: GAL_A, color: "var(--iface-accent-ink)" }
            : {
                border: `1.5px solid ${galHair(18)}`,
                color: "var(--color-ink-faint)",
              }
        }
      >
        {on && <Check className="h-3.5 w-3.5" strokeWidth={2.8} />}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[calc(14px*var(--ui-scale))] font-semibold text-ink">
          {label}
        </span>
        <span className="block text-[calc(11px*var(--ui-scale))] leading-snug text-ink-faint">
          {hint}
        </span>
      </span>
    </button>
  );
}

/* a hairline-ruled rung table — the gallery's plate frame for the
   segmented picks (text size, spec-map height & density): the
   chosen rung wears the accent wash and speaks in the accent */
function GalRungs({
  items,
  activeIndex,
  onPick,
  ariaPrefix,
}: {
  items: { key: string; aria: string; main: ReactNode; sub?: string }[];
  activeIndex: number;
  onPick: (i: number) => void;
  ariaPrefix: string;
}) {
  return (
    <div
      className="grid overflow-hidden rounded-[14px] border"
      style={{
        borderColor: galHair(12),
        gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
      }}
    >
      {items.map((it, i) => {
        const active = i === activeIndex;
        return (
          <m.button
            key={it.key}
            type="button"
            onClick={() => onPick(i)}
            whileTap={{ scale: 0.96 }}
            aria-pressed={active}
            aria-label={`${ariaPrefix} ${it.aria}`}
            className={`flex cursor-pointer flex-col items-center py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--iface-accent)] ${
              i > 0 ? "border-l" : ""
            } ${active ? "" : "hover:bg-ink/[0.04]"}`}
            style={{
              borderColor: galHair(8),
              background: active ? galWash(10) : undefined,
              color: active ? GAL_A : "var(--color-ink-soft)",
            }}
          >
            {it.main}
            {it.sub && (
              <span
                className="mt-1 font-display text-[calc(9px*var(--ui-scale))] font-semibold tracking-[0.08em]"
                style={active ? undefined : { color: "var(--color-ink-faint)" }}
              >
                {it.sub}
              </span>
            )}
          </m.button>
        );
      })}
    </div>
  );
}

/* the typeface rows — a hairline-ruled list with each family set
   in its own hand; the chosen one wears the wash and the pack tick */
function GalFontTable<T extends { id: string; label: string; stack: string }>({
  rows,
  activeId,
  onPick,
  ariaPrefix,
}: {
  rows: T[];
  activeId: string;
  onPick: (id: T["id"]) => void;
  ariaPrefix: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-[14px] border"
      style={{ borderColor: galHair(12) }}
    >
      {rows.map((f, i) => {
        const active = activeId === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onPick(f.id)}
            aria-pressed={active}
            aria-label={`${ariaPrefix} ${f.label}`}
            className={`flex w-full cursor-pointer items-center gap-3.5 px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--iface-accent)] ${
              i > 0 ? "border-t" : ""
            }`}
            style={{
              borderColor: galHair(8),
              background: active ? galWash(7) : undefined,
            }}
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border text-[calc(17px*var(--ui-scale))] leading-none font-semibold text-ink"
              style={{ fontFamily: f.stack, borderColor: galHair(12) }}
            >
              Aa
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[calc(13px*var(--ui-scale))] font-semibold text-ink">
                {f.label}
              </span>
              <span
                className="block truncate text-[calc(11.5px*var(--ui-scale))] text-ink-faint"
                style={{ fontFamily: f.stack }}
              >
                The quick brown fox
              </span>
            </span>
            <span
              aria-hidden
              className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px] transition-colors"
              style={
                active
                  ? { background: GAL_A, color: "var(--iface-accent-ink)" }
                  : { border: `1.5px solid ${galHair(16)}` }
              }
            >
              {active && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GalleryDress({
  prefs,
  onClose,
  onHome,
  onOpenSpec,
  onOpenPack,
  onOpenProgress,
  onOpenLegal,
  fullscreen,
  onToggleFullscreen,
  pickLab,
  toggleAccent,
  rotationCaption,
  heightOnPreset,
}: {
  prefs: Prefs;
  onClose: () => void;
  onHome: () => void;
  onOpenSpec: () => void;
  onOpenPack: () => void;
  onOpenProgress: () => void;
  onOpenLegal: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  pickLab: (lab: Lab) => void;
  toggleAccent: (id: AccentId) => void;
  rotationCaption: string;
  heightOnPreset: boolean;
}) {
  return (
    <>
      {/* ————— the masthead ————— */}
      <header className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-[2px] w-[14px] shrink-0 rounded-full"
              style={{ background: GAL_A }}
            />
            <span
              className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase"
              style={{ color: GAL_A }}
            >
              The white-wall workshop
            </span>
          </div>
          <h2 className="mt-3.5 font-display text-[calc(25px*var(--ui-scale))] leading-[1.06] font-medium tracking-[-0.03em] text-ink">
            Set the room<span aria-hidden style={{ color: GAL_A }}>.</span>
          </h2>
          <p className="mt-3 font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase text-ink-faint">
            Every knob re-skins the site at once
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Exit Control Panel"
          title="Exit Control Panel"
          className="mt-0.5 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-[10px] border transition-colors hover:bg-ink/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-accent)]"
          style={{ borderColor: galHair(16), color: "var(--color-ink-soft)" }}
        >
          <X className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </header>

      {/* 01 · contents — the navigate row as a two-column ledger */}
      <GalSection n={1} title="Contents">
        <div
          className="grid gap-x-9 border-b sm:grid-cols-2"
          style={{ borderColor: galHair(9) }}
        >
          {[
            { label: fullscreen ? "Exit full screen" : "Full screen", action: onToggleFullscreen },
            { label: "Home", action: onHome },
            { label: "Specification", action: onOpenSpec },
            { label: "Revision pack", action: onOpenPack },
            { label: "Progress", action: onOpenProgress },
            { label: "Disclaimer", action: onOpenLegal },
          ].map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.action();
                onClose();
              }}
              aria-label={item.label}
              className="group flex cursor-pointer items-baseline gap-3 border-t py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-accent)]"
              style={{ borderColor: galHair(8) }}
            >
              <span
                aria-hidden
                className="w-[20px] shrink-0 font-display text-[calc(10.5px*var(--ui-scale))] leading-none font-medium tabular-nums"
                style={{ color: GAL_A }}
              >
                {galPad2(i + 1)}
              </span>
              <span className="min-w-0 truncate text-[calc(13px*var(--ui-scale))] font-semibold text-ink-soft transition-colors group-hover:text-ink">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </GalSection>

      {/* 02 · interface — the three dresses as catalog plates */}
      <GalSection n={2} title="Interface">
        <div className="flex flex-col gap-2.5">
          {IFACE_ORDER.map((f, i) => {
            const active = prefs.iface === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setPrefs({ iface: f })}
                aria-pressed={active}
                aria-label={`${IFACE_LABEL[f]} interface — ${IFACE_DESCRIPTION[f]}`}
                className="flex w-full cursor-pointer items-center gap-3.5 rounded-[16px] border py-2.5 pl-2.5 pr-4 text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-accent)]"
                style={{
                  borderColor: galHair(10),
                  background: active ? galWash(6) : "transparent",
                  boxShadow: active ? `0 0 0 1.5px ${GAL_A}` : undefined,
                }}
              >
                <span className="w-[124px] shrink-0">
                  <IfaceStage id={f} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="font-display text-[calc(10.5px*var(--ui-scale))] leading-none font-medium tabular-nums"
                      style={{ color: GAL_A }}
                    >
                      {galPad2(i + 1)}
                    </span>
                    <span className="truncate font-display text-[calc(13px*var(--ui-scale))] font-semibold text-ink">
                      {IFACE_LABEL[f]}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-[calc(11px*var(--ui-scale))] leading-snug text-ink-faint">
                    {IFACE_DESCRIPTION[f]}
                  </span>
                </span>
                <GalStamp on={active} />
              </button>
            );
          })}
        </div>
      </GalSection>

      {/* 03 · appearance — the four labs as framed plates */}
      <GalSection n={3} title="Appearance">
        <div className="grid grid-cols-2 gap-2.5">
          {LAB_ORDER.map((l) => {
            const active = prefs.theme === l;
            return (
              <button
                key={l}
                type="button"
                onClick={() => pickLab(l)}
                aria-pressed={active}
                aria-label={`${LAB_LABEL[l]} theme — ${LAB_DESCRIPTION[l]}`}
                className="flex min-w-0 cursor-pointer flex-col gap-2 rounded-[16px] border p-2.5 text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-accent)]"
                style={{
                  borderColor: galHair(10),
                  background: active ? galWash(6) : "transparent",
                  boxShadow: active ? `0 0 0 1.5px ${GAL_A}` : undefined,
                }}
              >
                <LabStage id={l} />
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <LabChip id={l} />
                    <span className="truncate font-display text-[calc(12px*var(--ui-scale))] font-semibold text-ink">
                      {LAB_LABEL[l]}
                    </span>
                  </span>
                  <GalStamp on={active} />
                </span>
              </button>
            );
          })}
        </div>
      </GalSection>

      {/* 04 · colours — the candy wheel, catalogued */}
      <GalSection n={4} title="Colours" meta={`${prefs.accents.length} OF 6`}>
        <div
          className="rounded-[16px] border p-3.5"
          style={{ borderColor: galHair(10) }}
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-[2px] w-[14px] shrink-0 rounded-full"
              style={{ background: GAL_A }}
            />
            <span className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase text-ink-faint">
              The accent palette
            </span>
          </div>
          <div className="mt-3.5 grid grid-cols-4 gap-2">
            {ACCENTS.map((a) => {
              const on = prefs.accents.includes(a.id);
              const lastOne = on && prefs.accents.length === 1;
              return (
                <m.button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAccent(a.id)}
                  whileTap={lastOne ? undefined : { scale: 0.94 }}
                  aria-pressed={on}
                  aria-disabled={lastOne || undefined}
                  aria-label={`${a.label} — ${
                    lastOne
                      ? "the wheel keeps one colour on"
                      : on
                        ? "selected, tap to remove"
                        : "not selected, tap to add"
                  }`}
                  className="group flex min-w-0 cursor-pointer flex-col items-center gap-2 rounded-[12px] px-1 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iface-accent)]"
                  style={{ background: on ? galWash(5) : "transparent" }}
                >
                  <span
                    aria-hidden
                    className="relative grid h-9 w-9 place-items-center rounded-full"
                    style={{
                      background: a.hex,
                      /* chosen: a paper gap and a ring in the swatch's
                         own ink — the catalog's plate pin; waiting: the
                         pedestal edge the hairline frame carries */
                      boxShadow: on
                        ? `0 0 0 2px var(--color-paper), 0 0 0 3.5px ${a.hex}`
                        : `0 1.5px 0 ${galHair(14)}`,
                      opacity: on ? 1 : 0.82,
                    }}
                  >
                    {on && (
                      <Check
                        className="h-4 w-4"
                        strokeWidth={3.2}
                        style={{ color: readableInk(a.hex) }}
                      />
                    )}
                  </span>
                  <span
                    className={`max-w-full truncate font-display text-[calc(10px*var(--ui-scale))] font-semibold ${
                      on ? "text-ink" : "text-ink-faint"
                    }`}
                  >
                    {a.label}
                  </span>
                </m.button>
              );
            })}
          </div>
          <div className="mt-3 border-t pt-3" style={{ borderColor: galHair(8) }}>
            <p className="font-display text-[calc(9.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase text-ink-faint">
              The wheel, in order
            </p>
            {/* the sequence as a squared strip, parted by the paper */}
            <div
              aria-hidden
              className="mt-2 flex h-2.5 overflow-hidden rounded-[3px] border"
              style={{ borderColor: galHair(10) }}
            >
              {Array.from({ length: 8 }, (_, k) => (
                <span
                  key={k}
                  className="min-w-0 flex-1"
                  style={{
                    background: accentOf(k),
                    borderRight: k < 7 ? "1px solid var(--color-paper)" : undefined,
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-[calc(11px*var(--ui-scale))] leading-snug text-ink-soft">
              {rotationCaption}
            </p>
          </div>
        </div>
      </GalSection>

      {/* 05 · text size — the rungs as a ruled table */}
      <GalSection n={5} title="Text size">
        <GalRungs
          ariaPrefix="Text size"
          activeIndex={SCALES.indexOf(prefs.scale)}
          onPick={(i) => setPrefs({ scale: SCALES[i] })}
          items={SCALES.map((s, i) => ({
            key: s,
            aria: s,
            main: (
              <span
                className="font-display leading-none font-bold"
                style={{
                  fontSize: `calc(${SCALE_PX[i]}px * var(--ui-scale))`,
                }}
              >
                Aa
              </span>
            ),
            sub: s,
          }))}
        />
      </GalSection>

      {/* 06 · fonts — the families in hairline rows */}
      <GalSection n={6} title="Fonts">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[2px] w-[14px] shrink-0 rounded-full"
                style={{ background: galWash(70) }}
              />
              <span className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase text-ink-faint">
                Headings
              </span>
            </div>
            <div className="mt-2.5">
              <GalFontTable
                rows={HEAD_FONTS}
                activeId={prefs.headFont}
                onPick={(id) => setPrefs({ headFont: id })}
                ariaPrefix="Heading font"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[2px] w-[14px] shrink-0 rounded-full"
                style={{ background: galWash(70) }}
              />
              <span className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.22em] uppercase text-ink-faint">
                Body
              </span>
            </div>
            <div className="mt-2.5">
              <GalFontTable
                rows={BODY_FONTS}
                activeId={prefs.bodyFont}
                onPick={(id) => setPrefs({ bodyFont: id })}
                ariaPrefix="Body font"
              />
            </div>
          </div>
        </div>
      </GalSection>

      {/* 07 · spec map — the tray's own knobs as ruled tables */}
      <GalSection
        n={7}
        title="Spec map"
        meta={heightOnPreset ? undefined : `CUSTOM ${Math.round(prefs.specHeight * 100)}%`}
      >
        <div className="flex flex-col gap-2.5">
          <GalRungs
            ariaPrefix="Spec map height"
            activeIndex={SPEC_HEIGHTS.findIndex(
              (h) => Math.abs(prefs.specHeight - h.fraction) < 0.025,
            )}
            onPick={(i) => setPrefs({ specHeight: SPEC_HEIGHTS[i].fraction })}
            items={SPEC_HEIGHTS.map((h) => ({
              key: h.id,
              aria: h.label,
              main: (
                <span className="font-display text-[calc(14px*var(--ui-scale))] leading-none font-bold">
                  {Math.round(h.fraction * 100)}
                  <span className="text-[calc(9.5px*var(--ui-scale))]">%</span>
                </span>
              ),
              sub: h.label,
            }))}
          />
          <GalRungs
            ariaPrefix="Spec map density"
            activeIndex={SPEC_DENSITIES.findIndex((d) => d.id === prefs.specDensity)}
            onPick={(i) => setPrefs({ specDensity: SPEC_DENSITIES[i].id })}
            items={SPEC_DENSITIES.map((d) => ({
              key: d.id,
              aria: d.label,
              main: (
                <span className="font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.04em]">
                  {d.label}
                </span>
              ),
            }))}
          />
        </div>
      </GalSection>

      {/* 08 · details — the quiet knobs as pack ticks */}
      <GalSection n={8} title="Details">
        <div className="flex flex-col">
          <GalTickRow
            on={prefs.dots}
            onChange={(v) => setPrefs({ dots: v })}
            label="Dots"
            hint="The polka-dot paper grain"
          />
          <GalTickRow
            on={prefs.motion}
            onChange={(v) => setPrefs({ motion: v })}
            label="Motion"
            hint="Floating blobs, marquees & wiggles"
          />
        </div>
      </GalSection>

      {/* the colophon — the reader's end matter, quiet */}
      <div
        className="flex flex-col items-center gap-3 border-t pt-5"
        style={{ borderColor: galHair(9) }}
      >
        <button
          type="button"
          onClick={() => {
            setPrefs(DEFAULT_PREFS);
          }}
          className="group inline-flex cursor-pointer items-center gap-2.5 font-display text-[calc(11px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--iface-accent)]"
        >
          <span
            aria-hidden
            className="h-[2px] w-[14px] rounded-full transition-colors group-hover:bg-ink"
            style={{ background: GAL_A }}
          />
          Reset everything
        </button>
        <p className="font-display text-[calc(9.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase text-ink-faint">
          Saved on this device
        </p>
      </div>
    </>
  );
}
