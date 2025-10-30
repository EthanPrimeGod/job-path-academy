import { Clock, Building2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Clock,
    title: "Flexible Work",
    description: "Choose projects that fit your schedule and work at your own pace",
  },
  {
    icon: Building2,
    title: "Real Companies",
    description: "Partner with established organizations building the future of AI",
  },
  {
    icon: Target,
    title: "Meaningful Projects",
    description: "Contribute to cutting-edge technology that shapes tomorrow",
  },
];

export const ForAnnotators = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-accent opacity-30" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            For Annotators
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join a growing community of skilled professionals shaping the AI landscape
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="p-8 rounded-2xl bg-card/60 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 inline-flex p-3 rounded-lg bg-primary/10">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Browse Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};
