"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, MotionConfig, domAnimation, AnimatePresence, m } from "framer-motion";
import {
  Home as HomeIcon,
  Search,
  Sticker,
  Palette,
  Sparkles,
  Settings,
  ClipboardList,
  ArrowUp,
  ArrowRight,
  Command,
  ShieldCheck,
  BookMarked,
  Check,
  ChevronDown,
  Maximize,
  Minimize,
} from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { UNITS, getUnit, getTopic, TOTALS } from "@/lib/spectra/units";
import { getNotesMeta, getNotesMetaForTopic } from "@/lib/spectra/notes-meta";
import { useTimeScope } from "@/lib/spectra/time";
import { usePacks } from "@/lib/spectra/packs";
import { useDesk, markUnit, markTopic } from "@/lib/spectra/desk";
import {
  applyPrefs,
  LAB_DESCRIPTION,
  LAB_LABEL,
  LAB_ORDER,
  setPrefs,
  THEME_CHIP,
  usePrefs,
  type Iface,
  type Lab,
} from "@/lib/spectra/prefs";
import { Home } from "./home";
import { Desk } from "./desk";
import { UnitView } from "./unit-view";
import { Mascot } from "./bits";
import { SpecMapProvider, SpecMapTrigger } from "./spec-map";

const BUILD_VERSION = (process.env.NEXT_PUBLIC_BUILD_VERSION ?? "local").slice(0, 7);

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
/* the notes reader's editorial twin — same props, the document dress */
const NotesEditorial = dynamic(
  () => import("./notes-editorial").then((m) => m.NotesEditorial),
  { ssr: false, loading: RoomLoading },
);
const StickerBook = dynamic(() => import("./sticker-book").then((m) => m.StickerBook), {
  ssr: false,
  loading: RoomLoading,
});
/* the progress room's editorial twin — same props, the document dress */
const ProgressEditorial = dynamic(
  () => import("./progress-editorial").then((m) => m.ProgressEditorial),
  { ssr: false, loading: RoomLoading },
);
const SpecIndex = dynamic(() => import("./spec-index").then((m) => m.SpecIndex), {
  ssr: false,
  loading: RoomLoading,
});
/* the spec index's editorial twin — same props, the document dress */
const SpecEditorial = dynamic(
  () => import("./spec-editorial").then((m) => m.SpecEditorial),
  { ssr: false, loading: RoomLoading },
);
/* the topic reader's editorial twin — same props, the document dress */
const TopicEditorial = dynamic(
  () => import("./topic-editorial").then((m) => m.TopicEditorial),
  { ssr: false, loading: RoomLoading },
);
/* the unit walk's editorial twin — same props, the document dress;
   the classic unit view rides in the first-paint bundle, its twin
   travels lazily like every other room */
