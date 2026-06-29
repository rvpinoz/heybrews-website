'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useLang } from '@/context/LangContext';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { SWAP_WORDS } from '@/data/i18n';
import { MARQUEE_ITEMS } from '@/data/marquee';

export default function Hero() {
  const { lang, t } = useLang();
  const words = SWAP_WORDS[lang];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const swapRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef(words);

  useEffect(() => {
    wordsRef.current = words;
    setCurrentWord(words[0]);
  }, [words]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) return;

      let index = 0;
      const ctx = gsap.context(() => {});

      const cycle = () => {
        ctx.add(() => {
          gsap.to(swapRef.current, {
            opacity: 0,
            y: 8,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => {
              const w = wordsRef.current;
              index = (index + 1) % w.length;
              setCurrentWord(w[index]);
              gsap.to(swapRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out',
              });
            },
          });
        });
      };

      const delayed = gsap.delayedCall(2.2, function loop() {
        cycle();
        gsap.delayedCall(2.2, loop);
      });

      return () => {
        ctx.revert();
        delayed.kill();
      };
    },
    { scope: containerRef, dependencies: [lang] },
  );

  const marqueeItems = MARQUEE_ITEMS.join(' · ');

  return (
    <header
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 text-center"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src="/hero/hero-web.mp4"
        poster="/hero/hero-poster.jpg"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(8,12,24,.45), rgba(8,12,24,.2)), linear-gradient(180deg, rgba(8,12,24,.5) 0%, rgba(8,12,24,.4) 45%, rgba(8,12,24,.72) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5">
        {/* Marquee */}
        <div
          className="group mx-auto mb-8 overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            maskImage:
              'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <div className="marquee-inner flex w-max whitespace-nowrap [animation:marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="text-[14px] font-medium uppercase tracking-[0.5px] text-white/50"
              >
                {marqueeItems} &middot;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Headline */}
        <h1 className="display-1 mx-auto max-w-[880px] text-white">
          {t('hero_a')}{' '}
          <span
            ref={swapRef}
            className="swap-text inline-block font-bold text-[#6ab0ff]"
          >
            {currentWord}
          </span>{' '}
          {t('hero_b')}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-[540px] text-[19px] leading-relaxed text-white/82">
          {t('hero_sub')}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5.5 py-3 font-medium text-white transition-colors hover:bg-primary-active"
          >
            {t('hero_cta1')}
          </a>
          <a
            href="#about"
            className="rounded-md border border-white/30 bg-white/12 px-4 py-2 text-[15px] text-white transition-colors hover:bg-white/20"
          >
            {t('hero_cta2')}
          </a>
        </div>
      </div>
    </header>
  );
}
