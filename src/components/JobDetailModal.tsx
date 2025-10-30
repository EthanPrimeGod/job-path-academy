import { Job } from "@/types/job";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Briefcase, Target, DollarSign, Calendar, ExternalLink } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card backdrop-blur-glass border-border/50 rounded-3xl">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-medium mb-2">
                {job.title}
              </DialogTitle>
              <p className="text-xl text-muted-foreground">{job.company}</p>
              {job.featured && (
                <span className="inline-block mt-2 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
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

          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </DialogHeader>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Job Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {job.fullDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Responsibilities</h3>
            <ul className="space-y-2 ml-4">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="text-muted-foreground leading-relaxed list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Requirements</h3>
            <ul className="space-y-2 ml-4">
              {job.requirements.map((item, i) => (
                <li key={i} className="text-muted-foreground leading-relaxed list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-4">
          <Button
            variant="hero"
            size="lg"
            className="flex-1"
            asChild
          >
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Apply on Company Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
