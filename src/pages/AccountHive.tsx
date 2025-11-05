import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Award, BookOpen, TrendingUp, Trophy, Image, FileText, Headphones, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AccountHive = () => {
  const [moduleFilter, setModuleFilter] = useState<"all" | "in-progress" | "completed">("all");

  const badges = [
    { name: "Bounding Box Novice", icon: "🎯", earned: "2 weeks ago" },
    { name: "Text Master", icon: "📝", earned: "1 week ago" },
    { name: "Audio Specialist", icon: "🔊", earned: "3 days ago" },
    { name: "Vision Apprentice", icon: "👁️", earned: "1 day ago" }
  ];

  const moduleHistory = [
    {
      id: "bounding-boxes-101",
      title: "Bounding Boxes 101",
      category: "Computer Vision",
      icon: Image,
      status: "completed",
      bestScore: 94,
      lastUpdated: "2 hours ago"
    },
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis",
      category: "NLP",
      icon: FileText,
      status: "in-progress",
      progress: { current: 3, total: 10 },
      lastUpdated: "5 hours ago"
    },
    {
      id: "semantic-segmentation",
      title: "Semantic Segmentation",
      category: "Computer Vision",
      icon: Image,
      status: "completed",
      bestScore: 87,
      lastUpdated: "1 day ago"
    },
    {
      id: "entity-recognition",
      title: "Entity Recognition",
      category: "NLP",
      icon: FileText,
      status: "in-progress",
      progress: { current: 5, total: 15 },
      lastUpdated: "2 days ago"
    }
  ];

  const filteredModules = moduleHistory.filter(m => 
    moduleFilter === "all" || m.status === moduleFilter
  );

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-light mb-2">Your Hive Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total XP</span>
          </div>
          <div className="text-2xl font-medium mb-1">12,450</div>
          <div className="text-xs text-green-500">+340 this week</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Badges</span>
          </div>
          <div className="text-2xl font-medium mb-1">8</div>
          <Button variant="link" className="text-xs p-0 h-auto">View all →</Button>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Modules</span>
          </div>
          <div className="text-2xl font-medium mb-1">12 / 15</div>
          <div className="text-xs text-muted-foreground">3 in progress</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Streak</span>
          </div>
          <div className="text-2xl font-medium mb-1">7 days</div>
          <div className="text-xs text-muted-foreground">Keep it up!</div>
        </Card>
      </div>

      {/* Progress Visualization */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-muted-foreground">Level 4 · Vision Apprentice</div>
              <div className="text-lg font-medium">2,550 XP to Level 5</div>
            </div>
            <div className="text-2xl font-medium text-primary">68%</div>
          </div>
          <Progress value={68} className="h-3" />
        </div>
      </Card>

      {/* Leaderboard Standing */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Your Leaderboard Standing</h3>
          <Link to="/hive/leaderboards">
            <Button variant="outline" size="sm">
              View Full Leaderboards →
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Overall</div>
            <div className="flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xl font-medium">#24</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Image</div>
            <div className="text-xl font-medium">#18</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Text</div>
            <div className="text-xl font-medium">#31</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Audio</div>
            <div className="text-xl font-medium">#45</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Video</div>
            <div className="text-xl font-medium">—</div>
          </div>
        </div>
      </Card>

      {/* Module History */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light">Module History</h2>
          <div className="flex gap-2">
            <Button
              variant={moduleFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setModuleFilter("all")}
            >
              All
            </Button>
            <Button
              variant={moduleFilter === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setModuleFilter("in-progress")}
            >
              In Progress
            </Button>
            <Button
              variant={moduleFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setModuleFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>

        {filteredModules.length > 0 ? (
          <div className="space-y-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className="p-4 bg-card border-border hover:shadow-glow transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <module.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{module.title}</h3>
                        <Badge variant="outline" className="text-xs">{module.category}</Badge>
                      </div>
                      {module.status === "completed" && module.bestScore && (
                        <div className="text-sm text-muted-foreground">
                          Best score: {module.bestScore}% · {module.lastUpdated}
                        </div>
                      )}
                      {module.status === "in-progress" && module.progress && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-xs">
                            <Progress value={(module.progress.current / module.progress.total) * 100} className="h-2" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {module.progress.current}/{module.progress.total} · {module.lastUpdated}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Link to={`/hive/${module.id}`}>
                    <Button variant="outline" size="sm">
                      {module.status === "completed" ? "Review" : "Continue"}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-glass border-border">
            <h3 className="text-xl font-medium mb-3">No modules found</h3>
            <p className="text-muted-foreground mb-6">
              Try a different filter or start a new module.
            </p>
            <Link to="/hive">
              <Button variant="outline">Browse Modules</Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Badges & Credentials */}
      <div>
        <h2 className="text-2xl font-light mb-6">Badges & Credentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <Card key={index} className="p-6 text-center bg-card border-border hover:shadow-glow transition-all cursor-pointer">
              <div className="text-4xl mb-3">{badge.icon}</div>
              <div className="font-medium text-sm mb-1">{badge.name}</div>
              <div className="text-xs text-muted-foreground">{badge.earned}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountHive;
