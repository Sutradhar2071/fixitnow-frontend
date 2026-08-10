'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from '@/lib/services/booking.service';
import { AxiosError } from 'axios';

export const useMyBookings = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: getMyBookings,
  });
};

export const useBookingById = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success('Booking requested successfully');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Booking failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      toast.success('Booking cancelled');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Cancel failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};
