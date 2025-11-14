/**
 * Account Settings Page - JavaScript
 * Settings and preferences management
 */

// ===================================
// EVENT HANDLERS
// ===================================
function setupEventListeners() {
  // Save button
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const displayName = document.getElementById('display-name').value;
      const handle = document.getElementById('handle').value;
      const bio = document.getElementById('bio').value;

      console.log('Saving settings:', { displayName, handle, bio });
      alert('Settings saved successfully!');
      // In a real app, save to backend here
    });
  }

  // Cancel button
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      // Reset form to original values
      document.getElementById('display-name').value = 'Alex Chen';
      document.getElementById('handle').value = 'alexchen';
      document.getElementById('bio').value = 'AI annotator specializing in computer vision';
      alert('Changes cancelled');
    });
  }

  // Toggle switches
  const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const status = e.target.checked ? 'enabled' : 'disabled';
      console.log(`${e.target.id}: ${status}`);
      // In a real app, save preference to backend here
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
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
