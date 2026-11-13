'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import type { IalUnit, SearchEntry, SiteTheme } from './data/ialData';
import { EASE_EXPO } from './lib/motion';
import { useCoarsePointer } from './lib/still';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { Navbar } from './components/sections/Navbar';
import { CommandPaletteModal } from './components/sections/CommandPaletteModal';
import { HeroSection } from './components/sections/HeroSection';
import { ShowcaseCarousel } from './components/sections/ShowcaseCarousel';
import { WorkflowSplit } from './components/sections/WorkflowSplit';
import { KineticInterlude } from './components/sections/KineticInterlude';
import { LabVignettes } from './components/sections/LabVignettes';
import { UnitMatrix } from './components/sections/UnitMatrix';
import { FooterSection } from './components/sections/FooterSection';

/* One room of the descent. The rooms are ordered steps now, not
   named grounds — each takes the next colour down the staircase
   (--room-step-1 … --room-step-5), and the seam itself is a blend:
   the room's ground fades in from the previous room's ground over
   the first 240px, so no junction anywhere is a hard edge. The
   corner spotlight fades out before it reaches either seam (the
   same 200px dissolve, vertically), so its glow can never be cut
   off by a room boundary. The whole room rises gently into view
   the first time it is scrolled to. */
const GLOW_FADE =
  'linear-gradient(to bottom, transparent 0px, #000 200px, #000 calc(100% - 200px), transparent 100%)';

