import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-16 rounded-3xl bg-gradient-accent border border-border/50 shadow-glow backdrop-blur-glass">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Start Earning.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
              Start Growing.
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join Annota — the job board designed for the next generation of AI professionals
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button variant="crayon-green" size="lg" asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
            <Button variant="outline" size="lg">
              Post a Job
            </Button>
          </div>

          <p className="text-sm text-muted-foreground/60 font-light">
            Join the hive. Build the future of AI.
          </p>
        </div>
      </div>
    </section>
  );
};
