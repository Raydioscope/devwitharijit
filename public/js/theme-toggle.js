/**
 * Advanced Theme Toggle System
 * Handles dark/light theme switching with smooth transitions and persistence
 */

(function() {
    'use strict';

    // Theme configuration
    const themeConfig = {
        themes: {
            dark: {
                name: 'dark',
                class: 'dark-theme',
                colors: {
                    primary: '#35c3fc',
                    secondary: '#48ff85',
                    accent: '#E74C3C',
                    background: 'linear-gradient(135deg, #212F3C 0%, #1a252f 100%)',
                    text: '#F4F6F7',
                    muted: '#85929E'
                }
            },
            light: {
                name: 'light', 
                class: 'light-theme',
                colors: {
                    primary: '#35c3fc',
                    secondary: '#48ff85',
                    accent: '#E74C3C',
                    background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
                    text: '#2C3E50',
                    muted: '#6C757D'
                }
            }
        },
        
        // Storage key
        storageKey: 'portfolio-theme',
        
        // Animation settings
        transitionDuration: 300,
        
        // Auto theme detection
        respectSystemPreference: true,
        
        // Theme toggle button selectors
        toggleSelector: '#theme-toggle',
        sliderSelector: '.toggle-slider'
    };

    // Theme state
    const themeState = {
        currentTheme: null,
        isTransitioning: false,
        systemTheme: null,
        userPreference: null,
        observers: new Map()
    };

    // Utility functions
    const utils = {
        // Get system theme preference
        getSystemTheme: () => {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        },

        // Get stored theme preference
        getStoredTheme: () => {
            try {
                return localStorage.getItem(themeConfig.storageKey);
            } catch (error) {
                console.warn('Local storage not available:', error);
                return null;
            }
        },

        // Store theme preference
        storeTheme: (theme) => {
            try {
                localStorage.setItem(themeConfig.storageKey, theme);
                return true;
            } catch (error) {
                console.warn('Could not store theme preference:', error);
                return false;
            }
        },

        // Determine initial theme
        getInitialTheme: () => {
            // Check user preference first
            const stored = utils.getStoredTheme();
            if (stored && themeConfig.themes[stored]) {
                return stored;
            }
            
            // Fall back to system preference if enabled
            if (themeConfig.respectSystemPreference) {
                return utils.getSystemTheme();
            }
            
            // Default to dark theme
            return 'dark';
        },

        // Create custom CSS properties for theme
        createThemeProperties: (theme) => {
            const colors = themeConfig.themes[theme].colors;
            const properties = {};
            
            Object.keys(colors).forEach(key => {
                properties[`--theme-${key}`] = colors[key];
            });
            
            return properties;
        },

        // Apply CSS properties to element
        applyCSSProperties: (element, properties) => {
            Object.keys(properties).forEach(property => {
                element.style.setProperty(property, properties[property]);
            });
        },

        // Add transition classes
        addTransitionClasses: () => {
            document.body.classList.add('theme-transitioning');
            
            // Add transition styles to key elements
            const elements = document.querySelectorAll('*');
            elements.forEach(element => {
                element.style.transition = `background-color ${themeConfig.transitionDuration}ms ease, color ${themeConfig.transitionDuration}ms ease, border-color ${themeConfig.transitionDuration}ms ease`;
            });
        },

        // Remove transition classes
        removeTransitionClasses: () => {
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
                
                // Remove transition styles
                const elements = document.querySelectorAll('*');
                elements.forEach(element => {
                    element.style.transition = '';
                });
            }, themeConfig.transitionDuration);
        },

        // Debounce function
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
        }
    };

    // Theme application functions
    const themeApplicator = {
        // Apply theme to document
        applyTheme: (themeName, withTransition = true) => {
            if (themeState.isTransitioning) return;
            
            const theme = themeConfig.themes[themeName];
            if (!theme) {
                console.error(`Theme "${themeName}" not found`);
                return;
            }

            themeState.isTransitioning = true;

            // Add transition classes if requested
            if (withTransition) {
                utils.addTransitionClasses();
            }

            // Remove old theme classes
            Object.keys(themeConfig.themes).forEach(name => {
                document.body.classList.remove(themeConfig.themes[name].class);
            });

            // Add new theme class
            document.body.classList.add(theme.class);

            // Apply theme colors to CSS custom properties
            const properties = utils.createThemeProperties(themeName);
            utils.applyCSSProperties(document.documentElement, properties);

            // Update background gradient
            document.body.style.background = theme.colors.background;

            // Update theme-specific elements
            themeApplicator.updateThemeSpecificElements(themeName);

            // Update toggle button state
            themeApplicator.updateToggleButton(themeName);

            // Store theme preference
            utils.storeTheme(themeName);
            themeState.currentTheme = themeName;
            themeState.userPreference = themeName;

            // Remove transition classes
            if (withTransition) {
                utils.removeTransitionClasses();
            }

            // Dispatch theme change event
            themeApplicator.dispatchThemeChangeEvent(themeName);

            setTimeout(() => {
                themeState.isTransitioning = false;
            }, themeConfig.transitionDuration);

            console.log(`Theme applied: ${themeName}`);
        },

        // Update theme-specific elements
        updateThemeSpecificElements: (themeName) => {
            // Update particles color
            const particles = document.querySelectorAll('.particle');
            const primaryColor = themeConfig.themes[themeName].colors.primary;
            
            particles.forEach(particle => {
                particle.style.background = primaryColor;
            });

            // Update glassmorphism elements
            const glassElements = document.querySelectorAll('.glass-card, .glass-nav');
            glassElements.forEach(element => {
                if (themeName === 'light') {
                    element.style.background = 'rgba(255, 255, 255, 0.2)';
                    element.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                } else {
                    element.style.background = 'rgba(255, 255, 255, 0.1)';
                    element.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });

            // Update form inputs
            const inputs = document.querySelectorAll('.glass-input');
            inputs.forEach(input => {
                if (themeName === 'light') {
                    input.style.background = 'rgba(0, 0, 0, 0.05)';
                    input.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    input.style.color = '#2C3E50';
                } else {
                    input.style.background = 'rgba(255, 255, 255, 0.1)';
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    input.style.color = '#F4F6F7';
                }
            });

            // Update navigation
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (themeName === 'light') {
                    navbar.style.background = 'rgba(248, 249, 250, 0.8)';
                } else {
                    navbar.style.background = 'rgba(33, 47, 60, 0.8)';
                }
            }
        },

        // Update toggle button visual state
        updateToggleButton: (themeName) => {
            const toggle = document.querySelector(themeConfig.toggleSelector);
            const slider = document.querySelector(themeConfig.sliderSelector);
            
            if (toggle && slider) {
                if (themeName === 'light') {
                    toggle.classList.add('active');
                    slider.style.transform = 'translateX(30px)';
                    slider.style.background = themeConfig.themes.light.colors.secondary;
                } else {
                    toggle.classList.remove('active');
                    slider.style.transform = 'translateX(0)';
                    slider.style.background = themeConfig.themes.dark.colors.primary;
                }
            }
        },

        // Dispatch theme change event
        dispatchThemeChangeEvent: (themeName) => {
            const event = new CustomEvent('themechange', {
                detail: {
                    theme: themeName,
                    colors: themeConfig.themes[themeName].colors
                }
            });
            document.dispatchEvent(event);
        }
    };

    // Theme toggle functionality
    const themeToggle = {
        // Initialize toggle button
        init: () => {
            const toggle = document.querySelector(themeConfig.toggleSelector);
            if (!toggle) {
                console.warn('Theme toggle button not found');
                return;
            }

            // Add click event listener
            toggle.addEventListener('click', themeToggle.handleToggle);
            
            // Add keyboard support
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    themeToggle.handleToggle();
                }
            });

            // Add accessibility attributes
            toggle.setAttribute('role', 'switch');
            toggle.setAttribute('aria-label', 'Toggle theme');
            
            console.log('Theme toggle initialized');
        },

        // Handle toggle button click
        handleToggle: () => {
            if (themeState.isTransitioning) return;

            const newTheme = themeState.currentTheme === 'dark' ? 'light' : 'dark';
            themeApplicator.applyTheme(newTheme);
            
            // Update accessibility attributes
            const toggle = document.querySelector(themeConfig.toggleSelector);
            if (toggle) {
                toggle.setAttribute('aria-checked', newTheme === 'light');
            }

            // Track analytics if available
            if (window.gtag) {
                window.gtag('event', 'theme_toggle', {
                    event_category: 'UI',
                    event_label: newTheme
                });
            }
        }
    };

    // System theme monitoring
    const systemThemeMonitor = {
        // Initialize system theme monitoring
        init: () => {
            if (!themeConfig.respectSystemPreference) return;

            // Create media query listener
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Listen for changes
            mediaQuery.addListener(systemThemeMonitor.handleSystemThemeChange);
            
            // Store initial system theme
            themeState.systemTheme = mediaQuery.matches ? 'dark' : 'light';
            
            console.log('System theme monitoring initialized');
        },

        // Handle system theme changes
        handleSystemThemeChange: utils.debounce((e) => {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            themeState.systemTheme = newSystemTheme;

            // Only apply if user hasn't set a preference
            if (!themeState.userPreference) {
                themeApplicator.applyTheme(newSystemTheme);
            }
        }, 100)
    };

    // Theme preloader to prevent flash
    const themePreloader = {
        // Apply theme immediately to prevent flash
        applyInitialTheme: () => {
            const initialTheme = utils.getInitialTheme();
            
            // Apply theme without transitions for instant effect
            document.documentElement.style.setProperty('--initial-theme', initialTheme);
            document.body.className = `${themeConfig.themes[initialTheme].class} theme-loading`;
            document.body.style.background = themeConfig.themes[initialTheme].colors.background;
            
            themeState.currentTheme = initialTheme;
            
            // Remove loading class after a short delay
            setTimeout(() => {
                document.body.classList.remove('theme-loading');
            }, 100);
        }
    };

    // Advanced features
    const advancedFeatures = {
        // Auto theme based on time of day
        setupAutoTheme: () => {
            if (!themeConfig.respectSystemPreference) return;

            const hour = new Date().getHours();
            const isNightTime = hour < 6 || hour > 18;
            
            // Only apply auto theme if no user preference exists
            if (!utils.getStoredTheme()) {
                const autoTheme = isNightTime ? 'dark' : 'light';
                themeApplicator.applyTheme(autoTheme, false);
            }
        },

        // Theme scheduling
        setupThemeScheduling: () => {
            // Check for theme change every hour
            setInterval(() => {
                if (!themeState.userPreference) {
                    advancedFeatures.setupAutoTheme();
                }
            }, 3600000); // 1 hour
        },

        // Smooth theme transitions based on scroll
        setupScrollBasedTheme: () => {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
                        
                        // Subtle background adjustments based on scroll
                        if (themeState.currentTheme === 'dark') {
                            const opacity = Math.max(0.8, 1 - scrollPercent * 0.2);
                            document.body.style.background = `linear-gradient(135deg, rgba(33, 47, 60, ${opacity}) 0%, rgba(26, 37, 47, ${opacity}) 100%)`;
                        }
                        
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    };

    // Main theme system
    const themeSystem = {
        // Initialize the entire theme system
        init: () => {
            try {
                // Apply initial theme immediately
                themePreloader.applyInitialTheme();
                
                // Wait for DOM to be ready
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', themeSystem.start);
                } else {
                    themeSystem.start();
                }
            } catch (error) {
                console.error('Error initializing theme system:', error);
            }
        },

        // Start theme system after DOM is ready
        start: () => {
            // Initialize components
            themeToggle.init();
            systemThemeMonitor.init();
            
            // Apply the correct theme with transitions
            const currentTheme = themeState.currentTheme || utils.getInitialTheme();
            themeApplicator.applyTheme(currentTheme, true);
            
            // Setup advanced features
            advancedFeatures.setupAutoTheme();
            advancedFeatures.setupThemeScheduling();
            advancedFeatures.setupScrollBasedTheme();
            
            // Add theme system styles
            themeSystem.addStyles();
            
            console.log('Theme system fully initialized');
        },

        // Add dynamic styles for theme system
        addStyles: () => {
            const style = document.createElement('style');
            style.textContent = `
                .theme-loading * {
                    transition: none !important;
                }
                
                .theme-transitioning * {
                    transition: background-color ${themeConfig.transitionDuration}ms ease, 
                               color ${themeConfig.transitionDuration}ms ease, 
                               border-color ${themeConfig.transitionDuration}ms ease,
                               box-shadow ${themeConfig.transitionDuration}ms ease !important;
                }
                
                .theme-toggle {
                    cursor: pointer;
                    user-select: none;
                    outline: none;
                }
                
                .theme-toggle:focus {
                    outline: 2px solid var(--primary-color);
                    outline-offset: 2px;
                }
                
                .toggle-slider {
                    transition: all ${themeConfig.transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1);
                }
                
                /* High contrast support */
                @media (prefers-contrast: high) {
                    .light-theme {
                        --primary-color: #0066cc;
                        --secondary-color: #00aa00;
                        --text-color: #000000;
                        --background-color: #ffffff;
                    }
                    
                    .dark-theme {
                        --primary-color: #66ccff;
                        --secondary-color: #66ff66;
                        --text-color: #ffffff;
                        --background-color: #000000;
                    }
                }
                
                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                    .theme-transitioning * {
                        transition: none !important;
                    }
                    
                    .toggle-slider {
                        transition: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        },

        // Get current theme
        getCurrentTheme: () => themeState.currentTheme,
        
        // Manually set theme
        setTheme: (themeName) => {
            if (themeConfig.themes[themeName]) {
                themeApplicator.applyTheme(themeName);
                return true;
            }
            return false;
        },

        // Reset to system preference
        resetToSystem: () => {
            themeState.userPreference = null;
            try {
                localStorage.removeItem(themeConfig.storageKey);
            } catch (error) {
                console.warn('Could not remove theme preference:', error);
            }
            
            const systemTheme = utils.getSystemTheme();
            themeApplicator.applyTheme(systemTheme);
        }
    };

    // Initialize theme system
    themeSystem.init();

    // Export theme system to window for debugging and external access
    window.ThemeSystem = {
        getCurrentTheme: themeSystem.getCurrentTheme,
        setTheme: themeSystem.setTheme,
        resetToSystem: themeSystem.resetToSystem,
        config: themeConfig,
        state: themeState
    };

    // Listen for theme change events from other scripts
    document.addEventListener('requestThemeChange', (e) => {
        if (e.detail && e.detail.theme) {
            themeSystem.setTheme(e.detail.theme);
        }
    });

})();
