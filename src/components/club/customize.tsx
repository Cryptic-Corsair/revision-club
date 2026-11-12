"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Palette, RotateCcw, X } from "./icons";
import {
  DEFAULT_PREFS,
  IFACE_DESCRIPTION,
  IFACE_LABEL,
  IFACE_ORDER,
  LAB_LABEL,
  labOrderFor,
  SCALES,
  SPEC_DENSITIES,
  SPEC_HEIGHTS,
  setPrefs,
  THEME_CHIP,
  usePrefs,
  type BodyFont,
  type HeadFont,
  type Iface,
  type Lab,
  type Prefs,
} from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the customize panel
   ONE control panel for both interfaces. The drawer used to
   re-dress itself per interface — a legal-room workshop under the
   editorial dress, a white-wall leaflet under the gallery one —
   which meant two bodies to keep in step. Now there is a single
   body with one calm hairline vocabulary, and like the spec map it
   speaks the ACTIVE interface's own ink: the whole panel reads
   var(--panel-accent), resolved per interface in globals.css (the
   gallery's single accent, the document room's rust), so the four
   labs re-ink it in one hop. The knobs are the prefs contract, and
   that contract never changed.
   ═══════════════════════════════════════════════════════════════ */

const A = "var(--panel-accent)";
const A_INK = "var(--panel-accent-ink)";

/* the hairline ink the panel's quiet rules draw with — a shared
   recipe so every rule speaks one line */
const hair = (pct: number) =>
  `color-mix(in oklab, var(--color-ink) ${pct}%, transparent)`;

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

/* the interface cards' live miniatures — two abstract pages. The
   gallery miniature shows the white-wall room: accent dash, big
   quiet headline, a hairline ledger of accent numerals; the
   editorial miniature shows the document page: kicker bar,
   headline rule, numbered clause rails. */
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

/* ————— the panel's shared furniture ————— */

/* a section header — plain caps title, the hairline running out to
   the drawer's edge, an optional count on the right */
function PanelSection({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t pt-5" style={{ borderColor: hair(9) }}>
      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1 font-display text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.2em] uppercase text-ink-faint">
          {title}
        </span>
        <span aria-hidden className="h-px min-w-4 flex-1" style={{ background: hair(8) }} />
        {meta && (
          <span className="shrink-0 font-display text-[calc(9.5px*var(--ui-scale))] font-semibold tracking-[0.16em] uppercase tabular-nums text-ink-faint">
            {meta}
          </span>
        )}
      </div>
      <div className="mt-3.5">{children}</div>
    </section>
  );
}

/* the state stamp — a small caps pill: flooded with the panel's
   accent when the pick is in use, quiet ink wash when it waits */
function PanelStamp({ on }: { on: boolean }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2 py-[3px] font-display text-[calc(8.5px*var(--ui-scale))] leading-none font-extrabold tracking-[0.12em] uppercase"
      style={
        on
          ? { background: A, color: A_INK }
          : {
              background: "color-mix(in oklab, var(--color-ink) 5%, transparent)",
              color: "var(--color-ink-faint)",
            }
      }
    >
      {on ? "In use" : "Select"}
    </span>
  );
}

/* the on/off knob — a hairline square that floods with the panel's
   accent and ticks when it's on */
