import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CompanySidebar } from "./CompanySidebar";

interface CompanyLayoutProps {
  children: ReactNode;
}

export const CompanyLayout = ({ children }: CompanyLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <div className="flex-1 flex relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none" />
        <CompanySidebar />
        <main className="flex-1 p-6 lg:p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
