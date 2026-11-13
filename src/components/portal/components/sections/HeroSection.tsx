'use client';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import {
  GLOBAL_METRICS,
  NOTE_PREVIEW_DOCS,
  PREVIEW_THEMES,
  type PreviewThemeId,
  type PreviewThemeTokens,
  type SiteTheme,
} from '../../data/ialData';
import { EASE_EXPO } from '../../lib/motion';
import { HeroShaderCanvas } from '../motion/HeroShaderCanvas';

interface HeroSectionProps {
  theme: SiteTheme;
  reducedMotion: boolean;
  /* the primary exit hands the visitor the course's first real note;
     the secondary opens the in-page index */
  onStartReading: () => void;
  onFindTopic: () => void;
  /* the workbench's one true exit: hand the visitor the real reader
     — this note, this clause — in the shelved workspace */
  onOpenNote: (docId: string, spec: string) => void;
}

const THEME_DOT_ORDER: PreviewThemeId[] = ['night', 'light', 'dune', 'classic'];

/* The auto-cycle walks the preview the way a reader walks a note:
   clause by clause, across all three notes on the shelf. */
const PREVIEW_STEPS = NOTE_PREVIEW_DOCS.flatMap((doc, ni) =>
  doc.clauses.map((_, ci) => ({ ni, ci })),
);

const pad2 = (n: number) => String(n).padStart(2, '0');

/* white or the room's own ink on a candy fill — the club's readableInk
   trick, reduced to the four preview accents it ever sees */
function inkOn(accent: string, fallback: string): string {
  const hex = accent.replace('#', '');
  if (hex.length !== 6) return fallback;
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? fallback : '#fffdf7';
}

/* ————— the club's inline markup, miniaturised —————
   The notes docs speak **bold** · ==highlight== · ~sub~ · ^sup^
   (rendered by the workspace's <Fmt/>); the preview carries a tiny
   local formatter so the same verbatim strings read honestly here. */
const FMT_SPLIT = /(\*\*[^*]+\*\*|==[^=]+==|~[^~]+~|\^[^^]+\^)/g;

