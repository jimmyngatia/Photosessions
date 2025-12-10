document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-actions').prepend(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });
    
    // Testimonial slider
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            // Here you would add logic to change the testimonials shown
        });
    });
    
    // Property card image navigation
    const prevBtns = document.querySelectorAll('.nav-btn.prev');
    const nextBtns = document.querySelectorAll('.nav-btn.next');
    
    // This is a placeholder for actual image gallery functionality
    // In a real implementation, you would have multiple images per property
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Previous image');
        });
    });
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next image');
        });
    });
    
    // Favorite button functionality
    const addFavoriteBtn = document.createElement('button');
    addFavoriteBtn.classList.add('favorite-btn');
    addFavoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    
    document.querySelectorAll('.card-image').forEach(cardImage => {
        const favoriteBtn = addFavoriteBtn.cloneNode(true);
        cardImage.appendChild(favoriteBtn);
        
        favoriteBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#e53e3e';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email || !isValidEmail(email)) {
                emailInput.style.borderColor = '#e53e3e';
                // You could add a more sophisticated error message here
            } else {
                emailInput.style.borderColor = '#4CAF50';
                // Here you would typically send the form data to your server
                console.log('Newsletter subscription:', email);
                // Reset the form
                this.reset();
                alert('Thank you for subscribing to our newsletter!');
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.residence-card, .testimonial-card, .features-content, .features-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .residence-card, .testimonial-card, .features-content, .features-image {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            nav ul {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                display: none;
            }
            
            nav ul.show {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});