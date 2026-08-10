'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function DashboardError({
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
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-red-400" />
      <h2 className="text-xl font-semibold">Couldn&apos;t load this page</h2>
      <p className="max-w-md text-sm text-gray-500">
        There was a problem loading your dashboard data. Please try again.
      </p>
      <Button onClick={reset}>Retry</Button>
    </main>
  );
}