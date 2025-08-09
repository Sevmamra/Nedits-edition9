/**
 * Nedits Edition - Animations JavaScript File
 * Handles all visual animations like AOS, Hero background, and section headings.
 */

// ====================================================
// AOS & Global Animations
// ====================================================

// Function to initialize the AOS animation library.
function initAOS() {
    // AOS.init is provided by the AOS library CDN.
    AOS.init({
        duration: 800, // Sets the animation duration to 800ms.
        easing: 'ease-in-out', // Defines the animation timing function.
        once: true // Ensures animations only happen once as the element scrolls into view.
    });
}

// Function to handle the Hero section's background slideshow.
function heroBackgroundSlideshow() {
    const hero = document.querySelector('.hero');
    if (!hero) return; // Exit if the hero section doesn't exist.

    const heroImages = [
        'images/hero-bg1.jpg',
        'images/hero-bg2.jpg',
        'images/hero-bg3.jpg',
        'images/hero-bg4.jpg',
        'images/hero-bg5.jpg',
        'images/hero-bg6.jpg'
    ];
    let availableImages = [...heroImages]; // Create a copy of the array.

    function changeBackground() {
        // If all images have been shown, reset the pool.
        if (availableImages.length === 0) availableImages = [...heroImages];
        
        // Pick a random image from the available pool.
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages.splice(randomIndex, 1)[0];
        
        // Update the background image with a linear gradient overlay.
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${selectedImage}')`;
    }

    // Start the slideshow immediately and then repeat every 3 seconds.
    changeBackground();
    setInterval(changeBackground, 3000);
}

// Function to animate the section headings.
function animateSectionHeadings() {
    const sectionHeadings = document.querySelectorAll('.section h2');
    if (sectionHeadings.length === 0) return;

    // Use IntersectionObserver to detect when headings come into view.
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger the CSS animation.
                entry.target.classList.add('aos-animate');
                // Stop observing this heading once it has animated.
                headingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the heading is visible.

    // Observe each heading element.
    sectionHeadings.forEach(h2 => headingObserver.observe(h2));
}

// ====================================================
// Main entry point for animations
// ====================================================

document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    heroBackgroundSlideshow();
    animateSectionHeadings();
});
