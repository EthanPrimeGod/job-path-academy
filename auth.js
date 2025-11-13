/**
 * Authentication Page JavaScript
 * Handles sign in, sign up, form validation, and Supabase integration
 */

// ===================================
// SUPABASE CLIENT INITIALIZATION
// ===================================
const SUPABASE_URL = 'https://rrnncqtmjfanmlusheqd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybm5jcXRtamZhbm1sdXNoZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMDc1MjEsImV4cCI6MjA3Nzg4MzUyMX0.eLQpE90RrwNVts9Azhz1GwWysTuPXQGbjRPH3dp1kMQ';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// ===================================
// STATE MANAGEMENT
// ===================================
let currentMode = 'signin'; // 'signin' or 'signup'
let currentRole = 'annotator'; // 'annotator' or 'company'

// ===================================
// DOM ELEMENTS
// ===================================
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const annotatorFields = document.getElementById('annotator-fields');
const companyFields = document.getElementById('company-fields');
const toast = document.getElementById('toast');

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
// MODE TOGGLE (Sign In / Sign Up)
// ===================================
document.querySelectorAll('.auth-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    switchMode(mode);
  });
});

document.querySelectorAll('.auth-link-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.switch;
    switchMode(mode);
  });
});

function switchMode(mode) {
  currentMode = mode;

  // Update button states
  document.querySelectorAll('.auth-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // Show/hide forms
  if (mode === 'signin') {
    signinForm.style.display = 'flex';
    signupForm.style.display = 'none';
  } else {
    signinForm.style.display = 'none';
    signupForm.style.display = 'flex';
  }

  // Clear all errors
  clearAllErrors();
}

// ===================================
// ROLE TOGGLE (Annotator / Company)
// ===================================
document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.dataset.role;
    switchRole(role);
  });
});

function switchRole(role) {
  currentRole = role;

  // Update button states
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  // Show/hide fields
  if (role === 'annotator') {
    annotatorFields.style.display = 'block';
    companyFields.style.display = 'none';
  } else {
    annotatorFields.style.display = 'none';
    companyFields.style.display = 'block';
  }

  // Clear all errors
  clearAllErrors();
}

// ===================================
// PASSWORD VISIBILITY TOGGLE
// ===================================
document.querySelectorAll('.password-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const inputId = btn.dataset.input;
    const input = document.getElementById(inputId);
    const eyeIcon = btn.querySelector('.eye-icon');
    const eyeOffIcon = btn.querySelector('.eye-off-icon');

    if (input.type === 'password') {
      input.type = 'text';
      eyeIcon.style.display = 'none';
      eyeOffIcon.style.display = 'block';
    } else {
      input.type = 'password';
      eyeIcon.style.display = 'block';
      eyeOffIcon.style.display = 'none';
    }
  });
});

// ===================================
// PASSWORD STRENGTH INDICATOR
// ===================================
function getPasswordStrength(password) {
  if (password.length < 8) {
    return { strength: 'weak', color: 'weak' };
  }
  if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { strength: 'okay', color: 'okay' };
  }
  return { strength: 'strong', color: 'strong' };
}

function updatePasswordStrength(inputId, indicatorId) {
  const input = document.getElementById(inputId);
  const indicator = document.getElementById(indicatorId);

  if (!input || !indicator) return;

  input.addEventListener('input', () => {
    const password = input.value;

    if (password.length === 0) {
      indicator.style.display = 'none';
      return;
    }

    indicator.style.display = 'block';
    const { strength, color } = getPasswordStrength(password);

    const fill = indicator.querySelector('.password-strength-fill');
    const text = indicator.querySelector('.password-strength-text');

    fill.className = 'password-strength-fill ' + color;
    text.textContent = `Password strength: ${strength}`;
  });
}

// Initialize password strength indicators
updatePasswordStrength('annotator-password', 'annotator-password-strength');
updatePasswordStrength('company-password', 'company-password-strength');

// ===================================
// FORM VALIDATION
// ===================================
function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (inputElement) {
    inputElement.classList.add('error');
  }
}

function clearError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = '';
  }

  if (inputElement) {
    inputElement.classList.remove('error');
  }
}

function clearAllErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateSignIn(email, password) {
  let isValid = true;

  if (!email) {
    showError('signin-email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('signin-email', 'Please enter a valid email');
    isValid = false;
  } else {
    clearError('signin-email');
  }

  if (!password) {
    showError('signin-password', 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showError('signin-password', 'Password must be at least 6 characters');
    isValid = false;
  } else {
    clearError('signin-password');
  }

  return isValid;
}

function validateSignUpAnnotator(username, email, password, confirmPassword, agreeToTerms) {
  let isValid = true;

  if (!username) {
    showError('annotator-username', 'Username is required');
    isValid = false;
  } else if (username.length < 3) {
    showError('annotator-username', 'Username must be at least 3 characters');
    isValid = false;
  } else if (username.length > 20) {
    showError('annotator-username', 'Username must be less than 20 characters');
    isValid = false;
  } else {
    clearError('annotator-username');
  }

  if (!email) {
    showError('annotator-email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('annotator-email', 'Please enter a valid email');
    isValid = false;
  } else {
    clearError('annotator-email');
  }

  if (!password) {
    showError('annotator-password', 'Password is required');
    isValid = false;
  } else if (password.length < 8) {
    showError('annotator-password', 'Password must be at least 8 characters');
    isValid = false;
  } else {
    clearError('annotator-password');
  }

  if (!confirmPassword) {
    showError('annotator-confirm', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('annotator-confirm', "Passwords don't match");
    isValid = false;
  } else {
    clearError('annotator-confirm');
  }

  if (!agreeToTerms) {
    showError('annotator-terms', 'You must agree to the terms');
    isValid = false;
  } else {
    clearError('annotator-terms');
  }

  return isValid;
}

function validateSignUpCompany(companyName, email, password, confirmPassword, agreeToTerms) {
  let isValid = true;

  if (!companyName) {
    showError('company-name', 'Company name is required');
    isValid = false;
  } else if (companyName.length < 2) {
    showError('company-name', 'Company name must be at least 2 characters');
    isValid = false;
  } else {
    clearError('company-name');
  }

  if (!email) {
    showError('company-email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('company-email', 'Please enter a valid email');
    isValid = false;
  } else {
    clearError('company-email');
  }

  if (!password) {
    showError('company-password', 'Password is required');
    isValid = false;
  } else if (password.length < 8) {
    showError('company-password', 'Password must be at least 8 characters');
    isValid = false;
  } else {
    clearError('company-password');
  }

  if (!confirmPassword) {
    showError('company-confirm', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('company-confirm', "Passwords don't match");
    isValid = false;
  } else {
    clearError('company-confirm');
  }

  if (!agreeToTerms) {
    showError('company-terms', 'You must agree to the terms');
    isValid = false;
  } else {
    clearError('company-terms');
  }

  return isValid;
}

// ===================================
// TOAST NOTIFICATIONS
// ===================================
function showToast(title, description, type = 'default') {
  const toastHTML = `
    <div class="toast-title">${title}</div>
    ${description ? `<div class="toast-description">${description}</div>` : ''}
  `;

  toast.innerHTML = toastHTML;
  toast.className = 'toast show';

  if (type === 'error') {
    toast.classList.add('error');
  } else if (type === 'success') {
    toast.classList.add('success');
  }

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

// ===================================
// SIGN IN HANDLER
// ===================================
signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;

  if (!validateSignIn(email, password)) {
    return;
  }

  const submitBtn = document.getElementById('signin-submit');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (authData.user) {
      // Check user role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .single();

      showToast('Welcome back!', "You've successfully signed in.", 'success');

      // Redirect based on role
      setTimeout(() => {
        if (roleData?.role === 'company') {
          window.location.href = '/company/dashboard.html';
        } else {
          window.location.href = '/hive.html';
        }
      }, 1500);
    }
  } catch (error) {
    console.error('Sign in error:', error);
    showToast(
      'Error signing in',
      error.message || 'Please check your credentials and try again.',
      'error'
    );
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ===================================
// SIGN UP HANDLER
// ===================================
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let isValid = false;
  let email, password, username, companyName, agreeToTerms;

  if (currentRole === 'annotator') {
    username = document.getElementById('annotator-username').value.trim();
    email = document.getElementById('annotator-email').value.trim();
    password = document.getElementById('annotator-password').value;
    const confirmPassword = document.getElementById('annotator-confirm').value;
    agreeToTerms = document.getElementById('annotator-terms').checked;

    isValid = validateSignUpAnnotator(username, email, password, confirmPassword, agreeToTerms);
  } else {
    companyName = document.getElementById('company-name').value.trim();
    email = document.getElementById('company-email').value.trim();
    password = document.getElementById('company-password').value;
    const confirmPassword = document.getElementById('company-confirm').value;
    agreeToTerms = document.getElementById('company-terms').checked;

    isValid = validateSignUpCompany(companyName, email, password, confirmPassword, agreeToTerms);
  }

  if (!isValid) {
    return;
  }

  const submitBtn = document.getElementById('signup-submit');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          username: currentRole === 'annotator' ? username : undefined,
          company_name: currentRole === 'company' ? companyName : undefined,
        },
      },
    });

    if (error) throw error;

    if (authData.user) {
      // Insert role
      const { error: roleError } = await supabase.from('user_roles').insert({
        user_id: authData.user.id,
        role: currentRole,
      });

      if (roleError) throw roleError;

      // Insert profile
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: authData.user.id,
        username: currentRole === 'annotator' ? username : undefined,
        company_name: currentRole === 'company' ? companyName : undefined,
      });

      if (profileError) throw profileError;

      showToast('Account created!', 'Welcome to Annota. Redirecting...', 'success');

      // Redirect based on role
      setTimeout(() => {
        if (currentRole === 'company') {
          window.location.href = '/company/dashboard.html';
        } else {
          window.location.href = '/hive.html';
        }
      }, 1500);
    }
  } catch (error) {
    console.error('Sign up error:', error);
    showToast(
      'Error creating account',
      error.message || 'Please try again.',
      'error'
    );
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ===================================
// CHECK FOR EXISTING SESSION
// ===================================
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // User is already logged in, redirect
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roleData?.role === 'company') {
      window.location.href = '/company/dashboard.html';
    } else {
      window.location.href = '/hive.html';
    }
  }
}

// Check session on page load
checkSession();
