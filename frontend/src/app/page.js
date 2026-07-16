import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Pricing } from "@/components/home/Pricing";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ContactSection } from "@/components/inquiry/ContactSection";

// The landing page only decides the order of the sections.
// Each section owns its own markup and data, so this file stays readable.
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </main>
  );
}
