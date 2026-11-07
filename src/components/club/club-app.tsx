"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion";
import {
  Home as HomeIcon,
  Search,
  Sticker,
  SunMoon,
  Palette,
  Sparkles,
  Settings,
  ClipboardList,
  ArrowUp,
  Command,
  ShieldCheck,
  BookMarked,
  Atom,
  ListChecks,
  Clock,
  Check,
  ChevronDown,
} from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { UNITS, getUnit, getTopic, TOTALS } from "@/lib/spectra/units";
import { getNotesMeta, getNotesMetaForTopic } from "@/lib/spectra/notes-meta";
import { useTimeScope } from "@/lib/spectra/time";
import { usePacks } from "@/lib/spectra/packs";
import { useDesk, markUnit, markTopic } from "@/lib/spectra/desk";
import {
  applyPrefs,
  flashThemeAnim,
  LAB_DESCRIPTION,
  LAB_LABEL,
  LAB_ORDER,
  setPrefs,
  THEME_CHIP,
  usePrefs,
  type Lab,
} from "@/lib/spectra/prefs";
import { Home } from "./home";
import { Desk } from "./desk";
import { UnitView } from "./unit-view";
import { Mascot, SpeechBubble, readableInk } from "./bits";
import { SpecMapProvider, SpecMapTrigger } from "./spec-map";

/* ————— the lazy rooms —————
   Only the shell, the home page and the unit walk load up front;
   every other room — the notes reader with its whole figure
   sketchbook, the spec index, the pack bench, the sticker book,
   the topic fallback, the search bubble and the customize drawer —
   travels in its own chunk, fetched the moment it's first called
   for (and quietly warmed during idle time, see the warm effect in
   ClubApp). The shell knows *that* a note exists from
   notes-meta.ts, a few hundred bytes — the note itself never
   enters the first-paint bundle. */

const RoomLoading = () => (
  <div aria-busy="true" className="flex min-h-[55dvh] items-center justify-center">
    <span className="h-7 w-7 animate-spin rounded-full border-[3.5px] border-ink/10 border-t-ink/45" />
  </div>
);

const TopicView = dynamic(() => import("./topic-view").then((m) => m.TopicView), {
  ssr: false,
  loading: RoomLoading,
});
const NotesReader = dynamic(() => import("./notes-reader").then((m) => m.NotesReader), {
  ssr: false,
  loading: RoomLoading,
});
const StickerBook = dynamic(() => import("./sticker-book").then((m) => m.StickerBook), {
  ssr: false,
  loading: RoomLoading,
});
const SpecIndex = dynamic(() => import("./spec-index").then((m) => m.SpecIndex), {
  ssr: false,
  loading: RoomLoading,
});
const PackView = dynamic(() => import("./pack-view").then((m) => m.PackView), {
  ssr: false,
  loading: RoomLoading,
});
const SearchPalette = dynamic(() => import("./search").then((m) => m.SearchPalette), {
  ssr: false,
});
const CustomizePanel = dynamic(() => import("./customize").then((m) => m.CustomizePanel), {
  ssr: false,
});
const Legal = dynamic(() => import("./legal").then((m) => m.Legal), {
  ssr: false,
  loading: RoomLoading,
});

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · app shell — pill nav, views, footer
   The nav stays lean: home, then the tools. Units live on the
   home page, where they have room to breathe.
   ═══════════════════════════════════════════════════════════════ */

type View =
  | { kind: "home" }
  | { kind: "unit"; code: string }
  | { kind: "topic"; code: string; topicId: string }
  | { kind: "notes"; code: string; docId: string; spec?: string }
  | { kind: "spec" }
  | { kind: "pack" }
  | { kind: "sticker" }
  | { kind: "legal" };

/* ————— the brand mark —————
   The site's own object, drawn at logo size: the beaker itself —
   glass, chunky outline, liquid caught mid-fizz, measurement ticks
   — the mascot's visual language condensed to a mark. No tile and
   no pedestal (those made it read as a button rather than a brand),
   so it stands bare on the nav pill and on the cocoa footer alike.
   A bubble escapes the rim because something is always reacting
   here.

   The shape never changes; the dress follows the room — one edition
   per lab, so the mark lives in whatever room it's standing in:
   · light — the daylight original: warm white glass, cocoa outline,
     coral liquid;
   · classic — the reading-room edition: cream glass, espresso
     outline, amber liquid — the same palette the notes wear there;
   · night & dune — line art: the outline steps up to the room's own
     ink and the glass fill steps out entirely, so on the dark pill
     the mark is a drawn vessel with the liquid as its one bright
     body (the old cocoa outline vanished into the dark chrome).
   The footer sits on the same cocoa ground in every lab, so it pins
   the daylight edition and never re-dresses. */
