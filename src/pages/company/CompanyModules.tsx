import { useState } from "react";
import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockModules } from "@/data/company-mock";
import { Link } from "react-router-dom";
import { Plus, Search, Image, FileText, Mic, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const typeIcons = {
  image: Image,
  text: FileText,
  audio: Mic,
  video: Video,
};

export default function CompanyModules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredModules = mockModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || module.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleSaveModule = () => {
    toast({
      title: "Module saved",
      description: "Your training module has been created successfully.",
    });
    setIsDialogOpen(false);
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Training Modules</h1>
            <p className="text-muted-foreground">Create and manage practice assessments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Module
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Training Module</DialogTitle>
                <DialogDescription>Design a new practice module for annotators</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Module Title</Label>
                  <Input id="title" placeholder="e.g., Computer Vision Basics" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe what this module covers..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveModule}>Create Module</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={typeFilter === "all" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={typeFilter === "image" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("image")}
                >
                  Image
                </Button>
                <Button
                  variant={typeFilter === "text" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("text")}
                >
                  Text
                </Button>
                <Button
                  variant={typeFilter === "audio" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("audio")}
                >
                  Audio
                </Button>
                <Button
                  variant={typeFilter === "video" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("video")}
                >
                  Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center text-muted-foreground">
                No modules found. Create your first training module!
              </CardContent>
            </Card>
          ) : (
            filteredModules.map((module) => {
              const Icon = typeIcons[module.type];
              return (
                <Card key={module.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant={module.status === "active" ? "default" : "secondary"}>
                        {module.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Attempts</p>
                        <p className="font-medium">{module.attempts}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Score</p>
                        <p className="font-medium">{module.avgScore}%</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to={`/company/modules/${module.id}`}>View</Link>
                      </Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
