"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { UNITS } from "@/lib/spectra/units";
import { NOTES_META } from "@/lib/spectra/notes-meta";

/* ═══════════════════════════════════════════════════════════════
   THE LAB · the reader — a station of the atlas, opened

   The lab steps aside (the shell hides itself) and the library's
   own gallery reader takes the room: same doc, same diagrams,
   same pack ticks, same progress. The reader chunk is heavy, so
   it rides in lazily.
   ═══════════════════════════════════════════════════════════════ */

const NotesGallery = dynamic(
  () => import("@/components/club/notes-gallery").then((m) => m.NotesGallery),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[70dvh] items-center justify-center">
        <span className="f-mono text-[10px] text-ink-faint">
          retrieving the note…
        </span>
      </div>
    ),
  },
);

export default function Reader({
  docId,
  onBack,
}: {
  docId: string;
  onBack: () => void;
}) {
  const meta = NOTES_META.find((m) => m.id === docId);
  const unit = UNITS.find((u) => u.code === meta?.unitCode);

  /* ESC returns to the lab */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onBack]);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>
      <div className="reader-bar">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer font-display text-[13px] font-semibold text-ink transition-opacity hover:opacity-70"
          >
            ← Back to the lab
          </button>
          <span className="f-mono truncate text-[9px] text-ink-faint">
            {unit?.code} · {meta?.title}
          </span>
        </div>
      </div>
      {unit && meta ? (
        <LazyMotion features={domAnimation}>
          <NotesGallery docId={docId} unit={unit} onBack={onBack} />
        </LazyMotion>
      ) : null}
    </div>
  );
}
