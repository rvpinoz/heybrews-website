'use client';

import { useLang } from '@/context/LangContext';
import { BrandLogo } from '@/components/BrandLogo';

export default function Footer() {
  const { t } = useLang();

  const exploreLinks = [
    { href: '#collab', label: t('foot_collab') },
    { href: '#about', label: t('nav_about') },
    { href: '#members', label: t('nav_members') },
  ];

  const collabLinks = [
    { label: t('foot_brand') },
    { label: t('foot_product') },
    { label: t('foot_event') },
  ];

  const connectLinks = [
    { label: 'Instagram', href: 'https://instagram.com/heybrews' },
    { label: 'TikTok', href: 'https://tiktok.com/@heybrews' },
    { label: 'YouTube', href: 'https://youtube.com/@heybrews' },
  ];

  return (
    <footer className="border-t border-hairline bg-canvas-soft py-13">
      <div className="mx-auto max-w-5xl px-5">
        {/* Grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <BrandLogo className="h-[30px] w-[30px]" />
              <span className="text-[18px] font-bold">heybrews</span>
            </div>
            <p className="mt-3 max-w-[280px] text-sm text-ink-muted">
              {t('foot_tag')}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
              {t('foot_explore')}
            </h4>
            <nav>
              {exploreLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mb-2.5 block text-sm text-ink-secondary no-underline transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Collab */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
              {t('foot_collab')}
            </h4>
            <nav>
              {collabLinks.map((link) => (
                <span
                  key={link.label}
                  className="mb-2.5 block text-sm text-ink-secondary"
                >
                  {link.label}
                </span>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
              {t('foot_connect')}
            </h4>
            <nav>
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2.5 block text-sm text-ink-secondary no-underline transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-11 flex items-center justify-between border-t border-hairline pt-6 max-sm:flex-col max-sm:items-start max-sm:gap-3.5">
          <p className="text-[13px] text-ink-muted">{t('foot_copy')}</p>
          <p className="text-[13px] text-ink-muted">{t('foot_made')}</p>
        </div>
      </div>
    </footer>
  );
}
