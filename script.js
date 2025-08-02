document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const orderBtn = document.querySelector('.order-btn');
    const ctaBtn = document.querySelector('.cta-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const navArrows = document.querySelectorAll('.nav-arrow');
    const exoticItems = document.querySelectorAll('.exotic-item');
    const soapProducts = document.querySelectorAll('.soap-product');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    orderBtn.addEventListener('click', function() {
        const productsSection = document.getElementById('products');
        const offsetTop = productsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    ctaBtn.addEventListener('click', function() {
        const productsSection = document.getElementById('products');
        const offsetTop = productsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    viewAllBtn.addEventListener('click', function() {
        const exoticSection = document.querySelector('.exotic-soaps');
        const offsetTop = exoticSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    const soapItems = document.querySelectorAll('.soap-item');
    soapItems.forEach(item => {
        item.addEventListener('click', function() {
            const soapName = this.querySelector('h3').textContent;
            showSoapModal(soapName);
        });
    });

    function showSoapModal(soapName) {
        const modal = document.createElement('div');
        modal.className = 'soap-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${soapName}</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="soap-image-large"></div>
                    <div class="soap-details">
                        <p>Made with 100% natural ingredients, this ${soapName.toLowerCase()} soap provides gentle cleansing while nourishing your skin.</p>
                        <div class="ingredients">
                            <h3>Natural Ingredients:</h3>
                            <ul>
                                <li>Organic coconut oil</li>
                                <li>Shea butter</li>
                                <li>Essential oils</li>
                                <li>Natural colorants</li>
                            </ul>
                        </div>
                        <div class="price">$13.00</div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Set specific background and ingredients for products (check more specific names first)
        const soapImageLarge = modal.querySelector('.soap-image-large');
        const ingredientsList = modal.querySelector('.ingredients ul');
        if (soapName.toLowerCase().includes('kiwi strawberry')) {
            soapImageLarge.style.backgroundImage = "url('ChatGPT Image Jul 24, 2025, 02_57_55 PM.png')";
            soapImageLarge.style.backgroundSize = 'cover';
            soapImageLarge.style.backgroundPosition = 'center';
            soapImageLarge.style.backgroundRepeat = 'no-repeat';
            
            // Update ingredients for kiwi strawberry soap
            ingredientsList.innerHTML = `
                <li>Clear Glycerin Soap Base (8 oz)</li>
                <li>Green Soap Colorant</li>
                <li>Kiwi Fragrance Oil (0.25 oz)</li>
                <li>Strawberry Fragrance Oil (0.25 oz)</li>
                <li>Poppy Seeds (1-2 tsp)</li>
                <li>Soap-Safe Rubbing Alcohol</li>
            `;
        } else if (soapName.toLowerCase().includes('watermelon')) {
            soapImageLarge.style.backgroundImage = "url('ChatGPT Image Jul 24, 2025, 02_20_34 PM.png')";
            soapImageLarge.style.backgroundSize = 'cover';
            soapImageLarge.style.backgroundPosition = 'center';
            soapImageLarge.style.backgroundRepeat = 'no-repeat';
            
            // Update ingredients for watermelon soap
            ingredientsList.innerHTML = `
                <li>Olive Oil</li>
                <li>Water</li>
                <li>Coconut Oil</li>
                <li>RSPO Certified Palm Oil</li>
                <li>Castor Oil</li>
                <li>Sweet Almond Oil</li>
                <li>Avocado Oil</li>
                <li>Sodium Hydroxide</li>
                <li>Sodium Lactate</li>
                <li>Fragrance</li>
                <li>Tussah Silk Fibers</li>
                <li>Ethically Sourced Mica Colorants</li>
            `;
        } else if (soapName.toLowerCase().includes('strawberry')) {
            soapImageLarge.style.backgroundImage = "url('bf3f658b-96e3-4d69-9363-7554913fca98.png')";
            soapImageLarge.style.backgroundSize = 'cover';
            soapImageLarge.style.backgroundPosition = 'center';
            soapImageLarge.style.backgroundRepeat = 'no-repeat';
            
            // Update ingredients for strawberry soap
            ingredientsList.innerHTML = `
                <li>Olive Oil</li>
                <li>Water</li>
                <li>Coconut Oil</li>
                <li>RSPO Certified Palm Oil</li>
                <li>Castor Oil</li>
                <li>Sweet Almond Oil</li>
                <li>Avocado Oil</li>
                <li>Sodium Hydroxide</li>
                <li>Sodium Lactate</li>
                <li>Fragrance</li>
                <li>Tussah Silk Fibers</li>
                <li>Ethically Sourced Mica Colorants</li>
            `;
        } else if (soapName.toLowerCase().includes('peppermint')) {
            soapImageLarge.style.backgroundImage = "url('ChatGPT Image Jul 24, 2025, 04_27_06 PM.png')";
            soapImageLarge.style.backgroundSize = 'cover';
            soapImageLarge.style.backgroundPosition = 'center';
            soapImageLarge.style.backgroundRepeat = 'no-repeat';
            
            // Update ingredients for peppermint candy goat milk soap
            ingredientsList.innerHTML = `
                <li><strong>Base Oils:</strong></li>
                <li>• Olive oil – 10 oz</li>
                <li>• Coconut oil (76º) – 8 oz</li>
                <li>• Palm oil – 8 oz</li>
                <li>• Castor oil – 1 oz (boosts lather)</li>
                <li>• Shea butter – 2 oz (for creaminess)</li>
                <li><strong>Lye Solution:</strong></li>
                <li>• Lye (NaOH) – 4.5 oz</li>
                <li>• Frozen goat milk – 10 oz</li>
                <li><strong>Additives:</strong></li>
                <li>• Peppermint essential oil – 1.5 oz</li>
                <li>• Titanium dioxide (white swirl)</li>
                <li>• Red mica (candy cane effect)</li>
                <li>• Sugar & salt (lather boost)</li>
            `;
        }
        
        const closeModal = modal.querySelector('.close-modal');
        const addToCartBtn = modal.querySelector('.add-to-cart-btn');
        
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
        
        addToCartBtn.addEventListener('click', function() {
            this.textContent = 'Added!';
            this.style.background = '#22c55e';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#ff6b35';
            }, 2000);
        });
    }

    let currentSlide = 0;
    const totalSlides = exoticItems.length;

    navArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (this.classList.contains('left')) {
                currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            } else {
                currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
            }
            updateSlider();
        });
    });

    function updateSlider() {
        exoticItems.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
            item.style.opacity = index === currentSlide ? '1' : '0.5';
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.soap-item, .exotic-item, .soap-product');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const founderActions = document.querySelectorAll('.founder-actions button');
    founderActions.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('view-soaps-btn')) {
                const productsSection = document.getElementById('products');
                const offsetTop = productsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                alert('Store locator coming soon!');
            }
        });
    });

    soapProducts.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #ff6b35, #ffd700)';
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .soap-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90%;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h2 {
            color: #ff6b35;
            font-weight: 900;
            font-family: 'Fredoka One', cursive;
            text-shadow: 2px 2px 4px rgba(255, 215, 0, 0.2);
        }
        
        .close-modal {
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
        }
        
        .close-modal:hover {
            color: #ffd700;
        }
        
        .modal-body {
            padding: 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .soap-image-large {
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #e6e6fa, #9370db);
            border-radius: 15px;
        }
        
        .soap-details h3 {
            color: #ff6b35;
            margin: 1rem 0 0.5rem;
            font-weight: 800;
            font-family: 'Nunito', sans-serif;
            text-shadow: 1px 1px 3px rgba(255, 215, 0, 0.3);
        }
        
        .ingredients ul {
            list-style: none;
            padding: 0;
        }
        
        .ingredients li {
            padding: 0.25rem 0;
            color: #ff8c42;
            font-weight: 600;
        }
        
        .ingredients li:before {
            content: "🌿 ";
            margin-right: 0.5rem;
        }
        
        .price {
            font-size: 2rem;
            font-weight: 700;
            color: #ff6b35;
            margin: 1rem 0;
        }
        
        .add-to-cart-btn {
            background: #ff6b35;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
        }
        
        .add-to-cart-btn:hover {
            background: #e55a2b;
            transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

// Shopping Cart Functionality
let cart = [];

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    }
}

