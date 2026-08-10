'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { registerUser, loginUser } from '@/lib/services/auth.service';
import { setAuthToken } from '@/lib/utils/auth-helpers';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuthToken(data.token);
      Cookies.set('role', data.user.role, { expires: 7 });
      setUser(data.user);
      toast.success('Registration successful', {
        description: `Welcome, ${data.user.name}!`,
      });
      redirectByRole(data.user.role, router);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Registration failed', {
        description: error?.response?.data?.message || 'Something went wrong',
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthToken(data.token);
      Cookies.set('role', data.user.role, { expires: 7 });
      setUser(data.user);
      toast.success('Login successful', {
        description: `Welcome back, ${data.user.name}!`,
      });
      redirectByRole(data.user.role, router);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Login failed', {
        description: error?.response?.data?.message || 'Invalid credentials',
      });
    },
  });
};

function redirectByRole(role: string, router: ReturnType<typeof useRouter>) {
  if (role === 'CUSTOMER') router.push('/dashboard/customer');
  else if (role === 'TECHNICIAN') router.push('/dashboard/technician');
  else if (role === 'ADMIN') router.push('/dashboard/admin');
}