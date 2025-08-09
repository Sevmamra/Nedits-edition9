/**
 * preloader.js
 * Handles the website preloader animation and transitions.
 */

// ====================================================
// Preloader Styles & Logic
// ====================================================

// Add preloader-specific animations styles
// Note: These animations are now defined here instead of the main CSS file.
const preloaderStyle = document.createElement('style');
preloaderStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes logoTransition {
        0% {
            width: 200px;
            opacity: 1;
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px) rotateY(180deg);
        }
        100% {
            width: 80px;
            opacity: 0;
            transform: translate(var(--final-x), var(--final-y)) rotateY(360deg);
        }
    }
`;
document.head.appendChild(preloaderStyle);

// Preloader Functionality
function initPreloader(onComplete) {
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    const headerLogo = document.querySelector('.logo');
    
    // Check if all necessary elements are present
    if (!preloader || !preloaderLogo || !loadingProgress || !loadingText || !headerLogo) {
        if (onComplete) onComplete();
        return;
    }
    
    // Start loading animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        const increment = 1 + Math.random() * (5 - (progress/25));
        progress = Math.min(progress + increment, 100);
        
        loadingProgress.style.width = `${progress}%`;
        loadingText.textContent = `Loading ${Math.floor(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            loadingText.textContent = "Ready!";
            
            // Calculate final position for logo
            const headerLogoRect = headerLogo.getBoundingClientRect();
            const preloaderLogoRect = preloaderLogo.getBoundingClientRect();
            
            const finalX = headerLogoRect.left - preloaderLogoRect.left + (headerLogoRect.width - 200)/2;
            const finalY = headerLogoRect.top - preloaderLogoRect.top + (headerLogoRect.height - 200)/2;
            
            // Apply animation to logo
            preloaderLogo.style.setProperty('--final-x', `${finalX}px`);
            preloaderLogo.style.setProperty('--final-y', `${finalY}px`);
            preloaderLogo.style.animation = 'logoTransition 1.5s ease-in-out forwards';
            
            // Hide preloader after animation completes
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                setTimeout(() => {
                    preloader.remove();
                    document.body.style.overflow = 'auto';
                    if (onComplete) onComplete();
                }, 1000);
            }, 500);
        }
    }, 100);
}

// Call the function on DOMContentLoaded to start the preloader
// This ensures that the preloader is initiated as soon as the HTML structure is ready.
// Note: In your main.js, we will also call initPreloader as a primary initialization step.
// document.addEventListener('DOMContentLoaded', initPreloader);