function addToCart(id, name, price, image = null) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Show success animation
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added! 🌺';
    button.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #ff6b35, #ff8c42)';
    }, 1500);
}

function addFruitPack() {
    // Add all 3 individual soaps to cart
    const watermelonExists = cart.find(item => item.id === 'watermelon');
    const strawberryExists = cart.find(item => item.id === 'strawberry');
    const kiwiStrawberryExists = cart.find(item => item.id === 'kiwistrawberry');
    
    // Add watermelon soap
    if (watermelonExists) {
        watermelonExists.quantity += 1;
    } else {
        cart.push({
            id: 'watermelon',
            name: 'WATERMELON 🍉',
            price: 13.00,
            image: 'ChatGPT Image Jul 24, 2025, 02_20_34 PM.png',
            quantity: 1
        });
    }
    
    // Add strawberry soap
    if (strawberryExists) {
        strawberryExists.quantity += 1;
    } else {
        cart.push({
            id: 'strawberry',
            name: 'STRAWBERRY 🍓',
            price: 10.99,
            image: 'bf3f658b-96e3-4d69-9363-7554913fca98.png',
            quantity: 1
        });
    }
    
    // Add kiwi strawberry soap
    if (kiwiStrawberryExists) {
        kiwiStrawberryExists.quantity += 1;
    } else {
        cart.push({
            id: 'kiwistrawberry',
            name: 'KIWI STRAWBERRY 🥝🍓',
            price: 12.98,
            image: 'ChatGPT Image Jul 24, 2025, 02_57_55 PM.png',
            quantity: 1
        });
    }
    
    // Apply fruit pack discount by adding a discount item
    const discountExists = cart.find(item => item.id === 'fruit-discount');
    if (discountExists) {
        discountExists.quantity += 1;
    } else {
        cart.push({
            id: 'fruit-discount',
            name: 'FRUIT PACK DISCOUNT 🍉',
            price: -1.97,
            image: null,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Show success animation
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added Fruit Pack! 🍉';
    button.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #ff6b35, #ff8c42)';
    }, 2000);
}

function showFruitPackModal() {
    const modal = document.createElement('div');
    modal.className = 'soap-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>FRUIT PACK 🍉</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="soap-image-large fruit-pack-image"></div>
                <div class="soap-details">
                    <p>Get all three amazing fruit scents in one bundle: Watermelon, Strawberry & Kiwi Strawberry soaps!</p>
                    <div class="ingredients">
                        <h3>Fruit Pack Includes:</h3>
                        <ul>
                            <li>1x Watermelon Soap 🍉</li>
                            <li>1x Strawberry Soap 🍓</li>
                            <li>1x Kiwi Strawberry Soap 🥝🍓</li>
                        </ul>
                    </div>
                    <div class="pack-savings">Save $1.97!</div>
                    <div class="price">
                        <span class="original-price">$36.97</span>
                        <span class="sale-price">$35.00</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addFruitPack()">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Set the fruit pack image
    const soapImageLarge = modal.querySelector('.soap-image-large');
    soapImageLarge.style.backgroundImage = "url('ChatGPT Image Jul 24, 2025, 04_23_45 PM.png')";
    soapImageLarge.style.backgroundSize = 'cover';
    soapImageLarge.style.backgroundPosition = 'center';
    soapImageLarge.style.backgroundRepeat = 'no-repeat';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
    };
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartDisplay();
}

