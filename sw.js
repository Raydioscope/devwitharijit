/**
 * Service Worker for Arijit Ray's Portfolio
 * Provides offline capabilities, caching, and performance optimizations
 */

const CACHE_NAME = 'arijit-ray-portfolio-v1.0.0';
const STATIC_CACHE_NAME = 'arijit-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'arijit-dynamic-v1.0.0';

// Files to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/animations.css',
    '/js/main.js',
    '/js/animations.js',
    '/js/theme-toggle.js',
    '/js/chatbot.js',
    '/assets/resume.pdf',
    '/manifest.json',
    
    // External resources
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://code.jquery.com/jquery-3.7.1.min.js'
];

// Dynamic cache patterns
const DYNAMIC_CACHE_PATTERNS = [
    /^https:\/\/images\.unsplash\.com\//,
    /^https:\/\/fonts\.googleapis\.com\//,
    /^https:\/\/fonts\.gstatic\.com\//,
    /^https:\/\/cdnjs\.cloudflare\.com\//,
    /^https:\/\/cdn\.jsdelivr\.net\//
];

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    CACHE_ONLY: 'cache-only',
    NETWORK_ONLY: 'network-only',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Configuration
const CONFIG = {
    // Cache expiration times (in milliseconds)
    STATIC_CACHE_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
    DYNAMIC_CACHE_EXPIRY: 24 * 60 * 60 * 1000, // 1 day
    IMAGE_CACHE_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
    
    // Maximum cache sizes
    MAX_DYNAMIC_CACHE_SIZE: 50,
    MAX_IMAGE_CACHE_SIZE: 30,
    
    // Network timeout
    NETWORK_TIMEOUT: 3000,
    
    // Offline page
    OFFLINE_PAGE: '/offline.html',
    
    // Background sync
    BACKGROUND_SYNC_TAG: 'background-sync',
    
    // Analytics
    ANALYTICS_CACHE_NAME: 'analytics-cache'
};

// Utility functions
const utils = {
    // Check if request should be cached
    shouldCache: (request) => {
        const url = new URL(request.url);
        
        // Skip non-GET requests
        if (request.method !== 'GET') return false;
        
        // Skip chrome-extension and other protocols
        if (!url.protocol.startsWith('http')) return false;
        
        // Skip analytics and tracking
        if (url.hostname.includes('google-analytics') || 
            url.hostname.includes('googletagmanager') ||
            url.hostname.includes('gtag')) return false;
        
        return true;
    },

    // Get appropriate cache name for request
    getCacheName: (request) => {
        const url = new URL(request.url);
        
        // Static assets
        if (STATIC_ASSETS.some(asset => url.pathname === asset || url.href === asset)) {
            return STATIC_CACHE_NAME;
        }
        
        // Dynamic content
        return DYNAMIC_CACHE_NAME;
    },

    // Check if request matches dynamic cache patterns
    matchesDynamicPattern: (request) => {
        const url = request.url;
        return DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(url));
    },

    // Create response with custom headers
    createResponse: (body, options = {}) => {
        const defaultOptions = {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'text/html',
                'X-Cache': 'service-worker'
            }
        };
        
        return new Response(body, { ...defaultOptions, ...options });
    },

    // Log with timestamp
    log: (message, ...args) => {
        console.log(`[SW ${new Date().toISOString()}] ${message}`, ...args);
    },

    // Check if cache is expired
    isCacheExpired: (response, maxAge) => {
        const cacheTime = response.headers.get('sw-cache-time');
        if (!cacheTime) return true;
        
        const age = Date.now() - parseInt(cacheTime);
        return age > maxAge;
    },

    // Add cache headers to response
    addCacheHeaders: (response) => {
        const clonedResponse = response.clone();
        const headers = new Headers(clonedResponse.headers);
        headers.set('sw-cache-time', Date.now().toString());
        headers.set('sw-cached', 'true');
        
        return new Response(clonedResponse.body, {
            status: clonedResponse.status,
            statusText: clonedResponse.statusText,
            headers: headers
        });
    }
};

