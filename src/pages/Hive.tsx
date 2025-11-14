import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, FileText, Headphones, Video, Trophy, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const topAnnotators = [
  { rank: 1, name: "Alex Chen", xp: 12450, avatar: "AC" },
  { rank: 2, name: "Sarah Martinez", xp: 11280, avatar: "SM" },
  { rank: 3, name: "Jordan Lee", xp: 10950, avatar: "JL" },
  { rank: 4, name: "Maya Patel", xp: 9870, avatar: "MP" },
  { rank: 5, name: "Chris Wong", xp: 9320, avatar: "CW" },
];

const modules = [
  {
    id: "bounding-boxes-101",
    title: "Bounding Boxes 101",
    category: "Computer Vision",
    description: "Master the fundamentals of accurate object detection through precise bounding box annotation.",
    difficulty: "Beginner",
    xp: 250,
    icon: Image,
    type: "core",
    state: "completed" as const,
    progress: { current: 10, total: 10 },
    bestScore: 94
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    category: "NLP",
    description: "Train your ability to identify emotional tone and classify text sentiment across contexts.",
    difficulty: "Intermediate",
    xp: 400,
    icon: FileText,
    type: "core",
    state: "in-progress" as const,
    progress: { current: 3, total: 10 }
  },
  {
    id: "audio-classification",
    title: "Audio Classification",
    category: "Audio",
    description: "Develop expertise in categorizing and tagging various sound types and audio patterns.",
    difficulty: "Beginner",
    xp: 300,
    icon: Headphones,
    type: "core",
    state: "not-started" as const
  },
  {
    id: "video-frame-tagging",
    title: "Video Frame Tagging",
    category: "Video",
    description: "Learn to annotate temporal sequences and identify key moments in video content.",
    difficulty: "Advanced",
    xp: 500,
    icon: Video,
    type: "company",
    state: "not-started" as const
  },
  {
    id: "semantic-segmentation",
    title: "Semantic Segmentation",
    category: "Computer Vision",
    description: "Practice pixel-level classification for detailed image understanding and object isolation.",
    difficulty: "Advanced",
    xp: 600,
    icon: Image,
    type: "core",
    state: "completed" as const,
    progress: { current: 12, total: 12 },
    bestScore: 87
  },
  {
    id: "entity-recognition",
    title: "Entity Recognition",
    category: "NLP",
    description: "Sharpen your skills in identifying and classifying named entities in text data.",
    difficulty: "Intermediate",
    xp: 350,
    icon: FileText,
    type: "company",
    state: "in-progress" as const,
    progress: { current: 5, total: 15 }
  },
  {
    id: "speech-transcription",
    title: "Speech Transcription",
    category: "Audio",
    description: "Perfect your accuracy in converting spoken language to written text with proper formatting.",
    difficulty: "Intermediate",
    xp: 400,
    icon: Headphones,
    type: "core",
    state: "not-started" as const
  },
  {
    id: "action-recognition",
    title: "Action Recognition",
    category: "Video",
    description: "Train to identify and label human actions and movements in video sequences.",
    difficulty: "Advanced",
    xp: 550,
    icon: Video,
    type: "company",
    state: "completed" as const,
    progress: { current: 8, total: 8 },
    bestScore: 91
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Intermediate": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "Advanced": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const Hive = () => {
  const [moduleTypeFilter, setModuleTypeFilter] = useState<"core" | "company">("core");
  const [stateFilter, setStateFilter] = useState<"all" | "in-progress" | "completed">("all");
  const isAuthenticated = true; // Placeholder - replace with actual auth check

  // Filter modules
  const filteredModules = modules.filter((module) => {
    const matchesType = module.type === moduleTypeFilter;
    const matchesState = stateFilter === "all" || module.state === stateFilter;
    return matchesType && matchesState;
  });

  const getActionLabel = (state: string) => {
    switch (state) {
      case "in-progress": return "Continue";
      case "completed": return "Review";
      default: return "Start Module";
    }
  };

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">The Hive</span>
          </h1>
          <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
            Refine your skills, earn credentials, and climb the ranks.
          </p>
          
          {/* User Stats Card */}
          <Card className="inline-flex items-center gap-6 px-8 py-4 bg-card/50 backdrop-blur-glass border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                4
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground">Level</div>
                <div className="font-medium">Vision Apprentice</div>
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="font-medium">3 Modules Completed</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Leaderboard Snapshot */}
      <section className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-light mb-6 text-center">Global Leaderboard</h2>
            
            {/* Filter Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
                <TabsTrigger value="all">🐝 All Skills</TabsTrigger>
                <TabsTrigger value="image">🖼 Image</TabsTrigger>
                <TabsTrigger value="text">📝 Text</TabsTrigger>
                <TabsTrigger value="audio">🔊 Audio</TabsTrigger>
                <TabsTrigger value="video">🎥 Video</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Top Annotators */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {topAnnotators.map((annotator) => (
              <Card 
                key={annotator.rank}
                className={`p-6 text-center bg-card border-border hover:shadow-glow transition-all duration-300 ${
                  annotator.rank === 1 ? "md:scale-105 border-primary/50" : ""
                }`}
              >
                {annotator.rank <= 3 && (
                  <Trophy className={`w-6 h-6 mx-auto mb-3 ${
                    annotator.rank === 1 ? "text-amber-500" :
                    annotator.rank === 2 ? "text-slate-400" :
                    "text-amber-700"
                  }`} />
                )}
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-3 flex items-center justify-center text-primary-foreground font-medium text-lg">
                  {annotator.avatar}
                </div>
                <div className="font-medium mb-1">{annotator.name}</div>
                <div className="text-sm text-muted-foreground mb-2">Rank #{annotator.rank}</div>
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{annotator.xp.toLocaleString()}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/hive/leaderboards">
              <Button variant="outline" size="lg">
                View Full Leaderboard →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Module Section */}
      <section className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Filter Bar */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              {/* Type Filter */}
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant={moduleTypeFilter === "core" ? "default" : "outline"}
                  onClick={() => setModuleTypeFilter("core")}
                  className="flex-1 md:flex-initial"
                >
                  Core Modules
                </Button>
                <Button
                  variant={moduleTypeFilter === "company" ? "default" : "outline"}
                  onClick={() => setModuleTypeFilter("company")}
                  className="flex-1 md:flex-initial"
                >
                  Company Modules
                </Button>
              </div>

              {/* State Filter - Only show if authenticated */}
              {isAuthenticated && (
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                  <Button
                    variant={stateFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStateFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={stateFilter === "in-progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStateFilter("in-progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={stateFilter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStateFilter("completed")}
                  >
                    Completed
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Module Grid */}
          {filteredModules.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredModules.map((module, index) => (
                <Link key={module.id} to={`/hive/${module.id}`}>
                  <Card 
                    className="p-6 bg-card border-border hover:shadow-glow transition-all duration-500 animate-scale-in group cursor-pointer h-full relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-state={module.state}
                  >
                    {/* Completed Indicator - Subtle checkmark in corner */}
                    {isAuthenticated && module.state === "completed" && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      </div>
                    )}

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <module.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    {/* Category & Difficulty Badges */}
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {module.category}
                      </Badge>
                      <Badge className={`text-xs border ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    
                    {/* Progress or Best Score */}
                    {isAuthenticated && (
                      <>
                        {module.state === "in-progress" && module.progress && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                              <span>Progress</span>
                              <span className="font-medium">{module.progress.current}/{module.progress.total}</span>
                            </div>
                            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${(module.progress.current / module.progress.total) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {module.state === "completed" && module.bestScore && (
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-green-500/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500/40 rounded-full"
                                style={{ width: `${module.bestScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-green-500">{module.bestScore}%</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {module.description}
                    </p>

                    {/* XP */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-primary text-sm">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">{module.xp} XP</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant={module.state === "completed" ? "outline" : "outline"} 
                      className={module.state === "completed" ? "w-full opacity-80" : "w-full"} 
                      size="sm"
                    >
                      {isAuthenticated ? getActionLabel(module.state) : "Start Module"}
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-glass border-border mb-12">
              <h3 className="text-xl font-medium mb-3">Nothing here yet</h3>
              <p className="text-muted-foreground mb-6">
                Try another filter or start a new module.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setStateFilter("all")}
              >
                View All Modules
              </Button>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 border-2 border-border bg-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to see where you stand?
            </h2>
            <Button variant="crayon-violet" size="lg">
              View Leaderboards
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hive;
