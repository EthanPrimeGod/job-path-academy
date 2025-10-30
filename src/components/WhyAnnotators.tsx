import { Unlock, TrendingUp, BookOpen, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: Unlock,
    title: "Low Barrier to Entry",
    description: "Skip long tests and complicated onboarding. Start browsing opportunities right away",
  },
  {
    icon: TrendingUp,
    title: "Skill Growth Support",
    description: "Leverage your existing experience or sharpen your skills through our learning content",
  },
  {
    icon: BookOpen,
    title: "Ongoing Insights & Resources",
    description: "Our blog features guides, project spotlights, and annotation tips",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description: "Find jobs suited to your experience level — whether you're new or advanced",
  },
  {
    icon: Sparkles,
    title: "Evolving Ecosystem",
    description: "Annota Academy (coming soon) will help you learn, test, and grow through interactive modules",
  },
];

export const WhyAnnotators = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-accent opacity-30" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Why Annotators Choose Annota
          </h2>
          <p className="text-muted-foreground text-lg">
            A transparent, accessible platform built for everyone — from newcomers to experienced professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-accent">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
