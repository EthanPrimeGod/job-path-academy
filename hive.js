/**
 * Hive Page JavaScript
 * Handles practice modules, leaderboard, and filtering functionality
 */

// ===================================
// DATA
// ===================================
const topAnnotators = [
  { rank: 1, name: "Alex Chen", xp: 12450, avatar: "AC" },
  { rank: 2, name: "Sarah Martinez", xp: 11280, avatar: "SM" },
  { rank: 3, name: "Jordan Lee", xp: 10950, avatar: "JL" },
  { rank: 4, name: "Maya Patel", xp: 9870, avatar: "MP" },
  { rank: 5, name: "Chris Wong", xp: 9320, avatar: "CW" },
];

const modules = [
  {
    id: "bounding-boxes-101",
    title: "Bounding Boxes 101",
    category: "Computer Vision",
    description: "Master the fundamentals of accurate object detection through precise bounding box annotation.",
    difficulty: "Beginner",
    xp: 250,
    icon: "image",
    type: "core",
    state: "completed",
    progress: { current: 10, total: 10 },
    bestScore: 94
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    category: "NLP",
    description: "Train your ability to identify emotional tone and classify text sentiment across contexts.",
    difficulty: "Intermediate",
    xp: 400,
    icon: "text",
    type: "core",
    state: "in-progress",
    progress: { current: 3, total: 10 }
  },
  {
    id: "audio-classification",
    title: "Audio Classification",
    category: "Audio",
    description: "Develop expertise in categorizing and tagging various sound types and audio patterns.",
    difficulty: "Beginner",
    xp: 300,
    icon: "audio",
    type: "core",
    state: "not-started"
  },
  {
    id: "video-frame-tagging",
    title: "Video Frame Tagging",
    category: "Video",
    description: "Learn to annotate temporal sequences and identify key moments in video content.",
    difficulty: "Advanced",
    xp: 500,
    icon: "video",
    type: "company",
    state: "not-started"
  },
  {
    id: "semantic-segmentation",
    title: "Semantic Segmentation",
    category: "Computer Vision",
    description: "Practice pixel-level classification for detailed image understanding and object isolation.",
    difficulty: "Advanced",
    xp: 600,
    icon: "image",
    type: "core",
    state: "completed",
    progress: { current: 12, total: 12 },
    bestScore: 87
  },
  {
    id: "entity-recognition",
    title: "Entity Recognition",
    category: "NLP",
    description: "Sharpen your skills in identifying and classifying named entities in text data.",
    difficulty: "Intermediate",
    xp: 350,
    icon: "text",
    type: "company",
    state: "in-progress",
    progress: { current: 5, total: 15 }
  },
  {
    id: "speech-transcription",
    title: "Speech Transcription",
    category: "Audio",
    description: "Perfect your accuracy in converting spoken language to written text with proper formatting.",
    difficulty: "Intermediate",
    xp: 400,
    icon: "audio",
    type: "core",
    state: "not-started"
  },
  {
    id: "action-recognition",
    title: "Action Recognition",
    category: "Video",
    description: "Train to identify and label human actions and movements in video sequences.",
    difficulty: "Advanced",
    xp: 550,
    icon: "video",
    type: "company",
    state: "completed",
    progress: { current: 8, total: 8 },
    bestScore: 91
  }
];

// ===================================
// STATE MANAGEMENT
// ===================================
const isAuthenticated = true; // Change to false to see unauthenticated state

let currentModuleType = 'core';
let currentStateFilter = 'all';

// ===================================
// DOM ELEMENTS
// ===================================
const leaderboardGrid = document.getElementById('leaderboard-grid');
const modulesGrid = document.getElementById('modules-grid');
const noModules = document.getElementById('no-modules');

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================
function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenuBtn?.addEventListener('click', openMobileMenu);
mobileMenuClose?.addEventListener('click', closeMobileMenu);
mobileOverlay?.addEventListener('click', closeMobileMenu);

// ===================================
// ICON HELPERS
// ===================================
function getIconSVG(iconType) {
  const icons = {
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>`,
    text: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>`,
    audio: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>`,
    video: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>`
  };
  return icons[iconType] || icons.image;
}

function getStarSVG(filled = true) {
  if (filled) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>`;
}

function getTrophySVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>`;
}

function getCheckSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>`;
}

// ===================================
// LEADERBOARD FUNCTIONALITY
// ===================================
function renderLeaderboard() {
  leaderboardGrid.innerHTML = topAnnotators.map(annotator => {
    let trophyHTML = '';
    let trophyClass = '';

    if (annotator.rank === 1) {
      trophyClass = 'trophy-gold';
    } else if (annotator.rank === 2) {
      trophyClass = 'trophy-silver';
    } else if (annotator.rank === 3) {
      trophyClass = 'trophy-bronze';
    }

    if (annotator.rank <= 3) {
      trophyHTML = `<div class="trophy-icon ${trophyClass}">${getTrophySVG()}</div>`;
    }

    return `
      <div class="leaderboard-card card rank-${annotator.rank}">
        ${trophyHTML}
        <div class="leaderboard-avatar">${annotator.avatar}</div>
        <div class="leaderboard-name">${annotator.name}</div>
        <div class="leaderboard-rank">Rank #${annotator.rank}</div>
        <div class="leaderboard-xp">
          ${getStarSVG()}
          <span>${annotator.xp.toLocaleString()}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Leaderboard tab switching
