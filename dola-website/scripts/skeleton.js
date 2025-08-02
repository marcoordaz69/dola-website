// Skeleton Loading Management

class SkeletonLoader {
    constructor() {
        this.init();
    }

    init() {
        this.showPageSkeleton();
        this.bindLoadEvents();
        this.initializeContentLoading();
    }

    showPageSkeleton() {
        // Only show skeleton if page is loading initially
        if (document.readyState === 'loading') {
            document.body.classList.add('page--loading');
            this.createInitialSkeleton();
        }
    }

    createInitialSkeleton() {
        // Only apply skeleton to newsletter form - no other elements
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.classList.add('newsletter-form--loading');
        }
    }

    bindLoadEvents() {
        // Remove skeleton when page fully loads
        window.addEventListener('load', () => {
            this.hidePageSkeleton();
        });

        // Remove skeleton when DOM is ready (faster fallback)
        if (document.readyState !== 'loading') {
            this.hidePageSkeleton();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    this.hidePageSkeleton();
                }, 500); // Small delay for smooth transition
            });
        }

        // Image load events
        this.bindImageLoadEvents();
    }

    bindImageLoadEvents() {
        const images = document.querySelectorAll('img[loading="lazy"]:not(.featured__block img), .product-card__image img');
        
        images.forEach(img => {
            if (img.complete) {
                this.handleImageLoad(img);
            } else {
                img.addEventListener('load', () => this.handleImageLoad(img));
                img.addEventListener('error', () => this.handleImageError(img));
            }
        });
    }

    handleImageLoad(img) {
        // No skeleton handling needed for any images
    }

    handleImageError(img) {
        // Still hide skeleton even if image fails to load
        this.handleImageLoad(img);
        
        // Add error state only to product cards
        const container = img.closest('.product-card');
        if (container) {
            container.classList.add('image-error');
        }
    }

    hidePageSkeleton() {
        document.body.classList.remove('page--loading');
        
        // Progressively hide skeletons with staggered timing
        this.hideSkeletonsProgressively();
    }

    hideSkeletonsProgressively() {
        const skeletonElements = [
            { selector: '.product-card--loading', delay: 0, method: 'hideProductCardSkeleton' },
            // Removed featured block skeleton hiding since we don't add skeleton class anymore
            // { selector: '.featured__block--loading', delay: 200, method: 'hideFeaturedBlockSkeleton' },
            { selector: '.newsletter-form--loading', delay: 400, method: 'hideNewsletterSkeleton' }
        ];

        skeletonElements.forEach(({ selector, delay, method }) => {
            setTimeout(() => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    this[method](element);
                });
            }, delay);
        });
    }

    hideProductCardSkeleton(card) {
        if (!card.classList.contains('product-card--loading')) return;

        // Add fade-out animation
        card.classList.add('skeleton--fade-out');
        
        setTimeout(() => {
            card.classList.remove('product-card--loading', 'skeleton--fade-out');
            card.classList.add('product-card--loaded');
            
            // Trigger entrance animation
            this.triggerEntranceAnimation(card);
        }, 300);
    }

    hideFeaturedBlockSkeleton(block) {
        if (!block.classList.contains('featured__block--loading')) return;

        block.classList.add('skeleton--fade-out');
        
        setTimeout(() => {
            block.classList.remove('featured__block--loading', 'skeleton--fade-out');
            block.classList.add('featured__block--loaded');
            
            this.triggerEntranceAnimation(block);
        }, 300);
    }

    hideNewsletterSkeleton(form) {
        if (!form.classList.contains('newsletter-form--loading')) return;

        form.classList.add('skeleton--fade-out');
        
        setTimeout(() => {
            form.classList.remove('newsletter-form--loading', 'skeleton--fade-out');
            form.classList.add('newsletter-form--loaded');
        }, 300);
    }

    triggerEntranceAnimation(element) {
        // Add entrance animation class
        element.classList.add('animate-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('animate-in');
        }, 600);
    }

    // Method to show skeleton for dynamic content loading
    showCartItemSkeleton(container) {
        const skeletonHTML = `
            <div class="cart-item cart-item--loading" data-skeleton="true">
                <div class="cart-item__image skeleton skeleton--square"></div>
                <div class="cart-item__details">
                    <div class="cart-item__title skeleton skeleton--text"></div>
                    <div class="cart-item__color skeleton skeleton--text-short"></div>
                    <div class="cart-item__price skeleton skeleton--text-short"></div>
                </div>
                <div class="cart-item__quantity skeleton skeleton--button" style="width: 100px; height: 32px;"></div>
                <div class="cart-item__total skeleton skeleton--text-short"></div>
                <div class="cart-item__remove skeleton skeleton--circle"></div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', skeletonHTML);
        
        return container.querySelector('[data-skeleton="true"]');
    }

    hideCartItemSkeleton(skeletonElement) {
        if (skeletonElement && skeletonElement.dataset.skeleton) {
            skeletonElement.classList.add('skeleton--fade-out');
            setTimeout(() => {
                skeletonElement.remove();
            }, 300);
        }
    }

    // Method to show loading skeleton for product filtering
    showProductFilteringSkeleton() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        // Add loading class to grid
        productGrid.classList.add('product-grid--filtering');

        // Add skeleton to all product cards
        const productCards = productGrid.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.classList.add('product-card--loading');
        });
    }

    hideProductFilteringSkeleton() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        productGrid.classList.remove('product-grid--filtering');

        const productCards = productGrid.querySelectorAll('.product-card--loading');
        productCards.forEach(card => {
            this.hideProductCardSkeleton(card);
        });
    }

    // Method to show skeleton for newsletter submission
    showNewsletterSubmissionSkeleton(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const input = form.querySelector('input[type="email"]');

        if (submitButton) {
            submitButton.classList.add('skeleton', 'skeleton--button');
            submitButton.style.color = 'transparent';
        }

        if (input) {
            input.classList.add('skeleton');
            input.style.color = 'transparent';
        }

        form.classList.add('newsletter-form--loading');
    }

    hideNewsletterSubmissionSkeleton(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const input = form.querySelector('input[type="email"]');

        if (submitButton) {
            submitButton.classList.remove('skeleton', 'skeleton--button');
            submitButton.style.color = '';
        }

        if (input) {
            input.classList.remove('skeleton');
            input.style.color = '';
        }

        form.classList.remove('newsletter-form--loading');
    }

    // Utility method to create custom skeleton
    createSkeleton(config = {}) {
        const {
            width = '100%',
            height = '1rem',
            borderRadius = 'var(--radius-base)',
            className = ''
        } = config;

        const skeleton = document.createElement('div');
        skeleton.className = `skeleton ${className}`;
        skeleton.style.width = width;
        skeleton.style.height = height;
        skeleton.style.borderRadius = borderRadius;

        return skeleton;
    }

    // Method for progressive image loading with skeleton
    setupProgressiveImageLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        lazyImages.forEach(img => {
            const container = img.parentElement;
            
            // Create skeleton placeholder
            const skeleton = this.createSkeleton({
                height: img.dataset.skeletonHeight || '200px',
                className: 'skeleton--image'
            });
            
            // Insert skeleton before image
            container.insertBefore(skeleton, img);
            img.style.display = 'none';

            // Show image when loaded
            img.addEventListener('load', () => {
                skeleton.classList.add('skeleton--fade-out');
                setTimeout(() => {
                    skeleton.remove();
                    img.style.display = 'block';
                    img.classList.add('animate-in');
                }, 300);
            });

            img.addEventListener('error', () => {
                skeleton.remove();
                img.style.display = 'block';
                container.classList.add('image-error');
            });
        });
    }

    initializeContentLoading() {
        // Initialize intersection observer for skeleton management
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }

        // Setup progressive image loading
        this.setupProgressiveImageLoading();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Hide skeleton when element comes into view
                    if (element.classList.contains('product-card--loading')) {
                        setTimeout(() => {
                            this.hideProductCardSkeleton(element);
                        }, 100);
                    }
                    
                    // Removed featured block skeleton handling since we don't use skeleton for featured images
                    // if (element.classList.contains('featured__block--loading')) {
                    //     setTimeout(() => {
                    //         this.hideFeaturedBlockSkeleton(element);
                    //     }, 200);
                    // }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // No skeleton elements to observe
    }
}

// Initialize skeleton loader
document.addEventListener('DOMContentLoaded', () => {
    window.skeletonLoader = new SkeletonLoader();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkeletonLoader;
}