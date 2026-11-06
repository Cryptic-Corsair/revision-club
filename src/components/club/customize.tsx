"use client";

import { useEffect, type ReactNode, type SVGProps } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, RotateCcw, Sliders, Sparkles, X, Sun, Moon, SunMoon, Dune } from "./icons";
import { readableInk, shade, tint } from "./bits";
import { accentOf } from "./bands";
import {
  ACCENTS,
  DEFAULT_PREFS,
  flashThemeAnim,
  LAB_LABEL,
  setPrefs,
  usePrefs,
  ZOOM_LABEL,
  ZOOM_STEPS,
  type AccentId,
  type BodyFont,
  type HeadFont,
  type Lab,
} from "@/lib/spectra/prefs";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · the customize panel
   A slide-over workshop of frosted glass: the lab picker shows a
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
  { id: "nunito", label: "Nunito", stack: "var(--font-nunito), 'Trebuchet MS', sans-serif" },
  { id: "quicksand", label: "Quicksand", stack: "var(--font-quicksand), 'Trebuchet MS', sans-serif" },
];

const ZOOM_PX = [12, 14, 16, 19];

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
  hint: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[22px] bg-ink/[0.045] px-4 py-3.5 text-left transition-colors hover:bg-ink/[0.08]"
    >
      <span className="min-w-0">
        <span className="block font-display text-[14px] font-semibold text-ink">{label}</span>
        <span className="block text-[11.5px] font-bold text-ink-faint">{hint}</span>
      </span>
      <span
        aria-hidden
        className="relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors"
        style={{
          background: on ? "#12B886" : "rgb(61 43 31 / 0.18)",
          boxShadow: on ? "inset 0 1px 2px rgb(0 0 0 / 0.18)" : "inset 0 1px 2px rgb(61 43 31 / 0.12)",
        }}
      >
        <m.span
          className="absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm"
          animate={{ left: on ? 23 : 3 }}
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
      <span className="relative block h-14 w-full overflow-hidden rounded-[12px] bg-[#fff6ea] shadow-[inset_0_0_0_1px_rgb(61_43_31/0.08)]">
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
      <span className="relative block h-14 w-full overflow-hidden rounded-[12px] bg-[#1e1a26] shadow-[inset_0_0_0_1px_rgb(255_246_234/0.08)]">
        <span
          className="absolute inset-0"
          style={{ background: "radial-gradient(42px 30px at 68% 12%, rgb(151 117 250 / 0.3), transparent 70%)" }}
        />
        <span className="absolute top-3 left-2 h-5 w-9 rounded-md bg-[#2e2744] shadow-[0_1.5px_0_rgb(0_0_0/0.35)]" />
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
      <span className="relative block h-14 w-full overflow-hidden rounded-[12px] bg-[#1e1b16] shadow-[inset_0_0_0_1px_rgb(246_240_230/0.08)]">
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
    <span className="relative block h-14 w-full overflow-hidden rounded-[12px] bg-[linear-gradient(115deg,#2c2013_49.5%,#fdf6e3_50.5%)] shadow-[inset_0_0_0_1px_rgb(61_43_31/0.1)]">
      <span className="absolute top-3 left-2 h-5 w-7 rounded-md bg-[#fdf6e3]/90" />
      <span className="absolute top-4.5 right-2 h-5 w-7 rounded-md bg-[#2c2013]/90" />
      <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1">
        <i className="h-1.5 w-1.5 rounded-full bg-[#fdf6e3]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#2c2013]" />
      </span>
    </span>
  );
}

/* the four labs, each with its own mark — the same family the
   nav pill wears */
