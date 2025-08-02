// Stripe Checkout Integration for Soap Smooth
let stripe = null;
let elements = null;
let card = null;
let clientSecret = null;

// Initialize Stripe when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Get Stripe publishable key from server
        const { publishableKey } = await fetch('/config').then(r => r.json());
        
        if (!publishableKey) {
            console.error('Stripe publishable key not found');
            return;
        }

        // Initialize Stripe
        stripe = Stripe(publishableKey);
        elements = stripe.elements();

        // Create card element
        card = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#ff8c42',
                    fontFamily: 'Nunito, sans-serif',
                    '::placeholder': {
                        color: '#ffb380',
                    },
                },
                invalid: {
                    color: '#e74c3c',
                    iconColor: '#e74c3c'
                }
            }
        });

    } catch (error) {
        console.error('Error initializing Stripe:', error);
        showPaymentError('Failed to initialize payment system');
    }
});

// Toggle checkout modal
function toggleCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    const isOpen = checkoutModal.style.display === 'block';
    
    if (isOpen) {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clean up
        if (card && card._element) {
            card.unmount();
        }
    } else {
        if (cart.length === 0) {
            alert('Your cart is empty! Add some soaps first 🌺');
            return;
        }
        
        checkoutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateCheckoutDisplay();
        initializePaymentForm();
    }
}

// Initialize payment form
async function initializePaymentForm() {
    if (!card || !elements) {
        console.error('Stripe not properly initialized');
        return;
    }

    // Mount card element
    const cardElement = document.getElementById('card-element');
    if (cardElement && !cardElement.hasChildNodes()) {
        card.mount('#card-element');
    }

    // Handle real-time validation errors from the card Element
    card.addEventListener('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
            displayError.style.display = 'block';
        } else {
            displayError.textContent = '';
            displayError.style.display = 'none';
        }
    });

    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', handlePaymentSubmission);

    // Create payment intent
    await createPaymentIntent();
}

// Create payment intent on server
async function createPaymentIntent() {
    try {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: total,
                currency: 'usd',
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            }),
        });

        const data = await response.json();
        
        if (data.error) {
            showPaymentError(data.error);
            return;
        }

        clientSecret = data.clientSecret;
        
    } catch (error) {
        console.error('Error creating payment intent:', error);
        showPaymentError('Failed to initialize payment');
    }
}

// Handle payment form submission
async function handlePaymentSubmission(event) {
    event.preventDefault();
    
    if (!stripe || !clientSecret) {
        showPaymentError('Payment system not ready');
        return;
    }

    setPaymentLoading(true);

    const customerEmail = document.getElementById('customer-email').value;
    const customerName = document.getElementById('customer-name').value;

    // Validate required fields
    if (!customerEmail || !customerName) {
        showPaymentError('Please fill in all required fields');
        setPaymentLoading(false);
        return;
    }

    try {
        // Confirm payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: customerName,
                    email: customerEmail,
                },
            }
        });

        if (error) {
            showPaymentError(error.message);
            setPaymentLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            // Payment succeeded
            showPaymentSuccess(paymentIntent);
            clearCartAfterPurchase();
            setTimeout(() => {
                toggleCheckout();
                if (document.getElementById('cart-modal').style.display === 'block') {
                    toggleCart();
                }
            }, 3000);
        }
    } catch (error) {
        console.error('Payment error:', error);
        showPaymentError('Payment failed. Please try again.');
        setPaymentLoading(false);
    }
}

// Update checkout display with cart items
function updateCheckoutDisplay() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutSavings = document.getElementById('checkout-savings');
    const checkoutSavingsAmount = document.getElementById('checkout-savings-amount');
    const checkoutFinalTotal = document.getElementById('checkout-final-total');
    
    checkoutItems.innerHTML = '';
    let subtotal = 0;
    let totalSavings = 0;
    
    cart.forEach(item => {
        if (item.price > 0) {
            subtotal += item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <div class="checkout-item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                </div>
                <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            checkoutItems.appendChild(itemElement);
        } else {
            totalSavings += Math.abs(item.price * item.quantity);
        }
    });
    
    const finalTotal = subtotal - totalSavings;
    
    checkoutSubtotal.textContent = subtotal.toFixed(2);
    checkoutFinalTotal.textContent = finalTotal.toFixed(2);
    
    if (totalSavings > 0) {
        checkoutSavings.style.display = 'block';
        checkoutSavingsAmount.textContent = totalSavings.toFixed(2);
    } else {
        checkoutSavings.style.display = 'none';
    }
}

// Show payment loading state
function setPaymentLoading(isLoading) {
    const submitButton = document.getElementById('submit-payment');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    if (isLoading) {
        submitButton.disabled = true;
        buttonText.textContent = 'Processing...';
        spinner.classList.remove('hidden');
    } else {
        submitButton.disabled = false;
        buttonText.textContent = 'Complete Payment 🌺';
        spinner.classList.add('hidden');
    }
}

// Show payment error
function showPaymentError(message) {
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.color = '#e74c3c';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

// Show payment success
function showPaymentSuccess(paymentIntent) {
    const form = document.querySelector('.payment-form');
    form.innerHTML = `
        <div class="payment-success">
            <div class="success-icon">🎉</div>
            <h3>Payment Successful!</h3>
            <p>Thank you for your order! Miya will personally handcraft your soaps with love.</p>
            <div class="order-details">
                <p><strong>Order ID:</strong> ${paymentIntent.id}</p>
                <p><strong>Amount:</strong> $${(paymentIntent.amount / 100).toFixed(2)}</p>
            </div>
            <p class="closing-message">You'll receive an email confirmation shortly. 🌺</p>
        </div>
    `;
}

// Clear cart after successful purchase
function clearCartAfterPurchase() {
    cart = [];
    updateCartCount();
    updateCartDisplay();
}

// Close checkout when clicking outside
document.addEventListener('click', function(event) {
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutContent = document.querySelector('.checkout-content');
    
    if (checkoutModal.style.display === 'block' && 
        !checkoutContent.contains(event.target) &&
        !event.target.classList.contains('checkout-btn')) {
        toggleCheckout();
    }
});

// Test card information for development
function showTestCardInfo() {
    console.log('Test Card Numbers for Stripe:');
    console.log('Success: 4242 4242 4242 4242');
    console.log('Declined: 4000 0000 0000 0002');
    console.log('Use any future date for expiry and any 3-digit CVC');
}