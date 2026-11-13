'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { BandWave } from '@/components/club/bands';
import type { IalUnit, SiteTheme } from './data/ialData';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { Navbar } from './components/sections/Navbar';
import { CommandPaletteModal } from './components/sections/CommandPaletteModal';
import { HeroSection } from './components/sections/HeroSection';
import { ShowcaseCarousel } from './components/sections/ShowcaseCarousel';
import { WorkflowSplit } from './components/sections/WorkflowSplit';
import { KineticInterlude } from './components/sections/KineticInterlude';
import { UnitMatrix } from './components/sections/UnitMatrix';
import { FooterSection } from './components/sections/FooterSection';

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

          {/* ————— the seam walk —————
              The club home's one structure: the page is a walk across
              two seam grounds (--band-a / --band-b) and every boundary
              is a BandWave from the shared five-curve shelf — no two
              neighbouring seams repeat a curve. The hero stands on the
              page ground; the showcase, the pack builder, the
              interlude and the units matrix each get their own room,
              and the first three rooms wear the hero's ring-and-wave
              backdrop language; the last seam hands the page back so
              the footer's closing stage and its wave into the cocoa
              band read clean. */}
          <BandWave from="var(--bg)" to="var(--band-a)" wave={1} />
          <div style={{ background: 'var(--band-a)' }}>
            <ShowcaseCarousel reducedMotion={reducedMotion} />
          </div>

          <BandWave from="var(--band-a)" to="var(--band-b)" wave={2} />
          <div style={{ background: 'var(--band-b)' }}>
            <WorkflowSplit
              reducedMotion={reducedMotion}
              onOpenSearch={(q = '') => openSearch(q)}
            />
          </div>

          <BandWave from="var(--band-b)" to="var(--band-a)" wave={3} />
          <div style={{ background: 'var(--band-a)' }}>
            <KineticInterlude theme={theme} reducedMotion={reducedMotion} />
          </div>

          <BandWave from="var(--band-a)" to="var(--band-b)" wave={4} />
          <div style={{ background: 'var(--band-b)' }}>
            <UnitMatrix
              reducedMotion={reducedMotion}
              onSelectUnit={openUnitInspector}
            />
          </div>

          <BandWave from="var(--band-b)" to="var(--bg)" wave={0} />
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
