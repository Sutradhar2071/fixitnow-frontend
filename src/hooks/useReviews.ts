'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { createReview } from '@/lib/services/review.service';

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success('Review submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Review submission failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};