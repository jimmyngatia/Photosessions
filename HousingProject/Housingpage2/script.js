// Image Gallery Functionality
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Change main image source
    mainImage.src = thumbnail.src.replace('w=200&h=150', 'w=800&h=500');
    
    // Add fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 150);
}

// Favorite Button Functionality
function toggleFavorite(buttonId) {
    const favoriteBtn = document.getElementById(buttonId);
    const icon = favoriteBtn.querySelector('i');
    
    if (favoriteBtn.classList.contains('active')) {
        favoriteBtn.classList.remove('active');
        icon.className = 'far fa-heart';
    } else {
        favoriteBtn.classList.add('active');
        icon.className = 'fas fa-heart';
    }
}

// House Rules Toggle
function toggleRules() {
    const rulesContent = document.getElementById('rulesContent');
    const toggleIcon = document.querySelector('.rules-toggle i');
    
    if (rulesContent.classList.contains('active')) {
        rulesContent.classList.remove('active');
        toggleIcon.style.transform = 'rotate(0deg)';
    } else {
        rulesContent.classList.add('active');
        toggleIcon.style.transform = 'rotate(180deg)';
    }
}

// Like Button Functionality for Comments
function toggleLike(button) {
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('span');
    let count = parseInt(countSpan.textContent);
    
    if (icon.classList.contains('far')) {
        icon.className = 'fas fa-thumbs-up';
        button.style.color = '#667eea';
        countSpan.textContent = count + 1;
    } else {
        icon.className = 'far fa-thumbs-up';
        button.style.color = '#718096';
        countSpan.textContent = count - 1;
    }
}

// Smooth Scrolling for Navigation
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form Validation
function validateBookingForm() {
    const moveInDate = document.getElementById('moveInDate');
    const today = new Date().toISOString().split('T')[0];
    
    if (moveInDate.value && moveInDate.value < today) {
        alert('Please select a future date for move-in.');
        return false;
    }
    
    return true;
}

// Initialize Date Input
function initializeDateInput() {
    const moveInDate = document.getElementById('moveInDate');
    const today = new Date().toISOString().split('T')[0];
    moveInDate.min = today;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    moveInDate.value = tomorrow.toISOString().split('T')[0];
}

// Booking Summary Calculator
function updateBookingSummary() {
    const durationSelect = document.querySelector('.booking-form select');
    const monthlyRent = 12000;
    const securityDeposit = 5000;
    const maintenance = 1000;
    
    const duration = parseInt(durationSelect.value) || 1;
    const totalRent = monthlyRent * duration;
    const total = totalRent + securityDeposit + maintenance;
    
    // Update summary display
    document.querySelector('.summary-item:first-child span:last-child').textContent = `₹${totalRent.toLocaleString()}`;
    document.querySelector('.summary-total span:last-child').textContent = `₹${total.toLocaleString()}`;
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.hostel-info, .ratings-section, .map-section, .comments-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Rating Bar Animation
function animateRatingBars() {
    const ratingBars = document.querySelectorAll('.rating-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    ratingBars.forEach(bar => observer.observe(bar));
}

// Mobile Menu Toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Image Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Contact form submitted:', data);
    
    // Show success message
    alert('Thank you for your inquiry! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Booking Form Handler
function handleBookingForm() {
    if (validateBookingForm()) {
        // Simulate booking process
        const bookingData = {
            hostel: 'Sunrise Student Residence',
            moveInDate: document.getElementById('moveInDate').value,
            duration: document.querySelector('.booking-form select').value,
            totalAmount: document.querySelector('.summary-total span:last-child').textContent
        };
        
        console.log('Booking submitted:', bookingData);
        
        // Show success message
        alert('Booking request submitted successfully! We will contact you shortly to confirm your reservation.');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize date input
    initializeDateInput();
    
    // Initialize animations
    initializeAnimations();
    animateRatingBars();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Add event listeners
    document.getElementById('favoriteBtn').addEventListener('click', () => toggleFavorite('favoriteBtn'));
    document.getElementById('favoriteBtn2').addEventListener('click', () => toggleFavorite('favoriteBtn2'));
    
    // Add event listener for duration change
    document.querySelector('.booking-form select').addEventListener('change', updateBookingSummary);
    
    // Add event listener for booking button
    document.querySelector('.btn-book').addEventListener('click', handleBookingForm);
    
    // Add event listeners for like buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        if (button.querySelector('.fa-thumbs-up')) {
            button.addEventListener('click', () => toggleLike(button));
        }
    });
    
    // Initialize booking summary
    updateBookingSummary();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate any layout-dependent features
    if (window.innerWidth <= 768) {
        // Mobile-specific adjustments
        document.querySelector('.booking-panel').style.position = 'static';
    } else {
        // Desktop-specific adjustments
        document.querySelector('.booking-panel').style.position = 'sticky';
    }
});

// Handle scroll events for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});