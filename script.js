document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryData = [
        { src: 'img/mountain.png', category: 'nature', caption: 'Beautiful mountain landscape at sunrise' },
        { src: 'img/art3.jpg', category: 'urban', caption: 'Urban skyline at twilight' },
        { src: 'img/portrait.jpg', category: 'people', caption: 'Portrait of a young woman' },
        { src: 'img/forest.jpg', category: 'nature', caption: 'Misty forest path' },
        { src: 'img/art4.jpg', category: 'urban', caption: 'Modern architecture' },
        { src: 'img/family.jpg', category: 'people', caption: 'Family enjoying time together' },
        { src: 'img/waterfall.jpeg', category: 'nature', caption: 'Majestic waterfall' },
        { src: 'img/busyroad.jpg', category: 'urban', caption: 'Busy city street' },
        { src: 'img/couple.jpg', category: 'people', caption: 'Couple walking on the beach' },
        { src: 'img/sunset.jpg', category: 'nature', caption: 'Stunning sunset over the ocean' },
        { src: 'img/bridge.jpg', category: 'urban', caption: 'Iconic city bridge' },
        { src: 'img/park.jpg', category: 'people', caption: 'Children playing in the park' },
        { src: 'img/sunset2.jpg', category: 'nature', caption: 'Sunset over the Beach' },
        { src: 'img/nt4.jpg', category: 'nature', caption: ' Beautiful road towards mountain' },
        { src: 'img/nt-6.jpg', category: 'nature', caption: 'Beautiful Hot Air Ballon' },
        { src: 'img/art5.jpg', category: 'nature', caption: 'Old Architecture' },
        { src: 'img/nt2.jpg', category: 'nature', caption: 'Beautiful Sky at night' },
        { src: 'img/nt3.jpg', category: 'nature', caption: '' },
        { src: 'img/art1.jpg', category: 'nature', caption: 'Beautiful Buildings' },

    ];

    const gallery = document.querySelector('.gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevLightboxBtn = document.querySelector('.prev-lightbox');
    const nextLightboxBtn = document.querySelector('.next-lightbox');

    let currentIndex = 0;
    let filteredImages = [...galleryData];

    // Initialize gallery
    function initGallery() {
        gallery.innerHTML = '';
        filteredImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" class="gallery-img">
                <div class="gallery-caption">${image.caption}</div>
            `;
            
            gallery.appendChild(galleryItem);
        });

        // Add click event to gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openLightbox(index);
            });
        });
    }

    // Filter gallery
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                filteredImages = [...galleryData];
            } else {
                filteredImages = galleryData.filter(image => image.category === filter);
            }
            
            initGallery();
        });
    });

    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        scrollGallery(-1);
    });

    nextBtn.addEventListener('click', function() {
        scrollGallery(1);
    });

    function scrollGallery(direction) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return;
        
        const firstItem = galleryItems[0];
        const itemWidth = firstItem.offsetWidth + 30; // Including gap
        
        gallery.scrollBy({
            left: direction * itemWidth * 3, // Scroll 3 items at a time
            behavior: 'smooth'
        });
    }

    // Lightbox functionality
    function openLightbox(index) {
        currentIndex = index;
        const image = filteredImages[currentIndex];
        
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.caption;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigateLightbox(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = filteredImages.length - 1;
        } else if (currentIndex >= filteredImages.length) {
            currentIndex = 0;
        }
        
        const image = filteredImages[currentIndex];
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.caption;
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    prevLightboxBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    
    nextLightboxBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateLightbox(1);
    });
    
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Initialize the gallery on load
    initGallery();
});