# 📜 script.js - Homepage JavaScript Explanation

## What This File Does

This file makes the homepage interactive! It controls the carousel, logo changes, user authentication, and navigation.

---

## 1. **API Configuration** (Lines 1-2)

```javascript
const API_BASE_URL = "http://localhost:3001/api/";
```

**What it does:**

- Stores the server address
- Used for all database requests
- Easy to change if server moves

---

## 2. **Fetch Artworks from Database** (Lines 4-25)

```javascript
async function fetchArtworksFromDB(category = null) {
  const url = category
    ? `${API_BASE_URL}artworks?category=${category}`
    : `${API_BASE_URL}artworks`;

  const response = await fetch(url);
  const result = await response.json();

  if (result.success) {
    return result.data.map((art) => ({
      id: art.art_id,
      title: art.title,
      artist: art.artist_name,
      price: `$${parseFloat(art.price).toFixed(2)}`,
      image: art.image_url,
    }));
  }
  return [];
}
```

**What it does:**

- Fetches artworks from MySQL database
- Can filter by category (abstract, digital, etc.)
- Converts database format to display format
- Returns empty array if there's an error

**Simple explanation:** Like asking the database "Give me all paintings" or "Give me only abstract art"

---

## 3. **Fetch Artists from Database** (Lines 27-42)

```javascript
async function fetchArtistsFromDB() {
  const response = await fetch(`${API_BASE_URL}artists`);
  const result = await response.json();

  if (result.success) {
    return result.data;
  }
  return [];
}
```

**What it does:**

- Gets list of all artists from database
- Returns artist info (name, bio, photo, etc.)
- Used to display Featured Artists section

**Simple explanation:** Like getting a phone book of all artists

---

## 4. **Fallback Art Data** (Lines 44-90)

```javascript
const artsByCategory = {
    abstract: [
        { id: 1, title: "Abstract Dreams", artist: "Sophie Chen", price: "$3,200", ... },
        { id: 2, title: "Color Symphony", artist: "Sophie Chen", price: "$1,800", ... }
    ],
    digital: [...],
    sculpture: [...],
    // etc.
};
```

**What it does:**

- Backup artwork data if database is offline
- Organized by category
- Contains sample artworks for testing

**Simple explanation:** Like having a printed catalog when the computer is down

---

## 5. **Carousel Configuration** (Lines 92-106)

```javascript
const slides = [
  {
    text: "masterpiece",
    primaryColor: "#2563eb", // Blue
    backgroundColor: "#eff6ff", // Light blue
  },
  {
    text: "digital art",
    primaryColor: "#10b981", // Green
    backgroundColor: "#ecfdf5", // Light green
  },
  {
    text: "sculpture",
    primaryColor: "#f59e0b", // Orange
    backgroundColor: "#fffbeb", // Light orange
  },
  {
    text: "abstract",
    primaryColor: "#8b5cf6", // Purple
    backgroundColor: "#f5f3ff", // Light purple
  },
];
```

**What it does:**

- Defines 4 carousel slides
- Each slide has: text, primary color, background color
- Used to synchronize all color changes

**Simple explanation:** Like a script for a color-changing light show

---

## 6. **Carousel Variables** (Lines 108-118)

```javascript
const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds
let currentIndex = 0;
let autoplayTimer = null;

const rotatingTexts = document.querySelectorAll(".rotating-text");
const dots = document.querySelectorAll(".dot");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const root = document.documentElement;
```

**What it does:**

- Sets autoplay speed (4.5 seconds)
- Tracks which slide is showing
- Gets all carousel elements from HTML
- Stores reference to page root for CSS changes

**Simple explanation:** Like setting up the controls for a TV remote

---

## 7. **Update Slide Function** (Lines 120-151)

