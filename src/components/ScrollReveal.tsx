'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !ref.current ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return;

      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
