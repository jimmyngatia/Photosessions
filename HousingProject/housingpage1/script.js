// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Testimonials carousel (basic slider)
    const testimonialContainers = document.querySelectorAll(".testimonial");
    const dotsContainer = document.querySelector(".testimonial-dots");
  
    if (testimonialContainers.length > 1 && dotsContainer) {
      let current = 0;
  
      function showTestimonial(index) {
        testimonialContainers.forEach((el, i) => {
          el.style.display = i === index ? "block" : "none";
        });
      }
  
      function createDots() {
        testimonialContainers.forEach((_, i) => {
          const dot = document.createElement("button");
          dot.classList.add("dot");
          if (i === current) dot.classList.add("active");
          dot.addEventListener("click", () => {
            current = i;
            updateCarousel();
          });
          dotsContainer.appendChild(dot);
        });
      }
  
      function updateCarousel() {
        showTestimonial(current);
        dotsContainer.querySelectorAll(".dot").forEach((d, i) => {
          d.classList.toggle("active", i === current);
        });
      }
  
      showTestimonial(current);
      createDots();
    }
  
    // Show more residences
    const showMoreBtn = document.querySelector(".show-more-btn");
    const hiddenCards = document.querySelectorAll(".card.hidden");
  
    if (showMoreBtn) {
      showMoreBtn.addEventListener("click", () => {
        hiddenCards.forEach((card) => card.classList.remove("hidden"));
        showMoreBtn.style.display = "none";
      });
    }
  
    // FAQ toggles (if implemented)
    const faqItems = document.querySelectorAll(".faq-item");
  
    faqItems.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("open");
      });
    });
  });