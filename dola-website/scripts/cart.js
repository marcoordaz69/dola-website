// Shopping Cart Functionality

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.badge = document.querySelector('.cart-badge');
        this.init();
    }

    init() {
        this.updateBadge();
        this.bindEvents();
    }

    bindEvents() {
        // Add to cart buttons - handle both tooltip clicks and button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.product-card__tooltip') || 
                (e.target.matches('.btn') && e.target.textContent.includes('Add to Cart'))) {
                e.preventDefault();
                this.handleAddToCart(e.target);
            }
        });

        // Cart button click
        const cartButton = document.querySelector('.cart-button');
        if (cartButton) {
            cartButton.addEventListener('click', () => {
                this.openCartModal();
            });
        }

        // Cart modal events
        this.bindCartModalEvents();
    }

    bindCartModalEvents() {
        const cartModal = document.getElementById('cartModal');
        const closeCartBtn = document.getElementById('closeCart');
        const continueShopping = document.getElementById('continueShopping');
        const continueShopping2 = document.getElementById('continueShopping2');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // Close cart modal
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => this.closeCartModal());
        }

        // Continue shopping buttons
        [continueShopping, continueShopping2].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Continue shopping clicked');
                    this.closeCartModal();
                });
            }
        });

        // Checkout button
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.initiateCheckout());
        }

        // Click outside modal to close
        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                // Check if clicked on backdrop or modal container (but not content)
                if (e.target === cartModal || e.target.classList.contains('cart-modal__backdrop')) {
                    this.closeCartModal();
                }
            });
        }

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartModal && cartModal.classList.contains('open')) {
                this.closeCartModal();
            }
        });

        // Cart item interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.quantity-btn')) {
                this.handleQuantityChange(e.target);
            } else if (e.target.matches('.cart-item__remove')) {
                this.handleItemRemove(e.target);
            }
        });
    }

    handleAddToCart(button) {
        console.log('=== ADD TO CART CLICKED ===');
        console.log('Button:', button);
        
        const productCard = button.closest('.product-card');
        console.log('Product card found:', productCard);
        
        if (!productCard) {
            console.warn('No product card found');
            return;
        }

        const product = this.extractProductData(productCard);
        console.log('Extracted product:', product);
        
        if (product) {
            this.addItem(product);
            this.showAddedToCartFeedback(button);
        } else {
            console.error('Failed to extract product data');
        }
    }

    extractProductData(productCard) {
        // Get product data from data attributes
        const title = productCard.dataset.productName;
        const priceText = productCard.dataset.productPrice;
        const productId = productCard.dataset.productId;
        const image = productCard.querySelector('.product-card__image img')?.src;
        const selectedColor = productCard.querySelector('.color-swatch-wrapper input:checked');
        
        console.log('Extracting product data:', { title, priceText, productId, selectedColor: selectedColor?.value });
        
        if (!title || !priceText) {
            console.warn('Missing title or price:', { title, priceText });
            return null;
        }

        const product = {
            id: productId || this.generateProductId(title, selectedColor?.value),
            title: title.trim(),
            price: `$${priceText}`,
            image: image || '',
            color: selectedColor?.value || '#000000',
            colorLabel: selectedColor?.parentElement.querySelector('.color-swatch')?.getAttribute('aria-label') || 'Default',
            quantity: 1,
            timestamp: Date.now()
        };
        
        console.log('Created product:', product);
        return product;
    }

    generateProductId(title, color) {
        return `${title.toLowerCase().replace(/\s+/g, '-')}-${color}`.replace('#', '');
    }

    addItem(product) {
        const existingItemIndex = this.items.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            this.items[existingItemIndex].quantity += 1;
        } else {
            this.items.push(product);
        }

        this.saveCart();
        this.updateBadge();
        this.updateCartDisplay();
        this.dispatchCartEvent('itemAdded', product);
        
        console.log('Product added to cart:', product);
        console.log('Current cart items:', this.items);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateBadge();
        this.dispatchCartEvent('itemRemoved', { id: productId });
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateBadge();
                this.dispatchCartEvent('quantityUpdated', item);
            }
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateBadge();
        this.dispatchCartEvent('cartCleared');
    }

    saveCart() {
        console.log('=== SAVING CART TO LOCALSTORAGE ===');
        console.log('Cart items to save:', this.items);
        console.log('Cart items count:', this.items.length);
        
        const cartData = JSON.stringify(this.items);
        console.log('Stringified cart data:', cartData);
        
        localStorage.setItem('cart', cartData);
        
        // Verify save
        const saved = localStorage.getItem('cart');
        console.log('Verification - data actually saved:', saved);
        console.log('=== CART SAVE COMPLETE ===');
    }

    updateBadge() {
        // Re-query badge element if not found initially
        if (!this.badge) {
            this.badge = document.querySelector('.cart-badge');
        }
        
        if (this.badge) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            this.badge.textContent = totalItems;
            this.badge.style.display = totalItems > 0 ? 'flex' : 'none';
            
            // Update cart button aria-label
            const cartButton = document.querySelector('.cart-button');
            if (cartButton) {
                cartButton.setAttribute('aria-label', 
                    `Shopping cart with ${totalItems} item${totalItems !== 1 ? 's' : ''}`
                );
            }
        } else {
            console.warn('Cart badge element not found');
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    showAddedToCartFeedback(button) {
        const originalText = button.textContent;
        
        // Show loading state first
        button.disabled = true;
        button.classList.add('btn--loading');
        button.innerHTML = '<span class="spinner"></span> Adding...';
        
        setTimeout(() => {
            // Show success state
            button.classList.remove('btn--loading');
            button.classList.add('btn--success');
            button.innerHTML = '✓ Added!';
            button.style.backgroundColor = 'var(--color-success)';
            
            setTimeout(() => {
                // Reset to original state
                button.disabled = false;
                button.classList.remove('btn--success');
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        }, 800);

        // Show cart badge animation
        if (this.badge) {
            this.badge.classList.add('animate-bounce');
            setTimeout(() => {
                this.badge.classList.remove('animate-bounce');
            }, 600);
        }
    }

    openCartModal() {
        const cartModal = document.getElementById('cartModal');
        const cartEmpty = document.getElementById('cartEmpty');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');

        if (!cartModal) return;

        // Update cart display
        this.updateCartDisplay();

        // Show modal
        document.body.style.overflow = 'hidden';
        cartModal.classList.add('open');
        
        // Focus management for accessibility
        setTimeout(() => {
            const closeButton = cartModal.querySelector('.cart-modal__close');
            if (closeButton) {
                closeButton.focus();
            }
        }, 100);
    }

    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (!cartModal) {
            console.warn('Cart modal not found');
            return;
        }

        console.log('Closing cart modal');
        cartModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    updateCartDisplay() {
        const cartEmpty = document.getElementById('cartEmpty');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');

        if (this.items.length === 0) {
            // Show empty state
            cartEmpty.style.display = 'block';
            cartItems.style.display = 'none';
            cartFooter.style.display = 'none';
        } else {
            // Show cart items
            cartEmpty.style.display = 'none';
            cartItems.style.display = 'block';
            cartFooter.style.display = 'block';

            // Render cart items
            cartItems.innerHTML = this.items.map(item => this.generateCartItemHTML(item)).join('');

            // Update totals
            const subtotal = this.getTotalPrice();
            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$${subtotal.toFixed(2)}`;
        }
    }

    generateCartModalHTML() {
        const totalPrice = this.getTotalPrice();
        
        return `
            <div class="cart-modal" role="dialog" aria-labelledby="cart-title">
                <div class="cart-modal__header">
                    <h2 id="cart-title">Shopping Cart (${this.getItemCount()} items)</h2>
                    <button class="cart-modal__close" aria-label="Close cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="cart-modal__body">
                    ${this.items.map(item => this.generateCartItemHTML(item)).join('')}
                </div>
                <div class="cart-modal__footer">
                    <div class="cart-total">
                        <strong>Total: $${totalPrice.toFixed(2)}</strong>
                    </div>
                    <div class="cart-actions">
                        <button class="btn btn--secondary cart-clear">Clear Cart</button>
                        <button class="btn btn--primary cart-checkout">Checkout</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCartItemHTML(item) {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = (price * item.quantity).toFixed(2);

        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item__image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="cart-item__details">
                    <h3 class="cart-item__name">${item.title}</h3>
                    <div class="cart-item__color">
                        <span class="cart-item__color-swatch" style="background-color: ${item.color}"></span>
                        ${item.colorLabel}
                    </div>
                    <div class="cart-item__price-quantity">
                        <span class="cart-item__price">$${itemTotal}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                    </div>
                </div>
                <button class="cart-item__remove" data-id="${item.id}" aria-label="Remove ${item.title}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    }

    handleQuantityChange(button) {
        const productId = button.dataset.id;
        const action = button.dataset.action;
        const item = this.items.find(item => item.id === productId);

        if (!item) return;

        if (action === 'increase') {
            this.updateQuantity(productId, item.quantity + 1);
        } else if (action === 'decrease') {
            this.updateQuantity(productId, item.quantity - 1);
        }

        this.updateCartDisplay();
    }

    handleItemRemove(button) {
        const productId = button.dataset.id;
        const item = this.items.find(item => item.id === productId);
        
        if (item && confirm(`Remove ${item.title} from cart?`)) {
            this.removeItem(productId);
            this.updateCartDisplay();
        }
    }

    bindModalEvents(modal) {
        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.matches('.cart-modal__close')) {
                this.closeCartModal(modal);
            }
        });

        // Quantity controls
        modal.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            
            if (e.target.matches('.quantity-increase')) {
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                    this.refreshModal(modal);
                }
            } else if (e.target.matches('.quantity-decrease')) {
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity - 1);
                    this.refreshModal(modal);
                }
            } else if (e.target.matches('.cart-item__remove')) {
                this.removeItem(productId);
                this.refreshModal(modal);
            }
        });

        // Cart actions
        modal.addEventListener('click', (e) => {
            if (e.target.matches('.cart-clear')) {
                if (confirm('Are you sure you want to clear your cart?')) {
                    this.clearCart();
                    this.closeCartModal(modal);
                }
            } else if (e.target.matches('.cart-checkout')) {
                this.initiateCheckout();
                this.closeCartModal(modal);
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCartModal(modal);
            }
        });
    }

    refreshModal(modal) {
        if (this.items.length === 0) {
            this.closeCartModal(modal);
            return;
        }

        const newHTML = this.generateCartModalHTML();
        modal.innerHTML = newHTML;
    }

    closeCartModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }

    showEmptyCartMessage() {
        // Simple toast notification for empty cart
        const toast = document.createElement('div');
        toast.className = 'toast toast--info';
        toast.textContent = 'Your cart is empty';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('active');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }

    initiateCheckout() {
        if (this.items.length === 0) {
            this.showToast('Your cart is empty. Add some items before checkout.', 'error');
            return;
        }

        console.log('Initiating checkout with items:', this.items);
        
        // Navigate to checkout page
        // Handle both server and file:// protocols
        const currentUrl = window.location.href;
        let checkoutUrl;
        
        if (currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1') || currentUrl.startsWith('http')) {
            // Server environment
            checkoutUrl = 'checkout.html';
        } else {
            // File protocol - get the directory and append checkout.html
            const currentDir = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            checkoutUrl = currentDir + 'checkout.html';
        }
        
        window.location.href = checkoutUrl;
    }

    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('active');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    dispatchCartEvent(eventType, data) {
        const event = new CustomEvent('cartUpdate', {
            detail: {
                type: eventType,
                data: data,
                cart: this.items,
                total: this.getTotalPrice(),
                itemCount: this.getItemCount()
            }
        });
        document.dispatchEvent(event);
    }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        window.cart = new ShoppingCart();
    }, 100);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}