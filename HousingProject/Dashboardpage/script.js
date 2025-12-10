// Dashboard JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab")
  
        // Remove active class from all tabs and contents
        tabButtons.forEach((btn) => {
          btn.classList.remove("active")
        })
        tabContents.forEach((content) => {
          content.classList.remove("active")
        })
  
        // Add active class to clicked tab and corresponding content
        button.classList.add("active")
        document.getElementById(targetTab).classList.add("active")
      })
    })
  
    // Property search functionality
    const searchInput = document.getElementById("propertySearch")
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase()
        const propertyItems = document.querySelectorAll(".property-item")
  
        propertyItems.forEach((item) => {
          const title = item.querySelector("h3").textContent.toLowerCase()
          const location = item.querySelector(".location").textContent.toLowerCase()
  
          if (title.includes(searchTerm) || location.includes(searchTerm)) {
            item.style.display = "grid"
          } else {
            item.style.display = "none"
          }
        })
      })
    }
  
    // Filter functionality
    const statusFilter = document.getElementById("statusFilter")
    const typeFilter = document.getElementById("typeFilter")
  
    if (statusFilter) {
      statusFilter.addEventListener("change", filterProperties)
    }
  
    if (typeFilter) {
      typeFilter.addEventListener("change", filterProperties)
    }
  
    function filterProperties() {
      const statusValue = statusFilter ? statusFilter.value : ""
      const typeValue = typeFilter ? typeFilter.value : ""
      const propertyItems = document.querySelectorAll(".property-item")
  
      propertyItems.forEach((item) => {
        let showItem = true
  
        // Status filter logic
        if (statusValue && item.dataset.status !== statusValue) {
          showItem = false
        }
  
        // Type filter logic
        if (typeValue && item.dataset.type !== typeValue) {
          showItem = false
        }
  
        item.style.display = showItem ? "grid" : "none"
      })
    }
  
    // Inquiry filter functionality
    const inquiryFilterBtns = document.querySelectorAll(".filter-btn")
    inquiryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const status = btn.getAttribute("data-status")
  
        // Remove active class from all filter buttons
        inquiryFilterBtns.forEach((b) => {
          b.classList.remove("active")
        })
        btn.classList.add("active")
  
        // Filter inquiries
        const inquiryItems = document.querySelectorAll(".inquiry-item")
        inquiryItems.forEach((item) => {
          if (status === "all" || item.classList.contains(status)) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  
    // Set up respond buttons
    const respondButtons = document.querySelectorAll(".btn-respond")
    respondButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Get inquiry details from the parent elements
        const inquiryItem = this.closest(".inquiry-item")
        const from = inquiryItem.querySelector(".inquirer-info h4").textContent
        const property = inquiryItem.querySelector(".inquiry-property").textContent
        const message = inquiryItem.querySelector(".inquiry-message p").textContent
  
        // Set values in the modal
        document.getElementById("inquiryFrom").textContent = from
        document.getElementById("inquiryProperty").textContent = property
        document.getElementById("inquiryMessage").textContent = message
  
        // Show the modal
        document.getElementById("responseModal").classList.add("show")
      })
    })
  
    // Mark as read functionality
    const markReadButtons = document.querySelectorAll(".btn-mark-read")
    markReadButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const inquiryItem = this.closest(".inquiry-item")
  
        // Remove new class and add responded class
        inquiryItem.classList.remove("new")
        inquiryItem.classList.add("responded")
  
        // Update status badge
        const statusBadge = inquiryItem.querySelector(".inquiry-status")
        statusBadge.textContent = "Responded"
        statusBadge.classList.remove("new")
        statusBadge.classList.add("responded")
  
        // Replace buttons
        const actionDiv = inquiryItem.querySelector(".inquiry-actions")
        actionDiv.innerHTML = '<button class="btn-view-thread">View Thread</button>'
  
        // Show notification
        showNotification("Marked as read", "success")
      })
    })
  })
  
  // Delete property functionality
  var propertyToDelete = null
  
  function deleteProperty(propertyId) {
    propertyToDelete = propertyId
    const modal = document.getElementById("deleteModal")
    modal.classList.add("show")
  }
  
  function closeDeleteModal() {
    const modal = document.getElementById("deleteModal")
    modal.classList.remove("show")
    propertyToDelete = null
  }
  
  function confirmDelete() {
    if (propertyToDelete) {
      // Find and remove the property element
      const propertyElement = document.querySelector('[data-property-id="' + propertyToDelete + '"]')
      if (propertyElement) {
        propertyElement.remove()
      }
  
      // Show success message
      showNotification("Property deleted successfully", "success")
      closeDeleteModal()
    }
  }
  
  // Response modal functionality
  function closeResponseModal() {
    const modal = document.getElementById("responseModal")
    modal.classList.remove("show")
    document.getElementById("responseMessage").value = ""
  }
  
  function sendResponse() {
    const responseText = document.getElementById("responseMessage").value.trim()
  
    if (!responseText) {
      showNotification("Please enter a response message", "error")
      return
    }
  
    // In a real app, you would send this to the server
    // For now, just show a success message and close the modal
    showNotification("Response sent successfully", "success")
    closeResponseModal()
  
    // Update the UI to show the inquiry as responded
    const inquiryFrom = document.getElementById("inquiryFrom").textContent
    const inquiryItems = document.querySelectorAll(".inquiry-item.new")
  
    inquiryItems.forEach((item) => {
      const name = item.querySelector(".inquirer-info h4").textContent
      if (name === inquiryFrom) {
        // Update status
        item.classList.remove("new")
        item.classList.add("responded")
  
        // Update status badge
        const statusBadge = item.querySelector(".inquiry-status")
        statusBadge.textContent = "Responded"
        statusBadge.classList.remove("new")
        statusBadge.classList.add("responded")
  
        // Replace buttons
        const actionDiv = item.querySelector(".inquiry-actions")
        actionDiv.innerHTML = '<button class="btn-view-thread">View Thread</button>'
      }
    })
  }
  
  // Notification system
  function showNotification(message, type) {
    if (!type) type = "info"
  
    // Create notification element
    const notification = document.createElement("div")
    notification.className = "notification " + type
  
    var iconClass = "info-circle"
    if (type === "success") iconClass = "check-circle"
    if (type === "error") iconClass = "exclamation-circle"
  
    notification.innerHTML =
      '<div class="notification-content">' +
      '<i class="fas fa-' +
      iconClass +
      '"></i>' +
      "<span>" +
      message +
      "</span>" +
      "</div>"
  
    // Add to DOM
    document.body.appendChild(notification)
  
    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)
  
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }
  
  // Close modals when clicking outside
  document.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.classList.remove("show")
      }
    })
  })

