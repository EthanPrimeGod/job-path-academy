import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Image, FileText, Headphones, Video, Clock, Trophy, Star, Target, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
    objective: "Learn to draw accurate bounding boxes around objects in images with pixel-perfect precision.",
    duration: "10-15 minutes",
    requirements: "None",
    completionRate: 87,
    longDescription: "This foundational module teaches you the essential skills of object detection annotation. You'll practice identifying objects in images and drawing precise bounding boxes around them — a critical skill for training computer vision models."
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
    objective: "Develop expertise in identifying positive, negative, and neutral sentiment in various text types.",
    duration: "15-20 minutes",
    requirements: "Complete Text Classification 101",
    completionRate: 72,
    longDescription: "Sentiment analysis is crucial for understanding human communication in AI systems. This module trains you to accurately classify emotional tone across social media posts, reviews, and conversational text."
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
    objective: "Master the identification and categorization of different sound types and audio events.",
    duration: "12-18 minutes",
    requirements: "None",
    completionRate: 81,
    longDescription: "Audio classification is essential for voice assistants, sound detection systems, and audio processing AI. Practice identifying and categorizing various sound patterns and acoustic events."
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
    companyName: "Waymo",
    objective: "Develop skills in temporal annotation and identifying critical events in video sequences.",
    duration: "20-30 minutes",
    requirements: "Complete Image Annotation basics",
    completionRate: 64,
    longDescription: "Video annotation requires understanding both spatial and temporal dimensions. This module teaches you to identify and tag key moments, actions, and objects across video frames — essential for autonomous systems and video understanding AI."
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
    objective: "Master pixel-perfect segmentation for detailed object isolation and scene understanding.",
    duration: "25-35 minutes",
    requirements: "Complete Bounding Boxes 101",
    completionRate: 58,
    longDescription: "Semantic segmentation is the most precise form of image annotation. Learn to classify every pixel in an image, creating detailed masks that AI models use for advanced computer vision tasks."
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
    companyName: "Anthropic",
    objective: "Learn to identify and categorize people, places, organizations, and other entities in text.",
    duration: "15-20 minutes",
    requirements: "Basic text annotation experience",
    completionRate: 76,
    longDescription: "Named Entity Recognition (NER) is fundamental to natural language understanding. This module trains you to identify and classify entities like people, locations, organizations, dates, and custom entity types in various text formats."
  },
];

const topPerformers = [
  { rank: 1, name: "Alex Chen", score: 98, avatar: "AC" },
  { rank: 2, name: "Maya Patel", score: 96, avatar: "MP" },
  { rank: 3, name: "Jordan Lee", score: 94, avatar: "JL" },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Intermediate": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "Advanced": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const HiveModuleDetail = () => {
  const { moduleId } = useParams();
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-background font-['Inter',sans-serif]">
        <Navigation />
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-light mb-4">Module Not Found</h1>
          <Link to="/hive">
            <Button variant="outline">← Return to The Hive</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedModules = modules
    .filter(m => m.id !== module.id && (m.category === module.category || m.difficulty === module.difficulty))
    .slice(0, 3);

  const ModuleIcon = module.icon;

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link to="/hive">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to The Hive
          </Button>
        </Link>
      </div>

      {/* Header / Module Title Block */}
      <section className="pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="text-sm">
                  {module.category}
                </Badge>
                <Badge className={`text-sm border ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </Badge>
                {module.type === "company" && module.companyName && (
                  <Badge variant="outline" className="text-sm bg-primary/5">
                    {module.companyName}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-5xl font-light mb-6">
                {module.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {module.longDescription}
              </p>
            </div>

            {/* Visual Element */}
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-glass border border-border/50 shadow-glow">
                <ModuleIcon className="w-32 h-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Overview Cards */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light mb-8 text-center">Module Overview</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card border-border">
              <Target className="w-8 h-8 text-primary mb-3" />
              <div className="text-sm text-muted-foreground mb-2">Objective</div>
              <div className="font-medium text-sm leading-relaxed">{module.objective}</div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <div className="text-sm text-muted-foreground mb-2">Duration</div>
              <div className="font-medium">{module.duration}</div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <Star className="w-8 h-8 text-primary mb-3" />
              <div className="text-sm text-muted-foreground mb-2">XP Reward</div>
              <div className="font-medium">{module.xp} XP</div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
              <div className="text-sm text-muted-foreground mb-2">Requirements</div>
              <div className="font-medium text-sm">{module.requirements}</div>
            </Card>
          </div>

          {/* Completion Rate */}
          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              {module.completionRate}% of annotators complete this module
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Top Performers + Start Module */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Top Performers Widget */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Top Performers</h3>
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                {topPerformers.map((performer) => (
                  <div key={performer.rank} className="flex items-center gap-3">
                    <div className="text-sm font-medium text-muted-foreground w-6">
                      #{performer.rank}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {performer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{performer.name}</div>
                      <div className="text-xs text-muted-foreground">{performer.score}% accuracy</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/hive/leaderboards" className="block mt-6">
                <Button variant="outline" size="sm" className="w-full">
                  View Full Leaderboard →
                </Button>
              </Link>
            </Card>
          </div>

          {/* Start Module Section */}
          <div className="lg:col-span-2">
            <Card className="p-12 border-2 border-border bg-card text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Practice?</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                This module opens in the Stinger annotation environment. Your progress will be tracked and you'll earn XP upon completion.
              </p>
              
              <Button variant="crayon-yellow" size="lg" className="mb-4">
                Start Practicing
              </Button>
              
              <div className="text-xs text-muted-foreground">
                {module.type === "company" && module.companyName && (
                  <>By continuing, you agree to handle {module.companyName} data responsibly.</>
                )}
              </div>
            </Card>

            {/* Progress Indicator (if completed) */}
            <Card className="p-6 bg-card/50 border-border/50 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Previously Completed</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last attempt: 92% accuracy • Best score: 95%
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Try Again
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Modules */}
      {relatedModules.length > 0 && (
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-light mb-8 text-center">You May Also Like</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedModules.map((relatedModule) => {
                const RelatedIcon = relatedModule.icon;
                return (
                  <Link key={relatedModule.id} to={`/hive/${relatedModule.id}`}>
                    <Card className="p-6 bg-card border-border hover:shadow-glow transition-all duration-300 group cursor-pointer h-full">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                        <RelatedIcon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {relatedModule.category}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                        {relatedModule.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {relatedModule.description}
                      </p>

                      <div className="flex items-center gap-1 text-primary text-sm">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">{relatedModule.xp} XP</span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default HiveModuleDetail;
