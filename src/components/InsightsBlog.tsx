import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import breakingInImage from "@/assets/blog-breaking-into-ai.jpg";
import labelingProImage from "@/assets/blog-labeling-pro.jpg";
import lifeAnnotatorImage from "@/assets/blog-life-annotator.jpg";

const articles = [
  {
    title: "Breaking Into AI Annotation",
    description: "Everything you need to know to start your career in data annotation",
    image: breakingInImage,
  },
  {
    title: "How to Label Data Like a Pro",
    description: "Best practices and techniques from experienced annotators",
    image: labelingProImage,
  },
  {
    title: "Behind the Scenes: Life as an Annotator",
    description: "Real stories from professionals shaping the future of AI",
    image: lifeAnnotatorImage,
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
              className="group rounded-2xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>
              <div className="p-8">
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
