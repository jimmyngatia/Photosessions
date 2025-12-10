document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Image upload functionality
    const uploadZone = document.getElementById('uploadZone');
    const mainImageInput = document.getElementById('mainImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');

    // Click to upload
    uploadZone.addEventListener('click', function() {
        mainImageInput.click();
    });

    // Drag and drop functionality
    uploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });

    // File input change
    mainImageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });

    // Handle image upload
    function handleImageUpload(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                uploadZone.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    }

    // Remove image
    removeImageBtn.addEventListener('click', function() {
        previewImg.src = '';
        mainImageInput.value = '';
        uploadZone.style.display = 'block';
        imagePreview.style.display = 'none';
    });

    // Form submission
    const houseForm = document.getElementById('houseForm');
    const successMessage = document.getElementById('successMessage');

    houseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['house_name', 'house_type', 'location', 'Price'];
        let isValid = true;
        
        requiredFields.forEach(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (!field.value.trim()) {
                field.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate form submission
        const formData = new FormData(this);
        
        // In a real Django app, you would submit this to your view
        console.log('Form data:', Object.fromEntries(formData));
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        this.reset();
        removeImageBtn.click();
    });

    // Preview functionality
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const closeModal = document.getElementById('closeModal');

    previewBtn.addEventListener('click', function() {
        updatePreview();
        previewModal.classList.add('show');
    });

    closeModal.addEventListener('click', function() {
        previewModal.classList.remove('show');
    });

    // Close modal when clicking outside
    previewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });

    // Update preview modal
    function updatePreview() {
        const houseName = document.getElementById('houseName').value || 'Property Name';
        const houseType = document.getElementById('houseType');
        const location = document.getElementById('location');
        const price = document.getElementById('price');
        const size = document.getElementById('size').value;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = houseName;
        document.getElementById('modalLocation').textContent = location.options[location.selectedIndex]?.text || 'Location';
        document.getElementById('modalType').textContent = houseType.options[houseType.selectedIndex]?.text || 'Type';
        document.getElementById('modalSize').textContent = size ? `${size} sq ft` : 'Size not specified';
        document.getElementById('modalPrice').textContent = price.options[price.selectedIndex]?.text || 'Price Range';
        
        // Update image
        const modalImg = document.getElementById('modalPreviewImg');
        if (previewImg.src) {
            modalImg.src = previewImg.src;
        } else {
            modalImg.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwello1-mJCchs4VTPKT025c2obQqNAnk0dBVI.png';
        }
        
        // Update amenities
        const amenitiesContainer = document.getElementById('modalAmenities');
        amenitiesContainer.innerHTML = '';
        
        const amenities = [];
        if (document.getElementById('hasWifi').checked) amenities.push('WiFi');
        if (document.getElementById('hasWater').checked) amenities.push('Water');
        if (document.getElementById('hasElectricity').checked) amenities.push('Electricity');
        
        amenities.forEach(amenity => {
            const span = document.createElement('span');
            span.className = 'amenity';
            span.textContent = amenity;
            amenitiesContainer.appendChild(span);
        });
    }

    // Show success message
    function showSuccessMessage() {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }

    // Edit and delete functionality for house items
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would populate the form with existing data
            alert('Edit functionality would be implemented here');
        });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this house?')) {
                // In a real app, this would send a delete request
                this.closest('.house-item').remove();
                showSuccessMessage();
            }
        });
    });

    // Form validation styling
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e53e3e';
            } else {
                this.style.borderColor = '#ddd';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(229, 62, 62)') {
                this.style.borderColor = '#ddd';
            }
        });
    });

    // Auto-resize textareas (if any are added)
    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // Initialize any existing textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            autoResize(this);
        });
        autoResize(textarea);
    });
});