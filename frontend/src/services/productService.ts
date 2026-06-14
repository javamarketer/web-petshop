import apiClient from '@/lib/api';
import { Product, PaginatedResponse, FilterOptions } from '@/types';

export const productService = {
  /**
   * Get all products with pagination and filters
   */
  getAllProducts: async (
    page: number = 1,
    limit: number = 20,
    filters?: {
      search?: string;
      category?: string;
      brand?: string;
      petshop_id?: number;
    }
  ): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.category && { category: filters.category }),
      ...(filters?.brand && { brand: filters.brand }),
      ...(filters?.petshop_id && { petshop_id: filters.petshop_id.toString() }),
    });

    const response = await apiClient.get(`/products?${params}`);
    return response.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id: number): Promise<{ success: boolean; data: Product }> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  /**
   * Get filter options
   */
  getFilters: async (): Promise<{ success: boolean; data: FilterOptions }> => {
    const response = await apiClient.get('/products/filters');
    return response.data;
  },

  /**
   * Search products
   */
  searchProducts: async (
    search: string,
    page: number = 1,
    category?: string
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get('/products', {
      params: { search, page, ...(category && { category }) },
    });
    return response.data;
  },
};
