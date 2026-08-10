'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useConfirmPayment } from '@/hooks/usePayments';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { mutate: confirm } = useConfirmPayment();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    if (!sessionId) return;

    confirm(sessionId, {
      onSuccess: (data) => {
        setStatus(data.status === 'COMPLETED' ? 'success' : 'failed');
      },
      onError: () => setStatus('failed'),
    });
  }, [sessionId, confirm]);

  const currentStatus = !sessionId ? 'failed' : status;

  return (
    <Card className="mx-auto max-w-md text-center">
      <CardContent className="flex flex-col items-center gap-4 pt-10 pb-8">
        {currentStatus === 'loading' && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
            <p className="text-gray-500">Confirming your payment...</p>
          </>
        )}
        {currentStatus === 'success' && (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-gray-500">
              Your booking is now paid. The technician will start the job soon.
            </p>
            <Link href="/dashboard/customer">
              <Button className="mt-2">Go to My Bookings</Button>
            </Link>
          </>
        )}
        {currentStatus === 'failed' && (
          <>
            <XCircle className="h-16 w-16 text-red-500" />
            <h1 className="text-2xl font-bold">Payment Could Not Be Confirmed</h1>
            <p className="text-gray-500">
              Something went wrong confirming your payment. Please check your bookings or contact support.
            </p>
            <Link href="/dashboard/customer">
              <Button className="mt-2" variant="outline">
                Go to My Bookings
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}