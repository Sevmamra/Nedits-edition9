/**
 * Nedits Edition - Contact Section JavaScript
 * Manages the dynamic rendering of contact info and form submission logic.
 */

// ====================================================
// Contact Section Logic
// ====================================================

// Main function to initialize the contact section.
async function initContactForm() {
    try {
        const response = await fetch('data/contact.json');
        const data = await response.json();
        
        // Dynamically render the contact information, social links, and form fields.
        renderContactInfo(data.contact);
        renderContactForm(data.contact);
        
        // Handle form submission logic.
        handleFormSubmission();
    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}

// Function to render contact methods and social links.
function renderContactInfo(contactData) {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;

    // Render contact methods.
    const methodsContainer = contactInfo.querySelector('.contact-methods');
    if (methodsContainer) {
        methodsContainer.innerHTML = contactData.methods.map(method => `
            <div class="contact-item">
                <div class="contact-icon">
                    </div>
                <div class="contact-details">
                    <h4>${method.heading}</h4>
                    <a href="${method.type === 'address' ? '#' : method.type === 'email' ? 'mailto:' + method.value : 'tel:' + method.value}">${method.value}</a>
                </div>
            </div>
        `).join('');
    }

    // Render social links.
    const socialLinksContainer = contactInfo.querySelector('.social-links');
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = contactData.socialLinks.map(link => `
            <a href="${link.url}" aria-label="${link.platform}">
                </a>
        `).join('');
    }
}

// Function to render the contact form fields dynamically.
function renderContactForm(contactData) {
    const form = document.getElementById('neditsContactForm');
    if (!form) return;

    // Clear and render form fields.
    form.innerHTML = contactData.formFields.map(field => {
        if (field.type === 'select') {
            return `
                <div class="form-group">
                    <select id="${field.id}" name="${field.name}" ${field.required ? 'required' : ''}>
                        <option value="" disabled selected></option>
                        ${field.options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
                    </select>
                    <label for="${field.id}">${field.label}</label>
                </div>
            `;
        } else if (field.type === 'textarea') {
            return `
                <div class="form-group">
                    <textarea id="${field.id}" name="${field.name}" rows="${field.rows}" ${field.required ? 'required' : ''}></textarea>
                    <label for="${field.id}">${field.label}</label>
                </div>
            `;
        } else {
            return `
                <div class="form-group">
                    <input type="${field.type}" id="${field.id}" name="${field.name}" ${field.required ? 'required' : ''}>
                    <label for="${field.id}">${field.label}</label>
                </div>
            `;
        }
    }).join('');

    // Add the submit button at the end.
    form.innerHTML += `
        <button type="submit" class="submit-btn">
            <span>Send Message</span>
            </button>
    `;
}

// Function to handle the form submission logic.
function handleFormSubmission() {
    const form = document.getElementById('neditsContactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show "Sending..." state.
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;
        
        try {
            // Simulate a network request.
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show "Message Sent!" state.
            submitBtn.innerHTML = `<span><svg ...>...</svg> Message Sent!</span>`;
            
            form.reset();
            
            // Restore original button text after a delay.
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 3000);
        } catch (error) {
            // Show "Error!" state.
            submitBtn.innerHTML = `<span><svg ...>...</svg> Error! Try Again</span>`;
            
            // Restore original button text after a delay.
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 3000);
        }
    });
}
