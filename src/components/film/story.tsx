"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { stage, filmScroll } from "./stage";
import { Chars } from "./chars";
import Atlas from "./atlas";

/* ═══════════════════════════════════════════════════════════════
   THE FILM · the story — hero, four pinned chapters, the atlas

   Every chapter is one pinned viewport scrubbed across ~180% of
   scroll. Its timeline does exactly four jobs, in this order:
     1. morphs the particle sky from the previous formation,
     2. springs the headline in char by char,
     3. settles the lede and the data chips,
     4. breathes everything out so the next formation arrives on
        an empty stage.
   DOM animation is transform/opacity only — no layout properties
   are ever touched — and each chapter's tweens live inside their
   own gsap.context so a hot reload or unmount reverts cleanly.
   ═══════════════════════════════════════════════════════════════ */

/* ————— char splitter ————— — moved to chars.tsx */

type Segment = { t: string; o?: boolean };

const HEAD_CLS =
  "f-ch-head f-display font-extrabold uppercase leading-[1.02] tracking-[-0.015em] text-[clamp(1.55rem,5.8vw,5.7rem)]";

/* ————— the hero ————— */
function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const ctx = gsap.context(() => {
      /* the film rolls: hero out on scroll */
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })
        .to(".f-hero-inner", { y: -150, ease: "none" }, 0)
        .to(".f-hero-inner", { opacity: 0, ease: "none", duration: 0.7 }, 0.15)
        .to(".f-hero-cue", { opacity: 0, ease: "none", duration: 0.25 }, 0)
        .to(".f-hero-tag", { opacity: 0, ease: "none", duration: 0.3 }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  /* the load-in — plays as the veil lifts */
  useEffect(() => {
    if (!ready || !stage.motion) return;
    const el = ref.current!;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".f-hero-kicker",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.05,
        )
        .fromTo(
          ".f-hero-lead .f-char",
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02 },
          0.15,
        )
        .fromTo(
          ".f-hero-big .f-char",
          { yPercent: 128, rotate: 9, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 1.15, ease: "back.out(1.45)", stagger: 0.05 },
          0.3,
        )
        .fromTo(
          ".f-hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.05,
        )
        .fromTo(
          ".f-hero-cue, .f-hero-tag",
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          1.3,
        );
    }, el);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="film-hero"
      ref={ref}
      className="relative z-10 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="f-hero-inner flex flex-col items-center">
        <p className="f-hero-kicker f-mono text-[10px] text-white/60 sm:text-[11px]">
          IAL·CHEM presents
        </p>
        <p
          className="f-hero-lead f-display mt-7 text-[clamp(1.05rem,2.3vw,1.85rem)] font-medium uppercase tracking-[0.32em] text-white/85"
          aria-label="Everything is"
        >
          <span aria-hidden>
            <Chars text="EVERYTHING IS" />
          </span>
        </p>
        <h1
          className="f-hero-big f-display mt-1 whitespace-nowrap text-[clamp(1.9rem,8.7vw,8.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]"
          aria-label="Chemistry"
        >
          <span aria-hidden>
            <Chars text="CHEMISTRY" />
          </span>
        </h1>
        <p className="f-hero-sub mt-9 w-full max-w-[54ch] font-light text-[clamp(0.95rem,1.35vw,1.15rem)] leading-[1.85] text-white/65">
          The whole of Edexcel IAL Chemistry — the atoms, the bonds, the
          energy, the life — retold as one moving picture. Scroll to roll
          the film. The eighteen chapters wait at the end.
        </p>
      </div>
      <div className="f-hero-cue absolute inset-x-0 bottom-9 flex flex-col items-center gap-3.5">
        <span className="f-mono text-[9px] text-white/50">Roll film</span>
        <span className="f-cue-line" aria-hidden />
      </div>
      <span className="f-hero-tag f-mono absolute bottom-9 left-6 hidden text-[9px] text-white/40 sm:left-10 sm:block">
        35mm · WebGL
      </span>
      <span className="f-hero-tag f-mono absolute bottom-9 right-6 hidden text-[9px] text-white/40 sm:right-10 sm:block">
        Runtime · one syllabus
      </span>
    </section>
  );
}

