import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Briefcase, MapPin, DollarSign, FileText, ExternalLink, MessageSquare } from "lucide-react";
import { Application, ApplicationStatus } from "@/types/application";

// Mock data - same as in AccountApplications
const mockApplications: Application[] = [
  {
    id: "1",
    annotatorId: "user1",
    jobId: "1",
    companyId: "comp1",
    jobTitle: "Image Annotation Specialist",
    companyName: "TechVision AI",
    coverNote: "I am very interested in this position and believe my skills in computer vision annotation would be valuable to your team. I have over 2 years of experience with various annotation tools and have consistently maintained high accuracy rates across diverse datasets.",
    resumeUrl: "/uploads/resume.pdf",
    resumeFilename: "alex_chen_resume.pdf",
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
    coverNote: "I have experience with NLP annotation and am excited about this opportunity.",
    resumeUrl: "/uploads/resume.pdf",
    resumeFilename: "alex_chen_resume.pdf",
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

const AccountApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = mockApplications.find(app => app.id === id);

  if (!application) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Application not found</h2>
          <Button onClick={() => navigate("/account/applications")}>
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const getStatusStep = (status: ApplicationStatus): number => {
    const steps: Record<ApplicationStatus, number> = {
      applied: 1,
      in_review: 2,
      interview: 3,
      hired: 4,
      rejected: 4
    };
    return steps[status];
  };

  const currentStep = getStatusStep(application.status);

  return (
    <div className="space-y-8">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/account/applications")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </Button>
        <h1 className="text-3xl font-light mb-2">{application.jobTitle}</h1>
        <p className="text-muted-foreground">{application.companyName}</p>
      </div>

      {/* Job Info Card */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">{application.jobTitle}</h3>
              <p className="text-muted-foreground">{application.companyName}</p>
            </div>
          </div>
          <Badge variant={statusConfig[application.status].variant}>
            {statusConfig[application.status].label}
          </Badge>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          {application.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{application.location}</span>
            </div>
          )}
          {application.expectedPay && (
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>{application.expectedPay}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/jobs`}>
              View job posting
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/account/messages/${application.id}`}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Open conversation
            </Link>
          </Button>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border-border">
        <h3 className="text-lg font-medium mb-6">Application Timeline</h3>
        
        <div className="space-y-6">
          {[
            { step: 1, label: "Applied", status: "applied" as ApplicationStatus },
            { step: 2, label: "In review", status: "in_review" as ApplicationStatus },
            { step: 3, label: "Interview", status: "interview" as ApplicationStatus },
            { step: 4, label: application.status === "rejected" ? "Rejected" : "Hired", status: application.status === "rejected" ? "rejected" as ApplicationStatus : "hired" as ApplicationStatus }
          ].map(({ step, label, status }) => {
            const isActive = step <= currentStep;
            const isCurrent = step === currentStep;
            
            return (
              <div key={step} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`font-medium ${isActive ? "" : "text-muted-foreground"}`}>
                    {label}
                  </p>
                  {isCurrent && application.lastStatusChange && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(application.lastStatusChange)}
                    </p>
                  )}
                  {step === 1 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(application.appliedAt)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Application Details */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border-border">
        <h3 className="text-lg font-medium mb-4">Your Application</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Cover Note</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {application.coverNote}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3">Resume</h4>
            <Button variant="outline" size="sm" asChild>
              <a href={application.resumeUrl} download>
                <FileText className="w-4 h-4 mr-2" />
                {application.resumeFilename}
              </a>
            </Button>
          </div>

          {(application.expectedPay || application.availability || application.location) && (
            <>
              <Separator />
              <div className="grid md:grid-cols-2 gap-4">
                {application.expectedPay && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Expected Pay</h4>
                    <p className="text-sm text-muted-foreground">{application.expectedPay}</p>
                  </div>
                )}
                {application.availability && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Availability</h4>
                    <p className="text-sm text-muted-foreground">{application.availability}</p>
                  </div>
                )}
                {application.location && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Location / Timezone</h4>
                    <p className="text-sm text-muted-foreground">{application.location}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-1">Profile Visibility</h4>
            <p className="text-sm text-muted-foreground">
              {application.allowProfileView
                ? "Company can view your Annota profile"
                : "Profile visibility restricted"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountApplicationDetail;
