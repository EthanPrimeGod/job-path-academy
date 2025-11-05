import { useState } from "react";
import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTeam } from "@/data/company-mock";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CompanyTeam() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("recruiter");

  const handleInvite = () => {
    if (!email) return;
    toast({
      title: "Invitation sent",
      description: `An invite has been sent to ${email}`,
    });
    setEmail("");
    setRole("recruiter");
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Team</h1>
          <p className="text-muted-foreground">Manage team members and their permissions</p>
        </div>

        {/* Invite Form */}
        <Card>
          <CardHeader>
            <CardTitle>Invite Team Member</CardTitle>
            <CardDescription>Send an invitation to join your company account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-[200px] space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleInvite}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Invite
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage roles and permissions for your team</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeam.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Select defaultValue={member.role} disabled={member.role === "owner"}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {member.role !== "owner" && (
                        <Button variant="ghost" size="sm">Remove</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Understanding team member roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">Owner</p>
              <p className="text-sm text-muted-foreground">
                Full access to all features including billing and team management
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">Manager</p>
              <p className="text-sm text-muted-foreground">
                Can manage jobs, applicants, and modules. Cannot access billing
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">Recruiter</p>
              <p className="text-sm text-muted-foreground">
                Can view and manage applicants, send messages. Limited job editing
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">Billing</p>
              <p className="text-sm text-muted-foreground">
                Access to billing and invoices only. No hiring permissions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
}