const UnitEditorial = dynamic(
  () => import("./unit-editorial").then((m) => m.UnitEditorial),
  { ssr: false, loading: RoomLoading },
);
const PackView = dynamic(() => import("./pack-view").then((m) => m.PackView), {
  ssr: false,
  loading: RoomLoading,
});
/* the pack's editorial twin — same props, the document dress */
const PackEditorial = dynamic(
  () => import("./pack-editorial").then((m) => m.PackEditorial),
  { ssr: false, loading: RoomLoading },
);
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
   IAL CHEM · app shell — pill nav, views, footer
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
    room === "dune" ? "#FFE9C7" :
    room === "dark" ? "#F2EAF5" : "#493326";
  const liquid =
    room === "classic" ? "#C58A36" :
    room === "dune" ? "#D9A65F" :
    room === "dark" ? "#C79ACD" : "#E97862";
  const glass =
    room === "dark" || room === "dune" ? "none" :
    room === "classic" ? "#F7EEDB" : "#FFF9EF";

  return (
    <m.span
      aria-hidden
      whileHover={{ scale: 1.06, rotate: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 380, damping: 16 }}
      className="inline-grid h-[42px] w-[42px] shrink-0 place-items-center sm:h-9 sm:w-9 md:h-[38px] md:w-[38px] lg:h-10 lg:w-10 2xl:h-[42px] 2xl:w-[42px]"
      style={size !== 38 ? { width: size, height: size } : undefined}
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

/* ————— the lazy rooms and how they warm —————
   Every deferred view is a literal import — a bundler can't split a
   dynamic path, so the map is literal on purpose. Queued by
   likelihood: the CURRENT dress's doors first, then the shared odds
   and ends. The inactive dress's pages are not warmed at all — a
   visit that never leaves one dress never downloads the other's
   pages; flipping the dress re-runs the queue with the new dress
   first, so its rooms are warm before anyone knocks. */
const WARM_CHUNKS = {
  notesRooms: () => import("./notes-reader"),
  topicRooms: () => import("./topic-view"),
  specRooms: () => import("./spec-index"),
  packRooms: () => import("./pack-view"),
  stickerRooms: () => import("./sticker-book"),
  notesEditorial: () => import("./notes-editorial"),
  topicEditorial: () => import("./topic-editorial"),
  unitEditorial: () => import("./unit-editorial"),
  specEditorial: () => import("./spec-editorial"),
  packEditorial: () => import("./pack-editorial"),
  progressEditorial: () => import("./progress-editorial"),
  search: () => import("./search"),
  customize: () => import("./customize"),
  legal: () => import("./legal"),
};

const WARM_BY_IFACE: Record<Iface, (keyof typeof WARM_CHUNKS)[]> = {
  rooms: ["notesRooms", "topicRooms", "specRooms", "packRooms", "stickerRooms"],
  editorial: [
    "notesEditorial",
    "topicEditorial",
    "unitEditorial",
    "specEditorial",
    "packEditorial",
    "progressEditorial",
  ],
};
const WARM_SHARED: (keyof typeof WARM_CHUNKS)[] = ["search", "customize", "legal"];

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
  fullscreen,
  onToggleFullscreen,
}: {
  view: View;
  onHome: () => void;
  onOpenSticker: () => void;
  onOpenPack: () => void;
  onSearch: () => void;
  onOpenCustomize: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
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
    `grid h-[46px] w-[46px] shrink-0 cursor-pointer place-items-center rounded-full transition-colors md:h-10 md:w-10 lg:h-[42px] lg:w-[42px] 2xl:h-11 2xl:w-11 ${
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
          className="flex max-w-[97vw] items-center gap-1 rounded-full bg-paper/90 py-1.5 pr-2 pl-2 backdrop-blur-lg sm:gap-1.5 sm:py-2 sm:pr-2.5 sm:pl-2.5 lg:gap-2 2xl:gap-2.5"
          style={{
            boxShadow:
              "0 3px 0 var(--edge), 0 16px 38px -18px rgb(0 0 0 / 0.4)",
          }}
        >
          <button
            type="button"
            onClick={onHome}
            className="flex shrink-0 cursor-pointer items-center gap-2 pr-1 sm:gap-2.5 sm:pr-1.5"
            aria-label="IAL CHEM — home"
          >
            <LogoMark />
            <span className="hidden font-display text-[16px] font-semibold tracking-tight text-ink md:block">
              IAL CHEM
            </span>
          </button>

          <span
            aria-hidden
            className="mx-0.5 hidden h-5 w-[2px] shrink-0 rounded-full bg-ink/10 sm:mx-1 sm:block sm:h-6 sm:w-[3px]"
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
            <HomeIcon className="h-[19px] w-[19px] md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={onOpenPack}
            aria-current={view.kind === "pack" ? "page" : undefined}
            whileTap={{ scale: 0.88 }}
            animate={{ scale: view.kind === "pack" ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className={`relative hidden md:grid ${tool(view.kind === "pack")}`}
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
            <ClipboardList className="h-4 w-4 md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={2.2} />
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
            <Search className="h-4 w-4 md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={onOpenSticker}
            aria-current={view.kind === "sticker" ? "page" : undefined}
            whileTap={{ scale: 0.88 }}
            animate={{ scale: view.kind === "sticker" ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className={`hidden md:grid ${tool(view.kind === "sticker")}`}
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
            <Sticker className="h-4 w-4 md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={onToggleFullscreen}
            whileTap={{ scale: 0.88 }}
            className={`hidden md:grid ${tool(false)}`}
            title={fullscreen ? "Exit full screen" : "Enter full screen"}
            aria-label={fullscreen ? "Exit full screen mode" : "Enter full screen mode"}
            aria-pressed={fullscreen}
          >
            {fullscreen ? <Minimize className="h-4 w-4 md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={2.1} /> : <Maximize className="h-4 w-4 md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={2.1} />}
          </m.button>

          {fullscreen && (
            <m.button
              type="button"
              onClick={onToggleFullscreen}
              whileTap={{ scale: 0.88 }}
              className={`grid md:hidden ${tool(false)}`}
              title="Exit full screen"
              aria-label="Exit full screen mode"
            >
              <Minimize className="h-4 w-4" strokeWidth={2.1} />
            </m.button>
          )}

          <m.button
            type="button"
            onClick={onOpenCustomize}
            whileTap={{ scale: 0.88 }}
            className={tool(false)}
            title="Customize · fonts, sizes & themes"
            aria-label="Customize the site"
          >
            <Settings className="h-4 w-4 md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]" strokeWidth={1.9} />
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
              className="group flex h-[46px] shrink-0 cursor-pointer items-center gap-2 rounded-full px-3 transition-all hover:-translate-y-px md:h-10 md:gap-2 md:px-2.5 lg:h-[42px] lg:gap-2.5 lg:px-3 2xl:h-11"
              style={{
                background: THEME_CHIP[lab].bg,
                color: lab === "dark" ? "#F7ECFB" : lab === "dune" ? "#FFE9C7" : "#3D2B1F",
                boxShadow: `0 2.5px 0 ${THEME_CHIP[lab].side}, inset 0 1px 0 rgb(255 255 255 / 0.24)`,
              }}
            >
              <span
                className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full md:h-[22px] md:w-[22px] lg:h-6 lg:w-6"
                style={{
                  background: THEME_CHIP[lab].bg,
                  color: THEME_CHIP[lab].ink,
                  boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.24)",
                }}
              >
                <LabGlyph id={lab} />
              </span>
              <span className="hidden font-display text-[11px] leading-none font-semibold sm:inline lg:text-[12px]">
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
                          className={`sticker group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-[19px] p-2.5 text-left transition-all hover:-translate-y-0.5 ${selected ? "ring-2 ring-mint ring-offset-2 ring-offset-[var(--color-paper)]" : "hover:bg-ink/[0.045]"}`}
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
  bandFrom?: string;
}) {
  const hours = Math.round(TOTALS.minutes / 60);

  const tools = [
    {
      icon: Sticker,
      label: "Progress",
      detail: "Reading time and goals",
      open: onOpenSticker,
    },
    {
      icon: ClipboardList,
      label: "Revision pack",
      detail: "Your checked specification points",
      open: onOpenPack,
    },
    {
      icon: BookMarked,
      label: "Specification",
      detail: "Browse the course statements",
      open: onOpenSpec,
    },
    {
      icon: Sparkles,
      label: "Appearance",
      detail: "Themes, colours and type",
      open: onOpenCustomize,
    },
    {
      icon: Search,
      label: "Search",
      detail: "Find a topic or note · ⌘K",
      open: onSearch,
    },
  ] as const;

  return (
    <footer className="club-footer relative mt-auto">
      <div
        aria-hidden
        className="club-footer-wave relative h-[calc(54px*var(--ui-scale))] sm:h-[calc(74px*var(--ui-scale))]"
        style={{ background: bandFrom }}
      >
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-full w-full">
          <path
            d="M0 48 C190 80 350 12 555 31 C760 50 900 88 1105 65 C1265 47 1375 27 1440 39 L1440 90 L0 90 Z"
            className="club-footer-wave-path"
          />
        </svg>
      </div>
      {/* Bubbles, sitting on the crest of the footer wave — he watches
          you pack up for the day. Anchored to the footer root (the
          wave and body are isolated stacking contexts that would
          otherwise paint over him); the waterline rides the wave
          path's height at the right edge. Desktop only. */}
      <span
        aria-hidden
        className="absolute right-[6%] top-[calc(30px*var(--ui-scale))] z-10 hidden -translate-y-1/2 lg:block"
      >
        <span className="bobble block">
          <Mascot main="#FF6B6B" size={92} bubbles={false} />
        </span>
      </span>

      <div className="club-footer-body bg-cocoa text-milk">
        <div className="club-footer-container mx-auto max-w-6xl px-5 sm:px-8">
          <div className="footer-intro flex flex-col gap-6 border-b border-white/[0.11] py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <LogoMark size={44} lab="light" />
              <div className="min-w-0">
                <div className="font-display text-[calc(21px*var(--ui-scale))] font-bold leading-none tracking-tight">
                  IAL CHEM
                </div>
                <p className="mt-2 text-[calc(11px*var(--ui-scale))] font-bold uppercase tracking-[0.16em] text-milk/45">
                  Pearson Edexcel · International A Level Chemistry
                </p>
              </div>
            </div>

            <div className="footer-stat-grid grid grid-cols-3 divide-x divide-white/[0.12] rounded-2xl border border-white/[0.1] bg-white/[0.035] px-1 py-3 sm:min-w-[390px] sm:px-3">
              {[
                { value: String(UNITS.length), label: "Units" },
                { value: String(TOTALS.topics), label: "Topics" },
                { value: "≈" + hours + " h", label: "Reading time" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center px-2">
                  <span className="font-display text-[calc(20px*var(--ui-scale))] font-bold leading-none tabular-nums">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 text-[calc(10px*var(--ui-scale))] font-bold uppercase tracking-[0.12em] text-milk/45">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-10 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)] lg:gap-14">
            <section aria-labelledby="footer-course-heading">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="footer-eyebrow">The course</p>
                  <h2 id="footer-course-heading" className="mt-1 font-display text-[calc(19px*var(--ui-scale))] font-semibold tracking-tight">
                    Explore by unit
                  </h2>
                </div>
                <span className="pb-1 font-mono text-[calc(10px*var(--ui-scale))] tracking-[0.12em] text-milk/35">
                  WCH11 — WCH16
                </span>
              </div>

              <div className="footer-unit-grid grid gap-2 sm:grid-cols-2">
                {UNITS.map((u) => (
                  <button
                    key={u.code}
                    type="button"
                    onClick={() => onOpenUnit(u.code)}
                    className="footer-unit-link group flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-left"
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-[calc(14px*var(--ui-scale))] font-bold"
                      style={{
                        background: "color-mix(in oklab, " + u.candy.main + " 20%, transparent)",
                        color: u.candy.main,
                        border: "1px solid color-mix(in oklab, " + u.candy.main + " 28%, transparent)",
                      }}
                    >
                      {String(u.index).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[calc(12.5px*var(--ui-scale))] font-bold text-milk/85 transition-colors group-hover:text-milk">
                        {u.shortTitle}
                      </span>
                      <span className="mt-1 block text-[calc(9.5px*var(--ui-scale))] font-bold uppercase tracking-[0.14em] text-milk/35">
                        {u.code}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-milk/25 transition-transform group-hover:translate-x-0.5 group-hover:text-milk/70" />
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="footer-tools-heading">
              <p className="footer-eyebrow">Your workspace</p>
              <h2 id="footer-tools-heading" className="mt-1 font-display text-[calc(19px*var(--ui-scale))] font-semibold tracking-tight">
                Study tools
              </h2>
              <div className="mt-4 flex flex-col">
                {tools.map((tool) => (
                  <button
                    key={tool.label}
                    type="button"
                    onClick={tool.open}
                    className="footer-tool-link group flex items-center gap-3 py-3 text-left"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.1] bg-white/[0.045] text-milk/65 transition-colors group-hover:border-white/[0.2] group-hover:bg-white/[0.09] group-hover:text-milk">
                      <tool.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[calc(12.5px*var(--ui-scale))] font-bold text-milk/85 transition-colors group-hover:text-milk">
                        {tool.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[calc(10.5px*var(--ui-scale))] font-semibold text-milk/40">
                        {tool.detail}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-milk/20 transition-transform group-hover:translate-x-0.5 group-hover:text-milk/60" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="footer-note flex flex-col gap-3 border-y border-white/[0.1] py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-[calc(11px*var(--ui-scale))] font-semibold text-milk/55">
              <ShieldCheck className="h-4 w-4 shrink-0 text-mint/80" strokeWidth={2} />
              Your revision progress is stored locally in this browser.
            </div>
            <button
              type="button"
              onClick={onSearch}
              className="inline-flex w-fit items-center gap-2 text-[calc(11px*var(--ui-scale))] font-bold text-milk/55 transition-colors hover:text-milk"
            >
              <Command className="h-3.5 w-3.5" />
              Search shortcut
              <kbd className="rounded-md border border-white/[0.14] bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-milk/75">
                ⌘ K
              </kbd>
            </button>
          </div>

          <div className="flex flex-col gap-4 py-5 pb-[calc(1.25rem+var(--sa-bottom))] sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[calc(10.5px*var(--ui-scale))] leading-relaxed font-semibold text-milk/40">
              © 2026 IAL CHEM · Notes for the Pearson Edexcel International A Level Chemistry (2018) specification, WCH11–WCH16. Not affiliated with or endorsed by Pearson Education Ltd.
              <span className="ml-1 whitespace-nowrap text-milk/30">· rev 4 · Nov 2026 · {BUILD_VERSION}</span>
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={onOpenLegal}
                className="footer-utility-link"
                aria-label="Open the disclaimer and legal information page"
              >
                Disclaimer &amp; legal
              </button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-utility-link inline-flex items-center gap-1.5"
              >
                Back to top
                <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.2} />
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
  const [fullscreen, setFullscreen] = useState(false);
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
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    syncFullscreen();
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Fullscreen can be denied by browser or device policy; keep the app usable.
    }
  }, []);

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

  const prefs = usePrefs();

  /* ————— warm the lazy rooms —————
     Once the first paint has settled, fetch the deferred chunks in
     the background so the first tap into notes / packs / search
     feels instant instead of waiting on a download. The queue
     TRICKLES — one import per idle slice — so the warm never
     competes with a real interaction the way a fourteen-chunk burst
     would, and the inactive dress's pages wait for the dress switch
     itself to call for them. */
  const warmedRef = useRef<Set<keyof typeof WARM_CHUNKS>>(new Set());
  useEffect(() => {
    const queue = [...WARM_BY_IFACE[prefs.iface], ...WARM_SHARED].filter(
      (k) => !warmedRef.current.has(k),
    );
    if (!queue.length) return;
    let cancelled = false;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      }
    ).requestIdleCallback;
    const drain = () => {
      if (cancelled) return;
      const key = queue.shift();
      if (!key) return;
      warmedRef.current.add(key);
      void WARM_CHUNKS[key]();
      const schedule = () => {
        if (cancelled) return;
        if (ric) ric(drain, { timeout: 1500 });
        else fallback = setTimeout(drain, 50);
      };
      schedule();
    };
    if (ric) ric(drain, { timeout: 4000 });
    else fallback = setTimeout(drain, 2500);
    return () => {
      cancelled = true;
      if (fallback) clearTimeout(fallback);
    };
  }, [prefs.iface]);
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

  /* ————— the bookmark between the two interfaces —————
     While a notes or pack surface is open, keep a light side-audit
     of which spec statement is on screen (throttled to ~200ms; the
     rooms' own spies remain the source of truth for the nav's map).
     When the interface flips, the twin mounts inside the same keyed
     room — the scroll offset survives — but each dress sets its own
     type, so the same offset can land a line or two off, and the
     two dresses' heights differ besides. The captured statement is
     the honest bookmark: once the swapped room's anchors exist, the
     view lands on it again, instantly. Near the top of a page there
     is nothing worth keeping — the swap just settles. */
  const ifaceRef = useRef(prefs.iface);
  const anchorRef = useRef<{ spec: string; y: number } | null>(null);
  const specSurface = view.kind === "notes" || view.kind === "pack";
  useEffect(() => {
    if (!specSurface) {
      anchorRef.current = null;
      return;
    }
    let raf = 0;
    let trail = 0;
    let last = 0;
    const pick = () => {
      raf = 0;
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      document.querySelectorAll<HTMLElement>('[id^="spec-"]').forEach((el) => {
        if (el.getBoundingClientRect().top + window.scrollY <= probe)
          current = el.id.replace(/^spec-/, "").replace("-", ".");
      });
      anchorRef.current = current
        ? { spec: current, y: window.scrollY }
        : null;
    };
    const onScroll = () => {
      const now = performance.now();
      if (now - last >= 200 && !raf) {
        last = now;
        raf = requestAnimationFrame(pick);
      }
      window.clearTimeout(trail);
      trail = window.setTimeout(pick, 230);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(trail);
      anchorRef.current = null;
    };
  }, [specSurface]);

  /* the re-land: on an interface flip over a spec surface, wait for
     the swapped room's own anchor (its chunk may still be arriving),
     then place the bookmarked statement back under the reading line
     — one instant move, no glide, as if the page never moved. The
     landing reuses the verified hop's two-phase recipe (rooms off-
     screen are content-visibility estimates until they render): park
     shy of the target, let the real layout materialise, then snap to
     measured ground — and one verification beat snaps any drift. */
  useEffect(() => {
    if (ifaceRef.current === prefs.iface) return;
    ifaceRef.current = prefs.iface;
    const captured = anchorRef.current;
    /* the guard reads the CAPTURED y, not the live one: the swap's
       loading frame can collapse the page and clamp scrollY before
       this effect runs — the captured value is where you actually
       were when you flipped */
    if (!captured || captured.y < 240) return;
    if (view.kind !== "notes" && view.kind !== "pack") return;
    /* a deep link still pending in the view (jumpToSpec) belongs to
       the navigation that created it — a twin swap must not replay
       it over the re-land. Clearing the prop re-renders the fresh
       reader before its own 420ms hop timer fires, whose cleanup
       then cancels the hop. */
    if (view.kind === "notes" && view.spec) {
      setView({ ...view, spec: undefined });
    }
    const id = `spec-${captured.spec.replace(".", "-")}`;
    let trail = 0;
    let tries = 0;
    const topOf = (el: HTMLElement) => {
      const saTop =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--sa-top"),
        ) || 0;
      return Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - 100 - saTop,
      );
    };
    const land = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      const estimate = topOf(el);
      if (estimate > window.innerHeight * 2) {
        /* the render pass: materialise the real layout around the
           target, then snap to what is actually measured */
        window.scrollTo({
          top: estimate - window.innerHeight * 1.5,
          behavior: "instant" as ScrollBehavior,
        });
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const top = topOf(el);
            window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
            window.setTimeout(() => {
              if (Math.abs(window.scrollY - topOf(el)) >= 2)
                window.scrollTo({ top: topOf(el), behavior: "instant" as ScrollBehavior });
            }, 450);
          }),
        );
      } else {
        window.scrollTo({ top: estimate, behavior: "instant" as ScrollBehavior });
        window.setTimeout(() => {
          if (Math.abs(window.scrollY - topOf(el)) >= 2)
            window.scrollTo({ top: topOf(el), behavior: "instant" as ScrollBehavior });
        }, 450);
      }
      return true;
    };
    const poll = () => {
      if (land()) return;
      if (++tries < 45) trail = window.setTimeout(poll, 70);
    };
    trail = window.setTimeout(poll, 100);
    return () => window.clearTimeout(trail);
  }, [prefs.iface, view.kind]);

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
      {/* motion prefs, honoured end to end: "user" defers to the OS
          reduce-motion setting, and the customize panel's own motion
          switch (data-motion) now also silences the JS-driven springs
          — until now it only froze the CSS keyframes. Opacity still
          eases either way, so nothing pops in blind. */}
      <MotionConfig reducedMotion={prefs.motion ? "user" : "always"}>
      <SpecMapProvider>
        <div className="flex min-h-dvh flex-col">
          <TopBar
            view={view}
            onHome={goHome}
            onOpenSticker={openSticker}
            onOpenPack={openPack}
            onSearch={openSearch}
            onOpenCustomize={openCustomize}
            fullscreen={fullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
          {(searchOpen || searchMounted) && (
            <SearchPalette
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
              onOpenTopic={openTopic}
            />
          )}
          {(customizeOpen || customizeMounted) && (
            <CustomizePanel open={customizeOpen} onClose={closeCustomize} onHome={goHome} onOpenSpec={openSpec} onOpenPack={openPack} onOpenProgress={openSticker} onOpenLegal={openLegal} fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} />
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
  
                {view.kind === "unit" && unit && (() => {
                  const UnitWalk =
                    prefs.iface === "editorial" ? UnitEditorial : UnitView;
                  return (
                    <UnitWalk
                      key={unit.code}
                      unit={unit}
                      onOpenTopic={(id) => openTopic(unit.code, id)}
                      onBack={goHome}
                      onOpenUnit={openUnit}
                    />
                  );
                })()}
  
                {view.kind === "topic" && unit && topic && (() => {
                  const TopicReader =
                    prefs.iface === "editorial" ? TopicEditorial : TopicView;
                  return (
                    <TopicReader
                      key={`${unit.code}/${topic.id}`}
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
                  );
                })()}
  
                {view.kind === "notes" && unit && notesMeta && (() => {
                  /* the interface swap — the editorial twin wears the
                     same props contract, so the shell changes nothing
                     but the component picked */
                  const Reader =
                    prefs.iface === "editorial" ? NotesEditorial : NotesReader;
                  return (
                    <Reader
                      key={view.docId}
                      docId={view.docId}
                      unit={unit}
                      onBack={() => openUnit(unit.code)}
                      jumpToSpec={view.spec}
                    />
                  );
                })()}
  
                {view.kind === "spec" && (() => {
                  const SpecIdx =
                    prefs.iface === "editorial" ? SpecEditorial : SpecIndex;
                  return (
                    <SpecIdx
                      onHome={goHome}
                      onOpenPack={openPack}
                      onOpenNotes={openNotes}
                    />
                  );
                })()}
  
                {view.kind === "pack" && (() => {
                  const Pack =
                    prefs.iface === "editorial" ? PackEditorial : PackView;
                  return (
                    <Pack
                      onHome={goHome}
                      onOpenSpec={openSpec}
                      onOpenNotes={openNotes}
                    />
                  );
                })()}
  
                {view.kind === "sticker" && (() => {
                  const Progress =
                    prefs.iface === "editorial" ? ProgressEditorial : StickerBook;
                  return (
                    <Progress
                      units={UNITS}
                      onBack={goHome}
                      onOpenUnit={openUnit}
                      onOpenTopic={openTopic}
                    />
                  );
                })()}
  
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
      </MotionConfig>
    </LazyMotion>
  );
}
