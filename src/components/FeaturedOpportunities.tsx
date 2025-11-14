import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const jobs = [
  {
    title: "Image Tagging for Retail AI",
    company: "TechVision AI",
    type: "Remote Contract",
  },
  {
    title: "Chatbot Data Reviewer",
    company: "ConversaAI",
    type: "Flexible Hours",
  },
  {
    title: "Audio Labeling for Speech Recognition",
    company: "VoiceWorks",
    type: "Entry-Level",
  },
];

export const FeaturedOpportunities = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Featured Opportunities
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore real AI annotation jobs available on our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {jobs.map((job, index) => (
            <div
              key={job.title}
              className="p-8 rounded-2xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-xl font-medium mb-4 leading-tight">
                {job.title}
              </h3>
              
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Listing
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
