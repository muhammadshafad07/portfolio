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
        '.project-card, .edu-card, .skill-category, .timeline-item, ' +
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

contactForm.addEventListener('submit', async (e) => {
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

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#22c55e';
            submitBtn.style.borderColor = '#22c55e';
            contactForm.reset();
        } else {
            const data = await response.json();
            if (data.errors) {
                alert('Please check: ' + data.errors.map(error => error.message).join(', '));
            } else {
                alert('Something went wrong. Please try again.');
            }
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        alert('Network error. Please check your connection and try again.');
        submitBtn.textContent = originalText;
    }

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
    }, 3000);
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
// Animated text rotator (hero title)
// ==========================================
const typeText = document.getElementById('type-text');
const roles = [
    'Data Analyst',
    'Operations Professional',
    'Power BI Developer',
    'Excel & Reporting Expert'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        typeText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = deleting ? 40 : 90;

    if (!deleting && charIndex === currentRole.length) {
        delay = 1800;
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

if (typeText) {
    setTimeout(type, 500);
}

// ==========================================
// Project filters
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const match = filter === 'all' || category === filter;

            if (match) {
                card.classList.remove('hide');
                card.classList.add('show');
            } else {
                card.classList.remove('show');
                card.classList.add('hide');
            }
        });
    });
});

// ==========================================
// Animated counters (About stats)
// ==========================================
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        statNumbers.forEach(stat => {
            if (stat.dataset.counted) return;
            stat.dataset.counted = 'true';

            const raw = stat.textContent;
            const suffixMatch = raw.match(/([+\-%]+)$/);
            const suffix = suffixMatch ? suffixMatch[1] : '';
            const target = parseInt(raw.replace(/[^0-9]/g, ''), 10) || 0;
            let current = 0;

            const step = Math.max(1, Math.ceil(target / 40));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                stat.textContent = current + suffix;
            }, 30);
        });
    }
}

window.addEventListener('scroll', animateCounters);
animateCounters();

// ==========================================
// Back to top button
// ==========================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// Visitor count badge
// ==========================================
const visitorCount = document.getElementById('visitor-count');
if (visitorCount) {
    const badge = document.createElement('img');
    badge.src = 'https://visitor-badge.laobi.icu/badge?page_id=muhammadshafad07.portfolio';
    badge.alt = 'Visitor count';
    badge.width = 77;
    badge.height = 20;
    visitorCount.parentNode.replaceChild(badge, visitorCount);
}