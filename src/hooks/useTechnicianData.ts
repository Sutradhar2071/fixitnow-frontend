'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  getMyBookingsAsTechnician,
  updateBookingStatus,
  updateMyProfile,
  updateMyAvailability,
  getMyServices,
  createMyService,
  updateMyService,
  deleteMyService,
} from '@/lib/services/technician.service';

export const useTechnicianBookings = () => {
  return useQuery({
    queryKey: ['technician-bookings'],
    queryFn: getMyBookingsAsTechnician,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: 'ACCEPTED' | 'DECLINED' | 'IN_PROGRESS' | 'COMPLETED';
    }) => updateBookingStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(`Booking marked as ${variables.status.toLowerCase()}`);
      queryClient.invalidateQueries({ queryKey: ['technician-bookings'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Update failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['my-technician-profile'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Update failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useUpdateAvailability = () => {
  return useMutation({
    mutationFn: updateMyAvailability,
    onSuccess: () => {
      toast.success('Availability updated successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Update failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useMyServices = () => {
  return useQuery({
    queryKey: ['my-services'],
    queryFn: getMyServices,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMyService,
    onSuccess: () => {
      toast.success('Service created successfully');
      queryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Creation failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateMyService(id, data),
    onSuccess: () => {
      toast.success('Service updated successfully');
      queryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Update failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyService,
    onSuccess: () => {
      toast.success('Service deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Deletion failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};