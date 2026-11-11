"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapHead } from "../chap";
import { motionGate } from "../gate";
import { NOTES_META } from "@/lib/spectra/notes-meta";
import { UNITS } from "@/lib/spectra/units";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* station numbers are a pure function of the static index —
   computed once at module scope, never mutated during render */
const STATION_NUM = new Map<string, number>();
{
  let n = 0;
  for (const m of NOTES_META) {
    n += 1;
    STATION_NUM.set(m.id, n);
  }
}

/* ═══════════════════════════════════════════════════════════════
   THE FRONT · ✦ the atlas — eighteen stations

   The work index. Every revision note the club holds, listed the
   way an agency lists its work: numbered rows, unit colour tags,
   spec ranges — and on hover a preview card chases the cursor.
   A row click hands the document to the reader and the front
   steps aside. Desktop gets the chase; touch gets straight in.
   ═══════════════════════════════════════════════════════════════ */

export default function Atlas({
  onOpenDoc,
}: {
  onOpenDoc: (id: string) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<{
    title: string;
    kicker: string;
    spec: string;
    unit: string;
    tint: string;
  } | null>(null);

  /* rows rise in batches as they enter */
  useEffect(() => {
    if (!motionGate()) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      /* pre-state explicitly — nothing shows before its cue */
      const rows = el.querySelectorAll(".fr-station");
      const groups = el.querySelectorAll(".fr-unit-group");
      gsap.set(rows, { y: 34, opacity: 0 });
      gsap.set(groups, { opacity: 0, y: 20 });

      ScrollTrigger.batch(rows, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
            overwrite: true,
          }),
      });
      gsap.to(groups, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  /* the preview card chases the pointer */
  useEffect(() => {
    if (!preview || !motionGate()) return;
    const card = prevRef.current;
    if (!card) return;
    const qx = gsap.quickTo(card, "x", { duration: 0.35, ease: "power3" });
    const qy = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      const flip = e.clientX > window.innerWidth - 340;
      qx(e.clientX + (flip ? -320 : 26));
      qy(e.clientY - 40);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [preview]);

  const open = useCallback(
    (id: string) => onOpenDoc(id),
    [onOpenDoc],
  );

  const groups = UNITS.filter((u) =>
    NOTES_META.some((m) => m.unitCode === u.code),
  );

  return (
    <section ref={root} className="fr-chap fr-atlas" data-act="5" id="fr-atlas">
      <ChapHead
        n="✦"
        kicker="THE ATLAS · THE WHOLE SYLLABUS"
        accent="var(--color-bubble)"
        title={
          <>
            Eighteen stations.
            <em> Spec by spec, start to finish.</em>
          </>
        }
        lede="Five ideas in — here is the territory itself. Every station is a complete class note: definitions, equations, worked examples, written to the 2018 specification."
      />

      {groups.map((u) => (
        <div key={u.code} className="fr-unit-group">
          <div className="fr-unit-head">
            <i className="fr-unit-dot" style={{ background: u.candy.main }} />
            <span className="f-mono">{u.code}</span>
            <span className="fr-unit-title">{u.shortTitle}</span>
            <span className="f-mono fr-unit-range">{u.topicRange}</span>
          </div>

          {NOTES_META.filter((m) => m.unitCode === u.code).map((m) => {
            const n = STATION_NUM.get(m.id) ?? 0;
            return (
              <button
                key={m.id}
                type="button"
                data-cursor="view"
                className="fr-station"
                style={{ ["--tint" as string]: u.candy.main }}
                onClick={() => open(m.id)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse" || !motionGate()) return;
                  setPreview({
                    title: m.title,
                    kicker: m.kicker,
                    spec: m.specRange,
                    unit: u.code,
                    tint: u.candy.main,
                  });
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== "mouse") return;
                  setPreview(null);
                }}
              >
                <span className="fr-station-n f-mono">
                  {String(n).padStart(2, "0")}
                </span>
                <span className="fr-station-title">{m.title}</span>
                <span className="fr-station-meta f-mono">{m.specRange}</span>
                <svg className="fr-station-arrow" viewBox="0 0 16 16" aria-hidden>
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </button>
            );
          })}
        </div>
      ))}

      {preview && (
        <div ref={prevRef} className="fr-preview" aria-hidden>
          <span className="f-mono" style={{ color: preview.tint }}>
            {preview.unit} · spec {preview.spec}
          </span>
          <strong>{preview.title}</strong>
          <span className="fr-preview-kicker f-mono">{preview.kicker}</span>
        </div>
      )}
    </section>
  );
}
