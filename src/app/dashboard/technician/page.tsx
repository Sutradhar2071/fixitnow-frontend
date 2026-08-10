'use client';

import { useTechnicianBookings } from '@/hooks/useTechnicianData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { format } from 'date-fns';

export default function TechnicianDashboardPage() {
  const { data: bookings, isLoading } = useTechnicianBookings();

  const pendingCount = bookings?.filter((b) => b.status === 'REQUESTED').length || 0;
  const activeCount =
    bookings?.filter((b) => ['ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status)).length || 0;
  const completedCount = bookings?.filter((b) => b.status === 'COMPLETED').length || 0;
  const totalEarnings =
    bookings
      ?.filter((b) => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + (b.service?.price || 0), 0) || 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Technician Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/technician/profile">
            <Button variant="outline">Manage Profile</Button>
          </Link>
          <Link href="/dashboard/technician/bookings">
            <Button>View All Bookings</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{pendingCount}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{activeCount}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{completedCount}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">৳{totalEarnings}</CardContent>
        </Card>
      </div>

      {/* Recent bookings preview */}
      <h2 className="mb-4 text-xl font-bold">Recent Requests</h2>
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : bookings?.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings?.slice(0, 5).map((booking) => (
            <Card key={booking.id}>
              <CardContent className="flex items-center justify-between pt-4">
                <div>
                  <p className="font-medium">{booking.service?.title}</p>
                  <p className="text-sm text-gray-500">
                    {booking.customer?.name} · {format(new Date(booking.scheduledAt), 'PPP p')}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
