import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const AccountSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and privacy</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-medium mb-6">Profile Information</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input id="display-name" defaultValue="Alex Chen" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="handle">Handle</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">@</span>
              <Input id="handle" defaultValue="alexchen" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              defaultValue="AI annotator specializing in computer vision" 
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-medium mb-6">Privacy & Visibility</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label htmlFor="show-leaderboards" className="text-base">Show on Global Leaderboards</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Display your rank and scores on public leaderboards
              </p>
            </div>
            <Switch id="show-leaderboards" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label htmlFor="show-company-modules" className="text-base">Show Company Module Results</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Allow companies to see your performance on their specific modules
              </p>
            </div>
            <Switch id="show-company-modules" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label htmlFor="public-profile" className="text-base">Public Profile</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Make your profile visible to other users and potential employers
              </p>
            </div>
            <Switch id="public-profile" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-medium mb-6">Notifications</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive updates about new jobs and achievements
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label htmlFor="weekly-summary" className="text-base">Weekly Summary</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get a weekly email with your progress and stats
              </p>
            </div>
            <Switch id="weekly-summary" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Save Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default AccountSettings;
