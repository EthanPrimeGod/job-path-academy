// Leaderboard Data
const topAnnotators = [
  { rank: 1, name: "Alex Chen", xp: 12450, avatar: "AC" },
  { rank: 2, name: "Sarah Martinez", xp: 11280, avatar: "SM" },
  { rank: 3, name: "Jordan Lee", xp: 10950, avatar: "JL" },
  { rank: 4, name: "Maya Patel", xp: 9870, avatar: "MP" },
  { rank: 5, name: "Chris Wong", xp: 9320, avatar: "CW" },
];

// Module Data
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
    icon: "file-text",
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
    icon: "headphones",
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
    icon: "file-text",
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
    icon: "headphones",
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
  },
];

// State
let state = {
  moduleType: 'core',
  moduleState: 'all',
  leaderboardCategory: 'all'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderLeaderboard();
  renderModules();
});

// Event Listeners
function setupEventListeners() {
  // Leaderboard tabs
  document.querySelectorAll('.hive-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      state.leaderboardCategory = category;

      // Update active state
      document.querySelectorAll('.hive-tab').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');

      renderLeaderboard();
    });
  });

  // Module type filter
  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      state.moduleType = type;

      // Update active states
      document.querySelectorAll('[data-type]').forEach(b => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-outline');
      });
      e.currentTarget.classList.remove('btn-outline');
      e.currentTarget.classList.add('btn-primary', 'active');

      renderModules();
    });
  });

  // Module state filter
  document.querySelectorAll('[data-state]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const moduleState = e.currentTarget.dataset.state;
      state.moduleState = moduleState;

      // Update active states
      document.querySelectorAll('[data-state]').forEach(b => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-outline');
      });
      e.currentTarget.classList.remove('btn-outline');
      e.currentTarget.classList.add('btn-primary', 'active');

      renderModules();
    });
  });

  // View all button
  document.getElementById('viewAllBtn').addEventListener('click', () => {
    state.moduleState = 'all';

    // Reset state filter buttons
    document.querySelectorAll('[data-state]').forEach(b => {
      b.classList.remove('btn-primary', 'active');
      b.classList.add('btn-outline');
    });
    document.querySelector('[data-state="all"]').classList.remove('btn-outline');
    document.querySelector('[data-state="all"]').classList.add('btn-primary', 'active');

    renderModules();
  });
}

// Render leaderboard
function renderLeaderboard() {
  const grid = document.getElementById('leaderboardGrid');

  grid.innerHTML = topAnnotators.map(annotator => {
    const trophyHtml = annotator.rank <= 3 ? `
      <svg class="leaderboard-trophy ${annotator.rank === 1 ? 'gold' : annotator.rank === 2 ? 'silver' : 'bronze'}"
           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    ` : '';

    return `
      <div class="leaderboard-card ${annotator.rank === 1 ? 'rank-1' : ''}">
        ${trophyHtml}
        <div class="leaderboard-avatar">${annotator.avatar}</div>
        <div class="leaderboard-name">${annotator.name}</div>
        <div class="leaderboard-rank">Rank #${annotator.rank}</div>
        <div class="leaderboard-xp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>${annotator.xp.toLocaleString()}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Get filtered modules
function getFilteredModules() {
  return modules.filter(module => {
    const matchesType = module.type === state.moduleType;
    const matchesState = state.moduleState === 'all' || module.state === state.moduleState;
    return matchesType && matchesState;
  });
}

// Get difficulty color class
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "Beginner": return "difficulty-beginner";
    case "Intermediate": return "difficulty-intermediate";
    case "Advanced": return "difficulty-advanced";
    default: return "";
  }
}

// Get action label
function getActionLabel(state) {
  switch (state) {
    case "in-progress": return "Continue";
    case "completed": return "Review";
    default: return "Start Module";
  }
}

// Get icon SVG
function getIconSvg(icon) {
  const icons = {
    'image': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
    'headphones': '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>',
    'video': '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>'
  };
  return icons[icon] || '';
}

// Render modules
function renderModules() {
  const filteredModules = getFilteredModules();
  const grid = document.getElementById('moduleGrid');
  const emptyState = document.getElementById('emptyState');

  if (filteredModules.length > 0) {
    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = filteredModules.map((module, index) => {
      const completedBadge = module.state === 'completed' ? `
        <div class="module-completed-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      ` : '';

      const progressHtml = module.state === 'in-progress' && module.progress ? `
        <div class="module-progress">
          <div class="module-progress-header">
            <span>Progress</span>
            <span class="module-progress-value">${module.progress.current}/${module.progress.total}</span>
          </div>
          <div class="module-progress-bar">
            <div class="module-progress-fill" style="width: ${(module.progress.current / module.progress.total) * 100}%"></div>
          </div>
        </div>
      ` : '';

      const scoreHtml = module.state === 'completed' && module.bestScore ? `
        <div class="module-score">
          <div class="module-score-bar">
            <div class="module-score-fill" style="width: ${module.bestScore}%"></div>
          </div>
          <span class="module-score-value">${module.bestScore}%</span>
        </div>
      ` : '';

      return `
        <a href="/hive-module-detail.html?id=${module.id}" class="module-card" style="animation-delay: ${index * 100}ms">
          ${completedBadge}

          <div class="module-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${getIconSvg(module.icon)}
            </svg>
          </div>

          <div class="module-badges">
            <span class="module-badge">${module.category}</span>
            <span class="module-badge ${getDifficultyColor(module.difficulty)}">${module.difficulty}</span>
          </div>

          <h3 class="module-title">${module.title}</h3>

          ${progressHtml}
          ${scoreHtml}

          <p class="module-description">${module.description}</p>

          <div class="module-xp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>${module.xp} XP</span>
          </div>

          <button class="btn ${module.state === 'completed' ? 'btn-outline' : 'btn-outline'} btn-sm btn-full">
            ${getActionLabel(module.state)}
          </button>
        </a>
      `;
    }).join('');
  } else {
    grid.style.display = 'none';
    emptyState.style.display = 'flex';
  }
}
