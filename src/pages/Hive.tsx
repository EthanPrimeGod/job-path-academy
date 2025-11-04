import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, FileText, Headphones, Video, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const topAnnotators = [
  { rank: 1, name: "Alex Chen", xp: 12450, avatar: "AC" },
  { rank: 2, name: "Sarah Martinez", xp: 11280, avatar: "SM" },
  { rank: 3, name: "Jordan Lee", xp: 10950, avatar: "JL" },
  { rank: 4, name: "Maya Patel", xp: 9870, avatar: "MP" },
  { rank: 5, name: "Chris Wong", xp: 9320, avatar: "CW" },
];

const modules = [
  {
    title: "Bounding Boxes 101",
    category: "Computer Vision",
    description: "Master the fundamentals of accurate object detection through precise bounding box annotation.",
    difficulty: "Beginner",
    xp: 250,
    icon: Image,
    type: "core"
  },
  {
    title: "Sentiment Analysis",
    category: "NLP",
    description: "Train your ability to identify emotional tone and classify text sentiment across contexts.",
    difficulty: "Intermediate",
    xp: 400,
    icon: FileText,
    type: "core"
  },
  {
    title: "Audio Classification",
    category: "Audio",
    description: "Develop expertise in categorizing and tagging various sound types and audio patterns.",
    difficulty: "Beginner",
    xp: 300,
    icon: Headphones,
    type: "core"
  },
  {
    title: "Video Frame Tagging",
    category: "Video",
    description: "Learn to annotate temporal sequences and identify key moments in video content.",
    difficulty: "Advanced",
    xp: 500,
    icon: Video,
    type: "company"
  },
  {
    title: "Semantic Segmentation",
    category: "Computer Vision",
    description: "Practice pixel-level classification for detailed image understanding and object isolation.",
    difficulty: "Advanced",
    xp: 600,
    icon: Image,
    type: "core"
  },
  {
    title: "Entity Recognition",
    category: "NLP",
    description: "Sharpen your skills in identifying and classifying named entities in text data.",
    difficulty: "Intermediate",
    xp: 350,
    icon: FileText,
    type: "company"
  },
  {
    title: "Speech Transcription",
    category: "Audio",
    description: "Perfect your accuracy in converting spoken language to written text with proper formatting.",
    difficulty: "Intermediate",
    xp: 400,
    icon: Headphones,
    type: "core"
  },
  {
    title: "Action Recognition",
    category: "Video",
    description: "Train to identify and label human actions and movements in video sequences.",
    difficulty: "Advanced",
    xp: 550,
    icon: Video,
    type: "company"
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
            <Button variant="outline" size="lg">
              View Full Leaderboard →
            </Button>
          </div>
        </div>
      </section>

      {/* Module Section */}
      <section className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Filter Bar */}
          <div className="mb-12">
            <Tabs defaultValue="core" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="core">Core Modules</TabsTrigger>
                <TabsTrigger value="company">Company Modules</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Module Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {modules.map((module, index) => (
              <Card 
                key={module.title}
                className="p-6 bg-card border-border hover:shadow-glow transition-all duration-500 animate-scale-in group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <module.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {module.category}
                  </Badge>
                  <Badge className={`text-xs border ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </Badge>
                </div>

                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {module.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{module.xp} XP</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  Start Module
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-accent border border-border/50 shadow-glow backdrop-blur-glass">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to see where you stand?
            </h2>
            <Button variant="hero" size="lg">
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
