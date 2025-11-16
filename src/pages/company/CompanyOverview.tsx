import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockApplicants, mockThreads, mockModules } from "@/data/company-mock";
import { Link } from "react-router-dom";
import { Briefcase, Users, MessageSquare, GraduationCap, TrendingUp, ArrowRight, User, Calendar } from "lucide-react";

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
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-accent border border-border/50 p-8">
          <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
          <div className="relative z-10">
            <h1 className="text-4xl font-light tracking-tight mb-2">
              Company <span className="font-medium bg-gradient-primary bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground font-light">Welcome back! Here's what's happening.</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Open Jobs</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-light mb-1">12</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+3</span> posted this week
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-glass border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Applicants in Review</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Users className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-light mb-1">42</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary font-medium">+18</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-glass border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Unread Messages</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <MessageSquare className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-light mb-1">7</div>
              <p className="text-xs text-muted-foreground">
                From <span className="text-accent font-medium">5</span> candidates
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Active Modules</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-light mb-1">8</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">456</span> total attempts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applicants */}
        <Card className="bg-card/40 backdrop-blur-glass border-border/50 overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-gradient-accent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-light">Recent <span className="font-medium">Applicants</span></CardTitle>
                <CardDescription>Latest applications across all open positions</CardDescription>
              </div>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                <Link to="/company/applicants">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentApplicants.map((applicant, index) => (
                <div 
                  key={applicant.id} 
                  className="group p-6 hover:bg-gradient-accent transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                        <User className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium text-lg group-hover:text-primary transition-colors">{applicant.name}</h4>
                          <Badge className={`${getStageColor(applicant.stage)} border`}>
                            {applicant.stage}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {applicant.jobTitle}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {applicant.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <Link to={`/company/applicants/${applicant.id}`}>
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages and Module Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Messages */}
          <Card className="bg-card/40 backdrop-blur-glass border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-gradient-accent">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-light">Recent <span className="font-medium">Messages</span></CardTitle>
                <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                  <Link to="/company/messages">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {recentMessages.map((thread, index) => (
                  <div 
                    key={thread.id} 
                    className="group p-5 hover:bg-gradient-accent transition-all duration-300 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium group-hover:text-primary transition-colors truncate">
                            {thread.participantName}
                          </h4>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{thread.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{thread.context}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{thread.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Module Activity */}
          <Card className="bg-card/40 backdrop-blur-glass border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-gradient-accent">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-light">Module <span className="font-medium">Activity</span></CardTitle>
                <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                  <Link to="/company/modules">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {activeModules.map((module, index) => (
                  <div 
                    key={module.id} 
                    className="group p-5 hover:bg-gradient-accent transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                          <GraduationCap className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{module.title}</h4>
                          <p className="text-xs text-muted-foreground">{module.type}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                        <Link to={`/company/modules/${module.id}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Completions</p>
                        <p className="font-medium text-primary">{module.attempts}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Avg Score</p>
                        <p className="font-medium text-secondary">{module.avgScore}%</p>
                      </div>
                    </div>
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
