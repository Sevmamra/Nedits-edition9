/**
 * Nedits Edition - Counters JavaScript
 * Manages the animated counters for the Achievements section.
 */

// ====================================================
// Achievements Counters Logic
// ====================================================

// Main function to initialize the counters.
function initAchievementsCounters() {
    const achievementsSection = document.getElementById('achievements');
    if (!achievementsSection) return;

    // Use IntersectionObserver to start the animation when the section is visible.
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const clientsCounter = document.getElementById('clientsCounter');
            const projectsCounter = document.getElementById('projectsCounter');
            const experienceCounter = document.getElementById('experienceCounter');
            
            // Animate each counter with its target value.
            animateCounter(clientsCounter, 100);
            animateCounter(projectsCounter, 250);
            animateCounter(experienceCounter, 5);
            
            // Stop observing after the animations have started.
            observer.disconnect();
        }
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible.

    observer.observe(achievementsSection);
}

// Generic function to animate a counter from 0 to a target value.
function animateCounter(element, target) {
    if (!element) return;
    
    const duration = 2000; // Animation duration in milliseconds.
    const start = 0;
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentCount = Math.min(Math.floor((progress / duration) * target), target);

        element.textContent = currentCount;

        if (progress < duration) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    // Start the animation.
    requestAnimationFrame(updateCounter);
}
