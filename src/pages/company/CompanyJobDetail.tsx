import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockJobs, mockApplicants } from "@/data/company-mock";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CompanyJobDetail() {
  const { jobId } = useParams();
  const job = mockJobs.find(j => j.id === jobId);
  const jobApplicants = mockApplicants.filter(a => a.jobId === jobId);

  if (!job) {
    return (
      <CompanyLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Job not found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/company/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </CompanyLayout>
    );
  }

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
          <Link to="/company/jobs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={job.status === "open" ? "default" : "secondary"}>
                {job.status}
              </Badge>
              {job.tags.map((tag, i) => (
                <Badge key={i} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button variant={job.status === "open" ? "outline" : "default"}>
              {job.status === "open" ? "Close Job" : "Reopen Job"}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applicants">Applicants ({jobApplicants.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Employment Type</p>
                    <p className="font-medium">{job.employmentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pay Range</p>
                    <p className="font-medium">{job.payRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Posted</p>
                    <p className="font-medium">{job.created}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm leading-relaxed">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Applicants Summary</h2>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/company/jobs/${jobId}?tab=applicants`}>View All</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold">{jobApplicants.length}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold">
                      {jobApplicants.filter(a => a.stage === "applied").length}
                    </p>
                    <p className="text-sm text-muted-foreground">New</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold">
                      {jobApplicants.filter(a => a.stage === "interview").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Interview</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold">
                      {jobApplicants.filter(a => a.stage === "offer").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Offer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applicants">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobApplicants.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No applicants yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      jobApplicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell className="font-medium">{applicant.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStageColor(applicant.stage)}>
                              {applicant.stage}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{applicant.appliedDate}</TableCell>
                          <TableCell>
                            {applicant.score ? (
                              <span className="font-medium">{applicant.score}%</span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/company/jobs/${jobId}/applicants/${applicant.id}`}>View</Link>
                              </Button>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/company/messages/1`}>Message</Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Visibility</h2>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Visible to candidates</p>
                    <p className="text-sm text-muted-foreground">Allow new applications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {job.status === "open" ? "Hide Job" : "Show Job"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h2>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Delete this job</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently remove this job posting and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">Delete Job</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CompanyLayout>
  );
}
