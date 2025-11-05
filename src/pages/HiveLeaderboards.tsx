import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Star, Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const mockLeaderboardData = [
  { rank: 1, name: "Alex Chen", avatar: "AC", category: "Computer Vision", xp: 12450, badges: 8, modules: 24 },
  { rank: 2, name: "Sarah Martinez", avatar: "SM", category: "NLP", xp: 11280, badges: 7, modules: 22 },
  { rank: 3, name: "Jordan Lee", avatar: "JL", category: "Audio", xp: 10950, badges: 7, modules: 21 },
  { rank: 4, name: "Maya Patel", avatar: "MP", category: "Video", xp: 9870, badges: 6, modules: 19 },
  { rank: 5, name: "Chris Wong", avatar: "CW", category: "Computer Vision", xp: 9320, badges: 6, modules: 18 },
  { rank: 6, name: "Emma Thompson", avatar: "ET", category: "NLP", xp: 8890, badges: 5, modules: 17 },
  { rank: 7, name: "Raj Sharma", avatar: "RS", category: "Audio", xp: 8650, badges: 5, modules: 16 },
  { rank: 8, name: "Lisa Chen", avatar: "LC", category: "Computer Vision", xp: 8420, badges: 5, modules: 16 },
  { rank: 9, name: "Marcus Johnson", avatar: "MJ", category: "Video", xp: 8190, badges: 4, modules: 15 },
  { rank: 10, name: "Sofia Rodriguez", avatar: "SR", category: "NLP", xp: 7980, badges: 4, modules: 15 },
];

const HiveLeaderboards = () => {
  const [selectedSkill, setSelectedSkill] = useState("overall");
  const [timeRange, setTimeRange] = useState("all-time");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-amber-700" />;
    return null;
  };

  const getRankStyle = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-primary/10 to-secondary/10 border-l-2 border-primary";
    return "";
  };

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      
      {/* Header Block */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <Link to="/hive" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to The Hive
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              The Hive <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">Leaderboards</span>
            </h1>
            <p className="text-muted-foreground text-xl mb-4 max-w-2xl mx-auto">
              Celebrate progress. Track your rank across every skill.
            </p>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-8">
              The Hive tracks performance across all practice modules. Earn XP, badges, and climb the charts by completing annotation challenges.
            </p>
            
            {/* User's Current Rank Card */}
            <Card className="inline-flex items-center gap-6 px-8 py-4 bg-card/50 backdrop-blur-glass border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                  YU
                </div>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Your Global Rank</div>
                  <div className="font-medium">#42 · Level 4 Vision Apprentice</div>
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium text-lg">1,240 XP</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Leaderboard Type Selector */}
      <section className="pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Skill Filter Tabs */}
            <Tabs value={selectedSkill} onValueChange={setSelectedSkill} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-5 md:w-auto">
                <TabsTrigger value="overall">🐝 Overall</TabsTrigger>
                <TabsTrigger value="image">🖼 Image</TabsTrigger>
                <TabsTrigger value="text">📝 Text</TabsTrigger>
                <TabsTrigger value="audio">🔊 Audio</TabsTrigger>
                <TabsTrigger value="video">🎥 Video</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Time Range Filter */}
            <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
                <TabsTrigger value="all-time">All-Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Annotator</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                  <TableHead className="text-center">Badges</TableHead>
                  <TableHead className="text-right">Modules</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeaderboardData.map((user) => (
                  <TableRow 
                    key={user.rank}
                    className={`border-border hover:bg-muted/30 transition-colors cursor-pointer ${getRankStyle(user.rank)}`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                        <span>#{user.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                          {user.avatar}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {user.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 text-primary">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{user.xp.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.badges}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {user.modules}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Load More →
            </Button>
          </div>
        </div>
      </section>

      {/* User Standing Panel */}
      <section className="py-12 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-card border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-medium mb-2">Your Current Standing</h3>
                <p className="text-muted-foreground">
                  You're currently <span className="text-primary font-medium">#42 overall</span> with{" "}
                  <span className="text-primary font-medium">1,240 XP</span>
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span>3 badges earned</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="text-sm text-muted-foreground">
                    8 modules completed
                  </div>
                </div>
              </div>
              <Button variant="default" size="lg">
                View Your Hive Profile →
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Footer Strip */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-accent border border-border/50 shadow-glow backdrop-blur-glass">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to climb higher?
            </h2>
            <Link to="/hive">
              <Button variant="hero" size="lg">
                Return to The Hive
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HiveLeaderboards;
