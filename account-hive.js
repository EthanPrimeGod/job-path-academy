/**
 * Account Hive Page - JavaScript
 * User's personal Hive progress dashboard
 */

// ===================================
// DATA
// ===================================
const moduleHistory = [
  {
    id: "bounding-boxes-101",
    title: "Bounding Boxes 101",
    category: "Computer Vision",
    iconType: "image",
    status: "completed",
    bestScore: 94,
    lastUpdated: "2 hours ago"
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    category: "NLP",
    iconType: "text",
    status: "in-progress",
    progress: { current: 3, total: 10 },
    lastUpdated: "5 hours ago"
  },
  {
    id: "semantic-segmentation",
    title: "Semantic Segmentation",
    category: "Computer Vision",
    iconType: "image",
    status: "completed",
    bestScore: 87,
    lastUpdated: "1 day ago"
  },
  {
    id: "entity-recognition",
    title: "Entity Recognition",
    category: "NLP",
    iconType: "text",
    status: "in-progress",
    progress: { current: 5, total: 15 },
    lastUpdated: "2 days ago"
  }
];

// ===================================
// SVG ICONS
// ===================================
function getIconSVG(type) {
  const icons = {
    image: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
    text: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
  };
  return icons[type] || '';
}

// ===================================
// STATE
// ===================================
let currentFilter = 'all';

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderModuleHistory() {
  const listContainer = document.getElementById('module-history-list');
  const noModules = document.getElementById('no-modules');

  if (!listContainer || !noModules) return;

  // Filter modules
  const filteredModules = moduleHistory.filter(m =>
    currentFilter === 'all' || m.status === currentFilter
  );

  if (filteredModules.length === 0) {
    listContainer.style.display = 'none';
    noModules.style.display = 'block';
    return;
  }

  listContainer.style.display = 'flex';
  noModules.style.display = 'none';

  listContainer.innerHTML = filteredModules.map(module => {
    const buttonText = module.status === 'completed' ? 'Review' : 'Continue';

    let detailsHTML = '';
    if (module.status === 'completed' && module.bestScore) {
      detailsHTML = `
        <div class="module-item-details">
          Best score: ${module.bestScore}% · ${module.lastUpdated}
        </div>
      `;
    } else if (module.status === 'in-progress' && module.progress) {
      const progressPercent = (module.progress.current / module.progress.total) * 100;
      detailsHTML = `
        <div class="module-progress">
          <div class="module-progress-bar">
            <div class="module-progress-bar-container">
              <div class="module-progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
          <span class="module-progress-text">
            ${module.progress.current}/${module.progress.total} · ${module.lastUpdated}
          </span>
        </div>
      `;
    }

    return `
      <div class="module-item card">
        <div class="module-item-content">
          <div class="module-item-left">
            <div class="module-item-icon">
              ${getIconSVG(module.iconType)}
            </div>
            <div class="module-item-info">
              <div class="module-item-header">
                <h3 class="module-item-title">${module.title}</h3>
                <span class="module-badge">${module.category}</span>
              </div>
              ${detailsHTML}
            </div>
          </div>
          <a href="/hive-module.html?module=${module.id}" class="btn btn-outline btn-sm">
            ${buttonText}
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// ===================================
// EVENT HANDLERS
// ===================================
function setupEventListeners() {
  // Filter buttons
  const filterButtons = document.querySelectorAll('#module-filter button');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;

      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('btn-default', 'active');
        btn.classList.add('btn-outline');
      });
      button.classList.remove('btn-outline');
      button.classList.add('btn-default', 'active');

      // Re-render
      renderModuleHistory();
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
  renderModuleHistory();
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
