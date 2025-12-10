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

    // Main Image Upload
    const mainUploadZone = document.getElementById('mainUploadZone');
    const mainImageInput = document.getElementById('mainImage');
    const mainImagePreview = document.getElementById('mainImagePreview');
    const mainPreviewImg = document.getElementById('mainPreviewImg');
    const removeMainImageBtn = document.getElementById('removeMainImage');

    // Click to upload main image
    mainUploadZone.addEventListener('click', function() {
        mainImageInput.click();
    });

    // Drag and drop for main image
    mainUploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    mainUploadZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    mainUploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleMainImageUpload(files[0]);
        }
    });

    // File input change for main image
    mainImageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleMainImageUpload(e.target.files[0]);
        }
    });

    // Handle main image upload
    function handleMainImageUpload(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                mainPreviewImg.src = e.target.result;
                mainUploadZone.style.display = 'none';
                mainImagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    }

    // Remove main image
    removeMainImageBtn.addEventListener('click', function() {
        mainPreviewImg.src = '';
        mainImageInput.value = '';
        mainUploadZone.style.display = 'block';
        mainImagePreview.style.display = 'none';
    });

    // Additional Images Upload
    const additionalUploadZone = document.getElementById('additionalUploadZone');
    const additionalImagesInput = document.getElementById('additionalImages');
    const additionalImagesGrid = document.getElementById('additionalImagesGrid');
    let additionalImagesArray = []; // To store additional images

    // Click to upload additional images
    additionalUploadZone.addEventListener('click', function() {
        additionalImagesInput.click();
    });

    // Drag and drop for additional images
    additionalUploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    additionalUploadZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    additionalUploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleAdditionalImagesUpload(files);
        }
    });

    // File input change for additional images
    additionalImagesInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleAdditionalImagesUpload(e.target.files);
        }
    });

    // Handle additional images upload
    function handleAdditionalImagesUpload(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = {
                        id: Date.now() + i, // Unique ID
                        src: e.target.result,
                        file: file
                    };
                    additionalImagesArray.push(imageData);
                    renderAdditionalImages();
                };
                reader.readAsDataURL(file);
            }
        }
    }

    // Render additional images
    function renderAdditionalImages() {
        additionalImagesGrid.innerHTML = '';
        
        additionalImagesArray.forEach(image => {
            const imageItem = document.createElement('div');
            imageItem.className = 'additional-image-item';
            imageItem.innerHTML = `
                <img src="${image.src}" alt="Additional Image">
                <button type="button" class="remove-additional" data-id="${image.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            additionalImagesGrid.appendChild(imageItem);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-additional').forEach(button => {
            button.addEventListener('click', function() {
                const imageId = parseInt(this.dataset.id);
                removeAdditionalImage(imageId);
            });
        });
    }

    // Remove additional image
    function removeAdditionalImage(imageId) {
        additionalImagesArray = additionalImagesArray.filter(image => image.id !== imageId);
        renderAdditionalImages();
    }

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

        // Check if main image is uploaded
        if (!mainImageInput.files[0] && mainPreviewImg.src === '') {
            mainUploadZone.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            mainUploadZone.style.borderColor = '#ddd';
        }

        if (!isValid) {
            alert('Please fill in all required fields and upload a main image.');
            return;
        }

        // Create FormData object
        const formData = new FormData(this);
        
        // Add additional images to FormData
        additionalImagesArray.forEach((image, index) => {
            formData.append(`additional_image_${index}`, image.file);
        });
        
        // In a real Django app, you would submit this to your view
        console.log('Form data:', Object.fromEntries(formData));
        console.log('Additional images:', additionalImagesArray.length);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        this.reset();
        removeMainImageBtn.click();
        additionalImagesArray = [];
        renderAdditionalImages();
    });

    // Preview functionality
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const closeModal = document.getElementById('closeModal');
    const modalGalleryGrid = document.getElementById('modalGalleryGrid');

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
        
        // Update main image
        const modalImg = document.getElementById('modalPreviewImg');
        if (mainPreviewImg.src && mainPreviewImg.src !== window.location.href) {
            modalImg.src = mainPreviewImg.src;
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

        // Update gallery
        modalGalleryGrid.innerHTML = '';
        
        if (additionalImagesArray.length > 0) {
            document.getElementById('previewGallery').style.display = 'block';
            
            additionalImagesArray.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `<img src="${image.src}" alt="Gallery Image">`;
                modalGalleryGrid.appendChild(galleryItem);
            });
        } else {
            document.getElementById('previewGallery').style.display = 'none';
        }
    }

    // Show success message
    function showSuccessMessage() {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }

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
});