import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Award, BookOpen, Edit } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const Account = () => {
  const location = useLocation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Placeholder user data
  const user = {
    name: "Alex Chen",
    handle: "alexchen",
    bio: "AI annotator specializing in computer vision",
    avatar: "AC",
    xp: 12450,
    badges: 8,
    modulesCompleted: 12
  };

  const tabs = [
    { path: "/account", label: "Overview", exact: true },
    { path: "/account/hive", label: "Hive" },
    { path: "/account/jobs", label: "Jobs" },
    { path: "/account/settings", label: "Settings" }
  ];

  const isActiveTab = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      
      {/* Profile Header */}
      <section className="pt-32 pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
            {/* Avatar & Info */}
            <div className="flex gap-4 items-center flex-1">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-medium">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl font-medium mb-1">{user.name}</h1>
                <p className="text-muted-foreground text-sm mb-2">@{user.handle}</p>
                <p className="text-sm">{user.bio}</p>
              </div>
            </div>

            {/* Edit Button */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Handle</Label>
                    <Input defaultValue={user.handle} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea defaultValue={user.bio} rows={3} />
                  </div>
                  <div className="flex gap-2 justify-end pt-4">
                    <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsEditOpen(false)}>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Chips */}
          <div className="flex flex-wrap gap-3">
            <Card className="px-4 py-2 bg-card/50 backdrop-blur-glass border-border inline-flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user.xp.toLocaleString()} XP</span>
            </Card>
            <Card className="px-4 py-2 bg-card/50 backdrop-blur-glass border-border inline-flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user.badges} Badges</span>
            </Card>
            <Card className="px-4 py-2 bg-card/50 backdrop-blur-glass border-border inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user.modulesCompleted} Completed</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActiveTab(tab.path, tab.exact)
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Account;
