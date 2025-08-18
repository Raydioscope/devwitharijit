/**
 * Main JavaScript file for Arijit Ray's Portfolio
 * Handles core functionality, scroll effects, and UI interactions
 */

(function() {
    'use strict';

    // DOM Elements
    const elements = {
        loadingScreen: document.getElementById('loading-screen'),
        navbarNav: document.getElementById('navbarNav'),
        backToTop: document.getElementById('back-to-top'),
        contactForm: document.getElementById('contact-form'),
        particlesContainer: document.getElementById('particles-container'),
        skillBars: document.querySelectorAll('.skill-progress'),
        projectFilters: document.querySelectorAll('[data-filter]'),
        projectItems: document.querySelectorAll('.project-item'),
        scrollRevealElements: document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'),
        navLinks: document.querySelectorAll('.nav-link'),
        smoothScrollLinks: document.querySelectorAll('.smooth-scroll')
    };

    // Configuration
    const config = {
        particleCount: 50,
        scrollOffset: 100,
        skillAnimationOffset: 0.3,
        formValidationRules: {
            name: { required: true, minLength: 2 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            subject: { required: true, minLength: 3 },
            message: { required: true, minLength: 10 }
        }
    };

    // Utility Functions
    const utils = {
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle: (func, delay) => {
            let timeoutId;
            let lastExecTime = 0;
            return function (...args) {
                const currentTime = Date.now();
                if (currentTime - lastExecTime > delay) {
                    func.apply(this, args);
                    lastExecTime = currentTime;
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                        lastExecTime = Date.now();
                    }, delay - (currentTime - lastExecTime));
                }
            };
        },

        getRandomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

        isElementInViewport: (el, offset = 0) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 - offset &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        addEventListenerWithValidation: (element, event, handler) => {
            if (element && typeof handler === 'function') {
                element.addEventListener(event, handler);
                return true;
            }
            return false;
        }
    };

    // Loading Screen Handler
    const loadingScreen = {
        init() {
            if (elements.loadingScreen) {
                // Simulate loading time
                setTimeout(() => {
                    this.hide();
                }, 1500);
            }
        },

        hide() {
            if (elements.loadingScreen) {
                elements.loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    elements.loadingScreen.style.display = 'none';
                }, 500);
            }
        }
    };

    // Particle System
    const particleSystem = {
        particles: [],

        init() {
            if (!elements.particlesContainer) return;
            
            this.createParticles();
            this.animate();
        },

        createParticles() {
            for (let i = 0; i < config.particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = utils.getRandomInt(2, 6) + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = utils.getRandomInt(0, 100) + '%';
                particle.style.top = utils.getRandomInt(0, 100) + '%';
                particle.style.animationDelay = utils.getRandomInt(0, 6) + 's';
                particle.style.animationDuration = utils.getRandomInt(3, 8) + 's';
                
                elements.particlesContainer.appendChild(particle);
                this.particles.push(particle);
            }
        },

        animate() {
            // Additional particle animations can be added here
            this.particles.forEach((particle, index) => {
                const delay = index * 100;
                setTimeout(() => {
                    particle.style.opacity = '1';
                }, delay);
            });
        }
    };

    // Smooth Scrolling
    const smoothScroll = {
        init() {
            elements.smoothScrollLinks.forEach(link => {
                utils.addEventListenerWithValidation(link, 'click', this.handleClick.bind(this));
            });
        },

        handleClick(e) {
            e.preventDefault();
            const href = e.currentTarget.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (elements.navbarNav.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(elements.navbarNav);
                    bsCollapse.hide();
                }
            }
        }
    };

    // Scroll Effects Handler
    const scrollEffects = {
        lastScrollTop: 0,
        
        init() {
            window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 10));
            // Initial check
            this.handleScroll();
        },

        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            this.updateNavbar(scrollTop);
            this.updateActiveNavLink();
            this.updateBackToTop(scrollTop);
            this.handleScrollReveal();
            this.animateSkillBars();
            
            this.lastScrollTop = scrollTop;
        },

        updateNavbar(scrollTop) {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        },

        updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    elements.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },

        updateBackToTop(scrollTop) {
            if (!elements.backToTop) return;

            if (scrollTop > 300) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }
        },

        handleScrollReveal() {
            elements.scrollRevealElements.forEach(element => {
                if (utils.isElementInViewport(element, 100)) {
                    element.classList.add('revealed');
                }
            });
        },

        animateSkillBars() {
            const aboutSection = document.getElementById('about');
            if (!aboutSection || !utils.isElementInViewport(aboutSection, config.skillAnimationOffset * window.innerHeight)) {
                return;
            }

            elements.skillBars.forEach(bar => {
                if (!bar.style.width || bar.style.width === '0px') {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 500);
                    }
                }
            });
        }
    };

    // Back to Top Handler
    const backToTop = {
        init() {
            if (elements.backToTop) {
                utils.addEventListenerWithValidation(elements.backToTop, 'click', this.scrollToTop);
            }
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // Project Filter System
    const projectFilter = {
        init() {
            elements.projectFilters.forEach(filter => {
                utils.addEventListenerWithValidation(filter, 'click', this.handleFilterClick.bind(this));
            });
        },

        handleFilterClick(e) {
            const filter = e.currentTarget;
            const filterValue = filter.getAttribute('data-filter');

            // Update active filter
            elements.projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            // Filter projects
            this.filterProjects(filterValue);
        },

        filterProjects(filterValue) {
            elements.projectItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0.3';
                    item.style.transform = 'scale(0.8)';
                }
            });
        }
    };

    // Form Validation and Submission
    const formHandler = {
        init() {
            if (elements.contactForm) {
                utils.addEventListenerWithValidation(elements.contactForm, 'submit', this.handleSubmit.bind(this));
                
                // Real-time validation
                const inputs = elements.contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    utils.addEventListenerWithValidation(input, 'blur', this.validateField.bind(this));
                    utils.addEventListenerWithValidation(input, 'input', this.clearErrors.bind(this));
                });
            }
        },

        handleSubmit(e) {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            }
        },

        validateForm() {
            let isValid = true;
            const formData = new FormData(elements.contactForm);
            
            Object.keys(config.formValidationRules).forEach(fieldName => {
                const field = elements.contactForm.querySelector(`#contact-${fieldName}`);
                if (field && !this.validateField({ target: field })) {
                    isValid = false;
                }
            });

            return isValid;
        },

        validateField(e) {
            const field = e.target;
            const fieldName = field.id.replace('contact-', '');
            const rules = config.formValidationRules[fieldName];
            const value = field.value.trim();
            
            let isValid = true;
            let errorMessage = '';

            if (rules) {
                if (rules.required && !value) {
                    isValid = false;
                    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
                } else if (rules.minLength && value.length < rules.minLength) {
                    isValid = false;
                    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters.`;
                } else if (rules.pattern && !rules.pattern.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
            }

            this.showFieldError(field, isValid, errorMessage);
            return isValid;
        },

        showFieldError(field, isValid, message) {
            const errorElement = field.nextElementSibling;
            
            if (isValid) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                if (errorElement && errorElement.classList.contains('invalid-feedback')) {
                    errorElement.textContent = '';
                }
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
                if (errorElement && errorElement.classList.contains('invalid-feedback')) {
                    errorElement.textContent = message;
                }
            }
        },

        clearErrors(e) {
            const field = e.target;
            field.classList.remove('is-invalid', 'is-valid');
            const errorElement = field.nextElementSibling;
            if (errorElement && errorElement.classList.contains('invalid-feedback')) {
                errorElement.textContent = '';
            }
        },

        submitForm() {
            const submitButton = elements.contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                this.showSuccessMessage();
                elements.contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Clear validation classes
                const fields = elements.contactForm.querySelectorAll('.is-valid, .is-invalid');
                fields.forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
            }, 2000);
        },

        showSuccessMessage() {
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
            successAlert.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Thank you for your message! I'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            elements.contactForm.appendChild(successAlert);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (successAlert.parentNode) {
                    successAlert.remove();
                }
            }, 5000);
        }
    };

    // Performance Monitor
    const performanceMonitor = {
        init() {
            // Monitor performance and adjust animations if needed
            this.checkPerformance();
        },

        checkPerformance() {
            // Simple performance check
            if (navigator.hardwareConcurrency < 4) {
                // Reduce animations on lower-end devices
                document.body.classList.add('reduced-animations');
            }

            // Check for reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.body.classList.add('reduced-motion');
            }
        }
    };

    // Error Handler
    const errorHandler = {
        init() {
            window.addEventListener('error', this.handleError);
            window.addEventListener('unhandledrejection', this.handleRejection);
        },

        handleError(event) {
            console.error('JavaScript Error:', event.error);
            // Could send error to analytics service
        },

        handleRejection(event) {
            console.error('Unhandled Promise Rejection:', event.reason);
            // Could send error to analytics service
        }
    };

    // Accessibility Enhancements
    const accessibility = {
        init() {
            this.enhanceKeyboardNavigation();
            this.addAriaLabels();
            this.handleFocusManagement();
        },

        enhanceKeyboardNavigation() {
            // Allow keyboard navigation for project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            });
        },

        addAriaLabels() {
            // Add aria-labels where needed
            const backToTopBtn = elements.backToTop;
            if (backToTopBtn && !backToTopBtn.getAttribute('aria-label')) {
                backToTopBtn.setAttribute('aria-label', 'Back to top');
            }
        },

        handleFocusManagement() {
            // Ensure focus is visible and manageable
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        }
    };

    // Analytics (placeholder for future implementation)
    const analytics = {
        init() {
            this.trackPageLoad();
            this.trackUserInteractions();
        },

        trackPageLoad() {
            // Track page load time
            if (performance.timing) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log('Page load time:', loadTime, 'ms');
            }
        },

        trackUserInteractions() {
            // Track button clicks, form submissions, etc.
            document.addEventListener('click', (e) => {
                if (e.target.matches('[data-testid]')) {
                    const testId = e.target.getAttribute('data-testid');
                    console.log('User interaction:', testId);
                    // Send to analytics service
                }
            });
        }
    };

    // Main Application Initialization
    const app = {
        init() {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.start.bind(this));
            } else {
                this.start();
            }
        },

        start() {
            try {
                // Initialize all modules
                loadingScreen.init();
                particleSystem.init();
                smoothScroll.init();
                scrollEffects.init();
                backToTop.init();
                projectFilter.init();
                formHandler.init();
                performanceMonitor.init();
                errorHandler.init();
                accessibility.init();
                analytics.init();

                // Add global styles
                this.addGlobalStyles();
                
                console.log('Portfolio application initialized successfully');
            } catch (error) {
                console.error('Error initializing portfolio application:', error);
            }
        },

        addGlobalStyles() {
            // Add any dynamic styles needed
            const style = document.createElement('style');
            style.textContent = `
                .reduced-animations * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .keyboard-navigation *:focus {
                    outline: 2px solid var(--primary-color);
                    outline-offset: 2px;
                }
                
                .reduced-motion * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Initialize the application
    app.init();

    // Expose utilities for other scripts
    window.PortfolioUtils = utils;

})();
