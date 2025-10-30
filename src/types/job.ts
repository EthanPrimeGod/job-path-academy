export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance";
  experienceLevel: "Entry-level" | "Intermediate" | "Expert";
  category: "Image & Video" | "Text & NLP" | "Audio & Speech" | "3D & Spatial" | "Quality Assurance";
  payRange?: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  postedDate: string;
  featured?: boolean;
  applyUrl: string;
}
