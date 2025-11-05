import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockModules, mockModuleParticipants } from "@/data/company-mock";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CompanyModuleDetail() {
  const { moduleId } = useParams();
  const module = mockModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <CompanyLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Module not found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/company/modules">Back to Modules</Link>
          </Button>
        </div>
      </CompanyLayout>
    );
  }

  const handleToggleStatus = () => {
    toast({
      title: module.status === "active" ? "Module deactivated" : "Module activated",
      description: `The module is now ${module.status === "active" ? "inactive" : "active"}`,
    });
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm">
          <Link to="/company/modules">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">{module.title}</h1>
            <div className="flex items-center gap-2">
              <Badge>{module.type}</Badge>
              <Badge variant={module.status === "active" ? "default" : "secondary"}>
                {module.status}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button onClick={handleToggleStatus}>
              {module.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>

        {/* Module Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Attempts</p>
                <p className="text-2xl font-bold">{module.attempts}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                <p className="text-2xl font-bold">{module.avgScore}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Participants</p>
                <p className="text-2xl font-bold">{module.participants}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((module.participants / module.attempts) * 100)}%
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-sm leading-relaxed">{module.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Participants Table */}
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold">Participant Results</h2>
              <p className="text-sm text-muted-foreground">View individual performance and results</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Best Score</TableHead>
                  <TableHead>Last Attempt</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockModuleParticipants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No participants yet
                    </TableCell>
                  </TableRow>
                ) : (
                  mockModuleParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.attempts}</TableCell>
                      <TableCell>
                        <span className="font-medium">{participant.bestScore}%</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(participant.lastAttempt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">View Result</Button>
                          <Button asChild variant="ghost" size="sm">
                            <Link to="/company/messages/3">Message</Link>
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
