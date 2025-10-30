import { Button } from "@/components/ui/button";
import { Shield, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Vetted Talent",
    description: "Access pre-screened annotators with verified skills",
  },
  {
    icon: Users,
    title: "Scalable Teams",
    description: "Grow your annotation workforce on demand",
  },
  {
    icon: Zap,
    title: "Fast Deployment",
    description: "Start projects quickly with streamlined onboarding",
  },
];

export const ForCompanies = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                For Companies
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Hire skilled annotators fast. Build high-quality datasets with a trusted network of professionals ready to scale with your needs.
              </p>
              <Button variant="outline" size="lg">
                Start Hiring
              </Button>
            </div>
          </div>

          {/* Right features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-accent flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
