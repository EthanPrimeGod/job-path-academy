// State
let state = {
  mode: 'signin', // 'signin' or 'signup'
  role: 'annotator' // 'annotator' or 'company'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateFormVisibility();
});

// Event Listeners
function setupEventListeners() {
  // Mode toggle (Sign In / Sign Up)
  document.querySelectorAll('.auth-mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.dataset.mode;
      state.mode = mode;

      // Update active state
      document.querySelectorAll('.auth-mode-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      updateFormVisibility();
    });
  });

  // Role toggle (Annotator / Company)
  document.querySelectorAll('.auth-role-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const role = e.currentTarget.dataset.role;
      state.role = role;

      // Update active state
      document.querySelectorAll('.auth-role-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      updateFormVisibility();
    });
  });

  // Password visibility toggles
  document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const targetId = e.currentTarget.dataset.target;
      const input = document.getElementById(targetId);
      const icon = e.currentTarget.querySelector('svg');

      if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
      } else {
        input.type = 'password';
        icon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
      }
    });
  });

  // Password strength indicator
  const signupPassword = document.getElementById('signupPassword');
  if (signupPassword) {
    signupPassword.addEventListener('input', (e) => {
      updatePasswordStrength(e.target.value);
    });
  }

  // Form submissions
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', handleSignIn);
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignUp);
  }

  // Real-time validation
  setupRealtimeValidation();
}

// Update form visibility based on mode and role
function updateFormVisibility() {
  const signinForm = document.getElementById('signinForm');
  const signupForm = document.getElementById('signupForm');
  const roleToggle = document.querySelector('.auth-role-toggle');
  const usernameField = document.getElementById('usernameField');
  const companyField = document.getElementById('companyField');

  // Show/hide forms based on mode
  if (state.mode === 'signin') {
    signinForm.style.display = 'block';
    signupForm.style.display = 'none';
    roleToggle.style.display = 'none';
  } else {
    signinForm.style.display = 'none';
    signupForm.style.display = 'block';
    roleToggle.style.display = 'flex';
  }

  // Show/hide role-specific fields in signup
  if (state.mode === 'signup') {
    if (state.role === 'annotator') {
      usernameField.style.display = 'block';
      companyField.style.display = 'none';
    } else {
      usernameField.style.display = 'none';
      companyField.style.display = 'block';
    }
  }

  // Clear validation errors when switching modes
  clearAllErrors();
}

// Password strength calculator
function calculatePasswordStrength(password) {
  let strength = 0;
  const feedback = [];

  if (password.length === 0) {
    return { strength: 0, label: '', color: '', feedback: [] };
  }

  // Length check
  if (password.length >= 8) {
    strength += 25;
  } else {
    feedback.push('At least 8 characters');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    strength += 25;
  } else {
    feedback.push('One lowercase letter');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    strength += 25;
  } else {
    feedback.push('One uppercase letter');
  }

  // Number or special character check
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 25;
  } else {
    feedback.push('One number or special character');
  }

  // Determine label and color
  let label, color;
  if (strength <= 25) {
    label = 'Weak';
    color = 'hsl(0, 70%, 50%)';
  } else if (strength <= 50) {
    label = 'Fair';
    color = 'hsl(30, 70%, 50%)';
  } else if (strength <= 75) {
    label = 'Good';
    color = 'hsl(45, 70%, 50%)';
  } else {
    label = 'Strong';
    color = 'hsl(120, 50%, 45%)';
  }

  return { strength, label, color, feedback };
}

// Update password strength indicator
function updatePasswordStrength(password) {
  const indicator = document.getElementById('passwordStrength');
  if (!indicator) return;

  const { strength, label, color, feedback } = calculatePasswordStrength(password);

  if (password.length === 0) {
    indicator.style.display = 'none';
    return;
  }

  indicator.style.display = 'block';

  const fill = indicator.querySelector('.password-strength-fill');
  const labelElement = indicator.querySelector('.password-strength-label');
  const requirementsElement = indicator.querySelector('.password-strength-requirements');

  fill.style.width = `${strength}%`;
  fill.style.backgroundColor = color;
  labelElement.textContent = label;
  labelElement.style.color = color;

  if (feedback.length > 0 && strength < 100) {
    requirementsElement.style.display = 'block';
    requirementsElement.innerHTML = `
      <div style="font-size: 12px; color: var(--muted-foreground); margin-top: 8px;">
        <div style="margin-bottom: 4px;">Password must include:</div>
        ${feedback.map(req => `<div style="margin-left: 8px;">• ${req}</div>`).join('')}
      </div>
    `;
  } else {
    requirementsElement.style.display = 'none';
  }
}

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function validateUsername(username) {
  return username.length >= 3;
}

function validateCompanyName(companyName) {
  return companyName.length >= 2;
}

// Show error message
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  const formGroup = field.closest('.auth-form-group');
  const errorElement = formGroup.querySelector('.auth-form-error');

  field.classList.add('error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

// Clear error message
function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  const formGroup = field.closest('.auth-form-group');
  const errorElement = formGroup.querySelector('.auth-form-error');

  field.classList.remove('error');
  if (errorElement) {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
  }
}

// Clear all errors
function clearAllErrors() {
  document.querySelectorAll('.auth-form-input').forEach(input => {
    input.classList.remove('error');
  });
  document.querySelectorAll('.auth-form-error').forEach(error => {
    error.style.display = 'none';
    error.textContent = '';
  });
}

