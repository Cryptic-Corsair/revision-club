"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion";
import {
  Home as HomeIcon,
  Moon,
  Search,
  Sliders,
  Sticker,
  Sun,
  SunMoon,
  ClipboardList,
} from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { UNITS, getUnit, getTopic } from "@/lib/spectra/units";
import { getNotesMeta, getNotesMetaForTopic } from "@/lib/spectra/notes-meta";
import { useTimeScope } from "@/lib/spectra/time";
import { usePacks } from "@/lib/spectra/packs";
import { applyPrefs, setPrefs, usePrefs, type Lab } from "@/lib/spectra/prefs";
import { Home } from "./home";
import { UnitView } from "./unit-view";
import { Mascot, SpeechBubble } from "./bits";
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
  | { kind: "sticker" };

/* ————— the brand mark —————
   The site's own object, drawn at logo size: the beaker itself —
   paper-white glass, chunky cocoa outline, coral liquid caught
   mid-fizz, measurement ticks — the mascot's visual language
   condensed to a mark. No tile and no pedestal (those made it read
   as a button rather than a brand), so it stands bare on the nav
   pill and on the cocoa footer alike, in both labs. A bubble
   escapes the rim because something is always reacting here. */
function LogoMark({ size = 38 }: { size?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `logo-clip-${id}`;
  const body =
    "M11 11.5 L33 11.5 L33 34.5 Q33 42.5 25 42.5 L19 42.5 Q11 42.5 11 34.5 Z";

  return (
    <m.span
      aria-hidden
      whileHover={{ scale: 1.07, rotate: -3 }}
      whileTap={{ scale: 0.9, rotate: 2 }}
      transition={{ type: "spring", stiffness: 380, damping: 14 }}
      className="inline-block shrink-0"
      style={{ width: size, height: (size * 48) / 44 }}
    >
      <svg viewBox="0 0 44 48" width="100%" height="100%">
        {/* the fizz that got away — outlined gas above the rim, one
            coral spark chasing it */}
        <circle
          cx="35.5"
          cy="4.8"
          r="2.5"
          fill="none"
          stroke="#3D2B1F"
          strokeWidth="2"
        />
        <circle cx="30.5" cy="3.4" r="1.2" fill="#FF6B6B" opacity="0.55" />

        {/* glass body */}
        <path d={body} fill="#FFFDF7" />

        {/* liquid, mid-fizz — clipped to the glass */}
        <clipPath id={clip} suppressHydrationWarning>
          <path d={body} />
        </clipPath>
        <g clipPath={`url(#${clip})`} suppressHydrationWarning>
          <path
            d="M8 26.5 C 13 23.5, 19 29.5, 24 26.5 C 29 23.5, 34 27, 37 25.5 L37 45 L8 45 Z"
            fill="#FF6B6B"
          />
          <ellipse cx="16.5" cy="33" rx="3.2" ry="1.8" fill="#FFFFFF" opacity="0.3" />
          <circle cx="23" cy="35.5" r="1.5" fill="#FFFFFF" opacity="0.85" />
          <circle cx="28" cy="38.5" r="1.1" fill="#FFFFFF" opacity="0.7" />
        </g>

        {/* outline + rim, one chunky hand */}
        <path
          d={body}
          fill="none"
          stroke="#3D2B1F"
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 11.5 H36.5"
          stroke="#3D2B1F"
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* measurement ticks — the mascot's signature, kept faint */}
        <path
          d="M28.5 31.5 h5.5 M28.5 36.5 h5.5"
          stroke="#3D2B1F"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </m.span>
  );
}

/* ————— lab switch —————
   Light → dark → classic, one tap apart. A candy toast announces
   each switch, and the mobile browser chrome is re-painted to the
   lab's cream so the address bar never fights the page. */

const LAB_ORDER: Lab[] = ["light", "dark", "classic"];

const LAB_LABEL: Record<Lab, string> = {
  light: "Light",
  dark: "Dark",
  classic: "Classic",
};

const LAB_TITLE: Record<Lab, string> = {
  light: "Switch to the dark lab",
  dark: "Switch to the classic lab",
  classic: "Switch to the light lab",
};

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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cycle = useCallback(() => {
    const next = LAB_ORDER[(LAB_ORDER.indexOf(lab) + 1) % LAB_ORDER.length];
    /* hold the colours while they ease over — one smooth move */
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 480);
    setPrefs({ theme: next });
    setAnnounce(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAnnounce(null), 1800);
  }, [lab]);

  const tool = (active: boolean) =>
    `grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-colors sm:h-11 sm:w-11 ${
      active
        ? "bg-ink text-cream"
        : "bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
    }`;

  return (
    <>
      <header
        className="fixed inset-x-0 z-50 flex justify-center pl-[max(0.625rem,var(--sa-left))] pr-[max(0.625rem,var(--sa-right))] sm:pl-[max(0.75rem,var(--sa-left))] sm:pr-[max(0.75rem,var(--sa-right))]"
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
            <Sliders className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </m.button>

          <m.button
            type="button"
            onClick={cycle}
            whileTap={{ scale: 0.88 }}
            className={tool(false)}
            title={LAB_TITLE[lab]}
            aria-label={LAB_TITLE[lab]}
          >
            {/* the button wears today's lab; the toast announces the next one */}
            {lab === "light" ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={2.2} />
            ) : lab === "dark" ? (
              <Moon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            ) : (
              <SunMoon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            )}
          </m.button>
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
                        ? "#2e2016"
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
  onSearch,
  bandFrom = "var(--color-cream)",
}: {
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenCustomize: () => void;
  onOpenPack: () => void;
  onSearch: () => void;
  /* the surface the cocoa wave rises from — home hands in its own
     band colour so the seam above stays continuous after dark */
  bandFrom?: string;
}) {
  const [booped, setBooped] = useState(false);

  const boop = () => {
    setBooped(true);
    setTimeout(() => setBooped(false), 2200);
  };

  return (
    <footer className="mt-auto">
      <div
        aria-hidden
        className="h-[54px] sm:h-[74px]"
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

      <div className="bg-cocoa pt-4 pb-12 text-milk">
        {/* two columns until the widescreen desktop three — at tablet
            width three columns squeeze every caption into four lines */}
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark size={38} />
              <span className="font-display text-[17px] font-semibold tracking-tight">
                Reaction Club
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-milk/80">
              Notes for every topic in the International A Level course — read
              them in order, try the checkpoints, and mark what you&apos;ve
              revised. Your reading time is counted, topic by topic.
            </p>
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
                      <span className="font-display text-[13px] font-semibold text-ink">
                        Tap a unit to start revising.
                      </span>
                    </SpeechBubble>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <div className="font-display text-[12px] font-bold tracking-[0.2em] text-milk/60 uppercase">
              The club
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={onOpenSticker}
                className="group flex cursor-pointer items-center gap-2.5 text-left"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint/25 text-mint transition-transform group-hover:scale-110">
                  <Sticker className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                  Progress · your time, topics & weekly goal
                </span>
              </button>
              <button
                type="button"
                onClick={onOpenPack}
                className="group flex cursor-pointer items-center gap-2.5 text-left"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lemon/25 text-lemon transition-transform group-hover:scale-110">
                  <ClipboardList className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                  Revision pack · your ticked spec points
                </span>
              </button>
              <button
                type="button"
                onClick={onOpenCustomize}
                className="group flex cursor-pointer items-center gap-2.5 text-left"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lemon/25 text-lemon transition-transform group-hover:scale-110">
                  <Sliders className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                  Customize · fonts, sizes & themes
                </span>
              </button>
              <button
                type="button"
                onClick={onSearch}
                className="group flex cursor-pointer items-center gap-2.5 text-left"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-milk/80 transition-transform group-hover:scale-110">
                  <Search className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                  Search
                  <span className="hidden pointer-fine:inline"> · press ⌘K</span>
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="font-display text-[12px] font-bold tracking-[0.2em] text-milk/60 uppercase">
              Units
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-3">
              {UNITS.map((u) => (
                <button
                  key={u.code}
                  type="button"
                  onClick={() => onOpenUnit(u.code)}
                  className="group flex cursor-pointer items-center gap-2.5 text-left"
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full transition-transform group-hover:scale-125"
                    style={{ background: u.candy.main }}
                  />
                  <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                    {u.code.replace("WCH", "Unit ")} · {u.shortTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-5 pb-[var(--sa-bottom)] sm:px-8">
          <p className="text-[11.5px] leading-relaxed font-semibold text-milk/60">
            Written to the Pearson Edexcel International A Level Chemistry
            (2018) specification · WCH11–WCH16 · not affiliated with or endorsed
            by Pearson Education Ltd.
            <span className="ml-1 whitespace-nowrap text-milk/40">
              · rev 4 · Nov 2026
            </span>
          </p>
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

  useEffect(() => {
    if (searchOpen) setSearchMounted(true);
  }, [searchOpen]);
  useEffect(() => {
    if (customizeOpen) setCustomizeMounted(true);
  }, [customizeOpen]);

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
                : "home";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [viewKey]);

  /* the panel's knobs own <html>; make sure hydration agrees with it */
  useEffect(() => {
    applyPrefs(prefs);
  }, [prefs]);

  const openUnit = (code: string) => setView({ kind: "unit", code });
  /* topics open their full revision note straight away — no intermediate
     stop. The topic page itself stays only for the rare topic that has
     no note doc behind it. */
  const openTopic = useCallback((code: UnitCode, topicId: string) => {
    const meta = getNotesMetaForTopic(code, topicId);
    if (meta) setView({ kind: "notes", code, docId: meta.id });
    else setView({ kind: "topic", code, topicId });
  }, []);
  const goHome = () => setView({ kind: "home" });
  const openSticker = useCallback(() => setView({ kind: "sticker" }), []);
  const openPack = useCallback(() => setView({ kind: "pack" }), []);
  const openSpec = useCallback(() => setView({ kind: "spec" }), []);
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
            <CustomizePanel open={customizeOpen} onClose={closeCustomize} />
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
                {view.kind === "home" && (
                  <Home
                    units={UNITS}
                    onOpenUnit={openUnit}
                    onOpenSticker={openSticker}
                    onOpenTopic={openTopic}
                    onOpenPack={openPack}
                    onOpenSpec={openSpec}
                  />
                )}
  
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
              </m.div>
            </AnimatePresence>
  
            <Footer
              onOpenUnit={openUnit}
              onOpenSticker={openSticker}
              onOpenCustomize={openCustomize}
              onOpenPack={openPack}
              onSearch={openSearch}
              bandFrom={
                view.kind === "home"
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
