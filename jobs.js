/**
 * Jobs Page JavaScript
 * Handles job listing, filtering, sorting, pagination, and modal functionality
 */

// ===================================
// JOBS DATA
// ===================================
const jobs = [
  {
    id: "1",
    title: "Image Annotation Specialist",
    company: "TechVision AI",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Intermediate",
    category: "Image & Video",
    payRange: "$22-28/hr",
    description: "Join our team to annotate high-quality images for computer vision models. Work on diverse datasets including autonomous driving and retail applications.",
    fullDescription: "We're seeking an experienced Image Annotation Specialist to join our growing team. You'll work on cutting-edge computer vision projects, helping train AI models that power autonomous vehicles, retail analytics, and more. This role offers the opportunity to work with diverse datasets and contribute to breakthrough AI applications.",
    responsibilities: [
      "Annotate images with bounding boxes, polygons, and semantic segmentation",
      "Maintain 95%+ accuracy standards across all annotation tasks",
      "Collaborate with QA team to ensure consistent labeling guidelines",
      "Process 200-300 images per day with high attention to detail",
      "Participate in weekly team calibration sessions"
    ],
    requirements: [
      "1+ years of image annotation experience",
      "Strong attention to detail and pattern recognition skills",
      "Familiarity with CVAT, Labelbox, or similar annotation tools",
      "Reliable high-speed internet connection",
      "Available for 40 hours/week during business hours"
    ],
    tags: ["Remote", "Computer Vision", "Bounding Boxes"],
    postedDate: "2 days ago",
    featured: true,
    applyUrl: "https://example.com/apply/1"
  },
  {
    id: "2",
    title: "NLP Data Labeler",
    company: "ConversaAI",
    location: "Hybrid - San Francisco",
    type: "Contract",
    experienceLevel: "Entry-level",
    category: "Text & NLP",
    payRange: "$18-22/hr",
    description: "Label conversational AI datasets to improve chatbot responses. Perfect for those interested in natural language processing and dialogue systems.",
    fullDescription: "ConversaAI is building the next generation of conversational AI. We need detail-oriented labelers to help us classify intent, annotate entities, and evaluate dialogue quality. This is an excellent entry point into the AI field with opportunities to learn from experienced NLP engineers.",
    responsibilities: [
      "Classify user intents and annotate named entities in conversational text",
      "Evaluate chatbot response quality and provide improvement suggestions",
      "Follow detailed annotation guidelines for consistency",
      "Complete 300-400 utterances per day",
      "Attend bi-weekly training sessions"
    ],
    requirements: [
      "Strong English language skills (native or near-native proficiency)",
      "Interest in linguistics, natural language processing, or AI",
      "Ability to follow complex annotation guidelines",
      "No prior experience required - we provide full training",
      "Available 20+ hours/week"
    ],
    tags: ["Hybrid", "NLP", "Chatbots"],
    postedDate: "5 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/2"
  },
  {
    id: "3",
    title: "Audio Transcriptionist",
    company: "VoiceWorks",
    location: "Remote",
    type: "Freelance",
    experienceLevel: "Entry-level",
    category: "Audio & Speech",
    payRange: "$15-20/hr",
    description: "Transcribe audio recordings with high accuracy. Flexible hours and the ability to work from anywhere in the world.",
    fullDescription: "VoiceWorks specializes in speech recognition AI. We need careful listeners to transcribe audio recordings across multiple languages and domains. This flexible freelance role lets you work on your own schedule while contributing to cutting-edge voice AI technology.",
    responsibilities: [
      "Transcribe audio files with 98%+ accuracy",
      "Mark speaker changes, timestamps, and non-speech events",
      "Handle diverse audio quality and accents",
      "Complete 2-4 hours of audio transcription per day",
      "Use our proprietary transcription platform"
    ],
    requirements: [
      "Excellent listening skills and typing speed (60+ WPM)",
      "Native or fluent English proficiency",
      "High-quality headphones and quiet work environment",
      "Attention to detail and ability to work independently",
      "Flexible availability - choose your own hours"
    ],
    tags: ["Remote", "Flexible", "Audio"],
    postedDate: "1 week ago",
    featured: false,
    applyUrl: "https://example.com/apply/3"
  },
  {
    id: "4",
    title: "Video Annotation Lead",
    company: "MotionAI",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Expert",
    category: "Image & Video",
    payRange: "$35-45/hr",
    description: "Lead a team of video annotators working on action recognition and video understanding projects. Requires extensive annotation experience and leadership skills.",
    fullDescription: "MotionAI is at the forefront of video understanding AI. We're seeking an experienced Video Annotation Lead to manage our annotation team, ensure quality standards, and develop best practices. You'll work directly with ML engineers to refine annotation guidelines and improve model performance.",
    responsibilities: [
      "Lead team of 10-15 video annotators and manage workflow",
      "Develop and refine video annotation guidelines",
      "Conduct quality reviews and provide feedback to team members",
      "Collaborate with ML engineers on dataset requirements",
      "Track team metrics and optimize annotation processes",
      "Handle complex edge cases and escalated questions"
    ],
    requirements: [
      "3+ years of video/image annotation experience",
      "1+ years in a team lead or management role",
      "Deep understanding of object tracking, action recognition, and segmentation",
      "Proficiency with annotation tools (CVAT, V7, Scale AI)",
      "Strong communication and mentorship abilities",
      "Experience working with ML teams"
    ],
    tags: ["Remote", "Leadership", "Video"],
    postedDate: "3 days ago",
    featured: true,
    applyUrl: "https://example.com/apply/4"
  },
  {
    id: "5",
    title: "3D Point Cloud Annotator",
    company: "AutoDrive Systems",
    location: "On-site - Detroit, MI",
    type: "Full-time",
    experienceLevel: "Intermediate",
    category: "3D & Spatial",
    payRange: "$28-35/hr",
    description: "Annotate 3D LiDAR data for autonomous vehicle perception systems. Work with cutting-edge sensor data and 3D visualization tools.",
    fullDescription: "AutoDrive Systems is developing the future of autonomous driving. Our 3D Point Cloud Annotators work with LiDAR sensor data to create precise 3D bounding boxes and semantic labels. This role offers the chance to work on real-world autonomous vehicle technology with a world-class engineering team.",
    responsibilities: [
      "Annotate 3D point cloud data with cuboid bounding boxes",
      "Label objects including vehicles, pedestrians, cyclists, and road features",
      "Work with multi-frame tracking and temporal consistency",
      "Achieve and maintain 90%+ accuracy on complex 3D scenes",
      "Use specialized 3D annotation software and visualization tools",
      "Collaborate with perception engineers on edge cases"
    ],
    requirements: [
      "1-2 years of 3D annotation or related experience",
      "Strong spatial reasoning and 3D visualization skills",
      "Familiarity with LiDAR data or autonomous vehicle technology",
      "Experience with 3D annotation tools (e.g., Supervisely, Scale 3D)",
      "Bachelor's degree in related field preferred",
      "Must be able to work on-site in Detroit, MI"
    ],
    tags: ["On-site", "3D LiDAR", "Autonomous Vehicles"],
    postedDate: "4 days ago",
    featured: true,
    applyUrl: "https://example.com/apply/5"
  },
  {
    id: "6",
    title: "Quality Assurance Reviewer",
    company: "DataPrime",
    location: "Remote",
    type: "Part-time",
    experienceLevel: "Intermediate",
    category: "Quality Assurance",
    payRange: "$24-30/hr",
    description: "Review and validate annotations from our global team. Ensure data quality meets the highest standards for AI training.",
    fullDescription: "DataPrime provides high-quality training data to leading AI companies. Our QA Reviewers are the final checkpoint, ensuring every annotation meets rigorous quality standards. This part-time role is perfect for experienced annotators looking to advance their careers in data quality.",
    responsibilities: [
      "Review annotations across multiple task types (image, text, audio)",
      "Identify quality issues and provide detailed feedback",
      "Track quality metrics and identify improvement opportunities",
      "Create and maintain QA documentation",
      "Conduct calibration sessions with annotation teams",
      "Escalate systematic issues to project managers"
    ],
    requirements: [
      "2+ years of annotation experience across multiple modalities",
      "Sharp eye for detail and commitment to quality",
      "Strong written communication for feedback delivery",
      "Experience with quality frameworks and metrics",
      "Ability to work independently 20-30 hours/week",
      "Previous QA or review experience preferred"
    ],
    tags: ["Remote", "Part-time", "QA"],
    postedDate: "1 week ago",
    featured: false,
    applyUrl: "https://example.com/apply/6"
  },
  {
    id: "7",
    title: "Text Classification Specialist",
    company: "SentimentPro",
    location: "Remote",
    type: "Contract",
    experienceLevel: "Entry-level",
    category: "Text & NLP",
    payRange: "$16-20/hr",
    description: "Classify text data for sentiment analysis and content moderation models. Training provided for motivated candidates.",
    fullDescription: "SentimentPro builds sentiment analysis tools for social media and customer feedback. We're looking for detail-oriented individuals to classify text across various categories. No experience necessary - we provide comprehensive training and ongoing support.",
    responsibilities: [
      "Classify text snippets into predefined sentiment categories",
      "Identify toxic content and moderate according to guidelines",
      "Label emotional tone, intent, and key themes",
      "Process 400-500 text samples per day",
      "Participate in regular calibration exercises",
      "Provide feedback on ambiguous cases"
    ],
    requirements: [
      "Excellent reading comprehension and analytical skills",
      "Cultural awareness and sensitivity to context",
      "Ability to remain objective when reviewing sensitive content",
      "Commitment to maintaining user privacy and confidentiality",
      "Available 15-25 hours/week",
      "No prior experience required"
    ],
    tags: ["Remote", "Text", "Sentiment Analysis"],
    postedDate: "6 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/7"
  },
  {
    id: "8",
    title: "Medical Image Annotator",
    company: "HealthAI",
    location: "Hybrid - Boston, MA",
    type: "Full-time",
    experienceLevel: "Expert",
    category: "Image & Video",
    payRange: "$32-42/hr",
    description: "Annotate medical imaging data including X-rays, CT scans, and MRIs. Medical background or training strongly preferred.",
    fullDescription: "HealthAI is revolutionizing medical diagnosis with AI. We need annotators with medical training to label imaging data for disease detection models. This role combines medical knowledge with cutting-edge AI technology to improve patient outcomes worldwide.",
    responsibilities: [
      "Annotate medical images (X-ray, CT, MRI) for pathology detection",
      "Identify and segment anatomical structures and abnormalities",
      "Collaborate with radiologists to validate annotations",
      "Maintain strict patient privacy and HIPAA compliance",
      "Document annotation decisions and edge cases",
      "Achieve 95%+ agreement with expert radiologist reviews"
    ],
    requirements: [
      "Medical background (nursing, radiology tech, medical school) required",
      "Understanding of anatomy and common pathologies",
      "Experience reading medical imaging preferred",
      "Meticulous attention to detail and patient safety mindset",
      "HIPAA training (we provide if needed)",
      "Ability to work hybrid schedule in Boston area"
    ],
    tags: ["Hybrid", "Medical", "Healthcare"],
    postedDate: "3 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/8"
  },
  {
    id: "9",
    title: "Object Detection Trainer",
    company: "RetailVision",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Intermediate",
    category: "Image & Video",
    payRange: "$24-30/hr",
    description: "Train object detection models for retail automation. Annotate products, shelves, and customer interactions in store footage.",
    fullDescription: "RetailVision brings AI to brick-and-mortar retail. Our Object Detection Trainers annotate video from retail environments to power automated checkout, inventory management, and customer analytics. Join us in transforming the shopping experience.",
    responsibilities: [
      "Annotate retail products with precise bounding boxes",
      "Label customer-product interactions and shopping behaviors",
      "Work with high-volume video datasets",
      "Maintain consistency across thousands of product SKUs",
      "Identify and flag anomalies or edge cases",
      "Meet daily annotation quotas (250-300 images)"
    ],
    requirements: [
      "1+ years of image/video annotation experience",
      "Familiarity with retail environments and product categories",
      "Strong visual pattern recognition abilities",
      "Experience with annotation tools (Labelbox, V7, CVAT)",
      "Consistent internet connection and quiet workspace",
      "Full-time availability during US business hours"
    ],
    tags: ["Remote", "Retail", "Object Detection"],
    postedDate: "5 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/9"
  },
  {
    id: "10",
    title: "Speech Recognition Annotator",
    company: "SpeakEasy AI",
    location: "Remote",
    type: "Contract",
    experienceLevel: "Entry-level",
    category: "Audio & Speech",
    payRange: "$17-22/hr",
    description: "Validate and correct automated speech transcriptions. Work with diverse accents and languages to improve voice recognition accuracy.",
    fullDescription: "SpeakEasy AI builds multilingual voice assistants. We need annotators to review automated transcriptions, correct errors, and help our models learn from mistakes. This entry-level role offers exposure to cutting-edge speech recognition technology.",
    responsibilities: [
      "Review and correct automated speech transcriptions",
      "Mark speaker diarization and turn-taking",
      "Identify and label accents, dialects, and speech characteristics",
      "Process 3-5 hours of audio content daily",
      "Flag systematic recognition errors for engineering review",
      "Maintain transcription style consistency"
    ],
    requirements: [
      "Excellent listening skills and language proficiency",
      "Ability to understand diverse accents and speaking styles",
      "Fast and accurate typing (50+ WPM)",
      "High-quality headphones and audio setup",
      "Patient attention to repetitive tasks",
      "Available 20-40 hours/week on flexible schedule"
    ],
    tags: ["Remote", "Speech", "Multilingual"],
    postedDate: "1 week ago",
    featured: false,
    applyUrl: "https://example.com/apply/10"
  },
  {
    id: "11",
    title: "Chatbot Training Specialist",
    company: "BotWorks",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Intermediate",
    category: "Text & NLP",
    payRange: "$26-32/hr",
    description: "Create training conversations and evaluate chatbot responses. Help build more natural and helpful AI assistants.",
    fullDescription: "BotWorks creates enterprise chatbots for customer service. Our Training Specialists write example conversations, evaluate bot responses, and help our AI understand customer intent. This creative role blends writing skills with AI training.",
    responsibilities: [
      "Write realistic customer service conversations for bot training",
      "Evaluate chatbot responses for accuracy and helpfulness",
      "Identify conversation flows and edge cases",
      "Collaborate with conversation designers on dialogue patterns",
      "Test new bot features and provide detailed feedback",
      "Create and maintain intent classification taxonomies"
    ],
    requirements: [
      "1-2 years of conversational AI or customer service experience",
      "Strong writing and communication skills",
      "Understanding of dialogue patterns and user intent",
      "Empathy and customer-centric mindset",
      "Experience with chatbot platforms (Dialogflow, Rasa) a plus",
      "Creative problem-solving abilities"
    ],
    tags: ["Remote", "Conversational AI", "Writing"],
    postedDate: "2 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/11"
  },
  {
    id: "12",
    title: "Document Classification Expert",
    company: "DocuAI",
    location: "Remote",
    type: "Part-time",
    experienceLevel: "Intermediate",
    category: "Text & NLP",
    payRange: "$22-28/hr",
    description: "Classify and extract information from business documents. Work with invoices, contracts, forms, and receipts.",
    fullDescription: "DocuAI automates document processing for enterprises. We need experts to classify document types, extract key information, and validate OCR results. This part-time role is perfect for detail-oriented individuals with business document experience.",
    responsibilities: [
      "Classify business documents into categories (invoice, receipt, contract, etc.)",
      "Extract and validate key information fields",
      "Review OCR output and correct recognition errors",
      "Identify document layouts and structure",
      "Process 100-150 documents per day",
      "Maintain data accuracy above 98%"
    ],
    requirements: [
      "Experience with business documents and data entry",
      "Strong attention to detail and accuracy",
      "Understanding of common business document types",
      "Familiarity with accounting or legal terminology helpful",
      "Available 15-25 hours/week",
      "Prior document processing experience preferred"
    ],
    tags: ["Remote", "Part-time", "Documents"],
    postedDate: "4 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/12"
  },
  {
    id: "13",
    title: "Facial Recognition Annotator",
    company: "IdentityTech",
    location: "Remote",
    type: "Contract",
    experienceLevel: "Entry-level",
    category: "Image & Video",
    payRange: "$18-24/hr",
    description: "Annotate facial landmarks and attributes for identity verification systems. Training provided for qualified candidates.",
    fullDescription: "IdentityTech builds secure facial recognition for identity verification. We need annotators to mark facial landmarks, assess image quality, and label demographic attributes (age range, etc.). Entry-level friendly with comprehensive training program.",
    responsibilities: [
      "Mark facial landmarks (eyes, nose, mouth, jaw) with precision",
      "Assess image quality and flag unusable images",
      "Label demographic attributes following strict guidelines",
      "Work with diverse datasets ensuring fairness and accuracy",
      "Complete 200-250 images daily",
      "Maintain privacy and ethical standards"
    ],
    requirements: [
      "Strong visual perception and hand-eye coordination",
      "Cultural sensitivity and commitment to fairness",
      "Understanding of privacy and ethical AI considerations",
      "Reliable internet and ability to work independently",
      "Available 20-40 hours/week",
      "No prior experience required - full training provided"
    ],
    tags: ["Remote", "Facial Recognition", "Entry-level"],
    postedDate: "1 week ago",
    featured: false,
    applyUrl: "https://example.com/apply/13"
  },
  {
    id: "14",
    title: "Sentiment Analysis Labeler",
    company: "EmotionAI",
    location: "Remote",
    type: "Freelance",
    experienceLevel: "Entry-level",
    category: "Text & NLP",
    payRange: "$15-19/hr",
    description: "Label emotional content in social media posts and customer reviews. Flexible freelance opportunity with growth potential.",
    fullDescription: "EmotionAI analyzes customer sentiment for brand monitoring. Our Sentiment Labelers classify emotional tone in text from social media, reviews, and surveys. This flexible freelance role lets you work on your own schedule while developing valuable AI annotation skills.",
    responsibilities: [
      "Classify sentiment in social media posts and reviews",
      "Identify emotional tone (positive, negative, neutral, mixed)",
      "Label specific emotions (joy, anger, sadness, etc.)",
      "Handle sarcasm, irony, and nuanced language",
      "Process 300-400 text samples per session",
      "Work flexible hours on your own schedule"
    ],
    requirements: [
      "Strong understanding of emotional nuance in text",
      "Native or fluent English proficiency",
      "Cultural awareness and sensitivity",
      "Objectivity when reviewing emotionally charged content",
      "Flexible availability - choose your own hours",
      "No prior experience required"
    ],
    tags: ["Remote", "Freelance", "Sentiment"],
    postedDate: "3 days ago",
    featured: false,
    applyUrl: "https://example.com/apply/14"
  },
  {
    id: "15",
    title: "Data Collection Coordinator",
    company: "CrowdSource Inc.",
    location: "Hybrid - Austin, TX",
    type: "Full-time",
    experienceLevel: "Expert",
    category: "Quality Assurance",
    payRange: "$38-48/hr",
    description: "Coordinate large-scale data collection projects for AI training. Manage workflows, quality, and team coordination.",
    fullDescription: "CrowdSource Inc. provides data collection services to Fortune 500 AI teams. Our Data Collection Coordinators manage end-to-end projects, from task design through quality delivery. This senior role requires project management skills and deep annotation expertise.",
    responsibilities: [
      "Design and scope data collection projects with clients",
      "Create detailed annotation guidelines and workflows",
      "Manage teams of 20-50 annotators across projects",
      "Monitor quality metrics and implement improvements",
      "Coordinate with clients on requirements and deliverables",
      "Handle budget tracking and resource allocation",
      "Troubleshoot issues and optimize processes"
    ],
    requirements: [
      "3+ years of annotation project management experience",
      "Deep knowledge of annotation types (image, text, audio, video)",
      "Strong project management and organizational skills",
      "Experience with annotation platforms and tools",
      "Excellent client communication abilities",
      "Data analysis skills for quality metrics",
      "Ability to work hybrid schedule in Austin, TX"
    ],
    tags: ["Hybrid", "Project Management", "Leadership"],
    postedDate: "5 days ago",
    featured: true,
    applyUrl: "https://example.com/apply/15"
  }
];

