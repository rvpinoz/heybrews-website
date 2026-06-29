'use client';

import { useRef, useState, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Eyebrow } from '@/components/Eyebrow';
import { Blobs } from '@/components/Blobs';

export default function VideoIntro() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play();
    setPlaying(true);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setPlaying(false);
  }, []);

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
            <div className="relative aspect-video w-full bg-secondary">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                preload="metadata"
                poster="/intro/hero-web-poster.jpg"
                controls={playing}
                onEnded={handleVideoEnd}
                onPause={handleVideoEnd}
                src="/intro/hero-web.mp4"
              />

              {/* Play overlay — hides once playing */}
              {!playing && (
                <button
                  onClick={handlePlay}
                  aria-label="Putar video"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/20 text-white/80 transition-colors hover:bg-black/30"
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-transform active:scale-90">
                    <svg className="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
