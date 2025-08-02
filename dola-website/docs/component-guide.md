# DOLA Website Component Guide

## Overview
This guide documents all reusable components in the DOLA website, their structure, properties, and usage examples.

## Component Architecture

### Design Principles
1. **Modular**: Each component is self-contained
2. **Reusable**: Components can be used in multiple contexts
3. **Accessible**: All components follow WCAG 2.1 AA standards
4. **Responsive**: Components adapt to all screen sizes
5. **Themeable**: Components use CSS custom properties

## Components

### 1. Header Component

#### Structure
```html
<header class="header">
  <div class="header__container">
    <a href="/" class="header__logo">
      <img src="/assets/icons/logo.svg" alt="DOLA">
    </a>
    <nav class="header__nav">
      <ul class="nav-list">
        <li><a href="/shop" class="nav-link">Shop</a></li>
        <li><a href="/new" class="nav-link">New</a></li>
        <li><a href="/collections" class="nav-link">Collections</a></li>
        <li><a href="/story" class="nav-link">Story</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      <button class="icon-button" aria-label="Search">
        <svg><!-- Search Icon --></svg>
      </button>
      <button class="icon-button cart-button" aria-label="Shopping Cart">
        <svg><!-- Cart Icon --></svg>
        <span class="cart-badge">2</span>
      </button>
    </div>
  </div>
</header>
```

#### CSS Classes
- `.header`: Main container
- `.header__container`: Inner wrapper with max-width
- `.header__logo`: Logo wrapper
- `.header__nav`: Navigation container
- `.header__actions`: Right-side actions
- `.cart-badge`: Cart item count indicator

#### JavaScript API
```javascript
// Initialize header
const header = new Header({
  sticky: true,
  hideOnScroll: false,
  mobileBreakpoint: 768
});
```

### 2. Button Component

#### Variants
```html
<!-- Primary Button -->
<button class="btn btn--primary">
  Shop Drop
</button>

<!-- Secondary Button -->
<button class="btn btn--secondary">
  Lookbook
</button>

<!-- Ghost Button -->
<button class="btn btn--ghost">
  Add to Cart
</button>

<!-- Icon Button -->
<button class="btn btn--icon" aria-label="Add to favorites">
  <svg><!-- Icon --></svg>
</button>
```

#### Properties
- **Size**: `small`, `medium`, `large`
- **Variant**: `primary`, `secondary`, `ghost`, `outline`
- **State**: `default`, `hover`, `active`, `disabled`, `loading`
- **Full Width**: Add `.btn--full` class

### 3. Product Card Component

#### Structure
```html
<article class="product-card">
  <div class="product-card__badge">NEW</div>
  <div class="product-card__image">
    <img src="/path/to/image.jpg" alt="Product Name">
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">DOLA Graphic Tee</h3>
    <p class="product-card__price">$40</p>
    <div class="product-card__colors">
      <button class="color-swatch color-swatch--active" 
              style="background-color: #FF3B4E"
              aria-label="Red">
      </button>
      <button class="color-swatch" 
              style="background-color: #000000"
              aria-label="Black">
      </button>
    </div>
    <button class="btn btn--ghost btn--full">
      Add to Cart
    </button>
  </div>
</article>
```

#### JavaScript API
```javascript
const productCard = new ProductCard({
  id: 'product-1',
  name: 'DOLA Graphic Tee',
  price: 40,
  colors: ['#FF3B4E', '#000000', '#00B4D8'],
  badge: 'NEW',
  onAddToCart: (product) => {
    cart.add(product);
  }
});
```

### 4. Hero Banner Component

#### Structure
```html
<section class="hero">
  <div class="hero__background">
    <!-- Abstract paint background -->
  </div>
  <div class="hero__content">
    <h1 class="hero__logo">
      D<span class="hero__logo-x">O</span>LA
    </h1>
    <p class="hero__tagline">
      Don't Overlook<br>
      Living Alone
    </p>
    <div class="hero__actions">
      <button class="btn btn--primary btn--large">Shop Drop</button>
      <button class="btn btn--secondary btn--large">Lookbook</button>
    </div>
  </div>
</section>
```

