import Image from 'next/image';
import { BUSINESS } from '@/lib/site-data';
import { cn } from '@/lib/utils';

/**
 * Business logo. Shows BUSINESS.logo when supplied; otherwise a placeholder
 * monogram so the layout is ready for the real logo.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      {BUSINESS.logo ? (
        <Image src={BUSINESS.logo} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
      ) : (
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center" aria-hidden="true">
          <span className="absolute inset-1 rotate-45 border border-gold-500/70" />
          <span className="absolute inset-[9px] rotate-45 border border-gold-500/30" />
          <span className="relative font-serif text-xl font-semibold text-gold-400">N</span>
        </span>
      )}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-lg font-semibold tracking-wide text-ivory-50 sm:text-xl">
            {BUSINESS.shortName}
          </span>
          <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-400">
            Ghodi Wale
          </span>
        </span>
      )}
    </span>
  );
}
