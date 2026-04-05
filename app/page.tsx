import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ProvidersStats from "@/components/ProvidersStats";
import { CTASection, Footer } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ProvidersStats />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
