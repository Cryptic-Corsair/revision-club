"use client";

import { Fragment, useEffect, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  Check,
  ClassicMoon,
  Eye,
  Gauge,
  Moon,
  Palette,
  PencilRuler,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  Target,
  X,
  Zap,
} from "./icons";
import { readableInk, shade, tint } from "./bits";
import { accentOf } from "./bands";
import {
  ACCENTS,
  DEFAULT_PREFS,
  flashThemeAnim,
  LAB_LABEL,
  SCALES,
  SPEC_DENSITIES,
  SPEC_HEIGHTS,
  setPrefs,
  THEME_CHIP,
  usePrefs,
  type AccentId,
  type BodyFont,
  type HeadFont,
  type Lab,
  type ScaleId,
} from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the customize panel
   A slide-over workshop of frosted glass, rebuilt inside: the
   header reads back your current setup in one line, every section
   carries its own icon chip and sits on a soft card, the four
   rooms open in a bigger two-by-two, the accent wheel finally
   looks like a wheel (candies joined by a dashed string), text
   size previews itself, fonts wear chips in their own lettering,
   and the spec tray's two knobs get labelled rows. Every knob
   still lands in prefs.ts and re-skins the site from <html>
   outward; the frost, the lamps and the Esc-to-close stay.
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

const LABS: Lab[] = ["light", "dark", "dune", "classic"];

const SCALE_PX = [12, 14, 16, 19];

const SCALE_WORD: Record<ScaleId, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra-large",
};

/* ————— section chrome —————
   an icon chip in the section's own candy, a name, one honest
   hint — and the knobs themselves sit on a soft paper card, so
   the panel reads as a bench with labelled trays, not a list. */
