/**
 * Company Applicants Page - JavaScript
 * Manage job applicants with search and stage filtering
 */

// ===================================
// DATA
// ===================================
const mockApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    score: 95,
    stage: "interview",
    job: "Senior Data Annotator - Computer Vision",
    appliedAt: "2025-01-12T10:00:00Z"
  },
  {
    id: "2",
    name: "Michael Chen",
    score: 88,
    stage: "screening",
    job: "NLP Annotation Specialist",
    appliedAt: "2025-01-14T14:30:00Z"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    score: 92,
    stage: "applied",
    job: "Senior Data Annotator - Computer Vision",
    appliedAt: "2025-01-15T09:15:00Z"
  },
  {
    id: "4",
    name: "David Kim",
    score: 78,
    stage: "rejected",
    job: "Audio Transcription Specialist",
    appliedAt: "2025-01-10T16:00:00Z"
  },
  {
    id: "5",
    name: "Jessica Martinez",
    score: 91,
    stage: "hired",
    job: "Video Annotation Expert",
    appliedAt: "2025-01-08T11:20:00Z"
  },
  {
    id: "6",
    name: "Robert Taylor",
    score: 85,
    stage: "interview",
    job: "NLP Annotation Specialist",
    appliedAt: "2025-01-13T13:45:00Z"
  },
  {
    id: "7",
    name: "Amanda White",
    score: null,
    stage: "applied",
    job: "Audio Transcription Specialist",
    appliedAt: "2025-01-16T08:30:00Z"
  }
];

const stageLabels = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  hired: "Hired",
  rejected: "Rejected"
};

// ===================================
// STATE
// ===================================
let searchQuery = "";
let stageFilter = "all";

// ===================================
// UTILITY FUNCTIONS
// ===================================
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderApplicants() {
  const tbody = document.getElementById('applicants-table');
  if (!tbody) return;

  // Filter applicants
  const filtered = mockApplicants.filter(applicant => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.job.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === "all" || applicant.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  // Render table rows
  tbody.innerHTML = filtered.length === 0
    ? '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--muted-foreground);">No applicants found</td></tr>'
    : filtered.map(a => {
        const scoreDisplay = a.score
          ? `<span style="font-weight: 500;">${a.score}%</span>`
          : '<span style="color: var(--muted-foreground);">—</span>';

        return `
          <tr>
            <td style="font-weight: 500;">${a.name}</td>
            <td>${scoreDisplay}</td>
            <td><span class="status-badge ${a.stage}">${stageLabels[a.stage]}</span></td>
            <td style="color: var(--muted-foreground); font-size: 0.875rem;">${a.job}</td>
            <td style="color: var(--muted-foreground); font-size: 0.875rem;">${formatDate(a.appliedAt)}</td>
            <td>
              <button class="btn btn-ghost btn-sm" onclick="viewApplicant('${a.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');
}

// ===================================
// EVENT HANDLERS
// ===================================
function viewApplicant(id) {
  alert(`View applicant details for ID: ${id}\n\n(Detail view would open here)`);
}

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderApplicants();
    });
  }

  // Stage filters
  const filterButtons = document.querySelectorAll('#stage-filters button');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      stageFilter = button.dataset.stage;

      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('btn-default', 'active');
        btn.classList.add('btn-outline');
      });
      button.classList.remove('btn-outline');
      button.classList.add('btn-default', 'active');

      renderApplicants();
    });
  });

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      alert('Mobile menu would open here.');
    });
  }
}

// ===================================
// INITIALIZE
// ===================================
function initializePage() {
  renderApplicants();
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
