"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import { m } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ClipboardList,
  Copy,
  Eye,
  EyeOff,
  Printer,
  Target,
  X,
} from "./icons";
import {
  packGroupsOf,
  packToText,
  type PackGroup,
} from "@/lib/spectra/registry";
import { clearPicks, togglePick, toggleRead, usePacks } from "@/lib/spectra/packs";
import { accentOf } from "./bands";
import { EditorialSectionView, figOffsetsOf } from "./spec-section-editorial";
import { PackSetsDialog } from "./pack-sets";
import { PopIn, Reveal, SoftButton, Mascot } from "./bits";
import type { SpecSection } from "@/lib/spectra/notes-types";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the revision pack, in the editorial dress.
   The same assembly — the registry resolves each tick to its
   SpecSection via packGroupsOf, and every section is rendered by
   EditorialSectionView, the very renderer the editorial reader
   uses — set as a document instead of a string of band rooms.
   Mark sections read, fold the statements away, copy the pack,
   print it as a worksheet, or load a saved set. The props
   contract is identical to the classic PackView; the shell swaps
   them without knowing the difference.
   ═══════════════════════════════════════════════════════════════ */

export function PackEditorial({
  onHome,
  onOpenSpec,
  onOpenNotes,
}: {
  onHome: () => void;
  onOpenSpec: () => void;
  onOpenNotes: (docId: string, spec?: string) => void;
}) {
  const { picks, read, sets } = usePacks();
  const [hideStatements, setHideStatements] = useState(false);
  const [setsOpen, setSetsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  /* picks → registry points (syllabus order), grouped by topic —
     the shared derivation, the same pages the rooms dress builds */
  const { points, groups, sectionCount } = useMemo(
    () => packGroupsOf(picks),
    [picks],
  );
  const readCount = useMemo(
    () => points.filter((p) => read.includes(p.spec)).length,
    [points, read],
  );
  const allRead = points.length > 0 && readCount === points.length;

  /* document-wide plate numbering across the pack's reading order */
  const figOffsets = useMemo(() => {
    const flat: SpecSection[] = [];
    for (const g of groups)
      for (const s of g.sections) flat.push(s.point.entries[s.entryIndex].section);
    return figOffsetsOf(flat);
  }, [groups]);
  const flatIndex = (g: PackGroup, si: number) => {
    let n = 0;
    for (const x of groups) {
      if (x.key === g.key) return n + si;
      n += x.sections.length;
    }
    return n;
  };

  const copyPack = useCallback(async () => {
    const text = packToText(picks);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard API unavailable (http / permission) — the old ways */
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* give up quietly — the text is still on screen */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [picks]);

  /* ————— the empty pack ————— */
  if (points.length === 0) {
    return (
      <main className="legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
        <PopIn>
          <SoftButton onClick={onHome} className="min-h-[calc(42px*var(--ui-scale))] px-4 py-2 text-[calc(13.5px*var(--ui-scale))]" ariaLabel="Back home">
            <ArrowLeft className="h-4 w-4" /> Back home
          </SoftButton>
        </PopIn>
        <Reveal delay={0.08} className="mt-14">
          <div className="legal-card mx-auto max-w-[64ch] rounded-[26px] p-7 text-center sm:p-9">
            {/* Bubbles holds the empty shelf — the candy lab's one loan
                to the document room, in the room's own rust */}
            <Mascot main="var(--legal-rust)" mood="idle" size={104} bubbles={false} className="mx-auto" />
            <p className="legal-meta mt-4 justify-center">REVISION PACK</p>
            <h1 className="mt-4 font-display text-[calc(clamp(1.9rem,4.6vw,2.7rem)*(1+(var(--ui-scale)-1)*0.5))] font-semibold tracking-tight text-ink">
              The pack is empty.
            </h1>
            <p className="mx-auto mt-3 max-w-[46ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
              Head to the spec index and tick, say, <strong>2.1</strong> and{" "}
              <strong>3.6</strong> — the notes covering those statements assemble
              here automatically, in syllabus order.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <SoftButton onClick={onOpenSpec} ariaLabel="Browse the spec index">
                <Target className="h-4 w-4" /> Browse the spec index
              </SoftButton>
              {sets.length > 0 && (
                <SoftButton onClick={() => setSetsOpen(true)} ariaLabel="Open your saved revision sets">
                  <Bookmark className="h-4 w-4 text-[var(--legal-rust)]" /> Load a saved set ({sets.length})
                </SoftButton>
              )}
            </div>
          </div>
        </Reveal>
        <PackSetsDialog open={setsOpen} onClose={() => setSetsOpen(false)} />
      </main>
    );
  }

  /* ————— the assembled pack ————— */
  return (
    <main className="pack-editorial legal-room mx-auto max-w-6xl px-4 pt-[calc(6.25rem+var(--sa-top))] pb-24 sm:px-7 lg:px-10">
      {/* ————— hero ————— */}
      <Reveal>
        <section className="legal-hero relative overflow-hidden rounded-[30px] px-6 py-8 sm:px-9 sm:py-10">
          <div className="legal-hero-grain" />
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="legal-kicker">
                <ClipboardList className="h-3.5 w-3.5" /> REVISION PACK
              </span>
              <span className="legal-meta">
                {points.length} SPEC POINT{points.length === 1 ? "" : "S"} · {sectionCount} SECTION{sectionCount === 1 ? "" : "S"} OF NOTES
              </span>
            </div>
            <h1 className="mt-5 max-w-[18ch] font-display text-[calc(clamp(2.65rem,7vw,5.6rem)*(1+(var(--ui-scale)-1)*0.5))] leading-[1.04] font-bold tracking-[-.065em] text-ink">
              One pack. Your spec points<span className="legal-heading-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft">
              Every section below is your normal note — assembled around what
              you ticked, in syllabus order. Mark each one read as you walk it.
            </p>
          </div>
        </section>
      </Reveal>

      {/* picked chips — tap one to let it go */}
      <Reveal delay={0.06}>
        <div className="mt-6 flex items-center gap-3">
          <span className="legal-meta shrink-0">PICKED</span>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {points.map((p) => (
              <button
                key={p.spec}
                type="button"
                onClick={() => togglePick(p.spec)}
                aria-label={`Remove ${p.spec} from your pack`}
                title={`Remove ${p.spec} — ${p.topicLabel}`}
                className="group inline-flex h-[calc(30px*var(--ui-scale))] shrink-0 cursor-pointer items-center gap-2 rounded-[calc(9px*var(--ui-scale))] border border-ink/12 bg-paper/80 px-2.5 font-display text-[calc(12px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
              >
                {p.spec}
                <X className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-90" strokeWidth={2.6} />
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* read progress — the pack's own hairline */}
      <Reveal delay={0.1}>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-[calc(5px*var(--ui-scale))] flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${points.length ? (readCount / points.length) * 100 : 0}%`,
                background: "var(--legal-rust)",
              }}
            />
          </div>
          <span className="legal-meta shrink-0">
            {readCount}/{points.length} READ{allRead ? " · ALL" : ""}
          </span>
        </div>
      </Reveal>

      {/* ————— toolbar ————— */}
      <Reveal delay={0.14} className="no-print mt-5">
        <div className="flex flex-wrap items-center gap-1.5 rounded-[calc(18px*var(--ui-scale))] border border-ink/[0.08] bg-paper/70 p-2">
          <EditorialTool onClick={onOpenSpec} label="Edit selection">
            <Target className="h-4 w-4" /> Edit selection
          </EditorialTool>
          <EditorialTool onClick={() => setSetsOpen(true)} label="Saved revision sets" badge={sets.length}>
            <Bookmark className="h-4 w-4" /> Sets
          </EditorialTool>
          <EditorialTool
            onClick={() => setHideStatements((v) => !v)}
            label={hideStatements ? "Show the verbatim statements" : "Hide the verbatim statements"}
          >
            {hideStatements ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            Statements
          </EditorialTool>
          <EditorialTool onClick={copyPack} label="Copy the pack as plain text" highlight={copied}>
            {copied ? <Check className="h-4 w-4" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy pack"}
          </EditorialTool>
          <EditorialTool onClick={() => window.print()} label="Print this revision pack">
            <Printer className="h-4 w-4" /> Print pack
          </EditorialTool>
          <EditorialTool
            onClick={() => {
              if (confirmClear) {
                clearPicks();
                setConfirmClear(false);
              } else {
                setConfirmClear(true);
              }
            }}
            label="Clear the selection"
            danger={confirmClear}
          >
            <X className="h-4 w-4" strokeWidth={2.6} />
            {confirmClear ? "Sure? Tap again" : "Clear"}
          </EditorialTool>
        </div>
      </Reveal>

      {/* ————— the clauses ————— */}
      <div className="legal-clauses mt-10">
        {groups.map((g, gi) => {
          const groupStart = groups
            .slice(0, gi)
            .reduce((n, x) => n + x.sections.length, 0);
          return (
            <Fragment key={g.key}>
              {/* topic divider — where one topic's stretch begins */}
              <Reveal>
                <div className="mb-2 mt-6 first:mt-0">
                  <p className="legal-meta">
                    {g.topicLabel} — {g.topicTitle} · {g.unitCode} · {g.sections.length} SECTION{g.sections.length === 1 ? "" : "S"}
                  </p>
                  <div className="mt-3 h-px w-full bg-ink/10" />
                </div>
              </Reveal>
              {g.sections.map((s, si) => {
                const band = groupStart + si;
                const accent = accentOf(band);
                const isRead = read.includes(s.point.spec);
                const firstEntry = s.entryIndex === 0;
                return (
                  <Reveal key={`${s.point.spec}#${s.entryIndex}`}>
                    <EditorialSectionView
                        section={s.point.entries[s.entryIndex].section}
                        index={band}
                        total={sectionCount}
                        accent={accent}
                        eyebrow={`SPEC ${s.point.spec} · ${g.topicLabel.toUpperCase()}`}
                        anchorPrefix="spec-"
                        hideStatement={hideStatements}
                        figOffset={figOffsets[flatIndex(g, si)]}
                        bannerAction={
                          <span className="no-print flex items-center gap-2">
                            {firstEntry && (
                              <button
                                type="button"
                                onClick={() => onOpenNotes(s.point.entries[0].docId, s.point.spec)}
                                className="legal-back-link text-[calc(11.5px*var(--ui-scale))]"
                                aria-label={`Open ${s.point.entries[0].title} in the ${g.topicLabel} notes`}
                              >
                                {g.topicLabel} notes <span aria-hidden>→</span>
                              </button>
                            )}
                            <m.button
                              type="button"
                              onClick={() => toggleRead(s.point.spec)}
                              whileTap={{ scale: 0.88 }}
                              aria-pressed={isRead}
                              aria-label={
                                isRead
                                  ? `Mark ${s.point.spec} as not read`
                                  : `Mark ${s.point.spec} as read`
                              }
                              title={isRead ? `${s.point.spec} read` : `Mark ${s.point.spec} read`}
                              className="grid h-[calc(30px*var(--ui-scale))] w-[calc(30px*var(--ui-scale))] shrink-0 cursor-pointer place-items-center rounded-[calc(9px*var(--ui-scale))]"
                              style={
                                isRead
                                  ? {
                                      background: "var(--legal-rust)",
                                      color: "var(--color-paper)",
                                    }
                                  : {
                                      border: "1.5px dashed color-mix(in oklab, var(--color-ink) 30%, transparent)",
                                      color: "var(--color-ink-faint)",
                                    }
                              }
                            >
                              <Check className="h-[calc(14px*var(--ui-scale))] w-[calc(14px*var(--ui-scale))]" strokeWidth={2.6} />
                            </m.button>
                          </span>
                        }
                      />
                  </Reveal>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      {/* ————— end of the pack ————— */}
      <Reveal delay={0.08}>
        <section className="legal-closing mt-10 rounded-[26px] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            <p className="legal-meta">YOUR TURN</p>
          </div>
          {/* Bubbles reads along — idle at the halfway mark, cheering
              the pack's last page in the room's own rust */}
          <div className="mt-4 flex items-end gap-4">
            <p className="max-w-[72ch] flex-1 text-[calc(14px*var(--ui-scale))] leading-[1.9] sm:text-[calc(14.5px*var(--ui-scale))]">
              {allRead
                ? `Pack read — every point, marked off. ${points.length} spec point${points.length === 1 ? "" : "s"} of revision, done. Tick the next batch, or load a saved set and walk it again.`
                : `That's your pack — ${points.length} point${points.length === 1 ? "" : "s"}, read at your pace. The checkbox beside each clause marks it read; the hairline at the top keeps the score.`}
            </p>
            <Mascot
              main="var(--legal-rust)"
              mood={allRead ? "cheer" : "idle"}
              size={72}
              bubbles={false}
              className="shrink-0"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4">
            <span className="legal-meta">END OF PACK · ASSEMBLED FROM THE REVISION NOTES</span>
            <div className="no-print flex flex-wrap items-center gap-x-5 gap-y-2">
              <SoftButton onClick={onOpenSpec} ariaLabel="Edit the selection in the spec index" className="min-h-[calc(40px*var(--ui-scale))] px-4 py-2 text-[calc(13px*var(--ui-scale))]">
                <Target className="h-4 w-4" /> Edit the selection
              </SoftButton>
              <SoftButton onClick={() => setSetsOpen(true)} ariaLabel="Open your saved revision sets" className="min-h-[calc(40px*var(--ui-scale))] px-4 py-2 text-[calc(13px*var(--ui-scale))]">
                <Bookmark className="h-4 w-4" /> Saved sets{sets.length > 0 ? ` (${sets.length})` : ""}
              </SoftButton>
            </div>
          </div>
        </section>
      </Reveal>

      <PackSetsDialog open={setsOpen} onClose={() => setSetsOpen(false)} />
    </main>
  );
}

/* ————— toolbar button, editorially ————— */

function EditorialTool({
  onClick,
  label,
  badge,
  highlight,
  danger,
  children,
}: {
  onClick: () => void;
  label: string;
  badge?: number;
  highlight?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-[calc(36px*var(--ui-scale))] shrink-0 cursor-pointer items-center gap-1.5 rounded-[calc(10px*var(--ui-scale))] px-3 font-display text-[calc(12.5px*var(--ui-scale))] font-bold tracking-[0.02em] transition-colors"
      style={
        highlight
          ? {
              background: "var(--legal-rust)",
              color: "var(--color-paper)",
            }
          : danger
            ? {
                background: "#FF6B6B",
                color: "#fff",
              }
            : {
                background: "color-mix(in oklab, var(--color-ink) 5%, transparent)",
                color: "var(--color-ink-soft)",
              }
      }
    >
      {children}
      {typeof badge === "number" && badge > 0 && (
        <span className="grid h-[calc(18px*var(--ui-scale))] min-w-[calc(18px*var(--ui-scale))] place-items-center rounded-full bg-ink/10 px-1 text-[calc(10.5px*var(--ui-scale))] font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}
