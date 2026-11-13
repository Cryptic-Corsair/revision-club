'use client';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FlaskMark } from '../FlaskMark';

interface NavbarProps {
  onOpenNotes: () => void;
}

/* The homepage navbar, redesigned as a maison bar: one tall glass slab
   centred at the top, framed in a double hairline — the outer edge
   gilded in the dress's metal, a second engraved line set just inside
   it. The brand is an engraved lockup (the flask, a hairline, then the
   serif house name over a mono establishment line); the one button is
   a quiet hairline plate that fills as you reach for it. Everything
   loud has left: no candy pill, no accent-shouted wordmark — the room
   below does the colour, and the bar above just holds the light. */
export function Navbar({ onOpenNotes }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      // bail out without a re-render when the threshold state hasn't moved
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-5 sm:pt-3"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="portal-nav relative mx-auto flex h-13 max-w-3xl items-center justify-between gap-3 rounded-xl px-4 transition-opacity duration-300 sm:h-14 sm:px-6"
        style={{
          pointerEvents: 'auto',
          opacity: scrolled ? 1 : 0.94,
        }}
        data-testid="portal-navbar"
      >
        {/* Left: the flask, a hairline, and the engraved lockup */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-lg py-2 pl-0.5 pr-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-3"
          aria-label="IAL CHEM — back to the top of the showcase"
        >
          <FlaskMark size={24} />
          <span
            aria-hidden="true"
            className="hidden h-7 w-px shrink-0 sm:block"
            style={{ backgroundColor: 'var(--nav-gild)' }}
          />
          <span className="flex flex-col justify-center gap-[5px]">
            <span className="portal-nav-wordmark text-[15px] leading-none">
              IAL CHEM
            </span>
            <span className="portal-nav-caption hidden text-[8px] leading-none sm:block">
              Edexcel IAL &middot; 2018 Spec
            </span>
          </span>
        </a>

        {/* Right: the hairline plate — the one button */}
        <button
          type="button"
          onClick={onOpenNotes}
          data-testid="navbar-open-notes"
          className="portal-nav-plate inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 font-mono text-[10px] font-semibold uppercase sm:px-5"
        >
          <span>Open Notes</span>
          <ArrowRight
            className="h-3 w-3"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