// ===================================
// STATE MANAGEMENT
// ===================================
const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let filteredJobs = [...jobs];

const filters = {
  searchTerm: '',
  category: 'all',
  experienceLevel: 'all',
  jobType: 'all',
  location: 'all',
  sortBy: 'newest'
};

// ===================================
// DOM ELEMENTS
// ===================================
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const categoryFilter = document.getElementById('category-filter');
const experienceFilter = document.getElementById('experience-filter');
const typeFilter = document.getElementById('type-filter');
const locationFilter = document.getElementById('location-filter');
const sortFilter = document.getElementById('sort-filter');
const clearFiltersBtn = document.getElementById('clear-filters');
const filterTagsContainer = document.getElementById('filter-tags');
const jobsGrid = document.getElementById('jobs-grid');
const jobsCount = document.getElementById('jobs-count');
const noResults = document.getElementById('no-results');
const paginationContainer = document.getElementById('pagination');
const jobModal = document.getElementById('job-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

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
// FILTER & SEARCH FUNCTIONALITY
// ===================================
function hasActiveFilters() {
  return filters.searchTerm !== '' ||
    filters.category !== 'all' ||
    filters.experienceLevel !== 'all' ||
    filters.jobType !== 'all' ||
    filters.location !== 'all';
}

function updateFilterUI() {
  // Show/hide clear filters button
  if (hasActiveFilters()) {
    clearFiltersBtn.style.display = 'flex';
  } else {
    clearFiltersBtn.style.display = 'none';
  }

  // Update filter tags
  renderFilterTags();
}

function renderFilterTags() {
  const tags = [];

  if (filters.searchTerm) {
    tags.push({
      label: `Search: "${filters.searchTerm}"`,
      filter: 'searchTerm'
    });
  }

  if (filters.category !== 'all') {
    tags.push({
      label: filters.category,
      filter: 'category'
    });
  }

  if (filters.experienceLevel !== 'all') {
    tags.push({
      label: filters.experienceLevel,
      filter: 'experienceLevel'
    });
  }

  if (filters.jobType !== 'all') {
    tags.push({
      label: filters.jobType,
      filter: 'jobType'
    });
  }

  if (filters.location !== 'all') {
    tags.push({
      label: filters.location,
      filter: 'location'
    });
  }

  if (tags.length > 0) {
    filterTagsContainer.innerHTML = tags.map(tag => `
      <span class="filter-tag">
        ${tag.label}
        <button onclick="removeFilter('${tag.filter}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </span>
    `).join('');
    filterTagsContainer.style.display = 'flex';
  } else {
    filterTagsContainer.style.display = 'none';
  }
}

function removeFilter(filterName) {
  if (filterName === 'searchTerm') {
    filters.searchTerm = '';
    searchInput.value = '';
    searchClear.style.display = 'none';
  } else if (filterName === 'category') {
    filters.category = 'all';
    categoryFilter.value = 'all';
  } else if (filterName === 'experienceLevel') {
    filters.experienceLevel = 'all';
    experienceFilter.value = 'all';
  } else if (filterName === 'jobType') {
    filters.jobType = 'all';
    typeFilter.value = 'all';
  } else if (filterName === 'location') {
    filters.location = 'all';
    locationFilter.value = 'all';
  }

  applyFilters();
}

function clearAllFilters() {
  filters.searchTerm = '';
  filters.category = 'all';
  filters.experienceLevel = 'all';
  filters.jobType = 'all';
  filters.location = 'all';

  searchInput.value = '';
  categoryFilter.value = 'all';
  experienceFilter.value = 'all';
  typeFilter.value = 'all';
  locationFilter.value = 'all';
  searchClear.style.display = 'none';

  currentPage = 1;
  applyFilters();
}

function applyFilters() {
  // Filter jobs
  filteredJobs = jobs.filter(job => {
    const matchesSearch = filters.searchTerm === '' ||
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()));

    const matchesCategory = filters.category === 'all' || job.category === filters.category;
    const matchesExperience = filters.experienceLevel === 'all' || job.experienceLevel === filters.experienceLevel;
    const matchesJobType = filters.jobType === 'all' || job.type === filters.jobType;
    const matchesLocation = filters.location === 'all' || job.location.includes(filters.location);

    return matchesSearch && matchesCategory && matchesExperience && matchesJobType && matchesLocation;
  });

  // Sort jobs
  if (filters.sortBy === 'newest') {
    filteredJobs.sort((a, b) => parseDateString(a.postedDate) - parseDateString(b.postedDate));
  } else if (filters.sortBy === 'oldest') {
    filteredJobs.sort((a, b) => parseDateString(b.postedDate) - parseDateString(a.postedDate));
  }

  updateFilterUI();
  renderJobs();
  renderPagination();
}

