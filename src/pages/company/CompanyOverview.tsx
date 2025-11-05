import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockApplicants, mockThreads, mockModules } from "@/data/company-mock";
import { Link } from "react-router-dom";
import { Briefcase, Users, MessageSquare, GraduationCap } from "lucide-react";

export default function CompanyOverview() {
  const recentApplicants = mockApplicants.slice(0, 5);
  const recentMessages = mockThreads.slice(0, 3);
  const activeModules = mockModules.filter(m => m.status === "active").slice(0, 3);

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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Company Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">3 posted this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Applicants in Review</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">18 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-1">From 5 candidates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">456 total attempts</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applicants */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Applicants</CardTitle>
                <CardDescription>Latest applications across all open positions</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/company/applicants">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{applicant.jobTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStageColor(applicant.stage)}>
                        {applicant.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{applicant.appliedDate}</TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/company/jobs/${applicant.jobId}/applicants/${applicant.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Messages & Module Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest conversations with candidates</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/company/messages">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((thread) => (
                  <div key={thread.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{thread.participantAvatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{thread.participantName}</p>
                        {thread.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{thread.context}</p>
                      <p className="text-sm text-muted-foreground truncate">{thread.lastMessage}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/company/messages/${thread.id}`}>Open</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Module Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Module Activity</CardTitle>
                  <CardDescription>Performance metrics for training modules</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/company/modules">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{module.title}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{module.attempts} completions</span>
                        <span>Avg: {module.avgScore}%</span>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/company/modules/${module.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CompanyLayout>
  );
}
