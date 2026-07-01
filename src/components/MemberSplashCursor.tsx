'use client';

import { useState, useEffect } from 'react';
import SplashCursor from './SplashCursor';

export default function MemberSplashCursor() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer   = window.matchMedia('(pointer: fine)');
    const minWidth      = window.matchMedia('(min-width: 1024px)');

    function evaluate() {
      // Only show on desktop with a fine pointer (mouse) and no reduced-motion preference
      setShow(!reducedMotion.matches && finePointer.matches && minWidth.matches);
    }

    evaluate();
    reducedMotion.addEventListener('change', evaluate);
    finePointer.addEventListener('change', evaluate);
    minWidth.addEventListener('change', evaluate);

    return () => {
      reducedMotion.removeEventListener('change', evaluate);
      finePointer.removeEventListener('change', evaluate);
      minWidth.removeEventListener('change', evaluate);
    };
  }, []);

  if (!show) return null;
  return <SplashCursor RAINBOW_MODE={false} COLOR="#004AAD" />;
}
