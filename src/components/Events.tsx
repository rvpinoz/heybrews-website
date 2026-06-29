'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { gsap, useGSAP } from '@/lib/gsap';
import { Eyebrow } from '@/components/Eyebrow';
import { EVENTS } from '@/data/events';

export default function Events() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (headRef.current) {
        gsap.from(headRef.current, {
          opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        });
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.from(cards, {
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true },
      });
    },
    { scope: sectionRef },
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

  return (
    <section ref={sectionRef} id="events" className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <div ref={headRef} className="mb-12 text-center">
          <Eyebrow>{t('events_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('events_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">{t('events_sub')}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          {EVENTS.map((event, i) => (
            <div
              key={event.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              onMouseEnter={() => handleEnter(cardsRef.current[i])}
              onMouseLeave={() => handleLeave(cardsRef.current[i])}
            >
              <Link href={`/events/${event.id}`} className="group block h-full no-underline">
                <div className="h-full overflow-hidden rounded-xl border border-hairline bg-canvas">
                  <div className="relative aspect-[16/9] overflow-hidden bg-canvas-soft">
                    <Image
                      src={event.img}
                      alt={lang === 'en' ? event.title_en : event.title_id}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">
                      {lang === 'en' ? event.tag_en : event.tag_id}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[12px] font-medium text-ink-faint">{formatDate(event.date)}</p>
                    <h3 className="mt-1.5 text-[18px] font-bold leading-snug">
                      {lang === 'en' ? event.title_en : event.title_id}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                      {lang === 'en' ? event.desc_en : event.desc_id}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
