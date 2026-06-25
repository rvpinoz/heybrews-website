'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BrandLogo } from './BrandLogo';
import { useLang } from '@/context/LangContext';
import { useTheme } from '@/context/ThemeContext';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const NAV_LINKS = [
  { key: 'nav_collab', href: '#collab' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_members', href: '#members' },
] as const;

export function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  /* ── Scroll: detect hero zone ── */
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setIsTop(false);
        return;
      }
      const hasVideo = !!hero.querySelector('video[src],video source[src]');
      const heroH = hero.offsetHeight;
      setIsTop(window.scrollY < heroH - 60 && hasVideo);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Click outside to close ── */
  useEffect(() => {
    if (!menuOpen) return;

    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  /* ── Link click handler ── */
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    },
    [],
  );

  /* ── Color helpers ── */
  const glass = isTop;
  const textColor = glass ? 'text-white' : 'text-ink';
  const logoFg = glass ? '#ffffff' : undefined;
  const logoBg = glass ? 'transparent' : undefined;

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-100 flex items-center justify-between px-7 py-4 max-sm:px-4 max-sm:py-3`}
    >
      {/* ── LEFT: logo + wordmark ── */}
      <a href="#" className={`flex items-center gap-2.5 ${textColor}`}>
        <BrandLogo
          className="h-8 w-8 rounded-lg max-sm:h-7 max-sm:w-7"
          bgColor={logoBg}
          fgColor={logoFg}
        />
        <span className="text-[22px] font-bold tracking-tight max-sm:text-lg">
          heybrews
        </span>
      </a>

      {/* ── RIGHT: CTA + Menu ── */}
      <div className="flex items-center gap-3">
        {/* CTA pill */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full px-5.5 py-2.5 text-sm font-semibold transition-colors max-sm:hidden ${
            glass
              ? 'bg-white/15 text-white backdrop-blur-md'
              : 'bg-primary text-on-primary hover:bg-primary-active'
          }`}
        >
          {t('nav_cta')}
        </a>

        {/* Menu button */}
        <button
          ref={btnRef}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Menu"
          className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
            glass
              ? 'border-white/25 text-white'
              : 'border-hairline text-ink hover:border-ink-faint'
          }`}
        >
          {/* Hamburger / X */}
          <span className="relative flex h-[14px] w-[18px] flex-col justify-between">
            <span
              className={`block h-[2px] w-full rounded-full bg-current transition-transform duration-300 ${
                menuOpen ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded-full bg-current transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded-full bg-current transition-transform duration-300 ${
                menuOpen ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </span>
          Menu
        </button>
      </div>

      {/* ── DROPDOWN ── */}
      <div
        ref={menuRef}
        className={`absolute top-[calc(100%+8px)] right-7 w-[240px] origin-top-right rounded-xl p-5 backdrop-blur-[16px] transition-all duration-300 max-sm:right-4 max-sm:w-[calc(100vw-32px)] ${
          menuOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-[0.3] opacity-0'
        }`}
        style={{
          background: 'rgba(28,24,20,0.92)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Nav links */}
        <ul className="flex flex-col gap-3">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className="block text-lg font-bold text-white/85 transition-all duration-200 hover:scale-[1.04] hover:text-primary"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Footer: lang + theme toggles */}
        <div className="mt-3.5 flex gap-2 border-t border-white/10 pt-3.5">
          <button
            onClick={toggleLang}
            className="flex-1 rounded-md bg-white/10 p-2 text-xs font-semibold text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button
            onClick={toggleTheme}
            className="flex-1 rounded-md bg-white/10 p-2 text-xs font-semibold text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}
