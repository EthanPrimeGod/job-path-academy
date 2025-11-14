import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden bg-background">
      {/* Geometric colored shapes */}
      <div className="absolute top-20 right-1/4 w-24 h-24 rounded-full bg-crayon-red opacity-80" />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-crayon-blue opacity-80" />
      <div className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-crayon-yellow opacity-60" />
      <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-crayon-green opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-foreground">
          Join the hive.
          <br />
          <span className="inline-block mt-2">Build the Future of AI.</span>
        </h1>
        
        {/* Rainbow underline */}
        <div className="flex justify-center mb-8">
          <div className="h-1 w-64 rounded-full" style={{
            background: 'linear-gradient(to right, hsl(0 100% 63%), hsl(24 100% 60%), hsl(48 100% 62%), hsl(145 45% 60%), hsl(214 100% 65%), hsl(248 79% 68%), hsl(270 68% 73%))'
          }} />
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-normal">
          Annota connects skilled annotators with companies shaping tomorrow's technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="crayon-yellow" size="lg" asChild>
            <Link to="/jobs">Find Jobs</Link>
          </Button>
          <Button variant="outline" size="lg">
            Post Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};
