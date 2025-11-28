# 📄 index.html - Homepage Explanation

## What This File Does

This is the main landing page of Olunde's Art Gallery website. It's the first page visitors see when they arrive.

---

## Main Sections

### 1. **Head Section** (Lines 1-13)

```html
<head>
  <title>Olunde's - Discover Unique Artworks</title>
  <link href="...Caveat font..." rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
```

**What it does:**

- Sets the page title (shown in browser tab)
- Loads the Caveat font (handwritten style for "Olunde's")
- Connects to the CSS file for styling

---

### 2. **Navigation Bar** (Top Menu)

```html
<nav class="navbar">
  <a href="#home" class="navbar-logo">
    <img src="logo/logo-blue.png" alt="Olunde's Art Gallery" />
  </a>
  <ul class="navbar-menu">
    <li>Home, Artists, Categories, Contact</li>
    <li>Profile Button / Get Started Button</li>
  </ul>
</nav>
```

**What it does:**

- Shows the Olunde's logo (changes color automatically)
- Menu links to jump to different sections
- Shows "Get Started" button for guests
- Shows "Profile" button for logged-in users

---

### 3. **Hero Section** (Big Banner with Carousel)

```html
<section class="hero-section">
  <!-- Background Image Carousel -->
  <div class="image-carousel-container">
    <div class="carousel-slide active">
      <!-- Masterpiece images -->
    </div>
    <div class="carousel-slide">
      <!-- Digital art images -->
    </div>
    <div class="carousel-slide">
      <!-- Sculpture images -->
    </div>
    <div class="carousel-slide">
      <!-- Abstract images -->
    </div>
  </div>

  <!-- Main Text -->
  <div class="hero-content">
    <h1>Discover</h1>
    <h1>your next</h1>
    <!-- Rotating words: masterpiece, digital art, sculpture, abstract -->
  </div>

  <!-- Dots for navigation -->
  <div class="carousel-pagination">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</section>
```

**What it does:**

- Shows a full-screen image slideshow that changes automatically
- Displays rotating text: "masterpiece", "digital art", "sculpture", "abstract"
- Changes colors every 4.5 seconds (blue → green → orange → purple)
- Logo changes color to match the theme
- Dots at bottom show which slide is active

---

### 4. **Featured Artists Section**

```html
<section class="featured-section">
  <h2>Featured Artists</h2>
  <div class="artists-grid">
    <div class="artist-card">
      <img src="artist-image.jpg" />
      <h3>Artist Name</h3>
      <p>Specialty</p>
      <button>View Gallery</button>
    </div>
    <!-- More artist cards... -->
  </div>
</section>
```

**What it does:**

- Shows a grid of featured artists
- Each card has artist photo, name, specialty
- "View Gallery" button to see their work
- Loaded from database (artists table)

---

### 5. **Artwork Categories Section**

```html
<section class="categories-section">
  <h2>Browse by Category</h2>
  <div class="category-grid">
    <div class="category-card">
      <h3>Abstract Art</h3>
      <p>120 pieces</p>
      <button>Explore</button>
    </div>
    <!-- More categories: Digital Art, Sculpture, etc. -->
  </div>
</section>
```

**What it does:**

- Shows different art categories (Abstract, Digital, Sculpture, etc.)
- Each card shows how many artworks are in that category
- Click "Explore" to filter artworks by category

---

### 6. **Featured Artworks Section**

```html
<section class="artworks-section">
  <h2>Trending Artworks</h2>
  <div class="artworks-grid">
    <div class="artwork-card">
      <img src="artwork.jpg" />
      <h3>Title</h3>
      <p class="artist">Artist Name</p>
      <p class="price">$2,500</p>
      <button>View Details</button>
    </div>
    <!-- More artworks... -->
  </div>
</section>
```

**What it does:**

- Displays a grid of featured artworks
- Shows artwork image, title, artist, price
- "View Details" button to see more info
- Artworks loaded from database

---

### 7. **Footer Section**

```html
<footer class="footer">
  <div class="footer-about">
    <h3 class="brand-name">Olunde's</h3>
    <p>A premier online marketplace connecting talented artists...</p>
    <div class="footer-stats">
      <span>10K+ Artworks</span>
      <span>5K+ Artists</span>
      <span>20K+ Collectors</span>
    </div>
  </div>

  <div class="footer-links">
    <h4>Quick Links</h4>
    <ul>
      <li>Browse Art</li>
      <li>Featured Artists</li>
      <li>Categories</li>
    </ul>
  </div>

  <div class="footer-social">
    <h4>Connect With Us</h4>
    <!-- Social media links -->
  </div>

  <div class="footer-bottom">
    <p>&copy; 2025 Olunde's. All rights reserved.</p>
  </div>
</footer>
```

**What it does:**

- Shows company information
- Statistics (10K+ artworks, 5K+ artists, etc.)
- Quick links to important pages
- Social media icons
- Copyright information

---

## How The Page Flows

1. **User visits website** → Sees navbar and hero section
2. **Carousel auto-plays** → Images and colors change every 4.5 seconds
3. **Logo changes color** → Matches the carousel theme
4. **User scrolls down** → Sees artists, categories, artworks
5. **User clicks "Get Started"** → Goes to login/signup page
6. **Logged-in users** → See "Profile" button in navbar

---

## Dynamic Features

### Auto-Changing Elements:

- **Images**: Background carousel rotates automatically
- **Text**: "masterpiece", "digital art", "sculpture", "abstract" rotate
- **Colors**: Blue → Green → Orange → Purple (every 4.5 seconds)
- **Logo**: Changes to match color theme

### Interactive Elements:

- **Navbar links**: Jump to sections when clicked
- **Carousel dots**: Click to manually change slide
- **Hover effects**: Cards lift up when you hover over them
- **Buttons**: All buttons have hover animations

---

## Connection to Other Files

- **styles.css** → Makes everything look pretty
- **script.js** → Makes carousel rotate and logo change
- **auth.html** → "Get Started" button links here
- **profile.html** → "Profile" button links here
- **server.js** → Loads artists and artworks from database

---

## In Simple Terms

Think of index.html as the **welcome page** of an art museum:

- The hero section is like a **big rotating display** showing different art styles
- The artists section is like **meeting the artists** in person
- The categories section is like **different rooms** in the museum
- The footer is like the **information desk** with contact details

Everything is organized to make visitors excited about art and want to explore more! 🎨
