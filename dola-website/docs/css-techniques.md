# CSS Techniques and Patterns

## Overview
This document outlines the advanced CSS techniques and patterns used in the DOLA website implementation.

## 1. CSS Architecture

### Methodology: BEM + Utility Classes
```css
/* Block */
.product-card { }

/* Element */
.product-card__title { }
.product-card__image { }

/* Modifier */
.product-card--featured { }
.product-card--loading { }

/* Utility */
.text-center { }
.mt-4 { }
```

### File Organization
```
styles/
├── main.css           # Main entry point
├── base/
│   ├── reset.css     # CSS reset
│   ├── variables.css # CSS custom properties
│   └── typography.css # Font definitions
├── components/
│   ├── buttons.css
│   ├── cards.css
│   └── forms.css
├── layout/
│   ├── grid.css
│   └── containers.css
└── utilities/
    ├── spacing.css
    └── helpers.css
```

## 2. CSS Custom Properties (Variables)

### Theme Variables
```css
:root {
  /* Colors */
  --color-primary: #FF3B4E;
  --color-secondary: #00B4D8;
  --color-dark: #1A1A1A;
  --color-white: #FFFFFF;
  
  /* Spacing */
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 0.5);
  --space-sm: var(--space-unit);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 3);
  
  /* Typography */
  --font-base: 16px;
  --font-scale: 1.25;
  --font-size-sm: calc(var(--font-base) / var(--font-scale));
  --font-size-lg: calc(var(--font-base) * var(--font-scale));
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  /* Transitions */
  --transition-base: 250ms ease-in-out;
  --transition-bounce: 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Dark Mode Support
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-dark);
    --color-text: var(--color-white);
  }
}
```

## 3. Abstract Paint Background Technique

### CSS-Only Approach
```css
.hero__background {
  position: relative;
  overflow: hidden;
  background: var(--color-dark);
}

.hero__background::before,
.hero__background::after {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
}

.hero__background::before {
  background: 
    radial-gradient(circle at 20% 50%, #FF3B4E 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, #00B4D8 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, #FF6B35 0%, transparent 50%),
    radial-gradient(circle at 90% 10%, #FFD23F 0%, transparent 60%);
  filter: blur(60px);
  transform: rotate(-5deg);
  opacity: 0.7;
}

.hero__background::after {
  background: 
    linear-gradient(45deg, #FF006E 0%, transparent 40%),
    linear-gradient(-45deg, #0090C1 0%, transparent 40%);
  filter: blur(40px);
  mix-blend-mode: screen;
  opacity: 0.5;
}
```

### SVG Filter Approach
```css
.paint-effect {
  filter: url(#paint-filter);
}
```

```svg
<svg style="display: none;">
  <defs>
    <filter id="paint-filter">
      <feTurbulence baseFrequency="0.02" numOctaves="3" />
      <feColorMatrix values="0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 1 0"/>
      <feComponentTransfer>
        <feFuncA type="discrete" tableValues="0 1 1 1 1 1 1 1"/>
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
  </defs>
</svg>
```

## 4. Advanced Grid Layouts

### Product Grid with Auto-fit
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  align-items: start;
}

/* Responsive without media queries */
.product-grid {
  --min-column-width: 280px;
  display: grid;
  grid-template-columns: repeat(
    auto-fit, 
    minmax(min(100%, var(--min-column-width)), 1fr)
  );
}
```

### CSS Grid Areas for Layout
```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "hero hero hero"
    "products products products"
    "featured featured featured"
    "footer footer footer";
  grid-template-columns: 1fr minmax(0, 1440px) 1fr;
}

.header { grid-area: header; }
.hero { grid-area: hero; }
/* etc... */
```

## 5. Animation Techniques

### Smooth Hover Transitions
```css
.product-card {
  transition: transform var(--transition-base),
              box-shadow var(--transition-base);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
```

### Loading Skeleton Animation
```css
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #2D2D2D 0px,
    #3D3D3D 40px,
    #2D2D2D 80px
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}
```

### Bounce Effect for CTAs
```css
@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.btn--animate {
  animation: bounce-in 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## 6. Responsive Design Patterns

### Container Queries (Modern Approach)
```css
@container (min-width: 400px) {
  .product-card {
    grid-template-columns: 1fr 2fr;
  }
}

.product-grid {
  container-type: inline-size;
}
```

### Fluid Typography
```css
:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1440;
  --fluid-min-size: 16;
  --fluid-max-size: 24;
  
  --fluid-font: calc(
    (var(--fluid-min-size) * 1px) + 
    (var(--fluid-max-size) - var(--fluid-min-size)) * 
    ((100vw - (var(--fluid-min-width) * 1px)) / 
    (var(--fluid-max-width) - var(--fluid-min-width)))
  );
}

.hero__title {
  font-size: clamp(3rem, var(--fluid-font), 7.5rem);
}
```

## 7. Performance Optimization

### Critical CSS
```css
/* Inline in <head> */
:root {
  --color-primary: #FF3B4E;
  --color-dark: #1A1A1A;
}

.header {
  height: 80px;
  background: var(--color-dark);
}

/* Prevents layout shift */
.hero {
  min-height: 600px;
}
```

### CSS Containment
```css
.product-card {
  contain: layout style;
}

.product-grid {
  contain: layout;
}
```

### Will-change for Animations
```css
.product-card {
  will-change: transform;
}

.product-card:hover {
  will-change: auto;
}
```

## 8. Accessibility Patterns

### Focus Visible
```css
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --color-primary: #FF0000;
    --color-secondary: #0080FF;
  }
  
  .btn {
    border: 2px solid currentColor;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 9. Modern CSS Features

### Aspect Ratio
```css
.product-card__image {
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
```

### Logical Properties
```css
.product-card {
  padding-inline: var(--space-md);
  padding-block: var(--space-lg);
  margin-block-end: var(--space-md);
}
```

### CSS Nesting (Where Supported)
```css
.product-card {
  background: var(--color-dark);
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &__title {
    font-size: 1.125rem;
  }
  
  &--featured {
    border: 2px solid var(--color-primary);
  }
}
```

### Cascade Layers
```css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer components {
  .btn { /* button styles */ }
}

@layer utilities {
  .text-center { text-align: center; }
}
```

## 10. Cross-Browser Compatibility

### Vendor Prefixes (via PostCSS)
```css
.hero__background {
  background: linear-gradient(45deg, #FF3B4E, #00B4D8);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
```

### Feature Detection
```css
@supports (backdrop-filter: blur(10px)) {
  .overlay {
    backdrop-filter: blur(10px);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}
```

### Fallbacks
```css
.product-grid {
  /* Fallback */
  display: flex;
  flex-wrap: wrap;
  
  /* Modern */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```