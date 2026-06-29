'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function ScrollReveal({
  children,
  className,
  variant = 'up',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'up' | 'blur';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !ref.current ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return;

      if (variant === 'blur') {
        gsap.fromTo(
          ref.current,
          { opacity: 0, filter: 'blur(12px)', scale: 1.03, willChange: 'filter' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.85,
            delay,
            ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
            onComplete() {
              gsap.set(ref.current, { willChange: 'auto' });
            },
          },
        );
      } else {
        gsap.from(ref.current, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        });
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
