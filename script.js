        // API Configuration
        const API_BASE_URL = 'http://localhost:3001/api/';        // Fetch artworks from database
        async function fetchArtworksFromDB(category = null) {
            try {
                const url = category ? `${API_BASE_URL}artworks?category=${category}` : `${API_BASE_URL}artworks`;
                const response = await fetch(url);
                const result = await response.json();
                
                if (result.success) {
                    return result.data.map(art => ({
                        id: art.art_id,
                        title: art.title,
                        artist: art.artist_name || 'Unknown Artist',
                        price: `$${parseFloat(art.price).toFixed(2)}`,
                        image: art.image_url,
                        medium: art.category,
                        size: 'Various',
                        year: new Date(art.upload_date).getFullYear().toString(),
                        edition: art.is_for_sale ? 'For Sale' : 'Not For Sale',
                        description: art.description || 'No description available'
                    }));
                }
                return [];
            } catch (error) {
                console.error('Error fetching artworks:', error);
                return [];
            }
        }

        // Fetch artists from database
        async function fetchArtistsFromDB() {
            try {
                const response = await fetch(`${API_BASE_URL}artists`);
                const result = await response.json();
                
                if (result.success) {
                    return result.data;
                }
                return [];
            } catch (error) {
                console.error('Error fetching artists:', error);
                return [];
            }
        }

        // Art Database by Category (Fallback data)
        const artsByCategory = {
            abstract: [
                { id: 1, title: "Abstract Dreams", artist: "Sophie Chen", price: "$3,200", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=600&fit=crop", medium: "Acrylic", size: "36Ã—48 in", year: "2024", edition: "1 of 1", description: "An explosion of vibrant colors and flowing forms that evoke emotion and imagination through abstract expression." },
                { id: 2, title: "Color Symphony", artist: "Sophie Chen", price: "$1,800", image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=500&h=600&fit=crop", medium: "Mixed Media", size: "30Ã—40 in", year: "2025", edition: "1 of 1", description: "A harmonious blend of colors dancing across the canvas, creating a visual melody that captivates the eye." },
                { id: 3, title: "Chaos Theory", artist: "Marcus Rivera", price: "$2,900", image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500&h=600&fit=crop", medium: "Oil on Canvas", size: "40Ã—50 in", year: "2025", edition: "1 of 1", description: "A mesmerizing exploration of chaos and order through bold brushstrokes and dynamic composition." },
                { id: 4, title: "Fluid Motion", artist: "Alex Thompson", price: "$2,100", image: "https://images.unsplash.com/photo-1583362917004-bfb8e0d18d64?w=500&h=600&fit=crop", medium: "Acrylic Pour", size: "24Ã—36 in", year: "2024", edition: "Limited 5/10", description: "Flowing patterns and organic shapes merge to create a sense of movement frozen in time." }
            ],
            digital: [
                { id: 5, title: "Eternal Sunset", artist: "Marcus Rivera", price: "$2,500", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=600&fit=crop", medium: "Digital", size: "4096Ã—4096", year: "2025", edition: "NFT 1/1", description: "A breathtaking digital landscape capturing the serene beauty of twilight over rolling hills and distant mountains." },
                { id: 6, title: "Digital Renaissance", artist: "Marcus Rivera", price: "$2,900", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=600&fit=crop", medium: "NFT", size: "5000Ã—5000", year: "2025", edition: "NFT 1/1", description: "A fusion of classical artistry and cutting-edge digital technology, creating a unique visual experience." },
                { id: 7, title: "Neon Dreams", artist: "Sophie Chen", price: "$3,400", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&h=600&fit=crop", medium: "3D Render", size: "6000Ã—6000", year: "2025", edition: "NFT 1/1", description: "Vibrant neon colors illuminate a futuristic dreamscape in this stunning digital creation." },
                { id: 8, title: "Cyber Flora", artist: "Alex Thompson", price: "$1,950", image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=500&h=600&fit=crop", medium: "Digital Art", size: "4500Ã—4500", year: "2024", edition: "Limited 3/5", description: "Nature meets technology in this intricate digital artwork exploring organic patterns through a cyberpunk lens." }
            ],
            sculpture: [
                { id: 9, title: "Modern Form", artist: "Alex Thompson", price: "$4,800", image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=500&h=600&fit=crop", medium: "Bronze", size: "24Ã—18Ã—12 in", year: "2025", edition: "1 of 1", description: "A contemporary sculpture that challenges conventional perspectives and explores the relationship between space and form." },
                { id: 10, title: "Stone Elegance", artist: "Marcus Rivera", price: "$5,200", image: "https://images.unsplash.com/photo-1580991871389-ce8e3c3a8f93?w=500&h=600&fit=crop", medium: "Marble", size: "30Ã—20Ã—15 in", year: "2024", edition: "1 of 1", description: "Carved from pristine marble, this piece embodies timeless elegance and masterful craftsmanship." },
                { id: 11, title: "Abstract Dimension", artist: "Sophie Chen", price: "$3,700", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=600&fit=crop", medium: "Steel", size: "36Ã—24Ã—18 in", year: "2025", edition: "Limited 2/3", description: "Geometric forms in polished steel create an interplay of light and shadow." }
            ],
            contemporary: [
                { id: 12, title: "Gallery Masterpiece", artist: "Marcus Rivera", price: "$5,500", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=600&fit=crop", medium: "Oil on Canvas", size: "48Ã—60 in", year: "2024", edition: "1 of 1", description: "A stunning piece that combines classical techniques with modern sensibilities, perfect for any art collection." },
                { id: 13, title: "Urban Poetry", artist: "Alex Thompson", price: "$4,100", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=500&h=600&fit=crop", medium: "Mixed Media", size: "40Ã—52 in", year: "2025", edition: "1 of 1", description: "Contemporary street scenes merge with classical composition in this thought-provoking work." },
                { id: 14, title: "Modern Renaissance", artist: "Sophie Chen", price: "$3,800", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&h=600&fit=crop", medium: "Acrylic", size: "36Ã—48 in", year: "2024", edition: "1 of 1", description: "Bold colors and dynamic composition bring a fresh perspective to contemporary art." }
            ],
            photography: [
                { id: 15, title: "Urban Nights", artist: "Marcus Rivera", price: "$1,600", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=600&fit=crop", medium: "Photography", size: "30Ã—40 in", year: "2025", edition: "Limited 5/15", description: "Capturing the ethereal beauty of city lights after dark in stunning detail." },
                { id: 16, title: "Natural Light", artist: "Sophie Chen", price: "$1,450", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&h=600&fit=crop", medium: "Photography", size: "24Ã—36 in", year: "2024", edition: "Limited 8/20", description: "A masterful exploration of light and shadow in the natural world." }
            ],
            mixed: [
                { id: 17, title: "Textured Reality", artist: "Alex Thompson", price: "$2,700", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&h=600&fit=crop", medium: "Mixed Media", size: "32Ã—44 in", year: "2025", edition: "1 of 1", description: "Combining multiple mediums to create rich texture and depth in this unique artwork." },
                { id: 18, title: "Collage Dreams", artist: "Sophie Chen", price: "$2,200", image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500&h=600&fit=crop", medium: "Collage", size: "28Ã—38 in", year: "2024", edition: "Limited 4/10", description: "A complex layering of materials and techniques that tells a compelling visual story." }
            ]
        };

        // Configuration
        const slides = [
            {
                text: 'masterpiece',
                primaryColor: '#2563eb',      // Blue
                backgroundColor: '#eff6ff'     // Light blue tint
            },
            {
                text: 'digital art',
                primaryColor: '#10b981',       // Green
                backgroundColor: '#ecfdf5'     // Light green tint
            },
            {
                text: 'sculpture',
                primaryColor: '#f59e0b',       // Orange
                backgroundColor: '#fffbeb'     // Light orange tint
            },
            {
                text: 'abstract',
                primaryColor: '#8b5cf6',       // Purple
                backgroundColor: '#f5f3ff'     // Light purple tint
            }
        ];

        const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds
        let currentIndex = 0;
        let autoplayTimer = null;

        // DOM Elements
        const rotatingTexts = document.querySelectorAll('.rotating-text');
        const dots = document.querySelectorAll('.dot');
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const root = document.documentElement;

        /**
         * Updates the active slide and all synchronized elements
         * @param {number} index - The index of the slide to activate
         */
        function updateSlide(index) {
            currentIndex = index;

            // Update rotating text
            rotatingTexts.forEach((text, i) => {
                if (i === index) {
                    text.classList.add('active');
                } else {
                    text.classList.remove('active');
                }
            });

            // Update pagination dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Update image carousel
            carouselSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Update CSS variables for synchronized color changes
            const currentSlide = slides[index];
            root.style.setProperty('--primary-color', currentSlide.primaryColor);
            root.style.setProperty('--background-color', currentSlide.backgroundColor);
            
            // Update logo image based on color theme
            const logoImg = document.getElementById('navbarLogo');
            if (logoImg) {
                const logoColors = ['blue', 'green', 'orange', 'purple'];
                logoImg.src = `logo/logo-${logoColors[index]}.png`;
            }
        }

        /**
         * Advances to the next slide
         */
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            updateSlide(nextIndex);
        }

        /**
         * Starts the autoplay timer
         */
        function startAutoplay() {
            stopAutoplay(); // Clear any existing timer
            autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
        }

        /**
         * Stops the autoplay timer
         */
        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        /**
         * Resets the autoplay timer (used when user manually interacts)
         */
        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Event Listeners
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlide(index);
                resetAutoplay();
            });
        });

        // Optional: Pause autoplay on hover
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', stopAutoplay);
        heroSection.addEventListener('mouseleave', startAutoplay);

        // Optional: Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlide(prevIndex);
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoplay();
            }
        });

        // Initialize
        updateSlide(0);
        startAutoplay();

        // Optional: Add smooth scroll behavior for the scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });

        // Category Page Functionality
        const categoryCards = document.querySelectorAll('.category-card');
        const categoryPage = document.getElementById('categoryPage');
        const backButton = document.getElementById('backButton');
        const categoryNavItems = document.querySelectorAll('.category-nav-item');
        const categoryPageTitle = document.getElementById('categoryPageTitle');
        const categoryPageDescription = document.getElementById('categoryPageDescription');
        const categoryArtsGrid = document.getElementById('categoryArtsGrid');
        
        const artDetailModal = document.getElementById('artDetailModal');
        const closeArtDetail = document.getElementById('closeArtDetail');
        const placeBidButton = document.getElementById('placeBidButton');

        let currentCategory = '';

        const categoryDescriptions = {
            abstract: 'Explore our collection of abstract artworks that push the boundaries of traditional art, featuring bold colors and innovative compositions.',
            digital: 'Discover cutting-edge digital art and NFTs created by talented digital artists using the latest technology and techniques.',
            sculpture: 'Browse three-dimensional artworks crafted from various materials, showcasing the beauty of form and texture.',
            contemporary: 'View modern artworks that reflect current artistic trends and cultural conversations in today\'s world.',
            photography: 'Experience stunning photography capturing moments, emotions, and perspectives through the lens of talented photographers.',
            mixed: 'Explore unique pieces combining multiple mediums and techniques, creating rich textures and compelling visual narratives.'
        };

        // Open category page
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                currentCategory = card.dataset.category;
                openCategoryPage(currentCategory);
            });
        });

        // Category navigation items
        categoryNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                switchCategory(category);
            });
        });

        // Back button
        backButton.addEventListener('click', () => {
            closeCategoryPage();
        });

        function openCategoryPage(category) {
            currentCategory = category;
            categoryPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            switchCategory(category);
        }

        function closeCategoryPage() {
            categoryPage.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function switchCategory(category) {
            currentCategory = category;
            
            // Update active state in sidebar
            categoryNavItems.forEach(item => {
                if (item.dataset.category === category) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Update title and description
            const categoryNames = {
                abstract: 'Abstract Art',
                digital: 'Digital Art',
                sculpture: 'Sculpture',
                contemporary: 'Contemporary',
                photography: 'Photography',
                mixed: 'Mixed Media'
            };

            categoryPageTitle.textContent = categoryNames[category];
            categoryPageDescription.textContent = categoryDescriptions[category];

            // Display arts
            displayCategoryArts(category);
        }

        // Display arts in category page
        async function displayCategoryArts(category) {
            categoryArtsGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading artworks...</p>';
            
            // Try to fetch from database first
            let arts = await fetchArtworksFromDB(category);
            
            // Fallback to static data if database fails
            if (arts.length === 0) {
                arts = artsByCategory[category] || [];
            }
            
            categoryArtsGrid.innerHTML = '';

            if (arts.length === 0) {
                categoryArtsGrid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #6b7280;">No artworks found in this category.</p>';
                return;
            }

            arts.forEach(art => {
                const artCard = document.createElement('div');
                artCard.className = 'category-art-card';
                artCard.innerHTML = `
                    <img src="${art.image}" alt="${art.title}" class="category-art-image">
                    <div class="category-art-info">
                        <h3 class="category-art-title">${art.title}</h3>
                        <p class="category-art-artist">${art.artist}</p>
                        <p class="category-art-price">${art.price}</p>
                    </div>
                `;
                
                artCard.addEventListener('click', () => {
                    showArtDetail(art);
                });
                
                categoryArtsGrid.appendChild(artCard);
            });
        }

        // Show art detail modal
        function showArtDetail(art) {
            document.getElementById('artDetailImage').src = art.image;
            document.getElementById('artDetailCategory').textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
            document.getElementById('artDetailTitle').textContent = art.title;
            document.getElementById('artDetailArtist').textContent = `by ${art.artist}`;
            document.getElementById('artDetailDescription').textContent = art.description;
            document.getElementById('artDetailMedium').textContent = art.medium;
            document.getElementById('artDetailSize').textContent = art.size;
            document.getElementById('artDetailYear').textContent = art.year;
            document.getElementById('artDetailEdition').textContent = art.edition;
            document.getElementById('artDetailPrice').textContent = art.price;

            artDetailModal.classList.add('active');
        }

        // Close art detail modal
        closeArtDetail.addEventListener('click', () => {
            artDetailModal.classList.remove('active');
        });

        // Close art detail modal on outside click
        artDetailModal.addEventListener('click', (e) => {
            if (e.target === artDetailModal) {
                artDetailModal.classList.remove('active');
            }
        });

        // Place bid button
        placeBidButton.addEventListener('click', () => {
            alert('Bid placement feature would be implemented here!\n\nIn a production environment, this would:\n- Open a bid form\n- Validate user authentication\n- Process the bid amount\n- Update the auction in real-time');
        });

        // Navbar Mobile Toggle
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');

        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.navbar-link, .navbar-cta').forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });

        // Auto-scroll functionality for Artists and Featured Arts sections
        const artistsGrid = document.querySelector('.artists-grid');
        const artsGrid = document.querySelector('.arts-grid');
        
        let lastScrollTop = 0;
        let isArtistsHovered = false;
        let isArtsHovered = false;
        let artistsScrollInterval = null;
        let artsScrollInterval = null;

        // Track hover state for artists section
        artistsGrid.addEventListener('mouseenter', () => {
            isArtistsHovered = true;
            // Stop scrolling on hover
            if (artistsScrollInterval) {
                clearInterval(artistsScrollInterval);
                artistsScrollInterval = null;
            }
        });
        
        artistsGrid.addEventListener('mouseleave', () => {
            isArtistsHovered = false;
            // Resume default auto-scroll to left
            if (!artistsScrollInterval) {
                artistsScrollInterval = startAutoScroll(artistsGrid, 'left');
            }
        });

        // Track hover state for arts section
        artsGrid.addEventListener('mouseenter', () => {
            isArtsHovered = true;
            // Stop scrolling on hover
            if (artsScrollInterval) {
                clearInterval(artsScrollInterval);
                artsScrollInterval = null;
            }
        });
        
        artsGrid.addEventListener('mouseleave', () => {
            isArtsHovered = false;
            // Resume default auto-scroll to left
            if (!artsScrollInterval) {
                artsScrollInterval = startAutoScroll(artsGrid, 'left');
            }
        });

        // Auto-scroll function with seamless infinite scroll
        function autoScrollSection(section, direction) {
            if (!section) return;
            
            const scrollSpeed = 1.5; // pixels per frame
            const maxScroll = section.scrollWidth - section.clientWidth;
            const midPoint = maxScroll / 2;
            
            if (direction === 'left') {
                section.scrollLeft += scrollSpeed;
                // Seamless loop: when reaching halfway, jump back without visual disruption
                if (section.scrollLeft >= midPoint) {
                    section.scrollLeft = 0;
                }
            } else if (direction === 'right') {
                section.scrollLeft -= scrollSpeed;
                // Seamless loop: when reaching start, jump to halfway point
                if (section.scrollLeft <= 0) {
                    section.scrollLeft = midPoint;
                }
            }
        }

        // Start auto-scroll for a section
        function startAutoScroll(section, direction) {
            return setInterval(() => {
                autoScrollSection(section, direction);
            }, 16); // ~60fps
        }

        // Handle page scroll event
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Determine scroll direction
            const scrollingDown = currentScrollTop > lastScrollTop;
            
            // Only respond to scrolling down - maintain left scroll always
            if (scrollingDown) {
                // Auto-scroll artists section (if not hovered)
                if (!isArtistsHovered) {
                    if (artistsScrollInterval) {
                        clearInterval(artistsScrollInterval);
                    }
                    artistsScrollInterval = startAutoScroll(artistsGrid, 'left');
                }
                
                // Auto-scroll arts section (if not hovered)
                if (!isArtsHovered) {
                    if (artsScrollInterval) {
                        clearInterval(artsScrollInterval);
                    }
                    artsScrollInterval = startAutoScroll(artsGrid, 'left');
                }
            }
            
            // Update last scroll position
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        }, { passive: true });

        // Duplicate content for seamless infinite scroll
        function initInfiniteScroll(container) {
            const content = container.innerHTML;
            container.innerHTML += content; // Duplicate all cards
        }

        // Manual drag-to-scroll functionality
        function initDragScroll(container) {
            let isDown = false;
            let startX;
            let scrollLeft;
            let hasMoved = false;

            container.addEventListener('mousedown', (e) => {
                const card = e.target.closest('.artist-card, .art-card');
                
                // Check if clicking on a card
                if (card) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Calculate center 90% zone (5% edges for dragging)
                    const leftBoundary = rect.width * 0.05;
                    const rightBoundary = rect.width * 0.95;
                    const topBoundary = rect.height * 0.05;
                    const bottomBoundary = rect.height * 0.95;
                    
                    // If in center 90%, don't allow drag scroll (for info interaction)
                    if (x >= leftBoundary && x <= rightBoundary && 
                        y >= topBoundary && y <= bottomBoundary) {
                        // Don't activate drag on center area or interactive elements
                        if (e.target.closest('button, a')) {
                            return;
                        }
                        return; // Center 90% area - no drag scroll
                    }
                    // Only outer 10% (5% each edge) - allow drag scroll to continue below
                }
                
                // Don't drag on buttons or links anywhere
                if (e.target.closest('button, a')) {
                    return;
                }
                
                isDown = true;
                hasMoved = false;
                container.style.cursor = 'grabbing';
                container.style.userSelect = 'none';
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });

            container.addEventListener('mouseleave', () => {
                isDown = false;
                container.style.cursor = '';
                container.style.userSelect = '';
            });

            container.addEventListener('mouseup', () => {
                isDown = false;
                container.style.cursor = '';
                container.style.userSelect = '';
            });

            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                hasMoved = true;
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed multiplier
                container.scrollLeft = scrollLeft - walk;
            });

            // Dynamic cursor based on position
            container.addEventListener('mousemove', (e) => {
                if (isDown) return; // Don't change cursor while dragging
                
                const card = e.target.closest('.artist-card, .art-card');
                
                if (card) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Calculate center 90% zone (5% edges for dragging)
                    const leftBoundary = rect.width * 0.05;
                    const rightBoundary = rect.width * 0.95;
                    const topBoundary = rect.height * 0.05;
                    const bottomBoundary = rect.height * 0.95;
                    
                    // Check if in center 90% or outer 10%
                    if (x >= leftBoundary && x <= rightBoundary && 
                        y >= topBoundary && y <= bottomBoundary) {
                        // Center 90% area - default cursor for hover interaction
                        container.style.cursor = 'default';
                    } else {
                        // Outer 10% edge area - grab cursor for scrolling
                        container.style.cursor = 'grab';
                    }
                } else {
                    // Empty space - grab cursor
                    container.style.cursor = 'grab';
                }
            });
        }

        // Center-only hover detection for cards
        function initCenterHover(container, cardSelector) {
            container.addEventListener('mousemove', (e) => {
                const card = e.target.closest(cardSelector);
                
                // Remove all active states from all cards first
                container.querySelectorAll(cardSelector).forEach(c => {
                    c.classList.remove('center-hover');
                    const info = c.querySelector('.artist-info, .art-info');
                    if (info) info.classList.remove('show-info');
                });
                
                if (!card) {
                    return;
                }

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate center 90% zone (5% edges reserved for drag scrolling)
                const leftBoundary = rect.width * 0.05;
                const rightBoundary = rect.width * 0.95;
                const topBoundary = rect.height * 0.05;
                const bottomBoundary = rect.height * 0.95;
                
                const info = card.querySelector('.artist-info, .art-info');
                
                // Check if mouse is in center 50%
                if (x >= leftBoundary && x <= rightBoundary && 
                    y >= topBoundary && y <= bottomBoundary) {
                    // Add center hover effects
                    card.classList.add('center-hover');
                    if (info) info.classList.add('show-info');
                }
                // When on border, no effects are applied - perfect for scrolling
            });

            container.addEventListener('mouseleave', () => {
                // Remove all active states when leaving container
                container.querySelectorAll(cardSelector).forEach(card => {
                    card.classList.remove('center-hover');
                    const info = card.querySelector('.artist-info, .art-info');
                    if (info) info.classList.remove('show-info');
                });
            });
        }

        // Authentication state management
        let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        let currentUser = null;

        // Load user data on page load
        if (isLoggedIn) {
            const userData = localStorage.getItem('user');
            if (userData) {
                currentUser = JSON.parse(userData);
            }
        }

        function updateAuthButton() {
            const getStartedBtn = document.getElementById('getStartedBtn');
            const profileBtn = document.getElementById('profileBtn');
            
            if (isLoggedIn) {
                getStartedBtn.style.display = 'none';
                profileBtn.style.display = 'flex';
                
                // Update profile button with user name if available
                if (currentUser && currentUser.full_name) {
                    const profileText = profileBtn.querySelector('.profile-text');
                    if (profileText) {
                        profileText.textContent = currentUser.full_name;
                    }
                }
            } else {
                getStartedBtn.style.display = 'inline-block';
                profileBtn.style.display = 'none';
            }
        }

        // Handle Get Started button click - redirect to auth page
        document.addEventListener('click', (e) => {
            if (e.target.id === 'getStartedBtn' || e.target.closest('#getStartedBtn')) {
                e.preventDefault();
                window.location.href = 'auth.html';
            }
            
            if (e.target.id === 'profileBtn' || e.target.closest('#profileBtn')) {
                e.preventDefault();
                // Redirect to profile page
                window.location.href = 'profile.html';
            }
        });

        // Start default auto-scroll on page load
        window.addEventListener('load', () => {
            // Initialize infinite scroll by duplicating content
            initInfiniteScroll(artistsGrid);
            initInfiniteScroll(artsGrid);
            
            // Initialize drag-to-scroll
            initDragScroll(artistsGrid);
            initDragScroll(artsGrid);
            
            // Initialize center-only hover detection
            initCenterHover(artistsGrid, '.artist-card');
            initCenterHover(artsGrid, '.art-card');
            
            // Start auto-scrolling
            artistsScrollInterval = startAutoScroll(artistsGrid, 'left');
            artsScrollInterval = startAutoScroll(artsGrid, 'left');
            
            // Initialize auth button state
            updateAuthButton();
        });