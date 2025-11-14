/**
 * Hive Leaderboards Page JavaScript
 * Handles full leaderboard table with filtering
 */

// ===================================
// LEADERBOARD DATA
// ===================================
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
];

// ===================================
// STATE
// ===================================
let currentSkill = 'overall';
let currentTime = 'all-time';

// ===================================
// DOM ELEMENTS
// ===================================
const leaderboardTbody = document.getElementById('leaderboard-tbody');

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
function getTrophySVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>`;
}

function getStarSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>`;
}

function getAwardSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>`;
}

// ===================================
// RENDER LEADERBOARD
// ===================================
function renderLeaderboard() {
  leaderboardTbody.innerHTML = leaderboardData.map(user => {
    let trophyHTML = '';
    let trophyClass = '';
    let rowClass = '';

    if (user.rank <= 3) {
      rowClass = 'top-3';
      if (user.rank === 1) {
        trophyClass = 'trophy-gold';
      } else if (user.rank === 2) {
        trophyClass = 'trophy-silver';
      } else if (user.rank === 3) {
        trophyClass = 'trophy-bronze';
      }
      trophyHTML = `<div class="trophy-icon ${trophyClass}">${getTrophySVG()}</div>`;
    }

    return `
      <tr class="${rowClass}">
        <td>
          <div class="rank-cell">
            ${trophyHTML}
            <span>#${user.rank}</span>
          </div>
        </td>
        <td>
          <div class="annotator-cell">
            <div class="annotator-avatar">${user.avatar}</div>
            <span class="annotator-name">${user.name}</span>
          </div>
        </td>
        <td>
          <span class="category-badge">${user.category}</span>
        </td>
        <td>
          <div class="xp-cell">
            ${getStarSVG()}
            <span class="xp-value">${user.xp.toLocaleString()}</span>
          </div>
        </td>
        <td>
          <div class="badges-cell">
            ${getAwardSVG()}
            <span class="badges-count">${user.badges}</span>
          </div>
        </td>
        <td>
          <div class="modules-count">${user.modules}</div>
        </td>
      </tr>
    `;
  }).join('');
}

// ===================================
// TAB SWITCHING
// ===================================
// Skill tabs
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    currentSkill = tab.dataset.skill;

    // Update active state
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // In a real app, you would filter data based on skill
    // For now, we just keep the same data
    renderLeaderboard();
  });
});

// Time tabs
document.querySelectorAll('.time-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    currentTime = tab.dataset.time;

    // Update active state
    document.querySelectorAll('.time-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // In a real app, you would filter data based on time range
    // For now, we just keep the same data
    renderLeaderboard();
  });
});

// ===================================
// INITIALIZATION
// ===================================
renderLeaderboard();
