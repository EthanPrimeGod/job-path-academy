import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HexagonPattern } from "@/components/HexagonPattern";
import { Award, BookOpen, Briefcase, Hexagon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ThankYou() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list!",
        description: "We'll notify you as soon as we relaunch.",
      });
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <HexagonPattern opacity={0.05} />
        
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-accent opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Abstract bee/hive icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Hexagon className="w-24 h-24 text-primary animate-pulse" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full opacity-60 blur-xl" />
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
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            Thank you to everyone who signed up and supported Annota so far. 
            We're building something <span className="text-primary font-medium">bigger</span>, 
            <span className="text-secondary font-medium"> sharper</span>, and 
            <span className="text-accent font-medium"> more powerful</span> — and we can't wait to have you 
            with us for the next chapter.
          </p>
        </div>
      </section>

      {/* What's Coming Next Section */}
      <section className="py-20 px-6 relative">
        <HexagonPattern opacity={0.02} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
            What's Coming Next
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Redesigned Learning Hub</CardTitle>
                <CardDescription>
                  A completely reimagined learning experience with interactive modules 
                  and real-time progress tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2 */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Micro-Credential Badges</CardTitle>
                <CardDescription>
                  Earn verified credentials as you master new annotation skills. 
                  Showcase your expertise to employers.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3 */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Rebuilt Job Board</CardTitle>
                <CardDescription>
                  A smarter job matching system with seamless applications 
                  and direct company connections.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-light mb-6">Stay in the Loop</h3>
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input/50 backdrop-blur-sm"
            />
            <Button type="submit" variant="default">
              Notify Me
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-border/50 mt-20">
        <HexagonPattern opacity={0.03} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-light">
              Annota
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 Annota. Building the future of AI annotation.
          </div>
        </div>
      </footer>
    </div>
  );
}
