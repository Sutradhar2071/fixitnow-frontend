import apiClient from '@/lib/axios';
import { ApiResponse, Service, TechnicianProfile, Category } from '@/types';

export const getServices = async (filters?: {
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const res = await apiClient.get<ApiResponse<Service[]>>('/api/services', { params: filters });
  return res.data.data;
};

export const getTechnicians = async (filters?: {
  location?: string;
  minRating?: number;
  skill?: string;
}) => {
  const res = await apiClient.get<ApiResponse<TechnicianProfile[]>>('/api/technicians', {
    params: filters,
  });
  return res.data.data;
};

export const getTechnicianById = async (id: string) => {
  const res = await apiClient.get<ApiResponse<TechnicianProfile>>(`/api/technicians/${id}`);
  return res.data.data;
};

export const getCategories = async () => {
  const res = await apiClient.get<ApiResponse<Category[]>>('/api/categories');
  return res.data.data;
};