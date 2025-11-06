import { mockJobs, mockApplicants } from './company-data.js';

// Get URL parameter
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get stage badge color
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

// Get job data
const jobId = getUrlParameter('id');
const job = mockJobs.find(j => j.id === jobId);
const jobApplicants = mockApplicants.filter(a => a.jobId === jobId);

// If job not found, show error
if (!job) {
  document.querySelector('.company-content').innerHTML = `
    <div style="text-align: center; padding: 3rem;">
      <p style="color: var(--muted-foreground); margin-bottom: 1rem;">Job not found</p>
      <a href="company-jobs.html" class="company-btn-outline">Back to Jobs</a>
    </div>
  `;
} else {
  // Render header
  const headerHTML = `
    <div>
      <h1 class="company-title" style="margin-bottom: 0.5rem;">${job.title}</h1>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <span class="company-badge ${job.status === 'open' ? 'company-badge-green' : 'company-badge-gray'}">
          ${job.status}
        </span>
        ${job.tags.map(tag => `
          <span class="company-badge company-badge-gray">${tag}</span>
        `).join('')}
      </div>
    </div>
    <div style="display: flex; gap: 0.5rem;">
      <button class="company-btn-outline">Edit</button>
      <button class="company-btn-primary">
        ${job.status === 'open' ? 'Close Job' : 'Reopen Job'}
      </button>
    </div>
  `;
  document.getElementById('jobHeader').innerHTML = headerHTML;

  // Update applicant count in tab
  document.getElementById('applicantCount').textContent = `(${jobApplicants.length})`;

  // Render job details
  const detailsHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
      <div>
        <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Employment Type</p>
        <p style="font-weight: 500;">${job.employmentType}</p>
      </div>
      <div>
        <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Pay Range</p>
        <p style="font-weight: 500;">${job.payRange}</p>
      </div>
      <div>
        <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Location</p>
        <p style="font-weight: 500;">${job.location}</p>
      </div>
      <div>
        <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Posted</p>
        <p style="font-weight: 500;">${job.created}</p>
      </div>
    </div>
    <div style="margin-top: 1.5rem;">
      <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.5rem;">Description</p>
      <p style="font-size: 0.875rem; line-height: 1.6;">${job.description}</p>
    </div>
  `;
  document.getElementById('jobDetails').innerHTML = detailsHTML;

  // Render applicant stats
  const statsHTML = `
    <div class="company-stat-card">
      <p class="company-stat-value">${jobApplicants.length}</p>
      <p class="company-stat-label">Total</p>
    </div>
    <div class="company-stat-card">
      <p class="company-stat-value">${jobApplicants.filter(a => a.stage === 'applied').length}</p>
      <p class="company-stat-label">New</p>
    </div>
    <div class="company-stat-card">
      <p class="company-stat-value">${jobApplicants.filter(a => a.stage === 'interview').length}</p>
      <p class="company-stat-label">Interview</p>
    </div>
    <div class="company-stat-card">
      <p class="company-stat-value">${jobApplicants.filter(a => a.stage === 'offer').length}</p>
      <p class="company-stat-label">Offer</p>
    </div>
  `;
  document.getElementById('applicantStats').innerHTML = statsHTML;

  // Render applicants table
  function renderApplicantsTable() {
    const tbody = document.getElementById('applicantsTable');

    if (jobApplicants.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem; color: var(--muted-foreground);">
            No applicants yet
          </td>
        </tr>
      `;
      return;
    }

    const html = jobApplicants.map(applicant => `
      <tr>
        <td class="company-table-name">${applicant.name}</td>
        <td>
          <span class="company-badge ${getStageColor(applicant.stage)}">
            ${applicant.stage}
          </span>
        </td>
        <td class="company-table-muted">${applicant.appliedDate}</td>
        <td>
          ${applicant.score ? `<span style="font-weight: 500;">${applicant.score}%</span>` : '<span style="color: var(--muted-foreground);">—</span>'}
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <a href="company-applicant-detail.html?job=${jobId}&applicant=${applicant.id}" class="company-btn-ghost">View</a>
            <a href="company-messages.html?thread=1" class="company-btn-ghost">Message</a>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.innerHTML = html;
  }

  renderApplicantsTable();

  // Tab switching
  const tabs = document.querySelectorAll('.company-tab');
  const panels = document.querySelectorAll('.company-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      panels.forEach(panel => {
        if (panel.id === `${targetTab}-panel`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // View all applicants button
  document.getElementById('viewAllApplicants').addEventListener('click', () => {
    document.querySelector('[data-tab="applicants"]').click();
  });

  // Settings actions
  document.getElementById('toggleVisibility').addEventListener('click', () => {
    alert('Job visibility toggled');
  });

  document.getElementById('deleteJob').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      alert('Job deleted');
      window.location.href = 'company-jobs.html';
    }
  });
}
