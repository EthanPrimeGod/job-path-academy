/**
 * Hive Practice Interface - JavaScript
 * Interactive annotation workspace
 */

// ===================================
// MODULE DATA
// ===================================
const modules = {
  "bounding-boxes-101": {
    id: "bounding-boxes-101",
    title: "Bounding Boxes 101",
    category: "Computer Vision",
    objective: "Draw boxes around all visible cars in each image.",
    instructions: [
      "Select the Bounding Box tool from the left toolbar",
      "Click and drag to create a box around each car",
      "Ensure the box tightly fits the object boundaries",
      "Label each box with the correct class",
      "Submit when all objects are annotated"
    ],
    totalTasks: 10,
    currentTask: 3,
    labels: [
      { name: "Car", color: "hsl(260, 60%, 65%)", count: 7 },
      { name: "Truck", color: "hsl(35, 80%, 60%)", count: 3 },
      { name: "Bus", color: "hsl(165, 55%, 55%)", count: 1 }
    ],
    xpReward: 40,
    dataset: "COCO-2024"
  },
  "sentiment-analysis": {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    category: "NLP",
    objective: "Classify the sentiment of each text sample as positive, negative, or neutral.",
    instructions: [
      "Read the text sample carefully",
      "Identify the overall emotional tone",
      "Select the appropriate sentiment label",
      "Consider context and implicit meaning",
      "Submit your classification"
    ],
    totalTasks: 15,
    currentTask: 5,
    labels: [
      { name: "Positive", color: "hsl(142, 76%, 36%)", count: 12 },
      { name: "Negative", color: "hsl(0, 84%, 60%)", count: 8 },
      { name: "Neutral", color: "hsl(220, 15%, 45%)", count: 5 }
    ],
    xpReward: 50,
    dataset: "SST-2024"
  },
  "audio-classification": {
    id: "audio-classification",
    title: "Audio Classification",
    category: "Audio",
    objective: "Identify and label different sound types in audio clips.",
    instructions: [
      "Listen to the audio clip carefully",
      "Identify all distinct sounds",
      "Select the appropriate sound labels",
      "Mark timing if multiple sounds occur",
      "Submit your annotations"
    ],
    totalTasks: 12,
    currentTask: 4,
    labels: [
      { name: "Speech", color: "hsl(200, 60%, 60%)", count: 15 },
      { name: "Music", color: "hsl(290, 60%, 60%)", count: 8 },
      { name: "Noise", color: "hsl(30, 60%, 60%)", count: 6 }
    ],
    xpReward: 35,
    dataset: "AudioSet-2024"
  }
};

const tools = [
  { id: "pointer", name: "Select", shortcut: "V", icon: "pointer" },
  { id: "box", name: "Bounding Box", shortcut: "B", icon: "square" },
  { id: "polygon", name: "Polygon", shortcut: "P", icon: "pentagon" },
  { id: "brush", name: "Brush", shortcut: "M", icon: "brush" },
  { id: "text", name: "Text Label", shortcut: "T", icon: "type" }
];

const recentActions = [
  "Added Bounding Box: 'Car'",
  "Added Bounding Box: 'Car'",
  "Modified Bounding Box: 'Truck'",
  "Added Bounding Box: 'Car'"
];

// ===================================
// SVG ICONS
// ===================================
function getToolIcon(type) {
  const icons = {
    pointer: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 2l5 2 2 5zm0 0l5 2" /></svg>',
    square: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>',
    pentagon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 9l3 11h14l3-11L12 2z" /></svg>',
    brush: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>',
    type: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>'
  };
  return icons[type] || '';
}

// ===================================
// STATE
// ===================================
let currentModule = null;
let activeTool = 'pointer';
let zoom = 100;
let instructionsOpen = true;
let timerSeconds = 334; // 5:34 in seconds

// ===================================
// UTILITY FUNCTIONS
// ===================================
function getModuleIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('module');
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderTools() {
  const toolsGrid = document.getElementById('tools-grid');
  if (!toolsGrid) return;

  toolsGrid.innerHTML = tools.map(tool => `
    <button
      class="tool-btn ${activeTool === tool.id ? 'active' : ''}"
      data-tool="${tool.id}"
      title="${tool.name} (${tool.shortcut})"
    >
      ${getToolIcon(tool.icon)}
    </button>
  `).join('');

  // Add event listeners
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTool = btn.dataset.tool;
      renderTools();
    });
  });
}

function renderInstructions() {
  const instructionsList = document.getElementById('instructions-list');
  if (!instructionsList || !currentModule) return;

  instructionsList.innerHTML = currentModule.instructions.map((step, i) => `
    <li>
      <span class="instruction-number">${i + 1}.</span>
      <span>${step}</span>
    </li>
  `).join('');
}

function renderLabels() {
  const labelsList = document.getElementById('labels-list');
  if (!labelsList || !currentModule) return;

  labelsList.innerHTML = currentModule.labels.map(label => `
    <div class="label-item">
      <div class="label-info">
        <div class="label-color" style="background-color: ${label.color};"></div>
        <span>${label.name}</span>
      </div>
      <span class="label-count">${label.count}</span>
    </div>
  `).join('');
}