#### Customization
```css
.hero {
  --hero-height: 600px;
  --hero-bg-overlay: rgba(0, 0, 0, 0.2);
  --hero-text-align: center;
}
```

### 5. Newsletter Component

#### Structure
```html
<div class="newsletter">
  <h2 class="newsletter__title">Join Our Newsletter</h2>
  <p class="newsletter__subtitle">Subscribe to receive</p>
  <form class="newsletter__form">
    <input type="email" 
           class="newsletter__input" 
           placeholder="Email Address"
           required>
    <button type="submit" class="btn btn--primary">
      Subscribe
    </button>
  </form>
</div>
```

#### Validation
```javascript
const newsletter = new Newsletter({
  onSubmit: async (email) => {
    try {
      await api.subscribe(email);
      newsletter.showSuccess('Thanks for subscribing!');
    } catch (error) {
      newsletter.showError('Please try again');
    }
  }
});
```

### 6. Color Swatch Component

#### Structure
```html
<div class="color-swatches" role="radiogroup" aria-label="Select color">
  <label class="color-swatch-wrapper">
    <input type="radio" name="color" value="#FF3B4E" class="sr-only">
    <span class="color-swatch color-swatch--active" 
          style="background-color: #FF3B4E"
          aria-label="Red">
    </span>
  </label>
</div>
```

#### States
- **Default**: Border on hover
- **Active**: Checkmark icon overlay
- **Disabled**: Reduced opacity with slash

### 7. Badge Component

#### Variants
```html
<!-- Status Badge -->
<span class="badge badge--new">NEW</span>
<span class="badge badge--limited">LIMITED</span>
<span class="badge badge--sale">SALE</span>

<!-- Notification Badge -->
<span class="badge badge--notification">2</span>
```

### 8. Grid System

#### Product Grid
```html
<div class="product-grid">
  <div class="product-grid__item"><!-- Product Card --></div>
  <div class="product-grid__item"><!-- Product Card --></div>
  <div class="product-grid__item"><!-- Product Card --></div>
  <div class="product-grid__item"><!-- Product Card --></div>
</div>
```

#### Responsive Behavior
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 4 columns
- **Wide**: 4-6 columns with max-width

## Utility Classes

### Spacing
```css
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }
/* Same pattern for mb, ml, mr, mx, my, m */
```

### Display
```css
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }
```

### Text
```css
.text-center { text-align: center; }
.text-uppercase { text-transform: uppercase; }
.text-bold { font-weight: 700; }
```

## Component States

### Loading States
```html
<div class="product-card product-card--loading">
  <div class="skeleton skeleton--image"></div>
  <div class="skeleton skeleton--text"></div>
  <div class="skeleton skeleton--text skeleton--short"></div>
</div>
```

### Error States
```html
<div class="error-message">
  <svg class="error-icon"><!-- Error Icon --></svg>
  <p>Something went wrong. Please try again.</p>
  <button class="btn btn--secondary">Retry</button>
</div>
```

### Empty States
```html
<div class="empty-state">
  <svg class="empty-state__icon"><!-- Empty Icon --></svg>
  <h3 class="empty-state__title">No products found</h3>
  <p class="empty-state__text">Try adjusting your filters</p>
</div>
```

## Accessibility Guidelines

### ARIA Labels
- All interactive elements must have accessible names
- Use `aria-label` for icon-only buttons
- Use `aria-describedby` for additional context

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus order must be logical
- Custom components must manage focus appropriately

### Screen Reader Support
- Use semantic HTML elements
- Provide alternative text for images
- Announce dynamic content changes

## Performance Considerations

### Lazy Loading
```javascript
// Images
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     class="lazyload" 
     alt="Product">

// Components
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadComponent(entry.target);
    }
  });
});
```

### Code Splitting
```javascript
// Dynamic imports for heavy components
const loadProductGallery = () => {
  return import('./components/ProductGallery.js');
};
```