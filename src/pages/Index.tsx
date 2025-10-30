import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedOpportunities } from "@/components/FeaturedOpportunities";
import { WhyAnnotators } from "@/components/WhyAnnotators";
import { ForCompanies } from "@/components/ForCompanies";
import { InsightsBlog } from "@/components/InsightsBlog";
import { Vision } from "@/components/Vision";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Hero />
      <HowItWorks />
      <FeaturedOpportunities />
      <WhyAnnotators />
      <ForCompanies />
      <InsightsBlog />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
