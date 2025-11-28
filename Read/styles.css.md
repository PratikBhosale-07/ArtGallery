# 🎨 styles.css - Homepage Styling Explanation

## What This File Does

This file makes the homepage (index.html) look beautiful! It controls colors, sizes, spacing, animations, and layout.

---

## 1. **Root Variables** (Lines 1-5)

```css
:root {
  --primary-color: #2563eb; /* Blue color */
  --background-color: #eff6ff; /* Light blue background */
  --transition-duration: 0.8s; /* Animation speed */
}
```

**What it does:**

- Stores colors that change automatically
- Blue → Green → Orange → Purple
- Used throughout the page for consistency

---

## 2. **Universal Reset** (Lines 7-11)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**What it does:**

- Removes default spacing from all elements
- Makes sure sizes are calculated properly
- Gives us full control over layout

---

## 3. **Brand Name Font** (Lines 24-27)

```css
.brand-name {
  font-family: "Caveat", cursive; /* Handwritten style */
  font-weight: 700; /* Bold */
  letter-spacing: 0.5px; /* Slight spacing */
}
```

**What it does:**

- Makes "Olunde's" text look handwritten
- Matches the watercolor logo style
- Used in footer and auth page

---

## 4. **Hero Section** (Full-Screen Banner)

```css
.hero-section {
  min-height: 100vh; /* Full screen height */
  background-color: var(--background-color); /* Changes color */
  transition: 0.8s; /* Smooth color change */
}
```

**What it does:**

- Takes up entire screen
- Background color changes with carousel
- Smooth transitions between colors

---

## 5. **Image Carousel** (Slideshow)

```css
.carousel-slide {
  opacity: 0; /* Hidden by default */
  transition: opacity 0.8s; /* Fade in/out */
}

.carousel-slide.active {
  opacity: 1; /* Visible when active */
}
```

**What it does:**

- Hides all slides except the active one
- Creates smooth fade effect
- Changes every 4.5 seconds

---

## 6. **Image Grid Layout**

```css
.image-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 columns */
  gap: 1rem; /* Space between images */
}
```

**What it does:**

- Arranges images in a 6-column grid
- Creates a mosaic effect
- Images have different heights for visual interest

---

## 7. **Gradient Masks** (Fade Effect)

```css
.image-carousel-container::before {
  /* Left side fade to white */
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.image-carousel-container::after {
  /* Right side fade to white */
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
```

**What it does:**

- Makes images fade out at the edges
- Creates a soft, professional look
- Text remains readable over images

---

## 8. **Rotating Text** (Animated Words)

```css
.rotating-text {
  opacity: 0; /* Hidden */
  transform: translateY(20px); /* Slightly below */
  color: var(--primary-color); /* Colored text */
}

.rotating-text.active {
  opacity: 1; /* Visible */
  transform: translateY(0); /* Normal position */
}
```

**What it does:**

- Hides words until they're active
- Slides up and fades in
- Color matches the carousel theme
- Words: "masterpiece", "digital art", "sculpture", "abstract"

---

## 9. **Navigation Bar** (Top Menu)

```css
.navbar {
  position: fixed; /* Stays at top when scrolling */
  background: #ffffff; /* White background */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
```

**What it does:**

- Sticks to top of page
- Semi-transparent white background
- Subtle blur effect (modern look)
- Bottom border for separation

---

## 10. **Logo Styling**

```css
.navbar-logo .logo-img {
  height: 70px; /* Logo size */
  transition: all 0.5s ease; /* Smooth color change */
}

.navbar-logo:hover {
  transform: translateY(-2px); /* Lifts up slightly */
}

.navbar-logo:hover .logo-img {
  filter: brightness(1.1); /* Slightly brighter */
}
```

**What it does:**

- Sets logo size to 70px
- Changes color automatically with carousel
- Lifts up when you hover
- Gets slightly brighter on hover

---

## 11. **Navigation Links**

```css
.navbar-link {
  color: #4b5563; /* Gray text */
  transition: color 0.3s; /* Smooth color change */
}

.navbar-link::after {
  content: "";
  width: 0%; /* Hidden underline */
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s; /* Animates on hover */
}

.navbar-link:hover::after {
  width: 100%; /* Full underline appears */
}
```

**What it does:**

- Gray text that turns colored on hover
- Underline animation appears from left to right
- Smooth 0.3 second transition

---

## 12. **Buttons** (Get Started / Profile)

