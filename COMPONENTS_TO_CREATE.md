# 🎨 Components and Features to Create

**Date:** June 14, 2026  
**Priority:** Medium - Enhancement Features  
**Effort Estimate:** 2-3 days

---

## 📋 Overview

This document lists components and features that enhance the MVP but aren't critical for v1.0 launch.

---

## 🎯 Priority Components

### Priority 1: Essential (Do First)

#### 1. SearchBar Component
**Status:** Not created yet  
**Location:** `frontend/src/components/SearchBar.tsx`  
**Purpose:** Global search component used on home page

**Specifications:**
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSubmit?: (query: string) => void;
  debounceMs?: number;
  categories?: Array<'petshops' | 'products' | 'all'>;
}

// Usage:
// <SearchBar 
//   placeholder="Cari petshop atau produk..."
//   onSearch={handleSearch}
//   categories={['all']}
// />
```

**Features:**
- Text input with clear button
- Debounced search callback
- Form submission on Enter
- Autocomplete suggestions (optional)
- Loading state
- Error state

#### 2. ErrorBoundary Component
**Status:** Not created yet  
**Location:** `frontend/src/components/ErrorBoundary.tsx`  
**Purpose:** Catch and display React errors gracefully

**Implementation:**
```typescript
export class ErrorBoundary extends React.Component {
  // Catch errors from child components
  // Display error UI instead of blank page
  // Log errors for debugging
}

// Usage:
// <ErrorBoundary>
//   <ProductsPage />
// </ErrorBoundary>
```

#### 3. LoadingSkeletons
**Status:** LoadingSpinner exists, need skeleton variations  
**Location:** `frontend/src/components/LoadingSkeleton.tsx`  
**Purpose:** Better UX with skeleton loading

**Components to create:**
- `ProductCardSkeleton` - Skeleton of product card
- `PetshopCardSkeleton` - Skeleton of petshop card
- `TableRowSkeleton` - For comparison table
- `HeaderSkeleton` - For page header

**Usage:**
```typescript
// Show skeletons while loading
{loading ? (
  <div className="grid grid-cols-3 gap-6">
    {[1,2,3].map(i => <ProductCardSkeleton key={i} />)}
  </div>
) : (
  // Show products
)}
```

---

### Priority 2: Important (Do Second)

#### 4. Map Component
**Status:** Not created yet  
**Location:** `frontend/src/components/Map.tsx`  
**Purpose:** Display petshop locations on interactive map

**Specifications:**
```typescript
interface MapProps {
  petshops: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    city: string;
  }>;
  selectedId?: number;
  onMarkerClick?: (id: number) => void;
  zoom?: number;
}

// Usage:
// <Map 
//   petshops={allPetshops}
//   onMarkerClick={goToPetshopDetail}
//   zoom={12}
// />
```

**Implementation:**
- Use Leaflet.js with react-leaflet
- Display markers for each petshop
- Popup on marker click
- Center map on selected petshop
- Responsive size

**Installation:**
```bash
npm install leaflet react-leaflet @types/leaflet
```

#### 5. FilterPanel Component
**Status:** Partially in Products page, extract to component  
**Location:** `frontend/src/components/FilterPanel.tsx`  
**Purpose:** Reusable filter sidebar

**Specifications:**
```typescript
interface FilterPanelProps {
  categories: string[];
  brands: string[];
  selectedCategory?: string | null;
  selectedBrand?: string | null;
  searchQuery: string;
  onCategoryChange: (category: string | null) => void;
  onBrandChange: (brand: string | null) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

// Usage:
// <FilterPanel
//   categories={filterOptions.categories}
//   brands={filterOptions.brands}
//   onCategoryChange={setCategory}
//   onReset={handleReset}
// />
```

#### 6. NotificationToast Component
**Status:** Not created yet  
**Location:** `frontend/src/components/Toast.tsx`  
**Purpose:** Show temporary notifications

**Implementation:**
```typescript
// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number; // ms
  onClose: () => void;
}

