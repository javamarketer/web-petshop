import apiClient from '@/lib/api';
import { Petshop, PaginatedResponse } from '@/types';

export const petshopService = {
  /**
   * Get all petshops with pagination
   */
  getAllPetshops: async (
    page: number = 1,
    limit: number = 10,
    filters?: { city?: string; search?: string }
  ): Promise<PaginatedResponse<Petshop>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.city && { city: filters.city }),
      ...(filters?.search && { search: filters.search }),
    });

    const response = await apiClient.get(`/petshops?${params}`);
    return response.data;
  },

  /**
   * Get petshop by ID with products
   */
  getPetshopById: async (id: number): Promise<{ success: boolean; data: Petshop }> => {
    const response = await apiClient.get(`/petshops/${id}`);
    return response.data;
  },

  /**
   * Search petshops
   */
  searchPetshops: async (
    search: string,
    page: number = 1
  ): Promise<PaginatedResponse<Petshop>> => {
    const response = await apiClient.get('/petshops', {
      params: { search, page },
    });
    return response.data;
  },
};
