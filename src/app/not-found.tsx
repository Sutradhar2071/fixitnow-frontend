import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <SearchX className="h-16 w-16 text-gray-300" />
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="max-w-md text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </main>
  );
}