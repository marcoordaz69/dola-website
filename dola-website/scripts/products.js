// Product functionality and interactions

class ProductManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindColorSwatchEvents();
        this.bindProductCardEvents();
        this.initializeIntersectionObserver();
        this.bindNewsletterEvents();
    }

    bindColorSwatchEvents() {
        document.addEventListener('change', (e) => {
            if (e.target.matches('.color-swatch-wrapper input')) {
                this.handleColorSelection(e.target);
            }
        });

        // Also handle click events for better UX
        document.addEventListener('click', (e) => {
            if (e.target.matches('.color-swatch')) {
                const radio = e.target.parentElement.querySelector('input');
                if (radio) {
                    radio.checked = true;
                    this.handleColorSelection(radio);
                }
            }
        });
    }

    handleColorSelection(radioInput) {
        const wrapper = radioInput.parentElement;
        const productCard = radioInput.closest('.product-card');
        
        if (!productCard) return;

        // Remove active class from all swatches in this product
        const allSwatches = productCard.querySelectorAll('.color-swatch');
        allSwatches.forEach(swatch => swatch.classList.remove('color-swatch--active'));

        // Add active class to selected swatch
        const selectedSwatch = wrapper.querySelector('.color-swatch');
        if (selectedSwatch) {
            selectedSwatch.classList.add('color-swatch--active');
        }

        // Update product image if color variants exist
        this.updateProductImage(productCard, radioInput.value);

        // Announce change to screen readers
        this.announceColorChange(radioInput);
    }

    updateProductImage(productCard, colorValue) {
        const image = productCard.querySelector('.product-card__image img');
        if (!image) return;

        const baseSrc = image.src;
        const colorName = this.getColorName(colorValue);
        
        // Update image source based on color (if variants exist)
        const newSrc = baseSrc.replace(/-(black|red|blue|orange|teal|gray|green)\.(jpg|svg)/, `-${colorName}.svg`);
        
        if (newSrc !== baseSrc) {
            // Add loading effect
            image.style.opacity = '0.5';
            
            // Preload new image
            const newImage = new Image();
            newImage.onload = () => {
                image.src = newSrc;
                image.style.opacity = '1';
            };
            newImage.onerror = () => {
                // Fallback to original image if new one doesn't exist
                image.style.opacity = '1';
            };
            newImage.src = newSrc;
        }
    }

    getColorName(colorValue) {
        const colorMap = {
            '#FF3B4E': 'red',
            '#000000': 'black',
            '#00B4D8': 'blue',
            '#FF6B35': 'orange',
            '#00A86B': 'teal',
            '#6B6B6B': 'gray',
            '#00A86B': 'green'
        };
        return colorMap[colorValue] || 'black';
    }

    announceColorChange(radioInput) {
        const colorLabel = radioInput.parentElement.querySelector('.color-swatch').getAttribute('aria-label');
        const productTitle = radioInput.closest('.product-card').querySelector('.product-card__title').textContent;
        
        // Create temporary announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Selected ${colorLabel} color for ${productTitle}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    bindProductCardEvents() {
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('.product-card') || e.target.closest('.product-card')) {
                this.handleProductCardHover(e.target.closest('.product-card'), true);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('.product-card') || e.target.closest('.product-card')) {
                this.handleProductCardHover(e.target.closest('.product-card'), false);
            }
        }, true);

        // Add keyboard navigation for product cards
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('.product-card') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.handleProductCardActivation(e.target);
            }
        });

        // Handle tooltip clicks to open modal
        document.addEventListener('click', (e) => {
            if (e.target.matches('.product-card__tooltip')) {
                e.preventDefault();
                e.stopPropagation();
                const productCard = e.target.closest('.product-card');
                this.openProductModal(productCard);
            }
        });

        // Handle modal interactions
        this.bindModalEvents();
    }

    handleProductCardHover(card, isHovering) {
        if (!card) return;

        if (isHovering) {
            card.classList.add('hovered');
            // Preload larger image if needed
            this.preloadProductImage(card);
        } else {
            card.classList.remove('hovered');
        }
    }

    preloadProductImage(card) {
        const img = card.querySelector('.product-card__image img');
        if (img && !img.dataset.preloaded) {
            // For SVG images, we don't need high-res variants
            img.dataset.preloaded = 'true';
        }
    }

    handleProductCardActivation(card) {
        // Could navigate to product detail page
        const productName = card.dataset.productName;
        console.log(`Activated product: ${productName}`);
        
        // For demo purposes, highlight the card
        card.classList.add('product-card--activated');
        setTimeout(() => {
            card.classList.remove('product-card--activated');
        }, 300);
    }

    bindModalEvents() {
        const modal = document.getElementById('productModal');
        const closeBtn = modal.querySelector('.product-modal__close');
        const backdrop = modal.querySelector('.product-modal__backdrop');
        const addToCartBtn = document.getElementById('modalAddToCart');
        
        // Close modal events
        closeBtn.addEventListener('click', () => this.closeProductModal());
        backdrop.addEventListener('click', () => this.closeProductModal());
        
        // Size selection
        modal.addEventListener('click', (e) => {
            if (e.target.matches('.size-option')) {
                this.selectSize(e.target);
            }
        });
        
        // Add to cart from modal
        addToCartBtn.addEventListener('click', () => this.addToCartFromModal());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeProductModal();
            }
        });
    }

    openProductModal(productCard) {
        const modal = document.getElementById('productModal');
        const productName = productCard.dataset.productName;
        const productPrice = productCard.dataset.productPrice;
        const productImage = productCard.querySelector('img').src;
        const productAlt = productCard.querySelector('img').alt;
        
        // Populate modal content
        document.getElementById('modalProductTitle').textContent = productName;
        document.getElementById('modalProductPrice').textContent = `$${productPrice}`;
        document.getElementById('modalProductImage').src = productImage;
        document.getElementById('modalProductImage').alt = productAlt;
        
        // Store product data on modal
        modal.dataset.productName = productName;
        modal.dataset.productPrice = productPrice;
        modal.dataset.productImage = productImage;
        
        // Reset size selection
        modal.querySelectorAll('.size-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Disable add to cart until size is selected
        document.getElementById('modalAddToCart').disabled = true;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    selectSize(sizeButton) {
        const modal = document.getElementById('productModal');
        
        // Remove selection from all buttons
        modal.querySelectorAll('.size-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select clicked button
        sizeButton.classList.add('selected');
        
        // Store selected size
        modal.dataset.selectedSize = sizeButton.dataset.size;
        
        // Enable add to cart
        document.getElementById('modalAddToCart').disabled = false;
    }

    addToCartFromModal() {
        const modal = document.getElementById('productModal');
        const productName = modal.dataset.productName;
        const productPrice = modal.dataset.productPrice;
        const productImage = modal.dataset.productImage;
        const selectedSize = modal.dataset.selectedSize;
        
        if (!selectedSize) {
            return;
        }
        
        // Create product object
        const product = {
            name: productName,
            size: selectedSize,
            price: parseFloat(productPrice),
            image: productImage,
            id: `${productName.replace(/\s+/g, '-').toLowerCase()}-${selectedSize.toLowerCase()}`
        };
        
        // Add to cart
        this.addToCart(product);
        
        // Show success and close modal
        this.showModalSuccess(selectedSize);
        
        setTimeout(() => {
            this.closeProductModal();
        }, 1500);
    }

    showModalSuccess(size) {
        const addBtn = document.getElementById('modalAddToCart');
        const originalText = addBtn.textContent;
        
        addBtn.textContent = `Added ${size} to Cart!`;
        addBtn.style.background = 'var(--color-success)';
        addBtn.disabled = true;
        
        setTimeout(() => {
            addBtn.textContent = originalText;
            addBtn.style.background = '';
            addBtn.disabled = false;
        }, 1500);
    }

    addToCart(product) {
        // Get existing cart from localStorage or create new
        let cart = JSON.parse(localStorage.getItem('dola-cart') || '[]');
        
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            // Increase quantity if item exists
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            // Add new item to cart
            product.quantity = 1;
            cart.push(product);
        }
        
        // Save to localStorage
        localStorage.setItem('dola-cart', JSON.stringify(cart));
        
        // Update cart badge if exists
        this.updateCartBadge(cart);
        
        console.log(`Added ${product.name} (${product.size}) to cart`);
    }

    updateCartBadge(cart) {
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            
            // Add bounce animation
            cartBadge.parentElement.classList.add('animate-bounce');
            setTimeout(() => {
                cartBadge.parentElement.classList.remove('animate-bounce');
            }, 600);
        }
    }


    initializeIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElementIn(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Only observe product cards, not featured blocks
        const elements = document.querySelectorAll('.product-card');
        elements.forEach(el => observer.observe(el));
    }

    animateElementIn(element) {
        element.classList.add('animate-in');
        
        // Add staggered animation for product grid
        if (element.classList.contains('product-card')) {
            const cards = Array.from(element.parentElement.children);
            const index = cards.indexOf(element);
            element.style.animationDelay = `${index * 100}ms`;
        }
    }

    bindNewsletterEvents() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmission(form);
        });

        // Real-time email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                this.validateEmail(emailInput);
            });
        }
    }

    async handleNewsletterSubmission(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();

        if (!this.isValidEmail(email)) {
            this.showFormError(form, 'Please enter a valid email address');
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        try {
            // Simulate API call
            await this.submitEmail(email);
            this.showFormSuccess(form, 'Thank you for subscribing!');
            form.reset();
        } catch (error) {
            this.showFormError(form, 'Something went wrong. Please try again.');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    async submitEmail(email) {
        // Simulate API delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.1 ? resolve() : reject(new Error('API Error'));
            }, 1500);
        });
    }

    validateEmail(input) {
        const isValid = this.isValidEmail(input.value);
        input.classList.toggle('invalid', !isValid && input.value.length > 0);
        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setFormLoading(form, isLoading) {
        const submitButton = form.querySelector('button[type="submit"]');
        const input = form.querySelector('input[type="email"]');

        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            input.disabled = true;
            form.classList.add('newsletter-form--loading');
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            input.disabled = false;
            form.classList.remove('newsletter-form--loading');
        }
    }

    showFormSuccess(form, message) {
        this.clearFormMessages(form);
        form.classList.add('newsletter-form--success');
        this.showFormMessage(form, message, 'success');
        
        setTimeout(() => {
            form.classList.remove('newsletter-form--success');
        }, 3000);
    }

    showFormError(form, message) {
        this.clearFormMessages(form);
        form.classList.add('newsletter-form--error');
        this.showFormMessage(form, message, 'error');
        
        setTimeout(() => {
            form.classList.remove('newsletter-form--error');
        }, 5000);
    }

    showFormMessage(form, message, type) {
        let messageEl = form.querySelector('.newsletter-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'newsletter-message';
            form.appendChild(messageEl);
        }

        messageEl.className = `newsletter-message newsletter-message--${type}`;
        messageEl.textContent = message;
        messageEl.classList.add('show');
    }

    clearFormMessages(form) {
        const messageEl = form.querySelector('.newsletter-message');
        if (messageEl) {
            messageEl.classList.remove('show');
        }
    }

    // Utility method for smooth scrolling
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Method to filter products (for future search functionality)
    filterProducts(criteria) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const matches = this.productMatchesCriteria(product, criteria);
            product.style.display = matches ? 'block' : 'none';
            
            if (matches) {
                product.classList.add('product-card--filtered-in');
            } else {
                product.classList.remove('product-card--filtered-in');
            }
        });
    }

    productMatchesCriteria(productElement, criteria) {
        const title = productElement.querySelector('.product-card__title')?.textContent.toLowerCase();
        const badge = productElement.querySelector('.badge')?.textContent.toLowerCase();
        
        if (criteria.search) {
            if (!title.includes(criteria.search.toLowerCase())) {
                return false;
            }
        }
        
        if (criteria.badges && criteria.badges.length > 0) {
            if (!criteria.badges.some(badgeType => badge.includes(badgeType.toLowerCase()))) {
                return false;
            }
        }
        
        return true;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.productManager = new ProductManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
}