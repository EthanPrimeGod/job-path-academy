import { useState } from "react";
import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockApplicants } from "@/data/company-mock";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CompanyApplicantDetail() {
  const { applicantId } = useParams();
  const applicant = mockApplicants.find(a => a.id === applicantId);
  const [stage, setStage] = useState(applicant?.stage || "applied");

  if (!applicant) {
    return (
      <CompanyLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Applicant not found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/company/applicants">Back to Applicants</Link>
          </Button>
        </div>
      </CompanyLayout>
    );
  }

  const handleStageChange = (newStage: string) => {
    setStage(newStage as typeof stage);
    toast({
      title: "Stage updated",
      description: `Candidate moved to ${newStage} stage`,
    });
  };

  const handleAdvance = () => {
    toast({
      title: "Candidate advanced",
      description: "The candidate has been moved to the next stage",
    });
  };

  const handleReject = () => {
    toast({
      title: "Candidate rejected",
      description: "The candidate has been notified",
      variant: "destructive",
    });
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      applied: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      screen: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      interview: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      offer: "bg-green-500/10 text-green-500 border-green-500/20",
    };
    return colors[stage] || colors.applied;
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm">
          <Link to="/company/applicants">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applicants
          </Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">{applicant.name}</h1>
            <p className="text-muted-foreground">{applicant.jobTitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={stage} onValueChange={handleStageChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screen">Screen</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild variant="outline">
              <Link to="/company/messages/1">
                <Mail className="h-4 w-4 mr-2" />
                Message
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Application Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{applicant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Applied Date</p>
                    <p className="font-medium">{applicant.appliedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Stage</p>
                    <Badge variant="outline" className={getStageColor(stage)}>
                      {stage}
                    </Badge>
                  </div>
                  {applicant.score && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Assessment Score</p>
                      <p className="font-medium text-lg">{applicant.score}%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cover Note</h2>
                <p className="text-sm leading-relaxed">{applicant.coverNote}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Resume</h2>
                <Button variant="outline" asChild>
                  <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    View Resume
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Actions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="text-sm font-medium">Applied</p>
                      <p className="text-xs text-muted-foreground">{applicant.appliedDate}</p>
                    </div>
                  </div>
                  {applicant.score && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <p className="text-sm font-medium">Completed Assessment</p>
                        <p className="text-xs text-muted-foreground">Score: {applicant.score}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full" onClick={handleAdvance}>
                    Advance to Next Stage
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleReject}>
                    Reject Application
                  </Button>
                </div>
              </CardContent>
            </Card>

            {applicant.score && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Assessment Scores</h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Overall</span>
                        <span className="text-sm font-medium">{applicant.score}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${applicant.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
}
