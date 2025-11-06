// Mock Module Data
const mockModule = {
  id: "image-segmentation",
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
  xpReward: 40
};

// Tools Configuration
const tools = [
  { id: "pointer", name: "Select", shortcut: "V", icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
      <path d="M13 13l6 6"></path>
    </svg>
  `},
  { id: "box", name: "Bounding Box", shortcut: "B", icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  `},
  { id: "polygon", name: "Polygon", shortcut: "P", icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  `},
  { id: "brush", name: "Brush", shortcut: "M", icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path>
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path>
    </svg>
  `},
  { id: "text", name: "Text Label", shortcut: "T", icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 7 4 4 20 4 20 7"></polyline>
      <line x1="9" y1="20" x2="15" y2="20"></line>
      <line x1="12" y1="4" x2="12" y2="20"></line>
    </svg>
  `}
];

// Recent Actions
const recentActions = [
  "Added Bounding Box: 'Car'",
  "Added Bounding Box: 'Car'",
  "Modified Bounding Box: 'Truck'",
  "Added Bounding Box: 'Car'"
];

// State
let state = {
  activeTool: 'pointer',
  zoom: 100,
  instructionsOpen: true,
  timerSeconds: 334 // 05:34
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTaskInfo();
  renderInstructions();
  renderTools();
  renderLabels();
  renderHistory();
  setupEventListeners();
  startTimer();
});

// Render Task Info
function renderTaskInfo() {
  document.getElementById('taskTitle').textContent = mockModule.title;
  document.getElementById('taskCategory').textContent = mockModule.category;
  document.getElementById('taskObjective').textContent = mockModule.objective;
  document.getElementById('practiceModuleTitle').textContent = mockModule.title;
  document.getElementById('currentTask').textContent = mockModule.currentTask;
  document.getElementById('totalTasks').textContent = mockModule.totalTasks;
  document.getElementById('xpReward').textContent = mockModule.xpReward;

  // Update progress
  const progress = (mockModule.currentTask / mockModule.totalTasks) * 100;
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressCount').textContent = `${mockModule.currentTask}/${mockModule.totalTasks}`;
  document.getElementById('progressText').textContent = `${mockModule.totalTasks - mockModule.currentTask} tasks remaining`;
}

// Render Instructions
function renderInstructions() {
  const instructionsList = document.getElementById('instructionsList');
  instructionsList.innerHTML = mockModule.instructions.map((step, i) => `
    <li class="practice-instruction-item">
      <span class="practice-instruction-number">${i + 1}.</span>
      <span class="practice-instruction-text">${step}</span>
    </li>
  `).join('');
}

// Render Tools
function renderTools() {
  const toolsGrid = document.getElementById('toolsGrid');
  toolsGrid.innerHTML = tools.map(tool => `
    <button
      class="practice-tool-btn ${state.activeTool === tool.id ? 'active' : ''}"
      data-tool="${tool.id}"
      title="${tool.name} (${tool.shortcut})"
    >
      ${tool.icon}
    </button>
  `).join('');
}

// Render Labels
function renderLabels() {
  const labelsList = document.getElementById('labelsList');
  labelsList.innerHTML = mockModule.labels.map(label => `
    <div class="practice-label-item">
      <div class="practice-label-info">
        <div class="practice-label-color" style="background-color: ${label.color}"></div>
        <span class="practice-label-name">${label.name}</span>
      </div>
      <span class="practice-label-count">${label.count}</span>
    </div>
  `).join('');
}

// Render History
function renderHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = recentActions.map(action => `
    <div class="practice-history-item">${action}</div>
  `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
  // Instructions toggle
  const instructionsToggle = document.getElementById('instructionsToggle');
  const instructionsContent = document.getElementById('instructionsContent');
  const chevron = instructionsToggle.querySelector('.practice-chevron');

  instructionsToggle.addEventListener('click', () => {
    state.instructionsOpen = !state.instructionsOpen;

    if (state.instructionsOpen) {
      instructionsContent.style.display = 'block';
      chevron.style.transform = 'rotate(0deg)';
    } else {
      instructionsContent.style.display = 'none';
      chevron.style.transform = 'rotate(180deg)';
    }
  });

  // Tool selection
  document.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tool = e.currentTarget.dataset.tool;
      selectTool(tool);
    });
  });

  // Zoom controls
  document.getElementById('zoomOut').addEventListener('click', () => {
    setZoom(Math.max(25, state.zoom - 25));
  });

  document.getElementById('zoomIn').addEventListener('click', () => {
    setZoom(Math.min(400, state.zoom + 25));
  });

  document.getElementById('zoomReset').addEventListener('click', () => {
    setZoom(100);
  });

  // Submit button
  document.getElementById('submitBtn').addEventListener('click', () => {
    handleSubmit();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const tool = tools.find(t => t.shortcut.toLowerCase() === e.key.toLowerCase());
    if (tool) {
      e.preventDefault();
      selectTool(tool.id);
    }
  });
}

// Select Tool
function selectTool(toolId) {
  state.activeTool = toolId;

  // Update UI
  document.querySelectorAll('[data-tool]').forEach(btn => {
    if (btn.dataset.tool === toolId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Set Zoom
function setZoom(zoomLevel) {
  state.zoom = zoomLevel;
  document.getElementById('zoomLevel').textContent = `${zoomLevel}%`;
}

// Timer
function startTimer() {
  setInterval(() => {
    state.timerSeconds++;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(state.timerSeconds / 60);
  const seconds = state.timerSeconds % 60;
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('timer').textContent = formatted;
}

// Handle Submit
function handleSubmit() {
  // In a real app, this would submit the annotations and show results
  alert('Practice submitted! Your annotations will be scored automatically.\n\nIn a production app, this would:\n- Submit your annotations\n- Calculate accuracy score\n- Award XP\n- Show completion modal\n- Navigate to results page');

  // For demo purposes, could navigate back to hive
  // window.location.href = 'hive.html';
}
