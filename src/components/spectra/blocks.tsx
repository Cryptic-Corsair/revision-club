"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Fmt } from "./format";
import type { Block } from "@/lib/spectra/types";

/* ═══════════════════════════════════════════════════════════════
   SPECTRA · block renderer — the reading experience
   ═══════════════════════════════════════════════════════════════ */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => el.classList.add("in"), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, tone = "flame" }: { children: ReactNode; tone?: "flame" | "ink" }) {
  return (
    <div
      className={`mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] ${
        tone === "flame" ? "text-flame" : "text-ink-3"
      }`}
    >
      {children}
    </div>
  );
}

/* ————— check questions with hidden answers ————— */

function CheckBlock({ qs, idPrefix }: { qs: { q: string; a: string }[]; idPrefix: string }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <div className="rounded-[4px] border border-line bg-bg-raise p-5 sm:p-6">
      <Eyebrow>Check yourself</Eyebrow>
      <div className="mt-3 space-y-4">
        {qs.map((item, i) => (
          <div key={i} className="border-b border-line-soft pb-4 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-[11px] font-semibold text-flame">
                Q{i + 1}
              </span>
              <p className="text-[15.5px] leading-relaxed text-ink">
                <Fmt text={item.q} />
              </p>
            </div>
            <button
              type="button"
              aria-expanded={!!open[i]}
              aria-controls={`${idPrefix}-a${i}`}
              onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
              className="mt-2 ml-8 inline-flex items-center gap-1.5 rounded-[3px] border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 transition-colors hover:border-flame hover:text-flame"
            >
              {open[i] ? "Hide answer" : "Reveal answer"}
              <span aria-hidden className="text-[9px]">
                {open[i] ? "▴" : "▾"}
              </span>
            </button>
            {open[i] && (
              <div
                id={`${idPrefix}-a${i}`}
                className="mt-3 ml-8 rounded-[3px] border-l-2 border-flame bg-panel px-4 py-3 text-[14.5px] leading-relaxed text-ink-2"
              >
                <Fmt text={item.a} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ————— the blocks ————— */

export function BlockView({
  block,
  idPrefix,
}: {
  block: Block;
  idPrefix: string;
}) {
  switch (block.k) {
    case "p":
      return (
        <p className="max-w-[72ch] text-[16px] leading-[1.85] text-ink-2">
          <Fmt text={block.text} />
        </p>
      );

    case "def":
      return (
        <div className="max-w-[72ch] rounded-[4px] border border-line border-l-2 border-l-flame bg-bg-raise px-5 py-4">
          <Eyebrow>Definition</Eyebrow>
          <div className="font-serif text-[19px] italic leading-snug text-ink">
            <Fmt text={block.term} />
          </div>
          <p className="mt-2 text-[15px] leading-[1.75] text-ink-2">
            <Fmt text={block.text} />
          </p>
        </div>
      );

    case "eq":
      return (
        <div className="max-w-[72ch] rounded-[4px] border border-line bg-panel px-5 py-4">
          {block.title && <Eyebrow tone="ink">{block.title}</Eyebrow>}
          <div className="overflow-x-auto rounded-[3px] bg-bg px-4 py-3.5 text-center font-mono text-[14.5px] leading-loose text-ink">
            <Fmt text={block.eq} />
          </div>
          {block.note && (
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-3">
              <Fmt text={block.note} />
            </p>
          )}
          {block.ok && (
            <div className="mt-3 flex flex-wrap gap-2">
              {block.ok.map((chip) => (
                <span
                  key={chip}
                  className="rounded-[2px] border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case "ex":
      return (
        <div className="max-w-[72ch] rounded-[4px] border border-line bg-bg-raise px-5 py-5">
          <Eyebrow>Worked example</Eyebrow>
          <div className="text-[17px] font-semibold leading-snug text-ink">
            <Fmt text={block.title} />
          </div>
          <ol className="mt-4 space-y-3">
            {block.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-flame/50 font-mono text-[10px] text-flame">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-[1.75] text-ink-2">
                  <Fmt text={step} />
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-[3px] border border-dashed border-line bg-panel px-4 py-3">
            <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-flame">
              Answer
            </span>
            <span className="text-[15px] leading-relaxed text-ink">
              <Fmt text={block.answer} />
            </span>
          </div>
        </div>
      );

    case "tips":
      return (
        <div className="max-w-[72ch] rounded-[4px] border border-line bg-panel px-5 py-5">
          <Eyebrow>Examiner&rsquo;s notes</Eyebrow>
          <ul className="mt-2 space-y-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[9px] h-[5px] w-[5px] shrink-0 rotate-45 bg-flame" />
                <p className="text-[14.5px] leading-[1.75] text-ink-2">
                  <Fmt text={item} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <figure className="max-w-[76ch]">
          <div className="overflow-x-auto rounded-[4px] border border-line">
            <table className="w-full min-w-[520px] border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-line bg-panel">
                  {block.head.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3"
                    >
                      <Fmt text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-b border-line-soft last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2.5 align-top leading-relaxed text-ink-2">
                        <Fmt text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
              <Fmt text={block.caption} />
            </figcaption>
          )}
        </figure>
      );

    case "check":
      return <CheckBlock qs={block.qs} idPrefix={idPrefix} />;

    case "recap":
      return (
        <div className="max-w-[72ch] rounded-[4px] border border-line bg-bg-raise px-5 py-5">
          <Eyebrow>Recap</Eyebrow>
          <ol className="mt-2 space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-[11px] font-semibold text-flame">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[14.5px] leading-[1.7] text-ink-2">
                  <Fmt text={item} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      );

    default:
      return null;
  }
}

export function TopicBlocks({ blocks, idPrefix }: { blocks: Block[]; idPrefix: string }) {
  return (
    <div className="space-y-7">
      {blocks.map((b, i) => (
        <Reveal key={i} delay={Math.min(i, 4) * 40}>
          <BlockView block={b} idPrefix={`${idPrefix}-${i}`} />
        </Reveal>
      ))}
    </div>
  );
}