function LogoMark({ size = 38, lab }: { size?: number; lab?: Lab }) {
  const prefs = usePrefs();
  const room = lab ?? prefs.theme;
  const ink =
    room === "classic" ? "#3B2A1B" :
    room === "dune" || room === "sage" ? "#E8F0E6" :
    room === "dark" ? "#F2EAF5" : "#493326";
  const liquid =
    room === "classic" ? "#C58A36" :
    room === "dune" ? "#D9A65F" :
    room === "sage" ? "#B5C8AD" :
    room === "dark" ? "#C79ACD" : "#E97862";
  const glass =
    room === "dark" || room === "dune" || room === "sage" ? "none" :
    room === "classic" ? "#F7EEDB" : "#FFF9EF";

  return (
    <m.span
      aria-hidden
      whileHover={{ scale: 1.06, rotate: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 380, damping: 16 }}
      className="inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none">
        {/* A single, continuous flask silhouette: broad shoulders,
            narrow neck and a weighted rounded base. */}
        <path
          d="M18 6.5h12M20 6.5v13L10.8 36.2A4.1 4.1 0 0 0 14.4 42h19.2a4.1 4.1 0 0 0 3.6-5.8L28 19.5v-13"
          stroke={ink}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={glass}
        />

        {/* The reaction line gives the liquid a deliberate, dynamic
            profile instead of the old cartoon wave. */}
        <path
          d="M14.2 33.1c4.1-2.7 7.1-2.5 10.1-.6 3.2 2 5.7 1.8 9.5-.5l3.1 5.5a2.5 2.5 0 0 1-2.2 3.7H13.3a2.5 2.5 0 0 1-2.2-3.7l3.1-4.4Z"
          fill={liquid}
        />
        <path
          d="M15.2 33.4c3.6-2.1 6.1-1.9 9-.2 2.8 1.7 5.4 1.7 8.7-.1"
          stroke={ink}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity=".62"
        />

        {/* Three measured bubbles, balanced as a recognisable
            signature at small navigation sizes. */}
        <circle cx="21.5" cy="27.5" r="1.45" fill={ink} opacity=".72" />
        <circle cx="27" cy="23.5" r="1.9" fill={liquid} stroke={ink} strokeWidth=".9" />
        <circle cx="32.5" cy="29" r="1.15" fill={ink} opacity=".55" />

        {/* Small reaction spark — offset, not a floating mascot bubble. */}
        <path
          d="M37.2 8.2l1.15 3.05 3.05 1.15-3.05 1.15-1.15 3.05-1.15-3.05L33 12.4l3.05-1.15 1.15-3.05Z"
          fill={liquid}
          stroke={ink}
          strokeWidth=".8"
          strokeLinejoin="round"
        />
      </svg>
    </m.span>
  );
}
/* ————— lab switch —————
   Light → night → dune → classic, one tap apart. The button wears
   its room's chip (THEME_CHIP) — white, navy, chocolate, and the
   diagonal espresso/cream cut for classic — with the moon on every
   one, so the current theme reads at a glance, and a candy toast
   using the same swatch announces each switch. Titles say the next
   stop, nothing more. The mobile browser chrome is re-painted to
   the lab's cream so the address bar never fights the page. */

/* the glyph for the current chip — the moon on every theme; the
   chip's background names the room. Classic takes the split moon:
   its chip is cut diagonally, and no single ink reads across both
   halves. */
function LabGlyph({ id }: { id: Lab }) {
  const cls = "h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]";
  return <Palette className={cls} strokeWidth={2.1} style={{ color: THEME_CHIP[id].ink }} />;
}

