'use client';

import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow } from '@/components/Eyebrow';

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

            {/* Right column — decorative visual */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-hairline bg-canvas-soft">
              {/* Blue blob */}
              <div className="absolute left-[5%] top-[10%] h-[50%] w-[60%] rounded-lg bg-primary/10" />
              {/* Teal blob */}
              <div className="absolute bottom-[15%] right-[5%] h-[40%] w-[45%] rounded-lg bg-teal/15" />
              {/* Orange blob */}
              <div className="absolute right-[20%] top-[30%] h-[30%] w-[35%] rounded-lg bg-orange/10" />
              {/* Coffee emoji */}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-30">
                &#9749;
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
