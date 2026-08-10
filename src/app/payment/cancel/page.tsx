import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-4 pt-10 pb-8">
          <XCircle className="h-16 w-16 text-gray-400" />
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-gray-500">
            You cancelled the payment. Your booking is still accepted — you can try paying again anytime.
          </p>
          <Link href="/dashboard/customer">
            <Button className="mt-2">Back to My Bookings</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}