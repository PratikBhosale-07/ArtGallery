# 🔐 auth.html - Login/Signup Page Explanation

## What This File Does

This page lets users create accounts or log in. It has a beautiful split-screen design with forms on the right and branding on the left.

---

## Main Structure

```
┌─────────────────────────────────────┐
│  Purple Gradient  │    White Form   │
│     (Branding)    │   (Login/Signup)│
│                   │                 │
│   Logo            │   Login Form    │
│   Welcome Text    │      or         │
│   Description     │   Signup Form   │
└─────────────────────────────────────┘
```

---

## 1. **Head Section** (Lines 1-12)

```html
<head>
  <title>Login / Sign Up - Olunde's</title>
  <link href="...Caveat font..." rel="stylesheet" />
  <link rel="stylesheet" href="auth-styles.css" />
</head>
```

**What it does:**

- Sets page title
- Loads handwritten font for "Olunde's"
- Connects to styling file

---

## 2. **Left Side - Branding** (Lines 14-25)

```html
<div class="auth-branding">
  <div class="branding-content">
    <a href="index.html" class="logo">
      <img src="logo/logo-blue.png" alt="Olunde's Art Gallery" />
    </a>
    <h1 class="brand-name">Welcome to Olunde's</h1>
    <p>
      A premier online marketplace connecting talented artists with collectors
      worldwide.
    </p>
    <ul class="feature-list">
      <li>✓ Discover unique artworks</li>
      <li>✓ Connect with artists</li>
      <li>✓ Secure transactions</li>
      <li>✓ Global community</li>
    </ul>
  </div>
</div>
```

**What it does:**

- Shows logo (clickable, goes to homepage)
- Welcome message in handwritten font
- Description of the platform
- 4 key features with checkmarks

**Visual:** Purple gradient background with white text

---

## 3. **Right Side - Forms Container** (Lines 27-155)

```html
<div class="auth-forms">
  <!-- Login Form -->
  <form id="loginForm" class="auth-form active">...</form>

  <!-- Signup Form -->
  <form id="signupForm" class="auth-form">...</form>
</div>
```

**What it does:**

- Contains both forms (login and signup)
- Only one form visible at a time
- Switches between forms when you click links

---

## 4. **Login Form** (Lines 29-65)

```html
<form id="loginForm" class="auth-form active">
  <h2>Login to Your Account</h2>

  <!-- Email Input -->
  <div class="form-group">
    <label for="loginEmail">Email Address</label>
    <input type="email" id="loginEmail" required />
  </div>

  <!-- Password Input -->
  <div class="form-group">
    <label for="loginPassword">Password</label>
    <input type="password" id="loginPassword" required />
  </div>

  <!-- Remember Me Checkbox -->
  <div class="form-options">
    <label>
      <input type="checkbox" id="rememberMe" />
      Remember me
    </label>
    <a href="#" class="forgot-password">Forgot Password?</a>
  </div>

  <!-- Submit Button -->
  <button type="submit" class="btn-primary">Login</button>

  <!-- Switch to Signup Link -->
  <p class="switch-form">
    Don't have an account?
    <a href="#" id="showSignup">Sign up here</a>
  </p>
</form>
```

**What it does:**

- Email input field
- Password input field
- "Remember me" checkbox
- "Forgot password" link
- Login button
- Link to switch to signup form

**Fields required:**

- ✅ Email (must be valid email format)
- ✅ Password

---

## 5. **Signup Form** (Lines 67-153)

```html
<form id="signupForm" class="auth-form">
  <h2>Create Your Account</h2>

  <!-- Full Name -->
  <div class="form-group">
    <label for="signupFullName">Full Name</label>
    <input type="text" id="signupFullName" required />
  </div>

  <!-- Username -->
  <div class="form-group">
    <label for="signupUsername">Username</label>
    <input type="text" id="signupUsername" required />
  </div>

  <!-- Email -->
  <div class="form-group">
    <label for="signupEmail">Email Address</label>
    <input type="email" id="signupEmail" required />
  </div>

  <!-- Password -->
  <div class="form-group">
    <label for="signupPassword">Password</label>
    <input type="password" id="signupPassword" required />
  </div>

  <!-- Confirm Password -->
  <div class="form-group">
    <label for="confirmPassword">Confirm Password</label>
    <input type="password" id="confirmPassword" required />
  </div>

  <!-- User Type Selection -->
  <div class="form-group">
    <label>I am a:</label>
    <div class="user-type-selection">
      <label class="user-type-option">
        <input type="radio" name="userType" value="buyer" checked />
        <span>Buyer / Collector</span>
      </label>
      <label class="user-type-option">
        <input type="radio" name="userType" value="artist" />
        <span>Artist</span>
      </label>
    </div>
  </div>

  <!-- Bio (Only for Artists) -->
  <div class="form-group" id="bioField" style="display: none;">
    <label for="signupBio">Bio</label>
    <textarea id="signupBio" rows="3"></textarea>
  </div>

  <!-- Submit Button -->
  <button type="submit" class="btn-primary">Create Account</button>

  <!-- Switch to Login Link -->
  <p class="switch-form">
    Already have an account?
    <a href="#" id="showLogin">Login here</a>
  </p>
</form>
```

