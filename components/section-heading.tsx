import { cn } from '@/lib/utils';
import { Reveal } from '@/components/reveal';
import { Ornament } from '@/components/ornament';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  id,
  className,
}: SectionHeadingProps) {
  const onDark = tone === 'light';
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && <p className={cn('eyebrow', onDark ? 'text-gold-400' : 'text-gold-700')}>{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          'max-w-3xl text-balance font-serif text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]',
          onDark ? 'text-ivory-50' : 'text-maroon-900'
        )}
      >
        {title}
      </h2>
      {align === 'center' && <Ornament />}
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-base leading-relaxed sm:text-lg',
            onDark ? 'text-ivory-200/75' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