// Helper function to parse relative date strings
function parseDateString(dateStr) {
  const now = Date.now();
  const match = dateStr.match(/(\d+)\s+(day|week|hour)s?\s+ago/);
  if (!match) return now;

  const amount = parseInt(match[1]);
  const unit = match[2];

  if (unit === 'day') return now - amount * 24 * 60 * 60 * 1000;
  if (unit === 'week') return now - amount * 7 * 24 * 60 * 60 * 1000;
  if (unit === 'hour') return now - amount * 60 * 60 * 1000;

  return now;
}

// ===================================
// EVENT LISTENERS
// ===================================
searchInput.addEventListener('input', (e) => {
  filters.searchTerm = e.target.value;
  searchClear.style.display = e.target.value ? 'block' : 'none';
  currentPage = 1;
  applyFilters();
});

searchClear.addEventListener('click', () => {
  filters.searchTerm = '';
  searchInput.value = '';
  searchClear.style.display = 'none';
  currentPage = 1;
  applyFilters();
});

categoryFilter.addEventListener('change', (e) => {
  filters.category = e.target.value;
  currentPage = 1;
  applyFilters();
});

experienceFilter.addEventListener('change', (e) => {
  filters.experienceLevel = e.target.value;
  currentPage = 1;
  applyFilters();
});

