// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.blend-card, .about-card, .payment-card, .tea-labels');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to tea labels
document.addEventListener('DOMContentLoaded', () => {
    const labelTags = document.querySelectorAll('.label-tag');

    labelTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Payment button interactions
document.addEventListener('DOMContentLoaded', () => {
    const paymentButtons = document.querySelectorAll('.btn-payment');

    paymentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Add a ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Show a message (in a real app, this would redirect to payment)
            showPaymentMessage(button.textContent);
        });
    });
});

// Payment message function
function showPaymentMessage(paymentMethod) {
    const message = document.createElement('div');
    message.className = 'payment-message';
    message.innerHTML = `
        <div class="message-content">
            <h4>Redirecting to ${paymentMethod}...</h4>
            <p>In a real application, this would redirect you to the payment processor.</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;

    // Style the message
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const content = message.querySelector('.message-content');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;

    const closeButton = message.querySelector('button');
    closeButton.style.cssText = `
        background-color: #27ae60;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        margin-top: 1rem;
        cursor: pointer;
        font-weight: 600;
    `;

    document.body.appendChild(message);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 3000);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-payment {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .payment-message h4 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }

    .payment-message p {
        color: #7f8c8d;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Close any payment messages
        const messages = document.querySelectorAll('.payment-message');
        messages.forEach(message => message.remove());
    }
});

// Add focus management for better accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #27ae60;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content id
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.id = 'main-content';
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Waitlist Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const submitButton = waitlistForm.querySelector('.btn-waitlist');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const formSuccess = document.getElementById('formSuccess');

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        return name.trim().length >= 2;
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        const formGroup = field.closest('.form-group');

        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        const formGroup = field.closest('.form-group');

        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
    }

    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const errorGroups = document.querySelectorAll('.form-group.error');

        errorElements.forEach(el => el.classList.remove('show'));
        errorGroups.forEach(group => group.classList.remove('error'));
    }

    // Real-time validation
    const emailField = document.getElementById('email');
    const nameField = document.getElementById('name');
    const interestField = document.getElementById('interest');

    emailField.addEventListener('blur', () => {
        const email = emailField.value.trim();
        if (email && !validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
        } else {
            clearError('email');
        }
    });

    nameField.addEventListener('blur', () => {
        const name = nameField.value.trim();
        if (name && !validateName(name)) {
            showError('name', 'Please enter your full name (at least 2 characters)');
        } else {
            clearError('name');
        }
    });

    interestField.addEventListener('change', () => {
        if (interestField.value) {
            clearError('interest');
        }
    });

    // Form submission
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearAllErrors();

        // Get form data
        const formData = new FormData(waitlistForm);
        const email = formData.get('email').trim();
        const name = formData.get('name').trim();
        const interest = formData.get('interest');
        const newsletter = formData.get('newsletter') === 'on';

        // Validate form
        let isValid = true;

        if (!email) {
            showError('email', 'Email address is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!name) {
            showError('name', 'Full name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError('name', 'Please enter your full name (at least 2 characters)');
            isValid = false;
        }

        if (!interest) {
            showError('interest', 'Please select your primary wellness goal');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        try {
            // Simulate API call (replace with actual endpoint)
            await submitWaitlistData({
                email,
                name,
                interest,
                newsletter,
                timestamp: new Date().toISOString()
            });

            // Show success message
            waitlistForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Error submitting waitlist:', error);

            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.innerHTML = `
                <div style="background-color: #f8d7da; color: #721c24; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
                    <strong>Oops!</strong> Something went wrong. Please try again or contact us directly.
                </div>
            `;
            waitlistForm.appendChild(errorMessage);

            // Remove error message after 5 seconds
            setTimeout(() => {
                if (errorMessage.parentElement) {
                    errorMessage.remove();
                }
            }, 5000);

        } finally {
            // Reset button state
            submitButton.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });

    // Function to submit waitlist data
    async function submitWaitlistData(data) {
        // Production API endpoint (update this URL when deploying)
        const API_ENDPOINT = 'https://your-server-url.com/api/waitlist';

        // For development, simulate the API call
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Waitlist submission (dev mode):', data);
            return { success: true, message: 'Successfully joined waitlist!' };
        }

        // Production API call
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to submit waitlist data');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
});
