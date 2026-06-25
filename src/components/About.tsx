'use client';

import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow } from '@/components/Eyebrow';
import PhotoCollage from '@/components/PhotoCollage';

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="border-b border-t border-hairline bg-canvas py-[88px]"
    >
      <div className="mx-auto max-w-5xl px-5">
        <ScrollReveal>
          <div className="grid grid-cols-[1.1fr_1fr] items-center gap-[60px] max-md:grid-cols-1">
            {/* Left column */}
            <div>
              <Eyebrow>{t('about_eyebrow')}</Eyebrow>
              <h2 className="heading-1 mt-4">{t('about_title')}</h2>
              <p className="mt-4 text-[18px] leading-relaxed text-ink-muted">
                {t('about_p1')}
              </p>
              <p className="mt-4 text-[18px] leading-relaxed text-ink-muted">
                {t('about_p2')}
              </p>

              {/* Stats */}
              <div className="mt-[34px] grid grid-cols-3 gap-[18px]">
                <div>
                  <p className="text-[38px] font-bold -tracking-tight">18+</p>
                  <p className="mt-0.5 text-[14px] text-ink-muted">
                    {t('stat_1')}
                  </p>
                </div>
                <div>
                  <p className="text-[38px] font-bold -tracking-tight">1.2M</p>
                  <p className="mt-0.5 text-[14px] text-ink-muted">
                    {t('stat_2')}
                  </p>
                </div>
                <div>
                  <p className="text-[38px] font-bold -tracking-tight">24</p>
                  <p className="mt-0.5 text-[14px] text-ink-muted">
                    {t('stat_3')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — photo collage */}
            <PhotoCollage />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
