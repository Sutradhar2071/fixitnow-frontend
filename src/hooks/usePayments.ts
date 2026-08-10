'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { createPaymentSession, confirmPayment, getMyPayments } from '@/lib/services/payment.service';

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPaymentSession,
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Payment initiation failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['my-payments'] });
    },
  });
};

export const useMyPayments = () => {
  return useQuery({
    queryKey: ['my-payments'],
    queryFn: getMyPayments,
  });
};