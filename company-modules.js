/**
 * Company Modules Page - JavaScript
 * Manage assessment modules with grid layout
 */

// ===================================
// DATA
// ===================================
const mockModules = [
  {
    id: "1",
    title: "Computer Vision Fundamentals",
    description: "Basic image annotation and labeling techniques for computer vision projects",
    category: "Computer Vision",
    completionRate: 78,
    enrolledUsers: 45,
    createdAt: "2024-12-01"
  },
  {
    id: "2",
    title: "NLP Text Classification",
    description: "Advanced natural language processing annotation for sentiment and intent analysis",
    category: "NLP",
    completionRate: 62,
    enrolledUsers: 32,
    createdAt: "2024-12-15"
  },
  {
    id: "3",
    title: "Audio Transcription Mastery",
    description: "Professional audio transcription and annotation for speech recognition models",
    category: "Audio",
    completionRate: 85,
    enrolledUsers: 28,
    createdAt: "2024-11-20"
  },
  {
    id: "4",
    title: "Video Scene Understanding",
    description: "Frame-by-frame video annotation for action recognition and object tracking",
    category: "Video",
    completionRate: 54,
    enrolledUsers: 19,
    createdAt: "2025-01-05"
  },
  {
    id: "5",
    title: "3D Point Cloud Labeling",
    description: "Specialized training for LiDAR and 3D spatial data annotation",
    category: "3D",
    completionRate: 41,
    enrolledUsers: 12,
    createdAt: "2025-01-10"
  },
  {
    id: "6",
    title: "Medical Imaging Annotation",
    description: "Healthcare-focused image annotation with emphasis on accuracy and compliance",
    category: "Medical",
    completionRate: 92,
    enrolledUsers: 38,
    createdAt: "2024-11-01"
  }
];

// ===================================
// RENDER FUNCTIONS
// ===================================
function getCategoryIcon(category) {
  const icons = {
    "Computer Vision": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`,
    "NLP": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>`,
    "Audio": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>`,
    "Video": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>`,
    "3D": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`,
    "Medical": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>`
  };
  return icons[category] || icons["Computer Vision"];
}

function renderModules() {
  const grid = document.getElementById('modules-grid');
  if (!grid) return;

  grid.innerHTML = mockModules.map(module => `
    <div class="module-card card">
      <div class="module-card-header">
        <div class="module-icon">
          ${getCategoryIcon(module.category)}
        </div>
        <span class="badge" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">${module.category}</span>
      </div>
      <h3>${module.title}</h3>
      <p>${module.description}</p>
      <div class="module-stats">
        <div>
          <div class="module-stat-label">Completion Rate</div>
          <div class="module-stat-value">${module.completionRate}%</div>
        </div>
        <div>
          <div class="module-stat-label">Enrolled Users</div>
          <div class="module-stat-value">${module.enrolledUsers}</div>
        </div>
      </div>
      <div class="module-actions">
        <button class="btn btn-outline btn-sm" onclick="editModule('${module.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14" style="margin-right: 0.375rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button class="btn btn-default btn-sm" onclick="viewModule('${module.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14" style="margin-right: 0.375rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </button>
      </div>
    </div>
  `).join('');
}

// ===================================
// EVENT HANDLERS
// ===================================
function editModule(id) {
  alert(`Edit module ID: ${id}\n\n(Edit dialog would open here)`);
}

function viewModule(id) {
  alert(`View module ID: ${id}\n\n(Module details would open here)`);
}

function setupEventListeners() {
  // Create module button
  const createBtn = document.getElementById('create-module-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      alert('Create new module dialog would open here.');
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
  renderModules();
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
