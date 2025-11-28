# 👤 profile.html - User Profile Page Explanation

## What This File Does

This is an Instagram-style profile page showing user information, uploaded artworks, and account options.

---

## Page Layout

```
┌─────────────────────────────────────┐
│           Navbar (Top)              │
├─────────────────────────────────────┤
│  👤 Profile Picture                 │
│     Username & Name                 │
│     [Edit Profile] [Upload] [Logout]│
│                                     │
│  📊 Stats: Artworks Followers Following│
│  📝 Bio text                        │
│  📅 Joined date                     │
│                                     │
│  ┌─────┬─────┬─────┐               │
│  │ARTWORKS│SAVED│TAGGED│ (Tabs)    │
│  └─────┴─────┴─────┘               │
│                                     │
│  ┌───┬───┬───┐                     │
│  │ 🖼 │ 🖼 │ 🖼 │  Artwork Grid     │
│  ├───┼───┼───┤                     │
│  │ 🖼 │ 🖼 │ 🖼 │                   │
│  └───┴───┴───┘                     │
└─────────────────────────────────────┘
```

---

## 1. **Head Section** (Lines 1-8)

```html
<head>
  <title>Profile - Olunde's</title>
  <link href="...Caveat font..." rel="stylesheet" />
  <link rel="stylesheet" href="profile-styles.css" />
</head>
```

**What it does:**

- Sets page title
- Loads handwritten font
- Connects to profile styling

---

## 2. **Navigation Bar** (Lines 10-35)

```html
<nav class="navbar">
  <a href="index.html" class="navbar-logo">
    <img src="logo/logo-blue.png" alt="Olunde's Art Gallery" />
  </a>

  <ul class="navbar-menu">
    <li><a href="index.html#home">Home</a></li>
    <li><a href="index.html#artists">Artists</a></li>
    <li><a href="index.html#categories">Categories</a></li>
    <li><a href="index.html#footer">Contact</a></li>
    <li>
      <button class="profile-button active" id="profileBtn">👤 Profile</button>
    </li>
  </ul>
</nav>
```

**What it does:**

- Shows logo (links to homepage)
- Navigation links to main page sections
- Profile button (highlighted as active)

---

## 3. **Profile Header** (Lines 37-85)

```html
<div class="profile-header">
  <!-- Profile Picture -->
  <div class="profile-picture-container">
    <div class="profile-picture" id="profilePicture">👤 (User icon)</div>
  </div>

  <!-- Profile Info -->
  <div class="profile-info">
    <div class="profile-info-header">
      <h1 id="profileUsername">username</h1>
      <button class="btn-edit-profile">Edit Profile</button>
      <button class="btn-upload-artwork" id="uploadArtworkBtn">
        📤 Upload Artwork
      </button>
      <button class="btn-settings" id="settingsBtn">🚪 Logout</button>
    </div>

    <!-- Stats -->
    <div class="profile-stats">
      <div class="stat">
        <span class="stat-value" id="artworksCount">0</span>
        <span class="stat-label">artworks</span>
      </div>
      <div class="stat">
        <span class="stat-value" id="followersCount">0</span>
        <span class="stat-label">followers</span>
      </div>
      <div class="stat">
        <span class="stat-value" id="followingCount">0</span>
        <span class="stat-label">following</span>
      </div>
    </div>

    <!-- User Info -->
    <div class="profile-details">
      <h3 id="profileName">@username</h3>
      <p id="profileBio">User bio text...</p>
      <p id="profileEmail">📧 email@example.com</p>
      <p id="joinedDate">📅 Joined January 2025</p>
    </div>
  </div>
</div>
```

**What it does:**

**Profile Picture:**

- Circular gradient placeholder
- Can be replaced with actual photo

**Buttons:**

- **Edit Profile** → Edit account info
- **Upload Artwork** → (Artists only) Upload new art
- **Logout** → Sign out

**Stats Display:**

- Artworks count
- Followers count
- Following count

**User Details:**

- @username
- Full name
- Bio text
- Email address
- Join date

---

## 4. **Tabs Section** (Lines 87-100)

```html
<div class="profile-tabs">
  <button class="tab-button active" data-tab="artworks">ARTWORKS</button>
  <button class="tab-button" data-tab="saved">SAVED</button>
  <button class="tab-button" data-tab="tagged">TAGGED</button>
</div>
```

**What it does:**

- Three tabs to switch between content
- **ARTWORKS** → User's uploaded art
- **SAVED** → Bookmarked artworks
- **TAGGED** → Art where user is mentioned

**Visual:** Underlined tab shows which is active

---

## 5. **Artworks Grid** (Lines 102-120)

