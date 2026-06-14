import apiClient from '@/lib/api';
import { CompareResponse } from '@/types';

export const compareService = {
  /**
   * Compare product prices across petshops
   */
  compareProductPrice: async (
    productName: string
  ): Promise<{ success: boolean; data: CompareResponse }> => {
    const response = await apiClient.get('/compare', {
      params: { product_name: productName },
    });
    return response.data;
  },

  /**
   * Compare product by ID
   */
  compareProductById: async (
    productId: number
  ): Promise<{ success: boolean; data: CompareResponse }> => {
    const response = await apiClient.get('/compare', {
      params: { product_id: productId },
    });
    return response.data;
  },

  /**
   * Get top cheapest products
   */
  getTopCheapestProducts: async (limit: number = 10): Promise<{
    success: boolean;
    data: any[];
  }> => {
    const response = await apiClient.get('/compare/top/cheapest', {
      params: { limit },
    });
    return response.data;
  },
};
