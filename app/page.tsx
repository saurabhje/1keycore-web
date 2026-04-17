import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ProvidersStats from "@/components/ProvidersStats";
import { CTASection, Footer } from "@/components/CtaFooter";
import { cookies } from "next/headers";
export default function Home() {
  const isLoggedIn: boolean = cookies().has("access_token");
  return (
    <>
      <Navbar  isLoggedIn={isLoggedIn} />
      <main>
        <Hero/>
        <HowItWorks />
        <Features />
        {/* <ProvidersStats />
        <CTASection /> */}
      </main>
      <Footer />
    </>
  );
}