```html
<div class="tab-content active" id="artworks-tab">
  <div class="artworks-grid" id="artworksGrid">
    <!-- Artwork cards loaded by JavaScript -->
    <div class="artwork-item">
      <img src="artwork.jpg" alt="Artwork" />
      <div class="artwork-overlay">
        <div class="artwork-stats">
          <span>❤️ 245</span>
          <span>💬 12</span>
        </div>
      </div>
    </div>
    <!-- More artworks... -->
  </div>
</div>
```

**What it does:**

- Grid of uploaded artworks
- Each artwork shows:
  - Artwork image
  - Hover overlay with stats
  - Likes count (❤️)
  - Comments count (💬)

**Loading:** Artworks loaded from database by profile-script.js

---

## 6. **Saved Tab** (Lines 122-125)

```html
<div class="tab-content" id="saved-tab">
  <div class="artworks-grid">
    <!-- Saved/bookmarked artworks -->
  </div>
</div>
```

**What it does:**

- Shows artworks user has saved/bookmarked
- Same grid layout as artworks tab

---

## 7. **Tagged Tab** (Lines 127-130)

```html
<div class="tab-content" id="tagged-tab">
  <div class="artworks-grid">
    <!-- Artworks where user is tagged -->
  </div>
</div>
```

**What it does:**

- Shows artworks where user is mentioned
- Same grid layout

---

## 8. **Logout Modal** (Lines 132-147)

```html
<div class="modal" id="logoutModal">
  <div class="modal-content">
    <h3>Logout</h3>
    <p>Are you sure you want to logout?</p>
    <div class="modal-buttons">
      <button class="btn-cancel" id="cancelLogout">Cancel</button>
      <button class="btn-logout" id="confirmLogout">Logout</button>
    </div>
  </div>
</div>
```

**What it does:**

- Popup confirmation when logout clicked
- Two options:
  - **Cancel** → Close modal, stay logged in
  - **Logout** → Confirm logout, go to homepage

---

## User Types Display

### **For Buyers/Collectors:**

```
Profile Picture
Full Name
@username

📊 0 artworks | 24 followers | 18 following

Bio: Art enthusiast and collector
📧 email@example.com
📅 Joined November 2024

[ARTWORKS] [SAVED] [TAGGED]  ← Tabs
(Empty artworks grid - buyers don't upload)
```

### **For Artists:**

```
Profile Picture
Full Name
@username

📊 12 artworks | 156 followers | 45 following

Bio: I create abstract watercolor paintings
📧 artist@example.com
📅 Joined March 2023

[Upload Artwork] button visible!

[ARTWORKS] [SAVED] [TAGGED]  ← Tabs
(Grid showing 12 uploaded artworks)
```

---

## Data Loaded from JavaScript

### User Info (from localStorage):

```javascript
{
    "id": 1,
    "username": "johndoe",
    "full_name": "John Doe",
    "email": "john@example.com",
    "user_type": "artist",
    "bio": "I create abstract art",
    "joined_at": "2023-03-15"
}
```

### Artworks (from database):

```javascript
[
  {
    artwork_id: 1,
    title: "Abstract Dreams",
    image_url: "base64...",
    price: 2500,
    likes: 245,
    comments: 12,
  },
  // More artworks...
];
```

---

## Button Behaviors

### **Edit Profile Button:**

- Opens edit form (future feature)
- Can change: name, bio, email, password, photo

### **Upload Artwork Button:**

- Only visible for **Artists**
- Links to `upload.html`
- Opens artwork upload form

### **Logout Button:**

- Opens confirmation modal
- If confirmed:
  - Clears localStorage
  - Redirects to homepage
  - User must login again

---

## Tab Switching

```
ARTWORKS tab (active)
        ↓ click SAVED
ARTWORKS hidden → SAVED shown
        ↓ click TAGGED
SAVED hidden → TAGGED shown
        ↓ click ARTWORKS
TAGGED hidden → ARTWORKS shown
```

**Animation:** Smooth fade transition (0.3s)

---

## Responsive Design

### **Desktop (>768px):**

- Profile pic and info side-by-side
- 3-column artwork grid

### **Mobile (<768px):**

- Profile pic above info
- Single-column artwork grid
- Stacked stats

---

## Connected Files

- **profile-styles.css** → Styling
- **profile-script.js** → Loads user data, handles logout
- **upload.html** → Upload artwork button links here
- **server.js** → Gets artworks from database
- **localStorage** → Stores user info

---

## In Simple Terms

Think of profile.html as your **artist studio wall**:

- **Profile pic** → Your photo ID
- **Stats** → Your achievements
- **Bio** → Your artist statement
- **Artworks grid** → Your portfolio wall
- **Upload button** → Add new pieces to wall
- **Tabs** → Different sections of your studio

It's your personal space on the website! 🎨👤
