'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import type { EventItem } from '@/data/events';

export default function EventDetail({ event }: { event: EventItem }) {
  const { lang } = useLang();

  const title = lang === 'en' ? event.title_en : event.title_id;
  const desc = lang === 'en' ? event.desc_en : event.desc_id;
  const tag = lang === 'en' ? event.tag_en : event.tag_id;

  const date = new Date(event.date).toLocaleDateString(
    lang === 'id' ? 'id-ID' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' },
  );

  return (
    <article className="mx-auto max-w-3xl px-5">
      <Link
        href="/#events"
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-muted no-underline transition-colors hover:text-primary"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {lang === 'en' ? 'Back' : 'Kembali'}
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-canvas-soft">
        <div className="relative aspect-[16/9] bg-canvas-soft">
          <Image
            src={event.img}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 720px"
            priority
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">{tag}</span>
          <span className="text-[13px] text-ink-faint">{date}</span>
        </div>
        <h1 className="heading-1 mt-4">{title}</h1>
        <p className="mt-4 text-[18px] leading-relaxed text-ink-muted">{desc}</p>
      </div>
    </article>
  );
}
