import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  MousePointer, 
  Square, 
  Pentagon, 
  PaintBucket, 
  Type,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  HelpCircle,
  Settings,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  Send,
  Clock,
  Wifi,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data - replace with real module data
const mockModule = {
  id: "image-segmentation",
  title: "Bounding Boxes 101",
  category: "Computer Vision",
  objective: "Draw boxes around all visible cars in each image.",
  instructions: [
    "Select the Bounding Box tool from the left toolbar",
    "Click and drag to create a box around each car",
    "Ensure the box tightly fits the object boundaries",
    "Label each box with the correct class",
    "Submit when all objects are annotated"
  ],
  totalTasks: 10,
  currentTask: 3,
  labels: [
    { name: "Car", color: "hsl(260 60% 65%)", count: 7 },
    { name: "Truck", color: "hsl(35 80% 60%)", count: 3 },
    { name: "Bus", color: "hsl(165 55% 55%)", count: 1 }
  ],
  xpReward: 40
};

const tools = [
  { id: "pointer", icon: MousePointer, name: "Select", shortcut: "V" },
  { id: "box", icon: Square, name: "Bounding Box", shortcut: "B" },
  { id: "polygon", icon: Pentagon, name: "Polygon", shortcut: "P" },
  { id: "brush", icon: PaintBucket, name: "Brush", shortcut: "M" },
  { id: "text", icon: Type, name: "Text Label", shortcut: "T" }
];

const recentActions = [
  "Added Bounding Box: 'Car'",
  "Added Bounding Box: 'Car'",
  "Modified Bounding Box: 'Truck'",
  "Added Bounding Box: 'Car'"
];

export default function HiveModulePractice() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState("pointer");
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const [zoom, setZoom] = useState(100);

  const handleExit = () => {
    navigate(`/hive/${moduleId}`);
  };

  const handleSubmit = () => {
    // TODO: Show completion modal and navigate to /hive/:moduleId/completed
    console.log("Submit practice");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border/50 bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link to="/hive" className="text-muted-foreground hover:text-foreground transition-colors">
              The Hive
            </Link>
            <span className="text-muted-foreground">→</span>
            <span className="text-foreground font-medium">{mockModule.title}</span>
          </div>

          {/* Mode */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Practice Mode
            </Badge>
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help & Documentation</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls & Task Info */}
        <aside className="w-80 border-r border-border/50 bg-card/30 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Task Info */}
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-medium mb-1">{mockModule.title}</h2>
                <Badge variant="outline" className="text-xs">
                  {mockModule.category}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mockModule.objective}
              </p>
            </div>

            {/* Instructions */}
            <Collapsible open={instructionsOpen} onOpenChange={setInstructionsOpen}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-0 h-auto hover:bg-transparent"
                >
                  <span className="text-sm font-medium">Instructions</span>
                  {instructionsOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {mockModule.instructions.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary font-medium">{i + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </CollapsibleContent>
            </Collapsible>

            <div className="h-px bg-border/50" />

            {/* Toolset */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Tools</h3>
              <div className="grid grid-cols-5 gap-2">
                {tools.map((tool) => (
                  <Tooltip key={tool.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTool === tool.id ? "default" : "outline"}
                        size="icon"
                        onClick={() => setActiveTool(tool.id)}
                        className={`h-12 w-12 ${
                          activeTool === tool.id 
                            ? "bg-primary/20 text-primary border-primary/50 shadow-glow" 
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <tool.icon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-center">
                        <div>{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.shortcut}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Undo/Redo */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Undo2 className="h-4 w-4 mr-1.5" />
                  Undo
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Redo2 className="h-4 w-4 mr-1.5" />
                  Redo
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Panel - Stinger Canvas */}
        <main className="flex-1 flex flex-col bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden">
          {/* Canvas Header */}
          <div className="px-6 py-4 border-b border-border/50 bg-card/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Dataset: <span className="text-foreground">COCO-2024</span>
              </div>
              <div className="text-sm font-medium">
                Image {mockModule.currentTask} of {mockModule.totalTasks}
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-6 flex items-center justify-center overflow-auto">
            <div className="relative max-w-5xl w-full aspect-video rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md shadow-soft overflow-hidden">
              {/* Placeholder for Stinger Canvas */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Square className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-muted-foreground">
                    <div className="text-sm font-medium">Annotation Canvas</div>
                    <div className="text-xs">Stinger tool will load here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="px-6 py-3 border-t border-border/50 bg-card/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-16 text-center">
                {zoom}%
              </span>
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(400, zoom + 25))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="h-4 w-px bg-border/50 mx-2" />
              <Button variant="outline" size="sm" onClick={() => setZoom(100)}>
                <Maximize2 className="h-4 w-4 mr-1.5" />
                Reset
              </Button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Progress & Metadata */}
        <aside className="w-72 border-l border-border/50 bg-card/30 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {mockModule.currentTask}/{mockModule.totalTasks}
                </span>
              </div>
              <Progress 
                value={(mockModule.currentTask / mockModule.totalTasks) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {mockModule.totalTasks - mockModule.currentTask} tasks remaining
              </p>
            </div>

            <div className="h-px bg-border/50" />

            {/* Labels */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Labels</h3>
              <div className="space-y-2">
                {mockModule.labels.map((label) => (
                  <div key={label.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: label.color }}
                      />
                      <span>{label.name}</span>
                    </div>
                    <span className="text-muted-foreground">{label.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* History */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Recent Actions</h3>
              <div className="space-y-1.5">
                {recentActions.map((action, i) => (
                  <div key={i} className="text-xs text-muted-foreground py-1">
                    {action}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-glow" 
                size="sm"
                onClick={handleSubmit}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Practice
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Scored automatically
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-9 border-t border-border/50 bg-card/20 backdrop-blur-sm px-6">
        <div className="h-full flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>COCO_2024_001247.jpg</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              <span>05:34</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-accent">
              <Wifi className="h-3 w-3" />
              <span>All changes saved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-3 w-3" />
              <span>+{mockModule.xpReward} XP on completion</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
