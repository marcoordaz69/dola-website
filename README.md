# 🧼 Soap Smooth - Stripe Payment Integration

A beautiful e-commerce website for handmade natural soaps with full Stripe payment processing integration.

## 🌟 Features

- **Beautiful UI**: Modern, responsive design with animated elements
- **Shopping Cart**: Full cart functionality with quantity management and discounts
- **Stripe Payments**: Secure credit card processing via Stripe
- **Product Catalog**: Watermelon, Strawberry, Kiwi Strawberry, and Peppermint Candy soaps
- **Bundle Deals**: Fruit pack with automatic discounts
- **Customer Reviews**: Interactive review system with virtual keyboard
- **Notifications**: Real-time notifications for cart updates

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- A Stripe account ([sign up here](https://dashboard.stripe.com/register))

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
1. Copy the environment template:
   ```bash
   cp env-template.txt .env
   ```

2. Get your Stripe keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

3. Update your `.env` file with your actual Stripe keys:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   PORT=3000
   NODE_ENV=development
   ```

### 3. Start the Server
```bash
npm start
```

Visit `http://localhost:3000` to see your soap store in action! 🌺

## 💳 Testing Payments

Use these test card numbers with Stripe:

### Successful Payments
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3-digit number (e.g., `123`)

### Test Declined Cards
- **Declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`

## 🛠️ API Endpoints

- `GET /` - Main website
- `GET /config` - Get Stripe publishable key
- `POST /create-payment-intent` - Create payment intent for checkout
- `POST /webhook` - Stripe webhook for payment events
- `GET /health` - Health check endpoint

## 📁 File Structure

```
soap-smooth/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles including checkout modal
├── script.js           # Main JavaScript functionality
├── checkout.js         # Stripe payment integration
├── server.js           # Express.js server with Stripe API
├── package.json        # Dependencies and scripts
├── env-template.txt    # Environment variables template
└── README.md          # This file
```

## 🔧 Customization

### Adding New Products
1. Add product data to the `script.js` cart functionality
2. Update the HTML in `index.html` with new product cards
3. Add product images to the root directory

### Styling Changes
- All styles are in `styles.css`
- Checkout modal styles start at line 2059
- Colors use the orange/gold theme (`#ff6b35`, `#ff8c42`, `#ffd700`)

### Payment Processing
- Server-side logic is in `server.js`
- Frontend payment handling is in `checkout.js`
- Webhook handling for post-payment actions

## 🔐 Security Features

- ✅ API keys stored in environment variables
- ✅ Server-side payment verification
- ✅ Webhook signature validation
- ✅ No sensitive data in frontend code
- ✅ HTTPS enforcement in production

## 🌍 Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use live Stripe keys (starting with `pk_live_` and `sk_live_`)
3. Set up webhook endpoints in your Stripe dashboard
4. Ensure HTTPS is enabled
5. Configure proper CORS settings for your domain

## 📞 Support

For issues or questions:
- Check the [Stripe Documentation](https://stripe.com/docs)
- Review the browser console for error messages
- Ensure your `.env` file has valid Stripe keys

## 🌺 About Soap Smooth

Created by Miya, a young entrepreneur passionate about natural, handmade soaps. Each soap is crafted with love using only the finest natural ingredients!

---

*Made with 💚 for natural beauty enthusiasts*