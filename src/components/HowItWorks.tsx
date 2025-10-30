import { UserPlus, FileCheck, DollarSign } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Set up your profile and showcase your annotation skills",
  },
  {
    icon: FileCheck,
    title: "Apply to Projects",
    description: "Browse opportunities from leading AI companies",
  },
  {
    icon: DollarSign,
    title: "Get Paid",
    description: "Complete work and receive consistent, reliable payment",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to start your journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative p-8 rounded-2xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold shadow-glow">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