// Review form functionality
let selectedRating = 0;
let isShiftPressed = false;

function toggleReviewForm() {
    const formContainer = document.getElementById('reviewFormContainer');
    const isVisible = formContainer.style.display !== 'none';
    
    if (isVisible) {
        formContainer.style.display = 'none';
        // Reset form
        document.getElementById('reviewerName').value = '';
        document.getElementById('reviewText').value = '';
        selectedRating = 0;
        updateStarDisplay();
        // Hide keyboard if open
        document.getElementById('virtualKeyboard').style.display = 'none';
    } else {
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
        // Reinitialize star rating after form is shown
        setTimeout(() => {
            initializeStarRating();
        }, 100);
    }
}

function toggleVirtualKeyboard() {
    const keyboard = document.getElementById('virtualKeyboard');
    const isVisible = keyboard.style.display !== 'none';
    keyboard.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        keyboard.scrollIntoView({ behavior: 'smooth' });
        initializeKeyboard();
    }
}

function initializeKeyboard() {
    const keys = document.querySelectorAll('.key');
    const textarea = document.getElementById('reviewText');
    
    keys.forEach(key => {
        key.onclick = function() {
            const keyValue = this.textContent.toLowerCase();
            const specialKey = this.getAttribute('data-key');
            
            if (specialKey) {
                handleSpecialKey(specialKey, textarea);
            } else {
                insertText(textarea, isShiftPressed ? keyValue.toUpperCase() : keyValue);
            }
        };
    });
}

