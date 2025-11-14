/**
 * Hive Module Detail Page - JavaScript
 * Dynamic module detail page that loads content based on URL parameter
 */

// ===================================
// MODULE DATA
// ===================================
const modules = [
  {
    id: "bounding-boxes-101",
    title: "Bounding Boxes 101",
    category: "Computer Vision",
    description: "Master the fundamentals of accurate object detection through precise bounding box annotation.",
    difficulty: "Beginner",
    xp: 250,
    iconType: "image",
    type: "core",
    objective: "Learn to draw accurate bounding boxes around objects in images with pixel-perfect precision.",
    duration: "10-15 minutes",
    requirements: "None",
    completionRate: 87,
    longDescription: "This foundational module teaches you the essential skills of object detection annotation. You'll practice identifying objects in images and drawing precise bounding boxes around them — a critical skill for training computer vision models."
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    category: "NLP",
    description: "Train your ability to identify emotional tone and classify text sentiment across contexts.",
    difficulty: "Intermediate",
    xp: 400,
    iconType: "text",
    type: "core",
    objective: "Develop expertise in identifying positive, negative, and neutral sentiment in various text types.",
    duration: "15-20 minutes",
    requirements: "Complete Text Classification 101",
    completionRate: 72,
    longDescription: "Sentiment analysis is crucial for understanding human communication in AI systems. This module trains you to accurately classify emotional tone across social media posts, reviews, and conversational text."
  },
  {
    id: "audio-classification",
    title: "Audio Classification",
    category: "Audio",
    description: "Develop expertise in categorizing and tagging various sound types and audio patterns.",
    difficulty: "Beginner",
    xp: 300,
    iconType: "audio",
    type: "core",
    objective: "Master the identification and categorization of different sound types and audio events.",
    duration: "12-18 minutes",
    requirements: "None",
    completionRate: 81,
    longDescription: "Audio classification is essential for voice assistants, sound detection systems, and audio processing AI. Practice identifying and categorizing various sound patterns and acoustic events."
  },
  {
    id: "video-frame-tagging",
    title: "Video Frame Tagging",
    category: "Video",
    description: "Learn to annotate temporal sequences and identify key moments in video content.",
    difficulty: "Advanced",
    xp: 500,
    iconType: "video",
    type: "company",
    companyName: "Waymo",
    objective: "Develop skills in temporal annotation and identifying critical events in video sequences.",
    duration: "20-30 minutes",
    requirements: "Complete Image Annotation basics",
    completionRate: 64,
    longDescription: "Video annotation requires understanding both spatial and temporal dimensions. This module teaches you to identify and tag key moments, actions, and objects across video frames — essential for autonomous systems and video understanding AI."
  },
  {
    id: "semantic-segmentation",
    title: "Semantic Segmentation",
    category: "Computer Vision",
    description: "Practice pixel-level classification for detailed image understanding and object isolation.",
    difficulty: "Advanced",
    xp: 600,
    iconType: "image",
    type: "core",
    objective: "Master pixel-perfect segmentation for detailed object isolation and scene understanding.",
    duration: "25-35 minutes",
    requirements: "Complete Bounding Boxes 101",
    completionRate: 58,
    longDescription: "Semantic segmentation is the most precise form of image annotation. Learn to classify every pixel in an image, creating detailed masks that AI models use for advanced computer vision tasks."
  },
  {
    id: "entity-recognition",
    title: "Entity Recognition",
    category: "NLP",
    description: "Sharpen your skills in identifying and classifying named entities in text data.",
    difficulty: "Intermediate",
    xp: 350,
    iconType: "text",
    type: "company",
    companyName: "Anthropic",
    objective: "Learn to identify and categorize people, places, organizations, and other entities in text.",
    duration: "15-20 minutes",
    requirements: "Basic text annotation experience",
    completionRate: 76,
    longDescription: "Named Entity Recognition (NER) is fundamental to natural language understanding. This module trains you to identify and classify entities like people, locations, organizations, dates, and custom entity types in various text formats."
  }
];

