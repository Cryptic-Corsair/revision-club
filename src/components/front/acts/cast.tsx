"use client";

import { useCallback, useRef, useState } from "react";
import { ChapHead } from "../chap";
import { ROW_A, ROW_B, CAT_LABEL, CAT_COLOR, type Element } from "../elements";

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · chapter 01 — the cast

   118 things exist; the spec makes you meet 36 of them before AS
   is over. Two rows of element tiles counter-drift forever, pause
   when you reach in, and a popover names whoever you point at.
   Mechanism: pure CSS marquee + DOM hover — nothing scrubs here,
   which is exactly why it feels different from the chapters either
   side of it.
   ═══════════════════════════════════════════════════════════════ */

function Tile({ el }: { el: Element }) {
  const tint = CAT_COLOR[el.cat];
  return (
    <div className="fr-tile" data-tile style={{ ["--tint" as string]: tint }}>
      <span className="fr-tile-z f-mono">{el.z}</span>
      <span className="fr-tile-sym">{el.sym}</span>
    </div>
  );
}

function Row({
  els,
  reverse,
  onHover,
}: {
  els: Element[];
  reverse: boolean;
  onHover: (el: Element | null, x: number, y: number) => void;
}) {
  return (
    <div className="fr-marquee" data-marquee>
      <div
        className={`fr-marquee-track ${reverse ? "fr-marquee-rev" : ""}`}
      >
        {[0, 1].map((k) => (
          <div key={k} className="fr-marquee-seq">
            {els.map((el) => (
              <div
                key={`${k}-${el.z}`}
                className="fr-tile-hit"
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") onHover(el, e.clientX, e.clientY);
                }}
                onPointerMove={(e) => {
                  if (e.pointerType === "mouse" && e.buttons === 0)
                    onHover(el, e.clientX, e.clientY);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") onHover(null, 0, 0);
                }}
              >
                <Tile el={el} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Cast() {
  const [tip, setTip] = useState<(Element & { x: number; y: number }) | null>(
    null,
  );
  const tipRef = useRef<HTMLDivElement>(null);

  const onHover = useCallback(
    (el: Element | null, x: number, y: number) => {
      if (!el) {
        setTip(null);
        return;
      }
      setTip({ ...el, x, y });
    },
    [],
  );

  /* the popover trails the pointer with a light ease */
  const onMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t));
  }, []);

  return (
    <section
      className="fr-chap fr-cast"
      data-act="1"
      id="fr-cast"
      onPointerMove={onMove}
    >
      <ChapHead
        n="01"
        kicker="THE CAST · ATOMIC STRUCTURE & THE PERIODIC TABLE"
        accent="var(--color-grape)"
        title={
          <>
            118 things exist.
            <br />
            <em>You meet 36 before AS is over.</em>
          </>
        }
        lede="Every element is a character with a fixed personality: one proton count, one temper. Learn the first thirty-six and the rest of the table is pattern, not memory."
      />

      <div className="fr-cast-rows">
        <Row els={ROW_A} reverse={false} onHover={onHover} />
        <Row els={ROW_B} reverse onHover={onHover} />
      </div>

      <div className="fr-cast-legend" aria-hidden>
        {Object.entries(CAT_LABEL).map(([k, label]) => (
          <span key={k} className="f-mono">
            <i style={{ background: CAT_COLOR[k] }} />
            {label}
          </span>
        ))}
      </div>

      {tip && (
        <div
          ref={tipRef}
          className="fr-tip"
          aria-hidden
          style={{
            transform: `translate3d(${tip.x + (tip.x > window.innerWidth - 240 ? -224 : 20)}px, ${tip.y - 24}px, 0)`,
          }}
        >
          <span className="fr-tip-sym" style={{ color: CAT_COLOR[tip.cat] }}>
            {tip.sym}
          </span>
          <span className="fr-tip-name f-mono">
            {tip.name} · {tip.z}
          </span>
          <span className="fr-tip-cat f-mono" style={{ color: CAT_COLOR[tip.cat] }}>
            {CAT_LABEL[tip.cat]}
          </span>
        </div>
      )}
    </section>
  );
}
