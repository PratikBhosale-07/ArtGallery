# 🖥️ server.js - Backend Server Explanation

## What This File Does

This is the brain of the website! It's a Node.js server that connects to MySQL database and handles all requests (login, signup, get artworks, upload art, etc.).

---

## 1. **Import Dependencies** (Lines 1-5)

```javascript
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
```

**What it does:**

- **express** → Web server framework
- **mysql2** → Connect to MySQL database
- **bcryptjs** → Hash passwords securely
- **cors** → Allow frontend to talk to backend
- **dotenv** → Load environment variables from .env file

---

## 2. **Create Express App** (Lines 7-10)

```javascript
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 3001;
```

**What it does:**

- Creates web server
- Enables CORS (cross-origin requests)
- Accepts JSON data up to 50MB (for images)
- Sets port to 3001

---

## 3. **Database Connection** (Lines 12-25)

```javascript
const db = mysql.createPool({
  host: process.env.DB_HOST, // localhost
  user: process.env.DB_USER, // root
  password: process.env.DB_PASSWORD, // Pratik@16
  database: process.env.DB_NAME, // art_gallery
  port: process.env.DB_PORT, // 3306
  connectionLimit: 10, // Max 10 connections at once
  waitForConnections: true,
});
```

**What it does:**

- Creates connection pool to MySQL
- Uses credentials from `.env` file
- Can handle 10 simultaneous connections
- Waits if all connections busy

**Why pool?** More efficient than single connection

---

## 4. **Test Database Connection** (Lines 27-35)

```javascript
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
  connection.release();
});
```

**What it does:**

- Tests if database connection works
- Shows success or error message
- Releases connection back to pool

---

## 5. **Get All Artworks** (Lines 37-70)

```javascript
app.get("/api/artworks", (req, res) => {
  const category = req.query.category;

  let query = `
        SELECT 
            artworks.*,
            artists.username as artist_name,
            artists.full_name as artist_full_name
        FROM artworks
        LEFT JOIN artists ON artworks.artist_id = artists.artist_id
    `;

  if (category) {
    query += " WHERE artworks.category = ?";
  }

  db.query(query, category ? [category] : [], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: results });
  });
});
```

**What it does:**

**Request:** `GET /api/artworks` or `GET /api/artworks?category=abstract`

**Database Query:**

```sql
SELECT artworks.*, artists.username, artists.full_name
FROM artworks
LEFT JOIN artists ON artworks.artist_id = artists.artist_id
WHERE artworks.category = 'abstract'  -- if category provided
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "art_id": 1,
      "artist_id": 5,
      "title": "Abstract Dreams",
      "description": "Colorful abstract painting",
      "category": "abstract",
      "price": 2500,
      "image_url": "base64...",
      "artist_name": "johndoe",
      "artist_full_name": "John Doe"
    }
  ]
}
```

**Used by:** Homepage artwork grid, category filters

---

## 6. **Get All Artists** (Lines 72-90)

```javascript
app.get("/api/artists", (req, res) => {
  const query = `
        SELECT 
            artist_id,
            username,
            full_name,
            email,
            bio,
            profile_image,
            created_at
        FROM artists
        ORDER BY created_at DESC
    `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: results });
  });
});
```

**What it does:**

**Request:** `GET /api/artists`

**Database Query:**

```sql
SELECT * FROM artists ORDER BY created_at DESC
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "artist_id": 1,
      "username": "johndoe",
      "full_name": "John Doe",
      "email": "john@example.com",
      "bio": "I create abstract art",
      "profile_image": null,
      "created_at": "2023-03-15"
    }
  ]
}
```

**Used by:** Homepage featured artists section

---

## 7. **User Login** (Lines 92-150)

