document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const housesGrid = document.getElementById('housesGrid');
    const loading = document.getElementById('loading');
    const backToTop = document.getElementById('backToTop');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const filterSelects = document.querySelectorAll('.filter-select');

    // Sample house data for infinite scroll
    const sampleHouses = [
        {
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwello1-mJCchs4VTPKT025c2obQqNAnk0dBVI.png',
            title: 'Elegant Townhouse',
            location: 'Kensington Market',
            rooms: 3,
            sqft: 1800,
            baths: 2,
            price: 3200,
            amenities: ['WiFi', 'Parking', 'Balcony'],
            badge: null,
            tall: false
        },
        {
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwello1-mJCchs4VTPKT025c2obQqNAnk0dBVI.png',
            title: 'Modern Loft',
            location: 'Downtown',
            rooms: 1,
            sqft: 900,
            baths: 1,
            price: 2800,
            amenities: ['WiFi', 'Gym', 'Rooftop'],
            badge: 'New',
            tall: true
        },
        {
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwello1-mJCchs4VTPKT025c2obQqNAnk0dBVI.png',
            title: 'Garden Villa',
            location: 'Westside',
            rooms: 4,
            sqft: 3200,
            baths: 3,
            price: 5200,
            amenities: ['WiFi', 'Garden', 'Garage', 'Pool'],
            badge: 'Premium',
            tall: false
        },
        {
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwello1-mJCchs4VTPKT025c2obQqNAnk0dBVI.png',
            title: 'City View Apartment',
            location: 'Eastside',
            rooms: 2,
            sqft: 1100,
            baths: 1,
            price: 2400,
            amenities: ['WiFi', 'Balcony', 'Elevator'],
            badge: null,
            tall: true
        }
    ];

    // Favorite button functionality
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
            }
        });
    });

    // View toggle functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                housesGrid.classList.add('list-view');
            } else {
                housesGrid.classList.remove('list-view');
            }
        });
    });

    // Filter functionality
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Here you would implement actual filtering logic
            console.log('Filter changed:', this.value);
            // For demo purposes, we'll just log the change
        });
    });

    // Infinite scroll functionality
    let isLoading = false;
    let page = 1;

    function createHouseCard(house) {
        return `
            <div class="house-card ${house.tall ? 'tall' : ''}">
                <div class="card-image">
                    <img src="${house.image}" alt="${house.title}">
                    <button class="favorite-btn">
                        <i class="far fa-heart"></i>
                    </button>
                    ${house.badge ? `<div class="image-badge">${house.badge}</div>` : ''}
                    <div class="image-overlay">
                        <button class="view-btn-overlay">View Details</button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${house.location}</span>
                    </div>
                    <h3 class="property-title">${house.title}</h3>
                    <div class="details">
                        <div class="detail">
                            <i class="fas fa-home"></i>
                            <span>${house.rooms} rooms</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${house.sqft} sq ft</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-bath"></i>
                            <span>${house.baths} baths</span>
                        </div>
                    </div>
                    <div class="amenities">
                        ${house.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                    </div>
                    <div class="card-footer">
                        <div class="price">KSH ${house.price.toLocaleString()}<span>/month</span></div>
                        <button class="btn-contact">Contact</button>
                    </div>
                </div>
            </div>
        `;
    }

    function loadMoreHouses() {
        if (isLoading) return;
        
        isLoading = true;
        loading.classList.add('show');

        // Simulate API call delay
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement('div');
            
            // Add 4 more houses
            for (let i = 0; i < 4; i++) {
                const randomHouse = sampleHouses[Math.floor(Math.random() * sampleHouses.length)];
                tempDiv.innerHTML = createHouseCard(randomHouse);
                const card = tempDiv.firstElementChild;
                
                // Add event listeners to new cards
                const favoriteBtn = card.querySelector('.favorite-btn');
                favoriteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const icon = this.querySelector('i');
                    
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        this.classList.add('active');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        this.classList.remove('active');
                    }
                });
                
                fragment.appendChild(card);
            }
            
            housesGrid.appendChild(fragment);
            loading.classList.remove('show');
            isLoading = false;
            page++;
        }, 1000);
    }

    // Intersection Observer for infinite scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                loadMoreHouses();
            }
        });
    }, {
        rootMargin: '100px'
    });

    observer.observe(loading);

    // Back to top functionality
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Masonry layout fallback for older browsers
    function initMasonry() {
        if (!CSS.supports('grid-template-rows', 'masonry')) {
            // Implement JavaScript masonry layout
            const cards = document.querySelectorAll('.house-card');
            const grid = document.querySelector('.houses-grid');
            
            function resizeGridItem(item) {
                const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
                const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
                const rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
                item.style.gridRowEnd = `span ${rowSpan}`;
            }
            
            function resizeAllGridItems() {
                cards.forEach(resizeGridItem);
            }
            
            window.addEventListener('resize', resizeAllGridItems);
            resizeAllGridItems();
        }
    }

    // Initialize masonry after images load
    const images = document.querySelectorAll('.house-card img');
    let loadedImages = 0;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    initMasonry();
                }
            });
        }
    });
    
    if (loadedImages === images.length) {
        initMasonry();
    }

    // Search functionality (placeholder)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.house-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.property-title').textContent.toLowerCase();
                const location = card.querySelector('.location span').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || location.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});