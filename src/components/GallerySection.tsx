'use client';

import { useLang } from '@/context/LangContext';
import { Eyebrow } from '@/components/Eyebrow';
import Gallery from '@/components/Gallery';
import type { GalleryRecord } from '@/types/gallery';

export default function GallerySection({ items }: { items: GalleryRecord[] }) {
  const { t } = useLang();

  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 text-center">
          <Eyebrow>{t('gallery_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('gallery_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">
            {t('gallery_sub')}
          </p>
        </div>
        <Gallery items={items} />
      </div>
    </section>
  );
}