function renderHistory() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;

  historyList.innerHTML = recentActions.map(action => `
    <div class="history-item">${action}</div>
  `).join('');
}

function updateProgress() {
  if (!currentModule) return;

  const progressPercent = (currentModule.currentTask / currentModule.totalTasks) * 100;
  const remaining = currentModule.totalTasks - currentModule.currentTask;

  const progressText = document.getElementById('progress-text');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressRemaining = document.getElementById('progress-remaining');
  const canvasProgress = document.getElementById('canvas-progress');

  if (progressText) progressText.textContent = `${currentModule.currentTask}/${currentModule.totalTasks}`;
  if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;
  if (progressRemaining) progressRemaining.textContent = `${remaining} tasks remaining`;
  if (canvasProgress) canvasProgress.textContent = `Image ${currentModule.currentTask} of ${currentModule.totalTasks}`;
}

function populateModuleData() {
  if (!currentModule) return;

  // Update page title
  document.getElementById('page-title').textContent = `${currentModule.title} | Practice - The Hive`;

  // Update breadcrumb
  document.getElementById('breadcrumb-title').textContent = currentModule.title;

  // Update task info
  document.getElementById('task-title').textContent = currentModule.title;
  document.getElementById('task-category').textContent = currentModule.category;
  document.getElementById('task-objective').textContent = currentModule.objective;

  // Update dataset
  document.getElementById('dataset-name').textContent = currentModule.dataset;

  // Update XP reward
  document.getElementById('xp-reward').textContent = `+${currentModule.xpReward} XP on completion`;

  // Render dynamic content
  renderTools();
  renderInstructions();
  renderLabels();
  renderHistory();
  updateProgress();
}

// ===================================
// EVENT HANDLERS
// ===================================
function setupEventListeners() {
  // Instructions toggle
  const instructionsToggle = document.getElementById('instructions-toggle');
  const instructionsList = document.getElementById('instructions-list');
  const instructionsIcon = document.getElementById('instructions-icon');

  if (instructionsToggle && instructionsList && instructionsIcon) {
    instructionsToggle.addEventListener('click', () => {
      instructionsOpen = !instructionsOpen;
      if (instructionsOpen) {
        instructionsList.classList.remove('hidden');
        instructionsIcon.classList.remove('collapsed');
      } else {
        instructionsList.classList.add('hidden');
        instructionsIcon.classList.add('collapsed');
      }
    });
  }

  // Zoom controls
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const resetZoomBtn = document.getElementById('reset-zoom-btn');
  const zoomDisplay = document.getElementById('zoom-display');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      zoom = Math.min(400, zoom + 25);
      if (zoomDisplay) zoomDisplay.textContent = `${zoom}%`;
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      zoom = Math.max(25, zoom - 25);
      if (zoomDisplay) zoomDisplay.textContent = `${zoom}%`;
    });
  }

  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
      zoom = 100;
      if (zoomDisplay) zoomDisplay.textContent = `${zoom}%`;
    });
  }

  // Exit button
  const exitBtn = document.getElementById('exit-btn');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      const moduleId = getModuleIdFromURL();
      if (confirm('Are you sure you want to exit? Unsaved progress will be lost.')) {
        window.location.href = `/hive-module.html?module=${moduleId}`;
      }
    });
  }

  // Save button
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      alert('Progress saved!');
    });
  }

  // Submit button
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (confirm('Submit your practice session? This will be scored automatically.')) {
        alert('Practice submitted! You earned ' + currentModule.xpReward + ' XP');
        const moduleId = getModuleIdFromURL();
        window.location.href = `/hive-module.html?module=${moduleId}`;
      }
    });
  }

  // Help button
  const helpBtn = document.getElementById('help-btn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      alert('Help: Use the tools on the left to annotate the image. Your progress is automatically saved.');
    });
  }

  // Settings button
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      alert('Settings panel would open here.');
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Tool shortcuts
    const toolMap = {
      'v': 'pointer',
      'b': 'box',
      'p': 'polygon',
      'm': 'brush',
      't': 'text'
    };

    const key = e.key.toLowerCase();
    if (toolMap[key] && !e.ctrlKey && !e.metaKey) {
      activeTool = toolMap[key];
      renderTools();
      e.preventDefault();
    }

    // Zoom shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === '+') {
      zoom = Math.min(400, zoom + 25);
      if (zoomDisplay) zoomDisplay.textContent = `${zoom}%`;
      e.preventDefault();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
      zoom = Math.max(25, zoom - 25);
      if (zoomDisplay) zoomDisplay.textContent = `${zoom}%`;
      e.preventDefault();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      zoom = 100;
      if (zoomDisplay) zoomDisplay.textContent = `${zoom}%`;
      e.preventDefault();
    }
  });
}

// ===================================
// TIMER
// ===================================
function startTimer() {
  setInterval(() => {
    timerSeconds++;
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.textContent = formatTime(timerSeconds);
    }
  }, 1000);
}

// ===================================
// INITIALIZE
// ===================================
function initializePage() {
  const moduleId = getModuleIdFromURL();

  if (!moduleId || !modules[moduleId]) {
    alert('Module not found');
    window.location.href = '/hive.html';
    return;
  }

  currentModule = modules[moduleId];
  populateModuleData();
  setupEventListeners();
  startTimer();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
