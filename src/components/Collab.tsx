'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { gsap, useGSAP } from '@/lib/gsap';
import { Eyebrow } from '@/components/Eyebrow';
import { Blobs } from '@/components/Blobs';
import { COLLABS, type CollabItem } from '@/data/collab';
import { VideoIcon } from '@/components/icons/VideoIcon';
import { ShoppingIcon } from '@/components/icons/ShoppingIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { CoffeeIcon } from '@/components/icons/CoffeeIcon';
import { PackageIcon } from '@/components/icons/PackageIcon';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  'content-campaign': VideoIcon,
  'product-collab': ShoppingIcon,
  'event-workshop': CalendarIcon,
  'pagi-blend': CoffeeIcon,
  'brewers-daily-kit': PackageIcon,
};

const services = COLLABS.filter((c) => c.kind === 'service');
const products = COLLABS.filter((c) => c.kind === 'product');

function useCardHover(ref: React.RefObject<HTMLDivElement | null>) {
  const enter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { y: -6, scale: 1.02, boxShadow: '0 20px 50px rgba(0,74,173,.14)', duration: 0.35, ease: 'power2.out' });
  };
  const leave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { y: 0, scale: 1, boxShadow: '0 0 0 rgba(0,74,173,0)', duration: 0.4, ease: 'power2.out' });
  };
  return { onMouseEnter: enter, onMouseLeave: leave };
}

function CollabCard({
  item,
  cardRef,
  innerRef,
  hover,
  lang,
  className,
}: {
  item: CollabItem;
  cardRef: (el: HTMLDivElement | null) => void;
  innerRef: React.RefObject<HTMLDivElement | null>;
  hover: { onMouseEnter: () => void; onMouseLeave: () => void };
  lang: string;
  className?: string;
}) {
  const Icon = ICON_MAP[item.id];
  const isFeatured = item.featured;
  const isProduct = item.kind === 'product';

  return (
    <div ref={cardRef} className={className} {...hover}>
      <Link href={`/collab/${item.id}`} className="block h-full no-underline">
        <div
          ref={innerRef}
          className={
            isFeatured
              ? 'relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#004AAD] to-[#0a2a5e] p-8 text-white'
              : isProduct
                ? 'flex h-full gap-5 rounded-xl border border-hairline bg-canvas p-7'
                : 'h-full rounded-xl border border-hairline bg-canvas p-8'
          }
        >
          {isFeatured ? (
            <>
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-white/12">
                {Icon && <Icon className="h-6 w-6 stroke-white" />}
              </div>
              <h3 className="heading-3 text-white">{lang === 'en' ? item.title_en : item.title_id}</h3>
              <p className="mt-2 max-w-[420px] text-white/72">{lang === 'en' ? item.desc_en : item.desc_id}</p>
              <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[200px] w-[200px] rounded-full bg-white/6" />
            </>
          ) : isProduct ? (
            <>
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[rgba(0,74,173,.05)]">
                {Icon && <Icon className="h-7 w-7 stroke-primary" />}
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase text-primary">{lang === 'en' ? item.tag_en : item.tag_id}</p>
                <h3 className="mt-1 text-[16px] font-bold leading-snug">{lang === 'en' ? item.title_en : item.title_id}</h3>
                <p className="mt-1 text-[13px] text-ink-muted">{lang === 'en' ? item.desc_en : item.desc_id}</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[rgba(0,74,173,.07)]">
                {Icon && <Icon className="h-6 w-6 stroke-primary" />}
              </div>
              <h3 className="heading-3">{lang === 'en' ? item.title_en : item.title_id}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">{lang === 'en' ? item.desc_en : item.desc_id}</p>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}

export default function Collab() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const allItems = [...services, ...products];
  const cardInnerRefs = useRef<(React.RefObject<HTMLDivElement | null>)[]>(
    allItems.map(() => ({ current: null })),
  );
  const cardHovers = allItems.map((_, i) => useCardHover(cardInnerRefs.current[i]));

  useGSAP(
    () => {
      if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (headRef.current) {
        gsap.from(headRef.current, {
          opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        });
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.from(cards, {
        opacity: 0, y: 50, scale: 0.94, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true },
      });
    },
    { scope: sectionRef },
  );

  const COL_SPANS = [
    'col-span-4 max-md:col-span-2 max-sm:col-span-1',
    'col-span-2 max-md:col-span-2 max-sm:col-span-1',
    'col-span-2 max-md:col-span-1 max-sm:col-span-1',
    'col-span-2 max-md:col-span-1 max-sm:col-span-1',
    'col-span-2 max-md:col-span-2 max-sm:col-span-1',
  ];

  return (
    <section ref={sectionRef} id="collab" className="relative overflow-hidden py-[88px]">
      <Blobs variant="a" />
      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <div ref={headRef} className="mb-12 text-center">
          <Eyebrow>{t('collab_eyebrow')}</Eyebrow>
          <h2 className="heading-1 mt-4">{t('collab_title')}</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[18px] text-ink-muted">{t('collab_sub')}</p>
        </div>

        <div className="grid grid-cols-6 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {allItems.map((item, i) => (
            <CollabCard
              key={item.id}
              item={item}
              lang={lang}
              className={COL_SPANS[i] ?? 'col-span-2'}
              cardRef={(el) => { cardsRef.current[i] = el; }}
              innerRef={cardInnerRefs.current[i]}
              hover={cardHovers[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
