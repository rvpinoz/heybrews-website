'use client';

import { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 3;
        return next > 90 ? 90 : next;
      });
    }, 120);

    const onLoad = () => {
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => setDone(true), 400);
      setTimeout(() => setVisible(false), 1000);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      clearInterval(tick);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-primary transition-opacity duration-500 ${
        done ? 'opacity-0 pointer-events-none' : ''
      }`}
    >
      {/* Steam bars */}
      <div className="mb-5 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-sm bg-white/50"
            style={{
              width: 3,
              height: i === 1 ? 24 : i === 2 ? 14 : 18,
              animation: 'steam 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div style={{ animation: 'preloaderPulse 1.6s ease-in-out infinite' }}>
        <BrandLogo
          className="h-20 w-20 rounded-[18px]"
          bgColor="#F6EDE4"
          fgColor="#004AAD"
        />
      </div>

      {/* Text */}
      <p className="mt-7 text-[13px] font-semibold uppercase tracking-[2px] text-white/70">
        Brewing...
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/12">
        <span
          className="block h-full rounded-r-sm bg-canvas-soft transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
