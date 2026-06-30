'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow } from '@/components/Eyebrow';
import { Blobs } from '@/components/Blobs';
import { INTRO_ITEMS } from '@/data/intro';

const PARALLAX_DISTANCE = 40; // % translateX for incoming/outgoing slides
const TRANSITION_MS = 650;

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function VideoIntro() {
  const { lang, t } = useLang();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const touchStartX = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const count = INTRO_ITEMS.length;

  const goTo = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      // Pause whichever video is currently playing — only the active slide may play
      const current = INTRO_ITEMS[index];
      if (current.type === 'video') {
        const el = videoRefs.current[current.id];
        if (el) el.pause();
      }
      setPlayingId(null);
      setIndex((next + count) % count);
    },
    [index, count],
  );

  const handleNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const handlePrev = useCallback(() => goTo(index - 1), [goTo, index]);

  const handlePlay = useCallback((item: (typeof INTRO_ITEMS)[number]) => {
    const el = videoRefs.current[item.id];
    if (!el) return;
    el.muted = false;
    el.play();
    setPlayingId(item.id);
  }, []);

  const handleVideoEnd = useCallback(() => setPlayingId(null), []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative overflow-hidden py-[88px]">
      <Blobs variant="b" />

      <div className="relative z-10 mx-auto max-w-4xl px-5">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <Eyebrow>{t('video_eyebrow')}</Eyebrow>
            <h2 className="heading-1 mt-4">{t('video_title')}</h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[18px] text-ink-muted">
              {t('video_sub')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="blur" delay={0.15}>
          <div className="relative overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-2">
            <div
              className="relative aspect-video w-full overflow-hidden bg-secondary"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {INTRO_ITEMS.map((item, i) => (
                <Slide
                  key={item.id}
                  item={item}
                  isActive={i === index}
                  dir={dir}
                  reducedMotionRef={reducedMotionRef}
                  playing={playingId === item.id}
                  onPlay={() => handlePlay(item)}
                  onEnded={handleVideoEnd}
                  videoRef={(el) => { videoRefs.current[item.id] = el; }}
                  alt={lang === 'en' ? item.alt_en : item.alt_id}
                  priority={i === 0}
                />
              ))}

              {/* Prev / Next arrows */}
              {count > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label={lang === 'en' ? 'Previous' : 'Sebelumnya'}
                    className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label={lang === 'en' ? 'Next' : 'Berikutnya'}
                    className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {count > 1 && (
              <div className="flex items-center justify-center gap-2 border-t border-hairline bg-canvas py-3.5">
                {INTRO_ITEMS.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-primary' : 'w-2 bg-hairline hover:bg-ink-faint'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Slide({
  item,
  isActive,
  dir,
  reducedMotionRef,
  playing,
  onPlay,
  onEnded,
  videoRef,
  alt,
  priority,
}: {
  item: (typeof INTRO_ITEMS)[number];
  isActive: boolean;
  dir: 1 | -1;
  reducedMotionRef: React.RefObject<boolean>;
  playing: boolean;
  onPlay: () => void;
  onEnded: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
  alt: string;
  priority: boolean;
}) {
  const slideRef = useRef<HTMLDivElement>(null);
  const wasActive = useRef(isActive);

  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;

    if (reducedMotionRef.current) {
      el.style.transition = 'opacity 0.3s ease';
      el.style.transform = 'none';
      el.style.opacity = isActive ? '1' : '0';
      el.style.zIndex = isActive ? '10' : '0';
      el.style.pointerEvents = isActive ? 'auto' : 'none';
      wasActive.current = isActive;
      return;
    }

    if (isActive === wasActive.current) return;

    if (isActive) {
      // Entering: start offset by `dir`, then animate to center on next frame
      el.style.transition = 'none';
      el.style.zIndex = '10';
      el.style.transform = `translateX(${dir * PARALLAX_DISTANCE}%) scale(0.92)`;
      el.style.opacity = '0';
      el.style.pointerEvents = 'auto';

      // Force reflow so the transition below doesn't get coalesced with the reset above
      void el.getBoundingClientRect();

      requestAnimationFrame(() => {
        el.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1), opacity ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`;
        el.style.transform = 'translateX(0) scale(1)';
        el.style.opacity = '1';
      });
    } else {
      // Leaving: animate out toward -dir, drop below the incoming slide
      el.style.zIndex = '5';
      el.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1), opacity ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`;
      el.style.transform = `translateX(${-dir * PARALLAX_DISTANCE}%) scale(0.92)`;
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    }

    wasActive.current = isActive;
  }, [isActive, dir, reducedMotionRef]);

  return (
    <div
      ref={slideRef}
      className="absolute inset-0"
      style={{
        zIndex: isActive ? 10 : 0,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            playsInline
            preload="metadata"
            poster={item.poster}
            controls={playing}
            onEnded={onEnded}
            onPause={onEnded}
            src={item.src}
          />
          {!playing && (
            <button
              onClick={onPlay}
              aria-label="Putar video"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/20 text-white/80 transition-colors hover:bg-black/30"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-transform active:scale-90">
                <PlayIcon className="ml-1 h-8 w-8" />
              </span>
            </button>
          )}
        </>
      ) : (
        <Image
          src={item.src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 768px"
          priority={priority}
          unoptimized={item.src.endsWith('.svg')}
        />
      )}
    </div>
  );
}
