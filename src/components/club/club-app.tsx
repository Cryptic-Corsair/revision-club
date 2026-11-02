"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Home as HomeIcon, Moon, Search, Sticker, Sun, SunMoon, Zap } from "./icons";
import type { UnitCode } from "@/lib/spectra/types";
import { UNITS, getUnit, getTopic } from "@/lib/spectra/units";
import { getNotes, getNotesForTopic } from "@/lib/spectra/notes";
import { pickDarkMood } from "@/lib/spectra/dark-mood";
import { Home } from "./home";
import { UnitView } from "./unit-view";
import { TopicView } from "./topic-view";
import { NotesReader } from "./notes-reader";
import { Blend } from "./blend";
import { StickerBook } from "./sticker-book";
import { SearchPalette } from "./search";
import { Mascot, SpeechBubble, tint, shade } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · app shell — pill nav, views, footer
   ═══════════════════════════════════════════════════════════════ */

type View =
  | { kind: "home" }
  | { kind: "unit"; code: string }
  | { kind: "topic"; code: string; topicId: string }
  | { kind: "notes"; code: string; docId: string }
  | { kind: "sticker" }
  | { kind: "blend" };

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
   Three labs, one button: daylight → after-dark → hybrid → daylight.
   The hybrid lab keeps the daylight page but lets the notes reader
   punch in deep cocoa rooms — the best of both moods. A candy toast
   announces each switch, and the mobile browser chrome is re-painted
   to the lab's cream so the address bar never fights the page. */

export type Lab = "light" | "dark" | "hybrid";

const LAB_LABEL: Record<Lab, string> = {
  light: "Daylight lab",
  dark: "After-dark lab",
  hybrid: "Hybrid lab — day & night",
};

function readLab(): Lab {
  const r = document.documentElement;
  if (r.classList.contains("dark")) return "dark";
  if (r.classList.contains("hybrid")) return "hybrid";
  return "light";
}

/* keep the mobile address bar in the lab's cream */
function paintChrome(root: HTMLElement) {
  const cream = getComputedStyle(root).getPropertyValue("--color-cream").trim();
  if (!cream) return;
  let m = document.querySelector('meta[name="theme-color"]:not([media])');
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute("name", "theme-color");
    document.head.appendChild(m);
  }
  m.setAttribute("content", cream);
}

function useTheme() {
  const [lab, setLab] = useState<Lab>("light");
  const [announce, setAnnounce] = useState<Lab | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const current = readLab();
    setLab(current);
    paintChrome(document.documentElement);
  }, []);
  const cycle = useCallback(() => {
    const order: Lab[] = ["light", "dark", "hybrid"];
    const next = order[(order.indexOf(readLab()) + 1) % order.length];
    const root = document.documentElement;
    /* hold the colours while they ease over — one smooth move */
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 480);
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("hybrid", next === "hybrid");
    /* dark + hybrid wear today's roast; the daylight lab needs none */
    if (next !== "light") root.dataset.mood = String(pickDarkMood());
    else delete root.dataset.mood;
    paintChrome(root);
    try {
      localStorage.setItem("rc-theme", next);
    } catch {
      /* private mode — mood just won't persist */
    }
    setLab(next);
    setAnnounce(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAnnounce(null), 1800);
  }, []);
  return { lab, announce, cycle };
}

