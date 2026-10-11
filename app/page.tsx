import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FloatingActions } from '@/components/floating-actions';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { GhodiCollection } from '@/components/sections/ghodi-collection';
import { Experience } from '@/components/sections/experience';
import { Gallery } from '@/components/sections/gallery';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Reviews } from '@/components/sections/reviews';
import { Enquiry } from '@/components/sections/enquiry';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-maroon-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="page-in">
        <Hero />
        <About />
        <Services />
        <GhodiCollection />
        <Experience />
        <Gallery />
        <WhyChooseUs />
        <Reviews />
        <Enquiry />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
