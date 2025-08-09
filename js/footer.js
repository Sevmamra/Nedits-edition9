/**
 * Nedits Edition - Footer Section JavaScript
 * Manages dynamic content rendering and interactive elements in the footer.
 */

// ====================================================
// Footer Logic
// ====================================================

// Main function to initialize the footer functionality.
async function initFooter() {
    try {
        const response = await fetch('data/footer.json');
        const data = await response.json();
        
        // Render footer content based on the fetched data.
        renderFooterContent(data.footer);
        
        // Handle newsletter form submission.
        handleNewsletterForm();

        // Add hover animations to footer links.
        animateFooterLinks();
    } catch (error) {
        console.error('Error loading footer data:', error);
    }
}

// Function to render footer links and contact information dynamically.
function renderFooterContent(footerData) {
    const servicesList = document.querySelector('.footer-services ul');
    if (servicesList) {
        servicesList.innerHTML = footerData.services.map(service => `
            <li><a href="${service.url}">${service.text}</a></li>
        `).join('');
    }
    
    const contactInfoList = document.querySelector('.footer-contact .contact-info');
    if (contactInfoList) {
        contactInfoList.innerHTML = footerData.contactInfo.map(info => `
            <li>
                ${info.type === 'address' ? `<span>${info.value}</span>` : `<a href="${info.url}">${info.value}</a>`}
            </li>
        `).join('');
    }

    const socialLinks = document.querySelector('.footer-social');
    if (socialLinks) {
        socialLinks.innerHTML = footerData.socialLinks.map(link => `
            <a href="${link.url}" aria-label="${link.platform}">
                </a>
        `).join('');
    }
}

// Function to handle the newsletter form submission.
function handleNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button');
        
        const originalHTML = submitBtn.innerHTML;
        
        // Show "Loading" state.
        submitBtn.innerHTML = `<svg class="spinner" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle></svg>`;
        
        // Simulate a form submission.
        setTimeout(() => {
            // Show "Success" state.
            submitBtn.innerHTML = ``;
            emailInput.value = '';
            
            const successMsg = document.createElement('p');
            successMsg.className = 'newsletter-success';
            successMsg.textContent = 'Thanks for subscribing!';
            successMsg.style.color = '#7b0091';
            successMsg.style.marginTop = '10px';
            successMsg.style.fontSize = '0.9rem';
            newsletterForm.appendChild(successMsg);
            
            // Restore original button state.
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                successMsg.remove();
            }, 3000);
        }, 1500);
    });
}

// Function to add hover animations to footer links.
function animateFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-services a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
}
