"use client";

import { Stamp, Tick } from "./primitives";

export function TopBar({
  goHome,
  goLibrary,
  current,
}: {
  goHome: () => void;
  goLibrary: () => void;
  current: string;
}) {
  return (
    <header className="sticky top-0 z-40 bg-paper/92 backdrop-blur-[3px] border-b border-rule">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10 h-[62px] flex items-center justify-between gap-4">
        <button type="button" onClick={goHome} className="flex items-center gap-2.5 group" aria-label="Axiom home">
          <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
            <rect width="32" height="32" rx="2" fill="transparent" />
            <line x1="7" y1="3" x2="7" y2="29" stroke="#bf3b2b" strokeWidth="2.4" />
            <path d="M13 23 L20 9 L27 23" fill="none" stroke="#211c14" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display font-semibold text-[21px] tracking-[-0.01em] group-hover:text-pen-deep transition-colors">
            Axiom
          </span>
        </button>

        <p className="hidden lg:block font-marks text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          Pearson Edexcel · International A Level · spec-aligned
        </p>

        <nav className="flex items-center gap-5" aria-label="Main">
          <button
            type="button"
            onClick={goLibrary}
            className={`font-marks text-[12px] uppercase tracking-[0.14em] transition-colors hover:text-pen-deep ${
              current === "library" ? "text-pen-deep" : "text-ink-soft"
            }`}
          >
            The library
          </button>
          <span className="hidden sm:block" aria-hidden="true">
            <Tick size={17} animated={false} />
          </span>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ goLibrary }: { goLibrary: () => void }) {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10 pb-10 pt-4">
        <div className="flex items-center gap-5 my-12" aria-hidden="true">
          <span className="h-px flex-1 bg-rule" />
          <span className="font-marks text-[11px] uppercase tracking-[0.3em] text-ink-faint">End of section</span>
          <span className="h-px flex-1 bg-rule" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-display font-semibold text-[19px] mb-2">Axiom</p>
            <p className="font-body text-[14.5px] text-ink-soft max-w-[52ch] leading-[1.65]">
              An independent revision resource, written to the Pearson Edexcel International A Level specifications.
              Not affiliated with or endorsed by Pearson Edexcel.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <Stamp graphite>Paper: one · Free forever</Stamp>
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
