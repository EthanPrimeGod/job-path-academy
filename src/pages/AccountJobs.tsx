import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const AccountJobs = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light mb-2">Job Applications</h1>
        <p className="text-muted-foreground">Track your job applications and opportunities</p>
      </div>

      <Card className="p-12 text-center bg-card/50 backdrop-blur-glass border-border">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-3">Coming Soon</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Job application tracking and opportunity matching features are currently in development.
        </p>
        <Link to="/jobs">
          <Button variant="outline">
            Browse Available Jobs
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default AccountJobs;
