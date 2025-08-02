# DOLA Website

A modern streetwear e-commerce website with shopping cart and checkout functionality.

## 🚀 Quick Start

### Option 1: Using the Built-in Server (Recommended)

```bash
# Start the local server
python3 serve.py

# Open in browser
# http://localhost:3000
```

### Option 2: Using npm (if you have Node.js)

```bash
# Install a simple server
npm install -g serve

# Start the server
serve . -l 3000

# Open in browser
# http://localhost:3000
```

### Option 3: Direct File Opening

You can also open `index.html` directly in your browser, though the server method is recommended for better functionality.

## 📁 Project Structure

```
dola-website/
├── index.html          # Main homepage
├── checkout.html       # Checkout page
├── serve.py           # Local development server
├── package.json       # Project configuration
├── assets/            # Images and icons
├── scripts/           # JavaScript functionality
│   ├── cart.js        # Shopping cart logic
│   ├── checkout.js    # Checkout form handling
│   ├── products.js    # Product interactions
│   └── ...
└── styles/            # CSS styling
    ├── main.css       # Main stylesheet
    └── components/    # Component-specific styles
```

## ✨ Features

### 🛒 Shopping Cart
- Add products to cart with color selection
- View cart in modal overlay
- Adjust quantities and remove items
- Persistent cart storage (localStorage)
- Real-time price calculations

### 💳 Checkout Process
- Complete order form with validation
- Multiple payment methods (Credit Card, PayPal, Apple Pay)
- Shipping address collection
- Tax calculation
- Form auto-completion and formatting
- Success/error handling

### 🎨 Design
- Modern dark theme with vibrant accents
- Responsive design for all devices
- Smooth animations and transitions
- Accessibility features
- DOLA brand consistency

## 🔧 Development

### Local Development Server

The included `serve.py` script provides:
- Static file serving
- Automatic cache-busting for development
- Clean URLs (serves .html files without extension)
- CORS headers for local development

### File Structure

- **HTML Files**: Main pages (index.html, checkout.html)
- **CSS**: Modular stylesheets in `styles/` directory
- **JavaScript**: Modular scripts in `scripts/` directory
- **Assets**: Images and icons in `assets/` directory

## 🌐 Navigation

### Page Routing
- **Home**: `index.html` - Product showcase and main shopping
- **Checkout**: `checkout.html` - Complete purchase process

### How Navigation Works
1. **Server Environment**: Uses relative paths (`checkout.html`)
2. **File Protocol**: Dynamically constructs full file paths
3. **Cart Integration**: Checkout button automatically navigates with cart data

## 💻 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- LocalStorage API

## 🚀 Deployment Options

### Static Hosting
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

### Traditional Hosting
- Any web server with static file support
- Upload all files maintaining directory structure
- Ensure server supports clean URLs if desired

## 🔍 Testing the Checkout Flow

1. **Add Items to Cart**:
   - Click "Add to Cart" on any product
   - Select different colors
   - View cart modal

2. **Proceed to Checkout**:
   - Click "Checkout" button in cart
   - Should navigate to checkout.html

3. **Complete Checkout**:
   - Fill out the form
   - Select payment method
   - Submit order (simulated)

## 📝 Customization

### Colors and Branding
- Modify CSS variables in `styles/utilities/variables.css`
- Update brand colors, fonts, and spacing

### Products
- Add product images to `assets/images/products/`
- Update product data in the HTML or JavaScript

### Payment Integration
- Replace the simulated payment in `checkout.js`
- Integrate with Stripe, PayPal, or other processors

## 🐛 Troubleshooting

### Navigation Issues
- **Problem**: Checkout button doesn't work
- **Solution**: Use the server method (`python3 serve.py`)

### Cart Not Persisting
- **Problem**: Items disappear on page refresh
- **Solution**: Check browser localStorage settings

### Styling Issues
- **Problem**: CSS not loading properly
- **Solution**: Check file paths and use server method

## 📞 Support

For development questions or issues:
1. Check the browser console for errors
2. Verify all files are in correct locations
3. Use the recommended server method for testing
4. Check network tab for failed resource loads

---

**Happy Shopping! 🛍️**