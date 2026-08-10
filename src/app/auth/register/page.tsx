'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema, RegisterFormValues } from '@/lib/validations/auth.schema';
// import { useRegister } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRegister } from '@/hooks/useAuth';
import { RegisterFormValues, registerSchema } from '@/lib/validations/auth.schema';
// import { useRegister } from '@/src/hooks/useAuth';
// import { RegisterFormValues, registerSchema } from '@/src/lib/validations/auth.schema';

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();
  const {
    register: formRegister,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch('role');

  const onSubmit = (data: RegisterFormValues) => {
    register(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-gray-500">Join FixItNow today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...formRegister('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...formRegister('email')} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" placeholder="01xxxxxxxxx" {...formRegister('phone')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...formRegister('password')} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>I want to join as</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue('role', 'CUSTOMER')}
                className={`rounded-md border p-3 text-sm font-medium ${
                  selectedRole === 'CUSTOMER' ? 'border-black bg-black text-white' : 'border-gray-200'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setValue('role', 'TECHNICIAN')}
                className={`rounded-md border p-3 text-sm font-medium ${
                  selectedRole === 'TECHNICIAN' ? 'border-black bg-black text-white' : 'border-gray-200'
                }`}
              >
                Technician
              </button>
            </div>
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-black underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}