# 🎨 Component Creation Starter Pack

**Date:** June 14, 2026  
**Priority:** After Testing is Complete  
**Estimated Time:** 6-8 hours for all components

---

## 📋 Overview

This guide provides ready-to-use templates for creating the 5 essential missing components that will complete the MVP:

1. **SearchBar** - Global search component
2. **Map** - Interactive map with Leaflet
3. **ErrorBoundary** - Error handling wrapper
4. **LoadingSkeleton** - Better loading states
5. **Toast** - Notifications system

---

## 1️⃣ SearchBar Component

### Purpose
Global reusable search component for home page and other locations.

### File Location
`frontend/src/components/SearchBar.tsx`

### Complete Implementation

```typescript
'use client';

import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSubmit?: (query: string) => void;
  debounceMs?: number;
  showCategory?: boolean;
  categories?: Array<'petshops' | 'products' | 'all'>;
}

export function SearchBar({
  placeholder = 'Cari petshop atau produk...',
  onSearch,
  onSubmit,
  debounceMs = 300,
  showCategory = false,
  categories = ['all'],
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'petshops' | 'products' | 'all'>('all');
  const [isOpen, setIsOpen] = useState(false);

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSubmit) {
      onSubmit(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative flex items-center bg-white rounded-lg border-2 border-gray-300 focus-within:border-blue-500 transition">
            <Search className="absolute left-3 text-gray-400" size={20} />
            
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="w-full pl-10 pr-10 py-3 outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown (Optional) */}
          {isOpen && query.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-2">
                <p className="text-sm text-gray-600 px-3 py-2">
                  Pencarian: "{query}"
                </p>
                <p className="text-xs text-gray-400 px-3">
                  Tekan Enter untuk melanjutkan
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        {showCategory && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white font-semibold text-gray-700"
          >
            <option value="all">Semua</option>
            <option value="petshops">Petshops</option>
            <option value="products">Produk</option>
          </select>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 whitespace-nowrap"
        >
          <Search size={20} />
          Cari
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
```

### Usage Example

```typescript
// In Home page or any page
import { SearchBar } from '@/components/SearchBar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    // Real-time search (optional)
    console.log('Searching:', query);
  };

  const handleSubmit = (query: string) => {
    // Navigate to results
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <SearchBar
      placeholder="Cari petshop atau produk..."
      onSearch={handleSearch}
      onSubmit={handleSubmit}
      showCategory={true}
    />
  );
}
```

---

## 2️⃣ Map Component

### Purpose
Interactive map showing petshop locations using Leaflet.js

### Installation
```bash
npm install leaflet react-leaflet @types/leaflet
```

### File Location
`frontend/src/components/Map.tsx`

### Complete Implementation

```typescript
'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Petshop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  phone?: string;
}

interface MapProps {
  petshops: Petshop[];
  selectedId?: number;
  onMarkerClick?: (id: number) => void;
  zoom?: number;
  height?: string;
}

const DEFAULT_CENTER = [-7.7956, 110.3695]; // Yogyakarta center

export function Map({
  petshops,
  selectedId,
  onMarkerClick,
  zoom = 12,
  height = '400px',
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<Map<number, L.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current).setView(DEFAULT_CENTER, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [zoom]);

  // Add markers for petshops
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current.clear();

    // Add new markers
    petshops.forEach((petshop) => {
      const marker = L.marker([petshop.latitude, petshop.longitude])
        .bindPopup(`
          <div style="font-size: 14px; min-width: 200px;">
            <b>${petshop.name}</b><br/>
            ${petshop.address}<br/>
            <a href="tel:${petshop.phone}" style="color: blue;">${petshop.phone}</a>
          </div>
        `)
        .addTo(map.current!);

      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(petshop.id);
        }
      });

      markers.current.set(petshop.id, marker);
    });

    // Fit bounds if multiple markers
    if (petshops.length > 1 && map.current) {
      const group = new L.FeatureGroup(Array.from(markers.current.values()));
      map.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [petshops, onMarkerClick]);

  // Highlight selected marker
  useEffect(() => {
    if (!map.current || !selectedId) return;

    const selectedMarker = markers.current.get(selectedId);
    if (selectedMarker) {
      selectedMarker.openPopup();
      map.current.setView(selectedMarker.getLatLng(), zoom);
    }
  }, [selectedId, zoom]);

  return (
    <div
      ref={mapContainer}
      style={{ height }}
      className="rounded-lg border-2 border-gray-300 shadow-md"
    />
  );
}

export default Map;
```

### Usage Example

```typescript
import { Map } from '@/components/Map';
import { petshopService } from '@/services/petshopService';

export default function PetshopsMapPage() {
  const [petshops, setPetshops] = useState([]);

  useEffect(() => {
    petshopService.getAllPetshops(1, 100).then(res => {
      setPetshops(res.data);
    });
  }, []);

  return (
    <Map
      petshops={petshops}
      zoom={13}
      height="600px"
      onMarkerClick={(id) => {
        // Navigate to petshop detail
        router.push(`/petshops/${id}`);
      }}
    />
  );
}
```

---

## 3️⃣ ErrorBoundary Component

### Purpose
Catch React errors and display fallback UI

