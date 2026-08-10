'use client';

import { useAdminUsers, useAdminBookings } from '@/hooks/useAdminData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const { data: users, isLoading: usersLoading } = useAdminUsers();
  const { data: bookings, isLoading: bookingsLoading } = useAdminBookings();

  const totalCustomers = users?.filter((u) => u.role === 'CUSTOMER').length || 0;
  const totalTechnicians = users?.filter((u) => u.role === 'TECHNICIAN').length || 0;
  const activeBookings =
    bookings?.filter((b) => !['COMPLETED', 'CANCELLED', 'DECLINED'].includes(b.status)).length ||
    0;
  const totalRevenue =
    bookings
      ?.filter((b) => b.payment?.status === 'COMPLETED')
      .reduce((sum, b) => sum + (b.payment?.amount || 0), 0) || 0;

  const isLoading = usersLoading || bookingsLoading;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
          <Link href="/dashboard/admin/bookings">
            <Button variant="outline">All Bookings</Button>
          </Link>
          <Link href="/dashboard/admin/categories">
            <Button>Categories</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {isLoading ? <Skeleton className="h-8 w-12" /> : totalCustomers}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Technicians</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {isLoading ? <Skeleton className="h-8 w-12" /> : totalTechnicians}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {isLoading ? <Skeleton className="h-8 w-12" /> : activeBookings}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Platform Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {isLoading ? <Skeleton className="h-8 w-16" /> : `৳${totalRevenue}`}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}