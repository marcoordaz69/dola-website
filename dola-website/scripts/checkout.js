// Checkout Page Functionality

class CheckoutManager {
    constructor() {
        this.cart = [];
        this.form = document.getElementById('checkoutForm');
        this.processingOrder = false;
        this.init();
    }

    init() {
        this.loadCartItems();
        this.updateOrderSummary();
        this.updateCartBadge(); // Update badge on checkout page
        this.bindEvents();
        this.setupFormValidation();
        this.setupPaymentMethods();
    }

    updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    loadCartItems() {
        console.log('=== LOADING CART ITEMS IN CHECKOUT ===');
        console.log('localStorage available:', typeof(Storage) !== "undefined");
        
        const rawCartData = localStorage.getItem('cart');
        console.log('Raw cart data from localStorage:', rawCartData);
        
        try {
            this.cart = JSON.parse(rawCartData) || [];
            console.log('Successfully parsed cart items:', this.cart);
            console.log('Cart length:', this.cart.length);
            
            if (this.cart.length > 0) {
                console.log('First cart item:', this.cart[0]);
                console.log('All cart items:', this.cart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            console.error('Raw data that failed to parse:', rawCartData);
            this.cart = [];
        }

        // Handle empty cart
        if (this.cart.length === 0) {
            console.log('Cart is empty, showing empty state');
            this.showEmptyCartState();
        } else {
            console.log(`Successfully loaded ${this.cart.length} items for checkout`);
        }
        
        console.log('=== CART LOADING COMPLETE ===');
    }

    showEmptyCartState() {
        const checkoutContent = document.querySelector('.checkout-content .container');
        if (checkoutContent) {
            checkoutContent.innerHTML = `
                <div class="checkout-empty">
                    <svg class="checkout-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="m1 1 4 4 14.39-2.68C18.45 14.84 18.82 14.5 19.4 14.5c.58 0 1.09.26 1.44.66L23 6H6"></path>
                    </svg>
                    <h2 class="checkout-empty__title">Your cart is empty</h2>
                    <p class="checkout-empty__subtitle">Add some DOLA items to your cart before checkout</p>
                    <a href="index.html" class="btn btn--primary btn--large">Continue Shopping</a>
                </div>
            `;
        }
    }

    updateOrderSummary() {
        const itemsContainer = document.getElementById('checkoutItems');
        const subtotalElement = document.getElementById('checkoutSubtotal');
        const taxElement = document.getElementById('checkoutTax');
        const totalElement = document.getElementById('checkoutTotal');

        if (!itemsContainer) {
            console.warn('Checkout items container not found');
            return;
        }

        console.log('Updating order summary with', this.cart.length, 'items');

        // Render cart items
        if (this.cart.length > 0) {
            itemsContainer.innerHTML = this.cart.map(item => this.generateCheckoutItemHTML(item)).join('');
        } else {
            itemsContainer.innerHTML = '<p class="text-muted">No items in cart</p>';
        }

        // Calculate totals
        const subtotal = this.calculateSubtotal();
        const tax = this.calculateTax(subtotal);
        const total = subtotal + tax;

        // Update totals display
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    generateCheckoutItemHTML(item) {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = (price * item.quantity).toFixed(2);

        return `
            <div class="checkout-item">
                <div class="checkout-item__image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="checkout-item__details">
                    <h3 class="checkout-item__name">${item.title}</h3>
                    <div class="checkout-item__color">
                        <span class="checkout-item__color-swatch" style="background-color: ${item.color}"></span>
                        ${item.colorLabel}
                    </div>
                    <div class="checkout-item__quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="checkout-item__price">$${itemTotal}</div>
            </div>
        `;
    }

    calculateSubtotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    }

    calculateTax(subtotal) {
        // Simple tax calculation - 8.25% (can be made dynamic based on location)
        return subtotal * 0.0825;
    }

    bindEvents() {
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Real-time form validation
        document.addEventListener('input', (e) => {
            if (e.target.matches('.form-input, .form-select')) {
                // Debounce validation for better performance
                clearTimeout(e.target.validationTimeout);
                e.target.validationTimeout = setTimeout(() => {
                    this.validateField(e.target);
                }, 300);
            }
        });

        // Immediate validation on blur for required fields
        document.addEventListener('blur', (e) => {
            if (e.target.matches('.form-input[required], .form-select[required]')) {
                this.validateField(e.target);
            }
        }, true);

        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => this.formatCardNumber(e));
        }

        // Expiry date formatting
        const expiryInput = document.getElementById('expiryDate');
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => this.formatExpiryDate(e));
        }

        // CVV formatting
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => this.formatCVV(e));
        }

        // Auto-fill name on card from first/last name
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const cardNameInput = document.getElementById('cardName');

        if (firstNameInput && lastNameInput && cardNameInput) {
            [firstNameInput, lastNameInput].forEach(input => {
                input.addEventListener('input', () => {
                    const firstName = firstNameInput.value.trim();
                    const lastName = lastNameInput.value.trim();
                    if (firstName || lastName) {
                        cardNameInput.value = `${firstName} ${lastName}`.trim();
                    }
                });
            });
        }
    }

    setupFormValidation() {
        // Custom validation messages
        const inputs = document.querySelectorAll('.form-input[required], .form-select[required]');
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(input, this.getValidationMessage(input));
            });

            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    this.clearFieldError(input);
                }
            });
        });
    }

    setupPaymentMethods() {
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', () => this.togglePaymentFields(radio.value));
        });

        // Initialize with default selection
        const defaultPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (defaultPayment) {
            this.togglePaymentFields(defaultPayment.value);
        }
    }

    togglePaymentFields(paymentMethod) {
        const cardFields = document.getElementById('cardPaymentFields');
        const paypalFields = document.getElementById('paypalFields');
        const applePayFields = document.getElementById('applePayFields');

        // Hide all payment fields
        [cardFields, paypalFields, applePayFields].forEach(field => {
            if (field) field.style.display = 'none';
        });

        // Show selected payment method fields
        switch (paymentMethod) {
            case 'card':
                if (cardFields) cardFields.style.display = 'block';
                break;
            case 'paypal':
                if (paypalFields) paypalFields.style.display = 'block';
                break;
            case 'apple-pay':
                if (applePayFields) applePayFields.style.display = 'block';
                break;
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Basic required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }

        // Card number validation
        if (field.id === 'cardNumber' && value && !this.isValidCardNumber(value)) {
            isValid = false;
            message = 'Please enter a valid card number';
        }

        // Expiry date validation
        if (field.id === 'expiryDate' && value && !this.isValidExpiryDate(value)) {
            isValid = false;
            message = 'Please enter a valid expiry date (MM/YY)';
        }

        // CVV validation
        if (field.id === 'cvv' && value && !this.isValidCVV(value)) {
            isValid = false;
            message = 'Please enter a valid CVV';
        }

        // ZIP code validation
        if (field.id === 'zipCode' && value && !this.isValidZipCode(value)) {
            isValid = false;
            message = 'Please enter a valid ZIP code';
        }

        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('active');
        }
        field.classList.add('error');
        field.classList.remove('valid');
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('active');
        }
        field.classList.remove('error');
        
        // Add valid state if field has value and is required or has specific validation
        if (field.value.trim() && (field.hasAttribute('required') || field.type === 'email')) {
            field.classList.add('valid');
        }
    }

    getValidationMessage(input) {
        if (input.validity.valueMissing) {
            return 'This field is required';
        }
        if (input.validity.typeMismatch) {
            if (input.type === 'email') {
                return 'Please enter a valid email address';
            }
        }
        if (input.validity.patternMismatch) {
            return 'Please enter a valid value';
        }
        return 'Please check this field';
    }

    // Format card number with spaces
    formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    }

    // Format expiry date as MM/YY
    formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }

    // Format CVV to numbers only
    formatCVV(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    // Validation helpers
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidCardNumber(cardNumber) {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        return cleanNumber.length >= 13 && cleanNumber.length <= 19 && /^\d+$/.test(cleanNumber);
    }

    isValidExpiryDate(expiry) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(expiry)) return false;

        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expiryYear = parseInt(year);
        const expiryMonth = parseInt(month);

        if (expiryYear < currentYear) return false;
        if (expiryYear === currentYear && expiryMonth < currentMonth) return false;

        return true;
    }

    isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }

    isValidZipCode(zipCode) {
        return /^\d{5}(-\d{4})?$/.test(zipCode);
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        if (this.processingOrder) return;

        // Validate form
        const isValid = this.validateForm();
        if (!isValid) {
            this.showValidationErrors();
            return;
        }

        // Start processing
        this.processingOrder = true;
        this.showProcessingState();

        try {
            // Collect form data
            const formData = this.collectFormData();
            
            // Process payment (simulate)
            await this.processPayment(formData);
            
            // Show success and redirect
            this.showSuccessState();
            
        } catch (error) {
            console.error('Checkout error:', error);
            this.showErrorState(error.message);
        } finally {
            this.processingOrder = false;
            this.hideProcessingState();
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add cart items and totals
        data.items = this.cart;
        data.subtotal = this.calculateSubtotal();
        data.tax = this.calculateTax(data.subtotal);
        data.total = data.subtotal + data.tax;

        return data;
    }

    async processPayment(data) {
        // Simulate payment processing
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true, transactionId: 'TXN' + Date.now() });
                } else {
                    reject(new Error('Payment declined. Please try again.'));
                }
            }, 2000);
        });
    }

    showProcessingState() {
        const submitBtn = document.getElementById('placeOrderBtn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnSpinner = submitBtn?.querySelector('.btn-spinner');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('checkout-processing');
        }

        if (btnText) btnText.textContent = 'Processing...';
        if (btnSpinner) btnSpinner.style.display = 'inline-block';

        // Disable form
        this.form.classList.add('form-loading');
    }

    hideProcessingState() {
        const submitBtn = document.getElementById('placeOrderBtn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnSpinner = submitBtn?.querySelector('.btn-spinner');

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('checkout-processing');
        }

        if (btnText) btnText.textContent = 'Place Order';
        if (btnSpinner) btnSpinner.style.display = 'none';

        // Enable form
        this.form.classList.remove('form-loading');
    }

    showSuccessState() {
        // Clear cart
        localStorage.removeItem('cart');

        // Show success message
        this.showToast('Order placed successfully! Thank you for your purchase.', 'success');

        // Redirect to thank you page or home after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

    showErrorState(message) {
        this.showToast(message || 'There was an error processing your order. Please try again.', 'error');
    }

    showValidationErrors() {
        this.showToast('Please check the form for errors and try again.', 'error');
        
        // Focus on first invalid field
        const firstError = this.form.querySelector('.form-input.error, .form-select.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
        }, 4000);
    }
}

