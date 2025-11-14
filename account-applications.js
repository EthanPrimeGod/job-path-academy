/**
 * Account Applications Page - JavaScript
 * Job applications tracking with search and filters
 */

// ===================================
// DATA
// ===================================
const mockApplications = [
  {
    id: "1",
    jobTitle: "Image Annotation Specialist",
    companyName: "TechVision AI",
    status: "in_review",
    appliedAt: "2024-03-10T10:00:00Z",
    lastStatusChange: "2024-03-12T14:30:00Z"
  },
  {
    id: "2",
    jobTitle: "NLP Data Labeler",
    companyName: "ConversaAI",
    status: "applied",
    appliedAt: "2024-03-08T15:00:00Z",
    lastStatusChange: null
  },
  {
    id: "3",
    jobTitle: "Audio Annotation Specialist",
    companyName: "SoundScape Labs",
    status: "interview",
    appliedAt: "2024-03-05T09:00:00Z",
    lastStatusChange: "2024-03-11T16:00:00Z"
  },
  {
    id: "4",
    jobTitle: "Video Labeling Expert",
    companyName: "FrameWise Inc",
    status: "rejected",
    appliedAt: "2024-02-28T12:00:00Z",
    lastStatusChange: "2024-03-06T10:00:00Z"
  }
];

const statusLabels = {
  applied: "Applied",
  in_review: "In Review",
  interview: "Interview",
  hired: "Hired",
  rejected: "Rejected"
};

// ===================================
// STATE
// ===================================
let searchQuery = "";
let statusFilter = "all";

// ===================================
// UTILITY FUNCTIONS
// ===================================
function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderApplications() {
  const listContainer = document.getElementById('applications-list');
  const emptyState = document.getElementById('empty-state');
  const emptyTitle = document.getElementById('empty-title');
  const emptyDescription = document.getElementById('empty-description');
  const browseJobsBtn = document.getElementById('browse-jobs-btn');

  if (!listContainer || !emptyState) return;

  // Filter applications
  const filteredApps = mockApplications.filter(app => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Show/hide empty state
  if (filteredApps.length === 0) {
    listContainer.style.display = 'none';
    emptyState.style.display = 'block';

    // Update empty state content
    if (searchQuery || statusFilter !== 'all') {
      emptyTitle.textContent = 'No applications found';
      emptyDescription.textContent = 'Try adjusting your filters to see more results';
      browseJobsBtn.style.display = 'none';
    } else {
      emptyTitle.textContent = "You haven't applied to any jobs yet";
      emptyDescription.textContent = 'Browse our job board and start applying to opportunities that match your skills';
      browseJobsBtn.style.display = 'inline-flex';
    }
    return;
  }

  listContainer.style.display = 'flex';
  emptyState.style.display = 'none';

  // Render applications
  listContainer.innerHTML = filteredApps.map(app => {
    const metaText = `Applied ${getTimeAgo(app.appliedAt)}${
      app.lastStatusChange && app.lastStatusChange !== app.appliedAt
        ? ` · Updated ${getTimeAgo(app.lastStatusChange)}`
        : ''
    }`;

    return `
      <a href="/account-application-detail.html?id=${app.id}" class="application-card">
        <div class="application-content">
          <div class="application-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div class="application-details">
            <div class="application-header">
              <div class="application-info">
                <h3 class="application-title">${app.jobTitle}</h3>
                <p class="application-company">${app.companyName}</p>
              </div>
              <div class="application-status">
                <span class="status-badge ${app.status}">${statusLabels[app.status]}</span>
              </div>
            </div>

            <p class="application-meta">${metaText}</p>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ===================================
// EVENT HANDLERS
// ===================================
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderApplications();
    });
  }

  // Status filters
  const filterButtons = document.querySelectorAll('#status-filters button');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      statusFilter = button.dataset.status;

      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('btn-default', 'active');
        btn.classList.add('btn-outline');
      });
      button.classList.remove('btn-outline');
      button.classList.add('btn-default', 'active');

      renderApplications();
    });
  });

  // Edit profile button
  const editProfileBtn = document.getElementById('edit-profile-btn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      alert('Edit profile modal would open here.');
    });
  }

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
  renderApplications();
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