// Cache management
const cacheManager = {
    // Install static cache
    installStaticCache: async () => {
        try {
            const cache = await caches.open(STATIC_CACHE_NAME);
            const cachePromises = STATIC_ASSETS.map(async (asset) => {
                try {
                    await cache.add(asset);
                    utils.log(`Cached static asset: ${asset}`);
                } catch (error) {
                    utils.log(`Failed to cache static asset: ${asset}`, error);
                }
            });
            
            await Promise.allSettled(cachePromises);
            utils.log('Static cache installation completed');
        } catch (error) {
            utils.log('Static cache installation failed:', error);
        }
    },

    // Clean old caches
    cleanOldCaches: async () => {
        try {
            const cacheNames = await caches.keys();
            const oldCaches = cacheNames.filter(name => 
                name.startsWith('arijit-') && 
                name !== STATIC_CACHE_NAME && 
                name !== DYNAMIC_CACHE_NAME
            );

            const deletePromises = oldCaches.map(async (cacheName) => {
                await caches.delete(cacheName);
                utils.log(`Deleted old cache: ${cacheName}`);
            });

            await Promise.all(deletePromises);
            utils.log('Old caches cleaned');
        } catch (error) {
            utils.log('Cache cleanup failed:', error);
        }
    },

    // Limit cache size
    limitCacheSize: async (cacheName, maxSize) => {
        try {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            
            if (keys.length > maxSize) {
                const keysToDelete = keys.slice(0, keys.length - maxSize);
                
                for (const key of keysToDelete) {
                    await cache.delete(key);
                }
                
                utils.log(`Limited cache ${cacheName} to ${maxSize} items`);
            }
        } catch (error) {
            utils.log(`Failed to limit cache ${cacheName}:`, error);
        }
    },

    // Clear expired cache entries
    clearExpiredCache: async () => {
        try {
            const cacheNames = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
            
            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const requests = await cache.keys();
                
                for (const request of requests) {
                    const response = await cache.match(request);
                    if (response) {
                        const maxAge = cacheName === STATIC_CACHE_NAME ? 
                            CONFIG.STATIC_CACHE_EXPIRY : CONFIG.DYNAMIC_CACHE_EXPIRY;
                        
                        if (utils.isCacheExpired(response, maxAge)) {
                            await cache.delete(request);
                            utils.log(`Deleted expired cache entry: ${request.url}`);
                        }
                    }
                }
            }
        } catch (error) {
            utils.log('Failed to clear expired cache:', error);
        }
    }
};