// Setup real-time validation
function setupRealtimeValidation() {
  // Email validation
  ['signinEmail', 'signupEmail'].forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('blur', () => {
        const value = field.value.trim();
        if (value && !validateEmail(value)) {
          showError(id, 'Please enter a valid email address');
        } else {
          clearError(id);
        }
      });
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          clearError(id);
        }
      });
    }
  });

  // Username validation
  const usernameField = document.getElementById('signupUsername');
  if (usernameField) {
    usernameField.addEventListener('blur', () => {
      const value = usernameField.value.trim();
      if (value && !validateUsername(value)) {
        showError('signupUsername', 'Username must be at least 3 characters');
      } else {
        clearError('signupUsername');
      }
    });
    usernameField.addEventListener('input', () => {
      if (usernameField.classList.contains('error')) {
        clearError('signupUsername');
      }
    });
  }

  // Company name validation
  const companyField = document.getElementById('signupCompany');
  if (companyField) {
    companyField.addEventListener('blur', () => {
      const value = companyField.value.trim();
      if (value && !validateCompanyName(value)) {
        showError('signupCompany', 'Company name must be at least 2 characters');
      } else {
        clearError('signupCompany');
      }
    });
    companyField.addEventListener('input', () => {
      if (companyField.classList.contains('error')) {
        clearError('signupCompany');
      }
    });
  }

  // Confirm password validation
  const confirmPasswordField = document.getElementById('signupConfirmPassword');
  const passwordField = document.getElementById('signupPassword');
  if (confirmPasswordField && passwordField) {
    confirmPasswordField.addEventListener('blur', () => {
      const password = passwordField.value;
      const confirmPassword = confirmPasswordField.value;
      if (confirmPassword && password !== confirmPassword) {
        showError('signupConfirmPassword', 'Passwords do not match');
      } else {
        clearError('signupConfirmPassword');
      }
    });
    confirmPasswordField.addEventListener('input', () => {
      if (confirmPasswordField.classList.contains('error')) {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        if (password === confirmPassword) {
          clearError('signupConfirmPassword');
        }
      }
    });
  }
}

// Handle Sign In
function handleSignIn(e) {
  e.preventDefault();
  clearAllErrors();

  const email = document.getElementById('signinEmail').value.trim();
  const password = document.getElementById('signinPassword').value;

  let hasError = false;

  // Validate email
  if (!email) {
    showError('signinEmail', 'Email is required');
    hasError = true;
  } else if (!validateEmail(email)) {
    showError('signinEmail', 'Please enter a valid email address');
    hasError = true;
  }

  // Validate password
  if (!password) {
    showError('signinPassword', 'Password is required');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // SUCCESS - Ready for backend integration
  console.log('Sign In:', { email, password });

  // TODO: Replace with actual API call
  // Example:
  // fetch('/api/auth/signin', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   if (data.success) {
  //     window.location.href = '/account';
  //   } else {
  //     showError('signinEmail', data.message);
  //   }
  // });

  alert('Sign In Ready! Connect to your Express.js backend.\n\nData:\n' + JSON.stringify({ email, password }, null, 2));
}

// Handle Sign Up
function handleSignUp(e) {
  e.preventDefault();
  clearAllErrors();

  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  const termsAccepted = document.getElementById('signupTerms').checked;

  let hasError = false;

  // Validate email
  if (!email) {
    showError('signupEmail', 'Email is required');
    hasError = true;
  } else if (!validateEmail(email)) {
    showError('signupEmail', 'Please enter a valid email address');
    hasError = true;
  }

  // Role-specific fields
  let username = null;
  let companyName = null;

  if (state.role === 'annotator') {
    username = document.getElementById('signupUsername').value.trim();
    if (!username) {
      showError('signupUsername', 'Username is required');
      hasError = true;
    } else if (!validateUsername(username)) {
      showError('signupUsername', 'Username must be at least 3 characters');
      hasError = true;
    }
  } else {
    companyName = document.getElementById('signupCompany').value.trim();
    if (!companyName) {
      showError('signupCompany', 'Company name is required');
      hasError = true;
    } else if (!validateCompanyName(companyName)) {
      showError('signupCompany', 'Company name must be at least 2 characters');
      hasError = true;
    }
  }

  // Validate password
  if (!password) {
    showError('signupPassword', 'Password is required');
    hasError = true;
  } else if (!validatePassword(password)) {
    showError('signupPassword', 'Password must be at least 8 characters');
    hasError = true;
  }

  // Validate password match
  if (!confirmPassword) {
    showError('signupConfirmPassword', 'Please confirm your password');
    hasError = true;
  } else if (password !== confirmPassword) {
    showError('signupConfirmPassword', 'Passwords do not match');
    hasError = true;
  }

  // Validate terms
  if (!termsAccepted) {
    const termsGroup = document.getElementById('signupTerms').closest('.auth-form-group');
    const errorElement = termsGroup.querySelector('.auth-form-error');
    if (errorElement) {
      errorElement.textContent = 'You must accept the terms and conditions';
      errorElement.style.display = 'block';
    }
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // SUCCESS - Ready for backend integration
  const signupData = {
    email,
    password,
    role: state.role,
    ...(username && { username }),
    ...(companyName && { companyName })
  };

  console.log('Sign Up:', signupData);

  // TODO: Replace with actual API call
  // Example:
  // fetch('/api/auth/signup', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(signupData)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   if (data.success) {
  //     window.location.href = '/account';
  //   } else {
  //     showError('signupEmail', data.message);
  //   }
  // });

  alert('Sign Up Ready! Connect to your Express.js backend.\n\nData:\n' + JSON.stringify(signupData, null, 2));
}
