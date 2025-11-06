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
    icon: "text",
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
    icon: "audio",
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
    icon: "video",
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
    icon: "image",
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
    icon: "text",
    type: "company",
    companyName: "Anthropic",
    objective: "Learn to identify and categorize people, places, organizations, and other entities in text.",
    duration: "15-20 minutes",
    requirements: "Basic text annotation experience",
    completionRate: 76,
    longDescription: "Named Entity Recognition (NER) is fundamental to natural language understanding. This module trains you to identify and classify entities like people, locations, organizations, dates, and custom entity types in various text formats."
  },
];

// Top Performers Data
const topPerformers = [
  { rank: 1, name: "Alex Chen", score: 98, avatar: "AC" },
  { rank: 2, name: "Maya Patel", score: 96, avatar: "MP" },
  { rank: 3, name: "Jordan Lee", score: 94, avatar: "JL" },
];

// Get module icon SVG
function getModuleIconSVG(iconType) {
  const icons = {
    image: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    `,
    text: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    `,
    audio: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    `,
    video: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    `
  };
  return icons[iconType] || icons.image;
}

// Get difficulty color class
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "Beginner": return "module-badge-beginner";
    case "Intermediate": return "module-badge-intermediate";
    case "Advanced": return "module-badge-advanced";
    default: return "";
  }
}

// Get URL parameter
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const moduleId = getUrlParameter('module');

  if (!moduleId) {
    showNotFound();
    return;
  }

  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    showNotFound();
    return;
  }

  renderModule(module);
  renderRelatedModules(module);
});

// Show not found state
function showNotFound() {
  document.getElementById('notFoundState').style.display = 'block';
  document.getElementById('mainContent').style.display = 'none';
}

// Render module
function renderModule(module) {
  document.getElementById('notFoundState').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';

  // Update page title
  document.title = `${module.title} - The Hive | Job Path Academy`;

  // Render badges
  const badgesHtml = `
    <span class="module-badge">${module.category}</span>
    <span class="module-badge ${getDifficultyColor(module.difficulty)}">${module.difficulty}</span>
    ${module.type === 'company' && module.companyName ? `<span class="module-badge module-badge-company">${module.companyName}</span>` : ''}
  `;
  document.getElementById('moduleBadges').innerHTML = badgesHtml;

  // Render title and description
  document.getElementById('moduleTitle').textContent = module.title;
  document.getElementById('moduleLongDescription').textContent = module.longDescription;

  // Render icon
  document.getElementById('moduleIconContainer').innerHTML = getModuleIconSVG(module.icon);

  // Render overview cards
  document.getElementById('moduleObjective').textContent = module.objective;
  document.getElementById('moduleDuration').textContent = module.duration;
  document.getElementById('moduleXP').textContent = `${module.xp} XP`;
  document.getElementById('moduleRequirements').textContent = module.requirements;
  document.getElementById('moduleCompletionRate').textContent = module.completionRate;

  // Render top performers
  const performersHtml = topPerformers.map(performer => `
    <div class="module-performer">
      <div class="module-performer-rank">#${performer.rank}</div>
      <div class="module-performer-avatar">${performer.avatar}</div>
      <div class="module-performer-info">
        <div class="module-performer-name">${performer.name}</div>
        <div class="module-performer-score">${performer.score}% accuracy</div>
      </div>
    </div>
  `).join('');
  document.getElementById('topPerformersList').innerHTML = performersHtml;

  // Render company disclaimer if applicable
  if (module.type === 'company' && module.companyName) {
    document.getElementById('moduleCompanyDisclaimer').textContent =
      `By continuing, you agree to handle ${module.companyName} data responsibly.`;
  }
}

// Render related modules
function renderRelatedModules(currentModule) {
  const relatedModules = modules
    .filter(m => m.id !== currentModule.id &&
      (m.category === currentModule.category || m.difficulty === currentModule.difficulty))
    .slice(0, 3);

  if (relatedModules.length === 0) {
    return;
  }

  document.getElementById('relatedModulesSection').style.display = 'block';

  const relatedHtml = relatedModules.map(module => `
    <a href="hive-module-detail.html?module=${module.id}" class="module-related-card">
      <div class="module-related-icon">
        ${getModuleIconSVG(module.icon)}
      </div>

      <div class="module-related-badges">
        <span class="module-badge-small">${module.category}</span>
      </div>

      <h3 class="module-related-title">${module.title}</h3>

      <p class="module-related-description">${module.description}</p>

      <div class="module-related-xp">
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>${module.xp} XP</span>
      </div>
    </a>
  `).join('');

  document.getElementById('relatedModulesGrid').innerHTML = relatedHtml;
}
