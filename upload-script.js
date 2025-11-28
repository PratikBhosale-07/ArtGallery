// API Configuration
const API_BASE_URL = 'http://localhost:3001/api/';

// Check if user is logged in and is an artist
const userData = localStorage.getItem('user');
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!userData || isLoggedIn !== 'true') {
    alert('Please login to upload artwork');
    window.location.href = 'auth.html';
}

const user = JSON.parse(userData);

// Only artists can upload
if (user.user_type !== 'artist') {
    alert('Only artists can upload artworks');
    window.location.href = 'index.html';
}

// DOM Elements
const uploadForm = document.getElementById('uploadForm');
const imageUploadArea = document.getElementById('imageUploadArea');
const artworkImageInput = document.getElementById('artworkImage');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImage');
const forSaleCheckbox = document.getElementById('forSale');
const forBidCheckbox = document.getElementById('forBid');
const priceGroup = document.getElementById('priceGroup');
const minBidGroup = document.getElementById('minBidGroup');
const bidDurationGroup = document.getElementById('bidDurationGroup');
const priceHint = document.getElementById('priceHint');
const cancelBtn = document.getElementById('cancelBtn');

let selectedImage = null;
let imageUrl = '';

// Image Upload Handling
imageUploadArea.addEventListener('click', () => {
    artworkImageInput.click();
});

imageUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'var(--primary-color)';
    imageUploadArea.style.background = '#eff6ff';
});

imageUploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'var(--border-color)';
    imageUploadArea.style.background = 'var(--bg-color)';
});

imageUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'var(--border-color)';
    imageUploadArea.style.background = 'var(--bg-color)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

artworkImageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

function handleImageUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showAlert('errorAlert', 'Please upload an image file');
        return;
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
        showAlert('errorAlert', 'Image size must be less than 10MB');
        return;
    }
    
    selectedImage = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        imageUrl = e.target.result;
        previewImg.src = imageUrl;
        uploadPlaceholder.style.display = 'none';
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

removeImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    selectedImage = null;
    imageUrl = '';
    previewImg.src = '';
    artworkImageInput.value = '';
    uploadPlaceholder.style.display = 'flex';
    imagePreview.style.display = 'none';
});

// Sale Options Handling
forSaleCheckbox.addEventListener('change', updateSaleOptions);
forBidCheckbox.addEventListener('change', updateSaleOptions);

function updateSaleOptions() {
    const isSale = forSaleCheckbox.checked;
    const isBid = forBidCheckbox.checked;
    
    if (!isSale && !isBid) {
        priceGroup.style.display = 'none';
        minBidGroup.style.display = 'none';
        bidDurationGroup.style.display = 'none';
        document.getElementById('artworkPrice').required = false;
    } else {
        priceGroup.style.display = 'block';
        document.getElementById('artworkPrice').required = true;
        
        if (isBid) {
            priceHint.textContent = isSale ? 
                'Set your asking price and starting bid amount' : 
                'Set the starting bid amount';
            minBidGroup.style.display = 'block';
            bidDurationGroup.style.display = 'block';
        } else {
            priceHint.textContent = 'Set your asking price';
            minBidGroup.style.display = 'none';
            bidDurationGroup.style.display = 'none';
        }
    }
}

// Cancel Button
cancelBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        window.location.href = 'profile.html';
    }
});

// Form Submission
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate image
    if (!selectedImage) {
        showAlert('errorAlert', 'Please upload an artwork image');
        return;
    }
    
    // Validate sale options
    const isSale = forSaleCheckbox.checked;
    const isBid = forBidCheckbox.checked;
    
    if (!isSale && !isBid) {
        showAlert('errorAlert', 'Please select at least one sale option (Direct Purchase or Bidding)');
        return;
    }
    
    // Get form data
    const formData = {
        artist_id: user.id,
        title: document.getElementById('artworkTitle').value.trim(),
        description: document.getElementById('artworkDescription').value.trim(),
        category: document.getElementById('artworkCategory').value,
        medium: document.getElementById('artworkMedium').value.trim() || null,
        width: document.getElementById('artworkWidth').value || null,
        height: document.getElementById('artworkHeight').value || null,
        year: document.getElementById('artworkYear').value || null,
        price: document.getElementById('artworkPrice').value,
        is_for_sale: isSale ? 1 : 0,
        is_for_bid: isBid ? 1 : 0,
        min_bid_increment: isBid ? (document.getElementById('minBidIncrement').value || 10) : null,
        bid_duration: isBid ? document.getElementById('bidDuration').value : null,
        tags: document.getElementById('artworkTags').value.trim() || null,
        edition: document.getElementById('artworkEdition').value.trim() || null,
        image_url: imageUrl // In production, upload to server/cloud storage
    };
    
    // Show loader
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    clearAlerts();
    
    try {
        const response = await fetch(`${API_BASE_URL}artworks/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('successAlert', 'Artwork uploaded successfully! Redirecting...');
            
            // Reset form
            uploadForm.reset();
            removeImageBtn.click();
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 2000);
        } else {
            showAlert('errorAlert', data.message || 'Failed to upload artwork. Please try again.');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showAlert('errorAlert', 'Connection error. Please check your internet and try again.');
    } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// Helper Functions
function showAlert(elementId, message) {
    const alertElement = document.getElementById(elementId);
    alertElement.textContent = message;
    alertElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}

function clearAlerts() {
    document.getElementById('errorAlert').style.display = 'none';
    document.getElementById('successAlert').style.display = 'none';
}
