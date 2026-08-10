import apiClient from '@/lib/axios';
import { ApiResponse, Booking } from '@/types';

export const createBooking = async (data: {
  serviceId: string;
  scheduledAt: string;
  notes?: string;
}) => {
  const res = await apiClient.post<ApiResponse<Booking>>('/api/bookings', data);
  return res.data.data;
};

export const getMyBookings = async () => {
  const res = await apiClient.get<ApiResponse<Booking[]>>('/api/bookings');
  return res.data.data;
};

export const getBookingById = async (id: string) => {
  const res = await apiClient.get<ApiResponse<Booking>>(`/api/bookings/${id}`);
  return res.data.data;
};

export const cancelBooking = async (id: string) => {
  const res = await apiClient.patch<ApiResponse<Booking>>(`/api/bookings/${id}/cancel`);
  return res.data.data;
};
