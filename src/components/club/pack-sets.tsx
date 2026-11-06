"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { Bookmark, Check, Copy, X } from "./icons";
import {
  deleteSet,
  loadSet,
  overwriteSet,
  renameSet,
  saveSet,
  usePacks,
  type PackSet,
} from "@/lib/spectra/packs";
import { readableInk, shade } from "./bits";

/* ═══════════════════════════════════════════════════════════════
   Reaction Club · revision sets — named snapshots of your ticked
   spec points, kept in the browser. One dialog, opened from both
   the spec index and the pack itself: save the current selection
   under a name, load a set back (it re-ticks its points), rename
   it, overwrite it with today's ticks, or delete it. The loaded
   set wears a LOADED sash until the ticks drift away from it.
   ═══════════════════════════════════════════════════════════════ */

const samePicks = (a: string[], b: string[]) =>
  [...a].sort().join("|") === [...b].sort().join("|");

const fmtDay = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
};

export function PackSetsDialog({
  open,
  onClose,
  onAfterChange,
}: {
  open: boolean;
  onClose: () => void;
  /** called after a save/load — e.g. to hop to the pack */
  onAfterChange?: () => void;
}) {
  const { picks, sets, activeSetId } = usePacks();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /* which inline editor is open: "save" | `rename:${id}` | `delete:${id}` */
  const [editor, setEditor] = useState<string | null>(null);
  const [name, setName] = useState("");

  const close = useCallback(() => {
    /* fold any inline editor away with the dialog — event-driven, no effects */
    setEditor(null);
    setName("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true });
  }, [open]);

  /* land the caret in whatever name field just opened */
  useEffect(() => {
    if (editor) inputRef.current?.focus();
  }, [editor]);

  const beginSave = () => {
    setEditor("save");
    setName("");
  };
  const commitSave = () => {
    if (picks.length === 0) return;
    saveSet(name || "Untitled set", picks);
    setEditor(null);
    setName("");
  };
  const commitRename = (id: string) => {
    if (name.trim()) renameSet(id, name);
    setEditor(null);
    setName("");
  };
  const remove = (id: string) => {
    deleteSet(id);
    setEditor(null);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            className="fixed inset-0 z-[79] bg-cocoa/30 backdrop-blur-[2px]"
          />
          <m.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-label="Revision sets"
            tabIndex={-1}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="fixed inset-x-3 top-[calc(1rem+var(--sa-top))] z-[80] mx-auto flex max-h-[min(78dvh,560px)] w-auto max-w-[calc(440px*var(--ui-scale))] flex-col rounded-[calc(28px*var(--ui-scale))] bg-paper outline-none sm:inset-x-auto sm:left-1/2 sm:w-[min(calc(440px*var(--ui-scale)),92vw)] sm:-translate-x-1/2"
            style={{
              boxShadow:
                "0 4px 0 var(--edge), 0 30px 60px -24px rgb(0 0 0 / 0.45)",
            }}
          >
            {/* header */}
            <div className="flex items-center gap-3 px-5 pt-4">
              <span
                className="inline-flex shrink-0 -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.08em] uppercase"
                style={{
                  background: "#12B886",
                  color: readableInk("#12B886"),
                  boxShadow: `0 3px 0 ${shade("#12B886")}`,
                }}
              >
                <Bookmark className="h-3.5 w-3.5" /> Revision sets
              </span>
              <p className="min-w-0 flex-1 truncate text-[calc(12.5px*var(--ui-scale))] font-bold text-ink-faint">
                {sets.length > 0
                  ? `${sets.length} saved`
                  : "keep a selection for later"}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close revision sets"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-ink/[0.06] text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
              >
                <X className="h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]" strokeWidth={2.2} />
              </button>
            </div>

            {/* the list */}
            <div
              className="min-h-0 flex-1 overflow-y-auto px-4 py-3"
              style={{ overscrollBehavior: "contain" }}
            >
              {sets.length === 0 && (
                <p className="px-2 py-7 text-center text-[calc(13px*var(--ui-scale))] leading-relaxed font-bold text-ink-faint">
                  No sets yet.
                  <br />
                  Tick some statements, then save them
                  <br />
                  here for later.
                </p>
              )}
              {sets.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {sets.map((s) => (
                    <SetRow
                      key={s.id}
                      s={s}
                      loaded={activeSetId === s.id}
                      currentPicks={picks}
                      editor={editor}
                      inputRef={inputRef}
                      name={name}
                      setName={setName}
                      onBeginRename={() => {
                        setEditor(`rename:${s.id}`);
                        setName(s.name);
                      }}
                      onCommitRename={() => commitRename(s.id)}
                      onToggleDelete={() =>
                        setEditor((e) =>
                          e === `delete:${s.id}` ? null : `delete:${s.id}`,
                        )
                      }
                      onRemove={() => remove(s.id)}
                      onCancel={() => setEditor(null)}
                      onAfterChange={onAfterChange}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* footer — save the current selection */}
            <div className="border-t-2 border-dashed border-ink/10 px-4 py-3">
              {editor === "save" ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitSave();
                      if (e.key === "Escape") setEditor(null);
                    }}
                    placeholder="Name this set — e.g. “Mock paper 2”"
                    aria-label="Name for the current selection"
                    maxLength={48}
                    className="h-10 min-w-0 flex-1 rounded-full bg-ink/[0.05] px-4 text-[calc(13.5px*var(--ui-scale))] font-bold text-ink outline-none placeholder:text-ink-faint/70 focus:bg-ink/[0.08]"
                  />
                  <button
                    type="button"
                    onClick={commitSave}
                    className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-white"
                    style={{
                      background: "#12B886",
                      boxShadow: `0 3px 0 ${shade("#12B886")}`,
                    }}
                    aria-label="Save the current selection as a set"
                  >
                    <Check className="h-[calc(18px*var(--ui-scale))] w-[calc(18px*var(--ui-scale))]" strokeWidth={2.6} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={beginSave}
                  disabled={picks.length === 0}
                  className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full font-display text-[calc(12.5px*var(--ui-scale))] font-bold tracking-[0.06em] uppercase transition-opacity disabled:cursor-default disabled:opacity-40"
                  style={{
                    background: "#12B886",
                    color: readableInk("#12B886"),
                    boxShadow: `0 3px 0 ${shade("#12B886")}`,
                  }}
                >
                  <Copy className="h-4 w-4" />
                  {picks.length > 0
                    ? `Save current selection · ${picks.length} point${picks.length === 1 ? "" : "s"}`
                    : "Nothing ticked yet"}
                </button>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ————— one saved set ————— */

function SetRow({
  s,
  loaded,
  currentPicks,
  editor,
  inputRef,
  name,
  setName,
  onBeginRename,
  onCommitRename,
  onToggleDelete,
  onRemove,
  onCancel,
  onAfterChange,
}: {
  s: PackSet;
  loaded: boolean;
  currentPicks: string[];
  editor: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  name: string;
  setName: (v: string) => void;
  onBeginRename: () => void;
  onCommitRename: () => void;
  onToggleDelete: () => void;
  onRemove: () => void;
  onCancel: () => void;
  onAfterChange?: () => void;
}) {
  const renaming = editor === `rename:${s.id}`;
  const confirming = editor === `delete:${s.id}`;
  const drifts = !samePicks(s.picks, currentPicks);

  if (renaming) {
    return (
      <li className="rounded-[calc(20px*var(--ui-scale))] bg-ink/[0.04] p-3">
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onCommitRename();
            if (e.key === "Escape") onCancel();
          }}
          aria-label={`Rename ${s.name}`}
          maxLength={48}
          className="h-9 w-full rounded-full bg-paper px-3.5 text-[calc(13px*var(--ui-scale))] font-bold text-ink outline-none"
        />
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-8 cursor-pointer rounded-full px-3 text-[calc(12px*var(--ui-scale))] font-bold text-ink-soft hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCommitRename}
            className="h-8 cursor-pointer rounded-full bg-mint px-3.5 text-[calc(12px*var(--ui-scale))] font-bold text-white"
            style={{ background: "#12B886" }}
          >
            Save name
          </button>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`rounded-[calc(20px*var(--ui-scale))] p-3 ${loaded ? "bg-mint/10" : "bg-ink/[0.04]"}`}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            loadSet(s.id);
            onAfterChange?.();
          }}
          className="min-w-0 flex-1 cursor-pointer text-left"
          aria-label={`Load set ${s.name} — ${s.picks.length} points`}
        >
          <span className="flex items-center gap-2">
            <span className="truncate font-display text-[calc(14px*var(--ui-scale))] font-bold text-ink">
              {s.name}
            </span>
            {loaded && (
              <span
                className="shrink-0 rounded-full px-2 py-0.5 font-display text-[calc(9.5px*var(--ui-scale))] font-bold tracking-[0.1em] text-white uppercase"
                style={{ background: "#12B886" }}
              >
                Loaded
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-faint">
            {s.picks.length} point{s.picks.length === 1 ? "" : "s"} ·{" "}
            {fmtDay(s.savedAt)}
          </span>
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {loaded ? (
          drifts && (
            <button
              type="button"
              onClick={() => {
                overwriteSet(s.id, currentPicks);
                onAfterChange?.();
              }}
              className="h-8 cursor-pointer rounded-full bg-ink/[0.06] px-3 text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
            >
              Overwrite with current
            </button>
          )
        ) : (
          <span className="text-[calc(11px*var(--ui-scale))] font-bold text-ink-faint/80">
            tap the name to load its ticks
          </span>
        )}
        <button
          type="button"
          onClick={onBeginRename}
          className="ml-auto h-8 cursor-pointer rounded-full bg-ink/[0.06] px-3 text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:bg-ink/[0.11] hover:text-ink"
        >
          Rename
        </button>
        {confirming ? (
          <button
            type="button"
            onClick={onRemove}
            className="h-8 cursor-pointer rounded-full px-3 text-[calc(11.5px*var(--ui-scale))] font-bold text-white"
            style={{ background: "#FF6B6B" }}
          >
            Delete for good
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleDelete}
            className="h-8 cursor-pointer rounded-full bg-ink/[0.06] px-3 text-[calc(11.5px*var(--ui-scale))] font-bold text-ink-soft transition-colors hover:bg-coral/15 hover:text-coral"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
