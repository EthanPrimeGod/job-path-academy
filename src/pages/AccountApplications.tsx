import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Search } from "lucide-react";
import { Application, ApplicationStatus } from "@/types/application";

// Mock data
const mockApplications: Application[] = [
  {
    id: "1",
    annotatorId: "user1",
    jobId: "1",
    companyId: "comp1",
    jobTitle: "Image Annotation Specialist",
    companyName: "TechVision AI",
    coverNote: "I am very interested in this position...",
    resumeUrl: "/uploads/resume.pdf",
    resumeFilename: "resume.pdf",
    status: "in_review",
    expectedPay: "$25/hr",
    availability: "40 hrs/week",
    location: "USA - EST",
    allowProfileView: true,
    appliedAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-12T14:30:00Z",
    lastStatusChange: "2024-03-12T14:30:00Z"
  },
  {
    id: "2",
    annotatorId: "user1",
    jobId: "2",
    companyId: "comp2",
    jobTitle: "NLP Data Labeler",
    companyName: "ConversaAI",
    coverNote: "I have experience with NLP annotation...",
    resumeUrl: "/uploads/resume.pdf",
    resumeFilename: "resume.pdf",
    status: "applied",
    allowProfileView: true,
    appliedAt: "2024-03-08T15:00:00Z",
    updatedAt: "2024-03-08T15:00:00Z"
  }
];

const statusConfig: Record<ApplicationStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  applied: { label: "Applied", variant: "secondary" },
  in_review: { label: "In Review", variant: "default" },
  interview: { label: "Interview", variant: "default" },
  hired: { label: "Hired", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" }
};

const AccountApplications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInDays = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light mb-2">Job Applications</h1>
        <p className="text-muted-foreground">Track your job applications and opportunities</p>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border-border">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            {Object.entries(statusConfig).map(([status, config]) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status as ApplicationStatus)}
              >
                {config.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Link key={application.id} to={`/account/applications/${application.id}`}>
              <Card className="p-6 bg-card/50 backdrop-blur-glass border-border hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-medium mb-1">{application.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{application.companyName}</p>
                      </div>
                      <Badge variant={statusConfig[application.status].variant}>
                        {statusConfig[application.status].label}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Applied {getTimeAgo(application.appliedAt)}
                      {application.lastStatusChange && application.lastStatusChange !== application.appliedAt && (
                        <> · Updated {getTimeAgo(application.lastStatusChange)}</>
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-card/50 backdrop-blur-glass border-border">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-3">
            {searchQuery || statusFilter !== "all" ? "No applications found" : "You haven't applied to any jobs yet"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters to see more results"
              : "Browse our job board and start applying to opportunities that match your skills"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Link to="/jobs">
              <Button>Browse Available Jobs</Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
};

export default AccountApplications;