function handleSpecialKey(key, textarea) {
    const cursorPos = textarea.selectionStart;
    const textValue = textarea.value;
    
    switch(key) {
        case 'space':
            insertText(textarea, ' ');
            break;
        case 'enter':
            insertText(textarea, '\n');
            break;
        case 'backspace':
            if (cursorPos > 0) {
                textarea.value = textValue.slice(0, cursorPos - 1) + textValue.slice(cursorPos);
                textarea.setSelectionRange(cursorPos - 1, cursorPos - 1);
            }
            break;
        case 'shift':
            isShiftPressed = !isShiftPressed;
            updateShiftState();
            break;
    }
    textarea.focus();
}

function insertText(textarea, text) {
    const cursorPos = textarea.selectionStart;
    const textValue = textarea.value;
    textarea.value = textValue.slice(0, cursorPos) + text + textValue.slice(cursorPos);
    textarea.setSelectionRange(cursorPos + text.length, cursorPos + text.length);
    textarea.focus();
}

function updateShiftState() {
    const shiftKey = document.querySelector('[data-key="shift"]');
    if (isShiftPressed) {
        shiftKey.style.background = 'linear-gradient(45deg, #ff6b35, #ff8c42)';
        shiftKey.style.color = 'white';
    } else {
        shiftKey.style.background = 'linear-gradient(45deg, #74b9ff, #0984e3)';
        shiftKey.style.color = 'white';
    }
}

// Star rating functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeStarRating();
});

function initializeStarRating() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function(e) {
            e.preventDefault();
            selectedRating = parseInt(this.getAttribute('data-rating'));
            console.log('Selected rating:', selectedRating); // Debug log
            updateStarDisplay();
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            updateStarDisplay();
        });
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStarDisplay() {
    highlightStars(selectedRating);
}

