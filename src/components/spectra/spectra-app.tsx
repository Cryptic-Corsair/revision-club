"use client";

import { useEffect, useState } from "react";
import { UNITS, getUnit, getTopic } from "@/lib/spectra/units";
import { Home } from "./home";
import { UnitPage } from "./unit-page";
import { TopicPage } from "./topic-page";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · app shell — top bar, views, footer
   ═══════════════════════════════════════════════════════════════ */

type View =
  | { kind: "home" }
  | { kind: "unit"; code: string }
  | { kind: "topic"; code: string; topicId: string };

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden className="shrink-0">
      <rect x="0.5" y="0.5" width="25" height="25" rx="3" fill="none" stroke="var(--line)" />
      <rect x="6" y="5" width="1.6" height="16" rx="0.8" fill="#ff4d5e" />
      <rect x="12.2" y="8" width="1.6" height="10" rx="0.8" fill="#43e08c" />
      <rect x="18.4" y="10" width="1.6" height="6" rx="0.8" fill="#5e8bff" />
    </svg>
  );
}

function TopBar({
  view,
  onHome,
  onOpenUnit,
}: {
  view: View;
  onHome: () => void;
  onOpenUnit: (code: string) => void;
}) {
  const activeCode = view.kind === "home" ? null : view.code;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-soft bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-5 sm:gap-7 sm:px-8">
        <button
          onClick={onHome}
          className="flex shrink-0 items-center gap-3"
          aria-label="Spectra — home"
        >
          <LogoMark />
          <span className="text-[13.5px] font-semibold tracking-[0.3em] text-ink">SPECTRA</span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.26em] text-ink-3 md:block">
            IAL Chemistry
          </span>
        </button>

        <nav
          className="no-scrollbar flex flex-1 items-center justify-start gap-1 overflow-x-auto sm:justify-end sm:gap-2"
          aria-label="Units"
        >
          <button
            onClick={onHome}
            aria-current={view.kind === "home" ? "page" : undefined}
            className={`relative shrink-0 rounded-[3px] px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              view.kind === "home" ? "text-ink" : "text-ink-3 hover:text-ink"
            }`}
          >
            Overview
            {view.kind === "home" && (
              <span className="absolute inset-x-2.5 bottom-0 h-[2px] bg-ink" aria-hidden />
            )}
          </button>
          {UNITS.map((u) => {
            const active = activeCode === u.code;
            return (
              <button
                key={u.code}
                onClick={() => onOpenUnit(u.code)}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 rounded-[3px] px-2 py-2 font-mono text-[10px] tracking-[0.12em] transition-colors ${
                  active ? "" : "text-ink-3 hover:text-ink"
                }`}
                style={active ? { color: u.color } : undefined}
              >
                {u.code}
                {active && (
                  <span
                    className="flame-line absolute inset-x-1.5 bottom-0 h-[2px] rounded-full"
                    style={{ background: u.color, boxShadow: `0 0 8px ${u.color}` }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Footer({ onOpenUnit }: { onOpenUnit: (code: string) => void }) {
  return (
    <footer className="mt-10">
      <div className="spectrum-rule h-[2px] w-full opacity-80" aria-hidden />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="text-[12.5px] font-semibold tracking-[0.3em] text-ink">
                SPECTRA
              </span>
            </div>
            <p className="mt-3 font-serif text-[14px] italic leading-relaxed text-ink-2">
              An observatory for chemistry — six units, six flames, one subject observed
              closely.
            </p>
            <p className="mt-3 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-ink-3">
              Written to the Pearson Edexcel International A Level Chemistry (2018)
              specification · WCH11–WCH16 · not affiliated with or endorsed by Pearson
              Education Ltd.
            </p>
          </div>

          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3">
              The six flames
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
              {UNITS.map((u) => (
                <button
                  key={u.code}
                  onClick={() => onOpenUnit(u.code)}
                  className="group flex items-center gap-2.5 text-left"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: u.color, boxShadow: `0 0 6px ${u.color}` }}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] tracking-[0.12em] text-ink-3 transition-colors group-hover:text-ink">
                    {u.code} · {u.element.symbol} {u.element.nm} nm
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SpectraApp() {
  const [view, setView] = useState<View>({ kind: "home" });
  const viewKey = view.kind === "topic" ? `topic-${view.code}-${view.topicId}` : view.kind === "unit" ? `unit-${view.code}` : "home";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [viewKey]);

  const openUnit = (code: string) => setView({ kind: "unit", code });
  const openTopic = (code: string, topicId: string) => setView({ kind: "topic", code, topicId });
  const goHome = () => setView({ kind: "home" });

  const unit = view.kind === "home" ? undefined : getUnit(view.code);
  const topic =
    view.kind === "topic" && unit ? getTopic(view.code, view.topicId) : undefined;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <TopBar view={view} onHome={goHome} onOpenUnit={openUnit} />

      {/* unit-tinted glow at the top of unit & topic pages */}
      {unit && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-40"
          style={{
            background: `radial-gradient(55% 130px at 50% 0%, color-mix(in oklab, ${unit.color} 9%, transparent), transparent)`,
          }}
        />
      )}

      <main className="relative z-10 pt-14">
        {view.kind === "home" && <Home units={UNITS} onOpenUnit={openUnit} />}

        {view.kind === "unit" && unit && (
          <UnitPage
            unit={unit}
            onOpenTopic={(id) => openTopic(unit.code, id)}
            onBack={goHome}
            onOpenUnit={openUnit}
          />
        )}

        {view.kind === "topic" && unit && topic && (
          <TopicPage
            unit={unit}
            topic={topic}
            onBack={() => openUnit(unit.code)}
            onOpenTopic={(id) => openTopic(unit.code, id)}
          />
        )}

        <Footer onOpenUnit={openUnit} />
      </main>
    </div>
  );
}