function TopBar({
  view,
  onHome,
  onOpenSticker,
  onOpenPack,
  onSearch,
  onOpenCustomize,
}: {
  view: View;
  onHome: () => void;
  onOpenSticker: () => void;
  onOpenPack: () => void;
  onSearch: () => void;
  onOpenCustomize: () => void;
}) {
  const prefs = usePrefs();
  const lab = prefs.theme;
  const { picks } = usePacks();
  const [announce, setAnnounce] = useState<Lab | null>(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themePickerRef = useRef<HTMLDivElement | null>(null);
  const themeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const chooseTheme = useCallback((next: Lab) => {
    if (next !== lab) {
      flashThemeAnim();
      setPrefs({ theme: next });
      setAnnounce(next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setAnnounce(null), 1800);
    }
    setThemeOpen(false);
    themeTriggerRef.current?.focus();
  }, [lab]);

  useEffect(() => {
    if (!themeOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !themePickerRef.current?.contains(event.target)) {
        setThemeOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setThemeOpen(false);
      themeTriggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [themeOpen]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const tool = (active: boolean) =>
    `grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-colors sm:h-11 sm:w-11 ${
      active
        ? "bg-ink text-cream"
        : "bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
    }`;

  return (
    <>
      <header
        className="site-header fixed inset-x-0 z-50 flex justify-center pl-[max(0.625rem,var(--sa-left))] pr-[max(0.625rem,var(--sa-right))] sm:pl-[max(0.75rem,var(--sa-left))] sm:pr-[max(0.75rem,var(--sa-right))]"
        style={{ top: "calc(0.625rem + var(--sa-top))" }}
      >
        <nav
          aria-label="Main"
          className="flex max-w-[97vw] items-center gap-1.5 rounded-full bg-paper/90 py-2 pr-2.5 pl-2.5 backdrop-blur-lg"
          style={{
            boxShadow:
              "0 3px 0 var(--edge), 0 16px 38px -18px rgb(0 0 0 / 0.4)",
          }}
        >
          <button
            type="button"
            onClick={onHome}
            className="flex shrink-0 cursor-pointer items-center gap-2.5 pr-1.5"
            aria-label="Reaction Club — home"
          >
            <LogoMark />
            <span className="hidden font-display text-[16px] font-semibold tracking-tight text-ink md:block">
              Reaction Club
            </span>
          </button>

          <span
            aria-hidden
            className="mx-1 hidden h-6 w-[3px] shrink-0 rounded-full bg-ink/10 sm:block"
          />

          {/* the note reader parks its Spec Map stop here — same 40px
              rhythm as every other nav button, wearing the unit's candy */}
          <SpecMapTrigger />

          {/* ————— home + tools ————— */}
          <m.button
            type="button"
            onClick={onHome}
            aria-current={view.kind === "home" ? "page" : undefined}
            aria-label="Home"
            title="Home"
            whileTap={{ scale: 0.88 }}
            className={tool(view.kind === "home")}
          >
            <HomeIcon className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={onOpenPack}
            aria-current={view.kind === "pack" ? "page" : undefined}
            whileTap={{ scale: 0.88 }}
            animate={{ scale: view.kind === "pack" ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className={`relative ${tool(view.kind === "pack")}`}
            title="Your revision pack · ticked spec points"
            aria-label={`Your revision pack${picks.length > 0 ? ` — ${picks.length} spec point${picks.length === 1 ? "" : "s"} ticked` : ""}`}
            style={
              view.kind === "pack"
                ? {
                    background: "#FFD43B",
                    color: "#5f4a00",
                    boxShadow: "0 3px 0 #E8A100",
                  }
                : undefined
            }
          >
            <ClipboardList className="h-[18px] w-[18px]" strokeWidth={2.2} />
            {picks.length > 0 && view.kind !== "pack" && (
              <span
                aria-hidden
                className="absolute -top-0.5 -right-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full px-0.5 font-display text-[9.5px] font-bold text-white"
                style={{ background: "#FF922B", boxShadow: "0 0 0 2px var(--color-paper)" }}
              >
                {picks.length}
              </span>
            )}
          </m.button>

          <m.button
            type="button"
            onClick={onSearch}
            whileTap={{ scale: 0.88 }}
            className={tool(false)}
            title="Search topics · ⌘K"
            aria-label="Search topics"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={onOpenSticker}
            aria-current={view.kind === "sticker" ? "page" : undefined}
            whileTap={{ scale: 0.88 }}
            animate={{ scale: view.kind === "sticker" ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className={tool(view.kind === "sticker")}
            title="Your progress · time & goals"
            aria-label="Open your progress"
            style={
              view.kind === "sticker"
                ? {
                    background: "#12B886",
                    color: "#fff",
                    boxShadow: "0 3px 0 #0B7A57",
                  }
                : undefined
            }
          >
            <Sticker className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={onOpenCustomize}
            whileTap={{ scale: 0.88 }}
            className={tool(false)}
            title="Customize · fonts, sizes & themes"
            aria-label="Customize the site"
          >
            <Settings className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </m.button>

          <div ref={themePickerRef} className="relative shrink-0">
            <m.button
              ref={themeTriggerRef}
              type="button"
              onClick={() => setThemeOpen((open) => !open)}
              whileTap={{ scale: 0.96 }}
              aria-expanded={themeOpen}
              aria-controls="theme-picker-options"
              aria-label={`Theme: ${LAB_LABEL[lab]}. Choose appearance`}
              title="Choose theme"
              className="group flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full px-2.5 transition-all hover:-translate-y-px sm:h-11 sm:gap-2.5 sm:px-3"
              style={{
                background: THEME_CHIP[lab].bg,
                color: lab === "dark" ? "#F7ECFB" : lab === "dune" ? "#FFE9C7" : lab === "sage" ? "#E8F0E6" : "#3D2B1F",
                boxShadow: `0 2.5px 0 ${THEME_CHIP[lab].side}, inset 0 1px 0 rgb(255 255 255 / 0.24)`,
              }}
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                style={{
                  background: THEME_CHIP[lab].bg,
                  color: THEME_CHIP[lab].ink,
                  boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.24)",
                }}
              >
                <LabGlyph id={lab} />
              </span>
              <span className="hidden font-display text-[12px] leading-none font-semibold sm:inline">
                {LAB_LABEL[lab]}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${themeOpen ? "rotate-180" : ""}`} strokeWidth={2.5} />
            </m.button>

            <AnimatePresence>
              {themeOpen && (
                <m.div
                  id="theme-picker-options"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-[calc(100%+0.8rem)] right-0 z-[70] w-[min(330px,calc(100vw-1.5rem))] rounded-[26px] p-3"
                  style={{
                    background: "var(--color-paper)",
                    boxShadow: "0 18px 55px -22px rgb(0 0 0 / 0.42), 0 3px 0 var(--edge)",
                    border: "1px solid color-mix(in oklab, var(--color-ink) 8%, transparent)",
                  }}
                >
                  <div className="flex items-center justify-between px-2 pb-3 pt-1">
                    <div>
                      <p className="font-display text-[calc(14px*var(--ui-scale))] font-semibold text-ink">Appearance</p>
                      <p className="mt-0.5 text-[calc(10.5px*var(--ui-scale))] text-ink-soft">Saved automatically on this device</p>
                    </div>
                    <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 font-mono text-[calc(9px*var(--ui-scale))] tracking-wider text-ink-soft">THEME</span>
                  </div>
                  <div role="group" aria-label="Appearance themes" className="grid grid-cols-2 gap-2">
                    {LAB_ORDER.map((option) => {
                      const selected = lab === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => chooseTheme(option)}
                          className={`group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-[19px] p-2.5 text-left transition-all hover:-translate-y-0.5 ${selected ? "ring-2 ring-mint ring-offset-2 ring-offset-[var(--color-paper)]" : "hover:bg-ink/[0.045]"}`}
                          style={{ background: selected ? "color-mix(in oklab, var(--color-mint) 9%, var(--color-paper))" : "color-mix(in oklab, var(--color-ink) 4%, var(--color-paper))" }}
                        >
                          <span
                            aria-hidden
                            className="mb-2.5 flex h-12 w-full items-end justify-between overflow-hidden rounded-[13px] p-2"
                            style={{
                              background: option === "light"
                                ? "linear-gradient(135deg,#FFFDF7 0%,#F8E8D2 55%,#FFB9A8 100%)"
                                : option === "dark"
                                  ? "linear-gradient(135deg,#17131D 0%,#30263D 58%,#795B79 100%)"
                                  : option === "dune"
                                    ? "linear-gradient(135deg,#332316 0%,#80572E 58%,#D6A65F 100%)"
                                    : option === "sage"
                                      ? "linear-gradient(135deg,#18231F 0%,#30483C 58%,#B5C8AD 100%)"
                                      : "linear-gradient(135deg,#2C2013 0%,#2C2013 49%,#FDF6E3 50%,#FDF6E3 100%)",
                            }}
                          >
                            <span className="h-2 w-9 rounded-full bg-white/75" />
                            <span className="h-5 w-5 rounded-full" style={{ background: THEME_CHIP[option].bg, boxShadow: "0 1px 4px rgb(0 0 0 / 0.18)" }} />
                          </span>
                          <span className="flex w-full items-center justify-between gap-1">
                            <span className="font-display text-[calc(12px*var(--ui-scale))] font-semibold text-ink">{LAB_LABEL[option]}</span>
                            {selected && <Check className="h-4 w-4 shrink-0 text-mint" strokeWidth={2.8} />}
                          </span>
                          <span className="mt-0.5 text-[calc(9.5px*var(--ui-scale))] leading-snug text-ink-soft">{LAB_DESCRIPTION[option]}</span>
                        </button>
                      );
                    })}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>

      {/* ————— lab toast — announces where you just landed ————— */}
      <AnimatePresence>
        {announce && (
          <m.div
            key={announce}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="fixed bottom-[calc(1.75rem+var(--sa-bottom))] left-1/2 z-[80]"
            style={{ x: "-50%" }}
            role="status"
          >
            <span className="flex items-center gap-2.5 rounded-full bg-paper px-5 py-2.5 font-display text-[13.5px] font-semibold whitespace-nowrap text-ink puff">
              <span
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{
                  background:
                    announce === "light"
                      ? "#FFD43B"
                      : announce === "dark"
                        ? "#493552"
                        : announce === "dune"
                          ? "#6B4A26"
                          : announce === "sage"
                            ? "#29483A"
                            : "linear-gradient(90deg, #2c2013 50%, #fdf6e3 50%)",
                  boxShadow: "inset 0 0 0 2px rgb(61 43 31 / 0.12)",
                }}
              />
              {LAB_LABEL[announce]}
            </span>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer({
  onOpenUnit,
  onOpenSticker,
  onOpenCustomize,
  onOpenPack,
  onOpenSpec,
  onOpenLegal,
  onSearch,
  bandFrom = "var(--color-cream)",
}: {
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenCustomize: () => void;
  onOpenPack: () => void;
  onOpenSpec: () => void;
  onOpenLegal: () => void;
  onSearch: () => void;
  /* the surface the cocoa wave rises from — home hands in its own
     band colour so the seam above stays continuous after dark */
  bandFrom?: string;
}) {
  const [booped, setBooped] = useState(false);
  const hours = Math.round(TOTALS.minutes / 60);

  const boop = () => {
    setBooped(true);
    setTimeout(() => setBooped(false), 2200);
  };

  return (
    <footer className="mt-auto">
      <div
        aria-hidden
        className="h-[calc(54px*var(--ui-scale))] sm:h-[calc(74px*var(--ui-scale))]"
        style={{ background: bandFrom }}
      >
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-full w-full"
        >
          <path
            d="M0,52 C160,92 340,8 540,30 C740,52 900,96 1100,68 C1260,46 1370,22 1440,40 L1440,90 L0,90 Z"
            fill="var(--color-cocoa)"
          />
        </svg>
      </div>

      <div className="bg-cocoa text-milk">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* ————— three columns: the club · the units · the toolkit —————
              two columns until tablet, where three would squeeze every
              caption into four lines */}
          <div className="grid gap-10 py-9 sm:py-11 md:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-8">
            {/* who we are */}
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <LogoMark size={38} lab="light" />
                <span className="font-display text-[calc(17px*var(--ui-scale))] font-semibold tracking-tight">
                  Reaction Club
                </span>
              </div>
              <p className="mt-3 text-[calc(14px*var(--ui-scale))] leading-relaxed text-milk/80">
                Notes for every topic in the course — read them, work the
                examples, tick what you&apos;ve revised. Reading time is
                counted topic by topic.
              </p>

              {/* the whole course, as three quiet numbers */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: Atom, value: String(UNITS.length), label: "units" },
                  { icon: ListChecks, value: String(TOTALS.topics), label: "topics" },
                  { icon: Clock, value: `≈${hours} h`, label: "of reading" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-3 pr-3.5"
                  >
                    <s.icon className="h-3.5 w-3.5 text-lemon" strokeWidth={2.2} />
                    <span className="font-display text-[calc(13px*var(--ui-scale))] font-bold leading-none">
                      {s.value}
                    </span>
                    <span className="text-[calc(11px*var(--ui-scale))] font-bold leading-none text-milk/60">
                      {s.label}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-end gap-1">
                <Mascot
                  main="#FFD43B"
                  size={88}
                  boop
                  onBoop={boop}
                  bubbles={false}
                />
                <AnimatePresence>
                  {booped && (
                    <m.div
                      initial={{ opacity: 0, y: 8, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="mb-4"
                    >
                      <SpeechBubble className="px-4 py-2.5">
                        <span className="font-display text-[calc(13px*var(--ui-scale))] font-semibold text-ink">
                          Start with a unit.
                        </span>
                      </SpeechBubble>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* the six units — real bench marks now, not plain dots */}
            <div>
              <div className="font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.2em] text-milk/60 uppercase">
                Units
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {UNITS.map((u) => {
                  return (
                    <button
                      key={u.code}
                      type="button"
                      onClick={() => onOpenUnit(u.code)}
                      className="footer-action-button group flex cursor-pointer items-center gap-3 rounded-2xl px-2.5 py-2 text-left"
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[calc(13.5px*var(--ui-scale))] font-bold transition-transform group-hover:scale-110"
                        style={{ background: u.candy.main, color: readableInk(u.candy.main) }}
                      >
                        {u.index}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[calc(13px*var(--ui-scale))] font-bold leading-tight text-milk/80 transition-colors group-hover:text-milk">
                          Unit {u.index} · {u.shortTitle}
                        </span>
                        <span className="mt-0.5 block text-[calc(10.5px*var(--ui-scale))] font-bold uppercase tracking-[0.12em] text-milk/40">
                          {u.code}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* the toolkit */}
            <div>
              <div className="font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.2em] text-milk/60 uppercase">
                Toolkit
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {(
                  [
                    {
                      icon: Sticker,
                      chip: "bg-mint/25 text-mint",
                      label: "Progress",
                      hint: "time & goals",
                      open: onOpenSticker,
                    },
                    {
                      icon: ClipboardList,
                      chip: "bg-lemon/25 text-lemon",
                      label: "Revision pack",
                      hint: "ticked spec points",
                      open: onOpenPack,
                    },
                    {
                      icon: BookMarked,
                      chip: "bg-lemon/25 text-lemon",
                      label: "Spec index",
                      hint: "statements A to Z",
                      open: onOpenSpec,
                    },
                    {
                      icon: Sparkles,
                      chip: "bg-lemon/25 text-lemon",
                      label: "Customize",
                      hint: "fonts & themes",
                      open: onOpenCustomize,
                    },
                    {
                      icon: Search,
                      chip: "bg-white/10 text-milk/80",
                      label: "Search",
                      hint: "⌘K",
                      open: onSearch,
                    },
                  ] as const
                ).map((row) => (
                  <button
                    key={row.label}
                    type="button"
                    onClick={row.open}
                    className="footer-action-button group flex cursor-pointer items-center gap-2.5 rounded-2xl px-2.5 py-2 text-left"
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform group-hover:scale-110 ${row.chip}`}
                    >
                      <row.icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[calc(13px*var(--ui-scale))] font-bold leading-tight text-milk/80 transition-colors group-hover:text-milk">
                        {row.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[calc(11px*var(--ui-scale))] font-semibold text-milk/45">
                        {row.hint}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ————— good to know ————— */}
          <div className="grid gap-2 rounded-[calc(22px*var(--ui-scale))] border border-white/[0.08] bg-white/[0.04] p-3 sm:grid-cols-3 sm:p-4">
            {(
              [
                {
                  icon: ShieldCheck,
                  chip: "text-mint",
                  text: "Private — progress never leaves this browser.",
                },
                {
                  icon: SunMoon,
                  chip: "text-lemon",
                  text: "Four themes — one tap in Customize.",
                },
                {
                  icon: Command,
                  chip: "text-milk/80",
                  text: "⌘K finds topics, notes & spec points.",
                },
              ] as const
            ).map((n) => (
              <div key={n.text} className="flex items-start gap-2.5 px-1.5 py-1.5">
                <n.icon className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${n.chip}`} strokeWidth={2} />
                <p className="text-[calc(12px*var(--ui-scale))] leading-snug font-semibold text-milk/65">
                  {n.text}
                </p>
              </div>
            ))}
          </div>

          {/* ————— colophon ————— */}
          <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-5 pb-[calc(1.25rem+var(--sa-bottom))] sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[calc(11.5px*var(--ui-scale))] leading-relaxed font-semibold text-milk/55">
              © 2026 Reaction Club · Notes for the Pearson Edexcel
              International A Level Chemistry (2018) specification,
              WCH11–WCH16 · not affiliated with or endorsed by Pearson
              Education Ltd.
              <span className="ml-1 whitespace-nowrap text-milk/35">
                · rev 4 · Nov 2026
              </span>
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={onOpenLegal}
                className="footer-action-button group inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[calc(12.5px*var(--ui-scale))] font-bold text-milk/85"
                aria-label="Open the disclaimer and legal information page"
              >
                <ShieldCheck
                  className="h-4 w-4 transition-transform group-hover:scale-110"
                  strokeWidth={2.2}
                />
                Disclaimer &amp; legal
              </button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-action-button group inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[calc(12.5px*var(--ui-scale))] font-bold text-milk/85"
              >
                <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.2} />
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ClubApp() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [searchOpen, setSearchOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  /* the two overlays live in their own chunks and mount on first
     open; after that they stay mounted so their exit animation
     keeps playing on every close */
  const [searchMounted, setSearchMounted] = useState(false);
  const [customizeMounted, setCustomizeMounted] = useState(false);
  /* the desk remembers its member: once a unit or topic has been
     opened, home renders the desk instead of the introduction —
     unless they asked for the introduction again (landing) */
  const desk = useDesk();
  const [landing, setLanding] = useState(false);
  const deskActive = desk.engaged && !landing;

  useEffect(() => {
    if (searchOpen) setSearchMounted(true);
  }, [searchOpen]);
  useEffect(() => {
    if (customizeOpen) setCustomizeMounted(true);
  }, [customizeOpen]);
  /* leaving home always lands you back on the desk next time */
  useEffect(() => {
    if (view.kind !== "home") setLanding(false);
  }, [view.kind]);

  /* ————— the eye vs the layout —————
     BROWSER page zoom (Chrome accessibility zoom, a remembered
     pinch, Samsung screen zoom) keeps the layout viewport wide while
     the eye sees far less — and media queries can't see it. Publish
     what the eye actually sees: --vvw carries the visible width,
     and data-vv-narrow / data-vv-tight stamp <html> when a
     desktop-class layout is squeezed into a phone-visible width,
     so the rules in globals.css can re-fit the pieces that opt in
     (the customize drawer, the lab toast). The navbar deliberately
     never opts in — browser zoom must not restyle it — and the
     separate content-scale system can't either (the .site-header
     --ui-scale pin). The pill stays put, whatever either is doing. */
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const vv = window.visualViewport;
      const visible = Math.min(
        vv?.width ?? window.innerWidth,
        window.innerWidth,
      );
      root.style.setProperty("--vvw", `${Math.round(visible)}px`);
      const squeezed = window.innerWidth >= 640 && visible < 640;
      root.toggleAttribute("data-vv-narrow", squeezed);
      root.toggleAttribute("data-vv-tight", squeezed && visible < 420);
    };
    apply();
    window.addEventListener("resize", apply);
    window.visualViewport?.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.visualViewport?.removeEventListener("resize", apply);
    };
  }, []);

  /* ————— warm the lazy rooms —————
     Once the first paint has settled, fetch every deferred chunk in
     the background, so the first tap into notes / packs / search
     feels instant instead of waiting on a download. */
  useEffect(() => {
    const warm = () => {
      void import("./notes-reader");
      void import("./spec-index");
      void import("./pack-view");
      void import("./sticker-book");
      void import("./topic-view");
      void import("./search");
      void import("./customize");
      void import("./legal");
    };
    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      }
    ).requestIdleCallback;
    if (ric) ric(warm, { timeout: 4000 });
    else {
      const t = setTimeout(warm, 2500);
      return () => clearTimeout(t);
    }
  }, []);
  const prefs = usePrefs();
  const viewKey =
    view.kind === "topic"
      ? `topic-${view.code}-${view.topicId}`
      : view.kind === "unit"
        ? `unit-${view.code}`
        : view.kind === "notes"
          ? `notes-${view.docId}`
          : view.kind === "spec"
            ? "spec"
            : view.kind === "pack"
              ? "pack"
              : view.kind === "sticker"
                ? "sticker"
                : view.kind === "legal"
                  ? "legal"
                  : "home";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [viewKey]);

  /* the panel's knobs own <html>; make sure hydration agrees with it */
  useEffect(() => {
    applyPrefs(prefs);
  }, [prefs]);

  /* opening a unit or topic is the membership moment: the desk flag
     flips and the visit is remembered as the place to resume from */
  const openUnit = (code: string) => {
    markUnit(code);
    setView({ kind: "unit", code });
  };
  /* topics open their full revision note straight away — no intermediate
     stop. The topic page itself stays only for the rare topic that has
     no note doc behind it. */
  const openTopic = useCallback((code: UnitCode, topicId: string) => {
    markTopic(code, topicId);
    const meta = getNotesMetaForTopic(code, topicId);
    if (meta) setView({ kind: "notes", code, docId: meta.id });
    else setView({ kind: "topic", code, topicId });
  }, []);
  const goHome = () => {
    setLanding(false);
    setView({ kind: "home" });
  };
  const openSticker = useCallback(() => setView({ kind: "sticker" }), []);
  const openPack = useCallback(() => setView({ kind: "pack" }), []);
  const openSpec = useCallback(() => setView({ kind: "spec" }), []);
  const openLegal = useCallback(() => setView({ kind: "legal" }), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const openCustomize = useCallback(() => setCustomizeOpen(true), []);
  const closeCustomize = useCallback(() => setCustomizeOpen(false), []);
  /* deep links from the spec index / pack — land on the section itself */
  const openNotes = useCallback((docId: string, spec?: string) => {
    const meta = getNotesMeta(docId);
    if (!meta) return;
    setView({ kind: "notes", code: meta.unitCode, docId, spec });
  }, []);

  /* ⌘K / Ctrl+K (and "/") summon the search bubble */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === "/" && !typing && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  /* ————— the quiet stopwatch —————
     topic pages and revision notes bank their seconds on the topic;
     everywhere else banks on the whole site. One call site, so the
     two can never double-count. */
  const notesMeta = view.kind === "notes" ? getNotesMeta(view.docId) : undefined;
  useTimeScope(
    view.kind === "topic" || view.kind === "notes" ? view.code : undefined,
    view.kind === "topic" ? view.topicId : notesMeta?.topicId,
  );

  const unit =
    view.kind === "unit" || view.kind === "topic" || view.kind === "notes"
      ? getUnit(view.code)
      : undefined;
  const topic =
    view.kind === "topic" && unit
      ? getTopic(view.code, view.topicId)
      : undefined;
  const topicMeta =
    unit && topic ? getNotesMetaForTopic(unit.code, topic.id) : undefined;

  return (
    <LazyMotion features={domAnimation} strict>
      <SpecMapProvider>
        <div className="flex min-h-dvh flex-col">
          <TopBar
            view={view}
            onHome={goHome}
            onOpenSticker={openSticker}
            onOpenPack={openPack}
            onSearch={openSearch}
            onOpenCustomize={openCustomize}
          />
          {(searchOpen || searchMounted) && (
            <SearchPalette
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
              onOpenTopic={openTopic}
            />
          )}
          {(customizeOpen || customizeMounted) && (
            <CustomizePanel open={customizeOpen} onClose={closeCustomize} onHome={goHome} onOpenSpec={openSpec} onOpenPack={openPack} onOpenProgress={openSticker} onOpenLegal={openLegal} />
          )}
  
          <main className="relative flex-1">
            <AnimatePresence mode="wait">
              <m.div
                key={viewKey}
                initial={{ opacity: 0, y: 22, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.995 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                {view.kind === "home" &&
                  (deskActive ? (
                    <Desk
                      units={UNITS}
                      desk={desk}
                      onOpenUnit={openUnit}
                      onOpenTopic={openTopic}
                      onOpenSticker={openSticker}
                      onOpenPack={openPack}
                      onOpenSpec={openSpec}
                      onSearch={openSearch}
                      onShowLanding={() => setLanding(true)}
                    />
                  ) : (
                    <Home
                      units={UNITS}
                      onOpenUnit={openUnit}
                      onOpenSticker={openSticker}
                      onOpenTopic={openTopic}
                      onOpenPack={openPack}
                      onOpenSpec={openSpec}
                      onBackToDesk={desk.engaged ? () => setLanding(false) : undefined}
                    />
                  ))}
  
                {view.kind === "unit" && unit && (
                  <UnitView
                    unit={unit}
                    onOpenTopic={(id) => openTopic(unit.code, id)}
                    onBack={goHome}
                    onOpenUnit={openUnit}
                  />
                )}
  
                {view.kind === "topic" && unit && topic && (
                  <TopicView
                    unit={unit}
                    topic={topic}
                    onBack={() => openUnit(unit.code)}
                    onOpenTopic={(id) => openTopic(unit.code, id)}
                    notesSpecRange={topicMeta?.specRange}
                    onOpenNotes={
                      topicMeta
                        ? () =>
                            setView({
                              kind: "notes",
                              code: unit.code,
                              docId: topicMeta.id,
                            })
                        : undefined
                    }
                  />
                )}
  
                {view.kind === "notes" && unit && notesMeta && (
                  <NotesReader
                    key={view.docId}
                    docId={view.docId}
                    unit={unit}
                    onBack={() => openUnit(unit.code)}
                    jumpToSpec={view.spec}
                  />
                )}
  
                {view.kind === "spec" && (
                  <SpecIndex
                    onHome={goHome}
                    onOpenPack={openPack}
                    onOpenNotes={openNotes}
                  />
                )}
  
                {view.kind === "pack" && (
                  <PackView
                    onHome={goHome}
                    onOpenSpec={openSpec}
                    onOpenNotes={openNotes}
                  />
                )}
  
                {view.kind === "sticker" && (
                  <StickerBook
                    units={UNITS}
                    onBack={goHome}
                    onOpenUnit={openUnit}
                    onOpenTopic={openTopic}
                  />
                )}
  
                {view.kind === "legal" && <Legal onBack={goHome} />}
              </m.div>
            </AnimatePresence>
  
            <Footer
              onOpenUnit={openUnit}
              onOpenSticker={openSticker}
              onOpenCustomize={openCustomize}
              onOpenPack={openPack}
              onOpenSpec={() => setView({ kind: "spec" })}
              onOpenLegal={openLegal}
              onSearch={openSearch}
              bandFrom={
                /* the desk ends on cream, the introduction on its own
                   last band — each hands the footer its own sky */
                view.kind === "home" && !deskActive
                  ? "var(--home-band-b, var(--color-cream))"
                  : "var(--color-cream)"
              }
            />
          </main>
        </div>
      </SpecMapProvider>
    </LazyMotion>
  );
}
