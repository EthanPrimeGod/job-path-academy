import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { JobFilters } from "@/components/JobFilters";
import { JobDetailModal } from "@/components/JobDetailModal";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 9;

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hasActiveFilters =
    searchTerm !== "" ||
    category !== "all" ||
    experienceLevel !== "all" ||
    jobType !== "all" ||
    location !== "all";

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setExperienceLevel("all");
    setJobType("all");
    setLocation("all");
    setCurrentPage(1);
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory = category === "all" || job.category === category;
      const matchesExperience =
        experienceLevel === "all" || job.experienceLevel === experienceLevel;
      const matchesJobType = jobType === "all" || job.type === jobType;
      const matchesLocation =
        location === "all" || job.location.includes(location);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesExperience &&
        matchesJobType &&
        matchesLocation
      );
    });

    // Sort jobs
    if (sortBy === "newest") {
      filtered.sort((a, b) => {
        const dateA = parseDateString(a.postedDate);
        const dateB = parseDateString(b.postedDate);
        return dateA - dateB;
      });
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => {
        const dateA = parseDateString(a.postedDate);
        const dateB = parseDateString(b.postedDate);
        return dateB - dateA;
      });
    }

    return filtered;
  }, [searchTerm, category, experienceLevel, jobType, location, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredAndSortedJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-subtle" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in py-32">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            Explore AI Annotation Jobs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse current opportunities and find your next project in shaping
            the future of AI
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
      </section>

      {/* Filters */}
      <JobFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        experienceLevel={experienceLevel}
        onExperienceLevelChange={setExperienceLevel}
        jobType={jobType}
        onJobTypeChange={setJobType}
        location={location}
        onLocationChange={setLocation}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearAllFilters}
      />

      {/* Job Listings */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {paginatedJobs.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredAndSortedJobs.length
                )}{" "}
                of {filteredAndSortedJobs.length} jobs
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {paginatedJobs.map((job, index) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={() => handleJobClick(job)}
                    index={index}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(Math.min(totalPages, currentPage + 1))
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="mb-6 inline-flex p-6 rounded-2xl bg-gradient-accent">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-3">No jobs found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your filters or search terms. New opportunities
                are added regularly.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

// Helper function to parse relative date strings
function parseDateString(dateStr: string): number {
  const now = Date.now();
  const match = dateStr.match(/(\d+)\s+(day|week|hour)s?\s+ago/);
  if (!match) return now;

  const amount = parseInt(match[1]);
  const unit = match[2];

  if (unit === "day") return now - amount * 24 * 60 * 60 * 1000;
  if (unit === "week") return now - amount * 7 * 24 * 60 * 60 * 1000;
  if (unit === "hour") return now - amount * 60 * 60 * 1000;

  return now;
}

export default Jobs;
