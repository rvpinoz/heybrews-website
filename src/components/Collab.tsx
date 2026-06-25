'use client';

import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow } from '@/components/Eyebrow';
import { VideoIcon } from '@/components/icons/VideoIcon';
import { ShoppingIcon } from '@/components/icons/ShoppingIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { CoffeeIcon } from '@/components/icons/CoffeeIcon';
import { PackageIcon } from '@/components/icons/PackageIcon';

export default function Collab() {
  const { t } = useLang();

  return (
    <section id="collab" className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        {/* Section head */}
        <div className="mb-12 text-center">
          <Eyebrow>{t('collab_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('collab_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">
            {t('collab_sub')}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {/* Featured card */}
          <ScrollReveal className="col-span-2 max-sm:col-span-1">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#004AAD] to-[#0a2a5e] p-8 text-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,74,173,.18)]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-white/12">
                <VideoIcon className="h-6 w-6 stroke-white" />
              </div>
              <h3 className="heading-3 text-white">{t('collab_c1_t')}</h3>
              <p className="mt-2 text-white/72">{t('collab_c1_p')}</p>
              {/* Decorative circle */}
              <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[200px] w-[200px] rounded-full bg-white/6" />
            </div>
          </ScrollReveal>

          {/* Card: Brand collab */}
          <ScrollReveal className="col-span-1">
            <div className="rounded-xl border border-hairline bg-canvas p-8 transition-shadow hover:shadow-[0_8px_30px_rgba(0,74,173,.08)]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[rgba(0,74,173,.07)]">
                <ShoppingIcon className="h-6 w-6 stroke-primary" />
              </div>
              <h3 className="heading-3">{t('collab_c2_t')}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">
                {t('collab_c2_p')}
              </p>
            </div>
          </ScrollReveal>

          {/* Card: Event */}
          <ScrollReveal className="col-span-1">
            <div className="rounded-xl border border-hairline bg-canvas p-8 transition-shadow hover:shadow-[0_8px_30px_rgba(0,74,173,.08)]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[rgba(0,74,173,.07)]">
                <CalendarIcon className="h-6 w-6 stroke-primary" />
              </div>
              <h3 className="heading-3">{t('collab_c3_t')}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">
                {t('collab_c3_p')}
              </p>
            </div>
          </ScrollReveal>

          {/* Product card: Coffee */}
          <ScrollReveal className="col-span-2 max-sm:col-span-1">
            <div className="flex gap-5 rounded-xl border border-hairline bg-canvas p-8 transition-shadow hover:shadow-[0_8px_30px_rgba(0,74,173,.08)]">
              <div className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-lg bg-[rgba(0,74,173,.05)]">
                <CoffeeIcon className="h-7 w-7 stroke-primary" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase text-primary">
                  {t('prod_tag1')}
                </p>
                <h3 className="mt-1 text-[17px] font-bold">
                  {t('prod_1_t')}
                </h3>
                <p className="mt-1 text-[14px] text-ink-muted">
                  {t('prod_1_p')}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Product card: Package */}
          <ScrollReveal className="col-span-2 max-sm:col-span-1">
            <div className="flex gap-5 rounded-xl border border-hairline bg-canvas p-8 transition-shadow hover:shadow-[0_8px_30px_rgba(0,74,173,.08)]">
              <div className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-lg bg-[rgba(0,74,173,.05)]">
                <PackageIcon className="h-7 w-7 stroke-primary" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase text-primary">
                  {t('prod_tag2')}
                </p>
                <h3 className="mt-1 text-[17px] font-bold">
                  {t('prod_2_t')}
                </h3>
                <p className="mt-1 text-[14px] text-ink-muted">
                  {t('prod_2_p')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
