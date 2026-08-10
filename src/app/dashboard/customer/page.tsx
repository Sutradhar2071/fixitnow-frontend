"use client";

import { useMyBookings, useCancelBooking } from "@/hooks/useBookings";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";

const CANCELLABLE_STATUSES = ["REQUESTED", "ACCEPTED", "PAID"];

export default function CustomerDashboardPage() {
  const { data: bookings, isLoading } = useMyBookings();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/customer/payments">
            <Button variant="outline">Payment History</Button>
          </Link>
          <Link href="/services">
            <Button>Browse Services</Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : bookings?.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven&apos;t booked any services yet.{" "}
          <Link href="/services" className="underline">
            Browse services
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {bookings?.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{booking.service?.title}</p>
                  <p className="text-sm text-gray-500">
                    with {booking.technician?.user?.name} ·{" "}
                    {format(new Date(booking.scheduledAt), "PPP p")}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={booking.status} />
                  </div>
                </div>

                <div className="flex gap-2">
                  {booking.status === "ACCEPTED" && (
                    <Link
                      href={`/dashboard/customer/bookings/${booking.id}/pay`}
                    >
                      <Button size="sm">Pay Now</Button>
                    </Link>
                  )}
                  {booking.status === "COMPLETED" && (
                    <Link
                      href={`/dashboard/customer/bookings/${booking.id}/review`}
                    >
                      <Button size="sm" variant="outline">
                        Leave Review
                      </Button>
                    </Link>
                  )}
                  {CANCELLABLE_STATUSES.includes(booking.status) && (
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isCancelling}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
