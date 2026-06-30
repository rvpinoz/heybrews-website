'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import type { GalleryRecord } from '@/types/gallery';

/* ── Lightbox ──
   Custom fullscreen modal for photos. Index references the FILTERED list
   so prev/next stays in sync with visible tiles. */
function Lightbox({
  items,
  index,
  lang,
  onClose,
  onChange,
}: {
  items: GalleryRecord[];
  index: number;
  lang: string;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const item = items[index];
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, onChange]);

  if (!item) return null;
  const alt = lang === 'en' ? item.altEn : item.altId;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm motion-reduce:backdrop-blur-none"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw] animate-[lightbox-in_.25s_ease-out] motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- lightbox needs object-contain without fill layout */}
        <img
          src={item.src}
          alt={alt}
          className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
        />
        <p className="mt-3 text-center text-sm text-white/70">{alt}</p>
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onChange((index - 1 + items.length) % items.length); }}
          aria-label="Previous"
          className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onChange((index + 1) % items.length); }}
          aria-label="Next"
          className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] text-white/50">
        {index + 1} / {items.length}
      </span>
    </div>
  );
}

/* ── Gallery grid ── */
export default function Gallery({ items }: { items: GalleryRecord[] }) {
  const { lang, t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Categories derived from the actual data — new categories from admin show up automatically
  const categories = useMemo(() => {
    const seen = new Map<string, { id: string; en: string }>();
    for (const item of items) {
      if (!seen.has(item.categoryId)) {
        seen.set(item.categoryId, { id: item.categoryId, en: item.categoryEn });
      }
    }
    return Array.from(seen.values());
  }, [items]);

  const filtered = active ? items.filter((g) => g.categoryId === active) : items;

  useGSAP(
    () => {
      if (!gridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tiles = tilesRef.current.filter(Boolean) as HTMLDivElement[];
      if (!tiles.length) return;

      gsap.set(tiles, { clearProps: 'all' });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        gsap.fromTo(
          tiles,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.4)',
            stagger: 0.06,
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: gridRef, dependencies: [filtered] },
  );

  const handleFilter = useCallback((cat: string | null) => {
    setActive(cat);
    setLightboxIndex(-1);
    tilesRef.current = [];
  }, []);

  const spanClass = (span?: 'lg' | 'md' | 'sm') => {
    switch (span) {
      case 'lg':
        return 'col-span-2 row-span-2 max-sm:col-span-1 max-sm:row-span-1';
      case 'md':
        return 'row-span-2 max-sm:row-span-1';
      default:
        return '';
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => handleFilter(null)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 motion-reduce:transition-none',
            active === null
              ? 'border-primary bg-primary text-white'
              : 'border-hairline bg-canvas text-ink-muted hover:border-ink-faint',
          )}
        >
          {t('gallery_all')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 motion-reduce:transition-none',
              active === cat.id
                ? 'border-primary bg-primary text-white'
                : 'border-hairline bg-canvas text-ink-muted hover:border-ink-faint',
            )}
          >
            {lang === 'en' ? cat.en : cat.id}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <div
        ref={gridRef}
        className="grid auto-rows-[140px] grid-cols-4 gap-3 [grid-auto-flow:dense] max-md:auto-rows-[120px] max-md:grid-cols-3 max-sm:auto-rows-[160px] max-sm:grid-cols-2"
      >
        {filtered.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { tilesRef.current[i] = el; }}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-xl bg-canvas-soft transition-opacity duration-300 motion-reduce:transition-none',
              spanClass(item.span),
            )}
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={item.src}
              alt={lang === 'en' ? item.altEn : item.altId}
              fill
              unoptimized={item.src.endsWith('.svg') || item.src.includes('supabase.co')}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:transition-none"
              sizes={
                item.span === 'lg'
                  ? '(max-width:640px) 50vw, 50vw'
                  : '(max-width:640px) 50vw, 25vw'
              }
              loading="lazy"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20 motion-reduce:transition-none">
              <span className="scale-0 rounded-full bg-white/90 p-3 text-primary transition-transform duration-300 group-hover:scale-100 motion-reduce:scale-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 motion-reduce:transition-none">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex >= 0 && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          lang={lang}
          onClose={() => setLightboxIndex(-1)}
          onChange={setLightboxIndex}
        />
      )}
    </>
  );
}