```javascript
function updateSlide(index) {
  currentIndex = index;

  // Update rotating text
  rotatingTexts.forEach((text, i) => {
    if (i === index) {
      text.classList.add("active"); // Show this text
    } else {
      text.classList.remove("active"); // Hide other texts
    }
  });

  // Update pagination dots
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active"); // Highlight this dot
    } else {
      dot.classList.remove("active"); // Un-highlight other dots
    }
  });

  // Update image carousel
  carouselSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active"); // Show images
    } else {
      slide.classList.remove("active"); // Hide other images
    }
  });

  // Update CSS color variables
  const currentSlide = slides[index];
  root.style.setProperty("--primary-color", currentSlide.primaryColor);
  root.style.setProperty("--background-color", currentSlide.backgroundColor);
}
```

**What it does:**

- Updates everything when slide changes:
  - ✅ Rotating text (masterpiece → digital art → etc.)
  - ✅ Pagination dots (highlights active one)
  - ✅ Background images
  - ✅ Colors throughout entire page

**Simple explanation:** Like a conductor leading an orchestra - everything changes at once

---

## 8. **Next Slide Function** (Lines 153-156)

```javascript
function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  updateSlide(nextIndex);
}
```

**What it does:**

- Moves to next slide
- Goes back to start after last slide (loops)
- Called automatically every 4.5 seconds

**Simple explanation:** Like pressing the "Next" button on a slideshow

---

## 9. **Autoplay Controls** (Lines 158-177)

```javascript
function startAutoplay() {
  stopAutoplay(); // Clear any existing timer
  autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}
```

**What it does:**

- **startAutoplay()**: Begins automatic slide changes
- **stopAutoplay()**: Pauses automatic changes
- **resetAutoplay()**: Restarts the timer

**Simple explanation:** Like the play/pause/restart buttons on a video player

---

## 10. **Dot Click Handlers** (Lines 179-184)

```javascript
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateSlide(index);
    resetAutoplay(); // Restart timer after manual click
  });
});
```

**What it does:**

- Makes dots clickable
- Jumps to specific slide when dot is clicked
- Restarts autoplay timer

**Simple explanation:** Like chapter selection on a DVD - click any dot to jump to that slide

---

## 11. **Pause on Hover** (Lines 186-189)

```javascript
const heroSection = document.querySelector(".hero-section");
heroSection.addEventListener("mouseenter", stopAutoplay);
heroSection.addEventListener("mouseleave", startAutoplay);
```

**What it does:**

- Pauses carousel when mouse hovers over it
- Resumes when mouse leaves
- Lets users read without slides changing

**Simple explanation:** Like pausing a book slideshow when you point at it

---

## 12. **Start Everything** (Lines 191-194)

```javascript
// Initialize
updateSlide(0);
startAutoplay();
```

**What it does:**

- Shows first slide (blue/masterpiece)
- Starts automatic rotation
- Runs when page loads

**Simple explanation:** Like pressing "Start" on the carousel

---

## 13. **Check Login Status** (Lines 196-220)

```javascript
const isLoggedIn = localStorage.getItem("isLoggedIn");
const userData = localStorage.getItem("user");

if (isLoggedIn === "true" && userData) {
  // Show profile button
  document.getElementById("getStartedBtn").style.display = "none";
  document.getElementById("profileBtn").style.display = "flex";
} else {
  // Show get started button
  document.getElementById("getStartedBtn").style.display = "inline-block";
  document.getElementById("profileBtn").style.display = "none";
}
```

**What it does:**

- Checks if user is logged in
- Shows "Profile" button if logged in
- Shows "Get Started" button if not logged in
- Reads from browser's localStorage

**Simple explanation:** Like checking if someone has a membership card

---

## 14. **Profile Button Handler** (Lines 222-226)

```javascript
document.getElementById("profileBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "profile.html";
});
```

**What it does:**

- Makes profile button clickable
- Goes to profile page when clicked
- Only works if button exists

**Simple explanation:** Like a "Go to My Account" button

---

## 15. **Get Started Button Handler** (Lines 228-232)

```javascript
document.getElementById("getStartedBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "auth.html";
});
```

**What it does:**

- Makes "Get Started" button clickable
- Goes to login/signup page when clicked
- Only works if button exists

**Simple explanation:** Like a "Sign Up Here" button

---

