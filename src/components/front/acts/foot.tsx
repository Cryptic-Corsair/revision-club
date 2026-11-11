"use client";

import { ChapHead } from "../chap";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · the finale

   Bikebear's last move: one giant sentence, one honest button.
   Opens station 01 directly — the shortest distance between
   arriving and revising.
   ═══════════════════════════════════════════════════════════════ */

export default function Foot({
  onOpenDoc,
}: {
  onOpenDoc: (id: string) => void;
}) {
  return (
    <footer className="fr-foot" id="fr-foot">
      <ChapHead
        n="✦"
        kicker="THE CLUB IS OPEN"
        accent="var(--color-lemon)"
        title={
          <>
            Go <em>revise.</em>
          </>
        }
        lede="The notes are written, the spec is mapped, the progress is yours to spend. Start at station 01 or wherever the last lesson left you."
      />

      <div className="fr-foot-cta">
        <button
          type="button"
          data-cursor="open"
          className="fr-btn fr-btn-solid fr-btn-big"
          onClick={() => onOpenDoc("wch11-t01")}
        >
          Open station 01
          <svg viewBox="0 0 14 14" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </button>
        <span className="f-mono">formulae, equations & amount of substance · 1.1 → 1.12</span>
      </div>

      <div className="fr-foot-strip" aria-hidden>
        <div className="fr-marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="fr-strip-seq f-mono">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i}>
                  START WHERE YOU ARE&nbsp;·&nbsp;THE CLUB IS OPEN&nbsp;·&nbsp;WCH11&nbsp;→&nbsp;WCH16&nbsp;·&nbsp;
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="fr-foot-credits">
        <span className="f-mono">IAL CHEM · a revision club</span>
        <span className="f-mono">the front door · six chapters, one story</span>
        <span className="f-mono">built for the wall</span>
      </div>
    </footer>
  );
}