function submitReview() {
    const name = document.getElementById('reviewerName').value.trim();
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (!name) {
        alert('Please enter your name!');
        return;
    }
    
    if (!reviewText) {
        alert('Please write a review!');
        return;
    }
    
    if (selectedRating === 0) {
        alert('Please select a star rating!');
        return;
    }
    
    // Create new review card
    const reviewsGrid = document.querySelector('.reviews-grid');
    const newReview = document.createElement('div');
    newReview.className = 'review-card';
    
    const starsDisplay = '⭐'.repeat(selectedRating);
    const currentDate = new Date().toLocaleDateString();
    
    newReview.innerHTML = `
        <div class="review-stars">${starsDisplay}</div>
        <p class="review-text">"${reviewText}"</p>
        <div class="reviewer-info">
            <strong>${name}</strong>
            <span class="review-date">${currentDate}</span>
        </div>
    `;
    
    // Add animation
    newReview.style.opacity = '0';
    newReview.style.transform = 'translateY(20px)';
    reviewsGrid.appendChild(newReview);
    
    setTimeout(() => {
        newReview.style.transition = 'all 0.5s ease';
        newReview.style.opacity = '1';
        newReview.style.transform = 'translateY(0)';
    }, 100);
    
    // Show success message
    alert('Thank you for your review! 🌟');
    
    // Close form
    toggleReviewForm();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add bounce animation
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotal = document.getElementById('cart-total');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartSavings = document.getElementById('cart-savings');
    const savingsAmount = document.getElementById('savings-amount');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.innerHTML = '';
        cartTotal.textContent = '0.00';
        if (cartSubtotal) cartSubtotal.textContent = '0.00';
        if (cartSavings) cartSavings.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.innerHTML = '';
    let subtotal = 0;
    let totalSavings = 0;
    
    cart.forEach(item => {
        if (item.price > 0) {
            subtotal += item.price * item.quantity;
        } else {
            totalSavings += Math.abs(item.price * item.quantity);
        }
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Get product description based on item name
        const descriptions = {
            'WATERMELON 🍉': 'Scented with watermelon and poppy seeds • HANDCRAFTED • 5 OZ',
            'STRAWBERRY 🍓': 'Scented with strawberry and poppy seeds • HANDCRAFTED • 5 OZ', 
            'KIWI STRAWBERRY 🥝🍓': 'Scented with kiwi strawberry and poppy seeds • HANDCRAFTED • 5 OZ',
            'PEPPERMINT CANDY 🍭': 'Cold Process Peppermint Candy Goat Milk Soap • HANDCRAFTED • 5 OZ',
            'FRUIT PACK DISCOUNT 🍉': 'Bundle discount for purchasing fruit pack',
            'DUO PACK 🎁': 'Choose any 2 soaps from our collection'
        };
        
        const description = descriptions[item.name] || 'Handcrafted natural soap • 5 OZ';
        const isDiscount = item.price < 0;
        
        if (isDiscount) {
            cartItem.innerHTML = `
                <div class="cart-item-image" style="background: linear-gradient(45deg, #22c55e, #16a34a); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">💰</div>
                <div class="cart-item-details">
                    <div class="cart-item-name" style="color: #22c55e;">${item.name}</div>
                    <div class="cart-item-description">${description}</div>
                    <div class="cart-item-price" style="color: #22c55e; font-weight: 800;">-$${Math.abs(item.price * item.quantity).toFixed(2)} savings</div>
                </div>
                <div class="cart-item-controls">
                    <span class="quantity" style="color: #22c55e; font-weight: 800;">Applied</span>
                </div>
            `;
        } else {
            const imageStyle = item.image ? 
                `background-image: url('${item.image}'); background-size: cover; background-position: center;` :
                `background: linear-gradient(135deg, #ff6b35, #ff8c42);`;
                
            cartItem.innerHTML = `
                <div class="cart-item-image" style="${imageStyle}"></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-description">${description}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            `;
        }
        
        cartItems.appendChild(cartItem);
    });
    
    const total = subtotal - totalSavings;
    
    if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
    
    if (totalSavings > 0 && cartSavings && savingsAmount) {
        cartSavings.style.display = 'block';
        savingsAmount.textContent = totalSavings.toFixed(2);
    } else if (cartSavings) {
        cartSavings.style.display = 'none';
    }
}

