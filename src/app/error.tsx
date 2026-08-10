'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-16 w-16 text-red-400" />
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-gray-500">
        An unexpected error occurred. You can try again, or head back to the home page.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </main>
  );
}