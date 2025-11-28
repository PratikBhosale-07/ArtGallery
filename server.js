const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Database connection pool (prevents "connection closed" errors)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

// API Routes

// Get all artworks or by category
app.get('/api/artworks', (req, res) => {
    const category = req.query.category;
    
    let query = `
        SELECT a.*, ar.full_name as artist_name, ar.username as artist_username 
        FROM artworks a 
        LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
    `;
    
    if (category) {
        query += ` WHERE a.category = ? ORDER BY a.upload_date DESC`;
        db.query(query, [category], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            res.json({ success: true, data: results });
        });
    } else {
        query += ` ORDER BY a.upload_date DESC`;
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            res.json({ success: true, data: results });
        });
    }
});

// Get all artists
app.get('/api/artists', (req, res) => {
    const query = `
        SELECT artist_id, full_name, username, email, bio, profile_photo, joined_at 
        FROM artists 
        ORDER BY joined_at DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        
        // Get artwork count for each artist
        const artistsWithCount = results.map((artist, index) => {
            return new Promise((resolve) => {
                db.query(
                    'SELECT COUNT(*) as artwork_count FROM artworks WHERE artist_id = ?',
                    [artist.artist_id],
                    (err, countResult) => {
                        if (err) {
                            artist.artwork_count = 0;
                        } else {
                            artist.artwork_count = countResult[0].artwork_count;
                        }
                        resolve(artist);
                    }
                );
            });
        });
        
        Promise.all(artistsWithCount).then(artists => {
            res.json({ success: true, data: artists });
        });
    });
});

// Get artwork details
app.get('/api/artwork/:id', (req, res) => {
    const artId = req.params.id;
    
    const query = `
        SELECT a.*, ar.full_name as artist_name, ar.username as artist_username, 
        ar.bio as artist_bio, ar.profile_photo as artist_photo
        FROM artworks a 
        LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
        WHERE a.art_id = ?
    `;
    
    db.query(query, [artId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Artwork not found' });
        }
        
        res.json({ success: true, data: results[0] });
    });
});

// User login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    
    // Check in buyers table
    db.query(
        'SELECT buyer_id as id, username, email, full_name, password_hash, "buyer" as user_type FROM buyers WHERE username = ? OR email = ?',
        [username, username],
        (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            
            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: err.message });
                    }
                    
                    if (isMatch) {
                        delete user.password_hash;
                        return res.json({ success: true, message: 'Login successful', user });
                    } else {
                        return res.status(401).json({ success: false, message: 'Invalid username or password' });
                    }
                });
            } else {
                // Check in artists table
                db.query(
                    'SELECT artist_id as id, username, email, full_name, password_hash, "artist" as user_type, bio, profile_photo FROM artists WHERE username = ? OR email = ?',
                    [username, username],
                    (err, results) => {
                        if (err) {
                            return res.status(500).json({ success: false, message: err.message });
                        }
                        
                        if (results.length > 0) {
                            const user = results[0];
                            bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                                if (err) {
                                    return res.status(500).json({ success: false, message: err.message });
                                }
                                
                                if (isMatch) {
                                    delete user.password_hash;
                                    return res.json({ success: true, message: 'Login successful', user });
                                } else {
                                    return res.status(401).json({ success: false, message: 'Invalid username or password' });
                                }
                            });
                        } else {
                            // Check in admin table
                            db.query(
                                'SELECT admin_id as id, username, email, password_hash, "admin" as user_type FROM admin WHERE username = ? OR email = ?',
                                [username, username],
                                (err, results) => {
                                    if (err) {
                                        return res.status(500).json({ success: false, message: err.message });
                                    }
                                    
                                    if (results.length > 0) {
                                        const user = results[0];
                                        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                                            if (err) {
                                                return res.status(500).json({ success: false, message: err.message });
                                            }
                                            
                                            if (isMatch) {
                                                delete user.password_hash;
                                                return res.json({ success: true, message: 'Login successful', user });
                                            } else {
                                                return res.status(401).json({ success: false, message: 'Invalid username or password' });
                                            }
                                        });
                                    } else {
                                        return res.status(401).json({ success: false, message: 'Invalid username or password' });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

// User registration
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, full_name, user_type, bio } = req.body;
    
    if (!username || !email || !password || !full_name) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const type = user_type || 'buyer';
    
    // Check if username or email already exists
    db.query(
        'SELECT username FROM buyers WHERE username = ? OR email = ? UNION SELECT username FROM artists WHERE username = ? OR email = ?',
        [username, email, username, email],
        async (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            
            if (results.length > 0) {
                return res.status(409).json({ success: false, message: 'Username or email already exists' });
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            if (type === 'artist') {
                db.query(
                    'INSERT INTO artists (full_name, username, email, password_hash, bio) VALUES (?, ?, ?, ?, ?)',
                    [full_name, username, email, hashedPassword, bio || ''],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ success: false, message: err.message });
                        }
                        res.json({ success: true, message: 'Registration successful' });
                    }
                );
            } else {
                db.query(
                    'INSERT INTO buyers (full_name, username, email, password_hash) VALUES (?, ?, ?, ?)',
                    [full_name, username, email, hashedPassword],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ success: false, message: err.message });
                        }
                        res.json({ success: true, message: 'Registration successful' });
                    }
                );
            }
        }
    );
});

// Upload artwork
app.post('/api/artworks/upload', (req, res) => {
    const { 
        artist_id, title, description, category, medium, width, height, 
        year, price, is_for_sale, is_for_bid, min_bid_increment, 
        bid_duration, tags, edition, image_url 
    } = req.body;
    
    if (!artist_id || !title || !description || !category || !price || !image_url) {
        return res.status(400).json({ 
            success: false, 
            message: 'Artist ID, title, description, category, price, and image are required' 
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
            artist_id, title, description, category, medium || null, 
            width || null, height || null, year || null, price, 
            is_for_sale || 0, is_for_bid || 0, min_bid_increment || null, 
            bid_duration || null, tags || null, edition || null, image_url
        ],
        (err, result) => {
            if (err) {
                console.error('Upload error:', err);
                return res.status(500).json({ success: false, message: err.message });
            }
            res.json({ 
                success: true, 
                message: 'Artwork uploaded successfully',
                artwork_id: result.insertId
            });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Access the website at http://localhost:${PORT}/index.html`);
});