const LAB_ICONS: Record<Lab, (p: SVGProps<SVGSVGElement>) => ReactNode> = {
  light: Sun,
  dark: Moon,
  dune: Dune,
  classic: SunMoon,
};

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

  /* what the rotation reads as, in words — one pick dresses every
     section, two alternate, three+ cycle, six is the full wheel */
  const pickedLabels = prefs.accents.map(
    (id) => ACCENTS.find((a) => a.id === id)!.label,
  );
  const rotationCaption =
    pickedLabels.length === ACCENTS.length
      ? "The full wheel — all six take turns down the page."
      : pickedLabels.length === 1
        ? `Every section wears ${pickedLabels[0]}.`
        : pickedLabels.length === 2
          ? `Sections alternate ${pickedLabels[0]} ↔ ${pickedLabels[1]}.`
          : `Sections rotate ${pickedLabels.join(" → ")} — then back to ${pickedLabels[0]}.`;

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
            className="fixed inset-y-0 right-0 z-[95] flex w-[min(440px,94vw)] flex-col overflow-hidden rounded-l-[30px] bg-cream/85 shadow-[-30px_0_80px_-40px_rgb(0_0_0/0.55)] backdrop-blur-2xl backdrop-saturate-150"
          >
            {/* ————— the ambience inside the frost —————
                two quiet lamps and a grain of dots, so the blur has
                something warm to hold. Static; never animates. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(rgb(61 43 31 / 0.05) 1.6px, transparent 1.7px)",
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

            {/* header — rides below the notch when the phone has one */}
            <div
              className="relative flex items-center gap-3 border-b border-ink/[0.06] px-6 pb-4"
              style={{ paddingTop: "calc(1.5rem + var(--sa-top))" }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lemon/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]">
                <Sliders className="h-5.5 w-5.5 text-lemon" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-[20px] leading-tight font-semibold text-ink">
                  Make it yours
                </h2>
                <p className="text-[12px] font-bold text-ink-faint">
                  the whole site re-dresses as you tap
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
              <Section
                title="The lab"
                dot="#12B886"
                hint="Four rooms — light, night, dune & classic. Classic is the daylight page with espresso & cream sections."
              >
                <div className="grid grid-cols-4 gap-2">
                  {(["light", "dark", "dune", "classic"] as Lab[]).map((l) => {
                    const active = prefs.theme === l;
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => pickLab(l)}
                        aria-pressed={active}
                        aria-label={`${LAB_LABEL[l]} lab`}
                        className="flex cursor-pointer flex-col gap-2 rounded-[20px] p-2.5 text-left transition-colors"
                        style={
                          active
                            ? { background: "rgb(18 184 134 / 0.13)", boxShadow: "inset 0 0 0 2.5px #12B886" }
                            : { background: "rgb(61 43 31 / 0.05)" }
                        }
                      >
                        <span className="relative block w-full">
                          <LabStage id={l} />
                          {active && (
                            <span className="absolute top-1.5 right-1.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-mint text-white shadow-[0_1.5px_0_rgb(11_99_73)]">
                              <Check className="h-3 w-3" strokeWidth={3.5} />
                            </span>
                          )}
                        </span>
                        <span
                          className={`flex items-center justify-center gap-1.5 text-center font-display text-[12px] font-bold ${
                            active ? "text-ink" : "text-ink-soft"
                          }`}
                        >
                          {(() => {
                            const LabIcon = LAB_ICONS[l];
                            return <LabIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.3} />;
                          })()}
                          {LAB_LABEL[l]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section
                title="Accent colours"
                dot="#FF6B6B"
                hint="Pick the candies your sections take turns wearing — one pick dresses them all, two alternate, three or more rotate. The wheel always keeps at least one."
              >
                <div className="grid grid-cols-3 gap-2">
                  {ACCENTS.map((a) => {
                    const on = prefs.accents.includes(a.id);
                    const lastOne = on && prefs.accents.length === 1;
                    return (
                      <m.button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAccent(a.id)}
                        whileTap={lastOne ? undefined : { scale: 0.93 }}
                        aria-pressed={on}
                        aria-disabled={lastOne || undefined}
                        aria-label={`${a.label} accent — ${
                          lastOne
                            ? "the only colour on the wheel, keep at least one on"
                            : on
                              ? "on the wheel, tap to take it off"
                              : "off the wheel, tap to put it on"
                        }`}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-[20px] px-2 py-3.5 transition-colors ${
                          on ? "" : "hover:bg-ink/[0.09]"
                        }`}
                        style={
                          on
                            ? {
                                background: tint(a.hex, 14),
                                boxShadow: `inset 0 0 0 2.5px ${a.hex}`,
                              }
                            : { background: "rgb(61 43 31 / 0.05)" }
                        }
                      >
                        <span
                          aria-hidden
                          className="grid h-10 w-10 place-items-center rounded-full transition-opacity"
                          style={{
                            background: a.hex,
                            boxShadow: `0 3px 0 ${shade(a.hex)}, inset 0 1px 0 rgb(255 255 255 / 0.35)`,
                            opacity: on ? 1 : 0.32,
                          }}
                        >
                          {on && (
                            <Check
                              className="h-5 w-5"
                              strokeWidth={3.2}
                              style={{ color: readableInk(a.hex) }}
                            />
                          )}
                        </span>
                        <span
                          className={`font-display text-[11.5px] font-bold ${
                            on ? "text-ink" : "text-ink-faint"
                          }`}
                        >
                          {a.label}
                        </span>
                      </m.button>
                    );
                  })}
                </div>
                {/* the rotation itself, previewed — the first eight
                    sections, exactly as the bands will wear them */}
                <div className="mt-3 rounded-[18px] bg-ink/[0.045] px-4 py-3">
                  <div aria-hidden className="flex items-end gap-1.5">
                    {Array.from({ length: 8 }, (_, k) => (
                      <span
                        key={k}
                        className="h-3 rounded-full"
                        style={{
                          width: k === 7 ? 10 : 22,
                          background: accentOf(k),
                        }}
                      />
                    ))}
                    <span className="ml-0.5 font-body text-[13px] font-bold text-ink-faint">
                      …
                    </span>
                  </div>
                  <p className="mt-2 text-[11.5px] leading-snug font-bold text-ink-faint">
                    {rotationCaption}
                  </p>
                </div>
              </Section>

              <Section title="Page size" dot="#FFD43B" hint="Zooms everything — notes, cards, nav.">
                <div className="flex rounded-full bg-ink/[0.06] p-1">
                  {ZOOM_STEPS.map((z, i) => {
                    const active = prefs.zoom === z;
                    return (
                      <m.button
                        key={z}
                        type="button"
                        onClick={() => setPrefs({ zoom: z })}
                        whileTap={{ scale: 0.93 }}
                        aria-pressed={active}
                        aria-label={`Page size ${ZOOM_LABEL[String(z)]}`}
                        className={`flex flex-1 cursor-pointer flex-col items-center rounded-full py-2 transition-colors ${
                          active
                            ? "bg-coral text-white shadow-[0_2px_0_#E8590C]"
                            : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        <span
                          className="font-display leading-none font-bold"
                          style={{ fontSize: ZOOM_PX[i] }}
                        >
                          Aa
                        </span>
                        <span className="mt-1 font-display text-[9.5px] font-bold tracking-[0.08em]">
                          {ZOOM_LABEL[String(z)]}
                        </span>
                      </m.button>
                    );
                  })}
                </div>
              </Section>

              <Section title="Headings" dot="#9775FA" hint="The chunky display face on titles and buttons.">
                <div className="flex flex-col gap-2">
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
                </div>
              </Section>

              <Section title="Body text" dot="#12B886" hint="The reading face for paragraphs.">
                <div className="flex flex-col gap-2">
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

              <Section title="Room style" dot="#FF922B">
                <div className="flex flex-col gap-2.5">
                  <Toggle
                    on={prefs.dots}
                    onChange={(v) => setPrefs({ dots: v })}
                    label="Polka-dot paper"
                    hint="the dotted texture behind every page"
                  />
                  <Toggle
                    on={prefs.motion}
                    onChange={(v) => setPrefs({ motion: v })}
                    label="Gentle motion"
                    hint="one-time settles, floating cards & wiggles"
                  />
                </div>
              </Section>

              <button
                type="button"
                onClick={() => {
                  flashThemeAnim();
                  setPrefs(DEFAULT_PREFS);
                }}
                className="mx-auto mt-2 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-ink/[0.06] px-5 py-2.5 font-display text-[13.5px] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
              >
                <RotateCcw className="h-4 w-4" /> Reset to defaults
              </button>
              <p className="flex items-start justify-center gap-1.5 text-center text-[11.5px] leading-relaxed font-bold text-ink-faint">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lemon" />
                choices are saved in this browser only
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
      className="flex cursor-pointer items-center gap-3.5 rounded-[22px] px-4 py-3 text-left transition-colors"
      style={
        active
          ? { background: "rgb(255 107 107 / 0.11)", boxShadow: "inset 0 0 0 2.5px #FF6B6B" }
          : { background: "rgb(61 43 31 / 0.05)" }
      }
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper text-[19px] leading-none font-bold text-ink shadow-[0_2px_0_rgb(61_43_31/0.08)]"
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
