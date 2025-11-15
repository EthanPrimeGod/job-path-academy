import { Hexagon } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <svg className="w-24 h-24 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(45 95% 58%)" />
                    <stop offset="100%" stopColor="hsl(260 60% 65%)" />
                  </linearGradient>
                </defs>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" 
                      stroke="url(#hexagonGradient)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full opacity-20 blur-xl animate-pulse" 
                     style={{ 
                       background: 'linear-gradient(135deg, hsl(45 95% 58%), hsl(260 60% 65%))',
                       animationDuration: '3s' 
                     }} />
              </div>
            </div>
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
