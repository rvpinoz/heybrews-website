'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { gsap, useGSAP } from '@/lib/gsap';
import type { EventRecord } from '@/types/event';

export default function EventsGrid({ events }: { events: EventRecord[] }) {
  const { lang } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!gridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true },
        });
      }
    },
    { scope: gridRef, dependencies: [events] },
  );

  const handleEnter = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, { y: -6, scale: 1.02, duration: 0.35, ease: 'power2.out' });
  };
  const handleLeave = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  if (events.length === 0) return null;

  return (
    <div ref={gridRef} className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
      {events.map((event, i) => (
        <div
          key={event.id}
          ref={(el) => { cardsRef.current[i] = el; }}
          onMouseEnter={() => handleEnter(cardsRef.current[i])}
          onMouseLeave={() => handleLeave(cardsRef.current[i])}
        >
          <Link href={`/events/${event.slug}`} className="group block h-full no-underline">
            <div className="h-full overflow-hidden rounded-xl border border-hairline bg-canvas">
              <div className="relative aspect-[16/9] overflow-hidden bg-canvas-soft">
                <Image
                  src={event.img}
                  alt={lang === 'en' ? event.titleEn : event.titleId}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 50vw"
                  loading="lazy"
                  unoptimized={event.img.includes('supabase.co')}
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">
                  {lang === 'en' ? event.tagEn : event.tagId}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[12px] font-medium text-ink-faint">{formatDate(event.date)}</p>
                <h3 className="mt-1.5 text-[18px] font-bold leading-snug">
                  {lang === 'en' ? event.titleEn : event.titleId}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  {lang === 'en' ? event.descEn : event.descId}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
