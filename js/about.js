/**
 * Nedits Edition - About Section JavaScript
 * Manages the typewriter effect and the collapsible "Read More" functionality.
 */

// ====================================================
// About Section Logic
// ====================================================

function initAboutSection() {
    // Fetch content from the about.json file.
    fetch('data/about.json')
        .then(response => response.json())
        .then(data => {
            // Set static content from the JSON file.
            document.getElementById('philosophy-text').textContent = data.about.philosophy;
            document.getElementById('approach-text').textContent = data.about.approach;
            
            // Populate the list of core values.
            const valuesList = document.getElementById('values-list');
            if (valuesList) {
                valuesList.innerHTML = '';
                data.about.values.forEach(value => {
                    const li = document.createElement('li');
                    li.textContent = value;
                    valuesList.appendChild(li);
                });
            }
            
            // Start the typewriter effect for the intro text.
            const aboutTextElement = document.getElementById('about-text');
            if (aboutTextElement && data.about.intro) {
                initTypewriter('about-text', data.about.intro, () => {
                    // Show the read more button once the typing is complete.
                    document.querySelector('.read-more-container').classList.add('visible');
                });
            }
        })
        .catch(error => console.error('Error loading about data:', error));

    // Add event listener for the "Read More" button.
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const content = document.querySelector('.about-content');
            if (!content) return;
            
            const isExpanding = !content.classList.contains('about-expanded');
            
            // Update the button text instantly.
            this.querySelector('span').textContent = isExpanding ? 'Read Less' : 'Read More';
            
            // Toggle the expanded state by adding/removing the CSS class.
            content.classList.toggle('about-expanded');
            
            // Smoothly scroll to the expanded content if needed.
            if (isExpanding) {
                setTimeout(() => {
                    content.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest'
                    });
                }, 300);
            }
        });
    }
}

// Generic Typewriter Effect function.
function initTypewriter(elementId, text, onComplete) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = ''; // Clear existing text.
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            
            // Add a variable delay to simulate natural typing speed.
            const delay = text.charAt(i-1) === ' ' ? 25 : Math.random() * 30 + 30;
            setTimeout(type, delay);
        } else if (onComplete) {
            onComplete(); // Call the callback function when typing is finished.
        }
    }
    
    // Use an IntersectionObserver to start the typing animation only when the element is visible.
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            type();
            observer.disconnect(); // Stop observing after the animation has started.
        }
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible.

    observer.observe(element);
}
