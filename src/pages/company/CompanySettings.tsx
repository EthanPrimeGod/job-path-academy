import { useState } from "react";
import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CompanySettings() {
  const [allowMessages, setAllowMessages] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your company profile has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your company profile and preferences</p>
        </div>

        {/* Company Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Update your company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline">Upload Logo</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Tech Innovations Inc." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" placeholder="https://company.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About Company</Label>
              <Textarea
                id="about"
                rows={6}
                placeholder="Tell candidates about your company..."
                defaultValue="We're a leading AI company focused on building the future of machine learning through high-quality data annotation."
              />
            </div>

            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Privacy & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Notifications</CardTitle>
            <CardDescription>Control how you interact with candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div className="flex-1">
                <p className="font-medium">Allow candidates to message first</p>
                <p className="text-sm text-muted-foreground">
                  Let candidates initiate conversations about job opportunities
                </p>
              </div>
              <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div className="flex-1">
                <p className="font-medium">Email notifications for new applications</p>
                <p className="text-sm text-muted-foreground">
                  Receive an email when someone applies to your jobs
                </p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect third-party tools and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">Slack Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified in Slack when new candidates apply
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    Sync interview schedules with your calendar
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">Zapier</p>
                  <p className="text-sm text-muted-foreground">
                    Automate workflows with thousands of apps
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
}