### File Location
`frontend/src/components/ErrorBoundary.tsx`

### Complete Implementation

```typescript
'use client';

import React, { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can also log the error to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle size={32} className="text-red-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Oops! Terjadi Kesalahan
              </h1>

              <p className="text-gray-600 text-center mb-6">
                Kami mengalami masalah teknis. Silakan coba lagi nanti.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded">
                  <p className="text-sm text-red-700 font-mono break-words">
                    {this.state.error?.message}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleReset}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Coba Lagi
                </button>

                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold transition"
                >
                  Kembali ke Beranda
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Error ID: {Date.now().toString(36)}
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Usage Example

```typescript
// In layout.tsx or root component
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          <Header />
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

## 4️⃣ LoadingSkeleton Component

### Purpose
Skeleton loading UI for better perceived performance

### File Location
`frontend/src/components/LoadingSkeleton.tsx`

### Complete Implementation

```typescript
'use client';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export function PetshopCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-12"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4 w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
}

// Export all skeletons
export const LoadingSkeletons = {
  ProductCard: ProductCardSkeleton,
  PetshopCard: PetshopCardSkeleton,
  TableRow: TableRowSkeleton,
  Header: HeaderSkeleton,
};
```

### Usage Example

```typescript
import { ProductCardSkeleton } from '@/components/LoadingSkeleton';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products...
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {loading ? (
        // Show skeletons while loading
        [1, 2, 3].map(i => <ProductCardSkeleton key={i} />)
      ) : (
        // Show products when loaded
        products.map(product => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
}
```

---

## 5️⃣ Toast Component

### Purpose
Show temporary notifications (success, error, warning, info)

### File Location
`frontend/src/components/Toast.tsx`

### Complete Implementation

```typescript
'use client';

import React, { useEffect } from 'react';
import { Check, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <Check className="text-green-600" size={20} />,
      title: 'Berhasil',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <AlertCircle className="text-red-600" size={20} />,
      title: 'Kesalahan',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: <AlertTriangle className="text-yellow-600" size={20} />,
      title: 'Peringatan',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Info className="text-blue-600" size={20} />,
      title: 'Informasi',
    },
  };

  const current = config[type];

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md ${current.bg} border ${current.border} rounded-lg shadow-lg p-4 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2`}
    >
      {current.icon}
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{current.title}</p>
        <p className="text-sm text-gray-700 mt-1">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
```

### Toast Manager Hook

```typescript
// frontend/src/hooks/useToast.ts
import { useState, useCallback } from 'react';
import { ToastType } from '@/components/Toast';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((message: string) => show(message, 'success'), [show]);
  const error = useCallback((message: string) => show(message, 'error'), [show]);
  const warning = useCallback((message: string) => show(message, 'warning'), [show]);
  const info = useCallback((message: string) => show(message, 'info'), [show]);

  return { toasts, show, remove, success, error, warning, info };
}
```

### Usage Example

```typescript
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/Toast';

export default function MyPage() {
  const { toasts, remove, success, error } = useToast();

  const handleSave = async () => {
    try {
      // Do something...
      success('Berhasil disimpan!');
    } catch (err) {
      error('Gagal menyimpan!');
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Simpan</button>
      
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => remove(toast.id)}
        />
      ))}
    </div>
  );
}
```

---

## 🚀 Implementation Order

1. **SearchBar** (30 min) - Easiest, most reusable
2. **LoadingSkeleton** (30 min) - Easy, improves UX
3. **Toast** (30 min) - Easy, useful notifications
4. **ErrorBoundary** (30 min) - Easy, important for stability
5. **Map** (2 hours) - Most complex, requires Leaflet

---

## ✅ Testing Each Component

### SearchBar Tests
- [ ] Input accepts text
- [ ] Debounce works (waits 300ms)
- [ ] Clear button works
- [ ] Submit button works
- [ ] Category filter works

### Map Tests
- [ ] Map displays
- [ ] Markers show for all petshops
- [ ] Popup shows on click
- [ ] Fit bounds works
- [ ] Mobile responsive

### ErrorBoundary Tests
- [ ] Catches errors
- [ ] Shows fallback UI
- [ ] Reset button works
- [ ] Error logged to console

### LoadingSkeleton Tests
- [ ] Displays correctly
- [ ] Animation smooth
- [ ] Correct dimensions
- [ ] Matches component size

### Toast Tests
- [ ] Shows message
- [ ] Auto-closes after duration
- [ ] Close button works
- [ ] Different types (4)
- [ ] Stacks properly

---

## 🎓 Tips for Success

1. **Start Simple** - SearchBar has least dependencies
2. **Test as You Go** - Don't create all 5 at once
3. **Reuse Patterns** - Look at existing components
4. **TypeScript Help** - Use types to catch errors
5. **Mobile First** - Test on mobile while building
6. **Performance** - Use React.memo for expensive components

---

## 📚 Reference

- React Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind: https://tailwindcss.com/docs
- Leaflet: https://leafletjs.com/reference.html
- Lucide Icons: https://lucide.dev

---

**Ready to create components? Start with SearchBar! 🚀**

**Time to Build:** 4-6 hours total for all 5 components

---

**Created:** June 14, 2026  
**Status:** Ready for Implementation
