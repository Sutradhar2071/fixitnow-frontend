'use client';

import { useState } from 'react';
import { useAdminCategories, useCreateCategory } from '@/hooks/useAdminData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useAdminCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createCategory(name.trim(), {
      onSuccess: () => setName(''),
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Manage Categories</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="e.g. Gardening"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="mb-3 text-lg font-semibold">All Categories</h2>
      {isLoading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => (
            <Badge key={cat.id} variant="secondary" className="px-3 py-1 text-sm">
              {cat.name}
            </Badge>
          ))}
        </div>
      )}
    </main>
  );
}