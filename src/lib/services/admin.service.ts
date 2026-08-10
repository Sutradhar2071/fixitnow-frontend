import apiClient from '@/lib/axios';
import { ApiResponse, User, Booking, Category } from '@/types';

export const getAllUsers = async (role?: string) => {
  const res = await apiClient.get<ApiResponse<User[]>>('/api/admin/users', {
    params: role ? { role } : undefined,
  });
  return res.data.data;
};

export const updateUserStatus = async (id: string, status: 'ACTIVE' | 'BANNED') => {
  const res = await apiClient.patch<ApiResponse<User>>(`/api/admin/users/${id}`, { status });
  return res.data.data;
};

export const getAllBookingsAdmin = async (status?: string) => {
  const res = await apiClient.get<ApiResponse<Booking[]>>('/api/admin/bookings', {
    params: status ? { status } : undefined,
  });
  return res.data.data;
};

export const getAllCategoriesAdmin = async () => {
  const res = await apiClient.get<ApiResponse<Category[]>>('/api/admin/categories');
  return res.data.data;
};

export const createCategoryAdmin = async (name: string) => {
  const res = await apiClient.post<ApiResponse<Category>>('/api/admin/categories', { name });
  return res.data.data;
};