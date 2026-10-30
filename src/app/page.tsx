"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TopBar, Footer } from "@/components/margins/chrome";
import { Home } from "@/components/margins/home";
import { Library } from "@/components/margins/library";
import { SubjectView } from "@/components/margins/subject";
import { Reader } from "@/components/margins/reader";

type View =
  | { name: "home" }
  | { name: "library" }
  | { name: "subject"; slug: string }
  | { name: "notes"; subject: string; unit: string; topic: string };

export default function Page() {
  const [view, setView] = useState<View>({ name: "home" });
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [view, reduced]);

  const goHome = () => setView({ name: "home" });
  const goLibrary = () => setView({ name: "library" });
  const openSubject = (slug: string) => setView({ name: "subject", slug });
  const openTopic = (subject: string, unit: string, topic: string) =>
    setView({ name: "notes", subject, unit, topic });

  const viewKey =
    view.name === "notes" ? `notes-${view.topic}` : view.name === "subject" ? `subject-${view.slug}` : view.name;

  return (
    <div className="min-h-screen flex flex-col relative">
      <TopBar goHome={goHome} goLibrary={goLibrary} current={view.name} />

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
              <Home goLibrary={goLibrary} openSubject={openSubject} openSampleNote={() => openTopic("physics", "unit-1", "motion-suvat")} />
            )}
            {view.name === "library" && <Library openSubject={openSubject} />}
            {view.name === "subject" && (
              <SubjectView slug={view.slug} back={goLibrary} openTopic={(unit, topic) => openTopic(view.slug, unit, topic)} />
            )}
            {view.name === "notes" && (
              <Reader
                subjectSlug={view.subject}
                unitSlug={view.unit}
                topicSlug={view.topic}
                backToUnit={() => setView({ name: "subject", slug: view.subject })}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer goLibrary={goLibrary} />
    </div>
  );
}
