import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import heroImage from "@/assets/hero-abstract.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic will go here
    console.log("Sign in attempt:", { email });
  };

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      
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
        <div className="relative z-10 w-full max-w-md mx-auto px-6 animate-fade-in">
          <div className="p-8 rounded-3xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-glow">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to continue to{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
                  Annota
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
      </section>
    </div>
  );
};

export default SignIn;
