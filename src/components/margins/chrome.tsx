"use client";

import { Stamp } from "./primitives";

export function TopBar({
  goHome,
  goLibrary,
  goWallchart,
  goMarks,
  current,
}: {
  goHome: () => void;
  goLibrary: () => void;
  goWallchart: () => void;
  goMarks: () => void;
  current: string;
}) {
  return (
    <header className="no-print sticky top-0 z-40 bg-paper/92 backdrop-blur-[3px] border-b border-rule">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10 h-[62px] flex items-center justify-between gap-4">
        <button type="button" onClick={goHome} className="flex items-center gap-3 group" aria-label="Axiom — IAL Chemistry home">
          <span className="element-cell group-hover:border-pen transition-colors" aria-hidden="true">
            <span className="num">01</span>
            <span className="sym">Ax</span>
            <span className="name">axiom</span>
          </span>
          <span className="hidden sm:flex flex-col items-start leading-tight">
            <span className="font-display font-semibold text-[19px] tracking-[-0.01em] group-hover:text-pen-deep transition-colors">
              Axiom
            </span>
            <span className="font-marks text-[9px] uppercase tracking-[0.22em] text-ink-faint">
              IAL Chemistry
            </span>
          </span>
        </button>

        <p className="hidden lg:block font-marks text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          Pearson Edexcel IAL · WCH11–WCH16 · spec-aligned
        </p>

        <nav className="flex items-center gap-5" aria-label="Main">
          {[
            { label: "Unit map", action: goLibrary, key: "library" },
            { label: "Wallchart", action: goWallchart, key: "wallchart" },
            { label: "Mark sheet", action: goMarks, key: "marks" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.action}
              className={`font-marks text-[12px] uppercase tracking-[0.14em] transition-colors hover:text-pen-deep ${
                current === item.key ? "text-pen-deep" : "text-ink-soft"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer({ goLibrary }: { goLibrary: () => void }) {
  return (
    <footer className="no-print mt-auto">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10 pb-10 pt-4">
        <div className="flex items-center gap-5 my-12" aria-hidden="true">
          <span className="h-px flex-1 bg-rule" />
          <span className="font-marks text-[11px] uppercase tracking-[0.3em] text-ink-faint">End of section</span>
          <span className="h-px flex-1 bg-rule" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-display font-semibold text-[19px] mb-2">
              Axiom <span className="text-ink-faint font-normal">· IAL Chemistry</span>
            </p>
            <p className="font-body text-[14.5px] text-ink-soft max-w-[52ch] leading-[1.65]">
              An independent revision resource, written to the Pearson Edexcel International A Level Chemistry
              specification (2018, WCH11–WCH16). Not affiliated with or endorsed by Pearson Edexcel.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <Stamp graphite>Free · no ads · no sign-up</Stamp>
            <button
              type="button"
              onClick={goLibrary}
              className="font-marks text-[12px] uppercase tracking-[0.16em] text-pen-deep hover:text-ink transition-colors"
            >
              Turn over ▸
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