function Room({
  ground,
  from,
  glow,
  reducedMotion,
  children,
}: {
  ground: string;
  from: string;
  glow?: string;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-x-clip"
      style={{
        background: `linear-gradient(180deg, ${from} 0px, ${ground} 240px)`,
      }}
    >
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse ${glow}, var(--spotlight) 0%, transparent 72%)`,
            maskImage: GLOW_FADE,
            WebkitMaskImage: GLOW_FADE,
          }}
        />
      )}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function App() {
  const prefersReduced = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const osReducedMotion = Boolean(prefersReduced);
  // Touch-first devices keep native scrolling, but retain the full motion design.
  // Only the operating-system preference selects the reduced-motion experience.
  const reducedMotion = osReducedMotion;

  const [theme, setTheme] = useState<SiteTheme>('dune');
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const lenisRef = useRef<Lenis | null>(null);

  // The portal's two dresses are the club's own labs (dune / light);
  // the dress lives on the wrapper element (declaratively below),
  // never on <html> — the workspace's labs own the root element.

  // Keep wheel smoothing for desktop; touch-first devices retain native scrolling.
  useEffect(() => {
    if (coarsePointer) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let disposed = false;
    document.fonts?.ready.then(() => {
      if (!disposed) {
        lenis.resize();
      }
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [coarsePointer]);

  // Global Cmd+K / Ctrl+K shortcut to toggle Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandQuery('');
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const router = useRouter();

  // Exit ramps into the shelved workspace at /club. The homepage IS
  // the showcase now, so every exit is a real deep link, not a drop
  // at the desk: the navbar's Open Notes walks into the notes reader
  // on the note the hero's shelf opens with; the hero's and the
  // closing room's "Start reading" deliver the course's first topic;
  // the workflow's pack stage and the palette's graduate button land
  // in the pack bench, the unit walks and the spec index. Every
  // target reads ?v=… in club-app.tsx on mount.
  const openNotes = useCallback(() => {
    router.push('/club?v=notes&doc=wch11-t02');
  }, [router]);

  // Topic one — the course's own first note, where "Start reading"
  // lands from the hero and the closing room.
  const startReading = useCallback(() => {
    router.push('/club?v=notes&doc=wch11-t01');
  }, [router]);

  const openPackBench = useCallback(() => {
    router.push('/club?v=pack');
  }, [router]);

  const openNoteInWorkspace = useCallback(
    (docId: string, spec: string) => {
      const params = new URLSearchParams({ v: 'notes', doc: docId, spec });
      router.push(`/club?${params.toString()}`);
    },
    [router],
  );

  const openEntryInWorkspace = useCallback(
    (entry: SearchEntry) => {
      if (entry.kind === 'unit') {
        router.push(`/club?v=${entry.unitCode.toLowerCase()}`);
      } else {
        router.push('/club?v=spec');
      }
    },
    [router],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dune' ? 'light' : 'dune'));
  }, []);

  const openSearch = useCallback((initialQuery = '') => {
    setCommandQuery(initialQuery);
    setCommandOpen(true);
  }, []);

  const openUnitInspector = useCallback((unitCode: IalUnit['code']) => {
    setCommandQuery(unitCode);
    setCommandOpen(true);
  }, []);

  const navigateTo = useCallback(
    (anchor: string) => {
      if (anchor === '#top') {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        return;
      }
      const target = document.querySelector(anchor);
      if (!(target instanceof HTMLElement)) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -64 });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    },
    [],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-theme={theme}
        className="portal-root relative min-h-screen w-full overflow-x-clip"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)' }}
      >
        <FilmGrainOverlay />

        <Navbar onOpenNotes={openNotes} />

        <main>
          <HeroSection
            theme={theme}
            reducedMotion={reducedMotion}
            onStartReading={startReading}
            onFindTopic={() => openSearch('WCH11')}
            onOpenNote={openNoteInWorkspace}
          />

          {/* ————— the descent, in reading order —————
              The page now tells its story in one pass: the hero hands
              over to the workflow (how the method works), the workflow
              to the showcase machines (what the craft feels like), the
              machines to the syllabus coverage (what's inside), the
              coverage to the living laboratory (the subject itself,
              running), and the laboratory exhales into the kinetic
              interlude before the footer's one surviving wave pours
              the last ground into the cocoa band. The rooms keep
              their ids, so every anchor — Build a Pack, the palette's
              jumps, the footer's look-around — still lands true.
              No seams anywhere: each room's ground blends down from
              the previous one over a 240px gradient, the darkness
              itself smoothed into a fall, and each room rises gently
              into view the first time it is scrolled to. */}
          <Room
            ground="var(--room-step-1)"
            from="var(--bg)"
            glow="34% 38% at 12% 84%"
            reducedMotion={reducedMotion}
          >
            <WorkflowSplit
              reducedMotion={reducedMotion}
              onOpenSearch={(q = '') => openSearch(q)}
              onOpenPackBench={openPackBench}
            />
          </Room>

          <Room
            ground="var(--room-step-2)"
            from="var(--room-step-1)"
            glow="28% 42% at 84% 12%"
            reducedMotion={reducedMotion}
          >
            <ShowcaseCarousel reducedMotion={reducedMotion} />
          </Room>

          <Room
            ground="var(--room-step-3)"
            from="var(--room-step-2)"
            glow="40% 36% at 50% 88%"
            reducedMotion={reducedMotion}
          >
            <UnitMatrix
              reducedMotion={reducedMotion}
              onSelectUnit={openUnitInspector}
            />
          </Room>

          <Room
            ground="var(--room-step-4)"
            from="var(--room-step-3)"
            glow="46% 34% at 50% 10%"
            reducedMotion={reducedMotion}
          >
            <LabVignettes reducedMotion={osReducedMotion} coarsePointer={coarsePointer} />
          </Room>

          <Room
            ground="var(--room-step-5)"
            from="var(--room-step-4)"
            reducedMotion={reducedMotion}
          >
            <KineticInterlude
              theme={theme}
              reducedMotion={reducedMotion}
              onStartReading={startReading}
              onOpenSpecIndex={() => openSearch('')}
            />
          </Room>
        </main>

        <FooterSection
          theme={theme}
          onNavigate={navigateTo}
          onOpenSearch={() => openSearch('')}
          onToggleTheme={toggleTheme}
        />

        <CommandPaletteModal
          open={commandOpen}
          initialQuery={commandQuery}
          onClose={() => setCommandOpen(false)}
          onJumpToAnchor={navigateTo}
          onOpenInWorkspace={openEntryInWorkspace}
        />
      </div>
    </MotionConfig>
  );
}
