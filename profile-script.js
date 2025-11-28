// API Configuration
const API_BASE_URL = 'http://localhost:3001/api/';

// Check if user is logged in
const userData = localStorage.getItem('user');
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!userData || isLoggedIn !== 'true') {
    window.location.href = 'auth.html';
}

const user = JSON.parse(userData);

// Show upload button only for artists
if (user.user_type === 'artist') {
    const uploadBtn = document.getElementById('uploadArtworkBtn');
    if (uploadBtn) {
        uploadBtn.style.display = 'flex';
        uploadBtn.addEventListener('click', () => {
            window.location.href = 'upload.html';
        });
    }
}

// Load user profile data
function loadProfileData() {
    // Set full name as main heading
    document.getElementById('profileUsername').textContent = user.full_name || 'Full Name';
    
    // Set username below
    document.getElementById('profileName').textContent = '@' + (user.username || 'username');
    
    // Set email
    document.getElementById('profileEmail').textContent = user.email || 'email@example.com';
    
    // Set bio (for artists)
    if (user.bio) {
        document.getElementById('profileBio').textContent = user.bio;
    } else {
        document.getElementById('profileBio').textContent = user.user_type === 'artist' ? 'Add a bio to tell your story' : 'Art lover and collector';
    }
    
    // Set joined date
    if (user.joined_at) {
        const joinedDate = new Date(user.joined_at);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        document.getElementById('joinedDate').textContent = 
            `Joined ${monthNames[joinedDate.getMonth()]} ${joinedDate.getFullYear()}`;
    }
    
    // Load artworks count if user is an artist
    if (user.user_type === 'artist') {
        loadArtworks();
    }
}

// Load user's artworks
async function loadArtworks() {
    try {
        const response = await fetch(`${API_BASE_URL}artworks`);
        const data = await response.json();
        
        if (data.success) {
            // Filter artworks by current user (artist)
            const userArtworks = data.data.filter(art => 
                art.artist_id === user.id || art.artist_username === user.username
            );
            
            document.getElementById('artworksCount').textContent = userArtworks.length;
            
            if (userArtworks.length > 0) {
                displayArtworks(userArtworks);
            }
        }
    } catch (error) {
        console.error('Error loading artworks:', error);
    }
}

// Display artworks in grid
function displayArtworks(artworks) {
    const grid = document.getElementById('artworksGrid');
    grid.innerHTML = '';
    
    artworks.forEach(artwork => {
        const artworkItem = document.createElement('div');
        artworkItem.className = 'artwork-item';
        artworkItem.innerHTML = `
            <img src="${artwork.image_url}" alt="${artwork.title}">
            <div class="artwork-overlay">
                <div class="overlay-stat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${Math.floor(Math.random() * 100)}</span>
                </div>
                <div class="overlay-stat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>${Math.floor(Math.random() * 50)}</span>
                </div>
            </div>
        `;
        
        artworkItem.addEventListener('click', () => {
            // You can implement artwork detail view here
            console.log('Artwork clicked:', artwork);
        });
        
        grid.appendChild(artworkItem);
    });
}

// Tab switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        button.classList.add('active');
        document.getElementById(`${tabName}-content`).classList.add('active');
    });
});

// Edit Profile button
document.getElementById('editProfileBtn').addEventListener('click', () => {
    // You can implement edit profile functionality here
    alert('Edit profile feature coming soon!');
});

// Settings button
document.getElementById('settingsBtn').addEventListener('click', () => {
    const modal = document.getElementById('logoutModal');
    modal.classList.add('active');
});

// Logout modal
document.getElementById('cancelLogout').addEventListener('click', () => {
    document.getElementById('logoutModal').classList.remove('active');
});

document.getElementById('confirmLogout').addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
});

// Close modal on outside click
document.getElementById('logoutModal').addEventListener('click', (e) => {
    if (e.target.id === 'logoutModal') {
        document.getElementById('logoutModal').classList.remove('active');
    }
});

// Profile button - stays on profile page
document.getElementById('profileBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // Already on profile page, do nothing
});

// Initialize profile
loadProfileData();
