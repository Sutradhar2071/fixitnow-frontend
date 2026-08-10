'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  getAllUsers,
  updateUserStatus,
  getAllBookingsAdmin,
  getAllCategoriesAdmin,
  createCategoryAdmin,
} from '@/lib/services/admin.service';

export const useAdminUsers = (role?: string) => {
  return useQuery({
    queryKey: ['admin-users', role],
    queryFn: () => getAllUsers(role),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACTIVE' | 'BANNED' }) =>
      updateUserStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(`User ${variables.status === 'BANNED' ? 'banned' : 'unbanned'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Update failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useAdminBookings = (status?: string) => {
  return useQuery({
    queryKey: ['admin-bookings', status],
    queryFn: () => getAllBookingsAdmin(status),
  });
};

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['admin-categories'],
    queryFn: getAllCategoriesAdmin,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryAdmin,
    onSuccess: () => {
      toast.success('Category created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Creation failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};