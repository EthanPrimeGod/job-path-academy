import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import annotatLogo from "@/assets/annota-logo.png";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Jobs", href: "/jobs", active: true },
    { label: "Academy", href: "#", active: false, comingSoon: true },
    { label: "Blog", href: "#", active: true },
    { label: "About", href: "#", active: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/60 backdrop-blur-glass border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={annotatLogo} 
              alt="Annota" 
              className="h-8 w-8 transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-light hidden sm:block">Annota</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.comingSoon && (
                  <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
                {link.active && link.href.startsWith('/') ? (
                  <Link
                    to={link.href}
                    className="text-sm font-medium transition-colors text-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      link.active
                        ? "text-foreground hover:text-primary"
                        : "text-muted-foreground/50 cursor-not-allowed"
                    }`}
                    onClick={(e) => !link.active && e.preventDefault()}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <div key={link.label} className="relative">
                    {link.comingSoon && (
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                        Coming Soon
                      </span>
                    )}
                    {link.active && link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="block text-base font-medium transition-colors text-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`block text-base font-medium transition-colors ${
                          link.active
                            ? "text-foreground hover:text-primary"
                            : "text-muted-foreground/50 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          if (!link.active) e.preventDefault();
                          else setIsOpen(false);
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button variant="default" className="w-full justify-start">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
