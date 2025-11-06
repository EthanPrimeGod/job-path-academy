// Leaderboard Data
const leaderboardData = [
  { rank: 1, name: "Alex Chen", avatar: "AC", category: "Computer Vision", xp: 12450, badges: 8, modules: 24 },
  { rank: 2, name: "Sarah Martinez", avatar: "SM", category: "NLP", xp: 11280, badges: 7, modules: 22 },
  { rank: 3, name: "Jordan Lee", avatar: "JL", category: "Audio", xp: 10950, badges: 7, modules: 21 },
  { rank: 4, name: "Maya Patel", avatar: "MP", category: "Video", xp: 9870, badges: 6, modules: 19 },
  { rank: 5, name: "Chris Wong", avatar: "CW", category: "Computer Vision", xp: 9320, badges: 6, modules: 18 },
  { rank: 6, name: "Emma Thompson", avatar: "ET", category: "NLP", xp: 8890, badges: 5, modules: 17 },
  { rank: 7, name: "Raj Sharma", avatar: "RS", category: "Audio", xp: 8650, badges: 5, modules: 16 },
  { rank: 8, name: "Lisa Chen", avatar: "LC", category: "Computer Vision", xp: 8420, badges: 5, modules: 16 },
  { rank: 9, name: "Marcus Johnson", avatar: "MJ", category: "Video", xp: 8190, badges: 4, modules: 15 },
  { rank: 10, name: "Sofia Rodriguez", avatar: "SR", category: "NLP", xp: 7980, badges: 4, modules: 15 },
  { rank: 11, name: "Kevin Park", avatar: "KP", category: "Computer Vision", xp: 7850, badges: 4, modules: 14 },
  { rank: 12, name: "Priya Singh", avatar: "PS", category: "Audio", xp: 7720, badges: 4, modules: 14 },
  { rank: 13, name: "David Kim", avatar: "DK", category: "Video", xp: 7590, badges: 3, modules: 13 },
  { rank: 14, name: "Nina Patel", avatar: "NP", category: "NLP", xp: 7460, badges: 3, modules: 13 },
  { rank: 15, name: "Tom Wilson", avatar: "TW", category: "Computer Vision", xp: 7330, badges: 3, modules: 12 },
  { rank: 16, name: "Ana Garcia", avatar: "AG", category: "Audio", xp: 7200, badges: 3, modules: 12 },
  { rank: 17, name: "James Brown", avatar: "JB", category: "Video", xp: 7070, badges: 3, modules: 11 },
  { rank: 18, name: "Yuki Tanaka", avatar: "YT", category: "NLP", xp: 6940, badges: 2, modules: 11 },
  { rank: 19, name: "Maria Lopez", avatar: "ML", category: "Computer Vision", xp: 6810, badges: 2, modules: 10 },
  { rank: 20, name: "Ahmed Hassan", avatar: "AH", category: "Audio", xp: 6680, badges: 2, modules: 10 }
];

// State
let state = {
  skill: 'overall',
  timeRange: 'all-time',
  displayedCount: 10 // Start with top 10
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderLeaderboard();
});

// Event Listeners
function setupEventListeners() {
  // Skill filter tabs
  document.querySelectorAll('[data-skill]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const skill = e.currentTarget.dataset.skill;
      state.skill = skill;
      state.displayedCount = 10; // Reset when changing filters

      // Update active state
      document.querySelectorAll('[data-skill]').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');

      renderLeaderboard();
    });
  });

  // Time range filter tabs
  document.querySelectorAll('[data-time]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const time = e.currentTarget.dataset.time;
      state.timeRange = time;
      state.displayedCount = 10; // Reset when changing filters

      // Update active state
      document.querySelectorAll('[data-time]').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');

      renderLeaderboard();
    });
  });

  // Load more button
  document.querySelector('.leaderboard-load-more-btn').addEventListener('click', () => {
    state.displayedCount += 10;
    renderLeaderboard();
  });
}

// Get rank icon HTML
function getRankIcon(rank) {
  if (rank === 1) {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="leaderboard-trophy gold">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    `;
  }
  if (rank === 2) {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="leaderboard-trophy silver">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    `;
  }
  if (rank === 3) {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="leaderboard-trophy bronze">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    `;
  }
  return '';
}

// Get rank row style class
function getRankRowClass(rank) {
  if (rank <= 3) {
    return 'leaderboard-top-rank';
  }
  return '';
}

// Render leaderboard table
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboardTableBody');

  // Get filtered data
  let filteredData = [...leaderboardData];

  // Filter by skill (in a real app, this would come from different endpoints)
  if (state.skill !== 'overall') {
    // For demo purposes, we'll just show all data with a note
    // In production, you'd fetch skill-specific leaderboards
  }

  // Filter by time range (in a real app, this would come from different endpoints)
  if (state.timeRange !== 'all-time') {
    // For demo purposes, we'll just show all data
    // In production, you'd fetch time-specific leaderboards
  }

  // Limit to displayed count
  const displayData = filteredData.slice(0, state.displayedCount);

  // Clear existing rows
  tbody.innerHTML = '';

  // Render rows
  displayData.forEach(user => {
    const row = document.createElement('tr');
    row.className = `leaderboard-row ${getRankRowClass(user.rank)}`;

    row.innerHTML = `
      <td class="leaderboard-td">
        <div class="leaderboard-rank-cell">
          ${getRankIcon(user.rank)}
          <span class="leaderboard-rank-number">#${user.rank}</span>
        </div>
      </td>
      <td class="leaderboard-td">
        <div class="leaderboard-user-cell">
          <div class="leaderboard-avatar">${user.avatar}</div>
          <span class="leaderboard-name">${user.name}</span>
        </div>
      </td>
      <td class="leaderboard-td">
        <span class="leaderboard-badge">${user.category}</span>
      </td>
      <td class="leaderboard-td text-right">
        <div class="leaderboard-xp-cell">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span class="leaderboard-xp-value">${user.xp.toLocaleString()}</span>
        </div>
      </td>
      <td class="leaderboard-td text-center">
        <div class="leaderboard-badges-cell">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          <span>${user.badges}</span>
        </div>
      </td>
      <td class="leaderboard-td text-right">
        <span class="leaderboard-modules-value">${user.modules}</span>
      </td>
    `;

    tbody.appendChild(row);
  });

  // Update load more button visibility
  const loadMoreBtn = document.querySelector('.leaderboard-load-more-btn');
  if (state.displayedCount >= filteredData.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-flex';
  }
}
