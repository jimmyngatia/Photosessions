// DWELLO NOTIFICATIONS & ACCOUNT PAGE JAVASCRIPT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Notifications page loaded")

  // Initialize page
  initializePage()
  setupEventListeners()
  loadNotifications()
})

// ===================================
// INITIALIZATION
// ===================================
function initializePage() {
  // Set active tab based on URL hash or default to notifications
  const hash = window.location.hash.substring(1)
  const activeTab = hash || "notifications"
  switchTab(activeTab)

  // Update notification badge
  updateNotificationBadge()

  // Load user data
  loadUserData()
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const tab = e.currentTarget.dataset.tab
      switchTab(tab)

      // Update URL hash
      window.location.hash = tab
    })
  })

  // Notification filters
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterNotifications(e.target.dataset.filter)
    })
  })

  // Form submissions
  document.querySelectorAll(".settings-form").forEach((form) => {
    form.addEventListener("submit", handleFormSubmit)
  })

  // Toggle switches
  document.querySelectorAll(".toggle-switch input").forEach((toggle) => {
    toggle.addEventListener("change", handleToggleChange)
  })
}

// ===================================
// TAB MANAGEMENT
// ===================================
function switchTab(tabName) {
  // Remove active class from all nav items and tab contents
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Add active class to selected tab
  const navItem = document.querySelector(`[data-tab="${tabName}"]`)
  const tabContent = document.getElementById(tabName)

  if (navItem && tabContent) {
    navItem.classList.add("active")
    tabContent.classList.add("active")

    // Load tab-specific data
    loadTabData(tabName)
  }
}

function loadTabData(tabName) {
  switch (tabName) {
    case "notifications":
      loadNotifications()
      break
    case "inquiries":
      loadInquiries()
      break
    case "favorites":
      loadFavorites()
      break
    case "bookings":
      loadBookings()
      break
  }
}

// ===================================
// NOTIFICATIONS MANAGEMENT
// ===================================
function loadNotifications() {
  // Simulate loading notifications from API
  console.log("Loading notifications...")

  // Update notification counts
  updateNotificationCounts()
}

function filterNotifications(filter) {
  // Remove active class from all filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Add active class to clicked filter
  document.querySelector(`[data-filter="${filter}"]`).classList.add("active")

  // Show/hide notifications based on filter
  const notifications = document.querySelectorAll(".notification-item")

  notifications.forEach((notification) => {
    if (filter === "all") {
      notification.style.display = "flex"
    } else {
      const type = notification.dataset.type
      notification.style.display = type === filter ? "flex" : "none"
    }
  })

  showNotification(`Showing ${filter === "all" ? "all" : filter} notifications`, "info")
}

function markAllAsRead() {
  const unreadNotifications = document.querySelectorAll(".notification-item.unread")

  unreadNotifications.forEach((notification) => {
    notification.classList.remove("unread")
  })

  updateNotificationBadge()
  showNotification("All notifications marked as read", "success")
}

