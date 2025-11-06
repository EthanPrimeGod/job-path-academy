import { mockApplicants, mockThreads, mockModules } from './company-data.js';

// Get stage badge color class
function getStageColor(stage) {
  const colors = {
    applied: 'company-badge-blue',
    screen: 'company-badge-yellow',
    interview: 'company-badge-purple',
    offer: 'company-badge-green',
    hired: 'company-badge-emerald',
  };
  return colors[stage] || colors.applied;
}

// Render recent applicants table
function renderRecentApplicants() {
  const recentApplicants = mockApplicants.slice(0, 5);
  const tableBody = document.getElementById('recentApplicantsTable');

  const html = recentApplicants.map(applicant => `
    <tr>
      <td class="company-table-name">${applicant.name}</td>
      <td class="company-table-muted">${applicant.jobTitle}</td>
      <td>
        <span class="company-badge ${getStageColor(applicant.stage)}">
          ${applicant.stage}
        </span>
      </td>
      <td class="company-table-muted">${applicant.appliedDate}</td>
      <td>
        <a href="company-applicant-detail.html?job=${applicant.jobId}&applicant=${applicant.id}" class="company-btn-ghost">
          View
        </a>
      </td>
    </tr>
  `).join('');

  tableBody.innerHTML = html;
}

// Render recent messages
function renderRecentMessages() {
  const recentMessages = mockThreads.slice(0, 3);
  const messagesList = document.getElementById('recentMessagesList');

  const html = recentMessages.map(thread => `
    <div class="company-message-item">
      <div class="company-message-avatar">${thread.participantAvatar}</div>
      <div class="company-message-content">
        <div class="company-message-header">
          <span class="company-message-name">${thread.participantName}</span>
          ${thread.unread ? '<div class="company-message-unread-dot"></div>' : ''}
        </div>
        <div class="company-message-context">${thread.context}</div>
        <div class="company-message-text">${thread.lastMessage}</div>
      </div>
      <a href="company-messages.html?thread=${thread.id}" class="company-btn-ghost-sm">
        Open
      </a>
    </div>
  `).join('');

  messagesList.innerHTML = html;
}

// Render module activity
function renderModuleActivity() {
  const activeModules = mockModules.filter(m => m.status === 'active').slice(0, 3);
  const modulesList = document.getElementById('moduleActivityList');

  const html = activeModules.map(module => `
    <div class="company-module-item">
      <div class="company-module-info">
        <div class="company-module-title">${module.title}</div>
        <div class="company-module-stats">
          <span>${module.attempts} completions</span>
          <span>Avg: ${module.avgScore}%</span>
        </div>
      </div>
      <a href="company-module-detail.html?id=${module.id}" class="company-btn-ghost-sm">
        View
      </a>
    </div>
  `).join('');

  modulesList.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderRecentApplicants();
  renderRecentMessages();
  renderModuleActivity();
});
