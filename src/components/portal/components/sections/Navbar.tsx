'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FlaskMark } from '../FlaskMark';

interface NavbarProps {
  onOpenNotes: () => void;
}

const DESTINATIONS = [
  { number: '01', label: 'Method', href: '#workflow' },
  { number: '02', label: 'The collection', href: '#showcase' },
  { number: '03', label: 'Syllabus', href: '#units' },
];

export function Navbar({ onOpenNotes }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 36;
      setScrolled((previous) => (previous === next ? previous : next));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="portal-nav-frame fixed inset-x-0 top-0 z-50">
      <div
        className="portal-nav-shell"
        data-scrolled={scrolled}
        data-testid="portal-navbar"
      >
        <a
          href="#top"
          className="portal-nav-brand"
          aria-label="IAL CHEM — back to the top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
        >
          <span className="portal-nav-emblem" aria-hidden="true">
            <FlaskMark size={27} />
          </span>
          <span className="portal-nav-brand-copy">
            <span className="portal-nav-wordmark">IAL <i>CHEM</i></span>
            <span className="portal-nav-caption">THE REVISION COLLECTION</span>
          </span>
          <span className="portal-nav-edition" aria-label="2018 specification">
            <span className="portal-nav-edition-dot" />
            WCH11 <span>/</span> 2018
          </span>
        </a>

        <nav className="portal-nav-links" aria-label="Main navigation">
          {DESTINATIONS.map((destination) => (
            <a
              className="portal-nav-link"
              href={destination.href}
              key={destination.href}
            >
              <span className="portal-nav-link-number">{destination.number}</span>
              <span>{destination.label}</span>
            </a>
          ))}
        </nav>

        <div className="portal-nav-action-wrap">
          <span className="portal-nav-action-note">YOUR DESK AWAITS</span>
          <button
            type="button"
            onClick={onOpenNotes}
            data-testid="navbar-open-notes"
            className="portal-nav-cta"
          >
            <span>Open notes</span>
            <span className="portal-nav-cta-icon">
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
