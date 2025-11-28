# 🔐 auth-script.js - Login/Signup Logic Explanation

## What This File Does

This file handles all the login and signup functionality - validating forms, sending data to server, showing success/error messages.

---

## 1. **API Configuration** (Lines 1-2)

```javascript
const API_BASE_URL = "http://localhost:3001/api/";
```

**What it does:**

- Stores server address
- Used for login and signup requests

---

## 2. **Get Form Elements** (Lines 4-23)

```javascript
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");
const alertBox = document.getElementById("alert");
const alertMessage = document.getElementById("alertMessage");
const bioField = document.getElementById("bioField");
const userTypeRadios = document.querySelectorAll('input[name="userType"]');
```

**What it does:**

- Gets references to all form elements
- Like getting handles to control different parts

---

## 3. **Show Alert Function** (Lines 25-37)

```javascript
function showAlert(message, type) {
  alertMessage.textContent = message;
  alertBox.className = `alert alert-${type}`; // 'success' or 'error'
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 5000); // Hides after 5 seconds
}
```

**What it does:**

- Shows success messages (green) or error messages (red)
- Automatically hides after 5 seconds
- Can show any custom message

**Examples:**

- ✅ `showAlert('Login successful!', 'success')`
- ❌ `showAlert('Invalid email or password', 'error')`

---

## 4. **Toggle Bio Field** (Lines 39-47)

```javascript
userTypeRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.value === "artist") {
      bioField.style.display = "block"; // Show bio field
    } else {
      bioField.style.display = "none"; // Hide bio field
    }
  });
});
```

**What it does:**

- Watches user type selection (Buyer or Artist)
- Shows bio field if "Artist" selected
- Hides bio field if "Buyer" selected

**Flow:**

```
User selects "Buyer" → Bio field hidden
User selects "Artist" → Bio field appears
```

---

## 5. **Switch Between Forms** (Lines 49-63)

```javascript
showSignupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});
```

**What it does:**

- "Sign up here" link → Hides login form, shows signup form
- "Login here" link → Hides signup form, shows login form
- Smooth fade animation (handled by CSS)

---

## 6. **Email Validation** (Lines 65-68)

