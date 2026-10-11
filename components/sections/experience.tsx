import Image from 'next/image';
import { EXPERIENCE_STEPS } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { ScrollProgressLine } from '@/components/scroll-progress-line';

const BACKDROP = 'https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg?auto=compress&cs=tinysrgb&w=1920';

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="relative isolate overflow-hidden bg-charcoal-950 py-20 sm:py-28">
      <Image src={BACKDROP} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal-950 via-maroon-950/85 to-charcoal-950" />

      <div className="container-site">
        <SectionHeading
          id="experience-title"
          tone="light"
          eyebrow="The Wedding Experience"
          title={
            <>
              Four steps to your <em className="text-gold-300">royal entry</em>
            </>
          }
        />

        <ScrollProgressLine className="relative mx-auto mt-16 max-w-4xl">
          <ol className="relative space-y-12 sm:space-y-16">
            {EXPERIENCE_STEPS.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li key={step.number} className="relative grid grid-cols-[48px_1fr] gap-6 md:grid-cols-[1fr_64px_1fr] md:gap-10">
                  {/* Marker */}
                  <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                    <span className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-400/70 bg-maroon-950 shadow-[0_0_0_6px_hsl(20_24%_6%)] md:h-14 md:w-14">
                      <span className="-rotate-45 font-serif text-lg font-semibold text-gold-300 md:text-xl">{step.number}</span>
                    </span>
                  </div>
                  <Reveal
                    delay={80}
                    className={
                      right
                        ? 'md:col-start-3 md:row-start-1 md:pt-2'
                        : 'md:col-start-1 md:row-start-1 md:pt-2 md:text-right'
                    }
                  >
                    <p className="eyebrow text-gold-400">Step {step.number}</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-ivory-50 sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory-200/70 sm:text-base md:inline-block">
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </ScrollProgressLine>

        <Reveal className="mt-16 text-center">
          <a href="#enquiry" className="btn-gold px-9">
            Start with Step 01
          </a>
        </Reveal>
      </div>
    </section>
  );
}
