document.addEventListener('DOMContentLoaded', () => {
    
    // ── Navigation Scroll Effect ───────────────────
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ── Mobile Menu Toggle ──────────────────────────
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');

    menuToggle.addEventListener('click', () => {
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        
        // Transform menu icon
        const bars = menuToggle.querySelectorAll('.bar');
        if (mobileOverlay.classList.contains('active')) {
            bars[0].style.transform = 'translateY(7px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
        });
    });

    // ── Lightbox Gallery ────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTag = document.getElementById('lightbox-tag');
    const closeLightbox = document.querySelector('.lightbox-close');
    const viewButtons = document.querySelectorAll('.view-details');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.sculpture-card');
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const tag = card.querySelector('.tag').textContent;

            lightboxImg.src = img;
            lightboxTitle.textContent = title;
            lightboxTag.textContent = tag;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ── Intersection Observer for Scroll Effects ────
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial styles for animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Add delay logic manually for grid items
    document.querySelectorAll('.sculpture-card[data-aos-delay]').forEach(el => {
        const delay = el.getAttribute('data-aos-delay');
        el.style.transitionDelay = `${delay}ms`;
    });

});