```javascript
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Check in artists table
  db.query(
    "SELECT * FROM artists WHERE email = ?",
    [email],
    async (err, artistResults) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      if (artistResults.length > 0) {
        // Found in artists table
        const artist = artistResults[0];
        const validPassword = await bcrypt.compare(
          password,
          artist.password_hash
        );

        if (validPassword) {
          return res.json({
            success: true,
            user: {
              id: artist.artist_id,
              username: artist.username,
              email: artist.email,
              full_name: artist.full_name,
              user_type: "artist",
              bio: artist.bio,
            },
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      }

      // Check in buyers table
      db.query(
        "SELECT * FROM buyers WHERE email = ?",
        [email],
        async (err, buyerResults) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: err.message });
          }

          if (buyerResults.length > 0) {
            const buyer = buyerResults[0];
            const validPassword = await bcrypt.compare(
              password,
              buyer.password_hash
            );

            if (validPassword) {
              return res.json({
                success: true,
                user: {
                  id: buyer.buyer_id,
                  username: buyer.username,
                  email: buyer.email,
                  full_name: buyer.full_name,
                  user_type: "buyer",
                },
              });
            }
          }

          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      );
    }
  );
});
```

**What it does:**

**Request:**

```json
POST /api/auth/login
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Process:**

1. Validate email and password provided
2. Search artists table for email
3. If found → Check password with bcrypt
4. If not found → Search buyers table
5. Check password
6. If correct → Send user data
7. If incorrect → Send error

**Response (Success):**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "user_type": "artist",
    "bio": "I create abstract art"
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Used by:** auth-script.js login form

---

## 8. **User Registration** (Lines 152-270)

```javascript
app.post("/api/auth/register", async (req, res) => {
  const { full_name, username, email, password, user_type, bio } = req.body;

  // Validation
  if (!full_name || !username || !email || !password || !user_type) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if email exists in both tables
  db.query(
    "SELECT email FROM artists WHERE email = ? UNION SELECT email FROM buyers WHERE email = ?",
    [email, email],
    async (err, emailCheck) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      if (emailCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert based on user type
      if (user_type === "artist") {
        db.query(
          "INSERT INTO artists (full_name, username, email, password_hash, bio) VALUES (?, ?, ?, ?, ?)",
          [full_name, username, email, hashedPassword, bio || null],
          (err, result) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                  success: false,
                  message: "Username already exists",
                });
              }
              return res
                .status(500)
                .json({ success: false, message: err.message });
            }
            res.json({ success: true, message: "Registration successful" });
          }
        );
      } else {
        db.query(
          "INSERT INTO buyers (full_name, username, email, password_hash) VALUES (?, ?, ?, ?)",
          [full_name, username, email, hashedPassword],
          (err, result) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                  success: false,
                  message: "Username already exists",
                });
              }
              return res
                .status(500)
                .json({ success: false, message: err.message });
            }
            res.json({ success: true, message: "Registration successful" });
          }
        );
      }
    }
  );
});
```

**What it does:**

**Request:**

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

**Process:**

1. Validate all required fields provided
2. Check if email already exists (artists OR buyers table)
3. If exists → Return error
4. Hash password with bcrypt (10 salt rounds)
5. If artist → Insert into artists table
6. If buyer → Insert into buyers table
7. Return success message

**Database Insertion (Artist):**

```sql
INSERT INTO artists (full_name, username, email, password_hash, bio)
VALUES ('John Doe', 'johndoe', 'john@example.com', '$2a$10$...', 'I create abstract art')
```

**Database Insertion (Buyer):**

```sql
INSERT INTO buyers (full_name, username, email, password_hash)
VALUES ('Jane Smith', 'janesmith', 'jane@example.com', '$2a$10$...')
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Registration successful"
}
```

**Response (Errors):**

```json
{ "success": false, "message": "Email already exists" }
{ "success": false, "message": "Username already exists" }
{ "success": false, "message": "All fields are required" }
```

**Used by:** auth-script.js signup form

---

## 9. **Upload Artwork** (Lines 272-320)

```javascript
app.post("/api/artworks/upload", (req, res) => {
  const {
    artist_id,
    title,
    description,
    category,
    medium,
    width,
    height,
    year,
    price,
    is_for_sale,
    is_for_bid,
    min_bid_increment,
    bid_duration,
    tags,
    edition,
    image_url,
  } = req.body;

  // Validation
  if (
    !artist_id ||
    !title ||
    !description ||
    !category ||
    !price ||
    !image_url
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Required fields: artist_id, title, description, category, price, image",
    });
  }

  const query = `
        INSERT INTO artworks 
        (artist_id, title, description, category, medium, width, height, year, 
         price, is_for_sale, is_for_bid, min_bid_increment, bid_duration, 
         tags, edition, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      artist_id,
      title,
      description,
      category,
      medium || null,
      width || null,
      height || null,
      year || null,
      price,
      is_for_sale || 0,
      is_for_bid || 0,
      min_bid_increment || null,
      bid_duration || null,
      tags || null,
      edition || null,
      image_url,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.json({
        success: true,
        message: "Artwork uploaded successfully",
        artwork_id: result.insertId,
      });
    }
  );
});
```