```css
.navbar-cta {
  background: var(--primary-color); /* Blue background */
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 50px; /* Rounded pill shape */
  transition: all 0.3s ease;
}

.navbar-cta:hover {
  transform: translateY(-2px); /* Lifts up */
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3); /* Shadow */
}
```

**What it does:**

- Creates pill-shaped buttons
- Background color matches carousel theme
- Lifts up and adds shadow on hover
- Smooth animations

---

## 13. **Profile Button**

```css
.profile-button {
  display: flex; /* Icon + text side-by-side */
  align-items: center;
  gap: 0.5rem; /* Space between icon & text */
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50px;
}
```

**What it does:**

- Shows user icon and "Profile" text
- Same style as other buttons
- Only visible when user is logged in

---

## 14. **Carousel Pagination** (Dots)

```css
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%; /* Circular */
  background: rgba(255, 255, 255, 0.5); /* Light gray */
  transition: all 0.3s ease;
}

.dot.active {
  background: var(--primary-color); /* Colored */
  width: 30px; /* Longer */
  border-radius: 5px; /* Pill shape */
}
```

**What it does:**

- Shows 4 dots at bottom of carousel
- Active dot is colored and longer
- Click dots to jump to specific slide

---

## 15. **Artists Grid**

```css
.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
```

**What it does:**

- Creates responsive grid of artist cards
- Minimum 280px per card
- Adjusts columns based on screen size
- 2rem space between cards

---

## 16. **Artist Card Hover Effect**

```css
.artist-card {
  transition: transform 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.artist-card:hover {
  transform: translateY(-10px); /* Lifts up 10px */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); /* Bigger shadow */
}
```

**What it does:**

- Cards lift up when you hover
- Shadow gets bigger and darker
- Creates "floating" effect

---

## 17. **Category Cards**

```css
.category-card {
  background: linear-gradient(135deg, #667eea, #764ba2); /* Purple gradient */
  color: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
}
```

**What it does:**

- Beautiful gradient backgrounds
- White text on colored background
- Rounded corners
- Centered content

---

## 18. **Artwork Cards**

```css
.artwork-card img {
  width: 100%;
  height: 300px;
  object-fit: cover; /* Crops to fit */
  border-radius: 12px; /* Rounded corners */
}

.artwork-card:hover img {
  transform: scale(1.05); /* Zooms in slightly */
}
```

**What it does:**

- Images fill card space
- Consistent 300px height
- Slight zoom on hover
- Smooth transition

---

## 19. **Footer**

```css
.footer {
  background: #1f2937; /* Dark gray */
  color: white;
  padding: 4rem 2rem 2rem;
}

.footer-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}
```

**What it does:**

- Dark background with white text
- Shows company info and statistics
- Flexible layout for stats
- Lots of padding for breathing room

---

## 20. **Responsive Design** (Mobile)

```css
@media (max-width: 768px) {
  .navbar-menu {
    display: none; /* Hide menu on mobile */
  }

  .artists-grid {
    grid-template-columns: 1fr; /* Single column */
  }

  .hero-heading {
    font-size: 2.5rem; /* Smaller text */
  }
}
```

**What it does:**

- Adjusts layout for small screens
- Stacks cards vertically
- Reduces font sizes
- Optimized for phones and tablets

---

## Color Themes (Auto-Changing)

| Theme       | Primary Color    | Background   | Logo        |
| ----------- | ---------------- | ------------ | ----------- |
| Masterpiece | Blue (#2563eb)   | Light Blue   | Blue Logo   |
| Digital Art | Green (#10b981)  | Light Green  | Green Logo  |
| Sculpture   | Orange (#f59e0b) | Light Orange | Orange Logo |
| Abstract    | Purple (#8b5cf6) | Light Purple | Purple Logo |

---

## Animation Timeline

```
0s    → Blue theme (Masterpiece)
4.5s  → Green theme (Digital Art)
9s    → Orange theme (Sculpture)
13.5s → Purple theme (Abstract)
18s   → Back to Blue (repeats)
```

---

## In Simple Terms

Think of styles.css as the **interior designer** of the website:

- **Colors** → Like choosing paint colors for walls
- **Layout** → Like arranging furniture in rooms
- **Animations** → Like adding moving decorations
- **Responsive** → Like furniture that adjusts for different room sizes

It makes everything look professional, modern, and visually appealing! 🎨✨
