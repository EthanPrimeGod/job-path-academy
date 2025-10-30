import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Breaking Into AI Annotation",
    description: "Everything you need to know to start your career in data annotation",
  },
  {
    title: "How to Label Data Like a Pro",
    description: "Best practices and techniques from experienced annotators",
  },
  {
    title: "Behind the Scenes: Life as an Annotator",
    description: "Real stories from professionals shaping the future of AI",
  },
];

export const InsightsBlog = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Insights & Resources
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay inspired and informed with guides, spotlights, and annotation best practices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <div
              key={article.title}
              className="group p-8 rounded-2xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {article.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Visit Blog
          </Button>
        </div>
      </div>
    </section>
  );
};
