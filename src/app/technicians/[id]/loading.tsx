import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Skeleton className="mb-8 h-32 w-full rounded-lg" />
      <Skeleton className="mb-4 h-6 w-32" />
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </main>
  );
}