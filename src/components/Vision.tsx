import visionImage from "@/assets/hive-honey-flow.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image, Headphones, FileText, Box } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "Image Segmentation",
    category: "Computer Vision",
    description: "Master pixel-perfect boundaries by practicing object isolation and semantic segmentation on real-world imagery.",
    icon: Image,
    exercises: 12
  },
  {
    title: "Audio Tagging",
    category: "Audio",
    description: "Train your ear to identify and classify sounds, from environmental noise to speech patterns in audio data.",
    icon: Headphones,
    exercises: 8
  },
  {
    title: "Text Classification",
    category: "NLP",
    description: "Sharpen your ability to categorize, label, and understand nuances in natural language datasets.",
    icon: FileText,
    exercises: 15
  },
  {
    title: "Bounding Box Precision",
    category: "Computer Vision",
    description: "Refine your accuracy in drawing tight, consistent bounding boxes around objects of all shapes and sizes.",
    icon: Box,
    exercises: 10
  }
];

export const Vision = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background with warm gradient */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={visionImage} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-500/5 to-background" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            The Hive
          </h2>
          <p className="text-muted-foreground text-lg">
            Where skills take shape.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {modules.map((module, index) => (
            <div 
              key={module.title} 
              className="group rounded-2xl bg-card backdrop-blur-sm border border-border shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-8 pb-6">
                {/* Icon in hexagonal container */}
                <div className="w-16 h-16 hexagon-clip bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 mx-auto">
                  <module.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Category badge */}
                <div className="flex justify-center mb-3">
                  <Badge variant="outline" className="text-xs">
                    {module.category}
                  </Badge>
                </div>
                
                {/* Title & description */}
                <h3 className="text-xl font-medium mb-3 text-center">
                  {module.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-center">
                  {module.description}
                </p>
                
                {/* Exercise count */}
                <div className="text-sm text-primary/80 text-center">
                  {module.exercises} exercises
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30" asChild>
            <Link to="/hive">Enter the Hive</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
