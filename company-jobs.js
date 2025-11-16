/**
 * Company Jobs Page - JavaScript
 */

const mockJobs = [
  {
    id: "1",
    title: "Senior Data Annotator - Computer Vision",
    status: "open",
    applicants: 24,
    created: "2025-01-15",
    tags: ["Computer Vision", "Remote", "Full-time"]
  },
  {
    id: "2",
    title: "NLP Data Labeling Specialist",
    status: "open",
    applicants: 18,
    created: "2025-01-20",
    tags: ["NLP", "Contract", "Remote"]
  },
  {
    id: "3",
    title: "Audio Transcription Annotator",
    status: "closed",
    applicants: 42,
    created: "2024-12-10",
    tags: ["Audio", "Part-time", "Hybrid"]
  }
];

let searchQuery = "";
let statusFilter = "all";

function renderJobs() {
  const tbody = document.getElementById('jobs-table');

  const filtered = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--muted-foreground);">No jobs found. Post your first job to get started!</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(job => `
    <tr>
      <td>
        <div>
          <p style="font-weight: 500; margin-bottom: 0.25rem;">${job.title}</p>
          <div style="display: flex; gap: 0.25rem;">
            ${job.tags.slice(0, 2).map(tag =>
              `<span class="module-badge" style="font-size: 0.75rem;">${tag}</span>`
            ).join('')}
          </div>
        </div>
      </td>
      <td>
        <span class="status-badge ${job.status}">${job.status}</span>
      </td>
      <td>${job.applicants}</td>
      <td style="color: var(--muted-foreground);">${job.created}</td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-ghost btn-sm" onclick="alert('View job coming soon')">View</button>
          <button class="btn btn-ghost btn-sm" onclick="alert('Edit job coming soon')">Edit</button>
        </div>
      </td>
    </tr>
  `).join('');
}

document.getElementById('search-input')?.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderJobs();
});

document.querySelectorAll('#status-filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    statusFilter = btn.dataset.status;
    document.querySelectorAll('#status-filters button').forEach(b => {
      b.classList.remove('active');
      b.classList.add('btn-outline');
    });
    btn.classList.add('active');
    btn.classList.remove('btn-outline');
    renderJobs();
  });
});

renderJobs();
