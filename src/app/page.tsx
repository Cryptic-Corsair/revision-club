"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TopBar, Footer } from "@/components/margins/chrome";
import { Home } from "@/components/margins/home";
import { Library } from "@/components/margins/library";
import { Reader } from "@/components/margins/reader";
import { Wallchart } from "@/components/margins/wallchart";
import { Bench } from "@/components/margins/titration";
import { ReactionMap } from "@/components/margins/reactionmap";
import { MarkSheet } from "@/components/marks";

type View =
  | { name: "home" }
  | { name: "library"; focus?: string }
  | { name: "wallchart" }
  | { name: "bench" }
  | { name: "map" }
  | { name: "marks" }
  | { name: "notes"; unit: string; topic: string };

export default function Page() {
  const [view, setView] = useState<View>({ name: "home" });
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [view, reduced]);

  const goHome = () => setView({ name: "home" });
  const goLibrary = () => setView({ name: "library" });
  const goWallchart = () => setView({ name: "wallchart" });
  const goBench = () => setView({ name: "bench" });
  const goMap = () => setView({ name: "map" });
  const goMarks = () => setView({ name: "marks" });
  const openUnit = (slug: string) => setView({ name: "library", focus: slug });
  const openTopic = (unit: string, topic: string) => setView({ name: "notes", unit, topic });

  const viewKey =
    view.name === "notes"
      ? `notes-${view.topic}`
      : view.name === "library"
        ? `library-${view.focus ?? "all"}`
        : view.name;

  return (
    <div className="min-h-screen flex flex-col relative">
      <TopBar
        goHome={goHome}
        goLibrary={goLibrary}
        goWallchart={goWallchart}
        goBench={goBench}
        goMap={goMap}
        goMarks={goMarks}
        current={view.name}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewKey}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.3, 1] }}
          >
            {view.name === "home" && (
              <Home
                goLibrary={goLibrary}
                openUnit={openUnit}
                openSampleNote={() => openTopic("unit-1", "the-mole-titrations")}
                openWallchart={goWallchart}
                openBench={goBench}
                openMap={goMap}
                openTopic={openTopic}
              />
            )}
            {view.name === "library" && (
              <Library key={view.focus ?? "all"} focus={view.focus} openTopic={openTopic} />
            )}
            {view.name === "wallchart" && <Wallchart openTopic={openTopic} />}
            {view.name === "bench" && <Bench />}
            {view.name === "map" && <ReactionMap />}
            {view.name === "marks" && <MarkSheet openTopic={openTopic} />}
            {view.name === "notes" && (
              <Reader
                unitSlug={view.unit}
                topicSlug={view.topic}
                backToUnit={() => setView({ name: "library", focus: view.unit })}
                goWallchart={goWallchart}
                openTopic={openTopic}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer goLibrary={goLibrary} />
    </div>
  );
}
