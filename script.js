// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .gallery-item, .doctor-card, .experience-item').forEach(item => {
    observer.observe(item);
});

// Gallery Management
let galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [
    { id: 1, title: 'Modern Dental Clinic', description: 'State-of-the-art facility with latest technology' },
    { id: 2, title: 'Advanced Equipment', description: 'Cutting-edge dental technology for precise treatments' },
    { id: 3, title: 'Patient Care', description: 'Comfortable environment focused on patient well-being' },
    { id: 4, title: 'Sterile Environment', description: 'Maintaining highest standards of hygiene and safety' },
    { id: 5, title: 'Team Collaboration', description: 'Experienced professionals working together' },
    { id: 6, title: 'Patient Education', description: 'Informing patients about their oral health' }
];

function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <i class="fas fa-image"></i>
            </div>
            <h4>${image.title}</h4>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Testimonials Management
let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [
    {
        id: 1,
        content: "Exceptional dental care with a personal touch. Dr. Sharma and his team made me feel completely at ease during my root canal treatment. The results were outstanding and the follow-up care was excellent.",
        author: "Priya Patel",
        role: "Business Executive",
        rating: 5
    },
    {
        id: 2,
        content: "I've been coming to Akshar Dental for over 5 years now. Their attention to detail and commitment to using the latest techniques is remarkable. My smile transformation has been life-changing.",
        author: "Rajesh Kumar",
        role: "Teacher",
        rating: 5
    },
    {
        id: 3,
        content: "The clinic's modern facilities and friendly staff create a welcoming environment. The teeth whitening treatment I received was painless and the results exceeded my expectations.",
        author: "Meera Singh",
        role: "Software Engineer",
        rating: 5
    },
    {
        id: 4,
        content: "Professional service from start to finish. The dental implant procedure was explained clearly, and the aftercare support was outstanding. Highly recommend to anyone seeking quality dental care.",
        author: "Amit Sharma",
        role: "Entrepreneur",
        rating: 5
    }
];

function renderTestimonials() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (!testimonialsSlider) return;

    testimonialsSlider.innerHTML = '';

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonial.content}"</p>
            </div>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                    <div class="rating">
                        ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                    </div>
                </div>
            </div>
        `;
        testimonialsSlider.appendChild(testimonialCard);
    });
}

// Admin Panel Functionality
const adminToggle = document.querySelector('.admin-toggle');
const adminPanel = document.querySelector('.admin-panel');
const adminClose = document.querySelector('.admin-close');

if (adminToggle && adminPanel) {
    adminToggle.addEventListener('click', () => {
        adminPanel.classList.toggle('active');
    });

    // Close admin panel when clicking outside
    adminPanel.addEventListener('click', (e) => {
        if (e.target === adminPanel) {
            adminPanel.classList.remove('active');
        }
    });
}

// Gallery Admin Functions
function addGalleryImage(title, description) {
    const newImage = {
        id: Date.now(),
        title: title,
        description: description
    };
    galleryImages.push(newImage);
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    renderGallery();
    updateAdminGalleryList();
}

function removeGalleryImage(id) {
    galleryImages = galleryImages.filter(img => img.id !== id);
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    renderGallery();
    updateAdminGalleryList();
}

function updateAdminGalleryList() {
    const galleryList = document.getElementById('admin-gallery-list');
    if (!galleryList) return;

    galleryList.innerHTML = '';
    galleryImages.forEach(image => {
        const listItem = document.createElement('div');
        listItem.className = 'admin-list-item';
        listItem.innerHTML = `
            <span>${image.title}</span>
            <button onclick="removeGalleryImage(${image.id})" class="admin-btn delete">Remove</button>
        `;
        galleryList.appendChild(listItem);
    });
}

// Testimonials Admin Functions
function addTestimonial(content, author, role, rating) {
    const newTestimonial = {
        id: Date.now(),
        content: content,
        author: author,
        role: role,
        rating: parseInt(rating)
    };
    testimonials.push(newTestimonial);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    renderTestimonials();
    updateAdminTestimonialsList();
}

function removeTestimonial(id) {
    testimonials = testimonials.filter(t => t.id !== id);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    renderTestimonials();
    updateAdminTestimonialsList();
}

function updateAdminTestimonialsList() {
    const testimonialsList = document.getElementById('admin-testimonials-list');
    if (!testimonialsList) return;

    testimonialsList.innerHTML = '';
    testimonials.forEach(testimonial => {
        const listItem = document.createElement('div');
        listItem.className = 'admin-list-item';
        listItem.innerHTML = `
            <span>${testimonial.author} - ${testimonial.content.substring(0, 50)}...</span>
            <button onclick="removeTestimonial(${testimonial.id})" class="admin-btn delete">Remove</button>
        `;
        testimonialsList.appendChild(listItem);
    });
}

// Admin Form Handlers
document.addEventListener('DOMContentLoaded', () => {
    // Gallery form
    const galleryForm = document.getElementById('gallery-form');
    if (galleryForm) {
        galleryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(galleryForm);
            const title = formData.get('gallery-title');
            const description = formData.get('gallery-description');

            if (title && description) {
                addGalleryImage(title, description);
                galleryForm.reset();
            }
        });
    }

    // Testimonials form
    const testimonialForm = document.getElementById('testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(testimonialForm);
            const content = formData.get('testimonial-content');
            const author = formData.get('testimonial-author');
            const role = formData.get('testimonial-role');
            const rating = formData.get('testimonial-rating');

            if (content && author && role && rating) {
                addTestimonial(content, author, role, rating);
                testimonialForm.reset();
            }
        });
    }

    // Initialize content
    renderGallery();
    renderTestimonials();
    updateAdminGalleryList();
    updateAdminTestimonialsList();
});

// Booking Form Submission
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service || !data.date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Success message
        alert('Thank you for booking an appointment! We will contact you shortly to confirm your appointment.');

        // Reset form
        bookingForm.reset();
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Success message
        alert('Thank you for your message! We will get back to you within 24 hours.');

        // Reset form
        contactForm.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Re-initialize observers for dynamically added content
    document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .gallery-item, .doctor-card, .experience-item').forEach(item => {
        observer.observe(item);
    });

    // Add loading animation to page
    document.body.classList.add('loaded');
});

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);