## 16. **Display Artists** (Lines 234-276)

```javascript
async function displayArtists() {
  const artistsFromDB = await fetchArtistsFromDB();
  const artistsGrid = document.querySelector(".artists-grid");

  if (!artistsGrid) return;

  const artistsHTML = artistsFromDB
    .map(
      (artist) => `
        <div class="artist-card">
            <img src="${artist.profile_image}" alt="${artist.username}">
            <h3>${artist.full_name}</h3>
            <p>${artist.bio || "Artist"}</p>
            <button class="btn-primary">View Gallery</button>
        </div>
    `
    )
    .join("");

  artistsGrid.innerHTML = artistsHTML;
}
```

**What it does:**

- Gets artists from database
- Creates HTML for each artist card
- Shows: photo, name, bio, button
- Adds cards to page

**Simple explanation:** Like making artist trading cards and displaying them

---

## 17. **Display Artworks** (Lines 278-320)

```javascript
async function displayArtworks() {
  const artworksFromDB = await fetchArtworksFromDB();
  const artworksGrid = document.querySelector(".artworks-grid");

  if (!artworksGrid) return;

  const artworksHTML = artworksFromDB
    .map(
      (art) => `
        <div class="artwork-card">
            <img src="${art.image}" alt="${art.title}">
            <h3>${art.title}</h3>
            <p class="artist">by ${art.artist}</p>
            <p class="price">${art.price}</p>
            <button class="btn-primary">View Details</button>
        </div>
    `
    )
    .join("");

  artworksGrid.innerHTML = artworksHTML;
}
```

**What it does:**

- Gets artworks from database
- Creates HTML for each artwork card
- Shows: image, title, artist, price
- Adds cards to page

**Simple explanation:** Like creating price tags for paintings in a gallery

---

## 18. **Category Filters** (Lines 322-345)

```javascript
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", async () => {
    const category = card.dataset.category;
    const artworks = await fetchArtworksFromDB(category);
    displayFilteredArtworks(artworks);
  });
});
```

**What it does:**

- Makes category cards clickable
- Filters artworks when clicked
- Shows only artworks in that category

**Simple explanation:** Like clicking "Abstract" to see only abstract art

---

## 19. **Initialize Page** (Lines 347-351)

```javascript
// Load data when page loads
document.addEventListener("DOMContentLoaded", () => {
  displayArtists();
  displayArtworks();
});
```

**What it does:**

- Waits for page to fully load
- Then loads artists and artworks from database
- Runs automatically

**Simple explanation:** Like turning on the lights when you enter a room

---

## How Everything Works Together

```
1. Page loads
   ↓
2. script.js runs
   ↓
3. Check if user logged in
   ↓
4. Show correct button (Profile or Get Started)
   ↓
5. Start carousel (slide 1: Blue/Masterpiece)
   ↓
6. Fetch artists from database
   ↓
7. Display artist cards
   ↓
8. Fetch artworks from database
   ↓
9. Display artwork cards
   ↓
10. Every 4.5 seconds:
    - Change slide
    - Change colors
    - Change text
    - Change logo
```

---

## Key Features

| Feature               | How It Works                                |
| --------------------- | ------------------------------------------- |
| **Auto Carousel**     | Changes every 4.5 seconds automatically     |
| **Manual Navigation** | Click dots to jump to slides                |
| **Pause on Hover**    | Stops when you hover over it                |
| **Color Sync**        | Everything changes color together           |
| **Logo Change**       | Logo color matches slide theme              |
| **Login Detection**   | Shows different buttons for guests vs users |
| **Database Loading**  | Gets real data from MySQL                   |
| **Category Filter**   | Click categories to filter artworks         |

---

## In Simple Terms

Think of script.js as the **brain** of the homepage:

- **Carousel** → Like a slideshow controller
- **Color changes** → Like a smart lighting system
- **Login check** → Like a security guard checking IDs
- **Database loading** → Like a librarian fetching books
- **Button clicks** → Like a doorbell that responds when pressed

It makes the page come alive and respond to what you do! 🎨🚀
