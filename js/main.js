/**
 * Nedits Edition - Main JavaScript File
 * Contains global initializations and event listeners.
 */

// Wait for the DOM to be fully loaded before running the scripts.
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the AOS animation library.
    // This function is defined in animations.js, but we can call it here.
    initAOS();

    // Initialize all modular scripts.
    initPreloader();
    initAboutSection();
    initServices();
    initAchievementsCounters();
    initTestimonialsCarousel();
    initContactForm();
    initFooter();

    // Set the current year in the footer.
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation links.
    smoothScroll();
});

// ====================================================
// Global Helper Functions
// ====================================================

// Function to handle smooth scrolling for anchor links.
function smoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            // Check if the link has a valid hash and a corresponding element exists.
            if (link.hash && document.querySelector(link.hash)) {
                e.preventDefault(); // Prevents the default jump-to-anchor behavior.
                document.querySelector(link.hash).scrollIntoView({ 
                    behavior: 'smooth' // Scrolls to the element smoothly.
                });
            }
        });
    });
}
