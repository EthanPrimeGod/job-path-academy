/**
 * Account Overview Page - JavaScript
 * Account snapshot and recent activity
 */

// ===================================
// EVENT HANDLERS
// ===================================
function setupEventListeners() {
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

  // Privacy toggle switches
  const publicProfileToggle = document.getElementById('public-profile');
  const leaderboardsToggle = document.getElementById('hide-leaderboards');

  if (publicProfileToggle) {
    publicProfileToggle.addEventListener('change', (e) => {
      const status = e.target.checked ? 'enabled' : 'disabled';
      console.log('Public profile:', status);
      // In a real app, save to backend here
    });
  }

  if (leaderboardsToggle) {
    leaderboardsToggle.addEventListener('change', (e) => {
      const status = e.target.checked ? 'enabled' : 'disabled';
      console.log('Show on leaderboards:', status);
      // In a real app, save to backend here
    });
  }
}

// ===================================
// INITIALIZE
// ===================================
function initializePage() {
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
