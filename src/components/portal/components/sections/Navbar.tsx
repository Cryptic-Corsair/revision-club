'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FlaskMark } from '../FlaskMark';

interface NavbarProps {
  onOpenNotes: () => void;
}

/* A quiet editorial masthead: the course identity, three useful
   destinations, and one clear route into the notes. */
export function Navbar({ onOpenNotes }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="portal-nav-frame fixed inset-x-0 top-0 z-50">
      <div
        className="portal-nav-inner"
        data-scrolled={scrolled}
        data-testid="portal-navbar"
      >
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          className="portal-nav-brand"
          aria-label="IAL CHEM — back to the top of the showcase"
        >
          <span className="portal-nav-mark" aria-hidden="true">
            <FlaskMark size={22} />
          </span>
          <span className="portal-nav-wordmark">IAL CHEM</span>
          <span className="portal-nav-divider" aria-hidden="true" />
          <span className="portal-nav-spec">2018 SPECIFICATION</span>
        </a>

        <nav className="portal-nav-links" aria-label="Main navigation">
          <a className="portal-nav-link" href="#workflow">Method</a>
          <a className="portal-nav-link" href="#showcase">The details</a>
          <a className="portal-nav-link" href="#units">Syllabus</a>
        </nav>

        <div className="portal-nav-actions">
          <button
            type="button"
            onClick={onOpenNotes}
            data-testid="navbar-open-notes"
            className="portal-nav-cta"
          >
            <span>Open notes</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
