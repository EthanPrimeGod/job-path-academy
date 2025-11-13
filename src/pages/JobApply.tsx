import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Upload, CheckCircle2, X } from "lucide-react";
import { jobs } from "@/data/jobs";
import { useToast } from "@/hooks/use-toast";

const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const job = jobs.find(j => j.id === id);

  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    coverNote: "",
    expectedPay: "",
    availability: "",
    location: "",
    allowProfileView: true
  });

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Job not found</h1>
          <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (validTypes.includes(file.type)) {
        setResumeFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue",
        variant: "destructive"
      });
      return;
    }

    if (!formData.coverNote.trim()) {
      toast({
        title: "Cover note required",
        description: "Please write a brief cover note",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Application submitted!",
        description: "The company will review your application soon."
      });
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background font-['Inter',sans-serif]">
        <Navigation />
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-light mb-4">Application sent!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You can track your application in your dashboard.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/jobs")}>
                Browse more jobs
              </Button>
              <Button onClick={() => navigate("/account/applications")}>
                View my applications
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/jobs")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>

          {/* Job Summary */}
          <Card className="p-8 mb-8 bg-card/50 backdrop-blur-glass border-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-medium mb-2">{job.title}</h1>
                <p className="text-lg text-muted-foreground mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span>{job.type}</span>
              </div>
              {job.payRange && (
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.payRange}</span>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <p className="text-sm text-muted-foreground">
              You're applying through Annota. The company will receive your profile, your cover note, and your resume.
            </p>
          </Card>

          {/* Application Form */}
          <Card className="p-8 bg-card/50 backdrop-blur-glass border-border">
            <h2 className="text-2xl font-medium mb-6">Your Application</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resume Upload */}
              <div className="space-y-2">
                <Label htmlFor="resume">Resume *</Label>
                <div className="relative">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume">
                    <div className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        {resumeFile ? (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{resumeFile.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                setResumeFile(null);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Click to upload PDF, DOC, or DOCX
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Cover Note */}
              <div className="space-y-2">
                <Label htmlFor="coverNote">Cover Note *</Label>
                <Textarea
                  id="coverNote"
                  value={formData.coverNote}
                  onChange={(e) => setFormData({...formData, coverNote: e.target.value})}
                  placeholder="Tell the company why you're a great fit for this role..."
                  rows={6}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.coverNote.length}/1000 characters
                </p>
              </div>

              {/* Optional Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedPay">Expected Pay (optional)</Label>
                  <Input
                    id="expectedPay"
                    value={formData.expectedPay}
                    onChange={(e) => setFormData({...formData, expectedPay: e.target.value})}
                    placeholder="e.g., $25/hr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability (optional)</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value})}
                    placeholder="e.g., 40 hrs/week"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location / Timezone (optional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., USA - EST"
                />
              </div>

              {/* Profile View Permission */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Checkbox
                  id="allowProfile"
                  checked={formData.allowProfileView}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, allowProfileView: checked as boolean})
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="allowProfile" className="cursor-pointer">
                    Allow the company to view my Annota profile
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    This includes your completed Hive modules, badges, and activity history
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/jobs")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApply;