const topPerformers = [
  { rank: 1, name: "Alex Chen", score: 98, avatar: "AC" },
  { rank: 2, name: "Maya Patel", score: 96, avatar: "MP" },
  { rank: 3, name: "Jordan Lee", score: 94, avatar: "JL" }
];

// User progress data (mock - replace with actual user data)
const userProgress = {
  "bounding-boxes-101": { completed: true, lastScore: 92, bestScore: 95 },
  "semantic-segmentation": { completed: true, lastScore: 87, bestScore: 91 }
};

// ===================================
// SVG ICONS
// ===================================
function getIconSVG(type) {
  const icons = {
    image: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
    text: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
    audio: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>',
    video: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>',
    target: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    trophy: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v-3m0 0c1.657 0 3-.895 3-2V6c0-1.105-1.343-2-3-2S9 4.895 9 6v4c0 1.105 1.343 2 3 2zm-6.364-.364l-.707-.707m12.728 0l.707-.707m-13.435-5l-.707-.707M18.364 5.636l.707-.707M3 12h3m15 0h3M7.05 19.05l-.707-.707m11.314 0l.707-.707" /></svg>'
  };
  return icons[type] || '';
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case "Beginner":
      return "difficulty-beginner";
    case "Intermediate":
      return "difficulty-intermediate";
    case "Advanced":
      return "difficulty-advanced";
    default:
      return "";
  }
}

function getModuleIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('module');
}

function getRelatedModules(currentModule) {
  return modules
    .filter(m => m.id !== currentModule.id &&
           (m.category === currentModule.category || m.difficulty === currentModule.difficulty))
    .slice(0, 3);
}

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderModuleNotFound() {
  return `
    <div class="module-not-found">
      <h1>Module Not Found</h1>
      <p style="color: var(--muted-foreground); margin-bottom: 2rem;">
        The module you're looking for doesn't exist.
      </p>
      <a href="/hive.html" class="btn btn-outline">← Return to The Hive</a>
    </div>
  `;
}

