/**
 * PREMIUM PORTFOLIO JAVASCRIPT
 * Includes custom cursor, scroll effects, intersection observers, and magnetic buttons.
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only initialize custom cursor if we have a mouse (not on touch devices)
    if (window.matchMedia("(pointer: fine)").matches) {
        
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with slight delay using animate
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to interactive elements
        const iteractives = document.querySelectorAll('a, button, .magnetic, .bento-box');
        
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 2. Magnetic Elements (Buttons & Social Pills)
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = this.getAttribute('data-strength') || 15;
            
            this.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        });
        
        elem.addEventListener('mouseleave', function() {
            this.style.transform = `translate(0px, 0px)`;
            // Wait for transform to finish before removing transition
            setTimeout(() => {
                this.style.transition = 'var(--transition-smooth)';
            }, 300);
        });
        
        elem.addEventListener('mouseenter', function() {
            this.style.transition = 'none'; // remove transition for smooth tracking
        });
    });

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItemsList = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItemsList.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 6. Intersection Observers for Scroll Animations
    
    // Reveal Up Animation
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Timeline Progress Animation
    const timelineSection = document.querySelector('#education');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineRows = document.querySelectorAll('.timeline-row');
    
    if (timelineSection && timelineProgress) {
        window.addEventListener('scroll', () => {
            const sectionTop = timelineSection.offsetTop;
            const sectionHeight = timelineSection.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Calculate how far down the section we've scrolled
            if (scrollY > sectionTop - windowHeight + 200 && scrollY < sectionTop + sectionHeight) {
                const scrolled = (scrollY - (sectionTop - windowHeight + 300));
                const maxScroll = sectionHeight;
                
                let progress = (scrolled / maxScroll) * 100;
                
                // Clamp between 0 and 100
                progress = Math.max(0, Math.min(100, progress));
                
                timelineProgress.style.height = `${progress}%`;
                
                // Activate dots as line passes them
                timelineRows.forEach((row, index) => {
                    const rowTop = row.offsetTop;
                    // Approximate position check
                    if ((progress / 100) * sectionHeight > rowTop - 100) {
                        row.classList.add('is-active');
                    }
                });
            }
        });
    }

    // 7. Auto-increment Metric Numbers (e.g. 6+ Languages)
    const metrics = document.querySelectorAll('.metric-value');
    
    const metricObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Currently it just displays "6+", but if we had just numbers we could animate them here.
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    metrics.forEach(metric => metricObserver.observe(metric));

});
