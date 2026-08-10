'use client';

import { useTechnicianBookings, useUpdateBookingStatus } from '@/hooks/useTechnicianData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Booking } from '@/types';

function ActionButtons({ booking }: { booking: Booking }) {
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus();

  if (booking.status === 'REQUESTED') {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => updateStatus({ id: booking.id, status: 'ACCEPTED' })}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={isPending}
          onClick={() => updateStatus({ id: booking.id, status: 'DECLINED' })}
        >
          Decline
        </Button>
      </div>
    );
  }

  if (booking.status === 'PAID') {
    return (
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => updateStatus({ id: booking.id, status: 'IN_PROGRESS' })}
      >
        Start Job
      </Button>
    );
  }

  if (booking.status === 'IN_PROGRESS') {
    return (
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => updateStatus({ id: booking.id, status: 'COMPLETED' })}
      >
        Mark Completed
      </Button>
    );
  }

  if (booking.status === 'ACCEPTED') {
    return <p className="text-sm text-gray-400">Waiting for customer payment</p>;
  }

  return <p className="text-sm text-gray-400">—</p>;
}

export default function TechnicianBookingsPage() {
  const { data: bookings, isLoading } = useTechnicianBookings();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Manage Bookings</h1>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : bookings?.length === 0 ? (
        <p className="text-gray-500">No booking requests yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customer?.name}</p>
                      <p className="text-xs text-gray-500">{booking.customer?.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.service?.title}</TableCell>
                  <TableCell>{format(new Date(booking.scheduledAt), 'PPP p')}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <ActionButtons booking={booking} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}
