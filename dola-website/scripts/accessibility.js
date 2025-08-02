// Accessibility Enhancement Script

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFocusManagement();
        this.setupKeyboardNavigation();
        this.setupARIALiveRegions();
        this.setupReducedMotion();
        this.setupHighContrast();
        this.monitorAccessibilityIssues();
    }

    setupFocusManagement() {
        // Focus trap for modals
        this.setupModalFocusTrap();
        
        // Focus restoration
        this.setupFocusRestoration();
        
        // Enhanced focus visibility
        this.enhanceFocusVisibility();
    }

    setupModalFocusTrap() {
        document.addEventListener('keydown', (e) => {
            const activeModal = document.querySelector('.cart-modal.open');
            if (activeModal && e.key === 'Tab') {
                this.trapFocus(e, activeModal);
            }
        });
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    setupFocusRestoration() {
        let lastFocusedElement = null;

        // Store focus when modal opens
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cart-button')) {
                lastFocusedElement = e.target;
            }
        });

        // Restore focus when modal closes
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.cart-modal.open');
                if (activeModal && lastFocusedElement) {
                    lastFocusedElement.focus();
                    lastFocusedElement = null;
                }
            }
        });
    }

    enhanceFocusVisibility() {
        // Add focus-visible polyfill support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('user-is-tabbing');
        });
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + M: Open cart modal
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const cartButton = document.querySelector('.cart-button');
                if (cartButton) cartButton.click();
            }

            // Alt + S: Focus search (if implemented)
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const searchButton = document.querySelector('.icon-button[aria-label*="Search"]');
                if (searchButton) searchButton.focus();
            }

            // Alt + N: Focus newsletter signup
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                const newsletterInput = document.querySelector('.newsletter-form__input');
                if (newsletterInput) {
                    newsletterInput.focus();
                    newsletterInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Arrow key navigation for color swatches
        this.setupColorSwatchNavigation();
    }

    setupColorSwatchNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('.color-swatch-wrapper input')) {
                const container = e.target.closest('.product-card__colors');
                const swatches = Array.from(container.querySelectorAll('.color-swatch-wrapper input'));
                const currentIndex = swatches.indexOf(e.target);

                let newIndex = currentIndex;

                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        newIndex = (currentIndex + 1) % swatches.length;
                        break;

                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        newIndex = currentIndex === 0 ? swatches.length - 1 : currentIndex - 1;
                        break;

                    case 'Home':
                        e.preventDefault();
                        newIndex = 0;
                        break;

                    case 'End':
                        e.preventDefault();
                        newIndex = swatches.length - 1;
                        break;
                }

                if (newIndex !== currentIndex) {
                    swatches[newIndex].focus();
                    swatches[newIndex].checked = true;
                    swatches[newIndex].dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    }

    setupARIALiveRegions() {
        // Create live region for dynamic announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'accessibility-announcements';
        document.body.appendChild(liveRegion);

        // Store reference for announcements
        this.liveRegion = liveRegion;

        // Listen for cart updates
        document.addEventListener('cartUpdate', (e) => {
            const { type, data, itemCount } = e.detail;
            let message = '';

            switch (type) {
                case 'itemAdded':
                    message = `${data.title} added to cart. Cart now has ${itemCount} items.`;
                    break;
                case 'itemRemoved':
                    message = `Item removed from cart. Cart now has ${itemCount} items.`;
                    break;
                case 'quantityUpdated':
                    message = `${data.title} quantity updated. Cart now has ${itemCount} items.`;
                    break;
                case 'cartCleared':
                    message = 'Cart cleared. Cart is now empty.';
                    break;
            }

            if (message) {
                this.announce(message);
            }
        });
    }

    announce(message, priority = 'polite') {
        if (this.liveRegion) {
            this.liveRegion.setAttribute('aria-live', priority);
            this.liveRegion.textContent = message;

            // Clear after announcement
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    setupReducedMotion() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.body.classList.add('reduce-motion');
        }

        // Listen for changes in preference
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    }

    setupHighContrast() {
        // Check for high contrast preference
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        
        if (prefersHighContrast) {
            document.body.classList.add('high-contrast');
        }

        // Listen for changes in preference
        window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        });
    }

    monitorAccessibilityIssues() {
        // Monitor for missing alt text
        this.checkImageAltText();
        
        // Monitor for missing labels
        this.checkFormLabels();
        
        // Monitor for low contrast (development mode)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.checkColorContrast();
        }
    }

    checkImageAltText() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt && !img.getAttribute('aria-hidden')) {
                console.warn('Image missing alt text:', img);
            }
        });
    }

    checkFormLabels() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
                const hasLabel = document.querySelector(`label[for="${input.id}"]`) ||
                               input.closest('label') ||
                               input.getAttribute('aria-label') ||
                               input.getAttribute('aria-labelledby');
                
                if (!hasLabel) {
                    console.warn('Form control missing label:', input);
                }
            }
        });
    }

    checkColorContrast() {
        // Basic contrast checking (development helper)
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            // Only check elements with text content
            if (el.textContent.trim() && color !== backgroundColor) {
                const contrast = this.calculateContrast(color, backgroundColor);
                if (contrast < 4.5 && el.textContent.length > 10) {
                    console.warn(`Low contrast (${contrast.toFixed(2)}:1):`, el);
                }
            }
        });
    }

    calculateContrast(color1, color2) {
        // Simplified contrast calculation
        // In production, use a proper contrast checking library
        const rgb1 = this.parseRGB(color1);
        const rgb2 = this.parseRGB(color2);
        
        if (!rgb1 || !rgb2) return 21; // Assume good contrast if can't parse
        
        const l1 = this.getLuminance(rgb1);
        const l2 = this.getLuminance(rgb2);
        
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }

    parseRGB(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
    }

    getLuminance([r, g, b]) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    // Utility method to programmatically trigger announcements
    announceToScreenReader(message, priority = 'polite') {
        this.announce(message, priority);
    }

    // Method to temporarily disable animations for accessibility
    disableAnimations() {
        document.body.classList.add('disable-animations');
        
        setTimeout(() => {
            document.body.classList.remove('disable-animations');
        }, 100);
    }

    // Method to check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Method to ensure element is in viewport for screen readers
    ensureElementVisible(element) {
        if (element && typeof element.scrollIntoView === 'function') {
            element.scrollIntoView({
                behavior: this.prefersReducedMotion() ? 'auto' : 'smooth',
                block: 'nearest'
            });
        }
    }
}

// Initialize accessibility manager
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}