/* ————— one pinned chapter ————— */
function Chapter({
  idx,
  num,
  kicker,
  head,
  lede,
  chips,
  flash,
  onActive,
  onTimeline,
}: {
  idx: number;
  num: string;
  kicker: string;
  head: Segment[];
  lede: ReactNode;
  chips: ReactNode[];
  /** chapter III's exothermic flash */
  flash?: boolean;
  onActive: (idx: number) => void;
  onTimeline?: (tl: gsap.core.Timeline, q: gsap.utils.SelectorFunc) => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current!;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sec);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=180%",
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          onToggle: (self) => self.isActive && onActive(idx - 1),
          /* the morph is written, not tweened — one shared stage float
             driven by absolute, continuous ranges (chapter N's end is
             chapter N+1's start, so the value never double-writes) */
          onUpdate: (self) => {
            stage.target = idx - 1 + Math.min(self.progress / 0.22, 1);
          },
          onRefresh: (self) => {
            filmScroll.starts[idx - 1] = self.start;
          },
        },
      });

      /* 1 · the morph — written by onUpdate above (first 22% of the
         pin carries the sky from the previous formation into this
         one); the tweens below own only the typography */

      /* 2 · the title arrives */
      tl.fromTo(
        q(".f-ch-kicker"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.07, ease: "power2.out" },
        0.03,
      );
      tl.fromTo(
        q(".f-ch-head .f-char"),
        { yPercent: 132, rotate: 9, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 0.13, stagger: 0.014, ease: "power2.out" },
        0.05,
      );

      /* 3 · the argument settles */
      tl.fromTo(
        q(".f-ch-lede"),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" },
        0.18,
      );
      tl.fromTo(
        q(".f-chip"),
        { opacity: 0, y: 26, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.08, stagger: 0.035, ease: "power1.out" },
        0.28,
      );

      /* the numeral drifts through the whole chapter */
      tl.fromTo(q(".f-ch-num"), { yPercent: 26 }, { yPercent: -26, duration: 1 }, 0);
      tl.fromTo(q(".f-ch-num"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.02);
      tl.to(q(".f-ch-num"), { opacity: 0, duration: 0.2 }, 0.78);

      /* extras — chapter III's flash and its live receipt */
      if (flash) {
        tl.to(stage, { energy: 1, duration: 0.05, ease: "power2.in" }, 0.3);
        tl.to(stage, { energy: 0, duration: 0.12, ease: "power2.out" }, 0.44);
      }
      onTimeline?.(tl, q);

      /* 4 · breathe out — the stage empties for the next formation */
      tl.to(
        q(".f-ch-copy"),
        { y: -80, opacity: 0, duration: 0.12, ease: "power1.in" },
        0.86,
      );
      tl.to(q(".f-ch-num"), { opacity: 0, duration: 0.1 }, 0.86);
    }, sec);
    return () => ctx.revert();
  }, [idx, onActive, onTimeline]);

  return (
    <section
      id={`film-ch-${idx}`}
      ref={ref}
      className="relative z-10 h-[100svh] overflow-hidden"
    >
      {/* the giant numeral — background, outlined, drifting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center justify-items-end pr-[2vw]"
      >
        <span className="f-ch-num f-display f-outline-thin select-none font-extrabold leading-none text-[clamp(11rem,25vw,19rem)]">
          {num}
        </span>
      </div>

      <div className="f-ch-copy relative z-10 flex h-full flex-col justify-center gap-7 px-6 sm:px-14 lg:px-24">
        <div className="f-ch-kicker flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-white/40" />
          <span className="f-mono text-[10px] text-white/70 sm:text-[11px]">
            {kicker}
          </span>
        </div>
        <h2 className={HEAD_CLS} aria-label={head.map((s) => s.t).join("")}>
          <span aria-hidden>
            {head.map((s, i) => (
              <span key={i} className="block whitespace-nowrap">
                <Chars text={s.t} outline={s.o} />
              </span>
            ))}
          </span>
        </h2>
        <p className="f-ch-lede max-w-[46ch] font-light text-[clamp(1rem,1.45vw,1.26rem)] leading-[1.8] text-white/65">
          {lede}
        </p>
        <div className="flex flex-wrap gap-2.5">{chips}</div>
      </div>
    </section>
  );
}

/* ————— the film's colophon ————— */
function FilmFooter() {
  const toTop = () => {
    if (stage.motion) gsap.to(window, { duration: 1.4, scrollTo: 0, ease: "power2.inOut" });
    else window.scrollTo(0, 0);
  };
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 pb-28 pt-14 sm:px-14">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="f-mono text-[9px] text-white/50">
            IAL CHEM — for the 2018 Edexcel IAL Chemistry specification
          </p>
          <p className="f-mono mt-2.5 text-[9px] text-white/30">
            Set in Syne &amp; Space Grotesk · drawn live in WebGL · no two
            frames alike
          </p>
        </div>
        <button
          type="button"
          onClick={toTop}
          className="f-mono cursor-pointer border border-white/25 px-5 py-2.5 text-[9px] text-white/80 transition-colors hover:border-white/70"
        >
          Back to the top ↑
        </button>
      </div>
    </footer>
  );
}

/* ————— the whole reel ————— */
export function Story({
  ready,
  onActive,
  onOpenDoc,
}: {
  ready: boolean;
  onActive: (i: number) => void;
  onOpenDoc: (docId: string) => void;
}) {
  /* chapter III's live ΔH receipt */
  const onEnergyTl = useCallback(
    (tl: gsap.core.Timeline, q: gsap.utils.SelectorFunc) => {
      const obj = { v: 0 };
      tl.fromTo(
        obj,
        { v: 0 },
        {
          v: 1,
          duration: 0.12,
          ease: "none",
          onUpdate: () => {
            const el = q(".f-dh")[0] as HTMLElement | undefined;
            if (el) el.textContent = String(Math.round(-890 * obj.v));
          },
        },
        0.3,
      );
    },
    [],
  );

  return (
    <div className="relative z-10">
      <Hero ready={ready} />

      <Chapter
        idx={1}
        num="01"
        kicker="Chapter I · Atomic structure"
        head={[{ t: "EVERYTHING IS" }, { t: "118 THINGS", o: true }]}
        lede={
          <>
            Every star, every cell, every page of this syllabus — the same
            short list of matter, endlessly rearranged. Chemistry is the
            grammar of that rearrangement, and it starts here: a nucleus,
            some shells, and rules for filling them.
          </>
        }
        chips={[
          <span key="a" className="f-chip f-mono text-[9.5px] text-white/75">118 elements</span>,
          <span key="b" className="f-chip f-mono text-[9.5px] text-white/75">≈90 found in nature</span>,
          <span key="c" className="f-chip f-mono text-[9.5px] text-white/75">one of them is carbon</span>,
        ]}
        onActive={onActive}
      />

      <Chapter
        idx={2}
        num="02"
        kicker="Chapter II · Bonding & structure"
        head={[{ t: "NOTHING" }, { t: "STANDS ALONE", o: true }]}
        lede={
          <>
            Electrons are the glue of the universe — shared, stolen or
            pooled. Six carbons can hold hands in a ring and never let go;
            that ring sits under perfume, polymers, paracetamol and one
            famous dream of a snake.
          </>
        }
        chips={[
          <span key="a" className="f-chip f-mono text-[9.5px] text-white/75">C<sub>6</sub>H<sub>6</sub> · the benzene ring</span>,
          <span key="b" className="f-chip f-mono text-[9.5px] text-white/75">12 σ bonds</span>,
          <span key="c" className="f-chip f-mono text-[9.5px] text-white/75">3 π clouds</span>,
        ]}
        onActive={onActive}
      />

      <Chapter
        idx={3}
        num="03"
        kicker="Chapter III · Energetics"
        head={[{ t: "EVERY CHANGE" }, { t: "HAS A PRICE", o: true }]}
        lede={
          <>
            Break bonds — pay. Form bonds — get paid back. The receipt is
            ΔH, and for burning methane it reads like this, live:
          </>
        }
        chips={[
          <span key="a" className="f-chip f-mono text-[9.5px] text-white/85">
            ΔH = <span className="f-dh text-white">−890</span> kJ mol<sup className="text-[0.65em]">−1</sup>
          </span>,
          <span key="b" className="f-chip f-mono text-[9.5px] text-white/75">
            CH<sub>4</sub> + 2O<sub>2</sub> → CO<sub>2</sub> + 2H<sub>2</sub>O
          </span>,
          <span key="c" className="f-chip f-mono text-[9.5px] text-white/75">exothermic · ΔH &lt; 0</span>,
        ]}
        flash
        onActive={onActive}
        onTimeline={onEnergyTl}
      />

      <Chapter
        idx={4}
        num="04"
        kicker="Chapter IV · Organic chemistry"
        head={[{ t: "THEN IT" }, { t: "WRITES YOU", o: true }]}
        lede={
          <>
            Carbon chains — straight, branched, ringed, doubled — braided
            with hydrogen, oxygen and nitrogen into molecules that copy
            themselves. Ninety-six percent of you, written in four letters.
          </>
        }
        chips={[
          <span key="a" className="f-chip f-mono text-[9.5px] text-white/75">C · H · O · N</span>,
          <span key="b" className="f-chip f-mono text-[9.5px] text-white/75">96% of you</span>,
          <span key="c" className="f-chip f-mono text-[9.5px] text-white/75">and isomers count too</span>,
        ]}
        onActive={onActive}
      />

      <Atlas onOpenDoc={onOpenDoc} onActive={onActive} />
      <FilmFooter />
    </div>
  );
}