// Notifications functionality
function toggleNotifications() {
    const notificationsPanel = document.getElementById('notifications-panel');
    const isOpen = notificationsPanel.classList.contains('open');
    
    if (isOpen) {
        notificationsPanel.classList.remove('open');
    } else {
        notificationsPanel.classList.add('open');
        // Close cart if it's open
        const cartModal = document.getElementById('cart-modal');
        if (cartModal.style.display === 'block') {
            toggleCart();
        }
    }
}

function markAllAsRead() {
    const newNotifications = document.querySelectorAll('.notification-item.new');
    const notificationBadge = document.getElementById('notificationBadge');
    
    newNotifications.forEach(notification => {
        notification.classList.remove('new');
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out';
        }, 300);
    });
    
    // Update badge
    notificationBadge.textContent = '0';
    notificationBadge.style.display = 'none';
    
    // Show success message
    showNotificationMessage('All notifications marked as read! ✅');
}

function clearOldNotifications() {
    const oldNotifications = document.querySelectorAll('.notification-item:not(.new)');
    
    if (oldNotifications.length === 0) {
        showNotificationMessage('No old notifications to clear! 📝');
        return;
    }
    
    oldNotifications.forEach((notification, index) => {
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, index * 100);
    });
    
    showNotificationMessage(`Cleared ${oldNotifications.length} old notifications! 🗑️`);
}

function showNotificationMessage(message) {
    // Create temporary message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'notification-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 420px;
        background: linear-gradient(45deg, #22c55e, #16a34a);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
        z-index: 1002;
        transform: translateX(50px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
        messageDiv.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(50px)';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

function addNewNotification(icon, title, text) {
    const notificationsBody = document.querySelector('.notifications-body');
    const notificationBadge = document.getElementById('notificationBadge');
    
    const newNotification = document.createElement('div');
    newNotification.className = 'notification-item new';
    newNotification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-text">${text}</div>
            <div class="notification-time">Just now</div>
        </div>
    `;
    
    // Insert at the beginning
    notificationsBody.insertBefore(newNotification, notificationsBody.firstChild);
    
    // Update badge
    const currentCount = parseInt(notificationBadge.textContent) || 0;
    notificationBadge.textContent = currentCount + 1;
    notificationBadge.style.display = 'flex';
    
    // Animate notification
    newNotification.style.animation = 'slideInRight 0.5s ease-out';
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0.6; }
    }
`;
document.head.appendChild(style);

// Close panels when clicking outside
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.querySelector('.cart-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const notificationsBtn = document.querySelector('.notifications-btn');
    
    // Close cart
    if (cartModal.style.display === 'block' && 
        !cartModal.querySelector('.cart-content').contains(event.target) &&
        !cartBtn.contains(event.target)) {
        toggleCart();
    }
    
    // Close notifications
    if (notificationsPanel.classList.contains('open') &&
        !notificationsPanel.contains(event.target) &&
        !notificationsBtn.contains(event.target)) {
        toggleNotifications();
    }
});

// Example: Add notification when items are added to cart (enhance existing addToCart function)
const originalAddToCart = window.addToCart;
window.addToCart = function(id, name, price, image) {
    if (originalAddToCart) {
        originalAddToCart(id, name, price, image);
    } else {
        // Default add to cart logic if original doesn't exist
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }
        updateCartCount();
        updateCartDisplay();
    }
    
    // Add notification
    addNewNotification('🛒', 'Item Added to Cart', `${name} has been added to your cart!`);
};

// Checkout functionality - Updated for Stripe
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty! Add some soaps first 🌺');
                return;
            }
            
            // Open Stripe checkout modal
            toggleCheckout();
        });
    }
});

window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #ff6b35, #ffd700);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center; color: white;">
            <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Soap Smooth</h1>
            <div style="width: 50px; height: 50px; border: 5px solid rgba(255,255,255,0.3); border-top: 5px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
    `;
    
    const spinAnimation = document.createElement('style');
    spinAnimation.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinAnimation);
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
});