/**
 * Advanced Animation Controller
 * Handles scroll-based animations, intersection observers, and performance-optimized effects
 */

(function() {
    'use strict';

    // Animation Configuration
    const animationConfig = {
        // Intersection Observer settings
        intersectionThreshold: 0.1,
        intersectionRootMargin: '-50px 0px',
        
        // Animation delays and durations
        animationDuration: 800,
        staggerDelay: 100,
        skillBarDelay: 2000,
        
        // Performance settings
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isLowEndDevice: navigator.hardwareConcurrency < 4,
        
        // Animation classes
        classes: {
            fadeIn: 'animate-fadeIn',
            slideUp: 'animate-slideInUp',
            slideDown: 'animate-slideInDown',
            slideLeft: 'animate-slideInLeft',
            slideRight: 'animate-slideInRight',
            scale: 'animate-fadeInScale',
            rotate: 'animate-rotateIn',
            blur: 'animate-slideInBlur'
        }
    };

    // Animation state management
    const animationState = {
        isInitialized: false,
        observers: new Map(),
        animatedElements: new Set(),
        skillBarsAnimated: false,
        countersAnimated: new Set(),
        
        // Performance monitoring
        frameCount: 0,
        lastFrameTime: performance.now(),
        averageFPS: 60
    };

    // Utility functions
    const utils = {
        // Debounce function for performance
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

        // Check if element is in viewport
        isInViewport: (element, threshold = 0) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.top <= windowHeight - threshold &&
                rect.bottom >= threshold &&
                rect.left <= windowWidth - threshold &&
                rect.right >= threshold
            );
        },

        // Get random delay for stagger effects
        getStaggerDelay: (index, baseDelay = animationConfig.staggerDelay) => {
            return index * baseDelay;
        },

        // Performance monitor
        monitorPerformance: () => {
            animationState.frameCount++;
            const now = performance.now();
            const delta = now - animationState.lastFrameTime;
            
            if (delta >= 1000) { // Update every second
                animationState.averageFPS = Math.round((animationState.frameCount * 1000) / delta);
                animationState.frameCount = 0;
                animationState.lastFrameTime = now;
                
                // Adjust animations based on performance
                if (animationState.averageFPS < 30) {
                    document.body.classList.add('low-performance');
                }
            }
        },

        // Add CSS class with delay
        addClassWithDelay: (element, className, delay = 0) => {
            setTimeout(() => {
                element.classList.add(className);
            }, delay);
        }
    };

    // Intersection Observer Manager
    const observerManager = {
        // Create intersection observer with custom options
        createObserver: (callback, options = {}) => {
            const defaultOptions = {
                threshold: animationConfig.intersectionThreshold,
                rootMargin: animationConfig.intersectionRootMargin
            };

            const observerOptions = { ...defaultOptions, ...options };
            return new IntersectionObserver(callback, observerOptions);
        },

        // Generic animation observer
        createAnimationObserver: () => {
            return observerManager.createObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationState.animatedElements.has(entry.target)) {
                        animationController.animateElement(entry.target);
                        animationState.animatedElements.add(entry.target);
                    }
                });
            });
        },

        // Skills section observer
        createSkillsObserver: () => {
            return observerManager.createObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationState.skillBarsAnimated) {
                        animationController.animateSkillBars();
                        animationState.skillBarsAnimated = true;
                    }
                });
            });
        },

        // Counter animation observer
        createCounterObserver: () => {
            return observerManager.createObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationState.countersAnimated.has(entry.target)) {
                        animationController.animateCounter(entry.target);
                        animationState.countersAnimated.add(entry.target);
                    }
                });
            });
        }
    };

    // Main Animation Controller
    const animationController = {
        // Initialize all animations
        init: () => {
            if (animationState.isInitialized) return;

            // Skip animations if reduced motion is preferred
            if (animationConfig.reducedMotion) {
                document.body.classList.add('reduced-motion');
                return;
            }

            animationController.setupScrollAnimations();
            animationController.setupSpecialAnimations();
            animationController.setupPerformanceMonitoring();
            
            animationState.isInitialized = true;
            console.log('Animation system initialized');
        },

        // Setup scroll-based animations
        setupScrollAnimations: () => {
            const animationObserver = observerManager.createAnimationObserver();
            
            // Select elements for animation
            const animationSelectors = [
                '.scroll-reveal',
                '.scroll-reveal-left', 
                '.scroll-reveal-right',
                '.scroll-reveal-scale',
                '.hero-content',
                '.section-title',
                '.glass-card',
                '.project-card',
                '.timeline-item',
                '.education-item',
                '.certification-item'
            ];

            animationSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    // Add initial hidden state
                    element.style.opacity = '0';
                    element.style.transform = animationController.getInitialTransform(element);
                    
                    animationObserver.observe(element);
                });
            });

            animationState.observers.set('animation', animationObserver);
        },

        // Setup special animations (skills, counters, etc.)
        setupSpecialAnimations: () => {
            // Skills section animation
            const skillsSection = document.getElementById('about');
            if (skillsSection) {
                const skillsObserver = observerManager.createSkillsObserver();
                skillsObserver.observe(skillsSection);
                animationState.observers.set('skills', skillsObserver);
            }

            // Counter animations
            document.querySelectorAll('[data-count]').forEach(counter => {
                const counterObserver = observerManager.createCounterObserver();
                counterObserver.observe(counter);
            });

            // Typewriter effect
            animationController.initTypewriter();
        },

        // Setup performance monitoring
        setupPerformanceMonitoring: () => {
            if (!animationConfig.isLowEndDevice) {
                const monitorFrame = () => {
                    utils.monitorPerformance();
                    requestAnimationFrame(monitorFrame);
                };
                requestAnimationFrame(monitorFrame);
            }
        },

        // Get initial transform based on element class
        getInitialTransform: (element) => {
            if (element.classList.contains('scroll-reveal-left')) {
                return 'translateX(-50px)';
            } else if (element.classList.contains('scroll-reveal-right')) {
                return 'translateX(50px)';
            } else if (element.classList.contains('scroll-reveal-scale')) {
                return 'scale(0.8)';
            }
            return 'translateY(50px)'; // default slide up
        },

        // Animate individual element
        animateElement: (element) => {
            const animationType = animationController.getAnimationType(element);
            const delay = animationController.getAnimationDelay(element);

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.style.transition = `all ${animationConfig.animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
                
                // Add animation class for additional effects
                element.classList.add('animated', animationType);
                
                // Trigger any custom animations
                animationController.triggerCustomAnimation(element);
            }, delay);
        },

        // Get animation type based on element
        getAnimationType: (element) => {
            if (element.classList.contains('scroll-reveal-left')) return 'slide-left';
            if (element.classList.contains('scroll-reveal-right')) return 'slide-right';
            if (element.classList.contains('scroll-reveal-scale')) return 'scale';
            if (element.classList.contains('hero-content')) return 'fade-scale';
            return 'slide-up';
        },

        // Get animation delay based on element position
        getAnimationDelay: (element) => {
            const siblings = Array.from(element.parentNode.children);
            const index = siblings.indexOf(element);
            return utils.getStaggerDelay(index);
        },

        // Trigger custom animations for specific elements
        triggerCustomAnimation: (element) => {
            // Project cards hover preparation
            if (element.classList.contains('project-card')) {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'translateY(-10px) rotateY(5deg)';
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'none';
                });
            }

            // Timeline items special animation
            if (element.classList.contains('timeline-item')) {
                const marker = element.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.classList.add('animate-pulse');
                    }, 300);
                }
            }
        },

        // Animate skill bars
        animateSkillBars: () => {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                const delay = utils.getStaggerDelay(index, 200);
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    
                    // Add glow effect
                    setTimeout(() => {
                        bar.classList.add('skill-glow');
                    }, 750);
                }, delay);
            });
        },

        // Animate counters
        animateCounter: (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const stepTime = 50;
            const steps = duration / stepTime;
            const increment = target / steps;
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, stepTime);
        },

        // Initialize typewriter effect
        initTypewriter: () => {
            const typewriterElements = document.querySelectorAll('.typewriter');
            
            typewriterElements.forEach((element, index) => {
                const text = element.textContent;
                const delay = utils.getStaggerDelay(index, 1000);
                
                // Clear text initially
                element.textContent = '';
                element.style.visibility = 'visible';
                
                setTimeout(() => {
                    animationController.typewriterEffect(element, text);
                }, delay);
            });
        },

        // Typewriter animation
        typewriterEffect: (element, text, speed = 100) => {
            let i = 0;
            element.classList.add('typing');
            
            const typeTimer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeTimer);
                    element.classList.remove('typing');
                    element.classList.add('typed');
                }
            }, speed);
        }
    };

    // Scroll-based effects
    const scrollEffects = {
        // Parallax effect for background elements
        handleParallax: () => {
            const parallaxElements = document.querySelectorAll('.parallax');
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        },

        // Update floating elements
        handleFloatingElements: () => {
            const floatingElements = document.querySelectorAll('.floating-icon');
            const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            
            floatingElements.forEach((element, index) => {
                const moveDistance = scrollProgress * 100;
                const delay = index * 0.1;
                
                element.style.transform = `translateY(${moveDistance * (0.5 + delay)}px) rotate(${scrollProgress * 360}deg)`;
            });
        },

        // Handle scroll-based navigation effects
        handleNavigationEffects: () => {
            const navbar = document.querySelector('.navbar');
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled', 'glass-enhanced');
            } else {
                navbar.classList.remove('scrolled', 'glass-enhanced');
            }
        }
    };

    // Page transition effects
    const pageTransitions = {
        // Smooth page load animation
        initPageLoad: () => {
            document.body.style.opacity = '0';
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.body.style.transition = 'opacity 0.5s ease';
                    document.body.style.opacity = '1';
                }, 100);
            });
        },

        // Section transitions
        setupSectionTransitions: () => {
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
            });
        }
    };

    // Advanced effects
    const advancedEffects = {
        // Magnetic button effect
        initMagneticButtons: () => {
            const magneticButtons = document.querySelectorAll('.btn-neon, .btn-glass');
            
            magneticButtons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                });
            });
        },

        // Particle mouse trail
        initMouseTrail: () => {
            if (animationConfig.isLowEndDevice) return;
            
            let particles = [];
            const maxParticles = 20;
            
            document.addEventListener('mousemove', (e) => {
                if (particles.length >= maxParticles) {
                    const oldParticle = particles.shift();
                    if (oldParticle && oldParticle.element.parentNode) {
                        oldParticle.element.parentNode.removeChild(oldParticle.element);
                    }
                }
                
                const particle = document.createElement('div');
                particle.className = 'mouse-particle';
                particle.style.left = e.clientX + 'px';
                particle.style.top = e.clientY + 'px';
                
                document.body.appendChild(particle);
                particles.push({ element: particle, time: Date.now() });
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1000);
            });
        },

        // Glitch effect for text
        initGlitchEffects: () => {
            const glitchElements = document.querySelectorAll('.glitch-text');
            
            glitchElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.classList.add('glitch-active');
                    setTimeout(() => {
                        element.classList.remove('glitch-active');
                    }, 500);
                });
            });
        }
    };

    // Main initialization
    const animationSystem = {
        init: () => {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', animationSystem.start);
            } else {
                animationSystem.start();
            }
        },

        start: () => {
            try {
                // Initialize page transitions first
                pageTransitions.initPageLoad();
                pageTransitions.setupSectionTransitions();
                
                // Initialize main animation controller
                animationController.init();
                
                // Initialize advanced effects
                if (!animationConfig.reducedMotion && !animationConfig.isLowEndDevice) {
                    advancedEffects.initMagneticButtons();
                    advancedEffects.initMouseTrail();
                    advancedEffects.initGlitchEffects();
                }
                
                // Setup scroll effects
                window.addEventListener('scroll', utils.debounce(() => {
                    scrollEffects.handleParallax();
                    scrollEffects.handleFloatingElements();
                    scrollEffects.handleNavigationEffects();
                }, 16)); // ~60fps
                
                // Add animation styles
                animationSystem.addStyles();
                
                console.log('Animation system fully loaded');
            } catch (error) {
                console.error('Error initializing animation system:', error);
            }
        },

        // Add dynamic styles
        addStyles: () => {
            const style = document.createElement('style');
            style.textContent = `
                .animated {
                    animation-fill-mode: both;
                }
                
                .skill-glow {
                    box-shadow: 0 0 20px var(--primary-color);
                }
                
                .typing::after {
                    content: '|';
                    animation: blink 1s infinite;
                }
                
                .typed::after {
                    content: '';
                }
                
                .mouse-particle {
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: particleFade 1s ease-out forwards;
                }
                
                @keyframes particleFade {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0); }
                }
                
                .glitch-text.glitch-active {
                    animation: glitch 0.5s ease-in-out;
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    10% { transform: translateX(-2px) skew(-5deg); }
                    20% { transform: translateX(2px) skew(5deg); }
                    30% { transform: translateX(-1px) skew(-3deg); }
                    40% { transform: translateX(1px) skew(3deg); }
                    50% { transform: translateX(-1px) skew(-2deg); }
                    60% { transform: translateX(1px) skew(2deg); }
                }
                
                .low-performance *,
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .glass-enhanced {
                    backdrop-filter: blur(20px) !important;
                    background: rgba(33, 47, 60, 0.9) !important;
                }
            `;
            document.head.appendChild(style);
        },

        // Cleanup method
        destroy: () => {
            animationState.observers.forEach(observer => {
                observer.disconnect();
            });
            animationState.observers.clear();
            animationState.animatedElements.clear();
            animationState.countersAnimated.clear();
        }
    };

    // Initialize the animation system
    animationSystem.init();

    // Export for debugging
    window.AnimationDebug = {
        config: animationConfig,
        state: animationState,
        controller: animationController,
        utils: utils
    };

})();
