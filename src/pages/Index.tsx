import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ForAnnotators } from "@/components/ForAnnotators";
import { ForCompanies } from "@/components/ForCompanies";
import { Vision } from "@/components/Vision";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Hero />
      <HowItWorks />
      <ForAnnotators />
      <ForCompanies />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
