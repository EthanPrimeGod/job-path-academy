import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CompanySidebar } from "./CompanySidebar";

interface CompanyLayoutProps {
  children: ReactNode;
}

export const CompanyLayout = ({ children }: CompanyLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex">
        <CompanySidebar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