**What it does:**

- Full name input
- Username input (unique)
- Email input (unique)
- Password input
- Confirm password input
- User type selection (Buyer or Artist)
- Bio textarea (shows only for Artists)
- Create account button
- Link to switch to login form

**Fields required:**

- ✅ Full Name
- ✅ Username (must be unique)
- ✅ Email (must be unique & valid format)
- ✅ Password (minimum 6 characters)
- ✅ Confirm Password (must match password)
- ✅ User Type (Buyer or Artist)
- ⚠️ Bio (only for Artists)

---

## 6. **Alert Messages** (Lines 155-157)

```html
<div class="alert" id="alert" style="display: none;">
  <p id="alertMessage"></p>
</div>
```

**What it does:**

- Shows success or error messages
- Hidden by default
- JavaScript shows it when needed
- Can be green (success) or red (error)

**Examples:**

- ✅ "Account created successfully!"
- ❌ "Email already exists"
- ❌ "Passwords do not match"

---

## Form Behavior

### **Login Process:**

```
1. User enters email & password
   ↓
2. Clicks "Login" button
   ↓
3. JavaScript validates fields
   ↓
4. Sends to server (server.js)
   ↓
5. Server checks database
   ↓
6. If correct → Go to profile page
   If wrong → Show error message
```

### **Signup Process:**

```
1. User fills all fields
   ↓
2. Selects user type (Buyer/Artist)
   ↓
3. If Artist → Bio field appears
   ↓
4. Clicks "Create Account"
   ↓
5. JavaScript validates:
   - All fields filled?
   - Email format correct?
   - Password ≥ 6 characters?
   - Passwords match?
   ↓
6. Sends to server (server.js)
   ↓
7. Server checks:
   - Email unique?
   - Username unique?
   ↓
8. Creates account in database
   ↓
9. Shows success message
   ↓
10. Redirects to profile page
```

---

## User Types

### **Buyer / Collector**

- Can browse artworks
- Can view artist profiles
- Can save favorites
- **Cannot** upload artworks

### **Artist**

- Everything Buyers can do, PLUS:
- Can upload artworks
- Can set prices
- Can enable bidding
- Has public artist profile
- Requires bio

---

## Database Tables Used

### **For Buyers:**

```sql
INSERT INTO buyers (
    full_name,
    username,
    email,
    password_hash
) VALUES (...)
```

### **For Artists:**

```sql
INSERT INTO artists (
    full_name,
    username,
    email,
    password_hash,
    bio
) VALUES (...)
```

---

## Form Switching Animation

```
Login Form (visible)  ←→  Signup Form (hidden)
      ↓ click "Sign up here"
Login Form (slides out)  →  Signup Form (slides in)
      ↓ click "Login here"
Login Form (slides in)  ←  Signup Form (slides out)
```

**Duration:** 0.5 seconds smooth animation

---

## Validation Rules

| Field                | Rules                                            |
| -------------------- | ------------------------------------------------ |
| **Full Name**        | Required, min 2 characters                       |
| **Username**         | Required, min 3 characters, unique, alphanumeric |
| **Email**            | Required, valid email format, unique             |
| **Password**         | Required, min 6 characters                       |
| **Confirm Password** | Must match password exactly                      |
| **User Type**        | Must select one (Buyer or Artist)                |
| **Bio**              | Required only for Artists, max 500 characters    |

---

## Security Features

1. **Password Hashing:** Passwords encrypted with bcrypt (10 salt rounds)
2. **Email Validation:** Checks proper format (name@domain.com)
3. **Unique Checks:** Prevents duplicate usernames/emails
4. **Required Fields:** Cannot submit with empty fields
5. **Password Confirmation:** Must type password twice correctly

---

## Connected Files

- **auth-styles.css** → Makes it look beautiful
- **auth-script.js** → Handles form logic and validation
- **server.js** → Processes login/signup requests
- **MySQL database** → Stores user accounts

---

## In Simple Terms

Think of auth.html as the **entrance gate** to the website:

- **Left side** → Like a welcome banner with benefits
- **Right side** → Like a registration desk
- **Login form** → For returning visitors (show your ID)
- **Signup form** → For new visitors (fill out membership form)
- **User types** → Like choosing "Customer" or "Vendor" badges

Once you get through, you can explore the whole art gallery! 🎨🔐
