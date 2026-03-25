
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { DomainSearch } from "@/components/sections/DomainSearch";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DomainSearch />
      <Features />
      <Pricing />
      <About />
      <Testimonials />
      <Footer />
    </main>
  );
}
