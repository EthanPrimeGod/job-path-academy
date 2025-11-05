import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Star, Award, BookOpen, Clock } from "lucide-react";

const AccountOverview = () => {
  const recentActivity = [
    { action: "Completed Bounding Boxes 101", xp: 250, time: "2 hours ago" },
    { action: "Completed Sentiment Analysis", xp: 400, time: "1 day ago" },
    { action: "Completed Semantic Segmentation", xp: 600, time: "3 days ago" },
    { action: "Started Entity Recognition", xp: 0, time: "4 days ago" },
    { action: "Earned badge: Vision Apprentice", xp: 100, time: "5 days ago" }
  ];

  return (
    <div className="space-y-8">
      {/* Account Snapshot */}
      <div>
        <h2 className="text-2xl font-light mb-6">Account Snapshot</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total XP</div>
                <div className="text-2xl font-medium">12,450</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              +340 this week
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Badges</div>
                <div className="text-2xl font-medium">8</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              3 in progress
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Modules</div>
                <div className="text-2xl font-medium">12</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              3 in progress
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-light mb-6">Recent Activity</h2>
        <Card className="divide-y divide-border bg-card border-border">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              </div>
              {activity.xp > 0 && (
                <Badge variant="outline" className="text-xs">
                  +{activity.xp} XP
                </Badge>
              )}
            </div>
          ))}
        </Card>
      </div>

      {/* Privacy Settings */}
      <div>
        <h2 className="text-2xl font-light mb-6">Privacy</h2>
        <Card className="p-6 space-y-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="public-profile">Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to other users
              </p>
            </div>
            <Switch id="public-profile" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="hide-leaderboards">Show on Leaderboards</Label>
              <p className="text-sm text-muted-foreground">
                Display your rank on global leaderboards
              </p>
            </div>
            <Switch id="hide-leaderboards" defaultChecked />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountOverview;
