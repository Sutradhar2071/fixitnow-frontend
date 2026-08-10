'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getServices,
  getTechnicians,
  getTechnicianById,
  getCategories,
} from '@/lib/services/public.service';

export const useServices = (filters?: {
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useQuery({
    queryKey: ['services', filters],
    queryFn: () => getServices(filters),
  });
};

export const useTechnicians = (filters?: {
  location?: string;
  minRating?: number;
  skill?: string;
}) => {
  return useQuery({
    queryKey: ['technicians', filters],
    queryFn: () => getTechnicians(filters),
  });
};

export const useTechnicianById = (id: string) => {
  return useQuery({
    queryKey: ['technician', id],
    queryFn: () => getTechnicianById(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};