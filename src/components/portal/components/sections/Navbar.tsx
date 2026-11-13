'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import type { SiteTheme } from '../../data/ialData';
import { EASE_EXPO } from '../../lib/motion';
import { FlaskMark } from '../FlaskMark';

interface NavbarProps {
  theme: SiteTheme;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenNotes: () => void;
  onNavigate: (anchor: string) => void;
}

const NAV_LINKS = [
  { label: 'Showcase', href: '#showcase' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Units', href: '#units' },
] as const;

/* The workspace's floating pill nav, ported: one glass pill centred at
   the top (the .portal-nav recipe mirrors .site-header nav), the club's
   flask mark and wordmark on the left, the room's chips in the middle
   and the candy CTA on the right. Same four rooms, same voices. */
export function Navbar({
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenNotes,
  onNavigate,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="portal-nav mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 rounded-full px-3 transition-opacity duration-300 sm:h-16 sm:px-4"
        style={{
          pointerEvents: 'auto',
          opacity: scrolled || mobileOpen ? 1 : 0.94,
        }}
        data-testid="portal-navbar"
      >
        {/* Left: the club's flask + wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#top');
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

        {/* Center Navigation Chips (Desktop) */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className="portal-nav-chip inline-flex h-9 items-center rounded-full px-4 font-display text-[13px] font-semibold whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Search ⌘K + Night/Light toggle + Open Notes */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-testid="navbar-search-btn"
            onClick={onOpenSearch}
            aria-label="Search units and specification topics"
            className="portal-nav-chip inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold whitespace-nowrap shrink-0"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline" style={{ color: 'var(--ink)' }}>
              Search
            </span>
            <kbd
              className="rounded px-1.5 py-0.5 font-mono text-[10px] tabular-nums"
              style={{
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--ink-muted)',
              }}
            >
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            data-testid="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={
              theme === 'night'
                ? 'Switch to the Light lab'
                : 'Switch to the Night lab'
            }
            className="portal-nav-chip inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold whitespace-nowrap shrink-0"
          >
            {theme === 'night' ? (
              <>
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">Night</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenNotes}
            className="portal-candy-btn hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full px-4 font-display text-[13px] font-semibold whitespace-nowrap shrink-0"
          >
            <span>Open Notes</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="portal-nav-chip inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden shrink-0"
            style={{ color: 'var(--ink)' }}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — a paper card, like the workspace's sheets */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_EXPO }}
            className="mx-auto mt-2 max-w-3xl rounded-3xl px-4 py-4 md:hidden"
            style={{
              pointerEvents: 'auto',
              backgroundColor: 'var(--surface)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2.5">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="rounded-2xl px-3 py-2.5 font-display text-sm font-semibold"
                  style={{ color: 'var(--ink)' }}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenNotes();
                }}
                className="portal-candy-btn mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full font-display text-sm font-semibold"
              >
                <span>Open Notes</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
