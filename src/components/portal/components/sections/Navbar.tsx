'use client';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FlaskMark } from '../FlaskMark';

interface NavbarProps {
  onOpenNotes: () => void;
}

/* The workspace's floating pill nav, ported: one glass pill centred at
   the top (the .portal-nav recipe mirrors .site-header nav), the club's
   flask mark and wordmark on the left — and a single button on the
   right. Every other control (the room chips, the ⌘K search, the lab
   toggle, the mobile drawer) has left the navbar: the page walks
   itself, and the only thing this bar ever did that mattered was open
   the notes. */
export function Navbar({ onOpenNotes }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="portal-nav mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 rounded-full px-3 transition-opacity duration-300 sm:h-16 sm:px-4"
        style={{
          pointerEvents: 'auto',
          opacity: scrolled ? 1 : 0.94,
        }}
        data-testid="portal-navbar"
      >
        {/* Left: the club's flask + wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-full pl-1 pr-2 focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ color: 'var(--ink)' }}
          aria-label="IAL CHEM — back to the top of the showcase"
        >
          <FlaskMark size={28} />
          <span className="font-display text-sm font-bold tracking-[0.14em] uppercase">
            IAL CHEM
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:inline-block h-3.5 w-px"
            style={{ backgroundColor: 'var(--border-strong)' }}
          />
          <span
            className="hidden sm:inline-block font-mono text-[10px] font-medium tracking-[0.14em] uppercase"
            style={{ color: 'var(--ink-muted)' }}
          >
            2018 SPEC
          </span>
        </a>

        {/* Right: the one button — Open Notes */}
        <button
          type="button"
          onClick={onOpenNotes}
          data-testid="navbar-open-notes"
          className="portal-candy-btn inline-flex h-9 items-center gap-1.5 rounded-full px-4 font-display text-[13px] font-semibold whitespace-nowrap shrink-0"
        >
          <span>Open Notes</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
