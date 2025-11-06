import { mockJobs } from './company-data.js';

let currentFilter = 'all';
let searchQuery = '';

// Render jobs table
function renderJobs() {
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = currentFilter === 'all' || job.status === currentFilter;
    return matchesSearch && matchesFilter;
  });

  const tbody = document.getElementById('jobsTableBody');

  if (filteredJobs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: var(--muted-foreground);">
          No jobs found. Post your first job to get started!
        </td>
      </tr>
    `;
    return;
  }

  const html = filteredJobs.map(job => `
    <tr>
      <td>
        <div>
          <p class="company-table-name">${job.title}</p>
          <div style="display: flex; gap: 0.25rem; margin-top: 0.25rem;">
            ${job.tags.slice(0, 2).map(tag => `
              <span class="company-badge company-badge-gray" style="font-size: 0.625rem;">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>
      </td>
      <td>
        <span class="company-badge ${job.status === 'open' ? 'company-badge-green' : 'company-badge-gray'}">
          ${job.status}
        </span>
      </td>
      <td>${job.applicants}</td>
      <td class="company-table-muted">${job.created}</td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <a href="company-job-detail.html?id=${job.id}" class="company-btn-ghost">View</a>
          <button class="company-btn-ghost">Edit</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.innerHTML = html;
}

// Search handler
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderJobs();
});

// Filter buttons
document.querySelectorAll('.company-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.company-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderJobs();
  });
});

// Modal handlers
const modal = document.getElementById('postJobModal');
const openBtn = document.getElementById('openPostJobModal');
const closeBtn = document.getElementById('closePostJobModal');
const cancelBtn = document.getElementById('cancelPostJob');
const submitBtn = document.getElementById('submitPostJob');

openBtn.addEventListener('click', () => {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

submitBtn.addEventListener('click', () => {
  // In a real app, this would save the job
  alert('Job posted successfully!');
  closeModal();
});

// Initial render
renderJobs();
