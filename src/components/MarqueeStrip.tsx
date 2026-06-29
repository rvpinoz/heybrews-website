'use client';

import { useRef, useEffect } from 'react';

const ROW_1 = [
  'BREW FOR FUN',
  'NOT PERFECTION',
  'HEYBREWS',
  "IT'S A HEYBREWS THING",
  '☕',
];

const ROW_2 = [
  'CUPPING',
  'LATTE ART',
  'POUR OVER',
  'COLD BREW',
  'ESPRESSO',
  'HOME ROASTING',
  '☕',
];

function Strip({
  items,
  direction,
  innerRef,
}: {
  items: string[];
  direction: 1 | -1;
  innerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap py-2">
      <div ref={innerRef} className="inline-flex w-max" style={{ willChange: 'transform' }}>
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className={`mx-3 text-[clamp(48px,7vw,80px)] font-black uppercase leading-none tracking-tight ${
                  i % 2 === (direction === 1 ? 0 : 1)
                    ? 'text-white'
                    : 'marquee-stroke text-transparent'
                }`}
              >
                {item}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    let pos1 = 0;
    let pos2 = 0;
    const baseSpeed = 0.4;
    let scrollVelocity = 0;
    let lastScroll = window.scrollY;
    let raf: number;

    const halfWidth1 = row1.scrollWidth / 2;
    const halfWidth2 = row2.scrollWidth / 2;

    const onScroll = () => {
      const current = window.scrollY;
      scrollVelocity = current - lastScroll;
      lastScroll = current;
    };

    const tick = () => {
      scrollVelocity *= 0.92;

      pos1 -= baseSpeed + scrollVelocity * 0.8;
      pos2 += baseSpeed + scrollVelocity * 0.8;

      if (pos1 <= -halfWidth1) pos1 += halfWidth1;
      if (pos1 >= 0) pos1 -= halfWidth1;

      if (pos2 >= 0) pos2 -= halfWidth2;
      if (pos2 <= -halfWidth2) pos2 += halfWidth2;

      row1.style.transform = `translateX(${pos1}px)`;
      row2.style.transform = `translateX(${pos2}px)`;

      raf = requestAnimationFrame(tick);
    };

    pos2 = -halfWidth2 / 2;

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative -my-4 overflow-hidden py-5">
      <div
        className="relative z-10 border-y-[3px] border-white/20 bg-primary"
        style={{ rotate: '-2deg', scale: '1.04' }}
      >
        <Strip items={ROW_1} direction={1} innerRef={row1Ref} />
      </div>
      <div
        className="relative z-20 -mt-5 border-y-[3px] border-white/20 bg-primary"
        style={{ rotate: '2deg', scale: '1.04' }}
      >
        <Strip items={ROW_2} direction={-1} innerRef={row2Ref} />
      </div>
    </section>
  );
}
