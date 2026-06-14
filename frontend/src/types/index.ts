export interface Petshop {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email?: string;
  latitude: number;
  longitude: number;
  opening_time?: string;
  closing_time?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  products?: Product[];
}

export interface Product {
  id: number;
  petshop_id: number;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  price: number;
  stock: number;
  is_available: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  petshop?: {
    id: number;
    name: string;
    phone: string;
    address: string;
    city: string;
  };
}

export interface PriceComparison {
  product_id: number;
  petshop_id: number;
  petshop_name: string;
  price: number;
  stock: number;
  is_available: boolean;
  phone: string;
  address: string;
  city: string;
}

export interface CompareResponse {
  product_name: string;
  product_category: string;
  product_brand?: string;
  comparison: PriceComparison[];
  price_range: {
    min: number;
    max: number;
    average: number;
    savings: number;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
}
