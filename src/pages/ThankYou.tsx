import { Hexagon } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <Hexagon className="w-24 h-24 text-primary" strokeWidth={1.5} />
          </div>

          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6">
            Thank You
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Annota is temporarily offline while we rebuild for a major new version. 
            We're building something extraordinary.
          </p>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-3xl mx-auto text-center bg-background/60 backdrop-blur-sm rounded-2xl p-12">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            Thank you to everyone who signed up and supported Annota so far. 
            We're building something <span className="text-primary font-medium">bigger</span>, <span className="text-primary font-medium">sharper</span>, and <span className="text-primary font-medium">more powerful</span> — and we can't wait to have you 
            with us for the next chapter.
          </p>
        </div>
      </section>
    </div>
  );
}