document.querySelectorAll('.leaderboard-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // In a real app, you would fetch different leaderboard data based on skill
    // For now, we just show the same data
  });
});

// ===================================
// MODULE FUNCTIONALITY
// ===================================
function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case 'Beginner': return 'difficulty-beginner';
    case 'Intermediate': return 'difficulty-intermediate';
    case 'Advanced': return 'difficulty-advanced';
    default: return '';
  }
}

function getActionLabel(state) {
  switch (state) {
    case 'in-progress': return 'Continue';
    case 'completed': return 'Review';
    default: return 'Start Module';
  }
}

function filterModules() {
  return modules.filter(module => {
    const matchesType = module.type === currentModuleType;
    const matchesState = currentStateFilter === 'all' || module.state === currentStateFilter;
    return matchesType && matchesState;
  });
}

function renderModules() {
  const filteredModules = filterModules();

  if (filteredModules.length === 0) {
    modulesGrid.style.display = 'none';
    noModules.style.display = 'block';
    return;
  }

  modulesGrid.style.display = 'grid';
  noModules.style.display = 'none';

  modulesGrid.innerHTML = filteredModules.map((module, index) => {
    let progressHTML = '';
    let completedCheckHTML = '';

    if (isAuthenticated) {
      if (module.state === 'completed') {
        completedCheckHTML = `<div class="completed-check">${getCheckSVG()}</div>`;
      }

      if (module.state === 'in-progress' && module.progress) {
        const progressPercent = (module.progress.current / module.progress.total) * 100;
        progressHTML = `
          <div class="module-progress">
            <div class="module-progress-header">
              <span>Progress</span>
              <span>${module.progress.current}/${module.progress.total}</span>
            </div>
            <div class="module-progress-bar">
              <div class="module-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        `;
      }

      if (module.state === 'completed' && module.bestScore) {
        progressHTML = `
          <div class="module-best-score">
            <div class="module-score-bar">
              <div class="module-score-fill" style="width: ${module.bestScore}%"></div>
            </div>
            <span class="module-score-value">${module.bestScore}%</span>
          </div>
        `;
      }
    }

    return `
      <a href="/hive/${module.id}.html" class="module-card ${module.state === 'completed' ? 'completed' : ''} animate-scale-in" style="animation-delay: ${index * 100}ms;">
        ${completedCheckHTML}

        <div class="module-icon">
          ${getIconSVG(module.icon)}
        </div>

        <div class="module-badges">
          <span class="module-badge">${module.category}</span>
          <span class="module-badge difficulty-badge ${getDifficultyClass(module.difficulty)}">
            ${module.difficulty}
          </span>
        </div>

        <h3 class="module-title">${module.title}</h3>

        ${progressHTML}

        <p class="module-description">${module.description}</p>

        <div class="module-footer">
          <div class="module-xp">
            ${getStarSVG()}
            <span>${module.xp} XP</span>
          </div>
        </div>

        <button class="btn btn-outline btn-sm module-action-btn">
          ${isAuthenticated ? getActionLabel(module.state) : 'Start Module'}
        </button>
      </a>
    `;
  }).join('');
}

// Module type filter
document.querySelectorAll('.module-type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    currentModuleType = type;

    // Update button states
    document.querySelectorAll('.module-type-btn').forEach(b => {
      if (b.dataset.type === type) {
        b.classList.remove('btn-outline');
        b.classList.add('btn-default');
      } else {
        b.classList.remove('btn-default');
        b.classList.add('btn-outline');
      }
    });

    renderModules();
  });
});

// Module state filter
document.querySelectorAll('.state-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const state = btn.dataset.state;
    currentStateFilter = state;

    // Update button states
    document.querySelectorAll('.state-filter-btn').forEach(b => {
      if (b.dataset.state === state) {
        b.classList.remove('btn-outline');
        b.classList.add('btn-default');
      } else {
        b.classList.remove('btn-default');
        b.classList.add('btn-outline');
      }
    });

    renderModules();
  });
});

// Reset filters function
function resetFilters() {
  currentStateFilter = 'all';

  // Update state filter buttons
  document.querySelectorAll('.state-filter-btn').forEach(b => {
    if (b.dataset.state === 'all') {
      b.classList.remove('btn-outline');
      b.classList.add('btn-default');
    } else {
      b.classList.remove('btn-default');
      b.classList.add('btn-outline');
    }
  });

  renderModules();
}

// Make resetFilters available globally
window.resetFilters = resetFilters;

// ===================================
// AUTHENTICATION STATE
// ===================================
function setupAuthUI() {
  const stateFilter = document.getElementById('state-filter');

  if (!isAuthenticated && stateFilter) {
    stateFilter.style.display = 'none';
  }
}

// ===================================
// INITIALIZATION
// ===================================
renderLeaderboard();
renderModules();
setupAuthUI();
