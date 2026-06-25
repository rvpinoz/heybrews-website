'use client';

import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function CtaStrip() {
  const { t } = useLang();

  return (
    <section className="pb-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-xl bg-secondary px-11 py-[60px] text-center text-white">
            <h2 className="heading-1 mx-auto max-w-[560px] text-white">
              {t('cta_title')}
            </h2>
            <p className="mx-auto mt-4 max-w-[440px] text-white/80">
              {t('cta_sub')}
            </p>
            <div className="mt-[30px] flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-5.5 py-3 font-medium text-white transition-colors hover:bg-primary-active"
              >
                {t('cta_btn')}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
