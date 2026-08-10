'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBookingById } from '@/hooks/useBookings';
import { useCreateReview } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StarRating } from '@/components/shared/StarRating';

export default function LeaveReviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: booking, isLoading } = useBookingById(id);
  const { mutate: submitReview, isPending } = useCreateReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    submitReview(
      { bookingId: id, rating, comment },
      {
        onSuccess: () => {
          router.push('/dashboard/customer');
        },
      }
    );
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

  if (booking.status !== 'COMPLETED') {
    return (
      <main className="mx-auto max-w-lg px-4 py-10 text-center">
        <p className="text-gray-500">
          You can only review a completed booking (current status: {booking.status}).
        </p>
      </main>
    );
  }

  // Type-safe review check (unknown double casting)
  const hasReview = Boolean((booking as unknown as { review?: unknown }).review);

  if (hasReview) {
    return (
      <main className="mx-auto max-w-lg px-4 py-10 text-center">
        <p className="text-gray-500">You&apos;ve already reviewed this booking. Thank you!</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
          <p className="text-sm text-gray-500">
            for {booking.service?.title} by {booking.technician?.user?.name}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Your Rating</Label>
              <StarRating value={rating} onChange={setRating} />
              {rating === 0 && (
                <p className="text-xs text-gray-400">Click a star to rate</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comment (optional)</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending || rating === 0}>
              {isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}