function NoteText({ text, tokens }: { text: string; tokens: PreviewThemeTokens }) {
  const parts = text.split(FMT_SPLIT).filter((p) => p !== '');
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('==') && part.endsWith('==') && part.length > 4) {
          return (
            <span
              key={i}
              style={{
                backgroundColor: `color-mix(in srgb, ${tokens.accent} 22%, transparent)`,
                borderRadius: 3,
                padding: '0 3px',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith('~') && part.endsWith('~') && part.length > 2) {
          return <sub key={i}>{part.slice(1, -1)}</sub>;
        }
        if (part.startsWith('^') && part.endsWith('^') && part.length > 2) {
          return <sup key={i}>{part.slice(1, -1)}</sup>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ————— the pack tick ————— the notes reader's own banner control:
   a quiet dashed square that fills with the accent once the spec
   point joins the revision pack. Same gesture, miniature scale. */
function PackTick({
  picked,
  spec,
  tokens,
  onToggle,
}: {
  picked: boolean;
  spec: string;
  tokens: PreviewThemeTokens;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={picked}
      aria-label={
        picked
          ? `Remove spec point ${spec} from your revision pack`
          : `Add spec point ${spec} to your revision pack`
      }
      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-transform active:scale-90"
      style={
        picked
          ? {
              backgroundColor: tokens.accent,
              color: inkOn(tokens.accent, tokens.bg),
              boxShadow: `0 1.5px 0 color-mix(in srgb, ${tokens.accent} 72%, ${tokens.bg})`,
            }
          : {
              border: `1.5px dashed ${tokens.inkMuted}`,
              color: tokens.inkMuted,
            }
      }
    >
      {picked ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
      ) : (
        <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
      )}
    </button>
  );
}

export function HeroSection({
  theme,
  reducedMotion,
  onStartReading,
  onFindTopic,
  onOpenNote,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [previewThemeId, setPreviewThemeId] = useState<PreviewThemeId>('night');
  const [stepIdx, setStepIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [pickedClauses, setPickedClauses] = useState<ReadonlySet<string>>(
    new Set(),
  );

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.45],
    reducedMotion ? [0, 0] : [9, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.45],
    reducedMotion ? [1, 1] : [0.95, 1],
  );
  const stageY = useTransform(
    scrollYProgress,
    [0, 0.45],
    reducedMotion ? [0, 0] : [14, 0],
  );

  // Sync default preview window starting palette smoothly if user toggles global navbar theme before interacting
  useEffect(() => {
    if (!userInteracted) {
      setPreviewThemeId(theme === 'light' ? 'light' : 'dune');
    }
  }, [theme, userInteracted]);

  // The auto-cycle reads the note for the visitor — clause by clause,
  // across the shelf — until they take the wheel themselves. It only
  // turns while the hero is on or near the screen: scrolled away, the
  // interval stops instead of re-rendering the stage for nobody.
  const heroLive = useInView(heroRef, {
    margin: '400px 0px 400px 0px',
    initial: false,
  });
  useEffect(() => {
    if (reducedMotion || userInteracted || !heroLive) return;
    const id = window.setInterval(() => {
      setStepIdx((prev) => (prev + 1) % PREVIEW_STEPS.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reducedMotion, userInteracted, heroLive]);

  const previewTokens = PREVIEW_THEMES[previewThemeId];
  const step = PREVIEW_STEPS[stepIdx];
  const doc = NOTE_PREVIEW_DOCS[step.ni];
  const clause = doc.clauses[step.ci];
  const packKey = `${doc.id}:${clause.spec}`;

  const pickShelf = (ni: number) => {
    setUserInteracted(true);
    setStepIdx(PREVIEW_STEPS.findIndex((s) => s.ni === ni && s.ci === 0));
  };

  const pickClause = (ni: number, ci: number) => {
    setUserInteracted(true);
    const idx = PREVIEW_STEPS.findIndex((s) => s.ni === ni && s.ci === ci);
    if (idx >= 0) setStepIdx(idx);
  };

  const togglePack = () => {
    setUserInteracted(true);
    setPickedClauses((prev) => {
      const next = new Set(prev);
      if (next.has(packKey)) {
        next.delete(packKey);
      } else {
        next.add(packKey);
      }
      return next;
    });
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Full-bleed GLSL Caustic Refraction & Architectural Grid Background */}
      <HeroShaderCanvas theme={theme} reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Upper Hero Typography */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.18em] uppercase tabular-nums"
              style={{ color: 'var(--ink-muted)' }}
            >
              EDEXCEL IAL · WCH11–WCH16
            </span>
          </div>

          <h1
            className="text-balance font-display font-bold leading-[1.06]"
            style={{
              fontSize: 'clamp(2.5rem, 5.6vw, 4.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.65, ease: EASE_EXPO }}
                className="block"
              >
                Revision notes, written
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE_EXPO }}
                className="block"
              >
                the way they're{' '}
                <span style={{ color: 'var(--accent)' }}>
                  taught.
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE_EXPO }}
            className="mx-auto mt-6 max-w-[54ch] text-[15.5px] leading-[1.8] sm:text-[17px]"
            style={{ color: 'var(--ink-muted)' }}
          >
            Complete class notes for every topic in the Edexcel IAL
            Chemistry spec — read them in order, or tick the spec points
            you need and take just those.
          </motion.p>

          {/* Dual Clean CTAs */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE_EXPO }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={onStartReading}
              className="portal-candy-btn group inline-flex h-12 items-center gap-2 rounded-full px-6 font-display text-sm font-semibold transition-transform duration-200 whitespace-nowrap shrink-0"
            >
              <span>Start reading</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onFindTopic}
              className="inline-flex h-12 items-center rounded-full px-6 font-display text-sm font-semibold transition-transform duration-200 hover:-translate-y-px whitespace-nowrap shrink-0"
              style={{
                color: 'var(--ink)',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              Find a topic
            </button>
          </motion.div>

          {/* Tabular-Nums Spec Summary Strip — candy dots as separators,
              the club ticker's trick */}
          <p
            className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-xs tracking-[0.04em] tabular-nums"
            style={{ color: 'var(--ink-muted)' }}
          >
            <span>0{GLOBAL_METRICS.units}&nbsp;Units</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-coral)' }} />
            <span>{GLOBAL_METRICS.topics}&nbsp;Topics</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mint)' }} />
            <span>~13&nbsp;Hours</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-grape)' }} />
            <span>{GLOBAL_METRICS.workedExamples}&nbsp;Worked&nbsp;Examples</span>
          </p>
        </div>

        {/* Lower Hero Visual Anchor: Scroll-Straightening 3D Notes-Reader Stage.
            No invented app mock any more — the stage IS a notes page: the
            shelf of real notes on the left, the contents rail with its
            honest counter and track, and the clause reader quoting the
            specification verbatim above the notes' own definitions,
            equations and worked examples. The rust hairline under the
            chrome is the reader's reading progress. */}
        <div
          className="mt-9 sm:mt-11"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            data-testid="hero-workspace-stage"
            data-preview-theme={previewThemeId}
            style={{
              rotateX,
              scale,
              y: stageY,
              transformOrigin: 'center top',
              backgroundColor: previewTokens.surface,
              color: previewTokens.ink,
              borderColor: previewTokens.border,
              boxShadow: 'var(--card-shadow)',
            }}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl transition-colors duration-300"
          >
            {/* Reader Chrome + Live Theme Dots */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6"
              style={{
                borderColor: previewTokens.border,
                backgroundColor: previewTokens.bg,
              }}
            >
              <div className="flex min-w-0 items-center gap-2 font-mono text-xs">
                <span className="font-semibold tracking-[0.12em] uppercase">
                  IAL CHEM — REVISION NOTES
                </span>
                <span
                  aria-hidden="true"
                  className="hidden sm:inline"
                  style={{ color: previewTokens.inkMuted }}
                >
                  /
                </span>
                <span
                  className="hidden truncate sm:inline"
                  style={{ color: previewTokens.inkMuted }}
                >
                  {doc.unitCode} · {doc.topicLabel} · {doc.readMinutes} min
                  read
                </span>
              </div>

              {/* Live Clickable 4 Theme Dots (Night · Light · Dune · Classic) */}
              <div
                role="group"
                aria-label="Workspace preview themes"
                className="flex items-center gap-1 rounded-full border p-1"
                style={{
                  borderColor: previewTokens.border,
                  backgroundColor: previewTokens.surface,
                }}
              >
                {THEME_DOT_ORDER.map((id) => {
                  const t = PREVIEW_THEMES[id];
                  const selected = previewThemeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setUserInteracted(true);
                        setPreviewThemeId(id);
                      }}
                      aria-pressed={selected}
                      className="relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors whitespace-nowrap shrink-0"
                      style={{
                        color: selected ? previewTokens.ink : previewTokens.inkMuted,
                      }}
                    >
                      {selected && (
                        <motion.span
                          layoutId="hero-preview-theme-dot"
                          transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.85 }}
                          className="absolute inset-0 rounded-full border"
                          style={{
                            backgroundColor: previewTokens.surfaceElevated,
                            borderColor: previewTokens.border,
                          }}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="relative z-10 h-2 w-2 rounded-full border"
                        style={{
                          backgroundColor: t.accent,
                          borderColor: t.border,
                        }}
                      />
                      <span className="relative z-10">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reading progress — the notes reader's own hairline, in the
                room's accent, tracking the clause the demo is on */}
            <motion.div
              aria-hidden="true"
              className="h-[3px] origin-left"
              style={{ backgroundColor: previewTokens.accent }}
              initial={false}
              animate={{ scaleX: (stepIdx + 1) / PREVIEW_STEPS.length }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
            />

            {/* The reader itself: shelf + contents rail | clause reader */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left rail */}
              <div
                className="border-b p-4 md:col-span-4 md:border-r md:border-b-0 sm:p-5"
                style={{
                  borderColor: previewTokens.border,
                  backgroundColor: previewTokens.bg,
                }}
              >
                <p
                  className="mb-3 font-mono text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: previewTokens.inkMuted }}
                >
                  THE SHELF · {NOTE_PREVIEW_DOCS.length} NOTES
                </p>
                <div className="flex flex-row gap-2 overflow-x-auto md:flex-col no-scrollbar">
                  {NOTE_PREVIEW_DOCS.map((d, ni) => {
                    const active = ni === step.ni;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        data-testid={`note-shelf-tab-${d.id}`}
                        onClick={() => pickShelf(ni)}
                        aria-pressed={active}
                        className="relative flex w-auto shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors md:w-full"
                        style={{
                          borderColor: active
                            ? previewTokens.accent
                            : previewTokens.border,
                          backgroundColor: active
                            ? previewTokens.surfaceElevated
                            : 'transparent',
                        }}
                      >
                        <span
                          className="font-mono text-[10px] tabular-nums"
                          style={{
                            color: active
                              ? previewTokens.accent
                              : previewTokens.inkMuted,
                          }}
                        >
                          {d.unitCode}
                        </span>
                        <span
                          className="min-w-0 whitespace-nowrap text-xs font-semibold md:truncate"
                          style={{
                            color: active
                              ? previewTokens.ink
                              : previewTokens.inkMuted,
                          }}
                        >
                          {d.topicLabel} — {d.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p
                    className="font-mono text-[10px] tracking-[0.14em] uppercase"
                    style={{ color: previewTokens.inkMuted }}
                  >
                    CONTENTS
                  </p>
                  <p
                    className="font-mono text-[10px] tabular-nums"
                    style={{ color: previewTokens.inkMuted }}
                  >
                    {pad2(step.ci + 1)}/{pad2(doc.clauses.length)} ·{' '}
                    {doc.clauses.length} OF {doc.sectionsTotal} SECTIONS
                  </p>
                </div>

                {/* hairline reading track, like the reader's etoc */}
                <div
                  className="mt-3 hidden h-[2px] w-full overflow-hidden rounded-full md:block"
                  style={{ backgroundColor: previewTokens.border }}
                  aria-hidden="true"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: previewTokens.accent }}
                    initial={false}
                    animate={{
                      width: `${((step.ci + 1) / doc.clauses.length) * 100}%`,
                    }}
                    transition={{ duration: 0.45, ease: EASE_EXPO }}
                  />
                </div>

                <div className="mt-3 flex flex-row gap-2 overflow-x-auto md:mt-3.5 md:flex-col no-scrollbar">
                  {doc.clauses.map((c, k) => {
                    const active = k === step.ci;
                    return (
                      <button
                        key={c.spec}
                        type="button"
                        data-testid={`note-clause-${c.spec}`}
                        onClick={() => pickClause(step.ni, k)}
                        aria-current={active ? 'location' : undefined}
                        aria-label={`Go to specification ${c.spec}: ${c.title}`}
                        className="relative flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors"
                        style={{
                          backgroundColor: active
                            ? previewTokens.surfaceElevated
                            : 'transparent',
                        }}
                      >
                        {active && !reducedMotion && (
                          <motion.span
                            layoutId="portal-toc-cursor"
                            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.85 }}
                            className="absolute inset-0 rounded-lg border"
                            style={{
                              borderColor: previewTokens.border,
                              backgroundColor: previewTokens.surfaceElevated,
                            }}
                          />
                        )}
                        {active && reducedMotion && (
                          <span
                            className="absolute inset-0 rounded-lg border"
                            style={{
                              borderColor: previewTokens.border,
                              backgroundColor: previewTokens.surfaceElevated,
                            }}
                          />
                        )}
                        <span
                          className="relative z-10 font-mono text-[10px] tabular-nums"
                          style={{
                            color: active
                              ? previewTokens.accent
                              : previewTokens.inkMuted,
                          }}
                        >
                          {c.spec}
                        </span>
                        <span
                          className="relative z-10 whitespace-nowrap text-[11.5px] font-medium md:truncate"
                          style={{
                            color: active
                              ? previewTokens.ink
                              : previewTokens.inkMuted,
                          }}
                        >
                          {c.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* The one true exit. Everything above rehearses the
                    reader; this button stops rehearsing and hands the
                    visitor the actual notes page — the note on stage,
                    opened at the very clause under the reading line —
                    in the workspace. The workspace's own deep-link
                    (?v=notes&doc=…&spec=…) lands it scrolled to that
                    clause. */}
                <button
                  type="button"
                  data-testid="preview-open-in-workspace"
                  onClick={() => onOpenNote(doc.id, clause.spec)}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-px"
                  style={{
                    borderColor: previewTokens.accent,
                    color: previewTokens.accent,
                  }}
                >
                  <span>Open this note in the workspace</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Right reader pane — the clause, the way the notes set it */}
              <div className="p-5 sm:p-7 md:col-span-8">
                <motion.div
                  key={`${doc.id}-${clause.spec}`}
                  initial={reducedMotion ? false : { opacity: 0.3, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.26, ease: EASE_EXPO }}
                  data-testid="note-preview-reader"
                  className="flex flex-col md:min-h-[368px]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="font-mono text-[11px] tabular-nums"
                      style={{ color: previewTokens.accent }}
                    >
                      SPEC {clause.spec} · {doc.unitCode}{' '}
                      {doc.topicLabel.toUpperCase()}
                    </span>
                    <PackTick
                      picked={pickedClauses.has(packKey)}
                      spec={clause.spec}
                      tokens={previewTokens}
                      onToggle={togglePack}
                    />
                  </div>

                  <h3
                    className="mt-2.5 font-display text-lg font-bold tracking-tight sm:text-xl"
                    style={{ color: previewTokens.ink }}
                  >
                    {clause.title}
                  </h3>

                  {/* the official statement, quoted above the teaching —
                      the notes' own convention */}
                  <div
                    className="mt-4 pl-3.5"
                    style={{ borderLeft: `2px solid ${previewTokens.accent}` }}
                  >
                    <p
                      className="font-mono text-[9.5px] tracking-[0.16em] uppercase"
                      style={{ color: previewTokens.inkMuted }}
                    >
                      THE SPECIFICATION SAYS
                    </p>
                    <p
                      className="mt-1.5 text-[13px] leading-[1.75]"
                      style={{ color: previewTokens.ink }}
                    >
                      “<NoteText text={clause.statement} tokens={previewTokens} />”
                    </p>
                  </div>

                  {/* the clause's own blocks — definitions, displayed
                      equations, worked examples, verbatim from the note */}
                  {clause.blocks.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {clause.blocks.map((b, i) => {
                        if (b.kind === 'def') {
                          return (
                            <div
                              key={i}
                              className="rounded-xl border px-3.5 py-3"
                              style={{
                                borderColor: previewTokens.border,
                                backgroundColor: previewTokens.bg,
                              }}
                            >
                              <p
                                className="font-mono text-[9.5px] tracking-[0.16em] uppercase"
                                style={{ color: previewTokens.accent }}
                              >
                                KEY DEFINITION
                              </p>
                              <p
                                className="mt-1 text-[13px] font-bold"
                                style={{ color: previewTokens.ink }}
                              >
                                <NoteText text={b.term} tokens={previewTokens} />
                              </p>
                              <p
                                className="mt-1 text-xs leading-[1.7]"
                                style={{ color: previewTokens.inkMuted }}
                              >
                                <NoteText text={b.text} tokens={previewTokens} />
                              </p>
                            </div>
                          );
                        }
                        if (b.kind === 'eq') {
                          return (
                            <div
                              key={i}
                              className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border px-3.5 py-3 font-mono text-[11.5px] tabular-nums"
                              style={{
                                borderColor: previewTokens.border,
                                backgroundColor: previewTokens.bg,
                                color: previewTokens.ink,
                              }}
                            >
                              {b.eq.split(/\s{2,}/).map((seg, k) => (
                                <span key={k}>
                                  <NoteText text={seg} tokens={previewTokens} />
                                </span>
                              ))}
                            </div>
                          );
                        }
                        return (
                          <div
                            key={i}
                            className="rounded-xl border px-3.5 py-3"
                            style={{
                              borderColor: previewTokens.border,
                              backgroundColor: previewTokens.bg,
                            }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p
                                className="font-mono text-[9.5px] tracking-[0.16em] uppercase"
                                style={{ color: previewTokens.accent }}
                              >
                                WORKED EXAMPLE
                              </p>
                              <span
                                className="font-mono text-[9.5px] tabular-nums"
                                style={{ color: previewTokens.inkMuted }}
                              >
                                {b.steps} STEPS
                              </span>
                            </div>
                            <p
                              className="mt-1.5 text-[13px] font-semibold"
                              style={{ color: previewTokens.ink }}
                            >
                              <NoteText text={b.title} tokens={previewTokens} />
                            </p>
                            <p
                              className="mt-1 line-clamp-3 text-xs leading-[1.7]"
                              style={{ color: previewTokens.inkMuted }}
                            >
                              <NoteText text={b.question} tokens={previewTokens} />
                            </p>
                            <p
                              className="mt-2 border-t pt-2 text-xs font-medium leading-[1.7]"
                              style={{
                                borderColor: previewTokens.border,
                                color: previewTokens.ink,
                              }}
                            >
                              <NoteText text={b.answer} tokens={previewTokens} />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div
                    className="mt-auto hidden items-center justify-between gap-3 border-t pt-3.5 md:flex"
                    style={{ borderColor: previewTokens.border }}
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums"
                      style={{ color: previewTokens.inkMuted }}
                    >
                      {doc.sectionsTotal} sections · {doc.specRange}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.14em] uppercase"
                      style={{ color: previewTokens.inkMuted }}
                    >
                      Live preview
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
