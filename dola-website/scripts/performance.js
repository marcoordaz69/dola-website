// Performance Optimization Script

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupCriticalResourceLoading();
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupPrefetching();
        this.monitorPerformance();
        // this.setupServiceWorker(); // Disabled since sw.js doesn't exist
        this.setupImageAutoRefresh();
    }

    setupCriticalResourceLoading() {
        // Preload critical fonts
        this.preloadCriticalResources();
        
        // Setup critical CSS inlining (simulated)
        this.optimizeCSSLoading();
        
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = font;
            link.onload = function() { this.rel = 'stylesheet'; };
            document.head.appendChild(link);
        });

        // Preload hero images
        this.preloadHeroImages();
        
        // Preload featured images for better mobile performance
        this.preloadFeaturedImages();
    }

    preloadHeroImages() {
        // Preload visible product images
        const visibleImages = document.querySelectorAll('.product-card__image img');
        const imagesToPreload = Array.from(visibleImages).slice(0, 4); // First 4 products

        imagesToPreload.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    }

    preloadFeaturedImages() {
        // Preload all featured images for critical loading
        const featuredImages = document.querySelectorAll('.featured__block img');
        featuredImages.forEach(img => {
            if (img.src) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = img.src;
                preloadLink.crossOrigin = 'anonymous';
                document.head.appendChild(preloadLink);
            }
        });
    }

    optimizeCSSLoading() {
        // Simulate critical CSS extraction
        const criticalStyles = `
            :root { --color-dark: #1A1A1A; --color-white: #FFFFFF; --color-primary: #FF3B4E; }
            body { font-family: Inter, sans-serif; background: var(--color-dark); color: var(--color-white); margin: 0; }
            .header { height: 80px; background: var(--color-dark); position: sticky; top: 0; z-index: 1020; }
            .hero { min-height: 600px; display: flex; align-items: center; justify-content: center; }
            .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }
        `;

        // Inject critical CSS inline
        const style = document.createElement('style');
        style.textContent = criticalStyles;
        document.head.insertBefore(style, document.head.firstChild);
    }

    deferNonCriticalJS() {
        // Defer non-critical JavaScript loading
        const nonCriticalScripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
        
        nonCriticalScripts.forEach(script => {
            if (!script.src.includes('accessibility') && !script.src.includes('skeleton')) {
                script.defer = true;
            }
        });
    }

    setupLazyLoading() {
        // Enhanced lazy loading with Intersection Observer
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserverLazyLoading();
        } else {
            // Fallback for older browsers
            this.setupScrollBasedLazyLoading();
        }

        // Lazy load non-critical CSS
        this.lazyLoadNonCriticalCSS();
    }

    setupIntersectionObserverLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px' // Load images 100px before they come into view for better UX
        });

        // Observe all lazy images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));

        // Load featured images immediately since they're important content
        const featuredImages = document.querySelectorAll('.featured__block img');
        featuredImages.forEach(img => {
            // Always load featured images immediately for better mobile experience
            this.loadImage(img);
        });
    }

    loadImage(img) {
        // Check if image is already loaded
        if (img.complete && img.naturalHeight > 0) {
            img.classList.add('image-loaded');
            img.style.opacity = '1';
            return;
        }
        
        // Add loading class for new images
        img.classList.add('image-loading');
        
        // Get the source - prefer data-src for lazy loading, fallback to src
        const imageSrc = img.dataset.src || img.src;
        
        // If we need to load a new source
        if (img.dataset.src && img.dataset.src !== img.src) {
            // Create new image for preloading
            const newImg = new Image();
            
            newImg.onload = () => {
                img.src = newImg.src;
                img.classList.remove('image-loading');
                img.classList.add('image-loaded');
                
                // Trigger fade-in animation
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                });
            };

            newImg.onerror = () => {
                img.classList.remove('image-loading');
                img.classList.add('image-error');
                img.style.opacity = '0.3';
                
                // Auto-retry after 2 seconds
                setTimeout(() => {
                    this.retryImageLoad(img, imageSrc);
                }, 2000);
            };

            // Start loading
            newImg.src = imageSrc;
        } else {
            // Image source is already correct, just handle the load event
            if (img.complete) {
                img.classList.remove('image-loading');
                img.classList.add('image-loaded');
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.classList.remove('image-loading');
                    img.classList.add('image-loaded');
                    requestAnimationFrame(() => {
                        img.style.opacity = '1';
                    });
                }, { once: true });
                
                img.addEventListener('error', () => {
                    img.classList.remove('image-loading');
                    img.classList.add('image-error');
                    img.style.opacity = '0.3';
                    
                    // Auto-retry after 2 seconds
                    setTimeout(() => {
                        this.retryImageLoad(img, img.src);
                    }, 2000);
                }, { once: true });
            }
        }
    }

    retryImageLoad(img, imageSrc, attempt = 1, maxAttempts = 3) {
        // Don't retry if max attempts reached
        if (attempt > maxAttempts) {
            console.warn(`Failed to load image after ${maxAttempts} attempts:`, imageSrc);
            return;
        }

        // Reset classes for retry
        img.classList.remove('image-error');
        img.classList.add('image-loading');

        // Create new image for retry
        const retryImg = new Image();
        
        retryImg.onload = () => {
            img.src = retryImg.src;
            img.classList.remove('image-loading');
            img.classList.add('image-loaded');
            
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
        };

        retryImg.onerror = () => {
            img.classList.remove('image-loading');
            img.classList.add('image-error');
            img.style.opacity = '0.3';
            
            // Retry with exponential backoff
            const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
            setTimeout(() => {
                this.retryImageLoad(img, imageSrc, attempt + 1, maxAttempts);
            }, delay);
        };

        // Add cache buster to force reload
        const separator = imageSrc.includes('?') ? '&' : '?';
        retryImg.src = `${imageSrc}${separator}t=${Date.now()}`;
    }

    setupScrollBasedLazyLoading() {
        // Fallback lazy loading for older browsers
        let lazyImages = Array.from(document.querySelectorAll('img[loading="lazy"]'));

        const lazyLoad = () => {
            lazyImages = lazyImages.filter(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight + 50) {
                    this.loadImage(img);
                    return false;
                }
                return true;
            });

            if (lazyImages.length === 0) {
                window.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationchange', lazyLoad);
            }
        };

        window.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        
        // Initial check
        lazyLoad();
    }

    lazyLoadNonCriticalCSS() {
        // Load non-critical CSS after page load
        window.addEventListener('load', () => {
            const nonCriticalCSS = [
                'styles/components/cart-modal.css',
                'styles/components/skeleton.css'
            ];

            nonCriticalCSS.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
                document.head.appendChild(link);
            });
        });
    }

    setupImageOptimization() {
        // Setup responsive images
        this.setupResponsiveImages();
        
        // Setup WebP support detection
        this.setupWebPSupport();
        
        // Setup image compression
        this.optimizeImageLoading();
    }

    setupResponsiveImages() {
        const images = document.querySelectorAll('.product-card__image img, .featured__block img');
        
        images.forEach(img => {
            if (!img.sizes) {
                // Add responsive sizes attribute
                img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw';
            }

            // Add srcset for different screen densities (if available)
            if (!img.srcset && img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }

    setupWebPSupport() {
        // Check WebP support but don't auto-convert since we don't have WebP files
        this.supportsWebP().then(supported => {
            if (supported) {
                document.body.classList.add('webp-supported');
                // Disabled auto-conversion since WebP files don't exist
                // this.convertImagesToWebP();
            }
        });
    }

    supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    convertImagesToWebP() {
        // Convert JPG/PNG images to WebP if supported
        const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".png"]');
        
        images.forEach(img => {
            const webpSrc = img.src.replace(/\.(jpg|png)$/, '.webp');
            
            // Test if WebP version exists
            const testImg = new Image();
            testImg.onload = () => {
                img.src = webpSrc;
            };
            testImg.src = webpSrc;
        });
    }

    optimizeImageLoading() {
        // Add loading states to images, but don't affect already loaded images
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Only apply loading optimization to images that aren't already loaded
            if (!img.complete || !img.naturalHeight) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                }, { once: true });
                
                img.addEventListener('error', () => {
                    img.style.opacity = '0.3'; // Show a dimmed version if failed to load
                }, { once: true });
            } else {
                // Image is already loaded, ensure it's visible
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            }
        });
    }

    setupPrefetching() {
        // Prefetch next page resources
        this.setupResourceHints();
        
        // Setup hover prefetching
        this.setupHoverPrefetching();
        
        // Setup critical route prefetching
        this.prefetchCriticalRoutes();
    }

    setupResourceHints() {
        // DNS prefetch for external resources
        const dnsPrefetchDomains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];

        dnsPrefetchDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });

        // Preconnect to critical origins
        const preconnectDomains = ['fonts.googleapis.com'];
        
        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = `https://${domain}`;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    setupHoverPrefetching() {
        // Prefetch resources on hover
        let prefetchTimer;

        document.addEventListener('mouseenter', (e) => {
            if (e.target.closest('.product-card, .btn--ghost')) {
                prefetchTimer = setTimeout(() => {
                    this.prefetchProductResources(e.target);
                }, 100);
            }
        }, { passive: true });

        document.addEventListener('mouseleave', (e) => {
            if (prefetchTimer) {
                clearTimeout(prefetchTimer);
            }
        }, { passive: true });
    }

    prefetchProductResources(element) {
        // Prefetch product detail page resources (if applicable)
        const productCard = element.closest('.product-card');
        if (productCard) {
            const productId = productCard.dataset.productId;
            if (productId) {
                // Prefetch product detail data
                this.prefetchResource(`/api/products/${productId}`);
            }
        }
    }

    prefetchCriticalRoutes() {
        // Prefetch likely next pages after initial load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const criticalRoutes = [
                    '/checkout',
                    '/api/cart'
                ];

                criticalRoutes.forEach(route => {
                    this.prefetchResource(route);
                });
            }, 2000);
        });
    }

    prefetchResource(url) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.doPrefetch(url);
            });
        } else {
            setTimeout(() => this.doPrefetch(url), 100);
        }
    }

    doPrefetch(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    monitorPerformance() {
        // Setup performance monitoring
        this.measurePageLoad();
        this.measureResourceTiming();
        this.setupLongTaskDetection();
        this.monitorCoreWebVitals();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            
            // Log to analytics (if available)
            if (window.gtag) {
                gtag('event', 'timing_complete', {
                    name: 'page_load',
                    value: pageLoadTime
                });
            }
        });
    }

    measureResourceTiming() {
        // Monitor resource loading performance
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            
            resources.forEach(resource => {
                if (resource.duration > 1000) {
                    console.warn(`Slow resource: ${resource.name} - ${resource.duration}ms`);
                }
            });
        });
    }

    setupLongTaskDetection() {
        // Detect long tasks that block the main thread
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.warn(`Long task detected: ${entry.duration}ms`);
                    }
                });
            });

            observer.observe({ entryTypes: ['longtask'] });
        }
    }

    monitorCoreWebVitals() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay (FID)
            new PerformanceObserver((entryList) => {
                entryList.getEntries().forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                entryList.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }

    setupServiceWorker() {
        // Register service worker for caching
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Utility methods for performance optimization
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Method to optimize animations for performance
    optimizeAnimations() {
        // Use transform and opacity for animations (GPU accelerated)
        const animatedElements = document.querySelectorAll('[class*="animate"]');
        
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
            
            // Remove will-change after animation
            element.addEventListener('animationend', () => {
                element.style.willChange = 'auto';
            });
        });
    }

    // Method to reduce JavaScript execution time
    optimizeJavaScript() {
        // Use requestIdleCallback for non-critical work
        if ('requestIdleCallback' in window) {
            const nonCriticalTasks = [];
            
            window.performWhenIdle = (task) => {
                nonCriticalTasks.push(task);
                requestIdleCallback(() => {
                    while (nonCriticalTasks.length > 0) {
                        const task = nonCriticalTasks.shift();
                        task();
                    }
                });
            };
        }
    }

    setupImageAutoRefresh() {
        // Periodically check for failed images and retry loading them
        setInterval(() => {
            const failedImages = document.querySelectorAll('img.image-error');
            failedImages.forEach(img => {
                // Only retry if image is visible in viewport
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    this.retryImageLoad(img, img.src, 1, 2); // Retry with max 2 attempts
                }
            });
        }, 5000); // Check every 5 seconds
        
        // Also check when page becomes visible again (user returns to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                const failedImages = document.querySelectorAll('img.image-error');
                failedImages.forEach(img => {
                    this.retryImageLoad(img, img.src, 1, 1); // Single retry attempt
                });
            }
        });
    }
}

// Initialize performance optimizer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceOptimizer = new PerformanceOptimizer();
    });
} else {
    window.performanceOptimizer = new PerformanceOptimizer();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}