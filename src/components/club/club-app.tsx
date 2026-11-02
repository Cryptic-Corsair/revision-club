"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FlaskConical,
  Home as HomeIcon,
  Moon,
  Search,
  Sliders,
  Sticker,
  Sun,
  SunMoon,
} from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { UNITS, getUnit, getTopic } from "@/lib/spectra/units";
import { getNotes, getNotesForTopic } from "@/lib/spectra/notes";
import { useTimeScope } from "@/lib/spectra/time";
import { applyPrefs, setPrefs, usePrefs, type Lab } from "@/lib/spectra/prefs";
import { Home } from "./home";
import { UnitView } from "./unit-view";
import { TopicView } from "./topic-view";
import { NotesReader } from "./notes-reader";
import { StickerBook } from "./sticker-book";
import { CustomizePanel } from "./customize";
import { SearchPalette } from "./search";
import { Mascot, SpeechBubble } from "./bits";
import { SpecMapProvider, SpecMapTrigger } from "./spec-map";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · app shell — pill nav, views, footer
   The nav stays lean: home, then the tools. Units live on the
   home page, where they have room to breathe.
   ═══════════════════════════════════════════════════════════════ */

type View =
  | { kind: "home" }
  | { kind: "unit"; code: string }
  | { kind: "topic"; code: string; topicId: string }
  | { kind: "notes"; code: string; docId: string }
  | { kind: "sticker" };

function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[14px]"
      style={{
        width: size,
        height: size,
        background: "#FF6B6B",
        boxShadow: "0 4px 0 #E8590C",
      }}
    >
      <FlaskConical className="h-5 w-5 text-white" strokeWidth={2.2} />
    </span>
  );
}

/* ————— lab switch —————
   Daylight → after-dark → hybrid, one tap apart. The hybrid lab
   keeps the daylight page but lets the notes reader punch in deep
   cocoa rooms — the best of both moods. A candy toast announces
   each switch, and the mobile browser chrome is re-painted to the
   lab's cream so the address bar never fights the page. */

const LAB_ORDER: Lab[] = ["light", "dark", "hybrid"];

const LAB_LABEL: Record<Lab, string> = {
  light: "Daylight lab",
  dark: "After-dark lab",
  hybrid: "Hybrid lab — day & night",
};

const LAB_TITLE: Record<Lab, string> = {
  light: "Switch to the after-dark lab",
  dark: "Switch to the hybrid lab",
  hybrid: "Switch to the daylight lab",
};