// Usage:
// <Toast 
//   message="Disalin ke clipboard!"
//   type="success"
//   duration={3000}
// />
```

---

### Priority 3: Nice to Have (Do Later)

#### 7. Image Gallery Component
**Status:** Not created yet  
**Location:** `frontend/src/components/ImageGallery.tsx`  
**Purpose:** Product image carousel/gallery

#### 8. ReviewRating Component
**Status:** Not created yet  
**Location:** `frontend/src/components/ReviewRating.tsx`  
**Purpose:** Display and submit reviews (future feature)

#### 9. WhatsAppButton Component
**Status:** Inline in pages, extract to component  
**Location:** `frontend/src/components/WhatsAppButton.tsx`  
**Purpose:** Reusable WhatsApp CTA button

#### 10. PriceComparisonTable Component
**Status:** Inline in Compare page, extract to component  
**Location:** `frontend/src/components/PriceComparisonTable.tsx`  
**Purpose:** Reusable comparison table

---

## 🔧 Feature Enhancements

### Frontend Features to Add

#### 1. Search Autocomplete
**Where:** Home page search bar  
**How:** Query `/api/v1/products/autocomplete` endpoint
**UI:** Dropdown with suggestions

#### 2. Recent Searches
**Where:** Home page search bar  
**How:** Store in localStorage
**UI:** Show recent searches in dropdown

#### 3. Favorites/Wishlist
**Where:** Product cards  
**How:** Store in localStorage (no backend yet)
**UI:** Heart icon, toggle on click

#### 4. Compare Multiple Products
**Where:** Compare page  
**How:** Add multiple products to compare
**UI:** Add/remove product buttons

#### 5. Filter History
**Where:** Products page  
**How:** Remember last used filters
**UI:** "View last filters" button

#### 6. Breadcrumb Navigation
**Where:** All detail pages  
**How:** Use Next.js router to track path
**UI:** Clickable breadcrumb

#### 7. Share Buttons
**Where:** Product detail, Petshop detail  
**How:** Share to WhatsApp, Facebook, Twitter
**UI:** Share icon with options

#### 8. Print Comparison
**Where:** Compare page  
**How:** Use print.css for printing
**UI:** Print button

---

## 📱 Mobile-First Enhancements

#### 1. Bottom Navigation Bar
```typescript
// Mobile-only navbar at bottom
// Navigation: Home, Browse, Compare, Menu

interface BottomNavProps {
  activeRoute: string;
}

