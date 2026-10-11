'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  /** `fade` rises content into view; `image` unmasks it with a clip-path. */
  variant?: 'fade' | 'image';
  as?: 'div' | 'li' | 'article' | 'figure' | 'section';
  style?: CSSProperties;
}

/** Reveals children when they scroll into view (one-shot, CSS-driven). */
export function Reveal({ children, className, delay = 0, variant = 'fade', as: Tag = 'div', style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(variant === 'image' ? 'reveal-image' : 'reveal', className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