// Initialize checkout when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== CHECKOUT PAGE DEBUG INFO ===');
    console.log('Checkout page DOM loaded');
    console.log('Current URL:', window.location.href);
    console.log('localStorage available:', typeof(Storage) !== "undefined");
    
    const cartData = localStorage.getItem('cart');
    console.log('Raw localStorage cart data:', cartData);
    
    if (cartData) {
        try {
            const parsedCart = JSON.parse(cartData);
            console.log('Parsed cart data:', parsedCart);
            console.log('Cart length:', parsedCart.length);
            console.log('Cart items:', parsedCart);
        } catch (e) {
            console.error('Error parsing cart data:', e);
        }
    } else {
        console.log('No cart data found in localStorage');
    }
    
    // Check if checkout form exists
    const checkoutForm = document.getElementById('checkoutForm');
    console.log('Checkout form element:', checkoutForm);
    
    if (checkoutForm) {
        console.log('Checkout form found, initializing CheckoutManager');
        window.checkout = new CheckoutManager();
    } else {
        console.log('No checkout form found on this page');
        console.log('Available elements with checkout in ID:', 
            Array.from(document.querySelectorAll('[id*="checkout"]')).map(el => el.id)
        );
    }
    
    console.log('=== END CHECKOUT DEBUG INFO ===');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CheckoutManager;
}