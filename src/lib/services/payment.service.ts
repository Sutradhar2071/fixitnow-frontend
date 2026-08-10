import apiClient from '@/lib/axios';
import { ApiResponse, Payment } from '@/types';

interface CreatePaymentResponse {
  checkoutUrl: string;
  payment: Payment;
}

export const createPaymentSession = async (bookingId: string) => {
  const res = await apiClient.post<ApiResponse<CreatePaymentResponse>>('/api/payments/create', {
    bookingId,
  });
  return res.data.data;
};

export const confirmPayment = async (sessionId: string) => {
  const res = await apiClient.get<ApiResponse<{ status: string }>>('/api/payments/confirm', {
    params: { session_id: sessionId },
  });
  return res.data.data;
};

export const getMyPayments = async () => {
  const res = await apiClient.get<ApiResponse<Payment[]>>('/api/payments');
  return res.data.data;
};