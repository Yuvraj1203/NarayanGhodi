import { cn } from '@/lib/utils';

/** Restrained Rajasthani-inspired divider: hairlines flanking a small jharokha-arch motif. */
export function Ornament({ className, tone = 'gold' }: { className?: string; tone?: 'gold' | 'maroon' }) {
  const color = tone === 'gold' ? 'text-gold-500' : 'text-maroon-700';
  return (
    <div className={cn('flex items-center justify-center gap-3', color, className)} aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-current opacity-70 sm:w-16" />
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="shrink-0">
        <path
          d="M2 15 L2 9 Q2 3 8 3 Q10 3 11 1 Q12 3 14 3 Q16 3 17 1 Q18 3 20 3 Q26 3 26 9 L26 15"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M14 7 L16 9.5 L14 12 L12 9.5 Z" fill="currentColor" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-current opacity-70 sm:w-16" />
    </div>
  );
}

/** Thin gold corner brackets for framing panels. */
export function CornerFrame({ className }: { className?: string }) {
  const corner = 'absolute h-5 w-5 border-gold-500/70';
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden="true">
      <span className={cn(corner, 'left-0 top-0 border-l border-t')} />
      <span className={cn(corner, 'right-0 top-0 border-r border-t')} />
      <span className={cn(corner, 'bottom-0 left-0 border-b border-l')} />
      <span className={cn(corner, 'bottom-0 right-0 border-b border-r')} />
    </div>
  );
}
