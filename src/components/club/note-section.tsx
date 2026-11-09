"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  Check,
  ChevronDown,
  Lightbulb,
  ListChecks,
  StickyNote,
  Target,
} from "./icons";
import type { NotesBlock, SpecSection } from "@/lib/spectra/notes-types";
import { Fmt } from "./format";
import { fade, Kicker, liftWash, Reveal, ScrollFade, readableInk, shade, sunkWash, tint } from "./bits";
import { inkMix } from "./bands";
import {
  FigAtom,
  FigBondH2O,
  FigBoxesC,
  FigBoxesS,
  FigCalorimetry,
  FigCarbonLattices,
  FigCarbocation,
  FigCoolingCurve,
  FigDipoles,
  FigDotCross,
  FigElecAdd,
  FigEz,
  FigFillDemo,
  FigFillOrder,
  FigFormulaTypes,
  FigFracCol,
  FigGeometric,
  FigHessButane,
  FigHessCaco3,
  FigHessCh4,
  FigHessCo,
  FigHessGeneral,
  FigIeGraph,
  FigIsomers,
  FigLevels,
  FigMassSpec,
  FigMelting,
  FigNotation,
  FigOrbitals,
  FigPolymer,
  FigProfiles,
  FigPtBlocks,
  FigNaming,
  FigRadius,
  FigRadChain,
  FigShapes,
  FigShielding,
  FigSigmaPi,
  FigSp2,
  FigSpectrumBoron,
  FigSpectrumBromine,
  FigSpectrumCl2,
  FigSpectrumEthanol,
  FigMsButane,
  FigMsPropanal,
  FigMsEthaneFrags,
  FigMsIsoC,
  FigMsIsoBr,
  FigMsIsoCl,
  FigIrVibrations,
  FigIrAxes,
  FigIrButanone,
  FigIrEthanol,
  FigIrPropanoic,
  FigIrPropene,
  FigIrHalides,
  FigIrAmines,
  FigSpectrumNeon,
  FigSuccIe,
  FigThermo,
  FigLondon,
  FigContact,
  FigHbondWater,
  FigHbondNh3,
  FigHbondHf,
  FigDimer,
  FigViscosity,
  FigHydrides,
  FigIce,
  FigHydration,
  FigEthanolWater,
  FigSolubility,
  FigMixing,
  FigETransfer,
  FigAgents,
  FigDisprop,
  FigIeDownGroup,
  FigG2Solubility,
  FigPolarise,
  FigFlameEtc,
  FigFlameColours,
  FigThermalExp,
  FigTitrationRig,
  FigStdSolution,
  FigTitreTargets,
  FigG7Trends,
  FigHalogenColours,
  FigDisplacement,
  FigCl2Fates,
  FigH2so4Ladder,
  FigHalideTest,
  FigRateFactors,
  FigCo2Curves,
  FigOrientation,
  FigRateGraphs,
  FigMbCurve,
  FigMbTemperature,
  FigCatalystProfile,
  FigMbCatalyst,
  FigHetCatalyst,
  FigEqDynamic,
  FigEqChromate,
  FigEqPressure,
  FigEqTemperature,
  FigEqConflict,
  FigEqHaber,
  FigEqContact,
  FigHxIsomers,
  FigHxClasses,
  FigHxBond,
  FigHxCarbocation,
  FigHxReflux,
  FigHxScheme,
  FigHxHydrolysis,
  FigHxSn2Oh,
  FigHxSn2Nh3,
  FigAlcAngles,
  FigAlcClasses,
  FigAlcSolubility,
  FigAlcDehydration,
  FigAlcOxFlow,
  FigAlcDistillation,
  FigAlcReflux,
  FigAlcFractional,
  FigAlcFunnel,
  FigAlcBp,
} from "./notes-figures";

/* ═══════════════════════════════════════════════════════════════
   IAL CHEM · the note section renderer — the one true way a
   spec section looks, wherever it appears.

   The note reader and the revision pack both render <SpecSectionView/>:
   same spec banner, same statement card, same blocks. A section is
   written once and integrates anywhere without changing anything —
   the caller only chooses the accent (its place in the band walk)
   and whether the verbatim statement card shows.

   Width is a two-tier system, identical in both layouts:
   · every component — statement, note, definition, equation, wow,
     worked plate, steps panel, figure, table — spans the full
     column, flush with the spec banner and the subhead rules;
   · running prose keeps a reading measure (68ch of its own size),
     and long text INSIDE a plate settles at 62ch so a wide card
     never drags its lines wide with it.

   Extracted verbatim from notes-reader.tsx when the pack arrived;
   nothing about how a section reads has changed.
   ═══════════════════════════════════════════════════════════════ */