function renderModuleHeader(module) {
  const companyBadge = module.type === 'company' && module.companyName
    ? `<span class="module-badge" style="background-color: hsla(45, 95%, 58%, 0.05);">${module.companyName}</span>`
    : '';

  return `
    <section class="module-header">
      <div class="module-header-container">
        <div class="module-header-grid">
          <div class="module-info">
            <div class="module-badges">
              <span class="module-badge">${module.category}</span>
              <span class="module-badge difficulty-badge ${getDifficultyClass(module.difficulty)}">
                ${module.difficulty}
              </span>
              ${companyBadge}
            </div>

            <h1>${module.title}</h1>

            <p class="module-long-description">
              ${module.longDescription}
            </p>
          </div>

          <div class="module-visual">
            <div class="module-icon-large">
              ${getIconSVG(module.iconType)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderModuleOverview(module) {
  return `
    <section class="module-overview-section">
      <div class="module-overview-container">
        <h2>Module Overview</h2>

        <div class="overview-grid">
          <div class="overview-card card">
            ${getIconSVG('target')}
            <div class="overview-card-label">Objective</div>
            <div class="overview-card-value">${module.objective}</div>
          </div>

          <div class="overview-card card">
            ${getIconSVG('clock')}
            <div class="overview-card-label">Duration</div>
            <div class="overview-card-value">${module.duration}</div>
          </div>

          <div class="overview-card card">
            ${getIconSVG('star')}
            <div class="overview-card-label">XP Reward</div>
            <div class="overview-card-value">${module.xp} XP</div>
          </div>

          <div class="overview-card card">
            ${getIconSVG('check')}
            <div class="overview-card-label">Requirements</div>
            <div class="overview-card-value">${module.requirements}</div>
          </div>
        </div>

        <div class="completion-rate">
          ${module.completionRate}% of annotators complete this module
        </div>
      </div>
    </section>
  `;
}

function renderTopPerformers() {
  const performerItems = topPerformers.map(performer => `
    <div class="performer-item">
      <div class="performer-rank">#${performer.rank}</div>
      <div class="performer-avatar">${performer.avatar}</div>
      <div class="performer-info">
        <div class="performer-name">${performer.name}</div>
        <div class="performer-score">${performer.score}% accuracy</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="top-performers-card card">
      <div class="top-performers-header">
        <h3>Top Performers</h3>
        ${getIconSVG('trophy')}
      </div>

      <div class="performers-list">
        ${performerItems}
      </div>

      <a href="/hive-leaderboards.html" class="btn btn-outline btn-sm btn-full">
        View Full Leaderboard →
      </a>
    </div>
  `;
}

function renderStartPractice(module) {
  const progress = userProgress[module.id];
  const disclaimer = module.type === 'company' && module.companyName
    ? `<div class="practice-disclaimer">By continuing, you agree to handle ${module.companyName} data responsibly.</div>`
    : '';

  const progressCard = progress && progress.completed ? `
    <div class="progress-indicator-card card">
      <div class="progress-indicator-content">
        <div class="progress-indicator-info">
          <h3>
            ${getIconSVG('check')}
            <span>Previously Completed</span>
          </h3>
          <div class="progress-stats">
            Last attempt: ${progress.lastScore}% accuracy • Best score: ${progress.bestScore}%
          </div>
        </div>
        <button class="btn btn-outline btn-sm">
          Try Again
        </button>
      </div>
    </div>
  ` : '';

  return `
    <div class="start-practice-content">
      <div class="practice-cta-card">
        <h2>Ready to Practice?</h2>
        <p>
          This module opens in the Stinger annotation environment. Your progress will be tracked and you'll earn XP upon completion.
        </p>

        <button class="btn btn-lg" style="background: var(--gradient-primary); color: var(--primary-foreground); border: none; box-shadow: var(--shadow-glow);">
          Start Practicing
        </button>

        ${disclaimer}
      </div>

      ${progressCard}
    </div>
  `;
}

function renderMainContent(module) {
  return `
    <section class="module-content-section">
      <div class="module-content-container">
        <div class="module-content-grid">
          ${renderTopPerformers()}
          ${renderStartPractice(module)}
        </div>
      </div>
    </section>
  `;
}

function renderRelatedModules(relatedModules) {
  if (relatedModules.length === 0) return '';

  const moduleCards = relatedModules.map(module => `
    <a href="/hive-module.html?module=${module.id}" class="related-module-card">
      <div class="related-module-icon">
        ${getIconSVG(module.iconType)}
      </div>

      <div class="related-module-badges">
        <span class="module-badge">${module.category}</span>
      </div>

      <h3>${module.title}</h3>

      <p class="related-module-description">
        ${module.description}
      </p>

      <div class="related-module-xp">
        ${getIconSVG('star')}
        <span>${module.xp} XP</span>
      </div>
    </a>
  `).join('');

  return `
    <section class="related-modules-section">
      <div class="related-modules-container">
        <h2>You May Also Like</h2>

        <div class="related-modules-grid">
          ${moduleCards}
        </div>
      </div>
    </section>
  `;
}

// ===================================
// INITIALIZE PAGE
// ===================================
function initializePage() {
  const moduleId = getModuleIdFromURL();
  const module = modules.find(m => m.id === moduleId);
  const contentContainer = document.getElementById('module-content');

  if (!module) {
    contentContainer.innerHTML = renderModuleNotFound();
    document.getElementById('page-title').textContent = 'Module Not Found | The Hive - Annota';
    return;
  }

  // Update page title
  document.getElementById('page-title').textContent = `${module.title} | The Hive - Annota`;

  // Render all sections
  const relatedModules = getRelatedModules(module);
  contentContainer.innerHTML = `
    <div style="max-width: 1152px; margin: 0 auto; padding: 2rem 1.5rem 0;">
      <a href="/hive.html" class="back-button">
        ${getIconSVG('arrowLeft')}
        Back to The Hive
      </a>
    </div>
    ${renderModuleHeader(module)}
    ${renderModuleOverview(module)}
    ${renderMainContent(module)}
    ${renderRelatedModules(relatedModules)}
  `;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
