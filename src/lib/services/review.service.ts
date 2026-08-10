import apiClient from '@/lib/axios';
import { ApiResponse, Review } from '@/types';

export const createReview = async (data: {
  bookingId: string;
  rating: number;
  comment?: string;
}) => {
  const res = await apiClient.post<ApiResponse<Review>>('/api/reviews', data);
  return res.data.data;
};