export function BottomNav({ activeRoute }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      {/* Mobile nav */}
    </div>
  );
}
```

#### 2. Drawer Menu
```typescript
// Hamburger menu for mobile navigation
// Slide from left, overlay
```

#### 3. Touch-friendly Buttons
```typescript
// Larger touch targets
// Min 44px x 44px for buttons
```

---

## 🔄 Backend Features to Add

### API Endpoints (Future)

#### 1. Autocomplete Endpoint
```
GET /api/v1/products/autocomplete?q=royal
GET /api/v1/petshops/autocomplete?q=pet
```

#### 2. Trending Products
```
GET /api/v1/products/trending
```

#### 3. Popular Petshops
```
GET /api/v1/petshops/popular
```

#### 4. Distance-based Search
```
GET /api/v1/petshops/nearby?lat=-7.7956&lng=110.3695&radius=5
```

#### 5. Favorites Endpoint (with auth)
```
GET /api/v1/favorites
POST /api/v1/favorites
DELETE /api/v1/favorites/:productId
```

---

## 🎨 UI/UX Enhancements

### 1. Dark Mode
**Implementation:**
```typescript
// Add theme provider
// Use tailwindcss dark: prefix
// Store theme preference in localStorage
```

### 2. Improved Typography
```typescript
// Better font sizes for hierarchy
// Improved line heights
// Better spacing
```

### 3. Better Loading States
```typescript
// Skeleton screens for all components
// Progress bars for long operations
// Animated spinners
```

### 4. Better Empty States
```typescript
// Custom illustrations for empty states
// Helpful messages
// CTA buttons
```

### 5. Better Error States
```typescript
// Error boundaries
// Error messages with recovery actions
// Error logging
```

---

## 📊 Admin Dashboard (Future)

**Location:** `frontend/src/app/admin/`

**Features:**
- Petshop management
- Product management
- Analytics/Statistics
- Settings

---

## 🧪 Testing Components

### Unit Tests
```typescript
// Components/hooks to test:
- PetshopCard
- ProductCard
- Pagination
- SearchBar
- FilterPanel
```

### Integration Tests
```typescript
// Full page flows:
- Search and navigate to product
- Filter products and paginate
- Compare prices across petshops
- Navigate between all pages
```

### E2E Tests (Cypress)
```typescript
// User journeys:
- New user browsing petshops
- Search for specific product
- Find cheapest option
- Contact petshop via WhatsApp
```

---

## 📚 Documentation Files

### Files to Create:
1. `COMPONENT_LIBRARY.md` - Component documentation & props
2. `API_INTEGRATION_GUIDE.md` - How to integrate with backend
3. `STYLING_GUIDE.md` - Design system, colors, spacing
4. `DEPLOYMENT_GUIDE.md` - How to deploy to production

---

## ⚡ Performance Optimizations

### 1. Image Optimization
```typescript
// Use Next.js Image component
// Lazy loading
// WebP format with fallback
// Responsive images
```

### 2. Code Splitting
```typescript
// Already handled by Next.js
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'));
```

### 3. Caching Strategies
```typescript
// API response caching with SWR
// Browser caching headers
// Redis caching on backend
```

### 4. Database Optimization
```typescript
// Add more indexes
// Optimize queries
// Connection pooling
```

---

## 🛣️ Implementation Roadmap

### Week 1 - Critical Components
- [ ] SearchBar component
- [ ] ErrorBoundary component
- [ ] LoadingSkeleton components
- [ ] Toast notifications
- [ ] Fix any bugs found during testing

### Week 2 - Enhancement Components
- [ ] Map component (Leaflet)
- [ ] FilterPanel component extraction
- [ ] WhatsAppButton component
- [ ] PriceComparisonTable component
- [ ] Image Gallery component

### Week 3 - Mobile & UX
- [ ] Bottom navigation for mobile
- [ ] Drawer menu
- [ ] Dark mode
- [ ] Improved empty states
- [ ] Loading skeletons

### Week 4 - Testing & Optimization
- [ ] Unit tests for components
- [ ] Integration tests
- [ ] E2E tests with Cypress
- [ ] Performance optimization
- [ ] Security audit

### Week 5 - Documentation & Deployment
- [ ] Component documentation
- [ ] API integration guide
- [ ] Deployment guide
- [ ] CI/CD setup
- [ ] Production deployment

---

## 📝 Creation Template

When creating components, follow this template:

```typescript
// frontend/src/components/[ComponentName].tsx

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface [ComponentName]Props {
  // Define props
}

/**
 * [ComponentName] - Brief description
 * 
 * @example
 * <[ComponentName] prop1="value" />
 */
export function [ComponentName]({
  // Destructure props
}: [ComponentName]Props) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}

// Export for convenience
export default [ComponentName];
```

---

## 🔗 References

### Helpful Libraries
- **UI Components:** Headless UI, Radix UI
- **Forms:** React Hook Form, Zod
- **Tables:** TanStack Table (React Table)
- **Maps:** Leaflet, react-leaflet
- **Notifications:** React Hot Toast, Sonner
- **Testing:** Jest, React Testing Library, Cypress

### Documentation
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet.js](https://leafletjs.com)

---

**Created:** June 14, 2026  
**Status:** Ready for Implementation 🚀