// Send Inquiry Modal Functionality
document.addEventListener("DOMContentLoaded", function() {
  // Set up send inquiry button click handlers
  const sendInquiryButtons = document.querySelectorAll("#send-inquiry, .send-inquiry-btn, [data-action='send-inquiry']");
  
  sendInquiryButtons.forEach(function(button) {
      button.addEventListener("click", function(e) {
          e.preventDefault();
          
          // Get property name from the button's data attribute or nearby elements
          let propertyName = "";
          
          // Try to get property name from data attribute
          if (this.dataset.property) {
              propertyName = this.dataset.property;
          }
          // Try to get from nearby h3 or title element
          else {
              const propertyCard = this.closest(".property-card, .card, .property-item");
              if (propertyCard) {
                  const titleElement = propertyCard.querySelector("h3, .property-title, .card-title");
                  if (titleElement) {
                      propertyName = titleElement.textContent.trim();
                  }
              }
          }
          
          // Set the property name in the modal
          document.getElementById("propertyName").value = propertyName || "Property Inquiry";
          
          // Show the modal
          document.getElementById("sendInquiryModal").classList.add("show");
      });
  });
});

// Close modal function
function closeSendInquiryModal() {
  const modal = document.getElementById("sendInquiryModal");
  modal.classList.remove("show");
  
  // Reset form
  document.getElementById("inquiryForm").reset();
}

// Send inquiry function
function sendInquiry() {
  const form = document.getElementById("inquiryForm");
  const formData = new FormData(form);
  
  // Basic validation
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();
  
  if (!name || !email || !message) {
      showNotification("Please fill in all required fields", "error");
      return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
  }
  
  // Disable submit button to prevent double submission
  const submitBtn = document.querySelector("#sendInquiryModal .btn-primary");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  
  // For Django integration, you can uncomment and modify this AJAX call:
  /*
  fetch('/send-inquiry/', {
      method: 'POST',
      body: formData,
      headers: {
          'X-CSRFToken': getCookie('csrftoken')
      }
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          showNotification("Inquiry sent successfully! We'll get back to you soon.", "success");
          closeSendInquiryModal();
      } else {
          showNotification(data.message || "Failed to send inquiry. Please try again.", "error");
      }
  })
  .catch(error => {
      console.error('Error:', error);
      showNotification("An error occurred. Please try again.", "error");
  })
  .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Inquiry";
  });
  */
  
  // For demo purposes (remove this when integrating with Django)
  setTimeout(function() {
      showNotification("Inquiry sent successfully! We'll get back to you soon.", "success");
      closeSendInquiryModal();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Inquiry";
  }, 1000);
}

// Notification system
function showNotification(message, type) {
  if (!type) type = "info";
  
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach(function(notification) {
      notification.remove();
  });
  
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification " + type;
  
  let iconClass = "info-circle";
  if (type === "success") iconClass = "check-circle";
  if (type === "error") iconClass = "exclamation-circle";
  
  notification.innerHTML = 
      '<div class="notification-content">' +
      '<i class="fas fa-' + iconClass + '"></i>' +
      '<span>' + message + '</span>' +
      '</div>';
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(function() {
      notification.style.transform = "translateX(0)";
  }, 10);
  
  // Remove after 5 seconds
  setTimeout(function() {
      notification.style.transform = "translateX(100%)";
      setTimeout(function() {
          if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
          }
      }, 300);
  }, 5000);
}

// Close modal when clicking outside
document.addEventListener("click", function(event) {
  const modal = document.getElementById("sendInquiryModal");
  if (event.target === modal) {
      closeSendInquiryModal();
  }
});

// Close modal with escape key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
      const modal = document.getElementById("sendInquiryModal");
      if (modal.classList.contains("show")) {
          closeSendInquiryModal();
      }
  }
});

// Utility function for Django CSRF token (uncomment when needed)
/*
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
*/
  
  // Close modals with escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const modals = document.querySelectorAll(".modal.show")
      modals.forEach((modal) => {
        modal.classList.remove("show")
      })
    }
  })
  