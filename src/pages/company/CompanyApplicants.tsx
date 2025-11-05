import { useState } from "react";
import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockApplicants, mockJobs } from "@/data/company-mock";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function CompanyApplicants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  const filteredApplicants = mockApplicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJob = jobFilter === "all" || applicant.jobId === jobFilter;
    const matchesStage = stageFilter === "all" || applicant.stage === stageFilter;
    return matchesSearch && matchesJob && matchesStage;
  });

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      applied: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      screen: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      interview: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      offer: "bg-green-500/10 text-green-500 border-green-500/20",
      hired: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return colors[stage] || colors.applied;
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Applicants</h1>
          <p className="text-muted-foreground">Review and manage candidates across all positions</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {mockJobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="screen">Screen</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No applicants found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">{applicant.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {applicant.jobTitle}
                      </TableCell>
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
                            <Link to={`/company/jobs/${applicant.jobId}/applicants/${applicant.id}`}>View</Link>
                          </Button>
                          <Button asChild variant="ghost" size="sm">
                            <Link to="/company/messages/1">Message</Link>
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
      </div>
    </CompanyLayout>
  );
}
