import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LandingPageCreateLogo } from "@/components/LandingPageCreateLogo";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <LandingPageCreateLogo />
      <Faq />
      <Toaster richColors/>
    </div>
  );
}