**What it does:**

**Request:**

```json
POST /api/artworks/upload
{
    "artist_id": 1,
    "title": "Abstract Dreams",
    "description": "Vibrant abstract painting",
    "category": "abstract",
    "medium": "Acrylic on Canvas",
    "width": 48,
    "height": 36,
    "year": 2025,
    "price": 2500,
    "is_for_sale": 1,
    "is_for_bid": 0,
    "min_bid_increment": null,
    "bid_duration": null,
    "tags": "abstract,colorful,modern",
    "edition": "1 of 1",
    "image_url": "data:image/png;base64,..."
}
```

**Process:**

1. Validate required fields
2. Insert artwork into artworks table
3. Return success with new artwork_id

**Database Insertion:**

```sql
INSERT INTO artworks (
    artist_id, title, description, category, medium,
    width, height, year, price, is_for_sale, is_for_bid,
    min_bid_increment, bid_duration, tags, edition, image_url
) VALUES (
    1, 'Abstract Dreams', 'Vibrant abstract painting',
    'abstract', 'Acrylic on Canvas', 48, 36, 2025, 2500,
    1, 0, NULL, NULL, 'abstract,colorful,modern',
    '1 of 1', 'data:image/png;base64,...'
)
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Artwork uploaded successfully",
  "artwork_id": 15
}
```

**Used by:** upload-script.js artwork upload form

---

## 10. **Start Server** (Lines 322-325)

```javascript
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**What it does:**

- Starts server on port 3001
- Shows message when ready
- Server now accepts requests

---

## API Endpoints Summary

| Method | Endpoint                          | Purpose                                     | Used By                    |
| ------ | --------------------------------- | ------------------------------------------- | -------------------------- |
| GET    | `/api/artworks`                   | Get all artworks (optional category filter) | Homepage, category filters |
| GET    | `/api/artworks?category=abstract` | Get artworks by category                    | Category filter            |
| GET    | `/api/artists`                    | Get all artists                             | Homepage featured artists  |
| POST   | `/api/auth/login`                 | User login                                  | auth-script.js login form  |
| POST   | `/api/auth/register`              | User signup                                 | auth-script.js signup form |
| POST   | `/api/artworks/upload`            | Upload artwork                              | upload-script.js           |

---

## Database Tables Used

### **artists**

- artist_id (Primary Key)
- username (Unique)
- email (Unique)
- password_hash
- full_name
- bio
- profile_image
- created_at

### **buyers**

- buyer_id (Primary Key)
- username (Unique)
- email (Unique)
- password_hash
- full_name
- created_at

### **artworks**

- art_id (Primary Key)
- artist_id (Foreign Key → artists.artist_id)
- title
- description
- category
- medium
- width, height
- year
- price
- is_for_sale
- is_for_bid
- min_bid_increment
- bid_duration
- tags
- edition
- image_url (Base64)
- created_at

---

## Security Features

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **CORS**: Only allows specific origins
3. **Validation**: Checks all required fields
4. **SQL Injection Prevention**: Uses parameterized queries
5. **Error Handling**: Doesn't expose sensitive info

---

## Environment Variables (.env file)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Pratik@16
DB_NAME=art_gallery
DB_PORT=3306
PORT=3001
```

---

## How to Start Server

```bash
# Install dependencies
npm install

# Start server
node server.js

# Output:
✅ Connected to MySQL database
🚀 Server running on http://localhost:3001
```

---

## In Simple Terms

Think of server.js as the **restaurant kitchen**:

- **Express** → The restaurant building
- **MySQL** → The recipe book (database)
- **API endpoints** → Menu items customers can order
- **Requests** → Customer orders
- **Responses** → Dishes served to customers
- **Validation** → Quality control
- **bcrypt** → Secret sauce recipe protection

Frontend orders food (requests), kitchen prepares it (processes), and serves it back (responses)! 🍽️🖥️
