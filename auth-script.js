// API Configuration
const API_BASE_URL = 'http://localhost:3001/api/';

// DOM Elements
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const loginFormWrapper = document.getElementById('loginForm');
const signupFormWrapper = document.getElementById('signupForm');
const userTypeSelect = document.getElementById('userType');
const bioGroup = document.getElementById('bioGroup');

// Switch between forms
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormWrapper.classList.remove('active');
    signupFormWrapper.classList.add('active');
    clearAlerts();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupFormWrapper.classList.remove('active');
    loginFormWrapper.classList.add('active');
    clearAlerts();
});

// Show/hide bio field based on user type
userTypeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'artist') {
        bioGroup.style.display = 'block';
    } else {
        bioGroup.style.display = 'none';
    }
});

// Login Form Submission
loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    
    // Get form data
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validation
    if (!username || !password) {
        showAlert('loginError', 'Please fill in all fields');
        return;
    }
    
    // Show loader
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    clearAlerts();
    
    try {
        const response = await fetch(`${API_BASE_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user data
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('isLoggedIn', 'true');
            
            showAlert('loginSuccess', 'Login successful! Redirecting...');
            
            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showAlert('loginError', data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('loginError', 'Connection error. Please check your internet connection and try again.');
    } finally {
        loginBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// Signup Form Submission
signupFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const signupBtn = document.getElementById('signupBtn');
    const btnText = signupBtn.querySelector('.btn-text');
    const btnLoader = signupBtn.querySelector('.btn-loader');
    
    // Get form data
    const full_name = document.getElementById('signupFullName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm_password = document.getElementById('signupConfirmPassword').value;
    const user_type = document.getElementById('userType').value;
    const bio = document.getElementById('artistBio').value.trim();
    
    // Validation
    if (!full_name || !username || !email || !password || !confirm_password) {
        showAlert('signupError', 'Please fill in all required fields');
        return;
    }
    
    if (password.length < 6) {
        showAlert('signupError', 'Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirm_password) {
        showAlert('signupError', 'Passwords do not match');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('signupError', 'Please enter a valid email address');
        return;
    }
    
    // Show loader
    signupBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    clearAlerts();
    
    try {
        const requestData = {
            full_name,
            username,
            email,
            password,
            user_type
        };
        
        // Add bio only if user is an artist and bio is provided
        if (user_type === 'artist' && bio) {
            requestData.bio = bio;
        }
        
        const response = await fetch(`${API_BASE_URL}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('signupSuccess', 'Account created successfully! Redirecting to login...');
            
            // Clear form
            signupFormElement.reset();
            
            // Switch to login form after 2 seconds
            setTimeout(() => {
                signupFormWrapper.classList.remove('active');
                loginFormWrapper.classList.add('active');
                clearAlerts();
            }, 2000);
        } else {
            showAlert('signupError', data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showAlert('signupError', 'Connection error. Please check your internet connection and try again.');
    } finally {
        signupBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// Helper Functions
function showAlert(elementId, message) {
    const alertElement = document.getElementById(elementId);
    alertElement.textContent = message;
    alertElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}

function clearAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.style.display = 'none';
    });
}

// Check if user is already logged in
window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
});