function clearAllNotifications() {
  if (confirm("Are you sure you want to clear all notifications? This action cannot be undone.")) {
    const notificationsList = document.querySelector(".notifications-list")
    notificationsList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-bell-slash"></i>
        <h3>No notifications</h3>
        <p>You're all caught up! New notifications will appear here.</p>
      </div>
    `

    updateNotificationBadge()
    showNotification("All notifications cleared", "success")
  }
}

function dismissNotification(button) {
  const notification = button.closest(".notification-item")

  // Animate out
  notification.style.transform = "translateX(100%)"
  notification.style.opacity = "0"

  setTimeout(() => {
    notification.remove()
    updateNotificationBadge()
  }, 300)

  showNotification("Notification dismissed", "info")
}

function loadMoreNotifications() {
  const loadBtn = document.querySelector(".load-more-btn")
  const originalText = loadBtn.innerHTML

  loadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
  loadBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Add more notifications here
    loadBtn.innerHTML = originalText
    loadBtn.disabled = false
    showNotification("More notifications loaded", "success")
  }, 1500)
}

function updateNotificationBadge() {
  const unreadCount = document.querySelectorAll(".notification-item.unread").length
  const badge = document.getElementById("notificationBadge")
  const navBadges = document.querySelectorAll(".nav-badge")

  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount
      badge.style.display = "flex"
    } else {
      badge.style.display = "none"
    }
  }

  // Update nav badges
  navBadges.forEach((navBadge) => {
    const navItem = navBadge.closest(".nav-item")
    if (navItem && navItem.dataset.tab === "notifications") {
      if (unreadCount > 0) {
        navBadge.textContent = unreadCount
        navBadge.style.display = "inline-block"
      } else {
        navBadge.style.display = "none"
      }
    }
  })
}

function updateNotificationCounts() {
  // Update various notification counts
  const inquiryCount = document.querySelectorAll('[data-type="inquiries"]').length
  const navInquiryBadge = document.querySelector('[data-tab="inquiries"] .nav-badge')

  if (navInquiryBadge && inquiryCount > 0) {
    navInquiryBadge.textContent = inquiryCount
    navInquiryBadge.style.display = "inline-block"
  }
}

// ===================================
// NOTIFICATION ACTIONS
// ===================================
function viewInquiry(inquiryId) {
  console.log("Viewing inquiry:", inquiryId)
  showNotification("Opening inquiry details...", "info")

  // Simulate opening inquiry modal or navigating to inquiry page
  setTimeout(() => {
    showNotification("Inquiry details loaded", "success")
  }, 1000)
}

function replyToInquiry(inquiryId) {
  console.log("Replying to inquiry:", inquiryId)
  showNotification("Opening reply form...", "info")

  // Simulate opening reply modal
  setTimeout(() => {
    showNotification("Reply form opened", "success")
  }, 1000)
}

function viewProperty(propertyId) {
  console.log("Viewing property:", propertyId)
  showNotification("Loading property details...", "info")

  // Simulate navigation to property page
  setTimeout(() => {
    showNotification("Property details loaded", "success")
  }, 1000)
}

function saveProperty(propertyId) {
  console.log("Saving property:", propertyId)
  showNotification("Property saved to favorites", "success")
}

function viewBooking(bookingId) {
  console.log("Viewing booking:", bookingId)
  showNotification("Loading booking details...", "info")
}

function downloadContract(bookingId) {
  console.log("Downloading contract for booking:", bookingId)
  showNotification("Downloading contract...", "info")

  // Simulate file download
  setTimeout(() => {
    showNotification("Contract downloaded successfully", "success")
  }, 2000)
}

function openChat(landlordId) {
  console.log("Opening chat with landlord:", landlordId)
  showNotification("Opening chat...", "info")
}

// ===================================
// USER DATA MANAGEMENT
// ===================================
function loadUserData() {
  // Simulate loading user data from API
  const userData = {
    name: "John Doe",
    email: "john.doe@student.edu",
    phone: "+254 712 345 678",
    university: "University of Nairobi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  }

  // Update UI with user data
  document.getElementById("userName").textContent = userData.name
  document.getElementById("userEmail").textContent = userData.email
  document.getElementById("userAvatar").src = userData.avatar

  // Update form fields
  document.getElementById("firstName").value = userData.name.split(" ")[0]
  document.getElementById("lastName").value = userData.name.split(" ")[1]
  document.getElementById("email").value = userData.email
  document.getElementById("phone").value = userData.phone
}

function changeAvatar() {
  // Simulate avatar change
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"

  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        document.getElementById("userAvatar").src = e.target.result
        showNotification("Avatar updated successfully", "success")
      }
      reader.readAsDataURL(file)
    }
  }

  input.click()
}

// ===================================
// FORM HANDLING
// ===================================
function handleFormSubmit(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const submitBtn = form.querySelector('button[type="submit"]')

  // Show loading state
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
    showNotification("Settings saved successfully", "success")
  }, 1500)
}

function handleToggleChange(e) {
  const toggle = e.target
  const setting = toggle.closest(".preference-item").querySelector("h4").textContent

  showNotification(`${setting} ${toggle.checked ? "enabled" : "disabled"}`, "info")
}

// ===================================
// DATA LOADING FUNCTIONS
// ===================================
function loadInquiries() {
  console.log("Loading inquiries...")
  // Simulate loading inquiry data
}

function loadFavorites() {
  console.log("Loading favorites...")
  // Simulate loading favorites data
}

function loadBookings() {
  console.log("Loading bookings...")
  // Simulate loading bookings data
}

// ===================================
// INQUIRY ACTIONS
// ===================================
function viewInquiryDetails(inquiryId) {
  console.log("Viewing inquiry details:", inquiryId)
  showNotification("Loading inquiry details...", "info")
}

function followUpInquiry(inquiryId) {
  console.log("Following up on inquiry:", inquiryId)
  showNotification("Sending follow-up message...", "info")

  setTimeout(() => {
    showNotification("Follow-up message sent", "success")
  }, 1500)
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".toast-notification")
  existingNotifications.forEach((notification) => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  })

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `toast-notification ${type}`

  let iconClass = "info-circle"
  if (type === "success") iconClass = "check-circle"
  if (type === "error") iconClass = "exclamation-circle"
  if (type === "warning") iconClass = "exclamation-triangle"

  notification.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${iconClass}"></i>
      <span>${message}</span>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    border-left: 4px solid ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : type === "warning" ? "#f59e0b" : "#3b82f6"};
  `

  notification.querySelector(".toast-content").style.cssText = `
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `

  notification.querySelector("i").style.color =
    type === "success" ? "#10b981" : type === "error" ? "#ef4444" : type === "warning" ? "#f59e0b" : "#3b82f6"

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 10)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function toggleNotificationDropdown() {
  console.log("Toggle notification dropdown")
  // This would show a quick preview of recent notifications
  showNotification("Quick notifications preview coming soon!", "info")
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + number keys for quick tab switching
  if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "6") {
    e.preventDefault()
    const tabs = ["notifications", "account", "inquiries", "favorites", "bookings", "security"]
    const tabIndex = Number.parseInt(e.key) - 1
    if (tabs[tabIndex]) {
      switchTab(tabs[tabIndex])
    }
  }

  // Escape key to close modals/notifications
  if (e.key === "Escape") {
    const toastNotifications = document.querySelectorAll(".toast-notification")
    toastNotifications.forEach((notification) => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    })
  }
})

console.log("Notifications page JavaScript loaded successfully!")