typeFilter.addEventListener('change', (e) => {
  filters.jobType = e.target.value;
  currentPage = 1;
  applyFilters();
});

locationFilter.addEventListener('change', (e) => {
  filters.location = e.target.value;
  currentPage = 1;
  applyFilters();
});

sortFilter.addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  applyFilters();
});

clearFiltersBtn.addEventListener('click', clearAllFilters);

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderJobs() {
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Update job count
  if (filteredJobs.length > 0) {
    jobsCount.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredJobs.length)} of ${filteredJobs.length} jobs`;
    jobsCount.style.display = 'block';
  } else {
    jobsCount.style.display = 'none';
  }

  // Render jobs or show no results
  if (paginatedJobs.length > 0) {
    jobsGrid.innerHTML = paginatedJobs.map((job, index) => createJobCard(job, index)).join('');
    jobsGrid.style.display = 'grid';
    noResults.style.display = 'none';
  } else {
    jobsGrid.style.display = 'none';
    noResults.style.display = 'block';
  }
}

function createJobCard(job, index) {
  const maxTags = 3;
  const visibleTags = job.tags.slice(0, maxTags);
  const remainingTags = job.tags.length - maxTags;

  return `
    <div class="job-card ${job.featured ? 'featured' : ''}" onclick="openJobModal('${job.id}')" style="animation-delay: ${index * 100}ms;">
      <div class="job-card-header">
        <div class="job-card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="job-card-title">
          <h3>${job.title}</h3>
          <p class="job-card-company">${job.company}</p>
        </div>
      </div>

      <div class="job-card-meta">
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${job.location}</span>
        </div>
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>${job.type}</span>
        </div>
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
          <span>${job.experienceLevel}</span>
        </div>
      </div>

      <p class="job-card-description">${job.description}</p>

      <div class="job-card-tags">
        ${visibleTags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
        ${remainingTags > 0 ? `<span class="job-tag more">+${remainingTags} more</span>` : ''}
      </div>

      <div class="job-card-footer">
        ${job.payRange ? `
          <div class="job-card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>${job.payRange}</span>
          </div>
        ` : ''}
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Posted ${job.postedDate}</span>
        </div>
      </div>

      <button class="job-card-btn">View Details</button>
    </div>
  `;
}

function renderPagination() {
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';

  let html = `
    <button
      class="pagination-btn"
      onclick="changePage(${currentPage - 1})"
      ${currentPage === 1 ? 'disabled' : ''}
    >
      Previous
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button
        class="pagination-btn ${i === currentPage ? 'active' : ''}"
        onclick="changePage(${i})"
      >
        ${i}
      </button>
    `;
  }

  html += `
    <button
      class="pagination-btn"
      onclick="changePage(${currentPage + 1})"
      ${currentPage === totalPages ? 'disabled' : ''}
    >
      Next
    </button>
  `;

  paginationContainer.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderJobs();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// JOB DETAIL MODAL
// ===================================
function openJobModal(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-job-header">
        <div class="modal-job-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="modal-job-title-section">
          <h2 class="modal-job-title">${job.title}</h2>
          <p class="modal-job-company">${job.company}</p>
          ${job.featured ? '<span class="modal-job-featured">⭐ Featured</span>' : ''}
        </div>
      </div>

      <div class="modal-job-meta">
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${job.location}</span>
        </div>
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>${job.type}</span>
        </div>
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
          <span>${job.experienceLevel}</span>
        </div>
        ${job.payRange ? `
          <div class="job-card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>${job.payRange}</span>
          </div>
        ` : ''}
        <div class="job-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Posted ${job.postedDate}</span>
        </div>
      </div>

      <div class="modal-job-tags">
        ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
      </div>
    </div>

    <div class="modal-separator"></div>

    <div class="modal-section">
      <h3>Job Description</h3>
      <p>${job.fullDescription}</p>
    </div>

    <div class="modal-section">
      <h3>Responsibilities</h3>
      <ul>
        ${job.responsibilities.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-section">
      <h3>Requirements</h3>
      <ul>
        ${job.requirements.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-separator"></div>

    <div class="modal-footer">
      <a href="${job.applyUrl}" target="_blank" rel="noopener noreferrer" class="modal-apply-btn">
        Apply on Company Site
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </div>
  `;

  jobModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeJobModal() {
  jobModal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeJobModal);

jobModal.querySelector('.modal-overlay').addEventListener('click', closeJobModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && jobModal.classList.contains('open')) {
    closeJobModal();
  }
});

// ===================================
// INITIALIZATION
// ===================================
applyFilters();
