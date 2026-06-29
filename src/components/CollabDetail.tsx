'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import type { CollabItem } from '@/data/collab';

export default function CollabDetail({ item }: { item: CollabItem }) {
  const { lang } = useLang();

  const title = lang === 'en' ? item.title_en : item.title_id;
  const desc = lang === 'en' ? item.desc_en : item.desc_id;
  const body = lang === 'en' ? item.body_en : item.body_id;
  const tag = lang === 'en' ? item.tag_en : item.tag_id;

  return (
    <article className="mx-auto max-w-3xl px-5">
      <Link
        href="/#collab"
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-muted no-underline transition-colors hover:text-primary"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {lang === 'en' ? 'Back' : 'Kembali'}
      </Link>

      {item.img && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-canvas-soft">
          <div className="relative aspect-[16/9] bg-canvas-soft">
            <Image
              src={item.img}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 720px"
              priority
            />
          </div>
        </div>
      )}

      <div className={item.img ? 'mt-8' : 'mt-6'}>
        <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">{tag}</span>
        <h1 className="heading-1 mt-4">{title}</h1>
        <p className="mt-4 text-[18px] leading-relaxed text-ink-muted">{desc}</p>
        {body && (
          <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">{body}</p>
        )}
      </div>
    </article>
  );
}
