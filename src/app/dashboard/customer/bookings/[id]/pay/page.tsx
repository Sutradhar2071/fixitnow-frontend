'use client';

import { useParams } from 'next/navigation';
import { useBookingById } from '@/hooks/useBookings';
import { useCreatePayment } from '@/hooks/usePayments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function PayBookingPage() {
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading } = useBookingById(id);
  const { mutate: createPayment, isPending } = useCreatePayment();

  const handlePay = () => {
    createPayment(id, {
      onSuccess: (data) => {
        window.location.href = data.checkoutUrl;
      },
    });
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10">
        <Skeleton className="h-60 w-full rounded-lg" />
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10 text-center">
        <p>Booking not found.</p>
      </main>
    );
  }

  if (booking.status !== 'ACCEPTED') {
    return (
      <main className="mx-auto max-w-lg px-4 py-10 text-center">
        <p className="text-gray-500">
          This booking is not ready for payment (current status: {booking.status}).
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Confirm & Pay</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">{booking.service?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Technician</span>
              <span className="font-medium">{booking.technician?.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Scheduled</span>
              <span className="font-medium">{format(new Date(booking.scheduledAt), 'PPP p')}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold">৳{booking.service?.price}</span>
            </div>
          </div>

          <Button className="w-full" onClick={handlePay} disabled={isPending}>
            {isPending ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}