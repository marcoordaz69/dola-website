# DOLA Website Visual Specifications

## Overview
This document contains detailed visual specifications for the DOLA e-commerce website, including measurements, colors, typography, and spacing guidelines.

## Color Palette

### Primary Colors
- **Brand Red**: `#FF3B4E` - Used for DOLA logo and primary CTAs
- **Brand Teal**: `#00B4D8` - Secondary CTA color
- **Dark Background**: `#1A1A1A` - Main background color
- **White**: `#FFFFFF` - Text and contrast elements

### Secondary Colors
- **Orange**: `#FF6B35` - Product variants and accents
- **Yellow**: `#FFD23F` - Featured section highlights
- **Pink**: `#FF006E` - Hover states and accents
- **Light Blue**: `#0090C1` - Product color options
- **Gray 700**: `#2D2D2D` - Card backgrounds
- **Gray 500**: `#6B6B6B` - Secondary text
- **Gray 300**: `#A8A8A8` - Disabled states

## Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Bebas Neue', 'Impact', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Font Sizes
- **Hero Title (DOLA)**: `120px` (desktop) / `80px` (mobile)
- **Hero Tagline**: `48px` (desktop) / `32px` (mobile)
- **Section Headers**: `64px` (desktop) / `48px` (mobile)
- **Navigation**: `16px` (600 weight)
- **Product Title**: `18px` (500 weight)
- **Price**: `24px` (700 weight)
- **Body Text**: `16px` (400 weight)
- **Button Text**: `14px` (600 weight, uppercase)

## Spacing System

### Base Unit
8px grid system for consistent spacing

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- `4xl`: 96px

## Component Specifications

### Header
- **Height**: 80px
- **Background**: `#1A1A1A`
- **Logo Size**: 48px × 48px
- **Navigation Gap**: 32px between items
- **Cart Badge**: 20px × 20px circle
- **Padding**: 0 48px (desktop) / 0 24px (mobile)

### Hero Section
- **Height**: 600px (min-height)
- **Background**: Abstract gradient overlay on paint texture
- **Logo Spacing**: 120px from top
- **Button Dimensions**: 
  - Width: 200px
  - Height: 56px
  - Border Radius: 8px
  - Gap between buttons: 24px

### Product Cards
- **Card Dimensions**: 280px × 400px
- **Image Size**: 280px × 280px
- **Badge Size**: 80px × 32px
- **Color Swatches**: 24px × 24px circles
- **Swatch Spacing**: 8px gap
- **Card Padding**: 24px
- **Grid Gap**: 32px
- **Border Radius**: 12px

### Featured Section
- **Section Height**: 500px
- **Image Block Width**: 45% each
- **Gap Between Blocks**: 10%
- **Padding**: 96px vertical

### Footer
- **Height**: 320px
- **Newsletter Input**: 
  - Width: 400px
  - Height: 48px
  - Border Radius: 6px
- **Social Icons**: 32px × 32px
- **Icon Spacing**: 16px gap

## Breakpoints

```css
--breakpoint-mobile: 375px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

## Shadow System

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.25);
```

## Animation Timing

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
--transition-bounce: 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Hover States

### Buttons
- **Primary (Red)**: Lighten 10% + translate Y -2px
- **Secondary (Teal)**: Lighten 10% + translate Y -2px
- **Add to Cart**: Background color change + scale(1.05)

### Product Cards
- **Card Hover**: Translate Y -4px + shadow-lg
- **Image Hover**: Scale(1.05) with overflow hidden

### Navigation Links
- **Hover**: Underline + color change to brand red

## Accessibility

### Color Contrast Ratios
- White on Dark Background: 12.63:1 ✓
- White on Brand Red: 4.85:1 ✓
- White on Brand Teal: 3.52:1 (Use darker shade for text)
- Dark Text on White: 12.63:1 ✓

### Focus States
- **Outline**: 2px solid #00B4D8
- **Outline Offset**: 2px
- **Border Radius**: Inherit from element

### Touch Targets
- Minimum size: 44px × 44px
- Spacing between targets: minimum 8px