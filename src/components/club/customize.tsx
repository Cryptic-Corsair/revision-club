"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { RotateCcw, Sliders, Sparkles, X, Check } from "./icons";
import { readableInk, shade, tint } from "./bits";
import { accentOf } from "./bands";
import {
  ACCENTS,
  DEFAULT_PREFS,
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
   A slide-over workshop (not a drop-down — those stay reserved for
   the worked examples): the lab, the accent wheel, page size, the
   two font families, and the room's little comforts. Every knob
   lands in prefs.ts and re-skins the site from <html> outward.
   ═══════════════════════════════════════════════════════════════ */

const LABS: { id: Lab; swatch: string }[] = [
  { id: "light", swatch: "#FFD43B" },
  { id: "dark", swatch: "#2e2016" },
];

const HEAD_FONTS: { id: HeadFont; label: string; stack: string }[] = [
  { id: "fredoka", label: "Fredoka", stack: "var(--font-fredoka), 'Trebuchet MS', sans-serif" },
  { id: "baloo", label: "Baloo 2", stack: "var(--font-baloo), 'Trebuchet MS', sans-serif" },
  { id: "patrick", label: "Patrick Hand", stack: "var(--font-patrick), 'Comic Sans MS', cursive" },
];

const BODY_FONTS: { id: BodyFont; label: string; stack: string }[] = [
  { id: "nunito", label: "Nunito", stack: "var(--font-nunito), 'Trebuchet MS', sans-serif" },
  { id: "quicksand", label: "Quicksand", stack: "var(--font-quicksand), 'Trebuchet MS', sans-serif" },
];

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section>
      <div className="font-display text-[11.5px] font-bold tracking-[0.18em] text-ink-faint uppercase">
        {title}
      </div>
      {hint && <p className="mt-1 text-[12px] leading-snug font-bold text-ink-faint">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`cursor-pointer rounded-full px-4 py-2.5 font-display text-[13.5px] font-semibold transition-colors ${
        active ? "bg-coral text-white" : "bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
      }`}
      style={active ? { boxShadow: "0 3px 0 #E8590C" } : undefined}
    >
      {children}
    </m.button>
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
        style={{ background: on ? "#12B886" : "rgb(61 43 31 / 0.18)" }}
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
    /* hold the colours while they ease over — one smooth move */
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 480);
    setPrefs({ theme: lab });
  };

  /* tap a swatch to put it on (or take it off) the wheel — the
     bands behind the panel re-dress as you tap. The wheel keeps at
     least one colour on: with nothing to alternate, there's no
     wheel. */
  const toggleAccent = (id: AccentId) => {
    if (prefs.accents.length === 1 && prefs.accents[0] === id) return;
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 480);
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
            className="fixed inset-y-0 right-0 z-[95] flex w-[min(430px,94vw)] flex-col bg-cream shadow-[0_0_60px_rgb(0_0_0/0.35)]"
          >
            {/* header — rides below the notch when the phone has one */}
            <div
              className="flex items-center gap-3 px-6 pb-4"
              style={{ paddingTop: "calc(1.5rem + var(--sa-top))" }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lemon/25">
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
              className="no-scrollbar flex flex-1 flex-col gap-7 overflow-y-auto px-6 pt-2"
              style={{ paddingBottom: "calc(2rem + var(--sa-bottom))" }}
            >
              <Section title="The lab" hint="Daylight or after-dark.">
                <div className="flex flex-col gap-2">
                  {LABS.map((l) => {
                    const active = prefs.theme === l.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => pickLab(l.id)}
                        aria-pressed={active}
                        className="flex cursor-pointer items-center gap-3 rounded-[22px] px-4 py-3 text-left transition-colors"
                        style={
                          active
                            ? { background: "rgb(18 184 134 / 0.14)", boxShadow: "inset 0 0 0 2.5px #12B886" }
                            : { background: "rgb(61 43 31 / 0.045)" }
                        }
                      >
                        <span
                          aria-hidden
                          className="h-6 w-6 shrink-0 rounded-full"
                          style={{ background: l.swatch, boxShadow: "inset 0 0 0 2px rgb(61 43 31 / 0.15)" }}
                        />
                        <span className="font-display text-[14px] font-semibold text-ink">
                          {LAB_LABEL[l.id]}
                        </span>
                        {active && (
                          <span className="ml-auto font-display text-[11px] font-bold tracking-[0.14em] text-mint uppercase">
                            on
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section title="Accent colours" hint="Pick the candies your sections take turns wearing — one pick dresses them all, two alternate, three or more rotate. The wheel always keeps at least one.">
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
                            : { background: "rgb(61 43 31 / 0.045)" }
                        }
                      >
                        <span
                          aria-hidden
                          className="grid h-10 w-10 place-items-center rounded-full transition-opacity"
                          style={{
                            background: a.hex,
                            boxShadow: `0 3px 0 ${shade(a.hex)}`,
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
                  <div aria-hidden className="flex items-center gap-1.5">
                    {Array.from({ length: 8 }, (_, k) => (
                      <span
                        key={k}
                        className="h-2.5 rounded-full"
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

              <Section title="Page size" hint="Zooms everything — notes, cards, nav.">
                <div className="flex flex-wrap gap-2">
                  {ZOOM_STEPS.map((z) => {
                    const active = prefs.zoom === z;
                    const px = [12, 14, 16, 19][ZOOM_STEPS.indexOf(z)];
                    return (
                      <m.button
                        key={z}
                        type="button"
                        onClick={() => setPrefs({ zoom: z })}
                        whileTap={{ scale: 0.93 }}
                        aria-pressed={active}
                        aria-label={`Page size ${ZOOM_LABEL[String(z)]}`}
                        className={`flex cursor-pointer flex-col items-center rounded-[20px] px-4 py-2.5 transition-colors ${
                          active ? "bg-coral text-white" : "bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
                        }`}
                        style={active ? { boxShadow: "0 3px 0 #E8590C" } : undefined}
                      >
                        <span className="font-display leading-none font-bold" style={{ fontSize: px }}>
                          A
                        </span>
                        <span className="mt-1 font-display text-[10px] font-bold tracking-[0.1em]">
                          {ZOOM_LABEL[String(z)]}
                        </span>
                      </m.button>
                    );
                  })}
                </div>
              </Section>

              <Section title="Headings" hint="The chunky display face on titles and buttons.">
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

              <Section title="Body text" hint="The reading face for paragraphs.">
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

              <Section title="Room style">
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
                    hint="floating blobs and drifting ribbons"
                  />
                </div>
              </Section>

              <button
                type="button"
                onClick={() => {
                  const root = document.documentElement;
                  root.classList.add("theme-anim");
                  window.setTimeout(() => root.classList.remove("theme-anim"), 480);
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
          ? { background: "rgb(255 107 107 / 0.13)", boxShadow: "inset 0 0 0 2.5px #FF6B6B" }
          : { background: "rgb(61 43 31 / 0.045)" }
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
      {active && (
        <span className="ml-auto font-display text-[11px] font-bold tracking-[0.14em] text-coral uppercase">
          on
        </span>
      )}
    </button>
  );
}


