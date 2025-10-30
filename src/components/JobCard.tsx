import { Job } from "@/types/job";
import { MapPin, Briefcase, Target, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: Job;
  onClick: () => void;
  index: number;
}

export const JobCard = ({ job, onClick, index }: JobCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group p-8 rounded-2xl bg-card/40 backdrop-blur-glass border border-border/50 shadow-soft hover:shadow-glow hover:border-primary/30 transition-all duration-500 cursor-pointer animate-scale-in relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {job.featured && (
        <div className="absolute top-4 right-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-medium shadow-glow animate-pulse">
          ⭐ Featured
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          <span>{job.experienceLevel}</span>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.slice(0, 3).map((tag, i) => {
          const colors = [
            "bg-primary/10 text-primary border border-primary/20",
            "bg-secondary/10 text-secondary border border-secondary/20",
            "bg-accent/10 text-accent border border-accent/20"
          ];
          return (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-medium ${colors[i % colors.length]}`}
            >
              {tag}
            </span>
          );
        })}
        {job.tags.length > 3 && (
          <span className="px-3 py-1 rounded-full bg-gradient-accent text-muted-foreground text-xs font-medium border border-border/50">
            +{job.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
        {job.payRange && (
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            <span>{job.payRange}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Posted {job.postedDate}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors">
        View Details
      </Button>
    </div>
  );
};
