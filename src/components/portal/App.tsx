'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import type { IalUnit, SiteTheme } from './data/ialData';
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

/* One room of the descent: a darker ground (each room sinks below
   the last, all the way to the cocoa band) and an optional soft
   spotlight breathing across one corner so the deep ground never
   reads flat. The spotlight re-inks through --spotlight per dress. */
function Room({
  ground,
  glow,
  children,
}: {
  ground: string;
  glow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-clip" style={{ background: ground }}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse ${glow}, var(--spotlight) 0%, transparent 72%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default function App() {
  const prefersReduced = useReducedMotion();
  const reducedMotion = Boolean(prefersReduced);

  const [theme, setTheme] = useState<SiteTheme>('dune');
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const lenisRef = useRef<Lenis | null>(null);

  // The portal's two dresses are the club's own labs (dune / light);
  // the dress lives on the wrapper element (declaratively below),
  // never on <html> — the workspace's labs own the root element.

  // Root Lenis smooth scroll with wheel inertia, paused/disabled for reduced motion
  useEffect(() => {
    if (reducedMotion) {
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
  }, [reducedMotion]);

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

  // Exit ramps into the real workspace: the navbar's Open Notes and the
  // footer's Launch CTA hand the visitor to the revision app itself;
  // every other control stays inside the showcase (palette demo,
  // anchor scrolling).
  const enterWorkspace = useCallback(() => {
    router.push('/');
  }, [router]);

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
        if (lenisRef.current && !reducedMotion) {
          lenisRef.current.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        return;
      }
      const target = document.querySelector(anchor);
      if (!(target instanceof HTMLElement)) return;
      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, { offset: -64 });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    },
    [reducedMotion],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-theme={theme}
        className="portal-root relative min-h-screen w-full overflow-x-clip"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)' }}
      >
        <FilmGrainOverlay />

        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => openSearch('')}
          onOpenNotes={enterWorkspace}
          onNavigate={navigateTo}
        />

        <main>
          <HeroSection
            theme={theme}
            reducedMotion={reducedMotion}
            onStartRevising={() => openSearch('WCH11')}
            onBuildPack={() => navigateTo('#workflow')}
          />

          {/* ————— the descent —————
              No seams between the rooms any more: the hero stands on
              the page ground and every room below it steps darker
              than the last — showcase, workflow, interlude, the lab,
              units — sinking room by room until the footer's one
              surviving wave pours the last ground into the cocoa
              band. The darkness is the seam; a soft room spotlight
              (a different corner each time) keeps the deep grounds
              from reading flat, and the rooms keep the hero's ring
              language in their backdrops. */}
          <Room ground="var(--room-showcase)" glow="28% 42% at 82% 6%">
            <ShowcaseCarousel reducedMotion={reducedMotion} />
          </Room>

          <Room ground="var(--room-workflow)" glow="34% 38% at 12% 92%">
            <WorkflowSplit
              reducedMotion={reducedMotion}
              onOpenSearch={(q = '') => openSearch(q)}
            />
          </Room>

          <Room ground="var(--room-interlude)">
            <KineticInterlude theme={theme} reducedMotion={reducedMotion} />
          </Room>

          <Room ground="var(--room-lab)" glow="46% 34% at 50% 0%">
            <LabVignettes reducedMotion={reducedMotion} />
          </Room>

          <Room ground="var(--room-units)" glow="40% 36% at 50% 100%">
            <UnitMatrix
              reducedMotion={reducedMotion}
              onSelectUnit={openUnitInspector}
            />
          </Room>
        </main>

        <FooterSection
          theme={theme}
          onLaunchWorkspace={enterWorkspace}
          onOpenSpecIndex={() => openSearch('')}
          onOpenUnit={openUnitInspector}
          onNavigate={navigateTo}
          onToggleTheme={toggleTheme}
        />

        <CommandPaletteModal
          open={commandOpen}
          initialQuery={commandQuery}
          onClose={() => setCommandOpen(false)}
          onJumpToAnchor={navigateTo}
        />
      </div>
    </MotionConfig>
  );
}
