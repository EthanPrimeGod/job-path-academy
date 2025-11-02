import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-abstract.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
          <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
            Join The Hive
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
          Annota connects skilled annotators with companies shaping tomorrow's technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/jobs">Find Jobs</Link>
          </Button>
          <Button variant="glass" size="lg">
            Post Jobs
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
};