function PanelTickRow({
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
      className="flex w-full cursor-pointer items-center gap-3.5 border-t py-3.5 text-left transition-colors first:border-t-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)]"
      style={{ borderColor: hair(8) }}
    >
      <span
        aria-hidden
        className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[9px] transition-colors"
        style={
          on
            ? { background: A, color: A_INK }
            : { border: `1.5px solid ${hair(18)}`, color: "var(--color-ink-faint)" }
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

/* a hairline-ruled rung table — the segmented picks (text size,
   spec-map height & density): the chosen rung floods with the
   panel's accent and speaks in its ink */
function PanelRungs({
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
      className="grid overflow-hidden rounded-[12px] border"
      style={{
        borderColor: hair(12),
        boxShadow: "0 1.5px 0 var(--edge)",
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
            whileTap={{ scale: 0.95 }}
            aria-pressed={active}
            aria-label={`${ariaPrefix} ${it.aria}`}
            className={`flex cursor-pointer flex-col items-center py-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--panel-accent)] ${
              i > 0 ? "border-l" : ""
            } ${active ? "" : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"}`}
            style={{ borderColor: hair(10), ...(active ? { background: A, color: A_INK } : {}) }}
          >
            {it.main}
            {it.sub && (
              <span
                className="mt-1 font-display text-[calc(9px*var(--ui-scale))] font-bold tracking-[0.08em]"
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
   in its own hand; the chosen one wears the accent wash and tick */
function PanelFontTable<T extends { id: string; label: string; stack: string }>({
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
    <div className="overflow-hidden rounded-[14px] border" style={{ borderColor: hair(12) }}>
      {rows.map((f, i) => {
        const active = activeId === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onPick(f.id)}
            aria-pressed={active}
            aria-label={`${ariaPrefix} ${f.label}`}
            className={`flex w-full cursor-pointer items-center gap-3.5 px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--panel-accent)] ${
              i > 0 ? "border-t" : ""
            }`}
            style={{ borderColor: hair(8), background: active ? "color-mix(in oklab, var(--panel-accent) 7%, var(--color-paper))" : undefined }}
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border text-[calc(17px*var(--ui-scale))] leading-none font-semibold text-ink"
              style={{ fontFamily: f.stack, borderColor: hair(12) }}
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
                  ? { background: A, color: A_INK }
                  : { border: `1.5px solid ${hair(16)}` }
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

/* a plain caps label for the two font groups */
function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className="h-[2px] w-[14px] shrink-0 rounded-full" style={{ background: A, opacity: 0.7 }} />
      <span className="font-display text-[calc(10px*var(--ui-scale))] font-semibold tracking-[0.2em] uppercase text-ink-faint">
        {children}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The panel itself — one drawer, both interfaces.
   ═══════════════════════════════════════════════════════════════ */

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
  /* the labs this interface offers — the Document reader doesn't
     offer classic, the Cards reader's house lab */
  const labOptions = labOrderFor(prefs.iface);

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
            className="customize-drawer fixed inset-y-0 right-0 z-[95] flex w-[min(460px,94vw)] max-[639px]:w-[min(420px,92vw)] flex-col overflow-hidden rounded-l-[18px] border-l border-ink/10 bg-paper shadow-[-24px_0_70px_-38px_rgb(0_0_0/0.42)] max-[639px]:rounded-l-[14px]"
          >
            {/* the accent ground: one whisper off the masthead's
                corner, and the drawer grip standing as a hairline the
                panel's ink paints */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="absolute -top-14 right-0 h-52 w-72"
                style={{ background: "radial-gradient(ellipse at 85% 0%, color-mix(in oklab, var(--panel-accent) 9%, transparent), transparent 62%)" }}
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 z-20 h-[46px] w-[3px] -translate-y-1/2 rounded-r-full"
              style={{ background: "var(--panel-accent)", opacity: 0.9 }}
            />

            <div
              className="no-scrollbar relative flex flex-1 flex-col gap-5 overflow-y-auto px-6 max-[639px]:px-4"
              style={{ paddingTop: "calc(1.25rem + var(--sa-top))", paddingBottom: "calc(2rem + var(--sa-bottom))" }}
            >
              {/* ————— the masthead ————— */}
              <header className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-[2px] w-[14px] shrink-0 rounded-full"
                    style={{ background: A }}
                  />
                  <h2 className="truncate font-display text-[calc(24px*var(--ui-scale))] leading-none font-bold tracking-[-0.02em] text-ink">
                    Customize
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Exit Control Panel"
                  title="Exit Control Panel"
                  className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-[10px] border transition-colors hover:bg-ink/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)]"
                  style={{ borderColor: hair(16), color: "var(--color-ink-soft)" }}
                >
                  <X className="h-4 w-4" strokeWidth={2.2} />
                </button>
              </header>

              {/* 1 · navigate — the six shortcuts */}
              <PanelSection title="Navigate">
                <div className="grid grid-cols-2 gap-x-7">
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
                      className="group flex cursor-pointer items-center gap-2.5 border-t py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)]"
                      style={{ borderColor: hair(8) }}
                    >
                      <span
                        aria-hidden
                        className="h-[2px] w-[10px] shrink-0 rounded-full transition-colors"
                        style={{ background: hair(24) }}
                      />
                      <span className="min-w-0 flex-1 truncate text-[calc(13px*var(--ui-scale))] font-semibold text-ink-soft transition-colors group-hover:text-ink">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </PanelSection>

              {/* 2 · interface — the two dresses as cards */}
              <PanelSection title="Interface">
                <div className="grid grid-cols-2 gap-2.5">
                  {IFACE_ORDER.map((f) => {
                    const active = prefs.iface === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setPrefs({ iface: f })}
                        aria-pressed={active}
                        aria-label={`${IFACE_LABEL[f]} interface — ${IFACE_DESCRIPTION[f]}`}
                        className="flex min-w-0 cursor-pointer flex-col gap-2.5 rounded-[16px] border p-2.5 text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)]"
                        style={{
                          borderColor: hair(10),
                          background: active ? "color-mix(in oklab, var(--panel-accent) 6%, var(--color-paper))" : "transparent",
                          boxShadow: active ? `0 0 0 1.5px ${A}` : undefined,
                        }}
                      >
                        <IfaceStage id={f} />
                        <span className="flex w-full items-center justify-between gap-2">
                          <span className="truncate font-display text-[calc(12.5px*var(--ui-scale))] font-bold text-ink">
                            {IFACE_LABEL[f]}
                          </span>
                          <PanelStamp on={active} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </PanelSection>

              {/* 3 · appearance — this interface's labs as cards */}
              <PanelSection title="Appearance">
                <div className="grid grid-cols-2 gap-2.5">
                  {labOptions.map((l) => {
                    const active = prefs.theme === l;
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => pickLab(l)}
                        aria-pressed={active}
                        aria-label={`${LAB_LABEL[l]} theme`}
                        className="flex min-w-0 cursor-pointer flex-col gap-2 rounded-[16px] border p-2.5 text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)]"
                        style={{
                          borderColor: hair(10),
                          background: active ? "color-mix(in oklab, var(--panel-accent) 6%, var(--color-paper))" : "transparent",
                          boxShadow: active ? `0 0 0 1.5px ${A}` : undefined,
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
                          <PanelStamp on={active} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </PanelSection>

              {/* 4 · text size */}
              <PanelSection title="Text size">
                <PanelRungs
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
              </PanelSection>

              {/* 5 · fonts */}
              <PanelSection title="Fonts">
                <div className="flex flex-col gap-4">
                  <div>
                    <GroupLabel>Headings</GroupLabel>
                    <div className="mt-2.5">
                      <PanelFontTable
                        rows={HEAD_FONTS}
                        activeId={prefs.headFont}
                        onPick={(id) => setPrefs({ headFont: id })}
                        ariaPrefix="Heading font"
                      />
                    </div>
                  </div>
                  <div>
                    <GroupLabel>Body</GroupLabel>
                    <div className="mt-2.5">
                      <PanelFontTable
                        rows={BODY_FONTS}
                        activeId={prefs.bodyFont}
                        onPick={(id) => setPrefs({ bodyFont: id })}
                        ariaPrefix="Body font"
                      />
                    </div>
                  </div>
                </div>
              </PanelSection>

              {/* 6 · spec map — the tray's own knobs */}
              <PanelSection
                title="Spec map"
                meta={heightOnPreset ? undefined : `Custom ${Math.round(prefs.specHeight * 100)}%`}
              >
                <div className="flex flex-col gap-2.5">
                  <PanelRungs
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
                  <PanelRungs
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
              </PanelSection>

              {/* 7 · details — the quiet knobs */}
              <PanelSection title="Details">
                <div className="flex flex-col">
                  <PanelTickRow
                    on={prefs.dots}
                    onChange={(v) => setPrefs({ dots: v })}
                    label="Dots"
                    hint="The polka-dot paper grain"
                  />
                  <PanelTickRow
                    on={prefs.motion}
                    onChange={(v) => setPrefs({ motion: v })}
                    label="Motion"
                    hint="Floating blobs, marquees & wiggles"
                  />
                </div>
              </PanelSection>

              {/* the footer — reset and where the choices live */}
              <div className="flex flex-col items-center gap-3 border-t pt-5" style={{ borderColor: hair(9) }}>
                <button
                  type="button"
                  onClick={() => {
                    setPrefs(DEFAULT_PREFS);
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-display text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)]"
                  style={{ borderColor: hair(14) }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset everything
                </button>
                <p className="font-display text-[calc(9.5px*var(--ui-scale))] font-semibold tracking-[0.16em] uppercase text-ink-faint">
                  Saved on this device
                </p>
              </div>
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}
