/**
 * Nedits Edition - Testimonials Section JavaScript
 * Manages the dynamic testimonials carousel and its navigation.
 */

// ====================================================
// Testimonials Carousel Logic
// ====================================================

// Main function to initialize the testimonials carousel.
async function initTestimonialsCarousel() {
    try {
        const response = await fetch('data/testimonials.json');
        const data = await response.json();
        
        // Render the testimonial cards based on the fetched data.
        renderTestimonials(data.testimonials);
        
        // Setup the carousel functionality after rendering.
        setupCarousel();
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Function to render testimonial cards from the JSON data.
function renderTestimonials(testimonials) {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    carousel.innerHTML = ''; // Clear existing content.
    
    testimonials.forEach(testimonial => {
        const cardHTML = `
            <div class="testimonial-card" data-aos="zoom-in">
                <div class="client-img">
                    <img src="${testimonial.clientImage}" alt="${testimonial.clientName}">
                </div>
                <div class="testimonial-content">
                    <div class="rating">${'★'.repeat(testimonial.rating)}</div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="client-info">
                        <h4 class="client-name">${testimonial.clientName}</h4>
                        <p class="client-role">${testimonial.clientRole}</p>
                    </div>
                </div>
            </div>
        `;
        carousel.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Function to set up the carousel's interactive behavior.
function setupCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!carousel || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

    let autoScrollInterval;
    let isHovering = false;
    let cardWidth = cards[0].offsetWidth + 30; // Card width + gap.

    // Helper function to determine how many cards are visible.
    function getVisibleCardsCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    // Helper function to scroll to a specific card index.
    function scrollToCard(index) {
        carousel.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        updateActiveDot(index);
    }

    // Helper function to get the current visible card group index.
    function getCurrentGroupIndex() {
        const visibleCards = getVisibleCardsCount();
        return Math.round(carousel.scrollLeft / (cardWidth * visibleCards));
    }

    // Helper function to update the active navigation dot.
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        const groupIndex = Math.floor(index / getVisibleCardsCount());
        if (dots[groupIndex]) {
            dots[groupIndex].classList.add('active');
        }
    }

    // Function to generate the navigation dots dynamically.
    function generateDots() {
        dotsContainer.innerHTML = '';
        const visibleCards = getVisibleCardsCount();
        const totalGroups = Math.ceil(cards.length / visibleCards);

        for (let i = 0; i < totalGroups; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToCard(i * visibleCards));
            dotsContainer.appendChild(dot);
        }
    }

    // Function to start the automatic scrolling.
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (isHovering) return;

            const visibleCards = getVisibleCardsCount();
            const currentIndex = getCurrentGroupIndex();
            const totalGroups = Math.ceil(cards.length / visibleCards);
            const nextIndex = (currentIndex + 1) % totalGroups;

            scrollToCard(nextIndex * visibleCards);
        }, 5000);
    }

    // Function to reset and restart the auto-scroll timer.
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    // Set up event listeners for navigation and hover effects.
    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const index = getCurrentGroupIndex();
        scrollToCard(Math.max(0, index - 1) * visibleCards);
        resetAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const index = getCurrentGroupIndex();
        const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
        scrollToCard(Math.min(maxIndex, index + 1) * visibleCards);
        resetAutoScroll();
    });

    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
        resetAutoScroll();
    });

    // Update the active dot as the user scrolls manually.
    carousel.addEventListener('scroll', () => {
        updateActiveDot(getCurrentGroupIndex() * getVisibleCardsCount());
    });

    // Recalculate dots and carousel behavior on window resize.
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 30;
        generateDots();
        resetAutoScroll();
    });

    // Initial setup.
    generateDots();
    startAutoScroll();
}
