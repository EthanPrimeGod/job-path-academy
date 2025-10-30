import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-16 rounded-3xl bg-gradient-accent border border-border/50 shadow-glow backdrop-blur-glass">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Start Earning.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
              Start Building.
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join the future of AI annotation work today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Browse Jobs
            </Button>
            <Button variant="outline" size="lg">
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