// Network strategies
const networkStrategies = {
    // Cache first strategy
    cacheFirst: async (request) => {
        try {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                // Check if cache is expired for dynamic content
                const cacheName = utils.getCacheName(request);
                if (cacheName === DYNAMIC_CACHE_NAME) {
                    const maxAge = request.url.includes('image') ? 
                        CONFIG.IMAGE_CACHE_EXPIRY : CONFIG.DYNAMIC_CACHE_EXPIRY;
                    
                    if (!utils.isCacheExpired(cachedResponse, maxAge)) {
                        return cachedResponse;
                    }
                } else {
                    return cachedResponse;
                }
            }

            // Fetch from network
            const networkResponse = await fetch(request);
            
            if (networkResponse.ok && utils.shouldCache(request)) {
                const cache = await caches.open(utils.getCacheName(request));
                const responseToCache = utils.addCacheHeaders(networkResponse);
                cache.put(request, responseToCache.clone());
                
                // Limit cache size
                if (utils.getCacheName(request) === DYNAMIC_CACHE_NAME) {
                    await cacheManager.limitCacheSize(DYNAMIC_CACHE_NAME, CONFIG.MAX_DYNAMIC_CACHE_SIZE);
                }
            }

            return networkResponse;
        } catch (error) {
            // Return cached response if available
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
                return networkStrategies.getOfflinePage();
            }
            
            throw error;
        }
    },

    // Network first strategy
    networkFirst: async (request) => {
        try {
            const networkPromise = fetch(request);
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Network timeout')), CONFIG.NETWORK_TIMEOUT);
            });

            const networkResponse = await Promise.race([networkPromise, timeoutPromise]);
            
            if (networkResponse.ok && utils.shouldCache(request)) {
                const cache = await caches.open(utils.getCacheName(request));
                const responseToCache = utils.addCacheHeaders(networkResponse);
                cache.put(request, responseToCache.clone());
            }

            return networkResponse;
        } catch (error) {
            utils.log('Network request failed, trying cache:', request.url);
            
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            
            if (request.mode === 'navigate') {
                return networkStrategies.getOfflinePage();
            }
            
            throw error;
        }
    },

    // Stale while revalidate strategy
    staleWhileRevalidate: async (request) => {
        const cachedResponse = caches.match(request);
        
        const fetchPromise = fetch(request).then(async (networkResponse) => {
            if (networkResponse.ok && utils.shouldCache(request)) {
                const cache = await caches.open(utils.getCacheName(request));
                const responseToCache = utils.addCacheHeaders(networkResponse);
                cache.put(request, responseToCache.clone());
            }
            return networkResponse;
        }).catch(() => {
            // Silently fail the background update
            return null;
        });

        return (await cachedResponse) || (await fetchPromise) || networkStrategies.getOfflinePage();
    },

    // Get offline page
    getOfflinePage: async () => {
        try {
            const offlineResponse = await caches.match(CONFIG.OFFLINE_PAGE);
            if (offlineResponse) {
                return offlineResponse;
            }
        } catch (error) {
            utils.log('Offline page not found in cache');
        }

        // Return basic offline page
        const offlineHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Offline - Arijit Ray Portfolio</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: linear-gradient(135deg, #212F3C 0%, #1a252f 100%);
                        color: #F4F6F7;
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }
                    .offline-container {
                        max-width: 500px;
                        padding: 2rem;
                    }
                    .offline-icon {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                        color: #35c3fc;
                    }
                    .offline-title {
                        font-size: 2rem;
                        margin-bottom: 1rem;
                        color: #35c3fc;
                    }
                    .offline-message {
                        font-size: 1.1rem;
                        line-height: 1.6;
                        margin-bottom: 2rem;
                        color: #85929E;
                    }
                    .offline-button {
                        background: linear-gradient(45deg, #35c3fc, #48ff85);
                        color: #212F3C;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .offline-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(53, 195, 252, 0.3);
                    }
                </style>
            </head>
            <body>
                <div class="offline-container">
                    <div class="offline-icon">📱</div>
                    <h1 class="offline-title">You're Offline</h1>
                    <p class="offline-message">
                        It looks like you're not connected to the internet. 
                        Some features of Arijit Ray's portfolio may not be available right now.
                    </p>
                    <button class="offline-button" onclick="window.location.reload()">
                        Try Again
                    </button>
                </div>
            </body>
            </html>
        `;

        return utils.createResponse(offlineHTML);
    }
};

// Route handling
const routeHandler = {
    // Handle different types of requests
    handleRequest: async (request) => {
        const url = new URL(request.url);
        
        // Handle navigation requests (HTML pages)
        if (request.mode === 'navigate') {
            return networkStrategies.networkFirst(request);
        }
        
        // Handle static assets
        if (STATIC_ASSETS.some(asset => url.pathname === asset || url.href === asset)) {
            return networkStrategies.cacheFirst(request);
        }
        
        // Handle images
        if (request.destination === 'image') {
            return networkStrategies.cacheFirst(request);
        }
        
        // Handle dynamic content
        if (utils.matchesDynamicPattern(request)) {
            return networkStrategies.staleWhileRevalidate(request);
        }
        
        // Handle API requests
        if (url.pathname.startsWith('/api/')) {
            return networkStrategies.networkFirst(request);
        }
        
        // Default to network first
        return networkStrategies.networkFirst(request);
    }
};

// Background sync
const backgroundSync = {
    // Handle background sync events
    handleBackgroundSync: async (event) => {
        if (event.tag === CONFIG.BACKGROUND_SYNC_TAG) {
            await backgroundSync.syncData();
        }
    },

    // Sync data in background
    syncData: async () => {
        try {
            // Update caches
            await cacheManager.clearExpiredCache();
            
            // Pre-cache important resources
            const importantResources = [
                '/',
                '/css/style.css',
                '/js/main.js'
            ];
            
            const cache = await caches.open(STATIC_CACHE_NAME);
            for (const resource of importantResources) {
                try {
                    const response = await fetch(resource);
                    if (response.ok) {
                        await cache.put(resource, response);
                    }
                } catch (error) {
                    utils.log(`Failed to sync resource: ${resource}`, error);
                }
            }
            
            utils.log('Background sync completed');
        } catch (error) {
            utils.log('Background sync failed:', error);
        }
    }
};

// Analytics and metrics
const analytics = {
    // Track service worker events
    trackEvent: (eventName, data = {}) => {
        // Store analytics data for later sync
        const event = {
            name: eventName,
            data: data,
            timestamp: Date.now(),
            url: self.location.href
        };
        
        // Store in IndexedDB or send immediately if online
        analytics.storeEvent(event);
    },

    // Store analytics event
    storeEvent: async (event) => {
        try {
            // Simple implementation using cache API
            const cache = await caches.open(CONFIG.ANALYTICS_CACHE_NAME);
            const eventKey = `analytics-${Date.now()}-${Math.random()}`;
            const response = new Response(JSON.stringify(event));
            await cache.put(eventKey, response);
        } catch (error) {
            utils.log('Failed to store analytics event:', error);
        }
    },

    // Send analytics data when online
    sendAnalytics: async () => {
        try {
            const cache = await caches.open(CONFIG.ANALYTICS_CACHE_NAME);
            const keys = await cache.keys();
            
            for (const key of keys) {
                const response = await cache.match(key);
                const event = await response.json();
                
                // Send to analytics service (implement as needed)
                utils.log('Analytics event:', event);
                
                // Remove after successful send
                await cache.delete(key);
            }
        } catch (error) {
            utils.log('Failed to send analytics:', error);
        }
    }
};

// Event listeners
self.addEventListener('install', (event) => {
    utils.log('Service worker installing...');
    
    event.waitUntil(
        Promise.all([
            cacheManager.installStaticCache(),
            self.skipWaiting()
        ])
    );
    
    analytics.trackEvent('sw_install');
});

self.addEventListener('activate', (event) => {
    utils.log('Service worker activating...');
    
    event.waitUntil(
        Promise.all([
            cacheManager.cleanOldCaches(),
            self.clients.claim()
        ])
    );
    
    analytics.trackEvent('sw_activate');
});

self.addEventListener('fetch', (event) => {
    // Skip non-http requests
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        routeHandler.handleRequest(event.request).catch((error) => {
            utils.log('Fetch error:', error);
            
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
                return networkStrategies.getOfflinePage();
            }
            
            // For other requests, return a basic error response
            return utils.createResponse('Network Error', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        })
    );
});

self.addEventListener('backgroundsync', (event) => {
    event.waitUntil(backgroundSync.handleBackgroundSync(event));
});

self.addEventListener('message', (event) => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;
            
        case 'CLEAR_CACHE':
            caches.delete(data.cacheName || DYNAMIC_CACHE_NAME);
            break;
            
        case 'GET_CACHE_SIZE':
            caches.open(data.cacheName || DYNAMIC_CACHE_NAME)
                .then(cache => cache.keys())
                .then(keys => event.ports[0].postMessage({ size: keys.length }));
            break;
            
        default:
            utils.log('Unknown message type:', type);
    }
});

// Periodic background tasks
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(
            Promise.all([
                cacheManager.clearExpiredCache(),
                analytics.sendAnalytics()
            ])
        );
    }
});

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/assets/icons/icon-192x192.png',
            badge: '/assets/icons/badge-72x72.png',
            tag: 'portfolio-notification',
            data: {
                url: '/'
            }
        };
        
        event.waitUntil(
            self.registration.showNotification('Arijit Ray Portfolio', options)
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

// Initialize service worker
utils.log('Service worker script loaded');
analytics.trackEvent('sw_script_loaded');

// Export for debugging
self.ServiceWorkerDebug = {
    CACHE_NAME,
    CONFIG,
    utils,
    cacheManager,
    networkStrategies,
    analytics
};
