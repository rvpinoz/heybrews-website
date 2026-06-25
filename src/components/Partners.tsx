'use client';

import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PARTNERS } from '@/data/partners';

export default function Partners() {
  const { t } = useLang();

  return (
    <section className="border-b border-hairline bg-canvas py-12">
      <ScrollReveal>
        <div className="mx-auto max-w-5xl px-5">
          <p className="mb-5 text-center text-[12px] font-medium uppercase tracking-[1px] text-ink-faint">
            {t('partners_label')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {PARTNERS.map((partner, i) => (
              <span key={partner} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-[10px] text-ink-faint opacity-25">
                    &bull;
                  </span>
                )}
                <span className="whitespace-nowrap text-[17px] font-bold text-ink-faint opacity-55 transition-opacity hover:opacity-85">
                  {partner}
                </span>
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
