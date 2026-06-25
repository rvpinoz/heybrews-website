'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

const PHOTOS = [
  '/member/@adhityairama.png',
  '/member/@baristanatto.png',
  '/member/@braypresso.png',
  '/member/@derd.time.png',
  '/member/@famarawj_.png',
  '/member/@ganang_baristaisme.png',
  '/member/@gracielasgsn.png',
  '/member/@intannsdw.png',
  '/member/@irianiirinn.png',
  '/member/@keepitwildvibes.png',
  '/member/@kopimulu_.png',
  '/member/@leosukangopi.png',
  '/member/@letsbrewit.png',
  '/member/@mas.haff.png',
  '/member/@omjeka.coffee.png',
  '/member/@ritual_pagi_.png',
  '/member/@suryadioei.png',
  '/member/@yanghotaja.png',
];

function randomSpread() {
  const angle = Math.random() * Math.PI * 2;
  const dist = 60 + Math.random() * 100;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: -20 + Math.random() * 40,
  };
}

export default function PhotoCollage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);
  const isSpread = useRef(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const photos = photosRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(photos, { x: 0, y: 0, rotation: 0, scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 25%',
          scrub: 0.8,
        },
      });

      photos.forEach((photo, i) => {
        tl.to(
          photo,
          {
            opacity: 1,
            scale: 1,
            rotation: (i % 2 === 0 ? -1 : 1) * (2 + (i % 6)),
            duration: 0.3,
            ease: 'back.out(1.7)',
          },
          i * 0.06,
        );
      });
    },
    { scope: containerRef },
  );

  const handleEnter = useCallback(() => {
    const photos = photosRef.current.filter(Boolean) as HTMLDivElement[];
    if (isSpread.current) return;
    isSpread.current = true;

    photos.forEach((photo, i) => {
      const s = randomSpread();
      gsap.to(photo, {
        x: s.x,
        y: s.y,
        rotation: s.rotate,
        scale: 0.55,
        duration: 0.6 + Math.random() * 0.3,
        ease: 'expo.out',
        delay: i * 0.02,
      });
    });
  }, []);

  const handleLeave = useCallback(() => {
    const photos = photosRef.current.filter(Boolean) as HTMLDivElement[];
    if (!isSpread.current) return;
    isSpread.current = false;

    photos.forEach((photo, i) => {
      gsap.to(photo, {
        x: 0,
        y: 0,
        rotation: (i % 2 === 0 ? -1 : 1) * (2 + (i % 6)),
        scale: 1,
        duration: 0.5 + Math.random() * 0.2,
        ease: 'back.out(1.4)',
        delay: i * 0.015,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square overflow-hidden rounded-xl border border-hairline bg-canvas-soft cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          ref={(el) => { photosRef.current[i] = el; }}
          className="absolute inset-0 m-auto h-[35%] w-[35%] overflow-hidden rounded-xl border-[3px] border-white shadow-2"
          style={{ zIndex: i + 1 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:900px) 40vw, 20vw"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
