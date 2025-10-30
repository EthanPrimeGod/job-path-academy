import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface JobFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  experienceLevel: string;
  onExperienceLevelChange: (value: string) => void;
  jobType: string;
  onJobTypeChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const JobFilters = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  experienceLevel,
  onExperienceLevelChange,
  jobType,
  onJobTypeChange,
  location,
  onLocationChange,
  sortBy,
  onSortByChange,
  hasActiveFilters,
  onClearFilters,
}: JobFiltersProps) => {
  return (
    <div className="sticky top-20 z-20 bg-background/80 backdrop-blur-glass border-b border-border/50 py-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title, company, or keyword"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-10 h-12 bg-card/40 backdrop-blur-glass border-border/50 rounded-xl"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px] h-10 bg-card/40 backdrop-blur-glass border-border/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Image & Video">Image & Video</SelectItem>
              <SelectItem value="Text & NLP">Text & NLP</SelectItem>
              <SelectItem value="Audio & Speech">Audio & Speech</SelectItem>
              <SelectItem value="3D & Spatial">3D & Spatial</SelectItem>
              <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={experienceLevel} onValueChange={onExperienceLevelChange}>
            <SelectTrigger className="w-[180px] h-10 bg-card/40 backdrop-blur-glass border-border/50">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Entry-level">Entry-level</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>

          <Select value={jobType} onValueChange={onJobTypeChange}>
            <SelectTrigger className="w-[180px] h-10 bg-card/40 backdrop-blur-glass border-border/50">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="w-[180px] h-10 bg-card/40 backdrop-blur-glass border-border/50">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="On-site">On-site</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-[180px] h-10 bg-card/40 backdrop-blur-glass border-border/50">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2 border border-primary/30">
                Search: "{searchTerm}"
                <button onClick={() => onSearchChange("")} className="hover:text-primary/70 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {category !== "all" && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2 border border-primary/30">
                {category}
                <button onClick={() => onCategoryChange("all")} className="hover:text-primary/70 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {experienceLevel !== "all" && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2 border border-primary/30">
                {experienceLevel}
                <button onClick={() => onExperienceLevelChange("all")} className="hover:text-primary/70 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {jobType !== "all" && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2 border border-primary/30">
                {jobType}
                <button onClick={() => onJobTypeChange("all")} className="hover:text-primary/70 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {location !== "all" && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2 border border-primary/30">
                {location}
                <button onClick={() => onLocationChange("all")} className="hover:text-primary/70 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