function Section({
  title,
  hint,
  icon: Icon,
  candy,
  children,
}: {
  title: string;
  hint?: string;
  icon: typeof Moon;
  candy: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[calc(10px*var(--ui-scale))]"
          style={{ background: tint(candy, 18), color: shade(candy, 62) }}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[calc(14.5px*var(--ui-scale))] leading-tight font-bold text-ink">
            {title}
          </h3>
          {hint && (
            <p className="mt-0.5 text-[calc(11.5px*var(--ui-scale))] leading-snug font-semibold text-ink-faint">
              {hint}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 rounded-[calc(24px*var(--ui-scale))] bg-paper/80 px-4 py-4 shadow-[inset_0_0_0_1px_var(--edge)]">
        {children}
      </div>
    </section>
  );
}

function Toggle({
  on,
  onChange,
  label,
  hint,
  icon: Icon,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
  icon?: typeof Moon;
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
      <span className="flex min-w-0 items-center gap-2.5">
        {Icon && <Icon aria-hidden className="h-4.5 w-4.5 shrink-0 text-ink-faint" strokeWidth={2.1} />}
        <span className="min-w-0">
          <span className="block font-display text-[calc(14px*var(--ui-scale))] font-semibold text-ink">{label}</span>
          {hint && (
            <span className="block text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint">{hint}</span>
          )}
        </span>
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
   The dark miniature is the night lab (violet ink); dune is the
   chocolate room with its low amber lamp. */

function LabStage({ id }: { id: Lab }) {
  if (id === "light") {
    return (
      <span className="relative block h-16 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[#fff6ea] shadow-[inset_0_0_0_1px_rgb(61_43_31/0.08)]">
        <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-[#ffd43b]/70" />
        <span className="absolute top-3.5 left-2 h-6 w-10 rounded-md bg-[#fffdf7] shadow-[0_1.5px_0_rgb(61_43_31/0.1)]" />
        <span className="absolute top-6 left-3.5 h-1 w-6 rounded-full bg-[#3d2b1f]/15" />
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
      <span className="relative block h-16 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[#1e1a26] shadow-[inset_0_0_0_1px_rgb(255_246_234/0.08)]">
        <span
          className="absolute inset-0"
          style={{ background: "radial-gradient(52px 36px at 68% 12%, rgb(151 117 250 / 0.3), transparent 70%)" }}
        />
        <span className="absolute top-3.5 left-2 h-6 w-10 rounded-md bg-[#2e2744] shadow-[0_1.5px_0_rgb(0_0_0/0.35)]" />
        <span className="absolute top-6 left-3.5 h-1 w-6 rounded-full bg-[#f4f1fb]/15" />
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
      <span className="relative block h-16 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[#1e1b16] shadow-[inset_0_0_0_1px_rgb(246_240_230/0.08)]">
        <span
          className="absolute inset-0"
          style={{ background: "radial-gradient(52px 36px at 68% 12%, rgb(255 196 120 / 0.22), transparent 70%)" }}
        />
        <span className="absolute top-3.5 left-2 h-6 w-10 rounded-md bg-[#2e2820] shadow-[0_1.5px_0_rgb(0_0_0/0.35)]" />
        <span className="absolute top-6 left-3.5 h-1 w-6 rounded-full bg-[#f6f0e6]/15" />
        <span className="absolute bottom-2 left-2 flex items-center gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-[#ffd43b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#12b886]" />
        </span>
      </span>
    );
  }
  return (
    <span className="relative block h-16 w-full overflow-hidden rounded-[calc(12px*var(--ui-scale))] bg-[linear-gradient(115deg,#2c2013_49.5%,#fdf6e3_50.5%)] shadow-[inset_0_0_0_1px_rgb(61_43_31/0.1)]">
      <span className="absolute top-3.5 left-2 h-6 w-8 rounded-md bg-[#fdf6e3]/90" />
      <span className="absolute top-5 right-2 h-6 w-8 rounded-md bg-[#2c2013]/90" />
      <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1">
        <i className="h-1.5 w-1.5 rounded-full bg-[#fdf6e3]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#2c2013]" />
      </span>
    </span>
  );
}

/* the four themes, each behind its own chip — the same swatch the
   nav pill and the toast wear (THEME_CHIP): the moon everywhere,
   the background names the room. Classic takes the split moon,
   because its chip is cut and no single ink crosses it. */
function LabChip({ id }: { id: Lab }) {
  const chip = THEME_CHIP[id];
  return (
    <span
      aria-hidden
      className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
      style={{ background: chip.bg, boxShadow: `0 1.5px 0 ${chip.side}` }}
    >
      {id === "classic" ? (
        <ClassicMoon className="h-[13px] w-[13px]" />
      ) : (
        <Moon className="h-[11px] w-[11px]" strokeWidth={2.4} style={{ color: chip.ink }} />
      )}
    </span>
  );
}

/* ————— one font family, as a chip —————
   the chip itself is set in the family it picks, so browsing the
   lettering is trying it on. One selection ink across the whole
   panel: coral fill, the darker coral pedestal. */
function FontChip({
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
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors ${
        active ? "text-white" : "text-ink-soft hover:text-ink"
      }`}
      style={
        active
          ? { background: "#FF6B6B", boxShadow: "0 2px 0 #E8590C" }
          : { background: "color-mix(in oklab, var(--color-ink) 5%, transparent)" }
      }
    >
      <span
        aria-hidden
        className="text-[calc(14px*var(--ui-scale))] leading-none font-bold"
        style={{ fontFamily: stack }}
      >
        Aa
      </span>
      <span
        className="text-[calc(12.5px*var(--ui-scale))] font-bold"
        style={{ fontFamily: stack }}
      >
        {label}
      </span>
      {active && <Check className="h-3.5 w-3.5" strokeWidth={3.2} />}
    </button>
  );
}

export function CustomizePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    flashThemeAnim();
    setPrefs({ theme: lab });
  };

  /* tap a swatch to put it on (or take it off) the wheel — the
     bands behind the panel re-dress as you tap. The wheel keeps at
     least one colour on: with nothing to alternate, there's no
     wheel. */
  const toggleAccent = (id: AccentId) => {
    if (prefs.accents.length === 1 && prefs.accents[0] === id) return;
    flashThemeAnim();
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

  /* the header's live read-back — the whole setup, one line */
  const summary = `${LAB_LABEL[prefs.theme]} room · ${SCALE_WORD[prefs.scale]} text · ${
    prefs.accents.length
  } ${prefs.accents.length === 1 ? "candy" : "candies"} on the wheel`;

  const scaleIdx = SCALES.indexOf(prefs.scale);

  /* one selection ink for the whole panel — coral, the house
     primary. Swatches keep their own hue when on (they ARE the
     content); everything else selected wears coral. */
  const selectedRing = {
    background: "rgb(255 107 107 / 0.1)",
    boxShadow: "inset 0 0 0 2.5px #FF6B6B",
  };
  const idleRing = { background: "color-mix(in oklab, var(--color-ink) 5%, transparent)" };

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
            aria-label="Customize Reaction Club"
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="customize-drawer fixed inset-y-0 right-0 z-[95] flex w-[min(calc(440px*var(--ui-scale)),94vw)] flex-col overflow-hidden rounded-l-[calc(30px*var(--ui-scale))] bg-cream/85 shadow-[-30px_0_80px_-40px_rgb(0_0_0/0.55)] backdrop-blur-2xl backdrop-saturate-150"
          >
            {/* ————— the ambience inside the frost —————
                two quiet lamps and a grain of dots, so the blur has
                something warm to hold. Static; never animates. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(color-mix(in oklab, var(--color-ink) 7%, transparent) 1.6px, transparent 1.7px)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div
                className="absolute -top-24 -right-20 h-80 w-80 rounded-full"
                style={{ background: "radial-gradient(circle, rgb(255 146 43 / 0.17), transparent 70%)" }}
              />
              <div
                className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full"
                style={{ background: "radial-gradient(circle, rgb(151 117 250 / 0.12), transparent 70%)" }}
              />
            </div>

            {/* header — rides below the notch when the phone has one,
                and reads your setup back in one live line */}
            <div
              className="relative flex items-center gap-3 border-b border-ink/[0.06] px-6 pb-4"
              style={{ paddingTop: "calc(1.5rem + var(--sa-top))" }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lemon/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]">
                <Sliders className="h-5.5 w-5.5 text-lemon" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-[calc(20px*var(--ui-scale))] leading-tight font-semibold text-ink">
                  Customize
                </h2>
                <p className="mt-0.5 truncate text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint">
                  {summary}
                </p>
              </div>
              <m.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.88 }}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
              >
                <X className="h-5 w-5" strokeWidth={2.2} />
              </m.button>
            </div>

            <div
              className="no-scrollbar relative flex flex-1 flex-col gap-7 overflow-y-auto px-6 pt-5"
              style={{ paddingBottom: "calc(2rem + var(--sa-bottom))" }}
            >
              {/* ————— theme ————— */}
              <Section
                title="Theme"
                hint="Four rooms — the whole site re-dresses."
                icon={Moon}
                candy="#12B886"
              >
                <div className="grid grid-cols-2 gap-2.5">
                  {LABS.map((l) => {
                    const active = prefs.theme === l;
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => pickLab(l)}
                        aria-pressed={active}
                        aria-label={`${LAB_LABEL[l]} theme`}
                        className="flex cursor-pointer flex-col gap-2 rounded-[calc(20px*var(--ui-scale))] p-2.5 text-left transition-colors"
                        style={active ? selectedRing : idleRing}
                      >
                        <span className="relative block w-full">
                          <LabStage id={l} />
                          {active && (
                            <span className="absolute top-1.5 right-1.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-coral text-white shadow-[0_1.5px_0_#E8590C]">
                              <Check className="h-3 w-3" strokeWidth={3.5} />
                            </span>
                          )}
                        </span>
                        <span
                          className={`flex items-center justify-center gap-1.5 text-center font-display text-[calc(12px*var(--ui-scale))] font-bold ${
                            active ? "text-ink" : "text-ink-soft"
                          }`}
                        >
                          <LabChip id={l} />
                          {LAB_LABEL[l]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* ————— the colour wheel ————— */}
              <Section
                title="Colours"
                hint="Tap candies on and off the wheel — sections take turns wearing them."
                icon={Palette}
                candy="#FF6B6B"
              >
                <div className="flex items-center py-1">
                  {ACCENTS.map((a, i) => {
                    const on = prefs.accents.includes(a.id);
                    const lastOne = on && prefs.accents.length === 1;
                    return (
                      <Fragment key={a.id}>
                        {i > 0 && (
                          <span
                            aria-hidden
                            className="mx-1 h-0 min-w-2 flex-1 border-t-2 border-dashed border-ink/15"
                          />
                        )}
                        <m.button
                          type="button"
                          onClick={() => toggleAccent(a.id)}
                          whileTap={lastOne ? undefined : { scale: 0.9 }}
                          aria-pressed={on}
                          aria-disabled={lastOne || undefined}
                          aria-label={`${a.label} — ${
                            lastOne
                              ? "the wheel keeps one colour on"
                              : on
                                ? "on, tap to remove"
                                : "off, tap to add"
                          }`}
                          title={`${a.label}${on ? " · on" : ""}`}
                          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full transition-all"
                          style={
                            on
                              ? {
                                  background: a.hex,
                                  boxShadow: `0 3px 0 ${shade(a.hex)}, inset 0 1px 0 rgb(255 255 255 / 0.35)`,
                                }
                              : {
                                  background: "transparent",
                                  boxShadow: `inset 0 0 0 2.5px color-mix(in oklab, ${a.hex} 45%, transparent)`,
                                  opacity: 0.72,
                                }
                          }
                        >
                          {on && (
                            <Check
                              className="h-5 w-5"
                              strokeWidth={3.2}
                              style={{ color: readableInk(a.hex) }}
                            />
                          )}
                        </m.button>
                      </Fragment>
                    );
                  })}
                </div>
                {/* the rotation itself, previewed — a full-width band
                    wearing the picked candies in wheel order */}
                <div className="mt-3.5 rounded-[calc(18px*var(--ui-scale))] bg-ink/[0.045] px-4 py-3">
                  <div aria-hidden className="flex gap-1">
                    {Array.from({ length: 12 }, (_, k) => (
                      <span
                        key={k}
                        className="h-2.5 flex-1 rounded-full"
                        style={{ background: accentOf(k) }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[calc(11.5px*var(--ui-scale))] leading-snug font-bold text-ink-faint">
                    {rotationCaption}
                  </p>
                </div>
              </Section>

              {/* ————— text size ————— */}
              <Section
                title="Text size"
                hint="Words scale everywhere — the navbar and the spec tray stay put."
                icon={Gauge}
                candy="#F59F00"
              >
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
                        <span className="mt-1 font-display text-[calc(9.5px*var(--ui-scale))] font-bold tracking-[0.08em]">
                          {s}
                        </span>
                      </m.button>
                    );
                  })}
                </div>
                {/* the chosen rung, read back on a real sentence */}
                <p
                  aria-hidden
                  className="mt-3 rounded-[calc(16px*var(--ui-scale))] bg-ink/[0.045] px-4 py-3 font-semibold text-ink-soft"
                  style={{ fontSize: `calc(${SCALE_PX[scaleIdx]}px * var(--ui-scale))` }}
                >
                  Chemistry, made to stick.
                </p>
              </Section>

              {/* ————— fonts — chips in their own lettering ————— */}
              <Section
                title="Fonts"
                hint="Headings and body — picked separately."
                icon={PencilRuler}
                candy="#9775FA"
              >
                <div className="flex flex-col gap-3.5">
                  <div>
                    <p className="font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink-faint uppercase">
                      Headings
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {HEAD_FONTS.map((f) => (
                        <FontChip
                          key={f.id}
                          active={prefs.headFont === f.id}
                          label={f.label}
                          stack={f.stack}
                          onClick={() => setPrefs({ headFont: f.id })}
                          ariaLabel={`Heading font ${f.label}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink-faint uppercase">
                      Body
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {BODY_FONTS.map((f) => (
                        <FontChip
                          key={f.id}
                          active={prefs.bodyFont === f.id}
                          label={f.label}
                          stack={f.stack}
                          onClick={() => setPrefs({ bodyFont: f.id })}
                          ariaLabel={`Body font ${f.label}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              {/* ————— the spec tray ————— */}
              <Section
                title="Spec map"
                hint="The tray that rides over your notes — drag its grabber anytime, it remembers."
                icon={Target}
                candy="#F06595"
              >
                <div className="flex flex-col gap-3.5">
                  {/* height — three rungs plus the drag: a dragged
                      fraction sits between rungs and the panel says
                      so, instead of pretending a preset is on */}
                  <div>
                    <p className="font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink-faint uppercase">
                      Tray height
                    </p>
                    <div className="mt-1.5 flex rounded-full bg-ink/[0.06] p-1">
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
                            <span className="font-display text-[calc(14px*var(--ui-scale))] leading-none font-bold">
                              {Math.round(h.fraction * 100)}
                              <span className="text-[calc(9.5px*var(--ui-scale))]">%</span>
                            </span>
                            <span className="mt-1 font-display text-[calc(9.5px*var(--ui-scale))] font-bold tracking-[0.08em]">
                              {h.label}
                            </span>
                          </m.button>
                        );
                      })}
                    </div>
                    {!heightOnPreset && (
                      <p className="mt-1.5 text-center text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint">
                        custom — {Math.round(prefs.specHeight * 100)}%
                      </p>
                    )}
                  </div>
                  {/* chip density — the min-width the tray's auto-fill
                      grid packs columns against */}
                  <div>
                    <p className="font-display text-[calc(10px*var(--ui-scale))] font-bold tracking-[0.16em] text-ink-faint uppercase">
                      Chip density
                    </p>
                    <div className="mt-1.5 flex rounded-full bg-ink/[0.06] p-1">
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
                                ? "bg-coral text-white shadow-[0 2px 0 #E8590C]"
                                : "text-ink-soft hover:text-ink"
                            }`}
                          >
                            <span className="font-display text-[calc(11.5px*var(--ui-scale))] font-bold tracking-[0.04em]">
                              {d.label}
                            </span>
                          </m.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Section>

              {/* ————— details ————— */}
              <Section
                title="Details"
                hint="Small textures and springs."
                icon={Sparkles}
                candy="#FF922B"
              >
                <div className="grid grid-cols-2 gap-2.5">
                  <Toggle
                    on={prefs.dots}
                    onChange={(v) => setPrefs({ dots: v })}
                    label="Dots"
                    hint="dotted paper"
                    icon={Eye}
                  />
                  <Toggle
                    on={prefs.motion}
                    onChange={(v) => setPrefs({ motion: v })}
                    label="Motion"
                    hint="blobs & springs"
                    icon={Zap}
                  />
                </div>
              </Section>

              <button
                type="button"
                onClick={() => {
                  flashThemeAnim();
                  setPrefs(DEFAULT_PREFS);
                }}
                className="mx-auto mt-1 inline-flex min-h-[calc(44px*var(--ui-scale))] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink/[0.06] px-5 py-2.5 font-display text-[calc(13.5px*var(--ui-scale))] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
              >
                <RotateCcw className="h-4 w-4" /> Back to the club defaults
              </button>
              <p className="flex items-start justify-center gap-1.5 text-center text-[calc(11.5px*var(--ui-scale))] leading-relaxed font-bold text-ink-faint">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" />
                Saved on this device — nothing leaves your browser.
              </p>
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}
