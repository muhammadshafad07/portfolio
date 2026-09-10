// ==========================================
// Navbar scroll effect
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// Mobile navigation toggle
// ==========================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

function toggleNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleNav();
        }
    });
});

// ==========================================
// Active nav link on scroll
// ==========================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ==========================================
// Scroll reveal animation
// ==========================================
function addRevealClasses() {
    const revealTargets = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-grid, ' +
        '.project-card, .skill-category, .timeline-item, ' +
        '.blog-card, .contact-grid'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('visible');
        }
    });
}

addRevealClasses();
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // run on load

// ==========================================
// Contact form handling
// ==========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Get the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show sending state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#22c55e';
        submitBtn.style.borderColor = '#22c55e';
        contactForm.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// ==========================================
// Smooth scroll for all anchor links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// Typing effect for hero title (subtle)
// ==========================================
const heroTitle = document.querySelector('.hero-name');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        }
    }

    // Start after a short delay
    setTimeout(typeWriter, 300);
}