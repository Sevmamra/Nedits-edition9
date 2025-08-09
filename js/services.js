/**
 * Nedits Edition - Services Section JavaScript
 * Handles dynamic content rendering and carousel functionality for the services section.
 */

// ====================================================
// Services Section Logic
// ====================================================

// Main function to initialize the services section.
async function initServices() {
    try {
        // Fetch services data from a JSON file.
        const response = await fetch('data/services.json');
        const data = await response.json();
        
        // Render the service categories and cards.
        renderServices(data.services);
        
        // Initialize the carousel for each service category.
        initServicesCarousels();
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Function to render services categories and cards from the JSON data.
function renderServices(categories) {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;

    categories.forEach(category => {
        const categoryHTML = `
            <div class="services-category" data-aos="fade-up">
                <div class="category-header">
                    <img src="images/services/${category.icon}" alt="${category.category}">
                    <h3>${category.category}</h3>
                </div>
                <div class="services-container">
                    <div class="services-carousel">
                        ${category.services.map(service => `
                            <div class="service-card" onclick="window.location.href='services-pages/${service.slug}.html'">
                                <div class="card-content">
                                    <img src="images/services/${service.icon}" alt="${service.title}" class="service-icon">
                                    <h4>${service.title}</h4>
                                    <p>${service.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="carousel-nav">
                        <button class="carousel-prev">❮</button>
                        <button class="carousel-next">❯</button>
                    </div>
                </div>
            </div>
        `;
        servicesSection.insertAdjacentHTML('beforeend', categoryHTML);
    });
}

// Function to initialize the carousel functionality for each services category.
function initServicesCarousels() {
    const serviceContainers = document.querySelectorAll('.services-category');
    
    serviceContainers.forEach(container => {
        const carousel = container.querySelector('.services-carousel');
        const cards = Array.from(carousel.querySelectorAll('.service-card'));
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        const totalCards = cards.length;
        let currentIndex = 0;
        let carouselInterval;
        let isPaused = false;
        let isAnimating = false;

        // Start the carousel auto-rotation and initialize card positions.
        updateCards();
        startCarousel();

        // Event listener for the "Previous" button.
        prevBtn.addEventListener('click', () => {
            navigate(-1);
        });

        // Event listener for the "Next" button.
        nextBtn.addEventListener('click', () => {
            navigate(1);
        });

        // Event listener for clicking on a card.
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (isAnimating) return;
                
                const clickedIndex = cards.indexOf(e.currentTarget);
                if (clickedIndex !== currentIndex) {
                    currentIndex = clickedIndex;
                    updateCards();
                } else {
                    // Toggles a highlight effect for the center card.
                    card.classList.toggle('active');
                }
                resetCarousel();
            });
        });

        // Pause the carousel when the mouse enters the container.
        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
            clearInterval(carouselInterval);
        });

        // Resume the carousel when the mouse leaves the container.
        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
            startCarousel();
        });

        // Helper function to navigate the carousel.
        function navigate(direction) {
            if (isAnimating) return;
            currentIndex = (currentIndex + direction + totalCards) % totalCards;
            updateCards();
            resetCarousel();
        }

        // Helper function to update the CSS classes and styles of the cards.
        function updateCards() {
            if (isAnimating) return;
            isAnimating = true;

            cards.forEach(card => {
                card.classList.remove('center', 'left', 'right', 'active');
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '0';
                card.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });

            const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
            const rightIndex = (currentIndex + 1) % totalCards;

            cards[leftIndex].classList.add('left');
            cards[leftIndex].style.opacity = '0.6';
            cards[leftIndex].style.transform = 'translate(-150%, -50%) scale(0.7) rotateY(30deg)';

            cards[currentIndex].classList.add('center');
            cards[currentIndex].style.opacity = '1';
            cards[currentIndex].style.transform = 'translate(-50%, -50%) scale(1.1)';

            cards[rightIndex].classList.add('right');
            cards[rightIndex].style.opacity = '0.6';
            cards[rightIndex].style.transform = 'translate(50%, -50%) scale(0.7) rotateY(-30deg)';

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        // Helper function to start the carousel auto-rotation.
        function startCarousel() {
            if (isPaused) return;
            carouselInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCards();
            }, 4000);
        }

        // Helper function to reset the auto-rotation timer.
        function resetCarousel() {
            clearInterval(carouselInterval);
            startCarousel();
        }
    });
}
