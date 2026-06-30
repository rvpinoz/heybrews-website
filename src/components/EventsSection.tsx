'use client';

import { useLang } from '@/context/LangContext';
import { Eyebrow } from '@/components/Eyebrow';
import EventsGrid from '@/components/EventsGrid';
import type { EventRecord } from '@/types/event';

export default function EventsSection({ events }: { events: EventRecord[] }) {
  const { t } = useLang();

  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 text-center">
          <Eyebrow>{t('events_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('events_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">{t('events_sub')}</p>
        </div>
        <EventsGrid events={events} />
      </div>
    </section>
  );
}
