'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BrandLogo } from './BrandLogo';
import { useLang } from '@/context/LangContext';
import { useTheme } from '@/context/ThemeContext';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_members', href: '/members' },
  { key: 'nav_gallery', href: '/gallery' },
] as const;

const STAGGER = 0.035;
const ROLL_DURATION = '0.42s';
const ROLL_EASING = 'cubic-bezier(.62,.05,.01,.99)';

/* ── Text Roll ──
   Two layers of characters stacked via overflow-hidden.
   On group hover the top layer translates up, the bottom layer translates in.
   Per-char stagger via inline transitionDelay = index * STAGGER. */
function TextRoll({
  children,
  className,
  highlightClass = 'text-primary',
}: {
  children: string;
  className?: string;
  highlightClass?: string;
}) {
  const chars = children.split('');

  return (
    <span
      className={cn(
        'group/roll relative inline-flex overflow-hidden',
        'motion-reduce:overflow-visible',
        className,
      )}
      style={{ height: '1.15em', lineHeight: '1.15em' }}
      aria-label={children}
    >
      <span className="inline-flex" aria-hidden="true">
        {chars.map((char, i) => (
          <span
            key={`t${i}`}
            className="inline-block transition-transform motion-reduce:transition-none group-hover/roll:-translate-y-[110%]"
            style={{
              transitionDuration: ROLL_DURATION,
              transitionTimingFunction: ROLL_EASING,
              transitionDelay: `${i * STAGGER}s`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>

      <span
        className={cn('absolute inset-0 inline-flex', highlightClass)}
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <span
            key={`b${i}`}
            className="inline-block translate-y-[110%] transition-transform motion-reduce:transition-none group-hover/roll:translate-y-0"
            style={{
              transitionDuration: ROLL_DURATION,
              transitionTimingFunction: ROLL_EASING,
              transitionDelay: `${i * STAGGER}s`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>
    </span>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  /* Scroll: detect hero zone — checks for #hero with a <video> element */
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

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMenuOpen(false);
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [],
  );

  const glass = isTop;

  const toggleBtnClass = cn(
    'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 active:scale-90',
    glass
      ? 'border-white/28 text-white hover:bg-white/14'
      : 'border-hairline text-ink hover:bg-canvas-soft',
  );

  return (
    <div className="fixed top-0 right-0 left-0 z-100 flex justify-center px-4 pt-3 max-sm:pt-2">
      <nav
        className={cn(
          'flex w-full max-w-[1080px] items-center justify-between rounded-full border px-5 transition-all duration-400 ease-out motion-reduce:transition-none',
          glass
            ? 'border-white/18 bg-white/10 py-2.5 backdrop-blur-xl'
            : 'border-hairline bg-canvas py-2 shadow-1',
        )}
      >
        {/* ── LEFT: logo + wordmark ── */}
        <a
          href="/"
          className={cn(
            'flex items-center gap-2 transition-colors duration-300',
            glass ? 'text-white' : 'text-ink',
          )}
        >
          <BrandLogo
            className={cn(
              'rounded-lg transition-all duration-300 motion-reduce:transition-none',
              glass ? 'h-8 w-8' : 'h-7 w-7',
            )}
            bgColor={glass ? 'transparent' : undefined}
            fgColor={glass ? '#ffffff' : undefined}
          />
          <span
            className={cn(
              'font-bold tracking-tight transition-all duration-300 motion-reduce:transition-none',
              glass ? 'text-[20px]' : 'text-[18px]',
            )}
          >
            HeyBrews
          </span>
        </a>

        {/* ── CENTER: nav links (desktop) ── */}
        <div className="flex items-center gap-6 max-md:hidden">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className={cn(
                'text-[14px] font-semibold transition-colors duration-300',
                glass ? 'text-white/85' : 'text-ink-muted',
              )}
            >
              <TextRoll highlightClass={glass ? 'text-white' : 'text-primary'}>
                {t(key)}
              </TextRoll>
            </a>
          ))}
        </div>

        {/* ── RIGHT: toggles + divider + CTA (desktop) / menu (mobile) ── */}
        <div className="flex items-center gap-2">
          {/* Desktop toggles */}
          <div className="flex items-center gap-1.5 max-md:hidden">
            <button
              onClick={toggleLang}
              aria-label={lang === 'id' ? 'Ganti bahasa, sekarang Indonesia' : 'Switch language, currently English'}
              className={toggleBtnClass}
            >
              <span className="text-[11px] font-bold leading-none">
                {lang === 'id' ? 'ID' : 'EN'}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
              className={toggleBtnClass}
            >
              {theme === 'light' ? (
                <MoonIcon className="h-3.5 w-3.5" />
              ) : (
                <SunIcon className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Divider */}
            <div
              className={cn(
                'mx-1 h-[18px] w-px transition-colors duration-300',
                glass ? 'bg-white/20' : 'bg-hairline',
              )}
            />
          </div>

          {/* CTA WhatsApp */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 active:scale-95 max-sm:hidden',
              glass
                ? 'bg-white/15 text-white backdrop-blur-md hover:bg-white/25'
                : 'bg-primary text-on-primary hover:bg-primary-active',
            )}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {t('nav_cta')}
          </a>

          {/* Menu button (mobile) */}
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Menu"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] font-semibold transition-all duration-300 md:hidden',
              glass
                ? 'border-white/25 text-white'
                : 'border-hairline text-ink hover:border-ink-faint',
            )}
          >
            <span className="relative flex h-[12px] w-[16px] flex-col justify-between">
              <span
                className={cn(
                  'block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300',
                  menuOpen && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-[1.5px] w-full rounded-full bg-current transition-opacity duration-300',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300',
                  menuOpen && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
            Menu
          </button>
        </div>

        {/* ── DROPDOWN (mobile) ── */}
        <div
          ref={menuRef}
          className={cn(
            'absolute top-[calc(100%+8px)] right-4 w-[240px] origin-top-right rounded-2xl p-5 backdrop-blur-2xl transition-all duration-300 motion-reduce:transition-none max-sm:w-[calc(100%-16px)]',
            menuOpen
              ? 'pointer-events-auto scale-100 opacity-100'
              : 'pointer-events-none scale-[0.3] opacity-0',
          )}
          style={{
            background: 'rgba(28,24,20,0.94)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
            transitionTimingFunction: menuOpen
              ? 'cubic-bezier(.34,1.4,.5,1)'
              : 'cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* CTA inside dropdown for mobile */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-active active:scale-95 sm:hidden"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {t('nav_cta')}
          </a>

          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ key, href }, i) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="block text-lg font-bold text-white/85 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  style={{
                    transitionDelay: menuOpen ? `${i * 0.05}s` : '0s',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? undefined : 'translateY(8px)',
                  }}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Footer: lang + theme toggles (mobile) */}
          <div className="mt-3.5 flex gap-2 border-t border-white/10 pt-3.5">
            <button
              onClick={toggleLang}
              aria-label={lang === 'id' ? 'Ganti bahasa' : 'Switch language'}
              className="flex-1 rounded-lg bg-white/10 p-2 text-xs font-semibold text-white/70 transition-colors hover:bg-white/20 hover:text-white active:scale-90"
            >
              {lang === 'id' ? 'ID' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Mode gelap' : 'Mode terang'}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/10 p-2 text-xs font-semibold text-white/70 transition-colors hover:bg-white/20 hover:text-white active:scale-90"
            >
              {theme === 'light' ? (
                <><MoonIcon className="h-3 w-3" /> Dark</>
              ) : (
                <><SunIcon className="h-3 w-3" /> Light</>
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