/* ————— the rooms gradient recipes —————
   Two moves, shared by every component, so the light reads as the
   document's own rather than sticker decor:

   · the ambient wash — the section's colour breathing into one
     corner of a plate at 6–8% and gone by mid-card. Every plate
     wears it; that is what makes it ambience and not an effect.
   · the accent fall — small filled things (the spec pill, the step
     chips, the toggle's chevron well) sink from the accent toward
     its shade, so the lift reads as light from above.

   All mixes run through the lab-aware tokens, so each of the four
   labs grades its own light from the same recipe. */

const ambientWash = (accent: string, pct = 8) =>
  `radial-gradient(120% 92% at 100% 0%, color-mix(in oklab, ${accent} ${pct}%, transparent), transparent 55%)`;

const accentFall = (accent: string) =>
  `linear-gradient(160deg, ${accent}, ${shade(accent)})`;

/* ————— one specification section — a room with its own colour ————— */

export function SpecSectionView({
  section,
  accent,
  hideStatement = false,
  bannerAction,
}: {
  section: SpecSection;
  accent: string;
  /** revision packs can fold the official wording away */
  hideStatement?: boolean;
  /** optional extra control at the end of the banner rule — the
      reader parks its pack tick there; other callers pass nothing,
      so a section renders identically everywhere by default */
  bannerAction?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-7">
      {/* spec banner — the official wording, stated above the section.
          v3: the pill keeps its tilt and hard shadow, the rule beside
          it is a divided line, and a quiet clause rule parts the
          banner from the body. v3.1: the pill's fill falls from the
          accent toward its shade — light from above — and the tick
          dissolves rightward instead of stopping dead. */}
      <div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex shrink-0 -rotate-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[calc(12px*var(--ui-scale))] font-bold tracking-[0.08em] uppercase"
            style={{
              background: accentFall(accent),
              color: readableInk(accent),
              boxShadow: `0 3px 0 ${shade(accent)}`,
            }}
          >
            <Target className="h-3.5 w-3.5" /> Spec {section.spec}
          </span>
          <span
            aria-hidden
            className="h-[calc(3px*var(--ui-scale))] w-7 shrink-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, ${tint(accent, 45)})`,
            }}
          />
          <span
            aria-hidden
            className="h-px min-w-6 flex-1"
            style={{ background: "var(--rooms-hairline)" }}
          />
          {bannerAction}
        </div>
        <h2 className="mt-3.5 font-display text-[calc(24px*var(--ui-scale))] font-semibold tracking-tight text-ink">
          {section.title}
        </h2>
        {!hideStatement && (
          <div
            className="mt-4 rounded-[calc(12px*var(--ui-scale))] border bg-paper px-5 py-4"
            style={{
              borderColor: "var(--rooms-hairline)",
              borderLeft: `3px solid ${accent}`,
              background: `${ambientWash(accent)}, var(--color-paper)`,
            }}
          >
            <Kicker color={inkMix(accent, 62)}>From the specification</Kicker>
            <p className="mt-2 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft italic">
              <Fmt text={section.statement} />
            </p>
          </div>
        )}
      </div>

      {/* the clause rule — one quiet hairline between the banner and
          the body; the document's way of drawing breath */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{ background: "var(--rooms-hairline-soft)" }}
      />

      {/* the body — every block flush on the column's left edge.
          Hierarchy lives in the type and the rules now, not in
          indents: subheads carry a leading accent tick and a trailing
          hairline, and nothing else steps in. */}
      <div className="flex flex-col gap-6">
        {section.blocks.map((b, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.12)} y={18}>
            <BlockView block={b} accent={accent} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ————— block dispatcher ————— */

function BlockView({
  block: b,
  accent,
}: {
  block: NotesBlock;
  accent: string;
}) {
  switch (b.k) {
    case "p":
      return (
        <p className="max-w-[68ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.9] text-ink-soft">
          <Fmt text={b.text} />
        </p>
      );
    case "h":
      /* v3: the ruled subhead — an accent tick leads (dissolving
         rightward now, the way a pen stroke lifts), the hairline
         trails to the column's edge; the document's section rule */
      return (
        <div className="flex items-center gap-3 pt-2">
          <span
            aria-hidden
            className="h-[calc(3px*var(--ui-scale))] w-6 shrink-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, ${tint(accent, 72)})`,
            }}
          />
          <h3 className="min-w-0 font-display text-[calc(18px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={b.text} />
          </h3>
          <span
            aria-hidden
            className="h-px min-w-4 flex-1"
            style={{ background: "var(--rooms-hairline-soft)" }}
          />
        </div>
      );
    case "bullets":
      /* the list sits at the same measure as the paragraph — the
         cap is ch-relative, so the ul carries the paragraph's size
         to make its ch match exactly */
      return (
        <ul className="flex max-w-[68ch] flex-col gap-2.5 text-[calc(14.5px*var(--ui-scale))]">
          {b.items.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[calc(14.5px*var(--ui-scale))] leading-[1.85] text-ink-soft"
            >
              <span
                className="mt-[calc(11px*var(--ui-scale))] h-2 w-2 shrink-0 rounded-full"
                style={{ background: tint(accent, 55) }}
              />
              <span>
                <Fmt text={t} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div
          className="rounded-[calc(12px*var(--ui-scale))] border px-4 py-3.5"
          style={{
            borderColor: "var(--rooms-hairline-soft)",
            background: `${ambientWash(accent, 7)}, color-mix(in oklab, var(--color-paper) 92%, ${accent} 8%)`,
          }}
        >
          <div className="flex items-start gap-3">
            <StickyNote
              className="mt-0.5 h-4.5 w-4.5 shrink-0"
              style={{ color: inkMix(accent, 70) }}
            />
            <p className="text-[calc(13.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
              <span
                className="mr-1.5 font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase"
                style={{ color: inkMix(accent, 70) }}
              >
                {b.label}:
              </span>
              <Fmt text={b.text} />
            </p>
          </div>
        </div>
      );
    case "def":
      /* v3: the ruled definition — a hairline card with the accent
         kept as a left edge, no sticker chrome; the term carries it.
         v3.1: full column like every plate, the text settling at the
         inner measure, the corner wearing the ambient wash. */
      return (
        <div
          className="rounded-[calc(12px*var(--ui-scale))] border bg-paper px-5 py-4"
          style={{
            borderColor: "var(--rooms-hairline)",
            borderLeft: `3px solid ${tint(accent, 60)}`,
            background: `${ambientWash(accent, 6)}, var(--color-paper)`,
          }}
        >
          <h4 className="font-display text-[calc(16.5px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={b.term} />
          </h4>
          <p className="mt-1.5 max-w-[62ch] text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
            <Fmt text={b.text} />
          </p>
        </div>
      );
    case "eq":
      /* v3: the ruled equation band — a whisper of the accent over
         paper, closed top and bottom by hairlines; the species keep
         their paper chips and hard mini-shadows (the candy moment).
         v3.1: full column, the ambient wash breathing in the corner. */
      return (
        <div
          className="rounded-[calc(12px*var(--ui-scale))] px-5 py-4"
          style={{
            background: `${ambientWash(accent, 7)}, color-mix(in oklab, var(--color-paper) 93%, ${accent} 7%)`,
            borderTop: "1px solid var(--rooms-hairline)",
            borderBottom: "1px solid var(--rooms-hairline)",
          }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
            {b.eq.split(/\s{2,}/).map((part, i) => (
              <span
                key={i}
                className="rounded-[calc(10px*var(--ui-scale))] bg-paper px-3.5 py-2 font-display text-[calc(16px*var(--ui-scale))] font-semibold tracking-tight text-ink"
                style={{ boxShadow: "0 2px 0 var(--edge)" }}
              >
                <Fmt text={part.trim()} />
              </span>
            ))}
          </div>
          {b.note && (
            <p className="mt-3 text-[calc(13px*var(--ui-scale))] leading-[1.7] italic text-ink-soft">
              <Fmt text={b.note} />
            </p>
          )}
        </div>
      );
    case "table":
      return (
        <CandyTable
          head={b.head}
          rows={b.rows}
          caption={b.caption}
          accent={accent}
        />
      );
    case "worked":
      return (
        <Worked
          title={b.title}
          question={b.question}
          steps={b.steps}
          answer={b.answer}
          accent={accent}
        />
      );
    case "steps":
      return <StepsPanel caption={b.caption} items={b.items} accent={accent} />;
    case "figure":
      return <Figure kind={b.kind} caption={b.caption} accent={accent} />;
    case "wow":
      /* v3: the ruled pull-quote — hairlines above and below, the
         key idea set larger in italic ink; the grape lightbulb and
         kicker keep their voice, the card chrome is gone. v3.1: the
         rules run the full column (level with the subhead rules)
         while the quote itself keeps the inner measure. */
      return (
        <div
          className="py-5"
          style={{
            borderTop: "1px solid var(--rooms-hairline)",
            borderBottom: "1px solid var(--rooms-hairline)",
          }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb
              className="mt-1 h-5 w-5 shrink-0"
              style={{ color: inkMix("#9775FA", 72) }}
            />
            <div className="min-w-0">
              <Kicker color={inkMix("#9775FA", 62)}>Key idea</Kicker>
              <p className="mt-1.5 max-w-[62ch] text-[calc(15px*var(--ui-scale))] leading-[1.8] text-ink italic">
                <Fmt text={b.text} />
              </p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* ————— candy table ————— */

function CandyTable({
  head,
  rows,
  caption,
  accent,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
  accent: string;
}) {
  return (
    <div className="max-w-full">
      {caption && (
        <div className="mb-2.5 flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-[calc(12px*var(--ui-scale))] h-[calc(4px*var(--ui-scale))] w-[calc(22px*var(--ui-scale))] shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <div className="min-w-0 font-display text-[calc(18px*var(--ui-scale))] leading-snug font-semibold text-ink">
            <Fmt text={caption} />
          </div>
        </div>
      )}
      <div
        className="overflow-hidden rounded-[calc(12px*var(--ui-scale))] rounded-tl-none bg-paper puff"
        style={{
          border: "1px solid var(--rooms-hairline-soft)",
          background: `${ambientWash(accent, 6)}, var(--color-paper)`,
        }}
      >
        <ScrollFade>
          <table className="w-full min-w-[calc(480px*var(--ui-scale))] border-collapse text-left">
            <thead>
              <tr
                style={{
                  background: `linear-gradient(90deg, ${sunkWash(accent, 15)}, transparent 92%)`,
                }}
              >
                {head.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-display text-[calc(11px*var(--ui-scale))] font-semibold tracking-[0.12em] whitespace-nowrap text-ink-soft uppercase sm:px-5"
                  >
                    <Fmt text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-ink/[0.08]"
                  style={{
                    background:
                      i % 2 === 1
                        ? `var(--zebra-fill, color-mix(in oklab, ${accent} 4%, var(--tint-base)))`
                        : undefined,
                  }}
                >
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3.5 align-top text-[calc(13.5px*var(--ui-scale))] leading-[1.65] sm:px-5 ${j === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}
                    >
                      <Fmt text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollFade>
      </div>
    </div>
  );
}

/* ————— the paper window —————
   Browsers fire beforeprint before the snapshot and afterprint when
   the sheet is done; a tiny hook lets folded things open for the
   printer and fold back after. This is how worked examples print
   whole: question, staircase and answer — while the screen keeps
   guarding its space. */

function usePrinting() {
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    const before = () => setPrinting(true);
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);
  return printing;
}

/* ————— worked example — the folio plate —————
   The candy staircase retires. The worked example now reads as the
   document's gallery plate: a hairline card under one soft accent
   edge, the section's colour breathing as an ambient wash in the
   corner, the question set large, and the method ruled out line by
   line — mono numerals in the margin, hairlines carrying the order,
   the answer sealed in a quiet wash of its own. The only drop-down
   on the site keeps guarding its space, through a hairline ghost
   toggle now; print still unfolds the whole plate. */

function Worked({
  title,
  question,
  steps,
  answer,
  accent,
}: {
  title: string;
  question: string;
  steps: string[];
  answer: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const printing = usePrinting();
  const shown = open || printing;

  /* the card carries its own WORKED EXAMPLE label, so the title
     hands that role over: "Worked example · rate = 1/time" leaves
     only its matter as the heading; a bare "Worked example 2"
     leaves nothing and the question speaks alone; titles that never
     wore the label keep every word of theirs */
  const heading = title.replace(
    /^worked example(?:\s+\d+)?\s*(?:·|—)?\s*/i,
    "",
  );

  return (
    <div
      className="rounded-[calc(18px*var(--ui-scale))] bg-paper puff"
      style={{
        border: "1px solid var(--rooms-hairline)",
        borderTop: `2px solid ${tint(accent, 65)}`,
        background: `${ambientWash(accent)}, var(--color-paper)`,
      }}
    >
      <div className="p-5 sm:p-6">
        {/* the plate head — role label, rule, step count */}
        <div className="flex items-center gap-3">
          <Kicker color={inkMix(accent, 70)}>Worked example</Kicker>
          <span
            aria-hidden
            className="h-px min-w-4 flex-1"
            style={{ background: "var(--rooms-hairline-soft)" }}
          />
          <span
            className="shrink-0 text-[calc(10.5px*var(--ui-scale))] font-semibold tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-ink-faint)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {steps.length} {steps.length === 1 ? "step" : "steps"}
          </span>
        </div>

        {heading && (
          <h4 className="mt-3 font-display text-[calc(19px*var(--ui-scale))] leading-snug font-semibold tracking-tight text-ink">
            <Fmt text={heading} />
          </h4>
        )}
        <p className="mt-2.5 max-w-[62ch] text-[calc(15px*var(--ui-scale))] leading-[1.75] font-medium text-ink">
          <Fmt text={question} />
        </p>

        {/* the toggle — a hairline ghost pill; the accent wash
            breathes in on hover (see .worked-toggle in globals) */}
        <m.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          whileTap={{ scale: 0.98 }}
          className="worked-toggle mt-5 inline-flex min-h-[calc(44px*var(--ui-scale))] cursor-pointer items-center gap-2.5 rounded-full border px-5 font-display text-[calc(13px*var(--ui-scale))] font-semibold tracking-[0.02em] print:hidden"
          style={
            {
              /* fixed translucent washes, not the token-share lift
                 recipe — the hover needs a real delta in every lab,
                 and the glow recipe reads right over the plate's
                 ambient corner in all four */
              "--wt-rest": open ? fade(accent, 8) : "transparent",
              "--wt-hover": fade(accent, 13),
              color: inkMix(accent, 80),
              borderColor: open ? tint(accent, 45) : "var(--rooms-hairline)",
            } as CSSProperties
          }
        >
          {open ? "Hide steps" : "Show steps"}
          <m.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-[calc(24px*var(--ui-scale))] w-[calc(24px*var(--ui-scale))] shrink-0 place-items-center rounded-full"
            style={{
              background: `linear-gradient(160deg, ${tint(accent, 88)}, ${tint(accent, 62)})`,
              color: inkMix(accent, 90),
            }}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </m.span>
        </m.button>

        <AnimatePresence initial={false}>
          {shown && (
            <m.div
              initial={printing ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={
                printing
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 280, damping: 30 }
              }
              className="overflow-hidden"
            >
              {/* the method — ruled out line by line, the divided
                  lines carrying the order the staircase used to */}
              <ol className="mt-5">
                {steps.map((s, i) => (
                  <m.li
                    key={i}
                    initial={printing ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      printing
                        ? { duration: 0 }
                        : {
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.04 + i * 0.05,
                          }
                    }
                    className="flex items-baseline gap-4 border-t py-3.5"
                    style={{ borderColor: "var(--rooms-hairline-soft)" }}
                  >
                    <span
                      aria-hidden
                      className="w-[calc(26px*var(--ui-scale))] shrink-0 text-[calc(11.5px*var(--ui-scale))] font-semibold tracking-[0.08em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: inkMix(accent, 76),
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-[calc(14.5px*var(--ui-scale))] leading-[1.8] text-ink-soft">
                      <Fmt text={s} />
                    </span>
                  </m.li>
                ))}
              </ol>

              {/* the answer — sealed in a quiet wash of the accent */}
              <m.div
                initial={printing ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  printing
                    ? { duration: 0 }
                    : {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.08 + steps.length * 0.05,
                      }
                }
                className="mt-4 rounded-[calc(14px*var(--ui-scale))] px-5 py-4"
                style={{
                  background: `linear-gradient(135deg, ${fade(accent, 10)}, transparent 65%), ${liftWash(accent, 8)}`,
                  border: "1px solid var(--rooms-hairline-soft)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Check
                    className="h-4 w-4 shrink-0"
                    strokeWidth={2.5}
                    style={{ color: inkMix(accent, 85) }}
                  />
                  <span
                    className="font-display text-[calc(10.5px*var(--ui-scale))] font-extrabold tracking-[0.2em] uppercase"
                    style={{ color: inkMix(accent, 70) }}
                  >
                    Answer
                  </span>
                </div>
                <p className="mt-2 font-display text-[calc(16px*var(--ui-scale))] leading-[1.65] font-semibold tracking-tight text-ink">
                  <Fmt text={answer} />
                </p>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ————— steps — the candy stage strip —————
   One tinted panel, same recipe as the equation block: the caption
   as a header beside a little icon square, and every step as a
   paper mini-card in a loose grid. The accent number chips echo
   the contents grid and the worked-example staircase, so the order
   reads at a glance — no rail, no icons, just tidy cards. */

function StepsPanel({
  caption,
  items,
  accent,
}: {
  caption?: string;
  items: { title: string; text: string; icon?: string }[];
  accent: string;
}) {
  const n = items.length;
  /* short trios sit side by side; longer tellings wrap into two
     columns, and an odd one out gets the full-width finale */
  const roomy = n >= 4 || items.some((it) => it.text.length > 170);
  const grid = [
    "grid grid-cols-1 gap-2.5 sm:gap-3",
    roomy
      ? "sm:grid-cols-2"
      : n === 3
        ? "sm:grid-cols-3"
        : n === 2
          ? "sm:grid-cols-2"
          : "",
    roomy && n % 2 === 1 ? "sm:[&>li:last-child]:col-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="rounded-[calc(18px*var(--ui-scale))] p-4 sm:p-5"
      style={{
        background: `${ambientWash(accent, 7)}, ${liftWash(accent, 7)}`,
        border: "1px solid var(--rooms-hairline-soft)",
      }}
    >
      {caption && (
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-ink/[0.08] bg-paper">
            <ListChecks
              className="h-4.5 w-4.5"
              style={{ color: inkMix(accent, 62) }}
              strokeWidth={2.2}
            />
          </span>
          <h4 className="font-display text-[calc(16px*var(--ui-scale))] font-semibold tracking-tight text-ink">
            <Fmt text={caption} />
          </h4>
        </div>
      )}
      <ol className={grid}>
        {items.map((it, i) => {
          /* titles like “1 · Vapourisation” hand their number to the chip */
          const bare = it.title.replace(/^\s*\d+\s*[·•]\s*/, "");
          return (
            <li
              key={i}
              className="rounded-[calc(16px*var(--ui-scale))] border border-ink/[0.07] bg-paper px-4 py-3.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid h-[calc(22px*var(--ui-scale))] w-[calc(22px*var(--ui-scale))] shrink-0 place-items-center rounded-full font-display text-[calc(11px*var(--ui-scale))] font-bold"
                  style={{ background: accentFall(accent), color: readableInk(accent) }}
                >
                  {i + 1}
                </span>
                <span className="font-display text-[calc(14.5px*var(--ui-scale))] font-semibold text-ink">
                  <Fmt text={bare} />
                </span>
              </div>
              <p className="mt-1.5 text-[calc(13.5px*var(--ui-scale))] leading-[1.7] text-ink-soft">
                <Fmt text={it.text} />
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ————— figures ————— */

/* wide plots scroll sideways on phones instead of shrinking to mush */
const WIDE_FIGS = new Set([
  "mass-spec",
  "ie-graph",
  "succ-ie",
  "pt-blocks",
  "spectrum-bromine",
  "radius",
  "fill-order",
  "melting",
  "sigma-pi",
  "dotcross",
  "carbon-lattices",
  "shapes",
  "dipoles",
  "formula-types",
  "naming",
  "frac-col",
  "isomers",
  "radchain",
  "sp2",
  "geometric",
  "ez",
  "elecadd",
  "carbocation",
  "polymer",
  "thermo",
  "levels",
  "profiles",
  "calorimetry",
  "hess-general",
  "hess-co",
  "hess-ch4",
  "hess-caco3",
  "hess-butane",
  "bond-h2o",
  "cooling-curve",
  "london",
  "contact",
  "hbond-water",
  "hbond-nh3",
  "hbond-hf",
  "dimer",
  "viscosity",
  "hydrides",
  "ice",
  "hydration",
  "ethanol-water",
  "solubility",
  "mixing",
  "etransfer",
  "agents",
  "disprop",
  "ie-down",
  "g2-solubility",
  "polarise",
  "flame-etc",
  "flame-colours",
  "thermal-exp",
  "titration-rig",
  "std-solution",
  "titre-targets",
  "g7-trends",
  "halogen-colours",
  "displacement",
  "cl2-fates",
  "h2so4-ladder",
  "halide-test",
  "rate-factors",
  "orientation",
  "rate-graphs",
  "catalyst-profile",
  "het-catalyst",
  "eq-chromate",
  "eq-conflict",
  "eq-haber",
  "hx-isomers",
  "hx-classes",
  "hx-carbocation",
  "hx-scheme",
  "hx-hydrolysis",
  "hx-sn2-oh",
  "hx-sn2-nh3",
  "alc-classes",
  "alc-solubility",
  "alc-dehydration",
  "alc-ox-flow",
  "ms-butane",
  "ms-propanal",
  "ms-ethane-frags",
  "ms-iso-c",
  "ms-iso-br",
  "ms-iso-cl",
  "ir-vibrations",
  "ir-axes",
  "ir-butanone",
  "ir-ethanol",
  "ir-propanoic",
  "ir-propene",
  "ir-halides",
  "ir-amines",
]);

/* the museum of diagrams, handed out so the sample room can frame
   the very same art inside its own editorial exhibit cards */
export function figureArt(kind: string, accent: string): ReactNode {
  let node: ReactNode = null;
  switch (kind) {
    case "atom":
      node = <FigAtom accent={accent} />;
      break;
    case "notation":
      node = <FigNotation accent={accent} />;
      break;
    case "mass-spec":
      node = <FigMassSpec />;
      break;
    case "shielding":
      node = <FigShielding accent={accent} />;
      break;
    case "spectrum-neon":
      node = <FigSpectrumNeon />;
      break;
    case "spectrum-boron":
      node = <FigSpectrumBoron />;
      break;
    case "spectrum-bromine":
      node = <FigSpectrumBromine />;
      break;
    case "spectrum-cl2":
      node = <FigSpectrumCl2 />;
      break;
    case "spectrum-ethanol":
      node = <FigSpectrumEthanol />;
      break;
    case "ms-butane":
      node = <FigMsButane />;
      break;
    case "ms-propanal":
      node = <FigMsPropanal />;
      break;
    case "ms-ethane-frags":
      node = <FigMsEthaneFrags />;
      break;
    case "ms-iso-c":
      node = <FigMsIsoC />;
      break;
    case "ms-iso-br":
      node = <FigMsIsoBr />;
      break;
    case "ms-iso-cl":
      node = <FigMsIsoCl />;
      break;
    case "ir-vibrations":
      node = <FigIrVibrations />;
      break;
    case "ir-axes":
      node = <FigIrAxes />;
      break;
    case "ir-butanone":
      node = <FigIrButanone />;
      break;
    case "ir-ethanol":
      node = <FigIrEthanol />;
      break;
    case "ir-propanoic":
      node = <FigIrPropanoic />;
      break;
    case "ir-propene":
      node = <FigIrPropene />;
      break;
    case "ir-halides":
      node = <FigIrHalides />;
      break;
    case "ir-amines":
      node = <FigIrAmines />;
      break;
    case "orbitals":
      node = <FigOrbitals accent={accent} />;
      break;
    case "fill-demo":
      node = <FigFillDemo accent={accent} />;
      break;
    case "fill-order":
      node = <FigFillOrder accent={accent} />;
      break;
    case "boxes-c":
      node = <FigBoxesC accent={accent} />;
      break;
    case "boxes-s":
      node = <FigBoxesS accent={accent} />;
      break;
    case "ie-graph":
      node = <FigIeGraph />;
      break;
    case "succ-ie":
      node = <FigSuccIe />;
      break;
    case "melting":
      node = <FigMelting />;
      break;
    case "pt-blocks":
      node = <FigPtBlocks />;
      break;
    case "radius":
      node = <FigRadius accent={accent} />;
      break;
    case "sigma-pi":
      node = <FigSigmaPi accent={accent} />;
      break;
    case "dotcross":
      node = <FigDotCross accent={accent} />;
      break;
    case "carbon-lattices":
      node = <FigCarbonLattices accent={accent} />;
      break;
    case "shapes":
      node = <FigShapes accent={accent} />;
      break;
    case "dipoles":
      node = <FigDipoles accent={accent} />;
      break;
    case "formula-types":
      node = <FigFormulaTypes accent={accent} />;
      break;
    case "naming":
      node = <FigNaming accent={accent} />;
      break;
    case "frac-col":
      node = <FigFracCol accent={accent} />;
      break;
    case "isomers":
      node = <FigIsomers accent={accent} />;
      break;
    case "radchain":
      node = <FigRadChain accent={accent} />;
      break;
    case "sp2":
      node = <FigSp2 accent={accent} />;
      break;
    case "geometric":
      node = <FigGeometric accent={accent} />;
      break;
    case "ez":
      node = <FigEz accent={accent} />;
      break;
    case "elecadd":
      node = <FigElecAdd accent={accent} />;
      break;
    case "carbocation":
      node = <FigCarbocation accent={accent} />;
      break;
    case "polymer":
      node = <FigPolymer accent={accent} />;
      break;
    case "thermo":
      node = <FigThermo accent={accent} />;
      break;
    case "levels":
      node = <FigLevels accent={accent} />;
      break;
    case "profiles":
      node = <FigProfiles accent={accent} />;
      break;
    case "calorimetry":
      node = <FigCalorimetry accent={accent} />;
      break;
    case "hess-general":
      node = <FigHessGeneral accent={accent} />;
      break;
    case "hess-co":
      node = <FigHessCo accent={accent} />;
      break;
    case "hess-ch4":
      node = <FigHessCh4 accent={accent} />;
      break;
    case "hess-caco3":
      node = <FigHessCaco3 accent={accent} />;
      break;
    case "hess-butane":
      node = <FigHessButane accent={accent} />;
      break;
    case "bond-h2o":
      node = <FigBondH2O accent={accent} />;
      break;
    case "cooling-curve":
      node = <FigCoolingCurve accent={accent} />;
      break;
    case "london":
      node = <FigLondon accent={accent} />;
      break;
    case "contact":
      node = <FigContact accent={accent} />;
      break;
    case "hbond-water":
      node = <FigHbondWater accent={accent} />;
      break;
    case "hbond-nh3":
      node = <FigHbondNh3 accent={accent} />;
      break;
    case "hbond-hf":
      node = <FigHbondHf accent={accent} />;
      break;
    case "dimer":
      node = <FigDimer accent={accent} />;
      break;
    case "viscosity":
      node = <FigViscosity accent={accent} />;
      break;
    case "hydrides":
      node = <FigHydrides accent={accent} />;
      break;
    case "ice":
      node = <FigIce accent={accent} />;
      break;
    case "hydration":
      node = <FigHydration accent={accent} />;
      break;
    case "ethanol-water":
      node = <FigEthanolWater accent={accent} />;
      break;
    case "solubility":
      node = <FigSolubility accent={accent} />;
      break;
    case "mixing":
      node = <FigMixing accent={accent} />;
      break;
    case "etransfer":
      node = <FigETransfer accent={accent} />;
      break;
    case "agents":
      node = <FigAgents accent={accent} />;
      break;
    case "disprop":
      node = <FigDisprop accent={accent} />;
      break;
    case "ie-down":
      node = <FigIeDownGroup accent={accent} />;
      break;
    case "g2-solubility":
      node = <FigG2Solubility accent={accent} />;
      break;
    case "polarise":
      node = <FigPolarise accent={accent} />;
      break;
    case "flame-etc":
      node = <FigFlameEtc accent={accent} />;
      break;
    case "flame-colours":
      node = <FigFlameColours accent={accent} />;
      break;
    case "thermal-exp":
      node = <FigThermalExp accent={accent} />;
      break;
    case "titration-rig":
      node = <FigTitrationRig accent={accent} />;
      break;
    case "std-solution":
      node = <FigStdSolution accent={accent} />;
      break;
    case "titre-targets":
      node = <FigTitreTargets accent={accent} />;
      break;
    case "g7-trends":
      node = <FigG7Trends accent={accent} />;
      break;
    case "halogen-colours":
      node = <FigHalogenColours accent={accent} />;
      break;
    case "displacement":
      node = <FigDisplacement accent={accent} />;
      break;
    case "cl2-fates":
      node = <FigCl2Fates accent={accent} />;
      break;
    case "h2so4-ladder":
      node = <FigH2so4Ladder accent={accent} />;
      break;
    case "halide-test":
      node = <FigHalideTest accent={accent} />;
      break;
    case "rate-factors":
      node = <FigRateFactors accent={accent} />;
      break;
    case "co2-curves":
      node = <FigCo2Curves accent={accent} />;
      break;
    case "orientation":
      node = <FigOrientation accent={accent} />;
      break;
    case "rate-graphs":
      node = <FigRateGraphs accent={accent} />;
      break;
    case "mb-curve":
      node = <FigMbCurve accent={accent} />;
      break;
    case "mb-temperature":
      node = <FigMbTemperature accent={accent} />;
      break;
    case "catalyst-profile":
      node = <FigCatalystProfile accent={accent} />;
      break;
    case "mb-catalyst":
      node = <FigMbCatalyst accent={accent} />;
      break;
    case "het-catalyst":
      node = <FigHetCatalyst accent={accent} />;
      break;
    case "eq-dynamic":
      node = <FigEqDynamic accent={accent} />;
      break;
    case "eq-chromate":
      node = <FigEqChromate accent={accent} />;
      break;
    case "eq-pressure":
      node = <FigEqPressure accent={accent} />;
      break;
    case "eq-temperature":
      node = <FigEqTemperature accent={accent} />;
      break;
    case "eq-conflict":
      node = <FigEqConflict accent={accent} />;
      break;
    case "eq-haber":
      node = <FigEqHaber accent={accent} />;
      break;
    case "eq-contact":
      node = <FigEqContact accent={accent} />;
      break;
    case "hx-isomers":
      node = <FigHxIsomers accent={accent} />;
      break;
    case "hx-classes":
      node = <FigHxClasses accent={accent} />;
      break;
    case "hx-bond":
      node = <FigHxBond accent={accent} />;
      break;
    case "hx-carbocation":
      node = <FigHxCarbocation accent={accent} />;
      break;
    case "hx-reflux":
      node = <FigHxReflux accent={accent} />;
      break;
    case "hx-scheme":
      node = <FigHxScheme accent={accent} />;
      break;
    case "hx-hydrolysis":
      node = <FigHxHydrolysis accent={accent} />;
      break;
    case "hx-sn2-oh":
      node = <FigHxSn2Oh accent={accent} />;
      break;
    case "hx-sn2-nh3":
      node = <FigHxSn2Nh3 accent={accent} />;
      break;
    case "alc-angles":
      node = <FigAlcAngles accent={accent} />;
      break;
    case "alc-classes":
      node = <FigAlcClasses accent={accent} />;
      break;
    case "alc-solubility":
      node = <FigAlcSolubility accent={accent} />;
      break;
    case "alc-dehydration":
      node = <FigAlcDehydration accent={accent} />;
      break;
    case "alc-ox-flow":
      node = <FigAlcOxFlow accent={accent} />;
      break;
    case "alc-distillation":
      node = <FigAlcDistillation accent={accent} />;
      break;
    case "alc-reflux":
      node = <FigAlcReflux accent={accent} />;
      break;
    case "alc-fractional":
      node = <FigAlcFractional accent={accent} />;
      break;
    case "alc-funnel":
      node = <FigAlcFunnel accent={accent} />;
      break;
    case "alc-bp":
      node = <FigAlcBp accent={accent} />;
      break;
  }
  return node;
}

export function isWideFigure(kind: string): boolean {
  return WIDE_FIGS.has(kind);
}

function Figure({
  kind,
  caption,
  accent,
}: {
  kind: string;
  caption?: string;
  accent: string;
}) {
  const node = figureArt(kind, accent);
  if (!node) return null;
  const wide = isWideFigure(kind);
  return (
    <div
      className="rounded-[calc(20px*var(--ui-scale))] bg-paper p-4 puff sm:p-6"
      style={{
        border: "1px solid var(--rooms-hairline-soft)",
        background: `${ambientWash(accent, 6)}, var(--color-paper)`,
      }}
    >
      {wide ? (
        <ScrollFade>
          <div className="min-w-[calc(620px*var(--ui-scale))]">{node}</div>
        </ScrollFade>
      ) : (
        <div className="flex justify-center">
          <div className="flex w-full justify-center">{node}</div>
        </div>
      )}
      {caption && (
        <div className="mx-auto mt-4 max-w-[58ch]">
          {/* the caption's own divided line — a small centred rule */}
          <span
            aria-hidden
            className="mx-auto block h-px w-10"
            style={{ background: "var(--rooms-hairline)" }}
          />
          <p className="mt-2.5 text-center text-[calc(12.5px*var(--ui-scale))] leading-[1.65] text-ink-faint">
            <Fmt text={caption} />
          </p>
        </div>
      )}
    </div>
  );
}