```javascript
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

**What it does:**

- Checks if email format is valid
- Must have: `name@domain.com` format

**Examples:**

- ✅ `john@example.com` → Valid
- ✅ `user123@mail.co.uk` → Valid
- ❌ `invalidemail` → Invalid
- ❌ `test@` → Invalid
- ❌ `@example.com` → Invalid

---

## 7. **Login Form Handler** (Lines 70-130)

```javascript
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop page reload

  // Get form values
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // Validation
  if (!email || !password) {
    showAlert("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address", "error");
    return;
  }

  // Send to server
  try {
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save user data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      showAlert("Login successful!", "success");

      // Redirect to profile
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1500);
    } else {
      showAlert(data.message || "Login failed", "error");
    }
  } catch (error) {
    showAlert("Connection error. Please try again.", "error");
  }
});
```

**What it does:**

**Step 1:** Get email and password from form
**Step 2:** Validate:

- ✅ Both fields filled?
- ✅ Email format valid?

**Step 3:** Send to server:

```json
POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Step 4:** Server response:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "full_name": "John Doe",
    "user_type": "artist"
  }
}
```

**Step 5:** If successful:

- Save user data to browser
- Show success message
- Redirect to profile page after 1.5 seconds

**Step 6:** If failed:

- Show error message
- User stays on login page

---

## 8. **Signup Form Handler** (Lines 132-250)

```javascript
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const fullName = document.getElementById("signupFullName").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value;
  const bio = document.getElementById("signupBio").value.trim();

  // Validation 1: All fields filled?
  if (!fullName || !username || !email || !password || !confirmPassword) {
    showAlert("Please fill in all required fields", "error");
    return;
  }

  // Validation 2: Valid email?
  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address", "error");
    return;
  }

  // Validation 3: Password long enough?
  if (password.length < 6) {
    showAlert("Password must be at least 6 characters long", "error");
    return;
  }

  // Validation 4: Passwords match?
  if (password !== confirmPassword) {
    showAlert("Passwords do not match", "error");
    return;
  }

  // Validation 5: Artist needs bio?
  if (userType === "artist" && !bio) {
    showAlert("Artists must provide a bio", "error");
    return;
  }

  // Send to server
  try {
    const response = await fetch(`${API_BASE_URL}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        username,
        email,
        password,
        user_type: userType,
        bio: userType === "artist" ? bio : null,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showAlert(
        "Account created successfully! Redirecting to login...",
        "success"
      );

      // Switch to login form after 2 seconds
      setTimeout(() => {
        signupForm.reset(); // Clear form
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
      }, 2000);
    } else {
      showAlert(data.message || "Registration failed", "error");
    }
  } catch (error) {
    showAlert("Connection error. Please try again.", "error");
  }
});
```

**What it does:**

**Step 1:** Get all form values

**Step 2:** Validate everything:

- ✅ All required fields filled?
- ✅ Email format valid?
- ✅ Password ≥ 6 characters?
- ✅ Passwords match?
- ✅ Artist has bio?

**Step 3:** Send to server:

```json
POST /api/auth/register
{
    "full_name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "user_type": "artist",
    "bio": "I create abstract art"
}
```

**Step 4:** Server checks:

- ❓ Email already used?
- ❓ Username already taken?
- ❓ All validations pass?

**Step 5:** Server creates account:

```sql
INSERT INTO artists (full_name, username, email, password_hash, bio)
VALUES ('John Doe', 'johndoe', 'john@example.com', '$2a$10$...', 'I create abstract art')
```

**Step 6:** If successful:

- Show success message
- Clear form
- Switch to login form after 2 seconds

**Step 7:** If failed:

- Show error message (e.g., "Email already exists")
- User can fix and try again

---

## Validation Summary

| Check              | Error Message                                 |
| ------------------ | --------------------------------------------- |
| Empty fields       | "Please fill in all required fields"          |
| Invalid email      | "Please enter a valid email address"          |
| Short password     | "Password must be at least 6 characters long" |
| Passwords mismatch | "Passwords do not match"                      |
| Artist without bio | "Artists must provide a bio"                  |
| Email taken        | "Email already exists" (from server)          |
| Username taken     | "Username already exists" (from server)       |

---

## Login Flow Diagram

```
User enters email + password
        ↓
Click "Login" button
        ↓
JavaScript validates
        ↓
    Valid? ─No→ Show error message
        ↓ Yes
Send to server (/api/auth/login)
        ↓
Server checks database
        ↓
    Correct? ─No→ Show "Invalid credentials"
        ↓ Yes
Server sends user data
        ↓
Save to localStorage
        ↓
Show success message
        ↓
Redirect to profile.html
```

---

## Signup Flow Diagram

```
User fills all fields
        ↓
Selects user type (Buyer/Artist)
        ↓
If Artist → Bio field appears
        ↓
Click "Create Account"
        ↓
JavaScript validates all fields
        ↓
    Valid? ─No→ Show specific error
        ↓ Yes
Send to server (/api/auth/register)
        ↓
Server validates (unique email/username)
        ↓
    Valid? ─No→ Show "Email/Username exists"
        ↓ Yes
Hash password (bcrypt)
        ↓
Insert into database (artists or buyers table)
        ↓
Show success message
        ↓
Clear form
        ↓
Switch to login form
        ↓
User logs in with new account
```

---

## Data Stored in Browser

After successful login:

```javascript
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem(
  "user",
  JSON.stringify({
    id: 1,
    username: "johndoe",
    email: "john@example.com",
    full_name: "John Doe",
    user_type: "artist",
    bio: "I create abstract art",
  })
);
```

This data is used by:

- **profile.html** → Display user info
- **upload.html** → Check if user is artist
- **index.html** → Show "Profile" button

---

## Connected Files

- **auth.html** → The form interface
- **auth-styles.css** → Form styling
- **server.js** → Handles `/api/auth/login` and `/api/auth/register`
- **MySQL database** → Stores user accounts

---

## In Simple Terms

Think of auth-script.js as the **security guard** at the entrance:

- **Checks ID** → Validates email format
- **Verifies password** → Must be strong enough (6+ characters)
- **Checks duplicates** → No two people with same email
- **Issues badge** → Saves login status in browser
- **Opens door** → Redirects to profile after successful login

It makes sure only valid users get in! 🔐✅
