'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Wraps a vertical timeline and draws a gold line that fills as the user scrolls
 * through it. The track sits at 24px (mobile) / centre (md+), matching the step markers.
 */
export function ScrollProgressLine({ children, className }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const bar = fill.current;
    if (!el || !bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.65;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / rect.height));
      bar.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrap} className={cn('relative', className)}>
      <div className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-gold-500/15 md:left-1/2" aria-hidden="true">
        <div ref={fill} className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-gold-300 to-gold-600" />
      </div>
      {children}
    </div>
  );
}
