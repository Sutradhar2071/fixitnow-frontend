import apiClient from '@/lib/axios';
import { ApiResponse, Booking, TechnicianProfile, Availability, Service } from '@/types';

export const getMyBookingsAsTechnician = async () => {
  const res = await apiClient.get<ApiResponse<Booking[]>>('/api/technician/bookings');
  return res.data.data;
};

export const updateBookingStatus = async (
  id: string,
  status: 'ACCEPTED' | 'DECLINED' | 'IN_PROGRESS' | 'COMPLETED'
) => {
  const res = await apiClient.patch<ApiResponse<Booking>>(`/api/technician/bookings/${id}`, {
    status,
  });
  return res.data.data;
};

export const updateMyProfile = async (data: {
  bio?: string;
  skills?: string[];
  experience?: number;
  location?: string;
}) => {
  const res = await apiClient.put<ApiResponse<TechnicianProfile>>('/api/technicians/profile', data);
  return res.data.data;
};

export const updateMyAvailability = async (
  slots: { dayOfWeek: number; startTime: string; endTime: string }[]
) => {
  const res = await apiClient.put<ApiResponse<Availability[]>>('/api/technicians/availability', {
    slots,
  });
  return res.data.data;
};

export const getMyServices = async () => {
  const res = await apiClient.get<ApiResponse<Service[]>>('/api/services/my/list');
  return res.data.data;
};

export const createMyService = async (data: {
  title: string;
  description?: string;
  price: number;
  categoryId: string;
}) => {
  const res = await apiClient.post<ApiResponse<Service>>('/api/services', data);
  return res.data.data;
};

export const updateMyService = async (
  id: string,
  data: Partial<{ title: string; description: string; price: number; categoryId: string }>
) => {
  const res = await apiClient.put<ApiResponse<Service>>(`/api/services/${id}`, data);
  return res.data.data;
};

export const deleteMyService = async (id: string) => {
  const res = await apiClient.delete<ApiResponse<null>>(`/api/services/${id}`);
  return res.data.data;
};
