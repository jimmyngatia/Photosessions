// DWELLO DASHBOARD - SIMPLIFIED & FUNCTIONAL (HTML-BASED)
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard loaded")
    initializeDashboard()
  })
  
  // ===================================
  // INITIALIZATION
  // ===================================
  function initializeDashboard() {
    updateStats()
    // No need to load content since it's already in HTML
  }
  
  function updateStats() {
    // Count elements directly from HTML
    const totalInquiries = document.querySelectorAll(".inquiry-card").length
    const respondedInquiries = document.querySelectorAll(".inquiry-card.has-response").length
    const totalBookings = document.querySelectorAll(".booking-card").length
  
    document.getElementById("totalInquiries").textContent = totalInquiries
    document.getElementById("newResponses").textContent = respondedInquiries
    document.getElementById("totalBookings").textContent = totalBookings
    document.getElementById("notificationCount").textContent = respondedInquiries
    document.getElementById("inquiriesBadge").textContent = respondedInquiries
    document.getElementById("bookingsBadge").textContent = totalBookings
  }
  
  // ===================================
  // TAB MANAGEMENT
  // ===================================
  function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll(".nav-tab").forEach((tab) => {
      tab.classList.remove("active")
    })
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active")
    })
  
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")
    document.getElementById(tabName).classList.add("active")
  }
  
  // ===================================
  // INQUIRY FUNCTIONS
  // ===================================
  function viewInquiryResponse(inquiryId) {
    console.log("Viewing inquiry response:", inquiryId)
  
    // Find the response content for this inquiry
    const responseContent = document.querySelector(`[data-inquiry-id="${inquiryId}"]`)
  
    if (responseContent) {
      const modalBody = document.getElementById("inquiryModalBody")
      modalBody.innerHTML = responseContent.innerHTML
      showModal("inquiryModal")
    } else {
      console.error("Response content not found for inquiry:", inquiryId)
      showToast("Response content not found", "error")
    }
  }
  
  function filterInquiries(filter) {
    const inquiryCards = document.querySelectorAll(".inquiry-card")
  
    inquiryCards.forEach((card) => {
      const status = card.dataset.status
  
      if (filter === "all") {
        card.style.display = "flex"
      } else if (filter === "responded") {
        card.style.display = status === "responded" ? "flex" : "none"
      } else if (filter === "pending") {
        card.style.display = status === "pending" ? "flex" : "none"
      } else {
        card.style.display = status === filter ? "flex" : "none"
      }
    })
  
    showToast(`Showing ${filter === "all" ? "all" : filter} inquiries`, "info")
  }
  
  function replyToInquiry(inquiryId) {
    console.log("Replying to inquiry:", inquiryId)
  
    // Get the property name from the inquiry card
    const inquiryCard = document.querySelector(`[data-id="${inquiryId}"]`)
    const propertyName = inquiryCard ? inquiryCard.querySelector(".property-name").textContent : "property"
  
    const replyMessage = prompt(`Reply to inquiry for ${propertyName}:`)
    if (replyMessage && replyMessage.trim()) {
      showToast("Reply sent successfully!", "success")
    }
  }
  
  function followUpInquiry(inquiryId) {
    console.log("Following up on inquiry:", inquiryId)
  
    // Get the property name from the inquiry card
    const inquiryCard = document.querySelector(`[data-id="${inquiryId}"]`)
    const propertyName = inquiryCard ? inquiryCard.querySelector(".property-name").textContent : "property"
  
    const followUpMessage = prompt(`Send a follow-up message for ${propertyName}:`)
    if (followUpMessage && followUpMessage.trim()) {
      showToast("Follow-up message sent!", "success")
    }
  }
  
  // ===================================
  // BOOKING FUNCTIONS
  // ===================================
  function viewBookingDetails(bookingId) {
    console.log("Viewing booking details:", bookingId)
  
    // Find the booking content for this booking
    const bookingContent = document.querySelector(`[data-booking-id="${bookingId}"]`)
  
    if (bookingContent) {
      const modalBody = document.getElementById("bookingModalBody")
      modalBody.innerHTML = bookingContent.innerHTML
      showModal("bookingModal")
    } else {
      console.error("Booking content not found for booking:", bookingId)
      showToast("Booking details not found", "error")
    }
  }
  
  function filterBookings(filter) {
    const bookingCards = document.querySelectorAll(".booking-card")
  
    bookingCards.forEach((card) => {
      const status = card.dataset.status
  
      if (filter === "all") {
        card.style.display = "flex"
      } else {
        card.style.display = status === filter ? "flex" : "none"
      }
    })
  
    showToast(`Showing ${filter === "all" ? "all" : filter} bookings`, "info")
  }
  
  function downloadContract(bookingId) {
    console.log("Downloading contract for booking:", bookingId)
  
    // Get the property name from the booking card
    const bookingCard = document.querySelector(`[data-id="${bookingId}"]`)
    const propertyName = bookingCard ? bookingCard.querySelector(".booking-property").textContent : "property"
  
    showToast(`Downloading contract for ${propertyName}...`, "info")
  
    // Simulate download
    setTimeout(() => {
      showToast("Contract downloaded successfully!", "success")
    }, 2000)
  }
  
  // ===================================
  // ACCOUNT FUNCTIONS
  // ===================================
  function updateProfile(event) {
    event.preventDefault()
  
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
  
    // Update profile display
    document.getElementById("profileName").textContent = `${firstName} ${lastName}`
    document.getElementById("profileEmail").textContent = email
  
    showToast("Profile updated successfully!", "success")
  }
  
  function changeAvatar() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
  
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          document.getElementById("profileImage").src = e.target.result
          showToast("Avatar updated successfully!", "success")
        }
        reader.readAsDataURL(file)
      }
    }
  
    input.click()
  }
  
  // ===================================
  // MODAL MANAGEMENT
  // ===================================
  function showModal(modalId) {
    document.getElementById(modalId).classList.add("show")
    document.body.style.overflow = "hidden"
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("show")
    document.body.style.overflow = "auto"
  }
  
  // ===================================
  // UTILITY FUNCTIONS
  // ===================================
  function markAllAsRead() {
    showToast("All notifications marked as read", "success")
  
    // Hide notification badges
    document.getElementById("notificationCount").style.display = "none"
    document.getElementById("inquiriesBadge").style.display = "none"
  
    // Update stats
    document.getElementById("newResponses").textContent = "0"
  }
  
  function showToast(message, type = "info") {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll(".toast")
    existingToasts.forEach((toast) => toast.remove())
  
    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `
  
    toast.textContent = message
    document.body.appendChild(toast)
  
    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)"
    }, 10)
  
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(100%)"
      setTimeout(() => toast.remove(), 300)
    }, 3000)
  }
  
  // ===================================
  // EVENT LISTENERS
  // ===================================
  
  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target.id)
    }
  })
  
  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll(".modal.show")
      openModals.forEach((modal) => closeModal(modal.id))
    }
  })
  
  console.log("Dashboard JavaScript loaded successfully!")
  