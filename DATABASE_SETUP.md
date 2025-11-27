# Art Gallery - Database Setup Guide

## Prerequisites

- Node.js (v14 or higher) - Download from https://nodejs.org/
- MySQL Server installed and running
- npm (comes with Node.js)

## Installation Steps

### 1. Install Node.js

Download and install Node.js from: https://nodejs.org/  
This will also install npm (Node Package Manager)

Verify installation:

```bash
node --version
npm --version
```

### 2. Install MySQL

Download and install MySQL Server from: https://dev.mysql.com/downloads/mysql/  
Or use MySQL Workbench for easier management

### 3. Install Project Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install:

- `express` - Web framework
- `mysql2` - MySQL database driver
- `cors` - Enable Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `bcryptjs` - Password hashing

### 4. Configure Database Connection

Edit the `.env` file in the project root and update these values if needed:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=art_gallery
DB_PORT=3306
PORT=3000
```

**Note:** If your MySQL has a password, add it to `DB_PASSWORD`

### 5. Database is Already Created

Your database `art_gallery` is already set up with the following tables:

- `artists` - Store artist information
- `artworks` - Store artwork details
- `buyers` - Store buyer/customer information
- `admin` - Store admin user accounts

## Project Structure

```
ARTIST/
├── index.html              # Main website file
├── styles.css              # All styles
├── script.js               # Frontend JavaScript
├── server.js               # Node.js Express server with API routes
├── package.json            # Node.js dependencies
├── .env                    # Environment variables (database config)
├── .gitignore              # Git ignore file
└── logo/                   # Logo images
```

## Running the Website

### 1. Start MySQL Server

Make sure MySQL is running on your system

### 2. Start the Node.js Server

Open terminal in the project folder and run:

**For production:**

```bash
npm start
```

**For development (auto-restart on file changes):**

```bash
npm run dev
```

You should see:

```
Server is running on http://localhost:3000
Access the website at http://localhost:3000/index.html
Connected to MySQL database
```

### 3. Access the Website

Open your browser and go to:

```
http://localhost:3000/index.html
```

## API Endpoints

All API endpoints are now served by the Node.js Express server.

### Get All Artworks

```
GET http://localhost:3000/api/artworks
```

### Get Artworks by Category

```
GET http://localhost:3000/api/artworks?category=abstract
```

Categories: abstract, digital, sculpture, contemporary, photography, mixed

### Get All Artists

```
GET http://localhost:3000/api/artists
```

Response includes artist info and artwork count for each artist.

### Get Artwork Details

```
GET http://localhost:3000/api/artwork/1
```

Replace `1` with the artwork ID.

### Login

```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

Body: {
    "username": "user",
    "password": "password"
}
```

Works for buyers, artists, and admin accounts.

### Register

```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

Body: {
    "full_name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "user_type": "buyer"
}
```

`user_type` can be `"buyer"` or `"artist"` (defaults to `"buyer"`)

## Adding Sample Data

You can add sample data directly through MySQL Workbench or via command line.

### Add Sample Artists

**Note:** For testing, use the Registration API or hash passwords properly.

For quick testing with bcrypt-hashed password "password123":

```sql
INSERT INTO artists (full_name, username, email, password_hash, bio, profile_photo) VALUES
('Marcus Rivera', 'marcus_rivera', 'marcus@artgallery.com', '$2a$10$YourBcryptHashedPasswordHere', 'Contemporary digital artist specializing in landscapes', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'),
('Sophie Chen', 'sophie_chen', 'sophie@artgallery.com', '$2a$10$YourBcryptHashedPasswordHere', 'Abstract and mixed media artist', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'),
('Alex Thompson', 'alex_thompson', 'alex@artgallery.com', '$2a$10$YourBcryptHashedPasswordHere', 'Sculptor and 3D artist', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e');
```

**Better approach:** Use the Registration API endpoint to create users with properly hashed passwords.

### Add Sample Artworks

```sql
INSERT INTO artworks (artist_id, title, description, category, image_url, price, is_for_sale, is_for_bid) VALUES
(1, 'Eternal Sunset', 'A breathtaking digital landscape capturing the serene beauty of twilight', 'digital', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5', 2500.00, 1, 1),
(2, 'Abstract Dreams', 'An explosion of vibrant colors and flowing forms that evoke emotion', 'abstract', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262', 3200.00, 1, 1),
(3, 'Modern Form', 'Contemporary sculpture exploring the relationship between space and form', 'sculpture', 'https://images.unsplash.com/photo-1578926288207-a90a5366759d', 4800.00, 1, 0),
(1, 'Digital Renaissance', 'A fusion of classical artistry and cutting-edge digital technology', 'digital', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', 2900.00, 1, 1),
(2, 'Color Symphony', 'A harmonious blend of colors dancing across the canvas', 'abstract', 'https://images.unsplash.com/photo-1549887534-1541e9326642', 1800.00, 1, 1);
```

## Testing Database Connection

### 1. Test Server Connection

Start the server and check the console output:

```bash
npm start
```

You should see:

```
Server is running on http://localhost:3000
Connected to MySQL database
```

### 2. Test API Endpoints

Open your browser and test these URLs:

**Get All Artworks:**

```
http://localhost:3000/api/artworks
```

**Get Artworks by Category:**

```
http://localhost:3000/api/artworks?category=abstract
```

**Get All Artists:**

```
http://localhost:3000/api/artists
```

You should see JSON responses with your data.

## Troubleshooting

### Server Won't Start

**Error: "Cannot find module 'express'"**

- Solution: Run `npm install` to install all dependencies

**Error: "Port 3000 already in use"**

- Solution: Change PORT in `.env` file to 3001 or another available port
- Or kill the process using port 3000

### Database Connection Error

**Error: "ER_ACCESS_DENIED_ERROR"**

- Make sure MySQL is running
- Check database credentials in `.env` file
- Verify your MySQL username and password
- Default MySQL port is 3306

**Error: "ER_BAD_DB_ERROR: Unknown database"**

- Make sure you created the `art_gallery` database in MySQL
- Run: `CREATE DATABASE art_gallery;`

### API Returns Empty Data

- Check if you have data in your tables
- Run sample data SQL queries above
- Check server console for error messages
- Verify database name matches in `.env`

### Frontend Not Loading Data

- Make sure the server is running (`npm start`)
- Check browser console for CORS or network errors
- Verify API_BASE_URL in `script.js` is `http://localhost:3000/api/`
- Clear browser cache and refresh

### npm install Issues

**Error: "npm is not recognized"**

- Node.js is not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/

**Permission Errors:**

- Run terminal/command prompt as Administrator
- Or use `npm install --no-optional`

## Security Notes

**Important for Production:**

1. Change default database password
2. Use environment variables for sensitive data
3. Implement proper password hashing (already done with `password_hash()`)
4. Add input validation and sanitization
5. Implement rate limiting
6. Use HTTPS
7. Add CSRF protection

## Features Implemented

✅ Node.js Express server
✅ MySQL database connection with mysql2
✅ Get artworks by category
✅ Get all artists with artwork counts
✅ Get artwork details
✅ User authentication (login/register)
✅ Password hashing with bcryptjs
✅ CORS enabled for API access
✅ Environment variables for configuration
✅ Fallback to static data if database fails
✅ RESTful API design

## Next Steps

1. Add more artworks and artists to database
2. Implement actual login/register forms on frontend
3. Add artwork upload functionality
4. Create artist dashboard
5. Implement bidding system
6. Add shopping cart functionality