function TopBar({
  view,
  onHome,
  onOpenSticker,
  onSearch,
  onOpenCustomize,
}: {
  view: View;
  onHome: () => void;
  onOpenSticker: () => void;
  onSearch: () => void;
  onOpenCustomize: () => void;
}) {
  const prefs = usePrefs();
  const lab = prefs.theme;
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
    `grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-colors ${
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
          className="flex max-w-[97vw] items-center gap-1.5 rounded-full bg-paper/90 py-2 pr-2.5 pl-2.5 backdrop-blur-xl"
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
          <motion.button
            type="button"
            onClick={onHome}
            aria-current={view.kind === "home" ? "page" : undefined}
            aria-label="Home"
            title="Home"
            whileTap={{ scale: 0.88 }}
            className={`h-10 w-10 shrink-0 ${tool(view.kind === "home")}`}
          >
            <HomeIcon className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </motion.button>

          <motion.button
            type="button"
            onClick={onSearch}
            whileTap={{ scale: 0.88 }}
            className={tool(false)}
            title="Search topics · ⌘K"
            aria-label="Search topics"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </motion.button>

          <motion.button
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
          </motion.button>

          <motion.button
            type="button"
            onClick={onOpenCustomize}
            whileTap={{ scale: 0.88 }}
            className={tool(false)}
            title="Customize · fonts, sizes & themes"
            aria-label="Customize the site"
          >
            <Sliders className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </motion.button>

          <motion.button
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
          </motion.button>
        </nav>
      </header>

      {/* ————— lab toast — announces where you just landed ————— */}
      <AnimatePresence>
        {announce && (
          <motion.div
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
                        : "linear-gradient(90deg, #FFD43B 50%, #2e2016 50%)",
                  boxShadow: "inset 0 0 0 2px rgb(61 43 31 / 0.12)",
                }}
              />
              {LAB_LABEL[announce]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer({
  onOpenUnit,
  onOpenSticker,
  onOpenCustomize,
  onSearch,
}: {
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenCustomize: () => void;
  onSearch: () => void;
}) {
  const [booped, setBooped] = useState(false);

  const boop = () => {
    setBooped(true);
    setTimeout(() => setBooped(false), 2200);
  };

  return (
    <footer className="mt-auto">
      <div aria-hidden className="h-[54px] bg-cream sm:h-[74px]">
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
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark size={34} />
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
                  <motion.div
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
                  </motion.div>
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
                  Search<span className="hidden sm:inline"> · press ⌘K</span>
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
  const prefs = usePrefs();
  const viewKey =
    view.kind === "topic"
      ? `topic-${view.code}-${view.topicId}`
      : view.kind === "unit"
        ? `unit-${view.code}`
        : view.kind === "notes"
          ? `notes-${view.docId}`
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
  const openTopicRaw = useCallback((code: string, topicId: string) => {
    setView({ kind: "topic", code, topicId });
  }, []);
  const openTopic = useCallback(
    (code: UnitCode, topicId: string) => openTopicRaw(code, topicId),
    [openTopicRaw],
  );
  const goHome = () => setView({ kind: "home" });
  const openSticker = useCallback(() => setView({ kind: "sticker" }), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const openCustomize = useCallback(() => setCustomizeOpen(true), []);
  const closeCustomize = useCallback(() => setCustomizeOpen(false), []);

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
  const notesDoc = view.kind === "notes" ? getNotes(view.docId) : undefined;
  useTimeScope(
    view.kind === "topic" || view.kind === "notes" ? view.code : undefined,
    view.kind === "topic" ? view.topicId : notesDoc?.topicId,
  );

  const unit =
    view.kind === "home" || view.kind === "sticker"
      ? undefined
      : getUnit(view.code);
  const topic =
    view.kind === "topic" && unit
      ? getTopic(view.code, view.topicId)
      : undefined;
  const topicNotes =
    unit && topic ? getNotesForTopic(unit.code, topic.id) : undefined;

  return (
    <SpecMapProvider>
      <div className="flex min-h-dvh flex-col">
        <TopBar
          view={view}
          onHome={goHome}
          onOpenSticker={openSticker}
          onSearch={openSearch}
          onOpenCustomize={openCustomize}
        />
        <SearchPalette
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onOpenTopic={openTopic}
        />
        <CustomizePanel open={customizeOpen} onClose={closeCustomize} />

        <main className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
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
                  notesSpecRange={
                    topicNotes && topicNotes.sections.length > 0
                      ? `${topicNotes.sections[0].spec} → ${topicNotes.sections[topicNotes.sections.length - 1].spec}`
                      : undefined
                  }
                  onOpenNotes={
                    topicNotes
                      ? () =>
                          setView({
                            kind: "notes",
                            code: unit.code,
                            docId: topicNotes.id,
                          })
                      : undefined
                  }
                />
              )}

              {view.kind === "notes" && unit && notesDoc && (
                <NotesReader
                  key={notesDoc.id}
                  doc={notesDoc}
                  unit={unit}
                  onBack={() => openTopic(unit.code, notesDoc.topicId)}
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
            </motion.div>
          </AnimatePresence>

          <Footer
            onOpenUnit={openUnit}
            onOpenSticker={openSticker}
            onOpenCustomize={openCustomize}
            onSearch={openSearch}
          />
        </main>
      </div>
    </SpecMapProvider>
  );
}
