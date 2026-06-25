'use client';

import { useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { gsap, useGSAP } from '@/lib/gsap';
import { Eyebrow } from '@/components/Eyebrow';
import { VideoIcon } from '@/components/icons/VideoIcon';
import { ShoppingIcon } from '@/components/icons/ShoppingIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { CoffeeIcon } from '@/components/icons/CoffeeIcon';
import { PackageIcon } from '@/components/icons/PackageIcon';

function useCardHover(ref: React.RefObject<HTMLDivElement | null>) {
  const enter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -6,
      scale: 1.02,
      boxShadow: '0 20px 50px rgba(0,74,173,.14)',
      duration: 0.35,
      ease: 'power2.out',
    });
  };
  const leave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 0 0 rgba(0,74,173,0)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };
  return { onMouseEnter: enter, onMouseLeave: leave };
}

export default function Collab() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const c0 = useRef<HTMLDivElement>(null);
  const c1 = useRef<HTMLDivElement>(null);
  const c2 = useRef<HTMLDivElement>(null);
  const c3 = useRef<HTMLDivElement>(null);
  const c4 = useRef<HTMLDivElement>(null);

  const h0 = useCardHover(c0);
  const h1 = useCardHover(c1);
  const h2 = useCardHover(c2);
  const h3 = useCardHover(c3);
  const h4 = useCardHover(c4);

  useGSAP(
    () => {
      if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (headRef.current) {
        gsap.from(headRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        });
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        scale: 0.94,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="collab" className="py-[88px]">
      <div className="mx-auto max-w-5xl px-5">
        <div ref={headRef} className="mb-12 text-center">
          <Eyebrow>{t('collab_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('collab_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">
            {t('collab_sub')}
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {/* Row 1: Featured wide + medium */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="col-span-4 max-md:col-span-2 max-sm:col-span-1"
            {...h0}
          >
            <div
              ref={c0}
              className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#004AAD] to-[#0a2a5e] p-8 text-white"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-white/12">
                <VideoIcon className="h-6 w-6 stroke-white" />
              </div>
              <h3 className="heading-3 text-white">{t('collab_c1_t')}</h3>
              <p className="mt-2 max-w-[420px] text-white/72">{t('collab_c1_p')}</p>
              <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[200px] w-[200px] rounded-full bg-white/6" />
            </div>
          </div>

          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="col-span-2 max-md:col-span-2 max-sm:col-span-1"
            {...h1}
          >
            <div ref={c1} className="h-full rounded-xl border border-hairline bg-canvas p-8">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[rgba(0,74,173,.07)]">
                <ShoppingIcon className="h-6 w-6 stroke-primary" />
              </div>
              <h3 className="heading-3">{t('collab_c2_t')}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">{t('collab_c2_p')}</p>
            </div>
          </div>

          {/* Row 2: narrow + wide + wide */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
            className="col-span-2 max-md:col-span-1 max-sm:col-span-1"
            {...h2}
          >
            <div ref={c2} className="h-full rounded-xl border border-hairline bg-canvas p-8">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[rgba(0,74,173,.07)]">
                <CalendarIcon className="h-6 w-6 stroke-primary" />
              </div>
              <h3 className="heading-3">{t('collab_c3_t')}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">{t('collab_c3_p')}</p>
            </div>
          </div>

          <div
            ref={(el) => { cardsRef.current[3] = el; }}
            className="col-span-2 max-md:col-span-1 max-sm:col-span-1"
            {...h3}
          >
            <div ref={c3} className="flex h-full gap-5 rounded-xl border border-hairline bg-canvas p-7">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[rgba(0,74,173,.05)]">
                <CoffeeIcon className="h-7 w-7 stroke-primary" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase text-primary">{t('prod_tag1')}</p>
                <h3 className="mt-1 text-[16px] font-bold leading-snug">{t('prod_1_t')}</h3>
                <p className="mt-1 text-[13px] text-ink-muted">{t('prod_1_p')}</p>
              </div>
            </div>
          </div>

          <div
            ref={(el) => { cardsRef.current[4] = el; }}
            className="col-span-2 max-md:col-span-2 max-sm:col-span-1"
            {...h4}
          >
            <div ref={c4} className="flex h-full gap-5 rounded-xl border border-hairline bg-canvas p-7">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[rgba(0,74,173,.05)]">
                <PackageIcon className="h-7 w-7 stroke-primary" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase text-primary">{t('prod_tag2')}</p>
                <h3 className="mt-1 text-[16px] font-bold leading-snug">{t('prod_2_t')}</h3>
                <p className="mt-1 text-[13px] text-ink-muted">{t('prod_2_p')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
