'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { gsap, useGSAP } from '@/lib/gsap';
import { Eyebrow } from '@/components/Eyebrow';
import EventsGrid from '@/components/EventsGrid';
import type { EventRecord } from '@/types/event';

const HOMEPAGE_LIMIT = 4;

export default function Events({ events }: { events: EventRecord[] }) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (headRef.current) {
        gsap.from(headRef.current, {
          opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        });
      }
    },
    { scope: sectionRef },
  );

  if (events.length === 0) return null;

  const latest = events.slice(0, HOMEPAGE_LIMIT);
  const hasMore = events.length > HOMEPAGE_LIMIT;

  return (
    <section ref={sectionRef} id="events" className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <div ref={headRef} className="mb-12 text-center">
          <Eyebrow>{t('events_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('events_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">{t('events_sub')}</p>
        </div>

        <EventsGrid events={latest} />

        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-5 py-2.5 text-[14px] font-semibold text-ink no-underline transition-colors hover:border-primary hover:text-primary"
            >
              {t('events_view_all')}
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