function TopBar({
  view,
  onHome,
  onOpenUnit,
  onOpenSticker,
  onOpenBlend,
  onSearch,
}: {
  view: View;
  onHome: () => void;
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenBlend: () => void;
  onSearch: () => void;
}) {
  const { lab, announce, cycle } = useTheme();
  const activeCode =
    view.kind === "unit" || view.kind === "topic" || view.kind === "notes" ? view.code : null;

  const tool = (active: boolean) =>
    `grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-colors ${
      active ? "bg-ink text-cream" : "bg-ink/[0.06] text-ink-soft hover:bg-ink/[0.11] hover:text-ink"
    }`;

  return (
    <>
      <header className="fixed inset-x-0 top-2.5 z-50 flex justify-center px-2.5 sm:top-3 sm:px-3">
      <nav
        aria-label="Units"
        className="no-scrollbar flex max-w-[97vw] items-center gap-1.5 overflow-x-auto rounded-full bg-paper/90 py-2 pr-2.5 pl-2.5 backdrop-blur-xl"
        style={{ boxShadow: "0 3px 0 var(--edge), 0 16px 38px -18px rgb(0 0 0 / 0.4)" }}
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

        <span aria-hidden className="mx-1 hidden h-6 w-[3px] shrink-0 rounded-full bg-ink/10 sm:block" />

        {/* ————— home + units ————— */}
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

        {UNITS.map((u) => {
          const active = activeCode === u.code;
          return (
            <motion.button
              key={u.code}
              type="button"
              onClick={() => onOpenUnit(u.code)}
              aria-current={active ? "page" : undefined}
              whileTap={{ scale: 0.88 }}
              animate={{ scale: active ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
              className="h-10 shrink-0 cursor-pointer rounded-full px-3 font-display text-[12px] font-bold tracking-wide"
              style={
                active
                  ? { background: u.candy.main, color: "#fff", boxShadow: `0 3px 0 ${shade(u.candy.main)}` }
                  : { background: tint(u.candy.main, 16), color: u.candy.main }
              }
              title={`${u.code} — ${u.shortTitle}`}
            >
              {u.code.replace("WCH", "")}
            </motion.button>
          );
        })}

        <span aria-hidden className="mx-1 hidden h-6 w-[3px] shrink-0 rounded-full bg-ink/10 sm:block" />

        {/* ————— tools ————— */}
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
          onClick={onOpenBlend}
          aria-current={view.kind === "blend" ? "page" : undefined}
          whileTap={{ scale: 0.88 }}
          animate={{ scale: view.kind === "blend" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 16 }}
          className={tool(view.kind === "blend")}
          title="Flashcards"
          aria-label="Open flashcards"
          style={
            view.kind === "blend"
              ? { background: "#9775FA", color: "#fff", boxShadow: "0 3px 0 #6d4fd4" }
              : undefined
          }
        >
          <Zap className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </motion.button>
        <motion.button
          type="button"
          onClick={onOpenSticker}
          aria-current={view.kind === "sticker" ? "page" : undefined}
          whileTap={{ scale: 0.88 }}
          animate={{ scale: view.kind === "sticker" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 16 }}
          className={tool(view.kind === "sticker")}
          title="Your progress"
          aria-label="Open your progress"
          style={
            view.kind === "sticker"
              ? { background: "#12B886", color: "#fff", boxShadow: "0 3px 0 #0B7A57" }
              : undefined
          }
        >
          <Sticker className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </motion.button>
        <motion.button
          type="button"
          onClick={cycle}
          whileTap={{ scale: 0.88 }}
          className={tool(false)}
          title={
            lab === "light"
              ? "Switch to the after-dark lab"
              : lab === "dark"
                ? "Switch to the hybrid lab"
                : "Switch to the daylight lab"
          }
          aria-label={
            lab === "light"
              ? "Switch to the after-dark lab"
              : lab === "dark"
                ? "Switch to the hybrid lab"
                : "Switch to the daylight lab"
          }
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
            className="fixed bottom-7 left-1/2 z-[80]"
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
  onOpenBlend,
  onSearch,
}: {
  onOpenUnit: (code: string) => void;
  onOpenSticker: () => void;
  onOpenBlend: () => void;
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
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-full w-full">
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
              Notes for every topic in the International A Level course — read them in order,
              try the checkpoints, and mark what you&apos;ve revised.
            </p>
            <div className="mt-5 flex items-end gap-1">
              <Mascot main="#FFD43B" size={88} boop onBoop={boop} bubbles={false} />
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
              Practice
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={onOpenBlend}
                className="group flex cursor-pointer items-center gap-2.5 text-left"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-grape/25 text-grape transition-transform group-hover:scale-110">
                  <Zap className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                  Flashcards · shuffled checkpoint questions
                </span>
              </button>
              <button
                type="button"
                onClick={onOpenSticker}
                className="group flex cursor-pointer items-center gap-2.5 text-left"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint/25 text-mint transition-transform group-hover:scale-110">
                  <Sticker className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-bold text-milk/80 transition-colors group-hover:text-milk">
                  Progress · topics revised
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
                  Search · press ⌘K
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

        <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
          <p className="text-[11.5px] leading-relaxed font-semibold text-milk/60">
            Written to the Pearson Edexcel International A Level Chemistry (2018) specification
            · WCH11–WCH16 · not affiliated with or endorsed by Pearson Education Ltd.
            <span className="ml-1 whitespace-nowrap text-milk/40">· rev 3 · Nov 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function ClubApp() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [searchOpen, setSearchOpen] = useState(false);
  const viewKey =
    view.kind === "topic"
      ? `topic-${view.code}-${view.topicId}`
      : view.kind === "unit"
        ? `unit-${view.code}`
        : view.kind === "notes"
          ? `notes-${view.docId}`
          : view.kind === "sticker"
            ? "sticker"
            : view.kind === "blend"
              ? "blend"
              : "home";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [viewKey]);

  const openUnit = (code: string) => setView({ kind: "unit", code });
  const openTopicRaw = useCallback((code: string, topicId: string) => {
    setView({ kind: "topic", code, topicId });
  }, []);
  const openTopic = useCallback(
    (code: UnitCode, topicId: string) => openTopicRaw(code, topicId),
    [openTopicRaw]
  );
  const goHome = () => setView({ kind: "home" });
  const openSticker = useCallback(() => setView({ kind: "sticker" }), []);
  const openBlend = useCallback(() => setView({ kind: "blend" }), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);

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

  const unit =
    view.kind === "home" || view.kind === "sticker" || view.kind === "blend" ? undefined : getUnit(view.code);
  const topic = view.kind === "topic" && unit ? getTopic(view.code, view.topicId) : undefined;
  const notesDoc =
    view.kind === "notes"
      ? getNotes(view.docId)
      : unit && topic
        ? getNotesForTopic(unit.code, topic.id)
        : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar
        view={view}
        onHome={goHome}
        onOpenUnit={openUnit}
        onOpenSticker={openSticker}
        onOpenBlend={openBlend}
        onSearch={openSearch}
      />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} onOpenTopic={openTopic} />

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
                onOpenBlend={openBlend}
                onOpenSticker={openSticker}
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
                  notesDoc && notesDoc.sections.length > 0
                    ? `${notesDoc.sections[0].spec} → ${notesDoc.sections[notesDoc.sections.length - 1].spec}`
                    : undefined
                }
                onOpenNotes={
                  notesDoc
                    ? () => setView({ kind: "notes", code: unit.code, docId: notesDoc.id })
                    : undefined
                }
              />
            )}

            {view.kind === "notes" && unit && notesDoc && (
              <NotesReader key={notesDoc.id} doc={notesDoc} unit={unit} onBack={() => openTopic(unit.code, notesDoc.topicId)} />
            )}

            {view.kind === "sticker" && (
              <StickerBook units={UNITS} onBack={goHome} onOpenUnit={openUnit} />
            )}

            {view.kind === "blend" && (
              <Blend onBack={goHome} onOpenTopic={openTopic} />
            )}
          </motion.div>
        </AnimatePresence>

        <Footer
          onOpenUnit={openUnit}
          onOpenSticker={openSticker}
          onOpenBlend={openBlend}
          onSearch={openSearch}
        />
      </main>
    </div>
  );
}
