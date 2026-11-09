"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, RotateCcw, Sparkles, Maximize, Minimize, Palette, Home, BookOpen, ClipboardList, Sticker, ShieldCheck, NotebookPen } from "./icons";
import { readableInk, shade, tint } from "./bits";
import { accentOf } from "./bands";
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
} from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the customize panel
   A slide-over workshop of frosted glass: the theme picker shows a
   live miniature of each room, the accent wheel previews its own
   rotation, and every knob lands in prefs.ts and re-skins the site
   from <html> outward. The panel itself is liquid glass — the
   dimmed page behind it blurs up through the cream frost.
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
   rooms dress shows its band walk; the editorial dress shows the
   document room: kicker pill, headline rule, numbered clause rails. */
function IfaceStage({ id }: { id: Iface }) {
  if (id === "rooms") {
    return (
      <span aria-hidden className="block overflow-hidden rounded-[12px] border border-ink/[0.08]">
        <span className="relative block h-[38px] w-full" style={{ background: "color-mix(in oklab, #FF6B6B 16%, var(--tint-base))" }}>
          <span className="absolute top-2 left-2 h-[10px] w-[26px] rounded-[6px] bg-paper/90 shadow-[0_1px_0_rgba(0,0,0,0.08)]" />
          <span className="absolute right-2 bottom-1.5 h-[13px] w-[13px] rounded-full" style={{ background: "color-mix(in oklab, #FF6B6B 55%, var(--tint-base))" }} />
        </span>
        <span className="block h-[30px] w-full" style={{ background: "color-mix(in oklab, #12B886 16%, var(--tint-base))" }} />
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
            className="customize-drawer fixed inset-y-0 right-0 z-[95] flex w-[min(460px,94vw)] flex-col overflow-hidden rounded-l-[28px] border-l border-ink/10 bg-paper shadow-[-24px_0_70px_-38px_rgb(0_0_0/0.42)]"
          >
            {/* ————— soft ambient colour, without the dot texture ————— */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="absolute -top-24 -right-20 h-80 w-80 rounded-full"
                style={{ background: "radial-gradient(circle, rgb(255 146 43 / 0.17), transparent 70%)" }}
              />
              <div
                className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full"
                style={{ background: "radial-gradient(circle, rgb(151 117 250 / 0.12), transparent 70%)" }}
              />
            </div>

            <div
              className="no-scrollbar relative flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-0"
              style={{ paddingTop: "calc(1.25rem + var(--sa-top))", paddingBottom: "calc(2rem + var(--sa-bottom))" }}
            >
              <section className="rounded-[22px] border border-ink/[0.08] bg-ink/[0.025] p-4">
                <div className="mb-3">
                  <p className="font-display text-[13px] font-bold tracking-[0.12em] text-ink-faint uppercase">
                    Navigate
                  </p>
                </div>
                <div className="no-scrollbar -mx-1 overflow-x-auto overscroll-x-contain px-1">
                  <div className="flex w-max min-w-full snap-x snap-mandatory gap-2">
                  {[
                    { label: "Home", icon: Home, action: onHome },
                    { label: "Specification", icon: BookOpen, action: onOpenSpec },
                    { label: "Revision pack", icon: ClipboardList, action: onOpenPack },
                    { label: "Progress", icon: Sticker, action: onOpenProgress },
                    { label: "Disclaimer", icon: ShieldCheck, action: onOpenLegal },
                    {
                      label: fullscreen ? "Exit full screen" : "Full screen",
                      icon: fullscreen ? Minimize : Maximize,
                      action: onToggleFullscreen,
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => { item.action(); onClose(); }}
                      aria-label={item.label}
                      className="group flex w-[76px] shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-[14px] px-1 py-2 text-center transition-colors hover:bg-paper/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/[0.08] bg-paper text-ink-soft shadow-[0_1px_2px_rgb(0_0_0/0.035)] transition-all duration-200 group-hover:border-mint/30 group-hover:bg-mint/12 group-hover:text-ink group-hover:shadow-[0_3px_10px_rgb(18_184_134/0.09)]">
                        <item.icon className="h-[19px] w-[19px]" strokeWidth={1.9} />
                      </span>
                      <span className="max-w-full text-[11px] leading-tight font-semibold text-ink-soft group-hover:text-ink">
                        {item.label}
                      </span>
                    </button>
                  ))}
                  </div>
                </div>
              </section>

              <Section
                title="Interface"
                hint="Two dresses for the same site — your notes, progress and pack stay exactly as they are."
                dot="#8D82B8"
              >
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
                        className="group flex min-w-0 cursor-pointer flex-col gap-2 rounded-[18px] border p-2.5 text-left transition-all hover:-translate-y-0.5"
                        style={{
                          borderColor: active ? "#8D82B8" : "color-mix(in oklab, var(--color-ink) 9%, transparent)",
                          background: active
                            ? "color-mix(in oklab, #8D82B8 8%, var(--color-paper))"
                            : "color-mix(in oklab, var(--color-ink) 3%, var(--color-paper))",
                          boxShadow: active ? "0 0 0 1px #8D82B8, 0 5px 14px -12px #8D82B8" : "none",
                        }}
                      >
                        <IfaceStage id={f} />
                        <span className="flex w-full items-center justify-between gap-2">
                          <span className="truncate font-display text-[12px] font-bold text-ink">{IFACE_LABEL[f]}</span>
                          {active ? (
                            <Check className="h-4 w-4 shrink-0 text-mint" strokeWidth={2.8} />
                          ) : (
                            <span className="text-[9px] font-semibold tracking-wide text-ink-faint uppercase">Select</span>
                          )}
                        </span>
                        <span className="text-[10.5px] leading-snug text-ink-faint">{IFACE_DESCRIPTION[f]}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section
                title="Appearance"
                hint="Choose a theme. Changes are applied immediately and saved automatically."
                dot="#12B886"
              >
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
                        className="group flex min-w-0 cursor-pointer flex-col gap-2 rounded-[18px] border p-2.5 text-left transition-all hover:-translate-y-0.5"
                        style={{
                          borderColor: active ? "#12B886" : "color-mix(in oklab, var(--color-ink) 9%, transparent)",
                          background: active
                            ? "color-mix(in oklab, #12B886 8%, var(--color-paper))"
                            : "color-mix(in oklab, var(--color-ink) 3%, var(--color-paper))",
                          boxShadow: active ? "0 0 0 1px #12B886, 0 5px 14px -12px #12B886" : "none",
                        }}
                      >
                        <LabStage id={l} />
                        <span className="flex w-full items-center justify-between gap-2">
                          <span className="flex min-w-0 items-center gap-2">
                            <LabChip id={l} />
                            <span className="truncate font-display text-[12px] font-bold text-ink">{LAB_LABEL[l]}</span>
                          </span>
                          {active ? (
                            <Check className="h-4 w-4 shrink-0 text-mint" strokeWidth={2.8} />
                          ) : (
                            <span className="text-[9px] font-semibold tracking-wide text-ink-faint uppercase">Select</span>
                          )}
                        </span>
                        <span className="text-[10.5px] leading-snug text-ink-faint">{LAB_DESCRIPTION[l]}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section title="Colours" dot="#FF6B6B">
                <div className="rounded-[20px] border border-ink/[0.09] bg-ink/[0.025] p-3.5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-[12px] font-semibold text-ink">Accent palette</p>
                      <p className="mt-0.5 text-[10.5px] text-ink-faint">Select the colours used across your revision pages</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-ink/[0.08] bg-paper px-2.5 py-1 text-[10px] font-semibold tabular-nums text-ink-soft">
                      {prefs.accents.length} selected
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
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
                          className="group flex min-w-0 cursor-pointer flex-col items-center gap-2 rounded-[13px] border px-1.5 py-2.5 transition-all"
                          style={{
                            borderColor: on ? a.hex : "color-mix(in oklab, var(--color-ink) 9%, transparent)",
                            background: on ? tint(a.hex, 12) : "var(--color-paper)",
                            boxShadow: on ? `0 2px 8px -5px ${a.hex}` : "none",
                          }}
                        >
                          <span
                            aria-hidden
                            className="relative grid h-9 w-9 place-items-center rounded-full transition-transform group-hover:scale-105"
                            style={{
                              background: a.hex,
                              boxShadow: `0 2px 0 ${shade(a.hex)}, inset 0 1px 0 rgb(255 255 255 / 0.38)`,
                              opacity: on ? 1 : 0.78,
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
                          <span className={`max-w-full truncate font-display text-[10.5px] font-semibold ${
                            on ? "text-ink" : "text-ink-faint"
                          }`}>
                            {a.label}
                          </span>
                        </m.button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-3 rounded-[16px] border border-ink/[0.08] bg-paper px-3.5 py-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-[10px] font-bold tracking-[0.12em] text-ink-faint uppercase">Colour sequence preview</span>
                    <span className="text-[10px] font-medium text-ink-faint">Applied to topic accents</span>
                  </div>
                  <div aria-hidden className="flex items-center gap-1.5">
                    {Array.from({ length: 8 }, (_, k) => (
                      <span
                        key={k}
                        className="h-2.5 min-w-0 flex-1 rounded-full"
                        style={{ background: accentOf(k) }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[10.5px] leading-snug text-ink-soft">
                    {rotationCaption}
                  </p>
                </div>
              </Section>

              <Section title="Text size" dot="#FFD43B">
                <div className="flex rounded-full bg-ink/[0.06] p-1">
                  {SCALES.map((s, i) => {
                    const active = prefs.scale === s;
                    return (
                      <m.button
                        key={s}
                        type="button"
                        onClick={() => setPrefs({ scale: s })}
                        whileTap={{ scale: 0.93 }}
                        aria-pressed={active}
                        aria-label={`Text size ${s}`}
                        className={`flex flex-1 cursor-pointer flex-col items-center rounded-full py-2 transition-colors ${
                          active
                            ? "bg-coral text-white shadow-[0_2px_0_#E8590C]"
                            : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        <span
                          className="font-display leading-none font-bold"
                          style={{
                            fontSize: `calc(${SCALE_PX[i]}px * var(--ui-scale))`,
                          }}
                        >
                          Aa
                        </span>
                        <span className="mt-1 font-display text-[9.5px] font-bold tracking-[0.08em]">
                          {s}
                        </span>
                      </m.button>
                    );
                  })}
                </div>
              </Section>

              {/* one fonts section, two runs — the heading family and
                  the body family are one decision, not two departments */}
              <Section title="Fonts" dot="#9775FA">
                <div className="flex flex-col gap-2">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                    Headings
                  </p>
                  {HEAD_FONTS.map((f) => (
                    <FontRow
                      key={f.id}
                      active={prefs.headFont === f.id}
                      label={f.label}
                      stack={f.stack}
                      onClick={() => setPrefs({ headFont: f.id })}
                      ariaLabel={`Heading font ${f.label}`}
                    />
                  ))}
                  <p className="mt-2.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                    Body
                  </p>
                  {BODY_FONTS.map((f) => (
                    <FontRow
                      key={f.id}
                      active={prefs.bodyFont === f.id}
                      label={f.label}
                      stack={f.stack}
                      onClick={() => setPrefs({ bodyFont: f.id })}
                      ariaLabel={`Body font ${f.label}`}
                    />
                  ))}
                </div>
              </Section>

              <Section title="Spec map" dot="#F06595">
                <div className="flex flex-col gap-2.5">
                  {/* height — three rungs plus the drag: a dragged
                      fraction sits between rungs and the panel says
                      so, instead of pretending a preset is on */}
                  <div className="flex rounded-full bg-ink/[0.06] p-1">
                    {SPEC_HEIGHTS.map((h) => {
                      const active =
                        Math.abs(prefs.specHeight - h.fraction) < 0.025;
                      return (
                        <m.button
                          key={h.id}
                          type="button"
                          onClick={() => setPrefs({ specHeight: h.fraction })}
                          whileTap={{ scale: 0.93 }}
                          aria-pressed={active}
                          aria-label={`Spec map height ${h.label}`}
                          className={`flex flex-1 cursor-pointer flex-col items-center rounded-full py-2 transition-colors ${
                            active
                              ? "bg-coral text-white shadow-[0_2px_0_#E8590C]"
                              : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          <span className="font-display text-[14px] leading-none font-bold">
                            {Math.round(h.fraction * 100)}
                            <span className="text-[9.5px]">%</span>
                          </span>
                          <span className="mt-1 font-display text-[9.5px] font-bold tracking-[0.08em]">
                            {h.label}
                          </span>
                        </m.button>
                      );
                    })}
                  </div>
                  {!heightOnPreset && (
                    <p className="text-center text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint">
                      custom — {Math.round(prefs.specHeight * 100)}%
                    </p>
                  )}
                  {/* chip density — the min-width the tray's auto-fill
                      grid packs columns against */}
                  <div className="flex rounded-full bg-ink/[0.06] p-1">
                    {SPEC_DENSITIES.map((d) => {
                      const active = prefs.specDensity === d.id;
                      return (
                        <m.button
                          key={d.id}
                          type="button"
                          onClick={() => setPrefs({ specDensity: d.id })}
                          whileTap={{ scale: 0.93 }}
                          aria-pressed={active}
                          aria-label={`Spec map density ${d.label}`}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-full py-2 transition-colors ${
                            active
                              ? "bg-coral text-white shadow-[0_2px_0_#E8590C]"
                              : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          <span className="font-display text-[11.5px] font-bold tracking-[0.04em]">
                            {d.label}
                          </span>
                        </m.button>
                      );
                    })}
                  </div>
                </div>
              </Section>

              <Section title="Details" dot="#FF922B">
                <div className="grid grid-cols-2 gap-2.5">
                  <Toggle
                    on={prefs.dots}
                    onChange={(v) => setPrefs({ dots: v })}
                    label="Dots"
                  />
                  <Toggle
                    on={prefs.motion}
                    onChange={(v) => setPrefs({ motion: v })}
                    label="Motion"
                  />
                </div>
              </Section>

              <button
                type="button"
                onClick={() => {
                  setPrefs(DEFAULT_PREFS);
                }}
                className="mx-auto mt-2 inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2 rounded-full bg-ink/[0.06] px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              <p className="flex items-start justify-center gap-1.5 text-center text-[11.5px] leading-relaxed font-bold text-ink-faint">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lemon" />
                saved on this device
              </p>
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
